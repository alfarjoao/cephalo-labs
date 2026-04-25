import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import {
  INK,
  PURPLE,
  FONT,
  MONO,
  easeOut,
} from "../../primitives/cinematic";
import {
  TypewriterText,
  PulseRing,
  CircularProgress,
  Odometer,
  BarChart,
} from "../../primitives/motion-graphics";

// ═════════════════════════════════════════════════════════════════════
//  VSL-01 · POLYPUS · 55s @ 30fps · 1650 frames
//  Tech-synthwave · kinetic · product-led · purple generous (Polypus' home turf).
//
//  NOTE: Briefs call for 5 screen recordings not yet produced. This
//  composition stubs each scene with styled Remotion primitives that
//  match the specified data (router chips, 10-agent spawn, 3-layer
//  rings, cost odometer, voice waveform). Swap for real recordings
//  via <Video src={staticFile(...)}> once João has shot them.
// ═════════════════════════════════════════════════════════════════════

const BG = "#0A0A0A";
const TEXT = "#F5F5F0";
const MUTED = "#888880";
const SAVINGS = "#A3E635";

// Scene boundaries (frames @30fps)
const S1_END = 180;    // 0-6s cold open + typing
const S2_END = 450;    // 6-15s router
const S3_END = 690;    // 15-23s parallel agents
const S4_END = 960;    // 23-32s 3-layer memory
const S5_END = 1260;   // 32-42s cost savings
const S6_END = 1500;   // 42-50s voice-to-pipeline
const S7_END = 1605;   // 50-53.5s anchor line
// const S8_END = 1650;   // 53.5-55s wordmark + fade

// ───────────────────────────────────────────────────────────────────
// S1 — Cold open: blinking cursor + typed command
// ───────────────────────────────────────────────────────────────────

function S1_Cold({ frame }: { frame: number }) {
  const typingStart = 60;
  const cmd = '> poly ask "refactor the auth module"';
  // Pulse ring at frame 165 as transition
  const pulseActive = frame >= 165 && frame < 183;
  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ fontFamily: MONO, fontSize: 40, color: TEXT }}>
        {frame < typingStart ? (
          <span style={{ opacity: Math.floor(frame / 15) % 2 === 0 ? 1 : 0.15 }}>▋</span>
        ) : (
          <TypewriterText
            text={cmd}
            startFrame={0}
            charsPerFrame={0.58}
            showCaret
            nowFrame={frame - typingStart}
          />
        )}
      </div>
      {pulseActive && (
        <PulseRing
          cx={960}
          cy={540}
          tone="purple"
          maxRadius={600}
          rings={1}
          period={18}
          lineWidth={2}
          opacity={0.9}
        />
      )}
    </AbsoluteFill>
  );
}

// ───────────────────────────────────────────────────────────────────
// S2 — Router (stubbed recording): chips light up in sequence
// ───────────────────────────────────────────────────────────────────

