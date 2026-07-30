import { Link } from 'react-router-dom'
import { BrandLogo } from '../components/BrandLogo'
import { ProductService } from '../services/ProductService'

export function HomePage() {
  const fresh = ProductService.getProductsByIds(['tomato', 'spinach', 'bananas', 'avocado'])

  return (
    <div className="min-h-full bg-surface pb-24 text-on-surface">
      <header className="sticky top-0 z-40 flex w-full items-center justify-between bg-surface px-4 py-3">
        <div className="flex items-center gap-3">
          <BrandLogo variant="mark" className="h-10 w-10 rounded-xl object-cover shadow-sm" />
          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-primary">
              <span className="material-symbols-outlined filled text-lg">bolt</span>
              <span className="font-display-lg text-lg">14 minutes</span>
            </div>
            <div className="flex items-center gap-1 text-on-surface-variant">
              <span className="max-w-[180px] truncate font-label-subtext text-label-subtext">
                221B, Baker's Street
              </span>
              <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
            </div>
          </div>
        </div>
        <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-primary-fixed bg-surface-container">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </div>
      </header>

      <div className="mb-4 px-4">
        <div className="relative flex items-center">
          <div className="absolute left-4 text-on-surface-variant">
            <span className="material-symbols-outlined">search</span>
          </div>
          <input
            className="h-12 w-full rounded-xl border-none bg-surface-white pl-12 pr-4 font-body-md text-on-surface-variant shadow-sm focus:ring-2 focus:ring-primary-fixed"
            placeholder='Search for "Milk"'
            type="text"
            readOnly
          />
        </div>
      </div>

      <div className="mb-6 flex gap-3 overflow-x-auto px-4 no-scrollbar">
        <button className="flex h-12 flex-shrink-0 items-center gap-2 overflow-hidden rounded-xl bg-primary-container px-3 py-2">
          <BrandLogo
            variant="wordmark-light"
            className="h-10 w-auto max-w-[88px] rounded-md object-cover"
          />
        </button>
        <button className="flex-shrink-0 rounded-xl border border-neutral-gray-200 bg-surface-white px-6 py-3 font-headline-sm text-primary-fixed-dim">
          MONSOON STORE
        </button>
        <button className="flex-shrink-0 rounded-xl border border-neutral-gray-200 bg-surface-white px-6 py-3 font-headline-sm text-success-green">
          Frėsh
        </button>
      </div>

      <div className="mb-6 px-4">
        <div className="grid grid-cols-5 gap-y-6">
          {[
            { label: 'All', icon: 'shopping_bag' },
            { label: "It's Raining", icon: 'rainy' },
            { label: 'Pooja', icon: 'local_florist' },
            { label: 'Night Store', icon: 'dark_mode' },
            { label: 'Fresh', icon: 'eco' },
          ].map((cat) => (
            <div key={cat.label} className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-white shadow-sm">
                <span className="material-symbols-outlined text-primary">{cat.icon}</span>
              </div>
              <span className="text-center font-label-subtext text-label-subtext leading-tight">
                {cat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 px-4">
        <div className="flex h-32 flex-col items-center justify-center rounded-2xl border border-white/20 bg-primary-fixed p-4 shadow-sm">
          <span className="font-display-lg text-2xl tracking-tighter text-primary">₹0 FEES</span>
          <span className="mt-2 text-[8px] font-bold uppercase text-on-surface-variant">
            0 Handling Fee
          </span>
        </div>
        <div className="flex h-32 flex-col items-center justify-center rounded-2xl border border-neutral-gray-200 bg-surface-white p-4 shadow-sm">
          <span className="font-headline-sm leading-none text-on-primary-fixed-variant">
            EVERYDAY
          </span>
          <span className="font-display-lg text-xl leading-none text-on-primary-fixed-variant">
            LOW PRICES
          </span>
        </div>
      </div>

      <div className="mb-8 px-4">
        <Link
          to="/my-space"
          className="relative flex justify-between overflow-hidden rounded-2xl border border-primary-fixed/30 bg-zepto-purple-light p-5 shadow-sm"
        >
          <div className="z-10 flex max-w-[70%] flex-col justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <BrandLogo variant="mark" className="h-7 w-7 rounded-lg object-cover" />
                <span className="font-label-bold text-label-bold text-secondary">ZEPTO</span>
              </div>
              <h3 className="font-headline-md leading-tight text-primary">Try My Space</h3>
              <p className="mb-3 font-display-lg text-xl text-secondary">
                Lists & smart picks
              </p>
            </div>
            <span className="flex w-fit items-center gap-1 rounded-lg border border-neutral-gray-100 bg-white px-4 py-2 font-headline-sm text-on-surface shadow-sm">
              Open My Space
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </span>
          </div>
          <BrandLogo
            variant="mark"
            className="absolute right-3 bottom-3 h-20 w-20 rounded-2xl object-cover opacity-20"
          />
        </Link>
      </div>

      <div className="mb-4 px-4">
        <div className="flex items-end gap-2">
          <h2 className="font-display-lg text-3xl tracking-tight text-success-green italic">
            FRESH
          </h2>
          <div className="mb-1 flex items-center gap-1 rounded bg-yellow-400 px-2 py-0.5">
            <span className="text-xl font-extrabold text-primary">@₹1</span>
          </div>
        </div>
        <p className="font-body-sm text-text-secondary">Handpicked daily essentials</p>
      </div>

      <div className="mb-8 flex gap-4 overflow-x-auto px-4 pb-4 no-scrollbar">
        {fresh.map((p) => (
          <Link
            key={p.id}
            to={`/product/${p.id}`}
            className="relative w-36 flex-shrink-0 rounded-2xl border border-neutral-gray-200 bg-surface-white p-3 shadow-sm"
          >
            <div className="absolute top-2 left-2 z-10 rounded-full bg-secondary px-1.5 py-0.5 text-[10px] font-bold text-white">
              ₹{p.price}
            </div>
            <div className="mb-2 flex aspect-square items-center justify-center overflow-hidden">
              <img src={p.image} alt={p.name} className="h-24 w-24 object-cover rounded-lg" />
            </div>
            <h4 className="line-clamp-1 font-headline-sm text-sm text-on-surface">{p.name}</h4>
            <p className="mb-2 font-label-subtext text-text-secondary">{p.unit}</p>
            <span className="block w-full rounded-lg border border-secondary py-1.5 text-center font-headline-sm text-sm text-secondary">
              ADD
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
