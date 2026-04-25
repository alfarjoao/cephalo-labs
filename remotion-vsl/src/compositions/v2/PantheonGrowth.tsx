import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { GOLD, GOLD_SOFT, easeOut, PantheonDashboard } from "../../primitives/cinematic";
import { Odometer, LineGraph } from "../../primitives/motion-graphics";

// ═════════════════════════════════════════════════════════════════════
//  VSL-03 · PANTHEON GROWTH · 50s @ 30fps · 1500 frames
//  Champagne · monumental · premium-quiet · editorial.
//  Gold accent used generously; Pantheon brand owns its identity.
//  Fonts: Inter + JetBrains Mono (brand-separated from CEPHALO).
// ═════════════════════════════════════════════════════════════════════

const BG = "#0A0A0A";
const TEXT = "#F5F5F0";
const MUTED = "#888880";
const P_FONT = "'Inter', 'Geist', system-ui, sans-serif";
const P_MONO = "'JetBrains Mono', 'Geist Mono', ui-monospace, monospace";

// Frame boundaries
const S1_END = 60;    // 0-2s gold dot
const S2_END = 180;   // 2-6s anchor "We don't consult. We operate."
const S3_END = 480;   // 6-16s revenue LineGraph
const S4_END = 720;   // 16-24s 4 odometers grid
const S5_END = 990;   // 24-33s Pantheon CRM screen
const S6_END = 1200;  // 33-40s ecosystems cards
const S7_END = 1410;  // 40-47s PANTHEON × CEPHALO crossmark
// const S8_END = 1500;  // 47-50s wordmark + fade

function S1_Dot({ frame }: { frame: number }) {
  const a = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
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
}

