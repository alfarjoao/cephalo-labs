import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Brain, Gauge, Layers, Scissors } from 'lucide-react'
import { useMeta } from '../components/ui/useMeta'
import PageWrapper from '../components/ui/PageWrapper'
import BackgroundPattern from '../components/ui/BackgroundPattern'

const PURPLE = '#C084FC'
const NEUTRAL = '#F5F5F0'

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

const products = [
  {
    slug: 'polypus',
    name: 'Polypus',
    tagline: 'The orchestrator.',
    status: 'In Development · 2026',
    body: 'One interface. Every AI model. Polypus routes each task to the right model — automatically — and keeps every session alive across hot, warm, and cold memory layers.',
    features: [
      { icon: Brain, t: 'Adaptive routing — Haiku / Sonnet / Opus / GPT / Gemini / local' },
      { icon: Layers, t: 'Persistent memory — hot, warm, cold' },
      { icon: Gauge, t: 'Agent spawner — parallel execution' },
      { icon: Scissors, t: 'Skill registry — install on demand' },
    ],
    accent: PURPLE,
    href: '/products/polypus',
    logo: '/logos/polypus-mark.svg',
  },
  {
    slug: 'kernel',
    name: 'Kernel',
    tagline: 'The optimisation layer.',
    status: 'In Development · 2026',
    body: 'The invisible layer between your application and every AI model. Seventy percent fewer tokens. Four times faster. Seventy-three percent cheaper. Same outputs. No rewrites.',
    features: [
      { icon: Scissors, t: 'Task decomposition — automatic' },
      { icon: Layers, t: 'Intelligent memory — three tiers' },
      { icon: Gauge, t: 'Token compression — 70–85% reduction' },
      { icon: Brain, t: 'Adaptive routing — local vs cloud' },
    ],
    accent: NEUTRAL,
    href: '/products/kernel',
    logo: '/logos/kernel-mark.svg',
  },
]

