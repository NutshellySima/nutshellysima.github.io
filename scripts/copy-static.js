/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs/promises');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const staticFiles = [
  'sw.js',
  'manifest.webmanifest',
  'robots.txt',
  'sitemap.xml',
  'CNAME',
  'favicon.svg',
  'avatar.jpg',
  'cv.pdf',
  'icon-192.svg',
  'icon-192-maskable.svg',
  'icon-512.svg',
  'icon-512-maskable.svg',
];

const copyStaticFiles = async () => {
  await Promise.all(
    staticFiles.map(async (file) => {
      const source = path.join(rootDir, file);
      const target = path.join(distDir, file);
      await fs.copyFile(source, target);
    })
  );
};

copyStaticFiles().catch((error) => {
  console.error('Failed to copy static files.');
  console.error(error);
  process.exit(1);
});
