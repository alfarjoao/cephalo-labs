import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { INK, MONO, FONT, easeOut, KernelCompressionViz } from "../../primitives/cinematic";
import { TypewriterText } from "../../primitives/motion-graphics";

// ═════════════════════════════════════════════════════════════════════
//  VSL-04 · KERNEL · 35s @ 30fps · 1050 frames
//  Industrial · monochrome · mono-typography-first · zero accent color.
//  One red frame at frame 57 (00:01.9) as only chromatic event.
// ═════════════════════════════════════════════════════════════════════

const BG = "#060608";
const TEXT = "#F5F5F0";
const MUTED = "#5A5A55";
const RED = "#E63946";

// Scene frame boundaries
const S1_END = 30;    // 00:00-00:01 cursor
const S2_END = 120;   // 00:01-00:04 type cmd + glitch
const S3_END = 330;   // 00:04-00:11 compression viz
const S4_END = 600;   // 00:11-00:20 4 pillars stagger
const S5_END = 840;   // 00:20-00:28 API bill odometer
const S6_END = 960;   // 00:28-00:32 diagram
// const S7_END = 1050; // 00:32-00:35 wordmark

const PILLARS = [
  { idx: "01", name: "TASK DECOMPOSITION", desc: "Break large tasks into micro-tasks." },
  { idx: "02", name: "INTELLIGENT MEMORY", desc: "Hot · warm · cold context cache." },
  { idx: "03", name: "TOKEN INTELLIGENCE", desc: "Compress redundant context automatically." },
  { idx: "04", name: "ADAPTIVE ROUTING",   desc: "Simple to local. Complex to Claude." },
];

function S1_Cursor({ frame }: { frame: number }) {
  const blink = Math.floor(frame / 15) % 2 === 0;
  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        top: 80,
        fontFamily: MONO,
        fontSize: 32,
        color: TEXT,
        opacity: blink ? 1 : 0.15,
      }}
    >
      ▋
    </div>
  );
}

function S2_Type({ frame }: { frame: number }) {
  // Type starts at frame 30, ends around frame 90; hold until 120
  const cmd = "> prompt.length = 12,842 tokens";
  const localFrame = frame - 30;
  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        top: 80,
        fontFamily: MONO,
        fontSize: 32,
        color: TEXT,
      }}
    >
      <TypewriterText
        text={cmd}
        startFrame={0}
        charsPerFrame={0.58}
        showCaret
        nowFrame={localFrame}
      />
    </div>
  );
}

function RedGlitch({ frame }: { frame: number }) {
  // Exactly 1 frame at frame 57
  if (frame !== 57) return null;
  return (
    <AbsoluteFill
      style={{
        background: RED,
        mixBlendMode: "screen",
        opacity: 0.85,
        zIndex: 20,
        pointerEvents: "none",
      }}
    />
  );
}

function S3_Compression({ frame }: { frame: number }) {
  const localStart = 120;
  const a = interpolate(frame, [localStart, localStart + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const pct = interpolate(
    frame,
    [localStart + 14, localStart + 150],
    [0, 85],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut }
  );
  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
        opacity: a,
      }}
    >
      <KernelCompressionViz nowFrame={frame} startAt={localStart} />
      <div
        style={{
          fontFamily: MONO,
          fontSize: 24,
          color: TEXT,
          letterSpacing: "0.15em",
          marginTop: 30,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        −{Math.round(pct)}%
      </div>
      <div
        style={{
          fontFamily: MONO,
          fontSize: 14,
          color: MUTED,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginTop: 6,
        }}
      >
        same output. same quality.
      </div>
    </AbsoluteFill>
  );
}

