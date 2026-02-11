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
      details: '',
      image:
        'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1200&auto=format&fit=crop',
      ctaLabel: 'Till butiken',
      href: {linkType: 'href', href: '/butik'},
    },
    {
      title: 'Trädgård & Café',
      description: 'En grön oas att strosa i, med sommarkafé för fika i det fria.',
      details: '',
      image:
        'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop',
      ctaLabel: 'Besök oss',
      href: {linkType: 'href', href: '/om-oss'},
    },
    {
      title: 'Trädgårdstjänster',
      description: 'Skötsel, beskärning och hjälp på plats – anpassat efter din trädgård.',
      details: '',
      image:
        'https://images.unsplash.com/photo-1599591037488-8260408f657d?q=80&w=1200&auto=format&fit=crop',
      ctaLabel: 'Boka hjälp',
      href: {linkType: 'href', href: '/kontakt?val=beskaring-skotsel'},
    },
    {
      title: 'Binderier / Blombud',
      description: 'Personliga blomsterarrangemang och leverans vid önskemål.',
      details: '',
      image:
        'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=1200&auto=format&fit=crop',
      ctaLabel: 'Beställ binderi',
      href: {linkType: 'href', href: '/kontakt?val=binderier'},
    },
    {
      title: 'Events',
      description: 'Marknadsdagar och upplevelser som samlar trädgårdsintresserade.',
      details: '',
      image:
        'https://images.unsplash.com/photo-1515165562835-c4cfa5ca4e0e?q=80&w=1200&auto=format&fit=crop',
      ctaLabel: 'Se kommande events',
      href: {linkType: 'href', href: '/#events'},
    },
    {
      title: 'Föreläsningar & workshops',
      description: 'Inspirerande tillfällen med fokus på odling, jord och säsong.',
      details: '',
      image:
        'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1200&auto=format&fit=crop',
      ctaLabel: 'Fråga om plats',
      href: {linkType: 'href', href: '/kontakt?val=workshop-forelasningar'},
    },
    {
      title: 'Rådgivning',
      description: 'Personlig vägledning för val av växter, planering och form.',
      details: '',
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
      details: item.details,
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service: any) => {
            const summaryText = service.description
            const detailText = service.details || service.description

            return (
              <details
                key={service.key || service.title}
                className="group bg-white border border-stone-200 rounded-sm shadow-sm open:shadow-md transition-shadow duration-300"
              >
                <summary className="cursor-pointer list-none px-6 py-5 [&::-webkit-details-marker]:hidden">
                  <div className="space-y-4">
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-100 rounded-sm">
                      {service.image ? (
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 480px"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-stone-300 font-serif text-4xl">
                          ✿
                        </div>
                      )}
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h2 className="text-2xl font-serif text-brand-dark mb-2">{service.title}</h2>
                        {summaryText && (
                          <p
                            className="text-stone-600 leading-relaxed"
                            style={{
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {summaryText}
                          </p>
                        )}
                      </div>
                      <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone-200 text-stone-500 transition-transform duration-300 group-open:rotate-45">
                        +
                      </span>
                    </div>
                  </div>
                </summary>
                <div className="px-6 pb-6 pt-4 border-t border-stone-100">
                  <div className="space-y-4">
                    {detailText && (
                      <p className="text-stone-600 leading-relaxed">{detailText}</p>
                    )}
                    {service.ctaLabel && service.href && (
                      <ResolvedLink
                        link={service.href}
                        className="inline-block px-6 py-2.5 bg-brand text-white text-xs uppercase tracking-widest font-semibold hover:bg-brand-dark transition-colors"
                      >
                        {service.ctaLabel}
                      </ResolvedLink>
                    )}
                  </div>
                </div>
              </details>
            )
          })}
        </div>
      </div>
    </div>
  )
}
