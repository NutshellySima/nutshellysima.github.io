import { assetVersion } from './profile';

// Cache-busting is baked into asset URLs at build time. Never rewrite a stylesheet's
// href after parse: Safari drops the loaded sheet and flashes unstyled content.
export const withVersion = (url: string) => `${url}${url.includes('?') ? '&' : '?'}v=${assetVersion}`;
