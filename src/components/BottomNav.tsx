import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/', label: 'Home', icon: 'home', end: true },
  { to: '/categories', label: 'Categories', icon: 'grid_view', end: true },
  { to: '/my-space', label: 'My Space', icon: 'space_dashboard', end: false },
  { to: '/fresh', label: 'Fresh', icon: 'eco', end: true },
  { to: '/buddies', label: 'Buddies', icon: 'group', end: false },
] as const

interface BottomNavProps {
  highlightNew?: boolean
}

export function BottomNav({ highlightNew = false }: BottomNavProps) {
  return (
    <nav className="absolute bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-neutral-gray-200 bg-surface-white py-2 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
          className={({ isActive }) =>
            `relative flex flex-col items-center justify-center gap-0.5 rounded-lg px-2 py-1 transition-all ${
              isActive
                ? 'scale-95 font-bold text-secondary'
                : 'text-on-surface-variant'
            }`
          }
        >
          {({ isActive }) => (
            <>
              {highlightNew &&
                !isActive &&
                (tab.to === '/my-space' || tab.to === '/buddies') && (
                  <span className="absolute -top-1 -right-1 animate-pulse rounded-full bg-secondary px-1 text-[8px] font-bold text-white">
                    NEW
                  </span>
                )}
              <span
                className={`material-symbols-outlined text-2xl ${isActive ? 'filled' : ''}`}
              >
                {tab.icon}
              </span>
              <span className="font-label-subtext text-label-subtext">
                {tab.label}
              </span>
              {isActive && (
                <span className="h-1 w-1 rounded-full bg-secondary" />
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
