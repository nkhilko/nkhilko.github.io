import { identity, groups, projects, experience, approach } from './content.mjs';
import { diagrams } from './diagrams.mjs';
import { detailFigure, escape as e, overview } from './svg.mjs';

const icon = (path, cssClass = '') => `<svg class="${cssClass}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="${path}"/></svg>`;
const arrow = icon('M5 12h14m-6-6 6 6-6 6', 'arrow');
const external = icon('M6 18 18 6M8 6h10v10', 'arrow');
const plus = icon('M5 12h14M12 5v14', 'plus');
const down = icon('M12 5v14m-6-6 6 6 6-6', 'arrow');
const nav = [['work', 'Work'], ['impact', 'Impact'], ['about', 'About'], ['contact', 'Contact']];

const metrics = (items) => `<dl class="metrics">${items.map(({ value, label, type }) => `
  <div class="metric"><dt>${e(value)}</dt><dd>${e(label)}<span>${e(type)}</span></dd></div>`).join('')}</dl>`;

const comparison = (rows) => `<table class="comparison">
  <caption>Preparation time per checklist</caption>
  <thead><tr><th scope="col">Step</th><th scope="col">Supplied estimate</th></tr></thead>
  <tbody>${rows.map(([step, estimate]) => `<tr><th scope="row">${e(step)}</th><td>${e(estimate)}</td></tr>`).join('')}</tbody>
</table>`;

function renderCase(id) {
  const project = projects[id];
  const hero = id === 'sdr-crm';
  const hasLargeSummary = hero || id === 'limon-ad';
  const heading = e(project.title);
  const cta = project.cta || 'Read case study';
  const miniDiagram = project.overview && overview(id, diagrams[project.diagrams[0]], project.overview);
  const inlineMetric = project.metrics?.[0];
  const summaryMetrics = hasLargeSummary ? metrics(hero ? [inlineMetric] : project.metrics.slice(0, 2))
    : inlineMetric && `<div class="summary-metric"><strong>${e(inlineMetric.value)}</strong><span>${e(inlineMetric.label)}<small>${e(inlineMetric.type)}</small></span></div>`;
  const title = `<div class="case-copy"><span class="eyebrow">${e(project.category)}</span>
    <h3 id="${id}-title">${heading}</h3><p>${e(project.summary)}</p></div>`;
  return `<details class="case ${hero ? 'case-feature' : ''} ${id === 'limon-ad' ? 'case-commercial' : ''}" id="${id}" name="featured-case" data-case>
    <summary aria-labelledby="${id}-title ${id}-action">
      <div class="case-summary">
        ${title}
        ${hero ? `<div class="feature-figure"><span class="eyebrow">Workflow overview</span>${miniDiagram}${summaryMetrics}</div>` : ''}
        ${!hasLargeSummary && miniDiagram ? `<div class="case-overview">${miniDiagram}</div>` : ''}
        ${!hero && summaryMetrics ? summaryMetrics : ''}
      </div>
      <div class="case-action"><span id="${id}-action"><span class="when-closed">${e(cta)}</span><span class="when-open">Close case study</span></span><span class="case-toggle">${plus}</span></div>
    </summary>
    <div class="case-body">
      <div class="detail-pair">
        <div><h4>Business challenge</h4><p>${e(project.challenge)}</p></div>
        <div><h4>My contribution</h4><p>${e(project.contribution)}</p></div>
      </div>
      <div class="architecture">
        <h4>Architecture</h4>
        <div class="figure-grid">${project.diagrams.map((key) => detailFigure(key, diagrams[key])).join('')}</div>
        <details class="legend"><summary>Diagram notation</summary>
          <ul>
            <li><i class="sample activity"></i> Operational activity</li>
            <li><i class="sample external"></i> External system</li>
            <li><i class="sample human"></i> Mandatory human review</li>
            <li><i class="sample decision"></i> Decision</li>
            <li><i class="sample flow"></i> Primary workflow</li>
            <li><i class="sample dependency"></i> Supporting dependency</li>
          </ul>
          ${project.diagrams.some((key) => diagrams[key].boundary) ? '<p>The dashed enclosure marks the implemented operational system. External services sit outside it.</p>' : ''}
        </details>
      </div>
      <div class="detail-pair">
        <div><h4>Operating controls</h4><ul>${project.controls.map((control) => `<li>${e(control)}</li>`).join('')}</ul></div>
        <div><h4>Technology &amp; design decisions</h4><p>${e(project.decisions)}</p>${id === 'hospitality-operations' ? '<a class="related-link" href="#tvoe-menu">See earlier work at TVOE.menu</a>' : ''}</div>
      </div>
      <div class="detail-impact">
        <h4>Business impact</h4>
        ${project.metrics ? metrics(project.metrics) : ''}
        <p>${e(project.impact)}</p>
        ${project.comparison ? comparison(project.comparison) : ''}
      </div>
      <div class="detail-footer">
        <a href="#${id}" data-project-link>Link to this case ${external}</a>
        <button type="button" data-close>Close case study <span aria-hidden="true">−</span></button>
      </div>
    </div>
  </details>`;
}

