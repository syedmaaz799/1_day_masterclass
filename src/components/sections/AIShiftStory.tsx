"use client";

import { useRef, type CSSProperties, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/components/motion/gsap";
import { useIsomorphicLayoutEffect } from "@/components/motion/use-isomorphic-layout-effect";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { useIsCoarsePointer } from "@/components/motion/use-media-query";
import { Eyebrow } from "@/components/ui";
import { aiShiftAnchor, shiftPhrases, shiftPayoff } from "@/content/ai-shift";
import { cn } from "@/lib/utils";

const SHIFT_LINES = [...shiftPhrases, shiftPayoff] as const;
const LINE_COUNT = SHIFT_LINES.length;

/** Desktop: deliberate scrub. Touch: tight catch-up so phrases track the finger. */
const SCRUB_DESKTOP = 0.6;
const SCRUB_COARSE = 0.2;

const ANCHOR_TYPE =
  "font-display font-bold leading-[0.95] tracking-[-0.02em] text-white text-[clamp(2.5rem,5vw,5rem)]";

const LINE_TYPE =
  "font-display font-bold leading-[1.05] tracking-[-0.02em] text-balance text-[clamp(2rem,4vw,4.5rem)]";

function fullSentence(phrase: string): string {
  return `${aiShiftAnchor.headline} ${phrase}`;
}

function power2Out(t: number): number {
  const c = Math.min(1, Math.max(0, t));
  return 1 - (1 - c) * (1 - c);
}

/** Maps 0→1 beat progress to opacity + y (matches prior per-line GSAP timeline). */
function lineVisualAt(t: number): { opacity: number; y: number } {
  const p = Math.min(1, Math.max(0, t));
  if (p <= 0.4) {
    const e = power2Out(p / 0.4);
    return { opacity: 0.15 + 0.85 * e, y: 40 * (1 - e) };
  }
  const e = power2Out((p - 0.4) / 0.6);
  return { opacity: 1 - 0.85 * e, y: -40 * e };
}

type LineSetter = {
  opacity: ReturnType<typeof gsap.quickSetter>;
  y: ReturnType<typeof gsap.quickSetter>;
};

/**
 * Per-line ScrollTrigger — each phrase peaks when its row crosses viewport center.
 * (A single outer trigger mis-maps later lines because scroll span is N−1 viewports.)
 */
function useShiftScrollDriver(
  scopeRef: RefObject<HTMLElement | null>,
  lineRefs: RefObject<(HTMLElement | null)[]>,
  scrubSeconds: number,
  enabled: boolean,
) {
  useIsomorphicLayoutEffect(() => {
    if (!enabled || !scopeRef.current) return;

    const lines = lineRefs.current.filter((el): el is HTMLElement => el != null);
    if (lines.length === 0) return;

    const ctx = gsap.context(() => {
      lines.forEach((line) => {
        const setOpacity = gsap.quickSetter(line, "opacity");
        const setY = gsap.quickSetter(line, "y", "px");

        gsap.set(line, { opacity: 0.15, y: 40, force3D: true });

        const proxy = { value: 0 };
        const applyBeat = (beat: number) => {
          const visual = lineVisualAt(beat);
          setOpacity(visual.opacity);
          setY(visual.y);
        };

        gsap.to(proxy, {
          value: 1,
          ease: "none",
          scrollTrigger: {
            trigger: line,
            start: "top center",
            end: "bottom center",
            scrub: scrubSeconds,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
          },
          onUpdate: () => applyBeat(proxy.value),
        });

        applyBeat(0);
      });

      ScrollTrigger.refresh();
    }, scopeRef);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize, { passive: true });
    window.visualViewport?.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      window.visualViewport?.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, [enabled, scopeRef, lineRefs, scrubSeconds]);
}

function ShiftScrollLayout({ scrubSeconds }: { scrubSeconds: number }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const reduced = usePrefersReducedMotion();

  useShiftScrollDriver(outerRef, lineRefs, scrubSeconds, !reduced);

  return (
    <div
      ref={outerRef}
      id="ai-shift-track"
      data-scroll-story-track="ai-shift"
      className="ai-shift-outer relative overflow-visible"
      style={{ "--shift-lines": LINE_COUNT } as CSSProperties}
    >
      <div
        className={cn(
          "ai-shift-grid mx-auto grid w-full max-w-content min-w-0 touch-pan-y gap-0 px-4 sm:px-6",
          "grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]",
          "items-start",
        )}
      >
        <aside
          className={cn(
            "ai-shift-anchor z-20 flex min-w-0 flex-col justify-center self-start",
            "sticky top-[var(--nav-h)] h-[calc(100dvh-var(--nav-h))] max-h-[calc(100dvh-var(--nav-h))]",
          )}
        >
          <Eyebrow tone="accent" withRule className="mb-8">
            {aiShiftAnchor.eyebrow}
          </Eyebrow>
          <p className={ANCHOR_TYPE}>{aiShiftAnchor.headline}</p>
        </aside>

        <div className="ai-shift-lines relative min-w-0 overflow-visible">
          <span className="sr-only" aria-live="polite">
            {fullSentence(SHIFT_LINES[0])}
          </span>

          {SHIFT_LINES.map((phrase, i) => (
            <p
              key={phrase}
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
              className={cn(
                "ai-shift-line flex h-[100dvh] min-h-[100dvh] items-center break-words",
                LINE_TYPE,
                i === LINE_COUNT - 1 ? "text-accent" : "text-white",
              )}
            >
              {phrase}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function ShiftReducedEditorial() {
  return (
    <div className="mx-auto grid w-full max-w-content min-w-0 grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] items-start gap-0 px-4 py-section sm:px-6">
      <div className="min-w-0">
        <Eyebrow tone="accent" withRule className="mb-8">
          {aiShiftAnchor.eyebrow}
        </Eyebrow>
        <p className={ANCHOR_TYPE}>{aiShiftAnchor.headline}</p>
      </div>
      <ul className="flex min-w-0 flex-col gap-5">
        {SHIFT_LINES.map((phrase) => (
          <li
            key={phrase}
            className={cn(
              LINE_TYPE,
              phrase === shiftPayoff ? "text-accent" : "text-white/80",
            )}
          >
            {phrase}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * AI Shift — sticky left label + per-line ScrollTrigger scrub (viewport-centered).
 */
export function AIShiftStory() {
  const reduced = usePrefersReducedMotion();
  const coarsePointer = useIsCoarsePointer();
  const scrubSeconds = coarsePointer ? SCRUB_COARSE : SCRUB_DESKTOP;

  if (reduced) {
    return <ShiftReducedEditorial />;
  }

  return <ShiftScrollLayout scrubSeconds={scrubSeconds} />;
}
