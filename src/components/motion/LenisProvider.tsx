"use client";

import { type ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { gsap, ScrollTrigger } from "@/components/motion/gsap";
import { useIsomorphicLayoutEffect } from "@/components/motion/use-isomorphic-layout-effect";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { useIsCoarsePointer } from "@/components/motion/use-media-query";
import { useIsClient } from "@/components/motion/use-is-client";
import { registerLenis } from "@/lib/lenis-instance";

/**
 * LenisProvider — Lenis is the SINGLE smooth-scroll authority (06-motion).
 * It drives GSAP's ticker (one RAF loop, no competing smooth-scroll), and every
 * Lenis scroll triggers ScrollTrigger.update() so scrubbed timelines stay in sync.
 *
 * Touch devices (coarse pointer): native scroll only — Lenis fights finger scroll
 * and adds scrub lag on 4GB phones. ScrollTrigger stays in sync via a passive
 * scroll listener instead.
 *
 * Reduced motion / SSR: render native scroll (no Lenis) — the page stays fully
 * usable, and scrubbed storytelling is disabled elsewhere.
 */

function LenisGsapBridge() {
  const lenis = useLenis(() => {
    ScrollTrigger.update();
  });

  useIsomorphicLayoutEffect(() => {
    if (!lenis) return;
    registerLenis(lenis);
    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    return () => {
      gsap.ticker.remove(raf);
      registerLenis(null);
    };
  }, [lenis]);

  useIsomorphicLayoutEffect(() => {
    if (typeof document === "undefined" || !("fonts" in document)) return;
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}

/** Keeps ScrollTrigger aligned with native touch scroll (no Lenis). */
function NativeScrollGsapBridge() {
  useIsomorphicLayoutEffect(() => {
    const onScroll = () => {
      ScrollTrigger.update();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (typeof document === "undefined" || !("fonts" in document)) return;
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const coarsePointer = useIsCoarsePointer();
  const isClient = useIsClient();

  if (!isClient || reduced) {
    return <>{children}</>;
  }

  if (coarsePointer) {
    return (
      <>
        <NativeScrollGsapBridge />
        {children}
      </>
    );
  }

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        syncTouch: true,
        touchMultiplier: 1.25,
      }}
    >
      <LenisGsapBridge />
      {children}
    </ReactLenis>
  );
}
