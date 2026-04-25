import "@fontsource/geist-sans/400.css";
import "@fontsource/geist-sans/500.css";
import "@fontsource/geist-sans/600.css";
import "@fontsource/geist-mono/400.css";
import "@fontsource/geist-mono/500.css";
import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  TransitionSeries,
  linearTiming,
  springTiming,
} from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { wipe } from "@remotion/transitions/wipe";

import {
  EASE,
  interpFrames,
  springInterp,
  SplitKinetic,
  CharKinetic,
  LottieScene,
  LottieOverlay,
  ParallelStream,
  DotGrid,
} from "../../primitives";

// ═══════════════════════════════════════════════════════════════════════
//  SHOWCASE-v3 · 30s @ 30fps · 1920×1080
//  Reference composition demonstrating full S-tier stack on CEPHALO brand.
//  bg #0A0A0A · accent #C084FC · text #F5F5F0 · Geist/Clash fallback.
// ═══════════════════════════════════════════════════════════════════════

const BG = "#0A0A0A";
const ACCENT = "#C084FC";
const TEXT = "#F5F5F0";
const MUTED = "#8A8A85";
const FONT_DISPLAY = "'Geist Sans', 'Geist', -apple-system, BlinkMacSystemFont, sans-serif";
const FONT_MONO = "'Geist Mono', 'JetBrains Mono', ui-monospace, monospace";

type SceneProps = { durationInFrames: number };

// ─── Scene 1 · Hero (0-180 local) ────────────────────────────────────
const S1_Hero: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const bgOpacity = springInterp(frame, fps, [0, 1], { preset: "soft" });
  const fadeOut = interpFrames(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 1],
    "smooth"
  );

  return (
    <AbsoluteFill style={{ background: BG }}>
      <AbsoluteFill style={{ opacity: bgOpacity * 0.8 }}>
        <ParallelStream
          count={180}
          width={1920}
          height={1080}
          color={TEXT}
          accent={ACCENT}
          seed={11}
          speedMultiplier={0.6}
        />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 55%, rgba(10,10,10,0) 0%, rgba(10,10,10,0.7) 55%, rgba(10,10,10,1) 100%)",
        }}
      />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 160px",
          opacity: fadeOut,
        }}
      >
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: 13,
            letterSpacing: "0.32em",
            color: MUTED,
            textTransform: "uppercase",
            opacity: springInterp(frame, fps, [0, 1], {
              preset: "soft",
              delay: 8,
            }),
            marginBottom: 48,
          }}
        >
          CEPHALO · LABS
        </span>
        <SplitKinetic
          text="We build intelligence."
          startFrame={18}
          perWordFrames={18}
          gapFrames={6}
          ease="power4.out"
          as="h1"
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 132,
            fontWeight: 500,
            letterSpacing: "-0.03em",
            color: TEXT,
            lineHeight: 1.02,
            textAlign: "center",
          }}
        />
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: 18,
            letterSpacing: "0.16em",
            color: MUTED,
            textTransform: "uppercase",
            opacity: springInterp(frame, fps, [0, 1], {
              preset: "soft",
              delay: 90,
            }),
            marginTop: 56,
          }}
        >
          AI · STUDIO · SINCE 2024
        </span>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─── Scene 2 · Triad (products) ──────────────────────────────────────
const S2_Triad: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const products = [
    {
      idx: "01",
      name: "KERNEL",
      tag: "The compression runtime",
      detail: "Reduce context — same quality.",
    },
    {
      idx: "02",
      name: "POLYPUS",
      tag: "The orchestration desktop",
      detail: "Route tasks · hot/warm/cold memory.",
    },
    {
      idx: "03",
      name: "PANTHEON",
      tag: "The growth partner",
      detail: "We don't consult. We build.",
    },
  ];
  return (
    <AbsoluteFill style={{ background: BG }}>
      <AbsoluteFill style={{ opacity: 0.35 }}>
        <DotGrid
          cols={40}
          rows={22}
          width={1920}
          height={1080}
          color={TEXT}
          accent={ACCENT}
          pulseFrame={20}
          pulseDurationFrames={80}
        />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 160px",
          gap: 48,
        }}
      >
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: 13,
            letterSpacing: "0.3em",
            color: MUTED,
            textTransform: "uppercase",
            opacity: springInterp(frame, fps, [0, 1], { preset: "soft" }),
          }}
        >
          THREE · MACHINES
        </span>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 48,
            width: "100%",
          }}
        >
          {products.map((p, i) => {
            const enter = 22 + i * 14;
            const o = springInterp(frame, fps, [0, 1], {
              preset: "snappy",
              delay: enter,
            });
            const y = springInterp(frame, fps, [40, 0], {
              preset: "snappy",
              delay: enter,
            });
            return (
              <div
                key={p.idx}
                style={{
                  opacity: o,
                  transform: `translate3d(0, ${y}px, 0)`,
                  padding: "40px 36px",
                  border: `1px solid rgba(245,245,240,0.12)`,
                  background: "rgba(245,245,240,0.015)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                  minHeight: 260,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 12,
                    letterSpacing: "0.28em",
                    color: ACCENT,
                  }}
                >
                  {p.idx}
                </span>
                <span
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: 44,
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    color: TEXT,
                  }}
                >
                  {p.name}
                </span>
                <span
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 14,
                    letterSpacing: "0.08em",
                    color: MUTED,
                    textTransform: "uppercase",
                  }}
                >
                  {p.tag}
                </span>
                <span
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: 20,
                    color: "rgba(245,245,240,0.72)",
                    lineHeight: 1.4,
                    marginTop: "auto",
                  }}
                >
                  {p.detail}
                </span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─── Scene 3 · Feature (with pulse-ring Lottie) ──────────────────────
