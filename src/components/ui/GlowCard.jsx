import { useRef, useState } from 'react'

export default function GlowCard({ children, className = '', glowColor = 'rgba(192,132,252,0.12)' }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0, active: false })

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true })
  }

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMove}
      onMouseEnter={() => setPos(p => ({ ...p, active: true }))}
      onMouseLeave={() => setPos(p => ({ ...p, active: false }))}
    >
      <div
        className="absolute pointer-events-none transition-opacity duration-500"
        style={{
          left: pos.x - 200,
          top: pos.y - 200,
          width: 400,
          height: 400,
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          opacity: pos.active ? 1 : 0,
        }}
      />
      {children}
    </div>
  )
}
