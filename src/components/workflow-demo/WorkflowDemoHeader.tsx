import { Headline, Body, Eyebrow } from "@/components/ui";
import { workflowDemoSection } from "@/content/workflow-demo";
import { cn } from "@/lib/utils";

type WorkflowDemoHeaderProps = {
  className?: string;
};

/** Centered intro above the orbital pipeline — h2 scale so the orbit keeps viewport room. */
export function WorkflowDemoHeader({ className }: WorkflowDemoHeaderProps) {
  return (
    <header
      className={cn(
        "mx-auto flex max-w-3xl flex-col items-center gap-4 text-center sm:gap-5",
        className,
      )}
    >
      <Eyebrow tone="accent" withRule className="justify-center">
        {workflowDemoSection.eyebrow}
      </Eyebrow>
      <Headline as="h2" id="workflow-demo-heading" size="h2" className="text-balance">
        {workflowDemoSection.title}
      </Headline>
      <Body size="lg" className="max-w-xl text-pretty text-text-2 sm:text-body">
        {workflowDemoSection.subtitle}
      </Body>
    </header>
  );
}
