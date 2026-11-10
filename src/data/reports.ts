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
    title: 'ICML 2026: On-Device AI Chip Architecture and Strategic Insights',
    zhTitle: '2026 ICML 端側 AI 晶片架構與戰略洞察研究',
    description: 'Research on on-device AI memory constraints, quantization, NPU compatibility, and software–hardware co-design, with comparative radar and memory charts.',
    zhDescription: '聚焦端側 AI 的記憶體瓶頸、量化技術、NPU 算子相容性與軟硬體協同設計，搭配技術方案雷達圖與記憶體占用比較。',
    category: 'Industry research · ICML',
    zhCategory: '產業研究 · ICML',
    url: '/reports/icml-2026/',
    language: 'zh-Hant',
    coverTitle: 'ICML',
    coverSubtitle: '2026.',
  },
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
  {
    title: 'WAIC 2026: AI Agents, Embodied Intelligence & SuperPOD Infrastructure',
    zhTitle: '2026 世界人工智能大會（WAIC）深度研究報告',
    description: 'An industry research report on AI agent commercialization, embodied intelligence, supernode computing infrastructure, optical interconnects, liquid cooling, and open standards.',
    zhDescription: '聚焦 AI 智能體商業化、具身智能與超節點算力基礎設施，探討光互聯、液冷與開放標準的產業發展。',
    category: 'AI research · WAIC',
    zhCategory: '人工智能研究 · WAIC',
    url: '/reports/waic-2026/',
    language: 'zh-Hant',
    coverTitle: 'WAIC',
    coverSubtitle: '2026.',
  },
];
