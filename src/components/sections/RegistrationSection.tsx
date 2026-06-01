import { Container, Eyebrow, Headline, Body } from "@/components/ui";
import { RegistrationValueColumn } from "@/components/sections/RegistrationValueColumn";
import { RegistrationFormCard } from "@/components/sections/RegistrationFormCard";
import { ConversionSectionScrim } from "@/components/background/ConversionSectionScrim";
import { ConversionBridge } from "@/components/sections/ConversionBridge";
import { whyAttend } from "@/content/registration";

/**
 * Section 6 — Registration Experience.
 * CTA anchor: `#register-experience` (unified card) — top edge flush under sticky nav.
 * Intro headline sits above the anchor and scrolls out of view on CTA click.
 */
export function RegistrationSection() {
  return (
    <>
      <ConversionBridge />

      <section
        id="register-section"
        aria-labelledby="register-heading"
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
              {whyAttend.eyebrow}
            </Eyebrow>
            <Headline as="h2" id="register-heading" size="h2" className="mt-4">
              {whyAttend.title}
            </Headline>
            <Body size="lg" className="mt-4 max-w-xl text-text-2">
              {whyAttend.body}
            </Body>
          </header>

          <div
            id="register-experience"
            className="register-experience-anchor scroll-mt-[var(--nav-h)] overflow-hidden rounded-lg border border-white/10 bg-surface/40"
          >
            <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-0">
              <div className="order-1 border-b border-white/8 p-6 md:p-8 lg:order-none lg:col-span-5 lg:border-b-0 lg:border-r lg:p-10">
                <RegistrationValueColumn showHeader={false} />
              </div>
              <div className="order-0 p-6 md:p-8 lg:order-none lg:col-span-7 lg:p-10">
                <RegistrationFormCard />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
