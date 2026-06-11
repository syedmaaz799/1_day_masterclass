import dynamic from "next/dynamic";
import { TopNav } from "@/components/sections/TopNav";
import { StoryZone } from "@/components/sections/StoryZone";
import { HeroSection } from "@/components/sections/HeroSection";
import { AIShiftSection } from "@/components/sections/AIShiftSection";
import { WhatYouBuildSection } from "@/components/sections/WhatYouBuildSection";
import { AgendaSection } from "@/components/sections/AgendaSection";
import { HeroRegistrationSection } from "@/components/sections/HeroRegistrationSection";
import { ConversionZone } from "@/components/sections/ConversionZone";
import { FeedbackSection } from "@/components/sections/FeedbackSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { FooterSection } from "@/components/sections/FooterSection";
import { MobileRegistrationBar } from "@/components/sections/MobileRegistrationBar";

/** Reserve layout space while heavy scroll-story chunks load (MOBILE-SCROLL-PERFORMANCE.md). */
function WorkflowSectionSkeleton() {
  return (
    <section
      id="demo"
      aria-hidden
      className="relative min-h-[calc(100dvh-var(--nav-h))] scroll-mt-[var(--nav-h)]"
    />
  );
}

function AICompaniesSectionSkeleton() {
  return (
    <section
      id="ai-companies"
      aria-hidden
      className="relative z-10 min-h-[calc(100dvh-var(--nav-h))] scroll-mt-[var(--nav-h)] bg-bg"
    />
  );
}

const LiveWorkflowSection = dynamic(
  () =>
    import("@/components/sections/LiveWorkflowSection").then((m) => m.LiveWorkflowSection),
  { loading: () => <WorkflowSectionSkeleton /> },
);

const AICompaniesSection = dynamic(
  () =>
    import("@/components/sections/AICompaniesSection").then((m) => m.AICompaniesSection),
  { loading: () => <AICompaniesSectionSkeleton /> },
);

/**
 * Site-wide aurora background in layout. Story + conversion share atmosphere.
 * AI Companies uses opaque bg-bg over the aurora.
 */
export default function Home() {
  return (
    <>
      <TopNav />
      <main>
        <StoryZone>
          <HeroSection />
          <HeroRegistrationSection />
          <AIShiftSection />
          <WhatYouBuildSection />
          <LiveWorkflowSection />
          <AgendaSection />
        </StoryZone>
        <AICompaniesSection />
        <ConversionZone>
          <FeedbackSection />
          <TestimonialsSection />
          <FAQSection />
          <FinalCTASection />
        </ConversionZone>
        <FooterSection />
      </main>
      <MobileRegistrationBar />
    </>
  );
}
