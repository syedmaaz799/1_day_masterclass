"use client";

import { scrollToDemo } from "@/lib/scroll-to-demo";
import { cn } from "@/lib/utils";

const linkClass = cn(
  "inline-block font-sans text-body text-text-2 transition-opacity duration-200",
  "hover:text-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
);

/** Footer Watch Demo — Lenis-aware scroll so the demo is never empty on click. */
export function FooterDemoLink({ label }: { label: string }) {
  return (
    <button type="button" className={linkClass} onClick={() => scrollToDemo("footer")}>
      {label}
    </button>
  );
}
