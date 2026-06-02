"use client";

import { useRef } from "react";
import { useStoryProgress } from "@/components/motion";
import { workflowNodes } from "@/content/workflow-demo";
import { cn } from "@/lib/utils";

/**
 * Mobile step rail — five dots, no scroll. Shows progress at a glance.
 */
export function WorkflowStepRail() {
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useStoryProgress((p) => {
    const active = Math.min(
      workflowNodes.length - 1,
      Math.floor(p * workflowNodes.length),
    );
    const complete = p >= 0.92;

    dotRefs.current.forEach((dot, i) => {
      if (!dot) return;
      const on = complete ? true : i <= active;
      const current = !complete && i === active;
      dot.classList.toggle("bg-primary", current);
      dot.classList.toggle("scale-125", current);
      dot.classList.toggle("bg-primary/40", on && !current);
      dot.classList.toggle("bg-white/15", !on);
    });
  });

  return (
    <div
      className="flex items-center justify-between gap-1 px-1 lg:hidden"
      aria-hidden
    >
      {workflowNodes.map((node, i) => (
        <div key={node.id} className="flex min-w-0 flex-1 flex-col items-center gap-1">
          <span
            ref={(el) => {
              dotRefs.current[i] = el;
            }}
            className={cn(
              "block size-2 shrink-0 rounded-full transition-[transform,background-color] duration-300",
              i === 0 ? "bg-primary scale-125" : "bg-white/15",
            )}
          />
          <span className="w-full truncate text-center font-sans text-[0.625rem] leading-none text-text-2">
            {node.label.split(" ")[0]}
          </span>
        </div>
      ))}
    </div>
  );
}
