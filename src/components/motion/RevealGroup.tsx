"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "@/components/motion/gsap";
import { useIsomorphicLayoutEffect } from "@/components/motion/use-isomorphic-layout-effect";
import type { PolymorphicTag } from "@/components/ui/polymorphic";
import { cn } from "@/lib/utils";

/**
 * RevealGroup — staggered reveal for lists/grids (06-motion: "staggered for groups,
 * stagger 0.06"). Animates direct children with a single ScrollTrigger so a row of
 * cards arrives as a sequence, not all at once (progressive disclosure).
 * Reduced motion → all children shown instantly. Only opacity + transform.
 */

type RevealGroupProps = {
  as?: PolymorphicTag;
  y?: number;
  stagger?: number;
  duration?: number;
  start?: string;
  className?: string;
  children?: ReactNode;
};

export function RevealGroup({
  as,
  y = 20,
  stagger = 0.06,
  duration = 0.6,
  start = "top 80%",
  className,
  children,
}: RevealGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Rendered tag is dynamic; cast to a concrete intrinsic so the div ref type holds
  // (polymorphic + ref unifies all element ref types into an impossible intersection).
  const Tag = (as ?? "div") as "div";

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = Array.from(el.children) as HTMLElement[];
    if (items.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          ease: "expo.out",
          stagger,
          scrollTrigger: { trigger: el, start, once: true },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, [y, stagger, duration, start]);

  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}
