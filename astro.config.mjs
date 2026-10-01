import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.chijunsima.com',
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: [400, 500, 600],
      display: 'swap',
    },
    {
      provider: fontProviders.google(),
      name: 'Newsreader',
      cssVariable: '--font-newsreader',
      weights: [400, 500, 600],
      styles: ['normal', 'italic'],
      display: 'swap',
    },
  ],
  build: {
    format: 'file',
  },
  vite: {
    plugins: [tailwindcss()],
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
