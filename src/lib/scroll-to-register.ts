import { track } from "@/lib/analytics";
import { getLenis } from "@/lib/lenis-instance";

/** Sticky nav height — anchor top edge sits directly beneath the bar. */
export function getRegisterScrollOffsetPx(): number {
  if (typeof document === "undefined") return 64;
  return (
    Number.parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--nav-h"),
    ) || 64
  );
}

/**
 * Scroll to `#register-experience` — the unified registration card (screenshot target).
 * Lands with ticket summary, urgency, and the start of the form under the nav.
 */
export function scrollToRegister(source: string): void {
  track("hero_cta_click", { source });
  const target = document.getElementById("register-experience");
  if (!target) return;

  const offset = -getRegisterScrollOffsetPx();
  const lenis = getLenis();

  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.1, lock: true, force: true });
    return;
  }

  const top = target.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}
