import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Linkedin, Github } from 'lucide-react'
import { useMeta } from '../components/ui/useMeta'
import PageWrapper from '../components/ui/PageWrapper'
import AnimatedBackground from '../components/ui/AnimatedBackground'

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

export default function Founder() {
  useMeta('Founder — Cephalo Labs', 'João Alfar — CEO & Founder of Cephalo Labs and Pantheon Growth. Builder of AI systems and products.')
  return (
    <PageWrapper>
      {/* Header */}
      <section className="relative overflow-hidden py-32 border-b border-gray-100">
        <AnimatedBackground opacity={0.06} />
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-8">Founder</p>
            <h1 className="font-sans font-semibold tracking-tight text-[clamp(3rem,6vw,5rem)] leading-[0.95] text-black max-w-2xl">
              João Alfar
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Photo */}
          <FadeIn>
            <div className="aspect-[4/5] bg-gray-50 border border-gray-200 overflow-hidden">
              <img
                src="/images/owner.png"
                alt="João Alfar"
                className="w-full h-full object-cover"
                onError={e => {
                  e.target.parentElement.innerHTML = `
                    <div class="w-full h-full flex items-center justify-center">
                      <div class="text-center">
                        <p class="font-sans font-semibold text-8xl text-gray-100">JA</p>
                        <p class="text-xs text-gray-300 tracking-wider uppercase mt-4">João Alfar</p>
                      </div>
                    </div>
                  `
                }}
              />
            </div>
          </FadeIn>

          {/* Bio */}
          <FadeIn delay={0.1}>
            <div className="pt-4">
              <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-3">CEO & Founder</p>
              <p className="text-xs text-gray-300 tracking-wider uppercase mb-10">Coimbra, Portugal</p>

              <div className="space-y-5 text-gray-600 leading-relaxed mb-12">
                <FadeIn delay={0 * 0.12}>
                  <p>
                    João Alfar is the founder and CEO of Cephalo Labs, the AI developer agency he built
                    from the ground up in Portugal. Before Cephalo, he co-founded Pantheon Growth —
                    a revenue architecture and digital marketing agency — where he discovered what
                    happens when AI meets real business problems.
                  </p>
                </FadeIn>
                <FadeIn delay={1 * 0.12}>
                  <p>
                    He builds things. Not presentations about building things — actual systems.
                    TITAN AI, AXIOM, SOVEREIGN, Polypus — every product at Cephalo Labs
                    was conceived and executed by João, working at the frontier of what AI
                    tooling can do for builders.
                  </p>
                </FadeIn>
                <FadeIn delay={2 * 0.12}>
                  <p>
                    His approach to AI is different. Where others see assistants, he sees infrastructure.
                    Where others use AI to write emails, he builds AI operating systems.
                    The work at Cephalo Labs reflects that ambition — every project is a bet on
                    what becomes possible when AI is treated as a first-class technical discipline.
                  </p>
                </FadeIn>
                <FadeIn delay={3 * 0.12}>
                  <p>
                    He works with Claude as a technical co-founder, treating AI collaboration not as
                    a shortcut but as a new kind of engineering partnership.
                  </p>
                </FadeIn>
              </div>

              {/* Role at companies */}
              <div className="grid grid-cols-2 gap-0 border border-gray-200 mb-10">
                <div className="p-5 border-r border-gray-200">
                  <p className="text-xs text-gray-400 tracking-wider uppercase mb-1">Cephalo Labs</p>
                  <p className="text-sm font-medium text-black">CEO & Founder</p>
                </div>
                <div className="p-5">
                  <p className="text-xs text-gray-400 tracking-wider uppercase mb-1">Pantheon Growth</p>
                  <p className="text-sm font-medium text-black">CEO & Co-founder</p>
                </div>
              </div>

              {/* Links */}
              <div className="flex items-center gap-4">
                <a href="#" className="inline-flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-gray-500 hover:text-black transition-colors border border-gray-200 px-4 py-2.5 hover:border-black">
                  <Linkedin size={13} /> LinkedIn
                </a>
                <a href="#" className="inline-flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-gray-500 hover:text-black transition-colors border border-gray-200 px-4 py-2.5 hover:border-black">
                  <Github size={13} /> GitHub
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Vision */}
      <section className="py-24 border-b border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 max-w-3xl">
          <FadeIn>
            <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-8">In his own words</p>
            <blockquote className="font-sans font-light text-2xl text-black leading-relaxed mb-6">
              "I do not build AI tools because they are trendy. I build them because
              every time I finish one, I cannot imagine working without it.
              That is the bar. If I would not use it myself, we do not ship it."
            </blockquote>
            <p className="text-sm text-gray-400">— João Alfar, CEO Cephalo Labs</p>
          </FadeIn>
        </div>
      </section>

      {/* Simão */}
      <section className="py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-12">Co-founder</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex items-center gap-8 p-8 border border-gray-200">
              <div className="w-16 h-16 bg-gray-100 flex items-center justify-center flex-shrink-0">
                <span className="font-sans font-light text-2xl text-gray-300">S</span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-black mb-1">Simão</h3>
                <p className="text-xs text-gray-400 tracking-wider uppercase mb-3">COO & Co-founder — Pantheon Growth</p>
                <p className="text-sm text-gray-500">Operations lead and co-founder of Pantheon Growth. Keeps the business running while João builds the future.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <FadeIn>
            <div>
              <h2 className="text-xl font-medium text-black mb-1">Work with us</h2>
              <p className="text-sm text-gray-500">Build something that matters.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-xs font-medium tracking-wider uppercase hover:bg-gray-800 transition-colors">
              Get in touch <ArrowRight size={12} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </PageWrapper>
  )
}
