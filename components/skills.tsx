'use client'

import { skillGroups, stack, languages } from '@/lib/data'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { GlitchOnView } from '@/components/GlitchOnView'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export function Skills() {
  return (
    <section id="competences" className="border-y border-accent-neon/20 bg-card-bg/40 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        {/* en-tête avec coin décoratif */}
        <div className="section-corner mb-12 max-w-2xl">
          <span className="font-mono text-xs font-semibold tracking-widest text-accent-neon">
            [02 — COMPÉTENCES]
          </span>
          <GlitchOnView>

          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            stack technique & expertise
          </h2>
          </GlitchOnView>
          <p className="mt-4 font-mono text-sm leading-relaxed text-muted">
            Systèmes, réseaux, développement full‑stack — une approche orientée production.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid gap-6 md:grid-cols-3"
        >
          {skillGroups.map((group) => (
            <motion.div
              key={group.category}
              variants={itemVariants}
              className="border-l-2 border-accent-neon bg-black/40 p-6"
            >
              <h3 className="font-heading text-lg font-bold uppercase tracking-tight">
                {group.category}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-2.5 font-mono text-xs text-foreground/80"
                  >
                    <Check className="size-3 shrink-0 text-accent-neon" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-accent-neon">
              outils & technologies
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {stack.map((tool) => (
                <span
                  key={tool}
                  className="border border-accent-neon/30 bg-black/40 px-3 py-1.5 font-mono text-xs text-foreground"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-accent-neon">
              langues
            </h3>
            <div className="mt-4 flex flex-col gap-4">
              {languages.map((lang) => (
                <div key={lang.name}>
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-muted">{lang.level}</span>
                  </div>
                  <div className="mt-2 h-1 w-full overflow-hidden border border-accent-neon/30 bg-black">
                    <div
                      className="h-full bg-accent-neon"
                      style={{ width: `${lang.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}