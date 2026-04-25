import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Mail } from 'lucide-react'
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

export default function Founder() {
  useMeta(
    'Founder — CEPHALO Labs',
    'João Alfar — Founder of CEPHALO Labs. Built Pantheon Growth\'s full stack. Generated $400K+ in revenue before CEPHALO.'
  )
  const [imgOk, setImgOk] = useState(true)

  return (
    <PageWrapper>
      {/* ── HERO · dark cinematic with photo ─────────────────────────── */}
      <section className="relative bg-ink-950 py-32 lg:py-40 overflow-hidden border-b border-white/5 -mt-16 pt-44">
        <BackgroundPattern variant="neural" tone="dark" opacity={0.1} />
        <div className="absolute inset-0 bg-grid-faint pointer-events-none opacity-40" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 70%)' }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
              className="lg:col-span-5 flex justify-center lg:justify-start"
            >
              <div className="relative group">
                {/* Ambient glow */}
                <div className="absolute -inset-6 rounded-full blur-2xl opacity-40 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)' }} />
                <div className="relative w-36 h-36 lg:w-44 lg:h-44 overflow-hidden rounded-full border border-white/15 ring-2 ring-white/5 ring-offset-4 ring-offset-ink-950 transition-all duration-700 group-hover:ring-white/15">
                  {imgOk ? (
                    <img
                      src="/images/owner.png"
                      alt="João Alfar"
                      className="w-full h-full object-cover object-center"
                      onError={() => setImgOk(false)}
                    />
                  ) : (
                    <div className="w-full h-full bg-white/5 flex items-center justify-center">
                      <span className="text-3xl font-semibold text-white/25">JA</span>
                    </div>
                  )}
                </div>
                <div className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-white border-2 border-ink-950 shadow-lg" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="lg:col-span-7"
            >
              <span className="tag-eyebrow text-white/35 block mb-8">Founder · 2026</span>
              <h1 className="font-sans font-semibold tracking-tightest text-[clamp(2.6rem,6vw,5rem)] leading-[0.95] text-white mb-8">
                João Alfar<br/>
                <span className="text-white/30">builds the tools<br/>he wishes existed.</span>
              </h1>
              <p className="text-lg text-white/55 leading-relaxed font-light max-w-xl mb-10">
                Full-stack engineer. Co-founder of Pantheon Growth. Founder of CEPHALO Labs. The kind of founder who writes the code, runs the infra, and sits on calls with customers in the same afternoon.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <div className="border border-white/15 px-4 py-2 rounded-full hover:border-white/35 transition-colors">
                  <span className="text-[11px] font-medium tracking-[0.22em] uppercase text-white/70">CEPHALO Labs · CEO</span>
                </div>
                <div className="border border-white/15 px-4 py-2 rounded-full hover:border-white/35 transition-colors">
                  <span className="text-[11px] font-medium tracking-[0.22em] uppercase text-white/70">Pantheon Growth · Co-founder</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CREDIBILITY · light paper ────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden bg-[var(--paper)]">
        <BackgroundPattern variant="wave" tone="paper" opacity={0.07} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <FadeIn className="lg:col-span-4">
              <span className="tag-eyebrow block mb-6 text-ink-950/55">Credibility · 2024 → 2026</span>
              <h2 className="font-sans font-semibold text-[clamp(1.8rem,3.5vw,3rem)] tracking-tightest text-ink-950 leading-[0.95]">
                Recent studio.<br/>
                <span className="text-ink-950/35">Proven record.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.12} className="lg:col-span-8">
              <div className="space-y-6 text-ink-950/65 leading-relaxed text-[15px] md:text-base font-light">
                <p>
                  CEPHALO Labs was founded in <strong className="text-ink-950/90">2026</strong>. But the work started earlier — in 2024, when João co-founded <strong className="text-ink-950/90">Pantheon Growth</strong> with Simão. Pantheon needed AI infrastructure that nobody was selling. So João built it.
                </p>
                <p>
                  A full-stack CRM, from scratch. An operating system for the agency. AI sales automation. Product-and-service delivery infrastructure. The results were not theoretical: over <strong className="text-ink-950/90">$400K in revenue generated</strong> in 18 months. <strong className="text-ink-950/90">14× long-run ROAS.</strong> <strong className="text-ink-950/90">340% lead growth in 90 days</strong>. <strong className="text-ink-950/90">80% of manual operations eliminated</strong>.
                </p>
                <p>
                  CEPHALO is the studio that grew out of that work. The products — Polypus and Kernel — are the first public outputs. The thesis is already proved.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-0 bg-ink-950/10 rounded-xl overflow-hidden mt-12">
                {[
                  { prefix: '$', to: 400, suffix: 'K+', label: 'Revenue built at Pantheon' },
                  { prefix: '',  to: 14,  suffix: '×',  label: 'Long-run ROAS' },
                  { prefix: '',  to: 80,  suffix: '%',  label: 'Manual ops reduced' },
                ].map((s, i) => (
                  <div key={s.label} className={`bg-[var(--paper-2)] p-6 md:p-8 text-center`}>
                    <p className="font-sans font-semibold text-3xl md:text-4xl text-ink-950 mb-2 tracking-tightest">
                      {s.prefix}<CountUp to={s.to} />{s.suffix}
                    </p>
                    <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-ink-950/45">{s.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── APPROACH · dark ──────────────────────────────────────────── */}
      <section className="relative py-32 border-y border-white/5 bg-ink-950 overflow-hidden">
        <BackgroundPattern variant="orbit" tone="dark" opacity={0.06} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <FadeIn>
            <span className="tag-eyebrow text-white/35 block mb-8">Approach</span>
            <h2 className="font-sans font-semibold text-[clamp(1.8rem,3.5vw,3rem)] tracking-tightest text-white leading-[0.95] mb-8">
              Where others see<br/>
              assistants, he sees<br/>
              <span className="text-white/30">infrastructure.</span>
            </h2>
            <p className="text-white/55 leading-relaxed font-light text-base md:text-lg">
              Polypus and Kernel started as private tools João was running inside Pantheon. Then the team realised — the bottleneck everyone else was hitting was the same one. So the studio opened up. CEPHALO is the public version of the work.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="space-y-0 border-t border-white/10">
              {[
                { t: 'Build AI infrastructure',        d: 'Custom systems. Production-grade. End-to-end.' },
                { t: 'Work with Claude as a co-founder', d: 'AI collaboration is a new kind of engineering partnership.' },
                { t: 'Ship what you would use',         d: 'If João would not run his own work on it, he will not ask you to.' },
                { t: 'Research meets execution',        d: 'Depth of a lab. Speed of a studio. Both, in the same week.' },
              ].map(r => (
                <div key={r.t} className="py-6 border-b border-white/5">
                  <h3 className="text-base md:text-lg font-medium text-white mb-2 tracking-tight">{r.t}</h3>
                  <p className="text-sm text-white/45 font-light">{r.d}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── QUOTE · light paper ──────────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden bg-[var(--paper-2)] border-b border-ink-950/5">
        <BackgroundPattern variant="dots" tone="paper" opacity={0.05} />
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full pointer-events-none opacity-60"
          style={{ background: 'radial-gradient(circle, rgba(10,10,10,0.04) 0%, transparent 70%)' }} />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="text-ink-950/10 text-[6rem] md:text-[9rem] leading-none font-serif select-none mb-2">"</div>
            <blockquote className="text-ink-950 text-2xl md:text-3xl lg:text-4xl font-light leading-[1.25] mb-10 tracking-tight -mt-6">
              I do not build AI tools because they are trendy. I build them because every time I finish one, I cannot imagine working without it. <span className="text-ink-950/40">If I would not use it myself, we do not ship it.</span>
            </blockquote>
            <p className="tag-eyebrow text-ink-950/45">— João Alfar · CEO · CEPHALO Labs · 2026</p>
          </FadeIn>
        </div>
      </section>

      {/* ── CO-FOUNDER · dark ────────────────────────────────────────── */}
      <section className="relative py-24 border-y border-white/5 bg-ink-950 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <span className="tag-eyebrow text-white/40 block mb-10">Co-founder · Pantheon</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex items-center gap-8 p-8 border border-white/10 rounded-2xl bg-white/[0.02] hover:border-white/20 transition-colors">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="font-medium text-xl text-white/40">S</span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-1 tracking-tight">Simão</h3>
                <p className="text-[10px] text-white/30 tracking-[0.22em] uppercase mb-3">COO & Creative · Co-founder · Pantheon Growth</p>
                <p className="text-sm text-white/55 leading-relaxed font-light">
                  Creative director at Pantheon Growth. Scaled paid media to <span className="text-white/80">4.6× ROAS</span>. Keeps the business running while João builds the future.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CONNECT · light paper ────────────────────────────────────── */}
      <section className="relative py-28 bg-[var(--paper)] overflow-hidden">
        <div className="absolute inset-0 bg-grid-paper pointer-events-none opacity-40" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-medium text-ink-950 mb-2 tracking-tight">Work with us.</h2>
            <p className="text-ink-950/50 text-sm font-light">Build something that matters.</p>
          </FadeIn>
          <FadeIn delay={0.1} className="flex flex-wrap gap-3 items-center">
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-ink-950 text-white text-[11px] font-medium tracking-[0.22em] uppercase hover:bg-ink-900 transition-colors">
              Get in touch <ArrowRight size={11} />
            </Link>
            <a href="mailto:hello@cephalon.ai" className="inline-flex items-center gap-2 px-5 py-3 border border-ink-950/20 text-ink-950/70 text-[11px] font-medium tracking-[0.22em] uppercase hover:border-ink-950 hover:text-ink-950 transition-colors">
              <Mail size={12} /> Email
            </a>
          </FadeIn>
        </div>
      </section>
    </PageWrapper>
  )
}
