'use client'

import { techStack } from '@/lib/data'
import { motion } from 'framer-motion'
import { Check, Server, Layers, Network } from 'lucide-react'
import { GlitchOnView } from '@/components/GlitchOnView'

const accentStyles: Record<
  string,
  { border: string; text: string; icon: typeof Server }
> = {
  primary: {
    border: 'border-accent-neon/40',
    text: 'text-accent-neon',
    icon: Server,
  },
  sky: {
    border: 'border-accent-neon/30',
    text: 'text-accent-neon',
    icon: Layers,
  },
  emerald: {
    border: 'border-accent-neon/30',
    text: 'text-accent-neon',
    icon: Network,
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function TechStack() {
  return (
    <section id="stack" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="section-corner mb-12 max-w-2xl">
          <span className="font-mono text-xs font-semibold tracking-widest text-accent-neon">
            [03 — STACK TECHNIQUE]
          </span>
          <GlitchOnView>

          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            l'arsenal technologique
          </h2>
          </GlitchOnView>
          <p className="mt-4 font-mono text-sm leading-relaxed text-muted">
            Backend, frontend, systèmes et DevOps — des outils choisis pour leur robustesse.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="flex flex-col gap-16"
        >
          {techStack.map((domain) => {
            const accent = accentStyles[domain.accent] ?? accentStyles.primary
            const Icon = accent.icon
            return (
              <div key={domain.domain}>
                <div className="mb-6 flex items-center gap-3">
                  <span className={`flex size-10 items-center justify-center border ${accent.border} bg-black/40 ${accent.text}`}>
                    <Icon className="size-5" />
                  </span>
                  <h3 className="font-heading text-xl font-bold uppercase tracking-tight">
                    {domain.domain}
                  </h3>
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                  {domain.cards.map((card, idx) => (
                    <motion.div
                      key={card.title}
                      variants={cardVariants}
                      className={`group border-l-2 ${accent.border} bg-black/30 p-6 transition-all duration-300 hover:bg-black/60 hover:shadow-[0_0_12px_rgba(217,255,0,0.2)]`}
                    >
                      <h4 className={`font-mono text-sm font-bold uppercase tracking-wider ${accent.text}`}>
                        {card.title}
                      </h4>
                      <ul className="mt-4 flex flex-col gap-2.5">
                        {card.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 font-mono text-xs leading-relaxed text-foreground/80"
                          >
                            <Check className="mt-0.5 size-3 shrink-0 text-accent-neon" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}