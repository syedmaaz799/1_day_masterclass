"use client";

import { useRef } from "react";
import { useStoryProgress } from "@/components/motion";
import { WorkflowEdge } from "@/components/workflow-demo/WorkflowEdge";
import { WorkflowNodeCard } from "@/components/workflow-demo/WorkflowNodeCard";
import { workflowNodes } from "@/content/workflow-demo";
import { workflowNodeVisuals } from "@/content/workflow-node-meta";

const N = workflowNodes.length;

function applyNodeState(
  el: HTMLElement,
  state: "hidden" | "dim" | "preview" | "active" | "complete",
) {
  const visible = state !== "hidden";
  const opacity =
    state === "hidden"
      ? 0
      : state === "dim"
        ? 0.32
        : state === "preview"
          ? 0.45
          : state === "complete"
            ? 0.7
            : 1;

  el.style.opacity = String(opacity);
  el.style.visibility = visible ? "visible" : "hidden";
  el.style.transform = state === "active" ? "scale(1)" : "scale(0.98)";
  el.classList.toggle("border-primary/55", state === "active");
  el.classList.toggle("workflow-node--active", state === "active");
  el.classList.toggle("border-white/10", state !== "active");
}

/**
 * Mobile — all nodes visible in a dense vertical chain; explanation sits below
 * in the same pinned viewport (see WorkflowDemoSection).
 */
export function WorkflowDiagramMobile() {
  const edgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nodeRefs = useRef<(HTMLElement | null)[]>([]);

  useStoryProgress((p) => {
    const progressNodes = p * N;
    const revealed = Math.min(N, Math.floor(progressNodes) + 1);
    const frac = progressNodes - Math.floor(progressNodes);

    for (let i = 0; i < N; i++) {
      const node = nodeRefs.current[i];
      if (!node) continue;

      const isPast = i < revealed - 1;
      const isActive = i === revealed - 1;
      const isNext = i === revealed && revealed < N;

      let state: "hidden" | "dim" | "preview" | "active" | "complete" = "dim";
      if (isPast) state = "complete";
      else if (isActive) state = "active";
      else if (isNext) state = "preview";

      applyNodeState(node, state);
    }

    for (let i = 0; i < N - 1; i++) {
      const edge = edgeRefs.current[i];
      if (!edge) continue;

      const draw =
        revealed > i + 1 ? 1 : revealed === i + 1 ? Math.min(1, Math.max(0, frac)) : 0;

      const line = edge.querySelector<HTMLElement>("[data-edge-line]");
      const track = edge.querySelector<HTMLElement>("[data-edge-track]");
      if (line) {
        line.style.transform = `scaleY(${draw})`;
        line.style.opacity = draw > 0 ? "1" : "0";
      }
      if (track) {
        track.style.opacity = revealed > i ? "1" : "0.45";
      }
    }
  });

  return (
    <div className="relative shrink-0 rounded-md border border-white/8 bg-bg/40 px-2 py-2">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-md opacity-30"
        style={{
          backgroundImage: "radial-gradient(rgb(255 255 255 / 0.07) 1px, transparent 1px)",
          backgroundSize: "10px 10px",
        }}
      />
      <ol className="relative flex flex-col items-stretch">
        {workflowNodes.map((node, i) => {
          const visual = workflowNodeVisuals[node.id];
          if (!visual) return null;
          return (
            <li key={node.id} className="flex flex-col items-center">
              <WorkflowNodeCard
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
                label={node.label}
                step={i + 1}
                visual={visual}
                isFirst={i === 0}
                isLast={i === N - 1}
                compact
                dense
              />
              {i < N - 1 ? (
                <WorkflowEdge
                  ref={(el) => {
                    edgeRefs.current[i] = el;
                  }}
                  compact
                  dense
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
