import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white/80 py-12 md:py-16">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Column 1: Brand */}
        <div>
          <div className="relative w-48 h-16 mb-4">
            <Image 
              src="/images/logo.webp" 
              alt="Rotens Trädgård" 
              fill 
              className="object-contain object-left"
            />
          </div>
          <p className="text-sm leading-relaxed max-w-xs mb-6">
            Din lokala handelsträdgård i Dalarna. Vi brinner för växter, odling och vackra trädgårdar.
          </p>
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/rotenstradgard/?locale=sv_SE"
              aria-label="Rotens Trädgård på Facebook"
              className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor" aria-hidden="true">
                <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24H12.82v-9.294H9.692V11.01h3.128V8.41c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.313h3.587l-.467 3.696h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/rotenstradgard/"
              aria-label="Rotens Trädgård på Instagram"
              className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor" aria-hidden="true">
                <path d="M12 0c3.259 0 3.667.012 4.947.071 1.17.054 1.806.249 2.228.415.562.219.964.48 1.387.903.423.423.684.825.903 1.387.166.422.361 1.058.415 2.228.059 1.28.071 1.688.071 4.947s-.012 3.667-.071 4.947c-.054 1.17-.249 1.806-.415 2.228-.219.562-.48.964-.903 1.387-.423.423-.825.684-1.387.903-.422.166-1.058.361-2.228.415-1.28.059-1.688.071-4.947.071s-3.667-.012-4.947-.071c-1.17-.054-1.806-.249-2.228-.415-.562-.219-.964-.48-1.387-.903-.423-.423-.684-.825-.903-1.387-.166-.422-.361-1.058-.415-2.228C.012 15.667 0 15.259 0 12s.012-3.667.071-4.947c.054-1.17.249-1.806.415-2.228.219-.562.48-.964.903-1.387.423-.423.825-.684 1.387-.903.422-.166 1.058-.361 2.228-.415C8.333.012 8.741 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.165a4.003 4.003 0 1 1 0-8.006 4.003 4.003 0 0 1 0 8.006zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Links */}
        <div>
          <h4 className="text-white font-medium uppercase tracking-wider text-sm mb-4">Hitta snabbt</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/butik" className="hover:text-white transition-colors">Webbutik</Link></li>
            <li><Link href="/tjanster" className="hover:text-white transition-colors">Tjänster</Link></li>
            <li><Link href="/om-oss" className="hover:text-white transition-colors">Om oss</Link></li>
            <li><Link href="/kontakt" className="hover:text-white transition-colors">Kontakt</Link></li>
          </ul>
        </div>

        {/* Column 3: Legal/Info */}
        <div>
          <h4 className="text-white font-medium uppercase tracking-wider text-sm mb-4">Info</h4>
          <ul className="space-y-2 text-sm">
            <li>Rotens Trädgård AB</li>
            <li>Org.nr: 559420-3704</li>
            <li className="pt-4 text-xs text-white/40">
              © {new Date().getFullYear()} Rotens Trädgård. Alla rättigheter reserverade.
            </li>
          </ul>
        </div>

      </div>
    </footer>
  )
}
