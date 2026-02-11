"use client"

import {useEffect, useState, Suspense} from 'react'
import {useSearchParams} from 'next/navigation'

type Status = 'idle' | 'loading' | 'success' | 'error'

type CategoryOption = {
  value: string
  label: string
}

const CATEGORY_OPTIONS: CategoryOption[] = [
  {value: 'allmant', label: 'Allmän fråga'},
  {value: 'vaxtbestallning', label: 'Växtbeställning'},
  {value: 'radgivning', label: 'Rådgivning'},
  {value: 'beskaring-skotsel', label: 'Beskäring & Skötsel'},
  {value: 'binderier', label: 'Binderier – Bröllop, begravning, fest, övrigt'},
  {value: 'workshop-forelasningar', label: 'Workshop & föreläsningar'},
  {value: 'fest-konferens', label: 'Fest & Konferens'},
]

const CATEGORY_VALUES = new Set(CATEGORY_OPTIONS.map((option) => option.value))

function ContactForm() {
  const searchParams = useSearchParams()
  const rawCategory = searchParams.get('val')
  const initialCategory =
    rawCategory && CATEGORY_VALUES.has(rawCategory) ? rawCategory : 'allmant'

  const [category, setCategory] = useState(initialCategory)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const isPlantOrder = category === 'vaxtbestallning'
  const isConsulting = category === 'radgivning'
  const isPruning = category === 'beskaring-skotsel'
  const isBinderi = category === 'binderier'
  const isWorkshop = category === 'workshop-forelasningar'
  const isEvent = category === 'fest-konferens'

  // Update category if URL changes
  useEffect(() => {
    const val = searchParams.get('val')
    if (val && CATEGORY_VALUES.has(val)) {
      setCategory(val)
      return
    }
    if (!val) setCategory('allmant')
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage(null)

    const form = e.currentTarget
    const formData = new FormData(form)
    const selectedCategory = CATEGORY_OPTIONS.find((option) => option.value === category)

    const payload = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      company: String(formData.get('company') || '').trim(),
      message: String(formData.get('message') || '').trim(),
      category: selectedCategory?.label || category,
      address: String(formData.get('address') || '').trim(),
      eventDate: String(formData.get('eventDate') || '').trim(),
      binderiType: String(formData.get('binderiType') || '').trim(),
      plantRequest: String(formData.get('plantRequest') || '').trim(),
      pickupDate: String(formData.get('pickupDate') || '').trim(),
      workshopTopic: String(formData.get('workshopTopic') || '').trim(),
      attendees: String(formData.get('attendees') || '').trim(),
      website: String(formData.get('website') || '').trim(),
    }

    if (payload.website) {
      setStatus('error')
      setErrorMessage('Något gick fel. Försök igen.')
      return
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {error?: string} | null
        throw new Error(data?.error || 'Kunde inte skicka meddelandet.')
      }

      setStatus('success')
      form.reset()
      window.scrollTo({top: 0, behavior: 'smooth'})
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error instanceof Error ? error.message : 'Kunde inte skicka meddelandet.',
      )
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-white p-8 md:p-12 shadow-sm rounded-sm text-center space-y-6 border-t-4 border-brand">
        <div className="text-5xl">🌿</div>
        <h2 className="text-3xl font-serif text-brand-dark">Tack för ditt meddelande!</h2>
        <p className="text-stone-600 max-w-md mx-auto">
          Vi har tagit emot dina uppgifter och återkommer till dig så snart vi kan, 
          vanligtvis inom ett par arbetsdagar.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-brand font-bold underline underline-offset-4"
        >
          Skicka ett till meddelande
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 md:p-12 shadow-sm rounded-sm space-y-8 border-t-4 border-brand"
    >
      
      {/* Category Selection */}
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-widest font-bold text-stone-400">Vad gäller ditt ärende?</label>
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border-b-2 border-stone-100 py-3 focus:border-brand outline-none transition-colors text-lg bg-transparent"
        >
          {CATEGORY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Dynamic Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold text-stone-400">Namn</label>
          <input
            required
            name="name"
            type="text"
            className="w-full border-b-2 border-stone-100 py-2 focus:border-brand outline-none transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold text-stone-400">E-post</label>
          <input
            required
            name="email"
            type="email"
            className="w-full border-b-2 border-stone-100 py-2 focus:border-brand outline-none transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold text-stone-400">Telefon (valfritt)</label>
          <input
            name="phone"
            type="tel"
            className="w-full border-b-2 border-stone-100 py-2 focus:border-brand outline-none transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold text-stone-400">Företag (valfritt)</label>
          <input
            name="company"
            type="text"
            className="w-full border-b-2 border-stone-100 py-2 focus:border-brand outline-none transition-colors"
          />
        </div>
      </div>

      {/* Conditional Fields: Växtbeställning */}
      {isPlantOrder && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-bold text-stone-400">Vilka växter vill du beställa?</label>
            <input
              required
              name="plantRequest"
              type="text"
              className="w-full border-b-2 border-stone-100 py-2 focus:border-brand outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-bold text-stone-400">Önskat datum för hämtning (valfritt)</label>
            <input
              name="pickupDate"
              type="date"
              className="w-full border-b-2 border-stone-100 py-2 focus:border-brand outline-none transition-colors"
            />
          </div>
        </div>
      )}

      {/* Conditional Fields: Address */}
      {(isConsulting || isPruning) && (
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold text-stone-400">Adress (för hembesök)</label>
          <input
            required
            name="address"
            type="text"
            className="w-full border-b-2 border-stone-100 py-2 focus:border-brand outline-none transition-colors"
          />
        </div>
      )}

      {/* Conditional Fields: Binderier */}
      {isBinderi && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-bold text-stone-400">Datum för tillställning</label>
            <input
              required
              name="eventDate"
              type="date"
              className="w-full border-b-2 border-stone-100 py-2 focus:border-brand outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-bold text-stone-400">Typ av binderi</label>
            <select
              name="binderiType"
              className="w-full border-b-2 border-stone-100 py-2 focus:border-brand outline-none transition-colors bg-transparent"
            >
              <option>Bröllop</option>
              <option>Begravning</option>
              <option>Fest</option>
              <option>Övrigt</option>
            </select>
          </div>
        </div>
      )}

      {/* Conditional Fields: Workshop & föreläsningar */}
      {isWorkshop && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-bold text-stone-400">Vilken workshop eller föreläsning?</label>
            <input
              required
              name="workshopTopic"
              type="text"
              className="w-full border-b-2 border-stone-100 py-2 focus:border-brand outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-bold text-stone-400">Önskat datum (valfritt)</label>
            <input
              name="eventDate"
              type="date"
              className="w-full border-b-2 border-stone-100 py-2 focus:border-brand outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-bold text-stone-400">Antal deltagare (valfritt)</label>
            <input
              name="attendees"
              type="number"
              min={1}
              className="w-full border-b-2 border-stone-100 py-2 focus:border-brand outline-none transition-colors"
            />
          </div>
        </div>
      )}

      {/* Conditional Fields: Fest & Konferens */}
      {isEvent && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-bold text-stone-400">Datum för tillställning</label>
            <input
              required
              name="eventDate"
              type="date"
              className="w-full border-b-2 border-stone-100 py-2 focus:border-brand outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-bold text-stone-400">Antal personer</label>
            <input
              required
              name="attendees"
              type="number"
              min={1}
              className="w-full border-b-2 border-stone-100 py-2 focus:border-brand outline-none transition-colors"
            />
          </div>
        </div>
      )}

      {/* Message */}
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-widest font-bold text-stone-400">
          {isPruning ? 'Berätta lite om dina träd (antal, sort)' : 'Ditt meddelande'}
        </label>
        <textarea
          required
          name="message"
          rows={4}
          className="w-full border-2 border-stone-100 p-4 focus:border-brand outline-none transition-colors rounded-sm"
        ></textarea>
      </div>

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
      />

      {status === 'error' && (
        <div className="text-sm text-red-600 font-medium">{errorMessage}</div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-4 bg-brand text-white font-bold uppercase tracking-[0.2em] text-sm hover:bg-brand-dark transition-all shadow-md active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Skickar...' : 'Skicka meddelande'}
      </button>

    </form>
  )
}

export default function KontaktPage() {
  return (
    <div className="pt-24 min-h-screen bg-stone-50 pb-20">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-brand-dark mb-4">Kontakta oss</h1>
          <p className="text-stone-600">
            Vill du beställa växter, rådgivning, binderier eller komma i kontakt med oss av annan anledning? Fyll i formuläret så hör vi av oss!
          </p>
        </div>

        <Suspense fallback={<div className="p-20 text-center italic text-stone-400">Laddar formulär...</div>}>
          <ContactForm />
        </Suspense>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-left">
           <div>
              <h4 className="font-serif text-xl text-brand-dark mb-2">Hitta hit</h4>
              <p className="text-stone-600 text-sm italic">Skovägen 8, 790 21 Bjursås</p>
           </div>
           <div>
              <h4 className="font-serif text-xl text-brand-dark mb-2">Ring oss</h4>
              <p className="text-stone-600 text-sm italic">(+46) 73 738 48 53</p>
           </div>
        </div>
      </div>
    </div>
  )
}
