"use client";

import { useMemo, useRef, useState } from "react";
import { ScrollStory, useStoryProgress } from "@/components/motion";
import { useIsLgUp } from "@/components/motion/use-media-query";
import { Caption, Eyebrow, Body, Card } from "@/components/ui";
import { RadialOrbitalTimeline } from "@/components/workflow-demo/RadialOrbitalTimeline";
import { WorkflowDemoHeader } from "@/components/workflow-demo/WorkflowDemoHeader";
import {
  agentTimelineData,
  buildWorkflowTimelineData,
} from "@/components/workflow-demo/workflow-timeline-data";
import {
  scrollProgressToActiveIndex,
  WORKFLOW_ORBIT_STAGE_COUNT,
} from "@/components/workflow-demo/workflow-scroll-progress";

const N = agentTimelineData.length;
/** More scroll per beat so orbit centering and card open/close are easy to follow. */
const STAGE_VH = 115;

const WORKFLOW_ORBIT_STICKY =
  "sticky top-[var(--nav-h)] z-10 flex h-[calc(100dvh-var(--nav-h))] max-h-[calc(100dvh-var(--nav-h))] flex-col overflow-hidden bg-transparent";

function OrbitalReducedList() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-8">
      <Eyebrow tone="accent" withRule>
        Agent pipeline
      </Eyebrow>
      <Body size="lg" className="text-text-2">
        Each node in the orbit, in order.
      </Body>
      {agentTimelineData.map((item, i) => (
        <Card key={item.id} padding="md" className="border-white/10">
          <p className="font-sans text-overline uppercase text-text-2">
            {`Step ${i + 1} of ${N}`}
          </p>
          <p className="mt-2 font-display text-h3 text-text">{item.title}</p>
          <Body size="lg" className="mt-2 text-text-2">
            {item.content}
          </Body>
        </Card>
      ))}
    </div>
  );
}

function scrollHint(activeIndex: number | null): string {
  if (activeIndex === null) {
    return "Scroll down to open the first node";
  }
  if (activeIndex < N - 1) {
    return "Scroll down for the next node · scroll up to go back";
  }
  return "Scroll down to continue to the next section · scroll up to review nodes";
}

function OrbitalScrollExperience() {
  const isLgUp = useIsLgUp();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeIndexRef = useRef<number | null>(null);
  const timelineData = useMemo(() => buildWorkflowTimelineData(), []);

  const reduced = useStoryProgress((p) => {
    const next = scrollProgressToActiveIndex(p, activeIndexRef.current);
    if (next !== activeIndexRef.current) {
      activeIndexRef.current = next;
      setActiveIndex(next);
    }
  });

  if (reduced) {
    return <OrbitalReducedList />;
  }

  return (
    <div className="flex h-full min-h-0 flex-col px-4 py-4 pb-20 lg:px-6 lg:py-5 lg:pb-5">
      <WorkflowDemoHeader
        variant={isLgUp ? "pinned" : "compact"}
        className="relative z-10 mx-auto w-full max-w-2xl shrink-0 pb-2 lg:pb-4"
      />

      <div className="flex min-h-0 flex-1 items-center justify-center">
        <RadialOrbitalTimeline
          timelineData={timelineData}
          activeIndex={activeIndex}
          scrollControlled
          className="h-full w-full min-h-0 max-h-full"
        />
      </div>

      <Caption as="p" className="mt-2 shrink-0 text-center text-text-2 lg:mt-3">
        {scrollHint(activeIndex)}
      </Caption>
    </div>
  );
}

export function WorkflowOrbitalScrollView() {
  return (
    <div id="workflow-orbital" className="relative w-full scroll-mt-[var(--nav-h)]">
      <ScrollStory
        stageCount={WORKFLOW_ORBIT_STAGE_COUNT}
        stageVh={STAGE_VH}
        scrubSeconds={2.25}
        scrollStoryTrack="workflow"
        trackId="workflow-demo-track"
        skipEntryFade
        pin
        stickyClassName={WORKFLOW_ORBIT_STICKY}
      >
        <OrbitalScrollExperience />
      </ScrollStory>
    </div>
  );
}
