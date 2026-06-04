"use client";

import { useEffect, useState } from "react";
import { Button, EventPrice } from "@/components/ui";
import { event } from "@/content/event";
import { scrollToRegister } from "@/lib/scroll-to-register";

/**
 * Mobile sticky CTA — visible site-wide except:
 * - Registration form in view (avoid duplicate CTAs on the form)
 * - Workflow orbital scroll track in view (after Build — immersive demo)
 * - AI companies in-section register CTA in view (avoid double bottom bars)
 */
export function MobileRegistrationBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const registerEl = document.getElementById("register-experience");
    const demoEl = document.getElementById("demo");

    const aiCompaniesSection = document.getElementById("ai-companies");

    let registerInView = false;
    let workflowInView = false;
    let aiCompaniesCtaInView = false;

    const update = () => {
      setVisible(!registerInView && !workflowInView && !aiCompaniesCtaInView);
    };

    const registerObserver = registerEl
      ? new IntersectionObserver(
          (entries) => {
            registerInView = entries.some((e) => e.isIntersecting);
            update();
          },
          { root: null, threshold: 0.12 },
        )
      : null;

    const aiCompaniesObserver = new IntersectionObserver(
      (entries) => {
        aiCompaniesCtaInView = entries.some((e) => e.isIntersecting);
        update();
      },
      { root: null, threshold: 0.5 },
    );

    let workflowObserver: IntersectionObserver | null = null;

    const observeWorkflowTrack = (track: HTMLElement) => {
      workflowObserver?.disconnect();
      workflowObserver = new IntersectionObserver(
        (entries) => {
          workflowInView = entries.some((e) => e.isIntersecting);
          update();
        },
        { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
      );
      workflowObserver.observe(track);
    };

    const attachWorkflowObserver = () => {
      const track = document.getElementById("workflow-demo-track");
      if (track) observeWorkflowTrack(track);
    };

    const attachAiCompaniesCtaObserver = () => {
      const cta = document.getElementById("ai-companies-register-cta");
      aiCompaniesObserver.disconnect();
      if (!cta || getComputedStyle(cta).display === "none") {
        aiCompaniesCtaInView = false;
        update();
        return;
      }
      aiCompaniesObserver.observe(cta);
    };

    const demoMutation = demoEl
      ? new MutationObserver(() => {
          attachWorkflowObserver();
        })
      : null;

    const aiCompaniesMutation = aiCompaniesSection
      ? new MutationObserver(() => {
          attachAiCompaniesCtaObserver();
        })
      : null;

    if (registerEl && registerObserver) registerObserver.observe(registerEl);
    if (demoEl && demoMutation) {
      demoMutation.observe(demoEl, { childList: true, subtree: true });
      attachWorkflowObserver();
    }
    if (aiCompaniesSection && aiCompaniesMutation) {
      aiCompaniesMutation.observe(aiCompaniesSection, {
        attributes: true,
        attributeFilter: ["style"],
        subtree: true,
        childList: true,
      });
      attachAiCompaniesCtaObserver();
    }

    const onAiCompaniesCta = (event: Event) => {
      const visible = (event as CustomEvent<{ visible: boolean }>).detail.visible;
      aiCompaniesCtaInView = visible;
      update();
    };

    window.addEventListener("ai-companies-register-cta", onAiCompaniesCta);

    update();

    return () => {
      window.removeEventListener("ai-companies-register-cta", onAiCompaniesCta);
      registerObserver?.disconnect();
      aiCompaniesObserver.disconnect();
      workflowObserver?.disconnect();
      demoMutation?.disconnect();
      aiCompaniesMutation?.disconnect();
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
