import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { renderPage } from './src/template.mjs';

const fromRoot = (file) => new URL(file, import.meta.url);
const read = (file) => readFile(fromRoot(file), 'utf8');
const [styles, tokens, script] = await Promise.all([
  read('./src/styles.css'),
  read('./src/tokens.css'),
  read('./src/interactions.js'),
]);
const pageUrl = process.env.PORTFOLIO_BASE_URL;
const socialImage = pageUrl
  ? new URL('./assets/social.png', pageUrl).href
  : './assets/social.png';
const output = fromRoot('./dist/');
const file = (name) => new URL(name, output);
await mkdir(file('assets'), { recursive: true });
await Promise.all([
  writeFile(file('index.html'), renderPage({ socialImage, pageUrl })),
  writeFile(file('.nojekyll'), ''),
  writeFile(file('assets/styles.css'), styles),
  writeFile(file('assets/tokens.css'), tokens),
  writeFile(file('assets/interactions.js'), script),
  cp(fromRoot('./src/social.png'), file('assets/social.png')),
]);
if (process.argv.includes('--preview')) {
  const socialData = (await readFile(fromRoot('./src/social.png'))).toString('base64');
  const preview = fromRoot('./preview/');
  await mkdir(preview, { recursive: true });
  await writeFile(new URL('index.html', preview), renderPage({
    inlineAssets: true, styles, script, tokens, socialImage: `data:image/png;base64,${socialData}`,
  }));
}
