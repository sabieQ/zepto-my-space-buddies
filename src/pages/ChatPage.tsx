import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BrandLogo } from '../components/BrandLogo'
import { Toast } from '../components/Toast'
import { useDemoStore } from '../context/DemoStore'
import { ProductService } from '../services/ProductService'
import type { Message, Product, ShoppingList } from '../types'

function senderLabel(msg: Message, isGroup: boolean) {
  if (!isGroup || msg.from === 'me') return null
  return msg.fromName ?? msg.from
}

export function ChatPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const {
    getBuddy,
    getMessages,
    getList,
    getPersonalLists,
    getSharedLists,
    sendTextMessage,
    shareProductsToChat,
    shareList,
    splitBill,
  } = useDemoStore()

  const buddy = getBuddy(id ?? '')
  const messages = getMessages(id ?? '')
  const isGroup = Boolean(buddy?.isGroup)

  const [draft, setDraft] = useState('')
  const [productsOpen, setProductsOpen] = useState(false)
  const [listsOpen, setListsOpen] = useState(false)
  const [productQuery, setProductQuery] = useState('')
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([])
  const [toast, setToast] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  const allProducts = ProductService.getProducts()
  const personalLists = getPersonalLists()
  const sharedLists = getSharedLists()

  const filteredProducts = useMemo(() => {
    const q = productQuery.trim().toLowerCase()
    if (!q) return allProducts
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    )
  }, [allProducts, productQuery])

  if (!buddy) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center gap-4 p-8">
        <p>Chat not found</p>
        <button onClick={() => navigate('/buddies')} className="text-secondary">
          Back to Buddies
        </button>
      </div>
    )
  }

  const chatId = buddy.id

  const handleSend = () => {
    if (!draft.trim()) return
    sendTextMessage(chatId, draft)
    setDraft('')
  }

  const toggleProduct = (productId: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((x) => x !== productId)
        : [...prev, productId],
    )
  }

  const handleShareProducts = () => {
    const count = shareProductsToChat(chatId, selectedProductIds)
    setProductsOpen(false)
    setSelectedProductIds([])
    setProductQuery('')
    if (count > 0) setToast(`Shared ${count} product${count > 1 ? 's' : ''}`)
  }

  const handleShareList = (listId: string) => {
    const shared = shareList(chatId, listId)
    setListsOpen(false)
    if (shared) setToast(`Shared with ${buddy.name}`)
  }

  const handleSplitBill = () => {
    const result = splitBill(chatId)
    if (result.ok) {
      setToast(`Split ₹${result.total} ÷ ${result.members}`)
    } else if (result.reason === 'no_products') {
      setToast('No products in this chat to split')
    }
  }

  const renderListRow = (list: ShoppingList, sharedSection: boolean) => (
    <li key={list.id}>
      <button
        type="button"
        onClick={() => handleShareList(list.id)}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left hover:bg-neutral-gray-100"
      >
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${
            sharedSection ? 'bg-[#E0F2FE] text-[#0369A1]' : 'bg-zepto-purple-light text-primary'
          }`}
        >
          <span className="material-symbols-outlined">
            {sharedSection ? 'group' : 'checklist'}
          </span>
        </div>
        <div>
          <p className="font-label-bold text-body-md text-primary">{list.name}</p>
          <p className="font-label-subtext text-label-subtext text-on-surface-variant">
            {list.itemCount} items
            {list.members?.length ? ` · ${list.members.length} members` : ''}
          </p>
        </div>
      </button>
    </li>
  )

  const renderProductOption = (p: Product) => {
    const selected = selectedProductIds.includes(p.id)
    return (
      <li key={p.id}>
        <button
          type="button"
          onClick={() => toggleProduct(p.id)}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-neutral-gray-100 ${
            selected ? 'bg-zepto-purple-light/60' : ''
          }`}
        >
          <img
            src={p.image}
            alt={p.name}
            className="h-12 w-12 rounded-lg object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate font-label-bold text-body-md text-primary">{p.name}</p>
            <p className="font-label-subtext text-label-subtext text-on-surface-variant">
              ₹{p.price} · {p.unit}
            </p>
          </div>
          <span
            className={`flex h-7 w-7 items-center justify-center rounded-full ${
              selected
                ? 'bg-secondary text-white'
                : 'border border-neutral-gray-200 text-secondary'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {selected ? 'check' : 'add'}
            </span>
          </span>
        </button>
      </li>
    )
  }

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-neutral-gray-100 font-body-md text-on-surface">
      <nav className="z-50 flex shrink-0 items-center bg-surface-white px-4 py-3 shadow-sm">
        <button onClick={() => navigate('/buddies')} className="mr-3 text-on-surface">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex flex-1 items-center">
          <div className="relative mr-3 h-10 w-10 overflow-hidden rounded-full border border-neutral-gray-200">
            <img src={buddy.avatar} alt={buddy.name} className="h-full w-full object-cover" />
          </div>
          <div>
            <h1 className="font-headline-sm text-headline-sm text-primary">{buddy.name}</h1>
            <p
              className={`font-label-subtext text-label-subtext ${
                buddy.status === 'online' ? 'text-success-green' : 'text-on-surface-variant'
              }`}
            >
              {isGroup
                ? 'Akanksha, Sameer, Arindam, You'
                : buddy.status === 'online'
                  ? 'Online'
                  : 'Offline'}
            </p>
          </div>
        </div>
        <BrandLogo variant="mark" className="mr-2 h-8 w-8 rounded-lg object-cover" />
        <div className="flex gap-3">
          <span className="material-symbols-outlined text-on-surface-variant">call</span>
          <span className="material-symbols-outlined text-on-surface-variant">more_vert</span>
        </div>
      </nav>

      <main className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col gap-4 overflow-y-auto overscroll-contain px-4 pt-4 pb-4">
        {messages.map((msg) => {
          const isMe = msg.from === 'me'
          const label = senderLabel(msg, isGroup)

          if (msg.type === 'text') {
            return (
              <div
                key={msg.id}
                className={`flex max-w-[85%] flex-col ${isMe ? 'items-end self-end' : 'items-start'}`}
              >
                {label && (
                  <span className="mb-1 ml-1 font-label-subtext text-label-subtext font-bold text-secondary">
                    {label}
                  </span>
                )}
                <div
                  className={`${
                    isMe
                      ? 'chat-bubble-sent bg-secondary-container text-white'
                      : 'chat-bubble-received border border-neutral-gray-200 bg-surface-white'
                  } px-4 py-2 shadow-sm`}
                >
                  <p className="text-body-md">{msg.text}</p>
                </div>
                <span
                  className={`mt-1 font-label-subtext text-label-subtext text-on-surface-variant ${
                    isMe ? 'mr-1' : 'ml-1'
                  }`}
                >
                  {msg.time}
                </span>
              </div>
            )
          }

          if (msg.type === 'product') {
            const product = ProductService.getProduct(msg.productId)
            if (!product) return null
            return (
              <div
                key={msg.id}
                className={`flex max-w-[85%] flex-col ${isMe ? 'items-end self-end' : 'items-start'}`}
              >
                {label && (
                  <span className="mb-1 ml-1 font-label-subtext text-label-subtext font-bold text-secondary">
                    {label}
                  </span>
                )}
                <Link
                  to={`/product/${product.id}`}
                  className="w-full max-w-[280px] overflow-hidden rounded-xl border border-neutral-gray-200 bg-surface-white shadow-sm"
                >
                  <div className="relative h-48 w-full bg-neutral-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain p-4"
                    />
                    {product.badge && (
                      <div className="absolute top-2 left-2 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-white uppercase">
                        {product.badge}
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="truncate font-headline-sm text-headline-sm text-on-surface">
                      {product.name}
                    </h3>
                    <p className="mb-2 font-body-sm text-body-sm text-on-surface-variant">
                      {product.unit}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="font-price-lg text-price-lg text-primary">
                          ₹{product.price}
                        </span>
                        <span className="font-label-subtext text-label-subtext text-outline line-through">
                          ₹{product.mrp}
                        </span>
                      </div>
                      <span className="flex items-center gap-1 rounded-lg border border-secondary px-4 py-1.5 font-label-bold text-label-bold text-secondary">
                        <span className="material-symbols-outlined text-[16px]">add</span>
                        ADD
                      </span>
                    </div>
                  </div>
                </Link>
                <span
                  className={`mt-1 font-label-subtext text-label-subtext text-on-surface-variant ${
                    isMe ? 'mr-1' : 'ml-1'
                  }`}
                >
                  {msg.time}
                </span>
              </div>
            )
          }

          if (msg.type === 'list') {
            const list = getList(msg.listId)
            if (!list) return null
            const listIcon = list.id === 'weekend-party' ? 'celebration' : 'checklist'
            return (
              <div
                key={msg.id}
                className={`flex w-full max-w-[85%] flex-col ${
                  isMe ? 'items-end self-end' : 'items-start'
                }`}
              >
                {label && (
                  <span className="mb-1 ml-1 font-label-subtext text-label-subtext font-bold text-secondary">
                    {label}
                  </span>
                )}
                <div className="w-full max-w-[280px] overflow-hidden rounded-xl border border-secondary-fixed-dim bg-surface-white shadow-sm">
                  <div className="bg-primary-fixed-dim/20 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-container">
                          <span className="material-symbols-outlined text-[20px] text-white">
                            {listIcon}
                          </span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-primary">
                          {list.name}
                        </h3>
                      </div>
                      <span className="rounded bg-offer-green/10 px-2 py-0.5 text-[10px] font-bold text-offer-green">
                        SHARED
                      </span>
                    </div>
                    <div className="mb-4 flex items-center gap-3">
                      <span className="font-label-subtext text-label-subtext text-on-surface-variant">
                        {list.members?.length ?? 0} members • {list.itemCount} items
                      </span>
                    </div>
                    <Link
                      to={`/list/${list.id}`}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 font-label-bold text-label-bold text-white"
                    >
                      <span className="material-symbols-outlined text-[18px]">list_alt</span>
                      Open List
                    </Link>
                  </div>
                </div>
                <span
                  className={`mt-1 font-label-subtext text-label-subtext text-on-surface-variant ${
                    isMe ? 'mr-1' : 'ml-1'
                  }`}
                >
                  {msg.time}
                </span>
              </div>
            )
          }

          return null
        })}
        <div ref={bottomRef} />
      </main>

      <div className="z-40 shrink-0 border-t border-neutral-gray-200 bg-surface-white px-4 pt-3 pb-3">
        <div className="mb-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            type="button"
            onClick={() => setProductsOpen(true)}
            className="flex flex-none items-center gap-1.5 rounded-full bg-neutral-gray-100 px-3 py-1.5 font-label-bold text-label-bold whitespace-nowrap text-on-surface-variant"
          >
            <span className="material-symbols-outlined text-[18px]">shopping_basket</span>
            Share Products
          </button>
          <button
            type="button"
            onClick={() => setListsOpen(true)}
            className="flex flex-none items-center gap-1.5 rounded-full bg-neutral-gray-100 px-3 py-1.5 font-label-bold text-label-bold whitespace-nowrap text-on-surface-variant"
          >
            <span className="material-symbols-outlined text-[18px]">checklist</span>
            Share Lists
          </button>
          <button
            type="button"
            onClick={handleSplitBill}
            className="flex flex-none items-center gap-1.5 rounded-full bg-neutral-gray-100 px-3 py-1.5 font-label-bold text-label-bold whitespace-nowrap text-on-surface-variant"
          >
            <span className="material-symbols-outlined text-[18px]">receipt_long</span>
            Split Bill
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setProductsOpen(true)}
            className="flex items-center justify-center text-on-surface-variant"
          >
            <span className="material-symbols-outlined">add_circle</span>
          </button>
          <div className="flex flex-1 items-center rounded-full border border-neutral-gray-200 bg-neutral-gray-100 px-4 py-2">
            <input
              className="w-full border-none bg-transparent text-body-md text-on-surface placeholder:text-text-secondary focus:ring-0 focus:outline-none"
              placeholder="Type a message..."
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleSend()
                }
              }}
            />
          </div>
          <button
            type="button"
            onClick={handleSend}
            disabled={!draft.trim()}
            className={`flex h-10 w-10 items-center justify-center rounded-full text-white shadow-md ${
              draft.trim() ? 'bg-secondary' : 'bg-neutral-gray-200'
            }`}
          >
            <span className="material-symbols-outlined filled">send</span>
          </button>
        </div>
      </div>

      <div className="h-[4.25rem] shrink-0" aria-hidden />

      {productsOpen && (
        <div className="absolute inset-0 z-[70] flex flex-col justify-end bg-black/40">
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Close"
            onClick={() => setProductsOpen(false)}
          />
          <div className="relative z-10 flex max-h-[70%] flex-col overflow-hidden rounded-t-2xl bg-surface-white shadow-xl">
            <div className="flex items-center justify-between border-b border-neutral-gray-100 px-4 py-3">
              <h3 className="font-headline-sm text-headline-sm text-primary">Share Products</h3>
              <button type="button" onClick={() => setProductsOpen(false)}>
                <span className="material-symbols-outlined text-on-surface-variant">close</span>
              </button>
            </div>
            <div className="relative px-4 py-3">
              <span className="material-symbols-outlined absolute top-1/2 left-7 -translate-y-1/2 text-on-surface-variant">
                search
              </span>
              <input
                type="search"
                value={productQuery}
                onChange={(e) => setProductQuery(e.target.value)}
                placeholder="Search products"
                className="h-11 w-full rounded-xl border border-neutral-gray-200 bg-neutral-gray-100 py-2 pr-3 pl-10 font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/20"
              />
            </div>
            <ul className="min-h-0 flex-1 overflow-y-auto px-2 pb-2">
              {filteredProducts.map(renderProductOption)}
            </ul>
            <div className="border-t border-neutral-gray-100 px-4 py-3">
              <button
                type="button"
                disabled={selectedProductIds.length === 0}
                onClick={handleShareProducts}
                className={`flex h-11 w-full items-center justify-center rounded-xl font-headline-sm text-headline-sm text-white ${
                  selectedProductIds.length > 0
                    ? 'bg-secondary'
                    : 'cursor-not-allowed bg-neutral-gray-200'
                }`}
              >
                Share
                {selectedProductIds.length > 0 ? ` (${selectedProductIds.length})` : ''}
              </button>
            </div>
          </div>
        </div>
      )}

      {listsOpen && (
        <div className="absolute inset-0 z-[70] flex flex-col justify-end bg-black/40">
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Close"
            onClick={() => setListsOpen(false)}
          />
          <div className="relative z-10 max-h-[55%] overflow-hidden rounded-t-2xl bg-surface-white pb-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-neutral-gray-100 px-4 py-3">
              <h3 className="font-headline-sm text-headline-sm text-primary">Share Lists</h3>
              <button type="button" onClick={() => setListsOpen(false)}>
                <span className="material-symbols-outlined text-on-surface-variant">close</span>
              </button>
            </div>
            <ul className="max-h-[45vh] overflow-y-auto px-2 py-2">
              {personalLists.length > 0 && (
                <li className="px-3 py-2">
                  <p className="font-label-bold text-label-bold tracking-wide text-on-surface-variant uppercase">
                    Personal Lists
                  </p>
                </li>
              )}
              {personalLists.map((list) => renderListRow(list, false))}
              {sharedLists.length > 0 && (
                <li className="px-3 pt-3 pb-2">
                  <p className="font-label-bold text-label-bold tracking-wide text-on-surface-variant uppercase">
                    Shared Lists
                  </p>
                </li>
              )}
              {sharedLists.map((list) => renderListRow(list, true))}
            </ul>
          </div>
        </div>
      )}

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  )
}
