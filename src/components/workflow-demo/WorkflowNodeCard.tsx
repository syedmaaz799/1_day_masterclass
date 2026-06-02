"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { WorkflowNodeIcon } from "@/components/workflow-demo/WorkflowNodeIcon";
import type { WorkflowNodeVisual } from "@/content/workflow-node-meta";
import { cn } from "@/lib/utils";

export type WorkflowNodeCardProps = HTMLAttributes<HTMLElement> & {
  label: string;
  step: number;
  visual: WorkflowNodeVisual;
  isFirst?: boolean;
  isLast?: boolean;
  compact?: boolean;
  /** Extra-tight layout for mobile all-nodes view. */
  dense?: boolean;
};

/**
 * Canvas-style workflow node (n8n-inspired): icon tile, kind label, ports, active ring.
 */
export const WorkflowNodeCard = forwardRef<HTMLElement, WorkflowNodeCardProps>(
  function WorkflowNodeCard(
    {
      label,
      step,
      visual,
      isFirst = false,
      isLast = false,
      compact = false,
      dense = false,
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const iconAccent =
      visual.accent === "accent"
        ? "bg-accent/12 text-accent"
        : "bg-primary/12 text-primary";

    return (
      <article
        ref={ref}
        data-workflow-node
        style={style}
        {...rest}
        className={cn(
          "workflow-node relative w-full rounded-md border border-white/10 bg-surface",
          "shadow-[inset_0_1px_0_rgb(255_255_255/0.06)] transition-[opacity,transform,box-shadow,border-color] duration-500 ease-out",
          compact ? "max-w-none" : "max-w-none",
          className,
        )}
      >
        {!isFirst ? (
          <span
            aria-hidden
            data-node-port="input"
            className={cn(
              "absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent/80 bg-bg shadow-[0_0_0_3px_rgb(5_5_5/0.9)]",
              dense ? "size-2 border-accent" : compact ? "size-2.5 border-accent" : "size-2.5 lg:size-3",
            )}
          />
        ) : null}

        <div
          className={cn(
            "flex items-stretch gap-0 overflow-hidden rounded-[calc(var(--radius-md)-1px)]",
            dense ? "min-h-8" : compact ? "min-h-[2.875rem]" : "min-h-[3.75rem] lg:min-h-[4.25rem] xl:min-h-[4.5rem]",
          )}
        >
          <div
            className={cn(
              "flex shrink-0 items-center justify-center border-r border-white/8",
              dense ? "w-8" : compact ? "w-10" : "w-12 lg:w-14",
              iconAccent,
            )}
          >
            <WorkflowNodeIcon
              id={visual.icon}
              size={dense ? 14 : compact ? 16 : 20}
              className={cn(!dense && "lg:hidden")}
            />
            {!compact && !dense ? (
              <WorkflowNodeIcon id={visual.icon} size={24} className="hidden lg:block" />
            ) : null}
          </div>
          <div
            className={cn(
              "flex min-w-0 flex-1 flex-col justify-center",
              dense ? "px-1.5 py-1" : compact ? "px-2 py-1.5" : "px-3 py-2.5 lg:px-4 lg:py-3",
            )}
          >
            {dense ? (
              <p className="truncate font-sans text-xs font-medium leading-tight text-text">
                <span className="text-[0.625rem] font-semibold uppercase tracking-wider text-text-2">
                  {visual.kindLabel}
                </span>
                <span className="mx-1 text-text-2/50" aria-hidden>
                  ·
                </span>
                <span className="font-display font-semibold">{label}</span>
              </p>
            ) : (
              <>
                <span
                  className={cn(
                    "font-sans font-semibold uppercase tracking-[0.12em] text-text-2",
                    compact ? "text-[0.625rem]" : "text-[0.6875rem] lg:text-caption",
                  )}
                >
                  {visual.kindLabel}
                </span>
                <p
                  className={cn(
                    "font-display font-semibold leading-snug text-text",
                    compact
                      ? "text-pretty text-sm line-clamp-2"
                      : "text-body-lg lg:text-h3 lg:leading-tight",
                  )}
                >
                  {label}
                </p>
              </>
            )}
          </div>
        </div>

        <span
          aria-hidden
          className={cn(
            "absolute bottom-0 left-3 right-3 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent lg:left-4 lg:right-4",
            isLast && "opacity-0",
          )}
        />

        {!isLast ? (
          <span
            aria-hidden
            data-node-port="output"
            className={cn(
              "absolute bottom-0 left-1/2 z-10 -translate-x-1/2 translate-y-1/2 rounded-full border-2 border-primary/70 bg-bg shadow-[0_0_0_3px_rgb(5_5_5/0.9)]",
              dense ? "size-2 border-primary" : compact ? "size-2.5 border-primary" : "size-2.5 lg:size-3",
            )}
          />
        ) : null}

        <span className="sr-only">{`Step ${step}: ${label}`}</span>
      </article>
    );
  },
);
