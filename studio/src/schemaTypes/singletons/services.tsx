import {defineField, defineType} from 'sanity'
import {SparklesIcon} from '@sanity/icons'

export const servicesPage = defineType({
  name: 'servicesPage',
  title: 'Tjänster',
  type: 'document',
  icon: SparklesIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Rubrik',
      type: 'string',
      initialValue: 'Tjänster',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Introtext',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'items',
      title: 'Kort',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Titel',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Beskrivning',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'image',
              title: 'Bild',
              type: 'image',
              options: {hotspot: true},
            }),
            defineField({
              name: 'buttonText',
              title: 'Knapptext',
              type: 'string',
            }),
            defineField({
              name: 'buttonLink',
              title: 'Knapplänk',
              type: 'link',
            }),
          ],
          preview: {
            select: {title: 'title', media: 'image'},
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Tjänster'}
    },
  },
})
