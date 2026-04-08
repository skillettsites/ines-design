"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const HeroPlayer = dynamic(
  () => import("./remotion/hero-player").then((m) => m.HeroPlayer),
  { ssr: false }
);

export function HeroAnimation() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Skeleton placeholder matching the player dimensions
    return (
      <div
        className="w-full max-w-[480px] aspect-[480/440] rounded-2xl animate-pulse"
        style={{ background: "rgba(74,58,255,0.03)" }}
      />
    );
  }

  return <HeroPlayer />;
}
