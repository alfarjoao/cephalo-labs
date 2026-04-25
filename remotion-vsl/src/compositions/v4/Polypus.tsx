import "@fontsource/geist-sans/400.css";
import "@fontsource/geist-sans/500.css";
import "@fontsource/geist-sans/600.css";
import "@fontsource/geist-mono/400.css";
import "@fontsource/geist-mono/500.css";
import React from "react";
import {
  AbsoluteFill,
  Series,
  interpolate,
  useCurrentFrame,
} from "remotion";

import {
  Vignette,
  Grain,
  easeOut,
  appear,
  between,
} from "../../primitives/cinematic";
import {
  TypewriterText,
  PulseRing,
  CircularProgress,
  Odometer,
} from "../../primitives/motion-graphics";
import { LogoWatermark, LogoLockup, LogoSigil } from "../../primitives/logo-lockup";

// ═══════════════════════════════════════════════════════════════════════
//  VSL-01 · POLYPUS · v4 · 55s @ 30fps · 1650 frames · 1920×1080
//  Tech-synthwave. Dev-intimate. Purple GENEROUS — Polypus' home turf.
//  7 scenes: Cold Open · Router · Parallel · Memory · Cost · Voice · Anchor+Wordmark
//  Anchor phrase: "Right task. Right brain."
// ═══════════════════════════════════════════════════════════════════════

const BG = "#0A0A0A";
const TEXT = "#F5F5F0";       // warm white — never pure white
const MUTED = "#888880";
const ACCENT = "#C084FC";     // Polypus purple — generous here
const SAVINGS = "#A3E635";    // green for cost-saved label

// Fonts: Clash Display 500/600 headlines, Geist Mono UI chrome, Geist body
const FONT_DISPLAY =
  "'Clash Display', 'Geist Sans', 'Geist', -apple-system, BlinkMacSystemFont, sans-serif";
const FONT_BODY =
  "'Geist Sans', 'Geist', -apple-system, BlinkMacSystemFont, sans-serif";
const FONT_MONO =
  "'Geist Mono', 'JetBrains Mono', ui-monospace, monospace";

// ── Scene durations (frames @30fps). Sum + transitions = 1650. ─────────
// Brief beat sheet:
//   S1 cold open:     0   – 180   (180 frames)
//   S2 router:        180 – 450   (270 frames)
//   S3 parallel:      450 – 690   (240 frames)
//   S4 memory:        690 – 960   (270 frames)
//   S5 cost:          960 – 1260  (300 frames)
//   S6 voice:         1260 – 1500 (240 frames)
//   S7 anchor:        1500 – 1605 (105 frames)
//   S8 wordmark:      1605 – 1650 (45 frames)
// Total raw = 1650. Use TransitionSeries with overlap-counted transitions
// (transitions consume frames from the next sequence's duration).
const S1_LEN = 180;
const S2_LEN = 270;
const S3_LEN = 240;
const S4_LEN = 270;
const S5_LEN = 300;
const S6_LEN = 240;
const S7_LEN = 105;
const S8_LEN = 45;

export const POLYPUS_DURATION =
  S1_LEN + S2_LEN + S3_LEN + S4_LEN + S5_LEN + S6_LEN + S7_LEN + S8_LEN;
// = 1650

// ─────────────────────────────────────────────────────────────────────
// Reusable: Eyebrow label (top-left of each product scene)
// ─────────────────────────────────────────────────────────────────────
const Eyebrow: React.FC<{ index: string; label: string; show: number }> = ({
  index,
  label,
  show,
}) => (
  <div
    style={{
      position: "absolute",
      top: 60,
      left: 60,
      display: "flex",
      gap: 14,
      alignItems: "center",
      opacity: show,
      transform: `translateY(${(1 - show) * 8}px)`,
      zIndex: 5,
    }}
  >
    <span
      style={{
        fontFamily: FONT_MONO,
        fontSize: 13,
        letterSpacing: "0.25em",
        color: ACCENT,
        opacity: 0.75,
      }}
    >
      {index} ·
    </span>
    <span
      style={{
        fontFamily: FONT_MONO,
        fontSize: 13,
        letterSpacing: "0.25em",
        color: TEXT,
        opacity: 0.6,
      }}
    >
      {label}
    </span>
  </div>
);

