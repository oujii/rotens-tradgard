import {CalendarIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

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
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
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
      description: 'Lämna tomt för "Fri entré / Drop-in". Klistra in Stripe-länk för "KÖP BILJETT". Klistra in annan länk (t.ex. Cal.com/Forms) för "BOKA PLATS".',
      type: 'url',
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