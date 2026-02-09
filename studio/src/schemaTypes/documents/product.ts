import {BasketIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: BasketIcon,
  fields: [
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
      description: '1. Gå till Stripe (Produkter) och skapa en betallänk. 2. Kopiera länken och klistra in här. (https://dashboard.stripe.com/products)',
    }),
    defineField({
      name: 'isPreOrder',
      title: 'Is Pre-order?',
      type: 'boolean',
      description: 'Check this if the product is for pre-order (delivery later)',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      price: 'price',
      media: 'image',
      isPreOrder: 'isPreOrder',
    },
    prepare({title, price, media, isPreOrder}) {
      return {
        title,
        subtitle: `${price} kr ${isPreOrder ? '(Förboka)' : ''}`,
        media,
      }
    },
  },
})
