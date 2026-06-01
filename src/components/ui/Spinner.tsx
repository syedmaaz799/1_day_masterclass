import { cn } from "@/lib/utils";

/**
 * Spinner — minimal loading indicator (thin geometric stroke, 03-design-system).
 * Decorative by default; give it a label via `aria-label` when standalone.
 */
type SpinnerProps = {
  className?: string;
  /** When standalone (not inside an aria-busy control), pass a label for AT. */
  label?: string;
};

export function Spinner({ className, label }: SpinnerProps) {
  return (
    <svg
      className={cn("size-4 animate-spin", className)}
      viewBox="0 0 24 24"
      fill="none"
      role={label ? "status" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
