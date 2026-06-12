'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { experiences } from '@/lib/data'
import { GlitchOnView } from '@/components/GlitchOnView'

export function Experience() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      id="parcours"
      ref={containerRef}
      className="relative border-y border-accent-neon/20 bg-card-bg/30 px-6 py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="section-corner mb-12 max-w-2xl">
          <span className="font-mono text-xs font-semibold tracking-widest text-accent-neon">
            [04 — PARCOURS]
          </span>
          <GlitchOnView>

          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            expériences professionnelles
          </h2>
          </GlitchOnView>
          <p className="mt-4 font-mono text-sm leading-relaxed text-muted">
            Une expertise forgée entre administration système, infrastructures réseau et développement.
          </p>
        </div>

        <div className="relative">
          {/* Barre laser verticale */}
          <div className="absolute left-3 top-0 bottom-0 w-px bg-accent-neon/20 md:left-1/2">
            <motion.div
              className="w-px bg-accent-neon"
              style={{ height: lineHeight, boxShadow: '0 0 8px #d9ff00' }}
            />
          </div>

          <div className="flex flex-col gap-12">
            {experiences.map((exp, i) => (
              <div
                key={exp.title}
                className={`relative pl-10 md:w-1/2 md:pl-0 ${
                  i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'
                }`}
              >
                {/* Point lumineux sur la timeline */}
                <span
                  className={`absolute left-1 top-1 size-3 rounded-none border border-accent-neon bg-black shadow-[0_0_8px_#d9ff00] md:left-auto ${
                    i % 2 === 0 ? 'md:-right-1.5' : 'md:-left-1.5'
                  }`}
                />

                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true, margin: '-30px' }}
                  className="border-l-2 border-accent-neon bg-black/40 p-6 transition-all hover:bg-black/60"
                >
                  <span className="inline-block border border-accent-neon/50 bg-transparent px-2 py-0.5 font-mono text-xs text-accent-neon">
                    {exp.period}
                  </span>
                  <h3 className="mt-3 font-heading text-lg font-bold uppercase tracking-tight">
                    {exp.title}
                  </h3>
                  <p className="font-mono text-xs text-muted">{exp.company}</p>

                  <ul
                    className={`mt-4 flex flex-col gap-2 font-mono text-xs text-foreground/80 ${
                      i % 2 === 0 ? 'md:items-end' : ''
                    }`}
                  >
                    {exp.points.map((point) => (
                      <li key={point} className="leading-relaxed text-pretty">
                        • {point}
                      </li>
                    ))}
                  </ul>

                  <div
                    className={`mt-4 flex flex-wrap gap-2 ${
                      i % 2 === 0 ? 'md:justify-end' : ''
                    }`}
                  >
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-accent-neon/30 bg-transparent px-2 py-0.5 font-mono text-[10px] text-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}