import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  useCurrentFrame,
  staticFile,
  Easing,
  Img,
  spring,
  useVideoConfig,
} from "remotion";
import {
  TransitionSeries,
  linearTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

import {
  FONT,
  MONO,
  Vignette,
  Grain,
} from "../../primitives/cinematic";
import { BinaryRain } from "../../primitives/motion-graphics";
import { LogoSigil } from "../../primitives/logo-lockup";
import {
  HairlineGrid,
  KineticLetters,
  GlyphScramble,
  DotField,
  ParticleStream,
  CRTFlicker,
  ScanLines,
  CameraDrift,
  OrbitingNodes,
  FastTicker,
  Halo,
} from "../../primitives/motion-bw";
import { GlassPanel, GlassBadge } from "../../primitives/glassmorphism";
import { CephaloThreeScene } from "../../three/CephaloThreeScene";

// ═════════════════════════════════════════════════════════════════════════
//  VSL-02 · CEPHALO LABS · v4.4 · Linear × Apple hybrid · STRICT B&W
//  40s @ 30fps · 1200 frames · 1920×1080
//
//  Linear DNA: spring physics (overshoot/bounce), rapid kinetic typography,
//  hairline grids, high-contrast B&W reveals.
//
//  Apple DNA: cinematic restraint, dramatic 3x→1x scale entries,
//  slow majestic pacing on hero shots, pristine compositing.
//
//  3D layer (@remotion/three): rotating dashed wireframe rings + particles
//  in S4 and S7 for real depth.
//
//  Glassmorphism HUD panels in S5 and S6 (cut-corner clip-path).
// ═════════════════════════════════════════════════════════════════════════

const BG = "#0A0A0A";
const TEXT = "#F5F5F0";
const MUTED = "#8A8A82";
const FAINT = "rgba(245,245,240,0.18)";

// Scene durations
const S1_LEN = 90;
const S2_LEN = 120;
const S3_LEN = 90;
const S4_LEN = 240;
const S5_LEN = 210;
const S6_LEN = 210;
const S7_LEN = 240;

export const CEPHALO_LABS_DURATION =
  S1_LEN + S2_LEN + S3_LEN + S4_LEN + S5_LEN + S6_LEN + S7_LEN;

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

type SceneProps = { durationInFrames: number };

// Spring config presets
const SPRING_HERO = { damping: 12, stiffness: 100, mass: 0.5 };
const SPRING_TIGHT = { damping: 30, stiffness: 280, mass: 0.6 };
const SPRING_NATURAL = { damping: 200, stiffness: 100, mass: 0.5 };

// ─── S1 · Cold open (0–3s, 90f) ───────────────────────────────────────
//   Layers: deep black + breathing halo + spring-driven hairline +
//   particle stream + CRT flicker. SFX: sub-drone open.
const S1_ColdOpen: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lineSpring = spring({ frame: Math.max(0, frame - 35), fps, config: SPRING_HERO });
  const lineW = lineSpring * 460;
  const lineFade = interpolate(frame, [82, 90], [1, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ background: BG }}>
      <Halo size={1100} opacity={0.06} period={120} />
      <ParticleStream count={50} speed={0.25} size={1.2} opacity={0.18} />
      <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            height: 1,
            width: lineW,
            background: TEXT,
            opacity: 0.85 * lineFade,
            boxShadow: `0 0 8px ${TEXT}33`,
          }}
        />
      </AbsoluteFill>
      <CRTFlicker period={150} intensity={0.025} />
    </AbsoluteFill>
  );
};

