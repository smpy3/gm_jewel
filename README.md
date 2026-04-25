<!-- README: explains how to run locally and export to GitHub Pages. -->

# Diamond Atelier (Next.js + Tailwind + Motion)

This folder is now a production-ready Next.js (App Router) jewelry site with:
- Dark modern UI (glass + glow)
- Framer Motion micro-interactions + staggered scroll reveals
- GSAP ScrollTrigger pinned storytelling
- Smooth scrolling (Lenis)
- Static export support for GitHub Pages

## Run locally

```bash
cd gallery-site-main
npm install
npm run dev
```

## Export for GitHub Pages

If your repo is `https://github.com/<user>/<repo>`, your base path is `/<repo>`.

```bash
set NEXT_PUBLIC_BASE_PATH=/<repo>
npm run export
```

The static site outputs to `out/`.

