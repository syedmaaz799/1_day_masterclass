import { Container, Eyebrow, Display, Body } from "@/components/ui";
import { ScrollStory, StoryStage } from "@/components/motion";
import { WorkflowSpine } from "@/components/sections/WorkflowSpine";
import { WorkflowDemoIntro } from "@/components/sections/WorkflowDemoIntro";
import { workflow } from "@/content/workflow";

/**
 * Section 4 — Live Workflow Demonstration. #demo intro is always visible; ScrollStory
 * pins the step-by-step walkthrough below. Watch Demo scrolls past the entry fade.
 */
export function LiveWorkflowSection() {
  return (
    <section aria-label="Live workflow: one lead becoming revenue" className="relative">
      <div
        aria-hidden
        className="absolute inset-0 bg-bg/25 lg:bg-[linear-gradient(to_right,var(--color-bg)_0%,rgb(5_5_5/0.45)_24%,transparent_65%)]"
      />

      <WorkflowDemoIntro />

      <ScrollStory
        stageCount={workflow.length}
        stageVh={80}
        scrollStoryTrack="workflow"
        className="relative"
      >
        {workflow.map((step, i) => (
          <StoryStage key={step.id} index={i}>
            <Container>
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
                <div className="flex flex-col gap-6 lg:col-span-7">
                  <Eyebrow tone="accent" withRule>
                    {`Live workflow · Step ${i + 1} of ${workflow.length}`}
                  </Eyebrow>
                  <Display as="h2" size="l">
                    {step.label}
                  </Display>
                  <Body size="lg" className="max-w-md">
                    {step.description}
                  </Body>
                </div>
              </div>
            </Container>
          </StoryStage>
        ))}

        <WorkflowSpine />
      </ScrollStory>
    </section>
  );
}
