'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { profile, stats } from '@/lib/data'
import { InteractiveTerminal } from './InteractiveTerminal'

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden px-6 pt-32 pb-20 md:pt-48">
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-start">
        {/* Colonne gauche : terminal interactif */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'anticipate' }}
        >
          <div className="mb-4 flex items-center gap-2 font-mono text-xs text-accent-neon">
            <span className="inline-block h-2 w-2 rounded-full bg-accent-err animate-pulse" />
            <span>SYSTEM.READY — interactif</span>
          </div>
          <InteractiveTerminal />
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projets"
              className="inline-block bg-accent-neon text-black px-6 py-2 font-mono text-sm font-bold hover:bg-accent-neon/80 transition-colors"
            >
              [ VOIR PROJETS ]
            </a>
            <a
              href="#contact"
              className="inline-block border border-accent-neon px-6 py-2 font-mono text-sm hover:bg-accent-neon/10 transition-colors"
            >
              _contact
            </a>
          </div>
        </motion.div>

        {/* Colonne droite : portrait */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="relative"
        >
          <div className="clip-diagonal overflow-hidden border border-accent-neon/50 shadow-[15px_15px_0_0_#d9ff00]">
            <Image
              src="/porfolio//mrsanga.png"
              width={600}
              height={800}
              alt={`Portrait de ${profile.name}`}
              className="grayscale contrast-125"
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* Statistiques */}
      <div className="relative mx-auto mt-16 grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="border-l-2 border-accent-neon bg-card-bg/60 p-4"
          >
            <p className="font-heading text-2xl font-bold text-accent-neon sm:text-3xl">
              {stat.value}
            </p>
            <p className="mt-1 text-xs font-mono text-muted sm:text-sm">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
