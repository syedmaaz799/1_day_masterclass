import { z } from "zod";

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

/** Registration form — exactly the five approved fields (09-forms). */
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
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number.")
    .max(20, "Enter a valid phone number.")
    .regex(/^[+0-9\s()-]+$/, "Enter a valid phone number."),
  organization: z
    .string()
    .trim()
    .min(2, "Tell us your college or company.")
    .max(120, "That name is too long."),
  experienceLevel: z.enum(experienceLevels, {
    message: "Select your experience level.",
  }),
});
export type RegistrationInput = z.infer<typeof registrationSchema>;

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