// ─── S2 · Anchor "We build intelligence." (3–7s, 120f) ────────────────
//   Layers: hairline grid + 3x→1x scale-in text + spring underline +
//   particle burst + glyph scramble sub-line + camera drift.
//   SFX: text whoosh + underline click.
const S2_Anchor: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // Cinematic Tech Intro 3x→1x scale entry on text (frames 0-40)
  const scaleSpring = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: SPRING_HERO,
    durationInFrames: 40,
  });
  const scale = 3 - 2 * scaleSpring; // 3 → 1
  const opacity = interpolate(frame, [5, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  // Underline spring
  const underlineSpring = spring({
    frame: Math.max(0, frame - 50),
    fps,
    config: SPRING_NATURAL,
  });
  const underlineW = underlineSpring * 720;
  // Sub-line (glyph scramble)
  const metaShow = interpolate(frame, [70, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  return (
    <AbsoluteFill style={{ background: BG }}>
      <HairlineGrid count={28} orientation="horizontal" startFrame={0} drawDuration={45} holdDuration={50} exitDuration={25} opacity={0.12} />
      <CameraDrift amplitude={8} scale={0.006} period={300}>
        <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div
            style={{
              opacity,
              transform: `scale(${scale})`,
              transformOrigin: "center",
            }}
          >
            <span
              style={{
                fontFamily: FONT,
                fontSize: 124,
                fontWeight: 500,
                letterSpacing: "-0.03em",
                color: TEXT,
                lineHeight: 1,
                whiteSpace: "nowrap",
              }}
            >
              We build intelligence.
            </span>
          </div>
          <div
            style={{
              marginTop: 38,
              height: 1,
              width: underlineW,
              background: TEXT,
              opacity: 0.7,
              boxShadow: `0 0 8px ${TEXT}44`,
            }}
          />
          <div style={{ marginTop: 34, opacity: metaShow }}>
            <GlyphScramble
              text="CEPHALO · LABS · LISBOA"
              startFrame={70}
              resolveDuration={20}
              staggerFrames={1.2}
              fontSize={12}
              letterSpacing="0.42em"
              color={MUTED}
            />
          </div>
        </AbsoluteFill>
      </CameraDrift>
      <ScanLines spacing={3} speed={0.4} opacity={0.025} />
      <CRTFlicker period={120} intensity={0.025} />
    </AbsoluteFill>
  );
};

// ─── S3 · Studio Lisbon coordinate beat (7–10s, 90f) ──────────────────
//   Layers: dot field + corner brackets (spring-in) + glyph-scrambled
//   coordinates + live timestamp ticker. SFX: typewriter ticks.
const S3_Eyebrow: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cornerSpring = spring({ frame: Math.max(0, frame - 5), fps, config: SPRING_TIGHT });
  const lineW = interpolate(frame, [10, 45], [0, 480], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const sec = Math.floor(frame / 30);
  const ms = Math.floor((frame % 30) * (1000 / 30));
  return (
    <AbsoluteFill style={{ background: BG }}>
      <DotField cols={70} rows={36} rippleSpeed={0.05} baseOpacity={0.05} />
      {/* Spring-animated corner brackets */}
      {[
        { top: 60, left: 80, rot: 0, ox: -40, oy: -40 },
        { top: 60, right: 80, rot: 90, ox: 40, oy: -40 },
        { bottom: 60, right: 80, rot: 180, ox: 40, oy: 40 },
        { bottom: 60, left: 80, rot: 270, ox: -40, oy: 40 },
      ].map((p, i) => {
        const s = spring({ frame: Math.max(0, frame - 8 - i * 4), fps, config: SPRING_TIGHT });
        const tx = (1 - s) * p.ox;
        const ty = (1 - s) * p.oy;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              ...{ top: p.top, left: p.left, right: p.right, bottom: p.bottom } as any,
              width: 32,
              height: 32,
              borderTop: `1px solid ${TEXT}`,
              borderLeft: `1px solid ${TEXT}`,
              transform: `rotate(${p.rot}deg) translate(${tx}px, ${ty}px)`,
              opacity: s * 0.65,
            }}
          />
        );
      })}
      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div style={{ height: 1, width: lineW / 2, background: `${TEXT}88` }} />
          <GlyphScramble
            text="A STUDIO · LISBON · 2026"
            startFrame={10}
            resolveDuration={18}
            staggerFrames={1.4}
            fontSize={16}
            letterSpacing="0.34em"
            color={TEXT}
          />
          <div style={{ height: 1, width: lineW / 2, background: `${TEXT}88` }} />
        </div>
        <div
          style={{
            fontFamily: MONO,
            fontSize: 11,
            color: MUTED,
            letterSpacing: "0.32em",
            opacity: cornerSpring * 0.55,
          }}
        >
          38°43′ N · 9°08′ W · {String(sec).padStart(2, "0")}:{String(ms).padStart(3, "0")}
        </div>
      </AbsoluteFill>
      <ScanLines spacing={4} speed={0.3} opacity={0.02} />
    </AbsoluteFill>
  );
};

