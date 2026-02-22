import Link from 'next/link'
import ProductList from '@/app/components/ProductList'
import { sanityFetch } from '@/sanity/lib/live'
import { productsQuery } from '@/sanity/lib/queries'

export default async function ButikPage() {
  const { data: products } = await sanityFetch({ query: productsQuery })

  return (
    <div className="pt-24 min-h-screen bg-stone-50">
      <div className="bg-brand-dark text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-serif mb-4 text-white">Webbutik och förbokning</h1>
          <p className="text-brand-accent text-lg font-light max-w-2xl mx-auto">
            Här kan du beställa blombud och förboka växter till din trädgård. Vi rådger gärna kring växtval som kan passa just hos dig. Detta är bara ett urval — maila oss gärna om du önskar något specifikt!
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        <ProductList products={products || []} />


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
