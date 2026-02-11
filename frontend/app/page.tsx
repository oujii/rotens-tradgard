import Link from 'next/link'
import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { settingsQuery, eventsQuery } from '@/sanity/lib/queries'
import EventList from '@/app/components/EventList'

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
  const contactInfo = settings?.contactInfo || {
    address: 'Skovägen 8, 790 21 Bjursås, Dalarna',
    phone: '(+46) 73 738 48 53',
    email: 'info@rotenstradgard.se'
  }
  
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
            En handelsträdgård i hjärtat av Dalarna.
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
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="py-20 md:py-32 bg-stone-50 text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-serif text-brand-dark mb-8">
            En plats för växande och inspiration
          </h2>
          <p className="text-lg text-stone-600 leading-relaxed mb-10">
            Välkommen till en handelsträdgård där kunskap och kvalitet står i fokus. 
            Vi har ett brett sortiment av växter anpassade för vårt klimat, 
            vackra krukor och inredning för både ute och inne.
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
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true">
                  <path d="M12 0c3.259 0 3.667.012 4.947.071 1.17.054 1.806.249 2.228.415.562.219.964.48 1.387.903.423.423.684.825.903 1.387.166.422.361 1.058.415 2.228.059 1.28.071 1.688.071 4.947s-.012 3.667-.071 4.947c-.054 1.17-.249 1.806-.415 2.228-.219.562-.48.964-.903 1.387-.423.423-.825.684-1.387.903-.422.166-1.058.361-2.228.415-1.28.059-1.688.071-4.947.071s-3.667-.012-4.947-.071c-1.17-.054-1.806-.249-2.228-.415-.562-.219-.964-.48-1.387-.903-.423-.423-.684-.825-.903-1.387-.166-.422-.361-1.058-.415-2.228C.012 15.667 0 15.259 0 12s.012-3.667.071-4.947c.054-1.17.249-1.806.415-2.228.219-.562.48-.964.903-1.387.423-.423.825-.684 1.387-.903.422-.166 1.058-.361 2.228-.415C8.333.012 8.741 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.165a4.003 4.003 0 1 1 0-8.006 4.003 4.003 0 0 1 0 8.006zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
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

      {/* SUMMER CAFE SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm shadow-lg bg-stone-100">
            <Image
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1600&auto=format&fit=crop"
              alt="Sommarkafé på Rotens Trädgård"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif text-brand-dark">
              Välkommen till sommarkaféet
            </h2>
            <p className="text-lg text-stone-700 leading-relaxed">
              Slå dig ner bland grönskan och njut av en kopp kaffe, något hembakat
              och lugnet i trädgården. Hos oss är du alltid varmt välkommen – oavsett
              om du bara vill ta en paus eller göra ett längre besök.
            </p>
            <div>
              <Link
                href="/om-oss"
                className="inline-block px-8 py-3 border border-brand text-brand hover:bg-brand hover:text-white transition-colors uppercase tracking-widest text-sm font-medium"
              >
                Besök oss
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS SECTION (Dynamic) */}
      <section id="events" className="py-20 bg-stone-100 scroll-mt-20">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-brand-dark mb-2">På gång</h2>
              <p className="text-stone-600">Workshops, föreläsningar och marknadsdagar.</p>
            </div>
          </div>
          
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

      {/* GRID SECTION (Categories) */}
      <section className="py-20 pb-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-serif text-brand-dark mb-12 text-center">Vårt sortiment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <Link href="/butik" className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden bg-brand-light/10 mb-6">
                <div className="absolute inset-0 bg-brand-light/20 group-hover:scale-105 transition-transform duration-700 ease-out"></div>
                {/* Image Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-brand-dark/20 font-serif text-6xl">✿</div>
              </div>
              <h3 className="text-2xl font-serif text-brand-dark mb-2 group-hover:text-brand transition-colors">Växter</h3>
              <p className="text-stone-600">Från tåliga perenner till sommarblommor.</p>
            </Link>

            {/* Card 2 */}
            <div className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-brand-light/10 mb-6">
                <div className="absolute inset-0 bg-brand-dark/20 group-hover:scale-105 transition-transform duration-700 ease-out"></div>
                 {/* Image Placeholder */}
                 <div className="absolute inset-0 flex items-center justify-center text-brand-dark/20 font-serif text-6xl">⚱</div>
              </div>
              <h3 className="text-2xl font-serif text-brand-dark mb-2">Redskap & tillbehör</h3>
              <p className="text-stone-600">Allt för plantering, skötsel och säsong.</p>
            </div>

            {/* Card 3 */}
            <div className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-brand-light/10 mb-6">
                <div className="absolute inset-0 bg-brand/20 group-hover:scale-105 transition-transform duration-700 ease-out"></div>
                 {/* Image Placeholder */}
                 <div className="absolute inset-0 flex items-center justify-center text-brand-dark/20 font-serif text-6xl">❦</div>
              </div>
              <h3 className="text-2xl font-serif text-brand-dark mb-2">Jord & jordkompisar</h3>
              <p className="text-stone-600">Näring, jord och smarta jordtips.</p>
            </div>

            {/* Card 4 */}
            <div className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-brand-light/10 mb-6">
                <div className="absolute inset-0 bg-brand-light/20 group-hover:scale-105 transition-transform duration-700 ease-out"></div>
                {/* Image Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-brand-dark/20 font-serif text-6xl">✦</div>
              </div>
              <h3 className="text-2xl font-serif text-brand-dark mb-2">Inredning & presentartiklar</h3>
              <p className="text-stone-600">Utvalda detaljer för hem och gåvor.</p>
            </div>
          </div>
        </div>
      </section>

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
          </div>
          
          <div className="bg-white/5 p-8 md:p-12 border border-white/10 rounded-sm">
            <h3 className="text-2xl font-serif text-white mb-6">Öppettider</h3>
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
          </div>
        </div>
      </section>
    </div>
  )
}
