'use client'

import { useEffect, useState, useRef } from 'react'
import { navLinks, profile } from '@/lib/data'
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('#profil')
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const navRef = useRef<HTMLElement>(null)
  const linkRefs = useRef<Record<string, HTMLAnchorElement>>({})

  // scroll detection for background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // track active section
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace('#', ''))
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) {
          const newActive = `#${visible.target.id}`
          setActive(newActive)
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // update indicator position when active changes
  useEffect(() => {
    const activeLink = linkRefs.current[active]
    if (activeLink && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect()
      const linkRect = activeLink.getBoundingClientRect()
      setIndicatorStyle({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
      })
    }
  }, [active])

  const initials = profile.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-accent-neon/30 bg-background/80 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav
        ref={navRef}
        className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
      >
        {/* Logo */}
        <a
          href="#profil"
          className="group flex items-center gap-2.5 font-heading text-sm font-bold tracking-tight"
        >
          <span className="relative flex size-9 items-center justify-center border border-accent-neon bg-black text-accent-neon transition-transform duration-300 group-hover:scale-105">
            <span className="relative">{initials}</span>
          </span>
          <span className="hidden font-mono text-xs tracking-tighter sm:inline">
            {profile.name}
          </span>
        </a>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              ref={(el) => {
                if (el) linkRefs.current[link.href] = el
              }}
              href={link.href}
              data-active={active === link.href}
              className="relative rounded-none px-4 py-2 font-mono text-xs font-medium text-muted transition-colors duration-200 hover:text-accent-neon data-[active=true]:text-accent-neon"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-2 border border-accent-neon bg-transparent px-4 py-2 font-mono text-xs font-semibold text-accent-neon transition-all hover:bg-accent-neon hover:text-black"
          >
            _contact
          </a>
        </div>

        {/* Gliding indicator */}
        <div
          className="absolute bottom-0 hidden h-px bg-accent-neon transition-all duration-300 ease-out md:block"
          style={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
            boxShadow: '0 0 8px #d9ff00',
          }}
        />

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label="Ouvrir le menu"
          onClick={() => setOpen((v) => !v)}
          className="flex size-10 items-center justify-center border border-accent-neon/50 text-foreground transition-colors hover:border-accent-neon hover:text-accent-neon md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-accent-neon/30 bg-background/95 backdrop-blur-md md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-active={active === link.href}
                onClick={() => setOpen(false)}
                className="border-l-2 border-transparent px-4 py-3 font-mono text-sm text-muted transition-all hover:border-accent-neon hover:bg-accent-neon/10 hover:text-accent-neon data-[active=true]:border-accent-neon data-[active=true]:bg-accent-neon/10 data-[active=true]:text-accent-neon"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}