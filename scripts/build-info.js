// Build-time facts derived from git, shared by astro.config.mjs (Vite) and
// scripts/copy-static.js (esbuild) so both bundles see identical constants.
import { execFileSync } from 'node:child_process';

const git = (args) => {
  try {
    return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return '';
  }
};

export const getBuildInfo = () => {
  // Full ISO 8601 datetime of the last commit (required by schema.org dateModified).
  const lastUpdatedISO = git(['log', '-1', '--format=%cI']) || new Date().toISOString();
  const sha = git(['rev-parse', '--short=8', 'HEAD']) || 'dev';
  const day = lastUpdatedISO.slice(0, 10).replaceAll('-', '');

  return { lastUpdatedISO, assetVersion: `${day}-${sha}` };
};

export const buildDefines = () => {
  const { lastUpdatedISO, assetVersion } = getBuildInfo();

  return {
    __LAST_UPDATED_ISO__: JSON.stringify(lastUpdatedISO),
    __ASSET_VERSION__: JSON.stringify(assetVersion),
  };
};
