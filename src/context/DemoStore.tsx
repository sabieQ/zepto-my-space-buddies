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
  sendTextMessage: (buddyId: string, text: string) => boolean
  shareProduct: (buddyId: string, productId: string) => boolean
  shareProductsToChat: (buddyId: string, productIds: string[]) => number
  shareList: (buddyId: string, listId: string) => Buddy | null
  splitBill: (buddyId: string) => { ok: true; perPerson: number; total: number; members: number } | { ok: false; reason: string }
  getList: (id: string) => ShoppingList | undefined
  getPersonalLists: () => ShoppingList[]
  getSharedLists: () => ShoppingList[]
  getListProducts: (id: string) => ReturnType<typeof ProductService.getProductsByIds>
  addProductToList: (listId: string, productId: string) => AddResult
  createPersonalList: (name: string, productIds: string[]) => ShoppingList | null
  buddiesBannerDismissed: boolean
  dismissBuddiesBanner: () => void
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

  const [buddiesBannerDismissed, setBuddiesBannerDismissed] = useState(false)

  const dismissBuddiesBanner = useCallback(() => {
    setBuddiesBannerDismissed(true)
  }, [])

  const getBuddy = useCallback(
    (id: string) => buddies.find((b) => b.id === id),
    [buddies],
  )

  const getShareableBuddies = useCallback(() => buddies, [buddies])

  const getMessages = useCallback(
    (buddyId: string) => messages[buddyId] ?? [],
    [messages],
  )

  const touchBuddyPreview = useCallback((buddyId: string, lastMessage: string) => {
    setBuddies((prev) =>
      prev.map((b) =>
        b.id === buddyId
          ? { ...b, lastMessage, lastMessageTime: 'Just now', unread: 0 }
          : b,
      ),
    )
  }, [])

  const sendTextMessage = useCallback(
    (buddyId: string, text: string) => {
      const trimmed = text.trim()
      if (!trimmed) return false
      const buddy = buddies.find((b) => b.id === buddyId)
      if (!buddy) return false

      const msg: Message = {
        id: `text-${Date.now()}`,
        type: 'text',
        from: 'me',
        text: trimmed,
        time: formatTimeNow(),
      }

      setMessages((prev) => ({
        ...prev,
        [buddyId]: [...(prev[buddyId] ?? []), msg],
      }))
      touchBuddyPreview(buddyId, trimmed)
      return true
    },
    [buddies, touchBuddyPreview],
  )

  const shareProduct = useCallback((buddyId: string, productId: string) => {
    const product = ProductService.getProduct(productId)
    if (!product) return false

    let shared = false
    setBuddies((prev) => {
      const buddy = prev.find((b) => b.id === buddyId)
      if (!buddy) return prev
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

  const shareProductsToChat = useCallback(
    (buddyId: string, productIds: string[]) => {
      const buddy = buddies.find((b) => b.id === buddyId)
      if (!buddy) return 0

      const unique = [...new Set(productIds)].filter((id) =>
        Boolean(ProductService.getProduct(id)),
      )
      if (unique.length === 0) return 0

      const now = formatTimeNow()
      const newMsgs: Message[] = unique.map((productId, i) => ({
        id: `share-${productId}-${Date.now()}-${i}`,
        type: 'product' as const,
        from: 'me',
        productId,
        time: now,
      }))

      setMessages((prev) => ({
        ...prev,
        [buddyId]: [...(prev[buddyId] ?? []), ...newMsgs],
      }))

      const lastName = ProductService.getProduct(unique[unique.length - 1])?.name ?? 'products'
      touchBuddyPreview(
        buddyId,
        unique.length === 1 ? `Shared ${lastName}` : `Shared ${unique.length} products`,
      )
      return unique.length
    },
    [buddies, touchBuddyPreview],
  )

  const shareList = useCallback(
    (buddyId: string, listId: string): Buddy | null => {
      const list = lists.find((l) => l.id === listId)
      const buddy = buddies.find((b) => b.id === buddyId)
      if (!list || !buddy) return null

      const msg: Message = {
        id: `share-list-${listId}-${Date.now()}`,
        type: 'list',
        from: 'me',
        listId,
        time: formatTimeNow(),
      }

      setMessages((prev) => ({
        ...prev,
        [buddyId]: [...(prev[buddyId] ?? []), msg],
      }))

      setBuddies((prev) =>
        prev.map((b) =>
          b.id === buddyId
            ? {
                ...b,
                lastMessage: `Shared ${list.name}`,
                lastMessageTime: 'Just now',
                unread: 0,
              }
            : b,
        ),
      )

      return buddy
    },
    [lists, buddies],
  )

  const splitBill = useCallback(
    (buddyId: string) => {
      const buddy = buddies.find((b) => b.id === buddyId)
      if (!buddy) return { ok: false as const, reason: 'not_found' }

      const chatMessages = messages[buddyId] ?? []
      let total = 0
      for (const msg of chatMessages) {
        if (msg.type !== 'product') continue
        const product = ProductService.getProduct(msg.productId)
        if (product) total += product.price
      }

      if (total <= 0) return { ok: false as const, reason: 'no_products' }

      const members = buddy.memberCount ?? (buddy.isGroup ? 4 : 2)
      const perPerson = Math.ceil(total / members)
      const text = `Here's your share of the bill: ₹${perPerson}, Buddy :)`

      const msg: Message = {
        id: `split-${Date.now()}`,
        type: 'text',
        from: 'me',
        text,
        time: formatTimeNow(),
      }

      setMessages((prev) => ({
        ...prev,
        [buddyId]: [...(prev[buddyId] ?? []), msg],
      }))
      touchBuddyPreview(buddyId, text)

      return { ok: true as const, perPerson, total, members }
    },
    [buddies, messages, touchBuddyPreview],
  )

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
      if (!list) {
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

  const createPersonalList = useCallback((name: string, productIds: string[]) => {
    const trimmed = name.trim()
    if (!trimmed) return null

    const uniqueIds = [...new Set(productIds)].filter((id) =>
      Boolean(ProductService.getProduct(id)),
    )

    const newList: ShoppingList = {
      id: `personal-${Date.now()}`,
      name: trimmed,
      type: 'personal',
      missionId: null,
      productIds: uniqueIds,
      savings: 0,
      itemCount: uniqueIds.length,
    }

    setLists((prev) => {
      let insertAt = prev.length
      for (let i = prev.length - 1; i >= 0; i--) {
        if (prev[i].type === 'personal') {
          insertAt = i + 1
          break
        }
      }
      const next = [...prev]
      next.splice(insertAt, 0, newList)
      return next
    })

    return newList
  }, [])

  const value = useMemo<DemoStoreValue>(
    () => ({
      buddies,
      getBuddy,
      getShareableBuddies,
      getMessages,
      sendTextMessage,
      shareProduct,
      shareProductsToChat,
      shareList,
      splitBill,
      getList,
      getPersonalLists,
      getSharedLists,
      getListProducts,
      addProductToList,
      createPersonalList,
      buddiesBannerDismissed,
      dismissBuddiesBanner,
    }),
    [
      buddies,
      getBuddy,
      getShareableBuddies,
      getMessages,
      sendTextMessage,
      shareProduct,
      shareProductsToChat,
      shareList,
      splitBill,
      getList,
      getPersonalLists,
      getSharedLists,
      getListProducts,
      addProductToList,
      createPersonalList,
      buddiesBannerDismissed,
      dismissBuddiesBanner,
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
