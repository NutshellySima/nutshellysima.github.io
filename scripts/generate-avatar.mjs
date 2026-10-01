// Regenerates the responsive WebP avatars from avatar.jpg.
// Usage: node scripts/generate-avatar.mjs   (sharp ships with Astro)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'avatar.jpg');

// 160w serves the 100px mobile avatar at 1x; 288w serves 136px at 2x (and 100px at 2x).
for (const width of [160, 288]) {
  const info = await sharp(source)
    .resize(width, width, { fit: 'cover' })
    .webp({ quality: 82, effort: 6 })
    .toFile(path.join(root, `avatar-${width}.webp`));
  console.log(`avatar-${width}.webp ${info.size} bytes`);
}
