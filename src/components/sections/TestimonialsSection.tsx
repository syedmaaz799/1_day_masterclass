import { ConversionSectionScrim } from "@/components/background/ConversionSectionScrim";
import { Container, SectionHeading, Body, Caption } from "@/components/ui";
import { testimonials } from "@/content/testimonials";

/**
 * Testimonials — minimal, outcome-focused proof after registration (Issue 7).
 * No carousel, no auto-rotation. Supports conversion without becoming a story.
 */
export function TestimonialsSection() {
  const items = testimonials.filter((t) => t.quote.trim().length > 0);
  if (items.length === 0) return null;

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative z-20 overflow-hidden border-t border-white/8 py-section"
    >
      <ConversionSectionScrim topFade />
      <Container className="relative">
        <SectionHeading
          id="testimonials-heading"
          eyebrow="After the build"
          title="What the live session delivers."
          description="Outcome-focused. No hype — just what you experience in the room."
          className="max-w-2xl"
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
          {items.map((item) => (
            <li key={item.id}>
              <figure className="flex h-full flex-col gap-5 rounded-lg border border-white/8 bg-surface p-6 md:p-8">
                <blockquote className="flex-1">
                  <Body size="lg" className="text-text leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </Body>
                </blockquote>
                <figcaption className="border-t border-white/8 pt-4">
                  {item.name ? (
                    <Caption as="p" className="font-medium text-text">
                      {item.name}
                    </Caption>
                  ) : null}
                  <Caption as="p" className="text-text-2">
                    {item.role}
                  </Caption>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <p className="sr-only">
          Replace outcome placeholders with verified participant quotes in
          content/testimonials.ts before launch.
        </p>
      </Container>
    </section>
  );
}
