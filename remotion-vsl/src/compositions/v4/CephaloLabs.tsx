import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  useCurrentFrame,
  staticFile,
  Easing,
  Img,
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
import { TextScramble } from "../../primitives/motion-graphics";
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

// ═════════════════════════════════════════════════════════════════════════
//  VSL-02 · CEPHALO LABS · v4.2 · 40s @ 30fps · 1200 frames · 1920x1080
//  STRICT BLACK & WHITE. Editorial · cinematic · dense.
//  Every scene runs 3-5 simultaneous motion layers.
//  No coloured accents. Light is structure; absence is silence.
// ═════════════════════════════════════════════════════════════════════════

const BG = "#0A0A0A";
const TEXT = "#F5F5F0";
const MUTED = "#8A8A82";
const FAINT = "rgba(245,245,240,0.18)";

// ── Scene durations (frames @ 30fps) ───────────────────────────────────
const S1_LEN = 90;
const S2_LEN = 120;
const S3_LEN = 90;
const S4_LEN = 240;
const S5_LEN = 210;
const S6_LEN = 210;
const S7_LEN = 240;

export const CEPHALO_LABS_DURATION =
  S1_LEN + S2_LEN + S3_LEN + S4_LEN + S5_LEN + S6_LEN + S7_LEN;

const easeBezier = Easing.bezier(0.16, 1, 0.3, 1);

type SceneProps = { durationInFrames: number };

// ─── S1 · Cold open (0-3s) ────────────────────────────────────────────
//   Layers: deep black + breathing halo + single hairline that draws + grain
const S1_ColdOpen: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const lineW = interpolate(frame, [40, 75], [0, 380], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeBezier,
  });
  const lineOut = interpolate(frame, [82, 90], [1, 0], {
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
            opacity: 0.85 * lineOut,
          }}
        />
      </AbsoluteFill>
      <CRTFlicker period={150} intensity={0.025} />
    </AbsoluteFill>
  );
};

// ─── S2 · Anchor "We build intelligence." (3-7s) ──────────────────────
//   Layers: hairline grid drawing + char-stagger text + underline + drift +
//   secondary scrambled meta-line + grain
const S2_Anchor: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const underlineW = interpolate(frame, [50, 100], [0, 720], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeBezier,
  });
  const metaShow = interpolate(frame, [70, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeBezier,
  });
  return (
    <AbsoluteFill style={{ background: BG }}>
      <HairlineGrid count={28} orientation="horizontal" startFrame={0} drawDuration={45} holdDuration={50} exitDuration={25} opacity={0.12} />
      <CameraDrift amplitude={10} scale={0.008} period={300}>
        <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <KineticLetters
            text="We build intelligence."
            startFrame={5}
            staggerFrames={2.4}
            letterDuration={20}
            fontSize={128}
            fontWeight={500}
            color={TEXT}
            origin="below"
            driftPx={22}
          />
          <div
            style={{
              marginTop: 38,
              height: 1,
              width: underlineW,
              background: TEXT,
              opacity: 0.7,
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

// ─── S3 · Studio Lisbon coordinate beat (7-10s) ───────────────────────
//   Layers: dot field rippling + corner brackets + scrambled coordinates +
//   timestamp ticker bottom + camera drift
const S3_Eyebrow: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const cornerShow = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeBezier,
  });
  const lineW = interpolate(frame, [10, 45], [0, 480], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeBezier,
  });
  // Live timestamp (fake)
  const sec = Math.floor(frame / 30);
  const ms = Math.floor((frame % 30) * (1000 / 30));
  return (
    <AbsoluteFill style={{ background: BG }}>
      <DotField cols={70} rows={36} rippleSpeed={0.05} baseOpacity={0.05} />
      {/* Four corner brackets */}
      {[
        { top: 60, left: 80, rot: 0 },
        { top: 60, right: 80, rot: 90 },
        { bottom: 60, right: 80, rot: 180 },
        { bottom: 60, left: 80, rot: 270 },
      ].map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            ...p,
            width: 32,
            height: 32,
            borderTop: `1px solid ${TEXT}`,
            borderLeft: `1px solid ${TEXT}`,
            transform: `rotate(${p.rot}deg)`,
            opacity: cornerShow * 0.6,
          }}
        />
      ))}
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
            opacity: cornerShow * 0.55,
          }}
        >
          38°43′ N · 9°08′ W · {String(sec).padStart(2, "0")}:{String(ms).padStart(3, "0")}
        </div>
      </AbsoluteFill>
      <ScanLines spacing={4} speed={0.3} opacity={0.02} />
    </AbsoluteFill>
  );
};

