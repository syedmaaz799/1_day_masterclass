"use client";

import {
  useState,
  useEffect,
  useRef,
  useSyncExternalStore,
  useLayoutEffect,
  type ComponentType,
  type MouseEvent,
} from "react";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { OrbitalNodeDetailCard } from "@/components/workflow-demo/OrbitalNodeDetailCard";
import { cn } from "@/lib/utils";

export type TimelineStatus = "completed" | "in-progress" | "pending";

export type TimelineItem = {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  relatedIds: number[];
  status: TimelineStatus;
  energy: number;
};

type RadialOrbitalTimelineProps = {
  timelineData: TimelineItem[];
  className?: string;
  /**
   * Scroll-driven: `null` = orbit only (intro); `0..n-1` = that node active.
   * Same open/close transition as click; scrolling up reverses the sequence.
   */
  activeIndex?: number | null;
  scrollControlled?: boolean;
};

/** Desktop design canvas — orbit scales down uniformly on smaller viewports. */
const ORBIT_RADIUS = 200;
const ORBIT_RING_PX = 384;
const ORBIT_DESIGN_SIZE = 520;

function statusLabel(status: TimelineStatus): string {
  switch (status) {
    case "completed":
      return "COMPLETE";
    case "in-progress":
      return "IN PROGRESS";
    default:
      return "PENDING";
  }
}

function rotationForIndex(index: number, total: number): number {
  const targetAngle = (index / total) * 360;
  return Number((270 - targetAngle).toFixed(3));
}

function expandedMapForId(
  id: number | null,
  data: TimelineItem[],
): Record<number, boolean> {
  const map: Record<number, boolean> = {};
  if (id === null) return map;
  data.forEach((item) => {
    map[item.id] = item.id === id;
  });
  return map;
}

function pulseMapForId(
  id: number | null,
  data: TimelineItem[],
): Record<number, boolean> {
  if (id === null) return {};
  const item = data.find((i) => i.id === id);
  if (!item) return {};
  const pulses: Record<number, boolean> = {};
  item.relatedIds.forEach((relId) => {
    pulses[relId] = true;
  });
  return pulses;
}

