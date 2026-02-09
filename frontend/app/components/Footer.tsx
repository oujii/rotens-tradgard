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
             {/* Social Placeholders */}
             <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">F</div>
             <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">I</div>
          </div>
        </div>

        {/* Column 2: Links */}
        <div>
          <h4 className="text-white font-medium uppercase tracking-wider text-sm mb-4">Hitta snabbt</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-white transition-colors">Växter & Sortiment</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Krukor & Inredning</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Om oss</Link></li>
            <li><Link href="/kontakt" className="hover:text-white transition-colors">Kontakta oss</Link></li>
          </ul>
        </div>

        {/* Column 3: Legal/Info */}
        <div>
          <h4 className="text-white font-medium uppercase tracking-wider text-sm mb-4">Info</h4>
          <ul className="space-y-2 text-sm">
            <li>Rotens Trädgård AB</li>
            <li>Org.nr: 556000-0000</li>
            <li className="pt-4 text-xs text-white/40">
              © {new Date().getFullYear()} Rotens Trädgård. Alla rättigheter reserverade.
            </li>
          </ul>
        </div>

      </div>
    </footer>
  )
}