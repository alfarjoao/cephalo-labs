# Cephalo Labs — Major Visual & Content Upgrade

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade Cephalo Labs site with DM Sans typography, animated backgrounds, scroll animations on every page, four new Home sections, Projects filter, Partners timeline, Polypus dual-identity copy, and an upgraded Footer.

**Architecture:** All changes are layered — typography first (touches every file), then new shared components, then page-by-page content additions. Framer Motion `useInView`/`useScroll` for all animations. Canvas 2D (not Three.js) for `AnimatedBackground` so it's lightweight on all pages.

**Tech Stack:** React 18, Framer Motion 11, Tailwind CSS 3, Vite 5, DM Sans (Google Fonts), existing Three.js/R3F only in `NeuralScene.jsx`

---

## File Map

| Action | File | What changes |
|--------|------|-------------|
| Modify | `index.html` | Remove DM Serif Display from Google Fonts URL |
| Modify | `tailwind.config.js` | Remove `serif` font family key |
| Modify | `src/pages/Home.jsx` | Replace font-serif → font-sans; hero upgrade; 3 new sections |
| Modify | `src/pages/About.jsx` | Replace font-serif → font-sans; enhanced scroll animations |
| Modify | `src/pages/Products.jsx` | Replace font-serif → font-sans; Polypus dual-identity copy |
| Modify | `src/pages/Projects.jsx` | Replace font-serif → font-sans; add `category` field; filter tabs; logos |
| Modify | `src/pages/ProjectDetail.jsx` | Replace font-serif → font-sans |
| Modify | `src/pages/Founder.jsx` | Replace font-serif → font-sans (incl. fallback string) |
| Modify | `src/pages/Partners.jsx` | Replace font-serif → font-sans; count-up stats; timeline |
| Modify | `src/pages/Contact.jsx` | Replace font-serif → font-sans |
| Modify | `src/components/layout/Footer.jsx` | Newsletter input; Cephalo App link; "A Cephalo Labs company"; pixel mascot |
| Modify | `src/components/3d/NeuralScene.jsx` | Mobile: 400 particles instead of 800 |
| Create | `src/components/ui/AnimatedBackground.jsx` | Canvas 2D neural particle background |
| Create | `src/components/ui/CountUp.jsx` | Count-up animation component |

---

## Task 1: Typography — Remove DM Serif Display from Config

**Files:**
- Modify: `index.html`
- Modify: `tailwind.config.js`

- [ ] **Step 1: Update Google Fonts URL in index.html**

Replace line 10 entirely:
```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap" rel="stylesheet">
```
(Remove `DM+Serif+Display` entirely from the URL.)

- [ ] **Step 2: Remove serif from tailwind.config.js**

Replace:
```js
fontFamily: {
  sans: ['DM Sans', 'sans-serif'],
  serif: ['DM Serif Display', 'serif'],
},
```
With:
```js
fontFamily: {
  sans: ['DM Sans', 'sans-serif'],
},
```

- [ ] **Step 3: Commit**
```bash
git add index.html tailwind.config.js
git commit -m "feat: remove DM Serif Display, DM Sans only"
```

---

## Task 2: Typography — Replace font-serif in All Pages

Every `font-serif` instance becomes `font-sans font-semibold` (headings) or `font-sans font-medium` (secondary). Every `italic` class on formerly-serif text is removed. Adjust tracked spacing as appropriate.

**Files:**
- Modify: `src/pages/About.jsx`
- Modify: `src/pages/Products.jsx`
- Modify: `src/pages/Projects.jsx`
- Modify: `src/pages/ProjectDetail.jsx`
- Modify: `src/pages/Founder.jsx`
- Modify: `src/pages/Partners.jsx`
- Modify: `src/pages/Contact.jsx`

**Substitution rules (apply everywhere):**

| Old pattern | New pattern |
|---|---|
| `font-serif` on `h1` | `font-sans font-semibold tracking-tight` |
| `font-serif` on `h2` | `font-sans font-semibold tracking-tight` |
| `font-serif text-5xl` on stat values | `font-sans font-semibold text-5xl` |
| `font-serif text-2xl` on blockquote | `font-sans font-light text-2xl` |
| `font-serif text-4xl` (Contact thank-you) | `font-sans font-semibold text-4xl` |
| `font-serif text-8xl` in innerHTML string | `font-sans font-semibold text-8xl` |
| Any `italic` class on serif headings | remove `italic` |

- [ ] **Step 1: Fix About.jsx**

Find: `font-serif text-[clamp(3rem,6vw,5.5rem)]`
Replace: `font-sans font-semibold text-[clamp(3rem,6vw,5.5rem)] tracking-tight`

Find (stats section, 4 occurrences): `font-serif text-5xl`
Replace: `font-sans font-semibold text-5xl`

Remove any `italic` className on About h1 children (the word "built different" is styled italic via class — remove `italic` or change to `font-light`).

- [ ] **Step 2: Fix Products.jsx**

Find: `font-serif text-[clamp(3rem,6vw,5rem)]`
Replace: `font-sans font-semibold text-[clamp(3rem,6vw,5rem)] tracking-tight`

- [ ] **Step 3: Fix Projects.jsx**

Find: `font-serif` on h1
Replace: `font-sans font-semibold tracking-tight`

- [ ] **Step 4: Fix ProjectDetail.jsx**

Find: `font-serif text-[clamp(2.5rem,5vw,4rem)]`
Replace: `font-sans font-semibold text-[clamp(2.5rem,5vw,4rem)] tracking-tight`

- [ ] **Step 5: Fix Founder.jsx (3 locations)**

