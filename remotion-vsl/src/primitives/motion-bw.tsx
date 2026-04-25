import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing, random } from "remotion";

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);

const TEXT = "#F5F5F0";

// ─── HAIRLINE GRID — many thin lines that draw in then sweep out ──────
export const HairlineGrid: React.FC<{
  count?: number;
  orientation?: "horizontal" | "vertical" | "mixed";
  startFrame?: number;
  drawDuration?: number;
  holdDuration?: number;
  exitDuration?: number;
  opacity?: number;
}> = ({
  count = 24,
  orientation = "horizontal",
  startFrame = 0,
  drawDuration = 30,
  holdDuration = 60,
  exitDuration = 30,
  opacity = 0.18,
}) => {
  const frame = useCurrentFrame();
  const lines = Array.from({ length: count }, (_, i) => {
    const seed = `line-${i}`;
    const useV =
      orientation === "vertical" ||
      (orientation === "mixed" && random(seed) > 0.5);
    const pos = random(`pos-${i}`) * (useV ? 1920 : 1080);
    const length = 0.4 + random(`len-${i}`) * 0.6;
    const delay = i * 1.2;
    const localFrame = frame - startFrame - delay;
    const drawT = interpolate(
      localFrame,
      [0, drawDuration],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut }
    );
    const exitStart = drawDuration + holdDuration;
    const exitT = interpolate(
      localFrame,
      [exitStart, exitStart + exitDuration],
      [1, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeInOut }
    );
    const alpha = drawT * exitT * opacity;
    if (useV) {
      return (
        <div
          key={i}
          style={{
            position: "absolute",
            left: pos,
            top: `${(1 - length) * 50}%`,
            width: 1,
            height: `${length * 100}%`,
            background: TEXT,
            opacity: alpha,
            transformOrigin: "top",
            transform: `scaleY(${drawT})`,
          }}
        />
      );
    }
    return (
      <div
        key={i}
        style={{
          position: "absolute",
          top: pos,
          left: `${(1 - length) * 50}%`,
          height: 1,
          width: `${length * 100}%`,
          background: TEXT,
          opacity: alpha,
          transformOrigin: "left",
          transform: `scaleX(${drawT})`,
        }}
      />
    );
  });
  return <AbsoluteFill style={{ pointerEvents: "none" }}>{lines}</AbsoluteFill>;
};

// ─── KINETIC LETTERS — char-by-char mask reveal with stagger ──────────
export const KineticLetters: React.FC<{
  text: string;
  startFrame?: number;
  staggerFrames?: number;
  letterDuration?: number;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  letterSpacing?: string;
  color?: string;
  origin?: "below" | "above" | "scale";
  driftPx?: number;
}> = ({
  text,
  startFrame = 0,
  staggerFrames = 2.5,
  letterDuration = 22,
  fontFamily = "'Geist', system-ui, sans-serif",
  fontSize = 124,
  fontWeight = 500,
  letterSpacing = "-0.03em",
  color = TEXT,
  origin = "below",
  driftPx = 18,
}) => {
  const frame = useCurrentFrame();
  return (
    <span
      style={{
        display: "inline-flex",
        fontFamily,
        fontSize,
        fontWeight,
        letterSpacing,
        color,
        lineHeight: 1,
      }}
    >
      {text.split("").map((ch, i) => {
        const local = frame - startFrame - i * staggerFrames;
        const t = interpolate(local, [0, letterDuration], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: easeOut,
        });
        const tx =
          origin === "below" ? `translateY(${(1 - t) * driftPx}px)` :
          origin === "above" ? `translateY(${(1 - t) * -driftPx}px)` :
          `scale(${0.85 + 0.15 * t})`;
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: t,
              transform: tx,
              whiteSpace: "pre",
            }}
          >
            {ch}
          </span>
        );
      })}
    </span>
  );
};

