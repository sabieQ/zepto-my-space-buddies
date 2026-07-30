import missionsData from '../data/shoppingMissions.json'
import type { Product, Recommendations, ShoppingList, ShoppingMission } from '../types'
import { ProductService } from './ProductService'

const missions = missionsData as ShoppingMission[]

/** Complements by category — mirrors pre-created mission pairings. */
const CATEGORY_COMPLEMENTS: Record<string, string[]> = {
  'Dairy & Eggs': ['butter', 'jam', 'nonstick-frying-pan', 'bread'],
  Dairy: ['bread', 'butter', 'jam', 'oats'],
  Bakery: ['butter', 'jam', 'milk', 'eggs'],
  Breakfast: ['milk', 'bananas', 'peanut-butter'],
  Beverages: ['paper-cups', 'ice', 'chips'],
  Spreads: ['bread', 'bananas', 'oats'],
  Kitchen: ['eggs', 'bread', 'nonstick-frying-pan'],
  Fitness: ['peanut-butter', 'bananas', 'power-bank'],
  Fruits: ['greek-yogurt', 'oats', 'peanut-butter'],
  Party: ['ice', 'paper-cups', 'soft-drinks'],
  'Party Supplies': ['ice', 'chips', 'soft-drinks'],
  Snacks: ['soft-drinks', 'ice', 'paper-cups'],
  'Instant Food': ['soft-drinks', 'paper-cups', 'chips'],
  Sweets: ['milk', 'ice', 'paper-cups'],
  Vegetables: ['nonstick-frying-pan', 'eggs', 'bread'],
  Electronics: ['type-c-charger', 'power-bank'],
  Kitchenware: ['eggs', 'bread', 'food-storage-containers'],
  Beauty: ['herbal-shampoo', 'daily-moisturizer'],
  Medicines: ['vitamin-d', 'paracetamol'],
}

const SURPRISE_POOL = [
  'gentle-face-wash',
  'daily-moisturizer',
  'herbal-shampoo',
  'power-bank',
  'type-c-charger',
  'wireless-earbuds',
  'bluetooth-speaker',
]

const DEFAULT_COMBO_IDS = ['milk', 'eggs', 'bread']

function uniqueProducts(ids: string[], exclude: Set<string>): Product[] {
  const seen = new Set<string>()
  const out: Product[] = []
  for (const id of ids) {
    if (exclude.has(id) || seen.has(id)) continue
    const p = ProductService.getProduct(id)
    if (!p) continue
    seen.add(id)
    out.push(p)
  }
  return out
}

function buildDynamicRecommendations(
  listName: string,
  listProductIds: string[],
): Recommendations {
  const exclude = new Set(listProductIds)
  const listProducts = ProductService.getProductsByIds(listProductIds)

  const complementIds: string[] = []
  for (const p of listProducts) {
    const ids = CATEGORY_COMPLEMENTS[p.category] ?? []
    complementIds.push(...ids)
  }
  if (complementIds.length === 0) {
    complementIds.push('butter', 'jam', 'nonstick-frying-pan', 'peanut-butter', 'power-bank')
  }

  const youMayAlsoNeed = uniqueProducts(complementIds, exclude).slice(0, 3)

  let comboIds = listProductIds.filter((id) => ProductService.getProduct(id)).slice(0, 3)
  if (comboIds.length < 2) {
    for (const id of [...complementIds, ...DEFAULT_COMBO_IDS]) {
      if (comboIds.includes(id)) continue
      if (!ProductService.getProduct(id)) continue
      comboIds.push(id)
      if (comboIds.length >= 3) break
    }
  }
  const comboProducts = ProductService.getProductsByIds(comboIds)
  const priceSum = comboProducts.reduce((s, p) => s + p.price, 0)
  const mrpSum = comboProducts.reduce((s, p) => s + p.mrp, 0)
  const savings = Math.max(10, mrpSum - priceSum || Math.round(priceSum * 0.1))
  const bundlePrice = Math.max(0, priceSum - Math.min(savings, Math.round(priceSum * 0.12)))

  const surpriseCandidates = uniqueProducts(SURPRISE_POOL, exclude)
  const surpriseForYou = surpriseCandidates[0] ?? null

  const shortName = listName.trim() || 'Your list'

  return {
    youMayAlsoNeed,
    bestCombo: {
      title: `${shortName} Bundle`,
      subtitle:
        comboProducts.length > 0
          ? comboProducts.map((p) => p.name).join(' + ')
          : 'Curated essentials for your list',
      productIds: comboIds,
      bundlePrice,
      savings,
      products: comboProducts,
    },
    surpriseForYou,
  }
}

export const RecommendationService = {
  getMission(missionId: string): ShoppingMission | undefined {
    return missions.find((m) => m.id === missionId)
  },

  getRecommendations(
    missionId: string,
    listProductIds: string[] = [],
  ): Recommendations | null {
    const mission = this.getMission(missionId)
    if (!mission) return null

    const exclude = new Set(listProductIds)

    const youMayAlsoNeed = ProductService.getProductsByIds(
      mission.youMayAlsoNeed,
    ).filter((p) => !exclude.has(p.id))

    const comboProducts = ProductService.getProductsByIds(
      mission.bestCombo.productIds,
    )

    const surprise = ProductService.getProduct(mission.surpriseForYou)
    const surpriseForYou =
      surprise && !exclude.has(surprise.id) ? surprise : null

    return {
      youMayAlsoNeed,
      bestCombo: {
        ...mission.bestCombo,
        products: comboProducts,
      },
      surpriseForYou,
    }
  },

  /** Prefers static mission mapping; falls back to category complements for session lists. */
  getRecommendationsForList(list: ShoppingList): Recommendations | null {
    if (list.missionId) {
      return this.getRecommendations(list.missionId, list.productIds)
    }
    if (list.type !== 'personal') return null
    return buildDynamicRecommendations(list.name, list.productIds)
  },
}
