import {NextResponse} from 'next/server'
import {Resend} from 'resend'

type ContactPayload = {
  name: string
  email: string
  message: string
  category?: string
  eventDate?: string
  address?: string
  binderiType?: string
  phone?: string
  company?: string
}

const resend = new Resend(process.env.RESEND_API_KEY)

function getEnv(name: string) {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`)
  }
  return value
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload

    if (!payload || typeof payload !== 'object') {
      return NextResponse.json({error: 'Invalid payload'}, {status: 400})
    }

    const name = (payload.name || '').trim()
    const email = (payload.email || '').trim()
    const message = (payload.message || '').trim()

    if (!name || !email || !message) {
      return NextResponse.json({error: 'Missing required fields'}, {status: 400})
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({error: 'Invalid email'}, {status: 400})
    }

    if (message.length < 10) {
      return NextResponse.json({error: 'Message too short'}, {status: 400})
    }

    const to = getEnv('CONTACT_TO_EMAIL')
    const from = getEnv('CONTACT_FROM_EMAIL')

    const subject = `Kontaktformulär: ${name}`
    const bodyLines = [
      `Namn: ${name}`,
      `E-post: ${email}`,
      payload.phone ? `Telefon: ${payload.phone}` : null,
      payload.category ? `Ärende: ${payload.category}` : null,
      payload.address ? `Adress: ${payload.address}` : null,
      payload.eventDate ? `Datum: ${payload.eventDate}` : null,
      payload.binderiType ? `Typ av binderi: ${payload.binderiType}` : null,
      payload.company ? `Företag: ${payload.company}` : null,
      '',
      'Meddelande:',
      message,
    ].filter(Boolean)

    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      text: bodyLines.join('\n'),
    })

    return NextResponse.json({ok: true})
  } catch (error) {
    console.error('Contact form error', error)
    return NextResponse.json({error: 'Failed to send'}, {status: 500})
  }
}
