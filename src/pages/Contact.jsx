import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import PageWrapper from '../components/ui/PageWrapper'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '', type: 'Build something' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // In production: connect to form backend
    setSent(true)
  }

  const types = ['Build something', 'Deploy AI', 'Partner with us', 'Just curious']

  return (
    <PageWrapper>
      {/* Header */}
      <section className="py-32 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-8">Contact</p>
            <h1 className="font-serif text-[clamp(3rem,6vw,5rem)] leading-[0.95] text-black max-w-2xl mb-8">
              Let's build<br />
              <em className="not-italic text-gray-300">something real.</em>
            </h1>
            <p className="text-lg text-gray-500 max-w-lg leading-relaxed font-light">
              Whether you want AI built from scratch, deployed into your business, or just want to understand what's possible — start here.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {sent ? (
              <div className="py-20 text-center">
                <p className="font-serif text-4xl text-black mb-4">Thank you.</p>
                <p className="text-gray-500">We'll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Type selector */}
                <div>
                  <label className="text-xs font-medium tracking-wider uppercase text-gray-400 block mb-3">
                    I want to
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {types.map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, type: t }))}
                        className={`text-xs font-medium tracking-wider uppercase px-4 py-2 border transition-colors ${
                          form.type === t
                            ? 'border-black bg-black text-white'
                            : 'border-gray-200 text-gray-500 hover:border-gray-400'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="text-xs font-medium tracking-wider uppercase text-gray-400 block mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full border-b border-gray-200 pb-3 text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition-colors bg-transparent"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs font-medium tracking-wider uppercase text-gray-400 block mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full border-b border-gray-200 pb-3 text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition-colors bg-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="text-xs font-medium tracking-wider uppercase text-gray-400 block mb-2">Company <span className="text-gray-300">(optional)</span></label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                    className="w-full border-b border-gray-200 pb-3 text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition-colors bg-transparent"
                    placeholder="Your company"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="text-xs font-medium tracking-wider uppercase text-gray-400 block mb-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full border-b border-gray-200 pb-3 text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition-colors bg-transparent resize-none"
                    placeholder="Tell us what you're building or what you need..."
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white text-xs font-medium tracking-wider uppercase hover:bg-gray-800 transition-colors"
                >
                  Send message <ArrowRight size={12} />
                </button>
              </form>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-12"
          >
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-6">Direct contact</p>
              <a
                href="mailto:pantheongrowth@gmail.com"
                className="inline-flex items-center gap-3 text-black hover:text-gray-500 transition-colors"
              >
                <Mail size={16} />
                <span className="text-sm">pantheongrowth@gmail.com</span>
              </a>
            </div>

            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-6">Location</p>
              <p className="text-sm text-gray-600">Coimbra & Porto</p>
              <p className="text-sm text-gray-400">Portugal</p>
            </div>

            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-6">What happens next</p>
              <div className="space-y-5">
                {[
                  'We read every message within 24 hours',
                  'If there is a fit, we schedule a call',
                  'We scope the project together',
                  'We build',
                ].map((step, i) => (
                  <div key={step} className="flex items-center gap-4">
                    <span className="text-xs font-mono text-gray-300">{String(i + 1).padStart(2, '0')}</span>
                    <p className="text-sm text-gray-600">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}
