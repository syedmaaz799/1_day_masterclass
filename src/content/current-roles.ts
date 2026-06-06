/**
 * Registration — current role select options ("Other" must remain last).
 */

export const currentRoles = [
  "Student",
  "Working professional",
  "Founder / Entrepreneur",
  "Freelancer",
  "Job seeker",
  "Other",
] as const;

export type CurrentRole = (typeof currentRoles)[number];