const S3_Feature: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: BG }}>
      <LottieOverlay
        src="lottie/pulse-ring.json"
        position="center"
        size={820}
        loop
        startFrame={0}
        opacity={0.85}
      />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          padding: "0 200px",
        }}
      >
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: 12,
            letterSpacing: "0.3em",
            color: ACCENT,
            textTransform: "uppercase",
            opacity: springInterp(frame, fps, [0, 1], { preset: "soft" }),
          }}
        >
          INTELLIGENCE · AS · INFRASTRUCTURE
        </span>
        <SplitKinetic
          text="Software that reasons about itself."
          startFrame={14}
          perWordFrames={16}
          gapFrames={5}
          ease="power3.out"
          as="h2"
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 76,
            fontWeight: 500,
            letterSpacing: "-0.02em",
            color: TEXT,
            lineHeight: 1.05,
            textAlign: "center",
            maxWidth: 1400,
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─── Scene 4 · Stats (spring-driven counters) ────────────────────────
const S4_Stats: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const stats = [
    { value: 70, suffix: "%", label: "Context compression" },
    { value: 4, suffix: "×", label: "Speed vs baseline" },
    { value: 99.9, suffix: "%", label: "Reliability SLO" },
  ];
  return (
    <AbsoluteFill style={{ background: BG }}>
      <AbsoluteFill style={{ opacity: 0.25 }}>
        <DotGrid
          cols={48}
          rows={27}
          width={1920}
          height={1080}
          color={TEXT}
          accent={ACCENT}
          pulseFrame={-999}
        />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 120,
          padding: "0 160px",
        }}
      >
        {stats.map((s, i) => {
          const delay = 8 + i * 14;
          const v = springInterp(frame, fps, [0, s.value], {
            preset: "snappy",
            delay,
          });
          const o = springInterp(frame, fps, [0, 1], {
            preset: "soft",
            delay,
          });
          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 24,
                opacity: o,
              }}
            >
              <span
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: 180,
                  fontWeight: 500,
                  color: TEXT,
                  letterSpacing: "-0.03em",
                  fontVariantNumeric: "tabular-nums",
                  lineHeight: 1,
                }}
              >
                {s.value % 1 === 0 ? Math.round(v) : v.toFixed(1)}
                <span style={{ color: ACCENT }}>{s.suffix}</span>
              </span>
              <span
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 14,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: MUTED,
                }}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─── Scene 5 · Outro wordmark (hairline Lottie) ──────────────────────
const S5_Outro: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fadeOut = interpFrames(
    frame,
    [durationInFrames - 18, durationInFrames],
    [1, 0],
    "smooth"
  );
  return (
    <AbsoluteFill style={{ background: BG, opacity: fadeOut }}>
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 48,
        }}
      >
        <CharKinetic
          text="CEPHALO"
          startFrame={6}
          perCharFrames={14}
          gapFrames={3}
          ease="power4.out"
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 220,
            fontWeight: 600,
            color: TEXT,
            letterSpacing: "0.08em",
            lineHeight: 1,
          }}
        />
        <div style={{ width: 1200, height: 8, position: "relative" }}>
          <LottieScene
            src="lottie/hairline-reveal.json"
            startFrame={30}
            width={1200}
            height={8}
          />
        </div>
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: 15,
            letterSpacing: "0.3em",
            color: MUTED,
            textTransform: "uppercase",
            opacity: springInterp(frame, fps, [0, 1], {
              preset: "soft",
              delay: 50,
            }),
          }}
        >
          CEPHALO.AI · HELLO@CEPHALO.AI
        </span>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─── Root showcase composition ───────────────────────────────────────
const S1_LEN = 180;
const S2_LEN = 210;
const S3_LEN = 210;
const S4_LEN = 180;
const S5_LEN = 120;
const TRANS = 14;

export const Showcase: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: BG }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={S1_LEN}>
          <S1_Hero durationInFrames={S1_LEN} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANS })}
        />
        <TransitionSeries.Sequence durationInFrames={S2_LEN}>
          <S2_Triad durationInFrames={S2_LEN} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={springTiming({
            config: { damping: 200 },
            durationInFrames: TRANS,
          })}
        />
        <TransitionSeries.Sequence durationInFrames={S3_LEN}>
          <S3_Feature durationInFrames={S3_LEN} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={linearTiming({ durationInFrames: TRANS })}
        />
        <TransitionSeries.Sequence durationInFrames={S4_LEN}>
          <S4_Stats durationInFrames={S4_LEN} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANS })}
        />
        <TransitionSeries.Sequence durationInFrames={S5_LEN}>
          <S5_Outro durationInFrames={S5_LEN} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};

// Total: S1(180) + T(14) + S2(210) + T(14) + S3(210) + T(14) + S4(180) + T(14) + S5(120) = 956 frames ≈ 31.9s @ 30fps
export const SHOWCASE_DURATION = S1_LEN + TRANS + S2_LEN + TRANS + S3_LEN + TRANS + S4_LEN + TRANS + S5_LEN;
