"use client";

import { useCallback, useId, useRef, useState } from "react";
import { Button, EventPrice, Input, Select } from "@/components/ui";
import {
  experienceLevels,
  fieldErrors,
  registrationSchema,
  type RegistrationInput,
} from "@/lib/validation";
import { track, type RegistrationFieldKey } from "@/lib/analytics";
import { formMicrocopy } from "@/content/registration";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "submitting" | "success" | "error";

const emptyValues: RegistrationInput = {
  name: "",
  email: "",
  phone: "",
  organization: "",
  experienceLevel: "Beginner",
};

type RegistrationFormProps = {
  /** Prefix for input ids when multiple forms exist on one page. */
  formId?: string;
  className?: string;
  /** Analytics source label (no PII). */
  source: "hero" | "registration";
};

export function RegistrationForm({ formId = "register", className, source }: RegistrationFormProps) {
  const liveId = useId();
  const statusId = `${formId}-status`;
  const focusedRef = useRef(false);
  const completedFields = useRef(new Set<RegistrationFieldKey>());

  const [values, setValues] = useState<RegistrationInput>(emptyValues);
  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationInput, string>>>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [formError, setFormError] = useState<string | null>(null);

  const markFieldComplete = useCallback((field: RegistrationFieldKey, valid: boolean) => {
    if (!valid || completedFields.current.has(field)) return;
    completedFields.current.add(field);
    track("registration_field_completed", { field, source });
  }, [source]);

  const onFirstFocus = useCallback(() => {
    if (focusedRef.current) return;
    focusedRef.current = true;
    track("registration_form_focus", { source });
  }, [source]);

  const validateField = useCallback(
    (field: keyof RegistrationInput) => {
      const result = registrationSchema.safeParse(values);
      if (result.success) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
        return true;
      }
      const fe = fieldErrors(result.error);
      const message = fe[field];
      setErrors((prev) => ({ ...prev, [field]: message }));
      return !message;
    },
    [values],
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const parsed = registrationSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      const firstKey = parsed.error.issues[0]?.path[0];
      if (typeof firstKey === "string") {
        document.getElementById(`${formId}-${firstKey}`)?.focus();
      }
      return;
    }

    setErrors({});
    setStatus("submitting");
    track("registration_submit", { source });

    try {
      // TODO: POST to payment/registration API (later phase).
      await new Promise((r) => setTimeout(r, 900));
      setStatus("success");
      track("registration_success", { source });
    } catch {
      setStatus("error");
      setFormError(formMicrocopy.errorBody);
      track("registration_error", { source });
    }
  };

  if (status === "success") {
    return (
      <div
        className={cn("flex flex-col gap-3 rounded-lg border border-success/30 bg-success/10 p-6", className)}
        role="status"
        aria-live="polite"
      >
        <p className="font-display text-h3 text-success">{formMicrocopy.successTitle}</p>
        <p className="font-sans text-body text-text">{formMicrocopy.successBody}</p>
      </div>
    );
  }

  return (
    <form
      id={formId}
      className={cn("flex flex-col gap-5 sm:gap-6", className)}
      onSubmit={onSubmit}
      onFocus={onFirstFocus}
      noValidate
    >
      <div id={statusId} className="sr-only" aria-live="polite">
        {status === "submitting" ? formMicrocopy.pending : formError ?? ""}
      </div>

      <Input
        id={`${formId}-name`}
        name="name"
        label="Full name"
        autoComplete="name"
        required
        value={values.name}
        onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
        onBlur={() => markFieldComplete("name", validateField("name"))}
        error={errors.name}
        disabled={status === "submitting"}
      />

      <Input
        id={`${formId}-email`}
        name="email"
        type="email"
        label="Email"
        autoComplete="email"
        inputMode="email"
        required
        hint={formMicrocopy.helper}
        value={values.email}
        onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
        onBlur={() => markFieldComplete("email", validateField("email"))}
        error={errors.email}
        disabled={status === "submitting"}
      />

      <Input
        id={`${formId}-phone`}
        name="phone"
        type="tel"
        label="Phone number"
        autoComplete="tel"
        inputMode="tel"
        placeholder="+91 98765 43210"
        required
        value={values.phone}
        onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
        onBlur={() => markFieldComplete("phone", validateField("phone"))}
        error={errors.phone}
        disabled={status === "submitting"}
      />

      <Input
        id={`${formId}-organization`}
        name="organization"
        label="College / Company"
        autoComplete="organization"
        required
        value={values.organization}
        onChange={(e) => setValues((v) => ({ ...v, organization: e.target.value }))}
        onBlur={() => markFieldComplete("organization", validateField("organization"))}
        error={errors.organization}
        disabled={status === "submitting"}
      />

      <Select
        id={`${formId}-experienceLevel`}
        name="experienceLevel"
        label="Experience level"
        required
        value={values.experienceLevel}
        onChange={(e) =>
          setValues((v) => ({
            ...v,
            experienceLevel: e.target.value as RegistrationInput["experienceLevel"],
          }))
        }
        onBlur={() => markFieldComplete("experienceLevel", validateField("experienceLevel"))}
        error={errors.experienceLevel}
        disabled={status === "submitting"}
        options={experienceLevels.map((level) => ({ value: level, label: level }))}
      />

      {formError ? (
        <p className="font-sans text-caption text-[var(--color-danger)]" role="alert">
          {formError}
        </p>
      ) : null}

      <Button type="submit" size="lg" fullWidth loading={status === "submitting"}>
        {status === "submitting" ? (
          formMicrocopy.pending
        ) : (
          <span className="inline-flex flex-wrap items-center justify-center gap-x-1.5">
            {formMicrocopy.submitPrefix}
            <EventPrice size="sm" />
          </span>
        )}
      </Button>
    </form>
  );
}
