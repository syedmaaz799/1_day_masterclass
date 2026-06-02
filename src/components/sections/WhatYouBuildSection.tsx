import { Container, SectionHeading, Card, Headline, Body } from "@/components/ui";
import { Reveal, RevealGroup } from "@/components/motion";
import { whatYouBuild } from "@/content/what-you-build";

/**
 * Section 3 — What you will see. Outcome-led product reveals, not feature cards:
 * big index numerals, the artifact's name, and the result it produces. RevealGroup
 * staggers the cards in as the row enters (first real consumer of RevealGroup).
 */
export function WhatYouBuildSection() {
  return (
    <section id="build" className="relative py-section">
      <div
        aria-hidden
        className="absolute inset-0 bg-bg/25 lg:bg-[linear-gradient(to_right,var(--color-bg)_0%,rgb(5_5_5/0.45)_24%,transparent_65%)]"
      />
      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="What you will see"
            title="Five Agents you will see"
            description="Not slides, not demos. Working agents you leave the session owning."
            id="build-heading"
          />
        </Reveal>

        <RevealGroup className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whatYouBuild.map((item, i) => (
            <Card key={item.id} padding="lg" className="flex h-full flex-col gap-6">
              <span className="font-display text-h3 leading-none text-text-2/30">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-2">
                <Headline as="h3" size="h3">
                  {item.name}
                </Headline>
                <Body>{item.outcome}</Body>
              </div>
            </Card>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
