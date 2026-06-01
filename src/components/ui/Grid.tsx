import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { PolymorphicTag } from "@/components/ui/polymorphic";

/**
 * Grid — 12-column editorial grid (03-design-system).
 * Children control their own spans via Tailwind `col-span-*` utilities,
 * enabling the asymmetry/offsets the design system favors over centered-everything.
 */

const gaps = {
  none: "gap-0",
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
} as const;

type GridProps = HTMLAttributes<HTMLElement> & {
  as?: PolymorphicTag;
  /** Number of columns (defaults to the canonical 12). */
  cols?: number;
  gap?: keyof typeof gaps;
  className?: string;
  children?: ReactNode;
};

export function Grid({
  as: Tag = "div",
  cols = 12,
  gap = "md",
  className,
  children,
  style,
  ...rest
}: GridProps) {
  const gridStyle: CSSProperties = {
    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
    ...style,
  };
  return (
    <Tag className={cn("grid", gaps[gap], className)} style={gridStyle} {...rest}>
      {children}
    </Tag>
  );
}
