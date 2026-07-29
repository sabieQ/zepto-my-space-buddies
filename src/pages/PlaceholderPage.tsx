import { Link } from 'react-router-dom'
import { BottomNav } from '../components/BottomNav'

interface PlaceholderPageProps {
  title: string
  icon: string
}

export function PlaceholderPage({ title, icon }: PlaceholderPageProps) {
  return (
    <div className="flex min-h-full flex-col bg-neutral-gray-100 pb-24">
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zepto-purple-light">
          <span className="material-symbols-outlined text-4xl text-primary">{icon}</span>
        </div>
        <h1 className="font-display-lg text-display-lg text-primary">{title}</h1>
        <p className="font-body-md text-text-secondary">
          Coming soon in this prototype. Explore My Space and Buddies instead.
        </p>
        <div className="mt-4 flex gap-3">
          <Link
            to="/my-space"
            className="rounded-xl bg-secondary px-5 py-3 font-label-bold text-white"
          >
            My Space
          </Link>
          <Link
            to="/buddies"
            className="rounded-xl border border-secondary px-5 py-3 font-label-bold text-secondary"
          >
            Buddies
          </Link>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
