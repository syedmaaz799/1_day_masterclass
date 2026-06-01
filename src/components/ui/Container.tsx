import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { PolymorphicTag } from "@/components/ui/polymorphic";

/**
 * Container — horizontal constraint + responsive gutters (03-design-system).
 * Max content width 1200px (token), gutters 16px mobile / 24px desktop.
 */

const sizes = {
  content: "max-w-content", // 1200px
  narrow: "max-w-3xl", // measure-friendly text column
  full: "max-w-none", // full-bleed (3D Core / immersive)
} as const;

type ContainerProps = HTMLAttributes<HTMLElement> & {
  as?: PolymorphicTag;
  size?: keyof typeof sizes;
  className?: string;
  children?: ReactNode;
};

export function Container({
  as: Tag = "div",
  size = "content",
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-4 sm:px-6",
        size === "full" && "px-0 sm:px-0",
        sizes[size],
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
