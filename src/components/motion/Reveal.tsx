"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "@/components/motion/gsap";
import { useIsomorphicLayoutEffect } from "@/components/motion/use-isomorphic-layout-effect";
import type { PolymorphicTag } from "@/components/ui/polymorphic";
import { cn } from "@/lib/utils";

/**
 * Reveal — the smooth on-enter reveal (06-motion: "fade + 16–24px rise on enter").
 * Scroll-position triggered → owned by GSAP/ScrollTrigger (single scroll authority).
 * Plays once, then stays. Reduced motion → content is shown instantly (no transform).
 * Animates only opacity + transform (no layout properties).
 */

type RevealProps = {
  as?: PolymorphicTag;
  /** Rise distance in px (16–24 recommended). */
  y?: number;
  delay?: number;
  duration?: number;
  /** Start position relative to viewport (ScrollTrigger `start`). */
  start?: string;
  className?: string;
  children?: ReactNode;
};

export function Reveal({
  as,
  y = 20,
  delay = 0,
  duration = 0.6,
  start = "top 85%",
  className,
  children,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Rendered tag is dynamic; cast to a concrete intrinsic so the div ref type holds
  // (polymorphic + ref unifies all element ref types into an impossible intersection).
  const Tag = (as ?? "div") as "div";

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start, once: true },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, [y, delay, duration, start]);

  return (
    <Tag ref={ref} className={cn(className)} style={{ opacity: 0 }}>
      {children}
    </Tag>
  );
}
