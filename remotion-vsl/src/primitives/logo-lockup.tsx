import React from "react";
import { Img, staticFile, useCurrentFrame, interpolate, Easing } from "remotion";

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

export type Brand = "cephalo" | "cephalo-writing" | "polypus" | "kernel" | "pantheon" | "sovereign" | "axiom" | "titan";

const LOGO_SRC: Record<Brand, string> = {
  cephalo: "logos/cephalo-mark.png",
  "cephalo-writing": "logos/cephalo-writing.png",
  polypus: "logos/polypus-mark.svg",
  kernel: "logos/kernel-mark.svg",
  pantheon: "logos/pantheon-growth.png",
  sovereign: "logos/sovereign-mark.png",
  axiom: "logos/axiom-mark.svg",
  titan: "logos/titan-ai-mark.svg",
};

/**
 * Persistent corner watermark — subtle, always-on, brand presence.
 * Defaults to top-right, opacity 0.55, size 36px. Fades in from frame 0.
 */
export const LogoWatermark: React.FC<{
  brand: Brand;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  size?: number;
  opacity?: number;
  fadeInDuration?: number;
  withLabel?: string; // optional small label next to the mark
}> = ({
  brand,
  position = "top-right",
  size = 36,
  opacity = 0.55,
  fadeInDuration = 18,
  withLabel,
}) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [0, fadeInDuration], [0, opacity], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

  const pos: React.CSSProperties = {
    position: "absolute",
    ...(position.includes("top") ? { top: 36 } : { bottom: 36 }),
    ...(position.includes("right") ? { right: 36 } : { left: 36 }),
    display: "flex",
    alignItems: "center",
    gap: 10,
    opacity: op,
    zIndex: 50,
    pointerEvents: "none",
  };

  return (
    <div style={pos}>
      <Img
        src={staticFile(LOGO_SRC[brand])}
        style={{
          width: size,
          height: size,
          objectFit: "contain",
          filter: "drop-shadow(0 0 12px rgba(0,0,0,0.4))",
        }}
      />
      {withLabel ? (
        <span
          style={{
            fontFamily: "'Geist Mono', 'JetBrains Mono', ui-monospace, monospace",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(245,245,240,0.72)",
          }}
        >
          {withLabel}
        </span>
      ) : null}
    </div>
  );
};

/**
 * Hero lockup — large, centered logo with optional kicker line. Used in
 * opening or closing wordmark scenes. Animates in with scale + opacity.
 */
export const LogoLockup: React.FC<{
  brand: Brand;
  size?: number;
  show?: number; // 0..1
  kicker?: string;
  align?: "center" | "left";
  tint?: string; // optional CSS filter color tint
}> = ({ brand, size = 200, show = 1, kicker, align = "center", tint }) => {
  const scale = 0.94 + 0.06 * show;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: align === "center" ? "center" : "flex-start",
        gap: 18,
        opacity: show,
        transform: `scale(${scale})`,
      }}
    >
      <Img
        src={staticFile(LOGO_SRC[brand])}
        style={{
          width: size,
          height: size,
          objectFit: "contain",
          filter: tint ? `drop-shadow(0 0 24px ${tint})` : "drop-shadow(0 0 24px rgba(192,132,252,0.25))",
        }}
      />
      {kicker ? (
        <span
          style={{
            fontFamily: "'Geist Mono', 'JetBrains Mono', ui-monospace, monospace",
            fontSize: 13,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(245,245,240,0.6)",
          }}
        >
          {kicker}
        </span>
      ) : null}
    </div>
  );
};

/**
 * Corner sigil — minimal mark only, no label, very subtle. For use in
 * dense scenes where a watermark would distract.
 */
export const LogoSigil: React.FC<{
  brand: Brand;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  size?: number;
  opacity?: number;
}> = ({ brand, position = "bottom-right", size = 24, opacity = 0.4 }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [0, 24], [0, opacity], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const pos: React.CSSProperties = {
    position: "absolute",
    ...(position.includes("top") ? { top: 24 } : { bottom: 24 }),
    ...(position.includes("right") ? { right: 24 } : { left: 24 }),
    opacity: op,
    zIndex: 50,
    pointerEvents: "none",
  };
  return (
    <div style={pos}>
      <Img
        src={staticFile(LOGO_SRC[brand])}
        style={{ width: size, height: size, objectFit: "contain" }}
      />
    </div>
  );
};
