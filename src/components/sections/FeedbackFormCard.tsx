"use client";

import { Caption } from "@/components/ui";
import { FeedbackForm } from "@/components/forms/FeedbackForm";

export function FeedbackFormCard() {
  return (
    <aside
      aria-labelledby="feedback-card-heading"
      className="flex flex-col gap-6 lg:sticky lg:top-[calc(var(--nav-h)+1.5rem)] lg:self-start"
    >
      <div className="flex flex-col gap-1">
        <h3
          id="feedback-card-heading"
          className="font-display text-h3 font-semibold tracking-tight text-text"
        >
          Quick survey
        </h3>
        <Caption as="p">Optional · under a minute</Caption>
      </div>

      <FeedbackForm formId="feedback-main" />
    </aside>
  );
}
