import { z } from "zod";

/**
 * Environment configuration — validated once at module load.
 * Source of truth: .cursor/rules/12-coding-standards.mdc (validate external data).
 *
 * Server-only secrets must NOT be prefixed with NEXT_PUBLIC_.
 * Anything the browser needs MUST be prefixed NEXT_PUBLIC_ and is safe to expose.
 */

const clientSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_ANALYTICS_ENABLED: z
    .enum(["true", "false"])
    .default("false")
    .transform((v) => v === "true"),
});

const serverSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  // Payment + persistence credentials are wired in a later phase.
  // Declared here so the contract is explicit; optional until integrated.
  PAYMENT_PROVIDER_KEY: z.string().optional(),
  PAYMENT_PROVIDER_SECRET: z.string().optional(),
  DATABASE_URL: z.string().optional(),
});

function formatIssues(error: z.ZodError): string {
  return error.issues
    .map((i) => `  - ${i.path.join(".") || "(root)"}: ${i.message}`)
    .join("\n");
}

const parsedClient = clientSchema.safeParse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_ANALYTICS_ENABLED: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED,
});

if (!parsedClient.success) {
  throw new Error(
    `Invalid client environment variables:\n${formatIssues(parsedClient.error)}`,
  );
}

const parsedServer = serverSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  PAYMENT_PROVIDER_KEY: process.env.PAYMENT_PROVIDER_KEY,
  PAYMENT_PROVIDER_SECRET: process.env.PAYMENT_PROVIDER_SECRET,
  DATABASE_URL: process.env.DATABASE_URL,
});

if (!parsedServer.success) {
  throw new Error(
    `Invalid server environment variables:\n${formatIssues(parsedServer.error)}`,
  );
}

/** Browser-safe environment values. */
export const clientEnv = parsedClient.data;

/** Server-only environment values. Never import this into a client component. */
export const serverEnv = parsedServer.data;

export const isProduction = parsedServer.data.NODE_ENV === "production";
