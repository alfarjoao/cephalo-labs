import "@fontsource/geist-sans/400.css";
import "@fontsource/geist-sans/500.css";
import "@fontsource/geist-mono/400.css";
import "@fontsource/geist-mono/500.css";
import "@fontsource/geist-mono/600.css";

import React from "react";
import {
  AbsoluteFill,
  Series,
  interpolate,
  useCurrentFrame,
} from "remotion";

import {
  FONT,
  MONO,
  easeOut,
  KernelCompressionViz,
} from "../../primitives/cinematic";
import { TypewriterText } from "../../primitives/motion-graphics";

// ═════════════════════════════════════════════════════════════════════════
//  VSL-04 · KERNEL · 35.0s @ 30fps · 1920×1080 · 1050 frames
//
//  Industrial · monochrome · mechanical. Mono-typography-first.
//  Single red frame at frame 57 (00:01.9) is the only chromatic event.
//
//  Brief: C:/Business/claude/apps/CEPHALO/vsl-briefs/vsl-04-kernel.md
//  Reference quality bar: src/compositions/v3/Showcase.tsx
// ═════════════════════════════════════════════════════════════════════════

// ── Kernel-only token overrides (brief §2 — DO NOT use INK.bg / INK.muted)
const BG = "#060608";
const TEXT = "#F5F5F0";
const MUTED = "#5A5A55";
const RED = "#E63946";

// Total composition length (35s @ 30fps)
export const KERNEL_DURATION = 1050;

// Scene boundaries (absolute frames)
const F = {
  cursorEnd: 30,        // Scene 1 end — cursor blink only
  typeEnd: 120,         // Scene 2 end — typewriter line + glitch
  compressionEnd: 330,  // Scene 3 end — KernelCompressionViz
  pillarsEnd: 600,      // Scene 4 end — 4 pillars stagger
  billEnd: 840,         // Scene 5 end — odometer
  diagramEnd: 960,      // Scene 6 end — APP→KERNEL→MODELS
  // Scene 7: 960..1050 — wordmark + CTA + master fade
  redGlitch: 57,        // 00:01.9s · single-frame red tint
} as const;

// ── Scene 1 · Cursor blink (0–30) ─────────────────────────────────────────
const S1_Cursor: React.FC = () => {
  const frame = useCurrentFrame();
  const blinkOn = Math.floor(frame / 15) % 2 === 0;
  return (
    <AbsoluteFill style={{ background: BG }}>
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 80,
          fontFamily: MONO,
          fontWeight: 400,
          fontSize: 32,
          color: TEXT,
          opacity: blinkOn ? 1 : 0.12,
          lineHeight: 1,
        }}
      >
        ▋
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 2 · Typewriter line + single red glitch (30–120) ────────────────
const S2_Type: React.FC = () => {
  const frame = useCurrentFrame(); // local: 0..89  (global 30..119)
  // Brief: ~16 chars/sec mechanical = 0.533 chars/frame at 30fps.
  // String length = 31 chars → fully typed by ~frame 58 local (global 88).
  const cmd = "> prompt.length = 12,842 tokens";
  // The single red frame fires at GLOBAL frame 57 → local frame 27.
  const isRedFrame = frame === 27;

  return (
    <AbsoluteFill style={{ background: BG }}>
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 80,
          fontFamily: MONO,
          fontWeight: 400,
          fontSize: 32,
          color: TEXT,
          letterSpacing: 0,
          lineHeight: 1.1,
        }}
      >
        <TypewriterText
          text={cmd}
          startFrame={0}
          charsPerFrame={0.533}
          showCaret
          nowFrame={frame}
        />
      </div>

      {/* Single-frame red glitch — entire frame tints #E63946. Brief §2 + §8.
          Acceptance criterion: EXACTLY one frame, never two. */}
      {isRedFrame && (
        <AbsoluteFill
          style={{
            background: RED,
            opacity: 1,
            zIndex: 50,
            pointerEvents: "none",
          }}
        />
      )}
    </AbsoluteFill>
  );
};

