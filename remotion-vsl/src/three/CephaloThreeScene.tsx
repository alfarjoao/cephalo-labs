import React from "react";
import { ThreeCanvas } from "@remotion/three";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Edges } from "@react-three/drei";

const TEXT_HEX = "#F5F5F0";

/**
 * R3F scene: rotating dashed wireframe rings (3 layers) + drifting
 * geometric particles (triangles + hexagons). Strict B&W.
 *
 * Used as a depth layer behind hero scenes (S4 Polypus, S7 wordmark).
 */
const InnerScene: React.FC<{
  rings?: number;
  particleCount?: number;
  cameraDolly?: boolean;
}> = ({ rings = 3, particleCount = 40, cameraDolly = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  // Camera dolly: slow zoom-in
  const cameraZ = cameraDolly ? 5 - Math.min(frame / 240, 1) * 1.5 : 4.5;

  // Hexagon particle positions (deterministic via index hashing)
  const particles = Array.from({ length: particleCount }, (_, i) => {
    const seed = (i * 9301 + 49297) % 233280 / 233280;
    const angle = (i / particleCount) * Math.PI * 2 + t * 0.05;
    const radius = 1.5 + seed * 2.5;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle * 1.3 + i) * 0.8,
      z: Math.sin(angle) * radius * 0.5 - 1,
      rot: t * (0.5 + seed),
      size: 0.04 + seed * 0.05,
    };
  });

  return (
    <>
      <perspectiveCamera position={[0, 0, cameraZ]} fov={50} />
      <ambientLight intensity={0.6} />

      {/* Rotating rings */}
      {Array.from({ length: rings }).map((_, i) => {
        const ringRadius = 1.4 + i * 0.7;
        const tilt = (i - rings / 2) * 0.4;
        const speed = (1 + i * 0.3) * (i % 2 === 0 ? 1 : -1);
        return (
          <mesh key={i} rotation={[tilt, t * speed * 0.15, 0]}>
            <ringGeometry args={[ringRadius - 0.005, ringRadius + 0.005, 96]} />
            <meshBasicMaterial color={TEXT_HEX} transparent opacity={0.25 - i * 0.05} />
            <Edges threshold={1} color={TEXT_HEX} />
          </mesh>
        );
      })}

      {/* Particle hexagons floating */}
      {particles.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]} rotation={[p.rot, p.rot * 0.7, 0]}>
          <octahedronGeometry args={[p.size, 0]} />
          <meshBasicMaterial color={TEXT_HEX} transparent opacity={0.6} />
          <Edges threshold={1} color={TEXT_HEX} />
        </mesh>
      ))}
    </>
  );
};

/**
 * The full <ThreeCanvas> wrapper. Fixed 1920×1080. Use as a positioned
 * layer behind your scene. ThreeCanvas handles Remotion's frame sync.
 */
export const CephaloThreeScene: React.FC<{
  rings?: number;
  particleCount?: number;
  cameraDolly?: boolean;
  width?: number;
  height?: number;
}> = ({ rings = 3, particleCount = 40, cameraDolly = false, width = 1920, height = 1080 }) => {
  return (
    <ThreeCanvas
      width={width}
      height={height}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <InnerScene rings={rings} particleCount={particleCount} cameraDolly={cameraDolly} />
    </ThreeCanvas>
  );
};
