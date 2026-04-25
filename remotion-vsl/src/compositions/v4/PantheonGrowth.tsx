import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  TransitionSeries,
  linearTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

import {
  GOLD,
  GOLD_SOFT,
  Vignette,
  Grain,
  easeOut,
  PantheonDashboard,
} from "../../primitives/cinematic";
import { LineGraph, Odometer } from "../../primitives/motion-graphics";

// ═══════════════════════════════════════════════════════════════════════════
//  VSL-03 · PANTHEON GROWTH · 50s @ 30fps · 1500 frames · 1920×1080
//  Brand: Pantheon (separate from CEPHALO).
//  Palette: bg #0A0A0A · text #F5F5F0 · muted #888880 · gold #B68B4A.
//  Fonts: Inter (display) + JetBrains Mono (mono) — system-ui fallbacks.
//  Mood: champagne, monumental, premium-quiet, editorial.
//  Numbers are the heroes. Cuts are hard. The agency arrives at the end.
// ═══════════════════════════════════════════════════════════════════════════

const BG = "#0A0A0A";
const TEXT = "#F5F5F0";
const MUTED = "#888880";
const GOLD_BRIGHT = "#C9A84C"; // brand: accent-gold-bright

// Font fallbacks (Inter + JetBrains Mono not in node_modules; use system-ui)
const P_FONT =
  "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const P_MONO =
  "'JetBrains Mono', ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace";

// ── Per-scene durations (sum: 60+120+300+240+270+210+210+90 = 1500) ───────
const S1 = 60;   // 0–60     0.0 – 2.0s   gold dot
const S2 = 120;  // 60–180   2.0 – 6.0s   anchor "We don't consult. / We operate."
const S3 = 300;  // 180–480  6.0 – 16.0s  revenue LineGraph
const S4 = 240;  // 480–720  16.0 – 24.0s 4 odometers grid
const S5 = 270;  // 720–990  24.0 – 33.0s Pantheon CRM screen
const S6 = 210;  // 990–1200 33.0 – 40.0s ecosystems cards
const S7 = 210;  // 1200–1410 40.0 – 47.0s PANTHEON × CEPHALO crossmark
const S8 = 90;   // 1410–1500 47.0 – 50.0s wordmark + CTA + fade-out

export const PANTHEON_GROWTH_DURATION =
  S1 + S2 + S3 + S4 + S5 + S6 + S7 + S8; // = 1500

// ─────────────────────────────────────────────────────────────────────────
// Shared eyebrow
// ─────────────────────────────────────────────────────────────────────────
const Eyebrow: React.FC<{
  children: React.ReactNode;
  show: number;
  position?: "top-left" | "center";
}> = ({ children, show, position = "top-left" }) => {
  const baseStyle: React.CSSProperties = {
    fontFamily: P_MONO,
    fontSize: 13,
    fontWeight: 400,
    color: TEXT,
    opacity: show * 0.6,
    letterSpacing: "0.25em",
    textTransform: "uppercase",
  };
  if (position === "top-left") {
    return (
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 96,
          ...baseStyle,
        }}
      >
        {children}
      </div>
    );
  }
  return <div style={baseStyle}>{children}</div>;
};

