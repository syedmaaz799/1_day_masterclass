"use client";

import type { ReactNode } from "react";
import {
  cn,
  controlBase,
  describedBy,
  FieldError,
  FieldHint,
  useFieldIds,
} from "@/components/ui/field";
import { phoneCountries } from "@/content/phone-countries";

type PhoneFieldProps = {
  id: string;
  countryId: string;
  numberId: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  hint?: ReactNode;
  error?: ReactNode;
  countryValue: string;
  numberValue: string;
  onCountryChange: (dial: string) => void;
  onNumberChange: (value: string) => void;
  onBlur?: () => void;
};

/** Phone number with country dial-code select (09-forms). */
export function PhoneField({
  id,
  countryId,
  numberId,
  label = "Phone number",
  required,
  disabled,
  hint,
  error,
  countryValue,
  numberValue,
  onCountryChange,
  onNumberChange,
  onBlur,
}: PhoneFieldProps) {
  const ids = useFieldIds(id);
  const hasError = Boolean(error);
  const hasHint = Boolean(hint);

  return (
    <fieldset className="w-full border-0 p-0">
      <legend className="mb-2 block font-sans text-caption font-medium text-text-2">
        {label}
        {required ? (
          <span className="ml-1 text-danger" aria-hidden>
            *
          </span>
        ) : null}
      </legend>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
        <div className="relative w-full sm:w-[min(100%,11.5rem)] sm:shrink-0">
          <label htmlFor={countryId} className="sr-only">
            Country code
          </label>
          <select
            id={countryId}
            name="phoneCountry"
            required={required}
            disabled={disabled}
            value={countryValue}
            onChange={(e) => onCountryChange(e.target.value)}
            onBlur={onBlur}
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy(ids, hasHint, hasError)}
            className={cn(controlBase, "h-12 w-full appearance-none pl-3 pr-9 text-body")}
          >
            {phoneCountries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.label}
              </option>
            ))}
          </select>
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-text-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="m4 6 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <label htmlFor={numberId} className="sr-only">
            Phone number
          </label>
          <input
            id={numberId}
            name="phoneNumber"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            required={required}
            disabled={disabled}
            placeholder="98765 43210"
            value={numberValue}
            onChange={(e) => onNumberChange(e.target.value)}
            onBlur={onBlur}
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy(ids, hasHint, hasError)}
            className={cn(controlBase, "h-12 w-full px-4")}
          />
        </div>
      </div>
      {hasError ? (
        <FieldError id={ids.errorId}>{error}</FieldError>
      ) : hasHint ? (
        <FieldHint id={ids.hintId}>{hint}</FieldHint>
      ) : null}
    </fieldset>
  );
}
