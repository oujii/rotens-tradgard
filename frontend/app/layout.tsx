import './globals.css'

import type {Metadata} from 'next'
import {IBM_Plex_Mono, Josefin_Sans} from 'next/font/google'
import {draftMode} from 'next/headers'
import {toPlainText} from 'next-sanity'
import {VisualEditing} from 'next-sanity/visual-editing'
import {Toaster} from 'sonner'

import DraftModeToast from '@/app/components/DraftModeToast'
import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'
import * as demo from '@/sanity/lib/demo'
import {sanityFetch, SanityLive} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'
import {resolveOpenGraphImage} from '@/sanity/lib/utils'
import {handleError} from '@/app/client-utils'

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(): Promise<Metadata> {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  })
  const title = settings?.title || demo.title
  const description = settings?.description || demo.description

  const ogImage = resolveOpenGraphImage(settings?.ogImage)
  return {
    metadataBase: new URL('https://www.rotenstradgard.se'),
    alternates: {
      canonical: './',
    },
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: typeof description === 'string' ? description : toPlainText(description),
    openGraph: {
      locale: 'sv_SE',
      type: 'website',
      siteName: title,
      images: ogImage ? [ogImage] : [],
    },
  }
}

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
})

const josefinSans = Josefin_Sans({
  variable: '--font-josefin',
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const {isEnabled: isDraftMode} = await draftMode()

  return (
    <html
      lang="sv"
      className={`${josefinSans.variable} ${ibmPlexMono.variable} bg-stone-50 text-stone-900`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              '@id': 'https://www.rotenstradgard.se',
              name: 'Rotens Trädgård',
              description:
                'Handelsträdgård i Bjursås, Dalarna. Egenodlade växter, blommor, trädgårdstjänster, café och evenemang sedan 1940-talet.',
              url: 'https://www.rotenstradgard.se',
              telephone: '+46737384853',
              email: 'info@rotenstradgard.se',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Skovägen 8',
                addressLocality: 'Bjursås',
                postalCode: '790 21',
                addressRegion: 'Dalarna',
                addressCountry: 'SE',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 61.0167,
                longitude: 15.45,
              },
              image: 'https://www.rotenstradgard.se/images/logo.webp',
              sameAs: [
                'https://www.instagram.com/rotenstradgard/',
                'https://www.facebook.com/rotenstradgard/',
              ],
            }),
          }}
        />
        <section className="min-h-screen pt-20">
          {/* The <Toaster> component is responsible for rendering toast notifications used in /app/client-utils.ts and /app/components/DraftModeToast.tsx */}
          {isDraftMode && (
            <>
              <DraftModeToast />
              {/*  Enable Visual Editing, only to be rendered when Draft Mode is enabled */}
              <VisualEditing />
            </>
          )}
          {/* The <SanityLive> component is responsible for making all sanityFetch calls in your application live, so should always be rendered. */}
          <SanityLive onError={handleError} />
          <Header />
          <main className="">{children}</main>
          <Footer />
        </section>
        <Toaster />
      </body>
    </html>
  )
}
