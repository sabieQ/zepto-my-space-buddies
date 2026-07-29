import { Link, useNavigate } from 'react-router-dom'
import { BottomNav } from '../components/BottomNav'
import { BuddyService } from '../services/BuddyService'
import { ProductService } from '../services/ProductService'

export function BuddiesPage() {
  const navigate = useNavigate()
  const buddies = BuddyService.getBuddies()
  const popular = ProductService.getProductsByIds(['wireless-earbuds', 'daily-moisturizer'])

  return (
    <div className="min-h-full bg-neutral-gray-100 pb-24 text-on-surface">
      <header className="sticky top-0 z-40 flex w-full items-center justify-between border-b border-neutral-gray-200 bg-surface px-margin-page py-stack-md">
        <h1 className="font-display-lg text-headline-md text-primary">Buddies</h1>
        <div className="flex items-center gap-stack-lg">
          <span className="material-symbols-outlined text-on-surface-variant">search</span>
          <span className="material-symbols-outlined text-on-surface-variant">person_add</span>
          <div className="h-8 w-8 overflow-hidden rounded-full border border-neutral-gray-200">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop"
              alt="You"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </header>

      <main>
        <section className="px-margin-page pt-4">
          <div className="relative flex items-center justify-between overflow-hidden rounded-xl bg-primary-container p-4 text-on-primary-container">
            <div className="z-10">
              <p className="font-label-bold text-label-bold tracking-wider uppercase opacity-80">
                Buddies Exclusive
              </p>
              <h2 className="mt-1 font-headline-md text-headline-md">
                Split grocery bills effortlessly
              </h2>
              <button className="mt-3 rounded-full bg-white px-4 py-2 font-label-bold text-label-bold text-primary">
                Learn More
              </button>
            </div>
            <div className="absolute top-0 right-[-10px] h-full rotate-12 opacity-20">
              <span className="material-symbols-outlined filled text-[80px]">group</span>
            </div>
          </div>
        </section>

        <section className="mt-stack-lg">
          <div className="flex gap-4 overflow-x-auto px-margin-page no-scrollbar">
            <div className="flex shrink-0 flex-col items-center gap-1">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-primary bg-surface-white text-primary">
                <span className="material-symbols-outlined">add</span>
              </div>
              <span className="font-label-subtext text-label-subtext text-on-surface-variant">
                New
              </span>
            </div>
            {buddies.map((b) => (
              <button
                key={b.id}
                onClick={() => navigate(`/chat/${b.id}`)}
                className="flex shrink-0 flex-col items-center gap-1"
              >
                <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-secondary p-0.5">
                  <img
                    src={b.avatar}
                    alt={b.name}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <span className="font-label-subtext text-label-subtext text-on-surface-variant">
                  {b.name.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-stack-lg min-h-[50vh] rounded-t-[2rem] bg-surface-white shadow-sm">
          <div className="px-margin-page pt-6 pb-2">
            <h3 className="font-headline-sm text-headline-sm text-on-surface-variant">
              Recent Activity
            </h3>
          </div>
          <div className="divide-y divide-neutral-gray-100">
            {buddies.map((buddy) => (
              <button
                key={buddy.id}
                onClick={() => navigate(`/chat/${buddy.id}`)}
                className="flex w-full cursor-pointer items-center gap-4 px-margin-page py-4 text-left transition-colors hover:bg-neutral-gray-100"
              >
                <div className="relative">
                  <div className="h-14 w-14 overflow-hidden rounded-full bg-neutral-gray-100">
                    <img
                      src={buddy.avatar}
                      alt={buddy.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  {buddy.status === 'online' && (
                    <div className="absolute right-0 bottom-0 h-4 w-4 rounded-full border-2 border-surface-white bg-success-green" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-label-bold text-body-md text-primary">{buddy.name}</span>
                    <span
                      className={`font-label-subtext text-label-subtext ${
                        buddy.unread ? 'font-bold text-secondary' : 'text-on-surface-variant'
                      }`}
                    >
                      {buddy.lastMessageTime}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-on-surface-variant">
                      {buddy.id === 'mom'
                        ? 'medication'
                        : buddy.id === 'weekend-crew'
                          ? 'checklist'
                          : 'restaurant'}
                    </span>
                    <p
                      className={`max-w-[180px] truncate font-body-sm text-body-sm text-on-surface-variant ${
                        buddy.unread ? 'font-bold' : ''
                      }`}
                    >
                      {buddy.lastMessage}
                    </p>
                  </div>
                </div>
                {buddy.unread > 0 && (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white">
                    {buddy.unread}
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="mt-stack-lg px-margin-page pb-8">
            <div className="rounded-2xl border border-outline-variant bg-surface-container-low p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-primary">
                    Commonly Ordered
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Popular among your buddies
                  </p>
                </div>
                <span className="material-symbols-outlined text-secondary">trending_up</span>
              </div>
              <div className="mt-4 flex gap-4 overflow-x-auto no-scrollbar">
                {popular.map((p) => (
                  <Link
                    key={p.id}
                    to={`/product/${p.id}`}
                    className="w-28 shrink-0 rounded-xl border border-neutral-gray-200 bg-surface-white p-2"
                  >
                    <div className="mb-2 flex h-20 items-center justify-center rounded-lg bg-neutral-gray-100">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-full w-full rounded-lg object-cover"
                      />
                    </div>
                    <p className="truncate font-label-subtext text-label-subtext">{p.name}</p>
                    <p className="font-price-sm text-price-sm text-primary">₹{p.price}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <button
        onClick={() => navigate('/chat/arindam')}
        className="absolute right-4 bottom-24 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-white shadow-lg"
      >
        <span className="material-symbols-outlined filled text-[28px]">chat_bubble</span>
      </button>

      <BottomNav />
    </div>
  )
}
