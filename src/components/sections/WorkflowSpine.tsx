"use client";

import { useRef } from "react";
import { Container } from "@/components/ui";
import { useStoryProgress } from "@/components/motion";
import { workflow } from "@/content/workflow";

/**
 * WorkflowSpine — the persistent "one connected system" layer for Section 4. It is
 * rendered ONCE (not per stage), so as the step details crossfade, the chain itself
 * stays put: a single accent line grows top-to-bottom and nodes light up in sequence,
 * driven by the smoothed story progress. This is what turns six screens into one flow.
 *
 * aria-hidden: it's a visual index of the steps, which are already read in full from the
 * crossfading StoryStage details. Desktop only; under reduced motion it renders nothing
 * (the stacked details carry the narrative). No per-frame React renders.
 */

const N = workflow.length;

export function WorkflowSpine() {
  const fillRef = useRef<HTMLSpanElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const reduced = useStoryProgress((p) => {
    const fill = fillRef.current;
    if (fill) fill.style.transform = `scaleY(${p})`;

    const active = Math.round(p * (N - 1));
    for (let i = 0; i < N; i++) {
      const on = i <= active;
      const dot = dotRefs.current[i];
      if (dot) {
        dot.classList.toggle("bg-accent", on);
        dot.classList.toggle("bg-text-2/30", !on);
        dot.classList.toggle("scale-125", i === active);
      }
      const label = labelRefs.current[i];
      if (label) {
        label.classList.toggle("text-text", on);
        label.classList.toggle("text-text-2/45", !on);
      }
    }
  });

  if (reduced) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden items-center lg:flex">
      <Container className="w-full">
        <div className="grid grid-cols-12">
          <div className="col-span-4 col-start-9">
            <ol className="relative flex flex-col gap-7">
              <span className="absolute left-[5px] top-3 bottom-3 w-px bg-white/10" />
              <span
                ref={fillRef}
                className="absolute left-[5px] top-3 bottom-3 w-px origin-top bg-accent"
                style={{ transform: "scaleY(0)" }}
              />
              {workflow.map((step, i) => (
                <li key={step.id} className="relative flex items-center gap-4">
                  <span
                    ref={(el) => {
                      dotRefs.current[i] = el;
                    }}
                    className="relative z-10 size-2.5 shrink-0 rounded-full bg-text-2/30 transition-transform duration-300"
                  />
                  <span
                    ref={(el) => {
                      labelRefs.current[i] = el;
                    }}
                    className="font-sans text-body text-text-2/45"
                  >
                    {step.label}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </div>
  );
}
