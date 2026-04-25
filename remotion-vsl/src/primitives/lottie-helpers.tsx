import React from "react";
import { Lottie, LottieAnimationData } from "@remotion/lottie";
import { staticFile, useCurrentFrame, useVideoConfig } from "remotion";

type LottieSceneProps = {
  src: string | LottieAnimationData;
  startFrame?: number;
  loop?: boolean;
  playbackRate?: number;
  style?: React.CSSProperties;
  className?: string;
  width?: number | string;
  height?: number | string;
  opacity?: number;
};

const isUrl = (v: unknown): v is string => typeof v === "string";

export const LottieScene: React.FC<LottieSceneProps> = ({
  src,
  startFrame = 0,
  loop = false,
  playbackRate = 1,
  style,
  className,
  width = "100%",
  height = "100%",
  opacity = 1,
}) => {
  const frame = useCurrentFrame();
  const [data, setData] = React.useState<LottieAnimationData | null>(
    isUrl(src) ? null : (src as LottieAnimationData)
  );

  React.useEffect(() => {
    if (!isUrl(src)) return;
    const url = src.startsWith("http") || src.startsWith("/") ? src : staticFile(src);
    fetch(url)
      .then((r) => r.json())
      .then((j: LottieAnimationData) => setData(j))
      .catch((e) => console.warn("[LottieScene] failed to load", src, e));
  }, [src]);

  if (frame < startFrame) return null;
  if (!data) return null;

  return (
    <div
      className={className}
      style={{
        width,
        height,
        opacity,
        ...style,
      }}
    >
      <Lottie
        animationData={data}
        loop={loop}
        playbackRate={playbackRate}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export const LottieOverlay: React.FC<
  Omit<LottieSceneProps, "width" | "height"> & {
    position?: "center" | "top-left" | "bottom-right" | "fill";
    size?: number | string;
  }
> = ({ position = "fill", size = "100%", ...rest }) => {
  const pos: React.CSSProperties =
    position === "fill"
      ? { position: "absolute", inset: 0 }
      : position === "center"
      ? {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }
      : position === "top-left"
      ? { position: "absolute", top: 40, left: 40 }
      : { position: "absolute", bottom: 40, right: 40 };
  return <LottieScene {...rest} width={size} height={size} style={pos} />;
};
