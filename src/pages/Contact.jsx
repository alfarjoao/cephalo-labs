import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Mail, CheckCircle2 } from 'lucide-react'
import { useMeta } from '../components/ui/useMeta'
import PageWrapper from '../components/ui/PageWrapper'
import BackgroundPattern from '../components/ui/BackgroundPattern'

function FadeIn({ children, delay = 0, className = '', y = 18 }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })
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

const types = ['Build something', 'Deploy AI', 'Partner with us', 'Just curious']

export default function Contact() {
  useMeta(
    'Contact — CEPHALO Labs',
    'Start a conversation. Build AI systems, deploy intelligent infrastructure, or partner with CEPHALO Labs.'
  )
  const [form, setForm] = useState({
    name: '', email: '', company: '', message: '', type: 'Build something',
  })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setError('')
    try {
      const res = await fetch('https://formsubmit.co/ajax/hello@cephalon.ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company || 'Not provided',
          message: form.message,
          intent: form.type,
          _subject: `New inquiry from ${form.name} — CEPHALO Labs`,
          _captcha: 'false',
          _template: 'table',
        }),
      })
      const data = await res.json().catch(() => ({}))
      const ok = data.success === 'true' || data.success === true || res.ok
      if (ok) setSent(true)
      else throw new Error(data.message || 'Submission failed')
    } catch (err) {
      // Fallback — open mail client so the message is not lost
      const subject = encodeURIComponent(`CEPHALO inquiry — ${form.name}`)
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\nIntent: ${form.type}\n\n${form.message}`
      )
      setError(
        'Direct submission failed — opening your email client as backup.'
      )
      window.location.href = `mailto:hello@cephalon.ai?subject=${subject}&body=${body}`
    } finally {
      setSending(false)
    }
  }

  return (
    <PageWrapper>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative py-36 border-b border-white/5 overflow-hidden bg-ink-950 -mt-16 pt-40">
        <BackgroundPattern variant="neural" tone="dark" opacity={0.12} />
        <div className="absolute inset-0 bg-grid-faint pointer-events-none opacity-50" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="tag-eyebrow text-white/40 block mb-10">Contact · 2026</span>
            <h1 className="font-sans font-semibold tracking-tightest text-[clamp(3rem,7vw,6rem)] leading-[0.9] text-white max-w-3xl mb-10">
              Let's build<br/>
              <span className="text-white/30">something real.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/45 max-w-xl leading-relaxed font-light">
              Whether you want AI built from scratch, deployed into your business, or just want to understand what's possible — start here.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FORM + INFO ──────────────────────────────────────────────── */}
      <section className="relative py-28 bg-ink-900 overflow-hidden">
        <BackgroundPattern variant="wave" tone="dark" opacity={0.06} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {sent ? (
              <div className="py-14 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 ring-1 ring-white/20 mb-8">
                  <CheckCircle2 className="text-white/80" size={26} strokeWidth={1.5} />
                </div>
                <p className="font-sans font-semibold text-3xl md:text-4xl text-white mb-4 tracking-tight">Thank you.</p>
                <p className="text-white/50 text-base font-light">We'll be in touch shortly.</p>
                <p className="text-[11px] text-white/25 tracking-[0.22em] uppercase mt-8">Reply within 24 hours</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Hidden honeypot — formsubmit spam filter */}
                <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                {/* Type selector */}
                <div>
                  <label className="text-[10px] font-medium tracking-[0.22em] uppercase text-white/40 block mb-3">
                    I want to
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {types.map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, type: t }))}
                        className={`text-[11px] font-medium tracking-[0.22em] uppercase px-4 py-2 border transition-colors ${
                          form.type === t
                            ? 'border-white bg-white text-ink-950'
                            : 'border-white/15 text-white/50 hover:border-white/40 hover:text-white/80'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <InputField
                  label="Name" required
                  value={form.name}
                  onChange={v => setForm(f => ({ ...f, name: v }))}
                  placeholder="Your name"
                  type="text"
                />
                <InputField
                  label="Email" required
                  value={form.email}
                  onChange={v => setForm(f => ({ ...f, email: v }))}
                  placeholder="your@email.com"
                  type="email"
                />
                <InputField
                  label="Company"
                  value={form.company}
                  onChange={v => setForm(f => ({ ...f, company: v }))}
                  placeholder="Your company (optional)"
                  type="text"
                />

                <div>
                  <label className="text-[10px] font-medium tracking-[0.22em] uppercase text-white/40 block mb-3">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full border-b border-white/15 pb-3 text-sm md:text-base text-white placeholder-white/25 focus:outline-none focus:border-white transition-colors bg-transparent resize-none"
                    placeholder="Tell us what you're building or what you need..."
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-400/80 border-l-2 border-red-400/50 pl-4">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-ink-950 text-[11px] font-medium tracking-[0.22em] uppercase hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                >
                  {sending ? 'Sending...' : 'Send message'}
                  <span className="w-7 h-7 rounded-full bg-ink-950/10 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-[0.5px] transition-transform">
                    <ArrowRight size={11} />
                  </span>
                </button>
              </form>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-14"
          >
            <FadeIn>
              <p className="tag-eyebrow text-white/40 mb-6">Direct contact</p>
              <a
                href="mailto:hello@cephalon.ai"
                className="inline-flex items-center gap-3 text-white hover:text-white/70 transition-colors group"
              >
                <Mail size={18} />
                <span className="text-base md:text-lg tracking-tight">hello@cephalon.ai</span>
                <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-[0.5px] transition-transform">
                  <ArrowRight size={11} />
                </span>
              </a>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="tag-eyebrow text-white/40 mb-6">Location · 2026</p>
              <p className="text-base text-white/60 font-light">Portugal</p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="tag-eyebrow text-white/40 mb-6">What happens next</p>
              <div className="space-y-5">
                {[
                  'We read every message within 24 hours',
                  'If there is a fit, we schedule a call',
                  'We scope the project together',
                  'We build',
                ].map((step, i) => (
                  <div key={step} className="flex items-center gap-4">
                    <span className="font-mono text-[11px] text-white/25 tracking-[0.1em] w-8">{String(i + 1).padStart(2, '0')}</span>
                    <p className="text-sm md:text-base text-white/55 font-light">{step}</p>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="border-t border-white/5 pt-8">
                <p className="tag-eyebrow text-white/40 mb-4">Est.</p>
                <p className="font-sans font-semibold text-4xl md:text-5xl text-white tracking-tightest">2026</p>
              </div>
            </FadeIn>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}

// ── InputField helper ─────────────────────────────────────────────────────
function InputField({ label, value, onChange, placeholder, type = 'text', required = false }) {
  return (
    <div>
      <label className="text-[10px] font-medium tracking-[0.22em] uppercase text-white/40 block mb-3">
        {label}{required ? '' : <span className="text-white/20 ml-2 normal-case tracking-normal">(optional)</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full border-b border-white/15 pb-3 text-sm md:text-base text-white placeholder-white/25 focus:outline-none focus:border-white transition-colors bg-transparent"
        placeholder={placeholder}
      />
    </div>
  )
}
