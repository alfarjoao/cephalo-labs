import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";
import {
  TransitionSeries,
  linearTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

import {
  INK,
  PURPLE,
  FONT,
  MONO,
  easeOut,
  Vignette,
} from "../../primitives/cinematic";
import { Odometer, PulseRing } from "../../primitives/motion-graphics";

// ═════════════════════════════════════════════════════════════════════════
//  VSL-02 · CEPHALO LABS · 40s @ 30fps · 1200 frames · 1920x1080
//  Editorial · monolithic · reverent · celestial.
//  Bookend: "We build intelligence." (00:03 + 00:33).
//  Purple `#C084FC` used EXACTLY TWICE: underline 00:04-00:05.5, router dot 00:15.
//  HARD CUTS between scenes (brief §4 + Appendix A.5). Silence is the transition.
//  No Starfield/GodRays/GridFloor/BinaryRain/Grain/Lightbar (brief §8 ⚠).
// ═════════════════════════════════════════════════════════════════════════

const BG = "#0A0A0A";
const TEXT = "#F5F5F0"; // warm white — never pure white
const MUTED = "#888880";

// ── Scene durations (frames @ 30fps) ───────────────────────────────────
const S1_LEN = 90;   // 0-3s · cold black open
const S2_LEN = 120;  // 3-7s · anchor "We build intelligence." + purple underline
const S3_LEN = 90;   // 7-10s · eyebrow "A STUDIO. LISBON."
const S4_LEN = 240;  // 10-18s · Polypus UI hold + purple router dot pulse
const S5_LEN = 210;  // 18-25s · €400K+ odometer (Pantheon)
const S6_LEN = 210;  // 25-32s · Kernel compression 12,842 → 1,928
const S7_LEN = 240;  // 32-40s · CEPHALO wordmark + URL + 1s fade-out
// Σ = 1200 frames · 40.0s · matches brief

export const CEPHALO_LABS_DURATION =
  S1_LEN + S2_LEN + S3_LEN + S4_LEN + S5_LEN + S6_LEN + S7_LEN;

type SceneProps = { durationInFrames: number };

// ─── S1 · Cold open (0-3s) · pure black, no components ────────────────
const S1_ColdOpen: React.FC<SceneProps> = () => (
  <AbsoluteFill style={{ background: BG }} />
);

// ─── S2 · Anchor "We build intelligence." (3-7s) ───────────────────────
// Local frames 0-120 · text fades in 0-30 (1s), purple underline draws 30-75 (1.5s),
// hold 75-120. Underline width 0 → 480px, color #C084FC at 50% opacity. [PURPLE USE 1/2]
const S2_Anchor: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const textOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const underlineWidth = interpolate(frame, [30, 75], [0, 480], {
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
      }}
    >
      <div
        style={{
          fontFamily: FONT, // Clash Display 500 (falls back to Geist)
          fontSize: 120,
          fontWeight: 500,
          color: TEXT,
          letterSpacing: "-0.03em",
          lineHeight: 1,
          opacity: textOpacity,
        }}
      >
        We build intelligence.
      </div>
      <div
        style={{
          marginTop: 40,
          height: 1,
          width: underlineWidth,
          background: PURPLE,
          opacity: 0.5, // brief: 50% opacity
        }}
      />
    </AbsoluteFill>
  );
};

// ─── S3 · Eyebrow "A STUDIO. LISBON." (7-10s) ─────────────────────────
// Local frames 0-90 · fade-in 5-35 (1s), hold to 90.
const S3_Eyebrow: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [5, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  return (
    <AbsoluteFill
      style={{
        background: BG,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          fontFamily: MONO,
          fontSize: 14,
          fontWeight: 400,
          color: TEXT,
          opacity: opacity * 0.7, // brief: 70% opacity at peak
          letterSpacing: "0.3em",
          textTransform: "uppercase",
        }}
      >
        A STUDIO. LISBON.
      </div>
    </AbsoluteFill>
  );
};

