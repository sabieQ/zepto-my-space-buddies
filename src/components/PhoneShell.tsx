import { Outlet, useLocation } from 'react-router-dom'
import { BottomNav } from './BottomNav'

export function PhoneShell() {
  const location = useLocation()

  return (
    <div className="flex min-h-full items-start justify-center bg-[#e8e0e9] md:py-6">
      <div
        id="phone-frame"
        className="relative h-[100dvh] w-full max-w-[430px] overflow-hidden bg-neutral-gray-100 shadow-2xl md:h-[min(900px,100dvh)] md:rounded-[2rem] md:border md:border-outline-variant"
      >
        <div className="h-full overflow-y-auto overscroll-contain">
          <Outlet />
        </div>
        <BottomNav highlightNew={location.pathname === '/'} />
      </div>
    </div>
  )
}