// ─── S4 · Polypus showcase (10–18s, 240f) ─────────────────────────────
//   Layers: 3D rotating rings + halo + spring-entry logo + 3x→1x kinetic
//   POLYPUS + orbiting nodes + code stream + router log. SFX: sub-impact.
const S4_Polypus: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enterSpring = spring({ frame: Math.max(0, frame - 5), fps, config: SPRING_NATURAL });
  const logoSpring = spring({ frame: Math.max(0, frame - 30), fps, config: SPRING_HERO });
  const codeLines = [
    "  router.dispatch(task)",
    "  → analyse(intent)",
    "  → route(model: 'haiku')",
    "  → cache.warm(ctx)",
    "  → respond(stream: true)",
    "  ✓ 0.42s · 1928 tk",
  ];
  return (
    <AbsoluteFill style={{ background: BG, opacity: enterSpring }}>
      {/* 3D depth layer */}
      <CephaloThreeScene rings={3} particleCount={36} />
      <Halo size={900} opacity={0.06} period={180} />
      <OrbitingNodes cx={960} cy={540} count={7} radius={300} speed={0.006} nodeSize={6} opacity={0.45} />
      {/* Top-left eyebrow */}
      <div style={{ position: "absolute", top: 70, left: 90 }}>
        <GlyphScramble
          text="01 · POLYPUS · DESKTOP AI ORCHESTRATOR"
          startFrame={6}
          resolveDuration={20}
          staggerFrames={0.9}
          fontSize={12}
          letterSpacing="0.28em"
          color={TEXT}
        />
      </div>
      {/* Center: spring logo + kinetic POLYPUS */}
      <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
          <div
            style={{
              opacity: logoSpring,
              transform: `scale(${0.6 + 0.4 * logoSpring}) translateY(${(1 - logoSpring) * 30}px)`,
              filter: "grayscale(1) brightness(1.15)",
            }}
          >
            <Img
              src={staticFile("logos/polypus-mark.svg")}
              style={{ width: 80, height: 80, objectFit: "contain" }}
            />
          </div>
          <KineticLetters
            text="POLYPUS"
            startFrame={50}
            staggerFrames={3}
            letterDuration={22}
            fontSize={148}
            fontWeight={600}
            letterSpacing="-0.04em"
            color={TEXT}
            origin="scale"
          />
          <div
            style={{
              fontFamily: MONO,
              fontSize: 12,
              letterSpacing: "0.42em",
              color: MUTED,
              opacity: interpolate(frame, [110, 140], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}
          >
            ORCHESTRATES · ROUTES · REMEMBERS
          </div>
        </div>
      </AbsoluteFill>
      {/* Right-side code stream */}
      <div
        style={{
          position: "absolute",
          right: 80,
          top: 220,
          fontFamily: MONO,
          fontSize: 13,
          color: MUTED,
          letterSpacing: 0,
          lineHeight: 1.7,
          textAlign: "right",
          opacity: 0.55,
        }}
      >
        {codeLines.map((line, i) => {
          const t = interpolate(frame, [80 + i * 18, 110 + i * 18], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div key={i} style={{ opacity: t }}>{line}</div>
          );
        })}
      </div>
      {/* Bottom-left router log */}
      <div style={{ position: "absolute", bottom: 80, left: 90 }}>
        <GlyphScramble
          text="ROUTER · DISPATCHED · 12 TASKS"
          startFrame={140}
          resolveDuration={18}
          staggerFrames={0.8}
          fontSize={11}
          letterSpacing="0.16em"
          color={MUTED}
        />
      </div>
      <CRTFlicker period={130} intensity={0.022} />
    </AbsoluteFill>
  );
};

// ─── S5 · Pantheon revenue €400K (18–25s, 210f) ───────────────────────
//   Layers: vertical hairline grid + glassmorphism HUD slide-in +
//   FastTicker + line graph spring-draw + meta lines. SFX: deep impact + paper-fold.
const S5_Pantheon: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = interpolate(frame, [0, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  // Line graph polyline points
  const points = Array.from({ length: 20 }, (_, i) => {
    const x = 240 + (i / 19) * 1440;
    const variance = Math.sin(i * 0.7) * 24;
    const baseY = 700 - (i / 19) * 280;
    return { x, y: baseY + variance };
  });
  const drawSpring = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 200, stiffness: 60, mass: 0.6 } });
  const segCount = Math.max(1, Math.floor(drawSpring * (points.length - 1)));
  return (
    <AbsoluteFill style={{ background: BG, opacity: enter }}>
      <HairlineGrid count={18} orientation="vertical" startFrame={0} drawDuration={60} holdDuration={120} exitDuration={30} opacity={0.06} />
      {/* HUD panel slides in from left at frame 50 */}
      <div style={{ position: "absolute", top: 200, left: 80 }}>
        <GlassPanel startFrame={50} width={460} height={210} slideFrom="left" cornerSize={16}>
          <div style={{ fontFamily: MONO, fontSize: 11, color: MUTED, letterSpacing: "0.24em", textTransform: "uppercase" }}>
            BENCHMARK · OPERATIONS
          </div>
          <div style={{ marginTop: 16, fontFamily: FONT, fontSize: 36, color: TEXT, fontWeight: 500, letterSpacing: "-0.02em" }}>
            18 months · 4 verticals
          </div>
          <div style={{ marginTop: 10, fontFamily: MONO, fontSize: 12, color: MUTED, lineHeight: 1.6 }}>
            14× ROAS · 340% leads · 80% ops automated
          </div>
        </GlassPanel>
      </div>
      <CameraDrift amplitude={6} scale={0.006} period={360}>
        <AbsoluteFill>
          {/* Eyebrow top-left */}
          <div style={{ position: "absolute", top: 70, left: 90 }}>
            <GlyphScramble
              text="02 · PANTHEON · 18 MONTHS"
              startFrame={4}
              resolveDuration={18}
              staggerFrames={1.0}
              fontSize={12}
              letterSpacing="0.28em"
              color={TEXT}
            />
          </div>
          {/* Hero ticker — center-right (offset for HUD) */}
          <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 36, paddingLeft: 200 }}>
            <FastTicker
              from={0}
              to={400}
              startFrame={20}
              duration={70}
              prefix="€"
              suffix="K+"
              fontSize={196}
              fontWeight={500}
              color={TEXT}
            />
            <div
              style={{
                fontFamily: MONO,
                fontSize: 13,
                letterSpacing: "0.28em",
                color: MUTED,
                opacity: interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              }}
            >
              FOUR HUNDRED THOUSAND EUROS · SHIPPED
            </div>
          </AbsoluteFill>
          {/* Bottom — line graph (spring drawn) */}
          <svg
            width={1920}
            height={1080}
            style={{ position: "absolute", left: 0, bottom: 0, opacity: 0.6 }}
          >
            <polyline
              fill="none"
              stroke={TEXT}
              strokeWidth={1.2}
              strokeOpacity={0.7}
              points={points.slice(0, segCount + 1).map((p) => `${p.x},${p.y}`).join(" ")}
            />
            {points.slice(0, segCount + 1).map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={2} fill={TEXT} fillOpacity={0.8} />
            ))}
          </svg>
        </AbsoluteFill>
      </CameraDrift>
      <ScanLines spacing={4} speed={0.3} opacity={0.02} />
      <CRTFlicker period={140} intensity={0.022} />
    </AbsoluteFill>
  );
};

