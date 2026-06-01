import { ConversionSectionScrim } from "@/components/background/ConversionSectionScrim";
import { Container } from "@/components/ui";
import { SectionHeading } from "@/components/ui";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { faqIntro } from "@/content/registration";

/**
 * Section 7 — FAQ with transition intro (Issue 8).
 */
export function FAQSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative z-20 scroll-mt-[calc(var(--nav-h)+1.5rem)] overflow-hidden py-section pb-28 lg:pb-section"
    >
      <ConversionSectionScrim topFade />
      <Container className="relative">
        <SectionHeading
          id="faq-heading"
          eyebrow={faqIntro.eyebrow}
          title={faqIntro.title}
          description={faqIntro.description}
          className="max-w-2xl"
        />
        <div className="mt-12 max-w-3xl">
          <FAQAccordion />
        </div>
      </Container>
    </section>
  );
}