// ─── GLYPH SCRAMBLE — random ASCII before resolving ──────────────────
const SCRAMBLE_CHARS = "▌▍▎▏░▒▓█▄▀▐▏▕━│┃▽▷◁△○●□■◆◇";
export const GlyphScramble: React.FC<{
  text: string;
  startFrame?: number;
  resolveDuration?: number;
  staggerFrames?: number;
  fontFamily?: string;
  fontSize?: number;
  letterSpacing?: string;
  color?: string;
  textTransform?: "uppercase" | "none";
}> = ({
  text,
  startFrame = 0,
  resolveDuration = 24,
  staggerFrames = 1.5,
  fontFamily = "'Geist Mono', ui-monospace, monospace",
  fontSize = 15,
  letterSpacing = "0.34em",
  color = TEXT,
  textTransform = "uppercase",
}) => {
  const frame = useCurrentFrame();
  return (
    <span
      style={{
        fontFamily,
        fontSize,
        letterSpacing,
        color,
        textTransform,
        whiteSpace: "pre",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {text.split("").map((ch, i) => {
        const local = frame - startFrame - i * staggerFrames;
        if (local < 0) return <span key={i}> </span>;
        if (local < resolveDuration) {
          const idx = Math.floor(random(`g-${i}-${Math.floor(local / 2)}`) * SCRAMBLE_CHARS.length);
          return (
            <span key={i} style={{ opacity: 0.5 + 0.5 * (local / resolveDuration) }}>
              {ch === " " ? " " : SCRAMBLE_CHARS[idx]}
            </span>
          );
        }
        return <span key={i}>{ch}</span>;
      })}
    </span>
  );
};

// ─── DRIFTING DOT FIELD — fixed grid that ripples ─────────────────────
export const DotField: React.FC<{
  cols?: number;
  rows?: number;
  rippleSpeed?: number;
  baseOpacity?: number;
}> = ({ cols = 60, rows = 30, rippleSpeed = 0.04, baseOpacity = 0.08 }) => {
  const frame = useCurrentFrame();
  const cellW = 1920 / cols;
  const cellH = 1080 / rows;
  const dots = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * cellW + cellW / 2;
      const y = r * cellH + cellH / 2;
      // Ripple from center
      const dx = c - cols / 2;
      const dy = r - rows / 2;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const wave = Math.sin(dist * 0.4 - frame * rippleSpeed);
      const alpha = baseOpacity + wave * 0.06;
      dots.push(
        <div
          key={`${r}-${c}`}
          style={{
            position: "absolute",
            left: x,
            top: y,
            width: 2,
            height: 2,
            borderRadius: "50%",
            background: TEXT,
            opacity: Math.max(0, alpha),
            transform: "translate(-50%, -50%)",
          }}
        />
      );
    }
  }
  return <AbsoluteFill style={{ pointerEvents: "none" }}>{dots}</AbsoluteFill>;
};

// ─── PARTICLE STREAM — drifting low-opacity particles ─────────────────
export const ParticleStream: React.FC<{
  count?: number;
  speed?: number;
  size?: number;
  opacity?: number;
}> = ({ count = 80, speed = 0.4, size = 1.5, opacity = 0.4 }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {Array.from({ length: count }, (_, i) => {
        const seed = `p-${i}`;
        const x0 = random(`x-${i}`) * 1920;
        const y0 = random(`y-${i}`) * 1080;
        const speedY = (0.3 + random(`s-${i}`) * 0.7) * speed;
        const driftX = Math.sin((frame + i * 30) / 60) * 12;
        const y = ((y0 - frame * speedY) % 1080 + 1080) % 1080;
        const phase = random(`ph-${i}`) * Math.PI * 2;
        const twinkle = 0.5 + 0.5 * Math.sin(frame / 20 + phase);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x0 + driftX,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              background: TEXT,
              opacity: opacity * twinkle,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// ─── CRT FLICKER — full-screen brightness pulse every N frames ────────
export const CRTFlicker: React.FC<{
  period?: number;
  intensity?: number;
}> = ({ period = 90, intensity = 0.04 }) => {
  const frame = useCurrentFrame();
  const phase = (frame % period) / period;
  const flick = phase < 0.04 ? Math.sin(phase * Math.PI * 25) : 0;
  return (
    <AbsoluteFill
      style={{
        background: "#FFFFFF",
        opacity: Math.abs(flick) * intensity,
        pointerEvents: "none",
        mixBlendMode: "overlay",
      }}
    />
  );
};

// ─── SCAN LINES — horizontal lines drifting down ──────────────────────
export const ScanLines: React.FC<{
  spacing?: number;
  speed?: number;
  opacity?: number;
}> = ({ spacing = 4, speed = 0.5, opacity = 0.04 }) => {
  const frame = useCurrentFrame();
  const offset = (frame * speed) % spacing;
  return (
    <AbsoluteFill
      style={{
        backgroundImage: `repeating-linear-gradient(0deg, rgba(255,255,255,${opacity}) 0px, rgba(255,255,255,${opacity}) 1px, transparent 1px, transparent ${spacing}px)`,
        backgroundPositionY: offset,
        pointerEvents: "none",
        mixBlendMode: "overlay",
      }}
    />
  );
};

// ─── DIGIT FLIPPER — odometer-style number that flips per digit ───────
export const DigitFlipper: React.FC<{
  value: number;
  digits?: number;
  prefix?: string;
  suffix?: string;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
}> = ({
  value,
  digits = 3,
  prefix = "",
  suffix = "",
  fontSize = 160,
  fontFamily = "'Geist', system-ui, sans-serif",
  color = TEXT,
}) => {
  const padded = Math.round(value).toString().padStart(digits, "0");
  return (
    <span
      style={{
        fontFamily,
        fontSize,
        fontWeight: 500,
        color,
        letterSpacing: "-0.04em",
        fontVariantNumeric: "tabular-nums",
        display: "inline-flex",
        alignItems: "baseline",
      }}
    >
      <span>{prefix}</span>
      {padded.split("").map((d, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            transform: `translateY(0px)`,
          }}
        >
          {d}
        </span>
      ))}
      <span>{suffix}</span>
    </span>
  );
};

// ─── CAMERA DRIFT — wraps children with subtle parallax/scale loop ────
export const CameraDrift: React.FC<{
  children: React.ReactNode;
  amplitude?: number;
  scale?: number;
  period?: number;
}> = ({ children, amplitude = 14, scale = 0.012, period = 240 }) => {
  const frame = useCurrentFrame();
  const tx = Math.sin((frame / period) * Math.PI * 2) * amplitude;
  const ty = Math.cos((frame / period) * Math.PI * 2) * amplitude * 0.4;
  const sc = 1 + Math.sin((frame / period) * Math.PI * 2) * scale;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        transform: `translate3d(${tx}px, ${ty}px, 0) scale(${sc})`,
      }}
    >
      {children}
    </div>
  );
};

