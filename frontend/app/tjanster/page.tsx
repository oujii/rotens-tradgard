import Image from 'next/image'

import ResolvedLink from '@/app/components/ResolvedLink'
import {sanityFetch} from '@/sanity/lib/live'
import {servicesPageQuery} from '@/sanity/lib/queries'

export default async function TjansterPage() {
  const {data: servicesPage} = await sanityFetch({query: servicesPageQuery})

  const fallbackServices = [
    {
      title: 'Butik',
      description: 'Växter, krukor, jord och trädgårdstillbehör för säsongens behov.',
      image:
        'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1200&auto=format&fit=crop',
      ctaLabel: 'Till butiken',
      href: {linkType: 'href', href: '/butik'},
    },
    {
      title: 'Trädgård & Café',
      description: 'En grön oas att strosa i, med sommarkafé för fika i det fria.',
      image:
        'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop',
      ctaLabel: 'Besök oss',
      href: {linkType: 'href', href: '/om-oss'},
    },
    {
      title: 'Trädgårdstjänster',
      description: 'Skötsel, beskärning och hjälp på plats – anpassat efter din trädgård.',
      image:
        'https://images.unsplash.com/photo-1599591037488-8260408f657d?q=80&w=1200&auto=format&fit=crop',
      ctaLabel: 'Boka hjälp',
      href: {linkType: 'href', href: '/kontakt?val=beskarning'},
    },
    {
      title: 'Binderier / Blombud',
      description: 'Personliga blomsterarrangemang och leverans vid önskemål.',
      image:
        'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=1200&auto=format&fit=crop',
      ctaLabel: 'Beställ binderi',
      href: {linkType: 'href', href: '/kontakt?val=binderier'},
    },
    {
      title: 'Events',
      description: 'Marknadsdagar och upplevelser som samlar trädgårdsintresserade.',
      image:
        'https://images.unsplash.com/photo-1515165562835-c4cfa5ca4e0e?q=80&w=1200&auto=format&fit=crop',
      ctaLabel: 'Se kommande events',
      href: {linkType: 'href', href: '/#events'},
    },
    {
      title: 'Föreläsningar & workshops',
      description: 'Inspirerande tillfällen med fokus på odling, jord och säsong.',
      image:
        'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1200&auto=format&fit=crop',
      ctaLabel: 'Fråga om plats',
      href: {linkType: 'href', href: '/kontakt?val=allmant'},
    },
    {
      title: 'Rådgivning',
      description: 'Personlig vägledning för val av växter, planering och form.',
      image:
        'https://images.unsplash.com/photo-1416870213410-d93130d2268b?q=80&w=1200&auto=format&fit=crop',
      ctaLabel: 'Boka rådgivning',
      href: {linkType: 'href', href: '/kontakt?val=radgivning'},
    },
  ]

  const title = servicesPage?.title || 'Tjänster'
  const intro =
    servicesPage?.intro ||
    '"Från den lilla buketten till den stora trädgårdsdrömmen – vi finns här med vår kunskap och passion."'

  const services =
    servicesPage?.items?.map((item: any) => ({
      key: item._key,
      title: item.title,
      description: item.description,
      image: item.imageUrl,
      ctaLabel: item.buttonText,
      href: item.buttonLink,
    })) || fallbackServices

  return (
    <div className="pt-24 min-h-screen bg-stone-50 pb-20">
      <div className="bg-brand-dark text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-serif mb-6 text-white">{title}</h1>
          <p className="text-brand-accent text-xl font-light max-w-2xl mx-auto leading-relaxed italic">
            {intro}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service: any) => (
            <div
              key={service.key || service.title}
              className="bg-white border border-stone-200 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-sm overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[4/3] w-full bg-stone-100">
                {service.image ? (
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-stone-300 font-serif text-5xl">
                    ✿
                  </div>
                )}
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h2 className="text-2xl font-serif text-brand-dark mb-3">{service.title}</h2>
                <p className="text-stone-600 leading-relaxed">{service.description}</p>
                {service.ctaLabel && service.href && (
                  <div className="mt-6">
                    <ResolvedLink
                      link={service.href}
                      className="inline-block px-6 py-2.5 bg-brand text-white text-xs uppercase tracking-widest font-semibold hover:bg-brand-dark transition-colors"
                    >
                      {service.ctaLabel}
                    </ResolvedLink>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
