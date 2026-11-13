# Nikita Khilko portfolio

This repository hosts [the portfolio](https://nkhilko.github.io/) on GitHub Pages. Pages serves the root of `main`. The site is static and uses Node.js to generate HTML and copy assets.

## Build and preview

From the repository root, run:

```sh
PORTFOLIO_BASE_URL=https://nkhilko.github.io/ node build.mjs
python3 -m http.server 8080 --directory dist
```

Open http://localhost:8080/. The base URL supplies the canonical URL and the absolute social preview image URL. The build needs no package installation.

## Source and publishing

| Path | Purpose |
| --- | --- |
| `src/content.mjs` | Case studies, metrics, contact links, and page copy |
| `src/diagrams.mjs` | Diagram nodes, connections, scope, and text walkthroughs |
| `src/svg.mjs` | Responsive SVG layouts and notation |
| `src/template.mjs` | Page and case study templates |
| `src/styles.css`, `src/tokens.css` | Site styling and visual tokens |
| `src/interactions.js` | Case anchors, focus, navigation, and motion |
| `src/social.png` | Social sharing image |

Edit the source, rebuild, and review `dist/`. Copy the generated `index.html`, `assets/`, and `.nojekyll` to the repository root and include them with the source changes in the same pull request. Merging to `main` makes the generated files available to GitHub Pages. Keep project reference material and private records outside this repository.
