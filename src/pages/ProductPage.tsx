import { useCallback, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BrandLogo } from '../components/BrandLogo'
import { BuddyShareSheet } from '../components/BuddyShareSheet'
import { Toast } from '../components/Toast'
import { useDemoStore } from '../context/DemoStore'
import { ProductService } from '../services/ProductService'

export function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const product = ProductService.getProduct(id ?? '')
  const {
    getShareableBuddies,
    shareProduct,
    getPersonalLists,
    addProductToList,
  } = useDemoStore()

  const [shareOpen, setShareOpen] = useState(false)
  const [listOpen, setListOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const clearToast = useCallback(() => setToast(null), [])

  if (!product) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 bg-neutral-gray-100 p-8 pb-24">
        <p>Product not found</p>
        <button onClick={() => navigate(-1)} className="text-secondary">
          Go back
        </button>
      </div>
    )
  }

  const related = ProductService.getProducts()
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const buddies = getShareableBuddies()
  const personalLists = getPersonalLists()

  const handleShare = (buddyId: string) => {
    const ok = shareProduct(buddyId, product.id)
    setShareOpen(false)
    if (ok) setToast('Shared')
  }

  const handleAddToList = (listId: string) => {
    const result = addProductToList(listId, product.id)
    setListOpen(false)
    if (result.ok) setToast('Added')
    else if (result.reason === 'duplicate') setToast('Already in this list')
  }

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-neutral-gray-100 font-body-md text-on-surface">
      <header className="z-40 flex shrink-0 items-center justify-between bg-surface-white px-margin-page py-stack-md">
        <button
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-gray-100"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex items-center gap-2">
          <BrandLogo variant="mark" className="h-7 w-7 rounded-md object-cover" />
          <h1 className="font-headline-md text-headline-md text-primary">Product</h1>
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-gray-100">
          <span className="material-symbols-outlined">share</span>
        </button>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div className="bg-surface-white">
          <div className="relative aspect-square bg-neutral-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 rounded-full bg-secondary px-3 py-1 text-[10px] font-bold text-white uppercase">
                {product.badge}
              </span>
            )}
          </div>

          <div className="p-margin-page">
            <p className="mb-1 font-label-subtext text-label-subtext text-text-secondary uppercase">
              {product.category}
            </p>
            <h2 className="font-display-lg text-display-lg text-primary">{product.name}</h2>
            <p className="mt-1 font-body-sm text-body-sm text-text-secondary">{product.unit}</p>

            <div className="mt-4 flex items-end gap-3">
              <span className="font-price-lg text-2xl font-extrabold text-primary">
                ₹{product.price}
              </span>
              {product.mrp > product.price && (
                <>
                  <span className="font-body-md text-outline line-through">₹{product.mrp}</span>
                  <span className="rounded bg-offer-green/10 px-2 py-0.5 font-label-bold text-label-bold text-offer-green">
                    {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={() => setListOpen(true)}
              className="mt-3 flex items-center gap-2 font-label-bold text-label-bold text-secondary"
            >
              <span className="material-symbols-outlined text-[20px]">playlist_add</span>
              Add to List
            </button>

            <p className="mt-4 font-body-md text-body-md text-on-surface-variant">
              {product.description}
            </p>

            <div className="mt-4 flex items-center gap-2 rounded-lg bg-zepto-purple-light px-3 py-2">
              <span className="material-symbols-outlined filled text-sm text-secondary">bolt</span>
              <span className="font-label-bold text-label-bold text-primary">
                Delivery in 14 mins to 221B, Baker's Street
              </span>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-section-gap px-margin-page pb-4">
            <h3 className="mb-stack-md font-headline-md text-headline-md text-primary">
              Similar Products
            </h3>
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              {related.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="min-w-[120px] rounded-xl border border-neutral-gray-200 bg-surface-white p-2"
                >
                  <div className="mb-2 aspect-square overflow-hidden rounded-lg bg-neutral-gray-100">
                    <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                  </div>
                  <p className="line-clamp-2 font-label-bold text-body-sm">{p.name}</p>
                  <p className="font-price-sm text-primary">₹{p.price}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="z-40 shrink-0 border-t border-neutral-gray-200 bg-surface-white p-margin-page">
        <div className="flex gap-2">
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border-2 border-secondary py-3.5 font-headline-sm text-secondary"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            Add to Cart
          </button>
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-secondary py-3.5 font-headline-sm text-white"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            Buy Now
          </button>
          <button
            type="button"
            onClick={() => setShareOpen(true)}
            className="flex w-[4.5rem] shrink-0 flex-col items-center justify-center gap-0.5 rounded-xl border-2 border-primary/20 bg-zepto-purple-light py-2 font-label-bold text-[11px] text-primary"
          >
            <span className="material-symbols-outlined text-[22px]">share</span>
            Share
          </button>
        </div>
      </div>

      <div className="h-[4.25rem] shrink-0" aria-hidden />

      {shareOpen && (
        <BuddyShareSheet
          buddies={buddies}
          onSelect={handleShare}
          onClose={() => setShareOpen(false)}
        />
      )}

      {listOpen && (
        <div className="absolute inset-0 z-[70] flex flex-col justify-end bg-black/40">
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Close"
            onClick={() => setListOpen(false)}
          />
          <div className="relative z-10 max-h-[55%] overflow-hidden rounded-t-2xl bg-surface-white pb-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-neutral-gray-100 px-4 py-3">
              <h3 className="font-headline-sm text-headline-sm text-primary">Add to List</h3>
              <button type="button" onClick={() => setListOpen(false)}>
                <span className="material-symbols-outlined text-on-surface-variant">close</span>
              </button>
            </div>
            <ul className="overflow-y-auto px-2 py-2">
              {personalLists.map((list) => (
                <li key={list.id}>
                  <button
                    type="button"
                    onClick={() => handleAddToList(list.id)}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left hover:bg-neutral-gray-100"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zepto-purple-light text-primary">
                      <span className="material-symbols-outlined">checklist</span>
                    </div>
                    <div>
                      <p className="font-label-bold text-body-md text-primary">{list.name}</p>
                      <p className="font-label-subtext text-label-subtext text-on-surface-variant">
                        {list.itemCount} items
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {toast && <Toast message={toast} onDone={clearToast} />}
    </div>
  )
}
