import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

const base = process.env.PREVIEW_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
await mkdir('artifacts', { recursive: true });
const report = { viewports: [], interactions: [], errors: [], accessibility: [] };
const context = await browser.newContext();
const page = await context.newPage();
page.on('pageerror', (error) => report.errors.push(error.message));
page.on('console', (message) => {
  if (message.type() === 'error') report.errors.push(message.text());
});
page.on('response', (response) => {
  if (response.status() >= 400 && response.url().startsWith(base))
    report.errors.push(`${response.status()} ${response.url()}`);
});
try {
  for (const width of [320, 360, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: width < 700 ? 844 : 1000 });
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    assert(await page.locator('h1').isVisible());
    const sizes = await page.evaluate(() => ({
      viewport: innerWidth,
      body: document.documentElement.scrollWidth,
    }));
    assert(
      sizes.body <= sizes.viewport,
      `Horizontal overflow at ${width}: ${JSON.stringify(sizes)}`,
    );
    assert.equal(await page.locator('.tool-card').count(), 15);
    report.viewports.push({ width, overflow: false });
    if ([390, 768, 1440].includes(width))
      await page.screenshot({ path: `artifacts/site-${width}-light.png`, fullPage: true });
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Convert', exact: true }).click();
  assert.equal(await page.locator('.tool-card').count(), 2);
  await page.getByRole('button', { name: 'All tools', exact: true }).click();
  assert.equal(await page.locator('.tool-card').count(), 15);
  report.interactions.push('Tool filters');
  const faq = page.locator('.faq-item').first();
  await faq.locator('summary').click();
  assert.equal(await faq.getAttribute('open'), '');
  await faq.locator('summary').focus();
  await page.keyboard.press('Enter');
  assert.equal(await faq.getAttribute('open'), null);
  report.interactions.push('FAQ mouse and keyboard');
  await page.getByRole('button', { name: 'Enlarge Home illustrative preview' }).click();
  assert(await page.locator('dialog').isVisible());
  await page.keyboard.press('Escape');
  assert(!(await page.locator('dialog').isVisible()));
  assert(
    await page
      .getByRole('button', { name: 'Enlarge Home illustrative preview' })
      .evaluate((el) => el === document.activeElement),
  );
  report.interactions.push('Lightbox, Escape, focus restoration');
  await page.getByRole('button', { name: 'Go to Reader preview' }).click();
  await page.waitForFunction(
    () =>
      document.querySelector('[aria-label="Go to Reader preview"]').getAttribute('aria-pressed') ===
      'true',
  );
  const track = page.locator('.gallery-track');
  await track.focus();
  await page.keyboard.press('ArrowLeft');
  await page.waitForFunction(
    () =>
      document.querySelector('[aria-label="Go to Tools preview"]').getAttribute('aria-pressed') ===
      'true',
  );
  report.interactions.push('Gallery controls and arrow keys');
  await page.getByRole('button', { name: 'Go to Sign PDF preview' }).click();
  await page.waitForFunction(
    () =>
      document
        .querySelector('[aria-label="Go to Sign PDF preview"]')
        .getAttribute('aria-pressed') === 'true',
  );
  assert(await page.getByRole('button', { name: 'Next app preview' }).isDisabled());
  report.interactions.push('Gallery last item and disabled next control');
  for (const theme of ['light', 'dark']) {
    await page.evaluate((theme) => {
      document.documentElement.dataset.theme = theme;
      localStorage.setItem('pacepdf-theme', theme);
    }, theme);
    await page.reload({ waitUntil: 'networkidle' });
    await page.screenshot({ path: `artifacts/site-1440-${theme}.png`, fullPage: true });
    const axe = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    report.accessibility.push({
      theme,
      violations: axe.violations.map(({ id, impact, description, nodes }) => ({
        id,
        impact,
        description,
        nodes: nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
      })),
    });
  }
  await page.getByRole('button', { name: 'Switch to light mode' }).click();
  await page.reload({ waitUntil: 'networkidle' });
  assert.equal(await page.evaluate(() => document.documentElement.dataset.theme), 'light');
  report.interactions.push('Theme switch and persistence');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Open navigation' }).click();
  assert(await page.getByRole('navigation', { name: 'Mobile navigation' }).isVisible());
  assert.equal(await page.evaluate(() => document.body.style.overflow), 'hidden');
  await page.keyboard.press('Escape');
  assert.equal(
    await page.getByRole('button', { name: 'Open navigation' }).getAttribute('aria-expanded'),
    'false',
  );
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await page
    .getByRole('navigation', { name: 'Mobile navigation' })
    .getByRole('link', { name: 'Features', exact: true })
    .click();
  assert.equal(
    await page.getByRole('button', { name: 'Open navigation' }).getAttribute('aria-expanded'),
    'false',
  );
  report.interactions.push('Mobile navigation, Escape, anchor links');
  const mobileAxe = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  report.accessibility.push({
    theme: 'mobile',
    violations: mobileAxe.violations.map(({ id, impact, nodes }) => ({
      id,
      impact,
      targets: nodes.map((n) => n.target),
    })),
  });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  assert.equal(
    await page.locator('.hero-phone').evaluate((el) => getComputedStyle(el).animationName),
    'none',
  );
  report.interactions.push('Reduced motion');
  await page.evaluate(() => (document.documentElement.dataset.theme = 'dark'));
  await page.screenshot({ path: 'artifacts/site-390-dark.png', fullPage: true });
  const noJs = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await noJs.newPage();
  await staticPage.goto(base);
  assert(await staticPage.getByRole('heading', { name: 'Isa Shaikh', exact: true }).isVisible());
  assert(await staticPage.getByRole('heading', { name: 'Faiz Sayyed', exact: true }).isVisible());
  assert.equal(await staticPage.locator('.tool-card').count(), 15);
  await staticPage.locator('.faq-item summary').first().click();
  assert.equal(await staticPage.locator('.faq-item').first().getAttribute('open'), '');
  await noJs.close();
  report.interactions.push('Crawlable content and FAQ without JavaScript');
  const broken = await page.evaluate(() =>
    [...document.querySelectorAll('a[href^="#"]')]
      .filter((a) => !document.getElementById(a.hash.slice(1)))
      .map((a) => a.hash),
  );
  assert.equal(broken.length, 0);
  const images = await page.evaluate(async () => {
    [...document.images].forEach((img) => (img.loading = 'eager'));
    await Promise.all([...document.images].map((img) => img.decode().catch(() => {})));
    return [...document.images].filter((img) => !img.naturalWidth).map((img) => img.src);
  });
  assert.equal(images.length, 0);
  assert.equal(report.errors.length, 0, report.errors.join('\n'));
  assert.equal(
    report.accessibility.flatMap((a) => a.violations).length,
    0,
    'Accessibility violations; see artifacts/browser-report.json',
  );
  report.status = 'PASS';
} catch (error) {
  report.status = 'FAIL';
  report.failure = error.message;
  throw error;
} finally {
  await writeFile('artifacts/browser-report.json', JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  await browser.close();
}
