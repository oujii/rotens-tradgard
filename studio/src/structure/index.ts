import {BasketIcon, CalendarIcon, CogIcon, SparklesIcon} from '@sanity/icons'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S: StructureBuilder, context) =>
  S.list()
    .title('Rotens Trädgård')
    .items([
      S.listItem()
        .title('Evenemang')
        .icon(CalendarIcon)
        .child(S.documentTypeList('event').title('Evenemang')),

      orderableDocumentListDeskItem({
        type: 'product',
        title: 'Butik & produkter',
        icon: BasketIcon,
        S,
        context,
      }),

      S.divider(),

      S.listItem()
        .title('Tjänster')
        .icon(SparklesIcon)
        .child(S.document().schemaType('servicesPage').documentId('servicesPage')),

      S.listItem()
        .title('Webbplatsinställningar')
        .icon(CogIcon)
        .child(S.document().schemaType('settings').documentId('siteSettings')),
    ])
