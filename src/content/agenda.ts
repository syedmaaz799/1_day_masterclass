/**
 * Masterclass agenda — promise-per-hour (Section 5, 08-copywriting).
 */

export interface AgendaHour {
  id: string;
  hour: string;
  title: string;
  /** What the attendee can DO by the end of this hour. */
  outcome: string;
}

export const agenda: readonly AgendaHour[] = [
  {
    id: "hour-1",
    hour: "Hour 1",
    title: "AI Foundations",
    outcome:
      "Understand how agentic AI actually works — and why it replaces tasks, not just answers questions.",
  },
  {
    id: "hour-2",
    hour: "Hour 2",
    title: "Build Your Agent",
    outcome:
      "Build a working AI agent live, with no code — wired to real tools and real tasks.",
  },
  {
    id: "hour-3",
    hour: "Hour 3",
    title: "Deploy & Automate",
    outcome:
      "Deploy your agent and connect it to Telegram and Gmail so it runs on its own.",
  },
] as const;
