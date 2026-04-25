import React from "react";
import { AbsoluteFill, Audio, staticFile, interpolate } from "remotion";
import {
  INK, FONT, MONO,
  useMotion, S, appear, between, stagger,
  Starfield, GodRays, Horizon, GridFloor, Vignette, Grain,
  Wordmark, Sparkle, Eyebrow, Chip, FloatingCard,
  BigNumber, Scene, Watermark, FrameLabel, easeOut,
} from "../primitives/cinematic";
import {
  Flash, CameraShake, PulseRing, ParticleBurst, BarChart, LineGraph,
  TypewriterText, TextScramble, BinaryRain, Odometer, ProgressBar,
  Lightbar, FlyingTokens, KineticText, IconGrid, CircularProgress,
  duck,
} from "../primitives/motion-graphics";

// ═══════════════════════════════════════════════════════════════════════
//  HomeVSL — "Industrial Cinematic B&W"
//  Duration: 1260 frames (42s) @ 30fps
//  Voiceover-led, music ducked underneath.
// ═══════════════════════════════════════════════════════════════════════

// Voiceover-active ranges (frames) — music ducks when voice speaks.
const VO_SEGMENTS: { start: number; end: number }[] = [
  { start: 45,   end: 300 },   // intro lines
  { start: 315,  end: 600 },   // principles
  { start: 620,  end: 960 },   // products
  { start: 980,  end: 1260 },  // closing
];

