'use client'

import { useEffect, useRef } from 'react'

export function CrtGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let animationId: number
    let particles: { x: number; y: number; vx: number; vy: number }[] = []

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height

      // generate particles at grid intersections (every 60px)
      const step = 60
      particles = []
      for (let x = step; x < width; x += step) {
        for (let y = step; y < height; y += step) {
          particles.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
          })
        }
      }
    }

    const draw = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)

      // draw grid lines
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(217, 255, 0, 0.15)'
      ctx.lineWidth = 1
      const step = 60
      for (let x = step; x < width; x += step) {
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = step; y < height; y += step) {
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // update and draw particles
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        ctx.fillStyle = '#d9ff00'
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
        ctx.fill()
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

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  )
}