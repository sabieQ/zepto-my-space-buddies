export interface Product {
  id: string
  name: string
  price: number
  mrp: number
  unit: string
  category: string
  image: string
  description: string
  badge?: string
}

export interface BestCombo {
  title: string
  subtitle: string
  productIds: string[]
  bundlePrice: number
  savings: number
}

export interface ShoppingMission {
  id: string
  name: string
  youMayAlsoNeed: string[]
  bestCombo: BestCombo
  surpriseForYou: string
}

export interface ShoppingList {
  id: string
  name: string
  type: 'personal' | 'shared'
  missionId: string | null
  productIds: string[]
  savings: number
  itemCount: number
  members?: string[]
  activity?: string
}

export interface Buddy {
  id: string
  name: string
  status: string
  avatar: string
  lastMessage: string
  lastMessageTime: string
  unread: number
  functional: boolean
  isGroup?: boolean
}

export type Message =
  | {
      id: string
      type: 'text'
      from: string
      fromName?: string
      text: string
      time: string
    }
  | {
      id: string
      type: 'product'
      from: string
      fromName?: string
      productId: string
      time: string
    }
  | {
      id: string
      type: 'list'
      from: string
      fromName?: string
      listId: string
      time: string
    }


export interface Recommendations {
  youMayAlsoNeed: Product[]
  bestCombo: BestCombo & { products: Product[] }
  surpriseForYou: Product | null
}
