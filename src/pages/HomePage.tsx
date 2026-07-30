import { Link } from 'react-router-dom'
import { BrandLogo } from '../components/BrandLogo'
import { ProductService } from '../services/ProductService'

export function HomePage() {
  const fresh = ProductService.getProductsByIds(['tomato', 'spinach', 'bananas', 'avocado'])

  return (
    <div className="min-h-full bg-surface pb-24 font-body-md text-on-surface">
      <header className="sticky top-0 z-40 flex w-full items-center justify-between bg-surface px-margin-page py-stack-md">
        <div className="flex items-center gap-stack-md">
          <BrandLogo variant="mark" className="h-9 w-9 flex-shrink-0 rounded-lg object-cover shadow-sm" />
          <div className="flex min-w-0 flex-col">
            <div className="flex items-center gap-1 text-primary">
              <span className="material-symbols-outlined filled text-[20px]">bolt</span>
              <span className="font-headline-md text-headline-md">14 minutes</span>
            </div>
            <div className="flex items-center gap-1 text-on-surface-variant">
              <span className="max-w-[200px] truncate font-label-subtext text-label-subtext">
                221B, Baker's Street
              </span>
              <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
            </div>
          </div>
        </div>
        <div className="h-10 w-10 overflow-hidden rounded-full border border-outline-variant bg-surface-container">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </div>
      </header>

      <main className="pt-stack-md">
        <section className="mb-stack-lg flex gap-stack-md overflow-x-auto px-margin-page no-scrollbar">
          <button
            type="button"
            className="flex h-11 flex-shrink-0 items-center overflow-hidden rounded-xl bg-primary-container px-3"
          >
            <BrandLogo
              variant="wordmark-light"
              className="h-8 w-auto max-w-[72px] rounded-md object-cover"
            />
          </button>
          <button
            type="button"
            className="h-11 flex-shrink-0 rounded-xl border border-neutral-gray-200 bg-surface-white px-4 font-label-bold text-label-bold text-primary-fixed-dim"
          >
            MONSOON STORE
          </button>
          <button
            type="button"
            className="h-11 flex-shrink-0 rounded-xl border border-neutral-gray-200 bg-surface-white px-4 font-label-bold text-label-bold text-success-green"
          >
            Fresh
          </button>
        </section>

        <section className="mb-section-gap flex items-stretch gap-stack-md px-margin-page">
          <div className="relative flex min-w-0 flex-1 items-center">
            <span className="material-symbols-outlined absolute left-3 text-on-surface-variant">
              search
            </span>
            <input
              className="h-11 w-full rounded-xl border border-neutral-gray-200 bg-surface-white py-2 pr-3 pl-10 font-body-sm text-body-sm text-on-surface-variant shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-fixed"
              placeholder='Search for "Milk"'
              type="text"
              readOnly
            />
          </div>
          <div className="flex w-14 flex-shrink-0 flex-col items-center justify-center rounded-xl bg-secondary/10 px-1 py-1.5 text-center">
            <span className="material-symbols-outlined text-[22px] text-secondary">palette</span>
            <span className="mt-0.5 font-label-subtext text-[9px] leading-tight font-bold text-primary">
              Lipstick Day
            </span>
          </div>
        </section>

        <section className="mb-section-gap">
          <div className="flex gap-1 overflow-x-auto px-margin-page no-scrollbar">
            {[
              { label: 'All', icon: 'shopping_bag', active: true },
              { label: "It's Raining", icon: 'rainy', active: false },
              { label: 'Pooja', icon: 'local_florist', active: false },
              { label: 'Night Store', icon: 'dark_mode', active: false },
              { label: 'Fresh', icon: 'eco', active: false },
            ].map((cat) => (
              <div
                key={cat.label}
                className="flex w-[4.5rem] flex-shrink-0 flex-col items-center gap-1.5"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-white shadow-sm">
                  <span className="material-symbols-outlined text-[22px] text-primary">
                    {cat.icon}
                  </span>
                </div>
                <span
                  className={`text-center font-label-subtext text-label-subtext leading-tight ${
                    cat.active ? 'font-bold text-primary' : 'text-on-surface-variant'
                  }`}
                >
                  {cat.label}
                </span>
                {cat.active && <span className="h-0.5 w-8 rounded-full bg-primary" />}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-section-gap px-margin-page">
          <div className="overflow-hidden rounded-2xl bg-primary-fixed/40 p-3">
            <div className="mb-3 grid grid-cols-2 gap-2">
              <div className="flex h-[5.5rem] flex-col items-center justify-center rounded-xl bg-primary-fixed p-3">
                <span className="material-symbols-outlined mb-1 text-primary">shopping_bag</span>
                <span className="font-display-lg text-display-lg tracking-tight text-primary">
                  ₹0 FEES
                </span>
              </div>
              <div className="flex h-[5.5rem] flex-col items-center justify-center rounded-xl bg-surface-white p-3">
                <span className="font-label-bold text-label-bold text-on-primary-fixed-variant">
                  EVERYDAY
                </span>
                <span className="font-headline-md text-headline-md text-on-primary-fixed-variant">
                  LOW PRICES
                </span>
              </div>
            </div>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-y-2 px-1">
              {[
                '₹0 Handling Fee',
                '₹0 Delivery Fee*',
                '₹0 Rain & Surge Fee',
              ].map((fee) => (
                <span
                  key={fee}
                  className="flex items-center gap-1 font-label-subtext text-label-subtext text-primary"
                >
                  <span className="material-symbols-outlined filled text-[14px] text-offer-green">
                    check_circle
                  </span>
                  {fee}
                </span>
              ))}
            </div>
            <div className="rounded-lg bg-yellow-400 px-3 py-2 text-center">
              <span className="font-label-bold text-label-bold tracking-wide text-primary uppercase">
                Special prices for your 1st order
              </span>
            </div>
          </div>
        </section>

        <section className="mb-section-gap px-margin-page">
          <Link
            to="/my-space"
            className="relative flex min-h-[7.5rem] items-stretch justify-between overflow-hidden rounded-2xl border border-primary-fixed/30 bg-zepto-purple-light p-4 shadow-sm"
          >
            <div className="z-10 flex max-w-[65%] flex-col justify-between gap-3">
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <BrandLogo variant="mark" className="h-6 w-6 rounded-md object-cover" />
                  <span className="font-label-bold text-label-bold text-secondary">ZEPTO</span>
                </div>
                <h3 className="font-headline-md text-headline-md leading-tight text-primary">
                  Try My Space
                </h3>
                <p className="mt-1 font-body-sm text-body-sm text-text-secondary">
                  Lists & smart picks for you
                </p>
              </div>
              <span className="inline-flex w-fit items-center gap-1 rounded-lg bg-surface-white px-3 py-2 font-label-bold text-label-bold text-primary shadow-sm">
                Open My Space
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </span>
            </div>
            <BrandLogo
              variant="mark"
              className="absolute right-3 bottom-3 h-16 w-16 rounded-2xl object-cover opacity-25"
            />
          </Link>
        </section>

        <section className="mb-stack-md px-margin-page">
          <div className="mb-1 flex items-end gap-2">
            <h2 className="font-display-lg text-display-lg tracking-tight text-success-green">
              FRESH
            </h2>
            <span className="mb-0.5 rounded bg-yellow-400 px-1.5 py-0.5 font-headline-sm text-headline-sm text-primary">
              @₹1
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-text-secondary">
            Handpicked daily essentials
          </p>
        </section>

        <section className="mb-8 flex gap-3 overflow-x-auto px-margin-page pb-2 no-scrollbar">
          {fresh.map((p) => (
            <Link
              key={p.id}
              to={`/product/${p.id}`}
              className="relative w-[8.5rem] flex-shrink-0 rounded-xl border border-neutral-gray-200 bg-surface-white p-stack-md shadow-sm"
            >
              <div className="absolute top-2 left-2 z-10 rounded-full bg-secondary px-1.5 py-0.5 font-label-bold text-[10px] text-white">
                ₹{p.price}
              </div>
              <div className="mb-stack-md flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-neutral-gray-100">
                <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
              </div>
              <h4 className="line-clamp-1 font-headline-sm text-headline-sm text-primary">
                {p.name}
              </h4>
              <p className="mb-2 font-label-subtext text-label-subtext text-text-secondary">
                {p.unit}
              </p>
              <span className="block w-full rounded-lg border border-secondary py-1.5 text-center font-label-bold text-label-bold text-secondary">
                ADD
              </span>
            </Link>
          ))}
        </section>
      </main>
    </div>
  )
}
