import listsData from '../data/lists.json'
import type { ShoppingList } from '../types'
import { ProductService } from './ProductService'

const lists = listsData as ShoppingList[]

export const ListService = {
  getLists(): ShoppingList[] {
    return lists
  },

  getList(id: string): ShoppingList | undefined {
    return lists.find((l) => l.id === id)
  },

  getPersonalLists(): ShoppingList[] {
    return lists.filter((l) => l.type === 'personal')
  },

  getSharedLists(): ShoppingList[] {
    return lists.filter((l) => l.type === 'shared')
  },

  getListProducts(id: string) {
    const list = this.getList(id)
    if (!list) return []
    return ProductService.getProductsByIds(list.productIds)
  },
}
