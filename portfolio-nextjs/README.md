# Portfolio Maul — Next.js

Rebuild penuh dari `portfolio-maul-v13-fixed.zip` (vanilla HTML/CSS/JS) menjadi project **Next.js 15 (App Router) + TypeScript + Tailwind CSS**, sesuai `RENCANA-MIGRASI-NEXTJS-1.md`.

## Quick Start
```bash
npm install --legacy-peer-deps
npm run dev          # http://localhost:3000
```

## Build & Deploy (Cloudflare Pages)
```bash
npm run pages:build  # npx @cloudflare/next-on-pages
npm run preview      # wrangler pages dev .vercel/output/static
npm run deploy       # build + deploy via wrangler
```
Di dashboard Cloudflare Pages: **Build command** = `npx @cloudflare/next-on-pages`, **Build output** = `.vercel/output/static`, **Node version** = 18 atau 20.

## Sebelum Go-Live — ganti placeholder ini:
1. `https://YOUR-DOMAIN-HERE.pages.dev` → domain asli (di `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`).
2. Link GitHub & LinkedIn di `components/sections/Contact.tsx` (masih placeholder).
3. Link live demo 2 proyek riset di `components/sections/Research.tsx` (masih placeholder).

## Yang sudah diimplementasikan (dari rencana §5/§5A)
| Rencana | Implementasi |
|---|---|
| Intro bounce → GSAP Timeline | `components/sections/Intro.tsx` (`bounce.out` + partikel shard R3F) |
| Reveal on scroll → Framer Motion | `components/ui/Reveal.tsx` (drop-in pengganti IntersectionObserver manual) |
| Lenis smooth scroll | `components/ui/SmoothScrollProvider.tsx`, dipasang di `app/layout.tsx` membungkus `{children}` (`lenis/react`, easing sama dgn vanilla) |
| tilt-card → 3D | `components/ui/TiltCard3D.tsx` (spring physics + glare dinamis) |
| Hero 3D background | `components/three/HeroScene.tsx` (floating shapes + particle field + mouse parallax) |
| Skills orbit 3D | `components/three/SkillOrbit.tsx` (CSS preserve-3d, tanpa WebGL) |
| Contact ambient 3D | `components/three/AmbientParticles.tsx` |
| Cert flip 3D + marquee | `components/sections/Certificates.tsx` (auto-flip stagger + tap manual) |
| Gallery + lightbox | `components/sections/Gallery.tsx` (lazy video, progress bar, lightbox dgn keyboard/swipe) |
| Timeline auto-scroll | `components/sections/Experience.tsx` (loop mulus, pause saat interaksi) |
| Semua efek vanilla | preloader ようこそ, custom cursor, scroll progress, magnetic buttons + ripple, split-text (word/fword/fchar/wword dgn seed PRNG 42 yg sama), counter, project sketch border, navbar glass + active highlight |

## Prinsip performa 3D (§5A)
- Semua `<Canvas>` di-`dynamic(..., { ssr: false })` + mount hanya saat section terlihat (`LazyCanvas`).
- `use3DEnabled()` mematikan 3D jika `prefers-reduced-motion`, core ≤ 4, atau RAM ≤ 4GB.
- `prefers-reduced-motion` menonaktifkan semua animasi (CSS media query global).

## Catatan
- `next/image` diset `unoptimized: true` (Cloudflare Pages tidak punya image optimizer Node).
- Semua halaman pakai `export const runtime = "edge"`.
- Semua video < 2.5 MB → aman di bawah limit 25 MB/file Cloudflare Pages.
