import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const require = createRequire(import.meta.url);
// Each standalone report keeps its original document, scripts and chart values.
// Register its source and accessible chart table here as well as its catalogue card.
const definitions = [
  {
    slug: 'ceatec-2026', source: 'ceatec-2026.html',
    description: '張凱貿的 CEATEC 2026 深度研發洞察：Physical AI、微表面光學、感測技術與消費終端的範式轉變。',
    chart: {
      id: 'techRadarChart', label: 'CEATEC 技術成熟度與消費終端潛力雷達圖，數值見下方資料表',
      headers: ['技術向度', '當前技術成熟度', '未來消費終端潛力'],
      rows: [
        ['Physical AI 具身控制', 75, 95], ['聲學分離與理解（TUSS）', 90, 92],
        ['微表面光學直顯（Meta-optics）', 80, 98], ['電磁場高精追蹤（EMF）', 85, 85],
        ['分子嗅覺生化感測', 70, 90], ['離網高韌性永續', 88, 82],
      ],
    },
  },
  {
    slug: 'waic-2026', source: 'WAIC-2026.html',
    description: '張凱貿的 WAIC 2026 深度研究報告：AI 智能體、具身智能、超節點算力、光互聯、液冷與開放標準。',
    chart: {
      id: 'superpodChart', label: '大模型算力基礎設施架構演進對數長條圖，數值見下方資料表',
      headers: ['架構', '集群單網絡域擴展卡數'],
      rows: [
        ['傳統單機櫃極限 (電互聯)', 72], ['正交無背板架構', 64],
        ['NPO 光互聯超節點', 1024], ['全域超算集群', 100000],
      ],
    },
  },
];

function chartTable(chart) {
  return `<details class="chart-data"><summary>查看圖表數值 / Chart data</summary><div class="chart-data-scroll"><table><caption>原報告研究評估，保留原始數值</caption><thead><tr>${chart.headers.map(header => `<th scope="col">${header}</th>`).join('')}</tr></thead><tbody>${chart.rows.map(row => `<tr><th scope="row">${row[0]}</th>${row.slice(1).map(value => `<td>${value}</td>`).join('')}</tr>`).join('')}</tbody></table></div></details>`;
}

const portalStyles = `
.report-portal{background:#05164D;color:#fff;border-bottom:1px solid #ffffff30;padding:14px 24px;font:14px/1.6 Arial,'Microsoft JhengHei',sans-serif;display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap}
.report-portal a{color:#fff;text-decoration:none}.report-portal a:hover{color:#FFAD00}.report-portal nav{display:flex;gap:22px;flex-wrap:wrap}.report-portal strong{color:#FFAD00}.report-portal a:focus-visible{outline:2px solid #FFAD00;outline-offset:5px}
.chart-data{font-size:14px;color:#05164D;margin-top:18px}.chart-data summary{cursor:pointer;padding:8px 0}.chart-data-scroll{overflow-x:auto}.chart-data table{border-collapse:collapse;width:100%;margin-top:12px}.chart-data th,.chart-data td{padding:8px;text-align:left;border-bottom:1px solid #e2e8f0}.chart-data caption{text-align:left;margin-bottom:8px}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto!important}*{animation:none!important;transition:none!important}}
`;

