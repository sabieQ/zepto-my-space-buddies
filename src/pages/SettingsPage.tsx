import { useNavigate } from 'react-router-dom'
import { BottomNav } from '../components/BottomNav'
import { useState } from 'react'

function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => setOn((v) => !v)}
      className={`relative h-5 w-10 rounded-full transition-colors ${
        on ? 'bg-primary-container' : 'bg-neutral-gray-200'
      }`}
    >
      <span
        className={`absolute top-[2px] left-[2px] h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
          on ? 'translate-x-5' : ''
        }`}
      />
    </button>
  )
}

export function SettingsPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-full bg-neutral-gray-100 pb-24 font-body-md text-on-surface">
      <header className="sticky top-0 z-40 flex w-full items-center justify-between bg-surface px-margin-page py-stack-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-neutral-gray-100"
          >
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </button>
          <div>
            <h1 className="font-headline-md text-headline-md text-primary">Settings</h1>
            <p className="font-label-subtext text-label-subtext text-on-surface-variant">
              Manage space and preferences
            </p>
          </div>
        </div>
        <div className="h-10 w-10 overflow-hidden rounded-full border border-outline-variant">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop"
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </div>
      </header>

      <main className="mx-auto max-w-xl px-margin-page pt-4 pb-8">
        <section className="mb-section-gap">
          <h2 className="mb-stack-lg ml-1 font-label-bold text-label-bold tracking-wider text-on-surface-variant uppercase">
            Personalization Settings
          </h2>
          <div className="overflow-hidden rounded-xl border border-neutral-gray-200 bg-surface-white shadow-sm">
            <div className="flex items-center justify-between border-b border-neutral-gray-100 p-stack-lg">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zepto-purple-light text-primary">
                  <span className="material-symbols-outlined">auto_awesome</span>
                </div>
                <div>
                  <h3 className="font-label-bold text-body-md">AI Recommendations</h3>
                  <p className="font-body-sm text-body-sm text-text-secondary">
                    Enable smart product suggestions
                  </p>
                </div>
              </div>
              <Toggle defaultOn />
            </div>
            <div className="flex items-center justify-between border-b border-neutral-gray-100 p-stack-lg">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zepto-purple-light text-primary">
                  <span className="material-symbols-outlined">analytics</span>
                </div>
                <div>
                  <h3 className="font-label-bold text-body-md">Shopping Habits Analysis</h3>
                  <p className="font-body-sm text-body-sm text-text-secondary">
                    Improve lists based on usage
                  </p>
                </div>
              </div>
              <Toggle />
            </div>
            <button className="flex w-full items-center justify-between p-stack-lg transition-colors active:bg-neutral-gray-100">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zepto-purple-light text-primary">
                  <span className="material-symbols-outlined">category</span>
                </div>
                <div className="text-left">
                  <h3 className="font-label-bold text-body-md">Preferred Categories</h3>
                  <p className="font-body-sm text-body-sm text-text-secondary">
                    Daily Staples, Fresh Fruits
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline">chevron_right</span>
            </button>
          </div>
        </section>

        <section className="mb-section-gap">
          <h2 className="mb-stack-lg ml-1 font-label-bold text-label-bold tracking-wider text-on-surface-variant uppercase">
            Shared List Preferences
          </h2>
          <div className="overflow-hidden rounded-xl border border-neutral-gray-200 bg-surface-white shadow-sm">
            <div className="flex items-center justify-between border-b border-neutral-gray-100 p-stack-lg">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zepto-purple-light text-primary">
                  <span className="material-symbols-outlined">notifications_active</span>
                </div>
                <div>
                  <h3 className="font-label-bold text-body-md">Buddy Notifications</h3>
                  <p className="font-body-sm text-body-sm text-text-secondary">
                    Alerts when friends add items
                  </p>
                </div>
              </div>
              <Toggle defaultOn />
            </div>
            <div className="flex items-center justify-between p-stack-lg">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zepto-purple-light text-primary">
                  <span className="material-symbols-outlined">group_add</span>
                </div>
                <div>
                  <h3 className="font-label-bold text-body-md">Auto-join Shared Lists</h3>
                  <p className="font-body-sm text-body-sm text-text-secondary">
                    Accept invites automatically
                  </p>
                </div>
              </div>
              <Toggle />
            </div>
          </div>
        </section>

        <section className="mb-section-gap">
          <h2 className="mb-stack-lg ml-1 font-label-bold text-label-bold tracking-wider text-on-surface-variant uppercase">
            App Preferences
          </h2>
          <div className="overflow-hidden rounded-xl border border-neutral-gray-200 bg-surface-white shadow-sm">
            {[
              { icon: 'dark_mode', title: 'Dark Mode', sub: 'Follow System' },
              { icon: 'language', title: 'Language', sub: 'English' },
            ].map((row) => (
              <button
                key={row.title}
                className="flex w-full items-center justify-between border-b border-neutral-gray-100 p-stack-lg last:border-0"
              >
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-gray-100 text-outline">
                    <span className="material-symbols-outlined">{row.icon}</span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-label-bold text-body-md">{row.title}</h3>
                    <p className="font-body-sm text-body-sm text-text-secondary">{row.sub}</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline">chevron_right</span>
              </button>
            ))}
          </div>
        </section>

        <section className="mb-section-gap">
          <h2 className="mb-stack-lg ml-1 font-label-bold text-label-bold tracking-wider text-on-surface-variant uppercase">
            Data & Privacy
          </h2>
          <div className="overflow-hidden rounded-xl border border-neutral-gray-200 bg-surface-white shadow-sm">
            <button className="flex w-full items-center justify-between border-b border-neutral-gray-100 p-stack-lg">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-gray-100 text-outline">
                  <span className="material-symbols-outlined">history</span>
                </div>
                <h3 className="font-label-bold text-body-md">Clear Shopping History</h3>
              </div>
              <span className="material-symbols-outlined text-outline">delete_outline</span>
            </button>
            <button className="flex w-full items-center justify-between p-stack-lg">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-error">
                  <span className="material-symbols-outlined">person_off</span>
                </div>
                <div className="text-left">
                  <h3 className="font-label-bold text-body-md text-error">Delete My Space Data</h3>
                  <p className="font-body-sm text-body-sm text-red-400">This action is permanent</p>
                </div>
              </div>
            </button>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}