// ─────────────────────────────────────────────────────────────────────────
// SCENE 1 · 0–2s · canvas + opening gold dot
// ─────────────────────────────────────────────────────────────────────────
const Scene1_Dot: React.FC = () => {
  const frame = useCurrentFrame();
  const a = interpolate(frame, [0, 20], [0, 1], {
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
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: GOLD,
          opacity: a,
          boxShadow: `0 0 60px ${GOLD}, 0 0 120px ${GOLD}66`,
        }}
      />
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────
// SCENE 2 · 2–6s · gold dot expands → eyebrow → "We don't consult." → "We operate."
//
// Local frames 0–119 map to global 60–179.
// Global timing marks:
//   60–110  line expands from 12 → 480px (gold @ 50% opacity)
//   75–105  eyebrow "PANTHEON GROWTH · LISBON"
//   110–140 "We don't consult." (Inter 500, white)
//   145–175 "We operate." (Inter 600, gold)
// ─────────────────────────────────────────────────────────────────────────
const Scene2_Anchor: React.FC = () => {
  const local = useCurrentFrame();
  const f = local + S1; // global frame for timing-mark parity with brief

  const lineW = interpolate(f, [60, 110], [12, 480], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const eyebrowA = interpolate(f, [75, 105], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const l1A = interpolate(f, [110, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const l2A = interpolate(f, [145, 175], [0, 1], {
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
      {/* eyebrow */}
      <div
        style={{
          fontFamily: P_MONO,
          fontSize: 12,
          color: MUTED,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          opacity: eyebrowA,
          marginBottom: 40,
        }}
      >
        PANTHEON GROWTH · LISBON
      </div>

      {/* gold horizontal line (was the dot) */}
      <div
        style={{
          width: lineW,
          height: 1,
          background: GOLD,
          opacity: 0.5,
          boxShadow: `0 0 14px ${GOLD}66`,
          marginBottom: 56,
        }}
      />

      {/* line 1 — Inter 500 white */}
      <div
        style={{
          fontFamily: P_FONT,
          fontSize: 78,
          fontWeight: 500,
          color: TEXT,
          letterSpacing: "-0.02em",
          lineHeight: 1,
          opacity: l1A,
          transform: `translateY(${(1 - l1A) * 12}px)`,
        }}
      >
        We don&rsquo;t consult.
      </div>

      {/* line 2 — Inter 600 gold (heavier) */}
      <div
        style={{
          fontFamily: P_FONT,
          fontSize: 78,
          fontWeight: 600,
          color: GOLD,
          letterSpacing: "-0.02em",
          lineHeight: 1,
          marginTop: 20,
          opacity: l2A,
          transform: `translateY(${(1 - l2A) * 12}px)`,
        }}
      >
        We operate.
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────
// SCENE 3 · 6–16s · revenue LineGraph 0 → €400.000+ over 18 months
// Local 0–299 maps to global 180–479.
// ─────────────────────────────────────────────────────────────────────────
const Scene3_Revenue: React.FC = () => {
  const local = useCurrentFrame();
  // Synthetic but plausible 18-month revenue arc, ending just past €400k.
  const points = [
    2000, 4200, 7800, 10400, 15200, 21800, 34200, 46000, 68400, 92000,
    124000, 168000, 212000, 258000, 302000, 348000, 382000, 410000,
  ];
  const months = [
    "Apr 24", "May", "Jun", "Jul", "Aug", "Sep",
    "Oct", "Nov", "Dec", "Jan 25", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul", "Aug", "Oct 25",
  ];

  const eyebrowA = interpolate(local, [15, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const odomA = interpolate(local, [200, 230], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const subA = interpolate(local, [220, 250], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

  // LineGraph internally uses startFrame + duration on its own clock (nowFrame).
  // We pass nowFrame = local. Brief: graph runs frames 210–390 (global) → local 30–210.
  return (
    <AbsoluteFill style={{ background: BG }}>
      <Eyebrow show={eyebrowA}>01 · REVENUE · 18 MONTHS</Eyebrow>

      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 120px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 80,
            width: "100%",
            justifyContent: "center",
          }}
        >
          {/* LineGraph + month axis */}
          <div style={{ position: "relative" }}>
            <LineGraph
              points={points}
              startFrame={30}
              duration={180}
              tone="gold"
              width={1080}
              height={460}
              nowFrame={local}
            />
            {/* y-axis markers (0, 150k, 300k, 450k) */}
            <div
              style={{
                position: "absolute",
                left: -64,
                top: 14,
                bottom: 30,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                fontFamily: P_MONO,
                fontSize: 11,
                color: MUTED,
                letterSpacing: "0.1em",
                opacity: eyebrowA,
              }}
            >
              <span>450k</span>
              <span>300k</span>
              <span>150k</span>
              <span>0</span>
            </div>
            {/* x-axis (subset of months for legibility) */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 12,
                fontFamily: P_MONO,
                fontSize: 11,
                color: MUTED,
                letterSpacing: "0.1em",
                opacity: eyebrowA,
              }}
            >
              {months
                .filter((_, i) => i % 3 === 0 || i === months.length - 1)
                .map((m) => (
                  <span key={m}>{m}</span>
                ))}
            </div>
          </div>

          {/* Side odometer + caption */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 16,
              minWidth: 360,
            }}
          >
            <div style={{ opacity: odomA }}>
              <Odometer
                value={400}
                prefix="€"
                suffix="K+"
                fromFrame={210}
                duration={120}
                size={96}
                color={TEXT}
                nowFrame={local}
              />
            </div>
            <div
              style={{
                fontFamily: P_MONO,
                fontSize: 14,
                color: MUTED,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                opacity: subA,
                maxWidth: 340,
                lineHeight: 1.5,
              }}
            >
              REVENUE · EARNED · NOT PROJECTED
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────
// SCENE 4 · 16–24s · 2×2 grid of 4 BIG odometers (peak dramatic moment)
// Local 0–239 maps to global 480–719.
// Brief stagger marks (global): 525, 555, 585, 615 → local 45, 75, 105, 135
// ─────────────────────────────────────────────────────────────────────────
const Scene4_Grid: React.FC = () => {
  const local = useCurrentFrame();

  type Stat = {
    value: number;
    prefix?: string;
    suffix?: string;
    label: string;
    impactFrame: number;
  };

  const stats: Stat[] = [
    { value: 340, suffix: "%",            label: "LEADS · 90 DAYS",       impactFrame: 45  },
    { value: 14,  suffix: "×",            label: "ROAS · LONG RUN",       impactFrame: 75  },
    { value: 400, prefix: "€", suffix: "K+", label: "REVENUE · 18 MONTHS", impactFrame: 105 },
    { value: 80,  suffix: "%",            label: "OPS · AUTOMATED",       impactFrame: 135 },
  ];

  const eyebrowA = interpolate(local, [15, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

  return (
    <AbsoluteFill style={{ background: BG }}>
      <Eyebrow show={eyebrowA}>02 · RESULTS</Eyebrow>

      <AbsoluteFill
        style={{
          padding: "150px 120px 100px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: 30,
            flex: 1,
          }}
        >
          {stats.map((s) => {
            const t = interpolate(
              local,
              [s.impactFrame, s.impactFrame + 24],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: easeOut,
              }
            );
            // Subtle gold pulse exactly when the odometer locks in
            const pulse = interpolate(
              local,
              [
                s.impactFrame + 38,
                s.impactFrame + 44,
                s.impactFrame + 60,
              ],
              [0, 0.18, 0],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }
            );
            return (
              <div
                key={s.label}
                style={{
                  width: 680,
                  height: 280,
                  maxWidth: "100%",
                  margin: "auto",
                  padding: "44px 56px",
                  border: `1px solid rgba(245,245,240,0.08)`,
                  borderRadius: 16,
                  background: `linear-gradient(180deg, rgba(245,245,240,0.02) 0%, rgba(245,245,240,0) 100%)`,
                  boxShadow: `0 0 80px -30px rgba(182,139,74,${pulse})`,
                  opacity: t,
                  transform: `translateY(${(1 - t) * 18}px)`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 18,
                }}
              >
                <Odometer
                  value={s.value}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  fromFrame={s.impactFrame + 4}
                  duration={40}
                  size={156}
                  color={TEXT}
                  nowFrame={local}
                />
                <div
                  style={{
                    fontFamily: P_MONO,
                    fontSize: 13,
                    color: MUTED,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────
// SCENE 5 · 24–33s · Pantheon CRM screen recording (slot)
// Uses the PantheonDashboard primitive as a stand-in for the actual
// 9-second screen recording asset (pantheon-crm-overview-9s.mp4) which
// the brief flags as "NEEDS RECORDING".
// Local 0–269 maps to global 720–989.
// ─────────────────────────────────────────────────────────────────────────
const Scene5_CRM: React.FC = () => {
  const local = useCurrentFrame();

  const eyebrowA = interpolate(local, [15, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const screenA = interpolate(local, [20, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const labelA = interpolate(local, [50, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

  return (
    <AbsoluteFill style={{ background: BG }}>
      <Eyebrow show={eyebrowA}>03 · STACK · BUILT IN-HOUSE</Eyebrow>

      {/* Faux 3D-tilted screen — tiltY = -4deg per brief */}
      <div
        style={{
          position: "absolute",
          left: 60,
          right: 60,
          top: 130,
          bottom: 130,
          padding: 60,
          opacity: screenA,
          transform: `translateY(${(1 - screenA) * 16}px)`,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            border: "1px solid rgba(245,245,240,0.08)",
            borderRadius: 24,
            background: "rgba(245,245,240,0.015)",
            padding: 30,
            transform: "perspective(1800px) rotateY(-4deg)",
            transformStyle: "preserve-3d",
            boxShadow:
              "0 60px 120px -40px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.04)",
            overflow: "hidden",
          }}
        >
          <PantheonDashboard nowFrame={local} startAt={20} />
        </div>
      </div>

      {/* Bottom-left overlay label */}
      <div
        style={{
          position: "absolute",
          bottom: 70,
          left: 96,
          fontFamily: P_MONO,
          fontSize: 12,
          color: MUTED,
          letterSpacing: "0.15em",
          opacity: labelA,
        }}
      >
        Pantheon CRM · proprietary · Electron + SQLite + Claude
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────
// SCENE 6 · 33–40s · ECOSYSTEMS · 2 cards SALES + ARTIFICIAL INTELLIGENCE
// Local 0–209 maps to global 990–1199.
// Brief stagger (global): card 1 at 1035, card 2 at 1065 → local 45, 75.
// ─────────────────────────────────────────────────────────────────────────
const Scene6_Ecosystems: React.FC = () => {
  const local = useCurrentFrame();

  const eyebrowA = interpolate(local, [15, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

  const Card: React.FC<{
    title: string;
    items: string[];
    enterAt: number;
  }> = ({ title, items, enterAt }) => {
    const t = interpolate(local, [enterAt, enterAt + 30], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeOut,
    });
    return (
      <div
        style={{
          width: 720,
          height: 420,
          padding: 48,
          border: "1px solid rgba(245,245,240,0.1)",
          borderRadius: 16,
          background:
            "linear-gradient(180deg, rgba(245,245,240,0.02) 0%, rgba(245,245,240,0) 100%)",
          opacity: t,
          transform: `translateY(${(1 - t) * 20}px)`,
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        <div
          style={{
            fontFamily: P_FONT,
            fontSize: 38,
            fontWeight: 600,
            color: TEXT,
            letterSpacing: "-0.01em",
            lineHeight: 1,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {items.map((it, i) => {
            const itA = interpolate(
              local,
              [enterAt + 12 + i * 6, enterAt + 30 + i * 6],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: easeOut,
              }
            );
            return (
              <div
                key={it}
                style={{
                  fontFamily: P_FONT,
                  fontSize: 18,
                  fontWeight: 400,
                  color: "rgba(245,245,240,0.85)",
                  display: "flex",
                  gap: 14,
                  opacity: itA,
                  transform: `translateX(${(1 - itA) * 8}px)`,
                  lineHeight: 1.4,
                }}
              >
                <span style={{ color: GOLD }}>·</span>
                <span>{it}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <AbsoluteFill style={{ background: BG }}>
      <Eyebrow show={eyebrowA}>04 · ECOSYSTEMS</Eyebrow>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
        }}
      >
        <Card
          title="SALES"
          items={[
            "Proprietary CRM",
            "Outbound automation",
            "Paid ads",
            "CRO & landing pages",
          ]}
          enterAt={45}
        />
        <Card
          title="ARTIFICIAL INTELLIGENCE"
          items={[
            "5 specialist agents",
            "N8N infrastructure",
            "Proposal generation",
            "Full pipeline",
          ]}
          enterAt={75}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────
// SCENE 7 · 40–47s · "PANTHEON × CEPHALO" crossmark + subtitle
// Local 0–209 maps to global 1200–1409.
// Brief: crossmark frames 1210–1240 → local 10–40.
//        subtitle frames 1260–1300 → local 60–100.
// ─────────────────────────────────────────────────────────────────────────
const Scene7_Crossmark: React.FC = () => {
  const local = useCurrentFrame();

  const crossA = interpolate(local, [10, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const subA = interpolate(local, [60, 100], [0, 1], {
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
          display: "flex",
          alignItems: "baseline",
          gap: 28,
          opacity: crossA,
          transform: `translateY(${(1 - crossA) * 16}px)`,
        }}
      >
        <span
          style={{
            fontFamily: P_FONT,
            fontSize: 68,
            fontWeight: 700,
            color: TEXT,
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          PANTHEON
        </span>
        <span
          style={{
            fontFamily: P_FONT,
            fontSize: 68,
            fontWeight: 700,
            color: GOLD,
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          ×
        </span>
        <span
          style={{
            fontFamily: P_FONT,
            fontSize: 68,
            fontWeight: 700,
            color: "rgba(245,245,240,0.4)",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          CEPHALO
        </span>
      </div>
      <div
        style={{
          marginTop: 44,
          fontFamily: P_FONT,
          fontSize: 26,
          fontWeight: 400,
          color: TEXT,
          letterSpacing: "-0.005em",
          opacity: subA,
          transform: `translateY(${(1 - subA) * 12}px)`,
        }}
      >
        Same house. Same standard. Now for your SaaS.
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────
// SCENE 8 · 47–50s · PANTHEON wordmark + CTA + fade-out
// Local 0–89 maps to global 1410–1500.
// Brief: wordmark fade-in frames 1415–1445 → local 5–35
//        CTA fade-in frames 1460–1485   → local 50–75
//        Fade to black frames 1485–1500 → local 75–90
// ─────────────────────────────────────────────────────────────────────────
const Scene8_Wordmark: React.FC = () => {
  const local = useCurrentFrame();

  const wordA = interpolate(local, [5, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const ctaA = interpolate(local, [50, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const fadeOut = interpolate(local, [75, 90], [1, 0], {
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
        opacity: fadeOut,
      }}
    >
      {/* gold bloom behind wordmark */}
      <div
        style={{
          position: "absolute",
          width: 1200,
          height: 320,
          borderRadius: "50%",
          background: `radial-gradient(ellipse at center, ${GOLD_BRIGHT}26 0%, ${GOLD}00 70%)`,
          filter: "blur(40px)",
          opacity: wordA * 0.6,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          fontFamily: P_FONT,
          fontWeight: 700,
          fontSize: 180,
          color: TEXT,
          letterSpacing: "0.02em",
          lineHeight: 1,
          opacity: wordA,
          transform: `translateY(${(1 - wordA) * 10}px)`,
          textShadow: `0 0 40px ${GOLD_SOFT}26`,
        }}
      >
        PANTHEON
      </div>
      <div
        style={{
          marginTop: 110,
          fontFamily: P_MONO,
          fontSize: 14,
          color: MUTED,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          opacity: ctaA,
        }}
      >
        BOOK A CALL · PANTHEON.AGENCY
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────
// ROOT — TransitionSeries with hard cuts (0-frame fade) per brief.
// Brief explicitly calls "HARD CUT to black" between every scene; we use
// fade() with 1-frame timing as the cleanest way to chain via TransitionSeries
// while keeping the cut effectively hard. (A linearTiming of 0 frames is
// rejected by Remotion; 1 frame is imperceptible at 30fps.)
// ─────────────────────────────────────────────────────────────────────────
const HARD_CUT = 1;

export const PantheonGrowth: React.FC = () => (
  <AbsoluteFill style={{ background: BG, fontFamily: P_FONT }}>
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={S1}>
        <Scene1_Dot />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: HARD_CUT })}
      />

      <TransitionSeries.Sequence durationInFrames={S2 + HARD_CUT}>
        <Scene2_Anchor />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: HARD_CUT })}
      />

      <TransitionSeries.Sequence durationInFrames={S3 + HARD_CUT}>
        <Scene3_Revenue />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: HARD_CUT })}
      />

      <TransitionSeries.Sequence durationInFrames={S4 + HARD_CUT}>
        <Scene4_Grid />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: HARD_CUT })}
      />

      <TransitionSeries.Sequence durationInFrames={S5 + HARD_CUT}>
        <Scene5_CRM />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: HARD_CUT })}
      />

      <TransitionSeries.Sequence durationInFrames={S6 + HARD_CUT}>
        <Scene6_Ecosystems />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: HARD_CUT })}
      />

      <TransitionSeries.Sequence durationInFrames={S7 + HARD_CUT}>
        <Scene7_Crossmark />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: HARD_CUT })}
      />

      <TransitionSeries.Sequence durationInFrames={S8 + HARD_CUT}>
        <Scene8_Wordmark />
      </TransitionSeries.Sequence>
    </TransitionSeries>

    {/* Editorial finishing — subtle vignette + minimal grain */}
    <Vignette strength={0.5} />
    <Grain opacity={0.03} />
  </AbsoluteFill>
);

// ─────────────────────────────────────────────────────────────────────────
// AUDIO PLAN (TODO — implement in audio post or via remotion <Audio> tracks):
//
//   00:00.3  cello drone enters (sustained low E)
//   00:02.5  piano low C — "We don't consult." appears
//   00:04.8  piano low E — "We operate." appears
//   00:07    strings layer fade-in
//   00:14    sub-bass impact when €400.000+ locks in
//   00:17.5  4× impact hits (each odometer locking, 1s apart)
//   00:34.5  2× piano staccato (card stagger)
//   00:42    crossmark sub-bass + string tremolo
//   00:47    PANTHEON wordmark — orchestral resolve to A-major
//   00:48–50 fade music to silence (reverb tail)
//
// VO (English, restrained, descending finals — see brief §5):
//   1. 00:01.5–04.0 "We don't consult."
//   2. 00:04.3–05.8 "We operate."
//   3. 00:08.0–12.5 "Eighteen months. Four hundred thousand euros in revenue.
//                    Earned. Not projected."
//   4. 00:17.0–22.5 "Three hundred forty percent more leads in ninety days.
//                    Fourteen-times ROAS. Eighty percent of operations
//                    automated."
//   5. 00:26.0–30.5 "Our own CRM. Our own automation. Our own stack. Shipped."
//   6. 00:34.5–38.5 "Sales and AI. One complete ecosystem. In production.
//                    Not in slides."
//   7. 00:42.0–46.5 "Same house. Same standard. Now for your SaaS."
// ─────────────────────────────────────────────────────────────────────────

// Silence "unused" lints for helpers we expose for future audio integration.
void useVideoConfig;
