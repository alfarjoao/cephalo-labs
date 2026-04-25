export default function KernelMark({ className = 'w-6 h-6' }) {
  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Kernel — In Development"
      className={className}
    >
      <rect x="6"  y="6"  width="12" height="12" rx="2.5" fill="currentColor" />
      <rect x="42" y="6"  width="12" height="12" rx="2.5" fill="currentColor" />
      <rect x="6"  y="24" width="12" height="12" rx="2.5" fill="currentColor" />
      <rect x="24" y="24" width="12" height="12" rx="2.5" fill="currentColor" />
      <rect x="6"  y="42" width="12" height="12" rx="2.5" fill="currentColor" />
      <rect x="42" y="42" width="12" height="12" rx="2.5" fill="currentColor" />
      <rect x="24" y="6"  width="12" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 1.5" opacity="0.45" />
      <rect x="42" y="24" width="12" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 1.5" opacity="0.45" />
      <rect x="24" y="42" width="12" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 1.5" opacity="0.45" />
    </svg>
  )
}
