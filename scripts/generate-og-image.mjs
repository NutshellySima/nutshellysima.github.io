// Regenerates og-image.png (1200x630 social card) from scripts/og-card.html.
// Requires a prior `npm run build` (fonts are taken from dist/) and Playwright
// with Chromium available, e.g.: npx -p playwright node scripts/generate-og-image.mjs
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = fs.readFileSync(path.join(root, 'dist/index.html'), 'utf8');

const fontFile = (family) => {
  const match = html.match(new RegExp(`font-family:${family}-[a-f0-9]+;src:url\\("([^"]+)"\\)[^}]*font-style:normal`));
  if (!match) throw new Error(`Could not find a built ${family} font in dist/index.html`);
  return pathToFileURL(path.join(root, 'dist', match[1])).href;
};

const avatar = `data:image/jpeg;base64,${fs.readFileSync(path.join(root, 'avatar.jpg')).toString('base64')}`;
const card = fs
  .readFileSync(path.join(root, 'scripts/og-card.html'), 'utf8')
  .replace('{{SERIF_FONT}}', fontFile('Newsreader'))
  .replace('{{SANS_FONT}}', fontFile('Inter'))
  .replace('{{AVATAR}}', avatar);

const { chromium } = await import('playwright');
const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : undefined
);
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
// Load from a real file:// URL; setContent pages cannot read local font files.
const tmp = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'og-card-')), 'card.html');
fs.writeFileSync(tmp, card);
await page.goto(pathToFileURL(tmp).href, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: path.join(root, 'og-image.png') });
await browser.close();
console.log('Wrote og-image.png');
