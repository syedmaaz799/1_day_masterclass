# Mobile Scroll Performance Plan

**Goal:** 4GB RAM phones scroll smoothly through pinned story sections.  
**Constraints:** No design or layout changes on any breakpoint. Desktop behavior and appearance unchanged.  
**Scope:** Touch / coarse-pointer devices only (`(pointer: coarse)` and `max-lg` where CSS-only).

---

## Problem summary

Mobile jank comes from **main-thread + GPU compositing**, not RAM exhaustion:

- Lenis smooth-scroll fighting touch scroll + GSAP ScrollTrigger scrub
- Aurora `background-attachment: fixed`, blur, and continuous CSS animation
- `backdrop-blur` on fixed/sticky chrome
- Long pinned scroll tracks with heavy per-frame scrub work
- `will-change` on all story layers promoting excess compositor layers
- Workflow orbital: slow CSS transitions, `animate-ping`, blur cards

---

## Implementation checklist

### Phase 1 — Scroll authority (mobile only)

| # | Change | File(s) | Visual impact |
|---|--------|---------|---------------|
| 1.1 | Disable Lenis on coarse pointer; use native touch scroll | `LenisProvider.tsx` | None — snappier finger tracking |
| 1.2 | Bridge native scroll → `ScrollTrigger.update()` on scroll | `LenisProvider.tsx` | None |

Desktop: Lenis + GSAP ticker unchanged.

---

### Phase 2 — Global background (mobile only)

| # | Change | File(s) | Visual impact |
|---|--------|---------|---------------|
| 2.1 | Aurora `::after`: `background-attachment: scroll` below `lg` | `aurora-background.tsx`, `globals.css` | Imperceptible |
| 2.2 | Aurora blur `10px` → `6px` below `lg` | `aurora-background.tsx` | Imperceptible |
| 2.3 | Pause aurora animation when tab hidden | `aurora-background.tsx` | None while viewing |
| 2.4 | Pause aurora animation when layer offscreen | `aurora-background.tsx` | None while on screen |

---

### Phase 3 — GPU-heavy chrome (mobile only)

Replace `backdrop-blur` with opaque surface on touch — same dark UI, no glass effect on phones.

| # | Component | File |
|---|-----------|------|
| 3.1 | Top nav (scrolled state) | `TopNav.tsx` |
| 3.2 | Mobile sticky CTA bar | `MobileRegistrationBar.tsx` |
| 3.3 | AI companies register dock | `AICompaniesStory.tsx` |
| 3.4 | Workflow node detail card | `OrbitalNodeDetailCard.tsx` |
| 3.5 | Orbital core inner dot | `RadialOrbitalTimeline.tsx` |

Desktop (`lg+`): blur preserved where it exists today.

---

### Phase 4 — Scroll story tuning (mobile only)

| # | Change | File(s) | Visual impact |
|---|--------|---------|---------------|
| 4.1 | Lower coarse scrub cap `0.35s` → `0.2s` | `ScrollStory.tsx` | None — crossfade keeps pace with finger |
| 4.2 | `will-change` only on `lg+` story stages | `ScrollStory.tsx` | None |
| 4.3 | AI Shift track: `100svh` → `78svh` per stage on mobile | `AIShiftSection.tsx` | Same scene, less scroll distance |
| 4.4 | Workflow track: `115svh` → `88svh` per stage on mobile | `WorkflowOrbitalScrollView.tsx` | Same orbit UI, less scroll distance |
| 4.5 | Workflow scrub: `2.25s` cap irrelevant on mobile; pass `0.2` coarse override | `WorkflowOrbitalScrollView.tsx` | None |

AI Companies already uses `50svh` mobile / `72svh` desktop — no change.

---

### Phase 5 — Workflow orbital (mobile only)

| # | Change | File(s) | Visual impact |
|---|--------|---------|---------------|
| 5.1 | Disable `animate-ping` rings on coarse pointer | `RadialOrbitalTimeline.tsx` | Subtle — core still breathes |
| 5.2 | Scroll-controlled transition `1200ms` → `650ms` on coarse | `RadialOrbitalTimeline.tsx` | Faster, still smooth |
| 5.3 | Pause `nv-core-breathe` when orbit offscreen | `RadialOrbitalTimeline.tsx` | None while scrolling demo |

---

### Phase 6 — AI companies (mobile only)

| # | Change | File(s) | Visual impact |
|---|--------|---------|---------------|
| 6.1 | Pause background glow breathe when pinned viewport offscreen | `AICompaniesStory.tsx` | None while in section |

Brand reveal blur/clip-path unchanged — design preserved.

---

### Phase 7 — Bundle / load

| # | Change | File(s) | Visual impact |
|---|--------|---------|---------------|
| 7.1 | `next/dynamic` code-split workflow demo section | `page.tsx` | None — skeleton reserves space |
| 7.2 | `next/dynamic` code-split AI companies section | `page.tsx` | None — skeleton reserves space |

Smaller initial JS → faster first interaction on low-end phones.

---

## Out of scope (preserves design)

- No alternate mobile layout for workflow
- No removal of brand reveal effects
- No chapter cuts in AI companies
- No desktop Lenis / scrub / track changes
- No typography, color, or spacing changes

---

## Implementation status

**Completed** — all phases above are implemented. Desktop (`pointer: fine`, `lg+`) behavior preserved.

---

## Verification

1. `npm run typecheck && npm run lint && npm run build` ✓
2. Chrome DevTools → mobile emulation → Performance while scrubbing workflow + AI companies
3. Real 4GB device: scroll workflow up/down — finger should track content without lag
4. Desktop `lg+`: confirm Lenis active, blur on nav, full `svh` tracks, ping rings visible
5. `prefers-reduced-motion`: unchanged fallback path

---

## Files touched

```
MOBILE-SCROLL-PERFORMANCE.md          (this plan)
src/components/motion/LenisProvider.tsx
src/components/motion/ScrollStory.tsx
src/components/motion/index.ts
src/components/ui/aurora-background.tsx
src/components/sections/TopNav.tsx
src/components/sections/MobileRegistrationBar.tsx
src/components/sections/AIShiftSection.tsx
src/components/sections/AICompaniesStory.tsx
src/components/workflow-demo/WorkflowOrbitalScrollView.tsx
src/components/workflow-demo/RadialOrbitalTimeline.tsx
src/components/workflow-demo/OrbitalNodeDetailCard.tsx
src/app/globals.css
src/app/page.tsx
src/components/motion/use-pause-when-offscreen.ts   (new)
```
