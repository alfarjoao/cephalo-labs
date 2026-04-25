import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  useCurrentFrame,
  staticFile,
  Easing,
} from "remotion";
import {
  TransitionSeries,
  linearTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

import {
  INK,
  PURPLE,
  PURPLE_DEEP,
  GOLD,
  GOLD_SOFT,
  FONT,
  MONO,
  easeOut,
  easeInOut,
  Vignette,
  Starfield,
  GodRays,
  Sparkle,
  Grain,
} from "../../primitives/cinematic";
import {
  Odometer,
  PulseRing,
  ParticleBurst,
  Flash,
  Lightbar,
  KineticText,
} from "../../primitives/motion-graphics";
import { LogoWatermark, LogoLockup, LogoSigil } from "../../primitives/logo-lockup";

// ═════════════════════════════════════════════════════════════════════════
//  VSL-02 · CEPHALO LABS · v4.1 · 40s @ 30fps · 1200 frames · 1920x1080
//  Editorial · cinematic · alive. Brand → Studio → Products → Mark.
//  Color welcome. Motion welcome. Logos integrated. Music + ambient bed.
// ═════════════════════════════════════════════════════════════════════════

const BG = "#0A0A0A";
const TEXT = "#F5F5F0";
const MUTED = "#8A8A82";
const KERNEL_CYAN = "#7DD3FC"; // electric cool — Kernel optimisation accent

// ── Scene durations (frames @ 30fps) ───────────────────────────────────
const S1_LEN = 90;   // 0-3s · cold open · single sparkle
const S2_LEN = 120;  // 3-7s · anchor "We build intelligence."
const S3_LEN = 90;   // 7-10s · eyebrow "A STUDIO. LISBON."
const S4_LEN = 240;  // 10-18s · Polypus showcase
const S5_LEN = 210;  // 18-25s · Pantheon revenue
const S6_LEN = 210;  // 25-32s · Kernel compression
const S7_LEN = 240;  // 32-40s · CEPHALO mark + family

export const CEPHALO_LABS_DURATION =
  S1_LEN + S2_LEN + S3_LEN + S4_LEN + S5_LEN + S6_LEN + S7_LEN;

const easeBezier = Easing.bezier(0.16, 1, 0.3, 1);

type SceneProps = { durationInFrames: number };

// ─── Atmosphere · subtle animated gradient bloom that drifts ──────────
const Atmosphere: React.FC<{ tone?: "purple" | "gold" | "cyan" | "neutral" }> = ({
  tone = "purple",
}) => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 90) * 90;
  const tint =
    tone === "gold" ? GOLD : tone === "cyan" ? KERNEL_CYAN : tone === "neutral" ? "#3A3A40" : PURPLE;
  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          left: -200 + drift,
          top: -300,
          width: 2400,
          height: 1600,
          background: `radial-gradient(ellipse at 30% 40%, ${tint}22 0%, transparent 60%)`,
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -400,
          bottom: -400,
          width: 1800,
          height: 1400,
          background: `radial-gradient(ellipse at 70% 60%, ${tint}18 0%, transparent 65%)`,
          filter: "blur(70px)",
          transform: `translate(${-drift}px, 0)`,
        }}
      />
    </AbsoluteFill>
  );
};

// ─── S1 · Cold open (0-3s) · darkness + single sparkle that grows ─────
const S1_ColdOpen: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const sparkleShow = interpolate(frame, [30, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeBezier,
  });
  const sparkleFade = interpolate(frame, [75, 90], [1, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ background: BG }}>
      <Atmosphere tone="purple" />
      <Starfield count={60} tone="purple" intensity={0.5} direction="up" />
      <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            opacity: sparkleShow * sparkleFade,
            transform: `scale(${0.6 + sparkleShow * 0.5})`,
          }}
        >
          <Sparkle size={120} color={PURPLE} opacity={sparkleShow * sparkleFade} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─── S2 · Anchor "We build intelligence." (3-7s) ───────────────────────
