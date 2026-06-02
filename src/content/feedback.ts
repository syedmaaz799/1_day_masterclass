/**
 * Post-registration feedback survey (Section 11 — conversion zone).
 */

export const feedbackSection = {
  eyebrow: "Before you go",
  title: "Help us shape the masterclass for you",
  body: "Optional survey — your answers guide the live build and Q&A. Nothing here blocks your seat.",
} as const;

export const feedbackValue = {
  points: [
    "Tells us what to emphasize live",
    "Improves examples for your role",
    "Keeps the session practical, not generic",
  ] as const,
} as const;

export const feedbackMicrocopy = {
  optionalNote: "All questions are optional — answer what applies.",
  submit: "Send responses",
  pending: "Sending…",
  successTitle: "Thank you",
  successBody: "Your responses are saved. We will use them to tune the session.",
  errorBody: "Something went wrong. Your answers are still here — try again.",
} as const;
