export const lastUpdated = '2026-05-26';
export const lastUpdatedISO = '2026-05-26T00:00:00+08:00';

export const siteMetadata = {
  url: 'https://www.chijunsima.com',
  name: 'Chijun Sima',
  title: 'Chijun Sima',
  description: 'Official website of Chijun Sima with email contact and Google Scholar profile.',
  locale: 'en_US',
  language: 'en',
} as const;

export const profile = {
  fullName: 'Chijun Sima',
  email: 'simachijun@gmail.com',
  scholarUrl: 'https://scholar.google.com/citations?user=8-HD_IEAAAAJ&hl=en',
} as const;

export const absoluteUrl = (pathname = '/') => new URL(pathname, `${siteMetadata.url}/`).toString();