function S2_Anchor({ frame }: { frame: number }) {
  // Dot expands horizontally to line at frames 60-90 (already in S1→S2 transition)
  // Eyebrow at frame 75; "We don't consult." at frame 110; "We operate." at frame 145.
  const lineW = interpolate(frame, [60, 110], [12, 480], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const eyebrowA = interpolate(frame, [75, 105], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const l1A = interpolate(frame, [110, 135], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const l2A = interpolate(frame, [145, 170], [0, 1], {
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
      }}
    >
      <div
        style={{
          fontFamily: P_MONO,
          fontSize: 12,
          color: MUTED,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          marginBottom: 18,
          opacity: eyebrowA,
        }}
      >
        PANTHEON GROWTH · LISBON
      </div>
      <div
        style={{
          width: lineW,
          height: 1,
          background: GOLD,
          opacity: 0.5,
          boxShadow: `0 0 10px ${GOLD}66`,
          marginBottom: 30,
        }}
      />
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
        We don't consult.
      </div>
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
}

function S3_Revenue({ frame }: { frame: number }) {
  const localStart = 180;
  const a = interpolate(frame, [localStart, localStart + 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  // Synthetic 18-month revenue curve
  const points = [
    2000, 4200, 7800, 10400, 15200, 21800, 34200, 46000, 68400, 92000,
    124000, 168000, 212000, 258000, 302000, 348000, 382000, 410000,
  ];
  const odomA = interpolate(frame, [localStart + 150, localStart + 180], [0, 1], {
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
          position: "absolute",
          top: 80,
          left: 80,
          fontFamily: P_MONO,
          fontSize: 13,
          color: MUTED,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
        }}
      >
        01 · REVENUE · 18 MONTHS
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 80 }}>
        <LineGraph
          points={points}
          startFrame={localStart + 30}
          duration={180}
          tone="gold"
          width={820}
          height={360}
          nowFrame={frame}
        />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 16, opacity: odomA }}>
          <Odometer
            value={400}
            prefix="€"
            suffix="K+"
            fromFrame={localStart + 30}
            duration={150}
            size={96}
            color={TEXT}
            nowFrame={frame}
          />
          <div
            style={{
              fontFamily: P_MONO,
              fontSize: 14,
              color: MUTED,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            REVENUE · EARNED · NOT PROJECTED
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

function S4_Grid({ frame }: { frame: number }) {
  const localStart = 480;
  const cellA = interpolate(frame, [localStart, localStart + 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const stats: Array<{ label: string; value: number; prefix?: string; suffix?: string }> = [
    { label: "LEADS · 90 DAYS",      value: 340, suffix: "%" },
    { label: "ROAS · LONG RUN",      value: 14,  suffix: "×" },
    { label: "REVENUE · 18 MONTHS",  value: 400, prefix: "€", suffix: "K+" },
    { label: "OPS · AUTOMATED",      value: 80,  suffix: "%" },
  ];
  return (
    <AbsoluteFill
      style={{
        padding: 120,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 30,
        opacity: cellA,
      }}
    >
      <div
        style={{
          fontFamily: P_MONO,
          fontSize: 13,
          color: MUTED,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          marginBottom: 20,
        }}
      >
        02 · RESULTS
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 30,
        }}
      >
        {stats.map((s, i) => {
          const cellStart = localStart + 20 + i * 30;
          const t = interpolate(frame, [cellStart, cellStart + 24], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: easeOut,
          });
          return (
            <div
              key={s.label}
              style={{
                padding: 60,
                border: `1px solid rgba(245,245,240,0.08)`,
                borderRadius: 16,
                background: "rgba(255,255,255,0.015)",
                opacity: t,
                transform: `translateY(${(1 - t) * 16}px)`,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 18,
              }}
            >
              <Odometer
                value={s.value}
                prefix={s.prefix}
                suffix={s.suffix}
                fromFrame={cellStart + 10}
                duration={40}
                size={156}
                color={TEXT}
                nowFrame={frame}
              />
              <div
                style={{
                  fontFamily: P_MONO,
                  fontSize: 13,
                  color: MUTED,
                  letterSpacing: "0.2em",
                }}
              >
                {s.label}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

function S5_CRM({ frame }: { frame: number }) {
  const localStart = 720;
  const a = interpolate(frame, [localStart, localStart + 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  return (
    <AbsoluteFill style={{ opacity: a }}>
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 80,
          fontFamily: P_MONO,
          fontSize: 13,
          color: MUTED,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
        }}
      >
        03 · STACK · BUILT IN-HOUSE
      </div>
      <div
        style={{
          position: "absolute",
          left: 60,
          right: 60,
          top: 110,
          bottom: 110,
          borderRadius: 24,
          border: `1px solid rgba(245,245,240,0.08)`,
          overflow: "hidden",
          padding: 30,
          transform: "perspective(1400px) rotateY(-4deg)",
          transformStyle: "preserve-3d",
        }}
      >
        <PantheonDashboard nowFrame={frame} startAt={localStart + 10} />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 80,
          fontFamily: P_MONO,
          fontSize: 12,
          color: MUTED,
          letterSpacing: "0.2em",
        }}
      >
        Pantheon CRM · proprietary · Electron + SQLite + Claude
      </div>
    </AbsoluteFill>
  );
}

function S6_Ecosystems({ frame }: { frame: number }) {
  const localStart = 990;
  const a = interpolate(frame, [localStart, localStart + 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const Card: React.FC<{ title: string; items: string[]; delay: number }> = ({ title, items, delay }) => {
    const t = interpolate(frame, [localStart + delay, localStart + delay + 22], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeOut,
    });
    return (
      <div
        style={{
          width: 720,
          height: 420,
          padding: 44,
          border: `1px solid rgba(245,245,240,0.1)`,
          borderRadius: 16,
          background: "linear-gradient(180deg, rgba(245,245,240,0.02), transparent)",
          opacity: t,
          transform: `translateY(${(1 - t) * 16}px)`,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <div
          style={{
            fontFamily: P_FONT,
            fontSize: 38,
            fontWeight: 600,
            color: TEXT,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {items.map((it, i) => (
            <div
              key={i}
              style={{
                fontFamily: P_FONT,
                fontSize: 18,
                color: "rgba(245,245,240,0.75)",
                display: "flex",
                gap: 12,
              }}
            >
              <span style={{ color: GOLD }}>·</span>
              {it}
            </div>
          ))}
        </div>
      </div>
    );
  };
  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: a,
        gap: 40,
      }}
    >
      <div
        style={{
          fontFamily: P_MONO,
          fontSize: 13,
          color: MUTED,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
        }}
      >
        04 · ECOSYSTEMS
      </div>
      <div style={{ display: "flex", gap: 40 }}>
        <Card
          title="SALES"
          items={[
            "Proprietary CRM",
            "Outbound automation",
            "Paid ads",
            "CRO & landing pages",
          ]}
          delay={10}
        />
        <Card
          title="ARTIFICIAL INTELLIGENCE"
          items={[
            "5 specialist agents",
            "N8N infrastructure",
            "Proposal generation",
            "Full pipeline",
          ]}
          delay={25}
        />
      </div>
    </AbsoluteFill>
  );
}

function S7_Crossmark({ frame }: { frame: number }) {
  const localStart = 1200;
  const crossA = interpolate(frame, [localStart + 10, localStart + 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const subA = interpolate(frame, [localStart + 60, localStart + 100], [0, 1], {
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
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 24,
          opacity: crossA,
          transform: `translateY(${(1 - crossA) * 14}px)`,
        }}
      >
        <span style={{ fontFamily: P_FONT, fontSize: 68, fontWeight: 700, color: TEXT, letterSpacing: "-0.015em" }}>
          PANTHEON
        </span>
        <span style={{ fontFamily: P_FONT, fontSize: 68, fontWeight: 700, color: GOLD, letterSpacing: "-0.015em" }}>
          ×
        </span>
        <span style={{ fontFamily: P_FONT, fontSize: 68, fontWeight: 700, color: "rgba(245,245,240,0.4)", letterSpacing: "-0.015em" }}>
          CEPHALO
        </span>
      </div>
      <div
        style={{
          marginTop: 40,
          fontFamily: P_FONT,
          fontSize: 26,
          color: "rgba(245,245,240,0.8)",
          opacity: subA,
          transform: `translateY(${(1 - subA) * 10}px)`,
        }}
      >
        Same house. Same standard. Now for your SaaS.
      </div>
    </AbsoluteFill>
  );
}

function S8_Wordmark({ frame }: { frame: number }) {
  const localStart = 1410;
  const wordA = interpolate(frame, [localStart + 5, localStart + 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const ctaA = interpolate(frame, [localStart + 50, localStart + 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const fadeOut = interpolate(frame, [1485, 1500], [1, 0], {
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
          fontFamily: P_FONT,
          fontWeight: 700,
          fontSize: 180,
          color: TEXT,
          letterSpacing: "0.02em",
          lineHeight: 1,
          opacity: wordA,
          transform: `translateY(${(1 - wordA) * 8}px)`,
          textShadow: `0 0 60px ${GOLD_SOFT}33`,
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
}

export const PantheonGrowth: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: BG, fontFamily: P_FONT }}>
      {frame < S1_END && <S1_Dot frame={frame} />}
      {frame >= S1_END && frame < S2_END && <S2_Anchor frame={frame} />}
      {frame >= S2_END && frame < S3_END && <S3_Revenue frame={frame} />}
      {frame >= S3_END && frame < S4_END && <S4_Grid frame={frame} />}
      {frame >= S4_END && frame < S5_END && <S5_CRM frame={frame} />}
      {frame >= S5_END && frame < S6_END && <S6_Ecosystems frame={frame} />}
      {frame >= S6_END && frame < S7_END && <S7_Crossmark frame={frame} />}
      {frame >= S7_END && <S8_Wordmark frame={frame} />}

      {/* TODO(audio): cello drone @00:00.3; piano low C @00:02.5, low E @00:04.8; strings build from 00:07; sub-bass impact @00:14 (€400k lock); 4× impact hits during odometer grid @00:17-20; piano rise @00:34; cello resolve to A-major @00:47 wordmark. VO takes 1-7. */}
    </AbsoluteFill>
  );
};
