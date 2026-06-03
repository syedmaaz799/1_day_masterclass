"use client";

import { Button, EventPrice } from "@/components/ui";
import { finalCta } from "@/content/registration";
import { scrollToRegister } from "@/lib/scroll-to-register";

/** Final CTA — single button scrolls to the only registration form. */
export function FinalCTAActions() {
  return (
    <Button
      size="lg"
      className="min-h-12 min-w-[min(100%,20rem)] px-10"
      onClick={() => scrollToRegister("final-cta")}
    >
      <span className="inline-flex flex-wrap items-center justify-center gap-x-1.5">
        {finalCta.ctaLabelPrefix}
        <EventPrice size="sm" />
      </span>
    </Button>
  );
}