// ─── S6 · Kernel compression 12,842→1,928 (25–32s, 210f) ──────────────
//   Layers: BinaryRain matrix data streams (left+right) + hairline grid +
//   dual-stage number transition + spring shrinking bar + GlassBadge "−85%".
//   SFX: typewriter burst + sub-thud.
const S6_Kernel: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = interpolate(frame, [0, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const tBig = interpolate(frame, [10, 80], [12842, 1928], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const bigOpacity = interpolate(frame, [60, 100], [1, 0.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const smallShow = interpolate(frame, [70, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const barShrinkSpring = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 200, stiffness: 80, mass: 0.6 } });
  const barScale = 1 - barShrinkSpring * (1 - 1928 / 12842);
  const formatted = Math.round(tBig).toLocaleString("en-US");
  return (
    <AbsoluteFill style={{ background: BG, opacity: enter }}>
      {/* Matrix-style data streams falling on left + right */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 360, height: 1080, opacity: 0.35 }}>
        <BinaryRain density={28} speed={6} opacity={0.85} />
      </div>
      <div style={{ position: "absolute", right: 0, top: 0, width: 360, height: 1080, opacity: 0.35 }}>
        <BinaryRain density={28} speed={6} opacity={0.85} />
      </div>
      <HairlineGrid count={16} orientation="mixed" startFrame={0} drawDuration={50} holdDuration={130} exitDuration={30} opacity={0.06} />
      <CameraDrift amplitude={6} scale={0.006} period={300}>
        {/* Eyebrow */}
        <div style={{ position: "absolute", top: 70, left: 90 }}>
          <GlyphScramble
            text="03 · KERNEL · OPTIMISATION LAYER"
            startFrame={4}
            resolveDuration={20}
            staggerFrames={0.9}
            fontSize={12}
            letterSpacing="0.28em"
            color={TEXT}
          />
        </div>
        {/* Center stack */}
        <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 22 }}>
          {/* Kernel mark above */}
          <div
            style={{
              opacity: interpolate(frame, [4, 36], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut }),
              transform: `translateY(${(1 - interpolate(frame, [4, 36], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })) * 8}px)`,
              marginBottom: 4,
              filter: "grayscale(1) brightness(1.15)",
            }}
          >
            <Img
              src={staticFile("logos/kernel-mark.svg")}
              style={{ width: 60, height: 60, objectFit: "contain", opacity: 0.95 }}
            />
          </div>
          {/* Big number that dissolves */}
          <div
            style={{
              fontFamily: FONT,
              fontSize: 138,
              fontWeight: 500,
              color: TEXT,
              letterSpacing: "-0.03em",
              fontVariantNumeric: "tabular-nums",
              opacity: bigOpacity,
              transform: `scale(${1 - 0.15 * (1 - bigOpacity)})`,
            }}
          >
            {formatted}
            <span style={{ fontFamily: MONO, fontSize: 22, color: MUTED, letterSpacing: "0.25em", marginLeft: 22 }}>TOKENS</span>
          </div>
          {/* Bar shrinks via spring */}
          <div style={{ width: 760, height: 1, background: FAINT, position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                height: 1,
                width: 760 * barScale,
                background: TEXT,
                opacity: 0.7,
                boxShadow: `0 0 6px ${TEXT}33`,
              }}
            />
          </div>
          {/* Small final number that materializes */}
          <div
            style={{
              fontFamily: FONT,
              fontSize: 64,
              fontWeight: 500,
              color: TEXT,
              letterSpacing: "-0.02em",
              fontVariantNumeric: "tabular-nums",
              opacity: smallShow,
              transform: `translateY(${(1 - smallShow) * 12}px)`,
              marginTop: 12,
            }}
          >
            1,928 <span style={{ fontFamily: MONO, fontSize: 14, color: MUTED, letterSpacing: "0.28em", marginLeft: 14 }}>SAME OUTPUT</span>
          </div>
          {/* −85% badge (glass) */}
          <div style={{ marginTop: 20 }}>
            <GlassBadge startFrame={120}>− 85% · COST</GlassBadge>
          </div>
        </AbsoluteFill>
      </CameraDrift>
      <ScanLines spacing={3} speed={0.5} opacity={0.025} />
      <CRTFlicker period={110} intensity={0.025} />
    </AbsoluteFill>
  );
};

