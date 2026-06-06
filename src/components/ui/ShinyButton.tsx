"use client";

import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/Spinner";
import styles from "@/components/ui/ShinyButton.module.css";

const sizes = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
} as const;

export type ShinyButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "ref"> & {
  size?: keyof typeof sizes;
  loading?: boolean;
  fullWidth?: boolean;
  ref?: Ref<HTMLButtonElement>;
  children?: ReactNode;
};

/**
 * ShinyButton — SHINY-BUTTON.md reference implementation.
 * Markup: `<button><span>{children}</span></button>` with pseudo-element layers.
 */
export function ShinyButton({
  size = "md",
  loading = false,
  fullWidth = false,
  disabled,
  type = "button",
  className,
  children,
  ref,
  ...rest
}: ShinyButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={cn(
        styles.shinyCta,
        sizes[size],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        className,
      )}
      {...rest}
    >
      <span className={cn(styles.shinyCtaInner, loading && "opacity-80")}>
        {loading ? <Spinner className={cn(size === "lg" ? "size-5" : "size-4")} /> : null}
        {children}
      </span>
    </button>
  );
}
