import { chromium } from 'playwright';
import { writeFile } from 'node:fs/promises';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const context = await browser.newContext();
const page = await context.newPage();
await page.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' });
const urls = await page.evaluate(() => [
  ...new Set([...document.querySelectorAll('a[href^="https://"]')].map((a) => a.href)),
]);
const results = await Promise.all(
  urls.map(async (url) => {
    try {
      const response = await context.request.get(url, { timeout: 20000 });
      return {
        url,
        status: response.status(),
        automatedAccessBlocked: [403, 429, 999].includes(response.status()),
      };
    } catch (error) {
      return { url, error: error.message.split('\n')[0] };
    }
  }),
);
await writeFile('artifacts/link-report.json', JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
await browser.close();
