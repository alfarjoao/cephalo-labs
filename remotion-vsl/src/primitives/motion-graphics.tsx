import React from "react";
import { AbsoluteFill, interpolate, random, Easing } from "remotion";
import {
  INK, PURPLE, GOLD, FONT, MONO,
  useMotion, easeOut,
} from "./cinematic";

// ═══════════════════════════════════════════════════════════════════════
//  MOTION-GRAPHICS PRIMITIVES
//  Dense, kinetic, purpose-built for CEPHALO VSLs.
// ═══════════════════════════════════════════════════════════════════════

type Tone = "white" | "purple" | "gold";
const toneColor = (t: Tone) => (t === "purple" ? PURPLE : t === "gold" ? GOLD : INK.text);

// ── FLASH ───────────────────────────────────────────────────────────────
// Quick full-screen flash. Use on impacts / transitions.
export const Flash: React.FC<{
  at: number;
  duration?: number;
  color?: string;
  intensity?: number;
  nowFrame: number;
}> = ({ at, duration = 6, color = "#FFFFFF", intensity = 0.9, nowFrame }) => {
  const opacity = interpolate(nowFrame, [at, at + 2, at + duration], [0, intensity, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  if (opacity <= 0.001) return null;
  return (
    <AbsoluteFill
      style={{
        background: color,
        pointerEvents: "none",
        opacity,
        mixBlendMode: "screen",
        zIndex: 8,
      }}
    />
  );
};

// ── CAMERA SHAKE WRAPPER ────────────────────────────────────────────────
// Adds subtle jitter. Use on impact moments.
export const CameraShake: React.FC<{
  children: React.ReactNode;
  amplitude?: number;
  active?: boolean;
}> = ({ children, amplitude = 4, active = true }) => {
  const { frame } = useMotion();
  if (!active) return <>{children}</>;
  const x = Math.sin(frame * 1.3) * amplitude * (1 + Math.sin(frame * 0.37));
  const y = Math.cos(frame * 1.1) * amplitude * (1 + Math.cos(frame * 0.41));
  return (
    <AbsoluteFill style={{ transform: `translate(${x}px, ${y}px)` }}>
      {children}
    </AbsoluteFill>
  );
};

// ── PULSE RING ──────────────────────────────────────────────────────────
// Concentric expanding rings from a point. Use for emphasis / emitters.
export const PulseRing: React.FC<{
  cx: number;
  cy: number;
  tone?: Tone;
  maxRadius?: number;
  rings?: number;
  period?: number;
  lineWidth?: number;
  opacity?: number;
}> = ({ cx, cy, tone = "white", maxRadius = 260, rings = 3, period = 90, lineWidth = 1.5, opacity = 0.6 }) => {
  const { frame } = useMotion();
  const col = toneColor(tone);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {Array.from({ length: rings }).map((_, i) => {
        const phase = (frame + i * (period / rings)) % period;
        const p = phase / period;
        const r = p * maxRadius;
        const a = (1 - p) * opacity;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: cx - r,
              top: cy - r,
              width: r * 2,
              height: r * 2,
              borderRadius: "50%",
              border: `${lineWidth}px solid ${col}`,
              opacity: a,
              boxShadow: `0 0 24px ${col}30`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// ── PARTICLE BURST ──────────────────────────────────────────────────────
// Outward explosion of particles from a point. Use at reveals.
export const ParticleBurst: React.FC<{
  cx: number;
  cy: number;
  count?: number;
  maxRadius?: number;
  startFrame: number;
  duration?: number;
  tone?: Tone;
  nowFrame: number;
}> = ({ cx, cy, count = 40, maxRadius = 400, startFrame, duration = 45, tone = "white", nowFrame }) => {
  const col = toneColor(tone);
  const t = (nowFrame - startFrame) / duration;
  if (t < 0 || t > 1.05) return null;
  const clamped = Math.min(1, Math.max(0, t));
  const eased = 1 - Math.pow(1 - clamped, 3);
  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 6 }}>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2 + random(`pb-a-${i}`) * 0.8;
        const dist = (0.35 + random(`pb-d-${i}`) * 0.65) * maxRadius * eased;
        const size = 2 + random(`pb-s-${i}`) * 4;
        const alpha = 1 - clamped;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: cx + Math.cos(angle) * dist - size / 2,
              top: cy + Math.sin(angle) * dist - size / 2,
              width: size,
              height: size,
              borderRadius: "50%",
              background: col,
              boxShadow: `0 0 ${size * 3}px ${col}`,
              opacity: alpha,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// ── BAR CHART ───────────────────────────────────────────────────────────
// Horizontal or vertical animated bars. Fast reveal with stagger.
export const BarChart: React.FC<{
  data: { label: string; value: number; max?: number }[];
  startFrame: number;
  tone?: Tone;
  orientation?: "horizontal" | "vertical";
  width?: number;
  height?: number;
  nowFrame: number;
}> = ({ data, startFrame, tone = "white", orientation = "horizontal", width = 520, height = 320, nowFrame }) => {
  const col = toneColor(tone);
  const maxVal = Math.max(...data.map((d) => d.max ?? d.value));

  if (orientation === "horizontal") {
    const rowH = height / data.length;
    return (
      <div style={{ width, height, position: "relative", fontFamily: MONO }}>
        {data.map((d, i) => {
          const t = interpolate(nowFrame, [startFrame + i * 5, startFrame + i * 5 + 24], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: easeOut,
          });
          const w = (d.value / maxVal) * (width - 120) * t;
          return (
            <div key={d.label} style={{ position: "absolute", top: i * rowH, left: 0, width, height: rowH - 8, display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 100, fontSize: 13, color: "rgba(245,245,240,0.55)", textAlign: "right", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {d.label}
              </div>
              <div style={{ flex: 1, height: rowH - 20, background: "rgba(255,255,255,0.04)", borderRadius: 3, position: "relative", overflow: "hidden" }}>
                <div
                  style={{
                    width: w,
                    height: "100%",
                    background: `linear-gradient(90deg, ${col}88, ${col})`,
                    boxShadow: `inset 0 1px 1px rgba(255,255,255,0.15), 0 0 14px ${col}55`,
                    borderRadius: 3,
                  }}
                />
                <div style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: INK.text, opacity: t }}>
                  {Math.round(d.value * t)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  const colW = width / data.length;
  return (
    <div style={{ width, height, position: "relative", fontFamily: MONO, display: "flex", alignItems: "flex-end", gap: 8 }}>
      {data.map((d, i) => {
        const t = interpolate(nowFrame, [startFrame + i * 4, startFrame + i * 4 + 24], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: easeOut,
        });
        const h = (d.value / maxVal) * (height - 40) * t;
        return (
          <div key={d.label} style={{ width: colW - 8, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ fontSize: 12, color: INK.text, opacity: t }}>{Math.round(d.value * t)}</div>
            <div
              style={{
                width: "100%",
                height: h,
                background: `linear-gradient(0deg, ${col}55, ${col})`,
                borderRadius: 3,
                boxShadow: `inset 0 1px 1px rgba(255,255,255,0.15), 0 0 10px ${col}55`,
              }}
            />
            <div style={{ fontSize: 11, color: "rgba(245,245,240,0.45)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{d.label}</div>
          </div>
        );
      })}
    </div>
  );
};

// ── LINE GRAPH ──────────────────────────────────────────────────────────
// Animated line drawing with filled area underneath.
export const LineGraph: React.FC<{
  points: number[];
  startFrame: number;
  duration?: number;
  tone?: Tone;
  width?: number;
  height?: number;
  nowFrame: number;
}> = ({ points, startFrame, duration = 45, tone = "white", width = 520, height = 240, nowFrame }) => {
  const col = toneColor(tone);
  const maxVal = Math.max(...points);
  const minVal = Math.min(...points);
  const range = maxVal - minVal || 1;
  const padX = 20;
  const padY = 20;
  const stepX = (width - padX * 2) / (points.length - 1);
  const mapY = (v: number) => padY + (1 - (v - minVal) / range) * (height - padY * 2);

  const progress = interpolate(nowFrame, [startFrame, startFrame + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

  const pathSegments: string[] = [];
  const visibleCount = Math.floor(progress * (points.length - 1)) + 1;
  const partialFrac = progress * (points.length - 1) - (visibleCount - 1);

  for (let i = 0; i < visibleCount && i < points.length; i++) {
    const x = padX + i * stepX;
    const y = mapY(points[i]);
    if (i === 0) pathSegments.push(`M ${x} ${y}`);
    else pathSegments.push(`L ${x} ${y}`);
  }

  if (visibleCount < points.length) {
    const lastX = padX + (visibleCount - 1) * stepX;
    const lastY = mapY(points[visibleCount - 1]);
    const nextX = padX + visibleCount * stepX;
    const nextY = mapY(points[visibleCount]);
    const px = lastX + (nextX - lastX) * partialFrac;
    const py = lastY + (nextY - lastY) * partialFrac;
    pathSegments.push(`L ${px} ${py}`);
  }

  const linePath = pathSegments.join(" ");
  const fillPath = `${linePath} L ${padX + (visibleCount - 1 + partialFrac) * stepX} ${height - padY} L ${padX} ${height - padY} Z`;

  // Grid lines
  const gridLines = Array.from({ length: 4 }).map((_, i) => {
    const y = padY + (i / 3) * (height - padY * 2);
    return <line key={i} x1={padX} y1={y} x2={width - padX} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth={1} strokeDasharray="3 4" />;
  });

  return (
    <svg width={width} height={height} style={{ display: "block" }}>
      {gridLines}
      <defs>
        <linearGradient id={`lg-fill-${col.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={col} stopOpacity="0.35" />
          <stop offset="100%" stopColor={col} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fillPath} fill={`url(#lg-fill-${col.replace("#", "")})`} />
      <path d={linePath} fill="none" stroke={col} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 0 6px ${col}88)` }} />
      {/* End dot */}
      {visibleCount > 0 && (
        <circle
          cx={padX + (visibleCount - 1 + partialFrac) * stepX}
          cy={mapY(points[Math.min(visibleCount - 1, points.length - 1)] + (points[Math.min(visibleCount, points.length - 1)] - points[Math.min(visibleCount - 1, points.length - 1)]) * partialFrac)}
          r={4}
          fill={col}
          style={{ filter: `drop-shadow(0 0 8px ${col})` }}
        />
      )}
    </svg>
  );
};

// ── TYPEWRITER TEXT ─────────────────────────────────────────────────────
// Character-by-character reveal, monospace.
export const TypewriterText: React.FC<{
  text: string;
  startFrame: number;
  charsPerFrame?: number;
  showCaret?: boolean;
  style?: React.CSSProperties;
  nowFrame: number;
}> = ({ text, startFrame, charsPerFrame = 0.8, showCaret = true, style, nowFrame }) => {
  const elapsed = Math.max(0, nowFrame - startFrame);
  const chars = Math.min(text.length, Math.floor(elapsed * charsPerFrame));
  const done = chars >= text.length;
  const blink = Math.floor(nowFrame / 10) % 2 === 0;
  return (
    <span style={{ fontFamily: MONO, ...style }}>
      {text.slice(0, chars)}
      {showCaret && (!done || blink) && (
        <span style={{ opacity: done ? (blink ? 1 : 0) : 0.8 }}>▌</span>
      )}
    </span>
  );
};

// ── TEXT SCRAMBLE ───────────────────────────────────────────────────────
// Scrambles random characters until settling on final text.
export const TextScramble: React.FC<{
  text: string;
  startFrame: number;
  duration?: number;
  style?: React.CSSProperties;
  nowFrame: number;
}> = ({ text, startFrame, duration = 30, style, nowFrame }) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*+=_-/".split("");
  const elapsed = Math.max(0, nowFrame - startFrame);
  const progress = Math.min(1, elapsed / duration);
  const resolveAt = Math.floor(progress * text.length * 1.5);

  const output = text.split("").map((ch, i) => {
    if (i < resolveAt || ch === " ") return ch;
    const randIdx = Math.floor(random(`sc-${i}-${Math.floor(nowFrame / 2)}`) * chars.length);
    return chars[randIdx];
  }).join("");

  return <span style={{ fontFamily: MONO, ...style }}>{output}</span>;
};

// ── BINARY RAIN ─────────────────────────────────────────────────────────
// Matrix-style falling digits in background.
export const BinaryRain: React.FC<{
  tone?: Tone;
  density?: number;
  opacity?: number;
  speed?: number;
}> = ({ tone = "white", density = 22, opacity = 0.12, speed = 1 }) => {
  const { frame, width, height } = useMotion();
  const col = toneColor(tone);
  const cols = Array.from({ length: density });

  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden" }}>
      {cols.map((_, i) => {
        const colX = (i / density) * width + random(`br-x-${i}`) * 20;
        const colSpeed = 1 + random(`br-s-${i}`) * 2.6;
        const len = 6 + Math.floor(random(`br-l-${i}`) * 10);
        const y0 = random(`br-y-${i}`) * height;
        const drop = (frame * colSpeed * speed) % (height + 260);
        return (
          <div key={i} style={{
            position: "absolute",
            left: colX,
            top: (y0 + drop) % (height + 260) - 260,
            fontFamily: MONO,
            fontSize: 13,
            lineHeight: 1.35,
            color: col,
            opacity,
            writingMode: "vertical-rl",
            whiteSpace: "nowrap",
            textShadow: `0 0 6px ${col}`,
          }}>
            {Array.from({ length: len }).map((_, k) => (
              Math.round(random(`br-d-${i}-${k}-${Math.floor(frame / 15)}`))
            )).join(" ")}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ── NETWORK GRAPH ───────────────────────────────────────────────────────
// Animated nodes + edges. Edges fade in with stagger.
type Node = { id: string; x: number; y: number; size?: number; label?: string };
type Edge = { from: string; to: string; };

export const NetworkGraph: React.FC<{
  nodes: Node[];
  edges: Edge[];
  startFrame: number;
  tone?: Tone;
  width?: number;
  height?: number;
  nowFrame: number;
}> = ({ nodes, edges, startFrame, tone = "white", width = 700, height = 500, nowFrame }) => {
  const col = toneColor(tone);
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const pulse = Math.sin(nowFrame / 14) * 0.5 + 0.5;

  return (
    <svg width={width} height={height} style={{ display: "block", overflow: "visible" }}>
      <defs>
        <radialGradient id="ng-node">
          <stop offset="0%" stopColor={col} stopOpacity="1" />
          <stop offset="50%" stopColor={col} stopOpacity="0.6" />
          <stop offset="100%" stopColor={col} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Edges */}
      {edges.map((e, i) => {
        const a = byId.get(e.from); const b = byId.get(e.to);
        if (!a || !b) return null;
        const t = interpolate(nowFrame, [startFrame + i * 2, startFrame + i * 2 + 18], [0, 1], {
          extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut,
        });
        const x2 = a.x + (b.x - a.x) * t;
        const y2 = a.y + (b.y - a.y) * t;
        return (
          <g key={`${e.from}-${e.to}-${i}`}>
            <line x1={a.x} y1={a.y} x2={x2} y2={y2} stroke={col} strokeOpacity={0.5 * t} strokeWidth={1.2}
              strokeDasharray="4 3" style={{ filter: `drop-shadow(0 0 3px ${col}99)` }} />
            {/* Travelling ping */}
            {t < 1 && (
              <circle cx={x2} cy={y2} r={3} fill={col} style={{ filter: `drop-shadow(0 0 8px ${col})` }} />
            )}
          </g>
        );
      })}

      {/* Nodes */}
      {nodes.map((n, i) => {
        const t = interpolate(nowFrame, [startFrame + i * 3, startFrame + i * 3 + 14], [0, 1], {
          extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut,
        });
        const r = (n.size ?? 9) * t * (1 + pulse * 0.08);
        return (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r={r * 2.5} fill="url(#ng-node)" opacity={0.4 * t} />
            <circle cx={n.x} cy={n.y} r={r} fill={col} style={{ filter: `drop-shadow(0 0 8px ${col}AA)` }} />
            {n.label && (
              <text x={n.x} y={n.y + r + 18} fill={INK.text} fillOpacity={0.7 * t} fontSize={12}
                fontFamily={MONO} textAnchor="middle" letterSpacing="0.1em" style={{ textTransform: "uppercase" }}>
                {n.label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

// ── ODOMETER · digit roll ───────────────────────────────────────────────
export const Odometer: React.FC<{
  value: number;
  fromFrame: number;
  duration?: number;
  digits?: number;
  prefix?: string;
  suffix?: string;
  size?: number;
  color?: string;
  nowFrame: number;
}> = ({ value, fromFrame, duration = 40, digits = 0, prefix = "", suffix = "", size = 120, color = INK.text, nowFrame }) => {
  const t = interpolate(nowFrame, [fromFrame, fromFrame + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const current = value * t;
  const text = digits > 0 ? current.toFixed(digits) : Math.round(current).toString();

  return (
    <div style={{
      fontFamily: FONT,
      fontSize: size,
      fontWeight: 700,
      letterSpacing: "-0.04em",
      color,
      lineHeight: 1,
      fontVariantNumeric: "tabular-nums",
      textShadow: `0 0 30px ${color}44`,
      whiteSpace: "nowrap",
    }}>
      {prefix}{text}{suffix}
    </div>
  );
};

// ── PROGRESS BAR ────────────────────────────────────────────────────────
export const ProgressBar: React.FC<{
  value: number;      // 0..1 target
  fromFrame: number;
  duration?: number;
  width?: number;
  height?: number;
  tone?: Tone;
  label?: string;
  showValue?: boolean;
  nowFrame: number;
}> = ({ value, fromFrame, duration = 30, width = 420, height = 6, tone = "white", label, showValue = true, nowFrame }) => {
  const col = toneColor(tone);
  const t = interpolate(nowFrame, [fromFrame, fromFrame + duration], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut,
  });
  const progress = value * t;
  return (
    <div style={{ width, fontFamily: MONO }}>
      {(label || showValue) && (
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          {label && <span style={{ fontSize: 12, color: "rgba(245,245,240,0.5)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</span>}
          {showValue && <span style={{ fontSize: 12, color: col, fontWeight: 600 }}>{Math.round(progress * 100)}%</span>}
        </div>
      )}
      <div style={{ width: "100%", height, background: "rgba(255,255,255,0.06)", borderRadius: height, overflow: "hidden" }}>
        <div
          style={{
            width: `${progress * 100}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${col}AA 0%, ${col} 100%)`,
            borderRadius: height,
            boxShadow: `0 0 14px ${col}77`,
          }}
        />
      </div>
    </div>
  );
};

// ── LIGHTBAR · sweeping highlight ───────────────────────────────────────
export const Lightbar: React.FC<{
  startFrame: number;
  duration?: number;
  tone?: Tone;
  y?: number;
  height?: number;
  nowFrame: number;
}> = ({ startFrame, duration = 28, tone = "white", y = 540, height = 2, nowFrame }) => {
  const col = toneColor(tone);
  const { width } = useMotion();
  const t = interpolate(nowFrame, [startFrame, startFrame + duration], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut,
  });
  if (t <= 0) return null;
  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 4 }}>
      <div style={{
        position: "absolute",
        left: -width * 0.4 + t * (width * 1.8),
        top: y,
        width: width * 0.6,
        height,
        background: `linear-gradient(90deg, transparent, ${col}, transparent)`,
        opacity: 1 - Math.max(0, t - 0.6) * 2,
        boxShadow: `0 0 24px ${col}, 0 0 40px ${col}88`,
      }} />
    </AbsoluteFill>
  );
};

// ── CODE STREAM · terminal scrolling ────────────────────────────────────
export const CodeStream: React.FC<{
  lines: string[];
  startFrame: number;
  linePerFrames?: number;
  width?: number;
  height?: number;
  tone?: Tone;
  nowFrame: number;
}> = ({ lines, startFrame, linePerFrames = 10, width = 520, height = 360, tone = "white", nowFrame }) => {
  const col = toneColor(tone);
  const elapsed = Math.max(0, nowFrame - startFrame);
  const visibleCount = Math.min(lines.length, Math.floor(elapsed / linePerFrames));
  const visible = lines.slice(Math.max(0, visibleCount - 14), visibleCount);

  return (
    <div style={{
      width, height,
      background: "rgba(0,0,0,0.5)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 12,
      padding: 22,
      fontFamily: MONO,
      fontSize: 13,
      color: "rgba(245,245,240,0.8)",
      boxShadow: "inset 0 1px 1px rgba(255,255,255,0.06)",
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Terminal bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 28, borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", paddingLeft: 14, gap: 6, background: "rgba(255,255,255,0.015)" }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
        <span style={{ marginLeft: 14, fontSize: 10, color: "rgba(245,245,240,0.3)", letterSpacing: "0.2em" }}>cephalo ~</span>
      </div>
      <div style={{ marginTop: 30 }}>
        {visible.map((l, i) => {
          const isLast = i === visible.length - 1;
          const isCommand = l.startsWith("$");
          return (
            <div key={i} style={{
              color: isCommand ? col : "rgba(245,245,240,0.6)",
              opacity: isLast ? interpolate((nowFrame - startFrame) % linePerFrames, [0, linePerFrames], [0.3, 1]) : 1,
              lineHeight: 1.55,
              whiteSpace: "nowrap",
              textShadow: isCommand ? `0 0 5px ${col}AA` : undefined,
            }}>{l}</div>
          );
        })}
      </div>
    </div>
  );
};

// ── FLY-IN TOKENS · numbers flying across ──────────────────────────────
export const FlyingTokens: React.FC<{
  tokens: string[];
  startFrame: number;
  tone?: Tone;
  nowFrame: number;
}> = ({ tokens, startFrame, tone = "white", nowFrame }) => {
  const col = toneColor(tone);
  const { width, height } = useMotion();

  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden" }}>
      {tokens.map((tok, i) => {
        const yBase = random(`ft-y-${i}`) * height;
        const dur = 60 + random(`ft-d-${i}`) * 40;
        const startF = startFrame + i * 2 + random(`ft-s-${i}`) * 10;
        const t = interpolate(nowFrame, [startF, startF + dur], [0, 1], {
          extrapolateLeft: "clamp", extrapolateRight: "clamp",
        });
        if (t <= 0 || t >= 1) return null;
        const x = -100 + t * (width + 300);
        const size = 10 + random(`ft-sz-${i}`) * 10;
        const alpha = Math.sin(t * Math.PI) * 0.7;
        return (
          <div key={i} style={{
            position: "absolute",
            left: x,
            top: yBase,
            fontFamily: MONO,
            fontSize: size,
            color: col,
            opacity: alpha,
            textShadow: `0 0 8px ${col}`,
            letterSpacing: "0.1em",
          }}>
            {tok}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ── SPLIT REVEAL ────────────────────────────────────────────────────────
// Two halves slide apart revealing content.
export const SplitReveal: React.FC<{
  children: React.ReactNode;
  startFrame: number;
  duration?: number;
  nowFrame: number;
}> = ({ children, startFrame, duration = 24, nowFrame }) => {
  const t = interpolate(nowFrame, [startFrame, startFrame + duration], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut,
  });
  const topY = -50 * t;
  const bottomY = 50 * t;
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <div style={{
        position: "absolute", left: 0, right: 0, top: 0, height: "50%",
        transform: `translateY(${topY}%)`,
        background: INK.bg,
        zIndex: 5,
        transition: "transform 0.3s",
      }} />
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0, height: "50%",
        transform: `translateY(${bottomY}%)`,
        background: INK.bg,
        zIndex: 5,
      }} />
      {children}
    </AbsoluteFill>
  );
};

// ── KINETIC TEXT · letter-by-letter ─────────────────────────────────────
// Each character animates in individually.
export const KineticText: React.FC<{
  text: string;
  startFrame: number;
  perChar?: number;
  style?: React.CSSProperties;
  from?: "up" | "down" | "blur";
  nowFrame: number;
}> = ({ text, startFrame, perChar = 1.5, style, from = "up", nowFrame }) => {
  return (
    <div style={{ display: "inline-flex", overflow: "hidden", lineHeight: 1, ...style }}>
      {text.split("").map((ch, i) => {
        const t = interpolate(nowFrame, [startFrame + i * perChar, startFrame + i * perChar + 18], [0, 1], {
          extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut,
        });
        const y = from === "up" ? (1 - t) * 100 : from === "down" ? -(1 - t) * 100 : 0;
        const blur = from === "blur" ? (1 - t) * 10 : 0;
        return (
          <span key={i} style={{
            display: "inline-block",
            transform: `translateY(${y}%)`,
            opacity: t,
            filter: blur ? `blur(${blur}px)` : undefined,
            whiteSpace: ch === " " ? "pre" : "normal",
          }}>{ch}</span>
        );
      })}
    </div>
  );
};

// ── ICON GRID · staggered reveal ────────────────────────────────────────
export const IconGrid: React.FC<{
  items: { key: string; label: string; glyph: React.ReactNode }[];
  columns?: number;
  startFrame: number;
  tone?: Tone;
  tileSize?: number;
  nowFrame: number;
}> = ({ items, columns = 3, startFrame, tone = "white", tileSize = 140, nowFrame }) => {
  const col = toneColor(tone);
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, ${tileSize}px)`, gap: 14, fontFamily: FONT }}>
      {items.map((it, i) => {
        const t = interpolate(nowFrame, [startFrame + i * 3, startFrame + i * 3 + 18], [0, 1], {
          extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut,
        });
        return (
          <div key={it.key} style={{
            width: tileSize,
            height: tileSize,
            borderRadius: 14,
            border: `1px solid ${col}33`,
            background: `linear-gradient(160deg, ${col}12 0%, rgba(10,10,13,0) 100%)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            opacity: t,
            transform: `translateY(${(1 - t) * 16}px) scale(${0.9 + t * 0.1})`,
            boxShadow: `inset 0 1px 1px rgba(255,255,255,0.08), 0 0 18px ${col}18`,
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: `${col}22`, display: "flex", alignItems: "center", justifyContent: "center", color: col }}>
              {it.glyph}
            </div>
            <div style={{ fontSize: 12, color: "rgba(245,245,240,0.7)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{it.label}</div>
          </div>
        );
      })}
    </div>
  );
};

// ── CIRCULAR PROGRESS ───────────────────────────────────────────────────
export const CircularProgress: React.FC<{
  value: number;        // 0..1 target
  fromFrame: number;
  duration?: number;
  size?: number;
  strokeWidth?: number;
  tone?: Tone;
  label?: string;
  nowFrame: number;
}> = ({ value, fromFrame, duration = 36, size = 170, strokeWidth = 6, tone = "white", label, nowFrame }) => {
  const col = toneColor(tone);
  const t = interpolate(nowFrame, [fromFrame, fromFrame + duration], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut,
  });
  const progress = value * t;
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const dash = circ * progress;

  return (
    <div style={{ position: "relative", width: size, height: size, fontFamily: FONT }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={strokeWidth} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={col} strokeWidth={strokeWidth}
          strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 10px ${col})` }}
        />
      </svg>
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 4,
      }}>
        <div style={{ fontSize: 34, fontWeight: 700, color: INK.text, letterSpacing: "-0.02em" }}>
          {Math.round(progress * 100)}%
        </div>
        {label && (
          <div style={{ fontSize: 10, color: "rgba(245,245,240,0.45)", letterSpacing: "0.22em", textTransform: "uppercase" }}>
            {label}
          </div>
        )}
      </div>
    </div>
  );
};

// ── VOLUME DUCK · helper to compute music volume with voiceover ─────────
// Returns a volume value that ducks (lowers) when in voiceover range.
export function duck(
  frame: number,
  segments: { start: number; end: number }[],
  base = 0.48,
  ducked = 0.14,
  fade = 10,
): number {
  for (const s of segments) {
    if (frame >= s.start - fade && frame <= s.end + fade) {
      // In or near voiceover range
      const fadeIn = interpolate(frame, [s.start - fade, s.start], [base, ducked], {
        extrapolateLeft: "clamp", extrapolateRight: "clamp",
      });
      const fadeOut = interpolate(frame, [s.end, s.end + fade], [ducked, base], {
        extrapolateLeft: "clamp", extrapolateRight: "clamp",
      });
      if (frame <= s.start) return fadeIn;
      if (frame >= s.end) return fadeOut;
      return ducked;
    }
  }
  return base;
}
