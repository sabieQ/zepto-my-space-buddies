import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BrandLogo } from '../components/BrandLogo'
import { useDemoStore } from '../context/DemoStore'
import { ProductService } from '../services/ProductService'
import type { Product } from '../types'

const RECOMMENDED_IDS = [
  'milk',
  'eggs',
  'bread',
  'bananas',
  'peanut-butter',
  'food-storage-containers',
  'wireless-earbuds',
  'herbal-shampoo',
]

export function CreateListPage() {
  const navigate = useNavigate()
  const { createPersonalList } = useDemoStore()
  const allProducts = ProductService.getProducts()

  const [query, setQuery] = useState('')
  const [listName, setListName] = useState('')
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const recommended = useMemo(
    () => ProductService.getProductsByIds(RECOMMENDED_IDS),
    [],
  )

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    )
  }, [allProducts, query])

  const selectedProducts = useMemo(
    () => ProductService.getProductsByIds(selectedIds),
    [selectedIds],
  )

  const showingSearch = query.trim().length > 0
  const catalog: Product[] = showingSearch ? searchResults : recommended

  const toggleProduct = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  const handleSave = () => {
    const created = createPersonalList(listName, selectedIds)
    if (!created) return
    navigate('/my-space/lists', { replace: true })
  }

  const canSave = listName.trim().length > 0

  return (
    <div className="flex h-full flex-col overflow-hidden bg-neutral-gray-100 font-body-md text-on-surface">
      <header className="z-40 flex shrink-0 items-center border-b border-outline-variant bg-surface px-margin-page py-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mr-3 rounded-full p-1 hover:bg-surface-container-high"
        >
          <span className="material-symbols-outlined text-primary">arrow_back</span>
        </button>
        <BrandLogo variant="mark" className="mr-2 h-8 w-8 rounded-lg object-cover" />
        <h1 className="font-headline-md text-headline-md text-primary">Create New List</h1>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-margin-page py-4 pb-28">
        <label className="mb-4 block">
          <span className="mb-1.5 block font-label-bold text-label-bold text-on-surface-variant">
            List name
          </span>
          <input
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            placeholder="e.g. Weekend Snacks"
            className="h-12 w-full rounded-xl border border-neutral-gray-200 bg-surface-white px-4 font-body-md text-on-surface placeholder:text-text-secondary focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
          />
        </label>

        <div className="relative mb-4">
          <span className="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-on-surface-variant">
            search
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products"
            className="h-12 w-full rounded-xl border border-neutral-gray-200 bg-surface-white py-2 pr-4 pl-11 font-body-md text-on-surface placeholder:text-text-secondary focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
          />
        </div>

        {selectedProducts.length > 0 && (
          <section className="mb-5">
            <h2 className="mb-2 font-headline-sm text-headline-sm text-primary">
              Selected ({selectedProducts.length})
            </h2>
            <div className="flex flex-wrap gap-2">
              {selectedProducts.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => toggleProduct(p.id)}
                  className="flex items-center gap-1.5 rounded-full bg-secondary/10 py-1 pr-2 pl-1 font-label-bold text-label-bold text-secondary"
                >
                  <img
                    src={p.image}
                    alt=""
                    className="h-6 w-6 rounded-full object-cover"
                  />
                  {p.name}
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="mb-3 font-headline-sm text-headline-sm text-primary">
            {showingSearch ? 'Search results' : 'Recommended for you'}
          </h2>
          {showingSearch && catalog.length === 0 ? (
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              No products match “{query.trim()}”
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {catalog.map((p) => {
                const selected = selectedIds.includes(p.id)
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => toggleProduct(p.id)}
                    className={`rounded-xl border bg-surface-white p-3 text-left transition-all ${
                      selected
                        ? 'border-secondary ring-2 ring-secondary/30'
                        : 'border-neutral-gray-200'
                    }`}
                  >
                    <div className="relative mb-2 aspect-square overflow-hidden rounded-lg bg-neutral-gray-100">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-full w-full object-cover"
                      />
                      <span
                        className={`absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full ${
                          selected
                            ? 'bg-secondary text-white'
                            : 'border border-neutral-gray-200 bg-white text-secondary'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {selected ? 'check' : 'add'}
                        </span>
                      </span>
                    </div>
                    <p className="line-clamp-2 font-label-bold text-body-sm text-primary">
                      {p.name}
                    </p>
                    <p className="mt-1 font-price-sm text-primary">₹{p.price}</p>
                  </button>
                )
              })}
            </div>
          )}
        </section>
      </div>

      <div className="z-40 shrink-0 border-t border-neutral-gray-200 bg-surface-white px-margin-page py-3">
        <button
          type="button"
          disabled={!canSave}
          onClick={handleSave}
          className={`flex h-12 w-full items-center justify-center gap-2 rounded-xl font-headline-sm text-headline-sm text-white ${
            canSave ? 'bg-secondary' : 'cursor-not-allowed bg-neutral-gray-200 text-outline'
          }`}
        >
          Save List
          {selectedIds.length > 0 ? ` • ${selectedIds.length} items` : ''}
        </button>
      </div>

      <div className="h-[4.25rem] shrink-0" aria-hidden />
    </div>
  )
}
