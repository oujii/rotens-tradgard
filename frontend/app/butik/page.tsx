import Link from 'next/link'
import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { productsQuery } from '@/sanity/lib/queries'

export default async function ButikPage() {
  const { data: products } = await sanityFetch({ query: productsQuery })

  return (
    <div className="pt-24 min-h-screen bg-stone-50">
      <div className="bg-brand-dark text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-serif mb-4 text-white">Webbutik och förbokning</h1>
          <p className="text-brand-accent text-lg font-light max-w-2xl mx-auto">
            Här kan du beställa blombud och förboka växter till din trädgård. Vi rådger gärna kring växtval som kan passa just hos dig.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product: any) => (
              <div key={product._id} className="bg-white group flex flex-col h-full shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="relative aspect-square overflow-hidden bg-stone-200">
                  {product.image && (
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  )}
                  {/* Pre-order Badge */}
                  {product.isPreOrder && (
                    <div className="absolute top-3 right-3 bg-white/90 text-brand-dark text-xs font-bold px-2 py-1 uppercase tracking-wider backdrop-blur-sm">
                      Leverans i vår
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-serif text-brand-dark mb-2">{product.title}</h3>
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className="text-lg font-medium text-stone-800">{product.price} kr</span>
                    {product.stripeUrl ? (
                      <a 
                        href={product.stripeUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-brand text-white text-sm uppercase tracking-wide font-medium hover:bg-brand-dark transition-colors"
                      >
                        {product.isPreOrder ? 'Förboka' : 'Köp'}
                      </a>
                    ) : (
                       <span className="text-sm text-stone-400 italic">Ej i lager</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-stone-500 text-lg">Inga produkter inlagda än. Kom tillbaka snart!</p>
          </div>
        )}
        
        <div className="mt-16 text-center">
          <p className="text-stone-500 mb-6">Hittar du inte vad du söker?</p>
          <Link 
            href="/kontakt" 
            className="inline-block px-8 py-3 border border-brand text-brand hover:bg-brand hover:text-white transition-colors uppercase tracking-widest text-sm font-medium"
          >
            Kontakta oss
          </Link>
        </div>
      </div>
    </div>
  )
}
