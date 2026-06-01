/**
 * "What You Will Build" deliverables (Section 3).
 * Concrete, verb-led outcomes — each names a real artifact the attendee leaves with (08-copywriting).
 */

export interface BuildItem {
  id: string;
  name: string;
  outcome: string;
}

export const whatYouBuild: readonly BuildItem[] = [
  {
    id: "lead-generator",
    name: "AI Lead Generator",
    outcome: "Capture and qualify leads automatically — no manual chasing.",
  },
  {
    id: "telegram-agent",
    name: "Telegram Agent",
    outcome: "An agent that replies and notifies on Telegram for you.",
  },
  {
    id: "gmail-agent",
    name: "Gmail Automation Agent",
    outcome: "Drafts and sends the right Gmail responses on your behalf.",
  },
  {
    id: "resume-reviewer",
    name: "Resume Reviewer",
    outcome: "Reviews resumes and returns structured, useful feedback.",
  },
  {
    id: "career-architect",
    name: "Career Architect",
    outcome: "Maps a personalized career and skill path on demand.",
  },
] as const;
