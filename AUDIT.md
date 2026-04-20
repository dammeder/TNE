# TNE Website — Senior Frontend Audit

**Date:** 2026-04-19
**Scope:** Visual design, functionality, responsive behavior, UX flow
**Audience priority:** (1) Brokers — credibility & trust signals, (2) Drivers — recruitment

Placeholders are ignored. Issues sorted by severity.

---

## P0 — Fix First (Blocking)

### 1. Nav logo is 110px tall — way too big
`css/styles.css:233` — 2–3× a normal nav logo. On mobile it dominates the bar and causes the CTA + hamburger to collide. Shrink to ~50px desktop, ~40px mobile.

### 2. No broker CTA anywhere
Only CTA on the site is "Drive With Us" (driver-facing). A broker who reads the whole page has nowhere to go except hunt for a phone number in the footer. Add a broker-facing action — "Contact Dispatch" or "Request a Rate" — in the nav and/or at the bottom of the Credentials section.

### 3. "1+ Years in Operation" is hurting broker trust
Brokers screen carriers for tenure. This stat, displayed with gradient treatment at the front of the stats grid, immediately signals "new company." That's the exact objection the rest of the page is trying to overcome. Replace with a metric that builds confidence: "48 States Covered", "100% On-Time", "Zero Cargo Claims", etc.

