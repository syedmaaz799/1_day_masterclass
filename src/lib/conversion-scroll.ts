/**
 * Scroll-depth milestones for the conversion zone (architecture only — 04-conversion).
 * Fires once per milestone per page load; no PII.
 */

import { track } from "@/lib/analytics";

const MILESTONES = [25, 50, 75, 100] as const;
const fired = new Set<number>();

/** Call from a single IntersectionObserver on `document.documentElement` scroll height. */
export function trackScrollDepthMilestone(scrollPercent: number): void {
  for (const m of MILESTONES) {
    if (scrollPercent >= m && !fired.has(m)) {
      fired.add(m);
      track("scroll_depth_milestone", { percent: m });
    }
  }
}

export function resetScrollMilestonesForTests(): void {
  fired.clear();
}