function S2_Router({ frame }: { frame: number }) {
  const localStart = 180;
  const a = interpolate(frame, [localStart, localStart + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  // Chips activate staggered: HAIKU (frame 210), SONNET (240), OPUS (300), LOCAL (390)
  const chips = [
    { label: "HAIKU",  sub: "classifying",    start: 210, end: 240 },
    { label: "SONNET", sub: "planning",       start: 240, end: 290 },
    { label: "OPUS",   sub: "architecture",   start: 290, end: 370 },
    { label: "LOCAL",  sub: "shell",          start: 370, end: 420 },
  ];
  return (
    <AbsoluteFill style={{ opacity: a, display: "flex", flexDirection: "column" }}>
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 80,
          fontFamily: MONO,
          fontSize: 13,
          color: PURPLE,
          opacity: 0.75,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
        }}
      >
        01 · ROUTER · AUTO-SELECT
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
        }}
      >
        <div style={{ display: "flex", gap: 24 }}>
          {chips.map((c) => {
            const lit = frame >= c.start && frame <= c.end;
            const fade = interpolate(
              frame,
              [c.end, c.end + 30],
              [1, 0.35],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const brightness = frame < c.start ? 0.35 : (lit ? 1 : fade);
            return (
              <div
                key={c.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    padding: "18px 32px",
                    fontFamily: MONO,
                    fontSize: 22,
                    fontWeight: 500,
                    color: lit ? PURPLE : TEXT,
                    background: `${PURPLE}${lit ? "22" : "05"}`,
                    border: `1px solid ${PURPLE}${lit ? "66" : "22"}`,
                    borderRadius: 10,
                    letterSpacing: "0.1em",
                    opacity: brightness,
                    boxShadow: lit ? `0 0 40px ${PURPLE}66` : "none",
                    transition: "all 0.2s",
                  }}
                >
                  {c.label}
                </div>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 11,
                    color: lit ? PURPLE : MUTED,
                    letterSpacing: "0.15em",
                    opacity: lit ? 0.9 : 0.4,
                    textTransform: "uppercase",
                  }}
                >
                  {c.sub}
                </div>
              </div>
            );
          })}
        </div>
        <div
          style={{
            fontFamily: MONO,
            fontSize: 13,
            color: MUTED,
            letterSpacing: "0.15em",
            marginTop: 40,
          }}
        >
          routing decision · 42ms
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ───────────────────────────────────────────────────────────────────
// S3 — Parallel 10-agent spawn
// ───────────────────────────────────────────────────────────────────

