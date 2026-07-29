type BrandLogoProps = {
  variant?: 'mark' | 'wordmark-light' | 'wordmark-dark'
  className?: string
  alt?: string
}

const SRC = {
  mark: '/brand/zepto-mark.png',
  'wordmark-light': '/brand/zepto-logo-light.png',
  'wordmark-dark': '/brand/zepto-logo-dark.png',
} as const

export function BrandLogo({
  variant = 'mark',
  className = 'h-8 w-8 object-contain',
  alt = 'Zepto',
}: BrandLogoProps) {
  return <img src={SRC[variant]} alt={alt} className={className} />
}
