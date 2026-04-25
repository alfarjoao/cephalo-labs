/**
 * GenericVSL — data-driven Remotion composition consumed by motion-studio.
 *
 * Receives `CompositionProps` (assembled by motion-studio/src/lib/assemble.ts)
 * via Remotion's --props flag and lays out per-scene visuals, voiceover,
 * music bed, and SFX cues.
 *
 * Visuals: stock/AI image/AI video/composition-only
 * Audio:   single music bed + per-scene voiceover + per-scene SFX cues
 * Captions: optional Remotion-format JSON ({ text, startMs, endMs }[])
 *
 * Asset paths arrive as absolute filesystem paths (e.g. C:/.../voiceover/hero.mp3).
 * They are converted to file:// URLs so Remotion's CLI renderer can read them
 * regardless of cwd.
 */

import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  OffthreadVideo,
  Sequence,
  interpolate,
  useCurrentFrame,
} from "remotion";

// Brand presets
const BRAND = {
  cephalo:           { bg: "#0A0A0A", accent: "#C084FC", text: "#F5F5F0" },
  polypus:           { bg: "#0A0A0A", accent: "#C084FC", text: "#F5F5F0" },
  kernel:            { bg: "#0A0A0A", accent: "#C084FC", text: "#F5F5F0" },
  "pantheon-growth": { bg: "#0A0A0A", accent: "#C084FC", text: "#F5F5F0" },
} as const;

const FONT_DISPLAY =
  "'Geist Sans', 'Geist', -apple-system, BlinkMacSystemFont, sans-serif";

// Mirror of the motion-studio CompositionProps type so this file compiles
// standalone inside the cephalo-labs workspace (no cross-workspace imports).
type SFXResolved = { atFrame: number; path: string; gainDb?: number };
type VisualMode = "stock" | "ai-image" | "ai-video" | "composition-only";
type SceneResolved = {
  id: string;
  startFrame: number;
  durationInFrames: number;
  visualPath?: string;
  visualMode: VisualMode;
  sfx: SFXResolved[];
};
type SceneBrief = {
  id: string;
  label: string;
  durationSec: number;
  script: string;
};
type Brief = {
  title: string;
  slug: string;
  fps: number;
  brand: keyof typeof BRAND;
  music: { gain?: number };
  voice: { gain?: number };
  captions: { enabled: boolean; style: string };
  scenes: SceneBrief[];
};
export type CompositionProps = {
  brief: Brief;
  durationInFrames: number;
  resolvedAssets: {
    voiceoverPath: string;
    musicPath: string;
    captionsPath?: string;
    scenes: SceneResolved[];
    /** Optional per-scene VO map for full-pipeline mode. */
    voiceoverByScene?: Record<string, string>;
  };
};

// Convert absolute fs path → file:// URL Remotion can fetch.
const toUrl = (p: string): string => {
  if (!p) return p;
  if (/^https?:\/\//.test(p) || p.startsWith("file://")) return p;
  const norm = p.replace(/\\/g, "/");
  // Windows: C:/foo → file:///C:/foo
  return /^[A-Za-z]:\//.test(norm) ? `file:///${norm}` : `file://${norm}`;
};

const dbToVolume = (db?: number) =>
  db === undefined ? 1 : Math.max(0, Math.min(1, Math.pow(10, db / 20)));

// ─── Title overlay (used on every scene) ──────────────────────────────
const SceneTitle: React.FC<{ label: string; script: string; accent: string; text: string }> = ({
  label,
  script,
  accent,
  text,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, 60, 90], [0, 1, 1, 0.85], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const y = interpolate(frame, [0, 24], [16, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        padding: "0 96px 96px 96px",
        pointerEvents: "none",
      }}
    >
      <div style={{ opacity, transform: `translateY(${y}px)`, maxWidth: 1280 }}>
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 14,
            letterSpacing: "0.2em",
            color: accent,
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 56,
            lineHeight: 1.1,
            fontWeight: 500,
            color: text,
            textShadow: "0 2px 24px rgba(0,0,0,0.7)",
          }}
        >
          {script}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Per-scene visual ────────────────────────────────────────────────
