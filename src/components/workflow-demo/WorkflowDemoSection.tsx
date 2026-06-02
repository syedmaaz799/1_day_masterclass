"use client";

import { useLayoutEffect, useState } from "react";
import { ScrollStory } from "@/components/motion";
import { useIsLgUp } from "@/components/motion/use-media-query";
import { ScrollTrigger } from "@/components/motion/gsap";
import { Container } from "@/components/ui";
import { WorkflowDemoGate } from "@/components/workflow-demo/WorkflowDemoGate";
import { workflowDemoSection, workflowNodes } from "@/content/workflow-demo";
import { WorkflowDiagram } from "@/components/workflow-demo/WorkflowDiagram";
import { WorkflowExplanationPanel } from "@/components/workflow-demo/WorkflowExplanationPanel";
import { WorkflowStepRail } from "@/components/workflow-demo/WorkflowStepRail";
import { WorkflowDemoHeader } from "@/components/workflow-demo/WorkflowDemoHeader";
import { scrollToWorkflowTrack } from "@/lib/scroll-to-demo";
import "@/components/workflow-demo/workflow-demo.css";

const WORKFLOW_STICKY_DESKTOP =
  "sticky top-[var(--nav-h)] z-10 flex h-[calc(100svh-var(--nav-h))] max-h-[calc(100svh-var(--nav-h))] flex-col overflow-hidden bg-transparent";

/** Mobile pinned viewport: header + rail + all nodes + explanation. */
const WORKFLOW_STICKY_MOBILE =
  "sticky top-[var(--nav-h)] z-10 flex h-[calc(100dvh-var(--nav-h))] max-h-[calc(100dvh-var(--nav-h))] flex-col overflow-hidden bg-transparent";

export function WorkflowDemoSection() {
  const [generated, setGenerated] = useState(false);
  const isLgUp = useIsLgUp();
  const stageVh = isLgUp ? 72 : 50;

  useLayoutEffect(() => {
    if (!generated) return;

    const alignTrack = () => {
      scrollToWorkflowTrack(0.75);
      ScrollTrigger.refresh();
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(alignTrack);
    });
  }, [generated]);

  useLayoutEffect(() => {
    if (!generated) return;
    ScrollTrigger.refresh();
  }, [generated, stageVh, isLgUp]);

  return (
    <section
      id="demo"
      aria-labelledby="workflow-demo-heading"
      className="relative scroll-mt-[var(--nav-h)]"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-bg/25 lg:bg-[linear-gradient(to_right,var(--color-bg)_0%,rgb(5_5_5/0.45)_24%,transparent_65%)]"
      />

      <Container className="relative py-16 sm:py-20 lg:py-section">
        {!generated ? (
          <>
            <WorkflowDemoHeader variant="full" />
            <WorkflowDemoGate onGenerate={() => setGenerated(true)} />
          </>
        ) : (
          <div className="mt-8 sm:mt-12 lg:mt-16">
              <ScrollStory
                stageCount={workflowNodes.length}
                stageVh={stageVh}
                scrollStoryTrack="workflow"
                trackId="workflow-demo-track"
                skipEntryFade
                pin={isLgUp}
                stickyClassName={
                  isLgUp ? WORKFLOW_STICKY_DESKTOP : WORKFLOW_STICKY_MOBILE
                }
              >
                {isLgUp ? (
                  <Container className="flex h-full min-h-0 flex-col py-4 lg:py-5">
                    <WorkflowDemoHeader
                      variant="pinned"
                      className="relative z-10 mx-auto w-full max-w-2xl shrink-0 pb-3 lg:pb-4"
                    />
                    <div className="grid min-h-0 flex-1 grid-cols-12 grid-rows-[minmax(0,1fr)] gap-6 overflow-hidden lg:gap-8 xl:gap-10">
                      <div className="col-span-12 flex min-h-0 max-h-full items-center justify-center overflow-hidden lg:col-span-5 xl:col-span-5">
                        <WorkflowDiagram />
                      </div>
                      <div className="col-span-12 flex min-h-0 min-w-0 flex-col lg:col-span-7 xl:col-span-7">
                        <div className="workflow-explanation-scroll min-h-0 flex-1 basis-0">
                          <div className="pb-8">
                            <WorkflowExplanationPanel />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Container>
                ) : (
                  <div className="grid h-full min-h-0 grid-rows-[auto_auto_auto_minmax(38%,1fr)] gap-2 px-4 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
                    <WorkflowDemoHeader
                      variant="compact"
                      className="shrink-0 border-b border-white/8 pb-2"
                    />
                    <WorkflowStepRail />
                    <WorkflowDiagram compact />
                    <div className="workflow-explanation-scroll min-h-0">
                      <WorkflowExplanationPanel compact />
                    </div>
                  </div>
                )}
              </ScrollStory>
          </div>
        )}
      </Container>
    </section>
  );
}
