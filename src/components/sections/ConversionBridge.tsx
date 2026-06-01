import { ConversionSectionScrim } from "@/components/background/ConversionSectionScrim";
import { Container, Body, Headline } from "@/components/ui";
import { conversionBridge } from "@/content/registration";

/**
 * ConversionBridge — psychological handoff after AI Companies (Issue 4, 11).
 * Not a marketing section; a short learning → action transition.
 */
export function ConversionBridge() {
  return (
    <div
      id="register-bridge"
      className="relative z-20 overflow-hidden border-t border-white/8"
    >
      <ConversionSectionScrim topFade />
      <Container className="relative py-16 md:py-20">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-8 text-center">
          <p className="font-sans text-overline uppercase tracking-[0.16em] text-text-2">
            You&apos;ve seen
          </p>
          <ul className="flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8">
            {conversionBridge.recap.map((item) => (
              <li key={item} className="font-sans text-body-lg text-text">
                <span className="mr-2 text-accent" aria-hidden>
                  •
                </span>
                {item}
              </li>
            ))}
          </ul>
          <Headline as="p" size="h2" className="text-balance">
            {conversionBridge.headline}
          </Headline>
          <Body size="lg" className="max-w-md text-text-2">
            One live session. One working AI employee. Reserve below.
          </Body>
        </div>
      </Container>
    </div>
  );
}