// ─── ORBITING NODES — N nodes orbiting a center, connected by hairlines
export const OrbitingNodes: React.FC<{
  cx?: number;
  cy?: number;
  count?: number;
  radius?: number;
  speed?: number;
  nodeSize?: number;
  opacity?: number;
}> = ({ cx = 960, cy = 540, count = 6, radius = 280, speed = 0.005, nodeSize = 6, opacity = 0.5 }) => {
  const frame = useCurrentFrame();
  const nodes = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 + frame * speed;
    return {
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius * 0.65,
    };
  });
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0 }}>
        {nodes.map((n, i) => {
          const next = nodes[(i + 1) % count];
          return (
            <line
              key={i}
              x1={n.x}
              y1={n.y}
              x2={next.x}
              y2={next.y}
              stroke={TEXT}
              strokeOpacity={opacity * 0.3}
              strokeWidth={1}
            />
          );
        })}
      </svg>
      {nodes.map((n, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: n.x - nodeSize / 2,
            top: n.y - nodeSize / 2,
            width: nodeSize,
            height: nodeSize,
            borderRadius: "50%",
            background: TEXT,
            opacity,
            boxShadow: `0 0 12px ${TEXT}66`,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

// ─── TICKER — fast count-up with subtle blur until last frame ─────────
export const FastTicker: React.FC<{
  from: number;
  to: number;
  startFrame: number;
  duration: number;
  prefix?: string;
  suffix?: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
}> = ({
  from,
  to,
  startFrame,
  duration,
  prefix = "",
  suffix = "",
  fontFamily = "'Geist', system-ui, sans-serif",
  fontSize = 160,
  fontWeight = 500,
  color = TEXT,
}) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [startFrame, startFrame + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const v = from + (to - from) * t;
  const blur = (1 - Math.abs(t * 2 - 1)) * 0.5; // peaks mid-motion
  return (
    <span
      style={{
        fontFamily,
        fontSize,
        fontWeight,
        color,
        letterSpacing: "-0.04em",
        fontVariantNumeric: "tabular-nums",
        filter: t < 1 ? `blur(${blur}px)` : "none",
      }}
    >
      {prefix}
      {Math.round(v).toLocaleString("en-US")}
      {suffix}
    </span>
  );
};

// ─── HALO — soft white radial mask that breathes ──────────────────────
export const Halo: React.FC<{
  size?: number;
  opacity?: number;
  period?: number;
}> = ({ size = 900, opacity = 0.08, period = 180 }) => {
  const frame = useCurrentFrame();
  const breathe = 0.85 + 0.15 * Math.sin((frame / period) * Math.PI * 2);
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: size,
        height: size,
        transform: "translate(-50%, -50%)",
        background: `radial-gradient(circle, rgba(245,245,240,${opacity * breathe}) 0%, transparent 60%)`,
        filter: "blur(40px)",
        pointerEvents: "none",
      }}
    />
  );
};

void easeInOut;
