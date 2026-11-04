import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const require = createRequire(import.meta.url);
const source = join(root, 'content/reports/ceatec-2026.html');
const output = join(root, 'public/reports/ceatec-2026');
const assets = join(output, 'assets');
await mkdir(join(assets, 'css'), { recursive: true });
await mkdir(join(assets, 'webfonts'), { recursive: true });

// Compile only the original report's classes using its original Tailwind major.
// Its global CSS is isolated from the Astro portfolio by a standalone document.
const config = join(root, '.astro/report-tailwind.cjs');
const input = join(root, '.astro/report-tailwind.css');
await mkdir(dirname(config), { recursive: true });
await writeFile(config, `module.exports={content:[${JSON.stringify(source)}],theme:{extend:{colors:{primary:'#05164D',accent:'#FFAD00'}}},plugins:[]};`);
await writeFile(input, '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n');
const compiled = spawnSync(process.execPath, [require.resolve('tailwindcss-report/lib/cli.js'), '-c', config, '-i', input, '-o', join(assets, 'report.css'), '--minify'], { cwd: root, stdio: 'inherit' });
if (compiled.status !== 0) throw new Error('Report styles failed to compile');

const chartDirectory = dirname(require.resolve('chart.js'));
await copyFile(join(chartDirectory, 'chart.umd.js'), join(assets, 'chart.umd.js'));
const icons = dirname(require.resolve('@fortawesome/fontawesome-free/package.json'));
for (const name of ['fontawesome.min.css', 'solid.min.css']) await copyFile(join(icons, 'css', name), join(assets, 'css', name));
for (const name of ['fa-solid-900.woff2', 'fa-solid-900.ttf']) await copyFile(join(icons, 'webfonts', name), join(assets, 'webfonts', name));
await copyFile(join(icons, 'LICENSE.txt'), join(assets, 'fontawesome-LICENSE.txt'));
await copyFile(join(chartDirectory, '..', 'LICENSE.md'), join(assets, 'chartjs-LICENSE.md'));

let html = await readFile(source, 'utf8');
html = html.replace(/<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>\s*<script>[\s\S]*?<\/script>/, '<link rel="stylesheet" href="./assets/report.css">');
html = html.replace('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">', '<link rel="stylesheet" href="./assets/css/fontawesome.min.css"><link rel="stylesheet" href="./assets/css/solid.min.css">');
html = html.replace('<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>', '<script src="./assets/chart.umd.js"></script>');
html = html.replace('</head>', `<link rel="canonical" href="https://kelvin820.github.io/reports/ceatec-2026/">
<meta name="description" content="張凱貿的 CEATEC 2026 深度研發洞察：Physical AI、微表面光學、感測技術與消費終端的範式轉變。">
<meta name="theme-color" content="#05164D"><link rel="icon" href="/favicon.svg" type="image/svg+xml">
<style>
.report-portal{background:#05164D;color:#fff;border-bottom:1px solid #ffffff30;padding:14px 24px;font:13px/1.6 Arial,'Microsoft JhengHei',sans-serif;display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap}
.report-portal a{color:#fff;text-decoration:none}.report-portal a:hover{color:#FFAD00}.report-portal nav{display:flex;gap:22px}.report-portal strong{color:#FFAD00}.report-portal a:focus-visible{outline:2px solid #FFAD00;outline-offset:5px}
.chart-data{font-size:12px;color:#05164D;margin-top:18px}.chart-data summary{cursor:pointer;padding:8px 0}.chart-data table{border-collapse:collapse;width:100%;margin-top:12px}.chart-data th,.chart-data td{padding:8px;text-align:left;border-bottom:1px solid #e2e8f0}.chart-data caption{text-align:left;margin-bottom:8px}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto!important}*{animation:none!important;transition:none!important}}
</style></head>`);
html = html.replace(/(<body\b[^>]*>)/, `$1
<div class="report-portal"><a href="/">← <strong>KC.</strong> 張凱貿 / Kaimau Chang</a><nav aria-label="網站導覽"><a href="/reports/">所有產業報告</a><a href="/resume/?lang=zh">個人履歷 ↗</a></nav></div>`);
html = html.replace('<canvas id="techRadarChart"></canvas>', `<canvas id="techRadarChart" role="img" aria-label="CEATEC 技術成熟度與消費終端潛力雷達圖，數值見下方資料表"></canvas>`);
// Keep the original author's chart values available to screen readers and
// visitors without canvas, alongside the original interactive visualization.
html = html.replace(/(<\/canvas>[\s\S]*?<\/div>)/, `$1
<details class="chart-data"><summary>查看圖表數值 / Chart data</summary><table><caption>原報告研究評估，保留原始數值</caption><thead><tr><th scope="col">技術向度</th><th scope="col">當前技術成熟度</th><th scope="col">未來消費終端潛力</th></tr></thead><tbody>${[
 ['Physical AI 具身控制',75,95],['聲學分離與理解（TUSS）',90,92],['微表面光學直顯（Meta-optics）',80,98],['電磁場高精追蹤（EMF）',85,85],['分子嗅覺生化感測',70,90],['離網高韌性永續',88,82],
].map(row => `<tr><th scope="row">${row[0]}</th><td>${row[1]}</td><td>${row[2]}</td></tr>`).join('')}</tbody></table></details>`);
html = html.replace(/target="_blank"(?!\s+rel=)/g, 'target="_blank" rel="noopener noreferrer"');
html = html.replace(/fa-chart-radar/g, 'fa-chart-line');
await writeFile(join(output, 'index.html'), html);
console.log('Built CEATEC report with local styles, icons, and Chart.js.');
