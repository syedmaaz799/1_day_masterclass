"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Returns false when the element is outside the viewport — use to pause CSS
 * animations (animation-play-state) without unmounting or changing layout.
 */
export function usePauseWhenOffscreen<T extends Element>(ref: RefObject<T | null>): boolean {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        setVisible(entries.some((e) => e.isIntersecting));
      },
      { root: null, rootMargin: "0px", threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return visible;
}