// ─── S4 · Polypus UI hold (10-18s) ────────────────────────────────────
// Local frames 0-240. Eyebrow top-left + 1px ring frame. Real screen recording
// is the source of truth and will be composited in post; here we render a
// dignified placeholder card so the layout/typography match exactly.
// Purple router-chip dot pulses ONCE at local frame 150 (~global 450 = 00:15). [PURPLE USE 2/2]
const S4_Polypus: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  // Pulse window: local 145-175, peak at 160 (period 30 → single ring)
  const pulseActive = frame >= 145 && frame <= 175;
  return (
    <AbsoluteFill style={{ background: BG, opacity }}>
      {/* Top-left eyebrow */}
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
      {/* 1800x960 video well, 60px padding all sides, 1px hairline ring */}
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 60,
          width: 1800,
          height: 960,
          border: "1px solid rgba(245,245,240,0.08)",
          borderRadius: 2,
          overflow: "hidden",
          background: "#0E0E10",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Placeholder for polypus-overview-8s.mp4 (see brief §9). Composite in post. */}
        <span
          style={{
            fontFamily: MONO,
            fontSize: 11,
            color: "rgba(245,245,240,0.18)",
            letterSpacing: "0.4em",
          }}
        >
          POLYPUS · OVERVIEW · 8S
        </span>
      </div>
      {/* PURPLE router dot pulse (use 2/2) — over router chip area */}
      {pulseActive && (
        <PulseRing
          cx={960}
          cy={367} // approx router-chip vertical band, top-third
          tone="purple"
          maxRadius={48}
          rings={1}
          period={30}
          lineWidth={1.5}
          opacity={0.9}
        />
      )}
      {pulseActive && (
        <div
          style={{
            position: "absolute",
            left: 960 - 12,
            top: 367 - 12,
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: PURPLE,
            opacity: interpolate(frame, [145, 160, 175], [0, 1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
      )}
    </AbsoluteFill>
  );
};

// ─── S5 · Pantheon €400K+ odometer (18-25s) ───────────────────────────
// Local 0-210. Eyebrow above (y -120), odometer 0→400 over local 0-90 (3s),
// subtitle below (y +110), all hold to 210.
const S5_Pantheon: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const eyebrowOpacity = interpolate(frame, [0, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const subtitleOpacity = interpolate(frame, [10, 40], [0, 1], {
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
      }}
    >
      <div
        style={{
          fontFamily: MONO,
          fontSize: 13,
          color: TEXT,
          opacity: eyebrowOpacity * 0.6,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          marginBottom: 50,
        }}
      >
        PANTHEON GROWTH · CASE
      </div>
      <Odometer
        value={400}
        prefix="€"
        suffix="K+"
        fromFrame={0}
        duration={90}
        nowFrame={frame}
        size={160}
        color={TEXT}
      />
      <div
        style={{
          fontFamily: FONT, // Geist 400
          fontSize: 22,
          fontWeight: 400,
          color: MUTED,
          marginTop: 50,
          opacity: subtitleOpacity,
          letterSpacing: 0,
        }}
      >
        revenue · built · not projected
      </div>
    </AbsoluteFill>
  );
};

// ─── S6 · Kernel compression 12,842 → 1,928 (25-32s) ──────────────────
// Local 0-210. Eyebrow above. Inlined custom viz so the numbers match the brief
// exactly (existing KernelCompressionViz is hardcoded 5,000 → 1,500 and is gold-toned).
const S6_Kernel: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const enterOpacity = interpolate(frame, [0, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  // Animate 12,842 → 1,928 over local frames 0-150 (5s), per brief §4
  const tokenValue = interpolate(frame, [0, 150], [12842, 1928], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const formatted = Math.round(tokenValue).toLocaleString("en-US");
  // Visual bar shrinks proportionally (12,842 → 1,928 ≈ -85%)
  const barScale = interpolate(frame, [0, 150], [1, 1928 / 12842], {
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
        gap: 60,
        opacity: enterOpacity,
      }}
    >
      <div
        style={{
          fontFamily: MONO,
          fontSize: 13,
          color: TEXT,
          opacity: 0.6,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
        }}
      >
        KERNEL · OPTIMISATION LAYER · EARLY ACCESS
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 36,
        }}
      >
        <div
          style={{
            fontFamily: FONT,
            fontSize: 110,
            fontWeight: 500,
            color: TEXT,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {formatted}
          <span
            style={{
              fontFamily: MONO,
              fontSize: 22,
              fontWeight: 400,
              color: MUTED,
              letterSpacing: "0.25em",
              marginLeft: 24,
              verticalAlign: "middle",
              textTransform: "uppercase",
            }}
          >
            tokens
          </span>
        </div>
        {/* Hairline bar that shrinks — pure typography, no fill colour */}
        <div
          style={{
            width: 720,
            height: 1,
            background: "rgba(245,245,240,0.12)",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: 1,
              width: 720 * barScale,
              background: TEXT,
              opacity: 0.55,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── S7 · CEPHALO wordmark + URL + final fade (32-40s) ────────────────
// Local 0-240. Wordmark fades in local 10-40 (1s after black gap),
// URL fades in local 60-90, hold to 210, master fade to black 210-240.
const S7_Wordmark: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const wordOpacity = interpolate(frame, [10, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const urlOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const masterFade = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut }
  );
  return (
    <AbsoluteFill
      style={{
        background: BG,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: masterFade,
      }}
    >
      <div
        style={{
          fontFamily: FONT, // Clash Display 600
          fontSize: 180,
          fontWeight: 600,
          color: TEXT,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          opacity: wordOpacity,
          // No transform, no glow. Just the word. (brief Appendix A.4)
        }}
      >
        CEPHALO
      </div>
      <div
        style={{
          fontFamily: MONO,
          fontSize: 13,
          fontWeight: 400,
          color: MUTED,
          letterSpacing: "0.25em",
          marginTop: 110,
          opacity: urlOpacity,
        }}
      >
        cephalon.ai · Portugal · 2026
      </div>
    </AbsoluteFill>
  );
};

// ─── Root composition ─────────────────────────────────────────────────
// HARD CUTS: 1-frame linear fade between sequences (perceptually instantaneous,
// satisfies the brief's "HARD CUTS / silence is the transition" rule while
// using the TransitionSeries scaffolding).
const HARD_CUT = 1;

export const CephaloLabs: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: BG, color: INK.text, fontFamily: FONT }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={S1_LEN}>
          <S1_ColdOpen durationInFrames={S1_LEN} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: HARD_CUT })}
        />
        <TransitionSeries.Sequence durationInFrames={S2_LEN}>
          <S2_Anchor durationInFrames={S2_LEN} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: HARD_CUT })}
        />
        <TransitionSeries.Sequence durationInFrames={S3_LEN}>
          <S3_Eyebrow durationInFrames={S3_LEN} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: HARD_CUT })}
        />
        <TransitionSeries.Sequence durationInFrames={S4_LEN}>
          <S4_Polypus durationInFrames={S4_LEN} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: HARD_CUT })}
        />
        <TransitionSeries.Sequence durationInFrames={S5_LEN}>
          <S5_Pantheon durationInFrames={S5_LEN} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: HARD_CUT })}
        />
        <TransitionSeries.Sequence durationInFrames={S6_LEN}>
          <S6_Kernel durationInFrames={S6_LEN} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: HARD_CUT })}
        />
        <TransitionSeries.Sequence durationInFrames={S7_LEN}>
          <S7_Wordmark durationInFrames={S7_LEN} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      {/* Vignette only — Grain and other texture primitives forbidden by brief §8 */}
      <Vignette strength={0.6} />

      {/*
        AUDIO TODO (post / Remotion <Audio> layer — see brief §6 §7):
        - 40Hz sub-drone start @ frame 15 (00:00.5), continuous to frame 1110
        - Piano C2 @ frame 120 (00:04.0), 6s decay tail
        - Soft whoosh @ frame 204 (00:06.8) on underline completion
        - String swell @ frame 225 (00:07.5) → 25%, ramps to 70% by frame 540
        - UI router 'schlick' @ frame 450 (00:15) sync with purple dot pulse
        - Impact hit (sub kick + cymbal tail) @ frame 675 (00:22.5) on €400 reveal
        - Compress 'schlink' @ frame 810 (00:27) on token-value mid-shrink
        - Wordmark impact (sub + tremolo resolve) @ frame 993 (00:33.1)
        - Sub-drone fade 60% → 0 over frames 1110-1200
        VO timings (6 lines): see brief §5. Music duck() ramp 14f via
        primitives/motion-graphics::duck — wire when audio assets land.
      */}
    </AbsoluteFill>
  );
};
