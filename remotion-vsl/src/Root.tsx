import React from "react";
import { Composition, type CalculateMetadataFunction } from "remotion";
import { HomeVSL } from "./compositions/HomeVSL";
import { PolypusVSL } from "./compositions/PolypusVSL";
import { PantheonCase } from "./compositions/PantheonCase";
import { CephaloLabs as CephaloLabsV2 } from "./compositions/v2/CephaloLabs";
import { Kernel as KernelV2 } from "./compositions/v2/Kernel";
import { Polypus as PolypusV2 } from "./compositions/v2/Polypus";
import { PantheonGrowth as PantheonGrowthV2 } from "./compositions/v2/PantheonGrowth";
import { Showcase, SHOWCASE_DURATION } from "./compositions/v3/Showcase";
import { CephaloLabs as CephaloLabsV4, CEPHALO_LABS_DURATION } from "./compositions/v4/CephaloLabs";
import { Polypus as PolypusV4, POLYPUS_DURATION } from "./compositions/v4/Polypus";
import { Kernel as KernelV4, KERNEL_DURATION } from "./compositions/v4/Kernel";
import { PantheonGrowth as PantheonGrowthV4, PANTHEON_GROWTH_DURATION } from "./compositions/v4/PantheonGrowth";
import {
  GenericVSL,
  GENERIC_VSL_FALLBACK_DURATION,
  type CompositionProps as GenericVSLProps,
} from "./compositions/studio/GenericVSL";

const W = 1920;
const H = 1080;
const FPS = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* v1 — kept for historical reference */}
      <Composition
        id="HomeVSL"
        component={HomeVSL}
        durationInFrames={1260}
        fps={FPS}
        width={W}
        height={H}
      />
      <Composition
        id="PolypusVSL"
        component={PolypusVSL}
        durationInFrames={1680}
        fps={FPS}
        width={W}
        height={H}
      />
      <Composition
        id="PantheonCase"
        component={PantheonCase}
        durationInFrames={960}
        fps={FPS}
        width={W}
        height={H}
      />

      {/* v2 — executable briefs (vsl-briefs/) */}
      <Composition
        id="CephaloLabs-v2"
        component={CephaloLabsV2}
        durationInFrames={1200}
        fps={FPS}
        width={W}
        height={H}
      />
      <Composition
        id="Kernel-v2"
        component={KernelV2}
        durationInFrames={1050}
        fps={FPS}
        width={W}
        height={H}
      />
      <Composition
        id="Polypus-v2"
        component={PolypusV2}
        durationInFrames={1650}
        fps={FPS}
        width={W}
        height={H}
      />
      <Composition
        id="PantheonGrowth-v2"
        component={PantheonGrowthV2}
        durationInFrames={1500}
        fps={FPS}
        width={W}
        height={H}
      />

      {/* v4 — production-grade compositions per vsl-briefs/, Showcase-v3 quality bar */}
      <Composition
        id="CephaloLabs-v4"
        component={CephaloLabsV4}
        durationInFrames={CEPHALO_LABS_DURATION}
        fps={FPS}
        width={W}
        height={H}
      />
      <Composition
        id="Polypus-v4"
        component={PolypusV4}
        durationInFrames={POLYPUS_DURATION}
        fps={FPS}
        width={W}
        height={H}
      />
      <Composition
        id="Kernel-v4"
        component={KernelV4}
        durationInFrames={KERNEL_DURATION}
        fps={FPS}
        width={W}
        height={H}
      />
      <Composition
        id="PantheonGrowth-v4"
        component={PantheonGrowthV4}
        durationInFrames={PANTHEON_GROWTH_DURATION}
        fps={FPS}
        width={W}
        height={H}
      />

      {/* v3 — S-tier showcase using new primitives stack */}
      <Composition
        id="Showcase-v3"
        component={Showcase}
        durationInFrames={SHOWCASE_DURATION}
        fps={FPS}
        width={W}
        height={H}
      />

      {/* studio — data-driven, props from motion-studio assemble pipeline */}
      <Composition
        id="GenericVSL"
        component={GenericVSL}
        durationInFrames={GENERIC_VSL_FALLBACK_DURATION}
        fps={FPS}
        width={W}
        height={H}
        defaultProps={genericVslDefaultProps}
        calculateMetadata={genericVslMetadata}
      />
    </>
  );
};

// Picks duration & fps from the assembled props at render time.
const genericVslMetadata: CalculateMetadataFunction<GenericVSLProps> = ({ props }) => ({
  durationInFrames: props.durationInFrames || GENERIC_VSL_FALLBACK_DURATION,
  fps: props.brief?.fps || FPS,
  props,
});

// Minimal default so Remotion Studio can preview without props.
const genericVslDefaultProps: GenericVSLProps = {
  brief: {
    title: "GenericVSL preview",
    slug: "preview",
    fps: FPS,
    brand: "cephalo",
    music: { gain: 0.35 },
    voice: { gain: 1 },
    captions: { enabled: false, style: "none" },
    scenes: [
      {
        id: "preview",
        label: "preview",
        durationSec: GENERIC_VSL_FALLBACK_DURATION / FPS,
        script: "Pass --props=<assembled.json> to render real content.",
      },
    ],
  },
  durationInFrames: GENERIC_VSL_FALLBACK_DURATION,
  resolvedAssets: {
    voiceoverPath: "",
    musicPath: "",
    scenes: [
      {
        id: "preview",
        startFrame: 0,
        durationInFrames: GENERIC_VSL_FALLBACK_DURATION,
        visualMode: "composition-only",
        sfx: [],
      },
    ],
  },
};
