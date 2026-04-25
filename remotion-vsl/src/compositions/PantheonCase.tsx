import React from "react";
import { AbsoluteFill, Audio, staticFile, interpolate } from "remotion";
import {
  INK, GOLD, FONT, MONO,
  useMotion, S, appear, between, stagger,
  Starfield, GodRays, Horizon, GridFloor, Vignette, Grain,
  Wordmark, Sparkle, Eyebrow, Chip, FloatingCard,
  PantheonDashboard, BigNumber, Scene, Watermark, FrameLabel, easeOut,
} from "../primitives/cinematic";
import {
  Flash, CameraShake, PulseRing, ParticleBurst, BarChart, LineGraph,
  TypewriterText, TextScramble, BinaryRain, Odometer, ProgressBar,
  Lightbar, FlyingTokens, KineticText, duck,
} from "../primitives/motion-graphics";

// ═══════════════════════════════════════════════════════════════════════
//  PantheonCase — "Epic Orchestral · Data-driven case study"
//  Duration: 960 frames (32s) @ 30fps
//  Kinetic type + line graphs + big-number odometers + lightbars.
//  Gold accent is intentionally restrained (Pantheon brand marker).
// ═══════════════════════════════════════════════════════════════════════

const VO_SEGMENTS: { start: number; end: number }[] = [
  { start: 45,  end: 230 },   // "Pantheon Growth. Portugal..."
  { start: 250, end: 520 },   // "CEPHALO built..."
  { start: 540, end: 830 },   // "The result..."
  { start: 850, end: 960 },   // closing
];

