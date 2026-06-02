"use client";

import { useRef, useState } from "react";
import { useStoryProgress } from "@/components/motion";
import { Body, Display, Eyebrow, Headline } from "@/components/ui";
import {
  workflowComplete,
  workflowDemoSection,
  workflowNodes,
} from "@/content/workflow-demo";
import { cn } from "@/lib/utils";

type WorkflowExplanationPanelProps = {
  compact?: boolean;
};

export function WorkflowExplanationPanel({ compact = false }: WorkflowExplanationPanelProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [complete, setComplete] = useState(false);
  const lastIndexRef = useRef(0);
  const lastCompleteRef = useRef(false);

  const reduced = useStoryProgress((p) => {
    const isComplete = p >= 0.92;
    if (isComplete !== lastCompleteRef.current) {
      lastCompleteRef.current = isComplete;
      setComplete(isComplete);
    }
    if (isComplete) return;

    const idx = Math.min(workflowNodes.length - 1, Math.floor(p * workflowNodes.length));
    if (idx !== lastIndexRef.current) {
      lastIndexRef.current = idx;
      setActiveIndex(idx);
    }
  });

  const panelClass = cn(
    "rounded-lg border border-white/8 bg-surface/60",
    compact ? "p-3" : "p-5 sm:p-6 lg:p-7 xl:p-8",
  );

  if (reduced) {
    return (
      <div className={panelClass}>
        {workflowNodes.map((node, i) => (
          <div key={node.id} className={cn(i > 0 && "mt-8 border-t border-white/8 pt-8 sm:mt-10 sm:pt-10")}>
            <ExplanationContent node={node} compact={compact} />
          </div>
        ))}
        <CompleteBlock className="mt-8 border-t border-white/8 pt-8 sm:mt-10 sm:pt-10" />
      </div>
    );
  }

  if (complete) {
    return (
      <div className={panelClass}>
        <CompleteBlock />
      </div>
    );
  }

  const node = workflowNodes[activeIndex];
  if (!node) return null;

  return (
    <div className={panelClass}>
      <Eyebrow tone="accent" withRule>
        {`Step ${activeIndex + 1} of ${workflowNodes.length}`}
      </Eyebrow>
      <ExplanationContent node={node} compact={compact} />
    </div>
  );
}

function ExplanationContent({
  node,
  compact = false,
}: {
  node: (typeof workflowNodes)[number];
  compact?: boolean;
}) {
  return (
    <div className={compact ? "mt-2" : "mt-5 lg:mt-6"}>
      <Headline
        as="h3"
        size="h3"
        className={cn("text-balance", compact ? "text-base" : "lg:text-h2 xl:text-[1.75rem]")}
      >
        {node.label}
      </Headline>
      <div
        className={cn(
          "flex flex-col",
          compact ? "mt-2 gap-2" : "mt-4 gap-3 lg:mt-5 lg:gap-4 xl:gap-5",
        )}
      >
        {node.paragraphs.map((p) => (
          <Body
            key={p}
            size="lg"
            className={cn(
              "text-pretty text-text-2",
              compact
                ? "text-sm leading-relaxed"
                : "text-base leading-relaxed sm:text-body-lg lg:text-[1.0625rem] lg:leading-[1.65]",
            )}
          >
            {p}
          </Body>
        ))}
        {node.bullets ? (
          <ul
            className={cn(
              "ml-1 flex flex-col border-l border-primary/30 pl-4",
              compact ? "gap-1.5" : "gap-2 pl-5 lg:gap-2.5 lg:pl-6",
            )}
          >
            {node.bullets.map((item) => (
              <li
                key={item}
                className={cn(
                  "font-sans text-text",
                  compact ? "text-sm" : "text-base lg:text-body-lg",
                )}
              >
                {item}
              </li>
            ))}
          </ul>
        ) : null}
        {node.closing ? (
          <Body
            size="lg"
            className={cn(
              "text-pretty text-text",
              compact ? "text-sm" : "text-base sm:text-body-lg lg:text-[1.0625rem]",
            )}
          >
            {node.closing}
          </Body>
        ) : null}
      </div>
    </div>
  );
}

function CompleteBlock({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Eyebrow tone="accent" withRule>
        {workflowDemoSection.title}
      </Eyebrow>
      <Display as="h3" size="l" className="mt-4 text-balance text-h2 lg:mt-6 lg:text-display-l">
        {workflowComplete.title}
      </Display>
      <Body size="lg" className="mt-3 text-pretty text-base text-text-2 sm:mt-4 sm:text-body-lg">
        {workflowComplete.body}
      </Body>
      <Body size="lg" className="mt-2 text-pretty text-base text-text sm:mt-3 sm:text-body-lg">
        {workflowComplete.footnote}
      </Body>
    </div>
  );
}
