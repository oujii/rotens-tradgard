import {settings} from './singletons/settings'
import {servicesPage} from './singletons/services'
import {event} from './documents/event'
import {product} from './documents/product'
import {page} from './documents/page'
import {post} from './documents/post'
import {person} from './documents/person'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import button from './objects/button'
import {blockContentTextOnly} from './objects/blockContentTextOnly'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/studio/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  servicesPage,
  // Documents
  event,
  product,
  page,
  post,
  person,
  // Objects
  button,
  blockContent,
  blockContentTextOnly,
  infoSection,
  callToAction,
  link,
]
