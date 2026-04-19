import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/projects', label: 'Projects' },
  { href: '/partners', label: 'Partners' },
  { href: '/founder', label: 'Founder' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-sm border-b border-gray-200' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/logos/cephalo-mark.png" alt="Cephalo" className="w-7 h-7 object-contain" onError={(e) => {
              e.target.style.display = 'none'
            }} />
            <span className="text-sm font-medium tracking-widest text-black uppercase">Cephalo Labs</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <Link
                key={l.href}
                to={l.href}
                className={`text-xs font-medium tracking-wider uppercase transition-colors duration-200 ${
                  location.pathname === l.href
                    ? 'text-black'
                    : 'text-gray-400 hover:text-black'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/contact"
              className="text-xs font-medium tracking-wider uppercase px-5 py-2.5 border border-black text-black hover:bg-black hover:text-white transition-all duration-200"
            >
              Build with us
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-black"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white pt-16 px-6 flex flex-col gap-8 md:hidden"
          >
            <nav className="flex flex-col gap-6 pt-8">
              {links.map(l => (
                <Link
                  key={l.href}
                  to={l.href}
                  className="text-2xl font-medium text-black"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <Link
              to="/contact"
              className="text-sm font-medium tracking-wider uppercase px-6 py-3 border border-black text-black text-center"
            >
              Build with us
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
