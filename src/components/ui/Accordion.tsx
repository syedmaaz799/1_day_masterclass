"use client";

import {
  createContext,
  useCallback,
  useContext,
  useId,
  useRef,
  useState,
} from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { HeadingTag } from "@/components/ui/polymorphic";

/**
 * Accordion — accessible disclosure (FAQ, 11-accessibility).
 * - Native <button> triggers (Enter/Space work for free).
 * - Arrow/Home/End roving between headers.
 * - Smooth grid-rows height transition (respects reduced-motion globally).
 * Primitive only; content is supplied by the consumer.
 */

type AccordionType = "single" | "multiple";

interface AccordionContextValue {
  type: AccordionType;
  open: Set<string>;
  toggle: (value: string) => void;
  headingTag: HeadingTag;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordion(): AccordionContextValue {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error("AccordionItem must be used within <Accordion>.");
  return ctx;
}

type AccordionProps = {
  type?: AccordionType;
  defaultOpen?: readonly string[];
  /** Heading level wrapping each trigger (semantics). Defaults to h3. */
  headingTag?: HeadingTag;
  className?: string;
  children: ReactNode;
};

export function Accordion({
  type = "single",
  defaultOpen = [],
  headingTag = "h3",
  className,
  children,
}: AccordionProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<Set<string>>(() => new Set(defaultOpen));

  const toggle = useCallback(
    (value: string) => {
      setOpen((prev) => {
        const next = new Set(prev);
        if (next.has(value)) {
          next.delete(value);
        } else {
          if (type === "single") next.clear();
          next.add(value);
        }
        return next;
      });
    },
    [type],
  );

  const onKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    const keys = ["ArrowDown", "ArrowUp", "Home", "End"];
    if (!keys.includes(event.key)) return;
    const root = rootRef.current;
    if (!root) return;
    const triggers = Array.from(
      root.querySelectorAll<HTMLButtonElement>("[data-accordion-trigger]"),
    );
    const currentIndex = triggers.indexOf(document.activeElement as HTMLButtonElement);
    if (currentIndex === -1) return;
    event.preventDefault();

    let nextIndex = currentIndex;
    if (event.key === "ArrowDown") nextIndex = (currentIndex + 1) % triggers.length;
    if (event.key === "ArrowUp")
      nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = triggers.length - 1;
    triggers[nextIndex]?.focus();
  }, []);

  return (
    <AccordionContext.Provider value={{ type, open, toggle, headingTag }}>
      <div
        ref={rootRef}
        onKeyDown={onKeyDown}
        className={cn("divide-y divide-white/8 border-y border-white/8", className)}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

type AccordionItemProps = {
  value: string;
  title: ReactNode;
  className?: string;
  /** Fired after toggle; `open` is the new expanded state. */
  onToggle?: (value: string, open: boolean) => void;
  children: ReactNode;
};

export function AccordionItem({
  value,
  title,
  className,
  onToggle,
  children,
}: AccordionItemProps) {
  const { open, toggle, headingTag: Heading } = useAccordion();
  const baseId = useId();
  const triggerId = `${baseId}-trigger`;
  const panelId = `${baseId}-panel`;
  const isOpen = open.has(value);

  return (
    <div className={cn("group", className)}>
      <Heading className="m-0">
        <button
          type="button"
          id={triggerId}
          data-accordion-trigger
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => {
            const nextOpen = !isOpen;
            toggle(value);
            onToggle?.(value, nextOpen);
          }}
          className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-h3 text-text transition-colors hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <span>{title}</span>
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            className={cn(
              "size-5 shrink-0 text-text-2 transition-transform duration-[var(--duration-ui)] ease-out-expo",
              isOpen && "rotate-180 text-primary",
            )}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="m4 6 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </Heading>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        inert={!isOpen}
        className={cn(
          "grid transition-[grid-template-rows] duration-[var(--duration-ui)] ease-out-expo",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="pb-6 font-sans text-body-lg text-text-2">{children}</div>
        </div>
      </div>
    </div>
  );
}