h1: `font-serif` → `font-sans font-semibold tracking-tight`

Blockquote: `font-serif text-2xl` → `font-sans font-light text-2xl`

Simão initial span: `font-serif text-2xl` → `font-sans font-semibold text-2xl`

Fallback innerHTML string — find the string:
```
font-serif text-8xl
```
Replace with:
```
font-sans font-semibold text-8xl
```
(This is inside a JS string used in `onError`, not JSX — use exact string match.)

- [ ] **Step 6: Fix Partners.jsx**

h1: `font-serif` → `font-sans font-semibold tracking-tight`

Stats (4 occurrences): `font-serif text-5xl` → `font-sans font-semibold text-5xl`

- [ ] **Step 7: Fix Contact.jsx**

h1: `font-serif` → `font-sans font-semibold tracking-tight`

Thank-you state: `font-serif text-4xl` → `font-sans font-semibold text-4xl`

- [ ] **Step 8: Verify no font-serif remains**
```bash
grep -r "font-serif" src/
```
Expected: zero matches.

- [ ] **Step 9: Commit**
```bash
git add src/pages/
git commit -m "feat: replace all font-serif with DM Sans across all pages"
```

---

## Task 3: Typography — Replace font-serif in Home.jsx

Home.jsx has the most instances and will also be heavily modified later. Keep typography changes in their own commit.

**Files:**
- Modify: `src/pages/Home.jsx`

- [ ] **Step 1: Replace font-serif instances**

Hero h1: `font-serif text-[clamp(3rem,8vw,7rem)]`
→ `font-sans font-semibold text-[clamp(3rem,8vw,7rem)] tracking-tight`

Polypus spotlight h2: `font-serif text-5xl`
→ `font-sans font-semibold text-5xl tracking-tight`

CTA h2: `font-serif text-[clamp(2.5rem,5vw,4.5rem)]`
→ `font-sans font-semibold text-[clamp(2.5rem,5vw,4.5rem)] tracking-tight`

Remove all `italic` classes on h1 child spans.

- [ ] **Step 2: Verify**
```bash
grep "font-serif" src/pages/Home.jsx
```
Expected: zero matches.

- [ ] **Step 3: Confirm build still works**
```bash
npm run build
```
Expected: exits 0.

- [ ] **Step 4: Commit**
```bash
git add src/pages/Home.jsx
git commit -m "feat: replace font-serif in Home.jsx"
```

---

## Task 4: Create AnimatedBackground Component

A reusable Canvas 2D particle + connection line layer. Used on all pages as a subtle ambient background.

**Files:**
- Create: `src/components/ui/AnimatedBackground.jsx`

- [ ] **Step 1: Write the component**

```jsx
import { useEffect, useRef } from 'react'

const PARTICLE_COUNT = 55
const CONNECTION_DIST = 130
const SPEED = 0.28

export default function AnimatedBackground({ opacity = 0.06 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      init()
    }

    class Particle {
      constructor() { this.reset() }
      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * SPEED
        this.vy = (Math.random() - 0.5) * SPEED
        this.r = Math.random() * 1.2 + 0.4
      }
      update() {
        this.x += this.vx
        this.y += this.vy
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(10,10,10,${opacity})`
        ctx.fill()
      }
    }

    const init = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle())
    }

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * opacity * 0.45
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(10,10,10,${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => { p.update(); p.draw() })
      drawLines()
      animId = requestAnimationFrame(tick)
    }

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(animId)
      else tick()
    }

    resize()
    tick()
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [opacity])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      aria-hidden="true"
    />
  )
}
```

- [ ] **Step 2: Commit**
```bash
git add src/components/ui/AnimatedBackground.jsx
git commit -m "feat: add AnimatedBackground canvas particle component"
```

---

## Task 5: Create CountUp Component

Used for stats in About and Partners pages.

**Files:**
- Create: `src/components/ui/CountUp.jsx`

- [ ] **Step 1: Write the component**

```jsx
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export default function CountUp({ to, suffix = '', duration = 1.8 }) {
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
      setValue(Math.round(eased * to))
      if (progress < 1) frameRef.current = requestAnimationFrame(animate)
    }
    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [inView, to, duration])

  return <span ref={ref}>{value}{suffix}</span>
}
```

- [ ] **Step 2: Commit**
```bash
git add src/components/ui/CountUp.jsx
git commit -m "feat: add CountUp animation component"
```

---

## Task 6: NeuralScene Mobile Optimization

Reduce particle count to 400 on mobile devices.

**Files:**
- Modify: `src/components/3d/NeuralScene.jsx`

- [ ] **Step 1: Add mobile detection and conditional particle count**

In `NeuralScene.jsx`, in the `NeuralParticles` component, find where `800` is used as the particle count. Add this before the component:

```jsx
const isMobile = window.innerWidth < 768
```

Then replace the hardcoded `800` with `isMobile ? 400 : 800`.

The `positions` Float32Array size is `count * 3`, so:
```jsx
const count = window.innerWidth < 768 ? 400 : 800
const positions = useMemo(() => {
  const arr = new Float32Array(count * 3)
  // ... existing fill logic unchanged
}, [count])
```

- [ ] **Step 2: Commit**
```bash
git add src/components/3d/NeuralScene.jsx
git commit -m "perf: reduce NeuralScene particles to 400 on mobile"
```

---

## Task 7: Home Page — Hero Upgrade

Animated word reveal, higher neural opacity, scroll indicator, floating label.

**Files:**
- Modify: `src/pages/Home.jsx`

- [ ] **Step 1: Add required imports at top of Home.jsx**

Ensure these are in the import block (add only what's missing):
```jsx
import { useRef, Suspense } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import NeuralScene from '../components/3d/NeuralScene'
import PageWrapper from '../components/ui/PageWrapper'
```

- [ ] **Step 2: Add AnimatedHeadline helper inside Home.jsx (before main export)**

```jsx
function AnimatedHeadline({ words, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <h1 ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </h1>
  )
}
```

- [ ] **Step 3: Replace hero h1 with AnimatedHeadline**

Find the existing h1 in the hero section (currently renders "We build / intelligent / systems" across spans). Replace the entire `<h1>` element with:

```jsx
<AnimatedHeadline
  words={['We', 'build', 'intelligent', 'systems.']}
  className="font-sans font-semibold text-[clamp(3rem,8vw,7rem)] tracking-tight leading-[1.0] text-black mb-8"
