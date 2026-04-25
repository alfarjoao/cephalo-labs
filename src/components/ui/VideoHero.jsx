import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'

/**
 * Double-bezel VSL / case-study video player.
 * Props:
 *   src      — mp4 path in /public (e.g. '/home-vsl.mp4')
 *   poster   — optional poster image
 *   accent   — hex colour for corner accents ('#C084FC' or '#B68B4A' or white)
 *   label    — tiny label under the player ('Watch the story')
 *   autoPlay — start muted autoplay if true
 */
export default function VideoHero({
  src,
  poster,
  accent = 'rgba(255,255,255,0.18)',
  label = 'Watch the story',
  autoPlay = false,
  className = '',
}) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(autoPlay)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const v = videoRef.current
    if (!v || !autoPlay) return
    v.muted = true
    v.play().then(() => setPlaying(true)).catch(() => {})
  }, [autoPlay])

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (playing) { v.pause(); setPlaying(false) }
    else { v.play().then(() => setPlaying(true)).catch(() => {}) }
  }

  const toggleMute = (e) => {
    e.stopPropagation()
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  return (
    <div className={`relative w-full max-w-5xl mx-auto ${className}`}>
      {/* Outer bezel */}
      <div className="relative overflow-hidden rounded-[1.8rem] bg-white/5 ring-1 ring-white/10 p-2 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]">
        {/* Inner core */}
        <div
          onClick={toggle}
          role="button"
          tabIndex={0}
          aria-label={playing ? 'Pause video' : 'Play video'}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle() }
          }}
          className="relative rounded-[calc(1.8rem-0.5rem)] overflow-hidden bg-black aspect-video cursor-pointer group"
          style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.08)' }}
        >
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            className="w-full h-full object-cover"
            playsInline
            preload="metadata"
            muted={muted}
            onLoadedData={() => setReady(true)}
            onEnded={() => setPlaying(false)}
          />

          {/* Overlay — hidden when playing */}
          <motion.div
            initial={false}
            animate={{ opacity: playing ? 0 : 1 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 backdrop-blur-[2px]"
            style={{ pointerEvents: playing ? 'none' : 'auto' }}
          >
            <div
              className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-3 group-hover:scale-[1.06] transition-transform"
              style={{ transitionTimingFunction: 'cubic-bezier(0.32,0.72,0,1)' }}
            >
              <Play size={22} fill="#F5F5F0" className="text-[#F5F5F0] ml-0.5" />
            </div>
            <p className="text-white/50 text-[11px] tracking-[0.22em] uppercase">{label}</p>
          </motion.div>

          {/* Controls (while playing, pause + mute) */}
          {playing && (
            <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10"
              onClick={(e) => e.stopPropagation()}>
              <button
                onClick={toggle}
                className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white/80 hover:bg-black/70 hover:text-white transition-colors"
                aria-label="Pause"
              >
                <Pause size={14} />
              </button>
              <button
                onClick={toggleMute}
                className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white/80 hover:bg-black/70 hover:text-white transition-colors"
                aria-label={muted ? 'Unmute' : 'Mute'}
              >
                {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Corner accents — 4 subtle L-brackets */}
      <CornerAccents color={accent} />
    </div>
  )
}

function CornerAccents({ color }) {
  return (
    <>
      <div className="absolute -top-px -left-px w-7 h-7 border-t border-l rounded-tl-[1.8rem] pointer-events-none" style={{ borderColor: color }} />
      <div className="absolute -top-px -right-px w-7 h-7 border-t border-r rounded-tr-[1.8rem] pointer-events-none" style={{ borderColor: color }} />
      <div className="absolute -bottom-px -left-px w-7 h-7 border-b border-l rounded-bl-[1.8rem] pointer-events-none" style={{ borderColor: color }} />
      <div className="absolute -bottom-px -right-px w-7 h-7 border-b border-r rounded-br-[1.8rem] pointer-events-none" style={{ borderColor: color }} />
    </>
  )
}
