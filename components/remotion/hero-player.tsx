"use client";

import { Player } from "@remotion/player";
import { AITransformComposition } from "./ai-transform";

export function HeroPlayer() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 480,
        aspectRatio: "480 / 440",
      }}
    >
      <Player
        component={AITransformComposition}
        compositionWidth={480}
        compositionHeight={440}
        durationInFrames={240}
        fps={30}
        loop
        autoPlay
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
        }}
        controls={false}
        showVolumeControls={false}
        clickToPlay={false}
      />
    </div>
  );
}
