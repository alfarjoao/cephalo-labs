import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export default function CountUp({ to, suffix = '', prefix = '', duration = 1.8, decimals = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [value, setValue] = useState(0)
  const frameRef = useRef(null)

  useEffect(() => {
    if (!inView) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) { setValue(to); return }

    const start = performance.now()
    const animate = (now) => {
      const elapsed = (now - start) / 1000
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(eased * to)
      if (progress < 1) frameRef.current = requestAnimationFrame(animate)
      else setValue(to)
    }
    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [inView, to, duration])

  const display = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString()
  return <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>{prefix}{display}{suffix}</span>
}
