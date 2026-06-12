'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { projects } from '@/lib/data'
import { ArrowUpRight } from 'lucide-react'
import { GlitchOnView } from '@/components/GlitchOnView'

function BinaryCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let animationId: number
    let columns: number[] = []
    const fontSize = 14
    const chars = ['0', '1']

    const resize = () => {
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width
      canvas.height = height
      columns = Array.from({ length: Math.ceil(width / fontSize) }, () => Math.random() * height)
    }

    const draw = () => {
      if (!ctx) return
      ctx.fillStyle = 'rgba(10, 12, 15, 0.05)'
      ctx.fillRect(0, 0, width, height)
      ctx.fillStyle = '#d9ff00'
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < columns.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const x = i * fontSize
        ctx.fillText(char, x, columns[i])
        if (columns[i] > height && Math.random() > 0.975) {
          columns[i] = 0
        }
        columns[i] += fontSize * 0.6
      }
      animationId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
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

export function Projects() {
  return (
    <section id="projets" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="section-corner mb-12 max-w-2xl">
          <span className="font-mono text-xs font-semibold tracking-widest text-accent-neon">
            [05 — RÉALISATIONS]
          </span>
          <GlitchOnView>

          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            projets majeurs
          </h2>
          </GlitchOnView>
          <p className="mt-4 font-mono text-sm leading-relaxed text-muted">
            Des plateformes web conçues, développées et déployées de bout en bout.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <motion.article
              key={project.name}
              variants={cardVariants}
              className="group relative overflow-hidden border-l-2 border-accent-neon/40 bg-black/40 p-6 transition-all duration-300 hover:border-accent-neon hover:shadow-[0_0_16px_rgba(217,255,0,0.2)] hover:-translate-y-1"
            >
              <BinaryCanvas />
              <div className="relative z-10 flex items-start justify-between">
                <span className="border border-accent-neon/50 bg-transparent px-2 py-0.5 font-mono text-[10px] text-accent-neon">
                  {project.type}
                </span>
                <ArrowUpRight className="size-4 text-muted transition-colors group-hover:text-accent-neon" />
              </div>
              <h3 className="relative z-10 mt-4 font-heading text-xl font-bold uppercase tracking-tight">
                {project.name}
              </h3>
              <p className="relative z-10 mt-2 font-mono text-xs leading-relaxed text-foreground/80 text-pretty">
                {project.description}
              </p>
              <div className="relative z-10 mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-accent-neon/30 bg-transparent px-2 py-0.5 font-mono text-[10px] text-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}