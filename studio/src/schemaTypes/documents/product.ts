import { BasketIcon } from '@sanity/icons'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'
import { defineField, defineType } from 'sanity'

import { isStripeTestUrl } from '../../lib/stripe'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: BasketIcon,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'product' }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (SEK)',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'stripeUrl',
      title: 'Stripe Payment URL',
      type: 'url',
      description: '1. Gå till Stripe (Produkter) och skapa en betallänk. 2. Kopiera länken och klistra in här. (https://dashboard.stripe.com/products) OBS: se till att Stripe INTE står i testläge/sandbox när du skapar länken.',
      validation: (rule) =>
        rule.custom((url?: string) => {
          if (!url) return true
          if (isStripeTestUrl(url)) {
            return 'Detta är en Stripe-testlänk (sandbox) - riktiga kunder kan inte betala med den. Stäng av testläget i Stripe och skapa länken på nytt.'
          }
          return true
        }),
    }),
    defineField({
      name: 'isPreOrder',
      title: 'Is Pre-order?',
      type: 'boolean',
      description: 'Check this if the product is for pre-order (delivery later)',
      initialValue: false,
    }),
    defineField({
      name: 'bestBefore',
      title: 'Dölj i butiken efter (bäst före)',
      type: 'date',
      description: 'VIKTIGT: när detta datum passerat försvinner produkten helt från webbutiken. Lämna tomt för produkter som alltid ska synas, t.ex. presentkort och buketter.',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
    }),
    defineField({
      name: 'tags',
      title: 'Taggar / Kategorier',
      description: 'T.ex. "Blombud", "Växt", "Övrigt". Används för filtrering i butiken.',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      price: 'price',
      media: 'image',
      isPreOrder: 'isPreOrder',
      bestBefore: 'bestBefore',
    },
    prepare({ title, price, media, isPreOrder, bestBefore }) {
      // Gör det synligt direkt i listan att en produkt inte längre visas i butiken.
      const hidden = bestBefore && new Date(`${bestBefore}T23:59:59Z`) < new Date()
      const parts = [
        hidden ? `DOLD I BUTIKEN sedan ${bestBefore}` : null,
        `${price} kr`,
        isPreOrder ? '(Förboka)' : null,
      ].filter(Boolean)

      return {
        title: hidden ? `[DOLD] ${title}` : title,
        subtitle: parts.join(' · '),
        media,
      }
    },
  },
})
