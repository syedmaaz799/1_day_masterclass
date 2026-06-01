import { Container, Eyebrow, Display, Body, Caption } from "@/components/ui";
import { workflow, workflowIntro } from "@/content/workflow";

/**
 * WorkflowDemoIntro — always-visible entry for #demo / Watch Demo.
 * Sits above the pinned ScrollStory so hash navigation never lands on an empty stage.
 */
export function WorkflowDemoIntro() {
  const firstStep = workflow[0];

  return (
    <div
      id="demo"
      className="relative z-10 scroll-mt-[var(--nav-h)] border-b border-white/8 bg-bg/80"
    >
      <Container className="py-16 md:py-20">
        <div className="mx-auto flex max-w-2xl flex-col gap-6">
          <Eyebrow tone="accent" withRule>
            {workflowIntro.eyebrow}
          </Eyebrow>
          <Display as="h2" size="l">
            {workflowIntro.title}
          </Display>
          <Body size="lg" className="text-text-2">
            {workflowIntro.body}
          </Body>

          {firstStep ? (
            <div className="mt-2 rounded-lg border border-white/8 bg-surface/60 p-6 md:p-8">
              <Caption as="p" className="text-overline uppercase tracking-[0.16em] text-text-2">
                {`Step 1 of ${workflow.length}`}
              </Caption>
              <p className="mt-3 font-display text-h3 font-semibold text-text">
                {firstStep.label}
              </p>
              <Body size="lg" className="mt-2 text-text-2">
                {firstStep.description}
              </Body>
            </div>
          ) : null}
        </div>
      </Container>
    </div>
  );
}