// ── Scene 3 · Compression viz 12,842 → 1,928 (120–330) ────────────────────
//
// We REUSE the existing KernelCompressionViz primitive (per task brief),
// then render brief-spec numbers + counter ON TOP. The primitive's gold
// gradient is desaturated to monochrome via CSS filter — Kernel's
// zero-accent rule (brief §2) overrides the primitive's CEPHALO palette.
const S3_Compression: React.FC = () => {
  const frame = useCurrentFrame(); // local 0..209 (global 120..329)

  // Counter 0% → -85% over local 14..150 (synced with primitive's shrink window)
  const pct = interpolate(frame, [14, 150], [0, 85], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

  // Big numbers 12,842 → 1,928 over the same window
  const tokens = interpolate(frame, [14, 150], [12842, 1928], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

  return (
    <AbsoluteFill style={{ background: BG }}>
      {/* Big tokens readout — 96pt mono, brief §8 typography table */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 36,
        }}
      >
        <div
          style={{
            fontFamily: MONO,
            fontWeight: 600,
            fontSize: 96,
            color: TEXT,
            letterSpacing: "-0.01em",
            lineHeight: 1,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {Math.round(tokens).toLocaleString("en-US")} <span style={{ color: MUTED, fontSize: 36, letterSpacing: "0.2em" }}>TOKENS</span>
        </div>

        {/* Underlying primitive (desaturated to honour Kernel monochrome) */}
        <div
          style={{
            filter: "grayscale(1) brightness(1.15) contrast(1.05)",
            opacity: 0.85,
          }}
        >
          <KernelCompressionViz nowFrame={frame} startAt={0} />
        </div>

        {/* -85% counter, top-right of viz region (brief: top-right) */}
        <div
          style={{
            fontFamily: MONO,
            fontWeight: 500,
            fontSize: 40,
            color: TEXT,
            letterSpacing: 0,
            fontVariantNumeric: "tabular-nums",
            marginTop: 8,
          }}
        >
          −{Math.round(pct)}%
        </div>

        {/* Subtitle — y-offset +180 from viz centre, 14pt muted (brief §4) */}
        <div
          style={{
            fontFamily: MONO,
            fontWeight: 400,
            fontSize: 14,
            color: MUTED,
            letterSpacing: "0.15em",
            marginTop: 20,
          }}
        >
          same output. same quality.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── Scene 4 · 4 pillars vertical stagger (330–600) ────────────────────────
const PILLARS = [
  { idx: "01", name: "TASK DECOMPOSITION", desc: "Break large tasks into micro-tasks." },
  { idx: "02", name: "INTELLIGENT MEMORY", desc: "Hot · warm · cold context cache." },
  { idx: "03", name: "TOKEN INTELLIGENCE", desc: "Compress redundant context automatically." },
  { idx: "04", name: "ADAPTIVE ROUTING",   desc: "Simple to local. Complex to Claude." },
];

const S4_Pillars: React.FC = () => {
  const frame = useCurrentFrame(); // local 0..269 (global 330..599)

  // Brief motion plan: pillars enter at frames 340, 362, 384, 406
  // (relative to scene start = 330, so locals 10, 32, 54, 76; +22 each)
  return (
    <AbsoluteFill
      style={{
        background: BG,
        padding: "180px 160px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 38,
      }}
    >
      {PILLARS.map((p, i) => {
        const enter = 10 + i * 22;
        const t = interpolate(frame, [enter, enter + 22], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: easeOut,
        });
        // Brief: fade-in + translate-y(8px → 0) — engineering, no flourish
        const ty = (1 - t) * 8;
        return (
          <div
            key={p.idx}
            style={{
              display: "grid",
              gridTemplateColumns: "60px 460px 28px 1fr",
              gap: 28,
              alignItems: "baseline",
              opacity: t,
              transform: `translate3d(0, ${ty}px, 0)`,
            }}
          >
            <span
              style={{
                fontFamily: MONO,
                fontWeight: 400,
                fontSize: 13,
                color: MUTED,
                letterSpacing: "0.25em",
              }}
            >
              {p.idx}
            </span>
            <span
              style={{
                fontFamily: FONT, // Geist Sans 500 (brief §2 — accent type for pillar titles)
                fontWeight: 500,
                fontSize: 32,
                color: TEXT,
                letterSpacing: "-0.01em",
              }}
            >
              {p.name}
            </span>
            <span
              style={{
                fontFamily: MONO,
                fontSize: 18,
                color: MUTED,
                lineHeight: 1,
              }}
            >
              —
            </span>
            <span
              style={{
                fontFamily: MONO,
                fontWeight: 400,
                fontSize: 14,
                color: "rgba(245,245,240,0.6)",
                letterSpacing: 0,
                lineHeight: 1.4,
              }}
            >
              {p.desc}
            </span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ── Scene 5 · API bill odometer $4,200 → $1,260 (600–840) ─────────────────
const S5_Bill: React.FC = () => {
  const frame = useCurrentFrame(); // local 0..239 (global 600..839)

  // Brief §4: count down over frames 600..720 (4s) = local 0..120
  const v = interpolate(frame, [0, 120], [4200, 1260], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

  // Subtitle reveal a beat after final value lands
  const subA = interpolate(frame, [125, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

  // Eyebrow appears immediately
  const eyeA = interpolate(frame, [4, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

  return (
    <AbsoluteFill
      style={{
        background: BG,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 0,
      }}
    >
      {/* Eyebrow — y-offset −120 from odometer */}
      <div
        style={{
          fontFamily: MONO,
          fontWeight: 400,
          fontSize: 12,
          color: MUTED,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          marginBottom: 60,
          opacity: eyeA,
          transform: `translate3d(0, ${(1 - eyeA) * 6}px, 0)`,
        }}
      >
        MONTHLY · API SPEND
      </div>

      {/* Odometer — Geist Mono 500 140pt, no fractional cents */}
      <div
        style={{
          fontFamily: MONO,
          fontWeight: 500,
          fontSize: 140,
          color: TEXT,
          letterSpacing: 0,
          lineHeight: 1,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        ${Math.round(v).toLocaleString("en-US")}
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontFamily: MONO,
          fontWeight: 400,
          fontSize: 18,
          color: "rgba(245,245,240,0.7)",
          letterSpacing: "0.12em",
          marginTop: 50,
          opacity: subA,
        }}
      >
        70% less · same quality · money back
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 6 · Diagram [APP] → [KERNEL] → [MODELS] (840–960) ───────────────
const S6_Diagram: React.FC = () => {
  const frame = useCurrentFrame(); // local 0..119 (global 840..959)

  // Brief §4: fade in frames 845..870 → local 5..30
  const a = interpolate(frame, [5, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

  const Box: React.FC<{ label: string }> = ({ label }) => (
    <div
      style={{
        width: 220,
        height: 80,
        border: `1px solid rgba(245,245,240,0.30)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: MONO,
        fontWeight: 500,
        fontSize: 20,
        color: TEXT,
        letterSpacing: "0.02em",
        background: "transparent",
      }}
    >
      {label}
    </div>
  );

  const Arrow = () => (
    <span
      style={{
        fontFamily: MONO,
        fontWeight: 400,
        fontSize: 28,
        color: MUTED,
        lineHeight: 1,
      }}
    >
      →
    </span>
  );

  return (
    <AbsoluteFill
      style={{
        background: BG,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
        opacity: a,
      }}
    >
      <Box label="[YOUR APP]" />
      <Arrow />
      <Box label="[KERNEL]" />
      <Arrow />
      <Box label="[MODELS]" />
    </AbsoluteFill>
  );
};

// ── Scene 7 · Wordmark + CTA + master fade (960–1050) ─────────────────────
const S7_Wordmark: React.FC = () => {
  const frame = useCurrentFrame(); // local 0..89 (global 960..1049)

  // Brief §4: KERNEL opacity 0→1 frames 965..995 → local 5..35
  const wordA = interpolate(frame, [5, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  // CTA fade-in frames 1005..1030 → local 45..70
  const ctaA = interpolate(frame, [45, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  // Master fade frames 1030..1050 → local 70..90
  const masterA = interpolate(frame, [70, 90], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: BG,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: masterA,
      }}
    >
      {/* KERNEL wordmark — Geist Mono 600 140pt, tracking 0.02em (brief §8) */}
      <div
        style={{
          fontFamily: MONO,
          fontWeight: 600,
          fontSize: 140,
          color: TEXT,
          letterSpacing: "0.02em",
          lineHeight: 1,
          opacity: wordA,
          // Brief Appendix A: NO scale or slide on wordmark — fade only.
        }}
      >
        KERNEL
      </div>

      {/* CTA footer — Geist Mono 14pt 0.25em uppercase muted */}
      <div
        style={{
          fontFamily: MONO,
          fontWeight: 400,
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
};

// ── Composition root ──────────────────────────────────────────────────────
//
// Hard cuts only — Series renders sequences back-to-back with zero blend.
// (TransitionSeries was considered but every cut in this brief is "HARD CUT
//  to black" — adding even 1-frame fades softens the engineering voice.)
//
// Vignette + Grain are deliberately omitted: brief §8 lists both as
// "deliberately NOT used" — Kernel is angular, hairline-edged, terminal.
export const Kernel: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: BG, color: TEXT, fontFamily: MONO }}>
      <Series>
        <Series.Sequence durationInFrames={F.cursorEnd}>
          <S1_Cursor />
        </Series.Sequence>
        <Series.Sequence durationInFrames={F.typeEnd - F.cursorEnd}>
          <S2_Type />
        </Series.Sequence>
        <Series.Sequence durationInFrames={F.compressionEnd - F.typeEnd}>
          <S3_Compression />
        </Series.Sequence>
        <Series.Sequence durationInFrames={F.pillarsEnd - F.compressionEnd}>
          <S4_Pillars />
        </Series.Sequence>
        <Series.Sequence durationInFrames={F.billEnd - F.pillarsEnd}>
          <S5_Bill />
        </Series.Sequence>
        <Series.Sequence durationInFrames={F.diagramEnd - F.billEnd}>
          <S6_Diagram />
        </Series.Sequence>
        <Series.Sequence
          durationInFrames={KERNEL_DURATION - F.diagramEnd}
        >
          <S7_Wordmark />
        </Series.Sequence>
      </Series>

      {/* TODO(audio · brief §6-7):
          - 50Hz sub-bass drone, in 0..30 fade, hold to frame 990, fade 990..1050
          - Mechanical typewriter ticks per character (frames 30..88)
          - Crushed digital sine glitch SFX @ frame 57 (80ms)
          - Metallic compression whoosh @ frame 120 (500ms)
          - Sub 60Hz pulse kick @ frame 270 ("-85%" reveal)
          - 4× pillar ticks @ frames 340, 362, 384, 406 (13kHz, 20ms)
          - Coin-drop SFX @ frame 720 (final $1,260 lands)
          - Filtered noise sweep @ frame 845 (diagram fade-in, 400ms)
          - VO lines 1..10 via <Audio> + duck() (see brief §5 timing table)
          - Final 60 frames (990..1050) = pure silence — engineering ends, not decays. */}
    </AbsoluteFill>
  );
};
