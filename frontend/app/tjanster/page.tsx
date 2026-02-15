import Image from 'next/image'

import ResolvedLink from '@/app/components/ResolvedLink'
import {sanityFetch} from '@/sanity/lib/live'
import {servicesPageQuery} from '@/sanity/lib/queries'

export default async function TjansterPage() {
  const {data: servicesPage} = await sanityFetch({query: servicesPageQuery})

  const fallbackServices = [
    {
      title: 'Växter',
      description:
        'Vi odlar en stor del av våra växter lokalt. Sommarblommor, grönsaksplantor, träd, buskar och perenner. Vi erbjuder självplock av snittblommor under sommaren.',
      details:
        'Våra ledord är lokalt, härdigt, svenskodlat av hög kvalitet - det speglar vårt växtutbud på Rotens. Hos oss kan man förbeställa de växter man önskar, för leverans i slutet av april samt i slutet av augusti. På så sätt bidrar man även till färre transporter och minskat svinn.',
      image:
        'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1200&auto=format&fit=crop',
      ctaLabel: 'Skicka växtförfrågan',
      href: {linkType: 'href', href: '/kontakt?val=vaxtbestallning'},
    },
    {
      title: 'Personlig rådgivning',
      description:
        'På Rotens ger vi personlig rådgivning kring val av växter, plantering och placering.',
      details:
        'Vi utgår alltid från dina önskemål och din trädgårds förutsättningar. Om så önskas erbjuder vi hembesök där vi analyserar platsen och återkommer med förslag.',
      image:
        'https://images.unsplash.com/photo-1416870213410-d93130d2268b?q=80&w=1200&auto=format&fit=crop',
      ctaLabel: 'Boka rådgivning',
      href: {linkType: 'href', href: '/kontakt?val=radgivning'},
    },
    {
      title: 'Beskärning & Skötsel',
      description:
        'Vi beskär frukt- och prydnadsträd, buskar och häckar och kan sköta dina grönytor löpande under året.',
      details:
        'Vi erbjuder både uppbyggnads- och underhållsbeskärning med kunskap och precision. Om så önskas forslar vi bort växtmaterialet, alternativt flisar upp det på plats. Häckklippning, buskar, plantering och enklare anläggning - vi finns här för dig!',
      image:
        'https://images.unsplash.com/photo-1599591037488-8260408f657d?q=80&w=1200&auto=format&fit=crop',
      ctaLabel: 'Boka beskärning',
      href: {linkType: 'href', href: '/kontakt?val=beskaring-skotsel'},
    },
    {
      title: 'Binderi & Floristik',
      description:
        'Vi gör blomsterbinderier för livets alla skeenden, alltifrån bröllop, fest och begravning till en fredagsbukett.',
      details:
        'Vår odling gör att vi är självförsörjande på snittblommor under sommaren och under vårvintern odlar vi egna tulpaner. Vi jobbar i möjligaste mån efter säsong, med naturmaterial och med ambitionen att minimera svinn och transporter. Under våra öppettider levererar vi blombud inom Bjursås med omnejd. Större leveranser ordnas enligt överenskommelse. Planerar du ett bröllop eller en begravning? Kontakta oss för ett första möte så berättar vi mer.',
      image:
        'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=1200&auto=format&fit=crop',
      ctaLabel: 'Kontakta binderi',
      href: {linkType: 'href', href: '/kontakt?val=binderier'},
    },
    {
      title: 'Workshop & Föreläsningar',
      description:
        'Kom och lär dig något nytt hos oss! Vi erbjuder en rad workshops och föreläsningar med fokus på hållbarhet, odling och trädgårdskultur för privatpersoner, företag och föreningar.',
      details:
        'Vill ni hellre att vi kommer till er? Boka oss gärna som gästföreläsare på ert företag, event eller seminarium - vi älskar mötet med människor, att inspirera och dela med oss av kunskap.',
      image:
        'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1200&auto=format&fit=crop',
      ctaLabel: 'Boka workshop',
      href: {linkType: 'href', href: '/kontakt?val=workshop-forelasningar'},
    },
    {
      title: 'Fest & Konferens',
      description:
        'Välkommen att boka Rotens för ditt speciella tillfälle. Vi erbjuder även gröna och kreativa konferenser.',
      details:
        'Vill du ha fest i det gröna? Eller ta med dig teamet bort från kontoret en stund? Rotens står till ditt förfogande. Vi har ytor för att husera sällskap i växthuset såväl som i trädgården, allt utifrån årstidens förutsättningar. Mat och dryck kan ordnas enligt önskemål. Vi skräddarsyr din upplevelse.',
      image:
        'https://images.unsplash.com/photo-1515165562835-c4cfa5ca4e0e?q=80&w=1200&auto=format&fit=crop',
      ctaLabel: 'Skicka förfrågan',
      href: {linkType: 'href', href: '/kontakt?val=fest-konferens'},
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <span className="mt-3 inline-flex items-center gap-2 text-sm uppercase tracking-widest text-brand transition-colors group-open:text-brand-dark">
                          Läs mer
                          <span className="text-lg leading-none">+</span>
                        </span>
                      </div>
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
