import { Link, useNavigate, useParams } from 'react-router-dom'
import { BrandLogo } from '../components/BrandLogo'
import { ListService } from '../services/ListService'
import { RecommendationService } from '../services/RecommendationService'

export function ListPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const list = ListService.getList(id ?? '')
  const products = ListService.getListProducts(id ?? '')
  const recs = list?.missionId
    ? RecommendationService.getRecommendations(list.missionId, list.productIds)
    : null

  if (!list) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center gap-4 bg-neutral-gray-100 p-8">
        <p className="text-on-surface">List not found</p>
        <button
          onClick={() => navigate('/my-space')}
          className="rounded-lg bg-secondary px-4 py-2 text-white"
        >
          Back to My Space
        </button>
      </div>
    )
  }

  const total = products.reduce((sum, p) => sum + p.price, 0)

  return (
    <div className="min-h-full bg-neutral-gray-100 pb-40 font-body-md text-on-surface antialiased">
      <header className="sticky top-0 z-40 flex items-center justify-between bg-surface-white px-margin-page py-stack-md">
        <div className="flex items-center gap-stack-md">
          <button
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-gray-100"
          >
            <span className="material-symbols-outlined text-on-surface">arrow_back_ios_new</span>
          </button>
          <BrandLogo variant="mark" className="h-8 w-8 rounded-lg object-cover" />
          <h1 className="font-headline-md text-headline-md text-primary">{list.name}</h1>
        </div>
        <div className="flex items-center gap-stack-md">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-gray-100">
            <span className="material-symbols-outlined text-on-surface">share</span>
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-gray-100">
            <span className="material-symbols-outlined text-on-surface">edit</span>
          </button>
        </div>
      </header>

      <main className="pt-4">
        {list.savings > 0 && (
          <div className="mb-stack-lg px-margin-page">
            <div className="flex items-center justify-between rounded-lg border border-offer-green/20 bg-offer-green/10 px-margin-page py-stack-md">
              <span className="flex items-center gap-1 font-label-bold text-label-bold text-offer-green">
                <span className="material-symbols-outlined filled text-sm">eco</span>
                Yay! You saved ₹{list.savings} on this list
              </span>
              <span className="material-symbols-outlined text-sm text-offer-green">
                keyboard_arrow_down
              </span>
            </div>
          </div>
        )}

        <section className="mb-section-gap px-margin-page">
          <div className="mb-stack-md flex items-center justify-between">
            <h2 className="font-headline-sm text-headline-sm text-primary">Items in List</h2>
            <span className="font-label-subtext text-label-subtext text-text-secondary">
              {products.length} ITEMS
            </span>
          </div>
          <div className="grid grid-cols-2 gap-gutter-grid">
            {products.map((product, index) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className={`product-card-active relative rounded-xl border border-neutral-gray-200 bg-surface-white p-stack-md transition-transform ${
                  index === products.length - 1 && products.length % 2 === 1
                    ? 'col-span-2 flex gap-stack-lg'
                    : ''
                }`}
              >
                {index === products.length - 1 && products.length % 2 === 1 ? (
                  <>
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center gap-stack-sm">
                      <div className="w-fit rounded bg-offer-green px-1.5 py-0.5 text-[10px] font-bold text-surface-white">
                        ₹{product.price}
                      </div>
                      <h3 className="font-headline-sm text-headline-sm">{product.name}</h3>
                      <p className="font-label-subtext text-label-subtext text-text-secondary">
                        {product.unit}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-stack-md aspect-square overflow-hidden rounded-lg bg-neutral-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-stack-sm">
                      <div className="w-fit rounded bg-offer-green px-1.5 py-0.5 text-[10px] font-bold text-surface-white">
                        ₹{product.price}
                      </div>
                      <h3 className="line-clamp-1 font-headline-sm text-body-md">{product.name}</h3>
                      <p className="font-label-subtext text-label-subtext text-text-secondary">
                        {product.unit}
                      </p>
                    </div>
                  </>
                )}
                <span className="absolute right-2 bottom-2 flex h-8 w-8 items-center justify-center rounded-lg border border-secondary bg-surface-white font-bold text-secondary shadow-sm">
                  <span className="material-symbols-outlined text-sm">add</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {recs && recs.youMayAlsoNeed.length > 0 && (
          <section className="mb-section-gap">
            <div className="mb-stack-md flex flex-col gap-1 px-margin-page">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined filled text-sm text-secondary">
                  auto_awesome
                </span>
                <h2 className="font-headline-sm text-headline-sm text-primary">
                  You May Also Need
                </h2>
              </div>
              <p className="font-label-subtext text-label-subtext text-text-secondary">
                Pairs well with your {list.name.toLowerCase()} items
              </p>
            </div>
            <div className="flex snap-x gap-stack-md overflow-x-auto px-margin-page pb-2">
              {recs.youMayAlsoNeed.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="min-w-[140px] snap-start rounded-xl border border-neutral-gray-200 bg-surface-white p-stack-md shadow-sm"
                >
                  <div className="mb-stack-md aspect-square overflow-hidden rounded-lg bg-neutral-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h4 className="mb-1 line-clamp-1 font-label-bold text-body-sm">{product.name}</h4>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="font-price-sm text-primary">₹{product.price}</span>
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-secondary text-surface-white">
                      <span className="material-symbols-outlined text-xs">add</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {recs?.bestCombo && (
          <section className="mb-section-gap px-margin-page">
            <div className="overflow-hidden rounded-2xl border border-neutral-gray-200 bg-surface-white shadow-sm">
              <div className="bg-zepto-purple-light p-margin-page">
                <div className="mb-stack-md flex items-center justify-between">
                  <div>
                    <h2 className="font-headline-md text-headline-md text-primary">
                      {recs.bestCombo.title}
                    </h2>
                    <p className="font-label-subtext text-label-subtext text-on-primary-container/80">
                      {recs.bestCombo.subtitle}
                    </p>
                  </div>
                  <div className="animate-pulse rounded-full bg-secondary-container px-2 py-1 text-[12px] font-bold text-surface-white">
                    Save ₹{recs.bestCombo.savings}
                  </div>
                </div>
                <div className="mb-stack-lg flex items-center gap-2">
                  <div className="flex -space-x-4">
                    {recs.bestCombo.products.map((p) => (
                      <div
                        key={p.id}
                        className="h-16 w-16 overflow-hidden rounded-full border-4 border-zepto-purple-light bg-white shadow-md"
                      >
                        <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
                <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-secondary py-3 font-headline-sm text-surface-white">
                  <span>Add Bundle for ₹{recs.bestCombo.bundlePrice}</span>
                  <span className="material-symbols-outlined">shopping_cart_checkout</span>
                </button>
              </div>
            </div>
          </section>
        )}

        {recs?.surpriseForYou && (
          <section className="mb-stack-lg px-margin-page pb-8">
            <div
              className="relative overflow-hidden rounded-2xl p-4 text-surface-white"
              style={{
                background: 'linear-gradient(to bottom right, #2D0B5A, #1F003C)',
              }}
            >
              <div
                className="pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-full opacity-20 blur-3xl"
                style={{ backgroundColor: '#b90043' }}
              />
              <div className="relative z-10">
                <div className="mb-3 flex items-center gap-2">
                  <span
                    className="material-symbols-outlined filled text-sm"
                    style={{ color: '#ffd9dd' }}
                  >
                    stars
                  </span>
                  <h2 className="font-headline-sm text-headline-sm text-white">Surprise For You</h2>
                </div>
                <Link
                  to={`/product/${recs.surpriseForYou.id}`}
                  className="flex items-center gap-3"
                >
                  <div className="relative h-24 w-24 flex-shrink-0 rounded-xl bg-white/10 p-1 backdrop-blur-md">
                    <img
                      src={recs.surpriseForYou.image}
                      alt={recs.surpriseForYou.name}
                      className="h-full w-full rounded-lg object-cover"
                    />
                    <span className="absolute -top-2 -right-2 whitespace-nowrap rounded-full bg-secondary px-1.5 py-0.5 text-[8px] font-bold tracking-tighter text-white uppercase shadow-lg">
                      New for you
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-headline-sm text-body-md" style={{ color: '#f0dbff' }}>
                      {recs.surpriseForYou.name}
                    </h3>
                    <p
                      className="mt-1 line-clamp-2 text-[10px] leading-tight font-medium"
                      style={{ color: '#ddb8ff' }}
                    >
                      Based on your shopping habits. {recs.surpriseForYou.description}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="font-price-lg" style={{ color: '#ffd9dd' }}>
                        ₹{recs.surpriseForYou.price}
                      </span>
                      <span className="text-[10px] text-outline line-through">
                        ₹{recs.surpriseForYou.mrp}
                      </span>
                    </div>
                  </div>
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-white shadow-lg">
                    <span className="material-symbols-outlined">add</span>
                  </span>
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>

      <div className="absolute right-0 bottom-[4.25rem] left-0 z-40 px-margin-page pb-2">
        <button className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-zepto-pink font-headline-sm text-headline-sm text-surface-white shadow-xl">
          Add {products.length} Items to Cart • ₹{total}
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </div>
  )
}
