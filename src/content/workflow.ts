/**
 * Live Workflow Demonstration steps (Section 4).
 * Narrates one lead becoming revenue — plain, technical, satisfying (08-copywriting).
 */

export interface WorkflowStep {
  id: string;
  label: string;
  description: string;
}

/** Visible anchor copy when landing on #demo (Watch Demo). */
export const workflowIntro = {
  eyebrow: "Live workflow demonstration",
  title: "One lead becoming revenue",
  body: "Follow a single lead from first touch to follow-up — the same path you will wire in the masterclass.",
} as const;

export const workflow: readonly WorkflowStep[] = [
  { id: "lead-form", label: "Lead Form", description: "A new lead submits their details." },
  { id: "ai-analysis", label: "AI Analysis", description: "The agent reads, scores, and enriches the lead." },
  { id: "telegram", label: "Telegram Notification", description: "You get an instant, structured alert." },
  { id: "gmail", label: "Gmail Draft", description: "A tailored reply is drafted automatically." },
  { id: "database", label: "Database Update", description: "The lead is logged and tracked." },
  { id: "follow-up", label: "Follow-Up", description: "The agent schedules and sends the next touch." },
] as const;
