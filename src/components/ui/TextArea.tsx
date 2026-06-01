"use client";

import type { ReactNode, Ref, TextareaHTMLAttributes } from "react";
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
 * TextArea — accessible multiline field primitive (used by the feedback survey).
 * Same label/hint/error contract as Input. Primitive only — no form logic.
 */

type TextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "ref"> & {
  label: string;
  hint?: ReactNode;
  error?: ReactNode;
  hideLabel?: boolean;
  ref?: Ref<HTMLTextAreaElement>;
};

export function TextArea({
  id,
  label,
  hint,
  error,
  hideLabel = false,
  required,
  disabled,
  rows = 4,
  className,
  ref,
  ...rest
}: TextAreaProps) {
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
      <textarea
        ref={ref}
        id={ids.id}
        rows={rows}
        required={required}
        disabled={disabled}
        aria-invalid={hasError || undefined}
        aria-describedby={describedBy(ids, hasHint, hasError)}
        className={cn(controlBase, "resize-y px-4 py-3 leading-relaxed", className)}
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