export const HomeVSL: React.FC = () => {
  const { frame, width, height } = useMotion();
  const cx = width / 2;
  const cy = height / 2;

  // Music volume automation — ducks during voiceover
  const musicVolume = duck(frame, VO_SEGMENTS, 0.42, 0.12, 14);

  // Fade music out after 28s
  const musicFadeOut = interpolate(frame, [S(28), S(30)], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: INK.bg, overflow: "hidden" }}>
      {/* ── AUDIO ──────────────────────────────────────────────────── */}
      <Audio
        src={staticFile("/music/cephalo-main.mp3")}
        volume={(f) => {
          const vol = duck(f, VO_SEGMENTS, 0.42, 0.12, 14);
          const fade = interpolate(f, [S(28), S(30)], [1, 0.35], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          });
          return vol * fade;
        }}
      />
      <Audio
        src={staticFile("/voiceover/home-vsl.mp3")}
        volume={0.95}
        startFrom={0}
      />

      {/* ── ATMOSPHERE (persistent) ────────────────────────────────── */}
      <Starfield count={160} intensity={0.85} />
      <GridFloor opacity={0.05} />
      <BinaryRain density={18} opacity={0.05} speed={0.6} />

      {/* ═══ SCENE 1 · Opening pulse + wordmark (0-4s) ═══ */}
      <Scene opacity={between(frame, 0, 16, S(4), 22)}>
        <CameraShake amplitude={1} active={frame > 40 && frame < 55}>
          <div style={{ textAlign: "center", position: "relative" }}>
            {/* Pulsing rings around the wordmark */}
            <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
              <PulseRing cx={0} cy={0} tone="white" maxRadius={320} rings={4} period={70} opacity={0.35} />
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginBottom: 36, position: "relative", zIndex: 2 }}>
              <KineticText
                text="CEPHALO"
                startFrame={10}
                perChar={2}
                from="up"
                style={{ fontFamily: FONT, fontSize: 200, fontWeight: 700, letterSpacing: "-0.05em", color: INK.text, lineHeight: 0.9 }}
                nowFrame={frame}
              />
            </div>
            <p style={{
              fontFamily: MONO, fontSize: 17,
              color: "rgba(245,245,240,0.45)",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              margin: 0,
              opacity: appear(frame, 44, 22).opacity,
            }}>
              <TypewriterText text="AI · DEVELOPER · STUDIO · EST · 2026" startFrame={50} charsPerFrame={1.2} showCaret={false} nowFrame={frame} style={{ fontSize: 17 }} />
            </p>
          </div>
        </CameraShake>
      </Scene>

      {/* Flash at wordmark completion */}
      <Flash at={32} duration={8} intensity={0.35} nowFrame={frame} />

      {/* ═══ SCENE 2 · "Intelligence is the foundation" (4-10s) ═══ */}
      <Scene opacity={between(frame, S(4), 22, S(10), 22)}>
        <div style={{ textAlign: "center", maxWidth: 1700 }}>
          <Eyebrow show={appear(frame, S(4) + 6, 16).opacity}>2026</Eyebrow>

          <div style={{ marginTop: 40 }}>
            <div style={{ opacity: appear(frame, S(4) + 14, 22).opacity, transform: `translateY(${appear(frame, S(4) + 14, 22).y}px)` }}>
              <KineticText
                text="Intelligence is not"
                startFrame={S(4) + 14}
                perChar={0.8}
                from="up"
                style={{ fontFamily: FONT, fontSize: 110, fontWeight: 600, letterSpacing: "-0.04em", color: INK.text, lineHeight: 1.05 }}
                nowFrame={frame}
              />
            </div>
            <div style={{ marginTop: 14 }}>
              <KineticText
                text="a feature anymore."
                startFrame={S(4) + 30}
                perChar={0.8}
                from="blur"
                style={{ fontFamily: FONT, fontSize: 110, fontWeight: 600, letterSpacing: "-0.04em", color: "rgba(245,245,240,0.4)", lineHeight: 1.05 }}
                nowFrame={frame}
              />
            </div>

            {/* Horizontal accent line */}
            <div style={{
              marginTop: 50,
              height: 1,
              width: interpolate(frame, [S(4) + 50, S(4) + 90], [0, 640], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              margin: "50px auto 0",
              background: "rgba(245,245,240,0.6)",
              boxShadow: "0 0 14px rgba(245,245,240,0.8)",
            }} />

            <div style={{ marginTop: 32, opacity: appear(frame, S(4) + 95, 22).opacity }}>
              <KineticText
                text="It is the foundation."
                startFrame={S(4) + 100}
                perChar={0.6}
                from="up"
                style={{ fontFamily: FONT, fontSize: 86, fontWeight: 500, letterSpacing: "-0.03em", color: INK.text }}
                nowFrame={frame}
              />
            </div>
          </div>
        </div>
      </Scene>

      {/* Flash + shake on "foundation" */}
      <Flash at={S(4) + 100} duration={10} intensity={0.45} nowFrame={frame} />

      {/* ═══ SCENE 3 · Three principles data viz (10-20s) ═══ */}
      <Scene opacity={between(frame, S(10), 22, S(20), 22)}>
        <div style={{ width: "100%", maxWidth: 1600 }}>
          <Eyebrow show={appear(frame, S(10) + 6, 16).opacity}>
            Three principles
          </Eyebrow>
          <div style={{ marginTop: 22, opacity: appear(frame, S(10) + 12, 22).opacity }}>
            <KineticText
              text="How CEPHALO ships."
              startFrame={S(10) + 12}
              perChar={0.7}
              style={{ fontFamily: FONT, fontSize: 86, fontWeight: 600, letterSpacing: "-0.03em", color: INK.text, lineHeight: 1 }}
              nowFrame={frame}
            />
          </div>

          {/* 3 principles in 3 columns with progress bars */}
          <div style={{ marginTop: 60, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 28 }}>
            {[
              { n: "01", t: "Build for ourselves first", pillar: "Self-use", prog: 1.00, delay: 40 },
              { n: "02", t: "Builders, not consultants", pillar: "Shipping",  prog: 1.00, delay: 62 },
              { n: "03", t: "Results over roadmaps",     pillar: "Production", prog: 0.95, delay: 84 },
            ].map((p) => {
              const a = appear(frame, S(10) + p.delay, 26);
              return (
                <div key={p.n} style={{
                  padding: "38px 30px",
                  borderRadius: 16,
                  border: "1px solid rgba(245,245,240,0.08)",
                  background: "linear-gradient(180deg, rgba(245,245,240,0.03) 0%, rgba(245,245,240,0) 100%)",
                  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.06)",
                  opacity: a.opacity,
                  transform: `translateY(${a.y}px)`,
                }}>
                  <div style={{ fontFamily: MONO, fontSize: 13, color: "rgba(245,245,240,0.35)", letterSpacing: "0.22em", marginBottom: 18 }}>
                    PRINCIPLE · {p.n}
                  </div>
                  <p style={{ fontFamily: FONT, fontSize: 34, fontWeight: 600, color: INK.text, letterSpacing: "-0.03em", lineHeight: 1.05, margin: "0 0 26px 0" }}>
                    {p.t}
                  </p>
                  <ProgressBar
                    value={p.prog}
                    fromFrame={S(10) + p.delay + 14}
                    duration={32}
                    width={320}
                    height={4}
                    label={p.pillar}
                    tone="white"
                    nowFrame={frame}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Scene>

      <Lightbar startFrame={S(10) + 22} tone="white" y={720} nowFrame={frame} />

      {/* ═══ SCENE 4 · Products display: Polypus + Kernel (20-28s) ═══ */}
      <Scene opacity={between(frame, S(20), 22, S(28), 22)}>
        <div style={{ width: "100%", textAlign: "center" }}>
          <Eyebrow show={appear(frame, S(20) + 6, 16).opacity}>Two products · In Development</Eyebrow>

          <div style={{ marginTop: 28, opacity: appear(frame, S(20) + 12, 22).opacity }}>
            <KineticText
              text="Products that compound."
              startFrame={S(20) + 12}
              perChar={0.6}
              style={{ fontFamily: FONT, fontSize: 80, fontWeight: 600, letterSpacing: "-0.035em", color: INK.text }}
              nowFrame={frame}
            />
          </div>

          {/* Product pair — Polypus + Kernel cards */}
          <div style={{
            marginTop: 72,
            display: "flex",
            gap: 40,
            justifyContent: "center",
            perspective: 1400,
            transformStyle: "preserve-3d",
          }}>
            {[
              { name: "POLYPUS", tag: "The orchestrator",      tiltY: 8,  delay: 38 },
              { name: "KERNEL",  tag: "The optimisation layer", tiltY: -8, delay: 50 },
            ].map((p) => {
              const a = appear(frame, S(20) + p.delay, 28);
              return (
                <div
                  key={p.name}
                  style={{
                    width: 520, padding: "60px 44px",
                    borderRadius: 22,
                    border: "1px solid rgba(245,245,240,0.22)",
                    background: "linear-gradient(160deg, rgba(245,245,240,0.08) 0%, rgba(10,10,13,0.8) 100%)",
                    boxShadow: "0 40px 80px -30px rgba(245,245,240,0.22), inset 0 1px 1px rgba(255,255,255,0.1)",
                    transform: `perspective(1400px) rotateY(${p.tiltY}deg) translateY(${a.y}px)`,
                    opacity: a.opacity,
                    textAlign: "left",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ position: "absolute", top: 18, right: 18, fontFamily: MONO, fontSize: 10, letterSpacing: "0.22em", color: "rgba(245,245,240,0.45)", textTransform: "uppercase" }}>
                    In Dev · 2026
                  </div>
                  <div style={{ marginBottom: 26 }}>
                    <Sparkle size={28} color={INK.text} />
                  </div>
                  <p style={{ fontFamily: FONT, fontSize: 62, fontWeight: 700, letterSpacing: "-0.04em", color: INK.text, margin: 0, lineHeight: 1, textShadow: "0 0 40px rgba(245,245,240,0.35)" }}>
                    {p.name}
                  </p>
                  <p style={{ fontFamily: FONT, fontSize: 22, color: "rgba(245,245,240,0.6)", margin: "14px 0 32px 0", letterSpacing: "-0.01em" }}>
                    {p.tag}
                  </p>
                  <ProgressBar
                    value={p.name === "POLYPUS" ? 0.72 : 0.48}
                    fromFrame={S(20) + p.delay + 18}
                    duration={30}
                    width={380}
                    height={3}
                    label="Development"
                    tone="white"
                    nowFrame={frame}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Scene>

      {/* ═══ SCENE 5 · Big receipts / odometer (28-36s) ═══ */}
      <Scene opacity={between(frame, S(28), 22, S(36), 22)}>
        <div style={{ width: "100%", maxWidth: 1600 }}>
          <Eyebrow show={appear(frame, S(28) + 4, 16).opacity}>Receipts · not projections</Eyebrow>

          <div style={{ marginTop: 22, opacity: appear(frame, S(28) + 10, 22).opacity }}>
            <KineticText
              text="The thesis is proven."
              startFrame={S(28) + 10}
              perChar={0.6}
              style={{ fontFamily: FONT, fontSize: 76, fontWeight: 600, letterSpacing: "-0.03em", color: INK.text }}
              nowFrame={frame}
            />
          </div>

          <div style={{ marginTop: 60, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
            {[
              { label: "Revenue built · Pantheon",    prefix: "$",  value: 400, suffix: "K+", at: 26 },
              { label: "Token reduction · Kernel",    prefix: "",   value: 70,  suffix: "%",  at: 38 },
              { label: "Long-run ROAS · Pantheon",    prefix: "",   value: 14,  suffix: "×",  at: 50 },
            ].map((n) => {
              const a = appear(frame, S(28) + n.at - 6, 22);
              return (
                <div key={n.label} style={{
                  padding: "54px 30px",
                  border: "1px solid rgba(245,245,240,0.1)",
                  background: "linear-gradient(180deg, rgba(245,245,240,0.02) 0%, rgba(245,245,240,0) 100%)",
                  borderRadius: 22,
                  textAlign: "center",
                  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.08)",
                  opacity: a.opacity,
                  transform: `translateY(${a.y}px)`,
                }}>
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline" }}>
                    <Odometer
                      value={n.value}
                      fromFrame={S(28) + n.at}
                      duration={38}
                      prefix={n.prefix}
                      suffix={n.suffix}
                      size={128}
                      color={INK.text}
                      nowFrame={frame}
                    />
                  </div>
                  <p style={{ fontFamily: MONO, fontSize: 14, color: "rgba(245,245,240,0.45)", marginTop: 22, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                    {n.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Scene>

      {/* Particle burst on the final number reveal */}
      <ParticleBurst cx={cx} cy={cy + 20} count={32} maxRadius={500} startFrame={S(32)} duration={40} tone="white" nowFrame={frame} />

      {/* ═══ SCENE 6 · Final wordmark + tagline (36-42s) ═══ */}
      <Scene opacity={between(frame, S(36), 24, S(42), 0)}>
        <div style={{ textAlign: "center", position: "relative" }}>
          <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
            <PulseRing cx={0} cy={0} tone="white" maxRadius={420} rings={3} period={80} opacity={0.25} />
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: 44, position: "relative", zIndex: 2 }}>
            <Wordmark name="CEPHALO" accent={INK.text} size={180} show={appear(frame, S(36) + 6, 26).opacity} />
          </div>
          <p style={{
            fontFamily: FONT,
            fontSize: 56,
            color: INK.text,
            fontWeight: 500,
            margin: 0,
            letterSpacing: "-0.02em",
            opacity: appear(frame, S(36) + 26, 22).opacity,
          }}>
            <KineticText
              text="We build intelligence."
              startFrame={S(36) + 26}
              perChar={1}
              style={{ fontFamily: FONT, fontSize: 56, fontWeight: 500, color: INK.text, letterSpacing: "-0.02em" }}
              nowFrame={frame}
            />
          </p>
          <p style={{
            fontFamily: MONO,
            fontSize: 15,
            color: "rgba(245,245,240,0.38)",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            marginTop: 34,
            opacity: appear(frame, S(36) + 62, 22).opacity,
          }}>
            cephalon.ai · 2026
          </p>
        </div>
      </Scene>

      {/* Global flying tokens between mid-scenes for tech ambience */}
      {frame > S(8) && frame < S(28) && (
        <FlyingTokens
          tokens={["0xA3F8", "1024", "TOKEN", "PARSE", "SHIP", "400K+", "OPS", "RUN", "70%", "PARALLEL", "0xDE", "14×", "EXEC"]}
          startFrame={S(8)}
          tone="white"
          nowFrame={frame}
        />
      )}

      {/* Top overlays */}
      <Vignette strength={0.95} />
      <Grain opacity={0.04} />
      <Watermark text="CEPHALO" />
      <FrameLabel text="2026" />
    </AbsoluteFill>
  );
};
