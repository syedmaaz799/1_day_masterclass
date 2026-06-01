import { track } from "@/lib/analytics";
import { getLenis } from "@/lib/lenis-instance";

function getNavOffsetPx(): number {
  if (typeof document === "undefined") return 64;
  return (
    Number.parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--nav-h"),
    ) || 64
  );
}

/**
 * Scroll to the live workflow demo with content visible immediately.
 * 1. Prefer the pinned track position (past ScrollStory entry fade + stage 0).
 * 2. Fall back to #demo intro (always has copy + step 1 preview).
 */
export function scrollToDemo(source: string): void {
  track("watch_demo_click", { source });
  const offset = -getNavOffsetPx();
  const lenis = getLenis();

  const storyTrack = document.querySelector<HTMLElement>(
    "[data-scroll-story-track='workflow']",
  );
  const intro = document.getElementById("demo");

  let target: HTMLElement | number | null = null;

  if (storyTrack) {
    const trackTop = storyTrack.getBoundingClientRect().top + window.scrollY;
    // Clear ScrollStory sticky entry fade (~40% viewport) so step 1 is readable.
    const entryClearance = window.innerHeight * 0.22;
    target = trackTop + entryClearance;
  } else if (intro) {
    target = intro;
  }

  if (target === null) return;

  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.1, lock: true, force: true });
    return;
  }

  const top =
    typeof target === "number"
      ? target + offset
      : target.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}
