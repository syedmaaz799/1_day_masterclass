# PROJECT_PLAN — NeuralVarsity Agentic AI Masterclass Landing Page

> **Event:** Build Your First AI Employee · **Date:** Sunday, June 7, 2026 · **Time:** 2:00–5:00 PM IST · **Price:** ₹109 · **Mode:** Live Online (3 hours)
> **The one job:** convert visitors into paid registrants. Everything else is secondary.
> **Status:** Planning. No code until this plan is approved.

---

## 1. Information Architecture

A single, long-form, scroll-driven landing page (one route: `/`) with a post-registration feedback state. No multi-page nav, no LMS structure.

```
/ (Landing)
├─ 1. Hero — offer + CTA + countdown + 3D AI Core
├─ 2. The AI Shift — scroll story (2023→2026)
├─ 3. What You Will Build — 5 outcome cards
├─ 4. Live Workflow Demonstration — animated system
├─ 5. Masterclass Agenda — 3 hours
├─ 6. Instructor Authority — real founder
├─ 7. Testimonials — video-first
├─ 8. Registration Form — sticky on desktop
├─ 9. FAQ — accordion (objection handling)
├─ 10. Final CTA — emotional close + countdown + form
└─ (post-submit) 11. Feedback Survey — marketing insight capture
```

**Persistent layer:** minimal top bar (wordmark + inline "Reserve" link), sticky desktop registration panel, mobile sticky bottom CTA bar (appears after hero).

**Navigation philosophy:** the page IS the funnel. The only "navigation" is scroll + CTAs that jump to the form. No mega-menu, no footer link farm — just essentials (contact, privacy, terms).

**Content source of truth:** all event facts, agenda, FAQ, and copy live in `src/content/` typed modules so date/price/time are defined once.

---

## 2. UX Strategy

**Core principle:** clarity in 5 seconds, action always within reach.

- **5-second test:** hero must answer *what / when / how much / why now* before any scroll.
- **One decision per screen:** there is a single offer; never make the user compare plans.
- **Progressive disclosure:** the AI Core and copy reveal the story as it becomes relevant; no info dump.
- **The 3D Core as narrative spine:** the same object transforms through the page, giving continuity and a sense of "one event, one journey".
- **Friction floor:** 5-field form, no account, price always visible at the CTA, inline validation.
- **Trust before ask:** outcomes → mechanism (live workflow) → specifics (agenda) → credibility (instructor) → social proof, then the form.
- **Calm urgency:** real countdown + real seats-remaining; no fake alarm patterns.
- **Resilience:** fully usable with keyboard, screen reader, reduced motion, and no WebGPU/WebGL.

**Primary persona:** ambitious student / early-career professional / solo founder in India who senses the AI shift and wants a concrete, no-code skill — fast and affordable (₹109 lowers the decision cost dramatically; design should lean into "almost no reason not to").

---

## 3. Conversion Strategy

Conversion outranks aesthetics in every tie (see rule 04).

**Funnel as section order:** Hook → Problem (shift) → Tangible outcomes → Proof of mechanism → Specifics → Credibility → Social proof → Action → Objection handling → Urgency close.

**CTA system**
- ONE primary treatment site-wide: `Reserve My Seat` / `Reserve My Seat for ₹109`.
- Secondary `Watch Demo` is low-emphasis, never competes.
- CTA reachable everywhere: hero, sticky desktop form, mobile bottom bar, final section.

**Urgency & scarcity (honest)**
- Countdown to Jun 7, 2026 2:00 PM IST (hero + final).
- Seats-remaining backed by config/real data — never random JS.

**Trust signals near the ask:** agenda specifics, real instructor, authentic testimonials, "Live · 3 hours · ₹109" repeated, privacy microcopy.

**Objection handling:** FAQ answers "no coding needed", "recorded?", "what do I need?", "refunds?", "who's it for?".

**Measurement:** typed `track()` for hero CTA, secondary CTA, first form focus, submit, registration success, feedback submit. No PII in events.

**Key CRO levers for ₹109:** emphasize low cost vs. high outcome, reduce form friction, repeat the price as a *reassurance* not a barrier, micro-commitment (the cheap price + concrete deliverable).

