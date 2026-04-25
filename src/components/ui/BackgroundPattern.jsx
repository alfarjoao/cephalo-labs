import { useEffect, useRef } from 'react'

/**
 * Ambient moving pattern for section backgrounds.
 * Variants: 'neural' | 'grid' | 'orbit' | 'wave' | 'drift'
 * Tone: 'dark' (renders white ink on dark bg) | 'paper' (renders black ink on paper bg).
 * Always renders SOMETHING — site spec says no static-empty backgrounds.
 */
const PARTICLE_COUNT = 60
const CONNECTION_DIST = 140

export default function BackgroundPattern({
  variant = 'neural',
  tone = 'dark',
  opacity = 0.12,
  speed = 0.22,
  className = '',
}) {
  const canvasRef = useRef(null)

  const inkRGB = tone === 'dark' ? '255,255,255' : '10,10,10'

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    let particles = []

    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.scale(dpr, dpr)
      init()
    }

    class P {
      constructor() { this.reset(true) }
      reset(rand = false) {
        this.x = Math.random() * canvas.offsetWidth
        this.y = Math.random() * canvas.offsetHeight
        this.vx = (Math.random() - 0.5) * speed
        this.vy = (Math.random() - 0.5) * speed
        this.r = Math.random() * 1.4 + 0.3
        this.phase = rand ? Math.random() * Math.PI * 2 : 0
      }
      step(t) {
        this.x += this.vx
        this.y += this.vy
        if (this.x < 0 || this.x > canvas.offsetWidth)  this.vx *= -1
        if (this.y < 0 || this.y > canvas.offsetHeight) this.vy *= -1
      }
      draw(t) {
        const pulse = 0.7 + 0.3 * Math.sin(t / 900 + this.phase)
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r * pulse, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${inkRGB},${opacity})`
        ctx.fill()
      }
    }

    const init = () => {
      const count = variant === 'dots' ? 110 : PARTICLE_COUNT
      particles = Array.from({ length: count }, () => new P())
    }

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < CONNECTION_DIST) {
            const a = (1 - d / CONNECTION_DIST) * opacity * 0.45
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${inkRGB},${a})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    const drawOrbit = (t) => {
      const cx = canvas.offsetWidth / 2
      const cy = canvas.offsetHeight / 2
      for (let ring = 0; ring < 4; ring++) {
        const radius = 120 + ring * 110
        ctx.beginPath()
        ctx.strokeStyle = `rgba(${inkRGB},${opacity * (0.6 - ring * 0.12)})`
        ctx.lineWidth = 0.5
        ctx.arc(cx, cy, radius, 0, Math.PI * 2)
        ctx.stroke()
        const rot = (t / 9000) * (ring % 2 ? -1 : 1) + ring
        const px = cx + Math.cos(rot) * radius
        const py = cy + Math.sin(rot) * radius
        ctx.beginPath()
        ctx.arc(px, py, 2.2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${inkRGB},${opacity * 1.4})`
        ctx.fill()
      }
    }

    const drawWave = (t) => {
      ctx.strokeStyle = `rgba(${inkRGB},${opacity * 0.9})`
      ctx.lineWidth = 0.6
      for (let line = 0; line < 3; line++) {
        ctx.beginPath()
        for (let x = 0; x <= canvas.offsetWidth; x += 6) {
          const y = canvas.offsetHeight / 2
            + Math.sin(x / 90 + t / 1400 + line * 1.4) * (28 + line * 18)
            + line * 6
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }
    }

    const tick = (t) => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
      if (variant === 'orbit') drawOrbit(t)
      else if (variant === 'wave') drawWave(t)
      else {
        particles.forEach(p => { p.step(t); p.draw(t) })
        if (variant === 'neural') drawLines()
      }
      raf = requestAnimationFrame(tick)
    }

    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(raf)
      else raf = requestAnimationFrame(tick)
    }

    resize()
    raf = requestAnimationFrame(tick)
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [variant, tone, opacity, speed, inkRGB])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none select-none ${className}`}
      aria-hidden="true"
    />
  )
}
