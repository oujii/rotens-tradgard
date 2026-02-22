import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontakt',
  description:
    'Kontakta Rotens Trädgård i Bjursås. Växtbeställning, rådgivning, beskärning, binderi, workshops och konferenser. Vi återkommer inom kort!',
}

export default function KontaktLayout({ children }: { children: React.ReactNode }) {
  return children
}
