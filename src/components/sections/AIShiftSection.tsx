import { AIShiftStory } from "@/components/sections/AIShiftStory";

/**
 * Section 2 — The AI Shift. Sticky label + scroll-scrubbed phrase stack (GSAP ScrollTrigger).
 */
export function AIShiftSection() {
  return (
    <section
      id="ai-shift"
      aria-label="The AI shift: from manual work to AI-assisted work"
      className="relative overflow-x-clip overflow-y-visible bg-[#0d0d0d]"
    >
      <AIShiftStory />
    </section>
  );
}
