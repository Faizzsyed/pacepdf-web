import { chromium } from 'playwright';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const context = await browser.newContext();
const page = await context.newPage();
for (const width of [390, 1440]) {
  for (const theme of ['light', 'dark']) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    await page.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' });
    await page.evaluate(async (theme) => {
      document.documentElement.dataset.theme = theme;
      document.querySelectorAll('img').forEach((img) => (img.loading = 'eager'));
      await Promise.all([...document.images].map((img) => img.decode().catch(() => {})));
      await document.fonts.ready;
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.activeElement?.blur();
    }, theme);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.screenshot({ path: `artifacts/final-${width}-${theme}.png`, fullPage: true });
    await page.screenshot({ path: `artifacts/hero-${width}-${theme}.png` });
    await page.locator('#availability').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `artifacts/cta-${width}-${theme}.png` });
  }
}
await browser.close();
console.log('Final light/dark desktop and mobile full-page, hero and CTA captures saved.');
