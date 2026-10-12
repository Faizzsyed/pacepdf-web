import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

// Reserved .invalid origin is a test fixture, never a claimed deployment URL.
const origin = 'https://pacepdf.invalid';
const html = await readFile('dist/index.html', 'utf8');
const robots = await readFile('dist/robots.txt', 'utf8');
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
assert(html.includes(`<link rel="canonical" href="${origin}/"`));
assert(html.includes('content="index, follow"'));
assert(!html.includes('noindex'));
assert(html.includes(`<meta property="og:url" content="${origin}/"`));
assert(html.includes(`<meta property="og:image" content="${origin}/assets/social-preview.png"`));
assert(html.includes(`<meta name="twitter:image" content="${origin}/assets/social-preview.png"`));
assert(robots.includes('Allow: /'));
assert(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
assert(sitemap.includes(`<loc>${origin}/</loc>`));
assert(html.includes('Isa Shaikh') && html.includes('Faiz Sayyed'));
console.log(
  'Production canonical, social URLs, robots, sitemap and indexed HTML configuration: PASS (reserved test origin).',
);