function S4_Pillars({ frame }: { frame: number }) {
  const localStart = 330;
  return (
    <AbsoluteFill
      style={{
        padding: "180px 160px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 34,
      }}
    >
      {PILLARS.map((p, i) => {
        const enter = localStart + i * 22;
        const t = interpolate(frame, [enter, enter + 22], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: easeOut,
        });
        return (
          <div
            key={p.idx}
            style={{
              display: "grid",
              gridTemplateColumns: "60px 400px 40px 1fr",
              gap: 32,
              alignItems: "baseline",
              opacity: t,
              transform: `translateX(${(1 - t) * 20}px)`,
              filter: `blur(${(1 - t) * 4}px)`,
            }}
          >
            <span
              style={{
                fontFamily: MONO,
                fontSize: 13,
                color: MUTED,
                letterSpacing: "0.2em",
              }}
            >
              {p.idx}
            </span>
            <span
              style={{
                fontFamily: FONT,
                fontSize: 32,
                fontWeight: 500,
                color: TEXT,
                letterSpacing: "-0.01em",
              }}
            >
              {p.name}
            </span>
            <span style={{ fontFamily: MONO, fontSize: 18, color: MUTED }}>
              —
            </span>
            <span
              style={{
                fontFamily: MONO,
                fontSize: 14,
                color: "rgba(245,245,240,0.6)",
                letterSpacing: "0.02em",
              }}
            >
              {p.desc}
            </span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
}

function S5_Bill({ frame }: { frame: number }) {
  const localStart = 600;
  const a = interpolate(frame, [localStart, localStart + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  // Count down $4,200 → $1,260
  const v = interpolate(frame, [localStart + 14, localStart + 120], [4200, 1260], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: a,
      }}
    >
      <div
        style={{
          fontFamily: MONO,
          fontSize: 12,
          color: MUTED,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          marginBottom: 40,
        }}
      >
        MONTHLY · API SPEND
      </div>
      <div
        style={{
          fontFamily: MONO,
          fontSize: 140,
          fontWeight: 500,
          color: TEXT,
          letterSpacing: "-0.02em",
          lineHeight: 1,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        ${Math.round(v).toLocaleString("en-US")}
      </div>
      <div
        style={{
          fontFamily: MONO,
          fontSize: 18,
          color: "rgba(245,245,240,0.7)",
          letterSpacing: "0.1em",
          marginTop: 40,
        }}
      >
        70% less · same quality · money back
      </div>
    </AbsoluteFill>
  );
}

function S6_Diagram({ frame }: { frame: number }) {
  const localStart = 840;
  const a = interpolate(frame, [localStart + 5, localStart + 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const Box: React.FC<{ label: string }> = ({ label }) => (
    <div
      style={{
        width: 220,
        height: 80,
        border: `1px solid rgba(245,245,240,0.25)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: MONO,
        fontSize: 20,
        color: TEXT,
        letterSpacing: "0.08em",
        background: "rgba(255,255,255,0.015)",
      }}
    >
      {label}
    </div>
  );
  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
        opacity: a,
      }}
    >
      <Box label="[YOUR APP]" />
      <span style={{ fontFamily: MONO, fontSize: 36, color: MUTED }}>→</span>
      <Box label="[KERNEL]" />
      <span style={{ fontFamily: MONO, fontSize: 36, color: MUTED }}>→</span>
      <Box label="[MODELS]" />
    </AbsoluteFill>
  );
}

function S7_Wordmark({ frame }: { frame: number }) {
  const localStart = 960;
  const wordA = interpolate(frame, [localStart + 5, localStart + 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const ctaA = interpolate(frame, [localStart + 45, localStart + 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const fadeOut = interpolate(frame, [1030, 1050], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: fadeOut,
      }}
    >
      <div
        style={{
          fontFamily: MONO,
          fontWeight: 600,
          fontSize: 140,
          color: TEXT,
          letterSpacing: "0.02em",
          lineHeight: 1,
          opacity: wordA,
          transform: `translateY(${(1 - wordA) * 10}px)`,
        }}
      >
        KERNEL
      </div>
      <div
        style={{
          fontFamily: MONO,
          fontSize: 14,
          color: MUTED,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          marginTop: 90,
          opacity: ctaA,
        }}
      >
        EARLY ACCESS · HELLO@CEPHALON.AI
      </div>
    </AbsoluteFill>
  );
}

export const Kernel: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: BG, color: INK.text, fontFamily: MONO }}>
      {/* Scene gating — single composition, scenes appear within their windows */}
      {frame < S1_END && <S1_Cursor frame={frame} />}
      {frame >= S1_END && frame < S2_END && <S2_Type frame={frame} />}
      <RedGlitch frame={frame} />
      {frame >= S2_END && frame < S3_END && <S3_Compression frame={frame} />}
      {frame >= S3_END && frame < S4_END && <S4_Pillars frame={frame} />}
      {frame >= S4_END && frame < S5_END && <S5_Bill frame={frame} />}
      {frame >= S5_END && frame < S6_END && <S6_Diagram frame={frame} />}
      {frame >= S6_END && <S7_Wordmark frame={frame} />}

      {/* TODO(audio): 50Hz drone 0-1050; red-glitch crush SFX @57; compression 'schlink' @120; pillar ticks; coin drop @720; whoosh @845. VO takes 1-10 via Remotion <Audio>. See brief §6-7. */}
    </AbsoluteFill>
  );
};
