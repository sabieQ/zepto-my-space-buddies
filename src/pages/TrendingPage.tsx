import { Link, useNavigate } from 'react-router-dom'
import { BottomNav } from '../components/BottomNav'
import { ProductService } from '../services/ProductService'

export function TrendingPage() {
  const navigate = useNavigate()
  const basedOnShopping = ProductService.getProductsByIds([
    'gentle-face-wash',
    'nonstick-frying-pan',
    'type-c-charger',
  ])
  const amongBuddies = ProductService.getProductsByIds([
    'bluetooth-speaker',
    'wireless-earbuds',
    'power-bank',
  ])
  const seasonal = ProductService.getProductsByIds(['herbal-shampoo', 'daily-moisturizer'])

  return (
    <div className="min-h-full bg-background pb-20 font-body-md text-on-surface">
      <header className="sticky top-0 z-40 flex h-14 items-center border-b border-outline-variant bg-surface px-margin-page">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 rounded-full p-1 hover:bg-surface-container-high"
        >
          <span className="material-symbols-outlined text-primary">arrow_back</span>
        </button>
        <h1 className="font-headline-md text-headline-md text-primary">Trending For Me</h1>
      </header>

      <main className="flex flex-col gap-section-gap py-margin-page">
        <section>
          <div className="mb-stack-lg flex items-center justify-between px-margin-page">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              Based on your shopping
            </h2>
          </div>
          <div className="flex gap-stack-lg overflow-x-auto px-margin-page hide-scrollbar">
            {basedOnShopping.map((p, i) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className="flex w-44 flex-shrink-0 flex-col rounded-lg border border-neutral-gray-200 bg-surface-white p-stack-md"
              >
                <div className="relative mb-stack-md aspect-square overflow-hidden rounded-lg bg-neutral-gray-100">
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                  {i === 0 && (
                    <div className="absolute top-2 left-2 rounded-full bg-offer-green px-1.5 py-0.5 text-[10px] font-bold text-surface-white">
                      15% OFF
                    </div>
                  )}
                </div>
                <p className="line-clamp-2 text-[13px] leading-tight font-label-bold text-on-surface">
                  {p.name}
                </p>
                <p className="mt-0.5 font-body-sm text-body-sm text-text-secondary">{p.unit}</p>
                <div className="mt-auto flex items-center justify-between pt-stack-md">
                  <span className="font-price-lg text-price-lg text-on-surface">₹{p.price}</span>
                  <span className="rounded-lg border border-secondary px-3 py-1 font-label-bold text-label-bold text-secondary">
                    ADD
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-surface-container-low py-stack-lg">
          <div className="mb-stack-lg flex items-center gap-2 px-margin-page">
            <span className="material-symbols-outlined text-xl text-secondary">group</span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              Popular among your Buddies
            </h2>
          </div>
          <div className="flex gap-stack-lg overflow-x-auto px-margin-page hide-scrollbar">
            {amongBuddies.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className="flex w-44 flex-shrink-0 flex-col rounded-lg border border-neutral-gray-200 bg-surface-white p-stack-md"
              >
                <div className="relative mb-stack-md aspect-square overflow-hidden rounded-lg bg-neutral-gray-100">
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                </div>
                <p className="line-clamp-2 text-[13px] leading-tight font-label-bold text-on-surface">
                  {p.name}
                </p>
                <p className="mt-0.5 font-body-sm text-body-sm text-text-secondary">{p.unit}</p>
                <div className="mt-auto flex items-center justify-between pt-stack-md">
                  <span className="font-price-lg text-price-lg text-on-surface">₹{p.price}</span>
                  <span className="rounded-lg border border-secondary px-3 py-1 font-label-bold text-label-bold text-secondary">
                    ADD
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-1 border-t border-neutral-gray-100 pt-2">
                  <span className="material-symbols-outlined text-[12px] text-secondary">
                    thumb_up
                  </span>
                  <p className="font-label-subtext text-label-subtext text-secondary italic">
                    Friends bought this
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-4 px-margin-page">
            <Link
              to="/buddies"
              className="flex items-center justify-between rounded-xl bg-zepto-purple-light p-4"
            >
              <span className="font-headline-sm text-primary">Explore Buddies</span>
              <span className="material-symbols-outlined text-secondary">chevron_right</span>
            </Link>
          </div>
        </section>

        <section>
          <div className="mb-stack-lg flex items-center gap-2 px-margin-page">
            <span className="material-symbols-outlined text-offer-green">eco</span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Seasonal Picks</h2>
          </div>
          <div className="grid grid-cols-2 gap-stack-lg px-margin-page">
            {seasonal.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className="flex flex-col rounded-lg border border-neutral-gray-200 bg-surface-white p-stack-md"
              >
                <div className="relative mb-stack-md aspect-square overflow-hidden rounded-lg bg-neutral-gray-100">
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                </div>
                <p className="line-clamp-1 text-[13px] font-label-bold text-on-surface">{p.name}</p>
                <p className="font-body-sm text-body-sm text-text-secondary">{p.unit}</p>
                <div className="mt-auto flex items-center justify-between pt-stack-md">
                  <span className="font-price-lg text-price-lg">₹{p.price}</span>
                  <span className="rounded-lg border border-secondary px-3 py-1 font-label-bold text-label-bold text-secondary">
                    ADD
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}
