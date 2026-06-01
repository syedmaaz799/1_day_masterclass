import { ScrollStory } from "@/components/motion";
import { AIShiftTasks } from "@/components/sections/AIShiftTasks";

/**
 * Section 2 — The AI Shift. Not a year timeline and not an A→B slide: a single pinned
 * scene where the same six tasks progressively transform from manual to AI-assisted as
 * you scroll (see AIShiftTasks). ScrollStory provides the pin + smoothed progress;
 * ScrollStory drives section crossfades only (06-motion).
 */
export function AIShiftSection() {
  return (
    <section id="ai-shift" aria-label="The AI shift: from manual work to AI-assisted work" className="relative">
      <div
        aria-hidden
        className="absolute inset-0 bg-bg/25 lg:bg-[linear-gradient(to_right,var(--color-bg)_0%,rgb(5_5_5/0.45)_24%,transparent_65%)]"
      />
      <ScrollStory stageCount={5} stageVh={100} className="relative">
        {/* Enter cleanly BELOW the fixed nav (var --nav-h) so the headline is never
            clipped; centered within the remaining safe area. */}
        <div className="flex h-full items-center pt-[calc(var(--nav-h)+1rem)] pb-10">
          <AIShiftTasks />
        </div>
      </ScrollStory>
    </section>
  );
}