### 4. Mobile nav overflow
`css/styles.css:1268` — `.nav__cta` is never hidden on mobile. So at 375px you have: 110px logo + gradient CTA button + hamburger = overflow. Fix: hide `.nav__cta` on mobile below 768px (or remove the hamburger and keep the CTA — see P1 #8).

---

## P1 — High Priority

### 5. Stats section has no heading
You jump from "Why Brokers Work With Us" directly into four large numbers with no label. Brokers skimming don't know the context. Add a heading like "By The Numbers" or "Operational Track Record" matching the style of other section headers.

### 6. Counter animation only runs on one stat
`js/main.js:97` — only index 3 ("53") animates. The others sit static while one counts up. Looks like a bug. Either animate all four or remove the counter.

### 7. Scroll-spy is styled but never wired
`css/styles.css:263` — `.nav__links a.active` has a gradient underline style but no JS ever adds the `.active` class. Users lose their place on long scrolls. Add an IntersectionObserver (~15 lines) to track which section is in view.

### 8. Mobile nav: consider dropping hamburger entirely
For a single-page scroll site, a full mobile menu overlay is heavy. Since brokers will scroll through naturally, removing the hamburger and keeping just the "Drive With Us" button is cleaner and more purposeful. If you do this, hide `.nav__mobile` and `.nav__hamburger` entirely on mobile via CSS.

### 9. Fleet SVG text is unreadable on mobile
The SVG uses a 1000×500 viewBox with 8–12px text. On a 375px screen that scales to ~3–4px — invisible. Hide the callout labels below 768px and let the spec cards carry the info.

### 10. Footer logo is 155px and hidden on mobile
`css/styles.css:1039` — the footer logo is bigger than the nav logo. On mobile it's `display:none`. Brand reinforcement at the bottom of the page is important for credibility. Shrink to ~70px and keep it visible on mobile.

### 11. Form success is always shown even on failure
`js/main.js:157` — `mode: 'no-cors'` means `.then()` fires whether the server succeeded or not. A broken Apps Script URL would still show "APPLICATION SENT ✓". Change the copy to "Application received — we'll follow up with you" (softer, no implied confirmation).

---

## P2 — Medium Priority

### 12. Hero doesn't lead with broker value
"LOADED WITH PURPOSE" is good brand energy but a broker landing here doesn't immediately know what you haul or where. Add one sub-line beneath the title: e.g. "Step Deck & Heavy-Haul — 48 States, Illinois-Based."

### 13. Hamburger is a `<div>`, not a `<button>`
`index.html:41` — screen readers and keyboard users can't trigger it. Swap to `<button type="button">`, add `aria-expanded`, toggle in JS.

### 14. Privacy Policy / Terms links go to `#`
Both links in the footer are dead. Brokers doing due diligence will click them. Remove them or write minimal placeholder pages.

### 15. Top third of page lacks section rhythm
Hero → Overview → Brokers → Stats all sit on the same dark background. The visual "one section at a time" feel breaks down here. Fleet and Maintenance (with their distinct panels and full-bleed image) do this well — apply the same logic upward. Use tonal background shifts, not borders.

### 16. Maintenance image is over-filtered
`css/styles.css:762` — `grayscale(1) brightness(0.4)` crushes the image almost to black. Try `grayscale(0.6) brightness(0.5)`. Same issue on the hero: `opacity: 0.28` + full grayscale is nearly invisible.

### 17. No social proof
No broker logos, testimonials, or case studies. The credentials panel covers regulatory trust but not relationship trust. Even one quote or one "Proud partner of X" line makes a difference.

### 18. Driver form has no email field
Phone-only capture makes follow-up harder. Add an email field to the form, the Apps Script, and the sheet.

---

## P3 — Polish / Nitpicks

- **Dead CSS:** `.hero__scroll` styles exist (`styles.css:428`) but no HTML element uses them. Clean up or add the scroll indicator.
- **`user-select: none` on stats, brokers, fleet, maintenance** — prevents brokers from copy-pasting MC/DOT numbers or specs. Remove.
- **`100vh` hero on iOS Safari** — the collapsing address bar causes a jump. Use `100svh` with `100vh` fallback.
- **`.fleet__spec-card` has a solid left border** — violates the design system's "No-Line" rule (`DESIGN.md`).
- **Stats `h4` drops 5rem → 2.5rem on mobile** — too aggressive. Try 3rem.
- **Footer map link has no affordance** — the address looks like plain text. Add a "View on Map →" hint.
- **Escape key doesn't close mobile nav** — minor a11y gap.
- **No `.apply__submit:disabled` CSS rule** — disabled state is handled inline by JS but not in the stylesheet.

---

## Scroll Flow Check

| Transition | Verdict |
|---|---|
| Hero → Overview | ✅ Clean — hero is full 100vh |
| Overview → Brokers | ⚠️ Blends — same dark bg, both use glass |
| Brokers → Stats | ❌ Weak — stats has no heading, feels like an orphan |
| Stats → Fleet | ✅ Strong — bordered blueprint panel is a clear reset |
| Fleet → Maintenance | ✅ Strong — full-bleed image is a clear shift |
| Maintenance → Credentials | ✅ OK |
| Credentials → Apply | ✅ OK |
| Apply → Footer | ✅ Strong — distinct surface color |

---

## Mobile Responsiveness Summary

**Works:** grid collapses, broker cards, form columns, footer collapse.

**Broken/weak:**
- Nav logo collision with CTA + hamburger at <400px
- Fleet SVG text unreadable
- Footer brand hidden on mobile
- No breakpoint between 1024–1440px (gap in coverage)
- `100vh` hero flickers on iOS Safari

---

## Priority Fix Order

1. Shrink nav logo → immediate visual improvement
2. Remove "1+ Years in Operation" → removes credibility damage
3. Fix mobile nav (hamburger vs. CTA decision) → layout integrity
4. Add broker CTA → enables conversions
5. Stats heading + counter consistency → polish
6. Scroll-spy active nav → orientation
7. Footer logo fix → brand consistency
8. Everything else

---

## What's Working

- Credentials panel + SAFER profile link — pro move for broker trust
- Fleet blueprint concept — differentiates from generic logistics templates
- Typography (Space Grotesk + Inter) — editorial and premium
- Glassmorphism is consistent and tasteful
- Scroll animations respect `prefers-reduced-motion`
- Form hover/focus states are clean
- Maintenance section hits both broker and driver audiences
