import { Container, Eyebrow, Headline, Body } from "@/components/ui";
import { ConversionSectionScrim } from "@/components/background/ConversionSectionScrim";
import { ConversionBridge } from "@/components/sections/ConversionBridge";
import { FeedbackFormCard } from "@/components/sections/FeedbackFormCard";
import { FeedbackValueColumn } from "@/components/sections/FeedbackValueColumn";
import { feedbackSection } from "@/content/feedback";

/**
 * Conversion-zone feedback survey — replaces the former registration block here.
 */
export function FeedbackSection() {
  return (
    <>
      <ConversionBridge />

      <section
        id="feedback-section"
        aria-labelledby="feedback-heading"
        className="relative z-20 overflow-hidden"
      >
        <ConversionSectionScrim topFade />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent"
        />

        <Container className="relative py-section pb-28 lg:pb-section">
          <header className="mb-10 max-w-2xl">
            <Eyebrow tone="accent" withRule>
              {feedbackSection.eyebrow}
            </Eyebrow>
            <Headline as="h2" id="feedback-heading" size="h2" className="mt-4">
              {feedbackSection.title}
            </Headline>
            <Body size="lg" className="mt-4 max-w-xl text-text-2">
              {feedbackSection.body}
            </Body>
          </header>

          <div
            id="feedback-experience"
            className="scroll-mt-[var(--nav-h)] overflow-hidden rounded-lg border border-white/10 bg-surface/40"
          >
            <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-0">
              <div className="order-1 border-b border-white/8 p-6 md:p-8 lg:order-none lg:col-span-5 lg:border-b-0 lg:border-r lg:p-10">
                <FeedbackValueColumn />
              </div>
              <div className="order-0 p-6 md:p-8 lg:order-none lg:col-span-7 lg:p-10">
                <FeedbackFormCard />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
