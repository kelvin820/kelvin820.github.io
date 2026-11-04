# Kaimau Chang — Portfolio & CV

An Astro static website with a visitor-facing portfolio at `/` and an A4 print-friendly résumé at `/resume/`. Both render from **`src/data/profile.ts`**. The English content is based on the LinkedIn Profile.pdf supplied by the owner on 2026-11-04. No employer metrics, accomplishments or projects have been invented. The current-role headline is normalized from the more detailed Experience entry; the supplied PDF's header used “Technical Planning Manager”. Owner should review this when updating the CV.

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

The redesigned homepage is aimed at recruiters and employers. It includes an expertise explorer, expandable career timeline, English / 中文 content toggle, light / dark theme, mobile navigation and an industry-report portfolio entry. Homepage display preferences are stored locally in the visitor's browser; no analytics or tracking is added.

### Industry reports

Brand colors supplied by the owner: primary **#05164D**, accent **#FFAD00**. Preserve the existing portfolio structure and interactions when applying these colors. Yellow is used on navy or as decoration; body text on light backgrounds stays navy for legibility.

The first hosted report is `/reports/ceatec-2026/`. Its unmodified owner-supplied HTML is in `content/reports/ceatec-2026.html`. Edit that source, then run `pnpm build` or `pnpm dev`. `scripts/build-reports.mjs` compiles report-only Tailwind 3 styles and copies pinned Chart.js and Font Awesome assets into the ignored generated `public/reports/ceatec-2026/` directory. Astro includes these files in the build. Do not edit generated files. Source report body, chart values and source links are retained; the generated version adds site navigation and an accessible chart-data table. External reference links remain external, but rendering requires no third-party CDN scripts or fonts.

Add published reports to `src/data/reports.ts`. Each item has `title`, `description`, `category`, and `url`; optional `date`, `zhTitle`, and `zhDescription`. Both the homepage and `/reports/` render from this list. An empty list displays an explicit “Coming soon” link to the collection page. Do not add fictional example reports or nonfunctional external links.

```ts
// Shape only — replace with actual owner-supplied information before adding:
// { title, description, category, url, zhTitle?, zhDescription?, date? }
```

Edit `src/data/profile.ts` or ask Codex to update it. This updates both pages. Chinese translations are in `src/data/resume.ts`; keep them synchronized when editing English descriptions. The résumé provides English / 中文 buttons and shareable `?lang=en` / `?lang=zh` URLs. Keep dates, titles and claims traceable to owner-provided material. The résumé's **Print / Save PDF** button opens the browser print dialog. Only the selected language prints. Select A4 and disable browser headers/footers. CSS handles print margins, page breaks and contact links. This desktop app's embedded browser may not support native printing; open the URL in Chrome or Edge to use the system print dialog.

## Deploy

GitHub Actions builds and deploys pushes to `master`. In Settings → Pages, the build source must be **GitHub Actions**. Repository: https://github.com/kelvin820/kelvin820.github.io. Production: https://kelvin820.github.io/.

## Legacy and rollback

The complete original Hexo output is archived, unmodified, in `legacy/hexo-4ad9e39.zip`; a copy is served at `/archives/hexo-4ad9e39.zip`. Original master commit: `4ad9e39e505d1415a1e61e7a3f9a8eb30d610973`. Hexo is retired and is not part of the new build. `/legacy/` offers the download; missing old article URLs receive an informative 404 with an archive link. They are not silently redirected to unrelated content.

The Git history retains all original files. To restore the old site, create a recovery branch from that commit and restore its static deployment configuration; do not force-push over new history.

## Credits

- Portfolio: adapted architecture from [RyanFitzgerald/devportfolio](https://github.com/RyanFitzgerald/devportfolio), MIT. Restyled for Kaimau Chang.
- Résumé: Astro adaptation of the semantic single-column Header / Summary / WorkExperience / Education / Skills structure in [BartoszJarocki/cv](https://github.com/BartoszJarocki/cv), MIT. It is integrated into Astro rather than running a separate Next.js application.
- Full upstream license texts are in `licenses/`.

No template authors' résumé information, photos, analytics, or external font requests are used.