// ─────────────────────────────────────────────────────────────────────
// Reusable: FloatingCard-lite (3D tilt frame for inline UI mockups)
// ─────────────────────────────────────────────────────────────────────
const TiltedFrame: React.FC<{
  children: React.ReactNode;
  tiltY?: number;
  tiltX?: number;
  scale?: number;
  show: number;
  width?: number;
  height?: number;
}> = ({
  children,
  tiltY = 0,
  tiltX = 0,
  scale = 1,
  show,
  width = 1620,
  height = 840,
}) => (
  <div
    style={{
      width,
      height,
      borderRadius: 22,
      background: "linear-gradient(160deg, #11131A 0%, #07080C 100%)",
      boxShadow: `0 60px 140px -50px rgba(0,0,0,0.95), 0 0 0 1px rgba(245,245,240,0.08), inset 0 1px 1px rgba(255,255,255,0.06)`,
      transform: `perspective(2400px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${scale * (0.96 + show * 0.04)})`,
      opacity: show,
      overflow: "hidden",
      position: "relative",
    }}
  >
    {/* Faint purple ambient bloom behind */}
    <div
      style={{
        position: "absolute",
        inset: -120,
        background: `radial-gradient(ellipse at 50% 50%, ${ACCENT}22 0%, transparent 65%)`,
        filter: "blur(40px)",
        opacity: show * 0.7,
        pointerEvents: "none",
        zIndex: -1,
      }}
    />
    {children}
  </div>
);

