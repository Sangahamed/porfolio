'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 400 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [cursorX, cursorY])

  useEffect(() => {
    const handleMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '0'
    }
    const handleMouseEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '1'
    }
    document.body.addEventListener('mouseleave', handleMouseLeave)
    document.body.addEventListener('mouseenter', handleMouseEnter)
    return () => {
      document.body.removeEventListener('mouseleave', handleMouseLeave)
      document.body.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [])

  return (
    <>
      {/* curseur principal */}
      <motion.div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[200] h-3 w-3 -translate-x-1/2 -translate-y-1/2 border border-accent-neon bg-transparent transition-opacity duration-300"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />
      {/* point central lumineux */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[201] h-1 w-1 -translate-x-1/2 -translate-y-1/2 bg-accent-neon shadow-[0_0_6px_#d9ff00]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />
    </>
  )
}