'use client'

import Link from 'next/link'
import Image from 'next/image'
import {useEffect, useState} from 'react'
import {usePathname} from 'next/navigation'

function useIsTranslated() {
  const [isTranslated, setIsTranslated] = useState(false)
  useEffect(() => {
    setIsTranslated(window.location.hostname.includes('translate.goog'))
  }, [])
  return isTranslated
}

function getTranslateUrl(pathname: string) {
  const base = `https://rotenstradgard-se.translate.goog${pathname}`
  return `${base}?_x_tr_sl=auto&_x_tr_tl=en&_x_tr_hl=en-US&_x_tr_pto=wapp&_x_tr_hist=true`
}

function NavLink({
  href,
  className,
  onClick,
  children,
  forceReload,
}: {
  href: string
  className?: string
  onClick?: () => void
  children: React.ReactNode
  forceReload?: boolean
}) {
  if (forceReload) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  )
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isTranslated = useIsTranslated()

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const navItems = [
    {href: '/butik', label: 'Webbutik'},
    {href: '/tjanster', label: 'Tjänster'},
    {href: '/om-oss', label: 'Om oss'},
  ]

  const translateUrl = getTranslateUrl(pathname)

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-100">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <NavLink href="/" className="relative w-32 h-12 transition-transform hover:scale-105" forceReload={isTranslated}>
            <Image
              src="/logo_top.png"
              alt="Rotens Trädgård"
              fill
              className="object-contain object-left"
              priority
            />
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-8 text-stone-600 font-serif font-normal text-xs tracking-widest uppercase">
              {navItems.map((item) => (
                <li key={item.href}>
                  <NavLink href={item.href} className="hover:text-brand transition-colors" forceReload={isTranslated}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li>
                <NavLink href="/kontakt" className="px-6 py-2.5 bg-brand-dark text-white rounded-full hover:bg-brand transition-all shadow-sm active:scale-95 font-bold tracking-widest" forceReload={isTranslated}>
                  Kontakt
                </NavLink>
              </li>
              {!isTranslated && (
                <li>
                  <a
                    href={translateUrl}
                    className="text-stone-400 hover:text-brand-dark transition-colors text-[10px] tracking-[0.2em]"
                    title="View in English"
                  >
                    EN
                  </a>
                </li>
              )}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="relative z-[60] lg:hidden text-brand-dark"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Stäng meny' : 'Öppna meny'}
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        <div
          id="mobile-menu"
          className={`lg:hidden absolute left-0 right-0 top-full border-t border-stone-100 bg-white/95 backdrop-blur-md transition-all duration-200 ${
            isMobileMenuOpen
              ? 'translate-y-0 opacity-100 pointer-events-auto'
              : '-translate-y-2 opacity-0 pointer-events-none'
          }`}
        >
          <nav className="container mx-auto px-6 py-4">
            <ul className="flex flex-col gap-2 text-stone-700 font-serif font-normal text-xs tracking-widest uppercase">
              {navItems.map((item) => (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    className="block py-3 hover:text-brand transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                    forceReload={isTranslated}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li className="pt-2">
                <NavLink
                  href="/kontakt"
                  className="block text-center px-6 py-3 bg-brand-dark text-white hover:bg-brand transition-colors font-bold tracking-widest"
                  onClick={() => setIsMobileMenuOpen(false)}
                  forceReload={isTranslated}
                >
                  Kontakt
                </NavLink>
              </li>
              {!isTranslated && (
                <li className="pt-2">
                  <a
                    href={translateUrl}
                    className="block text-center py-3 text-stone-400 hover:text-brand-dark transition-colors text-[10px] tracking-[0.2em]"
                    title="View in English"
                  >
                    EN
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>
      <button
        type="button"
        aria-label="Stäng meny"
        className={`lg:hidden fixed inset-0 top-20 z-40 bg-black/20 transition-opacity duration-200 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
    </>
  )
}
