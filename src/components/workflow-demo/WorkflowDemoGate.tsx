"use client";

import { ArrowUp, Sparkles } from "lucide-react";
import { Body, Caption } from "@/components/ui";
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

      <div
        className="relative z-10 mx-auto mt-8 w-full sm:mt-10"
        aria-labelledby="workflow-composer-label"
      >
        <p id="workflow-composer-label" className="sr-only">
          {workflowDemoSection.inputLabel}
        </p>

        <div
          className={cn(
            "overflow-hidden rounded-[1.25rem] border border-white/14 bg-surface",
            "shadow-[0_0_0_1px_rgb(255_255_255/0.04),0_16px_48px_rgb(0_0_0/0.45)]",
          )}
        >
          <div className="flex items-center gap-2 border-b border-white/8 px-4 py-2.5">
            <Sparkles size={14} className="shrink-0 text-accent" aria-hidden />
            <span className="font-sans text-caption font-medium text-text-2">
              {gate.composerLabel}
            </span>
          </div>

          <div className="px-3 pb-3 pt-2 sm:px-4 sm:pb-4">
            <div
              id="workflow-agent-prompt"
              role="textbox"
              aria-readonly="true"
              aria-label={workflowDemoSection.inputLabel}
              className={cn(
                "min-h-[4.5rem] px-2 py-2",
                "font-sans text-base leading-relaxed text-text",
              )}
            >
              {workflowDemoSection.inputDefaultValue}
            </div>

            <div className="mt-1 flex flex-col gap-3 border-t border-white/8 pt-3 sm:flex-row sm:items-center sm:justify-between">
              <Caption
                id="workflow-agent-prompt-hint"
                className="text-left text-[0.8125rem] leading-snug text-text-2"
              >
                {gate.inputHelper}
              </Caption>
              <button
                type="button"
                onClick={onGenerate}
                aria-describedby="workflow-agent-prompt-hint"
                className={cn(
                  "inline-flex h-12 w-full items-center justify-center gap-2 rounded-pill px-6 sm:w-auto sm:min-w-[7.5rem]",
                  "bg-primary font-sans text-base font-semibold text-white",
                  "shadow-[var(--primary-glow)]",
                  "transition-[transform,background-color,box-shadow] duration-[var(--duration-ui)] ease-out-expo",
                  "hover:-translate-y-0.5 hover:bg-[#6189ff] hover:shadow-[0_0_36px_rgb(79_124_255/0.5)]",
                  "active:translate-y-0",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                )}
              >
                {workflowDemoSection.generateLabel}
                <ArrowUp size={18} strokeWidth={2.5} aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>

      <details className="group mt-6 rounded-lg border border-white/8 bg-surface/40 px-4 py-3 sm:mt-8">
        <summary className="cursor-pointer list-none font-sans text-caption font-medium uppercase tracking-wider text-text-2 marker:content-none [&::-webkit-details-marker]:hidden">
          <span className="flex items-center justify-between gap-2">
            {gate.previewTitle}
            <span
              aria-hidden
              className="text-text-2 transition-transform duration-[var(--duration-ui)] group-open:rotate-180"
            >
              ▾
            </span>
          </span>
        </summary>
        <ul className="mt-4 grid gap-2.5 border-t border-white/8 pt-4 sm:grid-cols-2 sm:gap-x-6">
          {gate.previewSteps.map((step, i) => (
            <li
              key={step}
              className="flex items-start gap-2.5 font-sans text-sm text-text-2"
            >
              <span aria-hidden className="mt-0.5 font-mono text-xs text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </details>

      <Caption className="mt-5 text-center text-text-2">{gate.generateHint}</Caption>
    </div>
  );
}
