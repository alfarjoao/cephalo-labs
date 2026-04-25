import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

type Particle = {
  x0: number;
  y0: number;
  vx: number;
  vy: number;
  r: number;
  life: number;
  hue: number;
  alpha: number;
};

const mulberry32 = (seed: number) => {
  let t = seed;
  return () => {
    t |= 0;
    t = (t + 0x6d2b79f5) | 0;
    let x = Math.imul(t ^ (t >>> 15), 1 | t);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
};

type ParallelStreamProps = {
  count?: number;
  width?: number;
  height?: number;
  color?: string;
  accent?: string;
  seed?: number;
  speedMultiplier?: number;
  style?: React.CSSProperties;
};

export const ParallelStream: React.FC<ParallelStreamProps> = ({
  count = 240,
  width = 1920,
  height = 1080,
  color = "#F5F5F0",
  accent = "#C084FC",
  seed = 7,
  speedMultiplier = 1,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const particles = useMemo<Particle[]>(() => {
    const rand = mulberry32(seed);
    return Array.from({ length: count }, () => ({
      x0: rand() * width,
      y0: rand() * height,
      vx: (rand() * 160 + 80) * (rand() > 0.5 ? 1 : -0.15),
      vy: (rand() - 0.5) * 20,
      r: rand() * 1.8 + 0.4,
      life: rand() * 2 + 1,
      hue: rand(),
      alpha: rand() * 0.6 + 0.3,
    }));
  }, [count, width, height, seed]);

  return (
    <AbsoluteFill style={style}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        style={{ position: "absolute", inset: 0 }}
      >
        {particles.map((p, i) => {
          const tt = (t * speedMultiplier) % p.life;
          const px = (p.x0 + p.vx * tt) % width;
          const x = px < 0 ? px + width : px;
          const y = p.y0 + p.vy * tt;
          const fill = p.hue > 0.82 ? accent : color;
          const trailLen = Math.max(12, p.vx * 0.08);
          return (
            <g key={i} opacity={p.alpha}>
              <line
                x1={x - trailLen}
                y1={y}
                x2={x}
                y2={y}
                stroke={fill}
                strokeWidth={p.r}
                strokeLinecap="round"
                strokeOpacity={0.35}
              />
              <circle cx={x} cy={y} r={p.r} fill={fill} />
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

type DotGridProps = {
  cols?: number;
  rows?: number;
  width?: number;
  height?: number;
  color?: string;
  accent?: string;
  pulseFrame?: number;
  pulseDurationFrames?: number;
};

export const DotGrid: React.FC<DotGridProps> = ({
  cols = 48,
  rows = 27,
  width = 1920,
  height = 1080,
  color = "#F5F5F0",
  accent = "#C084FC",
  pulseFrame = 0,
  pulseDurationFrames = 60,
}) => {
  const frame = useCurrentFrame();
  const sx = width / (cols + 1);
  const sy = height / (rows + 1);
  const cxCenter = width / 2;
  const cyCenter = height / 2;
  const maxR = Math.hypot(cxCenter, cyCenter);
  const progress = Math.max(
    0,
    Math.min(1, (frame - pulseFrame) / pulseDurationFrames)
  );
  const wave = progress * maxR * 1.1;

  const dots: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = (c + 1) * sx;
      const y = (r + 1) * sy;
      const d = Math.hypot(x - cxCenter, y - cyCenter);
      const near = Math.max(0, 1 - Math.abs(d - wave) / 80);
      const fill = near > 0.1 ? accent : color;
      const opacity = 0.15 + near * 0.75;
      const radius = 1.5 + near * 3.5;
      dots.push(
        <circle key={`${r}-${c}`} cx={x} cy={y} r={radius} fill={fill} opacity={opacity} />
      );
    }
  }

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      style={{ position: "absolute", inset: 0 }}
    >
      {dots}
    </svg>
  );
};
