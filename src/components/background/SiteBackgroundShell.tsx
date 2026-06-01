"use client";

import type { ReactNode } from "react";
import { SiteBackground } from "@/components/background/SiteBackground";

/** Fixed site background behind all page content. */
export function SiteBackgroundShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden
        data-site-background
      >
        <SiteBackground />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
