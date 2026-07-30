import { Link, useNavigate } from 'react-router-dom'
import { BrandLogo } from '../components/BrandLogo'
import { useDemoStore } from '../context/DemoStore'

const LIST_META: Record<
  string,
  { icon: string; iconBg: string; iconColor: string; blurb: string }
> = {
  breakfast: {
    icon: 'free_breakfast',
    iconBg: 'bg-zepto-purple-light',
    iconColor: 'text-primary-container',
    blurb: 'Eggs, bread & morning essentials',
  },
  'gym-diet': {
    icon: 'fitness_center',
    iconBg: 'bg-[#DCFCE7]',
    iconColor: 'text-offer-green',
    blurb: 'Protein-packed picks for training days',
  },
}

export function PersonalListsPage() {
  const navigate = useNavigate()
  const { getPersonalLists } = useDemoStore()
  const personal = getPersonalLists()

  return (
    <div className="min-h-full bg-neutral-gray-100 pb-20 font-body-md text-on-surface">
      <header className="sticky top-0 z-40 flex h-14 w-full items-center border-b border-outline-variant bg-surface px-margin-page">
        <button
          onClick={() => navigate('/my-space')}
          className="mr-3 rounded-full p-1 hover:bg-surface-container-high"
        >
          <span className="material-symbols-outlined text-primary">arrow_back</span>
        </button>
        <BrandLogo variant="mark" className="mr-2 h-8 w-8 rounded-lg object-cover" />
        <h1 className="font-headline-md text-headline-md text-primary">My Personal Lists</h1>
      </header>

      <main className="px-margin-page py-stack-lg">
        <p className="mb-6 font-body-md text-body-md text-text-secondary">
          Your lists for everyday shopping and restocks
        </p>

        <button
          type="button"
          onClick={() => navigate('/my-space/lists/create')}
          className="mb-6 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-primary/20 bg-zepto-purple-light p-4"
        >
          <span className="material-symbols-outlined text-primary">add_circle</span>
          <span className="font-headline-sm text-headline-sm text-primary">Create New List</span>
        </button>

        <div className="space-y-stack-lg">
          {personal.map((list) => {
            const meta = LIST_META[list.id] ?? {
              icon: 'checklist',
              iconBg: 'bg-zepto-purple-light',
              iconColor: 'text-primary-container',
              blurb: 'Personal shopping list',
            }

            return (
              <Link
                key={list.id}
                to={`/list/${list.id}`}
                className="flex items-center gap-4 rounded-xl border border-neutral-gray-200 bg-surface-white p-4 transition-all hover:bg-surface-container-low hover:shadow-sm active:scale-[0.99]"
              >
                <div
                  className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl ${meta.iconBg}`}
                >
                  <span className={`material-symbols-outlined text-[28px] ${meta.iconColor}`}>
                    {meta.icon}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-headline-sm text-headline-sm text-primary">{list.name}</h3>
                  <p className="mt-0.5 font-body-sm text-body-sm text-text-secondary">
                    {meta.blurb}
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="font-label-subtext text-label-subtext text-on-surface-variant">
                      {list.itemCount} items
                    </span>
                    {list.savings > 0 && (
                      <span className="font-label-subtext text-label-subtext text-offer-green">
                        Saved ₹{list.savings}
                      </span>
                    )}
                  </div>
                </div>
                <span className="material-symbols-outlined text-secondary">chevron_right</span>
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}
