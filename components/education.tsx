'use client'

import { motion } from 'framer-motion'
import { education, certifications, qualities } from '@/lib/data'
import { GraduationCap, Award, ShieldCheck } from 'lucide-react'
import { GlitchOnView } from '@/components/GlitchOnView'


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export function Education() {
  return (
    <section
      id="formations"
      className="border-y border-accent-neon/20 bg-card-bg/40 px-6 py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="section-corner mb-12 max-w-2xl">
          <span className="font-mono text-xs font-semibold tracking-widest text-accent-neon">
            [06 — CURSUS]
          </span>
          <GlitchOnView>

          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            formations & certifications
          </h2>
          </GlitchOnView>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid gap-10 lg:grid-cols-3"
        >
          {/* Formations */}
          <div>
            <h3 className="mb-5 flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-wider text-accent-neon">
              <GraduationCap className="size-4" />
              formations
            </h3>
            <div className="flex flex-col gap-4">
              {education.map((item) => (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  className="border-l-2 border-accent-neon/40 bg-black/40 p-4"
                >
                  <span className="font-mono text-xs text-accent-neon">
                    {item.period}
                  </span>
                  <h4 className="mt-1 font-heading font-bold uppercase tracking-tight">
                    {item.title}
                  </h4>
                  <p className="mt-1 font-mono text-xs text-muted">{item.field}</p>
                  <p className="font-mono text-xs text-muted">{item.school}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="mb-5 flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-wider text-accent-neon">
              <Award className="size-4" />
              certifications
            </h3>
            <div className="flex flex-col gap-4">
              {certifications.map((cert) => (
                <motion.div
                  key={cert.title}
                  variants={itemVariants}
                  className="border-l-2 border-accent-neon/40 bg-black/40 p-4"
                >
                  <h4 className="font-heading font-bold uppercase tracking-tight leading-snug">
                    {cert.title}
                  </h4>
                  <p className="mt-1 font-mono text-xs text-accent-neon">{cert.issuer}</p>
                  <p className="font-mono text-xs text-muted">{cert.field}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Qualités */}
          <div>
            <h3 className="mb-5 flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-wider text-accent-neon">
              <ShieldCheck className="size-4" />
              qualités
            </h3>
            <div className="flex flex-col gap-3">
              {qualities.map((quality) => (
                <motion.div
                  key={quality}
                  variants={itemVariants}
                  className="flex items-center gap-3 border-l-2 border-accent-neon/40 bg-black/40 p-4 font-mono text-sm"
                >
                  <span className="size-1.5 shrink-0 bg-accent-neon" />
                  {quality}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}