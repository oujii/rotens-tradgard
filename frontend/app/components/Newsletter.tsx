'use client'

import React, { useState } from 'react'

export default function Newsletter() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')

        if (!email) return

        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })

            if (!res.ok) {
                throw new Error('Something went wrong')
            }

            setStatus('success')
            setEmail('')
        } catch (error) {
            console.error(error)
            setStatus('error')
            // Revert to idle after 3 seconds on error so user can try again
            setTimeout(() => setStatus('idle'), 3000)
        }
    }

    return (
        <section className="py-20 bg-brand text-white">
            <div className="container mx-auto px-6 text-center max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-serif mb-6 text-white">Följ med i trädgården</h2>
                <p className="text-white/80 mb-10 text-lg">
                    Prenumerera på vårt nyhetsbrev för tips, inspiration och förtur till våra evenemang.
                </p>

                {status === 'success' ? (
                    <div className="bg-white/10 p-6 rounded-sm border border-white/20">
                        <h3 className="text-xl font-serif mb-2 text-white">Tack för din prenumeration! 🌱</h3>
                        <p className="text-white/80">Du har nu lagts till i vår lista.</p>
                    </div>
                ) : status === 'error' ? (
                    <div className="bg-red-500/20 p-6 rounded-sm border border-red-500/40">
                        <h3 className="text-xl font-serif mb-2 text-white">Hoppsan!</h3>
                        <p className="text-white/80">Något gick fel. Försök igen strax.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="Din e-postadress"
                            className="flex-1 px-6 py-4 bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all rounded-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="px-8 py-4 bg-white text-brand-dark font-medium uppercase tracking-widest text-sm hover:bg-brand-accent transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-lg rounded-sm"
                        >
                            {status === 'loading' ? 'Registrerar...' : 'Prenumerera'}
                        </button>
                    </form>
                )}
            </div>
        </section>
    )
}
