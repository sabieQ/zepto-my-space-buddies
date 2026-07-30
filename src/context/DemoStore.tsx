import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import buddiesData from '../data/buddies.json'
import listsData from '../data/lists.json'
import messagesData from '../data/messages.json'
import type { Buddy, Message, ShoppingList } from '../types'
import { ProductService } from '../services/ProductService'

type AddResult = { ok: true } | { ok: false; reason: 'duplicate' | 'not_found' }

type DemoStoreValue = {
  buddies: Buddy[]
  getBuddy: (id: string) => Buddy | undefined
  getShareableBuddies: () => Buddy[]
  getMessages: (buddyId: string) => Message[]
  shareProduct: (buddyId: string, productId: string) => boolean
  getList: (id: string) => ShoppingList | undefined
  getPersonalLists: () => ShoppingList[]
  getSharedLists: () => ShoppingList[]
  getListProducts: (id: string) => ReturnType<typeof ProductService.getProductsByIds>
  addProductToList: (listId: string, productId: string) => AddResult
}

const DemoStoreContext = createContext<DemoStoreValue | null>(null)

function formatTimeNow() {
  return new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

export function DemoStoreProvider({ children }: { children: ReactNode }) {
  const [buddies, setBuddies] = useState<Buddy[]>(() =>
    structuredClone(buddiesData as Buddy[]),
  )
  const [messages, setMessages] = useState<Record<string, Message[]>>(() =>
    structuredClone(messagesData as Record<string, Message[]>),
  )
  const [lists, setLists] = useState<ShoppingList[]>(() =>
    structuredClone(listsData as ShoppingList[]),
  )

  const getBuddy = useCallback(
    (id: string) => buddies.find((b) => b.id === id),
    [buddies],
  )

  const getShareableBuddies = useCallback(
    () => buddies.filter((b) => !b.isGroup),
    [buddies],
  )

  const getMessages = useCallback(
    (buddyId: string) => messages[buddyId] ?? [],
    [messages],
  )

  const shareProduct = useCallback((buddyId: string, productId: string) => {
    const product = ProductService.getProduct(productId)
    if (!product) return false

    let shared = false
    setBuddies((prev) => {
      const buddy = prev.find((b) => b.id === buddyId)
      if (!buddy || buddy.isGroup) return prev
      shared = true
      return prev.map((b) =>
        b.id === buddyId
          ? {
              ...b,
              lastMessage: `Shared ${product.name}`,
              lastMessageTime: 'Just now',
              unread: 0,
            }
          : b,
      )
    })

    if (!shared) return false

    const msg: Message = {
      id: `share-${productId}-${Date.now()}`,
      type: 'product',
      from: 'me',
      productId,
      time: formatTimeNow(),
    }

    setMessages((prev) => ({
      ...prev,
      [buddyId]: [...(prev[buddyId] ?? []), msg],
    }))

    return true
  }, [])

  const getList = useCallback(
    (id: string) => lists.find((l) => l.id === id),
    [lists],
  )

  const getPersonalLists = useCallback(
    () => lists.filter((l) => l.type === 'personal'),
    [lists],
  )

  const getSharedLists = useCallback(
    () => lists.filter((l) => l.type === 'shared'),
    [lists],
  )

  const getListProducts = useCallback(
    (id: string) => {
      const list = lists.find((l) => l.id === id)
      if (!list) return []
      return ProductService.getProductsByIds(list.productIds)
    },
    [lists],
  )

  const addProductToList = useCallback((listId: string, productId: string): AddResult => {
    if (!ProductService.getProduct(productId)) return { ok: false, reason: 'not_found' }

    let result: AddResult = { ok: false, reason: 'not_found' }
    setLists((prev) => {
      const list = prev.find((l) => l.id === listId)
      if (!list || list.type !== 'personal') {
        result = { ok: false, reason: 'not_found' }
        return prev
      }
      if (list.productIds.includes(productId)) {
        result = { ok: false, reason: 'duplicate' }
        return prev
      }
      result = { ok: true }
      return prev.map((l) =>
        l.id === listId
          ? {
              ...l,
              productIds: [...l.productIds, productId],
              itemCount: l.itemCount + 1,
            }
          : l,
      )
    })
    return result
  }, [])

  const value = useMemo<DemoStoreValue>(
    () => ({
      buddies,
      getBuddy,
      getShareableBuddies,
      getMessages,
      shareProduct,
      getList,
      getPersonalLists,
      getSharedLists,
      getListProducts,
      addProductToList,
    }),
    [
      buddies,
      getBuddy,
      getShareableBuddies,
      getMessages,
      shareProduct,
      getList,
      getPersonalLists,
      getSharedLists,
      getListProducts,
      addProductToList,
    ],
  )

  return (
    <DemoStoreContext.Provider value={value}>{children}</DemoStoreContext.Provider>
  )
}

export function useDemoStore() {
  const ctx = useContext(DemoStoreContext)
  if (!ctx) throw new Error('useDemoStore must be used within DemoStoreProvider')
  return ctx
}
