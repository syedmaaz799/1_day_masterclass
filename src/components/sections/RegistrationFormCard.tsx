"use client";

import { Caption, EventPrice } from "@/components/ui";
import { RegistrationForm } from "@/components/forms/RegistrationForm";
import { RegistrationTicketSummary } from "@/components/sections/RegistrationTicketSummary";
/**
 * Sticky registration card (desktop) — auto height, no internal scroll (Issue 2).
 */
export function RegistrationFormCard() {
  return (
    <aside
      aria-labelledby="register-card-heading"
      className="flex flex-col gap-6 lg:sticky lg:top-[calc(var(--nav-h)+1.5rem)] lg:self-start"
    >
      <div className="flex flex-col gap-1">
        <h3
          id="register-card-heading"
          className="font-display text-h3 font-semibold tracking-tight text-text"
        >
          Complete registration
        </h3>
        <Caption as="p" className="inline-flex flex-wrap items-baseline gap-x-2">
          <EventPrice size="sm" />
          <span>· takes about 30 seconds</span>
        </Caption>
      </div>

      <RegistrationTicketSummary />

      <RegistrationForm formId="register-main" source="hero" />
    </aside>
  );
}
