import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { gsap } from "gsap";

type StaggerOpts = {
  each: number;
  from?: "start" | "center" | "end";
};

export const tweenAt = (
  frame: number,
  fps: number,
  opts: {
    startFrame: number;
    durationInFrames: number;
    ease?: string;
    from: number;
    to: number;
  }
) => {
  const { startFrame, durationInFrames, ease = "power3.out", from, to } = opts;
  if (frame < startFrame) return from;
  if (frame >= startFrame + durationInFrames) return to;
  const t = (frame - startFrame) / durationInFrames;
  const fn = gsap.parseEase(ease);
  return from + (to - from) * fn(t);
};

export const useTween = (opts: {
  startFrame: number;
  durationInFrames: number;
  ease?: string;
  from: number;
  to: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return tweenAt(frame, fps, opts);
};

type SplitKineticProps = {
  text: string;
  startFrame: number;
  perWordFrames?: number;
  gapFrames?: number;
  ease?: string;
  className?: string;
  style?: React.CSSProperties;
  as?: "div" | "h1" | "h2" | "p" | "span";
  from?: "start" | "center" | "end";
};

export const SplitKinetic: React.FC<SplitKineticProps> = ({
  text,
  startFrame,
  perWordFrames = 14,
  gapFrames = 3,
  ease = "power4.out",
  className,
  style,
  as: Tag = "h1",
  from = "start",
}) => {
  const frame = useCurrentFrame();
  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);

  const ordered = useMemo(() => {
    if (from === "start") return words.map((_, i) => i);
    if (from === "end") return words.map((_, i) => words.length - 1 - i);
    const mid = (words.length - 1) / 2;
    return words
      .map((_, i) => ({ i, d: Math.abs(i - mid) }))
      .sort((a, b) => a.d - b.d)
      .map((x) => x.i);
  }, [words, from]);

  const indexOrder = useMemo(() => {
    const pos = new Array(words.length).fill(0);
    ordered.forEach((srcIdx, order) => (pos[srcIdx] = order));
    return pos;
  }, [ordered, words.length]);

  return (
    <Tag className={className} style={{ display: "inline-block", ...style }}>
      {words.map((w, idx) => {
        const order = indexOrder[idx];
        const wordStart = startFrame + order * gapFrames;
        const y = tweenAt(frame, 30, {
          startFrame: wordStart,
          durationInFrames: perWordFrames,
          ease,
          from: 48,
          to: 0,
        });
        const opacity = tweenAt(frame, 30, {
          startFrame: wordStart,
          durationInFrames: Math.round(perWordFrames * 0.8),
          ease: "power2.out",
          from: 0,
          to: 1,
        });
        return (
          <span
            key={idx}
            style={{
              display: "inline-block",
              marginRight: "0.28em",
              transform: `translate3d(0, ${y}px, 0)`,
              opacity,
              willChange: "transform, opacity",
            }}
          >
            {w}
          </span>
        );
      })}
    </Tag>
  );
};

export const CharKinetic: React.FC<{
  text: string;
  startFrame: number;
  perCharFrames?: number;
  gapFrames?: number;
  ease?: string;
  className?: string;
  style?: React.CSSProperties;
}> = ({
  text,
  startFrame,
  perCharFrames = 10,
  gapFrames = 1.2,
  ease = "power3.out",
  className,
  style,
}) => {
  const frame = useCurrentFrame();
  const chars = Array.from(text);
  return (
    <span className={className} style={{ display: "inline-block", ...style }}>
      {chars.map((c, i) => {
        const start = startFrame + i * gapFrames;
        const y = tweenAt(frame, 30, {
          startFrame: start,
          durationInFrames: perCharFrames,
          ease,
          from: 18,
          to: 0,
        });
        const opacity = tweenAt(frame, 30, {
          startFrame: start,
          durationInFrames: perCharFrames,
          ease: "power2.out",
          from: 0,
          to: 1,
        });
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              transform: `translate3d(0, ${y}px, 0)`,
              opacity,
              whiteSpace: c === " " ? "pre" : "normal",
            }}
          >
            {c}
          </span>
        );
      })}
    </span>
  );
};
