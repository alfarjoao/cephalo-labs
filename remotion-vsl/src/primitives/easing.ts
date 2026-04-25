import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const EASE = {
  apple: Easing.bezier(0.22, 1, 0.36, 1),
  smooth: Easing.bezier(0.33, 0, 0.17, 1),
  energetic: Easing.bezier(0.68, -0.55, 0.27, 1.55),
  enter: Easing.bezier(0.16, 1, 0.3, 1),
  exit: Easing.bezier(0.7, 0, 0.84, 0),
  power4Out: Easing.bezier(0.23, 1, 0.32, 1),
  expoOut: Easing.bezier(0.19, 1, 0.22, 1),
} as const;

export type EaseName = keyof typeof EASE;

export const SPRINGS = {
  snappy: { damping: 200, mass: 1, stiffness: 220 },
  soft: { damping: 60, mass: 1, stiffness: 80 },
  linear: { damping: 200, mass: 1, stiffness: 100 },
  bouncy: { damping: 12, mass: 0.8, stiffness: 180 },
  hero: { damping: 40, mass: 1, stiffness: 120 },
} as const;

export type SpringName = keyof typeof SPRINGS;

export const springInterp = (
  frame: number,
  fps: number,
  range: [number, number],
  opts?: {
    from?: number;
    delay?: number;
    preset?: SpringName;
    durationInFrames?: number;
  }
) => {
  const progress = spring({
    frame: frame - (opts?.delay ?? 0),
    fps,
    config: SPRINGS[opts?.preset ?? "snappy"],
    durationInFrames: opts?.durationInFrames,
    from: opts?.from ?? 0,
    to: 1,
  });
  return interpolate(progress, [0, 1], range, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

export const useSpringInterp = (
  range: [number, number],
  opts?: Parameters<typeof springInterp>[3]
) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return springInterp(frame, fps, range, opts);
};

export const interpFrames = (
  frame: number,
  frames: [number, number],
  range: [number, number],
  ease: EaseName = "apple"
) =>
  interpolate(frame, frames, range, {
    easing: EASE[ease],
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

export const useInterpFrames = (
  frames: [number, number],
  range: [number, number],
  ease: EaseName = "apple"
) => {
  const frame = useCurrentFrame();
  return interpFrames(frame, frames, range, ease);
};
