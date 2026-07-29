import missionsData from '../data/shoppingMissions.json'
import type { Recommendations, ShoppingMission } from '../types'
import { ProductService } from './ProductService'

const missions = missionsData as ShoppingMission[]

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
}
