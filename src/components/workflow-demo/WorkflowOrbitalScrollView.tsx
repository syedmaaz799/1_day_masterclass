"use client";

import { useMemo, useRef, useState } from "react";
import { ScrollStory, useStoryProgress } from "@/components/motion";
import { useMediaQuery } from "@/components/motion/use-media-query";
import { Caption, Eyebrow, Body, Card } from "@/components/ui";
import { RadialOrbitalTimeline } from "@/components/workflow-demo/RadialOrbitalTimeline";
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
const STAGE_VH_DESKTOP = 115;
const STAGE_VH_MOBILE = 88;
const SCRUB_DESKTOP = 2.25;
const SCRUB_MOBILE = 0.2;

/** Header + orbit share one pinned column — no full-viewport vertical centering gap. */
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
    return (
      <div className="px-4 pt-4">
        <OrbitalReducedList />
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col px-2 pb-3 pt-1 sm:px-4 sm:pb-4">
      <div className="flex min-h-0 flex-1 items-center justify-center">
        <RadialOrbitalTimeline
          timelineData={timelineData}
          activeIndex={activeIndex}
          scrollControlled
          className="h-full w-full min-h-0 max-h-full"
        />
      </div>

      <Caption as="p" className="mt-1 shrink-0 text-center text-text-2">
        {scrollHint(activeIndex)}
      </Caption>
    </div>
  );
}

export function WorkflowOrbitalScrollView() {
  const coarsePointer = useMediaQuery("(pointer: coarse)", false);

  return (
    <div id="workflow-orbital" className="relative w-full scroll-mt-[var(--nav-h)]">
      <ScrollStory
        stageCount={WORKFLOW_ORBIT_STAGE_COUNT}
        stageVh={coarsePointer ? STAGE_VH_MOBILE : STAGE_VH_DESKTOP}
        scrubSeconds={coarsePointer ? SCRUB_MOBILE : SCRUB_DESKTOP}
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