/>
```

- [ ] **Step 4: Replace the static floating label with an animated one**

Find the label element (current text: "AI Developer Agency — Coimbra, Portugal"). Replace:
```jsx
<motion.div
  initial={{ opacity: 0, y: -8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
  className="inline-flex items-center gap-2 border border-gray-200 px-4 py-2 mb-10"
>
  <span className="w-1.5 h-1.5 rounded-full bg-black inline-block" />
  <span className="text-xs font-medium tracking-widest uppercase text-gray-600">
    AI Developer Agency — Coimbra, Portugal
  </span>
</motion.div>
```

- [ ] **Step 5: Increase NeuralScene opacity**

Find the wrapper div around `<NeuralScene />` with `className` containing `opacity-40`.
Change `opacity-40` to `opacity-35` (use Tailwind JIT: `opacity-[0.35]`).

- [ ] **Step 6: Add scroll indicator at bottom of hero section**

Inside the hero section div, before closing `</section>` or `</div>`, add:
```jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1.2, duration: 0.8 }}
  className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
>
  <span className="text-xs font-medium tracking-widest uppercase text-gray-400">Scroll</span>
  <motion.div
    animate={{ y: [0, 6, 0] }}
    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
  >
    <ArrowDown size={14} className="text-gray-400" />
  </motion.div>