function renderGroup(group) {
  const [first, ...remaining] = group.projects;
  const featured = group.id === 'work' ? renderCase(first) : '';
  const cards = featured ? remaining : group.projects;
  return `<section class="section section-${group.id}" id="${group.id}" aria-labelledby="${group.id}-heading" ${group.id === 'commerce' ? '' : 'data-nav-section'}>
    <div class="wrap">
      <div class="section-head" data-reveal><h2 id="${group.id}-heading">${e(group.title)}</h2><p>${e(group.description)}</p></div>
      ${featured}
      <div class="case-grid" data-reveal>${cards.map(renderCase).join('')}</div>
    </div>
  </section>`;
}

export function renderPage({ inlineAssets, styles, script, tokens, socialImage, pageUrl } = {}) {
  const title = `${identity.name} · AI Operations & Product Strategy`;
  const favicon = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 32 32%22%3E%3Crect width=%2232%22 height=%2232%22 rx=%225%22 fill=%22%23222222%22/%3E%3Cpath d=%22M8 10h7v5H8zm9 8h7v5h-7zm-5-3v5.5h5%22 fill=%22none%22 stroke=%22white%22 stroke-width=%221.5%22/%3E%3C/svg%3E';
  const css = inlineAssets ? `<style>${tokens}\n${styles.replace(/^@import[^;]+;/, '')}</style>` : '<link rel="stylesheet" href="./assets/styles.css">';
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${e(title)}</title>
  <meta name="description" content="${e(identity.description)}">
  <meta name="theme-color" content="#f9f8f5">
  <link rel="icon" href="${favicon}">
  ${pageUrl ? `<link rel="canonical" href="${e(pageUrl)}">
  <meta property="og:url" content="${e(pageUrl)}">` : ''}
  <meta property="og:type" content="website">
  <meta property="og:title" content="${e(title)}">
  <meta property="og:description" content="${e(identity.description)}">
  <meta property="og:image" content="${socialImage}">
  <meta property="og:image:alt" content="Nikita Khilko. AI Operations and Product Strategy.">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${e(title)}">
  <meta name="twitter:description" content="${e(identity.description)}">
  <meta name="twitter:image" content="${socialImage}">
  ${css}
</head>
<body id="top">
  <a class="skip" href="#main">Skip to content</a>
  <div class="header-slot">
    <header class="header" data-header>
      <div class="wrap header-inner">
        <a class="brand" href="#top">${e(identity.name)}</a>
        <nav aria-label="Main navigation">${nav.map(([id, label]) => `<a href="#${id}">${label}</a>`).join('')}</nav>
      </div>
    </header>
  </div>
  <main id="main" tabindex="-1">
    <section class="hero" aria-labelledby="hero-heading">
      <div class="wrap">
        <p class="eyebrow hero-role">AI Operations <span></span> Product Strategy <span></span> Revenue Systems</p>
        <h1 id="hero-heading">${e(identity.headline)}</h1>
        <div class="hero-bottom">
          <p>${e(identity.intro)}</p>
          <a class="hero-link" href="#work">Selected work <span>${down}</span></a>
        </div>
      </div>
    </section>
    ${groups.map(renderGroup).join('')}
    <section class="section section-experience" id="experience" aria-labelledby="experience-heading">
      <div class="wrap">
        <div class="section-head" data-reveal><h2 id="experience-heading">Selected Experience</h2><p>Platforms, products and reusable work across consulting, security and creative production.</p></div>
        <dl class="experience-list" data-reveal>${experience.map(([title, description]) => `<div${title === 'TVOE.menu' ? ' id="tvoe-menu"' : ''}><dt>${e(title)}</dt><dd>${e(description)}</dd></div>`).join('')}</dl>
      </div>
    </section>
    <section class="section section-about" id="about" aria-labelledby="about-heading" data-nav-section>
      <div class="wrap">
        <div class="section-head" data-reveal><h2 id="about-heading">Approach &amp; Background</h2><p>I’m an AI automation and product consultant based in the Barcelona area. I founded PrivateData and have worked across product ownership, growth, independent commerce and technical delivery.</p></div>
        <ol class="approach-list" data-reveal>${approach.map(([title, description]) => `<li><h3>${e(title)}</h3><p>${e(description)}</p></li>`).join('')}</ol>
      </div>
    </section>
  </main>
  <footer class="contact" id="contact" aria-labelledby="contact-heading" data-nav-section>
    <div class="wrap">
      <div class="contact-grid" data-reveal>
        <div><p class="eyebrow">Contact</p><h2 id="contact-heading">Let’s talk.</h2><p>For product roles, consulting projects and partnerships.</p></div>
        <address>${identity.contacts.map(({ href, label, detail }) => `<a href="${e(href)}"><strong>${e(label)}</strong><span>${e(detail)}</span>${external}</a>`).join('')}</address>
      </div>
      <div class="footer-line"><span>${e(identity.name)}</span><a href="#top">Back to top ${arrow}</a></div>
    </div>
  </footer>
  ${inlineAssets ? `<script>${script}</script>` : '<script src="./assets/interactions.js" defer></script>'}
</body>
</html>
`;
}
