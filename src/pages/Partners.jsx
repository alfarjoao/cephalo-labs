import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink, Check } from 'lucide-react'
import { useMeta } from '../components/ui/useMeta'
import PageWrapper from '../components/ui/PageWrapper'
import BackgroundPattern from '../components/ui/BackgroundPattern'
import CountUp from '../components/ui/CountUp'
import VideoHero from '../components/ui/VideoHero'
import { useEnvironment } from '../components/ui/EnvironmentContext'

// B&W palette — Pantheon brand reference uses neutral tones only
const GOLD = '#F5F5F0'       // Applied on dark backgrounds
const GOLD_INK = '#0A0A0A'   // Applied on light paper backgrounds

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

// ── Data (from pantheon-growth-agency.vercel.app) ─────────────────────────

const pantheon = {
  name: 'Pantheon Growth',
  positioning: 'Revenue Architecture for Market Leaders',
  tagline: 'Revenue systems that compound.',
  manifesto: "We don't manage services — we are the ecosystem.",
  location: 'Lisbon, Portugal · remote-first',
  founders: 'João Alfar · CEO — Simão · COO & Creative',
  site: 'pantheon-growth-agency.vercel.app',
  siteHref: 'https://pantheon-growth-agency.vercel.app/',
  contact: 'info@pantheongrowth.com',
  capacity: '3–6 client slots · Q2 2026',

  story: [
    "Pantheon Growth is João's first company — a B2B revenue architecture agency in Lisbon. Two integrated ecosystems (sales + AI) working as one unified system, eliminating the vendor silos that bleed revenue.",
    "CEPHALO built the infrastructure: the CRM, the operating system, the AI agents, the automation engine. Pantheon ran it in production for 18 months. The thesis was proved in numbers.",
    "This is not a vendor relationship. It is a founding partnership — same founder, same standard, shared DNA. When CEPHALO ships, Pantheon runs on it first.",
  ],

  ecosystems: [
    {
      t: 'Sales Ecosystem',
      items: ['Web design', 'Conversion funnels', 'Paid media · Meta & Google', 'Copywriting', 'Conversion rate optimisation', 'Analytics', 'Email automation'],
    },
    {
      t: 'AI Ecosystem',
      items: ['AI automation', 'Web & mobile apps', 'AI agents', 'Chatbots', 'N8N / Make integrations', 'Custom development', 'Data pipelines'],
    },
    {
      t: 'Pantheon OS',
      items: ['Client portal', 'Real-time analytics dashboard', '5 AI agents · 24/7', 'Automation engine · 16 triggers × 12 actions', 'CRM + War Room'],
    },
  ],

  built: [
    { t: 'Custom CRM', d: 'Full-stack, 25+ Supabase tables. Pipeline, portal, Instagram DM hub, Apollo.io sync.' },
    { t: 'Pantheon OS',  d: 'Agency operating system. Replaced five external tools. Real-time analytics, 5 AI agents, automation engine.' },
    { t: 'AI sales stack', d: 'Lead scoring. Proposal generation. Outreach automation. Production since 2024.' },
    { t: 'Delivery infrastructure', d: 'End-to-end client delivery — onboarding, execution, reporting — fully automated.' },
  ],

  results: [
    { prefix: '$', to: 400, suffix: 'K+', label: 'Revenue generated · 18 months' },
    { prefix: '',  to: 14,  suffix: '×',  label: 'Long-run overall ROAS' },
    { prefix: '',  to: 4.6, suffix: '×',  label: 'Paid media ROAS', decimals: 1 },
    { prefix: '',  to: 3.1, suffix: '%',  label: 'Average conversion rate', decimals: 1 },
  ],

  process: [
    { step: '01', t: 'Strategy',     d: 'Free 30-minute audit. Bottlenecks identified. Scope defined.' },
    { step: '02', t: 'Build',        d: 'Integrated systems shipped in 21–30 days. No slide decks, just running software.' },
    { step: '03', t: 'Optimisation', d: 'Ongoing tuning — 30 days to 12 months depending on tier.' },
    { step: '04', t: 'Ownership',    d: 'Client retains full code, design, and analytics. No vendor lock-in.' },
  ],

  differentiators: [
    'No monthly retainers — single build investment',
    'Full transparency — every metric, test, bottleneck visible',
    'No vendor lock-in — clients own every output',
    'Direct founder access — no middlemen, no account managers',
  ],

  video: '/videos/pantheon-growth-v4.mp4',
  poster: '/videos/pantheon-growth-poster.png',
  colour: GOLD,
}

