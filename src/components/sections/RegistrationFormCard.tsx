"use client";

import { Caption } from "@/components/ui";
import { RegistrationForm } from "@/components/forms/RegistrationForm";
import { RegistrationTicketSummary } from "@/components/sections/RegistrationTicketSummary";
import { event } from "@/content/event";

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
        <Caption as="p">
          {`₹${event.priceInINR} · takes about 30 seconds`}
        </Caption>
      </div>

      <RegistrationTicketSummary />

      <RegistrationForm formId="register-main" source="hero" />
    </aside>
  );
}
