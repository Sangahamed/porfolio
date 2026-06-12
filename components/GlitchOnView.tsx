'use client'

import { useEffect, useRef, ReactNode } from 'react'

export function GlitchOnView({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-glitch')
            setTimeout(() => {
              entry.target.classList.remove('animate-glitch')
            }, 300)
          }
        })
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref}>{children}</div>
}