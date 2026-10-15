import { readFile, access } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { product } from '../src/config.js';

const html = await readFile('dist/index.html', 'utf8');
assert(html.includes(`<title>${product.title}</title>`));
assert(html.includes(product.description));
assert.equal((html.match(/<h1[ >]/g) || []).length, 1);
for (const id of [
  'main',
  'home',
  'overview',
  'features',
  'screenshots',
  'about',
  'faq',
  'availability',
])
  assert(html.includes(`id="${id}"`), `Missing section ${id}`);
for (const text of [
  'Isa Shaikh',
  'Faiz Sayyed',
  'Co-Creator &amp; Developer',
  'Scan to PDF',
  'OCR is coming soon',
  'Now Available on Google Play',
])
  assert(html.includes(text), `Missing ${text}`);
assert(!/<meta name="description"[^>]*Isa Shaikh/.test(html));
assert(!/<title>[^<]*Isa Shaikh/.test(html));
assert(!html.includes('<!--app-html-->'));
assert(html.includes('<main'));
assert.equal(product.playUrl, 'https://play.google.com/store/apps/details?id=com.pacepdf.app');
assert(!/closed[ -]testing|public download link will appear/i.test(html));
assert.equal(
  (
    html.match(/href="https:\/\/play.google.com\/store\/apps\/details\?id=com\.pacepdf\.app"/g) ||
    []
  ).length,
  4,
);
assert(html.includes('https://isa-shaikh-app.web.app/privacy/pacepdf'));
const data = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
assert.equal(data['@type'], 'SoftwareApplication');
assert.equal(data.operatingSystem, 'Android');
assert.equal(data.downloadUrl, product.playUrl);
assert.equal(data.installUrl, product.playUrl);
assert(!data.aggregateRating && !data.offers && !data.datePublished);
assert.equal(data.author.length, 2);
for (const match of html.matchAll(/(?:src|href)="(\/[^"#]+)"/g)) await access(`dist${match[1]}`);
await access('dist/robots.txt');
await access('dist/sitemap.xml');
console.log(
  'Static HTML, exact metadata, 11-section content, accurate availability, structured data and local assets: PASS',
);
