import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { sv } from 'date-fns/locale'

interface Event {
  id: string
  title: string
  slug?: { current: string }
  date: string
  image: string
  bookingUrl: string
}

export default function EventList({ events }: { events: Event[] }) {
  // Filter out past events
  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  if (upcomingEvents.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {upcomingEvents.map(event => (
        <Link 
          key={event.id} 
          href={event.slug?.current ? `/event/${event.slug.current}` : '#'}
          className="group block bg-white border border-stone-200 overflow-hidden hover:border-brand-light transition-colors"
        >
          <div className="relative h-48 bg-stone-100 flex items-center justify-center overflow-hidden">
             {event.image ? (
               <Image
                 src={event.image}
                 alt={event.title}
                 fill
                 className="object-cover group-hover:scale-105 transition-transform duration-500"
                 sizes="(max-width: 768px) 100vw, 33vw"
               />
             ) : (
               <>
                 <div className="absolute inset-0 bg-stone-200 group-hover:scale-105 transition-transform duration-500"></div>
                 <span className="relative text-stone-400 font-serif text-4xl z-10">🗓</span>
               </>
             )}
          </div>
          <div className="p-6">
            <div className="text-sm font-medium text-brand uppercase tracking-wider mb-2">
              {format(new Date(event.date), 'd MMMM yyyy', { locale: sv })}
            </div>
            <h3 className="text-xl font-serif text-brand-dark group-hover:text-brand transition-colors">
              {event.title}
            </h3>
            <div className="mt-4 flex items-center text-sm font-medium text-stone-500 group-hover:text-brand-dark">
              Läs mer & Boka &rarr;
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
