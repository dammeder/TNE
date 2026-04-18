# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TNE (Transnational Experts Inc.) is a static marketing website for an Illinois-based step deck trucking carrier. No build system, no framework, no package manager — plain HTML/CSS/JS served directly.

## Architecture

Single-page site with three files:
- `index.html` — all markup; sections are numbered with comments (1. Nav → 10. Footer)
- `css/styles.css` — all styles
- `js/main.js` — all JavaScript, vanilla ES5, wrapped in an IIFE

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
