// Add owner-supplied published report URLs here. Home and /reports/ share this list.
// Do not create fictional reports or link unpublished placeholders to external sites.
export interface IndustryReport {
  title: string;
  description: string;
  category: string;
  url: string;
  date?: string;
  zhTitle?: string;
  zhDescription?: string;
  zhCategory?: string;
  language?: string;
  coverTitle?: string;
  coverSubtitle?: string;
}
export const reports: IndustryReport[] = [
  {
    title: 'CEATEC 2026: R&D and Consumer Technology Insights',
    zhTitle: '探索日本 CES：CEATEC 2026 深度研發洞察',
    description: 'An industry research report examining Physical AI, meta-optics, sensing technologies, and five shifts in future consumer devices.',
    zhDescription: '從 Physical AI、微表面光學與感測技術切入，探索日本大廠的技術發展，以及未來消費終端的五大範式轉變。',
    category: 'Industry research · CEATEC',
    zhCategory: '產業研究 · CEATEC',
    url: '/reports/ceatec-2026/',
    language: 'zh-Hant',
    coverTitle: 'CEATEC',
    coverSubtitle: '2026.',
  },
];
