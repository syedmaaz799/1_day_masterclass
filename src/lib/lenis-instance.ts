import type Lenis from "lenis";

/** Shared Lenis ref for imperative scroll (e.g. registration CTAs). */
let lenisInstance: Lenis | null = null;

export function registerLenis(instance: Lenis | null): void {
  lenisInstance = instance;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}
