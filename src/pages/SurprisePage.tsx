import { Link, useNavigate } from 'react-router-dom'
import { BottomNav } from '../components/BottomNav'
import { ProductService } from '../services/ProductService'

export function SurprisePage() {
  const navigate = useNavigate()
  const hero = ProductService.getProduct('bluetooth-speaker')
  const more = ProductService.getProductsByIds(['daily-moisturizer', 'food-storage-containers'])

  return (
    <div className="min-h-full bg-background pb-20 font-body-md text-on-surface">
      <header className="sticky top-0 z-40 flex h-14 w-full items-center border-b border-outline-variant bg-surface px-margin-page">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 rounded-full p-1 hover:bg-surface-container-high"
        >
          <span className="material-symbols-outlined text-primary">arrow_back</span>
        </button>
        <h1 className="font-headline-md text-headline-md text-primary">Surprise Me</h1>
      </header>

      <main className="space-y-section-gap px-margin-page py-6">
        {hero && (
          <section>
            <div className="mb-4">
              <h2 className="font-display-lg text-display-lg text-primary">Your Weekend Find</h2>
              <p className="mt-1 font-body-md text-text-secondary">
                Discover something new beyond groceries — curated for you.
              </p>
            </div>
            <Link
              to={`/product/${hero.id}`}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-neutral-gray-200 bg-surface-white shadow-sm"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={hero.image}
                  alt={hero.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-secondary px-3 py-1 font-label-bold text-label-bold text-on-secondary">
                  <span className="material-symbols-outlined filled text-[14px]">local_offer</span>
                  50% OFF
                </div>
              </div>
              <div className="flex flex-col justify-between bg-surface-white p-6">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-offer-green">
                      celebration
                    </span>
                    <span className="font-label-bold text-label-bold tracking-wider text-offer-green uppercase">
                      New category pick!
                    </span>
                  </div>
                  <h3 className="mb-2 font-display-lg text-display-lg leading-tight text-primary">
                    {hero.name}
                  </h3>
                  <p className="font-body-md text-on-surface-variant">{hero.description}</p>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="font-price-lg text-price-lg text-primary">₹{hero.price}</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant line-through">
                      ₹{hero.mrp}
                    </span>
                  </div>
                </div>
                <span className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-secondary py-4 font-headline-sm text-headline-sm text-on-secondary shadow-md">
                  <span className="material-symbols-outlined">shopping_bag</span>
                  Add to Cart
                </span>
              </div>
            </Link>
          </section>
        )}

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-headline-md text-headline-md text-primary">More to Love</h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {more.map((p, i) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className="group flex cursor-pointer gap-4 rounded-xl border border-neutral-gray-200 bg-surface-white p-3 transition-colors hover:border-secondary"
              >
                <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-gray-100">
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col justify-between py-1">
                  <div>
                    <p className="font-label-subtext text-label-subtext font-bold text-offer-green uppercase">
                      {i === 0 ? 'Beauty Pick' : 'Kitchenware Pick'}
                    </p>
                    <h4 className="font-headline-sm text-headline-sm text-primary transition-colors group-hover:text-secondary">
                      {p.name}
                    </h4>
                    <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
                      {p.unit}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-price-lg text-price-lg text-primary">₹{p.price}</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-secondary text-secondary">
                      <span className="material-symbols-outlined text-[20px]">add</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-between rounded-2xl bg-zepto-purple-light p-6">
          <div className="max-w-[70%]">
            <h3 className="font-headline-md text-headline-md text-primary">Not what you wanted?</h3>
            <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
              Shake your phone for a new set of surprises!
            </p>
          </div>
          <div className="flex h-12 w-12 animate-bounce items-center justify-center rounded-full bg-primary-container">
            <span className="material-symbols-outlined text-white">vibration</span>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}