for (const report of definitions) {
  const source = join(root, 'content/reports', report.source);
  const output = join(root, 'public/reports', report.slug);
  const assets = join(output, 'assets');
  await mkdir(join(assets, 'css'), { recursive: true });
  await mkdir(join(assets, 'webfonts'), { recursive: true });

  // Compile each document's utility classes separately with its original Tailwind major.
  const config = join(root, `.astro/${report.slug}-tailwind.cjs`);
  const input = join(root, '.astro/report-tailwind.css');
  await mkdir(dirname(config), { recursive: true });
  await writeFile(config, `module.exports={content:[${JSON.stringify(source)}],theme:{extend:{colors:{primary:'#05164D',accent:'#FFAD00'}}},plugins:[]};`);
  await writeFile(input, '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n');
  const compiled = spawnSync(process.execPath, [require.resolve('tailwindcss-report/lib/cli.js'), '-c', config, '-i', input, '-o', join(assets, 'report.css'), '--minify'], { cwd: root, stdio: 'inherit' });
  if (compiled.status !== 0) throw new Error(`${report.slug}: report styles failed to compile`, { cause: compiled.error });

  const chartDirectory = dirname(require.resolve('chart.js'));
  await copyFile(join(chartDirectory, 'chart.umd.js'), join(assets, 'chart.umd.js'));
  const icons = dirname(require.resolve('@fortawesome/fontawesome-free/package.json'));
  for (const name of ['fontawesome.min.css', 'solid.min.css']) await copyFile(join(icons, 'css', name), join(assets, 'css', name));
  for (const name of ['fa-solid-900.woff2', 'fa-solid-900.ttf']) await copyFile(join(icons, 'webfonts', name), join(assets, 'webfonts', name));
  await copyFile(join(icons, 'LICENSE.txt'), join(assets, 'fontawesome-LICENSE.txt'));
  await copyFile(join(chartDirectory, '..', 'LICENSE.md'), join(assets, 'chartjs-LICENSE.md'));

  let html = await readFile(source, 'utf8');
  html = html.replace('<script src="https://cdn.tailwindcss.com"></script>', '<link rel="stylesheet" href="./assets/report.css">');
  // The WAIC source orders its CDN tags differently from CEATEC: remove only
  // Tailwind's configuration, never the intervening scripts or stylesheets.
  html = html.replace(/<script>\s*tailwind\.config\s*=[\s\S]*?<\/script>/, '');
  html = html.replace('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">', '<link rel="stylesheet" href="./assets/css/fontawesome.min.css"><link rel="stylesheet" href="./assets/css/solid.min.css">');
  html = html.replace('<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>', '<script src="./assets/chart.umd.js"></script>');
  html = html.replace('</head>', `<link rel="canonical" href="https://kelvin820.github.io/reports/${report.slug}/">
<meta name="description" content="${report.description}">
<meta name="theme-color" content="#05164D"><link rel="icon" href="/favicon.svg" type="image/svg+xml">
<style>${portalStyles}</style></head>`);
  html = html.replace(/(<body\b[^>]*>)/, `$1
<div class="report-portal"><a href="/">← <strong>KC.</strong> 張凱貿 / Kaimau Chang</a><nav aria-label="網站導覽"><a href="/reports/">所有產業報告</a><a href="/resume/?lang=zh">個人履歷 ↗</a></nav></div>`);

  const canvas = `<canvas id="${report.chart.id}"></canvas>`;
  if (!html.includes(canvas)) throw new Error(`${report.slug}: expected chart canvas is missing`);
  html = html.replace(canvas, `<canvas id="${report.chart.id}" role="img" aria-label="${report.chart.label}"></canvas>`);
  // Place the fallback outside the chart's fixed-height container.
  const chartContainer = new RegExp(`(<canvas id="${report.chart.id}"[^>]*><\\/canvas>\\s*<\\/div>)`);
  if (!chartContainer.test(html)) throw new Error(`${report.slug}: expected chart container is missing`);
  html = html.replace(chartContainer, `$1\n${chartTable(report.chart)}`);
  html = html.replace(/target="_blank"(?!\s+rel=)/g, 'target="_blank" rel="noopener noreferrer"');
  html = html.replace(/fa-chart-radar/g, 'fa-chart-line');
  if (/cdn\.tailwindcss\.com|cdn\.jsdelivr\.net|cdnjs\.cloudflare\.com|tailwind\.config/.test(html)) {
    throw new Error(`${report.slug}: CDN runtime dependency remains`);
  }
  await writeFile(join(output, 'index.html'), html);
  console.log(`Built ${report.slug} with local styles, icons, Chart.js, and accessible chart data.`);
}
