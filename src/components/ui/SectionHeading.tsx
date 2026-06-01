import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Display, Headline, Eyebrow, Body } from "@/components/ui/Typography";
import type { PolymorphicTag } from "@/components/ui/polymorphic";

/**
 * SectionHeading — composed eyebrow + headline + optional description.
 * Pass `id` so a Section can reference it via aria-labelledby (11-accessibility).
 */

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  /** Headline scale: section h2 (default) or large display for opening sections. */
  variant?: "h2" | "display";
  as?: PolymorphicTag;
  id?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  variant = "h2",
  as,
  id,
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center";
  return (
    <div className={cn("flex flex-col gap-4", isCenter && "items-center text-center", className)}>
      {eyebrow ? <Eyebrow tone="accent">{eyebrow}</Eyebrow> : null}

      {variant === "display" ? (
        <Display as={as ?? "h2"} size="l" id={id}>
          {title}
        </Display>
      ) : (
        <Headline as={as ?? "h2"} size="h2" id={id}>
          {title}
        </Headline>
      )}

      {description ? (
        <Body size="lg" className={cn("max-w-2xl", isCenter && "mx-auto")}>
          {description}
        </Body>
      ) : null}
    </div>
  );
}
