import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Reveal children on scroll. Attach returned ref to container.
 * Matches direct children, or opts.selector within container.
 */
export const useScrollReveal = (opts = {}) => {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current || typeof window === 'undefined') return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const targets = opts.selector
      ? ref.current.querySelectorAll(opts.selector)
      : Array.from(ref.current.children)

    if (!targets.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { y: opts.y ?? 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: opts.duration ?? 0.9,
          delay: opts.delay ?? 0,
          ease: opts.ease ?? 'power3.out',
          stagger: opts.stagger ?? 0.08,
          scrollTrigger: {
            trigger: ref.current,
            start: opts.start ?? 'top 85%',
            once: opts.once ?? true,
          },
        }
      )
    }, ref.current)

    return () => ctx.revert()
  }, [opts.y, opts.duration, opts.delay, opts.ease, opts.stagger, opts.start, opts.once, opts.selector])

  return ref
}

/**
 * Parallax a single element relative to viewport scroll.
 * Positive y moves element up as scroll advances.
 */
export const useParallax = (y = 80) => {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current || typeof window === 'undefined') return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        y: -y,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, ref.current)
    return () => ctx.revert()
  }, [y])
  return ref
}
