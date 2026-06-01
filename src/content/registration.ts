/**
 * Registration conversion content (Section 6).
 * Concise benefits only — no marketing fluff (04-conversion, 08-copywriting).
 */

export const registrationBenefits = [
  "Build an AI Lead Generator",
  "Build a Telegram AI Agent",
  "Build a Gmail Automation Agent",
  "Understand AI Workflows",
  "Learn Agentic AI Fundamentals",
  "Beginner Friendly",
  "Live Q&A Included",
] as const;

export const whyAttend = {
  eyebrow: "Reserve your seat",
  title: "Three hours. One working agent. ₹109.",
  body: "You've seen what the ecosystem looks like. This session is where you build your first AI employee — live, no coding required.",
} as const;

/** Compact ticket lines above the form (Issue 6). */
export const ticketSummary = {
  label: "Your ticket",
  lines: [
    "June 7, 2026",
    "2:00 PM – 5:00 PM IST",
    "Live Online",
    "₹109",
    "Limited seats",
  ],
} as const;

/** Bridge before registration — learning → believing → action (Issue 4). */
export const conversionBridge = {
  recap: ["AI Agents", "AI Workflows", "AI Companies"] as const,
  headline: "Now build your first AI Employee.",
} as const;

export const formMicrocopy = {
  helper: "We'll send your live access link to this email.",
  submit: "Reserve My Seat for ₹109",
  pending: "Reserving your seat…",
  successTitle: "You're in.",
  successBody: "Check your email for your live access link. See you Sunday, 2:00 PM IST.",
  errorBody: "Something went wrong. Your details are still here — try again in a moment.",
} as const;

/** Final CTA urgency — emotional close, not a second form (Issue 5). */
export const finalCta = {
  eyebrow: "Last opportunity",
  urgency:
    "Seats are limited for this live build session. When the countdown ends, doors close.",
  ctaLabel: "Reserve My Seat for ₹109",
} as const;

/** FAQ transition intro (Issue 8). */
export const faqIntro = {
  eyebrow: "Still have questions?",
  title: "Everything you need to know before joining.",
  description: "Straight answers — no filler.",
} as const;
