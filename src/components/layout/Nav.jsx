import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/about',           label: 'About' },
  { href: '/products/polypus', label: 'Polypus' },
  { href: '/products/kernel',  label: 'Kernel' },
  { href: '/partners',         label: 'Partners' },
  { href: '/founder',          label: 'Founder' },
  { href: '/contact',          label: 'Contact' },
]

// Routes whose hero section is light (paper). Nav inverts to dark text at top.
const LIGHT_HERO_ROUTES = ['/partners']

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const invertTop = LIGHT_HERO_ROUTES.includes(location.pathname) && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-[background,border-color,backdrop-filter] duration-500 ${
          scrolled
            ? 'bg-ink-950/80 backdrop-blur-md border-b border-white/5'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/logos/cephalo-mark.png"
              alt="Cephalo"
              className={`w-7 h-7 object-contain opacity-80 group-hover:opacity-100 transition-opacity ${
                invertTop ? 'brightness-0' : 'brightness-0 invert'
              }`}
              onError={e => { e.currentTarget.style.display = 'none' }}
            />
            <span className={`text-[11px] font-medium tracking-[0.24em] uppercase transition-colors ${
              invertTop ? 'text-ink-950/75 group-hover:text-ink-950' : 'text-white/70 group-hover:text-white'
            }`}>
              CEPHALO Labs
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {links.map(l => {
              const active = location.pathname === l.href
              return (
                <Link
                  key={l.href}
                  to={l.href}
                  className={`text-[11px] font-medium tracking-[0.18em] uppercase transition-colors duration-200 ${
                    invertTop
                      ? (active ? 'text-ink-950' : 'text-ink-950/40 hover:text-ink-950/80')
                      : (active ? 'text-white' : 'text-white/35 hover:text-white/80')
                  }`}
                >
                  {l.label}
                </Link>
              )
            })}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center">
            <Link
              to="/contact"
              className={`text-[11px] font-medium tracking-[0.18em] uppercase px-5 py-2.5 border transition-colors ${
                invertTop
                  ? 'border-ink-950/20 text-ink-950/75 hover:border-ink-950 hover:text-ink-950'
                  : 'border-white/15 text-white/70 hover:border-white/50 hover:text-white'
              }`}
            >
              Build with us
            </Link>
          </div>

          {/* Mobile button */}
          <button
            onClick={() => setOpen(!open)}
            className={`md:hidden p-2 transition-colors ${
              invertTop ? 'text-ink-950/60 hover:text-ink-950' : 'text-white/60 hover:text-white'
            }`}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-40 bg-ink-950/98 backdrop-blur-sm pt-16 px-6 flex flex-col gap-8 md:hidden"
          >
            <nav className="flex flex-col gap-6 pt-10">
              {links.map(l => {
                const active = location.pathname === l.href
                return (
                  <Link
                    key={l.href}
                    to={l.href}
                    className={`text-2xl font-medium ${active ? 'text-white' : 'text-white/60'} tracking-tight`}
                  >
                    {l.label}
                  </Link>
                )
              })}
            </nav>
            <Link
              to="/contact"
              className="text-xs font-medium tracking-[0.2em] uppercase px-6 py-3 border border-white/20 text-white text-center mt-6"
            >
              Build with us
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
