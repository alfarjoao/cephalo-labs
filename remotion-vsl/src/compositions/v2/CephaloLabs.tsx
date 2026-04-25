import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import {
  INK,
  PURPLE,
  FONT,
  MONO,
  easeOut,
  PolypusDashboard,
  KernelCompressionViz,
} from "../../primitives/cinematic";
import { Odometer } from "../../primitives/motion-graphics";

// ═════════════════════════════════════════════════════════════════════
//  VSL-02 · CEPHALO LABS · 40s @ 30fps · 1200 frames
//  Editorial · monolithic · reverent · celestial.
//  Purple used EXACTLY TWICE: underline 00:03-00:06, router dot @ 00:15.
// ═════════════════════════════════════════════════════════════════════

const BG = "#0A0A0A";
const TEXT = "#F5F5F0";
const MUTED = "#888880";

// Frame boundaries
const S1_END = 90;     // 0-3s cold open
const S2_END = 210;    // 3-7s anchor + purple underline
const S3_END = 300;    // 7-10s eyebrow
const S4_END = 540;    // 10-18s polypus UI
const S5_END = 750;    // 18-25s €400k odometer
const S6_END = 960;    // 25-32s kernel compression
// const S7_END = 1200;   // 32-40s wordmark + fade

function Scene({ children, opacity }: { children: React.ReactNode; opacity: number }) {
  if (opacity <= 0.001) return null;
  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 120,
        opacity,
      }}
    >
      {children}
    </AbsoluteFill>
  );
}

function S2_Anchor({ frame }: { frame: number }) {
  // Text appears frames 90-120 (1s), underline draws 120-165 (1.5s)
  const textA = interpolate(frame, [90, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const underW = interpolate(frame, [120, 165], [0, 480], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  return (
    <Scene opacity={1}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            fontFamily: FONT,
            fontSize: 120,
            fontWeight: 500,
            color: TEXT,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            opacity: textA,
          }}
        >
          We build intelligence.
        </div>
        <div
          style={{
            marginTop: 48,
            height: 1,
            width: underW,
            background: PURPLE,
            opacity: 0.5,
            boxShadow: `0 0 12px ${PURPLE}66`,
          }}
        />
      </div>
    </Scene>
  );
}

function S3_Eyebrow({ frame }: { frame: number }) {
  const a = interpolate(frame, [215, 245], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  return (
    <Scene opacity={a}>
      <div
        style={{
          fontFamily: MONO,
          fontSize: 14,
          color: TEXT,
          opacity: 0.7,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
        }}
      >
        A STUDIO. LISBON.
      </div>
    </Scene>
  );
}

function S4_Polypus({ frame }: { frame: number }) {
  const localStart = 300;
  const a = interpolate(frame, [localStart, localStart + 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  // Router dot pulse at frame 450 (second purple usage)
  const dotPulse = interpolate(frame, [445, 460, 475], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: a }}>
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 80,
          fontFamily: MONO,
          fontSize: 13,
          color: TEXT,
          opacity: 0.6,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
        }}
      >
        POLYPUS · DESKTOP AI ORCHESTRATOR
      </div>
      <div
        style={{
          position: "absolute",
          left: 60,
          right: 60,
          top: 60,
          bottom: 60,
          borderRadius: 24,
          border: `1px solid rgba(245,245,240,0.08)`,
          overflow: "hidden",
          padding: 40,
        }}
      >
        <PolypusDashboard nowFrame={frame} startAt={localStart + 10} />
      </div>
      {/* Purple router dot pulse */}
      {dotPulse > 0 && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "34%",
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: PURPLE,
            transform: `translate(-50%, -50%) scale(${1 + dotPulse * 1.5})`,
            opacity: dotPulse * 0.8,
            boxShadow: `0 0 40px ${PURPLE}`,
            pointerEvents: "none",
          }}
        />
      )}
    </AbsoluteFill>
  );
}

function S5_Pantheon({ frame }: { frame: number }) {
  const localStart = 540;
  const eyebrowA = interpolate(frame, [localStart, localStart + 22], [0, 1], {
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
        opacity: eyebrowA,
      }}
    >
      <div
        style={{
          fontFamily: MONO,
          fontSize: 13,
          color: MUTED,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          marginBottom: 30,
        }}
      >
        PANTHEON GROWTH · CASE
      </div>
      <Odometer
        value={400}
        prefix="€"
        suffix="K+"
        fromFrame={localStart}
        duration={90}
        nowFrame={frame}
        size={160}
        color={TEXT}
      />
      <div
        style={{
          fontFamily: FONT,
          fontSize: 22,
          color: MUTED,
          marginTop: 30,
          letterSpacing: "0.02em",
        }}
      >
        revenue · built · not projected
      </div>
    </AbsoluteFill>
  );
}

function S6_Kernel({ frame }: { frame: number }) {
  const localStart = 750;
  const a = interpolate(frame, [localStart, localStart + 22], [0, 1], {
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
        gap: 40,
        opacity: a,
      }}
    >
      <div
        style={{
          fontFamily: MONO,
          fontSize: 13,
          color: MUTED,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          marginBottom: 20,
        }}
      >
        KERNEL · OPTIMISATION LAYER · EARLY ACCESS
      </div>
      <KernelCompressionViz nowFrame={frame} startAt={localStart} />
    </AbsoluteFill>
  );
}

function S7_Wordmark({ frame }: { frame: number }) {
  const localStart = 960;
  const wordA = interpolate(frame, [localStart + 10, localStart + 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const ctaA = interpolate(frame, [localStart + 60, localStart + 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const fadeOut = interpolate(frame, [1170, 1200], [1, 0], {
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
          fontFamily: FONT,
          fontWeight: 600,
          fontSize: 180,
          color: TEXT,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          opacity: wordA,
          transform: `translateY(${(1 - wordA) * 8}px)`,
        }}
      >
        CEPHALO
      </div>
      <div
        style={{
          fontFamily: MONO,
          fontSize: 13,
          color: MUTED,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          marginTop: 110,
          opacity: ctaA,
        }}
      >
        cephalon.ai · Portugal · 2026
      </div>
    </AbsoluteFill>
  );
}

export const CephaloLabs: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: BG, color: INK.text, fontFamily: FONT }}>
      {frame >= S1_END && frame < S2_END && <S2_Anchor frame={frame} />}
      {frame >= S2_END && frame < S3_END && <S3_Eyebrow frame={frame} />}
      {frame >= S3_END && frame < S4_END && <S4_Polypus frame={frame} />}
      {frame >= S4_END && frame < S5_END && <S5_Pantheon frame={frame} />}
      {frame >= S5_END && frame < S6_END && <S6_Kernel frame={frame} />}
      {frame >= S6_END && <S7_Wordmark frame={frame} />}

      {/* TODO(audio): 40Hz drone start 00:00.5; piano C2 @00:04; whoosh @00:06.8; UI SFX @00:15; impact @00:22.5 (€400 reveal); compression 'schlink' @00:26; impact @00:33 (wordmark). VO takes 1-6. */}
    </AbsoluteFill>
  );
};