---

## 4. 3D Strategy

**One object, one story** (see rule 05). The **AI Core** — a floating neural sphere of interconnected nodes, flowing data particles, and energy streams — is the only major 3D element. It feels alive, not decorative.

**Scroll transformation (same mesh, parameterized states):**
```
1 Question → 2 AI Agent → 3 Workflow → 4 Telegram → 5 Gmail → 6 Lead → 7 Revenue
```
Each stage interpolates node density, edge routing, color energy, emissive intensity, and particle flow with scroll progress. No scene swaps, no new objects.

**Rendering:** WebGPU-first (Three.js TSL/node materials) → WebGL2 fallback (reduced particles, no heavy post) → static poster fallback (no WebGL) so the page never breaks.

**Performance:** lazy-loaded separate chunk (never blocks first paint), dpr `[1,2]`, device-tiered particle counts, pause loop offscreen/on blur, degrade on low-end and reduced-motion. Hero TEXT is the LCP element, not the canvas.

**Accessibility:** canvas `aria-hidden`; the 7-stage story is fully conveyed in DOM text too.

---

## 5. Motion Strategy

**Motion must communicate, never decorate** (see rule 06).

- **Lenis** = single smooth-scroll authority; drives **GSAP ScrollTrigger** for scroll-linked sequences (3D story, AI shift, live workflow, pinned/scrubbed sections).
- **Framer Motion** = discrete UI (mount/exit, hover/tap, accordion, modal, form feedback). One owner per animated property — never two libs on the same element.
- **Patterns:** smooth reveals (fade + 16–24px rise, staggered), progressive disclosure, counter animations (countdown/seats), subtle hover, magnetic primary CTA (pointer:fine only), pinned scrubbed story stages.
- **Easing/timing:** ease-out-expo for entrances; micro 120ms / UI 240–320ms / reveal 500–700ms; scroll-linked for scrubs.
- **Performance:** animate only `transform`/`opacity`; 60fps; register/kill ScrollTriggers on mount/unmount; refresh after fonts + 3D load.
- **Reduced motion:** disable scrub/parallax/magnetic/counters; reveals become instant. Page stays beautiful with motion off.

---

## 6. Mobile Strategy

Mobile-first; the majority of an Indian event audience converts on phones.

- **Hero:** condensed — headline, subhead, date/time/price, countdown, single full-width `Reserve My Seat`. 3D Core runs at reduced tier or static poster on low-end devices.
- **Persistent bottom CTA bar:** `Reserve My Seat for ₹109` appears after hero scrolls out; taps scroll to + focus the form. Never obscures field input.
- **Sticky form behavior** is desktop-only (≥1024px); on mobile the form is a clean stacked full-width section reachable from every CTA.
- **3D degradation:** device-tier detection lowers particle counts / dpr or swaps to static poster; loop pauses offscreen.
- **Touch:** targets ≥ 44×44px; large tap zones on CTA; no hover-dependent information.
- **Performance:** test on mid-tier Android + throttled 4G; lazy-load everything below hero; protect CLS with reserved space for canvas, video, sticky bar.
- **Reduced motion + zoom 200%** fully supported without hiding the CTA.

---

## 7. Registration Flow

```
View page
   │
   ▼
Click "Reserve My Seat" (any CTA)  ──► scroll/focus Registration form
   │
   ▼
Fill 5 fields: Name · Email · Phone · College/Company · Experience Level
   │  (inline validation on blur + submit; data never lost on error)
   ▼
Submit ──► validate (shared Zod schema, client + server)
   │
   ▼
Create registration record ──► hand off to payment (₹109)
   │                                   │ fail ─► recoverable error, keep data, retry
   ▼ success
Success state: "You're in. Check your email for the live link." + date/time recap
   │
   ▼
Feedback Survey (post-registration, premium, skippable-but-encouraged)
   • How did you hear about us?
   • What are you hoping to learn?
   • Current role?
   • AI experience level?
   • Biggest challenge with AI?
   │
   ▼
Store responses (marketing insights) ──► thank-you / next-steps
```

