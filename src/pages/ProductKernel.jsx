import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import {
  ArrowLeft, ArrowRight,
  Scissors, Layers, Gauge, GitBranch, ShieldCheck,
  Zap, TrendingDown, Clock, Coins, Plus, Minus,
} from 'lucide-react'
import { useMeta } from '../components/ui/useMeta'
import PageWrapper from '../components/ui/PageWrapper'
import BackgroundPattern from '../components/ui/BackgroundPattern'
import CountUp from '../components/ui/CountUp'
import { useEnvironment } from '../components/ui/EnvironmentContext'

// B&W palette — Kernel is strictly black and white (in development)
const GOLD = '#F5F5F0'

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

// ── DATA ──────────────────────────────────────────────────────────────────

const pillars = [
  {
    n: '01', icon: Scissors, t: 'Task decomposition',
    d: 'Large tasks are broken into micro-tasks automatically. Each is sent to the right place — never overloading any single model.',
    stat: '60% less tokens',
    detail: 'Faster execution. Higher quality. Zero manual breakdown.',
  },
  {
    n: '02', icon: Layers, t: 'Intelligent memory',
    d: 'Three-layer system: hot (VRAM), warm (RAM), cold (disk). Context stays where it belongs.',
    stat: '70% context reduction',
    detail: 'Zero data loss. Sessions pick up where they left off.',
  },
  {
    n: '03', icon: Gauge, t: 'Token intelligence',
    d: 'Every token is scored. Redundant context is compressed automatically — without losing meaning.',
    stat: '70–85% token reduction',
    detail: 'Requests get smaller. Bills get smaller. Quality stays.',
  },
  {
    n: '04', icon: GitBranch, t: 'Adaptive routing',
    d: 'Kernel analyses each task and routes to the optimal model. Simple → local. Complex → Claude. Always.',
    stat: 'Right model · right task',
    detail: 'Free where it works. Premium only where it earns it.',
  },
]

const flow = [
  { label: 'Input',         icon: ArrowRight },
  { label: 'Analysis',      icon: Gauge },
  { label: 'Decomposition', icon: Scissors },
  { label: 'Memory routing', icon: Layers },
  { label: 'Execution',     icon: Zap },
  { label: 'Synthesis',     icon: ShieldCheck },
]

const numbers = [
  { before: '5,000', after: '1,500', label: 'Tokens per request', delta: '−70%',  icon: TrendingDown },
  { before: '€0.30', after: '€0.08', label: 'Cost per request',    delta: '−73%',  icon: Coins },
  { before: '12s',   after: '3s',    label: 'Latency',             delta: '4× faster', icon: Clock },
  { before: '€5,000',after: '€1,500',label: 'Monthly AI spend',    delta: '−€3,500 / mo', icon: TrendingDown },
]

const useCases = [
  'Document analysis at scale',
  'Customer support automation',
  'Data extraction pipelines',
  'Content generation',
  'Research & synthesis',
  'Local AI deployment',
]

const faq = [
  {
    q: 'How does Kernel reduce tokens without losing quality?',
    a: 'Kernel scores every token in the context for relevance to the active task. Redundant passages are compressed or swapped for references; critical context stays verbatim. In internal benchmarks, 70–85% token reduction maintains equal or better output quality across summarisation, reasoning and code tasks.',
  },
  {
    q: 'Which models does Kernel route to?',
    a: 'Claude (Haiku, Sonnet, Opus), GPT-4 class, Gemini, and any Ollama-hosted local model. Routing is rule-based and can be overridden per workflow.',
  },
  {
    q: 'Is my data ever used to train models?',
    a: 'No. Kernel routes through provider APIs with their no-training contracts. Your data stays yours. Enterprise deployments can run fully on-prem.',
  },
  {
    q: 'How fast is integration?',
    a: 'Swap one SDK import. We ship a drop-in client for OpenAI-compatible and Anthropic-compatible SDKs. Most teams are live in under an hour.',
  },
  {
    q: 'What is the 40% guarantee?',
    a: 'If Kernel does not reduce your AI cost by at least 40% in the first 30 days, you get 100% of your subscription back. No fine print.',
  },
  {
    q: 'Does Kernel replace my current LLM provider?',
    a: 'No. It sits between your app and the providers you already use. Keep your Claude / OpenAI / Ollama accounts. Kernel only improves what you send through them.',
  },
]

// ── PAGE ──────────────────────────────────────────────────────────────────

