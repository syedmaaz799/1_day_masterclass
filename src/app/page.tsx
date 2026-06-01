import { TopNav } from "@/components/sections/TopNav";
import { StoryZone } from "@/components/sections/StoryZone";
import { HeroSection } from "@/components/sections/HeroSection";
import { AIShiftSection } from "@/components/sections/AIShiftSection";
import { WhatYouBuildSection } from "@/components/sections/WhatYouBuildSection";
import { LiveWorkflowSection } from "@/components/sections/LiveWorkflowSection";
import { AgendaSection } from "@/components/sections/AgendaSection";
import { AICompaniesSection } from "@/components/sections/AICompaniesSection";
import { ConversionZone } from "@/components/sections/ConversionZone";
import { RegistrationSection } from "@/components/sections/RegistrationSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { FooterSection } from "@/components/sections/FooterSection";

/**
 * Site-wide background in layout. Story + conversion share atmosphere.
 * AI Companies uses opaque bg-bg over the canvas.
 */
export default function Home() {
  return (
    <>
      <TopNav />
      <main>
        <StoryZone>
          <HeroSection />
          <AIShiftSection />
          <WhatYouBuildSection />
          <LiveWorkflowSection />
          <AgendaSection />
        </StoryZone>
        <AICompaniesSection />
        <ConversionZone>
          <RegistrationSection />
          <TestimonialsSection />
          <FAQSection />
          <FinalCTASection />
        </ConversionZone>
        <FooterSection />
      </main>
    </>
  );
}
