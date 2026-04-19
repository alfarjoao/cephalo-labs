import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import PageWrapper from '../components/ui/PageWrapper'
import { projects } from './Projects'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find(p => p.slug === slug)

  if (!project) return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-32">
        <p className="text-gray-400">Project not found.</p>
        <Link to="/projects" className="text-black underline mt-4 block">Back to projects</Link>
      </div>
    </PageWrapper>
  )

  return (
    <PageWrapper>
      {/* Back */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-0">
        <Link to="/projects" className="inline-flex items-center gap-2 text-xs text-gray-400 tracking-wider uppercase hover:text-black transition-colors">
          <ArrowLeft size={12} /> All projects
        </Link>
      </div>

      {/* Header */}
      <section className="py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-start justify-between gap-8 flex-wrap mb-8">
              <div>
                <p className="text-xs text-gray-400 tracking-wider uppercase mb-3">{project.type} — {project.year}</p>
                <h1 className="font-sans font-semibold tracking-tight text-[clamp(2.5rem,5vw,4rem)] text-black">{project.name}</h1>
              </div>
              <span className={`text-xs font-medium tracking-wider uppercase px-4 py-2 border mt-6 ${
                project.status === 'Live' ? 'border-black text-black' :
                project.status === 'Active' ? 'border-gray-400 text-gray-400' :
                'border-gray-200 text-gray-300'
              }`}>
                {project.status}
              </span>
            </div>
            <p className="text-xl text-gray-500 max-w-2xl leading-relaxed font-light">{project.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-3 gap-20">
          <div className="lg:col-span-2">
            <h2 className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-8">Key highlights</h2>
            <div className="space-y-6">
              {project.highlights.map((h, i) => (
                <motion.div
                  key={h}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex items-start gap-4 py-6 border-b border-gray-100"
                >
                  <span className="text-xs font-mono text-gray-300 pt-0.5">{String(i + 1).padStart(2, '0')}</span>
                  <p className="text-gray-600">{h}</p>
                </motion.div>
              ))}
            </div>

            {/* Logo area */}
            <div className="mt-16 aspect-video bg-gray-50 border border-gray-200 flex items-center justify-center">
              <div className="text-center">
                <img
                  src={`/logos/${project.slug}-mark.png`}
                  alt={project.name}
                  className="w-20 h-20 object-contain mx-auto mb-4"
                  onError={e => e.target.style.display='none'}
                />
                <p className="text-xs text-gray-300 tracking-wider uppercase">{project.name}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky top-24">
              <h2 className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-6">Tech stack</h2>
              <div className="flex flex-wrap gap-2 mb-12">
                {project.stack.map(s => (
                  <span key={s} className="text-xs font-medium px-3 py-1.5 border border-gray-200 text-gray-500">
                    {s}
                  </span>
                ))}
              </div>

              <h2 className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-6">Details</h2>
              <div className="space-y-4">
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs text-gray-400 mb-1">Type</p>
                  <p className="text-sm text-black">{project.type}</p>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs text-gray-400 mb-1">Year</p>
                  <p className="text-sm text-black">{project.year}</p>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs text-gray-400 mb-1">Status</p>
                  <p className="text-sm text-black">{project.status}</p>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs text-gray-400 mb-1">Built by</p>
                  <p className="text-sm text-black">Cephalo Labs</p>
                </div>
              </div>

              <div className="mt-12">
                <Link to="/contact" className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white text-xs font-medium tracking-wider uppercase hover:bg-gray-800 transition-colors">
                  Build something like this
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next project */}
      <section className="border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/projects" className="inline-flex items-center gap-2 text-xs text-gray-400 tracking-wider uppercase hover:text-black transition-colors">
            <ArrowLeft size={12} /> All projects
          </Link>
        </div>
      </section>
    </PageWrapper>
  )
}
