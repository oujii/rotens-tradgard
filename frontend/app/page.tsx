import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
import { sanityFetch } from '@/sanity/lib/live'
import { settingsQuery, eventsQuery } from '@/sanity/lib/queries'
import EventList from '@/app/components/EventList'
import ResolvedLink from '@/app/components/ResolvedLink'
import Newsletter from '@/app/components/Newsletter'

export const metadata: Metadata = {
  title: {
    absolute: 'Rotens Trädgård i Bjursås | Handelsträdgård, café & besöksmål i Dalarna',
  },
  description:
    'Besök Rotens Trädgård i Bjursås mellan Falun och Rättvik. Handelsträdgård, växthus, café, evenemang och hållbara, lokala val i natursköna Dalarna.',
}

export default async function Page() {
  const { data: settings } = await sanityFetch({ query: settingsQuery })
  const { data: events } = await sanityFetch({ query: eventsQuery })

  // Fallback values if settings are not yet populated in CMS
  const heroVideoUrl = settings?.heroVideoUrl || '/video.mp4' // Default to local video if no CMS video
  const openingHours = settings?.openingHours || {
    weekdays: '10 - 18',
    saturday: '10 - 15',
    sunday: 'Stängt'
  }
  const customOpeningHoursLines =
    settings?.openingHours?.customText
      ?.split('\n')
      .map((line: string) => line.trim())
      .filter(Boolean) || []
  const parsedCustomOpeningHours = customOpeningHoursLines.map((line: string) => {
    const separatorIndex = line.indexOf(':')
    if (separatorIndex === -1) {
      return { label: line, value: null }
    }

    const label = line.slice(0, separatorIndex).trim()
    const value = line.slice(separatorIndex + 1).trim()
    if (!label || !value) {
      return { label: line, value: null }
    }

    return { label, value }
  })
  const contactInfo = settings?.contactInfo || {
    address: 'Skovägen 8, 790 21 Bjursås, Dalarna',
    phone: '(+46) 73 738 48 53',
    email: 'info@rotenstradgard.se'
  }
  const fallbackAssortmentItems = [
    {
      _key: 'vaxter',
      title: 'Växter',
      description: 'Lokalt, härdigt, svenskodlat och hög kvalitet - det speglar vårt växtutbud.',
      imageUrl: null,
      icon: '✿',
      link: { linkType: 'href', href: '/butik' },
    },
    {
      _key: 'redskap-tillbehor',
      title: 'Redskap & tillbehör',
      description: 'Kvalitetsredskap och tillbehör som hjälper dig att lyckas i din trädgård.',
      imageUrl: null,
      icon: '⚱',
      link: { linkType: 'href', href: '/butik' },
    },
    {
      _key: 'jord-jordkompisar',
      title: 'Jord & jordkompisar',
      description: 'Brett utbud av jordar och kompisar som bidrar med ny kraft till trötta jordar.',
      imageUrl: null,
      icon: '❦',
      link: { linkType: 'href', href: '/butik' },
    },
    {
      _key: 'inredning-presentartiklar',
      title: 'Inredning & presentartiklar',
      description: 'Noga utvalt sortiment av krukor, vaser, ätbart och diverse vackra ting.',
      imageUrl: null,
      icon: '✦',
      link: { linkType: 'href', href: '/butik' },
    },
  ]
  const assortmentItems =
    settings?.assortmentItems && settings.assortmentItems.length > 0
      ? settings.assortmentItems
      : fallbackAssortmentItems

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION WITH VIDEO */}
      <section className="relative h-[85vh] flex items-center justify-center bg-brand-dark text-white overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
        >
          <source src={heroVideoUrl} type="video/mp4" />
        </video>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50 z-0"></div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-10">
          {/* LOGO IN HERO */}
          <div className="relative w-[300px] h-[150px] md:w-[500px] md:h-[250px] mx-auto drop-shadow-2xl">
            <Image
              src="/images/logo.webp"
              alt="Rotens Trädgård"
              fill
              className="object-contain"
              priority
            />
          </div>

          <p className="text-xl md:text-3xl font-light tracking-wide text-white/90 max-w-2xl mx-auto drop-shadow-md font-serif italic">
            Din handelsträdgård i hjärtat av Dalarna.
          </p>
          <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#events"
              className="px-8 py-4 bg-white text-brand-dark font-medium uppercase tracking-widest text-sm hover:bg-brand-accent transition-colors duration-300 shadow-lg"
            >
              På gång
            </Link>
            <Link
              href="/om-oss"
              className="px-8 py-4 border border-white text-white font-medium uppercase tracking-widest text-sm hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm"
            >
              Hitta hit
            </Link>
          </div>

          {/* OPENING HOURS MINI */}
          <div className="text-white/80 text-[11px] md:text-xs font-medium uppercase tracking-widest space-y-1">
            {parsedCustomOpeningHours.length > 0 ? (
              parsedCustomOpeningHours.map((entry: any, i: number) => (
                <div key={i}>
                  <span className="opacity-70 mr-2">{entry.label}:</span>
                  {entry.value && <span>{entry.value}</span>}
                </div>
              ))
            ) : (
              <div className="flex flex-col md:flex-row gap-x-6 gap-y-1 justify-center items-center">
                <span><span className="opacity-70 mr-1">Vardagar</span> {openingHours.weekdays}</span>
                <span><span className="opacity-70 mr-1">Lördag</span> {openingHours.saturday}</span>
                <span><span className="opacity-70 mr-1">Söndag</span> {openingHours.sunday}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="py-20 md:py-32 bg-stone-50 text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-serif text-brand-dark mb-8">
            Det här är Rotens
          </h2>
          <p className="text-lg text-stone-600 leading-relaxed mb-6">
            I vår handelsträdgård på Skovägen 8 i Bjursås (mellan Falun och Rättvik) hittar
            du egenodlade och härdiga växter, självplock av blommor och ett brett utbud för
            hem och trädgård med fokus på miljövänliga val och hållbar kvalitet. Under året
            fylls platsen av kurser och evenemang där trädgård, konst och kultur möts i en
            familjär miljö som inspirerar till liv, glädje och välmående.
          </p>
          <p className="text-lg text-stone-600 leading-relaxed mb-10">
            Rotens-gänget står även redo att hjälpa dig med din trädgård.
            Trädgårdsrådgivning, beskärning, trädgårdsskötsel, planering och plantering,
            kontakta oss så berättar vi mer!
          </p>

          <div className="flex flex-col items-center gap-4 mb-10">
            <p className="text-sm uppercase tracking-[0.3em] text-stone-500">Följ vår resa</p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/rotenstradgard/"
                aria-label="Rotens Trädgård på Instagram"
                className="text-brand-dark/80 hover:text-brand transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                <svg viewBox="0 0 16 16" className="w-6 h-6" fill="currentColor" aria-hidden="true">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/rotenstradgard/?locale=sv_SE"
                aria-label="Rotens Trädgård på Facebook"
                className="text-brand-dark/80 hover:text-brand transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true">
                  <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24H12.82v-9.294H9.692V11.01h3.128V8.41c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.313h3.587l-.467 3.696h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="w-24 h-1 bg-brand mx-auto"></div>
        </div>
      </section>

      {/* HANDELSTRADGARD SECTION */}


      {/* EVENTS SECTION (Dynamic) */}
      <section id="events" className="py-20 bg-stone-100 scroll-mt-20">
        <div className="container mx-auto px-6">


          {/* Use Sanity data if available, otherwise show message or fallback */}
          <EventList events={events.map((e: any) => ({
            id: e._id,
            title: e.title,
            slug: e.slug,
            date: e.date,
            image: e.image, // Ensure your EventList handles undefined images if needed
            bookingUrl: e.bookingUrl || '#'
          }))} />
        </div>
      </section>


      {/* NEWSLETTER SECTION */}
      <Newsletter />

      {/* GRID SECTION (Categories) */}
      <section className="py-20 pb-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-serif text-brand-dark mb-12 text-center">Vårt sortiment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {assortmentItems.map((item: any, index: number) => {
              const title = item?.title || 'Sortiment'
              const description = item?.description || ''
              const imageUrl = item?.imageUrl || null
              const icon = item?.icon || '✿'
              const key = item?._key || `${title}-${index}`
              const cardContent = (
                <>
                  <div className="relative aspect-[3/4] overflow-hidden bg-brand-light/10 mb-6">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-brand-light/20 group-hover:scale-105 transition-transform duration-700 ease-out"></div>
                        <div className="absolute inset-0 flex items-center justify-center text-brand-dark/20 font-serif text-6xl">
                          {icon}
                        </div>
                      </>
                    )}
                  </div>
                  <h3 className="text-2xl font-serif text-brand-dark mb-2 group-hover:text-brand transition-colors">
                    {title}
                  </h3>
                  <p className="text-stone-600">{description}</p>
                </>
              )

              return (
                <div key={key} className="group">
                  {cardContent}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* NEWSLETTER SECTION */}


      {/* INFO / CTA SECTION */}
      <section id="hours" className="py-20 bg-brand-dark text-white">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-serif text-white mb-6">Besök oss</h2>
            <div className="space-y-4 text-lg font-light text-white/90">
              <p>
                <strong className="block text-accent-pop uppercase tracking-wider text-sm mb-1">Adress</strong>
                {contactInfo.address}
              </p>
              <p>
                <strong className="block text-accent-pop uppercase tracking-wider text-sm mb-1">Telefon</strong>
                {contactInfo.phone}
              </p>
              <p>
                <strong className="block text-accent-pop uppercase tracking-wider text-sm mb-1">E-post</strong>
                {contactInfo.email}
              </p>
            </div>

            {/* TripAdvisor Widget */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div id="TA_cdswritereviewlg174" className="TA_cdswritereviewlg">
                <ul id="vcXr0uFGW" className="TA_links kYjkbWK3">
                  <li id="G7UFVEk4H" className="tripadvisor-link">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.tripadvisor.com/Attraction_Review-g4413994-d32960499-Reviews-Rotens_Tradgard-Bjursas_Falun_Municipality_Dalarna_County.html"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg"
                        alt="Rotens Trädgård på TripAdvisor"
                        width={180}
                        height={40}
                        style={{ filter: 'brightness(0) invert(1)' }}
                      />
                    </a>
                  </li>
                </ul>
              </div>
              <Script
                src="https://www.jscache.com/wejs?wtype=cdswritereviewlg&uniq=174&locationId=32960499&lang=sv_SE&display_version=2"
                strategy="lazyOnload"
              />
            </div>
          </div>

          <div className="bg-white/5 p-8 md:p-12 border border-white/10 rounded-sm">
            <h3 className="text-2xl font-serif text-white mb-6">Öppettider</h3>
            {parsedCustomOpeningHours.length > 0 ? (
              <ul className="space-y-3 text-lg font-light">
                {parsedCustomOpeningHours.map((entry: any, index: number) => {
                  const isLast = index === parsedCustomOpeningHours.length - 1
                  const borderClass = isLast ? '' : 'border-b border-white/10'

                  if (entry.value) {
                    return (
                      <li
                        key={`${entry.label}-${index}`}
                        className={`flex justify-between pb-2 ${borderClass}`.trim()}
                      >
                        <span className="text-white/80">{entry.label}</span>
                        <span className="text-white font-medium">{entry.value}</span>
                      </li>
                    )
                  }

                  return (
                    <li
                      key={`${entry.label}-${index}`}
                      className={`pb-2 text-white font-medium ${borderClass}`.trim()}
                    >
                      {entry.label}
                    </li>
                  )
                })}
              </ul>
            ) : (
              <ul className="space-y-3 text-lg font-light">
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/80">Vardagar</span>
                  <span className="text-white font-medium">{openingHours.weekdays}</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/80">Lördag</span>
                  <span className="text-white font-medium">{openingHours.saturday}</span>
                </li>
                <li className="flex justify-between pb-2">
                  <span className="text-white/80">Söndag</span>
                  <span className="text-white font-medium">{openingHours.sunday}</span>
                </li>
              </ul>
            )}
          </div>
        </div>
      </section>
    </div >
  )
}