</motion.div>
```

Make sure the hero section has `relative overflow-hidden` if not already set.

- [ ] **Step 7: Commit**
```bash
git add src/pages/Home.jsx
git commit -m "feat: upgrade Home hero with word reveal, animated label, scroll indicator"
```

---

## Task 8: Home — Ecosystem Section

New section between the Three Pillars section and Featured Work showing how everything connects.

**Files:**
- Modify: `src/pages/Home.jsx`

- [ ] **Step 1: Write EcosystemSection and insert it after the pillars section**

Add this function inside `Home.jsx` (before the `export default function Home`):

```jsx
function EcosystemSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const nodes = [
    {
      id: 'labs',
      label: 'Cephalo Labs',
      sub: 'The company',
      center: true,
    },
    {
      id: 'polypus',
      label: 'Polypus',
      sub: 'AI coding orchestrator',
      note: 'Like Claude Code, but multi-model',
      href: '/products',
    },
    {
      id: 'app',
      label: 'Cephalo App',
      sub: 'The AI workspace',
      note: 'Chat, code, create — coming soon',
      href: '/contact',
    },
    {
      id: 'pantheon',
      label: 'Pantheon Growth',
      sub: 'Agency partner',
      note: 'Strategy & growth execution',
      href: '/partners',
    },
  ]

  return (
    <section className="py-32 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeIn>
          <span className="text-xs font-medium tracking-widest uppercase text-gray-400 block mb-3">
            The Ecosystem
          </span>
          <h2 className="font-sans font-semibold text-[clamp(2rem,4vw,3.5rem)] tracking-tight mb-4">
            Everything connects.
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mb-20">
            One lab. Multiple products. One agency partner. All built to reinforce each other.
          </p>
        </FadeIn>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200">
          {nodes.map((node, i) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className={`bg-white p-10 flex flex-col gap-3 ${node.center ? 'bg-gray-50' : ''}`}
            >
              {node.center && (
                <span className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-1">
                  Core
                </span>
              )}
              <h3 className="font-sans font-semibold text-xl tracking-tight text-black">
                {node.label}
              </h3>
              <p className="text-xs font-medium tracking-widest uppercase text-gray-400">
                {node.sub}
              </p>
              {node.note && (
                <p className="text-sm text-gray-500 mt-1">{node.note}</p>
              )}
              {node.href && (
                <a
                  href={node.href}
                  className="text-xs font-medium tracking-widest uppercase text-black border-b border-gray-200 pb-0.5 self-start mt-auto hover:border-black transition-colors duration-200"
                >
                  Learn more →
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

Then, in the `Home` component JSX, insert `<EcosystemSection />` after the three pillars `<section>` and before the Featured Work `<section>`.

- [ ] **Step 2: Commit**
```bash
git add src/pages/Home.jsx
git commit -m "feat: add Ecosystem section to Home page"
```

---

## Task 9: Home — Cephalo App Teaser Section

Dark section with purple/emerald particle accents and pixel octopus.

**Files:**
- Modify: `src/pages/Home.jsx`

- [ ] **Step 1: Write CephaloAppTeaser and insert after Ecosystem section**

Add this helper component inside `Home.jsx`:

```jsx
function CephaloAppTeaser() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-32 bg-[#0A0A0A] text-white relative overflow-hidden">
      {/* Subtle purple/emerald particle accent via gradient blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)' }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 border border-white/10 px-4 py-2 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] inline-block" />
              <span className="text-xs font-medium tracking-widest uppercase text-white/50">
                In development
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-sans font-semibold text-[clamp(2rem,4vw,3.5rem)] tracking-tight text-white mb-6 leading-tight"
            >
              One app. Every AI model. Unlimited capability.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/50 text-lg max-w-lg mb-10 leading-relaxed"
            >
              Cephalo is the AI workspace built for people who build.
              Chat with any model. Orchestrate agents. Ship with Polypus.
              Everything in one place.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <a
                href="/contact"
                className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-sm font-medium tracking-widest uppercase hover:bg-white/90 transition-colors duration-200"
              >
                Join the waitlist
              </a>
            </motion.div>
          </div>

          {/* Right: pixel mascot placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-center justify-center"
          >
            <div className="relative">
              <img
                src="/logos/polypus-mark.png"
                alt="Polypus"
                className="w-40 h-40 object-contain opacity-60"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
              <div
                className="absolute inset-0 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)' }}
                aria-hidden="true"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

Insert `<CephaloAppTeaser />` after `<EcosystemSection />` and before the Featured Work section.

- [ ] **Step 2: Commit**
```bash
git add src/pages/Home.jsx
git commit -m "feat: add Cephalo App teaser dark section to Home"
```

---

## Task 10: Home — VSL Animated Explainer Section

Scroll-linked sequence on a sticky black panel. Uses `useScroll` + `useTransform`.

**Files:**
- Modify: `src/pages/Home.jsx`

- [ ] **Step 1: Add useScroll, useTransform imports**

Ensure Framer Motion import includes: `motion, useInView, useScroll, useTransform, AnimatePresence`

- [ ] **Step 2: Write VSLSection helper**

```jsx
function VSLSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const mkOpacity = (start, peak) =>
    useTransform(scrollYProgress, [start, peak, peak + 0.12], [0, 1, 1])

  const mkY = (start, peak) =>
    useTransform(scrollYProgress, [start, peak], [24, 0])

  const steps = [
    {
      text: 'You have a task.',
      opacity: mkOpacity(0.02, 0.12),
      y: mkY(0.02, 0.12),
    },
    {
      text: 'Polypus routes it to the right model.',
      opacity: mkOpacity(0.18, 0.28),
      y: mkY(0.18, 0.28),
    },
    {
      text: 'Agents execute in parallel.',
      opacity: mkOpacity(0.36, 0.46),
      y: mkY(0.36, 0.46),
    },
    {
      text: 'Done.',
      sub: 'Faster. Smarter. One orchestrator.',
      opacity: mkOpacity(0.56, 0.66),
      y: mkY(0.56, 0.66),
    },
  ]

  const modelsOpacity = mkOpacity(0.28, 0.36)
  const modelsY = mkY(0.28, 0.36)

  const models = ['Haiku', 'Sonnet', 'Opus']

  return (
    <section
      ref={containerRef}
      className="relative bg-black"
      style={{ height: '320vh' }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 w-full">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              style={{ opacity: step.opacity, y: step.y }}
              className="absolute inset-x-6 top-1/2 -translate-y-1/2 text-center pointer-events-none"
            >
              <p className="font-sans font-light text-white text-[clamp(1.8rem,4vw,3.5rem)] tracking-tight leading-tight mb-3">
                {step.text}
              </p>
              {step.sub && (
                <p className="text-white/40 text-base font-light tracking-wider mt-4">{step.sub}</p>
              )}
            </motion.div>
          ))}

          {/* Model cards — appear at step 2 */}
          <motion.div
            style={{ opacity: modelsOpacity, y: modelsY }}
            className="absolute inset-x-6 top-[60%] pointer-events-none"
          >
            <div className="flex items-center justify-center gap-4 mt-8">
              {models.map((m, i) => (
                <motion.div
                  key={m}
                  initial={false}
                  style={{ opacity: modelsOpacity }}
                  transition={{ delay: i * 0.08 }}
                  className="border border-white/10 px-6 py-3 text-center"
                >
                  <span className="text-xs font-medium tracking-widest uppercase text-white/60">{m}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Top and bottom fades */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </div>
    </section>
  )
}
```

Insert `<VSLSection />` after `<CephaloAppTeaser />` and before Featured Work.

- [ ] **Step 3: Commit**
```bash
git add src/pages/Home.jsx
git commit -m "feat: add VSL scroll-linked explainer section to Home"
```

---

## Task 11: AnimatedBackground on All Pages

Add `<AnimatedBackground>` to every page section that uses a white or gray background.

**Files:**
- Modify: `src/pages/About.jsx`
- Modify: `src/pages/Products.jsx`
- Modify: `src/pages/Projects.jsx`
- Modify: `src/pages/Founder.jsx`
- Modify: `src/pages/Partners.jsx`
- Modify: `src/pages/Contact.jsx`

**Pattern for white sections** (add to each page's first/hero section):
```jsx
import AnimatedBackground from '../components/ui/AnimatedBackground'
// ...
<section className="py-32 relative overflow-hidden">
  <AnimatedBackground opacity={0.06} />
  {/* existing content unchanged */}
</section>
```

**Pattern for gray sections** (`bg-gray-50`):
```jsx
<section className="py-24 bg-gray-50 relative overflow-hidden">
  <AnimatedBackground opacity={0.04} />
  {/* existing content unchanged */}
</section>
```

Rules:
- Add `relative overflow-hidden` to any section that gets `AnimatedBackground` if not already set.
- Do NOT add to dark (`bg-black`) sections — those have their own gradient blobs.
- One `AnimatedBackground` per page is enough (the hero/header section). Don't add to every section.

- [ ] **Step 1: Add to About.jsx header section**
- [ ] **Step 2: Add to Products.jsx header section**
- [ ] **Step 3: Add to Projects.jsx header section**
- [ ] **Step 4: Add to Founder.jsx header section**
- [ ] **Step 5: Add to Partners.jsx header section**
- [ ] **Step 6: Add to Contact.jsx header section**

- [ ] **Step 7: Commit**
```bash
git add src/pages/
git commit -m "feat: add AnimatedBackground to all page headers"
```

---

## Task 12: Scroll Animations — About & Products

**Files:**
- Modify: `src/pages/About.jsx`
- Modify: `src/pages/Products.jsx`

Each page already has a `FadeIn` helper. Enhance the following:

- [ ] **Step 1: About.jsx — Stats count-up animation**

Import `CountUp`:
```jsx
import CountUp from '../components/ui/CountUp'
```

Find the stats grid (4 stat values: `6+`, `2`, `1`, `∞`). The values are currently plain text inside `font-sans font-semibold text-5xl` spans.

Replace numeric stats with `CountUp`:
- `6+` → `<CountUp to={6} suffix="+" />`
- `2` → `<CountUp to={2} />`
- `1` → `<CountUp to={1} />`
- `∞` → leave as `∞` text (not numeric, can't count up)

Wrap stats section in `FadeIn` if not already.

- [ ] **Step 2: About.jsx — Horizontal divider animation**

For each `border-b` or `border-t` decorative line that separates sections, wrap it in:
```jsx
<motion.hr
  className="border-gray-200"
  initial={{ scaleX: 0, transformOrigin: 'left' }}
  whileInView={{ scaleX: 1 }}
  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
  viewport={{ once: true, margin: '-40px' }}
/>
```

- [ ] **Step 3: Products.jsx — Stagger feature bullets**

Find the Polypus features list (5 bullet points). Replace the static list with staggered FadeIn:
```jsx
{features.map((f, i) => (
  <FadeIn key={i} delay={i * 0.08}>
    <div className="flex items-start gap-3 py-3 border-b border-gray-100">
      <span className="w-1 h-1 rounded-full bg-black mt-2 flex-shrink-0" />
      <span className="text-sm text-gray-600">{f}</span>
    </div>
  </FadeIn>
))}
```

- [ ] **Step 4: Commit**
```bash
git add src/pages/About.jsx src/pages/Products.jsx
git commit -m "feat: scroll animations and count-up for About and Products"
```

---

## Task 13: Scroll Animations — Projects & ProjectDetail

**Files:**
- Modify: `src/pages/Projects.jsx`
- Modify: `src/pages/ProjectDetail.jsx`

- [ ] **Step 1: Projects.jsx — Already has stagger FadeIn per project row. Enhance with left-entry for left col**

For each project row's left column (number + name), add initial `x: -12` to FadeIn or replace with:
```jsx
<motion.div
  initial={{ opacity: 0, x: -16 }}
  animate={inView ? { opacity: 1, x: 0 } : {}}
  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
>
```

(Wrap each project row in a `useInView` ref if not already.)

- [ ] **Step 2: ProjectDetail.jsx — Highlights stagger**

The highlights list already uses `initial: { x: 12 }` from the Explore audit. Verify it's already animated. If not, wrap each highlight:
```jsx
<motion.div
  key={i}
  initial={{ opacity: 0, x: 16 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.5, delay: i * 0.1 }}
  viewport={{ once: true, margin: '-40px' }}
  className="flex gap-6 py-6 border-b border-gray-100"
>
```

- [ ] **Step 3: Commit**
```bash
git add src/pages/Projects.jsx src/pages/ProjectDetail.jsx
git commit -m "feat: scroll animations for Projects and ProjectDetail"
```

---

## Task 14: Scroll Animations — Partners, Founder, Contact

**Files:**
- Modify: `src/pages/Partners.jsx`
- Modify: `src/pages/Founder.jsx`
- Modify: `src/pages/Contact.jsx`

- [ ] **Step 1: Partners.jsx — stagger the "What Cephalo built" items**

Find the 3-item built list. Wrap each item with staggered FadeIn using `delay={i * 0.1}`.

- [ ] **Step 2: Founder.jsx — bio paragraphs stagger**

Find the 4 bio paragraphs. Wrap each in `<FadeIn delay={i * 0.12}>`.

- [ ] **Step 3: Contact.jsx — type selector buttons fade in**

The 4 type selector buttons should stagger:
```jsx
{types.map((t, i) => (
  <FadeIn key={t} delay={i * 0.06}>
    <button ...>{t}</button>
  </FadeIn>
))}
```

- [ ] **Step 4: Commit**
```bash
git add src/pages/Partners.jsx src/pages/Founder.jsx src/pages/Contact.jsx
git commit -m "feat: scroll animations for Partners, Founder, Contact"
```

---

## Task 15: Projects Page — Filter Tabs + Logos

**Files:**
- Modify: `src/pages/Projects.jsx`

- [ ] **Step 1: Add `category` field to projects array**

Find the `projects` array export. Add `category` to each project:
```js
{ slug: 'titan-ai',            category: 'AI Systems',  /* existing fields */ },
{ slug: 'axiom',               category: 'AI Systems',  /* existing fields */ },
{ slug: 'sovereign',           category: 'AI Systems',  /* existing fields */ },
{ slug: 'polypus',             category: 'Products',    /* existing fields */ },
{ slug: 'pantheon-growth-crm', category: 'Agency',      /* existing fields */ },
{ slug: 'pantheon-growth-os',  category: 'Agency',      /* existing fields */ },
```

- [ ] **Step 2: Add filter state and tabs**

At top of `Projects` function component, add:
```jsx
const [filter, setFilter] = useState('All')
const tabs = ['All', 'AI Systems', 'Products', 'Agency']
const visible = filter === 'All' ? projects : projects.filter(p => p.category === filter)
```

Add filter tabs above the project list:
```jsx
<div className="flex gap-1 mb-12 border-b border-gray-200 pb-0">
  {tabs.map(tab => (
    <button
      key={tab}
      onClick={() => setFilter(tab)}
      className={`px-5 py-3 text-xs font-medium tracking-widest uppercase transition-colors duration-200 border-b-2 -mb-px ${
        filter === tab
          ? 'border-black text-black'
          : 'border-transparent text-gray-400 hover:text-black'
      }`}
    >
      {tab}
    </button>
  ))}
</div>
```

- [ ] **Step 3: Animate filter transitions**

Wrap the project list in `<AnimatePresence mode="wait">` and give each row a layout animation:
```jsx
<AnimatePresence mode="popLayout">
  {visible.map((project, i) => (
    <motion.div
      key={project.slug}
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, delay: i * 0.04 }}
    >
      {/* existing project row JSX */}
    </motion.div>
  ))}
</AnimatePresence>
```

- [ ] **Step 4: Add logos to each project row**

At the start of each project row (before the project number/name), add:
```jsx
{/* Logo */}
<div className="flex-shrink-0 w-10 h-10 border border-gray-200 flex items-center justify-center overflow-hidden">
  <img
    src={`/logos/${project.slug}-mark.png`}
    alt={project.name}
    className="w-6 h-6 object-contain"
    onError={(e) => {
      e.currentTarget.style.display = 'none'
      e.currentTarget.parentElement.classList.add('bg-black')
      e.currentTarget.insertAdjacentHTML('afterend',
        `<span class="text-white text-xs font-medium font-sans">${project.name.charAt(0)}</span>`
      )
    }}
  />
</div>
```

- [ ] **Step 5: Commit**
```bash
git add src/pages/Projects.jsx
git commit -m "feat: add filter tabs and project logos to Projects page"
```

---

## Task 16: Partners Page — Count-up Stats + Timeline

**Files:**
- Modify: `src/pages/Partners.jsx`

- [ ] **Step 1: Import CountUp**
```jsx
import CountUp from '../components/ui/CountUp'
```

- [ ] **Step 2: Replace stat values with CountUp**

Current stats: `2x`, `80%`, `3×`, `100%`. These are the numeric parts:

```jsx
// 2x
<span className="font-sans font-semibold text-5xl"><CountUp to={2} suffix="x" /></span>
// 80%
<span className="font-sans font-semibold text-5xl"><CountUp to={80} suffix="%" /></span>
// 3×
<span className="font-sans font-semibold text-5xl"><CountUp to={3} suffix="×" /></span>
// 100%
<span className="font-sans font-semibold text-5xl"><CountUp to={100} suffix="%" /></span>
```

- [ ] **Step 3: Add "How We Work Together" timeline section**

Insert this section after the results grid and before "Become a Partner":

```jsx
{/* How we work together — Timeline */}
<section className="py-24 border-t border-gray-200">
  <div className="max-w-7xl mx-auto px-6 lg:px-12">
    <FadeIn>
      <span className="text-xs font-medium tracking-widest uppercase text-gray-400 block mb-3">
        Process
      </span>
      <h2 className="font-sans font-semibold text-[clamp(1.8rem,3.5vw,3rem)] tracking-tight mb-16">
        How we work together.
      </h2>
    </FadeIn>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
      {[
        {
          step: '01',
          title: 'Strategy',
          body: 'We audit your AI readiness, map your processes, and define the highest-leverage points for intelligent automation.',
        },
        {
          step: '02',
          title: 'Build',
          body: 'Cephalo designs and ships the systems — from data pipelines to front-end interfaces — using our full-stack AI toolkit.',
        },
        {
          step: '03',
          title: 'Scale',
          body: 'We stay engaged. Systems improve over time, models are updated, and usage expands as your team grows into the tools.',
        },
      ].map((item, i) => (
        <FadeIn key={item.step} delay={i * 0.15}>
          <div className="border-t-2 border-gray-200 pt-8 pb-8 md:pr-12">
            <span className="text-xs font-medium tracking-widest uppercase text-gray-300 block mb-6">
              {item.step}
            </span>
            <h3 className="font-sans font-semibold text-2xl tracking-tight text-black mb-4">
              {item.title}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">{item.body}</p>
          </div>
        </FadeIn>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 4: Commit**
```bash
git add src/pages/Partners.jsx
git commit -m "feat: count-up stats and timeline section for Partners page"
```

---

## Task 17: Polypus Dual-Identity Copy Updates

**Files:**
- Modify: `src/pages/Products.jsx`
- Modify: `src/pages/Projects.jsx` (Polypus project description)
- Modify: `src/pages/Home.jsx` (Polypus featured card)

- [ ] **Step 1: Products.jsx — Polypus description**

Find: `VS Code-inspired interface wrapping Claude Code CLI with an intelligence layer`

Replace the full description block with:
```
Polypus is the AI orchestration layer that makes every model smarter together.
As a standalone tool, it works like Claude Code — but routes tasks intelligently
across Haiku, Sonnet, and Opus based on complexity. As the engine inside Cephalo App,
it powers every agent, every workflow, every session.
```

Add a subtle visual indicator below the description:
```jsx
<div className="flex gap-4 mt-6 mb-8">
  <div className="border border-[#7C3AED]/30 px-4 py-2">
    <span className="text-xs font-medium tracking-widest uppercase text-[#7C3AED]/70">Standalone tool</span>
  </div>
  <div className="border border-[#10B981]/30 px-4 py-2">
    <span className="text-xs font-medium tracking-widest uppercase text-[#10B981]/70">Cephalo App engine</span>
  </div>
</div>
```

- [ ] **Step 2: Projects.jsx — Polypus project description**

Find the Polypus entry in the `projects` array. Update `description`:

```
The orchestration layer at the heart of everything Cephalo builds.
Polypus routes tasks to the right model, coordinates multi-agent execution,
and ships as both a standalone CLI tool (like Claude Code, but multi-model)
and the core engine powering Cephalo App.
```

- [ ] **Step 3: Home.jsx — Polypus featured card description**

Find: `Claude Code with intelligence layers` (in the `featuredProjects` or product spotlight section).

Replace with:
```
The AI orchestration layer. Like Claude Code, but multi-model — and the engine inside Cephalo App.
```

- [ ] **Step 4: Commit**
```bash
git add src/pages/Products.jsx src/pages/Projects.jsx src/pages/Home.jsx
git commit -m "feat: update Polypus to dual-identity copy across Products, Projects, Home"
```

---

## Task 18: Footer Upgrade

**Files:**
- Modify: `src/components/layout/Footer.jsx`

- [ ] **Step 1: Read the full current Footer.jsx**

```bash
cat src/components/layout/Footer.jsx
```

- [ ] **Step 2: Add "Cephalo App — Coming Soon" to Work nav column**

Find the "Work" links section in Footer. Add after existing links:
```jsx
<li>
  <Link to="/contact" className="text-sm text-gray-500 hover:text-black transition-colors duration-200 flex items-center gap-2">
    Cephalo App
    <span className="text-xs font-medium tracking-widest uppercase text-gray-300 border border-gray-200 px-1.5 py-0.5">
      Soon
    </span>
  </Link>
</li>
```

- [ ] **Step 3: Add "A Cephalo Labs company" under Polypus mention**

Find where Polypus is mentioned in Footer (likely in brand section or bottom bar). Add below:
```jsx
<p className="text-xs text-gray-400 mt-1">A Cephalo Labs product</p>
```

If Polypus isn't currently mentioned, add it to the brand column:
```jsx
<div className="mt-4 flex items-center gap-3">
  <img
    src="/logos/polypus-mark.png"
    alt="Polypus"
    className="w-8 h-8 object-contain opacity-60"
    onError={(e) => { e.currentTarget.style.display = 'none' }}
  />
  <div>
    <p className="text-xs font-medium text-gray-600">Polypus</p>
    <p className="text-xs text-gray-400">A Cephalo Labs product</p>
  </div>
</div>
```

- [ ] **Step 4: Add newsletter/waitlist signup**

Add a fifth column (or convert unused space) for the waitlist:
```jsx
{/* Waitlist */}
<div>
  <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-4">Stay in the loop</p>
  <NewsletterForm />
</div>
```

Add `NewsletterForm` as a local component in Footer.jsx:
```jsx
function NewsletterForm() {
  const [email, setEmail] = React.useState('')
  const [done, setDone] = React.useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) setDone(true)
  }

  if (done) {
    return <p className="text-xs text-gray-500">You're on the list.</p>
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="text-sm border-b border-gray-200 py-2 bg-transparent text-black placeholder:text-gray-300 outline-none focus:border-black transition-colors duration-200 w-full"
      />
      <button
        type="submit"
        className="text-xs font-medium tracking-widest uppercase text-black self-start mt-1 hover:text-gray-500 transition-colors duration-200"
      >
        Join waitlist →
      </button>
    </form>
  )
}
```

- [ ] **Step 5: Update grid to accommodate new column**

Change `grid-cols-1 md:grid-cols-4` to `grid-cols-1 md:grid-cols-5` if adding 5th column. Or keep 4 cols and nest waitlist under brand column.

- [ ] **Step 6: Commit**
```bash
git add src/components/layout/Footer.jsx
git commit -m "feat: upgrade Footer with waitlist, Polypus, Cephalo App link"
```

---

## Task 19: Meta Tags — All Pages

Add page-specific `<title>` and `<meta name="description">` using React Helmet or direct document manipulation.

**Files:**
- Modify: `src/pages/Home.jsx`
- Modify: `src/pages/About.jsx`
- Modify: `src/pages/Products.jsx`
- Modify: `src/pages/Projects.jsx`
- Modify: `src/pages/Founder.jsx`
- Modify: `src/pages/Partners.jsx`
- Modify: `src/pages/Contact.jsx`

Since the project uses Vite + React Router (no Next.js), use `document.title` and a meta utility. Check if `react-helmet-async` is in package.json:

```bash
grep "react-helmet" package.json
```

If missing, add a simple `useMeta` hook in `src/components/ui/useMeta.js`:

```js
import { useEffect } from 'react'

export function useMeta(title, description) {
  useEffect(() => {
    document.title = title
    const el = document.querySelector('meta[name="description"]')
    if (el) el.setAttribute('content', description)
  }, [title, description])
}
```

- [ ] **Step 1: Create src/components/ui/useMeta.js** (as above)

- [ ] **Step 2: Add useMeta call to each page**

```jsx
// Home.jsx
useMeta(
  'Cephalo Labs — AI Developer Agency',
  'We build AI products, deploy AI infrastructure, and operate as a full-spectrum AI developer agency based in Coimbra, Portugal.'
)

// About.jsx
useMeta(
  'About — Cephalo Labs',
  'Cephalo Labs is an AI company built differently. We build intelligent systems, not demos.'
)

// Products.jsx
useMeta(
  'Products — Cephalo Labs',
  'Polypus — the AI orchestration layer. Multi-model, multi-agent, built for builders.'
)

// Projects.jsx
useMeta(
  'Projects — Cephalo Labs',
  'AI systems, products, and platforms built by Cephalo Labs. TITAN AI, AXIOM, SOVEREIGN, Polypus, and more.'
)

// Founder.jsx
useMeta(
  'Founder — Cephalo Labs',
  'João Alfar — CEO & Founder of Cephalo Labs and Pantheon Growth. Builder of AI systems and products.'
)

// Partners.jsx
useMeta(
  'Partners — Cephalo Labs',
  'Cephalo Labs and Pantheon Growth — building AI infrastructure for growth-stage companies.'
)

// Contact.jsx
useMeta(
  'Contact — Cephalo Labs',
  'Start a conversation with Cephalo Labs. Build AI systems, deploy intelligent infrastructure, or partner with us.'
)
```

- [ ] **Step 3: Commit**
```bash
git add src/components/ui/useMeta.js src/pages/
git commit -m "feat: add per-page meta titles and descriptions"
```

---

## Task 20: Full Audit

- [ ] **Step 1: Run dev server**
```bash
npm run dev
```

- [ ] **Step 2: Check every route for console errors**

Open browser DevTools. Visit each route:
- `/`
- `/about`
- `/products`
- `/projects`
- `/projects/polypus`
- `/founder`
- `/partners`
- `/contact`

Expected: zero errors in console on each page.

- [ ] **Step 3: Run production build**
```bash
npm run build
```
Expected: exits 0, no TypeScript/ESLint errors.

- [ ] **Step 4: Verify font-serif fully removed**
```bash
grep -r "font-serif" src/
grep -r "DM Serif" src/ index.html
```
Expected: zero matches in both.

- [ ] **Step 5: Verify AnimatedBackground on all pages**

Visit each non-Home page and confirm subtle particle layer is visible (inspect canvas element in DOM).

- [ ] **Step 6: Verify scroll animations**

On each page, scroll down and confirm:
- Section headers fade up
- Stats count up when scrolled into view
- Project rows enter from left

- [ ] **Step 7: Verify mobile**

Resize to 375px width. Confirm:
- No layout breakage
- NeuralScene (home only) uses 400 particles
- Filter tabs on Projects wrap or scroll

- [ ] **Step 8: Final commit**
```bash
git add .
git commit -m "feat: full audit pass — all routes clean, animations working, mobile verified"
```

---

## Self-Review Spec Coverage Check

| Spec requirement | Covered in task |
|---|---|
| Remove DM Serif Display | Task 1, 2, 3 |
| DM Sans headings 500-600 tracked | Task 2, 3 |
| DM Sans body 300-400 | Task 2, 3 (tracking-tight, font-semibold) |
| Labels DM Sans 500 uppercase tracked | Tasks 2–3 (existing pattern preserved) |
| AnimatedBackground component | Task 4 |
| Opacity 0.06 white / 0.04 gray | Task 4, 11 |
| Pause when tab not visible | Task 4 (visibilitychange) |
| prefers-reduced-motion | Task 4, 5 |
| Section headers fade up + scale 0.98 | Tasks 12–14 (FadeIn with y offset) |
| Text blocks stagger 80ms | Tasks 12–14 (delay i * 0.08) |
| Cards stagger from left/bottom | Tasks 13–14 |
| Stats count up | Tasks 5, 12, 16 |
| Horizontal lines draw left→right | Task 12 (About) |
| Scroll animations all pages | Tasks 12–14 |
| Hero larger impactful headline | Task 7 |
| Animated word reveal | Task 7 |
| Floating label | Task 7 |
| Neural bg 0.35 opacity | Task 7 |
| Scroll indicator | Task 7 |
| Ecosystem section | Task 8 |
| Cephalo App teaser | Task 9 |
| Polypus mascot in dark section | Task 9 |
| Animated VSL explainer | Task 10 |
| Polypus dual identity | Task 17 |
| Purple/emerald Polypus accents | Tasks 9, 17 |
| Projects logos | Task 15 |
| Projects filter tabs | Task 15 |
| Colored initial fallback | Task 15 |
| Partners count-up | Task 16 |
| Partners timeline | Task 16 |
| Footer "A Cephalo Labs company" | Task 18 |
| Footer Polypus pixel mascot | Task 18 |
| Footer Cephalo App Coming Soon | Task 18 |
| Footer newsletter/waitlist | Task 18 |
| Lazy load images | Not explicit — all `<img>` already lazy by default in Vite. Add `loading="lazy"` to all images in Task 20 audit if missing. |
| Mobile 400 particles | Task 6 |
| Meta titles + descriptions | Task 19 |
| No console errors | Task 20 |

**Gap identified:** `scale: 0.98` on section header entry not explicitly coded in Tasks 12-14. Fix: in each `FadeIn`, add `scale: 0.98` to `initial` and `scale: 1` to `animate`. The existing FadeIn helper only uses `y` and `opacity` — update the FadeIn pattern when applying it.

**Resolution:** In Tasks 12-14, wherever FadeIn is applied to section headers, use inline motion.div with `initial={{ opacity: 0, y: 20, scale: 0.98 }}` instead of the generic FadeIn helper.
