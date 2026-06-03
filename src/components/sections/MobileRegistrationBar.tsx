"use client";

import { useEffect, useState } from "react";
import { Button, EventPrice } from "@/components/ui";
import { event } from "@/content/event";
import { scrollToRegister } from "@/lib/scroll-to-register";

/**
 * Mobile sticky CTA — shown in testimonials / FAQ / final CTA only (Issue 10).
 * Hidden while `#register-experience` is in view so users are not fighting a second CTA on the form.
 */
export function MobileRegistrationBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const registerEl = document.getElementById("register-experience");
    const proofTargets = ["testimonials", "faq", "final-cta"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (proofTargets.length === 0) return;

    let registerInView = false;
    let proofInView = false;

    const update = () => setVisible(proofInView && !registerInView);

    const proofObserver = new IntersectionObserver(
      (entries) => {
        proofInView = entries.some((e) => e.isIntersecting);
        update();
      },
      { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );

    const registerObserver = registerEl
      ? new IntersectionObserver(
          (entries) => {
            registerInView = entries.some((e) => e.isIntersecting);
            update();
          },
          { root: null, threshold: 0.15 },
        )
      : null;

    proofTargets.forEach((el) => proofObserver.observe(el));
    if (registerEl && registerObserver) registerObserver.observe(registerEl);

    return () => {
      proofObserver.disconnect();
      registerObserver?.disconnect();
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-bg/95 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden"
      role="region"
      aria-label="Reserve your seat"
    >
      <Button
        size="lg"
        fullWidth
        className="min-h-12"
        onClick={() => scrollToRegister("mobile-sticky-bar")}
      >
        <span className="inline-flex flex-wrap items-center justify-center gap-x-1.5">
          {event.cta.primaryWithPrice}
          <EventPrice size="sm" />
        </span>
      </Button>
    </div>
  );
}
