import { Link } from 'react-router-dom'
import type { Product } from '../types'

interface ProductCardProps {
  product: Product
  compact?: boolean
  showAdd?: boolean
  hint?: string
}

export function ProductCard({
  product,
  compact = false,
  showAdd = true,
  hint,
}: ProductCardProps) {
  return (
    <Link
      to={`/product/${product.id}`}
      className={`product-card-active relative flex flex-col rounded-xl border border-neutral-gray-200 bg-surface-white p-stack-md shadow-sm transition-transform ${
        compact ? 'min-w-[140px]' : 'w-full'
      }`}
    >
      <div className="relative mb-stack-md aspect-square overflow-hidden rounded-lg bg-neutral-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
        {product.mrp > product.price && (
          <div className="absolute top-2 left-2 rounded bg-offer-green px-1.5 py-0.5 text-[10px] font-bold text-surface-white">
            ₹{product.price}
          </div>
        )}
      </div>
      <h3 className="line-clamp-2 font-headline-sm text-body-md text-primary">
        {product.name}
      </h3>
      <p className="font-label-subtext text-label-subtext text-text-secondary">
        {product.unit}
      </p>
      <div className="mt-1 flex items-center justify-between">
        <span className="font-price-sm text-price-sm text-primary">
          ₹{product.price}
        </span>
        {showAdd && (
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-secondary text-secondary">
            <span className="material-symbols-outlined text-sm">add</span>
          </span>
        )}
      </div>
      {hint && (
        <p className="mt-2 border-t border-neutral-gray-100 pt-2 font-label-subtext text-label-subtext text-secondary italic">
          {hint}
        </p>
      )}
    </Link>
  )
}