export default function Products() {
  useMeta(
    'Products — CEPHALO Labs',
    'Polypus — the orchestrator. Kernel — the optimisation layer. Two products that make AI work like it should.'
  )

  return (
    <PageWrapper>
      {/* ── HERO — light paper base ──────────────────────────────────── */}
      <section className="relative py-40 overflow-hidden bg-[var(--paper)] -mt-16 pt-44">
        <BackgroundPattern variant="neural" tone="paper" opacity={0.08} />
        <div className="absolute inset-0 bg-grid-paper pointer-events-none opacity-60" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85 }}
          >
            <span className="tag-eyebrow text-ink-950/50 block mb-10">Products · 2026</span>
            <h1 className="font-sans font-semibold tracking-tightest text-[clamp(3rem,7vw,6.5rem)] leading-[0.88] text-ink-950 max-w-4xl mb-10">
              Two products.<br/>
              <span className="text-ink-950/30">One thesis.</span>
            </h1>
            <p className="text-lg md:text-xl text-ink-950/60 max-w-2xl leading-relaxed font-light">
              Most AI tools demo well and break in production. Ours are the other kind — built for ourselves first, then shipped to the people who build for a living.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── PRODUCT CARDS — alternating dark/light ───────────────────── */}
      {products.map((p, i) => {
        const dark = i % 2 === 0
        return (
          <section
            key={p.slug}
            className={`relative py-32 overflow-hidden border-b ${dark ? 'bg-ink-950 border-white/5' : 'bg-[var(--paper-2)] border-ink-950/5'}`}
          >
            <BackgroundPattern
              variant={dark ? 'orbit' : 'wave'}
              tone={dark ? 'dark' : 'paper'}
              opacity={dark ? 0.08 : 0.07}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: p.slug === 'polypus'
                  ? `radial-gradient(ellipse at ${i % 2 === 0 ? '70%' : '30%'} 50%, ${p.accent}${dark ? '18' : '14'} 0%, transparent 65%)`
                  : `radial-gradient(ellipse at ${i % 2 === 0 ? '70%' : '30%'} 50%, ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(10,10,10,0.05)'} 0%, transparent 65%)`
              }}
            />
            <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-14 items-center ${i % 2 ? 'lg:[direction:rtl]' : ''}`}>
                {/* Copy */}
                <FadeIn className="lg:col-span-7 [direction:ltr]">
                  <div className="flex items-center gap-4 mb-8">
                    {p.logo && (
                      <img
                        src={p.logo} alt={p.name}
                        className="w-12 h-12 object-contain"
                        onError={e => { e.currentTarget.style.display = 'none' }}
                      />
                    )}
                    <div>
                      <h2 className={`text-3xl md:text-4xl font-semibold tracking-tight ${dark ? 'text-white' : 'text-ink-950'}`}>
                        {p.name}
                      </h2>
                      <p className="tag-eyebrow mt-1" style={{ color: p.accent + 'CC' }}>{p.status}</p>
                    </div>
                  </div>
                  <p className={`text-xl md:text-2xl font-light mb-6 tracking-tight ${dark ? 'text-white/85' : 'text-ink-950'}`}>
                    {p.tagline}
                  </p>
                  <p className={`text-base md:text-lg leading-relaxed font-light mb-10 max-w-2xl ${dark ? 'text-white/55' : 'text-ink-950/65'}`}>
                    {p.body}
                  </p>
                  <div className={`space-y-0 mb-10 max-w-2xl border-t ${dark ? 'border-white/5' : 'border-ink-950/5'}`}>
                    {p.features.map((f, j) => {
                      const iconColor = p.slug === 'polypus'
                        ? p.accent
                        : (dark ? 'rgba(245,245,240,0.75)' : 'rgba(10,10,10,0.55)');
                      return (
                        <FadeIn key={f.t} delay={j * 0.05}>
                          <div className={`flex items-center gap-4 py-4 border-b ${dark ? 'border-white/5' : 'border-ink-950/5'}`}>
                            <f.icon size={14} style={{ color: iconColor }} />
                            <span className={`text-sm md:text-base font-light ${dark ? 'text-white/70' : 'text-ink-950/70'}`}>
                              {f.t}
                            </span>
                          </div>
                        </FadeIn>
                      );
                    })}
                  </div>
                  <Link to={p.href}
                    className={`group inline-flex items-center gap-2 px-7 py-3.5 text-[11px] font-medium tracking-[0.22em] uppercase active:scale-[0.98] transition-all ${
                      dark ? 'bg-white text-ink-950 hover:bg-white/90' : 'bg-ink-950 text-white hover:bg-ink-900'
                    }`}
                  >
                    Discover {p.name}
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-[0.5px] transition-transform ${dark ? 'bg-ink-950/15' : 'bg-white/15'}`}>
                      <ArrowRight size={11} />
                    </span>
                  </Link>
                </FadeIn>

                {/* Visual */}
                <FadeIn delay={0.15} className="lg:col-span-5 [direction:ltr]">
                  <div
                    className={`relative aspect-square rounded-2xl border overflow-hidden ${dark ? 'bg-ink-950/70 border-white/10' : 'bg-[var(--paper)] border-ink-950/10'}`}
                  >
                    {/* Visual accent: purple for Polypus, neutral B&W for others */}
                    {(() => {
                      const ringColor = p.slug === 'polypus'
                        ? p.accent
                        : (dark ? '#F5F5F0' : '#0A0A0A');
                      const gridColor = p.slug === 'polypus'
                        ? `${p.accent}40`
                        : (dark ? 'rgba(255,255,255,0.16)' : 'rgba(10,10,10,0.14)');
                      const labelColor = p.slug === 'polypus'
                        ? p.accent + 'AA'
                        : (dark ? 'rgba(245,245,240,0.55)' : 'rgba(10,10,10,0.55)');
                      return (
                        <>
                          {/* grid */}
                          <div className="absolute inset-0 opacity-[0.08]"
                            style={{
                              backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
                              backgroundSize: '40px 40px',
                            }} />
                          {/* rings */}
                          <motion.div animate={{ rotate: 360 }}
                            transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-10 rounded-full border"
                            style={{ borderColor: ringColor + '25' }} />
                          <motion.div animate={{ rotate: -360 }}
                            transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-20 rounded-full border"
                            style={{ borderColor: ringColor + '20' }} />
                          {/* centre */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative flex flex-col items-center gap-4">
                              <div className="absolute inset-0 rounded-full blur-3xl opacity-40"
                                style={{ background: `radial-gradient(circle, ${ringColor}, transparent)` }} />
                              {p.logo ? (
                                <img
                                  src={p.logo} alt={p.name}
                                  className={`relative w-32 h-32 object-contain ${p.slug !== 'polypus' ? (dark ? 'brightness-0 invert opacity-90' : 'brightness-0 opacity-80') : ''}`}
                                  onError={e => { e.currentTarget.style.display = 'none' }}
                                />
                              ) : (
                                <p className="relative font-sans font-semibold text-5xl tracking-tightest"
                                  style={{ color: ringColor }}>
                                  {p.name}
                                </p>
                              )}
                              <p className="relative tag-eyebrow" style={{ color: labelColor }}>
                                {p.slug.toUpperCase()}
                              </p>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>
        )
      })}

      {/* ── BOTTOM CTA ──────────────────────────────────────────────── */}
      <section className="relative py-28 bg-ink-950 overflow-hidden">
        <BackgroundPattern variant="dots" tone="dark" opacity={0.06} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <FadeIn>
            <h3 className="text-2xl md:text-3xl font-medium text-white mb-2 tracking-tight">Want something custom?</h3>
            <p className="text-white/45 text-sm font-light">We build bespoke AI infrastructure too.</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-ink-950 text-[11px] font-medium tracking-[0.22em] uppercase hover:bg-white/90 transition-colors">
              Start a conversation <ArrowRight size={11} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </PageWrapper>
  )
}
