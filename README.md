# PacePDF website

The independent React + Vite website for the PacePDF Android app. This project lives at `C:\Users\Faiz\OneDrive\Desktop\ALLPROJECTS\pacepdf-web`. The neighboring Flutter app and the existing portfolio were not modified.

Live website: **https://pacepdf-web.vercel.app/**. Public repository: **https://github.com/Faizzsyed/pacepdf-web**. The independent Vercel project is `pacepdf-web`, connected to the repository's `main` production branch.

## Run locally

Requires Node.js 22.12+ (tested with Node 24.14.1) and npm.

```powershell
Set-Location 'C:\Users\Faiz\OneDrive\Desktop\ALLPROJECTS\pacepdf-web'
npm ci
npm run dev
```

Production preview:

```powershell
npm run lint
npm run build
npm run preview -- --port 4173 --strictPort
```

Open `http://127.0.0.1:4173/`. The deliverable is `dist/`; no server, authentication, Firebase or database is needed.

## Structure and content

- `src/App.jsx`: all eleven requested sections.
- `src/components.jsx`: navigation, theme, phone frames, gallery, lightbox and reusable cards.
- `src/config.js`: centralized Play URL, availability, verified policy/contact links, developer profiles and SEO copy.
- `src/content.js`: verified tools, benefits, FAQ and preview descriptions.
- `src/styles.css`: responsive layout, brand colors and reduced-motion support; Tailwind v4 is integrated through Vite.
- `scripts/prerender.mjs`: generates complete static HTML and production SEO files.
- `public/assets/`: optimized approved logo, favicons, self-hosted font and original social preview.
- `public/previews/`: six original illustrative SVG interface previews.
- `source-assets/`: the logo copied read-only from the app and the Manrope font license.

React, Motion and Lucide provide the UI and interactions. JavaScript is used consistently. Styles use CSS variables and component classes alongside Tailwind's framework integration.

The page is fully rendered at build time with `react-dom/server`, then hydrated in the browser. The hero, all tools, creator names and FAQs appear in `dist/index.html` without JavaScript. Native `details` keeps FAQ answers usable without JavaScript. The local theme bootstrap prevents a flash when switching themes, and respects the device preference until a user saves a choice.

## Product accuracy and assets

The app's `lib/features/tools/domain/tool_catalog.dart`, reader, settings, privacy configuration and current project notes were inspected read-only. Current tool names are preserved, including `Rotate Pages`, `Watermark PDF`, `JPG / PNG to PDF`, `PDF to JPG` and combined `Protect / Unlock PDF`. `Read PDF` represents the separately implemented reader. Scanner support is qualified as in testing; OCR is explicitly coming soon.

No genuine app screenshots were available in the Flutter project. Phone visuals are **illustrative interface previews**, labeled on the page, in alt text and in the lightbox. They are original, editable SVGs; they are not represented as real app captures. Replace these six previews with approved captures of Home, Tools, Reader, Files, Compress PDF and Sign PDF when supplied. Update the preview disclosure and alt text only after that replacement. Developer initials are intentional avatars, not fabricated portraits.