// ─── S7 · CEPHALO mark + family (32–40s, 240f) ────────────────────────
//   Layers: 3D scene with camera dolly + particles + halo + spring-enter
//   logo + 3x→1x kinetic CEPHALO + 2-product family row spring-staggered +
//   URL glyph-scramble + final fade. SFX: orchestral swell + final impact.
const S7_Wordmark: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const masterFade = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut }
  );
  const family = ["POLYPUS", "KERNEL"] as const;
  const markSpring = spring({ frame: Math.max(0, frame - 5), fps, config: SPRING_HERO });
  // 3x→1x scale entry on CEPHALO wordmark
  const wordSpring = spring({ frame: Math.max(0, frame - 25), fps, config: SPRING_HERO, durationInFrames: 50 });
  const wordScale = 3 - 2 * wordSpring;
  const wordOpacity = interpolate(frame, [25, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut });
  return (
    <AbsoluteFill style={{ background: BG, opacity: masterFade }}>
      {/* 3D depth layer with camera dolly */}
      <CephaloThreeScene rings={3} particleCount={48} cameraDolly />
      <ParticleStream count={120} speed={0.3} size={1.4} opacity={0.3} />
      <Halo size={1400} opacity={0.08} period={240} />
      <CameraDrift amplitude={4} scale={0.004} period={300}>
        <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 50 }}>
          {/* CEPHALO mark above */}
          <div
            style={{
              opacity: markSpring,
              transform: `scale(${0.7 + 0.3 * markSpring})`,
              marginBottom: -10,
              filter: "grayscale(1) brightness(1.05)",
            }}
          >
            <Img
              src={staticFile("logos/cephalo-mark.png")}
              style={{ width: 110, height: 110, objectFit: "contain", opacity: 0.95 }}
            />
          </div>
          {/* Wordmark — 3x→1x scale entry */}
          <div
            style={{
              opacity: wordOpacity,
              transform: `scale(${wordScale})`,
              transformOrigin: "center",
            }}
          >
            <span
              style={{
                fontFamily: FONT,
                fontSize: 208,
                fontWeight: 600,
                letterSpacing: "-0.04em",
                color: TEXT,
                lineHeight: 1,
                textShadow: `0 0 60px ${TEXT}22`,
              }}
            >
              CEPHALO
            </span>
          </div>
          {/* Family row — Polypus + Kernel logos with names, spring-staggered */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 80,
              marginTop: 16,
            }}
          >
            {family.map((b, i) => {
              const s = spring({ frame: Math.max(0, frame - 80 - i * 14), fps, config: SPRING_HERO });
              return (
                <div
                  key={b}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 12,
                    opacity: s,
                    transform: `translateY(${(1 - s) * 14}px) scale(${0.85 + 0.15 * s})`,
                  }}
                >
                  <div style={{ filter: "grayscale(1) brightness(1.2)" }}>
                    <Img
                      src={staticFile(b === "POLYPUS" ? "logos/polypus-mark.svg" : "logos/kernel-mark.svg")}
                      style={{ width: 48, height: 48, objectFit: "contain", opacity: 0.95 }}
                    />
                  </div>
                  <div style={{ fontFamily: MONO }}>
                    <GlyphScramble
                      text={b}
                      startFrame={90 + i * 14}
                      resolveDuration={20}
                      staggerFrames={1.2}
                      fontSize={12}
                      letterSpacing="0.32em"
                      color={MUTED}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          {/* URL */}
          <div
            style={{
              fontFamily: MONO,
              fontSize: 13,
              color: MUTED,
              letterSpacing: "0.32em",
              opacity: interpolate(frame, [160, 200], [0, 0.7], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              marginTop: 24,
            }}
          >
            CEPHALON.AI · LISBOA · 2026
          </div>
        </AbsoluteFill>
      </CameraDrift>
      <ScanLines spacing={4} speed={0.25} opacity={0.02} />
      <CRTFlicker period={130} intensity={0.022} />
    </AbsoluteFill>
  );
};

// ─── Root composition ─────────────────────────────────────────────────
const HARD_CUT = 1;

export const CephaloLabs: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: BG, color: TEXT, fontFamily: FONT }}>
      <Audio src={staticFile("music/cephalo-main.mp3")} volume={0.32} />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={S1_LEN}>
          <S1_ColdOpen durationInFrames={S1_LEN} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: HARD_CUT })} />
        <TransitionSeries.Sequence durationInFrames={S2_LEN}>
          <S2_Anchor durationInFrames={S2_LEN} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: HARD_CUT })} />
        <TransitionSeries.Sequence durationInFrames={S3_LEN}>
          <S3_Eyebrow durationInFrames={S3_LEN} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: HARD_CUT })} />
        <TransitionSeries.Sequence durationInFrames={S4_LEN}>
          <S4_Polypus durationInFrames={S4_LEN} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: HARD_CUT })} />
        <TransitionSeries.Sequence durationInFrames={S5_LEN}>
          <S5_Pantheon durationInFrames={S5_LEN} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: HARD_CUT })} />
        <TransitionSeries.Sequence durationInFrames={S6_LEN}>
          <S6_Kernel durationInFrames={S6_LEN} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: HARD_CUT })} />
        <TransitionSeries.Sequence durationInFrames={S7_LEN}>
          <S7_Wordmark durationInFrames={S7_LEN} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <Vignette strength={0.65} />
      <Grain opacity={0.04} />
      <div style={{ filter: "grayscale(1) brightness(1.1)" }}>
        <LogoSigil brand="cephalo" position="bottom-left" size={20} opacity={0.32} />
      </div>
    </AbsoluteFill>
  );
};
