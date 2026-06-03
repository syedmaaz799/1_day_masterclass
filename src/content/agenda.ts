/**
 * Masterclass agenda — promise-per-hour (Section 5, 08-copywriting).
 * Two days · three hours per session.
 */

export interface AgendaHour {
  id: string;
  hour: string;
  title: string;
  /** What the attendee can DO by the end of this hour. */
  outcome: string;
}

export const agendaSection = {
  eyebrow: "Two days",
  title: "Six hours. One working agent.",
  description:
    "Three hours each day — Saturday and Sunday, 2:00 PM to 5:00 PM IST. Every hour ends with something you can do — not just something you heard.",
} as const;

export const agenda: readonly AgendaHour[] = [
  {
    id: "sat-hour-1",
    hour: "Saturday · Hour 1",
    title: "AI Foundations",
    outcome:
      "Understand how agentic AI actually works — and why it replaces tasks, not just answers questions.",
  },
  {
    id: "sat-hour-2",
    hour: "Saturday · Hour 2",
    title: "Build Your Agent",
    outcome:
      "Start building a working AI agent live, with no code — wired toward real tools and real tasks.",
  },
  {
    id: "sat-hour-3",
    hour: "Saturday · Hour 3",
    title: "Tools & Memory",
    outcome:
      "Connect your agent to tools and memory so it can act with context, not one-off replies.",
  },
  {
    id: "sun-hour-1",
    hour: "Sunday · Hour 1",
    title: "Deploy Your Agent",
    outcome: "Deploy what you built and get it running in a live environment.",
  },
  {
    id: "sun-hour-2",
    hour: "Sunday · Hour 2",
    title: "Telegram & Gmail",
    outcome:
      "Connect your agent to Telegram and Gmail so it communicates and drafts on your behalf.",
  },
  {
    id: "sun-hour-3",
    hour: "Sunday · Hour 3",
    title: "Live Automation",
    outcome:
      "Run your agent end to end — lead in, action out — and leave with automation you can use Monday.",
  },
] as const;
