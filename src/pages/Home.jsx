import { useRef, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, ArrowDown, ExternalLink } from 'lucide-react'
import PageWrapper from '../components/ui/PageWrapper'
import NeuralScene from '../components/3d/NeuralScene'

const pillars = [
  {
    number: '01',
    title: 'Build AI',
    description: 'We design and build proprietary AI products from the ground up — applications, orchestration systems, and intelligent infrastructure.',
  },
  {
    number: '02',
    title: 'Deploy AI',
    description: 'We integrate AI into existing businesses. From strategy to implementation, we transform operations with precision-engineered AI systems.',
  },
  {
    number: '03',
    title: 'Ship Products',
    description: 'Our internal builds become SaaS products. Every system we create for ourselves becomes a tool available to the world.',
  },
]

const featuredProjects = [
  {
    name: 'Polypus',
    type: 'Product — In Development',
    description: 'AI orchestration desktop app. Claude Code with intelligence layers — model routing, memory, agents.',
    slug: 'polypus',
  },
  {
    name: 'TITAN AI',
    type: 'Project — Active',
    description: 'Seven-app Electron ecosystem. A distributed AI operating system built for maximum throughput and autonomy.',
    slug: 'titan-ai',
  },
  {
    name: 'AXIOM',
    type: 'Project — Active',
    description: 'Multi-model AI orchestrator. Any input, any model, any output — with hot/warm/cold memory and autonomous agents.',
    slug: 'axiom',
  },
]

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function AnimatedHeadline({ words, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <h1 ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </h1>
  )
}

export default function Home() {
  return (
    <PageWrapper>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0 opacity-[0.35]">
          <Suspense fallback={null}>
            <NeuralScene />
          </Suspense>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/0 via-white/20 to-white pointer-events-none" />

        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 py-32">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 border border-gray-200 px-4 py-2 mb-10"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-black inline-block" />
              <span className="text-xs font-medium tracking-widest uppercase text-gray-600">
                AI Developer Agency — Coimbra, Portugal
              </span>
            </motion.div>

            {/* Headline */}
            <AnimatedHeadline
              words={['We', 'build', 'intelligent', 'systems.']}
              className="font-sans font-semibold text-[clamp(3rem,8vw,7rem)] tracking-tight leading-[1.0] text-black mb-8"
            />

            {/* Sub */}
            <p className="text-lg text-gray-500 max-w-xl leading-relaxed mb-12 font-light">
              Cephalo Labs is an AI developer agency building proprietary AI products,
              deploying intelligent infrastructure, and operating at the frontier of
              what AI can do.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-black text-white text-sm font-medium tracking-wider uppercase hover:bg-gray-800 transition-colors duration-200"
              >
                See our work
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-gray-200 text-black text-sm font-medium tracking-wider uppercase hover:border-black transition-colors duration-200"
              >
                Work with us
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs font-medium tracking-widest uppercase text-gray-400">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={14} className="text-gray-400" />
          </motion.div>
        </motion.div>

        {/* Bottom line */}
        <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-gray-100" />
      </section>

      {/* THREE PILLARS */}
      <section className="py-32 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-16">What we do</p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-200">
            {pillars.map((p, i) => (
              <FadeIn key={p.number} delay={i * 0.1}>
                <div className={`p-10 ${i < 2 ? 'md:border-r border-gray-200' : ''} border-b md:border-b-0 border-gray-200`}>
                  <span className="text-xs font-mono text-gray-300 mb-6 block">{p.number}</span>
                  <h3 className="text-2xl font-medium text-black mb-4">{p.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{p.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="py-32 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-16">
            <FadeIn>
              <p className="text-xs font-medium tracking-widest uppercase text-gray-400">Featured work</p>
            </FadeIn>
            <FadeIn>
              <Link to="/projects" className="text-xs font-medium tracking-wider uppercase text-gray-400 hover:text-black transition-colors flex items-center gap-1">
                All projects <ArrowRight size={12} />
              </Link>
            </FadeIn>
          </div>

          <div className="space-y-0">
            {featuredProjects.map((p, i) => (
              <FadeIn key={p.name} delay={i * 0.08}>
                <Link
                  to={`/projects/${p.slug}`}
                  className="group flex flex-col md:flex-row md:items-center justify-between py-10 border-b border-gray-100 hover:border-gray-300 transition-colors duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
                    <span className="text-xs font-mono text-gray-300 w-6">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className="text-xl font-medium text-black group-hover:text-gray-600 transition-colors mb-1">{p.name}</h3>
                      <p className="text-xs text-gray-400 tracking-wider uppercase">{p.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8 mt-4 md:mt-0">
                    <p className="text-sm text-gray-500 max-w-sm hidden lg:block">{p.description}</p>
                    <ArrowRight size={16} className="text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" />
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT SPOTLIGHT — POLYPUS */}
      <section className="py-32 border-b border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <FadeIn>
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-6">Flagship product</p>
                <h2 className="font-sans font-semibold text-5xl text-black mb-6 leading-tight tracking-tight">Polypus</h2>
                <p className="text-gray-500 leading-relaxed mb-8">
                  The AI orchestration layer your workflow has been missing.
                  Model routing, persistent memory, autonomous agents —
                  all wrapped in a VS Code-inspired interface built for builders.
                </p>
                <p className="text-xs text-gray-400 tracking-wider uppercase mb-8">Status: In Development</p>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 text-sm font-medium tracking-wider uppercase border-b border-black pb-0.5 hover:text-gray-500 hover:border-gray-500 transition-colors"
                >
                  Learn more <ArrowRight size={12} />
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="aspect-square bg-white border border-gray-200 flex items-center justify-center">
                <img
                  src="/logos/polypus-mark.png"
                  alt="Polypus"
                  className="w-32 h-32 object-contain"
                  onError={e => {
                    e.target.parentElement.innerHTML = '<div class="text-6xl font-sans font-semibold text-gray-100">P</div>'
                  }}
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <FadeIn>
            <h2 className="font-sans font-semibold text-[clamp(2.5rem,5vw,4.5rem)] text-black mb-6 leading-tight tracking-tight">
              Ready to build<br />with intelligence?
            </h2>
            <p className="text-gray-500 mb-10 max-w-lg mx-auto">
              Whether you need AI products built from scratch or intelligent systems deployed into your business — we do both.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white text-sm font-medium tracking-wider uppercase hover:bg-gray-800 transition-colors"
            >
              Start a conversation <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </PageWrapper>
  )
}
