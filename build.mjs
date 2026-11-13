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
await mkdir(fromRoot('./dist/assets'), { recursive: true });
await Promise.all([
  writeFile(fromRoot('./dist/index.html'), renderPage({ socialImage, pageUrl })),
  writeFile(fromRoot('./dist/.nojekyll'), ''),
  writeFile(fromRoot('./dist/assets/styles.css'), styles),
  writeFile(fromRoot('./dist/assets/tokens.css'), tokens),
  writeFile(fromRoot('./dist/assets/interactions.js'), script),
  cp(fromRoot('./src/social.png'), fromRoot('./dist/assets/social.png')),
]);
if (process.argv.includes('--preview')) {
  const socialData = (await readFile(fromRoot('./src/social.png'))).toString('base64');
  await writeFile(fromRoot('../Nikita-Khilko-Portfolio.html'), renderPage({
    inlineAssets: true, styles, script, tokens, socialImage: `data:image/png;base64,${socialData}`,
  }));
}
