import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Brain, Gauge, Layers, Scissors, Zap, ShieldCheck } from 'lucide-react'
import { useMeta } from '../components/ui/useMeta'
import PageWrapper from '../components/ui/PageWrapper'
import BackgroundPattern from '../components/ui/BackgroundPattern'
import VideoHero from '../components/ui/VideoHero'
import Marquee from '../components/ui/Marquee'
import CountUp from '../components/ui/CountUp'
import HeroBg from '../three/HeroBg'
import KernelMark from '../components/logos/KernelMark'

const PURPLE = '#C084FC'

// ── helpers ───────────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0, className = '', y = 24 }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function TiltSection({ children, className = '' }) {
  const ref = useRef()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const rotateX = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [5, 0, 0, -5])
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [40, 0, 0, -40])
  return (
    <motion.section
      ref={ref}
      style={{ rotateX, opacity, y, transformPerspective: 1400 }}
      className={`relative ${className}`}
    >
      {children}
    </motion.section>
  )
}

// ── page ──────────────────────────────────────────────────────────────────

export default function Home() {
  useMeta(
    'CEPHALO Labs — We build intelligence. 2026',
    'An AI studio. We build AI products, deploy intelligent infrastructure, and ship at the frontier of what AI can do.'
  )

  return (
    <PageWrapper>

      {/* ── HERO · dark cinematic ────────────────────────────────────── */}
      <section className="relative min-h-screen bg-ink-950 flex items-center overflow-hidden -mt-16 pt-24">
        <HeroBg />
        <BackgroundPattern variant="neural" tone="dark" opacity={0.16} />
        <div className="absolute inset-0 bg-grid-faint pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] rounded-full pointer-events-none opacity-60"
          style={{ background: 'radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 70%)' }} />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 py-28 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex items-center justify-center gap-2 mb-12"
          >
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 px-4 py-2 bg-white/[0.02]">
              <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse-soft" />
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-white/50">
                AI Developer Studio · Est. 2026
              </span>
            </span>
          </motion.div>

          <h1 className="font-sans font-semibold text-[clamp(3.5rem,9vw,8rem)] tracking-tightest leading-[0.88] text-white mb-8">
            {['We', 'build', 'intelligence.'].map((word, i) => (
              <motion.span key={i} className="inline-block mr-[0.18em]"
                initial={{ opacity: 0, y: 28, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.75, delay: 0.3 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}>
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="text-white/30 text-sm md:text-base tracking-[0.32em] uppercase font-light mb-10"
          >
            Products · Systems · Results
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.82 }}
            className="text-white/55 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-12 font-light"
          >
            Most AI looks great in a demo. Then breaks in production.<br/>
            <span className="text-white/80">We ship the other kind.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.95 }}
            className="flex flex-wrap gap-3 justify-center mb-16"
          >
            <Link to="/products"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-white text-ink-950 text-[11px] font-medium tracking-[0.22em] uppercase hover:bg-white/90 active:scale-[0.98] transition-all">
              See the products
              <span className="w-7 h-7 rounded-full bg-ink-950/10 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-[0.5px] transition-transform">
                <ArrowRight size={11} />
              </span>
            </Link>
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/15 text-white/80 text-[11px] font-medium tracking-[0.22em] uppercase hover:border-white/40 hover:text-white active:scale-[0.98] transition-all">
              Work with us
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0)' }}
            transition={{ duration: 0.9, delay: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <VideoHero
              src="/videos/cephalo-labs-v4.mp4"
              poster="/videos/cephalo-labs-poster.png"
              accent="rgba(192,132,252,0.35)"
              label="Watch · CEPHALO · 32s"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[1px] h-8 bg-white/20"
          />
        </motion.div>
      </section>

      {/* ── MARQUEE ─────────────────────────────────────────────────── */}
      <Marquee dark speed={32} />

      {/* ── PRODUCTS · light paper ───────────────────────────────────── */}
      <TiltSection className="py-32 bg-[var(--paper)] overflow-hidden">
        <BackgroundPattern variant="neural" tone="paper" opacity={0.07} />
        <div className="absolute inset-0 bg-grid-paper pointer-events-none opacity-60" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn className="mb-20">
            <span className="tag-eyebrow text-ink-950/50 block mb-6">What we build · 2026</span>
            <h2 className="font-sans font-semibold text-[clamp(2rem,4.5vw,4.5rem)] tracking-tightest text-ink-950 max-w-4xl leading-[0.92]">
              Two products.<br/>
              <span className="text-ink-950/35">One philosophy.</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Polypus card */}
            <FadeIn delay={0.08}>
              <Link to="/products/polypus"
                className="group block relative h-full p-10 md:p-12 rounded-3xl bg-ink-950 overflow-hidden hover:bg-ink-900 transition-colors">
                <div className="absolute inset-0 opacity-60 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 30% 20%, ${PURPLE}22 0%, transparent 60%)` }} />
                <div className="absolute inset-0 bg-grid-faint opacity-50 pointer-events-none" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-8">
                    <img src="/logos/polypus-mark.svg" alt="Polypus"
                      className="w-10 h-10 object-contain"
                      onError={e => { e.currentTarget.style.display = 'none' }} />
                    <span className="tag-eyebrow" style={{ color: PURPLE + 'CC' }}>Polypus · The orchestrator</span>
                  </div>
                  <h3 className="font-sans font-semibold text-3xl md:text-4xl text-white mb-4 tracking-tightest">
                    One interface.<br/>
                    <span className="text-white/40">Every AI model.</span>
                  </h3>
                  <p className="text-white/55 leading-relaxed font-light mb-10 max-w-md">
                    Routes every task to the right model. Keeps memory alive across sessions. Spawns agents in parallel.
                  </p>

                  <div className="space-y-0 mb-10 max-w-md border-t border-white/5">
                    {[
                      { icon: Brain,  t: 'Adaptive routing' },
                      { icon: Layers, t: 'Persistent memory' },
                      { icon: Zap,    t: 'Agent spawner' },
                    ].map(f => (
                      <div key={f.t} className="flex items-center gap-3 py-3 border-b border-white/5">
                        <f.icon size={13} style={{ color: PURPLE, opacity: 0.7 }} />
                        <span className="text-sm text-white/65 font-light">{f.t}</span>
                      </div>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.22em] uppercase group-hover:gap-3 transition-all"
                    style={{ color: PURPLE }}>
                    Discover Polypus <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </FadeIn>

            {/* Kernel card */}
            <FadeIn delay={0.14}>
              <Link to="/products/kernel"
                className="group block relative h-full p-10 md:p-12 rounded-3xl bg-ink-950 overflow-hidden hover:bg-ink-900 transition-colors">
                <div className="absolute inset-0 opacity-60 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at 70% 20%, rgba(255,255,255,0.06) 0%, transparent 60%)' }} />
                <div className="absolute inset-0 bg-grid-faint opacity-50 pointer-events-none" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/15">
                      <KernelMark className="w-6 h-6 text-white/90" />
                    </div>
                    <span className="tag-eyebrow text-white/70">Kernel · In Development · 2026</span>
                  </div>
                  <h3 className="font-sans font-semibold text-3xl md:text-4xl text-white mb-4 tracking-tightest">
                    70% less tokens.<br/>
                    <span className="text-white/40">Same outputs.</span>
                  </h3>
                  <p className="text-white/55 leading-relaxed font-light mb-10 max-w-md">
                    The invisible layer between your app and every AI model. Compresses, decomposes, routes — without rewriting a single prompt.
                  </p>

                  <div className="space-y-0 mb-10 max-w-md border-t border-white/5">
                    {[
                      { icon: Scissors, t: 'Task decomposition' },
                      { icon: Gauge,    t: 'Token compression' },
                      { icon: ShieldCheck, t: '40% cost-saving guarantee' },
                    ].map(f => (
                      <div key={f.t} className="flex items-center gap-3 py-3 border-b border-white/5">
                        <f.icon size={13} className="text-white/60" />
                        <span className="text-sm text-white/65 font-light">{f.t}</span>
                      </div>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.22em] uppercase text-white group-hover:gap-3 transition-all">
                    Discover Kernel <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </FadeIn>
          </div>
        </div>
      </TiltSection>

      {/* ── PRINCIPLES · dark ────────────────────────────────────────── */}
      <TiltSection className="py-32 bg-ink-950 overflow-hidden border-y border-white/5">
        <BackgroundPattern variant="wave" tone="dark" opacity={0.07} />
        <div className="absolute inset-0 bg-grid-faint pointer-events-none opacity-40" />

        <div className="relative max-w-6xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <span className="tag-eyebrow text-white/40 block mb-6">How we build</span>
            <h2 className="font-sans font-semibold text-[clamp(2rem,4.5vw,4rem)] tracking-tightest text-white mb-20 max-w-3xl leading-[0.92]">
              We do not design<br/>AI that looks smart.<br/>
              <span className="text-white/30">We ship AI that earns its keep.</span>
            </h2>
          </FadeIn>

          {[
            { n: '01', t: 'We build for ourselves first.',   d: 'Every tool we sell, we use. If we would not bet our own workflow on it, we will not ask you to.' },
            { n: '02', t: 'We are builders, not consultants.', d: 'No slide decks. No roadmaps without code behind them. Every engagement ends with software running in production.' },
            { n: '03', t: 'Research meets execution.',         d: 'The depth of a lab. The speed of a studio. Both, in the same week.' },
          ].map((p, i) => (
            <FadeIn key={p.n} delay={i * 0.1}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-10 border-b border-white/5 group">
                <div className="md:col-span-1 font-mono text-xs text-white/25 tracking-[0.12em] pt-1">{p.n}</div>
                <div className="md:col-span-6">
                  <h3 className="text-2xl md:text-3xl font-medium text-white leading-tight tracking-tight">
                    {p.t}
                  </h3>
                </div>
                <div className="md:col-span-5">
                  <p className="text-base text-white/50 leading-relaxed font-light">{p.d}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </TiltSection>

      {/* ── PANTHEON case teaser · light paper ───────────────────────── */}
      <TiltSection className="py-32 bg-[var(--paper-2)] overflow-hidden">
        <BackgroundPattern variant="neural" tone="paper" opacity={0.05} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <span className="tag-eyebrow text-ink-950/60 block mb-6">Proof · Pantheon Growth</span>
              <h2 className="font-sans font-semibold text-[clamp(2rem,4vw,4rem)] tracking-tightest text-ink-950 leading-[0.92] mb-8">
                We built the stack<br/>
                that generated<br/>
                <span className="text-ink-950/45">$400K+ in revenue.</span>
              </h2>
              <p className="text-ink-950/60 leading-relaxed font-light text-base md:text-lg max-w-md mb-10">
                Pantheon Growth runs entirely on CEPHALO infrastructure. Same founder. Same standard. The thesis — proven in production.
              </p>
              <Link to="/partners"
                className="group inline-flex items-center gap-2 px-6 py-3.5 bg-ink-950 text-white text-[11px] font-medium tracking-[0.22em] uppercase hover:bg-ink-900 active:scale-[0.98] transition-all">
                See the case
                <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-[0.5px] transition-transform">
                  <ArrowRight size={11} />
                </span>
              </Link>
            </FadeIn>

            <FadeIn delay={0.12}>
              <div className="grid grid-cols-2 gap-px bg-ink-950/10 rounded-2xl overflow-hidden">
                {[
                  { v: '$400K+', l: 'Revenue generated' },
                  { v: '14×',    l: 'Long-run ROAS' },
                  { v: '340%',   l: 'Lead growth · 90 days' },
                  { v: '80%',    l: 'Manual ops reduced' },
                ].map(s => (
                  <div key={s.l} className="bg-[var(--paper)] p-8 text-center">
                    <p className="font-sans font-semibold text-3xl md:text-4xl text-ink-950 mb-2 tracking-tightest">
                      {s.v}
                    </p>
                    <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-ink-950/50">{s.l}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </TiltSection>

      {/* ── STATS · dark ─────────────────────────────────────────────── */}
      <TiltSection className="py-28 bg-ink-950 border-y border-white/5 overflow-hidden">
        <BackgroundPattern variant="dots" tone="dark" opacity={0.06} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn className="mb-10">
            <span className="tag-eyebrow text-white/40">By the numbers · 2026</span>
          </FadeIn>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-xl overflow-hidden">
            {[
              { prefix: '$', to: 400, suffix: 'K+', label: 'Generated in production' },
              { prefix: '',  to: 70,  suffix: '%',  label: 'Token reduction · Kernel' },
              { prefix: '',  to: 14,  suffix: '×',  label: 'Long-run ROAS · Pantheon' },
              { value: '2026',                       label: 'Year founded' },
            ].map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.07} className="bg-ink-950 p-10 text-center">
                <p className="font-sans font-semibold text-4xl lg:text-5xl text-white mb-3 tracking-tightest">
                  {s.value ? s.value : (
                    <>{s.prefix}<CountUp to={s.to} />{s.suffix}</>
                  )}
                </p>
                <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-white/30">{s.label}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </TiltSection>

      {/* ── CTA · light paper ────────────────────────────────────────── */}
      <TiltSection className="py-40 bg-[var(--paper)] overflow-hidden">
        <BackgroundPattern variant="neural" tone="paper" opacity={0.07} />
        <div className="absolute inset-0 bg-grid-paper pointer-events-none opacity-60" />
        <div className="relative max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <FadeIn>
            <span className="tag-eyebrow text-ink-950/50 block mb-10">Let's talk · 2026</span>
            <h2 className="font-sans font-semibold text-[clamp(2.5rem,5vw,5.5rem)] text-ink-950 mb-10 leading-[0.92] tracking-tightest">
              Bring us<br/>
              <span className="text-ink-950/35">a hard problem.</span>
            </h2>
            <p className="text-ink-950/55 mb-12 max-w-lg mx-auto leading-relaxed font-light text-base md:text-lg">
              The ones where the team has been stuck. The pipelines that keep losing money. The AI bills that should be cheaper.
            </p>
            <Link to="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-ink-950 text-white text-[11px] font-medium tracking-[0.22em] uppercase hover:bg-ink-900 active:scale-[0.98] transition-all">
              Start a conversation
              <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-[0.5px] transition-transform">
                <ArrowRight size={11} />
              </span>
            </Link>
          </FadeIn>
        </div>
      </TiltSection>

    </PageWrapper>
  )
}
