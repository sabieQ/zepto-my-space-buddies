import { Link, useNavigate, useParams } from 'react-router-dom'
import { BrandLogo } from '../components/BrandLogo'
import { ProductService } from '../services/ProductService'

export function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const product = ProductService.getProduct(id ?? '')

  if (!product) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center gap-4 bg-neutral-gray-100 p-8">
        <p>Product not found</p>
        <button onClick={() => navigate(-1)} className="text-secondary">
          Go back
        </button>
      </div>
    )
  }

  const related = ProductService.getProducts()
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="min-h-full bg-neutral-gray-100 pb-28 font-body-md text-on-surface">
      <header className="sticky top-0 z-40 flex items-center justify-between bg-surface-white px-margin-page py-stack-md">
        <button
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-gray-100"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex items-center gap-2">
          <BrandLogo variant="mark" className="h-7 w-7 rounded-md object-cover" />
          <h1 className="font-headline-md text-headline-md text-primary">Product</h1>
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-gray-100">
          <span className="material-symbols-outlined">share</span>
        </button>
      </header>

      <div className="bg-surface-white">
        <div className="relative aspect-square bg-neutral-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
          {product.badge && (
            <span className="absolute top-4 left-4 rounded-full bg-secondary px-3 py-1 text-[10px] font-bold text-white uppercase">
              {product.badge}
            </span>
          )}
        </div>

        <div className="p-margin-page">
          <p className="mb-1 font-label-subtext text-label-subtext text-text-secondary uppercase">
            {product.category}
          </p>
          <h2 className="font-display-lg text-display-lg text-primary">{product.name}</h2>
          <p className="mt-1 font-body-sm text-body-sm text-text-secondary">{product.unit}</p>

          <div className="mt-4 flex items-end gap-3">
            <span className="font-price-lg text-2xl font-extrabold text-primary">
              ₹{product.price}
            </span>
            {product.mrp > product.price && (
              <>
                <span className="font-body-md text-outline line-through">₹{product.mrp}</span>
                <span className="rounded bg-offer-green/10 px-2 py-0.5 font-label-bold text-label-bold text-offer-green">
                  {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                </span>
              </>
            )}
          </div>

          <p className="mt-4 font-body-md text-body-md text-on-surface-variant">
            {product.description}
          </p>

          <div className="mt-4 flex items-center gap-2 rounded-lg bg-zepto-purple-light px-3 py-2">
            <span className="material-symbols-outlined filled text-sm text-secondary">bolt</span>
            <span className="font-label-bold text-label-bold text-primary">
              Delivery in 14 mins to 221B, Baker's Street
            </span>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-section-gap px-margin-page">
          <h3 className="mb-stack-md font-headline-md text-headline-md text-primary">
            Similar Products
          </h3>
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {related.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className="min-w-[120px] rounded-xl border border-neutral-gray-200 bg-surface-white p-2"
              >
                <div className="mb-2 aspect-square overflow-hidden rounded-lg bg-neutral-gray-100">
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                </div>
                <p className="line-clamp-2 font-label-bold text-body-sm">{p.name}</p>
                <p className="font-price-sm text-primary">₹{p.price}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="absolute right-0 bottom-0 left-0 z-50 border-t border-neutral-gray-200 bg-surface-white p-margin-page">
        <div className="flex gap-3">
          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-secondary py-3.5 font-headline-sm text-secondary">
            <span className="material-symbols-outlined">add</span>
            Add to Cart
          </button>
          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-secondary py-3.5 font-headline-sm text-white">
            <span className="material-symbols-outlined">shopping_bag</span>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}
