"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  type ReactNode,
} from "react";
import { gsap } from "@/components/motion/gsap";
import { useIsomorphicLayoutEffect } from "@/components/motion/use-isomorphic-layout-effect";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * ScrollStory — the scroll storytelling framework (Apple/Stripe/Linear feel, not a
 * slideshow). A tall track pins one viewport and scrubs progress 0..1 across it.
 *
 * Premium transition model (refined):
 * - SMOOTHED scrub: progress is eased toward the scroll position (scrub: SCRUB s) via
 *   a proxy tween, so motion is deliberate and decoupled from raw scroll velocity.
 * - HOLD + OVERLAP crossfade: each stage holds at full opacity within a plateau, then
 *   fades over an eased (smoothstep) window that OVERLAPS the neighbour — incoming
 *   appears before outgoing is gone. Stages also translate on Y so they never occupy
 *   the same spot at the crossover (no muddy double-exposure / ghosting).
 * - Continuous content: custom layers can subscribe to the smoothed progress
 *   (useStoryProgress) to drive their own progressive transforms — one connected system.
 *
 * Performance: one ScrollTrigger; opacities/transforms set imperatively (no per-frame
 * React renders); CSS sticky pinning. Reduced motion: stacked vertical layout, no scrub.
 */

const SCRUB = 1; // seconds of eased catch-up — deliberate, never snappy
const HOLD = 0.22; // ± plateau (in stage-index units) where a stage stays fully visible
const FADE = 0.62; // eased fade span after the plateau (creates the overlap window)
const SHIFT = 40; // px translateY for spatial continuity through the crossover

function smoothstep(x: number): number {
  const c = Math.min(1, Math.max(0, x));
  return c * c * (3 - 2 * c);
}

type ProgressListener = (progress: number) => void;

interface StoryContextValue {
  register: (index: number, el: HTMLElement) => () => void;
  subscribe: (listener: ProgressListener) => () => void;
  reduced: boolean;
}

const StoryContext = createContext<StoryContextValue | null>(null);

function useStoryContext(): StoryContextValue {
  const ctx = useContext(StoryContext);
  if (!ctx) throw new Error("StoryStage/useStoryProgress must be used within <ScrollStory>.");
  return ctx;
}

/**
 * Subscribe to the story's SMOOTHED progress (0..1). The callback runs imperatively on
 * each scrub tick (and once immediately) — mutate DOM via refs, never setState per frame.
 * Returns whether reduced motion is active so callers can render a static fallback.
 */
export function useStoryProgress(onProgress: ProgressListener): boolean {
  const ctx = useStoryContext();
  const cbRef = useRef(onProgress);

  useIsomorphicLayoutEffect(() => {
    cbRef.current = onProgress;
  });

  useIsomorphicLayoutEffect(() => {
    return ctx.subscribe((p) => cbRef.current(p));
  }, [ctx]);

  return ctx.reduced;
}

type ScrollStoryProps = {
  /** Stage count for StoryStage crossfades (and the default pin length). */
  stageCount: number;
  /**
   * Scroll distance PER stage, in svh (default 100). Lower it to tighten pacing and
   * avoid scroll fatigue / excessive pinning without changing the number of beats.
   */
  stageVh?: number;
  /** Optional marker for imperative scroll targets (e.g. Watch Demo). */
  scrollStoryTrack?: string;
  className?: string;
  children: ReactNode;
};

export function ScrollStory({
  stageCount,
  stageVh = 100,
  scrollStoryTrack,
  className,
  children,
}: ScrollStoryProps) {
  const reduced = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const stagesRef = useRef<Map<number, HTMLElement>>(new Map());
  const listenersRef = useRef<Set<ProgressListener>>(new Set());
  const lastProgressRef = useRef(0);

  const register = useCallback((index: number, el: HTMLElement) => {
    stagesRef.current.set(index, el);
    return () => {
      stagesRef.current.delete(index);
    };
  }, []);

  const subscribe = useCallback((listener: ProgressListener) => {
    listenersRef.current.add(listener);
    listener(lastProgressRef.current); // sync initial state
    return () => {
      listenersRef.current.delete(listener);
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    const track = trackRef.current;
    const stages = stagesRef.current;
    const listeners = listenersRef.current;

    // Reduced motion: everything visible, no scrub, no pin, no transforms.
    if (reduced || !track) {
      stages.forEach((el) => gsap.set(el, { opacity: 1, clearProps: "transform" }));
      lastProgressRef.current = 0;
      listeners.forEach((l) => l(0));
      return;
    }

    const span = Math.max(1, stageCount - 1);

    const apply = (p: number) => {
      lastProgressRef.current = p;
      const active = p * span;
      stages.forEach((el, index) => {
        const d = active - index; // signed distance in stage units
        const ad = Math.abs(d);
        const opacity = 1 - smoothstep((ad - HOLD) / FADE);
        gsap.set(el, {
          opacity,
          // Ahead (d<0) waits below; passed (d>0) drifts above → content rises through.
          y: -d * SHIFT,
          scale: 1 - Math.min(ad, 1) * 0.02,
          pointerEvents: opacity > 0.55 ? "auto" : "none",
        });
      });
      listeners.forEach((l) => l(p));
    };

    const ctx = gsap.context(() => {
      const proxy = { value: 0 };
      apply(0);
      gsap.to(proxy, {
        value: 1,
        ease: "none",
        scrollTrigger: {
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          scrub: SCRUB,
        },
        onUpdate: () => apply(proxy.value),
      });

      // Entry gate: keep the pinned content hidden until the story actually OWNS the
      // screen (start: "top top" = the previous section has fully scrolled off), then
      // fade + rise it in. Prevents the incoming headline from colliding with the
      // outgoing hero/section during the hand-off frame.
      const sticky = stickyRef.current;
      if (sticky) {
        gsap.fromTo(
          sticky,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            ease: "power1.out",
            scrollTrigger: {
              trigger: track,
              start: "top top",
              end: () => "+=" + window.innerHeight * 0.4,
              scrub: true,
            },
          },
        );
      }
    }, trackRef);

    return () => ctx.revert();
  }, [reduced, stageCount]);

  if (reduced) {
    return (
      <StoryContext.Provider value={{ register, subscribe, reduced }}>
        <div className={className}>{children}</div>
      </StoryContext.Provider>
    );
  }

  return (
    <StoryContext.Provider value={{ register, subscribe, reduced }}>
      <div
        ref={trackRef}
        className={cn("relative", className)}
        style={{ height: `${stageCount * stageVh}svh` }}
        {...(scrollStoryTrack
          ? { "data-scroll-story-track": scrollStoryTrack }
          : {})}
      >
        <div ref={stickyRef} className="sticky top-0 h-[100svh] overflow-hidden">
          {children}
        </div>
      </div>
    </StoryContext.Provider>
  );
}

type StoryStageProps = {
  index: number;
  className?: string;
  children?: ReactNode;
};

/**
 * StoryStage — one beat of the story. Stacked + crossfaded (hold → overlap → hold)
 * while pinned, or a normal full-height block under reduced motion.
 */
export function StoryStage({ index, className, children }: StoryStageProps) {
  const { register, reduced } = useStoryContext();
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    return register(index, el);
  }, [register, index]);

  if (reduced) {
    return (
      <div ref={ref} className={cn("flex min-h-[100svh] items-center", className)}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn("absolute inset-0 flex items-center will-change-[transform,opacity]", className)}
      style={{ opacity: 0 }}
    >
      {children}
    </div>
  );
}
