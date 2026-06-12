"use client"

import { useEffect, useRef } from "react"

type Node = {
  x: number
  y: number
  vx: number
  vy: number
}

type Pulse = {
  a: number // source node index
  b: number // target node index
  t: number // 0..1 progress
  speed: number
  hue: "cyan" | "orange" | "magenta"
}

const COLORS = {
  cyan: "120, 220, 255",
  orange: "255, 150, 70",
  magenta: "240, 110, 200",
}

export function NeonBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let nodes: Node[] = []
    let pulses: Pulse[] = []
    let raf = 0
    const mouse = { x: -9999, y: -9999 }

    const LINK_DIST = 170

    function buildNodes() {
      const area = width * height
      const count = Math.max(26, Math.min(70, Math.round(area / 26000)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
      }))
    }

    function resize() {
      width = canvas.clientWidth
      height = canvas.clientHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildNodes()
    }

    function spawnPulse() {
      if (nodes.length < 2) return
      const a = Math.floor(Math.random() * nodes.length)
      // find a near neighbour to make pulse travel along a visible link
      let b = -1
      let best = LINK_DIST
      for (let i = 0; i < nodes.length; i++) {
        if (i === a) continue
        const d = Math.hypot(nodes[a].x - nodes[i].x, nodes[a].y - nodes[i].y)
        if (d < best) {
          best = d
          b = i
        }
      }
      if (b === -1) return
      const hues: Pulse["hue"][] = ["cyan", "orange", "magenta", "cyan"]
      pulses.push({
        a,
        b,
        t: 0,
        speed: 0.006 + Math.random() * 0.012,
        hue: hues[Math.floor(Math.random() * hues.length)],
      })
    }

    function draw() {
      ctx.clearRect(0, 0, width, height)

      // move nodes
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > width) n.vx *= -1
        if (n.y < 0 || n.y > height) n.vy *= -1

        // subtle attraction toward cursor
        const dx = mouse.x - n.x
        const dy = mouse.y - n.y
        const dist = Math.hypot(dx, dy)
        if (dist < 220) {
          n.x += (dx / dist) * 0.25
          n.y += (dy / dist) * 0.25
        }
      }

      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const d = Math.hypot(dx, dy)
          if (d < LINK_DIST) {
            const alpha = (1 - d / LINK_DIST) * 0.22
            ctx.strokeStyle = `rgba(120, 200, 255, ${alpha})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      // nodes
      for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(150, 215, 255, 0.55)"
        ctx.fill()
      }

      // pulses travelling along links
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i]
        const na = nodes[p.a]
        const nb = nodes[p.b]
        if (!na || !nb) {
          pulses.splice(i, 1)
          continue
        }
        p.t += p.speed
        if (p.t >= 1) {
          pulses.splice(i, 1)
          continue
        }
        const px = na.x + (nb.x - na.x) * p.t
        const py = na.y + (nb.y - na.y) * p.t
        const rgb = COLORS[p.hue]
        const grad = ctx.createRadialGradient(px, py, 0, px, py, 7)
        grad.addColorStop(0, `rgba(${rgb}, 0.9)`)
        grad.addColorStop(1, `rgba(${rgb}, 0)`)
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(px, py, 7, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = `rgba(${rgb}, 1)`
        ctx.beginPath()
        ctx.arc(px, py, 1.8, 0, Math.PI * 2)
        ctx.fill()
      }

      if (pulses.length < 14 && Math.random() < 0.08) spawnPulse()

      raf = requestAnimationFrame(draw)
    }

    function onMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    function onLeave() {
      mouse.x = -9999
      mouse.y = -9999
    }

    resize()
    if (reduce) {
      // draw a single static frame
      draw()
      cancelAnimationFrame(raf)
    } else {
      draw()
    }

    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseout", onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseout", onLeave)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* deep gradient base */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_-10%,oklch(0.27_0.06_256)_0%,oklch(0.2_0.04_256)_45%,oklch(0.16_0.03_258)_100%)]" />
      {/* neon grid floor */}
      <div
        className="absolute inset-x-0 bottom-0 h-[55vh] opacity-[0.18] [mask-image:linear-gradient(to_top,black,transparent)]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(120,220,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(120,220,255,0.5) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          transform: "perspective(420px) rotateX(62deg)",
          transformOrigin: "bottom",
        }}
      />
      {/* ambient floating orbs */}
      <div className="animate-float-slow absolute -left-24 top-24 size-72 rounded-full bg-[radial-gradient(circle,oklch(0.72_0.2_41/0.28),transparent_70%)] blur-2xl" />
      <div
        className="animate-float-slow absolute right-[-6rem] top-1/3 size-80 rounded-full bg-[radial-gradient(circle,oklch(0.82_0.15_200/0.22),transparent_70%)] blur-2xl"
        style={{ animationDelay: "-5s" }}
      />
      <div
        className="animate-float-slow absolute bottom-10 left-1/3 size-72 rounded-full bg-[radial-gradient(circle,oklch(0.7_0.2_350/0.18),transparent_70%)] blur-2xl"
        style={{ animationDelay: "-9s" }}
      />
      {/* animated network canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* subtle vignette to keep text readable */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_40%,transparent_40%,oklch(0.16_0.03_258/0.6)_100%)]" />
    </div>
  )
}
