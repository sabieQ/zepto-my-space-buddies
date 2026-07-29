import { Link } from 'react-router-dom'
import { BottomNav } from '../components/BottomNav'
import { ListService } from '../services/ListService'
import { ProductService } from '../services/ProductService'

export function MySpacePage() {
  const personalCount = ListService.getPersonalLists().length
  const suggested = ProductService.getProductsByIds(['milk', 'tomato', 'eggs'])

  return (
    <div className="min-h-full bg-neutral-gray-100 pb-28 font-body-md text-on-surface">
      <header className="sticky top-0 z-40 flex w-full items-center justify-between bg-surface px-margin-page py-stack-md">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="material-symbols-outlined filled text-primary">location_on</span>
          <div className="flex flex-col truncate">
            <h1 className="truncate font-headline-sm text-headline-sm text-primary">
              Datta Nagar - 4, Pantnagar Lane...
            </h1>
            <span className="font-label-subtext text-label-subtext text-on-surface-variant">
              Fast Delivery in 14 mins
            </span>
          </div>
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-variant">
          <span className="material-symbols-outlined text-on-surface-variant">person</span>
        </button>
      </header>

      <main className="px-margin-page pt-stack-lg">
        <section className="mb-section-gap">
          <h2 className="mb-1 font-display-lg text-display-lg text-primary">My Space</h2>
          <p className="font-body-md text-body-md text-text-secondary">
            Your personal shopping companion
          </p>
        </section>

        <section className="bento-grid mb-section-gap">
          <Link
            to="/my-space/lists"
            className="bento-item-large group relative flex h-44 cursor-pointer flex-col justify-between overflow-hidden rounded-xl border border-neutral-gray-200 bg-surface-white p-5 transition-colors hover:bg-surface-container-low"
          >
            <div className="z-10">
              <div className="mb-stack-md flex h-12 w-12 items-center justify-center rounded-lg bg-zepto-purple-light">
                <span className="material-symbols-outlined text-[28px] text-primary-container">
                  checklist
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary">My Personal Lists</h3>
              <p className="font-body-sm text-body-sm text-text-secondary">
                Weekly groceries & quick restocks
              </p>
            </div>
            <div className="z-10 flex items-center gap-2">
              <span className="font-label-bold text-label-bold text-secondary">
                {personalCount} active lists
              </span>
              <span className="material-symbols-outlined text-sm text-secondary">chevron_right</span>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-5 transition-opacity group-hover:opacity-10">
              <span className="material-symbols-outlined text-[120px] text-primary">
                shopping_bag
              </span>
            </div>
          </Link>

          <Link
            to="/my-space/shared"
            className="flex cursor-pointer flex-col gap-stack-md rounded-xl border border-neutral-gray-200 bg-surface-white p-4 transition-colors hover:bg-surface-container-low"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E0F2FE]">
              <span className="material-symbols-outlined text-[#0369A1]">group</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-primary">Shared Lists</h3>
              <p className="mt-1 font-body-sm text-body-sm text-text-secondary">Shop with family</p>
            </div>
          </Link>

          <Link
            to="/my-space/trending"
            className="flex cursor-pointer flex-col gap-stack-md rounded-xl border border-neutral-gray-200 bg-surface-white p-4 transition-colors hover:bg-surface-container-low"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#DCFCE7]">
              <span className="material-symbols-outlined text-offer-green">trending_up</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-primary">Trending For Me</h3>
              <p className="mt-1 font-body-sm text-body-sm text-text-secondary">Based on tastes</p>
            </div>
          </Link>

          <Link
            to="/my-space/surprise"
            className="flex cursor-pointer flex-col gap-stack-md rounded-xl border border-neutral-gray-200 bg-surface-white p-4 transition-colors hover:bg-surface-container-low"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFEDD5]">
              <span className="material-symbols-outlined text-[#C2410C]">redeem</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-primary">Surprise Me</h3>
              <p className="mt-1 font-body-sm text-body-sm text-text-secondary">Hidden gems</p>
            </div>
          </Link>

          <Link
            to="/my-space/settings"
            className="flex cursor-pointer flex-col gap-stack-md rounded-xl border border-neutral-gray-200 bg-surface-white p-4 transition-colors hover:bg-surface-container-low"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-gray-100">
              <span className="material-symbols-outlined text-outline">settings</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-primary">Settings</h3>
              <p className="mt-1 font-body-sm text-body-sm text-text-secondary">Manage space</p>
            </div>
          </Link>
        </section>

        <section className="mb-section-gap">
          <div className="relative flex flex-col items-center justify-between gap-4 overflow-hidden rounded-2xl bg-primary p-5">
            <div className="z-10 w-full">
              <span className="mb-2 inline-block rounded-full bg-secondary-container px-2 py-0.5 font-label-subtext text-label-subtext text-surface-white">
                SAVINGS INSIGHT
              </span>
              <h2 className="font-headline-md text-headline-md leading-tight text-surface-white">
                You saved ₹430 last month!
              </h2>
              <p className="mt-1 font-body-sm text-body-sm text-primary-fixed-dim">
                Your &apos;Essential&apos; list had the best deals.
              </p>
              <button className="mt-4 rounded-lg bg-surface-white px-4 py-2 font-label-bold text-label-bold text-primary">
                View Breakdown
              </button>
            </div>
            <div className="absolute top-0 right-0 -mt-24 -mr-24 h-48 w-48 rounded-full bg-primary-container opacity-50 blur-3xl" />
          </div>
        </section>

        <section className="mb-section-gap">
          <div className="mb-stack-lg flex items-end justify-between">
            <div>
              <h2 className="font-headline-md text-headline-md text-primary">
                Suggested For Your Lists
              </h2>
              <p className="font-body-sm text-body-sm text-text-secondary">
                Items you usually buy around this time
              </p>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
            {suggested.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className="flex min-w-[140px] flex-col rounded-xl border border-neutral-gray-200 bg-surface-white p-stack-md shadow-sm"
              >
                <div className="relative mb-stack-md h-28 w-full overflow-hidden rounded-lg bg-neutral-gray-100">
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                </div>
                <span className="font-price-sm text-price-sm text-primary">₹{p.price}</span>
                <h4 className="mt-0.5 line-clamp-2 font-body-sm text-body-sm text-primary">
                  {p.name}
                </h4>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <button className="absolute right-4 bottom-24 z-40 flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-surface-white shadow-lg">
        <span className="material-symbols-outlined">add_task</span>
        <span className="font-label-bold text-label-bold">New List</span>
      </button>

      <BottomNav />
    </div>
  )
}
