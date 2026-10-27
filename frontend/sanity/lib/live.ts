import {defineLive} from 'next-sanity/live'
import {client} from '@/sanity/lib/client'
import {token} from '@/sanity/lib/token'

/**
 * Use defineLive to enable automatic revalidation and refreshing of your fetched content
 * Learn more: https://github.com/sanity-io/next-sanity?tab=readme-ov-file#1-configure-definelive
 */

export const {sanityFetch, SanityLive} = defineLive({
  client,
  // Required for showing draft content when the Sanity Presentation Tool is used, or to enable the Vercel Toolbar Edit Mode
  serverToken: token,
  // Required for stand-alone live previews, the token is only shared to the browser if it's a valid Next.js Draft Mode session
  browserToken: token,
  // Utan detta cachas Sanity-datan för alltid i produktion och uppdateras bara när en
  // besökare råkar ha sajten öppen just när något publiceras (<SanityLive>). Med 60 s
  // syns publicerat innehåll inom ungefär en minut oavsett trafik.
  fetchOptions: {revalidate: 60},
})
