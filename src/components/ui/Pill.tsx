import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Pill — fact/meta chip (date, time, price, mode). Larger and sentence-case,
 * distinct from the small uppercase status Badge. Supports a leading icon slot.
 */

const sizes = {
  sm: "h-7 px-3 text-caption",
  md: "h-9 px-4 text-body",
} as const;

type PillProps = HTMLAttributes<HTMLSpanElement> & {
  size?: keyof typeof sizes;
  icon?: ReactNode;
  /** Subtle emphasis for the most important fact (e.g. price). */
  emphasis?: boolean;
  className?: string;
  children?: ReactNode;
};

export function Pill({
  size = "md",
  icon,
  emphasis = false,
  className,
  children,
  ...rest
}: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-pill border font-sans",
        emphasis
          ? "border-primary/30 bg-[var(--primary-12)] text-text"
          : "border-white/10 bg-surface text-text-2",
        sizes[size],
        className,
      )}
      {...rest}
    >
      {icon ? (
        <span aria-hidden className="inline-flex shrink-0 text-text-2">
          {icon}
        </span>
      ) : null}
      {children}
    </span>
  );
}
