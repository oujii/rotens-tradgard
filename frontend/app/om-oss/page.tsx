import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { settingsQuery } from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'Om oss',
  description:
    'Lär känna Rotens Trädgård i Bjursås. Handelsträdgård sedan 1940-talet med fokus på lokalt, härdigt och hållbart – trädgård, konst och kultur i Dalarna.',
}

export default async function OmOssPage() {
  const { data: settings } = await sanityFetch({ query: settingsQuery })

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
          <p className="text-xl text-white/90 font-light max-w-2xl mx-auto drop-shadow-sm font-serif">
            En plats full av liv och glädje i Bjursås.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 max-w-5xl -mt-16 relative z-20">

        {/* INFO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Opening Hours */}
          <div className="bg-white p-8 shadow-sm rounded-sm border-t-4 border-brand">
            <h3 className="text-xl font-serif text-brand-dark mb-4 tracking-wider text-sm font-bold">Öppettider</h3>
            {parsedCustomOpeningHours.length > 0 ? (
              <ul className="space-y-2 text-stone-600">
                {parsedCustomOpeningHours.map((entry: any, index: number) =>
                  entry.value ? (
                    <li key={`${entry.label}-${index}`} className="flex justify-between">
                      <span>{entry.label}</span>
                      <span className="font-bold text-brand-dark">{entry.value}</span>
                    </li>
                  ) : (
                    <li key={`${entry.label}-${index}`} className="font-bold text-brand-dark">
                      {entry.label}
                    </li>
                  ),
                )}
              </ul>
            ) : (
              <ul className="space-y-2 text-stone-600">
                <li className="flex justify-between"><span>Vardagar</span> <span className="font-bold text-brand-dark">{openingHours.weekdays}</span></li>
                <li className="flex justify-between"><span>Lördag</span> <span className="font-bold text-brand-dark">{openingHours.saturday}</span></li>
                <li className="flex justify-between"><span>Söndag</span> <span className="font-bold text-brand-dark">{openingHours.sunday}</span></li>
              </ul>
            )}
          </div>

          {/* Contact */}
          <div className="bg-white p-8 shadow-sm rounded-sm border-t-4 border-brand-light">
            <h3 className="text-xl font-serif text-brand-dark mb-4 tracking-wider text-sm font-bold">Kontakt</h3>
            <div className="space-y-2 text-stone-600">
              <p className="font-bold text-brand-dark">{contactInfo.phone}</p>
              <p>{contactInfo.email}</p>
            </div>
          </div>

          {/* Address */}
          <div className="bg-white p-8 shadow-sm rounded-sm border-t-4 border-accent">
            <h3 className="text-xl font-serif text-brand-dark mb-4 tracking-wider text-sm font-bold">Adress</h3>
            <div className="space-y-2 text-stone-600">
              <p className="font-bold text-brand-dark">{contactInfo.address}</p>
              <p className="text-sm">Mellan Falun och Rättvik.</p>
            </div>
          </div>
        </div>

        {/* OM OSS TEXTBLOCK */}
        <div className="py-20 border-t border-stone-200">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-brand-dark mb-4">Om oss</h2>
            <div className="w-24 h-1 bg-brand mx-auto"></div>
          </div>

          <div className="prose prose-stone prose-lg max-w-3xl mx-auto text-stone-700 mb-20 space-y-14">
            <section>
              <h3 className="font-serif text-brand-dark">Vår historia</h3>
              <p>
                Här på sluttningarna har det sålts växter och blommor sedan 1940-talet.
                Det hela började med Alrik och Tekla som startade upp trädgårdshandeln.
                Därefter har verksamheten drivits vidare av olika eldsjälar på Skovägen 8 i
                Bjursås. Blom-Britta, Blom-Karin, Linn och Lisa har alla utvecklat platsen
                genom åren, och 2023 tog Markus och Carolina över taktpinnen för att
                fortsätta resan med Rotens Trädgård.
              </p>
            </section>

            <section>
              <h3 className="font-serif text-brand-dark">Det här är Rotens</h3>
              <p>
                Rotens ligger beläget på Skovägen 8 i Bjursås, mellan Falun och Rättvik i det
                natursköna Dalarna. I vår handelsträdgård hittar du egenodlade och härdiga
                växter, självplock av blommor och ett brett utbud för hem och trädgård, med
                fokus på miljövänliga val och hållbar kvalitet. Här finns ett lekområde för de
                små trädgårdsmästarna och ett grönt sommarcafé som gör Rotens till ett
                uppskattat besöksmål i Dalarna. Under året fylls platsen av kurser och
                evenemang där trädgård, konst och kultur möts i en familjär miljö som inspirerar
                till liv, glädje och välmående.
              </p>
              <p>
                Vi vill att alla ska lyckas med sin trädgård och känna tjusningen med odling.
                Därför lägger vi stor vikt vid personlig rådgivning och kunskapsdelning. Vi
                erbjuder trädgårdstjänster såsom beskärning och flisning, rådgivning,
                trädgårdsskötsel, enklare anläggning med mera. Vi ger föreläsningar, håller
                kurser och samarbetar med olika aktörer lokalt och regionalt. Rotens kan
                dessutom hyras för gröna konferenser, fester, bröllop eller firande av olika
                slag.
              </p>
            </section>

            <section>
              <h3 className="font-serif text-brand-dark">Vår vision</h3>
              <p>
                Vår vision är att skapa en levande mötesplats där trädgård, konst och kultur
                förenas för att inspirera och bidra till välmående.
              </p>
              <p>
                Vi vill vara en positiv kraft för det lokala och gröna kulturarvet i Dalarna med
                ett erbjudande som värnar om vår miljö.
              </p>
            </section>
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

        {/* TRIPADVISOR */}
        <div className="mt-20 text-center">
          <div id="TA_cdswritereviewlg174" className="TA_cdswritereviewlg">
            <ul id="vcXr0uFGW" className="TA_links kYjkbWK3 list-none p-0">
              <li id="G7UFVEk4H">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.tripadvisor.se/Attraction_Review-g4413994-d32960499-Reviews-Rotens_Tradgard-Bjursas_Falun_Municipality_Dalarna_County.html"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg"
                    alt="Rotens Trädgård på TripAdvisor"
                    width={200}
                    height={44}
                    className="mx-auto"
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

        {/* MAP PLACEHOLDER */}
        <div className="mt-20 h-96 w-full rounded-sm overflow-hidden shadow-sm">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            src="https://maps.google.com/maps?q=Rotens%20Tr%C3%A4dg%C3%A5rd%2C%20Skov%C3%A4gen%208%2C%20Bjurs%C3%A5s&t=&z=15&ie=UTF8&iwloc=&output=embed"
            title="Karta till Rotens Trädgård"
            className="grayscale hover:grayscale-0 transition-all duration-700"
          ></iframe>
        </div>

      </div>
    </div>
  )
}
