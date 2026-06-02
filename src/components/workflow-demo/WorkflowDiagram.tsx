"use client";

import { useRef } from "react";
import { useStoryProgress } from "@/components/motion";
import { WorkflowDiagramMobile } from "@/components/workflow-demo/WorkflowDiagramMobile";
import { WorkflowEdge } from "@/components/workflow-demo/WorkflowEdge";
import { WorkflowNodeCard } from "@/components/workflow-demo/WorkflowNodeCard";
import { workflowNodes } from "@/content/workflow-demo";
import { workflowNodeVisuals } from "@/content/workflow-node-meta";
import { cn } from "@/lib/utils";

const N = workflowNodes.length;

type WorkflowDiagramProps = {
  /** Mobile: single active node (see WorkflowDiagramMobile). */
  compact?: boolean;
};

function applyNodeState(
  el: HTMLElement,
  state: "hidden" | "dim" | "preview" | "active" | "complete",
) {
  const visible = state !== "hidden";
  const opacity =
    state === "hidden"
      ? 0
      : state === "dim"
        ? 0.28
        : state === "preview"
          ? 0.4
          : state === "complete"
            ? 0.82
            : 1;

  el.style.opacity = String(opacity);
  el.style.visibility = visible ? "visible" : "hidden";
  el.style.transform = state === "active" ? "scale(1)" : "scale(0.97)";
  el.style.pointerEvents = visible ? "auto" : "none";

  el.classList.toggle("border-primary/55", state === "active");
  el.classList.toggle("workflow-node--active", state === "active");
  el.classList.toggle("border-white/10", state !== "active");
  el.classList.toggle("bg-surface", true);
}

function WorkflowDiagramDesktop() {
  const edgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nodeRefs = useRef<(HTMLElement | null)[]>([]);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  const reduced = useStoryProgress((p) => {
    const progressNodes = p * N;
    const revealed = Math.min(N, Math.floor(progressNodes) + 1);
    const frac = progressNodes - Math.floor(progressNodes);

    for (let i = 0; i < N; i++) {
      const node = nodeRefs.current[i];
      const step = stepRefs.current[i];
      if (!node) continue;

      const isPast = i < revealed - 1;
      const isActive = i === revealed - 1;
      const isNext = i === revealed && revealed < N;

      let state: "hidden" | "dim" | "preview" | "active" | "complete" = "hidden";
      if (isPast) state = "complete";
      else if (isActive) state = "active";
      else if (isNext) state = "preview";
      else state = "hidden";

      if (step) {
        step.style.display = state === "hidden" ? "none" : "";
      }
      applyNodeState(node, state);
    }

    for (let i = 0; i < N - 1; i++) {
      const edge = edgeRefs.current[i];
      if (!edge) continue;

      const draw =
        revealed > i + 1 ? 1 : revealed === i + 1 ? Math.min(1, Math.max(0, frac)) : 0;

      const line = edge.querySelector<HTMLElement>("[data-edge-line]");
      const track = edge.querySelector<HTMLElement>("[data-edge-track]");
      const glow = edge.querySelector<HTMLElement>("[data-edge-glow]");

      if (line) {
        line.style.transform = `scaleY(${draw})`;
        line.style.opacity = draw > 0 ? "1" : "0";
      }
      if (track) {
        track.style.opacity = draw > 0 ? "1" : "0.5";
      }
      if (glow) {
        glow.style.opacity = draw > 0.15 && draw < 1 ? "1" : "0";
        glow.style.top = `${Math.max(8, draw * 100)}%`;
      }
      edge.style.opacity = "1";
    }
  });

  const canvasClass =
    "relative mx-auto w-full max-w-[20rem] lg:mx-0 lg:max-w-[26rem] xl:max-w-[28rem]";

  const gridBg = (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-lg opacity-40"
      style={{
        backgroundImage:
          "radial-gradient(rgb(255 255 255 / 0.07) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }}
    />
  );

  if (reduced) {
    return (
      <div className={cn(canvasClass, "rounded-lg border border-white/8 bg-bg/40 p-4")}>
        {gridBg}
        <ol className="relative flex flex-col gap-2">
          {workflowNodes.map((node, i) => {
            const visual = workflowNodeVisuals[node.id];
            if (!visual) return null;
            return (
              <li key={node.id} className="flex flex-col items-center">
                <WorkflowNodeCard
                  label={node.label}
                  step={i + 1}
                  visual={visual}
                  isFirst={i === 0}
                  isLast={i === N - 1}
                  className="border-primary/30"
                />
                {i < N - 1 ? <WorkflowEdge /> : null}
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

  return (
    <div className={cn(canvasClass, "rounded-lg border border-white/6 bg-bg/30 p-4 sm:p-5 lg:p-6")}>
      {gridBg}
      <ol className="relative flex flex-col items-center gap-0">
        {workflowNodes.map((node, i) => {
          const visual = workflowNodeVisuals[node.id];
          if (!visual) return null;

          return (
            <li
              key={node.id}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              className="flex w-full flex-col items-center"
              style={{ display: i > 1 ? "none" : undefined }}
            >
              <WorkflowNodeCard
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
                label={node.label}
                step={i + 1}
                visual={visual}
                isFirst={i === 0}
                isLast={i === N - 1}
                style={{
                  opacity: i === 0 ? 1 : 0,
                  visibility: i === 0 ? "visible" : "hidden",
                }}
              />
              {i < N - 1 ? (
                <WorkflowEdge
                  ref={(el) => {
                    edgeRefs.current[i] = el;
                  }}
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function WorkflowDiagram({ compact = false }: WorkflowDiagramProps) {
  if (compact) {
    return <WorkflowDiagramMobile />;
  }
  return <WorkflowDiagramDesktop />;
}
