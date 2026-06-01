/**
 * Testimonials (post-registration proof).
 * MUST be real, consented quotes before launch (01-project). Entries without a
 * verified `quote` are not rendered.
 */

export interface Testimonial {
  id: string;
  /** Omit or leave empty until a real name is verified. */
  name: string;
  role: string;
  quote: string;
  videoSrc: string | null;
  posterSrc: string | null;
}

/**
 * Outcome-focused session proof (not attributed to fabricated individuals).
 * Replace each entry with verified participant quotes before launch.
 */
export const testimonials: readonly Testimonial[] = [
  {
    id: "build-live",
    name: "",
    role: "Live masterclass · Agent build",
    quote:
      "The session is built around deploying — you wire Telegram, Gmail, and a lead workflow in one sitting.",
    videoSrc: null,
    posterSrc: null,
  },
  {
    id: "no-code",
    name: "",
    role: "No-code workflow",
    quote:
      "Visual tools only. If you can follow steps on a laptop, you can keep up — no programming background required.",
    videoSrc: null,
    posterSrc: null,
  },
  {
    id: "leave-with-agent",
    name: "",
    role: "What you leave with",
    quote:
      "You leave with an agent connected to real tools — not slides about what agents could do someday.",
    videoSrc: null,
    posterSrc: null,
  },
] as const;
