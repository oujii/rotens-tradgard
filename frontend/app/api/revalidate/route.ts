import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

/**
 * Tar emot en webhook från Sanity när innehåll publiceras och rensar cachen direkt.
 *
 * Utan denna ligger sidan kvar i Netlifys cache tills revalidate-fönstret (60s)
 * löper ut, vilket gör att första besökaren efter en ändring kan få en gammal
 * version. Med webhooken syns publicerat innehåll i princip omedelbart.
 *
 * Sätts upp i Sanity: Manage -> API -> Webhooks
 *   URL:     https://www.rotenstradgard.se/api/revalidate
 *   Dataset: production
 *   Trigger: Create, Update, Delete
 *   Secret:  samma värde som env-variabeln SANITY_REVALIDATE_SECRET
 */
export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET

    if (!secret) {
      return new NextResponse('SANITY_REVALIDATE_SECRET saknas i miljövariablerna', {
        status: 500,
      })
    }

    const { isValidSignature, body } = await parseBody<{ _type: string; slug?: { current?: string } }>(
      req,
      secret,
    )

    if (!isValidSignature) {
      return new NextResponse('Ogiltig signatur', { status: 401 })
    }

    if (!body?._type) {
      return new NextResponse('Webhooken saknar _type', { status: 400 })
    }

    // Layouten hämtar settings och renderas på varje sida, så en full purge är
    // rätt nivå här. Sajten är liten och publiceringar är sällsynta.
    revalidatePath('/', 'layout')

    return NextResponse.json({
      revalidated: true,
      type: body._type,
      slug: body.slug?.current ?? null,
    })
  } catch (error) {
    console.error(error)
    return new NextResponse(
      error instanceof Error ? error.message : 'Kunde inte revalidera',
      { status: 500 },
    )
  }
}
