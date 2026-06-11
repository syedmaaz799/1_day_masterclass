/**
 * "The AI Shift" (Section 2) — editorial scrollytelling copy.
 * Anchor + vertical phrase track read as one evolving sentence on scroll.
 */

export interface AutomationTask {
  id: string;
  task: string;
  manual: string;
  automated: string;
}

/** Pinned anchor — completes the sentence with each phrase. */
export const aiShiftAnchor = {
  eyebrow: "The shift",
  headline: "Your agent can",
} as const;

/** Vertical track phrases (lowercase editorial rhythm). */
export const shiftPhrases = [
  "qualify leads.",
  "draft emails.",
  "send follow-ups.",
  "answer customers.",
  "schedule meetings.",
  "research prospects.",
] as const;

/** Final payoff beat after the last phrase. */
export const shiftPayoff = "do it all automatically." as const;

export type ShiftPhrase = (typeof shiftPhrases)[number];

export const automationTasks: readonly AutomationTask[] = [
  {
    id: "lead-qualification",
    task: "Lead Qualification",
    manual: "You skim every inquiry and guess who is worth a reply.",
    automated: "The agent scores and prioritises each lead the moment it lands.",
  },
  {
    id: "email-drafting",
    task: "Email Drafting",
    manual: "You rewrite the same reply for the hundredth time.",
    automated: "A tailored draft is ready before you open the inbox.",
  },
  {
    id: "follow-ups",
    task: "Follow-Ups",
    manual: "You forget who to chase, and when.",
    automated: "Every follow-up is scheduled and sent on time, on its own.",
  },
  {
    id: "customer-support",
    task: "Customer Support",
    manual: "Repetitive questions eat your afternoons.",
    automated: "The agent answers the routine ones and escalates the rest.",
  },
  {
    id: "scheduling",
    task: "Scheduling",
    manual: "Six messages to land on one meeting slot.",
    automated: "The agent books the slot and sends the invite.",
  },
  {
    id: "research",
    task: "Research",
    manual: "Twenty tabs open to brief a single prospect.",
    automated: "A concise, sourced summary arrives in seconds.",
  },
] as const;