The approved `assets/branding/logo.png` is the only image copied from the Flutter project. No reference-page source or assets were copied. The reference was inspected in Chrome at desktop and mobile sizes: [PacePDF reference](https://isa-shaikh-app.web.app/apps/pacepdf). Its clear product hierarchy, grouped tools, restrained cards and release status informed an original warm-white/red editorial design with phone frames.

The existing [Privacy Policy](https://isa-shaikh-app.web.app/privacy/pacepdf) URL is linked unchanged. No policy text was edited, no Terms were invented. Isa's LinkedIn and the contact email were verified from the reference page. The portfolio, GitHub, Isa website and policy returned HTTP 200. LinkedIn blocks automated access (HTTP 999); its links were retained from the user's supplied profile and the official reference.

PacePDF is now available on Google Play for Android: https://play.google.com/store/apps/details?id=com.pacepdf.app. `product.playUrl` supplies the navbar, mobile menu, hero, download section and footer links. The hero and download section use Google's official, unmodified Google Play badge. No pricing, ratings, review counts or download counts are claimed. Scanner qualifications and the upcoming OCR status remain unchanged.

## Production deployment

The new independent Vercel project `pacepdf-web` is connected to `Faizzsyed/pacepdf-web` with production branch `main`. Pushes to `main` trigger Vercel's GitHub integration; no deployment token or GitHub Actions secret is required in this repository. Other branches use preview deployments. The existing portfolio project was not linked, reconfigured or deployed.

Production settings are **Vite**, repository root **`.`**, Node **24.x**, build command **`npm run build`**, output **`dist`**. `SITE_URL` is set in Vercel's Production environment to **`https://pacepdf-web.vercel.app`**. Access to system environment variables is enabled. The build derives canonical, sitemap and social URLs from this exact origin; [Vercel's production-domain system variable](https://vercel.com/docs/environment-variables/system-environment-variables#vercel_project_production_url) provides the fallback.

To publish future website changes, commit only relevant files and push `main`. Verify the corresponding deployment reaches **Ready** in [the Vercel project](https://vercel.com/faizusayed256-6788s-projects/pacepdf-web), then check the live homepage, robots and sitemap. No SPA rewrite is needed; the site uses one page and real anchor targets.

To link a fresh local checkout of this same repository:

```powershell
vercel login
vercel link --yes --scope faizusayed256-6788s-projects --project pacepdf-web
```

If the production domain changes, verify the new domain first, update `SITE_URL` in Vercel's Production environment and redeploy. The website source does not need to change. Keep `.vercel/`, all `.env*` files, `node_modules`, generated output and temporary reports excluded from Git. Never reuse another project's local Vercel binding.

**Local and Vercel preview builds are intentionally noindex.** Without a verified domain, no fabricated canonical URL is emitted; `robots.txt` disallows crawling and `sitemap.xml` has an empty URL set. A Vercel production build fails if no production origin is available. With the actual origin configured, the build generates `index, follow`, canonical, absolute social-image URLs, `Allow: /` and a populated sitemap. Preview deployments remain noindex even if `SITE_URL` is set.

For a production build on your machine after the actual domain is known:

```powershell
$env:SITE_URL = 'https://pacepdf-web.vercel.app'
npm run build
Remove-Item Env:\SITE_URL
```

Environment values are read from the build process. The prerender script does not automatically load `.env` files. Local environment files are excluded from the public repository.

## Google Search Console after deployment

1. Add a Domain property for a domain you control and verify it using the DNS TXT record Google provides. For a Vercel subdomain, use a URL-prefix property for the exact HTTPS production URL; use Google's HTML verification file in `public/` and redeploy, or add the exact verification meta tag to `index.html`. [Ownership verification instructions.](https://support.google.com/webmasters/answer/9008080)
2. Confirm `/robots.txt` allows crawling and `/sitemap.xml` contains the actual homepage URL. In Search Console's Sitemaps report, submit `sitemap.xml`. [Sitemap submission instructions.](https://support.google.com/webmasters/answer/7451001)
3. Use URL Inspection on the canonical homepage; run the live URL test and inspect the rendered HTML. [URL Inspection instructions.](https://support.google.com/webmasters/answer/9012289)
4. If the live test is successful, select Request indexing. Recheck Search Console over time. Verification, sitemap submission and good metadata do not guarantee indexing or rankings.

## Checks and evidence

Run the preview server in one terminal, then use another:

```powershell
npm test
node scripts/link-check.mjs
node scripts/lighthouse-check.mjs
npm audit
```

The browser scripts use installed Google Chrome via Playwright's `channel: 'chrome'`. Lighthouse's default Chrome path is the Windows installation tested here; adjust it in `scripts/lighthouse-check.mjs` for another OS. `PREVIEW_URL` can point the scripts to the live production site.

`npm test` checks rendered HTML, exact metadata, verified feature names, all local assets, navigation, FAQ keyboard behavior, filters, lightbox/focus restoration, gallery keyboard controls, theme persistence, reduced motion, no-JavaScript content, console/network errors, horizontal overflow at 320–1920px and automated WCAG checks. Automated checks complement manual review; they are not a complete accessibility certification.

Local Lighthouse mobile result: **Performance 99 / Accessibility 100 / Best Practices 100 / SEO 66**. The SEO loss is the intentional local `noindex`/robots restriction; the final production site must be checked again with its real domain and crawlability enabled. These are local measurements, not guaranteed production scores.

The deployed production site was checked on 13 October 2026: **Performance 99 / Accessibility 100 / Best Practices 100 / SEO 100**. Live Chrome tests passed at 320–1920px, with zero automated WCAG violations in desktop light, desktop dark and mobile checks. Static content, exact SEO copy, both developer credits, `index, follow`, canonical, Open Graph/Twitter URLs, JSON-LD and HTTP 200 responses for robots/sitemap/social image were verified. Lighthouse is a measured result, not an indexing or ranking guarantee.

Browser reports, light/dark screenshots and the Lighthouse HTML/JSON report are in `artifacts/` (excluded from deployment and Git). See `IMPLEMENTATION_REPORT.md` for the completed delivery checklist.
