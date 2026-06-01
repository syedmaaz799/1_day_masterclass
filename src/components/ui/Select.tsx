"use client";

import type { ReactNode, Ref, SelectHTMLAttributes } from "react";
import {
  cn,
  controlBase,
  describedBy,
  FieldError,
  FieldHint,
  FieldLabel,
  useFieldIds,
} from "@/components/ui/field";

/**
 * Select — accessible native select (09-forms/11-accessibility require a real,
 * keyboard-operable control). Styled with a custom chevron; options via `options`
 * or children. Primitive only — no form logic.
 */

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "ref"> & {
  label: string;
  options?: readonly SelectOption[];
  placeholder?: string;
  hint?: ReactNode;
  error?: ReactNode;
  hideLabel?: boolean;
  ref?: Ref<HTMLSelectElement>;
};

export function Select({
  id,
  label,
  options,
  placeholder,
  hint,
  error,
  hideLabel = false,
  required,
  disabled,
  defaultValue,
  className,
  children,
  ref,
  ...rest
}: SelectProps) {
  const ids = useFieldIds(id);
  const hasError = Boolean(error);
  const hasHint = Boolean(hint);

  return (
    <div className="w-full">
      <div className={cn(hideLabel && "sr-only")}>
        <FieldLabel htmlFor={ids.id} required={required}>
          {label}
        </FieldLabel>
      </div>
      <div className="relative">
        <select
          ref={ref}
          id={ids.id}
          required={required}
          disabled={disabled}
          defaultValue={defaultValue ?? (placeholder ? "" : undefined)}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy(ids, hasHint, hasError)}
          className={cn(controlBase, "h-12 appearance-none pl-4 pr-10", className)}
          {...rest}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
          {children}
        </select>
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-text-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="m4 6 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {hasError ? (
        <FieldError id={ids.errorId}>{error}</FieldError>
      ) : hasHint ? (
        <FieldHint id={ids.hintId}>{hint}</FieldHint>
      ) : null}
    </div>
  );
}
