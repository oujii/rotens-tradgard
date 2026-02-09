import Link from 'next/link'
import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { settingsQuery } from '@/sanity/lib/queries'

export default async function BesokOssPage() {
  const { data: settings } = await sanityFetch({ query: settingsQuery })
  
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
    <div className="pt-24 min-h-screen bg-stone-50 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative h-[50vh] flex items-center justify-center bg-brand-dark overflow-hidden">
         <div className="absolute inset-0 bg-brand-dark opacity-50 z-0"></div>
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
         
         <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-4 drop-shadow-md">
              Välkommen till oss
            </h1>
            <p className="text-xl text-accent-pop font-light max-w-2xl mx-auto drop-shadow-sm font-serif italic">
               En plats full av liv och glädje i Bjursås.
            </p>
         </div>
      </section>

      <div className="container mx-auto px-6 max-w-5xl -mt-16 relative z-20">
        
        {/* INFO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Opening Hours */}
          <div className="bg-white p-8 shadow-sm rounded-sm border-t-4 border-brand">
            <h3 className="text-xl font-serif text-brand-dark mb-4 uppercase tracking-wider text-sm font-bold">Öppettider</h3>
            <ul className="space-y-2 text-stone-600">
              <li className="flex justify-between"><span>Vardagar</span> <span className="font-bold text-brand-dark">{openingHours.weekdays}</span></li>
              <li className="flex justify-between"><span>Lördag</span> <span className="font-bold text-brand-dark">{openingHours.saturday}</span></li>
              <li className="flex justify-between"><span>Söndag</span> <span className="font-bold text-brand-dark">{openingHours.sunday}</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="bg-white p-8 shadow-sm rounded-sm border-t-4 border-brand-light">
            <h3 className="text-xl font-serif text-brand-dark mb-4 uppercase tracking-wider text-sm font-bold">Kontakt</h3>
            <div className="space-y-2 text-stone-600">
              <p className="font-bold text-brand-dark">{contactInfo.phone}</p>
              <p>{contactInfo.email}</p>
            </div>
          </div>

          {/* Address */}
          <div className="bg-white p-8 shadow-sm rounded-sm border-t-4 border-accent">
            <h3 className="text-xl font-serif text-brand-dark mb-4 uppercase tracking-wider text-sm font-bold">Adress</h3>
            <div className="space-y-2 text-stone-600">
              <p className="font-bold text-brand-dark">{contactInfo.address}</p>
              <p className="text-sm">Mellan Falun och Rättvik.</p>
            </div>
          </div>
        </div>

        {/* HISTORY (From Om oss) */}
        <div className="py-20 border-t border-stone-200">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-brand-dark mb-4">Vår historia</h2>
            <div className="w-24 h-1 bg-brand mx-auto"></div>
          </div>

          <div className="prose prose-stone prose-lg max-w-3xl mx-auto text-stone-700 mb-20">
            <p>
              Här på sluttningarna har det sålts växter och blommor sedan 1940-talet. 
              Det hela började med Alrik och Tekla som startade upp trädgårdshandeln.
              Därefter drevs verksamheten vidare av Blom-Britta respektive Blom-Karin under många år.
            </p>
            <p>
              Nu fortsätter vi den resan med Rotens Trädgård! Vår vision är att skapa en familjär mötesplats där trädgård, konst och kultur kan mötas.
            </p>
          </div>

          <div className="bg-brand-light/10 p-8 md:p-16 text-center rounded-sm">
             <div className="relative aspect-[3/4] max-w-sm mx-auto mb-8 shadow-xl rotate-1">
                <Image 
                  src="/images/markus_carolina.webp"
                  alt="Markus Rosendal och Carolina Redman"
                  fill
                  className="object-cover rounded-sm"
                />
             </div>
             <h3 className="text-3xl font-serif text-brand-dark mb-2">Markus & Carolina</h3>
             <p className="text-brand font-medium uppercase tracking-wider text-sm mb-6">Driver Rotens Trädgård</p>
             <p className="text-lg text-stone-700 italic max-w-2xl mx-auto leading-relaxed">
               "Tillsammans med er vill vi skapa en trädgård full av liv och glädje!"
             </p>
          </div>
        </div>

        {/* MAP PLACEHOLDER */}
        <div className="mt-20 h-96 bg-stone-200 w-full rounded-sm flex items-center justify-center text-stone-500 font-mono text-sm uppercase tracking-widest">
           [ Interaktiv karta kommer här ]
        </div>

      </div>
    </div>
  )
}
