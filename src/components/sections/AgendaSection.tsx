import { Container, SectionHeading, Eyebrow, Headline, Body } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { agenda } from "@/content/agenda";

/**
 * Section 5 — Masterclass Agenda. Editorial, promise-per-hour layout (large numerals +
 * outcome), separated by hairlines — deliberately not a dotted timeline template.
 * Each row reveals on enter (consumer of Reveal).
 */
export function AgendaSection() {
  return (
    <section id="agenda" className="relative py-section">
      <div
        aria-hidden
        className="absolute inset-0 bg-bg/25 lg:bg-[linear-gradient(to_right,var(--color-bg)_0%,rgb(5_5_5/0.45)_24%,transparent_65%)]"
      />
      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="The three hours"
            title="Three hours. One working agent."
            description="Every hour ends with something you can do — not just something you heard."
            id="agenda-heading"
          />
        </Reveal>

        <div className="mt-16 flex flex-col">
          {agenda.map((hour, i) => (
            <Reveal key={hour.id}>
              <div className="grid grid-cols-1 gap-6 border-t border-white/8 py-10 lg:grid-cols-12 lg:gap-12">
                <div className="flex items-baseline gap-4 lg:col-span-3 lg:flex-col lg:items-start lg:gap-3">
                  <span className="font-display text-h2 leading-none text-text-2/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Eyebrow tone="accent">{hour.hour}</Eyebrow>
                </div>
                <div className="flex flex-col gap-3 lg:col-span-9">
                  <Headline as="h3" size="h2">
                    {hour.title}
                  </Headline>
                  <Body size="lg" className="max-w-2xl">
                    {hour.outcome}
                  </Body>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
