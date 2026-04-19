import { motion } from 'framer-motion'

export default function PageWrapper({ children, className = '' }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className={`pt-16 min-h-screen ${className}`}
    >
      {children}
    </motion.main>
  )
}
