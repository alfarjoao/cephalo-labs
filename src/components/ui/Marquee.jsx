export default function Marquee({ dark = true, speed = 35 }) {
  const text = 'WE BUILD INTELLIGENCE · MULTI-MODEL ROUTING · AUTONOMOUS AGENTS · POLYPUS · CEPHALO LABS · '
  const repeated = Array(6).fill(text).join('')

  return (
    <div className={`overflow-hidden border-y py-3.5 ${dark ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-gray-100'}`}>
      <div
        className="inline-block whitespace-nowrap"
        style={{ animation: `marquee-scroll ${speed}s linear infinite` }}
      >
        <span className={`text-[10px] font-medium tracking-[0.3em] uppercase ${dark ? 'text-white/20' : 'text-black/15'}`}>
          {repeated}
        </span>
      </div>
    </div>
  )
}