// ─── S4 · Polypus showcase (10-18s) ───────────────────────────────────
//   Layers: orbiting nodes around halo + eyebrow typewriter-scramble +
//   mini code stream + bottom kicker + camera drift + halo + grain
const S4_Polypus: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeBezier,
  });
  // Code stream lines
  const codeLines = [
    "  router.dispatch(task)",
    "  → analyse(intent)",
    "  → route(model: 'haiku')",
    "  → cache.warm(ctx)",
    "  → respond(stream: true)",
    "  ✓ 0.42s · 1928 tk",
  ];
  return (
    <AbsoluteFill style={{ background: BG, opacity: enter }}>
      <CameraDrift amplitude={10} scale={0.01} period={420}>
        <Halo size={900} opacity={0.07} period={180} />
        <OrbitingNodes cx={960} cy={540} count={7} radius={300} speed={0.006} nodeSize={7} opacity={0.55} />
      </CameraDrift>
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
      {/* Center: logo + word kinetic */}
      <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
          {/* Polypus mark — desaturated */}
          <div
            style={{
              opacity: interpolate(frame, [40, 75], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeBezier }),
              transform: `scale(${0.85 + 0.15 * interpolate(frame, [40, 75], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })})`,
              marginBottom: 4,
              filter: "grayscale(1) brightness(1.15)",
            }}
          >
            <Img
              src={staticFile("logos/polypus-mark.svg")}
              style={{ width: 72, height: 72, objectFit: "contain", opacity: 0.95 }}
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
      {/* Bottom-left router log ticker */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 90,
          fontFamily: MONO,
          fontSize: 11,
          color: MUTED,
          letterSpacing: "0.16em",
          opacity: 0.5,
        }}
      >
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

// ─── S5 · Pantheon revenue €400K+ (18-25s) ────────────────────────────
//   Layers: hairline grid + hero ticker counting + breaking line graph +
//   bracket frame + camera drift + meta data lines
const S5_Pantheon: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeBezier,
  });
  // Line graph polyline points (20 nodes ascending)
  const points = Array.from({ length: 20 }, (_, i) => {
    const x = 240 + (i / 19) * 1440;
    const variance = Math.sin(i * 0.7) * 24;
    const baseY = 700 - (i / 19) * 280;
    return { x, y: baseY + variance };
  });
  const drawT = interpolate(frame, [20, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeBezier,
  });
  const segCount = Math.max(1, Math.floor(drawT * (points.length - 1)));
  return (
    <AbsoluteFill style={{ background: BG, opacity: enter }}>
      <HairlineGrid count={18} orientation="vertical" startFrame={0} drawDuration={60} holdDuration={120} exitDuration={30} opacity={0.06} />
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
          {/* Top-right meta */}
          <div style={{ position: "absolute", top: 70, right: 90, textAlign: "right" }}>
            <div style={{ fontFamily: MONO, fontSize: 11, color: MUTED, letterSpacing: "0.22em", opacity: 0.55 }}>
              REVENUE · BUILT
            </div>
            <div style={{ fontFamily: MONO, fontSize: 11, color: MUTED, letterSpacing: "0.22em", opacity: 0.5, marginTop: 4 }}>
              NOT PROJECTED
            </div>
          </div>
          {/* Hero ticker — center */}
          <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 36 }}>
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
          {/* Bottom — line graph */}
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

