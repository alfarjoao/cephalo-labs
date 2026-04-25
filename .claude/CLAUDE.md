# Cephalo Labs Site — Project Context

## O que é
Site institucional da CEPHALO Labs. Dark, premium, editorial.
Stack: Vite + React + Three.js + React Three Fiber + Framer Motion + Tailwind

## Path
`C:\Business\claude\apps\CEPHALO\cephalo-labs`

## Stack
- Vite + React + react-router-dom
- Three.js + @react-three/fiber + @react-three/drei
- Framer Motion
- Tailwind CSS
- lucide-react (icons — mas em projecto CEPHALO usar Phosphor Light/Remix Line)

## Estado actual
- GlowCards implementados
- Redesign in progress

## Brand (obrigatório antes de qualquer design)
- bg `#0A0A0A`, accent `#C084FC`, text `#F5F5F0`
- Font: Geist / Clash Display (NUNCA Inter, Roboto, Arial)
- Tagline: "We build intelligence."
- Ler BRAND.md antes de qualquer output visual: `C:\Business\claude\obsidian\CEPHALO\BRAND.md`
- Invocar `brand-guardian` antes de entregar qualquer output

## Quality gates (automáticos)
- Todo output UI → `design-critic` (≥8/10 para entregar)
- Brand output → `brand-guardian`
- Skills para este projecto: `high-end-visual-design` + `3d-web-experience` + `scroll-experience`

## Gotchas
- Three.js + R3F: sempre fallback estático para mobile
- `dpr={isMobile ? 1 : 2}` no Canvas
- backdrop-blur apenas em elementos fixed/sticky
- Scroll-driven: ScrollControls (R3F) ou GSAP scrub — nunca window.addEventListener('scroll')
