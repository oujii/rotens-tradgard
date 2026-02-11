import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="fixed z-50 top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-stone-100">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="relative w-32 h-12 transition-transform hover:scale-105">
          <Image 
            src="/logo_top.png" 
            alt="Rotens Trädgård" 
            fill 
            className="object-contain object-left"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-8 text-stone-600 font-medium text-xs tracking-widest uppercase">
            <li>
              <Link href="/butik" className="hover:text-brand transition-colors">Webbutik</Link>
            </li>
            <li>
              <Link href="/tjanster" className="hover:text-brand transition-colors">Tjänster</Link>
            </li>
            <li>
              <Link href="/om-oss" className="hover:text-brand transition-colors">Om oss</Link>
            </li>
            <li>
              <Link href="/kontakt" className="px-6 py-2.5 bg-brand-dark text-white rounded-full hover:bg-brand transition-all shadow-sm active:scale-95 font-bold tracking-widest">
                Kontakt
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button (Placeholder) */}
        <button className="lg:hidden text-brand-dark">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
    </header>
  )
}
