"use client";

import { ScrollStory } from "@/components/motion";
import { useMediaQuery } from "@/components/motion/use-media-query";
import { AIShiftTasks } from "@/components/sections/AIShiftTasks";

const STAGE_VH_DESKTOP = 100;
/** Shorter mobile track — same pinned scene, less finger travel (MOBILE-SCROLL-PERFORMANCE.md). */
const STAGE_VH_MOBILE = 78;

/**
 * Section 2 — The AI Shift. Not a year timeline and not an A→B slide: a single pinned
 * scene where the same six tasks progressively transform from manual to AI-assisted as
 * you scroll (see AIShiftTasks). ScrollStory provides the pin + smoothed progress;
 * ScrollStory drives section crossfades only (06-motion).
 */
export function AIShiftSection() {
  const coarsePointer = useMediaQuery("(pointer: coarse)", false);

  return (
    <section id="ai-shift" aria-label="The AI shift: from manual work to AI-assisted work" className="relative">
      <div
        aria-hidden
        className="absolute inset-0 bg-bg/25 lg:bg-[linear-gradient(to_right,var(--color-bg)_0%,rgb(5_5_5/0.45)_24%,transparent_65%)]"
      />
      <ScrollStory
        stageCount={5}
        stageVh={coarsePointer ? STAGE_VH_MOBILE : STAGE_VH_DESKTOP}
        skipEntryFade
        className="relative"
      >
        <div className="flex h-full items-center pt-[calc(var(--nav-h)+1rem)] pb-10">
          <AIShiftTasks />
        </div>
      </ScrollStory>
    </section>
  );
}
