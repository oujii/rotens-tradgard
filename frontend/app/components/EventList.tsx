'use client'

import React, { useState } from 'react'
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

type FilterStatus = 'upcoming' | 'past' | 'all'

export default function EventList({ events }: { events: Event[] }) {
  const [filter, setFilter] = useState<FilterStatus>('upcoming')
  const [visibleCount, setVisibleCount] = useState(6)

  const now = new Date()

  // Filter logic
  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date)
    if (filter === 'upcoming') return eventDate >= now
    if (filter === 'past') return eventDate < now
    return true
  })

  // Sort logic
  const sortedEvents = filteredEvents.sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    const isPastA = dateA < now.getTime()
    const isPastB = dateB < now.getTime()

    if (filter === 'upcoming') return dateA - dateB
    if (filter === 'past') return dateB - dateA

    if (!isPastA && !isPastB) return dateA - dateB
    if (isPastA && isPastB) return dateB - dateA
    return isPastA ? 1 : -1
  })

  const displayedEvents = sortedEvents.slice(0, visibleCount)
  const hasMore = sortedEvents.length > visibleCount

  const filterOptions: { label: string, value: FilterStatus }[] = [
    { label: 'Kommande', value: 'upcoming' },
    { label: 'Tidigare', value: 'past' },
    { label: 'Alla', value: 'all' }
  ]

  return (
    <div className="space-y-12">
      {/* Header with Title and Filter on the same row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-serif text-brand-dark mb-2">På gång</h2>
          <p className="text-stone-600">Workshops, föreläsningar och marknadsdagar.</p>
        </div>

        <div className="flex items-center gap-2 bg-stone-200/50 p-1 rounded-full w-fit">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                setFilter(opt.value)
                setVisibleCount(6)
              }}
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${filter === opt.value
                  ? 'bg-brand text-white shadow-sm'
                  : 'text-stone-500 hover:text-brand-dark'
                }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {displayedEvents.length === 0 ? (
        <div className="text-center py-20 bg-white/50 border border-dashed border-stone-200 rounded-sm">
          <p className="text-stone-500 font-serif italic">
            Inga event hittades i detta urval.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayedEvents.map(event => {
            const isPast = new Date(event.date) < now
            return (
              <Link
                key={event.id}
                href={event.slug?.current ? `/event/${event.slug.current}` : '#'}
                className={`group block bg-white border border-stone-200 overflow-hidden hover:border-brand-light transition-colors ${isPast ? 'grayscale opacity-60' : ''}`}
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
                      <span className="relative text-stone-400 font-serif text-4xl z-10">🌱</span>
                    </>
                  )}
                  {isPast && (
                    <div className="absolute inset-0 bg-stone-900/10 flex items-center justify-center z-20">
                      <span className="bg-stone-800 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">Passerat</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="text-xs font-bold text-brand uppercase tracking-wider mb-2">
                    {format(new Date(event.date), 'd MMMM yyyy', { locale: sv })}
                  </div>
                  <h3 className="text-xl font-serif text-brand-dark group-hover:text-brand transition-colors">
                    {event.title}
                  </h3>
                  <div className="mt-4 flex items-center text-sm font-medium text-stone-500 group-hover:text-brand-dark">
                    {isPast ? 'Läs om det' : 'Läs mer & Boka'} &rarr;
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}

      {hasMore && (
        <div className="mt-12 text-center">
          <button
            onClick={() => setVisibleCount(prev => prev + 6)}
            className="inline-block px-8 py-3 border border-brand text-brand hover:bg-brand hover:text-white transition-colors uppercase tracking-widest text-sm font-medium"
          >
            Visa fler event
          </button>
        </div>
      )}
    </div>
  )
}
