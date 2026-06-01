/**
 * Countdown / time utilities for the urgency system (04-conversion).
 * Pure functions — no DOM, no timers — so they're testable and SSR-safe.
 * The ticking hook that consumes these is a client concern built in a later phase.
 */

export interface TimeRemaining {
  total: number; // milliseconds remaining (0 if elapsed)
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

/** Compute time remaining from `now` until `target`. */
export function getTimeRemaining(target: Date, now: Date = new Date()): TimeRemaining {
  const total = Math.max(0, target.getTime() - now.getTime());
  const expired = total <= 0;

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { total, days, hours, minutes, seconds, expired };
}

/** Zero-pad a number to two digits for timer display. */
export function pad2(value: number): string {
  return value.toString().padStart(2, "0");
}