**Notes:** no account creation, no pre-payment email verification gate; price visible at the button; pending state prevents double-submit; analytics fires at submit, success, and feedback submit (no PII). Payment gateway is integrated in a later/config step — the flow is designed now.

---

## 8. Technical Architecture

**Stack:** Next.js 16+ (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · GSAP + ScrollTrigger · Framer Motion · Lenis · React Three Fiber + Three.js (WebGPU-first, WebGL2 fallback) · Vercel.

```
src/
├─ app/
│  ├─ layout.tsx            // fonts (next/font), Lenis provider, metadata/OG
│  ├─ page.tsx              // composes sections (mostly Server Components)
│  ├─ loading.tsx / error.tsx
│  └─ api/ (or server actions) // register, feedback endpoints
├─ components/
│  ├─ sections/             // one file per canonical section (rule 07)
│  ├─ ui/                   // Button, Field, Select, Accordion, Badge,
│  │                        //   CountdownTimer, SeatMeter, SectionHeading, StickyCta
│  ├─ 3d/                   // AICore canvas + 7 stage states (lazy, ssr:false)
│  └─ motion/               // LenisProvider, Reveal, useScrollStory hooks
├─ lib/
│  ├─ analytics.ts          // typed track()
│  ├─ validation.ts         // Zod schemas (register, feedback)
│  ├─ device-tier.ts        // getDeviceTier() single source
│  └─ countdown.ts          // time-to-event util
└─ content/
   ├─ event.ts              // date/time/price/seats — single source of truth
   ├─ agenda.ts  faq.ts  whatYouBuild.ts  instructor.ts  testimonials.ts
```

**Rendering:** Server Components by default; client boundaries only at interactive/3D/motion leaves. Static/ISR shell; edge-cached immutable assets. `web-vitals` reporting wired to analytics.

**Data:** registration + feedback via server action/API route, validated with shared Zod schema; responses persisted for the survey insights. Secrets in env, never committed.

**Rendering budget:** hero text/CTA/countdown are critical-path; 3D, video, GSAP, Lenis are code-split and lazy.

---

## 9. Component Tree

```
RootLayout
├─ FontProviders (Space Grotesk + Inter via next/font)
├─ LenisProvider (smooth scroll → drives ScrollTrigger)
├─ AnalyticsProvider
└─ Page (/)
   ├─ TopBar (wordmark · inline Reserve link)
   ├─ HeroSection [client island for canvas + countdown]
   │  ├─ SectionHeading (H1 "Build Your First AI Employee")
   │  ├─ Subheadline
   │  ├─ EventMeta (Date · Time · Price · Mode)
   │  ├─ SeatMeter  ├─ CountdownTimer
   │  ├─ Button (primary "Reserve My Seat")  ├─ Button (secondary "Watch Demo")
   │  └─ AICoreCanvas (lazy, ssr:false)  ← persists/transforms across scroll
   ├─ AIShiftSection (ScrollTrigger timeline 2023→2026)
   ├─ WhatYouBuildSection
   │  └─ BuildCard ×5 (Lead Generator · Telegram · Gmail · Resume Reviewer · Career Architect)
   ├─ LiveWorkflowSection (animated nodes: Form→Analysis→Telegram→Gmail→DB→Follow-up)
   ├─ AgendaSection (HourBlock ×3)
   ├─ InstructorSection (real profile · achievements · projects)
   ├─ TestimonialsSection (VideoTestimonial ×N, poster-first)
   ├─ RegistrationSection [client]  (sticky desktop)
   │  └─ RegistrationForm (Field ×4 + Select + Button "Reserve My Seat for ₹109")
   ├─ FaqSection (Accordion → AccordionItem ×N)
   ├─ FinalCtaSection
   │  ├─ SectionHeading (final-CTA headline)
   │  ├─ CountdownTimer (large)  ├─ PriceReminder  ├─ RegistrationForm (repeat)
   ├─ Footer (contact · privacy · terms)
   ├─ StickyCta (mobile bottom bar, appears post-hero)
   └─ FeedbackSection [client] (renders post-registration success)
      └─ FeedbackForm (5 questions → store)
```

---

## 10. Page-by-Page User Journey

Single page, scroll journey (emotional arc: curiosity → recognition → capability → urgency → action):

1. **Land (Hero):** instantly grasp the offer, see countdown + price + seats. Curiosity sparked by the living AI Core. *Action available: Reserve / Watch Demo.*
2. **The AI Shift:** "2023→2026" reframes AI from tool to *employee* — visitor recognizes they're at the curve's edge. The Core begins transforming.
3. **What You'll Build:** concrete deliverables turn abstract interest into "I'll actually leave with these." Capability established.
4. **Live Workflow:** sees the mechanism work end-to-end (lead → revenue). Belief: "this is real and learnable without code."
5. **Agenda:** removes uncertainty about the 3 hours; promise-per-hour.
6. **Instructor:** real credibility; trust to hand over ₹109.
7. **Testimonials:** social proof from authentic voices.
8. **Registration:** value + price + urgency restated at the form; 30-second, 5-field commit.
9. **FAQ:** last objections dissolved (esp. "no coding needed").
10. **Final CTA:** emotional close + big countdown + price + repeat form → final push.
11. **Post-register:** calm success confirmation → feedback survey → done.

Throughout: sticky desktop form / mobile CTA bar keep the action one tap away at every scroll position.

---

## 11. CRO Opportunities

- **Price-as-reassurance:** repeat `₹109` at every CTA; frame as trivially low vs. outcome (the lever for this offer).
- **Friction audit:** 5 fields only, no account, no pre-pay verification, inline validation, never lose data.
- **Sticky reachability:** desktop sticky form + mobile bottom bar = CTA always in view (biggest single conversion lever).
- **Honest scarcity:** real countdown + seats-remaining; "Live & interactive" reinforces exclusivity vs. a recording.
- **Trust stacking before the ask:** agenda + instructor + testimonials placed immediately around the form.
- **Microcopy de-risking:** "Live link sent to your email", "Takes 30 seconds" lower submit anxiety.
- **Objection-killing FAQ:** lead each answer with the reassurance.
- **Single primary action:** no competing CTAs; `Watch Demo` strictly secondary.
- **Performance = conversion:** sub-2.5s LCP and no CLS protect mobile completion rates.
- **A/B-ready hooks:** instrument CTA variants, hero subcopy, and form placement (post-launch experiments via the typed `track()` layer).
- **Exit/scroll-intent re-engagement (tasteful):** consider a single non-blocking reminder of countdown/price near final CTA — never a blocking popup.

---

## 12. Performance Plan

**Targets:** Lighthouse ≥ 95 · LCP < 2.5s · INP < 200ms · CLS < 0.1 · 60fps.

- **Critical path:** hero text + CTA + countdown render first and standalone (hero TEXT is the LCP element).
- **Lazy/Split:** 3D AI Core (`next/dynamic`, `ssr:false`, viewport + device-tier gated), GSAP/Lenis, testimonial video (poster-first), below-fold sections.
- **Fonts:** self-hosted Space Grotesk + Inter via `next/font`, subset, preload used weights, no FOIT/CLS.
- **Images:** `next/image`, AVIF/WebP, explicit dimensions, lazy; no stock photos.
- **3D budget:** WebGPU-first → WebGL2 → static poster; dpr `[1,2]`; device-tiered particle counts; pause offscreen/on blur; reduce on low-end + reduced-motion; separate chunk (~≤250KB gzip target).
- **JS budget:** Server Components by default; minimal initial client JS; audit every dependency's size before adding.
- **Caching/render:** static/ISR shell, edge-cached immutable assets, streamed RSC.
- **Motion:** only `transform`/`opacity`; will-change used sparingly and removed.
- **Guardrails:** `web-vitals` → analytics; a Lighthouse drop below 95 or any vital breaching budget is a build blocker; test on mid-tier mobile + throttled network.

---

### Approval Gate
This plan and the 12 Context Engineering rules in `.cursor/rules/` are complete. **No React/Next.js/Three.js/Tailwind/animation code will be written until this plan is approved.**
