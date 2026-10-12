import { readFile } from 'node:fs/promises';
const report = JSON.parse(
  (await readFile('artifacts/dependency-audit.json', 'utf8')).replace(/^\uFEFF/, ''),
);
console.log(
  JSON.stringify(
    Object.entries(report.vulnerabilities).map(([name, value]) => ({
      name,
      severity: value.severity,
      direct: value.isDirect,
      fix: value.fixAvailable,
    })),
    null,
    2,
  ),
);
