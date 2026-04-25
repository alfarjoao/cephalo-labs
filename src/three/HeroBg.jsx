import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing'
import { BlendFunction, KernelSize } from 'postprocessing'

// Ultra-subtle rotating wireframe — editorial depth layer behind hero content.
// Mirrors polypus-site HeroBg for visual family resemblance.

function FloatingForm() {
  const group = useRef(null)

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.getElapsedTime()
    group.current.rotation.x = t * 0.05
    group.current.rotation.y = t * 0.07
  })

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[2.4, 1]} />
        <meshBasicMaterial color="#C084FC" wireframe transparent opacity={0.12} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[2.4, 1]} />
        <meshBasicMaterial color="#C084FC" transparent opacity={0.015} />
      </mesh>
    </group>
  )
}

export default function HeroBg() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0" style={{ opacity: 0.55 }}>
        <Canvas
          dpr={isMobile ? 1 : [1, 1.5]}
          camera={{ position: [0, 0, 8], fov: 45 }}
          gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <FloatingForm />
            {!isMobile && (
              <EffectComposer multisampling={0} enableNormalPass={false}>
                <Bloom
                  intensity={0.55}
                  luminanceThreshold={0.08}
                  luminanceSmoothing={0.35}
                  kernelSize={KernelSize.LARGE}
                  mipmapBlur
                />
                <Noise premultiply blendFunction={BlendFunction.SCREEN} opacity={0.07} />
              </EffectComposer>
            )}
          </Suspense>
        </Canvas>
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 35%, rgba(124,58,237,0.11) 0%, rgba(88,28,235,0.035) 45%, transparent 70%)',
        }}
      />

      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
    </div>
  )
}
