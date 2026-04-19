import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'
import PageWrapper from '../components/ui/PageWrapper'

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

export default function Products() {
  return (
    <PageWrapper>
      <section className="py-32 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-8">Products</p>
            <h1 className="font-sans font-semibold tracking-tight text-[clamp(3rem,6vw,5rem)] leading-[0.95] text-black max-w-2xl mb-8">
              Built by us.<br />Available for you.
            </h1>
            <p className="text-lg text-gray-500 max-w-xl leading-relaxed font-light">
              Our products start as internal tools. When they become powerful enough to change how others work, we ship them.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Polypus — featured */}
      <section className="py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <img src="/logos/polypus-mark.png" alt="Polypus" className="w-10 h-10 object-contain"
                    onError={e => e.target.style.display='none'} />
                  <div>
                    <h2 className="text-2xl font-medium text-black">Polypus</h2>
                    <p className="text-xs text-gray-400 tracking-wider uppercase mt-0.5">by Cephalo Labs</p>
                  </div>
                  <span className="ml-auto text-xs font-medium tracking-wider uppercase px-3 py-1 border border-gray-200 text-gray-400">
                    In Development
                  </span>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">
                  The AI orchestration desktop app. A VS Code-inspired interface wrapping Claude Code CLI
                  with an intelligence layer that makes every session smarter than the last.
                </p>

                <div className="space-y-3 mb-8">
                  {[
                    'Adaptive model routing — Haiku, Sonnet, Opus based on task complexity',
                    'Hot/warm/cold memory — sessions that remember everything',
                    'Agent spawner — autonomous parallel execution',
                    'Skill registry — auto-install missing capabilities',
                    'Pre-processor — every prompt optimised before execution',
                  ].map(f => (
                    <div key={f} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-black mt-2 flex-shrink-0" />
                      <p className="text-sm text-gray-500">{f}</p>
                    </div>
                  ))}
                </div>

                <Link to="/projects/polypus" className="inline-flex items-center gap-2 text-sm font-medium tracking-wider uppercase border-b border-black pb-0.5 hover:text-gray-500 hover:border-gray-500 transition-colors">
                  Learn more <ArrowRight size={12} />
                </Link>
              </div>

              <div className="aspect-video bg-gray-50 border border-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <img src="/logos/polypus-mark.png" alt="Polypus" className="w-20 h-20 object-contain mx-auto mb-4"
                    onError={e => e.target.style.display='none'} />
                  <p className="text-xs text-gray-300 tracking-wider uppercase">Preview coming soon</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Coming soon */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-12">More products coming</p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-200">
            {[
              { name: 'AXIOM', desc: 'Multi-model AI orchestration. Any input, any model, any output.', status: 'In development' },
              { name: 'SOVEREIGN', desc: 'Local-first AI desktop. Maximum privacy, maximum intelligence.', status: 'In development' },
              { name: '???', desc: 'Something new. We are always building.', status: 'Research phase' },
            ].map((p, i) => (
              <FadeIn key={p.name} delay={i * 0.08}>
                <div className={`p-8 ${i < 2 ? 'md:border-r border-gray-200' : ''} border-b md:border-b-0 border-gray-200`}>
                  <h3 className="text-lg font-medium text-black mb-2">{p.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{p.desc}</p>
                  <p className="text-xs text-gray-300 tracking-wider uppercase">{p.status}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
