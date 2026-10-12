import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await mkdir('artifacts', { recursive: true });
try {
  await page.goto('https://isa-shaikh-app.web.app/apps/pacepdf', {
    waitUntil: 'networkidle',
    timeout: 60000,
  });
  await page.screenshot({ path: 'artifacts/reference-desktop.png', fullPage: true });
  const result = await page.evaluate(() => ({
    title: document.title,
    headings: [...document.querySelectorAll('h1,h2,h3')].map((el) => el.textContent),
    links: [...document.querySelectorAll('a')].map((el) => ({
      text: el.textContent,
      href: el.href,
    })),
    text: document.body.innerText,
    images: [...document.images].map((img) => ({
      alt: img.alt,
      width: img.naturalWidth,
      height: img.naturalHeight,
    })),
    fonts: getComputedStyle(document.body).fontFamily,
    background: getComputedStyle(document.body).backgroundColor,
  }));
  await writeFile('artifacts/reference-analysis.json', JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: 'artifacts/reference-mobile.png', fullPage: true });
} catch (error) {
  console.log(`Reference inspection failed: ${error.message}`);
}
await browser.close();
