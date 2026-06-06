import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/Spinner";
import { ShinyButton } from "@/components/ui/ShinyButton";

/**
 * Button — the single button primitive (04-conversion: ONE primary treatment site-wide).
 * Primary variant uses ShinyButton (SHINY-BUTTON.md); secondary/ghost stay flat.
 */

const base =
  "relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-pill font-sans font-medium " +
  "transition-[transform,background-color,box-shadow,border-color,opacity] duration-[var(--duration-ui)] ease-out-expo " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants = {
  secondary:
    "border border-white/15 bg-surface text-text hover:border-white/30 hover:bg-white/[0.04]",
  ghost: "bg-transparent text-text-2 hover:text-text hover:bg-white/[0.04]",
} as const;

const sizes = {
  sm: "h-9 px-4 text-caption",
  md: "h-11 px-6 text-body",
  lg: "h-14 px-8 text-body-lg",
} as const;

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "ref"> & {
  variant?: "primary" | keyof typeof variants;
  size?: keyof typeof sizes;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  ref?: Ref<HTMLButtonElement>;
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  disabled,
  type = "button",
  className,
  children,
  ref,
  ...rest
}: ButtonProps) {
  if (variant === "primary") {
    return (
      <ShinyButton
        ref={ref}
        type={type}
        size={size}
        loading={loading}
        fullWidth={fullWidth}
        disabled={disabled}
        className={className}
        {...rest}
      >
        {!loading && leftIcon ? (
          <span aria-hidden className="inline-flex shrink-0">
            {leftIcon}
          </span>
        ) : null}
        {children}
        {!loading && rightIcon ? (
          <span aria-hidden className="inline-flex shrink-0">
            {rightIcon}
          </span>
        ) : null}
      </ShinyButton>
    );
  }

  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={cn(base, variants[variant], sizes[size], fullWidth && "w-full", className)}
      {...rest}
    >
      {loading ? (
        <Spinner className={cn(size === "lg" ? "size-5" : "size-4")} />
      ) : (
        leftIcon && (
          <span aria-hidden className="inline-flex shrink-0">
            {leftIcon}
          </span>
        )
      )}
      <span className={cn(loading && "opacity-80")}>{children}</span>
      {!loading && rightIcon ? (
        <span aria-hidden className="inline-flex shrink-0">
          {rightIcon}
        </span>
      ) : null}
    </button>
  );
}
