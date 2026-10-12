# PacePDF website

The independent React + Vite website for the PacePDF Android app. This project lives at `C:\Users\Faiz\OneDrive\Desktop\ALLPROJECTS\pacepdf-web`. The neighboring Flutter app and the existing portfolio were not modified.

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

The public Play listing could not be verified. `product.playUrl` remains `null`; CTAs lead to the on-page closed-testing status and feature section. To enable a verified public listing later, set that one property to the actual URL. No download, price, review or release-date claims are included.

## Deploy as a NEW Vercel project

The CLI reported **Logged out**. No Vercel project was created, linked or deployed during implementation. No existing portfolio deployment was touched. Authentication is the remaining action that needs the account owner.

1. From this website folder, run `npx vercel login` and complete Vercel's sign-in in your own browser.
2. Run `npx vercel link`. Choose your account/team, choose **create a new project**, and give the independent project a PacePDF-specific name. Do not select the existing portfolio project.
3. The framework is Vite, build command is `npm run build`, and output directory is `dist` (configured in `vercel.json`). No SPA rewrite is required: the site uses one page and real anchor targets.
4. Enable access to system environment variables in the new project's environment settings. The production build reads the actual `VERCEL_PROJECT_PRODUCTION_URL` for canonical, sitemap and social URLs. [Vercel documents this production-domain variable here.](https://vercel.com/docs/environment-variables/system-environment-variables#vercel_project_production_url)
5. If using a custom domain, add and verify it, then set `SITE_URL` in the **Production** environment to that exact HTTPS origin. It must contain no path, query or trailing content beyond `/`. This explicit origin takes precedence over Vercel's default domain.
6. Run `npx vercel --prod`. Confirm the printed deployment URL and final production domain. Do not reuse an old `.vercel` project binding copied from another project.
7. Inspect the live source: canonical and Open Graph URLs must match the final domain, robots must allow crawling, and `/sitemap.xml` must contain the same canonical homepage URL. Run the browser and Lighthouse checks against the live URL.

**Local and Vercel preview builds are intentionally noindex.** Without a verified domain, no fabricated canonical URL is emitted; `robots.txt` disallows crawling and `sitemap.xml` has an empty URL set. A Vercel production build fails if no production origin is available. With the actual origin configured, the build generates `index, follow`, canonical, absolute social-image URLs, `Allow: /` and a populated sitemap. Preview deployments remain noindex even if `SITE_URL` is set.

For a production build on your machine after the actual domain is known:

```powershell
$env:SITE_URL = 'https://YOUR-ACTUAL-PRODUCTION-DOMAIN'
npm run build
Remove-Item Env:\SITE_URL
```

That domain is an instruction placeholder, not a claimed deployed address. Environment values are read from the build process; `.env.example` documents the variable, but the prerender script does not automatically load `.env` files.

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

Browser reports, light/dark screenshots and the Lighthouse HTML/JSON report are in `artifacts/` (excluded from deployment and Git). See `IMPLEMENTATION_REPORT.md` for the completed delivery checklist.
