"use client";

import { Body, Button, Caption, Eyebrow, Input } from "@/components/ui";
import { workflowDemoSection } from "@/content/workflow-demo";
import { cn } from "@/lib/utils";

type WorkflowDemoGateProps = {
  onGenerate: () => void;
  className?: string;
};

export function WorkflowDemoGate({ onGenerate, className }: WorkflowDemoGateProps) {
  const { gate } = workflowDemoSection;

  return (
    <div className={cn("mx-auto mt-8 max-w-2xl sm:mt-10 lg:mt-12", className)}>
      <Body size="lg" className="mx-auto max-w-xl text-center text-pretty text-text-2">
        {gate.lead}
      </Body>

      <div className="mt-8 rounded-lg border border-white/8 bg-surface/60 p-5 sm:mt-10 sm:p-6 md:p-8">
        <Eyebrow tone="muted" className="mb-4">
          {gate.previewTitle}
        </Eyebrow>
        <ul className="grid gap-2.5 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-3">
          {gate.previewSteps.map((step, i) => (
            <li
              key={step}
              className="flex items-start gap-3 font-sans text-sm text-text sm:text-body"
            >
              <span
                aria-hidden
                className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-accent/35 bg-accent/10 text-xs font-semibold text-accent"
              >
                {i + 1}
              </span>
              <span className="text-pretty">{step}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 border-t border-white/8 pt-6 sm:mt-8 sm:pt-8">
          <Input
            label={workflowDemoSection.inputLabel}
            defaultValue={workflowDemoSection.inputDefaultValue}
            readOnly
            className="pointer-events-none text-base"
          />
          <Caption className="mt-2 text-text-2">{gate.inputHelper}</Caption>

          <Button
            type="button"
            variant="secondary"
            size="lg"
            fullWidth
            className={cn(
              "mt-5 min-h-12 border-0 bg-accent font-semibold text-bg",
              "shadow-[0_0_28px_rgb(54_225_255/0.2)]",
              "hover:-translate-y-0.5 hover:border-0 hover:bg-[#5ee9ff] hover:text-bg",
              "hover:shadow-[0_0_36px_rgb(54_225_255/0.28)]",
              "active:translate-y-0",
              "sm:mt-6",
            )}
            onClick={onGenerate}
          >
            {workflowDemoSection.generateLabel}
          </Button>
        </div>
      </div>

      <Caption className="mt-4 text-center text-text-2 sm:mt-5">{gate.generateHint}</Caption>
    </div>
  );
}
