import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useMeta } from '../components/ui/useMeta'
import PageWrapper from '../components/ui/PageWrapper'
import BackgroundPattern from '../components/ui/BackgroundPattern'
import CountUp from '../components/ui/CountUp'

function FadeIn({ children, delay = 0, className = '', y = 22 }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const differences = [
  { n: '01', t: 'We build for ourselves first.',
    d: 'Polypus. Kernel. Every tool we ship, we use every day. If we would not bet our own work on it, it does not leave the lab.' },
  { n: '02', t: 'Builders, not consultants.',
    d: 'We do not write roadmaps. We write code. Every engagement ends with working software — not a slide deck with recommendations.' },
  { n: '03', t: 'Research meets execution.',
    d: 'The depth of a lab. The speed of a studio. Two modes that usually cancel each other out. We combined them. That is the edge.' },
  { n: '04', t: 'AI-native from day one.',
    d: 'We were not an agency that added an AI practice. We were built for this — every decision, every hire, every tool, every line.' },
]

export default function About() {
  useMeta(
    'About — CEPHALO Labs',
    'An AI developer studio built different. We build intelligent systems. We deploy intelligent infrastructure. We ship.'
  )

  return (
    <PageWrapper>
      {/* ── HERO · dark cinematic ────────────────────────────────────── */}
      <section className="relative py-40 overflow-hidden bg-ink-950 -mt-16 pt-44 border-b border-white/5">
        <BackgroundPattern variant="neural" tone="dark" opacity={0.12} />
        <div className="absolute inset-0 bg-grid-faint pointer-events-none opacity-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(255,255,255,0.05) 0%, transparent 70%)' }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85 }}
          >
            <span className="tag-eyebrow text-white/40 block mb-10">About · 2026</span>
            <h1 className="font-sans font-semibold tracking-tightest text-[clamp(3rem,7vw,6rem)] leading-[0.9] text-white max-w-5xl mb-12">
              An AI studio<br/>
              <span className="text-white/30">built different.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/55 max-w-2xl leading-relaxed font-light">
              CEPHALO sits where a research lab meets a digital studio. We build intelligent systems for ourselves first — then ship them to the people who build for a living.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── ORIGIN · light paper ─────────────────────────────────────── */}
      <section className="relative py-32 border-y border-ink-950/10 bg-[var(--paper)] overflow-hidden">
        <BackgroundPattern variant="wave" tone="paper" opacity={0.06} />
        <div className="absolute inset-0 bg-grid-paper pointer-events-none opacity-40" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <FadeIn className="lg:col-span-5">
            <span className="tag-eyebrow text-ink-950/45 block mb-8">Origin</span>
            <h2 className="font-sans font-semibold text-[clamp(2rem,3.5vw,3.5rem)] tracking-tightest leading-[0.95] text-ink-950 mb-8">
              CEPHALO began<br/>
              <span className="text-ink-950/40">at a workbench.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.12} className="lg:col-span-7">
            <div className="space-y-6 text-ink-950/60 leading-relaxed text-[15px] md:text-base font-light">
              <p>
                In 2026, João Alfar founded CEPHALO Labs. The work that became CEPHALO started earlier — in 2024, when João co-founded <strong className="text-ink-950">Pantheon Growth</strong> with Simão. Pantheon needed AI infrastructure. Nobody was selling the kind they needed. So they built it.
              </p>
              <p>
                The results were not a pitch deck. A full-stack CRM. An operating system for the agency. AI sales automation. A platform handling client delivery end-to-end. The tools generated <strong className="text-ink-950">$400K+ in revenue</strong> in eighteen months. That was the thesis proved in production: built right, AI becomes competitive infrastructure.
              </p>
              <p>
                CEPHALO Labs is the studio that emerged from that work. A place for building the tools that people who build AI actually need.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── MISSION / VISION · dark ──────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden bg-ink-950 border-y border-white/5">
        <BackgroundPattern variant="orbit" tone="dark" opacity={0.07} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/5 rounded-2xl overflow-hidden">
          <FadeIn className="bg-ink-950 p-14 lg:p-20">
            <span className="tag-eyebrow text-white/40 block mb-8">Mission</span>
            <h3 className="text-2xl md:text-3xl font-medium text-white leading-tight tracking-tight mb-6">
              Make AI genuinely useful,<br/>not just impressive.
            </h3>
            <p className="text-white/55 leading-relaxed font-light">
              Most AI demos age in hours. We build the other kind. Every system CEPHALO ships is measured against one standard: does it change the economics of the work? For Pantheon, that meant $400K+ in revenue. That is the bar.
            </p>
          </FadeIn>
          <FadeIn delay={0.1} className="bg-ink-950 p-14 lg:p-20">
            <span className="tag-eyebrow text-white/40 block mb-8">Vision</span>
            <h3 className="text-2xl md:text-3xl font-medium text-white leading-tight tracking-tight mb-6">
              Every business running<br/>on intelligent infrastructure.
            </h3>
            <p className="text-white/55 leading-relaxed font-light">
              The next decade will not belong to the companies with the most data. It will belong to the ones whose AI systems compound the fastest. CEPHALO builds the systems that do the compounding — for ourselves, and for the teams we partner with.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── DIFFERENCES · light paper ────────────────────────────────── */}
      <section className="relative py-32 border-y border-ink-950/10 bg-[var(--paper)] overflow-hidden">
        <BackgroundPattern variant="dots" tone="paper" opacity={0.06} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <span className="tag-eyebrow text-ink-950/45 block mb-6">What makes us different</span>
            <h2 className="font-sans font-semibold text-[clamp(2rem,4vw,3.5rem)] tracking-tightest text-ink-950 mb-16 max-w-3xl leading-[0.95]">
              Four reasons<br/>
              <span className="text-ink-950/40">we ship harder.</span>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-0">
            {differences.map((d, i) => (
              <FadeIn key={d.n} delay={i * 0.08}>
                <div className="border-t border-ink-950/15 pt-8 pb-10">
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="font-mono text-xs text-ink-950/35 tracking-[0.1em]">{d.n}</span>
                    <h3 className="text-lg md:text-xl font-medium text-ink-950 tracking-tight">{d.t}</h3>
                  </div>
                  <p className="text-sm text-ink-950/55 leading-relaxed font-light ml-10">{d.d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE · dark ─────────────────────────────────────────────── */}
      <section className="relative py-36 overflow-hidden bg-ink-950 border-y border-white/5">
        <BackgroundPattern variant="neural" tone="dark" opacity={0.07} />
        <div className="absolute inset-0 bg-grid-faint pointer-events-none opacity-40" />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="text-white/10 text-[6rem] md:text-[9rem] leading-none mb-2 font-serif select-none">"</div>
            <blockquote className="text-[clamp(1.5rem,3vw,2.75rem)] font-light text-white leading-[1.2] tracking-tight mb-8 -mt-8">
              We were not an agency that added an AI practice. <span className="text-white/40">We were built for this from day one.</span>
            </blockquote>
            <p className="tag-eyebrow text-white/40">— CEPHALO Labs · 2026</p>
          </FadeIn>
        </div>
      </section>

      {/* ── STATS · light paper ──────────────────────────────────────── */}
      <section className="relative py-24 bg-[var(--paper)] border-y border-ink-950/10 overflow-hidden">
        <BackgroundPattern variant="dots" tone="paper" opacity={0.05} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ink-950/10 rounded-xl overflow-hidden">
            {[
              { val: '2026',                  label: 'Founded' },
              { num: 2, suffix: '',           label: 'Products in market' },
              { num: 400, prefix: '$', suffix: 'K+', label: 'Revenue built' },
              { val: '∞',                     label: 'Problems to solve' },
            ].map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.06} className="bg-[var(--paper-2)] p-10 text-center">
                <p className="font-sans font-semibold text-4xl md:text-5xl text-ink-950 mb-3 tracking-tightest">
                  {s.val ? s.val : (
                    <>{s.prefix || ''}<CountUp to={s.num} />{s.suffix || ''}</>
                  )}
                </p>
                <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-ink-950/45">{s.label}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA · dark ───────────────────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden bg-ink-950">
        <BackgroundPattern variant="wave" tone="dark" opacity={0.06} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-medium text-white mb-2 tracking-tight">See what we've built.</h2>
            <p className="text-white/45 text-sm font-light">Products shipping this year.</p>
          </FadeIn>
          <FadeIn delay={0.1} className="flex gap-3">
            <Link to="/products/polypus" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-ink-950 text-[11px] font-medium tracking-[0.22em] uppercase hover:bg-white/90 transition-colors">
              Polypus <ArrowRight size={11} />
            </Link>
            <Link to="/products/kernel" className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white text-[11px] font-medium tracking-[0.22em] uppercase hover:border-white hover:bg-white hover:text-ink-950 transition-colors">
              Kernel
            </Link>
          </FadeIn>
        </div>
      </section>
    </PageWrapper>
  )
}