const S2_Anchor: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const textOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeBezier,
  });
  const textTranslate = interpolate(frame, [0, 30], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeBezier,
  });
  const underlineWidth = interpolate(frame, [30, 75], [0, 540], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeBezier,
  });
  const bloomShow = interpolate(frame, [10, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Sparkle on underline completion (~frame 75)
  const sparkleAt = frame >= 70 && frame <= 95;
  return (
    <AbsoluteFill style={{ background: BG }}>
      <Atmosphere tone="purple" />
      {/* Behind-text purple bloom */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 1100,
          height: 360,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(ellipse at center, ${PURPLE}33 0%, transparent 60%)`,
          filter: "blur(50px)",
          opacity: bloomShow * 0.85,
          pointerEvents: "none",
        }}
      />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: FONT,
            fontSize: 124,
            fontWeight: 500,
            color: TEXT,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            opacity: textOpacity,
            transform: `translateY(${textTranslate}px)`,
            textShadow: `0 0 80px ${PURPLE}33`,
          }}
        >
          We build intelligence.
        </div>
        <div
          style={{
            marginTop: 38,
            position: "relative",
            height: 2,
            width: underlineWidth,
            background: `linear-gradient(90deg, transparent 0%, ${PURPLE} 30%, ${PURPLE} 70%, transparent 100%)`,
            opacity: 0.9,
            boxShadow: `0 0 14px ${PURPLE}88`,
          }}
        />
      </AbsoluteFill>
      {sparkleAt && (
        <ParticleBurst
          cx={960}
          cy={600}
          startFrame={70}
          count={18}
          maxRadius={140}
          tone="purple"
          nowFrame={frame}
        />
      )}
    </AbsoluteFill>
  );
};

// ─── S3 · Eyebrow "A STUDIO. LISBON. 2026." (7-10s) ───────────────────
const S3_Eyebrow: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [5, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeBezier,
  });
  const lineDraw = interpolate(frame, [20, 70], [0, 320], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeBezier,
  });
  return (
    <AbsoluteFill style={{ background: BG }}>
      <Atmosphere tone="purple" />
      <GodRays tone="purple" intensity={0.4} beams={2} />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            opacity,
          }}
        >
          <div style={{ height: 1, width: lineDraw / 2, background: `${PURPLE}88` }} />
          <div
            style={{
              fontFamily: MONO,
              fontSize: 15,
              fontWeight: 400,
              color: TEXT,
              letterSpacing: "0.34em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            A STUDIO · LISBON · 2026
          </div>
          <div style={{ height: 1, width: lineDraw / 2, background: `${PURPLE}88` }} />
        </div>
        <div
          style={{
            fontFamily: MONO,
            fontSize: 11,
            color: MUTED,
            opacity: opacity * 0.7,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
          }}
        >
          38°43′ N · 9°08′ W
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─── S4 · Polypus showcase (10-18s) ───────────────────────────────────
const S4_Polypus: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeBezier,
  });
  const logoIn = interpolate(frame, [10, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeBezier,
  });
  // Router pulse ~ local 130-180
  const pulseActive = frame >= 130 && frame <= 180;
  // Animated nodes — 5 small lit nodes around the logo
  const nodes = [
    { x: 720, y: 540, delay: 60 },
    { x: 1200, y: 540, delay: 75 },
    { x: 960, y: 360, delay: 90 },
    { x: 820, y: 700, delay: 105 },
    { x: 1100, y: 700, delay: 120 },
  ];
  return (
    <AbsoluteFill style={{ background: BG, opacity: enter }}>
      <Atmosphere tone="purple" />
      {/* Eyebrow top-left */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 90,
          fontFamily: MONO,
          fontSize: 13,
          color: TEXT,
          opacity: 0.65,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
        }}
      >
        01 · POLYPUS · DESKTOP AI ORCHESTRATOR
      </div>
      {/* Center: Polypus logo lockup, glowing */}
      <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ opacity: logoIn, transform: `scale(${0.85 + 0.15 * logoIn})` }}>
          <LogoLockup brand="polypus" size={260} show={logoIn} kicker="POLYPUS" tint={`${PURPLE}99`} />
        </div>
      </AbsoluteFill>
      {/* Animated routing nodes around the logo */}
      {nodes.map((n, i) => {
        const t = interpolate(frame, [n.delay, n.delay + 30], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: easeBezier,
        });
        const pulse = 0.8 + 0.2 * Math.sin((frame + i * 12) / 6);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: n.x,
              top: n.y,
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: PURPLE,
              opacity: t * pulse,
              boxShadow: `0 0 20px ${PURPLE}, 0 0 40px ${PURPLE}88`,
            }}
          />
        );
      })}
      {/* Connecting lines fading in */}
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", left: 0, top: 0, opacity: enter * 0.6 }}
      >
        {nodes.map((n, i) => {
          const t = interpolate(frame, [n.delay + 10, n.delay + 50], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: easeBezier,
          });
          return (
            <line
              key={i}
              x1={960}
              y1={540}
              x2={n.x + 6}
              y2={n.y + 6}
              stroke={PURPLE}
              strokeOpacity={t * 0.35}
              strokeWidth={1}
            />
          );
        })}
      </svg>
      {/* Pulse ring on logo center */}
      {pulseActive && (
        <PulseRing
          cx={960}
          cy={540}
          tone="purple"
          maxRadius={180}
          rings={2}
          period={50}
          lineWidth={1.5}
          opacity={0.9}
        />
      )}
      {/* Bottom kicker */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 80,
          transform: "translateX(-50%)",
          fontFamily: MONO,
          fontSize: 13,
          color: MUTED,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          opacity: enter * 0.85,
        }}
      >
        ORCHESTRATES · ROUTES · REMEMBERS
      </div>
    </AbsoluteFill>
  );
};

// ─── S5 · Pantheon revenue (18-25s) — gold theme ──────────────────────
const S5_Pantheon: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeBezier,
  });
  const logoIn = interpolate(frame, [10, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeBezier,
  });
  const subShow = interpolate(frame, [80, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeBezier,
  });
  // Light bar sweep on impact
  const sweepActive = frame >= 60 && frame <= 100;
  return (
    <AbsoluteFill style={{ background: BG, opacity: enter }}>
      <Atmosphere tone="gold" />
      {sweepActive && (
        <Lightbar startFrame={60} duration={40} tone="gold" y={540} height={2} nowFrame={frame} />
      )}
      {/* Eyebrow top-left */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 90,
          fontFamily: MONO,
          fontSize: 13,
          color: TEXT,
          opacity: 0.65,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
        }}
      >
        02 · PANTHEON GROWTH · CASE
      </div>
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
        }}
      >
        {/* Pantheon mark */}
        <div style={{ opacity: logoIn, marginBottom: 8 }}>
          <Img
            src={staticFile("logos/pantheon-growth.png")}
            style={{
              width: 64,
              height: 64,
              objectFit: "contain",
              filter: `drop-shadow(0 0 24px ${GOLD}66)`,
            }}
          />
        </div>
        <Odometer
          value={400}
          prefix="€"
          suffix="K+"
          fromFrame={20}
          duration={70}
          nowFrame={frame}
          size={170}
          color={GOLD_SOFT}
        />
        <div
          style={{
            fontFamily: FONT,
            fontSize: 22,
            fontWeight: 400,
            color: GOLD,
            opacity: subShow,
            letterSpacing: 0,
            textShadow: `0 0 20px ${GOLD}55`,
          }}
        >
          revenue · built · not projected
        </div>
        <div
          style={{
            fontFamily: MONO,
            fontSize: 12,
            color: MUTED,
            opacity: subShow * 0.7,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            marginTop: 10,
          }}
        >
          Studio · Portugal · Operated by Cephalo Labs
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─── S6 · Kernel compression (25-32s) — cyan theme ────────────────────
const S6_Kernel: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeBezier,
  });
  const logoIn = interpolate(frame, [10, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeBezier,
  });
  const tokenValue = interpolate(frame, [10, 160], [12842, 1928], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeBezier,
  });
  const formatted = Math.round(tokenValue).toLocaleString("en-US");
  const barScale = interpolate(frame, [10, 160], [1, 1928 / 12842], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeBezier,
  });
  // Compression "schlink" flash at end of shrink
  const flashAt = frame >= 155 && frame <= 175;
  return (
    <AbsoluteFill style={{ background: BG, opacity: enter }}>
      <Atmosphere tone="cyan" />
      {flashAt && <Flash at={155} duration={20} color={KERNEL_CYAN} intensity={0.18} nowFrame={frame} />}
      {/* Eyebrow top-left */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 90,
          fontFamily: MONO,
          fontSize: 13,
          color: TEXT,
          opacity: 0.65,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
        }}
      >
        03 · KERNEL · OPTIMISATION LAYER · EARLY ACCESS
      </div>
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
        }}
      >
        {/* Kernel mark */}
        <div style={{ opacity: logoIn, marginBottom: 4 }}>
          <Img
            src={staticFile("logos/kernel-mark.svg")}
            style={{
              width: 72,
              height: 72,
              objectFit: "contain",
              filter: `drop-shadow(0 0 24px ${KERNEL_CYAN}88) brightness(1.4)`,
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 30,
          }}
        >
          <div
            style={{
              fontFamily: FONT,
              fontSize: 120,
              fontWeight: 500,
              color: TEXT,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
              textShadow: `0 0 30px ${KERNEL_CYAN}44`,
            }}
          >
            {formatted}
            <span
              style={{
                fontFamily: MONO,
                fontSize: 22,
                fontWeight: 400,
                color: KERNEL_CYAN,
                letterSpacing: "0.25em",
                marginLeft: 24,
                verticalAlign: "middle",
                textTransform: "uppercase",
                opacity: 0.85,
              }}
            >
              tokens
            </span>
          </div>
          {/* Bar shrinks proportionally */}
          <div
            style={{
              width: 760,
              height: 3,
              background: "rgba(245,245,240,0.08)",
              position: "relative",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                height: 3,
                width: 760 * barScale,
                background: `linear-gradient(90deg, ${KERNEL_CYAN} 0%, ${KERNEL_CYAN}99 100%)`,
                boxShadow: `0 0 14px ${KERNEL_CYAN}`,
                borderRadius: 2,
              }}
            />
          </div>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 12,
              color: MUTED,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              marginTop: 8,
            }}
          >
            same task · −85% cost
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─── S7 · CEPHALO mark + product family + final fade (32-40s) ─────────
const S7_Wordmark: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const wordOpacity = interpolate(frame, [10, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeBezier,
  });
  const familyShow = interpolate(frame, [80, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeBezier,
  });
  const urlOpacity = interpolate(frame, [120, 160], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeBezier,
  });
  const masterFade = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeBezier }
  );
  const family = [
    { brand: "polypus" as const, label: "POLYPUS" },
    { brand: "kernel" as const, label: "KERNEL" },
    { brand: "pantheon" as const, label: "PANTHEON" },
    { brand: "sovereign" as const, label: "SOVEREIGN" },
  ];
  return (
    <AbsoluteFill
      style={{
        background: BG,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: masterFade,
        gap: 40,
      }}
    >
      <Atmosphere tone="purple" />
      {/* Big purple bloom behind wordmark */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "44%",
          width: 1600,
          height: 700,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(ellipse at center, ${PURPLE}38 0%, ${PURPLE_DEEP}1A 30%, transparent 65%)`,
          filter: "blur(70px)",
          opacity: wordOpacity * 0.85,
          pointerEvents: "none",
        }}
      />
      {/* CEPHALO mark above wordmark */}
      <div
        style={{
          opacity: wordOpacity,
          transform: `translateY(${(1 - wordOpacity) * 18}px) scale(${0.92 + 0.08 * wordOpacity})`,
        }}
      >
        <Img
          src={staticFile("logos/cephalo-mark.png")}
          style={{
            width: 110,
            height: 110,
            objectFit: "contain",
            filter: `drop-shadow(0 0 28px ${PURPLE}88)`,
          }}
        />
      </div>
      <div
        style={{
          fontFamily: FONT,
          fontSize: 196,
          fontWeight: 600,
          color: TEXT,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          opacity: wordOpacity,
          transform: `translateY(${(1 - wordOpacity) * 16}px)`,
          textShadow: `0 0 60px ${PURPLE}66, 0 0 120px ${PURPLE_DEEP}44`,
        }}
      >
        CEPHALO
      </div>
      {/* Product family — 4 small marks in a row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 56,
          marginTop: 24,
          opacity: familyShow,
          transform: `translateY(${(1 - familyShow) * 12}px)`,
        }}
      >
        {family.map((p, i) => (
          <div
            key={p.brand}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              opacity: interpolate(
                frame,
                [80 + i * 8, 110 + i * 8],
                [0, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: easeBezier,
                }
              ),
            }}
          >
            <Img
              src={staticFile(
                p.brand === "polypus"
                  ? "logos/polypus-mark.svg"
                  : p.brand === "kernel"
                  ? "logos/kernel-mark.svg"
                  : p.brand === "pantheon"
                  ? "logos/pantheon-growth.png"
                  : "logos/sovereign-mark.png"
              )}
              style={{
                width: 36,
                height: 36,
                objectFit: "contain",
                opacity: 0.9,
                filter: `drop-shadow(0 0 10px ${PURPLE}44)`,
              }}
            />
            <span
              style={{
                fontFamily: MONO,
                fontSize: 10,
                color: MUTED,
                letterSpacing: "0.28em",
              }}
            >
              {p.label}
            </span>
          </div>
        ))}
      </div>
      <div
        style={{
          fontFamily: MONO,
          fontSize: 13,
          fontWeight: 400,
          color: MUTED,
          letterSpacing: "0.3em",
          marginTop: 30,
          opacity: urlOpacity,
        }}
      >
        cephalon.ai · Lisbon · 2026
      </div>
    </AbsoluteFill>
  );
};

// ─── Root composition ─────────────────────────────────────────────────
const HARD_CUT = 1;

export const CephaloLabs: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: BG, color: INK.text, fontFamily: FONT }}>
      {/* Background music — light ambient bed */}
      <Audio src={staticFile("music/cephalo-main.mp3")} volume={0.35} />
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
      <Vignette strength={0.6} />
      <Grain opacity={0.025} />
      {/* Persistent CEPHALO sigil bottom-left */}
      <LogoSigil brand="cephalo" position="bottom-left" size={22} opacity={0.4} />
    </AbsoluteFill>
  );
};

// Silence unused-import lints for primitives we may wire later.
void KineticText;
void easeOut;
void easeInOut;