const SceneVisual: React.FC<{
  visualPath?: string;
  visualMode: VisualMode;
  durationInFrames: number;
  bg: string;
  accent: string;
}> = ({ visualPath, visualMode, durationInFrames, bg, accent }) => {
  const frame = useCurrentFrame();
  // Slow Ken-Burns zoom for stills.
  const scale = interpolate(frame, [0, durationInFrames], [1.0, 1.06], {
    extrapolateRight: "clamp",
  });

  if (!visualPath || visualMode === "composition-only") {
    // Procedural fallback — radial gradient on brand bg.
    const pulse = interpolate(frame % 90, [0, 45, 90], [0.6, 1, 0.6]);
    return (
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 50%, ${accent}22 0%, ${bg} 60%, ${bg} 100%)`,
          opacity: pulse,
        }}
      />
    );
  }

  const url = toUrl(visualPath);

  if (visualMode === "ai-video" || (visualMode === "stock")) {
    // Stock & AI-video both arrive as .mp4
    return (
      <AbsoluteFill style={{ background: bg }}>
        <OffthreadVideo
          src={url}
          muted
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${scale})`,
          }}
        />
        <AbsoluteFill
          style={{
            background:
              "radial-gradient(circle at 50% 60%, rgba(10,10,10,0.0) 0%, rgba(10,10,10,0.55) 70%, rgba(10,10,10,0.85) 100%)",
          }}
        />
      </AbsoluteFill>
    );
  }

  // ai-image
  return (
    <AbsoluteFill style={{ background: bg }}>
      <Img
        src={url}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale})`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 60%, rgba(10,10,10,0.0) 0%, rgba(10,10,10,0.5) 70%, rgba(10,10,10,0.8) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

// ─── Single scene block ──────────────────────────────────────────────
const SceneBlock: React.FC<{
  scene: SceneResolved;
  brief: SceneBrief;
  voPath?: string;
  voGain: number;
  bg: string;
  accent: string;
  text: string;
}> = ({ scene, brief, voPath, voGain, bg, accent, text }) => {
  return (
    <AbsoluteFill style={{ background: bg }}>
      <SceneVisual
        visualPath={scene.visualPath}
        visualMode={scene.visualMode}
        durationInFrames={scene.durationInFrames}
        bg={bg}
        accent={accent}
      />
      <SceneTitle label={brief.label} script={brief.script} accent={accent} text={text} />
      {voPath ? <Audio src={toUrl(voPath)} volume={voGain} /> : null}
      {scene.sfx.map((cue, i) => (
        <Sequence
          key={`sfx-${scene.id}-${i}`}
          from={Math.max(0, cue.atFrame - scene.startFrame)}
        >
          <Audio src={toUrl(cue.path)} volume={dbToVolume(cue.gainDb)} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

// ─── Top-level composition ───────────────────────────────────────────
export const GenericVSL: React.FC<CompositionProps> = (props) => {
  const { brief, resolvedAssets } = props;
  const palette = BRAND[brief.brand] ?? BRAND.cephalo;
  const musicGain = brief.music.gain ?? 0.35;
  const voGain = brief.voice.gain ?? 1.0;

  return (
    <AbsoluteFill style={{ background: palette.bg }}>
      {/* Music bed — one shared track. */}
      {resolvedAssets.musicPath ? (
        <Audio src={toUrl(resolvedAssets.musicPath)} volume={musicGain} />
      ) : null}

      {/* Per-scene blocks. */}
      {resolvedAssets.scenes.map((scene) => {
        const sceneBrief = brief.scenes.find((s) => s.id === scene.id);
        if (!sceneBrief) return null;
        const voPath =
          resolvedAssets.voiceoverByScene?.[scene.id] ??
          (scene.id === brief.scenes[0].id ? resolvedAssets.voiceoverPath : undefined);

        return (
          <Sequence
            key={scene.id}
            from={scene.startFrame}
            durationInFrames={scene.durationInFrames}
            name={`scene:${scene.id}`}
          >
            <SceneBlock
              scene={scene}
              brief={sceneBrief}
              voPath={voPath}
              voGain={voGain}
              bg={palette.bg}
              accent={palette.accent}
              text={palette.text}
            />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

// Default duration for cases where Remotion needs a fallback when launched
// without --props. Real renders use props.durationInFrames.
export const GENERIC_VSL_FALLBACK_DURATION = 900; // 30s @ 30fps
