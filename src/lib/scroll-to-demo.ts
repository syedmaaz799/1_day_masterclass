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
 * Scroll to the masterclass promo video placeholder (`#promo-video`).
 * Used by Watch Demo CTAs in the hero and footer.
 */
export function scrollToDemo(source: string): void {
  track("watch_demo_click", { source });
  const target = document.getElementById("promo-video");
  if (!target) return;

  const offset = -getNavOffsetPx();
  const lenis = getLenis();

  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.1, lock: true, force: true });
    return;
  }

  const top = target.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

/**
 * Align the workflow scroll track (orbital demo section).
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
