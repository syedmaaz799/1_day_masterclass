import { clientEnv } from "@/lib/env";

/**
 * Typed analytics layer (single source of truth — 04-conversion).
 * RULE: never put PII in event props. We track the *event*, not field values.
 *
 * Transport is abstracted: noop/console until a provider is wired behind `track()`.
 */

export type AnalyticsEvent =
  | "hero_cta_click"
  | "secondary_cta_click"
  | "watch_demo_click"
  | "registration_form_focus"
  | "registration_field_completed"
  | "registration_submit"
  | "registration_success"
  | "registration_error"
  | "faq_toggle"
  | "scroll_depth_milestone"
  | "countdown_expired_view"
  | "feedback_submit";

/** Allowed, non-PII property values. */
export type AnalyticsProps = Record<
  string,
  string | number | boolean | null | undefined
>;

/** Registration field keys only — never values. */
export type RegistrationFieldKey =
  | "name"
  | "email"
  | "phone"
  | "organization"
  | "experienceLevel";

const PII_KEYS = new Set([
  "name",
  "email",
  "phone",
  "phonenumber",
  "fullname",
  "college",
  "company",
  "organization",
]);

function stripPii(props?: AnalyticsProps): AnalyticsProps | undefined {
  if (!props) return undefined;
  const safe: AnalyticsProps = {};
  for (const [key, value] of Object.entries(props)) {
    if (PII_KEYS.has(key.toLowerCase())) continue;
    safe[key] = value;
  }
  return safe;
}

/**
 * Track a conversion-relevant event.
 * Safe to call from anywhere; transport wiring happens in a later phase.
 */
export function track(event: AnalyticsEvent, props?: AnalyticsProps): void {
  const payload = stripPii(props);

  if (!clientEnv.NEXT_PUBLIC_ANALYTICS_ENABLED) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[analytics:noop]", event, payload ?? {});
    }
    return;
  }

  // TODO: integrate real analytics provider transport here (later phase).
}
