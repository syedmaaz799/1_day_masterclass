import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { PolymorphicTag } from "@/components/ui/polymorphic";

/**
 * Card — raised surface with hairline border (03-design-system: elevation = surface
 * step + hairline, NOT heavy shadows). `interactive` adds a restrained hover lift.
 */

const paddings = {
  none: "",
  sm: "p-5",
  md: "p-6 md:p-8",
  lg: "p-8 md:p-10",
} as const;

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: PolymorphicTag;
  padding?: keyof typeof paddings;
  /** Adds hover affordance — use for clickable/linked cards only. */
  interactive?: boolean;
  className?: string;
  children?: ReactNode;
};

export function Card({
  as: Tag = "div",
  padding = "md",
  interactive = false,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-lg border border-white/8 bg-surface",
        interactive &&
          "transition-[transform,border-color,background-color] duration-[var(--duration-ui)] ease-out-expo hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.02]",
        paddings[padding],
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
