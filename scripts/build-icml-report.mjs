import { readFile, writeFile, mkdir, cp } from 'node:fs/promises';
import { join } from 'node:path';
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';
import { profile } from '../src/data/profile.ts';
const require = createRequire(import.meta.url);
const OpenCC = require('opencc-js');

export async function buildIcmlReport(root, sharedAssets) {
  const source = join(root, 'content/reports/icml-2026.html');
  const output = join(root, 'public/reports/icml-2026');
  const assets = join(output, 'assets');
  await mkdir(assets, { recursive: true });
  // Reuse the pinned local chart/icon libraries and their license notices.
  await cp(sharedAssets, assets, { recursive: true });
  const config = join(root, '.astro/icml-tailwind.cjs');
  const input = join(root, '.astro/report-tailwind.css');
  await writeFile(config, `module.exports={content:[${JSON.stringify(source)}],theme:{extend:{colors:{primary:'#05164D',accent:'#FFAD00',primaryLight:'#0d287a',surface:'#F8FAFC',cardBg:'#FFFFFF'}}},plugins:[]};`);
  const compiled = spawnSync(process.execPath, [require.resolve('tailwindcss-report/lib/cli.js'), '-c', config, '-i', input, '-o', join(assets, 'report.css'), '--minify'], { cwd: root, stdio: 'inherit' });
  if (compiled.status !== 0) throw new Error('ICML styles failed to compile');

  // Conversion happens at build time. The owner-supplied source stays unchanged.
  // ASCII code, URLs, IDs, English paper titles and all numeric values survive.
  const convert = OpenCC.Converter({ from: 'cn', to: 'twp' });
  let html = convert(await readFile(source, 'utf8'));
  html = html.replace('lang="zh-CN"', 'lang="zh-Hant"');
  html = html.replace(/<script>\s*tailwind\.config\s*=[\s\S]*?<\/script>/, '');
  html = html.replace('<script src="https://cdn.tailwindcss.com"></script>', '<link rel="stylesheet" href="./assets/report.css">');
  html = html.replace('<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>', '<script src="./assets/chart.umd.js"></script>');
  html = html.replace('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">', '<link rel="stylesheet" href="./assets/css/fontawesome.min.css"><link rel="stylesheet" href="./assets/css/solid.min.css">');
  html = html.replace(/font-family:\s*-apple-system[^;]+;/, 'font-family: "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;');
  html = html.replace('</head>', `<link rel="canonical" href="https://kelvin820.github.io/reports/icml-2026/">
<meta name="description" content="ICML 2026 端側 AI 晶片架構與策略洞察：記憶體、量化、NPU 相容性與端側部署分析。">
<meta name="theme-color" content="#05164D"><link rel="icon" href="/favicon.svg" type="image/svg+xml">
<style>
.report-portal{background:#05164D;color:#fff;border-bottom:1px solid #ffffff30;padding:14px 24px;font:13px/1.6 Arial,'Microsoft JhengHei',sans-serif;display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap}
.report-portal a{color:#fff;text-decoration:none}.report-portal a:hover{color:#FFAD00}.report-portal nav{display:flex;gap:22px}.report-portal strong{color:#FFAD00}.report-portal a:focus-visible{outline:2px solid #FFAD00;outline-offset:5px}
@media print{.report-portal{display:none!important}}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto!important}*{animation:none!important;transition:none!important}}
</style></head>`);
  html = html.replace(/(<body\b[^>]*>)/, `$1
<div class="report-portal"><a href="/">← <strong>${profile.name}</strong> / 張凱貿</a><nav aria-label="網站導覽"><a href="/reports/">所有產業報告</a><a href="/resume/?lang=zh">個人履歷 ↗</a></nav></div>`);
  html = html.replace('<canvas id="techRadarChart"></canvas>', '<canvas id="techRadarChart" role="img" aria-label="ICML 技術方案比較雷達圖"></canvas>');
  html = html.replace('<canvas id="memoryComparisonChart"></canvas>', '<canvas id="memoryComparisonChart" role="img" aria-label="端側部署記憶體占用比較圖"></canvas>');
  html = html.replace('const radarCtx =', 'Chart.defaults.font.family = \'"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif\';\n    const radarCtx =');
  html = html.replace(/target="_blank"(?!\s+rel=)/g, 'target="_blank" rel="noopener noreferrer"');
  await writeFile(join(output, 'index.html'), html);
  console.log('Built ICML report in Traditional Chinese with local styles, icons, and two charts.');
}
