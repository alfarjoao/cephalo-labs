import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
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

export const projects = [
  {
    slug: 'titan-ai',
    name: 'TITAN AI',
    type: 'AI Ecosystem',
    year: '2024',
    status: 'Active',
    description: 'A seven-app Electron ecosystem communicating through a central command hub on port 3099. A distributed AI operating system for maximum throughput and autonomous execution.',
    stack: ['Electron', 'React', 'TypeScript', 'Express', 'SQLite', 'Ollama'],
    highlights: [
      '7 interconnected Electron applications',
      'Central TITAN COMMAND orchestration hub',
      'Local AI model integration via Ollama',
      'Cross-app SSE context bus',
    ],
  },
  {
    slug: 'axiom',
    name: 'AXIOM',
    type: 'AI Orchestrator',
    year: '2024',
    status: 'Active',
    description: 'Multi-model AI orchestration system. Any input enters, the right model handles it, any output emerges. Hot/warm/cold memory architecture, autonomous agent spawning, and intelligent model routing.',
    stack: ['Electron', 'React', 'TypeScript', 'SQLite', 'Anthropic API', 'Ollama'],
    highlights: [
      'Adaptive model routing — Haiku/Sonnet/Opus',
      'Hot/warm/cold memory across sessions',
      'Autonomous agent creation and destruction',
      'External autonomy — skill discovery and install',
    ],
  },
  {
    slug: 'sovereign',
    name: 'SOVEREIGN',
    type: 'AI Desktop App',
    year: '2024',
    status: 'Active',
    description: 'A local-first AI desktop application. Maximum privacy, maximum intelligence. Built for those who need AI power without cloud dependency.',
    stack: ['Electron', 'React', 'TypeScript', 'Ollama', 'Claude API', 'Vault RAG'],
    highlights: [
      'Pure local AI execution',
      'Obsidian vault integration',
      'Security queue with 3 approval modes',
      'Ruflo swarm orchestration',
    ],
  },
  {
    slug: 'polypus',
    name: 'Polypus',
    type: 'AI Productivity',
    year: '2025',
    status: 'In Development',
    description: 'The AI orchestration layer for builders. A VS Code-inspired desktop app wrapping Claude Code CLI with a full intelligence layer — model routing, persistent memory, agent spawning, and creative output capabilities.',
    stack: ['Electron', 'React', 'TypeScript', 'Claude API', 'Remotion', 'Playwright'],
    highlights: [
      'Claude Code CLI with intelligence overlay',
      'Adaptive model routing per task',
      'Pre-processor with profile injection',
      'Skill registry with auto-install',
    ],
  },
  {
    slug: 'pantheon-crm',
    name: 'Pantheon Growth CRM',
    type: 'SaaS Platform',
    year: '2024',
    status: 'Live',
    description: 'A full-stack CRM and operations platform built for Pantheon Growth. Pipeline management, client portal, Instagram DM hub, Apollo.io integration, and AI-powered automation.',
    stack: ['React', 'TypeScript', 'Supabase', 'Zustand', 'Tailwind', 'Vite'],
    highlights: [
      '25+ Supabase tables with full relational architecture',
      'Instagram DM Hub integration',
      'Apollo.io contact and deal sync',
      'AI-powered pipeline automation',
    ],
  },
  {
    slug: 'pantheon-os',
    name: 'Pantheon Growth OS',
    type: 'Operations Platform',
    year: '2024',
    status: 'Live',
    description: 'The operating system of Pantheon Growth agency. Calendar, tasks, client management, sales hub, and AI-assisted workflows — all in one unified platform.',
    stack: ['React', 'TypeScript', 'Supabase', 'Zustand', 'Tailwind'],
    highlights: [
      'Unified agency operations dashboard',
      'AI-assisted sales and outreach workflows',
      'Client onboarding and portal system',
      'Revenue tracking and forecasting',
    ],
  },
]

export default function Projects() {
  return (
    <PageWrapper>
      <section className="py-32 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-8">Projects</p>
            <h1 className="font-serif text-[clamp(3rem,6vw,5rem)] leading-[0.95] text-black max-w-2xl mb-8">
              Systems we've<br />
              <em className="not-italic text-gray-300">engineered.</em>
            </h1>
            <p className="text-lg text-gray-500 max-w-xl leading-relaxed font-light">
              Every project starts with a real problem. Every solution becomes a system. Every system raises the bar.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {projects.map((p, i) => (
            <FadeIn key={p.slug} delay={i * 0.06}>
              <Link
                to={`/projects/${p.slug}`}
                className="group grid grid-cols-1 md:grid-cols-12 gap-6 py-12 border-b border-gray-100 hover:border-gray-300 transition-colors duration-300"
              >
                <div className="md:col-span-1 flex items-start">
                  <span className="text-xs font-mono text-gray-300 pt-1">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="md:col-span-3">
                  <h3 className="text-xl font-medium text-black group-hover:text-gray-600 transition-colors mb-1">{p.name}</h3>
                  <p className="text-xs text-gray-400 tracking-wider uppercase">{p.type}</p>
                </div>
                <div className="md:col-span-5">
                  <p className="text-sm text-gray-500 leading-relaxed">{p.description}</p>
                </div>
                <div className="md:col-span-2 flex flex-col gap-2">
                  <span className={`text-xs font-medium tracking-wider uppercase px-2.5 py-1 self-start border ${
                    p.status === 'Live' ? 'border-black text-black' :
                    p.status === 'Active' ? 'border-gray-400 text-gray-400' :
                    'border-gray-200 text-gray-300'
                  }`}>
                    {p.status}
                  </span>
                  <p className="text-xs text-gray-300">{p.year}</p>
                </div>
                <div className="md:col-span-1 flex items-start justify-end">
                  <ArrowRight size={16} className="text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all duration-200 mt-1" />
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>
    </PageWrapper>
  )
}
