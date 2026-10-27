import { CogIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      initialValue: 'Rotens Trädgård',
    }),

    // HERO SECTION
    defineField({
      name: 'heroVideo',
      title: 'Hero Video',
      description: 'Upload the background video for the homepage (mp4)',
      type: 'file',
      options: {
        accept: 'video/mp4',
      },
    }),

    // OPENING HOURS
    defineField({
      name: 'openingHours',
      title: 'Öppettider',
      type: 'object',
      fieldsets: [
        {
          name: 'legacy',
          title: 'Gamla fasta fält (används inte när fritexten ovan är ifylld)',
          options: { collapsible: true, collapsed: true },
        },
      ],
      fields: [
        defineField({
          name: 'customText',
          title: 'Öppettider - ÄNDRA HÄR',
          type: 'text',
          rows: 4,
          description:
            'Det här är fältet som styr öppettiderna på hela webbplatsen. En rad per öppettid i formatet "Dag: Tid", t.ex. "Onsdag - Lördag: 10 - 17". Ändringen syns på sajten inom någon minut.',
        }),
        defineField({ name: 'weekdays', title: 'Vardagar (endast tid, t.ex. "10 - 18")', type: 'string', fieldset: 'legacy', initialValue: '10 - 18' }),
        defineField({ name: 'saturday', title: 'Lördag (endast tid)', type: 'string', fieldset: 'legacy', initialValue: '10 - 15' }),
        defineField({ name: 'sunday', title: 'Söndag (endast tid)', type: 'string', fieldset: 'legacy', initialValue: 'Stängt' }),
      ]
    }),

    // CONTACT INFO
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({ name: 'address', title: 'Address', type: 'string', initialValue: 'Skovägen 8, 790 21 Bjursås, Dalarna' }),
        defineField({ name: 'phone', title: 'Phone', type: 'string', initialValue: '(+46) 73 738 48 53' }),
        defineField({ name: 'email', title: 'Email', type: 'string', initialValue: 'info@rotenstradgard.se' }),
      ]
    }),

    // HOMEPAGE ASSORTMENT CARDS
    defineField({
      name: 'assortmentItems',
      title: 'Vårt sortiment (startsidan)',
      description:
        'Korten som visas i sektionen "Vårt sortiment" på startsidan.',
      type: 'array',
      validation: (Rule) => Rule.max(4),
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Rubrik',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Beskrivning',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Bild',
              type: 'image',
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              media: 'image',
            },
          },
        },
      ],
    }),

    // SEO / META
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      description: 'Used for SEO and social sharing.',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Displayed on social cards and search engine results.',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      }
    },
  },
})
