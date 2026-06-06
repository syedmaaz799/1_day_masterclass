"use client";

import { Container } from "@/components/ui";
import { WorkflowDemoHeader } from "@/components/workflow-demo/WorkflowDemoHeader";
import { WorkflowOrbitalScrollView } from "@/components/workflow-demo/WorkflowOrbitalScrollView";

export function WorkflowDemoSection() {
  return (
    <section
      id="demo"
      aria-labelledby="workflow-demo-heading"
      className="relative scroll-mt-[var(--nav-h)]"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-bg/25 lg:bg-[linear-gradient(to_right,var(--color-bg)_0%,rgb(5_5_5/0.45)_24%,transparent_65%)]"
      />

      <Container className="relative py-12 sm:py-16 lg:py-20">
        <WorkflowDemoHeader className="mb-6 sm:mb-8" />
        <WorkflowOrbitalScrollView />
      </Container>
    </section>
  );
}
