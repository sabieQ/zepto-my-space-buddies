import { Link, useNavigate, useParams } from 'react-router-dom'
import { BottomNav } from '../components/BottomNav'
import { BrandLogo } from '../components/BrandLogo'
import { BuddyService } from '../services/BuddyService'
import { ListService } from '../services/ListService'
import { ProductService } from '../services/ProductService'
import type { Message } from '../types'

function senderLabel(msg: Message, isGroup: boolean) {
  if (!isGroup || msg.from === 'me') return null
  return msg.fromName ?? msg.from
}

export function ChatPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const buddy = BuddyService.getBuddy(id ?? '')
  const messages = BuddyService.getMessages(id ?? '')
  const isGroup = Boolean(buddy?.isGroup)

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

  return (
    <div className="flex h-full flex-col overflow-hidden bg-neutral-gray-100 font-body-md text-on-surface">
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
            const list = ListService.getList(msg.listId)
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
      </main>

      <div className="z-40 shrink-0 border-t border-neutral-gray-200 bg-surface-white px-4 pt-3 pb-3">
        <div className="mb-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {['Share Products', 'Share Lists', 'Split Bill'].map((label, i) => (
            <button
              key={label}
              className="flex flex-none items-center gap-1.5 rounded-full bg-neutral-gray-100 px-3 py-1.5 font-label-bold text-label-bold whitespace-nowrap text-on-surface-variant"
            >
              <span className="material-symbols-outlined text-[18px]">
                {['shopping_basket', 'checklist', 'receipt_long'][i]}
              </span>
              {label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center text-on-surface-variant">
            <span className="material-symbols-outlined">add_circle</span>
          </button>
          <div className="flex flex-1 items-center rounded-full border border-neutral-gray-200 bg-neutral-gray-100 px-4 py-2">
            <input
              className="w-full border-none bg-transparent text-body-md text-on-surface placeholder:text-text-secondary focus:ring-0 focus:outline-none"
              placeholder="Type a message..."
              type="text"
              readOnly
            />
          </div>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-white shadow-md">
            <span className="material-symbols-outlined filled">send</span>
          </button>
        </div>
      </div>

      <div className="relative h-[4.25rem] shrink-0">
        <BottomNav />
      </div>
    </div>
  )
}
