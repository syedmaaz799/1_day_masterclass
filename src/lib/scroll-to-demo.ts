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
 * Align the workflow scroll track to the top of the viewport so step 1 is visible.
 * Used after "Generate Workflow" and when the track already exists.
 */
export function scrollToWorkflowTrack(duration = 0.85): void {
  const track =
    document.getElementById("workflow-demo-track") ??
    document.querySelector<HTMLElement>("[data-scroll-story-track='workflow']");
  if (!track) return;

  const offset = -getNavOffsetPx();
  const top = track.getBoundingClientRect().top + window.scrollY;
  const lenis = getLenis();

  if (lenis) {
    lenis.scrollTo(top, { offset, duration, lock: true, force: true });
    return;
  }

  window.scrollTo({
    top: Math.max(0, top + offset),
    behavior: duration > 0 ? "smooth" : "auto",
  });
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

  const storyTrack =
    document.getElementById("workflow-demo-track") ??
    document.querySelector<HTMLElement>("[data-scroll-story-track='workflow']");
  const intro = document.getElementById("demo");

  let target: HTMLElement | number | null = null;

  if (storyTrack) {
    target = storyTrack.getBoundingClientRect().top + window.scrollY;
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
