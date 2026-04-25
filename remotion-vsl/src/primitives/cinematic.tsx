import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  Easing,
  useCurrentFrame,
  useVideoConfig,
  random,
} from "remotion";

// ── TOKENS ──────────────────────────────────────────────────────────────

export const INK = {
  bg: "#060608",
  mid: "#0A0A0D",
  surf: "#11131A",
  line: "rgba(255,255,255,0.10)",
  lineSoft: "rgba(255,255,255,0.05)",
  text: "#F5F5F0",
  muted: "rgba(245,245,240,0.55)",
  dim: "rgba(245,245,240,0.28)",
};

export const PURPLE = "#C084FC";
export const PURPLE_DEEP = "#7C3AED";
export const GOLD = "#B68B4A";
export const GOLD_SOFT = "#D4AD70";

export const FONT = "'Geist', 'DM Sans', 'Inter', system-ui, sans-serif";
export const MONO = "'Geist Mono', 'JetBrains Mono', ui-monospace, monospace";

export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);

// ── MOTION HELPERS ─────────────────────────────────────────────────────

export const S = (seconds: number) => Math.round(seconds * 30); // @30fps

export function appear(
  frame: number,
  start: number,
  duration = 20
): { opacity: number; y: number; scale: number; blur: number } {
  const p = interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  return {
    opacity: p,
    y: (1 - p) * 24,
    scale: 0.96 + p * 0.04,
    blur: (1 - p) * 6,
  };
}