export const PantheonCase: React.FC = () => {
  const { frame, width, height } = useMotion();
  const cx = width / 2;
  const cy = height / 2;

  return (
    <AbsoluteFill style={{ background: INK.bg, overflow: "hidden" }}>
      {/* ── AUDIO ──────────────────────────────────────────────────── */}
      <Audio
        src={staticFile("/music/pantheon.mp3")}
        volume={(f) => {
          const vol = duck(f, VO_SEGMENTS, 0.38, 0.11, 14);
          const fade = interpolate(f, [S(28), S(30)], [1, 0.3], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          });
          return vol * fade;
        }}
      />
      <Audio
        src={staticFile("/voiceover/pantheon-case.mp3")}
        volume={0.95}
      />

      {/* ── ATMOSPHERE ─────────────────────────────────────────────── */}
      <Starfield count={140} tone="gold" intensity={0.8} />
      <GridFloor tone="gold" opacity={0.05} />
      <GodRays tone="gold" beams={3} intensity={0.7} />

      {/* ═══ SCENE 1 · Pantheon reveal (0-4s) ═══ */}
      <Scene opacity={between(frame, 0, 18, S(4), 22)}>
        <div style={{ textAlign: "center", position: "relative" }}>
          <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
            <PulseRing cx={0} cy={0} tone="gold" maxRadius={340} rings={3} period={75} opacity={0.35} />
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: 22, position: "relative", zIndex: 2 }}>
            <KineticText
              text="Pantheon"
              startFrame={8}
              perChar={2.2}
              style={{ fontFamily: FONT, fontSize: 180, fontWeight: 700, letterSpacing: "-0.045em", color: GOLD, lineHeight: 0.9, textShadow: `0 0 36px ${GOLD}88` }}
              nowFrame={frame}
            />
          </div>

          <p style={{
            fontFamily: FONT, fontSize: 38,
            color: "rgba(245,245,240,0.7)",
            margin: 0,
            letterSpacing: "-0.02em",
            opacity: appear(frame, 30, 22).opacity,
          }}>
            Growth · Case study
          </p>
          <p style={{
            fontFamily: MONO, fontSize: 14,
            color: `${GOLD}BB`,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            marginTop: 22,
            opacity: appear(frame, 44, 22).opacity,
          }}>
            <TypewriterText text="LISBON · PORTUGAL · 2024 → 2026" startFrame={48} charsPerFrame={1} showCaret nowFrame={frame} style={{ fontSize: 14 }} />
          </p>
        </div>
      </Scene>

      <Flash at={26} duration={6} color={GOLD} intensity={0.35} nowFrame={frame} />

      {/* ═══ SCENE 2 · What CEPHALO built (4-12s) ═══ */}
      <Scene opacity={between(frame, S(4), 22, S(12), 22)}>
        <div style={{ width: "100%", maxWidth: 1700 }}>
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <Eyebrow accent={GOLD} show={appear(frame, S(4) + 4, 16).opacity}>What CEPHALO built</Eyebrow>
            <div style={{ marginTop: 14 }}>
              <KineticText
                text="A full stack. Shipped."
                startFrame={S(4) + 10}
                perChar={0.7}
                style={{ fontFamily: FONT, fontSize: 78, fontWeight: 600, color: INK.text, letterSpacing: "-0.035em" }}
                nowFrame={frame}
              />
            </div>
          </div>

          {/* Two-column feature list */}
          <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
            {[
              {
                title: "Sales ecosystem",
                items: ["Custom CRM · 25+ tables", "AI sales automation", "Paid media · Meta & Google", "Email · funnels · CRO"],
                delay: 24,
              },
              {
                title: "AI ecosystem",
                items: ["Pantheon OS · 5 AI agents", "Delivery infrastructure", "N8N / Make pipelines", "Production since 2024"],
                delay: 34,
              },
            ].map((col) => {
              const a = appear(frame, S(4) + col.delay, 26);
              return (
                <div key={col.title} style={{
                  padding: "32px 30px",
                  borderRadius: 18,
                  border: `1px solid ${GOLD}33`,
                  background: `linear-gradient(180deg, ${GOLD}08 0%, rgba(10,10,13,0) 100%)`,
                  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.06)",
                  opacity: a.opacity,
                  transform: `translateY(${a.y}px)`,
                }}>
                  <p style={{
                    fontFamily: MONO, fontSize: 13, color: `${GOLD}CC`,
                    letterSpacing: "0.22em", textTransform: "uppercase",
                    margin: 0, marginBottom: 20,
                  }}>
                    {col.title}
                  </p>
                  {col.items.map((item, j) => {
                    const ia = stagger(frame, S(4) + col.delay + 8, j, 4, 18);
                    return (
                      <div key={item} style={{
                        display: "flex", alignItems: "center", gap: 14,
                        padding: "10px 0",
                        borderBottom: j < col.items.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                        opacity: ia.opacity,
                        transform: `translateX(${(1 - ia.opacity) * -12}px)`,
                      }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: GOLD, boxShadow: `0 0 8px ${GOLD}` }} />
                        <span style={{ fontFamily: FONT, fontSize: 22, color: INK.text, fontWeight: 400 }}>
                          {item}
                        </span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </Scene>

      <Lightbar startFrame={S(7)} tone="gold" y={540} nowFrame={frame} />

      {/* ═══ SCENE 3 · Growth LineGraph (12-18s) ═══ */}
      <Scene opacity={between(frame, S(12), 22, S(18), 22)}>
        <div style={{ width: "100%", textAlign: "center" }}>
          <Eyebrow accent={GOLD} show={appear(frame, S(12) + 4, 16).opacity}>Revenue · 18 months</Eyebrow>
          <div style={{ marginTop: 18, opacity: appear(frame, S(12) + 10, 22).opacity }}>
            <KineticText
              text="Not slides. Receipts."
              startFrame={S(12) + 10}
              perChar={0.7}
              style={{ fontFamily: FONT, fontSize: 80, fontWeight: 600, color: INK.text, letterSpacing: "-0.035em" }}
              nowFrame={frame}
            />
          </div>

          <div style={{ marginTop: 50, display: "flex", justifyContent: "center", gap: 40, alignItems: "flex-start" }}>
            {/* Revenue line */}
            <div style={{ opacity: appear(frame, S(12) + 26, 26).opacity }}>
              <p style={{ fontFamily: MONO, fontSize: 11, color: `${GOLD}99`, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 12, textAlign: "left" }}>
                CUMULATIVE · $
              </p>
              <LineGraph
                points={[10, 22, 38, 55, 74, 96, 122, 158, 205, 255, 310, 370, 400, 418]}
                startFrame={S(12) + 30}
                duration={62}
                tone="gold"
                width={620}
                height={280}
                nowFrame={frame}
              />
            </div>

            {/* ROAS bars */}
            <div style={{ opacity: appear(frame, S(12) + 40, 26).opacity }}>
              <p style={{ fontFamily: MONO, fontSize: 11, color: `${GOLD}99`, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 12, textAlign: "left" }}>
                ROAS · by channel
              </p>
              <BarChart
                data={[
                  { label: "Organic",  value: 18 },
                  { label: "Email",    value: 12 },
                  { label: "Paid · M", value: 4.6 },
                  { label: "Paid · G", value: 5.2 },
                ]}
                startFrame={S(12) + 44}
                tone="gold"
                orientation="horizontal"
                width={500}
                height={260}
                nowFrame={frame}
              />
            </div>
          </div>
        </div>
      </Scene>

      {/* ═══ SCENE 4 · Big-number odometers (18-24s) ═══ */}
      <Scene opacity={between(frame, S(18), 22, S(24), 22)}>
        <div style={{ width: "100%", maxWidth: 1700 }}>
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <Eyebrow accent={GOLD} show={appear(frame, S(18) + 4, 16).opacity}>Production · 18 months</Eyebrow>
            <div style={{ marginTop: 14 }}>
              <KineticText
                text="The receipts."
                startFrame={S(18) + 10}
                perChar={0.8}
                style={{ fontFamily: FONT, fontSize: 78, fontWeight: 600, color: INK.text, letterSpacing: "-0.035em" }}
                nowFrame={frame}
              />
            </div>
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 18, marginTop: 30,
          }}>
            {[
              { from: 0, to: 400, prefix: "$", suffix: "K+", label: "Revenue generated",     at: 22 },
              { from: 0, to: 340, prefix: "",  suffix: "%",  label: "Lead growth · 90 days", at: 30 },
              { from: 0, to: 14,  prefix: "",  suffix: "×",  label: "Long-run ROAS",         at: 38 },
              { from: 0, to: 80,  prefix: "",  suffix: "%",  label: "Manual ops reduced",    at: 46 },
            ].map((n) => {
              const a = appear(frame, S(18) + n.at - 6, 22);
              return (
                <div key={n.label} style={{
                  padding: "44px 20px",
                  borderRadius: 18,
                  border: `1px solid ${GOLD}33`,
                  background: `linear-gradient(180deg, ${GOLD}08 0%, rgba(10,10,13,0) 100%)`,
                  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.06)",
                  textAlign: "center",
                  opacity: a.opacity,
                  transform: `translateY(${a.y}px)`,
                }}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Odometer
                      value={n.to}
                      fromFrame={S(18) + n.at}
                      duration={42}
                      prefix={n.prefix}
                      suffix={n.suffix}
                      size={92}
                      color={GOLD}
                      nowFrame={frame}
                    />
                  </div>
                  <p style={{
                    fontFamily: MONO, fontSize: 11, color: `${GOLD}AA`,
                    marginTop: 18,
                    letterSpacing: "0.2em", textTransform: "uppercase",
                  }}>
                    {n.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Scene>

      <ParticleBurst cx={cx} cy={cy + 50} count={30} maxRadius={520} startFrame={S(22)} duration={40} tone="gold" nowFrame={frame} />

      {/* ═══ SCENE 5 · Same founder · same standard (24-28s) ═══ */}
      <Scene opacity={between(frame, S(24), 22, S(28), 20)}>
        <div style={{ textAlign: "center", maxWidth: 1600 }}>
          <div style={{ opacity: appear(frame, S(24) + 10, 22).opacity }}>
            <KineticText
              text="Same founder."
              startFrame={S(24) + 10}
              perChar={0.8}
              style={{ fontFamily: FONT, fontSize: 128, fontWeight: 700, color: INK.text, letterSpacing: "-0.04em", lineHeight: 1.02 }}
              nowFrame={frame}
            />
            <div style={{ height: 18 }} />
            <KineticText
              text="Same standard."
              startFrame={S(24) + 30}
              perChar={0.8}
              style={{ fontFamily: FONT, fontSize: 128, fontWeight: 700, color: GOLD, letterSpacing: "-0.04em", lineHeight: 1.02, textShadow: `0 0 30px ${GOLD}88` }}
              nowFrame={frame}
            />
          </div>
        </div>
      </Scene>

      <Flash at={S(24) + 28} duration={10} color={GOLD} intensity={0.4} nowFrame={frame} />

      {/* ═══ SCENE 6 · CEPHALO × Pantheon (28-32s) ═══ */}
      <Scene opacity={between(frame, S(28), 18, S(32), 0)}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 50, marginBottom: 28,
            opacity: appear(frame, S(28) + 4, 20).opacity,
          }}>
            <span style={{ fontFamily: FONT, fontSize: 60, fontWeight: 600, color: INK.text, letterSpacing: "-0.03em" }}>CEPHALO</span>
            <span style={{ fontSize: 40, color: `${GOLD}BB` }}>×</span>
            <span style={{ fontFamily: FONT, fontSize: 60, fontWeight: 600, color: GOLD, letterSpacing: "-0.03em", textShadow: `0 0 20px ${GOLD}66` }}>Pantheon</span>
          </div>
          <p style={{
            fontFamily: FONT, fontSize: 40,
            color: "rgba(245,245,240,0.6)",
            margin: 0,
            letterSpacing: "-0.01em",
            opacity: appear(frame, S(28) + 18, 20).opacity,
          }}>
            Infrastructure that compounds.
          </p>
          <p style={{
            fontFamily: MONO, fontSize: 14,
            color: "rgba(245,245,240,0.35)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginTop: 22,
            opacity: appear(frame, S(28) + 32, 20).opacity,
          }}>
            cephalon.ai / partners · 2026
          </p>
        </div>
      </Scene>

      {/* Ambient flying data mid-section */}
      {frame > S(6) && frame < S(24) && (
        <FlyingTokens
          tokens={["$400K+", "14×", "ROAS", "340%", "LEADS", "80%", "4.6×", "OPS", "CRM", "OS", "AGENTS", "LIVE"]}
          startFrame={S(6)}
          tone="gold"
          nowFrame={frame}
        />
      )}

      <Vignette strength={0.88} />
      <Grain opacity={0.04} />
      <Watermark text="CEPHALO × PANTHEON" />
      <FrameLabel text="2026" />
    </AbsoluteFill>
  );
};
