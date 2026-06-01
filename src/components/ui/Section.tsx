import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import type { PolymorphicTag } from "@/components/ui/polymorphic";

/**
 * Section — vertical rhythm wrapper using the generous section spacing token
 * (clamp(96px,12vw,160px)). Wraps content in a Container unless `bleed` is set
 * (e.g. for the full-bleed 3D Core). Pair `id` + `aria-labelledby` for landmarks.
 */

type SectionProps = HTMLAttributes<HTMLElement> & {
  as?: PolymorphicTag;
  /** Skip the inner Container for full-bleed sections. */
  bleed?: boolean;
  containerSize?: "content" | "narrow" | "full";
  /** Trim vertical padding (e.g. tightly stacked sections). */
  compact?: boolean;
  className?: string;
  children?: ReactNode;
};

export function Section({
  as: Tag = "section",
  bleed = false,
  containerSize = "content",
  compact = false,
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <Tag className={cn(compact ? "py-16 md:py-24" : "py-section", className)} {...rest}>
      {bleed ? children : <Container size={containerSize}>{children}</Container>}
    </Tag>
  );
}
