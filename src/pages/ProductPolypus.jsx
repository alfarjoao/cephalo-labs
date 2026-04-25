import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, ArrowRight, Brain, Zap, Code, Mic, Image, Users } from 'lucide-react'
import { useMeta } from '../components/ui/useMeta'
import PageWrapper from '../components/ui/PageWrapper'
import BackgroundPattern from '../components/ui/BackgroundPattern'
import VideoHero from '../components/ui/VideoHero'
import { useEnvironment } from '../components/ui/EnvironmentContext'

function FadeIn({ children, delay = 0, className = '', y = 22 }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const features = [
  {
    icon: Brain, t: 'Adaptive Model Routing',
    d: 'Routes to Claude Haiku, Sonnet, Opus, GPT-4, Gemini, or Ollama based on task complexity. The right model for every job, automatically.',
  },
  {
    icon: Zap, t: 'Persistent Memory',
    d: 'Hot, warm, and cold memory layers. Sessions that remember context, projects that accumulate knowledge across time.',
  },
  {
    icon: Users, t: 'Agent Spawner',
    d: 'One instruction becomes parallel agents executing simultaneously. Complex tasks broken down and conquered.',
  },
  {
    icon: Code, t: 'Skill Registry',
    d: 'Install capabilities on demand. The system learns and grows as you do — no configuration required.',
  },
  {
    icon: Mic, t: 'Voice Input',
    d: 'Speak to orchestrate. Whisper-powered transcription built in — from thought to execution without typing.',
  },
  {
    icon: Image, t: 'Creative Pipeline',
    d: 'Generate images, create documents, build presentations. Every creative output, one unified interface.',
  },
]

const steps = [
  { n: '01', t: 'You send a task',   d: 'Any complexity, any format. A sentence, a voice note, a file. Polypus reads intent.' },
  { n: '02', t: 'Polypus routes it', d: 'To the optimal model for the specific task. Cost-efficient, quality-first, always transparent.' },
  { n: '03', t: 'Agents execute',    d: 'In parallel, with memory, returning complete results. Not a response — a solution.' },
]

function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      const subject = encodeURIComponent('Polypus Waitlist')
      const body = encodeURIComponent(`Please add me to the Polypus waitlist: ${email}`)
      window.location.href = `mailto:hello@cephalon.ai?subject=${subject}&body=${body}`
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <motion.p
        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
        className="text-purple text-sm tracking-wide font-light"
      >
        You're on the list. We'll be in touch.
      </motion.p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 bg-white/5 ring-1 ring-white/10 rounded-full px-5 py-3.5 text-sm text-white placeholder-white/30 outline-none focus:ring-purple/40 transition-all"
      />
      <button
        type="submit"
        className="group inline-flex items-center gap-2 justify-center px-6 py-3.5 rounded-full bg-purple text-ink-950 text-[11px] font-medium tracking-[0.22em] uppercase hover:bg-purple/90 active:scale-[0.98] transition-all"
      >
        Join waitlist
        <span className="w-6 h-6 rounded-full bg-ink-950/15 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-[0.5px] transition-transform">
          <ArrowRight size={10} />
        </span>
      </button>
    </form>
  )
}