// ─── S6 · Kernel compression 12,842 → 1,928 (25-32s) ──────────────────
//   Layers: dual numbers (large dissolving, small materializing) + bar
//   compression + −85% counter + hairline frame + meta + flicker
const S6_Kernel: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeBezier,
  });
  const tBig = interpolate(frame, [10, 80], [12842, 1928], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeBezier,
  });
  const bigOpacity = interpolate(frame, [60, 100], [1, 0.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeBezier,
  });
  const smallShow = interpolate(frame, [70, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeBezier,
  });
  const pctShow = interpolate(frame, [110, 145], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeBezier,
  });
  const barScale = interpolate(frame, [10, 100], [1, 1928 / 12842], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeBezier,
  });
  const formatted = Math.round(tBig).toLocaleString("en-US");
  return (
    <AbsoluteFill style={{ background: BG, opacity: enter }}>
      <HairlineGrid count={20} orientation="mixed" startFrame={0} drawDuration={50} holdDuration={130} exitDuration={30} opacity={0.07} />
      <CameraDrift amplitude={8} scale={0.008} period={300}>
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
        <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24 }}>
          {/* Kernel mark above the numbers — desaturated */}
          <div
            style={{
              opacity: interpolate(frame, [4, 36], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeBezier }),
              transform: `translateY(${(1 - interpolate(frame, [4, 36], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })) * 8}px)`,
              marginBottom: 4,
              filter: "grayscale(1) brightness(1.15)",
            }}
          >
            <Img
              src={staticFile("logos/kernel-mark.svg")}
              style={{ width: 64, height: 64, objectFit: "contain", opacity: 0.95 }}
            />
          </div>
          {/* Big number that shrinks then dissolves */}
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
          {/* Bar shrinks */}
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
          {/* −85% reveal */}
          <div
            style={{
              fontFamily: MONO,
              fontSize: 18,
              color: TEXT,
              letterSpacing: "0.32em",
              opacity: pctShow,
              transform: `translateY(${(1 - pctShow) * 8}px)`,
              marginTop: 16,
            }}
          >
            − 85% · COST
          </div>
        </AbsoluteFill>
      </CameraDrift>
      <ScanLines spacing={3} speed={0.5} opacity={0.025} />
      <CRTFlicker period={110} intensity={0.025} />
    </AbsoluteFill>
  );
};

// ─── S7 · CEPHALO mark + family (32-40s) ──────────────────────────────
//   Layers: starfield-like particles + halo + char-stagger CEPHALO +
//   product family glyph-scramble row + URL + drift + final fade
const S7_Wordmark: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const masterFade = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeBezier }
  );
  const family = ["POLYPUS", "KERNEL"];
  return (
    <AbsoluteFill style={{ background: BG, opacity: masterFade }}>
      <ParticleStream count={120} speed={0.3} size={1.4} opacity={0.35} />
      <Halo size={1400} opacity={0.08} period={240} />
      <CameraDrift amplitude={6} scale={0.005} period={300}>
        <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 50 }}>
          {/* CEPHALO mark above */}
          <div
            style={{
              opacity: interpolate(frame, [10, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeBezier }),
              transform: `scale(${0.9 + 0.1 * interpolate(frame, [10, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })})`,
              marginBottom: -10,
              filter: "grayscale(1) brightness(1.05)",
            }}
          >
            <Img
              src={staticFile("logos/cephalo-mark.png")}
              style={{ width: 96, height: 96, objectFit: "contain", opacity: 0.95 }}
            />
          </div>
          {/* Wordmark — kinetic letters */}
          <KineticLetters
            text="CEPHALO"
            startFrame={20}
            staggerFrames={4}
            letterDuration={28}
            fontSize={208}
            fontWeight={600}
            letterSpacing="-0.04em"
            color={TEXT}
            origin="below"
            driftPx={28}
          />
          {/* Family row — 2 product logos with names beneath, desaturated */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 80,
              marginTop: 16,
            }}
          >
            {family.map((b, i) => {
              const enter = interpolate(frame, [90 + i * 14, 130 + i * 14], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: easeBezier,
              });
              return (
                <div
                  key={b}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 12,
                    opacity: enter,
                    transform: `translateY(${(1 - enter) * 10}px)`,
                  }}
                >
                  <div style={{ filter: "grayscale(1) brightness(1.2)" }}>
                    <Img
                      src={staticFile(b === "POLYPUS" ? "logos/polypus-mark.svg" : "logos/kernel-mark.svg")}
                      style={{ width: 44, height: 44, objectFit: "contain", opacity: 0.95 }}
                    />
                  </div>
                  <div style={{ fontFamily: MONO }}>
                    <GlyphScramble
                      text={b}
                      startFrame={100 + i * 14}
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
      {/* Persistent CEPHALO sigil — desaturated, very subtle */}
      <div style={{ filter: "grayscale(1) brightness(1.1)" }}>
        <LogoSigil brand="cephalo" position="bottom-left" size={20} opacity={0.32} />
      </div>
    </AbsoluteFill>
  );
};

// Silence unused-import lint for primitives we expose for later use.
void TextScramble;
