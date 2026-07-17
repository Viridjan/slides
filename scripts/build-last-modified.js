/* Proprietà intellettuale di Francesco Antonio Binetti */
const fs = require('fs');
const { execFileSync } = require('child_process');

const indexHtml = fs.readFileSync('00-indice.html', 'utf8');
const files = [...new Set(
  [...indexHtml.matchAll(/class="module-card[^"]*"\s+href="([^"]+\.html)"/g)]
    .map(match => match[1])
    .filter(file => fs.existsSync(file))
)].sort();

const today = new Date().toISOString().slice(0, 10);
const dates = {};

for (const file of files) {
  let dirty = false;
  try {
    dirty = execFileSync('git', ['status', '--porcelain', '--', file], { encoding: 'utf8' }).trim().length > 0;
  } catch {}

  let date = '';
  if (!dirty) {
    try {
      date = execFileSync('git', ['log', '-1', '--format=%cs', '--', file], { encoding: 'utf8' }).trim();
    } catch {}
  }
  dates[file] = dirty || !date ? today : date;
}

fs.writeFileSync(
  'last-modified-index.js',
  `/* Proprietà intellettuale di Francesco Antonio Binetti */\nwindow.LAST_MODIFIED_INDEX = ${JSON.stringify(dates, null, 2)};\n`
);
console.log(`Wrote last-modified-index.js with ${files.length} entries.`);
