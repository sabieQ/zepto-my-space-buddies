import { Link, useNavigate } from 'react-router-dom'
import { BottomNav } from '../components/BottomNav'
import { ListService } from '../services/ListService'

const AVATARS = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop',
]

export function SharedListsPage() {
  const navigate = useNavigate()
  const shared = ListService.getSharedLists()

  return (
    <div className="min-h-full bg-neutral-gray-100 pb-20 font-body-md text-on-surface">
      <header className="sticky top-0 z-40 flex h-14 w-full items-center border-b border-outline-variant bg-surface px-margin-page">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 rounded-full p-1 hover:bg-surface-container-high"
        >
          <span className="material-symbols-outlined text-primary">arrow_back</span>
        </button>
        <h1 className="font-headline-md text-headline-md text-primary">Shared Lists</h1>
      </header>

      <main className="space-y-gutter-grid px-margin-page py-stack-lg">
        <div className="mb-6 flex items-center gap-stack-md">
          <div className="relative flex-grow">
            <span className="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-outline">
              search
            </span>
            <input
              className="w-full rounded-lg border border-neutral-gray-200 bg-surface-white py-2 pr-4 pl-10 text-body-md focus:ring-2 focus:ring-secondary/20 focus:outline-none"
              placeholder="Search shared lists..."
              type="text"
              readOnly
            />
          </div>
          <button className="rounded-lg border border-neutral-gray-200 bg-surface-white p-2 text-primary">
            <span className="material-symbols-outlined">filter_list</span>
          </button>
        </div>

        <button className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-primary/20 bg-zepto-purple-light p-4">
          <span className="material-symbols-outlined text-primary">add_circle</span>
          <span className="font-headline-sm text-headline-sm text-primary">
            Create New Shared List
          </span>
        </button>

        <div className="space-y-stack-lg">
          {shared.map((list, i) => {
            const clickable = Boolean(list.missionId) || list.productIds.length > 0
            const cardClass = `group relative block overflow-hidden rounded-lg border border-neutral-gray-200 bg-surface-white p-4 transition-all hover:shadow-sm ${
              list.id === 'office-pantry' ? 'opacity-80' : ''
            }`
            const content = (
              <>
                <div className="mb-stack-md flex items-start justify-between">
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-primary">{list.name}</h3>
                    <p className="mt-1 font-body-sm text-body-sm text-text-secondary">
                      {list.itemCount} items
                    </p>
                  </div>
                  <div className="flex -space-x-2">
                    {(list.members ?? []).slice(0, 2).map((_, idx) => (
                      <div
                        key={idx}
                        className="h-8 w-8 overflow-hidden rounded-full bg-surface-container-highest"
                      >
                        <img
                          src={AVATARS[(i + idx) % AVATARS.length]}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                    {(list.members?.length ?? 0) > 2 && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                        +{(list.members?.length ?? 0) - 2}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 border-t border-neutral-gray-100 pt-3">
                  <span className="material-symbols-outlined text-[16px] text-secondary">
                    update
                  </span>
                  <p className="font-label-subtext text-label-subtext text-text-secondary">
                    {list.activity}
                  </p>
                </div>
              </>
            )

            return clickable ? (
              <Link key={list.id} to={`/list/${list.id}`} className={cardClass}>
                {content}
              </Link>
            ) : (
              <div key={list.id} className={cardClass}>
                {content}
              </div>
            )
          })}
        </div>

        <div className="mt-8 flex flex-col items-center justify-center rounded-xl border border-dashed border-outline-variant bg-surface-container-low p-6 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-zepto-purple-light">
            <span className="material-symbols-outlined text-primary">groups</span>
          </div>
          <h4 className="font-headline-sm text-headline-sm text-primary">
            Need a Buddy to shop with?
          </h4>
          <p className="mt-2 max-w-[240px] font-body-sm text-body-sm text-text-secondary">
            Invite friends to collaborate on lists and split bills effortlessly.
          </p>
          <Link
            to="/buddies"
            className="mt-4 rounded-full bg-secondary px-6 py-2 font-label-bold text-label-bold text-white"
          >
            Invite Buddies
          </Link>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
