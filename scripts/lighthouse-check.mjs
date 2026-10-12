import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import { mkdir, writeFile } from 'node:fs/promises';

await mkdir('artifacts', { recursive: true });
const chrome = await launch({
  chromePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  chromeFlags: ['--headless', '--no-first-run', '--disable-extensions'],
});
try {
  const report = await lighthouse(process.env.PREVIEW_URL || 'http://127.0.0.1:4173', {
    port: chrome.port,
    output: ['json', 'html'],
    logLevel: 'error',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  });
  await writeFile('artifacts/lighthouse.json', report.report[0]);
  await writeFile('artifacts/lighthouse.html', report.report[1]);
  console.log(
    JSON.stringify(
      Object.fromEntries(
        Object.entries(report.lhr.categories).map(([key, value]) => [
          key,
          Math.round(value.score * 100),
        ]),
      ),
      null,
      2,
    ),
  );
  console.log(
    JSON.stringify(
      Object.values(report.lhr.audits)
        .filter((audit) => audit.score !== null && audit.score < 1)
        .map((audit) => ({
          id: audit.id,
          title: audit.title,
          value: audit.displayValue,
          details: audit.details?.items?.slice(0, 4),
        })),
      null,
      2,
    ),
  );
} finally {
  await chrome.kill();
}
