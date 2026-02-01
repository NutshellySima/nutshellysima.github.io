import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://www.chijunsima.com',
  integrations: [tailwind()],
  build: {
    format: 'file',
  },
  vite: {
    build: {
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[name].mjs',
          chunkFileNames: 'assets/[name].mjs',
          assetFileNames: 'assets/[name][extname]',
        },
      },
    },
  },
});
