import Link from 'next/link'
import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { settingsQuery, eventsQuery } from '@/sanity/lib/queries'
import EventList from '@/app/components/EventList'
import NoticeBoard from '@/app/components/NoticeBoard'
import { mockSettings } from '@/app/lib/mock-data'

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
  
  // Use CMS notices if available, otherwise mock notices for demo
  const notices = settings?.notices || mockSettings.notices

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
              href="#hours" 
              className="px-8 py-4 bg-white text-brand-dark font-medium uppercase tracking-widest text-sm hover:bg-brand-accent transition-colors duration-300 shadow-lg"
            >
              Öppettider
            </Link>
            <Link 
              href="/kontakt" 
              className="px-8 py-4 border border-white text-white font-medium uppercase tracking-widest text-sm hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm"
            >
              Hitta hit
            </Link>
          </div>
        </div>
      </section>

      {/* NOTICE BOARD (Anslagstavlan) */}
      <NoticeBoard notices={notices} />

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
                href="/besok-oss"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
            <Link href="/butik" className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden bg-brand-light/10 mb-6">
                <div className="absolute inset-0 bg-brand-dark/20 group-hover:scale-105 transition-transform duration-700 ease-out"></div>
                 {/* Image Placeholder */}
                 <div className="absolute inset-0 flex items-center justify-center text-brand-dark/20 font-serif text-6xl">⚱</div>
              </div>
              <h3 className="text-2xl font-serif text-brand-dark mb-2 group-hover:text-brand transition-colors">Krukor & Inredning</h3>
              <p className="text-stone-600">Handplockade detaljer för ditt hem.</p>
            </Link>

            {/* Card 3 */}
            <Link href="/butik" className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden bg-brand-light/10 mb-6">
                <div className="absolute inset-0 bg-brand/20 group-hover:scale-105 transition-transform duration-700 ease-out"></div>
                 {/* Image Placeholder */}
                 <div className="absolute inset-0 flex items-center justify-center text-brand-dark/20 font-serif text-6xl">❦</div>
              </div>
              <h3 className="text-2xl font-serif text-brand-dark mb-2 group-hover:text-brand transition-colors">Jord & Tillbehör</h3>
              <p className="text-stone-600">Allt du behöver för att lyckas.</p>
            </Link>
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
