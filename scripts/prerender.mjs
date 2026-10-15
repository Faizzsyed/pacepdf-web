import { readFile, writeFile } from 'node:fs/promises';
import { render } from '../.ssr/entry-server.js';
import { product } from '../src/config.js';

let origin =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : '');
if (process.env.VERCEL_ENV === 'preview') origin = '';
if (origin) {
  const url = new URL(origin);
  if (
    url.protocol !== 'https:' ||
    url.pathname !== '/' ||
    url.username ||
    url.password ||
    url.search ||
    url.hash
  )
    throw new Error(
      'SITE_URL must be a final HTTPS origin, for example https://your-project.vercel.app',
    );
  origin = url.origin;
}
if (process.env.VERCEL_ENV === 'production' && !origin)
  throw new Error('Set SITE_URL to the actual production URL before deploying.');
const escape = (value) =>
  value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'PacePDF',
  operatingSystem: 'Android',
  downloadUrl: product.playUrl,
  installUrl: product.playUrl,
  applicationCategory: 'UtilitiesApplication',
  description: product.description,
  ...(origin ? { url: `${origin}/`, image: `${origin}/assets/social-preview.png` } : {}),
  author: [
    { '@type': 'Person', name: 'Isa Shaikh', url: 'https://isa-shaikh-app.web.app/' },
    { '@type': 'Person', name: 'Faiz Sayyed', url: 'https://faizsayyed.vercel.app/' },
  ],
  featureList: [
    'Read PDF',
    'Merge PDF',
    'Split PDF',
    'Compress PDF',
    'Organize Pages',
    'Remove Pages',
    'Rotate Pages',
    'Crop PDF',
    'Sign PDF',
    'Protect / Unlock PDF',
    'Watermark PDF',
    'Page Numbers',
    'JPG / PNG to PDF',
    'PDF to JPG',
    'Scan to PDF',
  ],
};
const head = [
  `<meta name="author" content="Faiz Sayyed" />`,
  `<meta name="robots" content="${origin ? 'index, follow' : 'noindex, nofollow'}" />`,
  `<meta property="og:type" content="website" />`,
  `<meta property="og:site_name" content="PacePDF" />`,
  `<meta property="og:locale" content="en_US" />`,
  `<meta property="og:title" content="${escape(product.title)}" />`,
  `<meta property="og:description" content="${escape(product.description)}" />`,
  `<meta name="twitter:card" content="summary_large_image" />`,
  `<meta name="twitter:title" content="${escape(product.title)}" />`,
  `<meta name="twitter:description" content="${escape(product.description)}" />`,
  ...(origin
    ? [
        `<link rel="canonical" href="${origin}/" />`,
        `<meta property="og:url" content="${origin}/" />`,
        `<meta property="og:image" content="${origin}/assets/social-preview.png" />`,
        `<meta property="og:image:width" content="1200" />`,
        `<meta property="og:image:height" content="630" />`,
        `<meta property="og:image:alt" content="PacePDF — Everything You Need for PDFs. Now Available on Google Play." />`,
        `<meta name="twitter:image" content="${origin}/assets/social-preview.png" />`,
        `<meta name="twitter:image:alt" content="PacePDF Android PDF tools, now available on Google Play" />`,
      ]
    : []),
  `<script type="application/ld+json">${JSON.stringify(jsonLd).replaceAll('<', '\\u003c')}</script>`,
].join('\n    ');
const template = await readFile('dist/index.html', 'utf8');
await writeFile(
  'dist/index.html',
  template.replace('<!--seo-head-->', head).replace('<!--app-html-->', render()),
);
await writeFile(
  'dist/robots.txt',
  origin
    ? `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`
    : 'User-agent: *\nDisallow: /\n',
);
await writeFile(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${origin ? `<url><loc>${origin}/</loc></url>` : ''}</urlset>\n`,
);
console.log(
  `Prerendered all content. ${origin ? `Canonical and sitemap: ${origin}/` : 'Local preview is noindex. Set SITE_URL for production canonical/social URLs/sitemap.'}`,
);
