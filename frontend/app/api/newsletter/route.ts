import { NextResponse } from 'next/server'
import { Resend } from 'resend'

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
        const payload = await request.json()
        const email = (payload.email || '').trim()

        if (!email || !isValidEmail(email)) {
            return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
        }

        const to = getEnv('CONTACT_TO_EMAIL')
        const from = getEnv('CONTACT_FROM_EMAIL')

        // Subject for easy Gmail filtering
        const subject = `[Rotens Nyhetsbrev] Ny Prenumerant`
        const body = `Ny prenumerant: ${email}`

        await resend.emails.send({
            from,
            to,
            subject,
            text: body,
        })

        return NextResponse.json({ ok: true })
    } catch (error) {
        console.error('Newsletter error', error)
        return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
    }
}
