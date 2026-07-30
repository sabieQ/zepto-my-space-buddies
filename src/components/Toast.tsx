import { useEffect } from 'react'

type ToastProps = {
  message: string
  onDone: () => void
  durationMs?: number
}

export function Toast({ message, onDone, durationMs = 2000 }: ToastProps) {
  useEffect(() => {
    const t = window.setTimeout(onDone, durationMs)
    return () => window.clearTimeout(t)
  }, [onDone, durationMs, message])

  return (
    <div className="pointer-events-none absolute inset-x-4 bottom-36 z-[80] flex justify-center">
      <div className="rounded-full bg-primary px-4 py-2.5 font-label-bold text-label-bold text-white shadow-lg">
        {message}
      </div>
    </div>
  )
}
