/**
 * FAQ — real objections only (04-conversion). Each answer leads with reassurance.
 */

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faq: readonly FaqItem[] = [
  {
    id: "who-for",
    question: "Who is this masterclass for?",
    answer:
      "Students, early-career professionals, and founders who want a practical AI skill they can use immediately — no prior AI build experience required.",
  },
  {
    id: "no-code",
    question: "Do I need coding experience?",
    answer:
      "No. The entire masterclass is no-code. You'll build a working AI agent with visual tools — no programming required.",
  },
  {
    id: "beginner",
    question: "Is this beginner friendly?",
    answer:
      "Yes. We start from foundations and move step by step. If you can follow instructions on a laptop, you can keep up.",
  },
  {
    id: "recording",
    question: "Will there be a recording?",
    answer:
      "This is a live, interactive session. Attend live to ask questions and build alongside the instructor.",
  },
  {
    id: "joining-details",
    question: "How will I receive joining details?",
    answer:
      "Immediately after registration. We'll email your live access link to the address you provide — keep it handy for session day.",
  },
  {
    id: "tools",
    question: "What tools will be used?",
    answer:
      "Industry-standard no-code and agent tools we'll introduce live. You need a laptop, stable internet, and free accounts where noted — we guide setup at the start.",
  },
  {
    id: "payment",
    question: "How do I make payment?",
    answer:
      "After you submit this form, you'll complete secure checkout for ₹109. Payment confirmation is required to reserve your seat.",
  },
  {
    id: "after-register",
    question: "What happens after registration?",
    answer:
      "You'll receive a confirmation email with your live link. Show up on time with your laptop — you'll leave with a deployed agent connected to real tools.",
  },
] as const;
