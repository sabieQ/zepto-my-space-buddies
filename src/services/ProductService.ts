import productsData from '../data/products.json'
import type { Product } from '../types'

const products = productsData as Product[]

export const ProductService = {
  getProducts(): Product[] {
    return products
  },

  getProduct(id: string): Product | undefined {
    return products.find((p) => p.id === id)
  },

  getProductsByIds(ids: string[]): Product[] {
    return ids
      .map((id) => products.find((p) => p.id === id))
      .filter((p): p is Product => Boolean(p))
  },
}
