export const assetVersion = '20261001-5';
export const lastUpdated = '2026-10-01';
export const lastUpdatedISO = '2026-10-01T00:00:00-05:00';

export const avatar = {
  path: `/avatar.jpg?v=${assetVersion}`,
  width: 1024,
  height: 1024,
} as const;

const doctoralEducation = {
  period: 'Aug 2026 – Present',
  startDate: '2026-08',
  endDate: null,
  degree: 'PhD in Computer Science',
  school: 'The University of Texas at Austin',
  schoolUrl: 'https://www.cs.utexas.edu/',
  detail: 'First-year PhD student.',
} as const;

export const advisors = [
  {
    name: 'Chenfeng Xu',
    url: 'https://www.chenfengx.com',
    title: 'Assistant Professor',
    affiliation: 'The University of Texas at Austin',
    department: 'Department of Computer Science',
  },
  {
    name: 'Aditya Akella',
    url: 'https://www.cs.utexas.edu/~akella/',
    title: 'Professor & Regents Chair',
    affiliation: 'The University of Texas at Austin',
    department: 'Department of Computer Science',
  },
] as const;

export const profile = {
  fullName: 'Chijun Sima',
  givenName: 'Chijun',
  familyName: 'Sima',
  jobTitle: 'First-year Computer Science PhD student',
  subtitle: '',
  affiliation: doctoralEducation.school,
  department: 'Department of Computer Science',
  affiliationUrl: doctoralEducation.schoolUrl,
  location: 'Austin, Texas, USA',
  locality: 'Austin',
  region: 'Texas',
  countryCode: 'US',
  education: {
    school: 'South China University of Technology',
    schoolUrl: 'https://www.scut.edu.cn',
    degree: 'B.Eng. in Computer Science and Technology (Innovation Class)',
  },
  description:
    `First-year Computer Science PhD student at ${doctoralEducation.school}. Co-first author of Ekko (OSDI 2022). LLVM developer with commit access.`,
  email: 'simachijun@gmail.com',
  sameAs: [
    'https://www.linkedin.com/in/chijun-sima/',
    'https://scholar.google.com/citations?user=8-HD_IEAAAAJ&hl=en',
  ],
  knowsAbout: [
    'WebAssembly',
    'LLVM',
    'Compilers',
    'Distributed Systems',
  ],
} as const;

export const siteMetadata = {
  url: 'https://www.chijunsima.com',
  name: profile.fullName,
  title: profile.fullName,
  description: `${profile.fullName} — ${profile.description}`,
  keywords: [profile.fullName, 'UT Austin', 'Computer Science', 'PhD', 'OSDI', 'Ekko', 'LLVM', 'Tencent', 'WeChat'],
  locale: 'en_US',
  language: 'en',
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
  {
    label: 'openapi.json',
    href: '/openapi.json',
    type: 'application/json',
    description: 'OpenAPI description for the public read-only profile endpoints.',
  },
  {
    label: 'agent skills',
    href: '/.well-known/agent-skills/index.json',
    type: 'application/json',
    description: 'Agent Skills discovery index for using the site profile endpoints.',
  },
] as const;

export const news = [
  {
    dateLabel: 'Aug 2026',
    dateISO: '2026-08-01T00:00:00-05:00',
    text: 'Started the PhD in Computer Science at UT Austin',
  },
  {
    dateLabel: '2025',
    dateISO: '2025-01-01T00:00:00+08:00',
    text: 'Reviewing for CVPR 2025',
  },
  {
    dateLabel: '2022',
    dateISO: '2022-09-01T00:00:00+08:00',
    text: "Ekko published at OSDI 2022; invited talks at Tencent's WeChat division, DataFun, TechBeat",
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
] as const;

export const experience = [
  {
    period: 'Aug 2026 – Present',
    startDate: '2026-08',
    endDate: null,
    role: 'PhD Student in Computer Science',
    subtitle: '',
    org: 'The University of Texas at Austin',
    orgUrl: 'https://www.cs.utexas.edu/',
    location: 'Austin, Texas, USA',
    projects: [
      {
        name: '',
        note: '',
        bullets: [
          'Advised by <a href="https://www.chenfengx.com" target="_blank" rel="noopener noreferrer">Chenfeng Xu</a> and <a href="https://www.cs.utexas.edu/~akella/" target="_blank" rel="noopener noreferrer">Aditya Akella</a>.',
        ],
      },
    ],
  },
  {
    period: 'Jul 2020 – Aug 2026',
    startDate: '2020-07',
    endDate: '2026-08',
    role: 'Senior Software Development Engineer',
    subtitle: '',
    org: "Tencent's WeChat division",
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
    endDate: null,
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

export const education = [
  doctoralEducation,
  {
    period: 'Sep 2016 – Jun 2020',
    startDate: '2016-09',
    endDate: '2020-06',
    degree: profile.education.degree,
    school: profile.education.school,
    schoolUrl: profile.education.schoolUrl,
    detail: 'GPA 3.85 / 4.00 · Rank 1 / 28',
  },
] as const;

export const talks = [
  { text: "Tencent's WeChat division, Shenzhen", date: 'Jun 2022' },
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

export const stripHtml = (value: string) => {
  let text = '';
  let insideTag = false;

  for (const char of value) {
    if (char === '<') {
      insideTag = true;
      continue;
    }

    if (char === '>' && insideTag) {
      insideTag = false;
      continue;
    }

    if (!insideTag) {
      text += char;
    }
  }

  return text.split(/\s+/).filter(Boolean).join(' ');
};
