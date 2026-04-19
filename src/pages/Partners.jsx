import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink } from 'lucide-react'
import PageWrapper from '../components/ui/PageWrapper'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import CountUp from '../components/ui/CountUp'

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

const results = [
  { to: 2, suffix: 'x', label: 'Revenue growth after AI OS implementation' },
  { to: 80, suffix: '%', label: 'Reduction in manual CRM operations' },
  { to: 3, suffix: '×', label: 'Faster client onboarding with AI-powered portal' },
  { to: 100, suffix: '%', label: 'Custom-built — zero off-the-shelf software' },
]

export default function Partners() {
  return (
    <PageWrapper>
      {/* Header */}
      <section className="relative overflow-hidden py-32 border-b border-gray-100">
        <AnimatedBackground opacity={0.06} />
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-8">Partners</p>
            <h1 className="font-sans font-semibold tracking-tight text-[clamp(3rem,6vw,5rem)] leading-[0.95] text-black max-w-2xl mb-8">
              Built together.<br />
              <em className="not-italic text-gray-300">Growing together.</em>
            </h1>
            <p className="text-lg text-gray-500 max-w-xl leading-relaxed font-light">
              Our partnerships are not transactional. We embed, we build, we grow alongside the businesses we work with.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pantheon Growth — main partner */}
      <section className="py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-16">Featured partner</p>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <FadeIn>
              <div>
                {/* Logo area */}
                <div className="mb-10 p-8 border border-gray-200 bg-gray-50 inline-block">
                  <img
                    src="/logos/pantheon-logo.png"
                    alt="Pantheon Growth"
                    className="h-10 object-contain"
                    onError={e => {
                      e.target.parentElement.innerHTML = '<p class="font-medium text-xl tracking-widest text-black">PANTHEON GROWTH</p>'
                    }}
                  />
                </div>

                <h2 className="text-3xl font-medium text-black mb-2">Pantheon Growth</h2>
                <p className="text-xs text-gray-400 tracking-wider uppercase mb-8">Revenue Architecture & Digital Marketing — Porto, Portugal</p>

                <div className="space-y-4 text-gray-600 leading-relaxed mb-10">
                  <p>
                    Pantheon Growth is a revenue architecture and digital marketing agency based in Porto, Portugal.
                    Founded by João Alfar and Simão, the agency works with e-commerce brands and businesses
                    to architect sustainable revenue growth through data-driven strategy, performance marketing,
                    and intelligent automation.
                  </p>
                  <p>
                    Cephalo Labs serves as Pantheon Growth's AI and technology arm — building the proprietary
                    infrastructure that powers their operations and gives them a measurable edge over
                    traditional agencies.
                  </p>
                </div>

                <a
                  href="https://pantheon-growth-agency.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-medium tracking-wider uppercase border-b border-black pb-0.5 hover:text-gray-500 hover:border-gray-500 transition-colors"
                >
                  Visit Pantheon Growth <ExternalLink size={11} />
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-8">What Cephalo built for Pantheon</p>

                <div className="space-y-0">
                  {[
                    {
                      name: 'Pantheon Growth CRM',
                      desc: 'A full-stack CRM with pipeline management, deal tracking, client portal, Instagram DM Hub, and Apollo.io integration. Built entirely from scratch — no off-the-shelf software.',
                    },
                    {
                      name: 'Pantheon Growth OS',
                      desc: 'The operating system of the agency. Calendar, tasks, client management, sales hub, and AI-assisted workflows — all in one unified platform that replaces 5+ external tools.',
                    },
                    {
                      name: 'AI Sales Automation',
                      desc: 'Intelligent outreach workflows, automated lead scoring, and AI-powered proposal generation integrated directly into the agency operations.',
                    },
                  ].map((item, i) => (
                    <FadeIn key={item.name} delay={i * 0.1}>
                      <div className="py-7 border-b border-gray-100">
                        <h3 className="text-base font-medium text-black mb-2">{item.name}</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-24 border-b border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-16">The results</p>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-gray-200 bg-white">
            {results.map((r, i) => (
              <FadeIn key={r.label} delay={i * 0.08}>
                <div className={`p-10 text-center ${i < 3 ? 'border-r border-gray-200' : ''}`}>
                  <p className="font-sans font-semibold text-5xl text-black mb-3"><CountUp to={r.to} suffix={r.suffix} /></p>
                  <p className="text-xs text-gray-400 leading-relaxed">{r.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <span className="text-xs font-medium tracking-widest uppercase text-gray-400 block mb-3">
              Process
            </span>
            <h2 className="font-sans font-semibold text-[clamp(1.8rem,3.5vw,3rem)] tracking-tight mb-16">
              How we work together.
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {[
              {
                step: '01',
                title: 'Strategy',
                body: 'We audit your AI readiness, map your processes, and define the highest-leverage points for intelligent automation.',
              },
              {
                step: '02',
                title: 'Build',
                body: 'Cephalo designs and ships the systems — from data pipelines to front-end interfaces — using our full-stack AI toolkit.',
              },
              {
                step: '03',
                title: 'Scale',
                body: 'We stay engaged. Systems improve over time, models are updated, and usage expands as your team grows into the tools.',
              },
            ].map((item, i) => (
              <FadeIn key={item.step} delay={i * 0.15}>
                <div className="border-t-2 border-gray-200 pt-8 pb-8 md:pr-12">
                  <span className="text-xs font-medium tracking-widest uppercase text-gray-300 block mb-6">
                    {item.step}
                  </span>
                  <h3 className="font-sans font-semibold text-2xl tracking-tight text-black mb-4">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Become a partner */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <FadeIn>
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-6">Work with Cephalo</p>
                <h2 className="text-3xl font-medium text-black mb-6 leading-snug">
                  Want AI infrastructure<br />built for your business?
                </h2>
                <p className="text-gray-500 leading-relaxed mb-8">
                  We partner with businesses that are serious about AI — not as a gimmick,
                  but as competitive infrastructure. If that is you, let's talk.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-xs font-medium tracking-wider uppercase hover:bg-gray-800 transition-colors"
                >
                  Start a conversation <ArrowRight size={12} />
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="space-y-4">
                {[
                  'Custom AI systems built from scratch',
                  'Existing workflow automation and integration',
                  'AI product development from zero to launch',
                  'Ongoing technical partnership and maintenance',
                ].map((item, i) => (
                  <div key={item} className="flex items-center gap-4 py-5 border-b border-gray-100">
                    <span className="text-xs font-mono text-gray-300">{String(i + 1).padStart(2, '0')}</span>
                    <p className="text-sm text-gray-600">{item}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
