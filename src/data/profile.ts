export const assetVersion = '20260315';
export const lastUpdated = '2026-03-15';
export const lastUpdatedISO = '2026-03-15T00:00:00+08:00';

export const siteMetadata = {
  url: 'https://www.chijunsima.com',
  name: 'Chijun Sima',
  title: 'Chijun Sima',
  description:
    'Chijun Sima — Senior Software Development Engineer at Tencent (WeChat). Co-first author of Ekko (OSDI 2022). LLVM developer with commit access.',
  locale: 'en_US',
  language: 'en',
} as const;

export const profile = {
  fullName: 'Chijun Sima',
  givenName: 'Chijun',
  familyName: 'Sima',
  jobTitle: 'Senior Software Development Engineer',
  subtitle: '',
  employer: 'Tencent',
  department: 'WeChat',
  employerUrl: 'https://www.tencent.com',
  location: 'Guangzhou, China',
  locality: 'Guangzhou',
  countryCode: 'CN',
  education: {
    school: 'South China University of Technology',
    schoolUrl: 'https://www.scut.edu.cn',
    degree: 'B.Eng. in Computer Science and Technology (Innovation Class)',
  },
  description:
    'Co-first author of Ekko (OSDI 2022). LLVM developer with commit access.',
  email: 'simachijun@gmail.com',
  sameAs: [
    'https://www.linkedin.com/in/chijun-sima/',
    'https://github.com/NutshellySima',
    'https://scholar.google.com/citations?user=8-HD_IEAAAAJ&hl=en',
  ],
  knowsAbout: [
    'Deep Learning',
    'Deep Learning Recommendation Models',
    'WebAssembly',
    'LLVM',
    'Compilers',
    'Distributed Systems',
  ],
} as const;

export const machineReadableResources = [
  {
    label: 'llms.txt',
    href: '/llms.txt',
    type: 'text/plain',
    description: 'Concise LLM-oriented summary of the site owner and work.',
  },
  {
    label: 'llms-full.txt',
    href: '/llms-full.txt',
    type: 'text/plain',
    description: 'Expanded context for deeper agent or retrieval workflows.',
  },
  {
    label: 'profile.json',
    href: '/profile.json',
    type: 'application/json',
    description: 'Machine-readable profile, experience, contact, and links.',
  },
  {
    label: 'publications.json',
    href: '/publications.json',
    type: 'application/json',
    description: 'Selected publications in a clean JSON structure.',
  },
  {
    label: 'feed.json',
    href: '/feed.json',
    type: 'application/feed+json',
    description: 'JSON Feed for site news and notable updates.',
  },
] as const;

export const news = [
  {
    dateLabel: '2025',
    dateISO: '2025-01-01T00:00:00+08:00',
    text: 'Reviewing for CVPR 2025',
  },
  {
    dateLabel: '2022',
    dateISO: '2022-09-01T00:00:00+08:00',
    text: 'Ekko published at OSDI 2022; invited talks at Tencent WeChat AI, DataFun, TechBeat',
  },
  {
    dateLabel: '2022',
    dateISO: '2022-08-01T00:00:00+08:00',
    text: 'Tencent Technology Breakthrough Award (Gold Prize) — Project Lead, Ekko',
  },
] as const;

export const publications = [
  {
    id: 'ekko-osdi-2022',
    venue: "OSDI '22",
    venueFull: '16th USENIX Symposium on Operating Systems Design and Implementation',
    year: 2022,
    datePublished: '2022',
    title: 'Ekko: A Large-Scale Deep Learning Recommender System with Low-Latency Model Update',
    authors:
      'Chijun Sima*, Yao Fu*, Man-Kit Sit, Liyi Guo, Xuri Gong, Feng Lin, Junyu Wu, Yongsheng Li, Haidong Rong, Pierre-Louis Aublin, Luo Mai',
    link: 'https://www.usenix.org/conference/osdi22/presentation/sima',
    note: '* co-first author. Supervised by Luo Mai.',
    summary:
      'Low-latency model update system for multi-terabyte deep learning recommendation models, achieving 2.4s update latency, 10,000x model-size scaling, and large production impact in WeChat.',
  },
  {
    id: 'dba-kernel-ieee-access-2019',
    venue: 'IEEE Access',
    venueFull: 'IEEE Access',
    year: 2019,
    datePublished: '2019',
    title: 'Dynamic Barycenter Averaging Kernel in RBF Networks for Time Series Classification',
    authors: 'Kejian Shi, Hongyang Qin, Chijun Sima, Sen Li, Lifeng Shen, Qianli Ma',
    link: '',
    note: '2019.',
    summary: 'Time-series classification work on dynamic barycenter averaging kernels in RBF networks.',
  },
] as const;

