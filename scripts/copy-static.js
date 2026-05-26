import path from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const staticFiles = [
  '.nojekyll',
  'CNAME',
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
