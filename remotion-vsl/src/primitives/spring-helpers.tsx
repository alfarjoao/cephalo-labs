import { spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Returns a spring value [0..1] driven by Remotion frame, starting at startFrame.
 * Defaults match the dplooy 2026 guide: damping:200, stiffness:100, mass:0.5
 * for organic overshoot/bounce on text/element entrances.
 */
export function useSpringIn(opts: {
  startFrame?: number;
  damping?: number;
  stiffness?: number;
  mass?: number;
  durationInFrames?: number;
} = {}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const {
    startFrame = 0,
    damping = 200,
    stiffness = 100,
    mass = 0.5,
    durationInFrames,
  } = opts;
  return spring({
    frame: Math.max(0, frame - startFrame),
    fps,
    config: { damping, stiffness, mass },
    durationInFrames,
  });
}

/**
 * Stronger spring with more overshoot — for hero entries (Linear modal style).
 */
export function useSpringOvershoot(startFrame: number = 0) {
  return useSpringIn({ startFrame, damping: 12, stiffness: 100, mass: 0.5 });
}

/**
 * Tighter spring — settles fast with small overshoot (used for UI clicks).
 */
export function useSpringTight(startFrame: number = 0) {
  return useSpringIn({ startFrame, damping: 30, stiffness: 280, mass: 0.6 });
}

/**
 * Maps a spring [0..1] into a [from, to] range — utility for translate/scale.
 */
export function springTo(t: number, from: number, to: number) {
  return from + (to - from) * t;
}

/**
 * Maps a spring [0..1] into the 3x → 1x scale-entry pattern from
 * the Cinematic Tech Intro template (frames 0-40 pop-in).
 */
export function springScaleEntry(t: number, peak: number = 3) {
  // Eases through peak scale → 1.0
  return peak - (peak - 1) * t;
}
