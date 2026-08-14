import {CalendarIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {isStripeTestUrl} from '../../lib/stripe'

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Rubrik',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL-namn)',
      description:
        'Adressen till eventet: rotenstradgard.se/event/DIN-SLUG. Endast små bokstäver, siffror och bindestreck - aldrig mellanslag (då blir sidan 404). Duplicerar du ett event måste sluggen ändras, t.ex. lägg till "-september" med bindestreck.',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .slice(0, 96),
      },
      validation: (rule) =>
        rule.required().custom((slug?: {current?: string}) => {
          const current = slug?.current
          if (!current) return true
          if (current !== current.trim()) {
            return 'Sluggen får inte börja eller sluta med mellanslag.'
          }
          if (!/^[a-z0-9-]+$/.test(current)) {
            return 'Sluggen får bara innehålla små bokstäver a-z, siffror och bindestreck. Byt mellanslag mot bindestreck (annars blir sidan 404).'
          }
          return true
        }),
    }),
    defineField({
      name: 'date',
      title: 'Datum och Tid',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Pris-text',
      description: 'T.ex. "295 kr", "Gratis" eller "Ingår i entrén"',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Omslagsbild',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Beskrivning',
      description: 'Lång beskrivning om eventet, klädsel, vad som ingår etc.',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'bookingUrl',
      title: 'Bokningslänk (Valfritt)',
      description:
        'Lämna tomt för "Fri entré / Drop-in". Klistra in Stripe-länk för "KÖP BILJETT". Klistra in annan länk (t.ex. Cal.com/Forms) för "BOKA PLATS". OBS: skapa alltid en EGEN betallänk per event - återanvänder du en länk hamnar anmälningarna på fel event i Stripe.',
      type: 'url',
      validation: (rule) => [
        rule.custom((url?: string) => {
          if (!url) return true
          if (isStripeTestUrl(url)) {
            return 'Detta är en Stripe-testlänk (sandbox) - riktiga kunder kan inte betala med den. Skapa länken i skarpt läge i Stripe.'
          }
          return true
        }),
        rule.custom(async (url, context) => {
          if (!url) return true
          const client = context.getClient({apiVersion: '2024-01-01'})
          const id = (context.document?._id || '').replace(/^drafts\./, '')
          const conflicts: {title?: string}[] = await client.fetch(
            `*[_type == "event" && bookingUrl == $url && !(_id in [$id, "drafts." + $id])]{title}`,
            {url, id},
          )
          if (conflicts.length > 0) {
            const titles = conflicts.map((c) => c.title).filter(Boolean).join(', ')
            return `Samma bokningslänk används redan av: ${titles}. Anmälningarna hamnar då på fel event i Stripe - skapa en egen betallänk för det här eventet.`
          }
          return true
        }).warning(),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'image',
    },
    prepare({title, date, media}) {
      return {
        title,
        subtitle: date ? new Date(date).toLocaleDateString() : 'Inget datum satt',
        media,
      }
    },
  },
})