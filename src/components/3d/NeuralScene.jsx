import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function NeuralParticles() {
  const ref = useRef()
  const count = window.innerWidth < 768 ? 400 : 800

  const { positions } = useMemo(() => {
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6
    }

    return { positions }
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.03
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.05
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#0A0A0A"
        size={0.025}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

function ConnectionLines() {
  const ref = useRef()
  const lines = useMemo(() => {
    const points = []
    const nodeCount = 40
    const nodes = []

    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4
      ))
    }

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 2.5) {
          points.push(nodes[i].x, nodes[i].y, nodes[i].z)
          points.push(nodes[j].x, nodes[j].y, nodes[j].z)
        }
      }
    }

    return new Float32Array(points)
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.03
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.05
  })

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(lines, 3))
    return geo
  }, [lines])

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color="#0A0A0A" transparent opacity={0.08} />
    </lineSegments>
  )
}

export default function NeuralScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.5} />
      <NeuralParticles />
      <ConnectionLines />
    </Canvas>
  )
}
