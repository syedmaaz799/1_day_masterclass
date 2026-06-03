# NeuralVarsity — Agentic AI Masterclass Landing Page

Premium event-registration landing page for **Build Your First AI Employee** (13–14 Jun 2026 · two-day live online · ₹111). Its single job: convert visitors into registrants.

> Governance lives in `.cursor/rules/` (12 Context Engineering rules) and `PROJECT_PLAN.md`. Read those before contributing.

## Status

**Phase 1 — Foundation only.** No landing-page sections, components, forms, animations, GSAP, or Three.js scenes yet. The page renders an empty placeholder by design.

## Tech Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4** (CSS-first `@theme`, no `tailwind.config.js`)
- **GSAP + ScrollTrigger**, **Framer Motion**, **Lenis** (motion — later phase)
- **React Three Fiber + Three.js** (WebGPU-first 3D — later phase)
- **Zod** (validation) · **web-vitals** (perf reporting)

## Getting Started

```bash
npm install
cp .env.example .env.local   # then edit values
npm run dev                  # http://localhost:3000
```

Scripts: `dev`, `build`, `start`, `lint`, `typecheck`.

## Project Structure

```
src/
  app/            Router, root layout, global tokens (globals.css), placeholder page
  components/
    sections/     Page sections          (later phase)
    ui/           Shared primitives       (later phase)
    3d/           AI Core experience      (later phase)
    motion/       Lenis/GSAP/FM infra     (later phase)
  content/        Typed single-source content (event, agenda, faq, ...)
  lib/            fonts, env, utils, analytics, validation, device-tier, countdown
.cursor/rules/    Context Engineering rules (source of truth)
PROJECT_PLAN.md   IA, UX, conversion, 3D, motion, mobile, architecture
```

## Conventions

- Server Components by default; `"use client"` only at interactive/3D/motion leaves.
- Never hardcode event facts — import from `src/content/event.ts`.
- Reference design tokens (defined in `globals.css` `@theme`); never hardcode hexes.
- No PII in analytics events. Validate all external data with Zod.
- Honor `prefers-reduced-motion` and WebGPU→WebGL2→static fallbacks.
