# KaiMau CHANG — Portfolio & CV

An Astro static website with a visitor-facing portfolio at `/` and an A4 print-friendly résumé at `/resume/`. Both render from **`src/data/profile.ts`**. Employment history and education follow the owner-supplied LinkedIn Profile.pdf received on 2026-11-04. Current positioning follows the owner-supplied November 9 HTML and executive CV, plus direct updates about Compal learning agility/adaptability and Motorola support, Foxconn Tier-1 customers/Apple NPI, MediaTek prototyping, and Huawei/XUNWEI technology pathfinding. The newer executive CV assigns the biometric-sensing case to XUNWEI; the website now includes its original time comparisons and PoC/R&D windows. Existing companies, formal job titles, employment dates and verified education are retained. The owner also confirmed the highest degree (National Chung Cheng University, Electrical Engineering), RF device research, dual-band Wi-Fi LNA design, high marks in graduate IC tape-out evaluations, and co-inventorship on US9791924B2 (listed as Kai-Mau Chang). These are integrated without inventing ranks, process specifications or patent bibliographic details. Unfilled degree placeholders and ambiguous regulatory or savings claims are excluded. No achievements or metrics are invented.

## Develop

Use Node.js 24 LTS and pnpm 11.25.0:

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm build
pnpm preview
```

On this Windows computer, `./start-preview.ps1` also launches the local website at `http://127.0.0.1:4321/`, using an installed Node.js or the Codex bundled runtime. `./start-preview.ps1 -Build` builds without starting the server. Keep the preview terminal open while browsing; Ctrl+C stops it.

Only source code and the dependency lockfile are maintained. `dist/`, `node_modules/`, and local QA artifacts are ignored. `pnpm build` writes the site to `dist/`. No backend, database, paid service, or LinkedIn scraping is required.

## Update content

The redesigned homepage is aimed at recruiters and employers. It includes an expertise explorer, a current-capability overview, an expandable career timeline, English / 中文 content toggle, light / dark theme, mobile navigation and an industry-report portfolio entry. Homepage display preferences are stored locally in the visitor's browser; no analytics or tracking is added.

### Industry reports

Brand colors supplied by the owner: primary **#05164D**, accent **#FFAD00**. Preserve the existing portfolio structure and interactions when applying these colors. Yellow is used on navy or as decoration; body text on light backgrounds stays navy for legibility.

Hosted reports:

- `/reports/ceatec-2026/` — source: `content/reports/ceatec-2026.html`.
- `/reports/waic-2026/` — source: `content/reports/WAIC-2026.html`, converted to Traditional Chinese at the owner's request. Original technical names, numeric values, chart configuration, and document structure are retained.

Edit the source, then run `pnpm build` or `pnpm dev`. `scripts/build-reports.mjs` registers both documents, compiles their Tailwind 3 styles separately, and copies pinned Chart.js and Font Awesome assets into ignored generated `public/reports/<slug>/` directories. Astro includes these files in the build. Do not edit generated files. The generated versions add site navigation and accessible chart-data tables. External reference links remain external, but rendering requires no third-party CDN scripts or fonts. For a new HTML report, register its source, slug, description and original chart values in the builder, add its catalogue entry below, and ignore its generated directory. Astro's development server serves these static documents at `/reports/<slug>/index.html`; `pnpm preview` serves the directory URLs used by the deployed site.

Add published reports to `src/data/reports.ts`. Each item has `title`, `description`, `category`, and `url`; optional `date`, `zhTitle`, and `zhDescription`. Both the homepage and `/reports/` render from this list. An empty list displays an explicit “Coming soon” link to the collection page. Do not add fictional example reports or nonfunctional external links.

The homepage displays the first three entries as selected reports, followed by a link to the complete collection. Put the reports to feature first in the array. `/reports/` displays every entry in a responsive card grid; adding more reports does not require adding homepage sections or placeholders.

```ts
// Shape only — replace with actual owner-supplied information before adding:
// { title, description, category, url, zhTitle?, zhDescription?, date? }
```

### Personal projects

The homepage's separate `#projects` section is driven by `src/data/projects.ts`, with an independent Projects navigation link. Quiet Hours / 兩地之間 links to `https://kelvin820.github.io/quiet_hours/` in a new tab. Its clock, city illustration, 3D and immersive-view description is based on the owner's `kelvin820/quiet_hours` repository. The preview is a screenshot of its Paris/Taipei city panels. Quiet Hours remains deployed from that repository; this portfolio does not rebuild or embed the application. Keep personal web projects out of `src/data/reports.ts` and the professional reports collection.

### Profile and résumé

Edit `src/data/profile.ts` or ask Codex to update it. This updates both pages. Each career entry stores full `bullets` / `bulletsZh` for the website and concise `resumeBullets` / `resumeBulletsZh` for the printable CV, along with its bilingual stage, title and dates. `resumeSummary` / `resumeSummaryZh` and `resumeSkills` / `resumeSkillsZh` keep the one-page CV concise without reducing body text; maintain them alongside the full summary and skills. Keep the full and concise versions factually aligned; the shorter CV must not change customer scope or outcomes. The homepage combines current capabilities, the XUNWEI case study and the expandable six-entry career history. Chinese biographical translations live beside the English content in `src/data/profile.ts`; `src/data/resume.ts` selects the print fields for each language. The résumé provides English / 中文 buttons and shareable `?lang=en` / `?lang=zh` URLs. Keep dates, titles and claims traceable to owner-provided material. The résumé's **Print / Save PDF** button opens the browser print dialog. Only the selected language prints. Select A4 and disable browser headers/footers. CSS handles print margins, page breaks and contact links. This desktop app's embedded browser may not support native printing; open the URL in Chrome or Edge to use the system print dialog.

## Deploy

GitHub Actions builds and deploys pushes to `master`. In Settings → Pages, the build source must be **GitHub Actions**. Repository: https://github.com/kelvin820/kelvin820.github.io. Production: https://kelvin820.github.io/.

## Legacy and rollback

The complete original Hexo output is archived, unmodified, in `legacy/hexo-4ad9e39.zip`; a copy is served at `/archives/hexo-4ad9e39.zip`. Original master commit: `4ad9e39e505d1415a1e61e7a3f9a8eb30d610973`. Hexo is retired and is not part of the new build. `/legacy/` offers the download; missing old article URLs receive an informative 404 with an archive link. They are not silently redirected to unrelated content.

The Git history retains all original files. To restore the old site, create a recovery branch from that commit and restore its static deployment configuration; do not force-push over new history.

## Credits

- Portfolio: adapted architecture from [RyanFitzgerald/devportfolio](https://github.com/RyanFitzgerald/devportfolio), MIT. Restyled for KaiMau CHANG.
- Résumé: Astro adaptation of the semantic single-column Header / Summary / WorkExperience / Education / Skills structure in [BartoszJarocki/cv](https://github.com/BartoszJarocki/cv), MIT. It is integrated into Astro rather than running a separate Next.js application.
- Full upstream license texts are in `licenses/`.

No template authors' résumé information, photos, analytics, or external font requests are used.
