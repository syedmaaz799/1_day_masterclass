import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { PolymorphicTag } from "@/components/ui/polymorphic";

/**
 * Typography system — typography carries the visual hierarchy (03-design-system).
 * Display + headlines use Space Grotesk (font-display); everything else Inter (font-sans).
 * All sizes map to the fluid clamp tokens declared in globals.css @theme.
 */

type TextBaseProps = HTMLAttributes<HTMLElement> & {
  as?: PolymorphicTag;
  className?: string;
  children?: ReactNode;
};

/* ----------------------------- Display ----------------------------- */

const displaySizes = {
  xl: "text-display-xl",
  l: "text-display-l",
} as const;

type DisplayProps = TextBaseProps & { size?: keyof typeof displaySizes };

/** Massive launch-grade headline. Defaults to <h1>. Use once per view. */
export function Display({
  as: Tag = "h1",
  size = "xl",
  className,
  children,
  ...rest
}: DisplayProps) {
  return (
    <Tag
      className={cn("font-display text-balance text-text", displaySizes[size], className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ----------------------------- Headline ----------------------------- */

const headlineSizes = {
  h2: "text-h2",
  h3: "text-h3",
} as const;

type HeadlineProps = TextBaseProps & { size?: keyof typeof headlineSizes };

/** Section-level headline. Defaults to <h2>. */
export function Headline({
  as,
  size = "h2",
  className,
  children,
  ...rest
}: HeadlineProps) {
  const Tag = as ?? (size === "h2" ? "h2" : "h3");
  return (
    <Tag
      className={cn("font-display text-balance text-text", headlineSizes[size], className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ----------------------------- Eyebrow ----------------------------- */

const eyebrowTones = {
  muted: "text-text-2",
  primary: "text-primary",
  accent: "text-accent",
} as const;

type EyebrowProps = TextBaseProps & {
  tone?: keyof typeof eyebrowTones;
  /** Render a short leading rule before the label (premium editorial cue). */
  withRule?: boolean;
};

/** Small uppercase label above a headline (overline style). */
export function Eyebrow({
  as: Tag = "p",
  tone = "muted",
  withRule = false,
  className,
  children,
  ...rest
}: EyebrowProps) {
  return (
    <Tag
      className={cn(
        "inline-flex items-center gap-3 font-sans text-overline uppercase",
        eyebrowTones[tone],
        className,
      )}
      {...rest}
    >
      {withRule ? (
        <span aria-hidden className="h-px w-8 bg-current opacity-40" />
      ) : null}
      {children}
    </Tag>
  );
}

/* ------------------------------- Body ------------------------------- */

const bodySizes = {
  lg: "text-body-lg",
  base: "text-body",
} as const;

const bodyTones = {
  default: "text-text",
  muted: "text-text-2",
} as const;

type BodyProps = TextBaseProps & {
  size?: keyof typeof bodySizes;
  tone?: keyof typeof bodyTones;
};

/** Paragraph / running text. */
export function Body({
  as: Tag = "p",
  size = "base",
  tone = "muted",
  className,
  children,
  ...rest
}: BodyProps) {
  return (
    <Tag
      className={cn("font-sans text-pretty", bodySizes[size], bodyTones[tone], className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------ Caption ----------------------------- */

type CaptionProps = TextBaseProps;

/** Small supporting text (meta, helper, footnotes). */
export function Caption({
  as: Tag = "p",
  className,
  children,
  ...rest
}: CaptionProps) {
  return (
    <Tag className={cn("font-sans text-caption text-text-2", className)} {...rest}>
      {children}
    </Tag>
  );
}
