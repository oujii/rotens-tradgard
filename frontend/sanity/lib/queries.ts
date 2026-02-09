import {defineQuery} from 'next-sanity'

export const settingsQuery = defineQuery(`
  *[_type == "settings"][0] {
    ...,
    "heroVideoUrl": heroVideo.asset->url,
    notices
  }
`)

export const eventsQuery = defineQuery(`
  *[_type == "event"] | order(date asc) {
    _id,
    title,
    slug,
    date,
    "image": image.asset->url,
    bookingUrl
  }
`)

export const eventQuery = defineQuery(`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    date,
    price,
    description,
    "image": image.asset->url,
    bookingUrl
  }
`)

export const productsQuery = defineQuery(`
  *[_type == "product"] | order(title asc) {
    _id,
    title,
    price,
    "image": image.asset->url,
    stripeUrl,
    isPreOrder
  }
`)

export const getPageQuery = defineQuery(`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ...,
        link {
          ...,
          _type == "link" => {
            ...,
            "page": page->slug.current,
            "post": post->slug.current
          }
        }
      },
      _type == "infoSection" => {
        ...
      },
    }
  }
`)

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]{
    "slug": slug.current
  }
`)

export const servicesPageQuery = defineQuery(`
  *[_type == "servicesPage" && _id == "servicesPage"][0]{
    _id,
    title,
    intro,
    "items": items[]{
      _key,
      title,
      description,
      "imageUrl": image.asset->url,
      buttonText,
      buttonLink{
        ...,
        _type == "link" => {
          ...,
          "page": page->slug.current,
          "post": post->slug.current
        }
      }
    }
  }
`)
