import React from "react";
import { AbsoluteFill, Audio, staticFile, interpolate } from "remotion";
import {
  INK, PURPLE, FONT, MONO,
  useMotion, S, appear, between, stagger,
  Starfield, GodRays, Horizon, GridFloor, Vignette, Grain,
  Wordmark, Sparkle, Eyebrow, Chip, FloatingCard,
  PolypusDashboard, ChatBubble, Scene, Watermark, FrameLabel, easeOut,
} from "../primitives/cinematic";
import {
  Flash, CameraShake, PulseRing, ParticleBurst, BarChart, LineGraph,
  TypewriterText, TextScramble, BinaryRain, Odometer, ProgressBar,
  Lightbar, FlyingTokens, KineticText, IconGrid, CircularProgress,
  NetworkGraph, CodeStream, duck,
} from "../primitives/motion-graphics";

// ═══════════════════════════════════════════════════════════════════════
//  PolypusVSL — "Tech Synthwave · Purple Flow"
//  Duration: 1680 frames (56s) @ 30fps — fits full voiceover.
//  Rhythmic reveals, network orchestration viz, code stream, data flow.
// ═══════════════════════════════════════════════════════════════════════

const VO_SEGMENTS: { start: number; end: number }[] = [
  { start: 45,   end: 230 },   // "This is Polypus. One interface..."
  { start: 250,  end: 600 },   // "Send a task... routes..."
  { start: 620,  end: 900 },   // "Memory layers..."
  { start: 920,  end: 1200 },  // "Agents spawn..."
  { start: 1220, end: 1470 },  // "Voice input... creative..."
  { start: 1490, end: 1680 },  // "Coming 2026..."
];

