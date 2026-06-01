"use client";

import type { InputHTMLAttributes, ReactNode, Ref } from "react";
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
 * Input — accessible text field primitive (09-forms, 11-accessibility).
 * Real <label>, programmatic hint/error association, invalid announcement.
 * This is a primitive only — no form/submit logic lives here.
 */

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "ref"> & {
  label: string;
  hint?: ReactNode;
  error?: ReactNode;
  /** Visually hide the label (still read by AT). */
  hideLabel?: boolean;
  ref?: Ref<HTMLInputElement>;
};

export function Input({
  id,
  label,
  hint,
  error,
  hideLabel = false,
  required,
  disabled,
  className,
  ref,
  ...rest
}: InputProps) {
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
      <input
        ref={ref}
        id={ids.id}
        required={required}
        disabled={disabled}
        aria-invalid={hasError || undefined}
        aria-describedby={describedBy(ids, hasHint, hasError)}
        className={cn(controlBase, "h-12 px-4", className)}
        {...rest}
      />
      {hasError ? (
        <FieldError id={ids.errorId}>{error}</FieldError>
      ) : hasHint ? (
        <FieldHint id={ids.hintId}>{hint}</FieldHint>
      ) : null}
    </div>
  );
}