export default function ProductKernel() {
  useMeta(
    'Kernel — The engine inside Polypus',
    'Kernel is the runtime that powers Polypus. Routing, memory, cost and agents — all visible, all orchestrated. Part of Polypus by CEPHALO Labs.'
  )
  const { setEnv } = useEnvironment()
  useEffect(() => {
    setEnv('default')
    return () => setEnv('default')
  }, [setEnv])

  return (
    <PageWrapper>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[92vh] flex flex-col justify-center py-28 bg-ink-950 -mt-16 pt-32">
        <BackgroundPattern variant="orbit" tone="dark" opacity={0.08} />
        <div className="absolute inset-0 bg-grid-faint pointer-events-none opacity-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${GOLD}22 0%, transparent 65%)` }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 flex flex-col items-center text-center">
          <FadeIn className="w-full mb-10">
            <Link to="/products"
              className="inline-flex items-center gap-2 text-white/30 text-[10px] tracking-[0.22em] uppercase hover:text-white/60 transition-colors">
              <ArrowLeft size={10} /> Products
            </Link>
          </FadeIn>

          {/* Logo */}
          <FadeIn>
            <div className="relative mb-8">
              <div className="absolute inset-0 rounded-full blur-3xl opacity-30"
                style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.25), transparent)' }} />
              <svg
                viewBox="0 0 60 60"
                fill="none"
                role="img"
                aria-label="Kernel — In Development"
                className="relative w-20 h-20"
                style={{ color: GOLD }}
              >
                <rect x="6"  y="6"  width="12" height="12" rx="2.5" fill="currentColor"/>
                <rect x="42" y="6"  width="12" height="12" rx="2.5" fill="currentColor"/>
                <rect x="6"  y="24" width="12" height="12" rx="2.5" fill="currentColor"/>
                <rect x="24" y="24" width="12" height="12" rx="2.5" fill="currentColor"/>
                <rect x="6"  y="42" width="12" height="12" rx="2.5" fill="currentColor"/>
                <rect x="42" y="42" width="12" height="12" rx="2.5" fill="currentColor"/>
                <rect x="24" y="6"  width="12" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 1.5" opacity="0.45"/>
                <rect x="42" y="24" width="12" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 1.5" opacity="0.45"/>
                <rect x="24" y="42" width="12" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 1.5" opacity="0.45"/>
              </svg>
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <span className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] mb-8 border border-white/15 bg-white/5 text-white/75">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-soft" />
              Inside Polypus · Private Beta
            </span>
          </FadeIn>

          <FadeIn delay={0.12}>
            <h1 className="font-sans font-semibold tracking-tightest text-[clamp(3rem,7vw,6.5rem)] leading-[0.9] text-white max-w-5xl mb-6">
              Kernel.
              <br/>
              <span className="text-white/35">The engine</span>
              <br/>
              <span style={{ color: GOLD }}>inside Polypus.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-white/45 max-w-xl leading-relaxed font-light mb-4">
              Most AI tools are a wrapper around a prompt. Polypus isn't. Underneath it runs Kernel — a runtime you can actually see.
            </p>
            <p className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed mb-12">
              Routing · memory · cost · agents. <span style={{ color: GOLD }}>One keystroke inside Polypus.</span>
            </p>
          </FadeIn>

          <FadeIn delay={0.28} className="flex flex-wrap gap-3 justify-center mb-16">
            <Link
              to="/products/polypus"
              className="group inline-flex items-center gap-2 px-7 py-3.5 text-[11px] font-medium tracking-[0.22em] uppercase bg-white text-ink-950 hover:bg-white/90 active:scale-[0.98] transition-all"
            >
              Experience Kernel inside Polypus
              <span className="w-7 h-7 rounded-full bg-ink-950/15 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-[0.5px] transition-transform">
                <ArrowRight size={11} />
              </span>
            </Link>
            <a
              href="mailto:hello@cephalon.ai?subject=Polypus — Private Beta"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-[11px] font-medium tracking-[0.22em] uppercase text-white/80 border border-white/20 hover:border-white/40 hover:text-white active:scale-[0.98] transition-all"
            >
              Join private beta
            </a>
          </FadeIn>

          {/* Quick numbers under hero */}
          <FadeIn delay={0.35} className="w-full max-w-4xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden">
              {[
                { v: '70%',  l: 'Less tokens' },
                { v: '73%',  l: 'Cost savings' },
                { v: '4×',   l: 'Faster' },
                { v: '€3.5K',l: 'Saved / month' },
              ].map((k, i) => (
                <div key={k.l} className="bg-ink-950 p-6 text-center">
                  <p className="font-sans font-semibold text-3xl md:text-4xl tracking-tightest mb-2" style={{ color: GOLD }}>
                    {k.v}
                  </p>
                  <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-white/35">{k.l}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── PROBLEM ──────────────────────────────────────────────────── */}
      <section className="relative py-28 border-y border-white/5 bg-ink-900 overflow-hidden">
        <BackgroundPattern variant="wave" tone="dark" opacity={0.06} />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-12">
          <FadeIn className="mb-16 text-center">
            <span className="tag-eyebrow block mb-6" style={{ color: GOLD + 'BB' }}>The problem</span>
            <h2 className="font-sans font-semibold text-[clamp(2rem,4.5vw,4rem)] tracking-tightest text-white leading-[0.95] max-w-3xl mx-auto">
              Your AI stack<br/>
              <span className="text-white/35">is bleeding money.</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden">
            {[
              { big: '60%',   small: 'of tokens you pay for are redundant context' },
              { big: '3×',    small: 'what you actually need — every month' },
              { big: '100%',  small: 'of large tasks waste compute on the wrong model' },
            ].map((c, i) => (
              <FadeIn key={c.small} delay={i * 0.08} className="bg-ink-950 p-10">
                <p className="font-sans font-semibold text-6xl md:text-7xl tracking-tightest mb-5" style={{ color: GOLD }}>
                  {c.big}
                </p>
                <p className="text-sm md:text-base text-white/55 font-light leading-relaxed">{c.small}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT IS KERNEL ───────────────────────────────────────────── */}
      <section className="relative py-28 bg-ink-950 overflow-hidden border-b border-white/5">
        <BackgroundPattern variant="neural" tone="dark" opacity={0.07} />
        <div className="absolute top-0 right-0 w-[600px] h-[400px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${GOLD}18 0%, transparent 65%)` }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
            <FadeIn className="lg:col-span-5">
              <span className="tag-eyebrow block mb-6" style={{ color: GOLD + 'BB' }}>What is Kernel</span>
              <h2 className="font-sans font-semibold text-[clamp(2rem,3.8vw,3.5rem)] tracking-tightest text-white leading-[0.95] mb-8">
                An invisible layer<br/>
                <span className="text-white/35">between your app<br/>and the model.</span>
              </h2>
              <p className="text-white/55 leading-relaxed font-light text-base md:text-lg mb-8">
                Kernel sits between your application and every AI provider you use. It watches what you send. Compresses what is redundant. Decomposes what is oversized. Routes each slice to the model that handles it best — without you ever rewriting a prompt.
              </p>
              <p className="text-white/75 leading-relaxed font-light text-base md:text-lg">
                You keep your stack. We make it cheaper, faster, sharper.
              </p>
            </FadeIn>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 rounded-2xl overflow-hidden">
                {pillars.map((p, i) => (
                  <FadeIn key={p.n} delay={i * 0.07} className="bg-ink-950 p-9">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}33` }}>
                        <p.icon size={15} style={{ color: GOLD }} />
                      </div>
                      <span className="font-mono text-[11px] tracking-[0.14em]" style={{ color: GOLD, opacity: 0.7 }}>
                        {p.n}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-medium text-white mb-3 tracking-tight">{p.t}</h3>
                    <p className="text-sm text-white/45 leading-relaxed font-light mb-5">{p.d}</p>
                    <p className="text-[11px] tracking-[0.22em] uppercase font-medium mb-2" style={{ color: GOLD }}>{p.stat}</p>
                    <p className="text-xs text-white/40 font-light">{p.detail}</p>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS — flow ──────────────────────────────────────── */}
      <section className="relative py-28 bg-ink-900 overflow-hidden border-b border-white/5">
        <BackgroundPattern variant="wave" tone="dark" opacity={0.05} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn className="text-center mb-16">
            <span className="tag-eyebrow block mb-6" style={{ color: GOLD + 'BB' }}>How it works</span>
            <h2 className="font-sans font-semibold text-[clamp(2rem,4vw,3.5rem)] tracking-tightest text-white leading-[0.95]">
              One pipeline.<br/>
              <span className="text-white/35">Six stages. Measured.</span>
            </h2>
          </FadeIn>

          <FadeIn>
            <div className="relative">
              <div className="hidden md:block absolute top-8 left-[7%] right-[7%] h-px"
                style={{ background: `linear-gradient(to right, transparent 0%, ${GOLD}40 15%, ${GOLD}40 85%, transparent 100%)` }} />
              <div className="grid grid-cols-2 md:grid-cols-6 gap-0">
                {flow.map((s, i) => (
                  <FadeIn key={s.label} delay={i * 0.08}>
                    <div className="relative flex flex-col items-center text-center px-3 py-6">
                      <div className="w-16 h-16 rounded-full bg-ink-950 flex items-center justify-center mb-5 relative z-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]"
                        style={{ border: `1px solid ${GOLD}33` }}>
                        <s.icon size={16} style={{ color: GOLD }} />
                      </div>
                      <p className="font-mono text-[10px] tracking-[0.1em] mb-1" style={{ color: GOLD, opacity: 0.6 }}>
                        {String(i + 1).padStart(2, '0')}
                      </p>
                      <p className="text-sm md:text-base font-medium text-white tracking-tight">{s.label}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── REAL NUMBERS · before / after ─────────────────────────────── */}
      <section className="relative py-28 bg-ink-950 overflow-hidden border-b border-white/5">
        <BackgroundPattern variant="dots" tone="dark" opacity={0.06} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn className="mb-16">
            <span className="tag-eyebrow block mb-6" style={{ color: GOLD + 'BB' }}>Real numbers · real customers</span>
            <h2 className="font-sans font-semibold text-[clamp(2rem,4vw,3.5rem)] tracking-tightest text-white leading-[0.95] max-w-3xl">
              Same task.<br/>
              <span className="text-white/35">Different economics.</span>
            </h2>
          </FadeIn>

          <div className="space-y-0">
            {numbers.map((n, i) => (
              <FadeIn key={n.label} delay={i * 0.08}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-8 border-b border-white/5 items-center">
                  <div className="md:col-span-1">
                    <n.icon size={18} style={{ color: GOLD, opacity: 0.7 }} />
                  </div>
                  <div className="md:col-span-3">
                    <p className="text-[10px] tracking-[0.22em] uppercase text-white/30 mb-1">{n.label}</p>
                  </div>
                  <div className="md:col-span-3 flex items-baseline gap-3">
                    <span className="tag-eyebrow text-white/25">Before</span>
                    <p className="font-sans font-semibold text-2xl md:text-3xl text-white/40 tracking-tightest line-through">
                      {n.before}
                    </p>
                  </div>
                  <div className="md:col-span-3 flex items-baseline gap-3">
                    <span className="tag-eyebrow" style={{ color: GOLD + 'AA' }}>With Kernel</span>
                    <p className="font-sans font-semibold text-2xl md:text-4xl tracking-tightest" style={{ color: GOLD }}>
                      {n.after}
                    </p>
                  </div>
                  <div className="md:col-span-2 md:text-right">
                    <span className="inline-flex items-center px-3 py-1 text-[11px] tracking-[0.14em] uppercase font-medium border"
                      style={{ borderColor: `${GOLD}55`, color: GOLD, background: `${GOLD}10` }}>
                      {n.delta}
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── USE CASES ────────────────────────────────────────────────── */}
      <section className="relative py-28 bg-ink-900 overflow-hidden border-b border-white/5">
        <BackgroundPattern variant="neural" tone="dark" opacity={0.05} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn className="mb-14">
            <span className="tag-eyebrow block mb-6" style={{ color: GOLD + 'BB' }}>Where Kernel lives</span>
            <h2 className="font-sans font-semibold text-[clamp(2rem,4vw,3.5rem)] tracking-tightest text-white leading-[0.95] max-w-3xl">
              Any pipeline moving tokens<br/>
              <span className="text-white/35">at scale.</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden">
            {useCases.map((uc, i) => (
              <FadeIn key={uc} delay={i * 0.06} className="bg-ink-950 p-8 flex items-center gap-4">
                <span className="font-mono text-[11px] tracking-[0.12em]" style={{ color: GOLD, opacity: 0.5 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-white/75 font-light">{uc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUNDLED WITH POLYPUS ─────────────────────────────────────── */}
      <section className="relative py-28 bg-ink-950 overflow-hidden border-b border-white/5">
        <BackgroundPattern variant="orbit" tone="dark" opacity={0.06} />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-12">
          <FadeIn className="text-center mb-14">
            <span className="tag-eyebrow block mb-6" style={{ color: GOLD + 'BB' }}>How you get it</span>
            <h2 className="font-sans font-semibold text-[clamp(2rem,4vw,3.5rem)] tracking-tightest text-white leading-[0.95]">
              Kernel is <span className="text-white/35">part of</span>
              <br />
              <span style={{ color: GOLD }}>Polypus.</span>
            </h2>
            <p className="mt-8 max-w-xl mx-auto text-white/55 font-light text-base md:text-lg leading-relaxed">
              Not a separate SKU. Not a pricing page. When you use Polypus, Kernel is already running — press <span className="font-mono text-white/80">Ctrl·Shift·K</span> and watch it work.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="relative p-10 md:p-14 rounded-2xl border text-center"
              style={{ borderColor: `${GOLD}33`, background: `${GOLD}06`, boxShadow: `inset 0 1px 1px rgba(255,255,255,0.06)` }}>
              <div className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}44` }}>
                <Layers size={20} style={{ color: GOLD }} />
              </div>
              <p className="tag-eyebrow mb-4" style={{ color: GOLD + 'BB' }}>Inside the product</p>
              <h3 className="font-sans font-semibold text-[clamp(1.5rem,3vw,2.5rem)] text-white tracking-tightest leading-[1] mb-6">
                One licence. <span className="text-white/40">Every layer.</span>
              </h3>
              <p className="text-white/65 font-light text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
                Polypus ships with the Kernel runtime — routing, memory, cost and agents — unlocked from day one. No add-ons. No per-token pricing. A desktop app with its engine visible.
              </p>
              <Link
                to="/products/polypus"
                className="group inline-flex items-center gap-2 px-7 py-3.5 text-[11px] font-medium tracking-[0.22em] uppercase bg-white text-ink-950 hover:bg-white/90 active:scale-[0.98] transition-all"
              >
                Experience Kernel inside Polypus
                <span className="w-7 h-7 rounded-full bg-ink-950/15 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-[0.5px] transition-transform">
                  <ArrowRight size={11} />
                </span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="relative py-28 bg-ink-900 overflow-hidden border-b border-white/5">
        <BackgroundPattern variant="dots" tone="dark" opacity={0.05} />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-12">
          <FadeIn className="mb-14">
            <span className="tag-eyebrow block mb-6" style={{ color: GOLD + 'BB' }}>FAQ</span>
            <h2 className="font-sans font-semibold text-[clamp(2rem,4vw,3.5rem)] tracking-tightest text-white leading-[0.95]">
              Honest answers.
            </h2>
          </FadeIn>
          <div className="space-y-0">
            {faq.map((item, i) => (
              <FAQItem key={item.q} q={item.q} a={item.a} delay={i * 0.05} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="relative py-36 bg-ink-950 overflow-hidden">
        <BackgroundPattern variant="orbit" tone="dark" opacity={0.07} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 50% 60%, ${GOLD}18 0%, transparent 60%)` }} />
        <div className="relative max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <FadeIn>
            <span className="tag-eyebrow block mb-8" style={{ color: GOLD + 'BB' }}>The runtime, visible</span>
            <h2 className="font-sans font-semibold text-[clamp(2.5rem,5vw,5rem)] text-white leading-[0.95] tracking-tightest mb-8">
              Stop guessing<br/>
              <span className="text-white/35">what your AI is doing.</span>
            </h2>
            <p className="text-white/55 mb-12 max-w-lg mx-auto leading-relaxed font-light text-base md:text-lg">
              The Kernel is not sold separately. Use it by using Polypus — the desktop AI orchestrator it powers.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/products/polypus"
                className="group inline-flex items-center gap-2 px-8 py-4 text-[11px] font-medium tracking-[0.22em] uppercase bg-white text-ink-950 hover:bg-white/90 active:scale-[0.98] transition-all"
              >
                Experience Kernel inside Polypus
                <span className="w-7 h-7 rounded-full bg-ink-950/15 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-[0.5px] transition-transform">
                  <ArrowRight size={11} />
                </span>
              </Link>
              <a
                href="mailto:hello@cephalon.ai?subject=Polypus — Private Beta"
                className="inline-flex items-center gap-2 px-8 py-4 text-[11px] font-medium tracking-[0.22em] uppercase text-white/80 border border-white/20 hover:border-white/40 hover:text-white transition-colors"
              >
                Join private beta
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageWrapper>
  )
}

// ── FAQ item ──────────────────────────────────────────────────────────────
function FAQItem({ q, a, delay = 0 }) {
  const [open, setOpen] = useState(false)
  return (
    <FadeIn delay={delay}>
      <div className="border-b border-white/5">
        <button
          onClick={() => setOpen(o => !o)}
          className="w-full flex items-start justify-between gap-6 py-6 text-left group"
          aria-expanded={open}
        >
          <span className="text-base md:text-lg text-white font-medium tracking-tight group-hover:text-white/80 transition-colors">
            {q}
          </span>
          <span className="flex-shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center mt-1">
            {open
              ? <Minus size={12} className="text-white/60" />
              : <Plus size={12} className="text-white/60" />}
          </span>
        </button>
        <motion.div
          initial={false}
          animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="overflow-hidden"
        >
          <p className="text-sm md:text-base text-white/55 font-light leading-relaxed pb-6 pr-12">
            {a}
          </p>
        </motion.div>
      </div>
    </FadeIn>
  )
}
