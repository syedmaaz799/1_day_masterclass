"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type WorkflowEdgeProps = {
  compact?: boolean;
  dense?: boolean;
  className?: string;
};

/**
 * Vertical edge between workflow nodes — connects output port to next input port.
 */
export const WorkflowEdge = forwardRef<HTMLDivElement, WorkflowEdgeProps>(function WorkflowEdge(
  { compact = false, dense = false, className },
  ref,
) {
  const isMobileLine = compact || dense;

  return (
    <div
      ref={ref}
      aria-hidden
      data-workflow-edge
      className={cn(
        "relative mx-auto flex flex-col items-center justify-center",
        dense ? "h-5 w-8" : compact ? "h-6 w-8" : "h-8 w-10 lg:h-10 xl:h-11",
        className,
      )}
    >
      <div
        data-edge-track
        className={cn(
          "absolute left-1/2 top-0 bottom-0 -translate-x-1/2 rounded-full",
          isMobileLine ? "w-[2px] bg-white/25 opacity-100" : "w-px bg-white/12 opacity-0 lg:w-0.5 lg:opacity-60",
        )}
      />

      <div
        data-edge-line
        className={cn(
          "absolute left-1/2 top-0 origin-top -translate-x-1/2 rounded-full bg-gradient-to-b from-primary/80 via-accent to-primary/50",
          isMobileLine ? "w-[2px]" : "w-px lg:w-0.5",
        )}
        style={{ height: "100%", transform: "scaleY(0)" }}
      />

      <span
        data-edge-glow
        className="absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-accent opacity-0 shadow-[0_0_10px_rgb(54_225_255/0.9)] lg:size-2"
        style={{ top: "50%" }}
      />
    </div>
  );
});
