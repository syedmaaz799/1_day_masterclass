import { Container, Eyebrow, Headline, Body } from "@/components/ui";
import { RegistrationValueColumn } from "@/components/sections/RegistrationValueColumn";
import { RegistrationFormCard } from "@/components/sections/RegistrationFormCard";
import { MasterclassPromoVideoPlaceholder } from "@/components/sections/MasterclassPromoVideoPlaceholder";
import { whyAttend } from "@/content/registration";

/**
 * Registration immediately after hero — primary conversion anchor (`#register-experience`).
 */
export function HeroRegistrationSection() {
  return (
    <section
      id="register-section"
      aria-labelledby="register-heading"
      className="relative z-10 scroll-mt-[var(--nav-h)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent"
      />

      <Container className="relative py-16 sm:py-20 lg:py-section">
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
          className="register-experience-anchor overflow-hidden rounded-lg border border-white/10 bg-surface/40"
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

        <MasterclassPromoVideoPlaceholder className="mt-12 sm:mt-16 lg:mt-20" />
      </Container>
    </section>
  );
}
