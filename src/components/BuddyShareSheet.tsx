import type { Buddy } from '../types'

type BuddyShareSheetProps = {
  buddies: Buddy[]
  title?: string
  onSelect: (buddyId: string) => void
  onClose: () => void
}

export function BuddyShareSheet({
  buddies,
  title = 'Share with Buddy',
  onSelect,
  onClose,
}: BuddyShareSheetProps) {
  return (
    <div className="absolute inset-0 z-[70] flex flex-col justify-end bg-black/40">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="relative z-10 max-h-[55%] overflow-hidden rounded-t-2xl bg-surface-white pb-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-neutral-gray-100 px-4 py-3">
          <h3 className="font-headline-sm text-headline-sm text-primary">{title}</h3>
          <button type="button" onClick={onClose}>
            <span className="material-symbols-outlined text-on-surface-variant">close</span>
          </button>
        </div>
        <ul className="overflow-y-auto px-2 py-2">
          {buddies.map((b) => (
            <li key={b.id}>
              <button
                type="button"
                onClick={() => onSelect(b.id)}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left hover:bg-neutral-gray-100"
              >
                <img
                  src={b.avatar}
                  alt={b.name}
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div>
                  <p className="font-label-bold text-body-md text-primary">{b.name}</p>
                  <p className="font-label-subtext text-label-subtext text-on-surface-variant">
                    {b.isGroup
                      ? 'Group chat'
                      : b.status === 'online'
                        ? 'Online'
                        : 'Offline'}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
