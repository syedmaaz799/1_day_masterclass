/**
 * "What you will see" deliverables (Section 3).
 * Concrete, verb-led outcomes — each names a real artifact the attendee leaves with (08-copywriting).
 */

export interface BuildItem {
  id: string;
  name: string;
  outcome: string;
}

export const whatYouBuild: readonly BuildItem[] = [
  {
    id: "knowledge-qa-agent",
    name: "Q&A Chatbot",
    outcome:
      "Your first live AI agent — user input in, language model out, answer delivered. A clean three-step pipeline that teaches the foundation every agent is built on.",
  },
  {
    id: "content-studio",
    name: "AI Content Creator Assistant",
    outcome:
      "An intent-routing content engine — classify the ask, then generate publish-ready social posts with hooks, CTAs, and hashtags, or professional ad copy with headlines and emotional triggers. One assistant, five specialized paths.",
  },
  {
    id: "resume-intelligence",
    name: "AI Resume Reviewer",
    outcome:
      "Upload a CV and route the request — full review, summary, cover letter, interview prep, or career advice. Extracts the document, analyzes each section, and returns improvement suggestions you can apply immediately.",
  },
  {
    id: "voice-news-researcher",
    name: "Voice News Intelligence Briefing",
    outcome:
      "A voice-first research app that scans the news, synthesizes what matters, and speaks a clear briefing back — built and shipped as a real product.",
  },
] as const;