function S3_Parallel({ frame }: { frame: number }) {
  const localStart = 450;
  const a = interpolate(frame, [localStart, localStart + 18], [0, 1], {
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
          fontFamily: MONO,
          fontSize: 13,
          color: PURPLE,
          opacity: 0.75,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
        }}
      >
        02 · PARALLEL · 10 AGENTS
      </div>
      <div
        style={{
          position: "absolute",
          inset: "120px 80px 80px 80px",
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 40,
        }}
      >
        {/* Terminal */}
        <div
          style={{
            background: "rgba(0,0,0,0.4)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 14,
            padding: 30,
            fontFamily: MONO,
            fontSize: 15,
            color: "rgba(245,245,240,0.8)",
            boxShadow: "inset 0 1px 1px rgba(255,255,255,0.06)",
            overflow: "hidden",
          }}
        >
          <div style={{ color: PURPLE, marginBottom: 16, letterSpacing: "0.12em" }}>
            $ poly spawn --parallel 10
          </div>
          {Array.from({ length: 10 }).map((_, i) => {
            const spawnAt = localStart + 20 + i * 6;
            const doneAt = localStart + 160 + (i * 3 + (i % 3) * 8);
            const t = interpolate(frame, [spawnAt, spawnAt + 8], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: easeOut,
            });
            const done = frame >= doneAt;
            return (
              <div
                key={i}
                style={{
                  opacity: t,
                  transform: `translateX(${(1 - t) * -12}px)`,
                  marginBottom: 4,
                  display: "flex",
                  gap: 12,
                }}
              >
                <span style={{ color: MUTED }}>{`agent/${String(i + 1).padStart(2, "0")}`}</span>
                <span style={{ color: done ? SAVINGS : PURPLE }}>
                  {done ? "✓" : "..."}
                </span>
              </div>
            );
          })}
        </div>
        {/* 10-cell grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14,
            alignContent: "center",
          }}
        >
          {Array.from({ length: 10 }).map((_, i) => {
            const spawnAt = localStart + 20 + i * 6;
            const doneAt = localStart + 160 + (i * 3 + (i % 3) * 8);
            const activeT = interpolate(
              frame,
              [spawnAt, spawnAt + 18],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut }
            );
            const done = frame >= doneAt;
            const pulse = 0.5 + 0.5 * Math.sin((frame + i * 7) / 10);
            return (
              <div
                key={i}
                style={{
                  height: 70,
                  borderRadius: 10,
                  background: done
                    ? `${SAVINGS}22`
                    : activeT > 0
                    ? `${PURPLE}${Math.round(activeT * pulse * 0x33).toString(16).padStart(2, "0")}`
                    : "rgba(255,255,255,0.02)",
                  border: done
                    ? `1px solid ${SAVINGS}66`
                    : activeT > 0
                    ? `1px solid ${PURPLE}66`
                    : "1px solid rgba(255,255,255,0.06)",
                  boxShadow:
                    activeT > 0 && !done
                      ? `inset 0 0 20px ${PURPLE}33`
                      : "none",
                  fontFamily: MONO,
                  fontSize: 12,
                  color: done ? SAVINGS : activeT > 0 ? PURPLE : MUTED,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  letterSpacing: "0.12em",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ───────────────────────────────────────────────────────────────────
// S4 — 3-layer memory rings with camera push
// ───────────────────────────────────────────────────────────────────

function S4_Memory({ frame }: { frame: number }) {
  const localStart = 690;
  const a = interpolate(frame, [localStart, localStart + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  // Camera push scale 1.0 → 1.04 over 6s
  const camera = interpolate(frame, [localStart, localStart + 180], [1, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rings = [
    { val: 0.95, label: "HOT · SESSION",  sub: "12K tokens",  start: localStart + 20 },
    { val: 0.78, label: "WARM · PROJECT", sub: "84K tokens",  start: localStart + 40 },
    { val: 0.42, label: "COLD · CODEBASE", sub: "2.4M tokens", start: localStart + 60 },
  ];
  return (
    <AbsoluteFill style={{ opacity: a, transform: `scale(${camera})` }}>
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 80,
          fontFamily: MONO,
          fontSize: 13,
          color: PURPLE,
          opacity: 0.75,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
        }}
      >
        03 · MEMORY · 3-LAYER CACHE
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 50,
        }}
      >
        <div style={{ display: "flex", gap: 80 }}>
          {rings.map((r) => (
            <div
              key={r.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
              }}
            >
              <CircularProgress
                value={r.val}
                fromFrame={r.start}
                duration={60}
                size={220}
                strokeWidth={8}
                tone="purple"
                nowFrame={frame}
              />
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 13,
                  color: TEXT,
                  opacity: 0.7,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                {r.label}
              </div>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 12,
                  color: MUTED,
                  letterSpacing: "0.15em",
                }}
              >
                {r.sub}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            fontFamily: MONO,
            fontSize: 14,
            color: MUTED,
            letterSpacing: "0.1em",
            marginTop: 40,
          }}
        >
          active context: 98,324 tokens · 82% cache hit rate
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ───────────────────────────────────────────────────────────────────
// S5 — Cost savings odometer + BarChart
// ───────────────────────────────────────────────────────────────────

function S5_Cost({ frame }: { frame: number }) {
  const localStart = 960;
  const a = interpolate(frame, [localStart, localStart + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const savingsA = interpolate(frame, [localStart + 90, localStart + 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  // Daily savings bars for the chart
  const days = Array.from({ length: 14 }, (_, i) => ({
    label: "",
    value: 80 + Math.sin(i * 0.9) * 40 + (i * 6),
  }));
  return (
    <AbsoluteFill style={{ opacity: a }}>
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 80,
          fontFamily: MONO,
          fontSize: 13,
          color: PURPLE,
          opacity: 0.75,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
        }}
      >
        04 · CACHING · −67% COST
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
        }}
      >
        <Odometer
          value={0.08}
          digits={2}
          prefix="$"
          fromFrame={localStart + 20}
          duration={60}
          size={160}
          color={TEXT}
          nowFrame={frame}
        />
        <div
          style={{
            fontFamily: MONO,
            fontSize: 22,
            fontWeight: 500,
            color: SAVINGS,
            letterSpacing: "0.1em",
            opacity: savingsA,
            transform: `translateY(${(1 - savingsA) * 10}px)`,
          }}
        >
          SAVED $0.16 · −67%
        </div>
        <div style={{ marginTop: 30 }}>
          <BarChart
            data={days}
            startFrame={localStart + 120}
            tone="purple"
            orientation="vertical"
            width={720}
            height={120}
            nowFrame={frame}
          />
        </div>
        <div
          style={{
            fontFamily: MONO,
            fontSize: 13,
            color: MUTED,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          $4,820 SAVED · THIS MONTH
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ───────────────────────────────────────────────────────────────────
// S6 — Voice → pipeline
// ───────────────────────────────────────────────────────────────────

function Waveform({ frame, active }: { frame: number; active: boolean }) {
  const bars = 40;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3, height: 50 }}>
      {Array.from({ length: bars }).map((_, i) => {
        const h = active
          ? 8 + Math.abs(Math.sin((frame + i * 3) / 6)) * 42
          : 4;
        return (
          <div
            key={i}
            style={{
              width: 3,
              height: h,
              background: PURPLE,
              opacity: active ? 0.85 : 0.3,
              borderRadius: 2,
            }}
          />
        );
      })}
    </div>
  );
}

function S6_Voice({ frame }: { frame: number }) {
  const localStart = 1260;
  const a = interpolate(frame, [localStart, localStart + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const prompt = '"polypus, refactor the login flow"';
  const typeT = interpolate(
    frame,
    [localStart + 30, localStart + 75],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut }
  );
  const chars = Math.floor(prompt.length * typeT);
  const panesA = interpolate(frame, [localStart + 90, localStart + 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const Pane: React.FC<{ title: string; rows: string[] }> = ({ title, rows }) => (
    <div
      style={{
        padding: 18,
        border: `1px solid rgba(245,245,240,0.08)`,
        borderRadius: 10,
        background: "rgba(0,0,0,0.3)",
        opacity: panesA,
        transform: `translateY(${(1 - panesA) * 12}px)`,
        display: "flex",
        flexDirection: "column",
        gap: 6,
        fontFamily: MONO,
        fontSize: 12,
        color: "rgba(245,245,240,0.75)",
      }}
    >
      <div style={{ color: PURPLE, letterSpacing: "0.15em", fontSize: 10, textTransform: "uppercase", marginBottom: 4 }}>
        {title}
      </div>
      {rows.map((r, i) => (
        <div key={i} style={{ lineHeight: 1.4 }}>
          {r}
        </div>
      ))}
    </div>
  );
  return (
    <AbsoluteFill style={{ opacity: a }}>
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 80,
          fontFamily: MONO,
          fontSize: 13,
          color: PURPLE,
          opacity: 0.75,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
        }}
      >
        05 · VOICE · VOICE-IN · SHIP-OUT
      </div>
      <div
        style={{
          position: "absolute",
          inset: "120px 100px 80px 100px",
          display: "flex",
          flexDirection: "column",
          gap: 30,
        }}
      >
        {/* Waveform + prompt */}
        <div
          style={{
            padding: 30,
            border: `1px solid rgba(245,245,240,0.08)`,
            borderRadius: 14,
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <Waveform frame={frame} active={frame >= localStart + 15} />
          <div
            style={{
              fontFamily: MONO,
              fontSize: 22,
              color: TEXT,
              letterSpacing: "0.01em",
            }}
          >
            {prompt.slice(0, chars)}
            {chars < prompt.length && <span style={{ color: PURPLE }}>▋</span>}
          </div>
        </div>
        {/* Pipeline panes */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, flex: 1 }}>
          <Pane
            title="code refactor"
            rows={["auth.ts: renamed flow", "+ 142 − 68", "type-checks: ok"]}
          />
          <Pane
            title="speech synth · 11labs"
            rows={["render 0:23 / 0:34", "takes: 3 · pick: 2", "tail dither on"]}
          />
          <Pane
            title="render · remotion"
            rows={["composition: LoginFlow", "frames: 960 / 1650", "encoder: h264 crf 18"]}
          />
        </div>
        <div
          style={{
            fontFamily: MONO,
            fontSize: 12,
            color: SAVINGS,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            opacity: panesA,
          }}
        >
          READY · 3 ARTIFACTS SHIPPED
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ───────────────────────────────────────────────────────────────────
// S7 — Anchor card "Right task. Right brain."
// ───────────────────────────────────────────────────────────────────

function S7_Anchor({ frame }: { frame: number }) {
  const localStart = 1510;
  const a = interpolate(frame, [localStart, localStart + 30], [0, 1], {
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
          fontFamily: FONT,
          fontSize: 96,
          fontWeight: 600,
          color: TEXT,
          letterSpacing: "-0.03em",
          lineHeight: 1,
        }}
      >
        Right task. Right brain.
      </div>
      <div
        style={{
          marginTop: 70,
          fontFamily: MONO,
          fontSize: 14,
          color: PURPLE,
          opacity: 0.8,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
        }}
      >
        POLYPUS · THE AI WORKSPACE
      </div>
    </AbsoluteFill>
  );
}

