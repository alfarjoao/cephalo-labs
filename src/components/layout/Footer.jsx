import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
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
          </div>

          {/* Links */}
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

          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-4">Work</p>
            <nav className="flex flex-col gap-3">
              {[
                { href: '/products', label: 'Products' },
                { href: '/projects', label: 'Projects' },
              ].map(l => (
                <Link key={l.href} to={l.href} className="text-sm text-gray-500 hover:text-black transition-colors">{l.label}</Link>
              ))}
            </nav>
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
