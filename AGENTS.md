# Website maintenance

- This is an Astro static site for GitHub Pages. Hexo is retired.
- All biographical content belongs in `src/data/profile.ts`. Both `/` and `/resume/` must use it.
- Never invent employers, dates, education, skills, achievements, metrics, or projects.
- Preserve `legacy/hexo-4ad9e39.zip` and upstream MIT license notices.
- Test `npm run build`, desktop and narrow-screen layout, navigation, and print styling before deployment.
- The résumé must remain readable on A4, retain selectable text and contact links, and hide navigation/buttons during printing.
- Deploy production only when the user has requested publication. Never commit credentials, user source PDFs, runtime binaries, or node_modules.
