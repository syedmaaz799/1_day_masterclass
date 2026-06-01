"use client";

import { useCallback } from "react";
import { Accordion, AccordionItem } from "@/components/ui";
import { faq } from "@/content/faq";
import { track } from "@/lib/analytics";

/**
 * FAQ accordion with analytics on expand (faq id only — no PII).
 */
export function FAQAccordion() {
  const onToggle = useCallback((id: string, open: boolean) => {
    if (open) track("faq_toggle", { faqId: id, action: "open" });
  }, []);

  return (
    <Accordion type="single" headingTag="h3">
      {faq.map((item) => (
        <AccordionItem
          key={item.id}
          value={item.id}
          title={item.question}
          onToggle={onToggle}
        >
          {item.answer}
        </AccordionItem>
      ))}
    </Accordion>
  );
}
