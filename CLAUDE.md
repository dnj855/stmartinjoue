# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static one-page site for "St-Martin joue", a board game association in St-Martin-de-l'If (Seine-Maritime, France). All content is in French. Vite + Tailwind CSS v4, no JS framework, deployed on GitHub Pages.

## Commands

```bash
pnpm run dev          # dev server, opens /index.html
pnpm run build        # → ./dist
pnpm run preview      # serve the production build
pnpm run format       # prettier + prettier-plugin-tailwindcss on src/**/*.{html,js,jsx,ts,tsx}
node src/main.test.js # asserts on nextSession/countdown, prints "ok" — no runner, no package.json script
```

No linter. `pnpm run build` plus the test file above are the whole verification story — run both after non-trivial changes.

## Architecture

Everything lives in four files under `src/` (Vite `root` is `src/`, build outputs to `../dist`):

- `index.html` — the entire site. Sections in DOM order: `#top` (hero), `#comment`, `#jeux`, `#agenda`, `#adhesion` (contains `#formulaire` → the HelloAsso widget), `#contact`. The nav links to all but `#top`/`#formulaire`, so renaming a section id means updating the nav too. Head carries the SEO/OG meta, the Google Fonts link, and canonical `https://stmartinjoue.fr/`.
- `main.js` — the session dates are **data in the HTML**, not logic in the JS: each `#agenda [data-date]` element carries an ISO datetime. `initNextSession()` reads them on DOM ready, picks the next one still in the future, and fills `#next-event-date`, `#next-event-time` and the `#cd-d/h/m/s` countdown cells (ticking every second). Adding or moving a session = editing `data-date` in `index.html`, never the script. When every date is past, the function bails early and the static HTML content stands as-is — so someone has to top up the agenda before the last date expires.
  - `nextSession(dates, now)` and `countdown(target, now)` are exported and pure, which is what `main.test.js` covers.
- `main.test.js` — plain `node:assert/strict`, no framework. Run it directly.
- `style.css` — Tailwind v4 (`@import 'tailwindcss'` + one `@theme` block; there is no `tailwind.config.js`). The `@theme` block is the whole design system: fonts (`--font-display/sans/mono`), the brand palette (`cream`, `ink`, `red`, `blue`, `yellow`, `green`, the `night-*` and neutral ramps) and two animations (`--animate-marquee`, `--animate-rise`). Everything else in the file is the `prefers-reduced-motion` reset and `scroll-behavior`. There are no hand-written utility classes — all styling is Tailwind utilities inline in `index.html`.

`src/public/img/` is served at the site root (`img/logo.png`, `img/header.webp`, `img/favicon.ico`).

Membership uses an embedded HelloAsso iframe widget (`#haWidget`) — the head preconnects to `helloasso.com` for it.

## Deployment

`.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages on every push to `main`. There is no staging environment; a merge to `main` is a production deploy.

## Conventions

- Keep ARIA labels, semantic sectioning, and keyboard-reachable nav intact — the site was built with accessibility in mind. The header nav is CSS-only (`flex-wrap`, no hamburger, no JS): it wraps on narrow screens. Don't reintroduce a JS mobile menu.
- No invented content. The testimonials that shipped with the design mockup were deleted rather than published as real member quotes; same rule for any placeholder name, review, or number.
- `pnpm run format` needs `.prettierrc` to point `tailwindStylesheet` at `src/style.css`. Without it the Tailwind plugin falls back to v3 mode, hunts for a nonexistent `tailwind.config.mjs`, and the script fails.
- `LICENSE` is the upstream starter's MIT (Kometo Labs) — the project was scaffolded from `vite-tailwind-nojs-starter`. Leave it alone.

## Known gaps

- `og:image` / `twitter:image` are relative paths (`/img/header.webp`); Facebook and Twitter scrapers want absolute URLs.
- Fonts are loaded from Google Fonts (render-blocking, third-party).
