import { AIShiftStory } from "@/components/sections/AIShiftStory";

/**
 * Section 2 — The AI Shift. Sticky label + scroll-scrubbed phrase stack (GSAP ScrollTrigger).
 */
export function AIShiftSection() {
  return (
    <section
      id="ai-shift"
      aria-label="The AI shift: from manual work to AI-assisted work"
      className="relative overflow-x-clip overflow-y-visible"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-bg/25 lg:bg-[linear-gradient(to_right,var(--color-bg)_0%,rgb(5_5_5/0.45)_24%,transparent_65%)]"
      />
      <div className="relative">
        <AIShiftStory />
      </div>
    </section>
  );
}
