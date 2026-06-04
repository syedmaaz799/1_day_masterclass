"use client";

import { useEffect } from "react";
import { trackScrollDepthMilestone } from "@/lib/conversion-scroll";
/**
 * ConversionZone — client shell for conversion-only behaviors: scroll-depth milestones.
 * Wraps Feedback → Testimonials → FAQ → Final CTA.
 */
export function ConversionZone({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const percent = Math.round((window.scrollY / scrollable) * 100);
      trackScrollDepthMilestone(percent);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <>{children}</>;
}
