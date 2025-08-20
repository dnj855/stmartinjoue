# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for "St-Martin joue", a board game association in St-Martin-de-l'If, Seine-Maritime, France. The site is built with Vite, styled with Tailwind CSS v4, and deployed on GitHub Pages.

## Essential Commands

### Development

```bash
# Start dev server (opens at http://localhost:5173/index.html)
pnpm run dev

# Preview production build
pnpm run preview
```

### Build & Production

```bash
# Build for production (outputs to ./dist directory)
pnpm run build
```

### Code Formatting

```bash
# Format HTML and JS files with Prettier + Tailwind CSS plugin
pnpm run format
```

## Architecture & Structure

### Build Configuration

- **Vite Config**: Root is set to `src/` directory, build outputs to `../dist`
- **PostCSS**: Uses Tailwind CSS v4 with automatic `cssnano` optimization in production
- **Tailwind CSS v4**: Uses the new `@theme` directive for custom properties and native CSS imports

### Key Files

- `src/index.html` - Single-page website with French content, SEO meta tags, and inline JavaScript for mobile menu
- `src/style.css` - Tailwind CSS imports, custom theme colors, animations, and utility classes
- `src/public/` - Static assets (images, favicon) served directly

### Deployment

- Deployed on GitHub Pages
- Build command: `pnpm run build`
- Publish directory: `dist`

## Important Considerations

### Tailwind CSS v4

This project uses Tailwind CSS v4 with the `@tailwindcss/postcss` plugin. Key differences from v3:

- Uses `@import 'tailwindcss'` instead of directives
- Custom theme values defined with `@theme` block
- No separate `tailwind.config.js` file needed

### No JavaScript Framework

This is a pure HTML/CSS site with minimal vanilla JavaScript for the mobile menu. The build process doesn't involve any JS framework compilation.

### French Language Site

All content is in French. The site targets a local French audience for a board game association.

### Accessibility

The site includes proper ARIA labels, semantic HTML, and keyboard navigation support for the mobile menu.
