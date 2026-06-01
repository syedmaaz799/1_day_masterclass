"use client";

import { useId } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Shared field internals for Input / Select / TextArea (09-forms, 11-accessibility).
 * Centralizes label/hint/error markup + id wiring so every control is labelled,
 * describes its hint/error, and announces invalid state consistently.
 */

export interface FieldIds {
  id: string;
  hintId: string;
  errorId: string;
}

/** Stable, SSR-safe ids for a field and its hint/error messages. */
export function useFieldIds(providedId?: string): FieldIds {
  const auto = useId();
  const id = providedId ?? auto;
  return { id, hintId: `${id}-hint`, errorId: `${id}-error` };
}

/** Compose aria-describedby from whichever messages are present. */
export function describedBy(
  ids: FieldIds,
  hasHint: boolean,
  hasError: boolean,
): string | undefined {
  const parts: string[] = [];
  if (hasError) parts.push(ids.errorId);
  else if (hasHint) parts.push(ids.hintId);
  return parts.length ? parts.join(" ") : undefined;
}

export function FieldLabel({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 inline-block font-sans text-caption font-medium text-text-2"
    >
      {children}
      {required ? (
        <span className="ml-1 text-danger" aria-hidden>
          *
        </span>
      ) : null}
    </label>
  );
}

export function FieldHint({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 font-sans text-caption text-text-2">
      {children}
    </p>
  );
}

export function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p
      id={id}
      role="alert"
      className="mt-2 flex items-center gap-1.5 font-sans text-caption text-danger"
    >
      <svg aria-hidden viewBox="0 0 16 16" className="size-3.5 shrink-0" fill="currentColor">
        <path d="M8 1.5 15 14H1L8 1.5Zm0 4.25a.75.75 0 0 0-.75.75v2.5a.75.75 0 0 0 1.5 0V6.5A.75.75 0 0 0 8 5.75Zm0 5.25a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8Z" />
      </svg>
      {children}
    </p>
  );
}

/** Shared control classes (input/select/textarea share the same shell). */
export const controlBase =
  "w-full rounded-md border border-white/10 bg-surface font-sans text-body text-text " +
  "placeholder:text-text-2/50 transition-colors duration-[var(--duration-ui)] " +
  "hover:border-white/20 focus:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary " +
  "aria-[invalid=true]:border-danger aria-[invalid=true]:focus:border-danger " +
  "disabled:cursor-not-allowed disabled:opacity-50";

export { cn };