// ═════════════════════════════════════════════════════════════════════
// S1 · COLD OPEN (0–6s · 180 frames)
//   0–2s blinking cursor, 2–5s typing command, frame 150 enter,
//   frame 165–183 purple PulseRing
// ═════════════════════════════════════════════════════════════════════
const S1_ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const cmd = '> poly ask "refactor the auth module"';
  const typingStart = 60; // frame 60 = 2s
  const blink = Math.floor(frame / 15) % 2 === 0;

  // Enter key flash (1 frame at 150)
  const enterFlash =
    frame >= 150 && frame <= 153
      ? interpolate(frame, [150, 151, 153], [0, 0.35, 0], { extrapolateRight: "clamp" })
      : 0;

  // PulseRing window 165–183
  const pulseActive = frame >= 165 && frame < 183;

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
          fontFamily: FONT_MONO,
          fontSize: 40,
          color: TEXT,
          fontWeight: 400,
          letterSpacing: "0",
        }}
      >
        {frame < typingStart ? (
          <span style={{ opacity: blink ? 1 : 0.15 }}>▋</span>
        ) : (
          <TypewriterText
            text={cmd}
            startFrame={0}
            charsPerFrame={0.42} // ~15 chars/sec @ 30fps = 0.5; aim ~90 frames for 35 chars
            showCaret
            nowFrame={frame - typingStart}
            style={{ fontSize: 40, color: TEXT }}
          />
        )}
      </div>

      {/* Enter-key flash */}
      {enterFlash > 0 && (
        <AbsoluteFill
          style={{
            background: TEXT,
            opacity: enterFlash,
            mixBlendMode: "screen",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Purple PulseRing transition */}
      {pulseActive && (
        <PulseRing
          cx={960}
          cy={540}
          tone="purple"
          maxRadius={600}
          rings={1}
          period={18}
          lineWidth={2}
          opacity={0.85}
        />
      )}
    </AbsoluteFill>
  );
};

// ═════════════════════════════════════════════════════════════════════
// S2 · ROUTER (6–15s · 270 frames local)
//   Multi-model router UI mockup. 3 chips light up in sequence:
//   Haiku → Sonnet → Opus → Local. Eyebrow: 01 · ROUTER · AUTO-SELECT
// ═════════════════════════════════════════════════════════════════════
const S2_Router: React.FC = () => {
  const frame = useCurrentFrame();
  const eyebrowShow = appear(frame, 6, 18).opacity;
  const cardShow = appear(frame, 0, 24).opacity;

  // Chip activation timeline (local frames)
  // 0.0–1.5s idle, 1.5–2.5s Haiku, 2.5–4.0s Sonnet, 4.0–6.0s Opus,
  // 6.0–7.5s Local, 7.5–8.0s dim. Scene = 9s = 270 frames.
  // We map to ~30fps locally.
  const chipStates = [
    { name: "HAIKU", role: "classifying", on: [45, 75] },
    { name: "SONNET", role: "planning refactor", on: [75, 120] },
    { name: "OPUS", role: "executing architecture", on: [120, 180] },
    { name: "LOCAL", role: "shell ops", on: [180, 225] },
  ];

  return (
    <AbsoluteFill style={{ background: BG }}>
      <Eyebrow index="01" label="ROUTER · AUTO-SELECT" show={eyebrowShow} />

      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TiltedFrame tiltY={-5} scale={1.02} show={cardShow}>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "grid",
              gridTemplateColumns: "260px 1fr",
              padding: 32,
              gap: 24,
              fontFamily: FONT_BODY,
              color: TEXT,
            }}
          >
            {/* Sidebar */}
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.06)",
                padding: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 28,
                }}
              >
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 8,
                    background: ACCENT,
                    boxShadow: `0 0 22px ${ACCENT}`,
                  }}
                />
                <span
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: 17,
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Polypus
                </span>
              </div>
              {["Workspace", "Router", "Memory", "Models", "Cost", "Settings"].map(
                (l, i) => (
                  <div
                    key={l}
                    style={{
                      padding: "10px 12px",
                      borderRadius: 8,
                      marginBottom: 4,
                      background: i === 1 ? `${ACCENT}18` : "transparent",
                      border:
                        i === 1
                          ? `1px solid ${ACCENT}44`
                          : "1px solid transparent",
                      fontFamily: FONT_MONO,
                      fontSize: 13,
                      color: i === 1 ? ACCENT : "rgba(245,245,240,0.55)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {l}
                  </div>
                )
              )}
            </div>

            {/* Main router pane */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 22,
                position: "relative",
              }}
            >
              <div
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 12,
                  letterSpacing: "0.22em",
                  color: "rgba(245,245,240,0.4)",
                  textTransform: "uppercase",
                }}
              >
                Routing decision
              </div>
              <div
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: 36,
                  fontWeight: 500,
                  color: TEXT,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                }}
              >
                refactor the auth module
              </div>

              {/* Model chips */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 14,
                  marginTop: 16,
                }}
              >
                {chipStates.map((c) => {
                  const active = frame >= c.on[0] && frame <= c.on[1] + 12;
                  const glow = interpolate(
                    frame,
                    [c.on[0] - 4, c.on[0], c.on[1], c.on[1] + 18],
                    [0, 1, 1, 0.25],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  );
                  return (
                    <div
                      key={c.name}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                        padding: "16px 22px",
                        borderRadius: 12,
                        background: active
                          ? `${ACCENT}1F`
                          : "rgba(255,255,255,0.03)",
                        border: `1px solid ${
                          active ? ACCENT + "AA" : "rgba(255,255,255,0.08)"
                        }`,
                        boxShadow: active
                          ? `0 0 28px ${ACCENT}66, inset 0 1px 1px rgba(255,255,255,0.08)`
                          : "inset 0 1px 1px rgba(255,255,255,0.04)",
                        transition: "all 0.2s",
                        minWidth: 200,
                        opacity: 0.4 + glow * 0.6,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: FONT_MONO,
                          fontSize: 16,
                          fontWeight: 500,
                          color: active ? ACCENT : "rgba(245,245,240,0.7)",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {c.name}
                      </span>
                      <span
                        style={{
                          fontFamily: FONT_MONO,
                          fontSize: 11,
                          color: "rgba(245,245,240,0.4)",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          minHeight: 14,
                        }}
                      >
                        {active ? c.role : "idle"}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Streaming response area */}
              <div
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 12,
                  padding: 20,
                  fontFamily: FONT_MONO,
                  fontSize: 14,
                  color: "rgba(245,245,240,0.55)",
                  lineHeight: 1.6,
                  marginTop: 6,
                }}
              >
                <div style={{ color: ACCENT, marginBottom: 6 }}>
                  &gt; routing chain selected
                </div>
                <div>haiku.classify · sonnet.plan · opus.execute · local.shell</div>
                <div style={{ marginTop: 14, color: "rgba(245,245,240,0.45)" }}>
                  // streaming refactor diff …
                </div>
              </div>

              {/* Bottom-right routing label */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  fontFamily: FONT_MONO,
                  fontSize: 11,
                  color: ACCENT,
                  opacity: 0.7,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                routing decision · 42ms
              </div>
            </div>
          </div>
        </TiltedFrame>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ═════════════════════════════════════════════════════════════════════
// S3 · PARALLEL (15–23s · 240 frames)
//   Terminal spawns agent/01..agent/10. 10-cell grid pulses purple.
//   Eyebrow: 02 · PARALLEL · 10 AGENTS
// ═════════════════════════════════════════════════════════════════════
const S3_Parallel: React.FC = () => {
  const frame = useCurrentFrame();
  const eyebrowShow = appear(frame, 6, 18).opacity;
  const cardShow = appear(frame, 0, 22).opacity;

  // Each agent spawns ~6 frames apart starting at frame 30
  const agents = Array.from({ length: 10 }, (_, i) => ({
    id: `agent/${(i + 1).toString().padStart(2, "0")}`,
    spawn: 30 + i * 6,
    done: 130 + i * 8 + Math.floor((i % 3) * 4),
  }));

  return (
    <AbsoluteFill style={{ background: BG }}>
      <Eyebrow index="02" label="PARALLEL · 10 AGENTS" show={eyebrowShow} />

      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TiltedFrame tiltY={0} show={cardShow}>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 380px",
              padding: 32,
              gap: 28,
              fontFamily: FONT_MONO,
              color: TEXT,
            }}
          >
            {/* Terminal */}
            <div
              style={{
                background: "rgba(0,0,0,0.55)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 14,
                padding: 20,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  marginBottom: 16,
                  alignItems: "center",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "rgba(245,245,240,0.18)",
                    }}
                  />
                ))}
                <span
                  style={{
                    marginLeft: 14,
                    fontSize: 11,
                    color: "rgba(245,245,240,0.4)",
                    letterSpacing: "0.18em",
                  }}
                >
                  polypus / spawn
                </span>
              </div>
              <div
                style={{
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "rgba(245,245,240,0.78)",
                }}
              >
                <div style={{ color: ACCENT, marginBottom: 8 }}>
                  &gt; poly spawn --parallel 10 refactor.auth
                </div>
                {agents.map((a) => {
                  const visible = frame >= a.spawn;
                  const completed = frame >= a.done;
                  if (!visible) return null;
                  const fadeIn = interpolate(
                    frame,
                    [a.spawn, a.spawn + 6],
                    [0, 1],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  );
                  return (
                    <div
                      key={a.id}
                      style={{
                        opacity: fadeIn,
                        display: "flex",
                        gap: 14,
                        color: completed
                          ? "rgba(245,245,240,0.85)"
                          : "rgba(245,245,240,0.6)",
                      }}
                    >
                      <span style={{ color: ACCENT, opacity: 0.7 }}>
                        spawning
                      </span>
                      <span>{a.id}</span>
                      {completed && (
                        <span style={{ color: SAVINGS, marginLeft: "auto" }}>
                          ✓
                        </span>
                      )}
                    </div>
                  );
                })}
                {frame > 220 && (
                  <div
                    style={{
                      marginTop: 14,
                      color: SAVINGS,
                      fontSize: 13,
                      letterSpacing: "0.05em",
                    }}
                  >
                    all agents complete · 6.2s total
                  </div>
                )}
              </div>
            </div>

            {/* 10-cell grid */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.22em",
                  color: "rgba(245,245,240,0.4)",
                  textTransform: "uppercase",
                }}
              >
                AGENT POOL · 10 / 10
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                  flex: 1,
                }}
              >
                {agents.map((a) => {
                  const active = frame >= a.spawn;
                  const completed = frame >= a.done;
                  const pulse =
                    active && !completed
                      ? 0.5 + 0.5 * Math.abs(Math.sin((frame - a.spawn) / 6))
                      : 1;
                  const col = completed ? SAVINGS : active ? ACCENT : "#222";
                  return (
                    <div
                      key={a.id}
                      style={{
                        height: 64,
                        borderRadius: 10,
                        border: `1px solid ${active ? col + "AA" : "rgba(255,255,255,0.08)"}`,
                        background: active ? `${col}1A` : "rgba(255,255,255,0.02)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0 16px",
                        fontFamily: FONT_MONO,
                        fontSize: 13,
                        color: active ? col : "rgba(245,245,240,0.4)",
                        boxShadow: active
                          ? `0 0 ${20 * pulse}px ${col}55, inset 0 1px 1px rgba(255,255,255,0.06)`
                          : "inset 0 1px 1px rgba(255,255,255,0.04)",
                        opacity: pulse,
                      }}
                    >
                      <span>{a.id.replace("agent/", "")}</span>
                      <span style={{ fontSize: 11, opacity: 0.7 }}>
                        {completed ? "done" : active ? "live" : "idle"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </TiltedFrame>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ═════════════════════════════════════════════════════════════════════
// S4 · MEMORY (23–32s · 270 frames)
//   3 CircularProgress rings — HOT 95% · WARM 78% · COLD 42%
//   Camera push: scale 1.0 → 1.04
//   Eyebrow: 03 · MEMORY · 3-LAYER CACHE
// ═════════════════════════════════════════════════════════════════════
const S4_Memory: React.FC = () => {
  const frame = useCurrentFrame();
  const eyebrowShow = appear(frame, 6, 18).opacity;
  const cardShow = appear(frame, 0, 22).opacity;

  // Camera push: 1.0 → 1.04 over 6s (180 frames)
  const push = interpolate(frame, [0, 180], [1.0, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const layers = [
    { label: "HOT", scope: "session", value: 0.95, tokens: "12K", start: 30 },
    { label: "WARM", scope: "project", value: 0.78, tokens: "84K", start: 75 },
    { label: "COLD", scope: "codebase", value: 0.42, tokens: "2.4M", start: 120 },
  ];

  return (
    <AbsoluteFill style={{ background: BG }}>
      <Eyebrow index="03" label="MEMORY · 3-LAYER CACHE" show={eyebrowShow} />

      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${push})`,
        }}
      >
        <TiltedFrame tiltY={4} show={cardShow}>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 56,
              padding: 60,
              fontFamily: FONT_BODY,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 80,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {layers.map((l) => (
                <div
                  key={l.label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 22,
                  }}
                >
                  <CircularProgress
                    value={l.value}
                    fromFrame={l.start}
                    duration={48}
                    size={260}
                    strokeWidth={9}
                    tone="purple"
                    nowFrame={frame}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONT_MONO,
                        fontSize: 13,
                        letterSpacing: "0.28em",
                        color: ACCENT,
                        opacity: 0.9,
                      }}
                    >
                      {l.label}
                    </span>
                    <span
                      style={{
                        fontFamily: FONT_MONO,
                        fontSize: 13,
                        letterSpacing: "0.18em",
                        color: "rgba(245,245,240,0.5)",
                        textTransform: "uppercase",
                      }}
                    >
                      {l.scope} · {l.tokens} tokens
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom ticker */}
            <div
              style={{
                opacity: appear(frame, 170, 24).opacity,
                fontFamily: FONT_MONO,
                fontSize: 14,
                color: "rgba(245,245,240,0.55)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              active context: 98,324 tokens · 82% cache hit rate
            </div>
          </div>
        </TiltedFrame>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ═════════════════════════════════════════════════════════════════════
// S5 · COST (32–42s · 300 frames)
//   Odometer $0.08, green SAVED $0.16 · −67%, BarChart of monthly bars
//   Eyebrow: 04 · CACHING · −67% COST
// ═════════════════════════════════════════════════════════════════════
const S5_Cost: React.FC = () => {
  const frame = useCurrentFrame();
  const eyebrowShow = appear(frame, 6, 18).opacity;
  const cardShow = appear(frame, 0, 22).opacity;

  // 30 daily savings bars — raw values then normalize to <=95% of container
  const rawBars = Array.from({ length: 30 }, (_, i) => 80 + Math.round(Math.sin(i * 0.7) * 40 + (i % 5) * 18));
  const maxBar = Math.max(...rawBars);
  const dailyBars = rawBars.map((value, i) => ({
    label: `${i + 1}`,
    value: Math.round((value / maxBar) * 95),
  }));

  const savedShow = appear(frame, 60, 22).opacity;
  const monthShow = appear(frame, 110, 26).opacity;

  return (
    <AbsoluteFill style={{ background: BG }}>
      <Eyebrow index="04" label="CACHING · −67% COST" show={eyebrowShow} />

      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TiltedFrame tiltY={0} show={cardShow}>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              padding: 60,
              gap: 60,
              fontFamily: FONT_BODY,
              color: TEXT,
            }}
          >
            {/* Left: hero number */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 24,
              }}
            >
              <span
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 13,
                  letterSpacing: "0.25em",
                  color: "rgba(245,245,240,0.5)",
                  textTransform: "uppercase",
                }}
              >
                this task
              </span>
              <Odometer
                value={0.08}
                fromFrame={20}
                duration={36}
                digits={2}
                prefix="$"
                size={160}
                color={TEXT}
                nowFrame={frame}
              />
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 18px",
                  borderRadius: 999,
                  background: `${SAVINGS}18`,
                  border: `1px solid ${SAVINGS}55`,
                  alignSelf: "flex-start",
                  opacity: savedShow,
                  transform: `translateY(${(1 - savedShow) * 12}px)`,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 22,
                    fontWeight: 500,
                    color: SAVINGS,
                    letterSpacing: "0.1em",
                  }}
                >
                  SAVED $0.16 · −67%
                </span>
              </div>
            </div>

            {/* Right: monthly bars */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
                opacity: monthShow,
                transform: `translateY(${(1 - monthShow) * 18}px)`,
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 14,
                padding: 28,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 13,
                    letterSpacing: "0.22em",
                    color: "rgba(245,245,240,0.55)",
                    textTransform: "uppercase",
                  }}
                >
                  Saved · last 30 days
                </span>
                <span
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: 36,
                    fontWeight: 600,
                    color: ACCENT,
                    letterSpacing: "-0.02em",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  $4,820
                </span>
              </div>
              <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 5 }}>
                {dailyBars.map((b, i) => {
                  const t = interpolate(
                    frame,
                    [110 + i * 2, 110 + i * 2 + 16],
                    [0, 1],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut }
                  );
                  return (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: `${b.value * t}%`,
                        background: `linear-gradient(180deg, ${ACCENT} 0%, ${ACCENT}55 100%)`,
                        borderRadius: "3px 3px 0 0",
                        boxShadow: `0 -6px 16px ${ACCENT}33`,
                      }}
                    />
                  );
                })}
              </div>
              <div
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  color: "rgba(245,245,240,0.35)",
                  textTransform: "uppercase",
                }}
              >
                $4,820 saved this month vs naive routing
              </div>
            </div>
          </div>
        </TiltedFrame>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ═════════════════════════════════════════════════════════════════════
// S6 · VOICE (42–50s · 240 frames)
//   Voice waveform → prompt bar → 3 pipeline panes (code · speech · render)
//   Eyebrow: 05 · VOICE · VOICE-IN · SHIP-OUT
// ═════════════════════════════════════════════════════════════════════
const S6_Voice: React.FC = () => {
  const frame = useCurrentFrame();
  const eyebrowShow = appear(frame, 6, 18).opacity;
  const cardShow = appear(frame, 0, 22).opacity;

  // Waveform bars (32 of them, animated by sine of frame)
  const waveBars = Array.from({ length: 36 });
  // Voice text typed in over frames 30-75
  const promptText = '"polypus, refactor the login flow"';
  const promptProgress = interpolate(frame, [30, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const typedPrompt = promptText.slice(
    0,
    Math.floor(promptText.length * promptProgress)
  );

  const panesShow = appear(frame, 90, 26).opacity;

  return (
    <AbsoluteFill style={{ background: BG }}>
      <Eyebrow index="05" label="VOICE · VOICE-IN · SHIP-OUT" show={eyebrowShow} />

      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TiltedFrame tiltY={-3} show={cardShow}>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              padding: 32,
              gap: 22,
              fontFamily: FONT_BODY,
              color: TEXT,
            }}
          >
            {/* Waveform top bar */}
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 14,
                padding: "18px 24px",
                display: "flex",
                alignItems: "center",
                gap: 22,
                height: 92,
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: ACCENT,
                  boxShadow: `0 0 14px ${ACCENT}`,
                  opacity: 0.6 + 0.4 * Math.abs(Math.sin(frame / 6)),
                }}
              />
              <span
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 12,
                  letterSpacing: "0.22em",
                  color: ACCENT,
                  textTransform: "uppercase",
                  minWidth: 110,
                }}
              >
                listening
              </span>
              <div
                style={{
                  flex: 1,
                  height: 56,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                {waveBars.map((_, i) => {
                  const phase = i * 0.4 + frame / 4;
                  const amp =
                    frame > 20
                      ? 6 +
                        Math.abs(Math.sin(phase) * 22) +
                        Math.abs(Math.sin(phase * 1.7) * 12)
                      : 4;
                  return (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: amp,
                        background: ACCENT,
                        borderRadius: 2,
                        opacity: 0.55 + (amp / 50) * 0.4,
                        boxShadow: `0 0 6px ${ACCENT}55`,
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Prompt bar */}
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${ACCENT}33`,
                borderRadius: 12,
                padding: "16px 22px",
                fontFamily: FONT_MONO,
                fontSize: 18,
                color: TEXT,
                minHeight: 56,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{ color: ACCENT, opacity: 0.8 }}>›</span>
              <span>{typedPrompt}</span>
              {promptProgress < 1 && Math.floor(frame / 12) % 2 === 0 && (
                <span style={{ color: ACCENT }}>▌</span>
              )}
            </div>

            {/* 3 pipeline panes */}
            <div
              style={{
                flex: 1,
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 14,
                opacity: panesShow,
                transform: `translateY(${(1 - panesShow) * 14}px)`,
              }}
            >
              {[
                {
                  title: "code · refactor",
                  body: [
                    "@/auth/login.ts",
                    "+ extractFlow(req)",
                    "+ validateSchema(req)",
                    "- legacyRedirect()",
                    "✓ 6 files updated",
                  ],
                },
                {
                  title: "speech · synth",
                  body: [
                    "voice: jl-pt",
                    "elevenlabs · v3",
                    "▰▰▰▰▰▰▱▱ 76%",
                    "duration: 14.2s",
                    "✓ artifact ready",
                  ],
                },
                {
                  title: "render · pipeline",
                  body: [
                    "remotion render",
                    "comp: LoginFlow",
                    "frames 0–450",
                    "▰▰▰▰▰▱▱▱ 64%",
                    "h264 · 1080p",
                  ],
                },
              ].map((p, i) => {
                const enter = appear(frame, 100 + i * 6, 22).opacity;
                return (
                  <div
                    key={p.title}
                    style={{
                      background: "rgba(0,0,0,0.45)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 12,
                      padding: 18,
                      opacity: enter,
                      transform: `translateY(${(1 - enter) * 16}px)`,
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONT_MONO,
                        fontSize: 11,
                        letterSpacing: "0.22em",
                        color: ACCENT,
                        textTransform: "uppercase",
                      }}
                    >
                      {p.title}
                    </span>
                    <div
                      style={{
                        fontFamily: FONT_MONO,
                        fontSize: 13,
                        color: "rgba(245,245,240,0.7)",
                        lineHeight: 1.7,
                      }}
                    >
                      {p.body.map((line, k) => {
                        const lineEnter = appear(
                          frame,
                          110 + i * 6 + k * 8,
                          14
                        ).opacity;
                        return (
                          <div key={k} style={{ opacity: lineEnter }}>
                            {line}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div
              style={{
                fontFamily: FONT_MONO,
                fontSize: 12,
                letterSpacing: "0.22em",
                color: SAVINGS,
                opacity: appear(frame, 200, 18).opacity,
                textTransform: "uppercase",
              }}
            >
              ready · 3 artifacts shipped
            </div>
          </div>
        </TiltedFrame>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ═════════════════════════════════════════════════════════════════════
// S7 · ANCHOR (50–53.5s · 105 frames)
//   Black 10 frames, then anchor card fades in 10–40 (frames 1510–1540
//   global, here 10–40 local). Holds. UNIT REVEAL — no per-char.
// ═════════════════════════════════════════════════════════════════════
const S7_Anchor: React.FC = () => {
  const frame = useCurrentFrame();
  // Local frame 0 = global 1500. Card starts at local 10 = global 1510.
  // Fade in 10–40, hold to local 105.
  const cardOpacity = between(frame, 10, 30, 105, 0);

  return (
    <AbsoluteFill
      style={{
        background: BG,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
      }}
    >
      <h1
        style={{
          opacity: cardOpacity,
          fontFamily: FONT_DISPLAY,
          fontSize: 96,
          fontWeight: 600,
          letterSpacing: "-0.03em",
          color: TEXT,
          margin: 0,
          lineHeight: 1.05,
          textAlign: "center",
          transform: `translateY(${(1 - cardOpacity) * 14}px)`,
        }}
      >
        Right task. Right brain.
      </h1>
      <div
        style={{
          opacity: cardOpacity * 0.8,
          fontFamily: FONT_MONO,
          fontSize: 14,
          letterSpacing: "0.25em",
          color: ACCENT,
          textTransform: "uppercase",
        }}
      >
        Polypus · The AI Workspace
      </div>
    </AbsoluteFill>
  );
};

// ═════════════════════════════════════════════════════════════════════
// S8 · WORDMARK (53.5–55s · 45 frames)
//   POLYPUS Clash Display 600 180pt with purple bloom
//   Final 15 frames fade entire frame to black.
// ═════════════════════════════════════════════════════════════════════
const S8_Wordmark: React.FC = () => {
  const frame = useCurrentFrame();
  // Wordmark fade in 0-18, hold, then fade ALL out 30-45
  const wordIn = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const masterFade = interpolate(frame, [30, 45], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: BG,
        opacity: masterFade,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 36,
      }}
    >
      {/* Purple bloom behind wordmark */}
      <div
        style={{
          position: "absolute",
          width: 1400,
          height: 600,
          background: `radial-gradient(ellipse at 50% 50%, ${ACCENT}33 0%, transparent 65%)`,
          filter: "blur(40px)",
          opacity: wordIn * 0.7,
          pointerEvents: "none",
        }}
      />
      {/* Polypus logo above wordmark */}
      <div
        style={{
          opacity: wordIn,
          transform: `translateY(${(1 - wordIn) * 24}px) scale(${0.92 + 0.08 * wordIn})`,
          marginBottom: -8,
        }}
      >
        <LogoLockup brand="polypus" size={140} show={wordIn} tint={`${ACCENT}88`} />
      </div>
      <div
        style={{
          fontFamily: FONT_DISPLAY,
          fontSize: 180,
          fontWeight: 600,
          letterSpacing: "-0.04em",
          color: TEXT,
          opacity: wordIn,
          transform: `translateY(${(1 - wordIn) * 18}px)`,
          textShadow: `0 0 40px ${ACCENT}55`,
          lineHeight: 1,
        }}
      >
        POLYPUS
      </div>
      <div
        style={{
          fontFamily: FONT_MONO,
          fontSize: 14,
          letterSpacing: "0.25em",
          color: MUTED,
          opacity: wordIn * 0.85,
          textTransform: "uppercase",
        }}
      >
        polypus.app · Early Access
      </div>
    </AbsoluteFill>
  );
};

// ═════════════════════════════════════════════════════════════════════
// ROOT COMPOSITION
// ═════════════════════════════════════════════════════════════════════
// Brief mandates HARD CUTS between scenes — no overlap.
// Series.Sequence chained back-to-back yields exact-frame hard cuts.
// Total frames: 180+270+240+270+300+240+105+45 = 1650 (exact).
export const Polypus: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: BG }}>
      <Series>
        <Series.Sequence durationInFrames={S1_LEN}>
          <S1_ColdOpen />
        </Series.Sequence>
        <Series.Sequence durationInFrames={S2_LEN}>
          <S2_Router />
        </Series.Sequence>
        <Series.Sequence durationInFrames={S3_LEN}>
          <S3_Parallel />
        </Series.Sequence>
        <Series.Sequence durationInFrames={S4_LEN}>
          <S4_Memory />
        </Series.Sequence>
        <Series.Sequence durationInFrames={S5_LEN}>
          <S5_Cost />
        </Series.Sequence>
        <Series.Sequence durationInFrames={S6_LEN}>
          <S6_Voice />
        </Series.Sequence>
        <Series.Sequence durationInFrames={S7_LEN}>
          <S7_Anchor />
        </Series.Sequence>
        <Series.Sequence durationInFrames={S8_LEN}>
          <S8_Wordmark />
        </Series.Sequence>
      </Series>
      <Vignette strength={0.5} />
      <Grain opacity={0.03} />
      {/* Persistent brand watermarks — Polypus product mark + CEPHALO Labs sigil */}
      <LogoWatermark brand="polypus" position="top-right" size={32} opacity={0.5} withLabel="POLYPUS" />
      <LogoSigil brand="cephalo" position="bottom-left" size={20} opacity={0.35} />
    </AbsoluteFill>
  );
};