export function RadialOrbitalTimeline({
  timelineData,
  className,
  activeIndex = null,
  scrollControlled = false,
}: RadialOrbitalTimelineProps) {
  const reducedMotion = usePrefersReducedMotion();
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState(0);
  const [manualAutoRotate, setManualAutoRotate] = useState(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [orbitScale, setOrbitScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const scrollActiveId =
    scrollControlled && activeIndex != null
      ? (timelineData[activeIndex]?.id ?? null)
      : null;

  const displayActiveId = scrollControlled ? scrollActiveId : activeNodeId;
  const displayExpanded = scrollControlled
    ? expandedMapForId(scrollActiveId, timelineData)
    : expandedItems;
  const displayPulse = scrollControlled
    ? pulseMapForId(scrollActiveId, timelineData)
    : pulseEffect;
  const displayRotation =
    scrollControlled && activeIndex != null
      ? rotationForIndex(activeIndex, timelineData.length)
      : rotationAngle;

  const autoRotate =
    manualAutoRotate &&
    !reducedMotion &&
    (scrollControlled ? activeIndex === null : activeNodeId === null);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      const fit = Math.min(1, width / ORBIT_DESIGN_SIZE, height / ORBIT_DESIGN_SIZE);
      setOrbitScale(Number(fit.toFixed(3)));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [isMounted]);

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const centerViewOnNode = (nodeId: number) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    if (nodeIndex < 0) return;
    setRotationAngle(rotationForIndex(nodeIndex, timelineData.length));
  };

  const activateNode = (id: number) => {
    setExpandedItems(expandedMapForId(id, timelineData));
    setActiveNodeId(id);
    setManualAutoRotate(false);
    setPulseEffect(pulseMapForId(id, timelineData));
    centerViewOnNode(id);
  };

  const handleContainerClick = (e: MouseEvent<HTMLDivElement>) => {
    if (scrollControlled) return;
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      if (!reducedMotion) setManualAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    if (scrollControlled) return;

    const wasOpen = expandedItems[id];
    if (wasOpen) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      if (!reducedMotion) setManualAutoRotate(true);
      return;
    }

    activateNode(id);
  };

  useEffect(() => {
    if (!isMounted || !autoRotate) {
      return;
    }

    const rotationTimer = setInterval(() => {
      setRotationAngle((prev) => {
        const newAngle = (prev + 0.3) % 360;
        return Number(newAngle.toFixed(3));
      });
    }, 50);

    return () => clearInterval(rotationTimer);
  }, [autoRotate, isMounted]);

  const roundStyle = (value: number, decimals = 3) => Number(value.toFixed(decimals));

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + displayRotation) % 360;
    const radian = (angle * Math.PI) / 180;

    const x = roundStyle(ORBIT_RADIUS * Math.cos(radian));
    const y = roundStyle(ORBIT_RADIUS * Math.sin(radian));

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = roundStyle(Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))));

    return { x, y, zIndex, opacity };
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!displayActiveId) return false;
    return getRelatedItems(displayActiveId).includes(itemId);
  };

  const activeItem =
    displayActiveId != null
      ? timelineData.find((i) => i.id === displayActiveId)
      : null;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex w-full flex-col items-center justify-center overflow-hidden",
        !scrollControlled && "min-h-[min(80svh,720px)] rounded-lg border border-white/8 bg-bg/40",
        className,
      )}
      onClick={handleContainerClick}
      role="presentation"
    >
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {activeItem ? `${activeItem.title}. ${activeItem.content}` : ""}
      </div>

      <div
        className={cn(
          "relative flex h-full min-h-0 w-full max-w-4xl items-center justify-center",
          scrollControlled ? "py-4 lg:py-10" : "min-h-[inherit] py-10",
        )}
      >
        <div
          ref={orbitRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{ perspective: "1000px" }}
        >
          <div
            className="relative flex items-center justify-center"
            style={{
              width: ORBIT_DESIGN_SIZE,
              height: ORBIT_DESIGN_SIZE,
              transform: `scale(${orbitScale})`,
              transformOrigin: "center center",
            }}
          >
            <div
              className="absolute left-1/2 top-1/2 z-10 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-primary via-primary/80 to-accent animate-[nv-core-breathe_7s_ease-in-out_infinite]"
              aria-hidden
            >
              {!reducedMotion ? (
                <>
                  <div className="absolute size-20 rounded-full border border-white/20 opacity-70 animate-ping" />
                  <div
                    className="absolute size-24 rounded-full border border-white/10 opacity-50 animate-ping"
                    style={{ animationDelay: "0.5s" }}
                  />
                </>
              ) : null}
              <div className="size-8 rounded-full bg-white/80 backdrop-blur-md" />
            </div>

            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
              style={{ width: ORBIT_RING_PX, height: ORBIT_RING_PX }}
              aria-hidden
            />

            {isMounted &&
              timelineData.map((item, index) => {
                const position = calculateNodePosition(index, timelineData.length);
                const isExpanded = displayExpanded[item.id];
                const isRelated = isRelatedToActive(item.id);
                const isPulsing = displayPulse[item.id];
                const Icon = item.icon;

                return (
                  <div
                    key={item.id}
                    ref={(el) => {
                      nodeRefs.current[item.id] = el;
                    }}
                    className={cn(
                      "absolute left-1/2 top-1/2 transition-all",
                      scrollControlled ? "duration-[1200ms] ease-out-expo" : "duration-700",
                      scrollControlled ? "pointer-events-none" : "cursor-pointer",
                    )}
                    style={{
                      transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
                      zIndex: isExpanded ? 200 : position.zIndex,
                      opacity: isExpanded ? 1 : position.opacity,
                    }}
                    onClick={
                      scrollControlled
                        ? undefined
                        : (e) => {
                            e.stopPropagation();
                            toggleItem(item.id);
                          }
                    }
                    onKeyDown={
                      scrollControlled
                        ? undefined
                        : (e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleItem(item.id);
                            }
                          }
                    }
                    role={scrollControlled ? undefined : "button"}
                    tabIndex={scrollControlled ? undefined : 0}
                    aria-expanded={scrollControlled ? undefined : isExpanded}
                    aria-label={
                      scrollControlled
                        ? undefined
                        : `${item.title}, ${statusLabel(item.status)}`
                    }
                  >
                    <div
                      aria-hidden
                      className={cn(
                        "absolute -inset-1 rounded-full",
                        isPulsing && "animate-pulse duration-1000",
                      )}
                      style={{
                        background:
                          "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
                        width: `${item.energy * 0.5 + 40}px`,
                        height: `${item.energy * 0.5 + 40}px`,
                        left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                        top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                      }}
                    />

                    <div
                      className={cn(
                        "flex size-10 items-center justify-center rounded-full border-2 transition-all",
                        scrollControlled ? "duration-[600ms]" : "duration-300",
                        isExpanded
                          ? "scale-150 border-white bg-white text-bg shadow-lg shadow-white/30"
                          : isRelated
                            ? "border-white bg-white/50 text-bg animate-pulse"
                            : "border-white/40 bg-bg text-text",
                      )}
                    >
                      <Icon size={16} />
                    </div>

                    <div
                      className={cn(
                        "absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap font-sans text-xs font-semibold tracking-wider transition-all",
                        scrollControlled ? "duration-[600ms]" : "duration-300",
                        isExpanded ? "scale-125 text-text" : "text-text-2",
                      )}
                    >
                      {item.title}
                    </div>

                    {isExpanded ? (
                      <OrbitalNodeDetailCard
                        item={item}
                        timelineData={timelineData}
                        scrollControlled={scrollControlled}
                        onSelectRelated={scrollControlled ? undefined : toggleItem}
                        showConnector
                        className="absolute top-20 left-1/2 z-[200] w-64 -translate-x-1/2 overflow-visible"
                      />
                    ) : null}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
