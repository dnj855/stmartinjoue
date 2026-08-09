# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static one-page site for "St-Martin joue", a board game association in St-Martin-de-l'If (Seine-Maritime, France). All content is in French. Vite + Tailwind CSS v4, no JS framework, deployed on GitHub Pages.

## Commands

```bash
pnpm run dev      # dev server, opens /index.html
pnpm run build    # → ./dist
pnpm run preview  # serve the production build
pnpm run format   # prettier + prettier-plugin-tailwindcss on src/**/*.{html,js,jsx,ts,tsx}
```

No tests, no linter. `pnpm run build` is the only verification available — run it after non-trivial changes.

## Architecture

Everything lives in three files under `src/` (Vite `root` is `src/`, build outputs to `../dist`):

- `index.html` — the entire site. Sections are anchor targets (`#about`, `#events`, `#practical`, `#membership`, `#contact`); the nav links to them, so renaming a section id means updating the nav too. Head carries the SEO/OG meta and canonical `https://stmartinjoue.fr/`.
- `main.js` — two independent functions, both run on DOM ready:
  - `initMobileMenu()` — drives the off-canvas nav by toggling the `translate-x-full` Tailwind class on `#main-nav` and `aria-expanded` on `#menu-toggle`. Depends on those ids and on the `.menu-line-1` / `.menu-line-2` children existing in the HTML.
  - `getNextEventDate()` — computes the club's next session (last Friday of the month, skipping July and August, rolling over after 20h) and writes it into `#next-event-date`. This is the association's actual schedule — change it only if the real schedule changes. **Currently dormant**: the `#next-event-date` heading in `index.html` is commented out and replaced by a hardcoded date, so the function runs and finds nothing. Re-enabling means uncommenting that `<h3>` and deleting the hardcoded one.
- `style.css` — Tailwind v4 (`@import 'tailwindcss'` + `@theme` block for the gradient colors; there is no `tailwind.config.js`). Also holds the hand-written keyframes and utility classes (`.gradient-text`, `.modern-card`, `.btn-modern`, `.animate-*`, `.neon-glow`) used throughout `index.html`.

`src/public/img/` is served at the site root (`img/logo.png`, etc.).

Membership uses an embedded HelloAsso iframe widget (`#haWidget`) — the head preconnects to `helloasso.com` for it.

## Deployment

`.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages on every push to `main`. There is no staging environment; a merge to `main` is a production deploy.

## Conventions

- Keep ARIA labels, semantic sectioning, and keyboard-reachable nav intact — the site was built with accessibility in mind.
- `pnpm run format` needs `.prettierrc` to point `tailwindStylesheet` at `src/style.css`. Without it the Tailwind plugin falls back to v3 mode, hunts for a nonexistent `tailwind.config.mjs`, and the script fails.
- `LICENSE` is the upstream starter's MIT (Kometo Labs) — the project was scaffolded from `vite-tailwind-nojs-starter`. Leave it alone.
