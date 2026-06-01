"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * False during SSR + first client render, true thereafter — without setState-in-effect.
 * Lets us defer client-only providers (e.g. Lenis) past hydration with no mismatch.
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
