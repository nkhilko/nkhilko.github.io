import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';

const expected = ['.nojekyll', 'assets/interactions.js', 'assets/social.png', 'assets/styles.css', 'assets/tokens.css', 'index.html'];
const root = (path) => new URL(path, import.meta.url);

async function files(dir, prefix = '') {
  const entries = await readdir(dir, { withFileTypes: true });
  const paths = await Promise.all(entries.map(entry => {
    const name = prefix + entry.name;
    if (entry.isDirectory()) return files(new URL(entry.name + '/', dir), name + '/');
    assert(entry.isFile(), `Unexpected file type: ${name}`);
    return name;
  }));
  return paths.flat().sort();
}

for (const dir of ['dist', 'docs']) {
  assert.deepEqual(await files(root(`./${dir}/`)), expected, `Unexpected publication files in ${dir}/`);
}
for (const name of expected) {
  const built = await readFile(root(`./dist/${name}`));
  const checkedIn = await readFile(root(`./docs/${name}`));
  assert(built.equals(checkedIn), `Generated content differs: ${name}`);
}
console.log('All six publishing files match the build.');