// ───────────────────────────────────────────────────────────────────
// S8 — Wordmark with purple bloom + CTA
// ───────────────────────────────────────────────────────────────────

function S8_Wordmark({ frame }: { frame: number }) {
  const localStart = 1605;
  const a = interpolate(frame, [localStart, localStart + 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const fadeOut = interpolate(frame, [1635, 1650], [1, 0], {
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
          opacity: a,
          transform: `translateY(${(1 - a) * 8}px)`,
          textShadow: `0 0 40px ${PURPLE}33, 0 0 80px ${PURPLE}22`,
        }}
      >
        POLYPUS
      </div>
      <div
        style={{
          marginTop: 50,
          fontFamily: MONO,
          fontSize: 14,
          color: MUTED,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          opacity: a,
        }}
      >
        polypus.app · Early Access
      </div>
    </AbsoluteFill>
  );
}

export const Polypus: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: BG, color: INK.text, fontFamily: FONT }}>
      {frame < S1_END && <S1_Cold frame={frame} />}
      {frame >= S1_END && frame < S2_END && <S2_Router frame={frame} />}
      {frame >= S2_END && frame < S3_END && <S3_Parallel frame={frame} />}
      {frame >= S3_END && frame < S4_END && <S4_Memory frame={frame} />}
      {frame >= S4_END && frame < S5_END && <S5_Cost frame={frame} />}
      {frame >= S5_END && frame < S6_END && <S6_Voice frame={frame} />}
      {frame >= S6_END && frame < S7_END && <S7_Anchor frame={frame} />}
      {frame >= S7_END && <S8_Wordmark frame={frame} />}

      {/* TODO(recordings): Swap each stub scene for <Video src={staticFile('polypus-rec-0N.mp4')}>.
          Scene 2 → polypus-rec-01-router.mp4 (8s)
          Scene 3 → polypus-rec-02-parallel.mp4 (8s)
          Scene 4 → polypus-rec-03-memory.mp4 (9s)
          Scene 5 → polypus-rec-04-cost.mp4 (10s)
          Scene 6 → polypus-rec-05-voice.mp4 (8s) */}
      {/* TODO(audio): 40Hz sub-bass drone; typewriter ticks; enter-key thunk @150; purple whoosh @165;
          chip glow ticks 4×; agent spawn ticks 10×; memory ring pulses 3×; kick drop @960 (climax);
          coin drop @1020; voice envelope @1290; pipeline whirr @1320; deep impact @1509; VO takes 1-8. */}
    </AbsoluteFill>
  );
};
