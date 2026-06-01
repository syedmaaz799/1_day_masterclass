import type { AnchorHTMLAttributes, ReactNode, Ref } from "react";
import NextLink from "next/link";
import { cn } from "@/lib/utils";

/**
 * Link — styled navigation/text link. Uses next/link for internal routes and a
 * plain anchor for external/protocol links (auto-adds safe rel). Accessible focus
 * is handled globally; external links get an SR hint.
 */

const variants = {
  default:
    "text-primary underline-offset-4 hover:underline focus-visible:underline",
  subtle:
    "text-text-2 underline-offset-4 transition-colors hover:text-text",
  nav: "text-text-2 transition-colors hover:text-text",
} as const;

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "ref" | "href"> & {
  href: string;
  variant?: keyof typeof variants;
  /** Force external behavior (new tab + safe rel). Auto-detected otherwise. */
  external?: boolean;
  className?: string;
  children?: ReactNode;
  ref?: Ref<HTMLAnchorElement>;
};

function isExternalHref(href: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(href);
}

export function Link({
  href,
  variant = "default",
  external,
  className,
  children,
  ref,
  ...rest
}: LinkProps) {
  const treatExternal = external ?? isExternalHref(href);
  const classes = cn(
    "rounded-sm font-sans transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    variants[variant],
    className,
  );

  if (treatExternal) {
    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...rest}
      >
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <NextLink ref={ref} href={href} className={classes} {...rest}>
      {children}
    </NextLink>
  );
}
