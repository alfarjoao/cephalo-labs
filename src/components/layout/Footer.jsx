import { useState } from 'react'
import { Link } from 'react-router-dom'

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) setDone(true)
  }

  if (done) {
    return <p className="text-xs text-gray-500">You're on the list.</p>
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="text-sm border-b border-gray-200 py-2 bg-transparent text-black placeholder:text-gray-300 outline-none focus:border-black transition-colors duration-200 w-full"
      />
      <button
        type="submit"
        className="text-xs font-medium tracking-widest uppercase text-black self-start mt-1 hover:text-gray-500 transition-colors duration-200"
      >
        Join waitlist →
      </button>
    </form>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 mb-4">
              <img src="/logos/cephalo-mark.png" alt="Cephalo" className="w-6 h-6 object-contain" onError={e => e.target.style.display='none'} />
              <span className="text-xs font-medium tracking-widest uppercase">Cephalo Labs</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs mt-4">
              We build AI. We deploy AI. We are AI.<br/>
              An AI developer agency building the next generation of intelligent systems.
            </p>
            <p className="text-xs text-gray-300 mt-6">Coimbra & Porto, Portugal</p>

            <div className="mt-6 flex items-center gap-3">
              <img
                src="/logos/polypus-mark.png"
                alt="Polypus"
                className="w-8 h-8 object-contain opacity-60"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
              <div>
                <p className="text-xs font-medium text-gray-600">Polypus</p>
                <p className="text-xs text-gray-400">A Cephalo Labs product</p>
              </div>
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-4">Company</p>
            <nav className="flex flex-col gap-3">
              {[
                { href: '/about', label: 'About' },
                { href: '/founder', label: 'Founder' },
                { href: '/partners', label: 'Partners' },
                { href: '/contact', label: 'Contact' },
              ].map(l => (
                <Link key={l.href} to={l.href} className="text-sm text-gray-500 hover:text-black transition-colors">{l.label}</Link>
              ))}
            </nav>
          </div>

          {/* Work */}
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-4">Work</p>
            <nav className="flex flex-col gap-3">
              {[
                { href: '/products', label: 'Products' },
                { href: '/projects', label: 'Projects' },
              ].map(l => (
                <Link key={l.href} to={l.href} className="text-sm text-gray-500 hover:text-black transition-colors">{l.label}</Link>
              ))}
              <li className="list-none">
                <Link to="/contact" className="text-sm text-gray-500 hover:text-black transition-colors duration-200 inline-flex items-center gap-2">
                  Cephalo App
                  <span className="text-[10px] font-medium tracking-widest uppercase text-gray-300 border border-gray-200 px-1.5 py-0.5 leading-none">
                    Soon
                  </span>
                </Link>
              </li>
            </nav>
          </div>

          {/* Newsletter */}
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-4">Stay in the loop</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-xs text-gray-300">© {new Date().getFullYear()} Cephalo Labs. All rights reserved.</p>
          <p className="text-xs text-gray-300">pantheongrowth@gmail.com</p>
        </div>
      </div>
    </footer>
  )
}