export const PolypusVSL: React.FC = () => {
  const { frame, width, height } = useMotion();
  const cx = width / 2;
  const cy = height / 2;

  return (
    <AbsoluteFill style={{ background: INK.bg, overflow: "hidden" }}>
      {/* ── AUDIO ──────────────────────────────────────────────────── */}
      <Audio
        src={staticFile("/music/polypus.mp3")}
        volume={(f) => {
          const vol = duck(f, VO_SEGMENTS, 0.36, 0.10, 12);
          // Loop/fade — music is ~32s, composition is 56s. Soft fade after 28s.
          const fade = interpolate(f, [S(28), S(32)], [1, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          });
          return vol * fade;
        }}
      />
      {/* Bring music back in at end for outro energy */}
      <Audio
        src={staticFile("/music/polypus.mp3")}
        volume={(f) => {
          const base = interpolate(f, [S(48), S(50), S(54), S(56)], [0, 0.3, 0.3, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          });
          return base;
        }}
        startFrom={900}
      />
      <Audio
        src={staticFile("/voiceover/polypus-vsl.mp3")}
        volume={0.95}
      />

      {/* ── ATMOSPHERE ─────────────────────────────────────────────── */}
      <Starfield count={180} tone="purple" intensity={0.85} />
      <GridFloor tone="purple" opacity={0.08} />
      <BinaryRain tone="purple" density={18} opacity={0.06} speed={0.7} />
      <GodRays tone="purple" beams={3} intensity={0.7} />

      {/* ═══ SCENE 1 · Polypus reveal (0-5s) ═══ */}
      <Scene opacity={between(frame, 0, 18, S(5), 22)}>
        <div style={{ textAlign: "center", position: "relative" }}>
          <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
            <PulseRing cx={0} cy={0} tone="purple" maxRadius={360} rings={5} period={75} opacity={0.45} />
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: 36, position: "relative", zIndex: 2 }}>
            <KineticText
              text="Polypus"
              startFrame={10}
              perChar={2.2}
              style={{ fontFamily: FONT, fontSize: 220, fontWeight: 700, letterSpacing: "-0.05em", color: PURPLE, lineHeight: 0.9, textShadow: `0 0 40px ${PURPLE}AA` }}
              nowFrame={frame}
            />
          </div>

          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "12px 22px", borderRadius: 999,
            background: `${PURPLE}12`,
            border: `1px solid ${PURPLE}55`,
            opacity: appear(frame, 40, 22).opacity,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: PURPLE, boxShadow: `0 0 18px ${PURPLE}` }} />
            <span style={{
              fontFamily: MONO, fontSize: 16, color: PURPLE,
              letterSpacing: "0.28em", textTransform: "uppercase",
            }}>
              <TypewriterText text="FLAGSHIP · COMING 2026" startFrame={48} charsPerFrame={1} showCaret nowFrame={frame} style={{ fontSize: 16 }} />
            </span>
          </div>
        </div>
      </Scene>

      <Flash at={28} duration={6} color={PURPLE} intensity={0.4} nowFrame={frame} />

      {/* ═══ SCENE 2 · One interface. Every model. (5-12s) ═══ */}
      <Scene opacity={between(frame, S(5), 22, S(12), 22)}>
        <div style={{ width: "100%", textAlign: "center" }}>
          <Eyebrow accent={PURPLE} show={appear(frame, S(5) + 6, 16).opacity}>Orchestration</Eyebrow>

          <div style={{ marginTop: 28 }}>
            <KineticText
              text="One interface."
              startFrame={S(5) + 12}
              perChar={1}
              style={{ fontFamily: FONT, fontSize: 120, fontWeight: 700, letterSpacing: "-0.045em", color: INK.text, lineHeight: 1 }}
              nowFrame={frame}
            />
            <div style={{ height: 18 }} />
            <KineticText
              text="Every AI model."
              startFrame={S(5) + 34}
              perChar={1}
              style={{ fontFamily: FONT, fontSize: 120, fontWeight: 700, letterSpacing: "-0.045em", color: PURPLE, lineHeight: 1, textShadow: `0 0 32px ${PURPLE}88` }}
              nowFrame={frame}
            />
          </div>

          {/* Network graph showing orchestration */}
          <div style={{ marginTop: 70, display: "flex", justifyContent: "center", opacity: appear(frame, S(5) + 70, 28).opacity }}>
            <NetworkGraph
              nodes={[
                { id: "hub",     x: 450, y: 190, size: 16, label: "POLYPUS" },
                { id: "haiku",   x: 180, y:  60, size: 10, label: "HAIKU" },
                { id: "sonnet",  x:  70, y: 190, size: 10, label: "SONNET" },
                { id: "opus",    x: 180, y: 320, size: 10, label: "OPUS" },
                { id: "gpt",     x: 720, y:  60, size: 10, label: "GPT-4" },
                { id: "gemini",  x: 830, y: 190, size: 10, label: "GEMINI" },
                { id: "ollama",  x: 720, y: 320, size: 10, label: "LOCAL" },
              ]}
              edges={[
                { from: "hub", to: "haiku"  },
                { from: "hub", to: "sonnet" },
                { from: "hub", to: "opus"   },
                { from: "hub", to: "gpt"    },
                { from: "hub", to: "gemini" },
                { from: "hub", to: "ollama" },
              ]}
              startFrame={S(5) + 70}
              tone="purple"
              width={900}
              height={380}
              nowFrame={frame}
            />
          </div>
        </div>
      </Scene>

      <Lightbar startFrame={S(9)} tone="purple" y={520} nowFrame={frame} />

      {/* ═══ SCENE 3 · Live dashboard (12-20s) ═══ */}
      <Scene opacity={between(frame, S(12), 24, S(20), 22)}>
        <div style={{ width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: 40, opacity: appear(frame, S(12) + 6, 20).opacity }}>
            <Eyebrow accent={PURPLE} show={1}>Live · inside the app</Eyebrow>
            <p style={{ fontFamily: FONT, fontSize: 54, fontWeight: 500, color: INK.text, letterSpacing: "-0.02em", marginTop: 10 }}>
              <KineticText text="Built for builders." startFrame={S(12) + 12} perChar={0.9} style={{ fontFamily: FONT, fontSize: 54, fontWeight: 500, color: INK.text }} nowFrame={frame} />
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "center", perspective: 1400, transformStyle: "preserve-3d" }}>
            <FloatingCard
              width={1020}
              height={570}
              tiltX={-8}
              tiltY={-8}
              glow={`${PURPLE}33`}
              show={appear(frame, S(12) + 22, 28).opacity}
            >
              <PolypusDashboard nowFrame={frame} startAt={S(12) + 22} />
            </FloatingCard>
          </div>
        </div>
      </Scene>

      {/* ═══ SCENE 4 · Adaptive routing / BarChart (20-28s) ═══ */}
      <Scene opacity={between(frame, S(20), 22, S(28), 22)}>
        <div style={{ width: "100%", maxWidth: 1600 }}>
          <Eyebrow accent={PURPLE} show={appear(frame, S(20) + 4, 16).opacity}>Adaptive routing</Eyebrow>
          <div style={{ marginTop: 18, opacity: appear(frame, S(20) + 10, 22).opacity }}>
            <KineticText
              text="Right task. Right model."
              startFrame={S(20) + 10}
              perChar={0.7}
              style={{ fontFamily: FONT, fontSize: 80, fontWeight: 600, color: INK.text, letterSpacing: "-0.035em" }}
              nowFrame={frame}
            />
          </div>

          <div style={{ marginTop: 60, display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 60, alignItems: "center" }}>
            {/* Task list with chips */}
            <div>
              {[
                { task: "Format JSON · 400ms",               model: "Haiku",  delay: 18 },
                { task: "Refactor a React component",        model: "Sonnet", delay: 32 },
                { task: "Architect multi-agent system",      model: "Opus",   delay: 46 },
                { task: "Run a shell script · parse output", model: "Local",  delay: 60 },
              ].map((row, i) => {
                const a = appear(frame, S(20) + row.delay, 22);
                return (
                  <div key={row.task} style={{
                    display: "flex", alignItems: "center", gap: 30,
                    padding: "22px 28px", marginBottom: 10,
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.025)",
                    borderRadius: 14,
                    boxShadow: "inset 0 1px 1px rgba(255,255,255,0.06)",
                    opacity: a.opacity,
                    transform: `translateX(${(1 - a.opacity) * -20}px)`,
                    fontFamily: FONT,
                  }}>
                    <div style={{ flex: 1, fontSize: 22, color: INK.text, fontWeight: 400 }}>{row.task}</div>
                    <div style={{ fontFamily: MONO, fontSize: 22, color: `${PURPLE}CC` }}>→</div>
                    <div style={{
                      padding: "10px 18px",
                      border: `1px solid ${PURPLE}66`,
                      background: `${PURPLE}18`,
                      color: PURPLE,
                      fontSize: 18, fontWeight: 500,
                      borderRadius: 8,
                      minWidth: 130,
                      textAlign: "center",
                      fontFamily: MONO,
                    }}>
                      {row.model}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* BarChart: task distribution */}
            <div style={{ opacity: appear(frame, S(20) + 50, 24).opacity }}>
              <p style={{ fontFamily: MONO, fontSize: 12, color: "rgba(245,245,240,0.45)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 24 }}>
                TODAY · 2,418 tasks routed
              </p>
              <BarChart
                data={[
                  { label: "Haiku",  value: 1240 },
                  { label: "Sonnet", value: 780  },
                  { label: "Opus",   value: 260  },
                  { label: "Local",  value: 138  },
                ]}
                startFrame={S(20) + 60}
                tone="purple"
                orientation="horizontal"
                width={460}
                height={260}
                nowFrame={frame}
              />
            </div>
          </div>
        </div>
      </Scene>

      {/* ═══ SCENE 5 · Memory layers · CircularProgress (28-36s) ═══ */}
      <Scene opacity={between(frame, S(28), 22, S(36), 22)}>
        <div style={{ width: "100%", textAlign: "center" }}>
          <Eyebrow accent={PURPLE} show={appear(frame, S(28) + 4, 16).opacity}>Memory that persists</Eyebrow>
          <div style={{ marginTop: 22, opacity: appear(frame, S(28) + 10, 22).opacity }}>
            <KineticText
              text="Hot. Warm. Cold."
              startFrame={S(28) + 10}
              perChar={0.9}
              style={{ fontFamily: FONT, fontSize: 88, fontWeight: 700, color: INK.text, letterSpacing: "-0.04em" }}
              nowFrame={frame}
            />
          </div>

          <div style={{ marginTop: 60, display: "flex", justifyContent: "center", gap: 80 }}>
            {[
              { label: "Hot · VRAM",  value: 0.98, delay: 22 },
              { label: "Warm · RAM",  value: 0.72, delay: 34 },
              { label: "Cold · Disk", value: 0.44, delay: 46 },
            ].map((m) => (
              <div key={m.label} style={{ opacity: appear(frame, S(28) + m.delay, 24).opacity, transform: `translateY(${appear(frame, S(28) + m.delay, 24).y}px)` }}>
                <CircularProgress
                  value={m.value}
                  fromFrame={S(28) + m.delay + 6}
                  duration={36}
                  size={200}
                  strokeWidth={8}
                  tone="purple"
                  label={m.label}
                  nowFrame={frame}
                />
              </div>
            ))}
          </div>
        </div>
      </Scene>

      {/* ═══ SCENE 6 · Agent spawn · parallel execution (36-44s) ═══ */}
      <Scene opacity={between(frame, S(36), 22, S(44), 22)}>
        <div style={{ width: "100%", textAlign: "center" }}>
          <Eyebrow accent={PURPLE} show={appear(frame, S(36) + 4, 16).opacity}>Parallel execution</Eyebrow>
          <div style={{ marginTop: 22, opacity: appear(frame, S(36) + 10, 22).opacity }}>
            <KineticText
              text="One instruction."
              startFrame={S(36) + 10}
              perChar={0.8}
              style={{ fontFamily: FONT, fontSize: 86, fontWeight: 600, color: INK.text, letterSpacing: "-0.04em" }}
              nowFrame={frame}
            />
            <div style={{ height: 4 }} />
            <KineticText
              text="Ten agents."
              startFrame={S(36) + 30}
              perChar={0.8}
              style={{ fontFamily: FONT, fontSize: 86, fontWeight: 600, color: PURPLE, letterSpacing: "-0.04em", textShadow: `0 0 26px ${PURPLE}88` }}
              nowFrame={frame}
            />
          </div>

          <div style={{
            marginTop: 56,
            display: "grid",
            gridTemplateColumns: "repeat(10, 1fr)",
            gap: 10,
            maxWidth: 1100,
            margin: "56px auto 0",
          }}>
            {Array.from({ length: 10 }).map((_, i) => {
              const a = stagger(frame, S(36) + 50, i, 3, 16);
              const pulse = 0.5 + 0.5 * Math.sin(frame / 16 + i * 0.6);
              return (
                <div key={i} style={{
                  height: 96,
                  borderRadius: 12,
                  border: `1px solid ${PURPLE}55`,
                  background: `linear-gradient(180deg, ${PURPLE}28 0%, ${PURPLE}08 100%)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: MONO, fontSize: 15, color: PURPLE,
                  letterSpacing: "0.08em",
                  opacity: a.opacity * (0.7 + pulse * 0.3),
                  transform: `translateY(${a.y}px) scale(${0.88 + a.opacity * 0.12})`,
                  boxShadow: `0 0 ${10 + pulse * 14}px ${PURPLE}${Math.floor(30 + pulse * 50).toString(16)}`,
                }}>
                  AGENT {String(i + 1).padStart(2, "0")}
                </div>
              );
            })}
          </div>
        </div>
      </Scene>

      {/* ═══ SCENE 7 · Code stream · terminal (44-52s) ═══ */}
      <Scene opacity={between(frame, S(44), 22, S(52), 22)}>
        <div style={{ width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: 30, opacity: appear(frame, S(44) + 4, 18).opacity }}>
            <Eyebrow accent={PURPLE} show={1}>Voice. Whisper. Skills.</Eyebrow>
            <p style={{ fontFamily: FONT, fontSize: 58, fontWeight: 600, color: INK.text, letterSpacing: "-0.03em", marginTop: 10 }}>
              <KineticText text="Orchestrate by voice." startFrame={S(44) + 12} perChar={0.8} style={{ fontFamily: FONT, fontSize: 58, fontWeight: 600, color: INK.text }} nowFrame={frame} />
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 40, opacity: appear(frame, S(44) + 30, 26).opacity }}>
            <CodeStream
              lines={[
                "$ polypus voice",
                "[ listening… Whisper · en-US ]",
                "→ route task: \"refactor auth\"",
                "[ analysing complexity · 8.2 / 10 ]",
                "→ spawning 4 agents",
                "  agent/01  Sonnet   → read auth.ts",
                "  agent/02  Sonnet   → scan tests",
                "  agent/03  Opus     → plan",
                "  agent/04  Opus     → write patch",
                "[ memory · hot=92%, warm=58%, cold=33% ]",
                "[ skill · install refactor-auth@1.2 ]",
                "→ 4 agents complete · 42s",
                "[ diff ready · 6 files · 238 ± 14 ]",
                "$ _",
              ]}
              startFrame={S(44) + 34}
              linePerFrames={8}
              width={760}
              height={380}
              tone="purple"
              nowFrame={frame}
            />
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 18, width: 320 }}>
              <div style={{
                padding: 24,
                border: `1px solid ${PURPLE}44`,
                borderRadius: 14,
                background: `linear-gradient(180deg, ${PURPLE}10 0%, rgba(10,10,13,0) 100%)`,
                boxShadow: "inset 0 1px 1px rgba(255,255,255,0.08)",
              }}>
                <p style={{ fontFamily: MONO, fontSize: 11, color: `${PURPLE}AA`, letterSpacing: "0.22em", textTransform: "uppercase", margin: 0, marginBottom: 14 }}>Creative pipeline</p>
                <p style={{ fontFamily: FONT, fontSize: 26, color: INK.text, margin: 0, letterSpacing: "-0.02em" }}>Image · Video · Doc.</p>
                <p style={{ fontFamily: FONT, fontSize: 16, color: "rgba(245,245,240,0.55)", marginTop: 10 }}>One unified interface.</p>
              </div>
              <div style={{
                padding: 24,
                border: `1px solid ${PURPLE}44`,
                borderRadius: 14,
                background: `linear-gradient(180deg, ${PURPLE}10 0%, rgba(10,10,13,0) 100%)`,
                boxShadow: "inset 0 1px 1px rgba(255,255,255,0.08)",
              }}>
                <p style={{ fontFamily: MONO, fontSize: 11, color: `${PURPLE}AA`, letterSpacing: "0.22em", textTransform: "uppercase", margin: 0, marginBottom: 14 }}>Skill registry</p>
                <p style={{ fontFamily: FONT, fontSize: 26, color: INK.text, margin: 0, letterSpacing: "-0.02em" }}>Install on demand.</p>
                <p style={{ fontFamily: FONT, fontSize: 16, color: "rgba(245,245,240,0.55)", marginTop: 10 }}>Grows as you do.</p>
              </div>
            </div>
          </div>
        </div>
      </Scene>

      {/* ═══ SCENE 8 · Final (52-56s) ═══ */}
      <Scene opacity={between(frame, S(52), 20, S(56), 0)}>
        <div style={{ textAlign: "center", position: "relative" }}>
          <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
            <PulseRing cx={0} cy={0} tone="purple" maxRadius={480} rings={4} period={80} opacity={0.3} />
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 32, position: "relative", zIndex: 2 }}>
            <Wordmark name="Polypus" accent={PURPLE} size={230} show={appear(frame, S(52) + 6, 26).opacity} />
          </div>
          <p style={{
            fontFamily: FONT, fontSize: 42, color: INK.text, fontWeight: 400,
            margin: 0, letterSpacing: "-0.01em",
            opacity: appear(frame, S(52) + 26, 22).opacity,
          }}>
            The AI workspace for people who build.
          </p>
          <p style={{
            fontFamily: MONO, fontSize: 16, color: PURPLE,
            letterSpacing: "0.3em", textTransform: "uppercase",
            marginTop: 26,
            opacity: appear(frame, S(52) + 48, 22).opacity,
          }}>
            cephalon.ai / polypus · 2026
          </p>
        </div>
      </Scene>

      <ParticleBurst cx={cx} cy={cy} count={36} maxRadius={600} startFrame={S(52)} duration={50} tone="purple" nowFrame={frame} />

      {/* Flying ambient tokens throughout mid-section */}
      {frame > S(4) && frame < S(46) && (
        <FlyingTokens
          tokens={["HAIKU", "OPUS", "0xA1F", "route", "parallel", "SONNET", "1024", "context", "→", "GEMINI", "skill", "invoke", "ROUTE"]}
          startFrame={S(4)}
          tone="purple"
          nowFrame={frame}
        />
      )}

      <Vignette strength={0.88} />
      <Grain opacity={0.04} />
      <Watermark text="CEPHALO · POLYPUS" />
      <FrameLabel text="2026" />
    </AbsoluteFill>
  );
};