export default function ProductPolypus() {
  useMeta(
    'Polypus — CEPHALO Labs',
    'One interface. Every AI model. Polypus is the AI orchestrator built for builders. Coming 2026.'
  )
  const { setEnv } = useEnvironment()
  useEffect(() => {
    setEnv('polypus')
    return () => setEnv('default')
  }, [setEnv])

  return (
    <PageWrapper>

      {/* ── HERO — purple ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-screen flex flex-col justify-center py-32 bg-ink-950 -mt-16 pt-36">
        <BackgroundPattern variant="orbit" tone="dark" opacity={0.08} />
        <div className="absolute inset-0 bg-grid-faint pointer-events-none opacity-50" />

        {/* purple ambient */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 35%, rgba(192,132,252,0.14) 0%, transparent 60%)' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 flex flex-col items-center text-center">
          {/* Back link */}
          <FadeIn className="w-full mb-10">
            <Link to="/products"
              className="inline-flex items-center gap-2 text-white/30 text-[10px] tracking-[0.22em] uppercase hover:text-white/60 transition-colors">
              <ArrowLeft size={10} /> Products
            </Link>
          </FadeIn>

          {/* Logo */}
          <FadeIn delay={0.05}>
            <div className="relative mb-10">
              <div className="absolute inset-0 rounded-full blur-3xl opacity-50"
                style={{ background: 'radial-gradient(circle, #C084FC, transparent)' }} />
              <img
                src="/logos/polypus-mark.svg"
                alt="Polypus"
                className="relative w-28 h-28 object-contain"
                onError={e => { e.currentTarget.style.display = 'none' }}
              />
            </div>
          </FadeIn>

          {/* Eyebrow */}
          <FadeIn delay={0.1}>
            <span className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 bg-purple/10 ring-1 ring-purple/25 text-[10px] uppercase tracking-[0.22em] text-purple/80 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-purple animate-pulse-soft" />
              Flagship Product · Coming 2026
            </span>
          </FadeIn>

          {/* H1 */}
          <FadeIn delay={0.15}>
            <h1 className="font-sans font-semibold tracking-tightest text-[clamp(3rem,7vw,6rem)] leading-[0.92] text-white max-w-4xl mb-8">
              One interface.<br/>
              <span className="text-purple">Every AI model.</span>
            </h1>
          </FadeIn>

          {/* Subtitle */}
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-white/50 max-w-xl leading-relaxed font-light mb-12">
              Polypus is the AI orchestrator that routes every task to the right model — automatically. Built for builders.
            </p>
          </FadeIn>

          {/* CTA */}
          <FadeIn delay={0.25} className="mb-16">
            <a
              href="mailto:hello@cephalon.ai?subject=Polypus Waitlist"
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-purple text-ink-950 text-[11px] font-medium tracking-[0.22em] uppercase hover:bg-purple/90 active:scale-[0.98] transition-all"
            >
              Join Waitlist
              <span className="w-7 h-7 rounded-full bg-ink-950/15 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-[0.5px] transition-transform">
                <ArrowRight size={11} />
              </span>
            </a>
          </FadeIn>

          {/* Video hero */}
          <FadeIn delay={0.3} className="w-full">
            <VideoHero
              src="/videos/polypus-v4.mp4"
              poster="/videos/polypus-poster.png"
              accent="rgba(192,132,252,0.35)"
              label="Watch Polypus · 2026"
            />
          </FadeIn>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────── */}
      <section className="relative py-32 bg-ink-900 border-y border-white/5 overflow-hidden">
        <BackgroundPattern variant="neural" tone="dark" opacity={0.08} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn className="text-center mb-20">
            <span className="inline-flex items-center rounded-full px-3 py-1 bg-purple/10 ring-1 ring-purple/20 text-[10px] uppercase tracking-[0.22em] text-purple/70 mb-6">
              What Polypus does
            </span>
            <h2 className="font-sans font-semibold tracking-tightest text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] text-white max-w-3xl mx-auto">
              Every capability.<br/><span className="text-white/30">One place.</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden">
            {features.map((f, i) => (
              <FadeIn key={f.t} delay={i * 0.05} className="bg-ink-950 p-10 h-full">
                <div className="w-11 h-11 rounded-full bg-purple/10 ring-1 ring-purple/20 flex items-center justify-center mb-6">
                  <f.icon size={16} className="text-purple/80" />
                </div>
                <h3 className="text-base md:text-lg font-medium text-white mb-3 tracking-tight">{f.t}</h3>
                <p className="text-sm text-white/45 leading-relaxed font-light">{f.d}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
      <section className="relative py-32 bg-ink-950 overflow-hidden">
        <BackgroundPattern variant="wave" tone="dark" opacity={0.06} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(192,132,252,0.08) 0%, transparent 60%)' }} />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-12">
          <FadeIn className="text-center mb-20">
            <span className="inline-flex items-center rounded-full px-3 py-1 border border-white/10 text-[10px] uppercase tracking-[0.22em] text-white/40 mb-6">
              How it works
            </span>
            <h2 className="font-sans font-semibold tracking-tightest text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] text-white">
              Input → <span className="text-purple">Route</span> → Execute
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
            <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-purple/25 to-transparent" />
            {steps.map((s, i) => (
              <FadeIn key={s.n} delay={i * 0.1}>
                <div className="relative flex flex-col items-center text-center px-8 py-10">
                  <div className="w-16 h-16 rounded-full bg-ink-900 ring-1 ring-white/10 flex items-center justify-center mb-6 relative z-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
                    <span className="text-purple text-sm font-mono font-medium">{s.n}</span>
                  </div>
                  <h3 className="text-base md:text-lg font-medium text-white mb-4 tracking-tight">{s.t}</h3>
                  <p className="text-sm text-white/45 leading-relaxed font-light max-w-xs">{s.d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="relative py-40 bg-ink-900 border-t border-white/5 overflow-hidden">
        <BackgroundPattern variant="orbit" tone="dark" opacity={0.06} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(192,132,252,0.11) 0%, transparent 55%)' }} />
        <div className="relative max-w-2xl mx-auto px-6 lg:px-12 flex flex-col items-center text-center">
          <FadeIn>
            <div className="relative mb-10">
              <div className="absolute inset-0 rounded-full blur-3xl opacity-40"
                style={{ background: 'radial-gradient(circle, #C084FC, transparent)' }} />
              <img
                src="/logos/polypus-mark.svg"
                alt="Polypus"
                className="relative w-16 h-16 object-contain"
                onError={e => { e.currentTarget.style.display = 'none' }}
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h2 className="font-sans font-semibold tracking-tightest text-[clamp(2rem,4vw,3.5rem)] leading-[0.92] text-white mb-4">
              Polypus arrives<br/><span className="text-purple">in 2026.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-white/40 text-base leading-relaxed mb-10 font-light">
              Be first to access early builds.
            </p>
          </FadeIn>

          <FadeIn delay={0.15} className="w-full">
            <WaitlistForm />
          </FadeIn>

          <FadeIn delay={0.2} className="mt-12">
            <Link to="/products"
              className="inline-flex items-center gap-2 text-white/25 text-[10px] tracking-[0.22em] uppercase hover:text-white/50 transition-colors">
              <ArrowLeft size={10} /> Back to products
            </Link>
          </FadeIn>
        </div>
      </section>
    </PageWrapper>
  )
}
