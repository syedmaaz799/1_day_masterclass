"use client";

import { type CSSProperties, useRef } from "react";
import { Container, Eyebrow, Headline } from "@/components/ui";
import { useStoryProgress } from "@/components/motion";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { automationTasks } from "@/content/ai-shift";

/**
 * AIShiftTasks — Section 2 as Apple-style product storytelling. The reader should feel
 * "I am watching my workload disappear," not "I am watching rows animate."
 *
 * Storyboard (scrubbed across one pinned scene):
 *  - Intro hold: all six tasks read Manual. Calm, equal, no motion → "my workload".
 *  - Then ONE task at a time: a subtle highlight crosses the row, "Manual" dissolves,
 *    "AUTOMATED" takes its place, and a thin accent edge fills in. Completed rows STAY
 *    completed — the accent accumulates down the list → growing momentum.
 *  - Outro hold: every task is automated — cumulative accent on the list only.
 *
 * Everything is driven by a single CSS var per row (--t) off the smoothed story
 * progress, so only one change happens at a time and the eye always tracks it.
 */

const N = automationTasks.length;
const INTRO = 0.1; // calm "this is my workload" hold
const OUTRO = 0.18; // final pause + Core settle
const SPAN = 1 - INTRO - OUTRO;
const SLOT = SPAN / N;
const GAP = 0.16; // flat band inside each slot → strictly one task transforms at a time

function smoothstep(x: number): number {
  const c = Math.min(1, Math.max(0, x));
  return c * c * (3 - 2 * c);
}

export function AIShiftTasks() {
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
  const reduced = usePrefersReducedMotion();

  useStoryProgress((p) => {
    if (reduced) return; // static layout owns the reduced-motion state

    for (let i = 0; i < N; i++) {
      const row = rowRefs.current[i];
      if (!row) continue;
      const s0 = INTRO + i * SLOT + SLOT * GAP;
      const s1 = INTRO + (i + 1) * SLOT - SLOT * GAP;
      const t = smoothstep((p - s0) / (s1 - s0));
      row.style.setProperty("--t", String(t));
    }
  });

  return (
    <Container>
      {/* Two-column editorial layout: the headline sits BESIDE the list on desktop so
          the whole scene fits below the nav (no vertical clipping), without shrinking
          any type. Stacks on smaller screens. */}
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <header className="flex flex-col gap-4 lg:col-span-5">
          <Eyebrow tone="accent" withRule>
            The shift
          </Eyebrow>
          <Headline size="h2">
            What you do by hand today, your agent does next — one task at a time.
          </Headline>
        </header>

        <ul className="flex flex-col lg:col-span-7">
          {automationTasks.map((task, i) => (
            <li
              key={task.id}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              className="relative border-t border-white/8 py-4 pl-6"
              style={{ "--t": reduced ? 1 : 0 } as CSSProperties}
            >
              {/* Accent edge that fills in as the task is handed over (accumulates). */}
              <span
                aria-hidden
                className="absolute left-0 top-0 h-full w-[2px] bg-accent"
                style={{ opacity: "var(--t)" }}
              />

              {/* Subtle takeover highlight — only visible while this row transforms. */}
              {!reduced ? (
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-accent/12 to-transparent"
                  style={{
                    transform: "translateX(calc(var(--t) * 240% - 70%))",
                    opacity: "calc(4 * var(--t) * (1 - var(--t)))",
                  }}
                />
              ) : null}

              <div className="relative flex flex-col gap-2">
                <div className="flex items-baseline justify-between gap-6">
                  <span className="font-sans text-body-lg font-medium text-text">
                    {task.task}
                  </span>
                  {reduced ? (
                    <span className="font-sans text-overline uppercase text-accent">
                      Automated
                    </span>
                  ) : (
                    <span className="relative inline-grid text-overline uppercase">
                      <span
                        className="col-start-1 row-start-1 whitespace-nowrap text-text-2"
                        style={{ opacity: "calc(1 - var(--t))" }}
                      >
                        Manual
                      </span>
                      <span
                        className="col-start-1 row-start-1 whitespace-nowrap text-accent"
                        style={{ opacity: "var(--t)" }}
                      >
                        Automated
                      </span>
                    </span>
                  )}
                </div>

                {reduced ? (
                  <div className="hidden flex-col gap-1 sm:flex">
                    <p className="font-sans text-body text-text-2">{task.manual}</p>
                    <p className="font-sans text-body text-text">{task.automated}</p>
                  </div>
                ) : (
                  <div className="relative hidden min-h-[2.5rem] sm:block">
                    <p
                      className="absolute inset-x-0 top-0 font-sans text-body text-text-2"
                      style={{ opacity: "calc(1 - var(--t))" }}
                    >
                      {task.manual}
                    </p>
                    <p
                      className="absolute inset-x-0 top-0 font-sans text-body text-text"
                      style={{ opacity: "var(--t)" }}
                    >
                      {task.automated}
                    </p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
