import sharp from 'sharp';
import { mkdir, writeFile, copyFile } from 'node:fs/promises';

await mkdir('public/assets', { recursive: true });
await mkdir('public/previews', { recursive: true });
await copyFile(
  'node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2',
  'public/assets/manrope-latin.woff2',
);
await copyFile(
  'node_modules/@fontsource-variable/manrope/LICENSE',
  'source-assets/Manrope-LICENSE.txt',
);
await copyFile(
  'node_modules/@fontsource-variable/manrope/LICENSE',
  'public/assets/manrope-license.txt',
);
await Promise.all([
  sharp('source-assets/pacepdf-logo.png')
    .resize(96, 96)
    .webp({ quality: 88 })
    .toFile('public/assets/pacepdf-logo.webp'),
  sharp('source-assets/pacepdf-logo.png')
    .resize(32, 32)
    .png()
    .toFile('public/assets/favicon-32.png'),
  sharp('source-assets/pacepdf-logo.png')
    .resize(180, 180)
    .png()
    .toFile('public/assets/apple-touch-icon.png'),
]);

const icons = {
  merge:
    '<rect x="-10" y="-10" width="15" height="17" rx="2"/><rect x="-4" y="-4" width="15" height="17" rx="2"/>',
  split: '<path d="M0 12V1M0 1L-10-9M0 1L10-9M-10-9v8M-10-9h8M10-9v8M10-9H2"/>',
  compress: '<path d="M-12-12l9 9M-3-11v8h-8M12 12L3 3M3 11V3h8"/>',
  scan: '<path d="M-6-12h-6v6M6-12h6v6M-6 12h-6V6M6 12h6V6M-14 0h28"/>',
  sign: '<path d="M-11 12l3-9L7-12l7 7L-1 10l-10 2ZM5-10l7 7"/>',
  pages:
    '<rect x="-12" y="-12" width="10" height="10" rx="2"/><rect x="2" y="-12" width="10" height="10" rx="2"/><rect x="-12" y="2" width="10" height="10" rx="2"/><rect x="2" y="2" width="10" height="10" rx="2"/>',
};
const svgIcon = (kind, x, y, color = '#f85a6b') =>
  `<g transform="translate(${x} ${y})" fill="none" stroke="${color}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${icons[kind] || icons.pages}</g>`;
const txt = (x, y, text, size = 12, color = '#b2b5bd', weight = 400) =>
  `<text x="${x}" y="${y}" font-family="Arial, sans-serif" font-size="${size}" font-weight="${weight}" fill="${color}">${text}</text>`;
const rect = (x, y, w, h, fill, rx = 12, stroke = 'none') =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}"/>`;
const document = (x, y, scale = 1, signed = false) =>
  `<g transform="translate(${x} ${y}) scale(${scale})">${rect(0, 0, 240, 325, '#fff', 3)}${txt(22, 33, 'PACE / DOCUMENTS', 7, '#bd152a', 700)}${txt(22, 66, 'A fresh perspective.', 18, '#252329', 700)}${rect(22, 82, 195, 1, '#d9152a', 0)}${txt(22, 112, 'Making room for what matters.', 10, '#6f6b72')}${[0, 1, 2, 3, 4, 5, 6].map((i) => rect(22, 135 + i * 10, i % 3 === 0 ? 151 : 191, 3, '#e3e0e3', 1)).join('')}${signed ? `<text x="48" y="254" font-family="Georgia, serif" font-size="25" font-style="italic" fill="#ad1831" transform="rotate(-8 48 254)">Your signature</text>` : rect(22, 224, 195, 51, '#f4e9e9', 0)}${txt(211, 306, '01', 7, '#8d8990')}</g>`;
const nav = (active = 'Home') =>
  `${rect(0, 680, 360, 80, '#15171c', 0)}<path d="M0 680H360" stroke="#24272e"/>${[
    'Home',
    'Tools',
    'Files',
    'Settings',
  ]
    .map((label, i) => {
      const x = 49 + i * 87;
      return `<g fill="none" stroke="${label === active ? '#fa6170' : '#90949f'}" stroke-width="1.5">${label === 'Home' ? `<path d="M${x - 9} 713l9-8 9 8v12h-6v-7h-6v7h-6Z"/>` : label === 'Tools' ? `<rect x="${x - 8}" y="707" width="6" height="6" rx="1"/><rect x="${x + 2}" y="707" width="6" height="6" rx="1"/><rect x="${x - 8}" y="717" width="6" height="6" rx="1"/><rect x="${x + 2}" y="717" width="6" height="6" rx="1"/>` : label === 'Files' ? `<path d="M${x - 10} 710h8l3 3h9v12h-20Z"/>` : `<circle cx="${x}" cy="716" r="8"/><circle cx="${x}" cy="716" r="3"/>`}</g>${txt(x - 13, 744, label, 9, label === active ? '#fa6170' : '#90949f')}`;
    })
    .join('')}`;
