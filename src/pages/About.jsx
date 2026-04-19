import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useMeta } from '../components/ui/useMeta'
import PageWrapper from '../components/ui/PageWrapper'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import CountUp from '../components/ui/CountUp'

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function About() {
  useMeta('About — Cephalo Labs', 'Cephalo Labs is an AI company built differently. We build intelligent systems, not demos.')
  return (
    <PageWrapper>
      {/* Header */}
      <section className="relative overflow-hidden py-32 border-b border-gray-100">
        <AnimatedBackground opacity={0.06} />
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-8">About</p>
            <h1 className="font-sans font-semibold tracking-tight text-[clamp(3rem,6vw,5.5rem)] leading-[0.95] text-black max-w-3xl mb-10">
              An AI company<br />
              <em className="not-italic text-gray-300">built different.</em>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl leading-relaxed font-light">
              Cephalo Labs sits at the intersection of what Anthropic builds and what a digital agency delivers —
              a full-spectrum AI developer agency that both creates intelligent systems and deploys them at scale.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20">
          <FadeIn>
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-6">Mission</p>
              <h2 className="text-3xl font-medium text-black mb-6 leading-snug">
                Make AI genuinely useful,<br />not just impressive.
              </h2>
              <p className="text-gray-500 leading-relaxed">
                We are tired of AI that demos well but breaks in production.
                Every system we build is held to one standard: does it actually work?
                Does it make someone faster, smarter, more capable?
                If not, we rebuild until it does.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-6">Vision</p>
              <h2 className="text-3xl font-medium text-black mb-6 leading-snug">
                Every business running<br />on intelligent infrastructure.
              </h2>
              <p className="text-gray-500 leading-relaxed">
                The companies that will define the next decade are not the ones with the most data —
                they are the ones with the best AI systems.
                Cephalo Labs builds those systems, for ourselves and for others.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* What makes us different */}
      <section className="py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-16">What makes us different</p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {[
              {
                title: 'We build for ourselves first',
                body: 'Every tool we sell, we use. TITAN AI, AXIOM, Polypus — all built because we needed them. This means we understand the problem before we touch the code.',
              },
              {
                title: 'We are builders, not consultants',
                body: 'We do not advise. We build. Every engagement ends with working software running in production, not a slide deck with recommendations.',
              },
              {
                title: 'Research meets execution',
                body: 'Like Anthropic we think deeply about AI architecture. Like an agency we move fast and ship. The combination is rare and it is our edge.',
              },
              {
                title: 'AI-native from day one',
                body: 'We were not a traditional agency that added an AI practice. We were built from the ground up for the AI era — every process, every tool, every team member.',
              },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <div className="border-t border-gray-200 pt-8">
                  <h3 className="text-lg font-medium text-black mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 border-b border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-gray-200 bg-white">
            {[
              { value: '6+', label: 'AI Systems Built', countTo: 6, suffix: '+' },
              { value: '2', label: 'Years Building', countTo: 2, suffix: '' },
              { value: '1', label: 'Flagship Product', countTo: 1, suffix: '' },
              { value: '∞', label: 'Systems Possible', countTo: null, suffix: '' },
            ].map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.08}>
                <div className={`p-10 text-center ${i < 3 ? 'border-r border-gray-200' : ''}`}>
                  <p className="font-sans font-semibold text-5xl text-black mb-2">
                    {s.countTo !== null
                      ? <CountUp to={s.countTo} suffix={s.suffix} />
                      : s.value}
                  </p>
                  <p className="text-xs text-gray-400 tracking-wider uppercase">{s.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <FadeIn>
            <div>
              <h2 className="text-2xl font-medium text-black mb-2">See what we've built</h2>
              <p className="text-gray-500 text-sm">Explore our projects and products.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex gap-4">
              <Link to="/projects" className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-xs font-medium tracking-wider uppercase hover:bg-gray-800 transition-colors">
                Projects <ArrowRight size={12} />
              </Link>
              <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 text-black text-xs font-medium tracking-wider uppercase hover:border-black transition-colors">
                Products
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageWrapper>
  )
}
