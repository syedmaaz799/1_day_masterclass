"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { AtmosphericOverlay } from "@/components/background/AtmosphericOverlay";
import { StaticSiteBackground } from "@/components/background/StaticSiteBackground";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";

const NeuralNetworkCanvas = dynamic(
  () => import("@/components/three/neural-network-canvas").then((m) => m.NeuralNetworkCanvas),
  { ssr: false },
);

function canUseWebGL(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const c = document.createElement("canvas");
    return c.getContext("webgl2") != null || c.getContext("webgl") != null;
  } catch {
    return false;
  }
}

export function SiteBackground() {
  const reducedMotion = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);
  const [webgl, setWebgl] = useState(false);
  const [density, setDensity] = useState(60);

  useEffect(() => {
    setReady(true);
    setWebgl(!reducedMotion && canUseWebGL());
    setDensity(window.innerWidth < 768 ? 42 : 65);
  }, [reducedMotion]);

  if (!ready) {
    return (
      <div className="absolute inset-0 min-h-screen">
        <StaticSiteBackground />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 min-h-screen">
      <StaticSiteBackground />
      {webgl ? (
        <NeuralNetworkCanvas
          density={density}
          className="absolute inset-0 min-h-screen"
        />
      ) : null}
      <AtmosphericOverlay />
    </div>
  );
}
