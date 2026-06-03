import { EventPrice, Pill } from "@/components/ui";
import { event } from "@/content/event";
import { cn } from "@/lib/utils";

/**
 * EventMeta — the at-a-glance facts (date, time, duration, mode + price).
 * Sourced from content/event (single source of truth, 01-project). Conversion: the
 * essentials are visible immediately (04-conversion). Thin monochrome icons (03).
 */

const iconClass = "size-4";

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={iconClass}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={iconClass}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BroadcastIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={iconClass}>
      <circle cx="12" cy="12" r="2.5" />
      <path d="M6.5 6.5a8 8 0 0 0 0 11M17.5 6.5a8 8 0 0 1 0 11M9 9a4 4 0 0 0 0 6M15 9a4 4 0 0 1 0 6" strokeLinecap="round" />
    </svg>
  );
}

type EventMetaProps = { className?: string };

export function EventMeta({ className }: EventMetaProps) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-3", className)}>
      <li>
        <Pill icon={<CalendarIcon />}>{event.schedule.datePill}</Pill>
      </li>
      <li>
        <Pill icon={<ClockIcon />}>{event.schedule.timePill}</Pill>
      </li>
      <li>
        <Pill icon={<BroadcastIcon />}>{event.mode}</Pill>
      </li>
      <li>
        <Pill emphasis>
          <EventPrice size="sm" />
        </Pill>
      </li>
    </ul>
  );
}
