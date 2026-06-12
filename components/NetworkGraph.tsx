'use client'

import { useState, useEffect } from 'react'

export function NetworkGraph() {
  const [graph, setGraph] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      const inbound = Array.from({ length: 40 }, () => Math.floor(Math.random() * 10) + 1)
        .map(v => '█'.repeat(v))
        .join('')
      const outbound = Array.from({ length: 40 }, () => Math.floor(Math.random() * 10) + 1)
        .map(v => '█'.repeat(v))
        .join('')
      setGraph(`📈 Trafic entrant : ${inbound.slice(0, 40)}\n📉 Trafic sortant : ${outbound.slice(0, 40)}`)
    }, 800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mx-auto max-w-6xl my-16 border border-accent-neon/30 bg-black/40 p-4 font-mono text-xs">
      <pre className="text-accent-neon">=== INTERFACE eth0 (trafic simulé) ===</pre>
      <pre className="text-foreground/80 whitespace-pre-wrap">{graph}</pre>
    </div>
  )
}