export default function Partners() {
  useMeta(
    'Partners — CEPHALO Labs',
    "CEPHALO Labs × Pantheon Growth — the partnership that started it all. $400K+ in revenue generated on CEPHALO infrastructure."
  )
  const { setEnv } = useEnvironment()
  useEffect(() => {
    setEnv('pantheon')
    return () => setEnv('default')
  }, [setEnv])

  return (
    <PageWrapper>
      {/* ── HERO · light paper ───────────────────────────────────────── */}
      <section className="relative py-40 overflow-hidden bg-[var(--paper)] -mt-16 pt-44">
        <BackgroundPattern variant="neural" tone="paper" opacity={0.08} />
        <div className="absolute inset-0 bg-grid-paper pointer-events-none opacity-60" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85 }}
          >
            <span className="tag-eyebrow text-ink-950/60 block mb-10">Partnership · 2026</span>
            <h1 className="font-sans font-semibold tracking-tightest text-[clamp(3rem,7vw,6rem)] leading-[0.9] text-ink-950 max-w-5xl mb-12">
              Built together.<br/>
              <span className="text-ink-950/35">Growing together.</span>
            </h1>
            <p className="text-lg md:text-xl text-ink-950/60 max-w-2xl leading-relaxed font-light">
              Pantheon Growth was the first company to run entirely on CEPHALO infrastructure. <span className="text-ink-950 font-medium">$400K+ in revenue. Same founder. Same standard.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── PANTHEON · dark featured ─────────────────────────────────── */}
      <section className="relative py-32 border-y border-white/5 bg-ink-950 overflow-hidden">
        <BackgroundPattern variant="wave" tone="dark" opacity={0.06} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 70% 40%, ${GOLD}14 0%, transparent 65%)` }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="flex items-center gap-4 mb-16">
              <span className="tag-eyebrow text-white/30">Featured partner</span>
              <span className="h-px bg-white/10 flex-1 max-w-[120px]" />
              <span className="tag-eyebrow" style={{ color: GOLD, opacity: 0.65 }}>01 — PANTHEON</span>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left card */}
            <FadeIn className="lg:col-span-5">
              <div className="sticky top-24 bg-ink-900 ring-1 ring-white/10 rounded-2xl p-10 md:p-12 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
                <div className="mb-10 bg-white/5 ring-1 ring-white/10 p-2 rounded-xl inline-block">
                  <div className="px-6 py-4 rounded-lg bg-ink-950 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
                    <img
                      src="/logos/pantheon-growth.png"
                      alt="Pantheon Growth"
                      className="h-8 object-contain"
                      onError={e => {
                        e.currentTarget.replaceWith(
                          Object.assign(document.createElement('span'), {
                            className: 'text-sm font-medium tracking-[0.18em] uppercase text-white',
                            textContent: 'PANTHEON GROWTH',
                          })
                        )
                      }}
                    />
                  </div>
                </div>

                <p className="tag-eyebrow mb-4" style={{ color: GOLD + 'BB' }}>{pantheon.positioning}</p>
                <p className="text-2xl md:text-3xl text-white font-light leading-tight tracking-tight mb-6">
                  {pantheon.tagline}
                </p>
                <p className="text-[15px] text-white/55 font-light italic leading-relaxed mb-10 border-l-2 pl-4"
                  style={{ borderColor: GOLD + '55' }}>
                  {pantheon.manifesto}
                </p>

                <dl className="space-y-3 mb-10 text-sm font-light">
                  <MetaRow label="Location"  value={pantheon.location} />
                  <MetaRow label="Founders"  value={pantheon.founders} />
                  <MetaRow label="Capacity"  value={pantheon.capacity} />
                  <MetaRow label="Contact"   value={pantheon.contact} />
                </dl>

                <a href={pantheon.siteHref} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.22em] uppercase border-b pb-0.5 transition-colors group"
                  style={{ color: GOLD + 'CC', borderColor: GOLD + '55' }}
                >
                  Visit {pantheon.site}
                  <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-px transition-transform">
                    <ExternalLink size={9} />
                  </span>
                </a>
              </div>
            </FadeIn>

            {/* Right — story + built */}
            <FadeIn delay={0.1} className="lg:col-span-7">
              <div className="space-y-6 text-white/60 leading-relaxed text-[15px] md:text-base font-light mb-14">
                {pantheon.story.map((s, i) => (
                  <p key={i}>{s.split('$400K+').length > 1
                    ? (<>{s.split('$400K+')[0]}<strong className="text-white font-medium">$400K+</strong>{s.split('$400K+')[1]}</>)
                    : s}</p>
                ))}
              </div>

              <span className="tag-eyebrow text-white/35 block mb-8">What CEPHALO built</span>
              <div className="space-y-0">
                {pantheon.built.map((item, i) => (
                  <FadeIn key={item.t} delay={i * 0.07}>
                    <div className="py-6 border-b border-white/5 flex gap-5">
                      <span className="font-mono text-[11px] text-white/25 tracking-[0.1em] pt-1 flex-shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="text-base md:text-lg font-medium text-white mb-2 tracking-tight">{item.t}</h3>
                        <p className="text-sm text-white/50 leading-relaxed font-light">{item.d}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── CASE STUDY VIDEO · dark ──────────────────────────────────── */}
      <section className="relative py-28 border-b border-white/5 bg-ink-950 overflow-hidden">
        <BackgroundPattern variant="orbit" tone="dark" opacity={0.05} />
        <div className="absolute -top-40 left-1/3 w-[600px] h-[400px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${GOLD}22 0%, transparent 65%)` }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn className="mb-14 text-center">
            <span className="tag-eyebrow block mb-4" style={{ color: GOLD + 'BB' }}>Case study</span>
            <h2 className="font-sans font-semibold text-[clamp(1.8rem,3.5vw,3rem)] tracking-tightest text-white leading-[0.95]">
              The full story.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <VideoHero
              src={pantheon.video}
              poster={pantheon.poster}
              accent={GOLD + '55'}
              label="Watch · 2026"
            />
          </FadeIn>
        </div>
      </section>

      {/* ── ECOSYSTEMS · light paper ─────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden bg-[var(--paper)]">
        <BackgroundPattern variant="dots" tone="paper" opacity={0.06} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn className="mb-16">
            <span className="tag-eyebrow text-ink-950/60 block mb-6">Two ecosystems · one system</span>
            <h2 className="font-sans font-semibold text-[clamp(2rem,4vw,3.5rem)] tracking-tightest text-ink-950 leading-[0.95] max-w-3xl">
              Sales · AI · OS.<br/>
              <span className="text-ink-950/30">Unified, not stitched.</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pantheon.ecosystems.map((eco, i) => (
              <FadeIn key={eco.t} delay={i * 0.1}>
                <div className="h-full p-8 md:p-10 bg-[var(--paper-2)] border border-ink-950/10 rounded-2xl">
                  <p className="tag-eyebrow text-ink-950/60 mb-8">{eco.t}</p>
                  <ul className="space-y-3">
                    {eco.items.map(item => (
                      <li key={item} className="flex items-start gap-3 text-sm md:text-base text-ink-950/65 font-light">
                        <span className="block w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-ink-950" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULTS · dark ───────────────────────────────────────────── */}
      <section className="relative py-28 border-y border-white/5 bg-ink-950 overflow-hidden">
        <BackgroundPattern variant="wave" tone="dark" opacity={0.06} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn className="mb-12">
            <span className="tag-eyebrow block mb-4" style={{ color: GOLD + 'BB' }}>The result · production numbers</span>
            <h2 className="font-sans font-semibold text-[clamp(1.8rem,3.5vw,3rem)] tracking-tightest text-white leading-[0.95] max-w-3xl">
              These are not projections.<br/>
              <span className="text-white/35">These are receipts.</span>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden">
            {pantheon.results.map((r, i) => (
              <FadeIn key={r.label} delay={i * 0.07} className="bg-ink-950 p-10 text-center">
                <p className="font-sans font-semibold text-4xl lg:text-5xl text-white mb-4 tracking-tightest">
                  {r.prefix}<CountUp to={r.to} decimals={r.decimals || 0} />{r.suffix}
                </p>
                <p className="text-[10px] font-medium tracking-[0.22em] uppercase" style={{ color: GOLD + 'AA' }}>
                  {r.label}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS · light paper ────────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden bg-[var(--paper-2)]">
        <BackgroundPattern variant="neural" tone="paper" opacity={0.05} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <span className="tag-eyebrow text-ink-950/60 block mb-6">How Pantheon delivers</span>
            <h2 className="font-sans font-semibold text-[clamp(1.8rem,3.5vw,3rem)] tracking-tightest text-ink-950 leading-[0.95] mb-16 max-w-3xl">
              No retainers.<br/>
              <span className="text-ink-950/30">No lock-in.</span>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {pantheon.process.map((s, i) => (
              <FadeIn key={s.step} delay={i * 0.1}>
                <div className="border-t-2 border-ink-950/20 pt-8 pb-6 md:pr-10">
                  <span className="tag-eyebrow text-ink-950/50 block mb-6">{s.step}</span>
                  <h3 className="font-sans font-semibold text-xl md:text-2xl tracking-tight text-ink-950 mb-4">{s.t}</h3>
                  <p className="text-sm text-ink-950/55 leading-relaxed font-light">{s.d}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <div className="mt-14 p-8 md:p-10 rounded-2xl bg-ink-950 flex flex-col md:flex-row gap-6 md:items-center">
              <div className="flex-1">
                <p className="tag-eyebrow mb-2" style={{ color: GOLD + 'BB' }}>Pantheon difference</p>
                <p className="text-white text-lg font-light leading-relaxed">
                  {pantheon.differentiators.join('  ·  ')}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── PARTNER WITH CEPHALO · dark ──────────────────────────────── */}
      <section className="relative py-32 bg-ink-950 overflow-hidden">
        <BackgroundPattern variant="wave" tone="dark" opacity={0.06} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <FadeIn>
              <span className="tag-eyebrow text-white/35 block mb-6">Work with CEPHALO</span>
              <h2 className="text-3xl md:text-4xl font-medium text-white mb-6 leading-[1.1] tracking-tight">
                Want AI infrastructure<br/>built for your business?
              </h2>
              <p className="text-white/55 leading-relaxed mb-10 font-light">
                We partner with businesses serious about AI — not as a gimmick, but as competitive infrastructure. If that is you, let's talk.
              </p>
              <Link to="/contact"
                className="group inline-flex items-center gap-2 px-6 py-3.5 bg-white text-ink-950 text-[11px] font-medium tracking-[0.22em] uppercase hover:bg-white/90 active:scale-[0.98] transition-all">
                Start a conversation
                <span className="w-7 h-7 rounded-full bg-ink-950/10 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-[0.5px] transition-transform">
                  <ArrowRight size={11} />
                </span>
              </Link>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="space-y-0">
                {[
                  'Custom AI systems built from scratch',
                  'Existing workflow automation and integration',
                  'AI product development from zero to launch',
                  'Ongoing technical partnership and maintenance',
                ].map((item, i) => (
                  <div key={item} className="flex items-center gap-4 py-5 border-b border-white/5">
                    <span className="font-mono text-[11px] text-white/25 tracking-[0.1em] w-6">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-sm text-white/55 font-light">{item}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}

// ── small helpers ─────────────────────────────────────────────────────────
function MetaRow({ label, value }) {
  return (
    <div className="flex items-baseline gap-6 border-b border-white/5 pb-3">
      <dt className="text-[10px] font-medium tracking-[0.22em] uppercase text-white/30 w-20 flex-shrink-0">{label}</dt>
      <dd className="text-sm text-white/65 font-light">{value}</dd>
    </div>
  )
}
