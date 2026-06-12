'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Hero } from '@/components/hero'
import { Skills } from '@/components/skills'
import { TechStack } from '@/components/tech-stack'
import { Experience } from '@/components/experience'
import { Projects } from '@/components/projects'
import { Education } from '@/components/education'
import { Contact, Footer } from '@/components/contact'
import { Navbar } from '@/components/navbar'
import { SystemLogs } from '@/components/SystemLogs'

function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          return 100
        }
        return p + 2
      })
    }, 30)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      <div className="w-64 space-y-4 font-mono text-sm text-accent-neon">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-accent-err animate-pulse" />
          <span>booting system...</span>
        </div>
        <div className="h-1 w-full bg-border-subtle">
          <motion.div
            className="h-full bg-accent-neon"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>
        <div className="text-right text-xs text-muted">{progress}%</div>
      </div>
    </motion.div>
  )
}

export default function Page() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>
      <Navbar />
      <main className="relative">
        <Hero />
        <Skills />
        <TechStack />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
      <SystemLogs />
    </>
  )
}