export function between(
  frame: number,
  inStart: number,
  inDur: number,
  outEnd: number,
  outDur: number
): number {
  const fi = interpolate(frame, [inStart, inStart + Math.max(1, inDur)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  if (outDur <= 0) return frame <= outEnd ? fi : 0;
  const fo = interpolate(frame, [outEnd - outDur, outEnd], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  return Math.min(fi, fo);
}

export function stagger(
  frame: number,
  base: number,
  i: number,
  step = 4,
  dur = 22
) {
  return appear(frame, base + i * step, dur);
}

export function useMotion() {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();
  return { frame, fps, width, height, durationInFrames };
}

// ── STARFIELD ──────────────────────────────────────────────────────────

export const Starfield: React.FC<{
  count?: number;
  tone?: "white" | "gold" | "purple";
  intensity?: number;
  direction?: "up" | "down" | "none";
}> = ({ count = 140, tone = "white", intensity = 1, direction = "up" }) => {
  const { frame, width, height } = useMotion();

  const col =
    tone === "gold" ? GOLD : tone === "purple" ? PURPLE : "#F5F5F0";

  const stars = Array.from({ length: count }, (_, i) => {
    const sx = random(`sx-${i}`) * width;
    const sy0 = random(`sy-${i}`) * height;
    const speed = 0.2 + random(`sp-${i}`) * 0.9;
    const size = 0.5 + random(`sz-${i}`) * 1.9;
    const phase = random(`ph-${i}`) * Math.PI * 2;
    const dy =
      direction === "up"
        ? -(frame * speed) % height
        : direction === "down"
        ? (frame * speed) % height
        : 0;
    const y = ((sy0 + dy) % height + height) % height;
    const twinkle = 0.4 + 0.6 * Math.abs(Math.sin(frame / 18 + phase));
    const alpha = twinkle * 0.9 * intensity;
    return (
      <div
        key={i}
        style={{
          position: "absolute",
          left: sx,
          top: y,
          width: size,
          height: size,
          borderRadius: "50%",
          background: col,
          opacity: alpha,
          boxShadow: size > 1.5 ? `0 0 ${size * 4}px ${col}` : "none",
        }}
      />
    );
  });

  return <AbsoluteFill style={{ pointerEvents: "none" }}>{stars}</AbsoluteFill>;
};

// ── GOD RAYS ────────────────────────────────────────────────────────────

export const GodRays: React.FC<{
  tone?: "white" | "gold" | "purple";
  intensity?: number;
  beams?: number;
}> = ({ tone = "white", intensity = 1, beams = 3 }) => {
  const { frame, width } = useMotion();
  const col = tone === "gold" ? GOLD : tone === "purple" ? PURPLE : "#FFFFFF";
  return (
    <AbsoluteFill style={{ pointerEvents: "none", mixBlendMode: "screen" }}>
      {Array.from({ length: beams }).map((_, i) => {
        const x = (width * (i + 1)) / (beams + 1);
        const phase = i * 0.7;
        const sway = Math.sin(frame / 70 + phase) * 22;
        const alpha = (0.10 + 0.05 * Math.sin(frame / 60 + phase)) * intensity;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x + sway - 140,
              top: -200,
              width: 280,
              height: 1400,
              background: `linear-gradient(180deg, ${col}${Math.round(alpha * 255)
                .toString(16)
                .padStart(2, "0")} 0%, transparent 70%)`,
              filter: "blur(42px)",
              transform: `rotate(${-6 + i * 3}deg)`,
              transformOrigin: "top center",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// ── HORIZON · curved glow line at bottom ───────────────────────────────

export const Horizon: React.FC<{
  tone?: "white" | "gold" | "purple";
  strength?: number;
}> = ({ tone = "white", strength = 1 }) => {
  const col = tone === "gold" ? GOLD : tone === "purple" ? PURPLE : "#FFFFFF";
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {/* Horizon glow */}
      <div
        style={{
          position: "absolute",
          bottom: -620,
          left: "50%",
          transform: "translateX(-50%)",
          width: 2600,
          height: 1200,
          borderRadius: "50%",
          background: `radial-gradient(circle at 50% 0%, ${col}${Math.round(
            0.25 * strength * 255
          )
            .toString(16)
            .padStart(2, "0")} 0%, transparent 45%)`,
          filter: "blur(8px)",
        }}
      />
      {/* Horizon line */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: "50%",
          transform: "translateX(-50%)",
          width: 2400,
          height: 800,
          borderRadius: "50%",
          border: `1px solid ${col}22`,
          opacity: strength,
        }}
      />
    </AbsoluteFill>
  );
};

// ── GRID FLOOR · perspective grid ──────────────────────────────────────

export const GridFloor: React.FC<{
  tone?: "white" | "gold" | "purple";
  opacity?: number;
}> = ({ tone = "white", opacity = 0.08 }) => {
  const { frame } = useMotion();
  const col = tone === "gold" ? GOLD : tone === "purple" ? PURPLE : "#FFFFFF";
  const offset = (frame / 2) % 80;
  return (
    <AbsoluteFill style={{ perspective: 900, pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: `translateX(-50%) rotateX(62deg) translateY(0px)`,
          width: 3200,
          height: 1800,
          backgroundImage:
            `linear-gradient(to right, ${col}${Math.round(opacity * 255)
              .toString(16)
              .padStart(2, "0")} 1px, transparent 1px),` +
            `linear-gradient(to bottom, ${col}${Math.round(opacity * 255)
              .toString(16)
              .padStart(2, "0")} 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          backgroundPosition: `0 ${offset}px`,
          opacity: 0.9,
          maskImage:
            "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)",
          WebkitMaskImage:
            "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)",
        }}
      />
    </AbsoluteFill>
  );
};

// ── VIGNETTE · edge darkening ──────────────────────────────────────────

export const Vignette: React.FC<{ strength?: number }> = ({ strength = 1 }) => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      background: `radial-gradient(ellipse at 50% 45%, transparent 30%, rgba(0,0,0,${
        0.55 * strength
      }) 100%)`,
    }}
  />
);

// ── GRAIN · film texture ───────────────────────────────────────────────

export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.04 }) => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      opacity,
      mixBlendMode: "overlay",
      backgroundImage:
        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.35 0'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")",
    }}
  />
);

// ── SPARKLE · 4-point star glyph ───────────────────────────────────────

export const Sparkle: React.FC<{
  size?: number;
  color?: string;
  opacity?: number;
}> = ({ size = 28, color = INK.text, opacity = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ opacity }}>
    <defs>
      <linearGradient id="spk" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity="1" />
        <stop offset="100%" stopColor={color} stopOpacity="0.55" />
      </linearGradient>
    </defs>
    <path
      d="M12 2 L13.6 9.4 L21 12 L13.6 14.6 L12 22 L10.4 14.6 L3 12 L10.4 9.4 Z"
      fill="url(#spk)"
    />
  </svg>
);

// ── WORDMARK · brand name with sparkle ─────────────────────────────────

export const Wordmark: React.FC<{
  name: string;
  accent?: string;
  size?: number;
  show?: number; // 0–1 progress
  showSparkle?: boolean;
}> = ({ name, accent = INK.text, size = 120, show = 1, showSparkle = true }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: size * 0.25,
        opacity: show,
        transform: `translateY(${(1 - show) * 14}px) scale(${0.96 + show * 0.04})`,
        filter: `blur(${(1 - show) * 6}px)`,
      }}
    >
      {showSparkle && (
        <Sparkle size={size * 0.38} color={accent} opacity={show} />
      )}
      <span
        style={{
          fontFamily: FONT,
          fontSize: size,
          fontWeight: 600,
          letterSpacing: "-0.04em",
          color: accent,
          lineHeight: 1,
        }}
      >
        {name}
      </span>
    </div>
  );
};

// ── FLOATING CARD · glass-morph panel with 3D tilt ─────────────────────

export const FloatingCard: React.FC<{
  children: React.ReactNode;
  show?: number;
  width?: number;
  height?: number;
  tiltX?: number;
  tiltY?: number;
  glow?: string;
  z?: number;
}> = ({
  children,
  show = 1,
  width = 680,
  height = 420,
  tiltX = -6,
  tiltY = -10,
  glow = "rgba(255,255,255,0.15)",
  z = 0,
}) => {
  return (
    <div
      style={{
        width,
        height,
        padding: 2,
        borderRadius: 24,
        background: "rgba(255,255,255,0.06)",
        boxShadow: `0 60px 120px -40px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 1px rgba(255,255,255,0.12)`,
        backdropFilter: "blur(8px)",
        transform: `perspective(1400px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(${z}px) translateY(${(1 - show) * 30}px)`,
        opacity: show,
        transformStyle: "preserve-3d",
        position: "relative",
      }}
    >
      {/* Glow behind */}
      <div
        style={{
          position: "absolute",
          inset: -80,
          background: `radial-gradient(ellipse at 50% 50%, ${glow} 0%, transparent 60%)`,
          filter: "blur(40px)",
          opacity: show * 0.9,
          pointerEvents: "none",
          zIndex: -1,
        }}
      />
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 22,
          background: "linear-gradient(160deg, #10111A 0%, #06070B 100%)",
          padding: 28,
          boxShadow: "inset 0 1px 1px rgba(255,255,255,0.10)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {children}
      </div>
    </div>
  );
};

// ── CHAT BUBBLE · with typewriter ──────────────────────────────────────

export const ChatBubble: React.FC<{
  text: string;
  name?: string;
  side?: "left" | "right";
  accent?: string;
  showFrom: number; // frame when bubble enters
  typeFor?: number; // frames to fully type
  nowFrame: number;
}> = ({
  text,
  name,
  side = "left",
  accent = INK.text,
  showFrom,
  typeFor = 30,
  nowFrame,
}) => {
  const a = appear(nowFrame, showFrom, 18);
  const typeProgress = interpolate(
    nowFrame,
    [showFrom + 12, showFrom + 12 + typeFor],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );
  const visibleChars = Math.floor(text.length * typeProgress);
  const caret = nowFrame % 20 < 10 && typeProgress < 1 ? "|" : "";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: side === "right" ? "row-reverse" : "row",
        alignItems: "flex-start",
        gap: 14,
        opacity: a.opacity,
        transform: `translateY(${a.y}px)`,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.06)",
          border: `1px solid ${accent}44`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          fontFamily: MONO,
          fontSize: 13,
          color: accent,
          fontWeight: 500,
        }}
      >
        {side === "right" ? "C" : "U"}
      </div>
      <div style={{ flex: 1 }}>
        {name && (
          <p
            style={{
              fontFamily: FONT,
              fontSize: 12,
              color: "rgba(245,245,240,0.35)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              margin: 0,
              marginBottom: 6,
            }}
          >
            {name}
          </p>
        )}
        <div
          style={{
            background:
              side === "right"
                ? `linear-gradient(135deg, ${accent}22 0%, ${accent}08 100%)`
                : "rgba(255,255,255,0.04)",
            border: `1px solid ${
              side === "right" ? accent + "40" : "rgba(255,255,255,0.10)"
            }`,
            padding: "14px 20px",
            borderRadius: 14,
            fontFamily: FONT,
            fontSize: 19,
            fontWeight: 400,
            color: INK.text,
            lineHeight: 1.5,
            minHeight: 54,
            display: "inline-block",
            maxWidth: 640,
          }}
        >
          {text.slice(0, visibleChars)}
          <span
            style={{
              display: "inline-block",
              width: 2,
              background: accent,
              opacity: caret ? 1 : 0,
              marginLeft: 2,
            }}
          >
            {caret}
          </span>
        </div>
      </div>
    </div>
  );
};

// ── CHIP / PILL ────────────────────────────────────────────────────────

export const Chip: React.FC<{
  label: string;
  accent?: string;
  show?: number;
  size?: "sm" | "md";
}> = ({ label, accent = INK.text, show = 1, size = "md" }) => {
  const px = size === "sm" ? 12 : 18;
  const py = size === "sm" ? 6 : 10;
  const fs = size === "sm" ? 13 : 16;
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: `${py}px ${px}px`,
        borderRadius: 999,
        background: `${accent}12`,
        border: `1px solid ${accent}44`,
        fontFamily: MONO,
        fontSize: fs,
        color: accent,
        letterSpacing: "0.05em",
        opacity: show,
        transform: `translateY(${(1 - show) * 10}px) scale(${0.94 + show * 0.06})`,
      }}
    >
      {label}
    </div>
  );
};

// ── EYEBROW LABEL ──────────────────────────────────────────────────────

export const Eyebrow: React.FC<{
  children: React.ReactNode;
  accent?: string;
  show?: number;
}> = ({ children, accent = INK.text, show = 1 }) => (
  <div
    style={{
      fontFamily: FONT,
      fontSize: 15,
      fontWeight: 500,
      letterSpacing: "0.3em",
      textTransform: "uppercase",
      color: accent,
      opacity: show * 0.5,
      transform: `translateY(${(1 - show) * 8}px)`,
    }}
  >
    {children}
  </div>
);

// ── NUMBER COUNT-UP ────────────────────────────────────────────────────

export const BigNumber: React.FC<{
  from?: number;
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  fromFrame: number;
  duration?: number;
  size?: number;
  color?: string;
  nowFrame: number;
}> = ({
  from = 0,
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  fromFrame,
  duration = 40,
  size = 120,
  color = INK.text,
  nowFrame,
}) => {
  const p = interpolate(nowFrame, [fromFrame, fromFrame + duration], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const text =
    decimals > 0
      ? p.toFixed(decimals)
      : Math.round(p).toLocaleString("en-US");
  const a = appear(nowFrame, fromFrame, 18);
  return (
    <span
      style={{
        fontFamily: FONT,
        fontSize: size,
        fontWeight: 700,
        color,
        letterSpacing: "-0.04em",
        lineHeight: 1,
        fontVariantNumeric: "tabular-nums",
        opacity: a.opacity,
        display: "inline-block",
        transform: `translateY(${a.y}px)`,
      }}
    >
      {prefix}
      {text}
      {suffix}
    </span>
  );
};

// ── DASHBOARD MOCKUP · Polypus-style UI ────────────────────────────────

export const PolypusDashboard: React.FC<{ nowFrame: number; startAt: number }>
  = ({ nowFrame, startAt }) => {
  const typingProgress = interpolate(
    nowFrame,
    [startAt + 14, startAt + 56],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const txt = "How should we scale our AI operations?";
  const typed = txt.slice(0, Math.floor(txt.length * typingProgress));

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateColumns: "220px 1fr",
        gap: 14,
        color: INK.text,
        fontFamily: FONT,
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          background: "rgba(255,255,255,0.02)",
          borderRadius: 14,
          border: "1px solid rgba(255,255,255,0.06)",
          padding: 14,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
          <div style={{ width: 22, height: 22, borderRadius: 7, background: PURPLE, boxShadow: `0 0 20px ${PURPLE}99` }} />
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.04em" }}>Polypus</span>
        </div>
        {["Dashboard", "Agents", "Memory", "Models", "Settings"].map((l, i) => (
          <div
            key={l}
            style={{
              padding: "8px 10px",
              borderRadius: 8,
              marginBottom: 3,
              background: i === 1 ? `${PURPLE}15` : "transparent",
              border: i === 1 ? `1px solid ${PURPLE}35` : "1px solid transparent",
              fontSize: 12,
              color: i === 1 ? PURPLE : "rgba(245,245,240,0.6)",
            }}
          >
            {l}
          </div>
        ))}
        <div style={{ marginTop: 20, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 14 }}>
          <p style={{ fontSize: 10, color: "rgba(245,245,240,0.3)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
            ACTIVE AGENTS · 4
          </p>
          {["Research", "Code", "Write", "Reduce"].map((a, i) => (
            <div key={a} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: PURPLE, opacity: 0.8 }} />
              <span style={{ fontSize: 11, color: "rgba(245,245,240,0.55)" }}>{a}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <p style={{ fontSize: 18, fontWeight: 500, margin: 0, letterSpacing: "-0.01em" }}>
            New task
          </p>
          <span
            style={{
              fontFamily: MONO,
              fontSize: 11,
              color: PURPLE,
              background: `${PURPLE}12`,
              padding: "3px 8px",
              borderRadius: 6,
              border: `1px solid ${PURPLE}33`,
            }}
          >
            Routing · Sonnet
          </span>
        </div>

        {/* Input box */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 10,
            padding: "12px 16px",
            minHeight: 46,
            display: "flex",
            alignItems: "center",
            fontSize: 15,
            color: INK.text,
            position: "relative",
          }}
        >
          <span>
            {typed}
            {nowFrame % 20 < 10 && typingProgress < 1 && (
              <span style={{ borderLeft: `2px solid ${PURPLE}`, marginLeft: 1 }}>&nbsp;</span>
            )}
          </span>
        </div>

        {/* Model row */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["Haiku · fast", "Sonnet · active", "Opus · reserved"].map((m, i) => (
            <div
              key={m}
              style={{
                fontFamily: MONO,
                fontSize: 11,
                padding: "5px 10px",
                borderRadius: 6,
                background: i === 1 ? `${PURPLE}18` : "rgba(255,255,255,0.04)",
                border: i === 1 ? `1px solid ${PURPLE}55` : "1px solid rgba(255,255,255,0.08)",
                color: i === 1 ? PURPLE : "rgba(245,245,240,0.5)",
              }}
            >
              {m}
            </div>
          ))}
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 8,
            marginTop: "auto",
          }}
        >
          {[
            { k: "Tokens saved", v: "72%", c: PURPLE },
            { k: "Agents live", v: "4", c: "#A78BFA" },
            { k: "Latency", v: "1.4s", c: "#8B5CF6" },
          ].map((s) => (
            <div
              key={s.k}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 10,
                padding: 10,
              }}
            >
              <p
                style={{
                  fontSize: 10,
                  color: "rgba(245,245,240,0.35)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  margin: 0,
                  marginBottom: 4,
                }}
              >
                {s.k}
              </p>
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: 22,
                  fontWeight: 600,
                  color: s.c,
                  margin: 0,
                  letterSpacing: "-0.02em",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {s.v}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── DASHBOARD MOCKUP · Pantheon-style with charts ──────────────────────

export const PantheonDashboard: React.FC<{ nowFrame: number; startAt: number }>
  = ({ nowFrame, startAt }) => {
  const barGrow = interpolate(
    nowFrame,
    [startAt + 14, startAt + 50],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut }
  );
  const bars = [62, 78, 45, 92, 70, 84, 96];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateColumns: "200px 1fr",
        gap: 14,
        color: INK.text,
        fontFamily: FONT,
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          background: "rgba(255,255,255,0.02)",
          borderRadius: 14,
          border: "1px solid rgba(255,255,255,0.06)",
          padding: 14,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
          <div style={{ width: 22, height: 22, borderRadius: 7, background: GOLD, boxShadow: `0 0 18px ${GOLD}99` }} />
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.04em" }}>Pantheon OS</span>
        </div>
        {["Pipeline", "Clients", "War Room", "Analytics", "Agents"].map((l, i) => (
          <div
            key={l}
            style={{
              padding: "8px 10px",
              borderRadius: 8,
              marginBottom: 3,
              background: i === 3 ? `${GOLD}15` : "transparent",
              border: i === 3 ? `1px solid ${GOLD}35` : "1px solid transparent",
              fontSize: 12,
              color: i === 3 ? GOLD : "rgba(245,245,240,0.6)",
            }}
          >
            {l}
          </div>
        ))}
        <div style={{ marginTop: 20, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 14 }}>
          <p style={{ fontSize: 10, color: "rgba(245,245,240,0.3)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
            AGENTS · 5 / 24h
          </p>
          {["Lead scout", "Outreach", "Proposals", "Analytics", "Delivery"].map((a) => (
            <div key={a} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: GOLD, opacity: 0.8 }} />
              <span style={{ fontSize: 11, color: "rgba(245,245,240,0.55)" }}>{a}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {/* KPI row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {[
            { k: "Revenue · 30d", v: "$48.2K", c: GOLD },
            { k: "ROAS", v: "4.6×", c: "#D4AD70" },
            { k: "Conversion", v: "3.1%", c: "#B68B4A" },
          ].map((s) => (
            <div
              key={s.k}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 10,
                padding: 10,
              }}
            >
              <p
                style={{
                  fontSize: 10,
                  color: "rgba(245,245,240,0.35)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  margin: 0,
                  marginBottom: 4,
                }}
              >
                {s.k}
              </p>
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: 22,
                  fontWeight: 600,
                  color: s.c,
                  margin: 0,
                  letterSpacing: "-0.02em",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {s.v}
              </p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 12,
            padding: 18,
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <p style={{ fontSize: 13, margin: 0, fontWeight: 500 }}>Pipeline velocity</p>
            <p style={{ fontSize: 11, color: "rgba(245,245,240,0.4)", margin: 0, fontFamily: MONO }}>
              Last 7 days
            </p>
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "flex-end",
              gap: 10,
              paddingTop: 8,
            }}
          >
            {bars.map((b, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${b * barGrow}%`,
                  background: `linear-gradient(180deg, ${GOLD} 0%, ${GOLD}66 100%)`,
                  borderRadius: "4px 4px 0 0",
                  boxShadow: `0 -8px 16px ${GOLD}22`,
                }}
              />
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <div
                key={d}
                style={{
                  flex: 1,
                  fontSize: 10,
                  color: "rgba(245,245,240,0.3)",
                  textAlign: "center",
                  fontFamily: MONO,
                }}
              >
                {d}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── KERNEL compression viz ─────────────────────────────────────────────

export const KernelCompressionViz: React.FC<{ nowFrame: number; startAt: number }>
  = ({ nowFrame, startAt }) => {
  const shrink = interpolate(
    nowFrame,
    [startAt + 14, startAt + 38],
    [1, 0.3],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut }
  );
  const a = appear(nowFrame, startAt, 18);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 40,
        opacity: a.opacity,
        transform: `translateY(${a.y}px)`,
      }}
    >
      {/* Before */}
      <div style={{ textAlign: "center" }}>
        <p
          style={{
            fontFamily: MONO,
            fontSize: 13,
            color: "rgba(245,245,240,0.35)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          Before
        </p>
        <div
          style={{
            width: 240 * 1,
            height: 80,
            background: `linear-gradient(90deg, ${GOLD}44 0%, ${GOLD}11 100%)`,
            border: `1px solid ${GOLD}33`,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: MONO,
            fontSize: 18,
            color: GOLD,
            transition: "all 0.2s",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          5,000 tokens
        </div>
      </div>

      {/* Arrow + label */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <p
          style={{
            fontFamily: MONO,
            fontSize: 12,
            color: GOLD,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          KERNEL
        </p>
        <p style={{ fontSize: 40, color: GOLD, margin: 0, lineHeight: 1 }}>→</p>
        <p
          style={{
            fontFamily: MONO,
            fontSize: 11,
            color: "rgba(245,245,240,0.4)",
            margin: 0,
            letterSpacing: "0.12em",
          }}
        >
          -70% tokens
        </p>
      </div>

      {/* After */}
      <div style={{ textAlign: "center" }}>
        <p
          style={{
            fontFamily: MONO,
            fontSize: 13,
            color: "rgba(245,245,240,0.35)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          After
        </p>
        <div
          style={{
            width: 240 * shrink,
            height: 80,
            background: `linear-gradient(90deg, ${GOLD} 0%, ${GOLD}99 100%)`,
            border: `1px solid ${GOLD}AA`,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: MONO,
            fontSize: 18,
            color: "#0A0A0A",
            boxShadow: `0 10px 30px -10px ${GOLD}AA`,
            fontWeight: 600,
            fontVariantNumeric: "tabular-nums",
            transition: "all 0.2s",
          }}
        >
          1,500 tokens
        </div>
      </div>
    </div>
  );
};

// ── WATERMARK · tiny label bottom-left ─────────────────────────────────

export const Watermark: React.FC<{ text?: string }> = ({ text = "CEPHALO" }) => (
  <div
    style={{
      position: "absolute",
      bottom: 38,
      left: 48,
      fontFamily: FONT,
      fontSize: 14,
      color: "rgba(245,245,240,0.22)",
      letterSpacing: "0.3em",
      textTransform: "uppercase",
      fontWeight: 500,
      zIndex: 10,
    }}
  >
    {text}
  </div>
);

export const FrameLabel: React.FC<{ text: string }> = ({ text }) => (
  <div
    style={{
      position: "absolute",
      bottom: 38,
      right: 48,
      fontFamily: MONO,
      fontSize: 13,
      color: "rgba(245,245,240,0.2)",
      letterSpacing: "0.25em",
      textTransform: "uppercase",
      zIndex: 10,
    }}
  >
    {text}
  </div>
);

// ── SCENE WRAPPER · show/hide with position ────────────────────────────

export const Scene: React.FC<{
  children: React.ReactNode;
  opacity: number;
  style?: React.CSSProperties;
}> = ({ children, opacity, style }) => {
  if (opacity <= 0.001) return null;
  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 120,
        opacity,
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
