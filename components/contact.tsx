'use client'

import { profile } from '@/lib/data'
import { motion } from 'framer-motion'
import { Mail, Phone, Code2, MapPin, Send } from 'lucide-react'
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

export function Contact() {
  const items = [
    { icon: Mail, label: 'EMAIL', value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: 'TÉLÉPHONE', value: profile.phone, href: `tel:${profile.phone.replace(/[^0-9+]/g, '')}` },
    { icon: Code2, label: 'GITHUB', value: profile.github, href: profile.githubUrl },
    { icon: MapPin, label: 'LOCALISATION', value: profile.location, href: undefined },
  ]

  return (
    <section id="contact" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="border-l-2 border-accent-neon bg-black/40 p-8 sm:p-12">
          <div className="section-corner">
            <span className="font-mono text-xs font-semibold tracking-widest text-accent-neon">
              [07 — CONTACT]
            </span>
              <GlitchOnView>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              travaillons ensemble
            </h2>
            </GlitchOnView>
            <p className="mt-4 font-mono text-sm leading-relaxed text-muted">
              Disponible pour des missions d'administration système, de gestion d'infrastructure ou de développement full‑stack.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-8 grid gap-4 sm:grid-cols-2"
          >
            {items.map((item) => {
              const Icon = item.icon
              return item.href ? (
                <motion.a
                  key={item.label}
                  variants={itemVariants}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="group flex items-center gap-4 border border-accent-neon/30 bg-black/40 p-4 transition-all hover:border-accent-neon hover:bg-black/60"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center border border-accent-neon/50 text-accent-neon transition-colors group-hover:border-accent-neon">
                    <Icon className="size-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-xs uppercase tracking-wide text-accent-neon">
                      {item.label}
                    </span>
                    <span className="block truncate font-mono text-sm text-foreground">
                      {item.value}
                    </span>
                  </span>
                </motion.a>
              ) : (
                <motion.div
                  key={item.label}
                  variants={itemVariants}
                  className="flex items-center gap-4 border border-accent-neon/30 bg-black/40 p-4"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center border border-accent-neon/50 text-accent-neon">
                    <Icon className="size-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-xs uppercase tracking-wide text-accent-neon">
                      {item.label}
                    </span>
                    <span className="block truncate font-mono text-sm text-foreground">
                      {item.value}
                    </span>
                  </span>
                </motion.div>
              )
            })}
          </motion.div>

          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            href={`mailto:${profile.email}`}
            className="mt-8 inline-flex items-center gap-2 border border-accent-neon bg-transparent px-6 py-3 font-mono text-sm font-semibold text-accent-neon transition-colors hover:bg-accent-neon hover:text-black"
          >
            <Send className="size-4" />
            ENVOYER UN MESSAGE
          </motion.a>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-accent-neon/20 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center font-mono text-xs text-muted sm:flex-row sm:text-left">
        <p>
          © {new Date().getFullYear()} {profile.name} — {profile.role}
        </p>
        <p className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 bg-accent-neon" />
          {profile.location}
        </p>
      </div>
    </footer>
  )
}