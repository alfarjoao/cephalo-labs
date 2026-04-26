import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { useSpringIn, springTo } from "./spring-helpers";

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
const TEXT = "#F5F5F0";

/**
 * Glassmorphism panel with cut-corner clip-path (B&W). Slides in from
 * a configurable origin, frosted background, hairline border. Used for
 * data callouts in S5 (Pantheon HUD) and S6 (Kernel −85% callout).
 */
export const GlassPanel: React.FC<{
  startFrame?: number;
  width?: number;
  height?: number;
  slideFrom?: "left" | "right" | "top" | "bottom";
  cornerSize?: number;
  bgOpacity?: number;
  borderOpacity?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({
  startFrame = 0,
  width = 480,
  height = 240,
  slideFrom = "left",
  cornerSize = 18,
  bgOpacity = 0.04,
  borderOpacity = 0.18,
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  const t = useSpringIn({ startFrame, damping: 18, stiffness: 120, mass: 0.7 });
  const slideDistance = 600;
  const tx =
    slideFrom === "left" ? springTo(t, -slideDistance, 0) :
    slideFrom === "right" ? springTo(t, slideDistance, 0) :
    0;
  const ty =
    slideFrom === "top" ? springTo(t, -slideDistance, 0) :
    slideFrom === "bottom" ? springTo(t, slideDistance, 0) :
    0;
  const opacity = interpolate(frame, [startFrame, startFrame + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

  // Cut-corner clip-path (top-right + bottom-left chamfer)
  const c = cornerSize;
  const clipPath = `polygon(${c}px 0, 100% 0, 100% calc(100% - ${c}px), calc(100% - ${c}px) 100%, 0 100%, 0 ${c}px)`;

  return (
    <div
      style={{
        width,
        height,
        position: "relative",
        opacity,
        transform: `translate3d(${tx}px, ${ty}px, 0)`,
        ...style,
      }}
    >
      {/* Border layer (slightly larger via outline-style) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: TEXT,
          opacity: borderOpacity,
          clipPath,
        }}
      />
      {/* Inner content layer with frosted bg */}
      <div
        style={{
          position: "absolute",
          inset: 1,
          background: `rgba(245,245,240,${bgOpacity})`,
          backdropFilter: "blur(6px)",
          clipPath,
          padding: 24,
          color: TEXT,
        }}
      >
        {children}
      </div>
    </div>
  );
};

/**
 * Inline cut-corner badge — for small accents (e.g., "−85% · COST").
 */
export const GlassBadge: React.FC<{
  startFrame?: number;
  children: React.ReactNode;
}> = ({ startFrame = 0, children }) => {
  const frame = useCurrentFrame();
  const t = useSpringIn({ startFrame, damping: 22, stiffness: 220, mass: 0.5 });
  const opacity = interpolate(frame, [startFrame, startFrame + 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const c = 8;
  const clipPath = `polygon(${c}px 0, 100% 0, 100% calc(100% - ${c}px), calc(100% - ${c}px) 100%, 0 100%, 0 ${c}px)`;
  return (
    <span
      style={{
        display: "inline-block",
        padding: "8px 18px",
        background: "rgba(245,245,240,0.06)",
        border: "1px solid rgba(245,245,240,0.25)",
        clipPath,
        opacity,
        transform: `scale(${0.9 + 0.1 * t})`,
        color: TEXT,
        fontFamily: "'Geist Mono', ui-monospace, monospace",
        fontSize: 14,
        letterSpacing: "0.32em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
};
