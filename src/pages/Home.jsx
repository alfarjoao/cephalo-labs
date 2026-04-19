import { useRef, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowDown, ExternalLink } from 'lucide-react'
import { useMeta } from '../components/ui/useMeta'
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
    description: 'The AI orchestration layer. Like Claude Code, but multi-model — and the engine inside Cephalo App.',
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

function EcosystemSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const nodes = [
    {
      id: 'labs',
      label: 'Cephalo Labs',
      sub: 'The company',
      center: true,
    },
    {
      id: 'polypus',
      label: 'Polypus',
      sub: 'AI coding orchestrator',
      note: 'Like Claude Code, but multi-model',
      href: '/products',
    },
    {
      id: 'app',
      label: 'Cephalo App',
      sub: 'The AI workspace',
      note: 'Chat, code, create — coming soon',
      href: '/contact',
    },
    {
      id: 'pantheon',
      label: 'Pantheon Growth',
      sub: 'Agency partner',
      note: 'Strategy & growth execution',
      href: '/partners',
    },
  ]

  return (
    <section className="py-32 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeIn>
          <span className="text-xs font-medium tracking-widest uppercase text-gray-400 block mb-3">
            The Ecosystem
          </span>
          <h2 className="font-sans font-semibold text-[clamp(2rem,4vw,3.5rem)] tracking-tight mb-4">
            Everything connects.
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mb-20">
            One lab. Multiple products. One agency partner. All built to reinforce each other.
          </p>
        </FadeIn>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200">
          {nodes.map((node, i) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className={`bg-white p-10 flex flex-col gap-3${node.center ? ' bg-gray-50' : ''}`}
            >
              {node.center && (
                <span className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-1">
                  Core
                </span>
              )}
              <h3 className="font-sans font-semibold text-xl tracking-tight text-black">
                {node.label}
              </h3>
              <p className="text-xs font-medium tracking-widest uppercase text-gray-400">
                {node.sub}
              </p>
              {node.note && (
                <p className="text-sm text-gray-500 mt-1">{node.note}</p>
              )}
              {node.href && (
                <Link
                  to={node.href}
                  className="text-xs font-medium tracking-widest uppercase text-black border-b border-gray-200 pb-0.5 self-start mt-auto hover:border-black transition-colors duration-200"
                >
                  Learn more →
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CephaloAppTeaser() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-32 bg-[#0A0A0A] text-white relative overflow-hidden">
      {/* Purple blob */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)' }}
      />
      {/* Emerald blob */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)' }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 border border-white/10 px-4 py-2 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] inline-block" />
              <span className="text-xs font-medium tracking-widest uppercase text-white/50">
                In development
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-sans font-semibold text-[clamp(2rem,4vw,3.5rem)] tracking-tight text-white mb-6 leading-tight"
            >
              One app. Every AI model. Unlimited capability.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/50 text-lg max-w-lg mb-10 leading-relaxed"
            >
              Cephalo is the AI workspace built for people who build.
              Chat with any model. Orchestrate agents. Ship with Polypus.
              Everything in one place.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-sm font-medium tracking-widest uppercase hover:bg-white/90 transition-colors duration-200"
              >
                Join the waitlist
              </Link>
            </motion.div>
          </div>

          {/* Right: Polypus mascot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-center justify-center"
          >
            <div className="relative">
              <img
                src="/logos/polypus-mark.png"
                alt="Polypus"
                className="w-40 h-40 object-contain opacity-60"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
              <div
                className="absolute inset-0 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)' }}
                aria-hidden="true"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function VSLSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const s1Op = useTransform(scrollYProgress, [0.02, 0.12, 0.24], [0, 1, 0])
  const s1Y  = useTransform(scrollYProgress, [0.02, 0.12], [24, 0])
  const s2Op = useTransform(scrollYProgress, [0.20, 0.30, 0.42], [0, 1, 0])
  const s2Y  = useTransform(scrollYProgress, [0.20, 0.30], [24, 0])
  const s3Op = useTransform(scrollYProgress, [0.38, 0.48, 0.60], [0, 1, 0])
  const s3Y  = useTransform(scrollYProgress, [0.38, 0.48], [24, 0])
  const s4Op = useTransform(scrollYProgress, [0.58, 0.68, 1.0], [0, 1, 1])
  const s4Y  = useTransform(scrollYProgress, [0.58, 0.68], [24, 0])

  const models = ['Haiku', 'Sonnet', 'Opus']

  return (
    <section
      ref={containerRef}
      className="relative bg-black"
      style={{ height: '300vh' }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 w-full relative" style={{ height: '100%' }}>

          {/* Step 1 */}
          <motion.div
            style={{ opacity: s1Op, y: s1Y }}
            className="absolute inset-x-6 top-1/2 -translate-y-1/2 text-center pointer-events-none"
          >
            <p className="font-sans font-light text-white text-[clamp(1.8rem,4vw,3.2rem)] tracking-tight leading-tight">
              You have a task.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            style={{ opacity: s2Op, y: s2Y }}
            className="absolute inset-x-6 top-1/2 -translate-y-1/2 text-center pointer-events-none"
          >
            <p className="font-sans font-light text-white text-[clamp(1.8rem,4vw,3.2rem)] tracking-tight leading-tight">
              Polypus routes it to the right model.
            </p>
            <div className="flex items-center justify-center gap-4 mt-10">
              {models.map((m) => (
                <div key={m} className="border border-white/10 px-6 py-3">
                  <span className="text-xs font-medium tracking-widest uppercase text-white/60">{m}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            style={{ opacity: s3Op, y: s3Y }}
            className="absolute inset-x-6 top-1/2 -translate-y-1/2 text-center pointer-events-none"
          >
            <p className="font-sans font-light text-white text-[clamp(1.8rem,4vw,3.2rem)] tracking-tight leading-tight">
              Agents execute in parallel.
            </p>
          </motion.div>

          {/* Step 4 */}
          <motion.div
            style={{ opacity: s4Op, y: s4Y }}
            className="absolute inset-x-6 top-1/2 -translate-y-1/2 text-center pointer-events-none"
          >
            <p className="font-sans font-semibold text-white text-[clamp(2rem,5vw,4rem)] tracking-tight leading-tight mb-4">
              Done.
            </p>
            <p className="text-white/40 text-base font-light tracking-wider">
              Faster. Smarter. One orchestrator.
            </p>
          </motion.div>
        </div>

        {/* fade edges */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </div>
    </section>
  )
}

export default function Home() {
  useMeta('Cephalo Labs — AI Developer Agency', 'We build AI products, deploy AI infrastructure, and operate as a full-spectrum AI developer agency based in Coimbra, Portugal.')
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

      <EcosystemSection />

      <CephaloAppTeaser />

      <VSLSection />

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
