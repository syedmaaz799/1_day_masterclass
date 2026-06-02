import { AICompaniesStory } from "./AICompaniesStory";

/**
 * Section 5.5 — "The Companies Building the AI Future". A scroll-driven cinematic story
 * that builds authority and momentum before registration. Mounts OUTSIDE the StoryZone
 * with opaque bg-bg + z-10 over the story atmosphere; companies are the subject.
 */
export function AICompaniesSection() {
  return (
    <section
      id="ai-companies"
      aria-label="The companies building the AI future"
      className="relative z-10 scroll-mt-[var(--nav-h)] bg-bg"
    >
      <AICompaniesStory />
    </section>
  );
}
