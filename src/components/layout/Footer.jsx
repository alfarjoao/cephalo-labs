import { useState } from 'react'
import { Link } from 'react-router-dom'

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    window.location.href = `mailto:hello@cephalon.ai?subject=Newsletter signup&body=Add me to the CEPHALO newsletter: ${email}`
    setDone(true)
  }

  if (done) return <p className="text-xs text-white/40">You're on the list.</p>

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="text-sm border-b border-white/15 py-2 bg-transparent text-white placeholder:text-white/20 outline-none focus:border-white/60 transition-colors w-full"
      />
      <button
        type="submit"
        className="text-[11px] font-medium tracking-[0.22em] uppercase text-white/70 self-start mt-1 hover:text-white transition-colors"
      >
        Join waitlist →
      </button>
    </form>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative border-t border-white/5 bg-ink-950 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 mb-5">
              <img
                src="/logos/cephalo-mark.png"
                alt="Cephalo"
                className="w-6 h-6 object-contain brightness-0 invert opacity-80"
                onError={e => { e.currentTarget.style.display = 'none' }}
              />
              <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-white/80">
                CEPHALO Labs
              </span>
            </Link>
            <p className="text-sm text-white/45 leading-relaxed max-w-xs mt-4">
              We build AI. We deploy AI. We are AI.<br/>
              An AI developer studio building the next generation of intelligent systems.
            </p>
            <p className="text-[11px] text-white/25 tracking-wider mt-6">Portugal · Est. 2026</p>

            <div className="mt-6 flex items-center gap-3">
              <img
                src="/logos/polypus-mark.svg"
                alt="Polypus"
                className="w-8 h-8 object-contain opacity-70"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
              <div>
                <p className="text-xs font-medium text-white/70">Polypus</p>
                <p className="text-[11px] text-white/30">A CEPHALO Labs product</p>
              </div>
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-white/40 mb-4">Company</p>
            <nav className="flex flex-col gap-3">
              {[
                { href: '/about', label: 'About' },
                { href: '/founder', label: 'Founder' },
                { href: '/partners', label: 'Partners' },
                { href: '/contact', label: 'Contact' },
              ].map(l => (
                <Link key={l.href} to={l.href} className="text-sm text-white/55 hover:text-white transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Products */}
          <div>
            <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-white/40 mb-4">Products</p>
            <nav className="flex flex-col gap-3">
              {[
                { href: '/products',         label: 'Overview' },
                { href: '/products/polypus', label: 'Polypus' },
                { href: '/products/kernel',  label: 'Kernel' },
              ].map(l => (
                <Link key={l.href} to={l.href} className="text-sm text-white/55 hover:text-white transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Newsletter */}
          <div>
            <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-white/40 mb-4">Stay in the loop</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="border-t border-white/5 mt-14 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-[11px] text-white/25 tracking-wider">© {year} CEPHALO Labs. All rights reserved.</p>
          <a href="mailto:hello@cephalon.ai" className="text-[11px] text-white/35 hover:text-white tracking-wider transition-colors">
            hello@cephalon.ai
          </a>
        </div>
      </div>
    </footer>
  )
}
