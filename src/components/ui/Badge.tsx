import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Badge — compact status label (e.g. "Live", "₹109"). Tone conveys meaning via
 * text + optional dot, never color alone (11-accessibility).
 */

const tones = {
  neutral: "text-text-2",
  primary: "text-primary",
  accent: "text-accent",
  success: "text-success",
} as const;

const dotTones = {
  neutral: "bg-text-2",
  primary: "bg-primary",
  accent: "bg-accent",
  success: "bg-success",
} as const;

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: keyof typeof tones;
  /** Show a leading status dot. */
  dot?: boolean;
  /** Gently pulse the dot to imply "live" (respects reduced-motion globally). */
  pulse?: boolean;
  className?: string;
  children?: ReactNode;
};

export function Badge({
  tone = "neutral",
  dot = false,
  pulse = false,
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-pill border border-white/10 bg-white/[0.03] px-3 py-1 font-sans text-overline uppercase",
        tones[tone],
        className,
      )}
      {...rest}
    >
      {dot ? (
        <span className="relative inline-flex size-1.5">
          {pulse ? (
            <span
              aria-hidden
              className={cn(
                "absolute inset-0 animate-ping rounded-full opacity-75",
                dotTones[tone],
              )}
            />
          ) : null}
          <span className={cn("relative inline-flex size-1.5 rounded-full", dotTones[tone])} />
        </span>
      ) : null}
      {children}
    </span>
  );
}
