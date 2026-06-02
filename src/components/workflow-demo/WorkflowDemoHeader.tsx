import { Display, Body, Eyebrow } from "@/components/ui";
import { workflowDemoSection } from "@/content/workflow-demo";
import { cn } from "@/lib/utils";

type WorkflowDemoHeaderProps = {
  /** full = intro gate; compact = mobile pin; pinned = desktop pin while scrolling nodes */
  variant?: "full" | "compact" | "pinned";
  className?: string;
};

export function WorkflowDemoHeader({ variant = "full", className }: WorkflowDemoHeaderProps) {
  const compact = variant === "compact";
  const pinned = variant === "pinned";

  return (
    <header
      className={cn(
        compact && "text-center",
        pinned && "mx-auto max-w-2xl text-center",
        variant === "full" && "mx-auto max-w-2xl text-center",
        className,
      )}
    >
      <Eyebrow
        tone="accent"
        withRule
        className="justify-center"
      >
        Live workflow
      </Eyebrow>
      <Display
        as="h2"
        id="workflow-demo-heading"
        size="l"
        className={cn(
          "mt-2 text-balance leading-tight text-text",
          compact && "text-lg",
          pinned && "mt-2 text-xl sm:text-2xl lg:mt-2 lg:text-[clamp(1.5rem,3vw,2.25rem)]",
          variant === "full" && "mt-4 text-[clamp(1.75rem,6vw,2.75rem)] sm:text-display-l",
        )}
      >
        {workflowDemoSection.title}
      </Display>
      <Body
        size="lg"
        className={cn(
          "text-pretty text-text-2",
          compact && "mx-auto mt-1 max-w-none text-sm",
          pinned && "mx-auto mt-1.5 max-w-xl text-sm lg:mt-2 lg:text-base",
          variant === "full" && "mx-auto mt-3 max-w-xl sm:mt-4",
        )}
      >
        {workflowDemoSection.subtitle}
      </Body>
    </header>
  );
}
