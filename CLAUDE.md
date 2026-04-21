# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TNE (Transnational Experts Inc.) is a static marketing website for an Illinois-based step deck trucking carrier. No build system, no framework, no package manager — plain HTML/CSS/JS served directly.

## Architecture

Single-page site with three files:
- `index.html` — all markup; sections are numbered with comments (1. Nav → 10. Footer)
- `css/styles.css` — all styles
- `js/main.js` — all JavaScript, vanilla (modern ES, `const`/`let`/arrow-compatible), wrapped in an IIFE

**Driver Application Form** submits via `fetch` to a Google Apps Script Web App URL (`GOOGLE_SCRIPT_URL` in `js/main.js`) which appends rows to a Google Sheet. Setup instructions are in `GOOGLE_SHEETS_SETUP.md`.

## Development

No build step. Open `index.html` directly in a browser, or use any static file server:
```
npx serve .
# or
python3 -m http.server
```

## Design System

Defined in `mockups/DESIGN.md`. Key rules:
- **Dark theme** — base `#111317` (obsidian), never pure `#000000`
- **No solid borders** — use tonal shifts, negative space, or glassmorphism instead
- **Glassmorphism** — semi-transparent surface (~40-60% opacity) + `backdrop-filter: blur(20px)` on floating elements
- **Gradients** — `#9d50bb` → `#edb1ff` for primary accent; used as "light sources" not flat fills
- **Typography** — Space Grotesk for headlines, Inter for body
- **No sharp corners** — minimum `md` roundedness everywhere
- **Shadows** — extra-diffused (40-80px blur), low opacity (4-8%), tinted not black

## Placeholders

Several `[PLACEHOLDER]` tags exist in the code that need real values:
- Liability insurance amount (`index.html`, credentials section)
- Contact email (`index.html`, footer)
- Hero/fleet/maintenance images (currently using external URLs)
- Trailer specs (length, deck height, payload capacity) in the SVG blueprint
- `GOOGLE_SCRIPT_URL` in `js/main.js` if the Apps Script is redeployed

## Frontend Engineering Principles

Before making any change to this codebase, think like a senior frontend engineer:

### Aesthetics
- Every visual change must serve a purpose — ask "does this look better AND why?"
- Follow the design system in `mockups/DESIGN.md` strictly: dark theme, glassmorphism, gradients, no solid borders, no sharp corners
- Hover/transition states give the UI life — never remove them without a strong reason
- Typography hierarchy must be preserved: don't use large font sizes for elements that are subordinate (e.g. labels should not compete with headlines)
- Spacing consistency: use `--section-gap` and existing CSS variables, never hardcode arbitrary values
- Use `clamp()` for font sizes that must scale — never replace a `clamp()` with a fixed size

### Functionality
- Removing a feature (scroll indicator, counter animation, hover effect) requires a clear reason — "I don't like it" is not enough
- Before deleting any JS behavior, confirm it's truly not needed
- Form UX: focus states must always be visually distinct — never remove focus rings (accessibility requirement)
- Don't auto-blur focused elements — let users control focus

### Code quality
- No inline `style=` attributes — use CSS classes
- No dead CSS (classes defined in styles.css with no matching HTML element)
- No `user-select: none` on informational/content sections
- Responsive-first: test every change at 375px, 768px, and 1200px mentally before committing

### Content
- Don't duplicate information across sections (e.g. "48 States" appears in hero badges — don't repeat in stats)
- Marketing copy should be a pitch, not a spec sheet — keep language compelling
- Every section should earn its place: if it repeats something said elsewhere, cut or differentiate it

### Known intentional decisions (do not revert)
- Mobile nav has no hamburger menu — this is intentional, do not add one back
- Hero label shows "Transnational Experts Inc." — the company name has no other prominent placement on the page, this is intentional
