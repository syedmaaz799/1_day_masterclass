/**
 * Event facts — THE single source of truth (01-project).
 * Never duplicate date/time/price elsewhere; import from here.
 * All times are IST (Asia/Kolkata, UTC+05:30).
 */

export const event = {
  brand: "NeuralVarsity",
  series: "Agentic AI Masterclass",
  title: "Build Your First AI Employee",
  subtitle:
    "Learn how to build AI Agents that automate real business tasks without writing code.",
  heroSubheadline:
    "Discover how to create AI Agents that generate leads, automate communication, and perform real business tasks without coding.",

  // June 7, 2026, 2:00 PM IST → 08:30 UTC. Stored as an absolute instant.
  startsAt: new Date("2026-06-07T14:00:00+05:30"),
  endsAt: new Date("2026-06-07T17:00:00+05:30"),
  timezone: "Asia/Kolkata",
  timezoneLabel: "IST",

  durationHours: 3,
  mode: "Live Online Masterclass",

  priceInINR: 109,

  // Seats remaining is config-driven, never random (04-conversion).
  // Wire to real inventory in a later phase; this is the controlled fallback.
  seatsTotal: 500,
  seatsRemaining: 137,

  cta: {
    primary: "Reserve My Seat",
    primaryWithPrice: "Reserve My Seat for ₹109",
    secondary: "Watch Demo",
  },
} as const;

export type EventData = typeof event;