export const experience = [
  {
    period: 'Jul 2020 – Present',
    startDate: '2020-07',
    role: 'Senior Software Development Engineer',
    subtitle: '',
    org: 'Tencent (WeChat)',
    orgUrl: 'https://www.tencent.com',
    location: 'Guangzhou, China',
    projects: [
      {
        name: 'Ekko: low-latency model update for multi-terabyte DLRMs',
        note: "published in part as OSDI '22",
        bullets: [
          '<strong>Problem.</strong> Scaling DLRMs improved offline accuracy but degraded online engagement; root cause: <strong>stale models</strong> from increased <strong>model-update latency</strong>.',
          '<strong>Key idea.</strong> Co-designed deployment mechanisms with <strong>model-aware</strong> policies (compressed update dissemination, accuracy-aware scheduling, SLO-aware placement, safe rollback).',
          '<strong>Technical contributions.</strong> WAN bandwidth <strong>−92 %</strong>, machine cost <strong>−49 %</strong>, 2.4 s model-update latency; <strong>10,000×</strong> model-size scaling (GB → tens of TB).',
          '<strong>Outcomes.</strong> Core techniques published as <strong>OSDI \'22 (co-first author)</strong>. Deployed in WeChat recommendation stacks, serves <strong>1 B+ users daily</strong>. Official WeChat blog reports <strong>+40 % DAU</strong> and <strong>+87 % total VV</strong> over six months after full adoption (alongside product iteration and operations).',
        ],
      },
      {
        name: 'Data and feature platform: safe, scalable pipelines',
        note: '',
        bullets: [
          '<strong>Problem.</strong> Modern feature pipelines are long and increasingly multimodal; cross-process operator composition creates high overhead and expensive data movement.',
          '<strong>Approach.</strong> WebAssembly-based runtime for <strong>in-process isolation</strong> (safety + resource constraints) and locality-aware operator placement near data sources.',
          '<strong>Outcome.</strong> Data movement reduced up to <strong>1,200×</strong> on representative workloads; widely used within WeChat for data preparation.',
        ],
      },
    ],
  },
  {
    period: '2018 – Present',
    startDate: '2018',
    role: 'Developer (commit access)',
    subtitle: 'Google Summer of Code 2018',
    org: 'LLVM',
    orgUrl: 'https://llvm.org',
    location: '',
    projects: [
      {
        name: '',
        note: '',
        bullets: [
          'Improved Semi-NCA performance and optimization pipeline; shipped in LLVM 9.0 (reported speedups up to 1,980× on real-world samples).',
          'Unified APIs on dominator trees; shipped in LLVM 7.0.',
        ],
      },
    ],
  },
] as const;

export const education = {
  period: 'Sep 2016 – Jun 2020',
  startDate: '2016-09',
  degree: 'B.Eng. in Computer Science and Technology (Innovation Class)',
  school: 'South China University of Technology',
  schoolUrl: 'https://www.scut.edu.cn',
  detail: 'GPA 3.85 / 4.00 · Rank 1 / 28',
} as const;

export const talks = [
  { text: 'Tencent WeChat AI Department, Shenzhen', date: 'Jun 2022' },
  { text: 'DataFun, Virtual', date: 'Aug 2022' },
  { text: 'TechBeat, Virtual', date: 'Sep 2022' },
] as const;

export const awards = [
  {
    text: 'Tencent Technology Breakthrough Award (Gold Prize) — Project Lead, Ekko (internal highest technical honor)',
    year: '2022',
  },
  { text: "Bronze Medal, ACM-ICPC Asia Xi'an Regional Contest", year: '2017' },
  { text: 'Second Prize, 15th China Collegiate Programming Contest (Guangdong Division, out of 177 teams)', year: '' },
] as const;

export const reviewing = [
  'CVPR 2025',
] as const;

export const writeups = [
  { label: 'OSDI 2022 paper', href: 'https://www.usenix.org/conference/osdi22/presentation/sima' },
  { label: 'WeChat official write-up', href: 'https://mp.weixin.qq.com/s/gBD3mdoRRlGI8bmXp2OBMA' },
  { label: 'Tencent official write-up', href: 'https://mp.weixin.qq.com/s/hS5ZebOC7oQz_Itud0A_Rg' },
  { label: 'Synced Review / JIQIZHIXIN', href: 'https://mp.weixin.qq.com/s/Vriupgqusj1zJmSuYU9WjA' },
  { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=8-HD_IEAAAAJ&hl=en' },
] as const;

export const absoluteUrl = (pathname = '/') => new URL(pathname, `${siteMetadata.url}/`).toString();

export const stripHtml = (value: string) => value.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
