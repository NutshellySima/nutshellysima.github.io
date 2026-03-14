import path from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import esbuild from 'esbuild';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const assetsDir = path.join(distDir, 'assets');

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
  'llms.txt',
  'llms-full.txt',
];

const staticDirs = [{ src: '.well-known', files: ['ai-plugin.json'] }];

const copyStaticFiles = async () => {
  await fs.mkdir(assetsDir, { recursive: true });
  await Promise.all(
    staticFiles.map(async (file) => {
      const source = path.join(rootDir, file);
      const target = path.join(distDir, file);
      await fs.copyFile(source, target);
    })
  );

  for (const dir of staticDirs) {
    const targetDir = path.join(distDir, dir.src);
    await fs.mkdir(targetDir, { recursive: true });
    await Promise.all(
      dir.files.map(async (file) => {
        const source = path.join(rootDir, dir.src, file);
        const target = path.join(targetDir, file);
        await fs.copyFile(source, target);
      })
    );
  }

  await esbuild.build({
    entryPoints: [path.join(rootDir, 'src/scripts/site.ts')],
    outfile: path.join(assetsDir, 'site.mjs'),
    bundle: true,
    format: 'esm',
    target: 'es2019',
    sourcemap: false,
  });
};

copyStaticFiles().catch((error) => {
  console.error('Failed to copy static files.');
  console.error(error);
  process.exit(1);
});
