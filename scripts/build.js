const path = require('path');
const fs = require('fs/promises');
const esbuild = require('esbuild');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const rootFiles = [
  'index.html',
  '404.html',
  'offline.html',
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

const buildAssets = async () => {
  await esbuild.build({
    entryPoints: [path.join(rootDir, 'assets/js/site.js')],
    outfile: path.join(distDir, 'assets/js/site.js'),
    bundle: false,
    minify: true,
    target: ['es2018'],
  });

  await esbuild.build({
    entryPoints: [path.join(rootDir, 'assets/css/site.css')],
    outfile: path.join(distDir, 'assets/css/site.css'),
    bundle: false,
    minify: true,
  });
};

const copyStaticFiles = async () => {
  await fs.cp(path.join(rootDir, 'assets'), path.join(distDir, 'assets'), {
    recursive: true,
  });

  await Promise.all(
    rootFiles.map((file) =>
      fs.copyFile(path.join(rootDir, file), path.join(distDir, file))
    )
  );
};

const buildSite = async () => {
  await fs.rm(distDir, { recursive: true, force: true });
  await fs.mkdir(distDir, { recursive: true });

  await copyStaticFiles();
  await buildAssets();
};

buildSite()
  .then(() => {
    console.log('Build complete.');
  })
  .catch((error) => {
    console.error('Build failed.');
    console.error(error);
    process.exit(1);
  });
