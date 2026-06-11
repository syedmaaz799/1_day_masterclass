import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Central GSAP setup (06-motion). Registers ScrollTrigger exactly once, client-side.
 * Import gsap/ScrollTrigger from HERE so plugin registration is guaranteed and we
 * never run two registration paths.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  // Lenis drives the ticker; disable GSAP lag smoothing so scrubbing stays in sync.
  gsap.ticker.lagSmoothing(0);
}

export { gsap, ScrollTrigger };
