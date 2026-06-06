import { z } from "zod";
import { currentRoles } from "@/content/current-roles";
import {
  defaultPhoneCountryCode,
  dialCodeForCountry,
  phoneCountries,
} from "@/content/phone-countries";

/**
 * Validation architecture — shared schemas for client + server (09-forms, 12-coding-standards).
 * Single source of truth for the registration and feedback contracts.
 */

export const experienceLevels = [
  "Beginner",
  "Intermediate",
  "Advanced",
] as const;
export type ExperienceLevel = (typeof experienceLevels)[number];

const phoneCountryCodes = phoneCountries.map((c) => c.code) as [string, ...string[]];

/** Registration form — five fields (09-forms). */
export const registrationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(80, "That name is too long."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid email so we can send your link."),
  phoneCountry: z.enum(phoneCountryCodes, {
    message: "Select a country code.",
  }),
  phoneNumber: z
    .string()
    .trim()
    .min(6, "Enter a valid phone number.")
    .max(15, "Enter a valid phone number.")
    .regex(/^[0-9\s()-]+$/, "Enter a valid phone number."),
  city: z.string().trim().max(80, "That city name is too long."),
  currentRole: z.enum(currentRoles, {
    message: "Select your current role.",
  }),
});
export type RegistrationInput = z.infer<typeof registrationSchema>;

/** E.164-style full number for APIs (country dial + national number). */
export function formatRegistrationPhone(data: RegistrationInput): string {
  const dial = dialCodeForCountry(data.phoneCountry);
  const national = data.phoneNumber.replace(/\D/g, "");
  return `${dial}${national}`;
}

/** Post-registration feedback survey (09-forms / FeedbackSection). */
export const feedbackSchema = z.object({
  heardFrom: z.string().trim().max(200).optional(),
  hopingToLearn: z.string().trim().max(500).optional(),
  currentRole: z.string().trim().max(120).optional(),
  aiExperienceLevel: z.enum(experienceLevels).optional(),
  biggestChallenge: z.string().trim().max(500).optional(),
});
export type FeedbackInput = z.infer<typeof feedbackSchema>;

/** Helper: flatten a ZodError into field → message for form rendering. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !(key in out)) {
      out[key] = issue.message;
    }
  }
  return out;
}

export { defaultPhoneCountryCode };
