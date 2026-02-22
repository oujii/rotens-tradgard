import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { sv } from 'date-fns/locale'
import { PortableText } from '@portabletext/react'
import { sanityFetch } from '@/sanity/lib/live'
import { eventQuery, eventsQuery } from '@/sanity/lib/queries'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const { data: events } = await sanityFetch({
    query: eventsQuery,
    perspective: 'published',
    stega: false,
  })
  return events.map((e: any) => ({ slug: e.slug?.current || e.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data: event } = await sanityFetch({
    query: eventQuery,
    params: { slug },
    stega: false,
  })

  if (!event) return {}

  const dateStr = event.date
    ? format(new Date(event.date), "d MMMM yyyy", { locale: sv })
    : ''

  return {
    title: event.title,
    description: `${event.title}${dateStr ? ` – ${dateStr}` : ''} på Rotens Trädgård i Bjursås.${event.price ? ` Pris: ${event.price}.` : ''}`,
    openGraph: event.image ? { images: [{ url: event.image }] } : undefined,
  }
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params
  const { data: event } = await sanityFetch({ 
    query: eventQuery, 
    params: { slug } 
  })

  if (!event) {
    notFound()
  }

  // LOGIC FOR BUTTONS (Hybrid Model)
  let actionButton = null

  if (!event.bookingUrl) {
    // Scenario C: Free / Drop-in
    actionButton = (
      <div className="inline-flex items-center justify-center px-8 py-4 bg-brand-light/20 text-brand-dark font-medium uppercase tracking-widest text-sm rounded-sm cursor-default">
        Fri entré / Drop-in
      </div>
    )
  } else if (event.bookingUrl.includes('stripe.com')) {
    // Scenario A: Paid Event (Stripe)
    actionButton = (
      <a 
        href={event.bookingUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center px-8 py-4 bg-brand text-white font-medium uppercase tracking-widest text-sm hover:bg-brand-dark transition-colors rounded-sm shadow-md hover:shadow-lg"
      >
        Köp Biljett
      </a>
    )
  } else {
    // Scenario B: Signup (Google Forms, Cal.com, etc)
    actionButton = (
      <a 
        href={event.bookingUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center px-8 py-4 bg-brand text-white font-medium uppercase tracking-widest text-sm hover:bg-brand-dark transition-colors rounded-sm shadow-md hover:shadow-lg"
      >
        Boka Plats
      </a>
    )
  }

  const eventJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    startDate: event.date,
    ...(event.image && { image: event.image }),
    ...(event.price && { offers: { '@type': 'Offer', price: event.price, priceCurrency: 'SEK' } }),
    location: {
      '@type': 'Place',
      name: 'Rotens Trädgård',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Skovägen 8',
        addressLocality: 'Bjursås',
        postalCode: '790 21',
        addressCountry: 'SE',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'Rotens Trädgård',
      url: 'https://www.rotenstradgard.se',
    },
  }

  return (
    <div className="pt-24 min-h-screen bg-stone-50 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <div className="container mx-auto px-6 max-w-4xl">

        {/* Breadcrumb / Back Link */}
        <div className="py-6">
          <Link href="/" className="text-sm font-medium text-stone-500 hover:text-brand transition-colors">
             &larr; Tillbaka till startsidan
          </Link>
        </div>

        <div className="bg-white shadow-sm rounded-sm overflow-hidden">
          {/* Hero Image */}
          <div className="relative aspect-video w-full bg-stone-200">
            {event.image ? (
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-brand-light/10 text-brand-dark/20 text-6xl">
                🗓
              </div>
            )}
          </div>

          <div className="p-8 md:p-12">
            {/* Header Info */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8 border-b border-stone-100 pb-8">
              <div>
                <div className="text-brand font-medium uppercase tracking-wider text-sm mb-2">
                  {format(new Date(event.date), "EEEE d MMMM, 'kl' HH:mm", { locale: sv })}
                </div>
                <h1 className="text-4xl md:text-5xl font-serif text-brand-dark mb-4">{event.title}</h1>
                {event.price && (
                  <p className="text-xl text-stone-600 font-medium">
                    Pris: {event.price}
                  </p>
                )}
              </div>

              {/* Action Button (Desktop position) */}
              <div className="hidden md:block flex-shrink-0">
                {actionButton}
              </div>
            </div>

            {/* Description (Rich Text) */}
            <div className="prose prose-stone prose-lg max-w-none text-stone-700">
              {event.description ? (
                 <PortableText value={event.description} />
              ) : (
                <p className="italic text-stone-500">Ingen beskrivning tillgänglig än.</p>
              )}
            </div>

            {/* Action Button (Mobile position) */}
            <div className="mt-12 md:hidden">
               {actionButton}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