const base = (body, active) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="760" viewBox="0 0 360 760"><title>PacePDF illustrative interface preview — not an app screenshot</title>${rect(0, 0, 360, 760, '#101216', 0)}${txt(24, 31, '9:41', 12, '#fff', 700)}<g stroke="#d7d9de" fill="none" stroke-width="2"><path d="M290 27v-5M296 27v-9M302 27V15"/><rect x="316" y="17" width="19" height="9" rx="2"/></g>${body}${nav(active)}${txt(112, 669, 'ILLUSTRATIVE PREVIEW', 9, '#9ca0ac', 700)}</svg>`;
const toolTiles = (start, expanded = false) =>
  [
    ['Merge PDF', 'merge'],
    ['Split PDF', 'split'],
    ['Compress PDF', 'compress'],
    ['Scan to PDF', 'scan'],
    ['Sign PDF', 'sign'],
    ['Organize Pages', 'pages'],
    ...(expanded
      ? [
          ['Crop PDF', 'pages'],
          ['Watermark PDF', 'pages'],
          ['Page Numbers', 'pages'],
          ['JPG / PNG to PDF', 'pages'],
          ['PDF to JPG', 'pages'],
          ['Protect / Unlock', 'pages'],
        ]
      : []),
  ]
    .map(([name, kind], i) => {
      const x = 22 + (i % 3) * 108;
      const y = start + Math.floor(i / 3) * 104;
      return `${rect(x, y, 100, 94, '#1a1d23', 11, '#272b33')}${rect(x + 31, y + 16, 38, 35, '#341c24', 8)}${svgIcon(kind, x + 50, y + 33)}${txt(x + 10, y + 75, name, 9, '#e5e5eb', 600)}`;
    })
    .join('');
const fileRows = (start, count = 3) =>
  Array.from({ length: count }, (_, i) => {
    const y = start + i * 69;
    return `${rect(22, y, 316, 60, '#191c22', 10, '#252931')}${rect(34, y + 12, 32, 35, '#352029', 6)}${txt(39, y + 33, 'PDF', 9, '#fa6475', 700)}${txt(79, y + 27, ['Project notes.pdf', 'Reading list.pdf', 'Document draft.pdf', 'Research.pdf', 'Meeting notes.pdf'][i], 12, '#f0edf2', 600)}${txt(79, y + 45, 'PDF document · On your device', 9, '#969ba7')}<path d="M315 ${y + 25}v1M315 ${y + 31}v1M315 ${y + 37}v1" stroke="#9da1ad" stroke-width="2"/>`;
  }).join('');
const home = `${txt(24, 81, 'Pace', 25, '#f3f3f6', 700)}${txt(85, 81, 'PDF', 25, '#fa5a6d', 700)}<circle cx="323" cy="72" r="12" fill="#20232a"/><g stroke="#bcc0ca" fill="none"><circle cx="323" cy="72" r="6"/><circle cx="323" cy="72" r="2"/></g>${rect(22, 109, 316, 128, '#b71026', 17)}${txt(42, 147, 'Let’s do more', 25, '#fff', 700)}${txt(42, 178, 'with PDFs.', 25, '#fff', 700)}${txt(42, 211, 'One app. Your everyday PDF essentials.', 11, '#ffd4db')}${txt(24, 273, 'Popular tools', 16, '#f2f1f5', 700)}${txt(290, 273, 'View all', 10, '#fa6475')}${toolTiles(290)}${txt(24, 533, 'Recent documents', 16, '#f2f1f5', 700)}${fileRows(553, 1)}`;
const tools = `${txt(24, 85, 'Tools', 28, '#f4f1f5', 700)}${txt(24, 111, 'Your PDF essentials, in one place.', 12)}${rect(22, 134, 316, 43, '#1b1e24', 10, '#2b2e36')}<circle cx="43" cy="154" r="6" fill="none" stroke="#9096a3"/><path d="M48 160l4 4" stroke="#9096a3"/>${txt(65, 161, 'Find a PDF tool', 12, '#969ba7')}${['All', 'Edit', 'Convert', 'Organize'].map((label, i) => `${rect(22 + i * 79, 194, 72, 30, i === 0 ? '#c9152a' : '#1e2127', 16)}${txt(42 + i * 79, 214, label, 10, i === 0 ? '#fff' : '#bfc2cd')}`).join('')}${toolTiles(245, true)}`;
const reader = `<path d="M34 71l-7 7 7 7" stroke="#ececf0" fill="none" stroke-width="2"/>${txt(53, 82, 'Project notes.pdf', 15, '#f4f1f5', 600)}${txt(311, 82, '•••', 14, '#bcc0ca')}${document(35, 146, 1.21)}${rect(72, 571, 216, 45, '#23262f', 23, '#3a3e48')}${txt(91, 598, '1 / 4', 12, '#fff')}${txt(163, 598, '−', 17, '#ccd0d9')}${txt(202, 598, '100%', 11, '#ccd0d9')}${txt(257, 598, '+', 17, '#ccd0d9')}`;
const files = `${txt(24, 85, 'Files', 28, '#f4f1f5', 700)}${txt(24, 112, 'Your documents, close at hand.', 12)}${['Recent', 'Device', 'Favorites'].map((label, i) => `${rect(22 + i * 106, 139, 99, 34, i === 0 ? '#c9152a' : '#1c1f25', 8)}${txt(44 + i * 106, 161, label, 11, i === 0 ? '#fff' : '#bfc2cd')}`).join('')}${txt(24, 215, 'YOUR DOCUMENTS', 10, '#949ba8', 600)}${fileRows(235, 5)}`;
const compress = `<path d="M34 71l-7 7 7 7" stroke="#ececf0" fill="none" stroke-width="2"/>${txt(53, 82, 'Compress PDF', 20, '#f4f1f5', 700)}${txt(24, 125, 'A smaller file. A considered balance.', 12)}${fileRows(151, 1)}${txt(24, 263, 'Choose a compression level', 14, '#ececf1', 600)}${[
  ['Light', 'Prioritize document quality'],
  ['Balanced', 'Balance size and readability'],
  ['Strong', 'Prioritize a smaller file'],
]
  .map(([name, description], i) => {
    const y = 289 + i * 93;
    return `${rect(22, y, 316, 79, i === 1 ? '#301923' : '#191c22', 12, i === 1 ? '#d9152a' : '#2b2e36')}${txt(40, y + 29, name, 14, '#eeebf1', 600)}${txt(40, y + 53, description, 11, '#afb2bd')}<circle cx="307" cy="${y + 37}" r="8" fill="${i === 1 ? '#d9152a' : 'none'}" stroke="${i === 1 ? '#d9152a' : '#727887'}"/>`;
  })
  .join(
    '',
  )}${rect(22, 597, 316, 43, '#d9152a', 10)}${txt(128, 623, 'Compress PDF', 13, '#fff', 700)}`;
const sign = `<path d="M34 71l-7 7 7 7" stroke="#ececf0" fill="none" stroke-width="2"/>${txt(53, 82, 'Sign PDF', 20, '#f4f1f5', 700)}${txt(24, 125, 'Add your own finishing touch.', 12)}${document(53, 152, 1.06, true)}${rect(22, 526, 316, 51, '#1c1f25', 10, '#2d3039')}${svgIcon('sign', 49, 551)}${txt(76, 557, 'Draw or choose a signature', 12, '#eeeaf1', 600)}${rect(22, 597, 316, 43, '#d9152a', 10)}${txt(145, 623, 'Save PDF', 13, '#fff', 700)}`;
await Promise.all(
  Object.entries({ home, tools, reader, files, compress, sign }).map(([name, body]) =>
    writeFile(
      `public/previews/${name}.svg`,
      base(body, name === 'files' ? 'Files' : name === 'tools' ? 'Tools' : 'Home'),
    ),
  ),
);
const social = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#faf9f7"/><circle cx="1050" cy="420" r="340" fill="#f3e4e4"/><rect x="75" y="79" width="44" height="44" rx="10" fill="#d9152a"/><text x="84" y="109" font-family="Arial,sans-serif" font-size="18" font-weight="700" fill="#fff">PDF</text><text x="137" y="113" font-family="Arial,sans-serif" font-size="31" font-weight="700" fill="#242125">PacePDF</text><text x="75" y="247" font-family="Arial,sans-serif" font-size="68" font-weight="700" fill="#242125">Everything You Need</text><text x="75" y="325" font-family="Arial,sans-serif" font-size="68" font-weight="700" fill="#242125">for PDFs.</text><text x="75" y="406" font-family="Arial,sans-serif" font-size="68" font-weight="700" fill="#d9152a">All in One Place.</text><text x="78" y="489" font-family="Arial,sans-serif" font-size="23" fill="#67616a">Read. Merge. Compress. Organize. Sign.</text><text x="78" y="559" font-family="Arial,sans-serif" font-size="18" fill="#67616a">ANDROID · CURRENTLY IN CLOSED TESTING</text></svg>`;
await sharp(Buffer.from(social)).png().toFile('public/assets/social-preview.png');
console.log('Prepared approved brand assets, social preview and 6 labeled illustrative previews.');
