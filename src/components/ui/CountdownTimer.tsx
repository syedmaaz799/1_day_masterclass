"use client";

import { useEffect, useRef, useState } from "react";
import { getTimeRemaining, pad2, type TimeRemaining } from "@/lib/countdown";
import { cn } from "@/lib/utils";

/**
 * CountdownTimer — urgency primitive (04-conversion).
 * Accessibility (11): ticking digits are aria-hidden; a polite live region
 * announces remaining time at minute granularity (never per-second spam), and a
 * static sr-only label states the absolute start time. SSR-safe (renders
 * placeholders until mounted to avoid hydration mismatch).
 */

const sizes = {
  md: { num: "text-[2rem] md:text-[2.75rem]", gap: "gap-3 md:gap-4", sep: "px-1 md:px-2" },
  lg: {
    num: "text-[2.25rem] sm:text-[2.75rem] md:text-[3.25rem] lg:text-[3.75rem]",
    gap: "gap-2 sm:gap-3 md:gap-5 lg:gap-6",
    sep: "px-0.5 sm:px-1 md:px-2",
  },
} as const;

type CountdownTimerProps = {
  target: Date;
  size?: keyof typeof sizes;
  /** Accessible description of what the countdown is for. */
  ariaLabel?: string;
  onExpire?: () => void;
  className?: string;
};

const UNITS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

function announce(t: TimeRemaining): string {
  if (t.expired) return "The event has started.";
  return `${t.days} days, ${t.hours} hours and ${t.minutes} minutes remaining.`;
}

/**
 * Deterministic absolute-start label. `dateStyle`/`timeStyle` insert separators whose
 * punctuation varies between the server's ICU (Node) and the browser's, which causes a
 * hydration mismatch. Joining only the meaningful parts with our own separators makes
 * the output identical across environments.
 */
function formatStart(target: Date): string {
  const parts = new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  }).formatToParts(target);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";
  return `${get("weekday")}, ${get("day")} ${get("month")} ${get("year")} at ${get(
    "hour",
  )}:${get("minute")} ${get("dayPeriod").toLowerCase()}`;
}

export function CountdownTimer({
  target,
  size = "md",
  ariaLabel = "Time remaining until the event",
  onExpire,
  className,
}: CountdownTimerProps) {
  const [remaining, setRemaining] = useState<TimeRemaining | null>(null);
  const [liveText, setLiveText] = useState("");
  const lastMinute = useRef<number | null>(null);
  const firedExpire = useRef(false);

  useEffect(() => {
    const tick = () => {
      const t = getTimeRemaining(target);
      setRemaining(t);

      if (lastMinute.current !== t.minutes) {
        lastMinute.current = t.minutes;
        setLiveText(announce(t));
      }
      if (t.expired && !firedExpire.current) {
        firedExpire.current = true;
        onExpire?.();
      }
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target, onExpire]);

  const s = sizes[size];
  const values: Record<string, number> = {
    days: remaining?.days ?? 0,
    hours: remaining?.hours ?? 0,
    minutes: remaining?.minutes ?? 0,
    seconds: remaining?.seconds ?? 0,
  };

  return (
    <div
      className={cn(
        "flex max-w-full flex-wrap items-start justify-center",
        s.gap,
        className,
      )}
      role="group"
      aria-label={ariaLabel}
    >
      <span className="sr-only">{formatStart(target)}</span>
      <span aria-live="polite" className="sr-only">
        {liveText}
      </span>

      {UNITS.map((unit, i) => (
        <div key={unit.key} className="flex items-start" aria-hidden>
          <div className="flex flex-col items-center">
            <span
              className={cn(
                "font-display font-semibold tabular-nums leading-none text-text",
                s.num,
              )}
            >
              {remaining ? pad2(values[unit.key] ?? 0) : "--"}
            </span>
            <span className="mt-2 font-sans text-overline uppercase text-text-2">
              {unit.label}
            </span>
          </div>
          {i < UNITS.length - 1 ? (
            <span
              className={cn(
                "font-display font-semibold leading-none text-text-2/40",
                s.num,
                s.sep,
              )}
            >
              :
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
