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

const git = args => {
  try {
    return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
  } catch {
    return '';
  }
};

const decode = text => text
  .replace(/&nbsp;/gi, ' ')
  .replace(/&amp;/gi, '&')
  .replace(/&lt;/gi, '<')
  .replace(/&gt;/gi, '>')
  .replace(/&quot;/gi, '"')
  .replace(/&#39;|&apos;/gi, "'")
  .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));

// Canonical educational content only. Title/closing slides and generated or
// technical chrome must not move the editorial last-modified date.
const contentFingerprint = html => {
  if (!html) return '';
  const cleaned = html
    .replace(/<!--([\s\S]*?)-->/g, ' ')
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ');
  const slides = [...cleaned.matchAll(/<section\b([^>]*)>([\s\S]*?)<\/section>/gi)];
  return slides
    .filter(([, attrs]) => {
      const classes = attrs.match(/class="([^"]*)"/i)?.[1]?.split(/\s+/) || [];
      return classes.includes('slide')
        && !classes.includes('title')
        && !classes.includes('title-slide')
        && !classes.includes('closing');
    })
    .map(([, , body]) => body
      .replace(/<div\b[^>]*class="[^"]*\b(page-num|num|deck-author)\b[^"]*"[^>]*>[\s\S]*?<\/div>/gi, ' ')
      .replace(/<div\b[^>]*data-source-footer="true"[^>]*>[\s\S]*?<\/div>/gi, ' ')
      .replace(/<div\b[^>]*data-cross-reference-footer="true"[^>]*>[\s\S]*?<\/div>/gi, ' ')
      .replace(/<a\b[^>]*data-source-origin="auto"[^>]*>[\s\S]*?<\/a>/gi, ' ')
      .replace(/<[^>]+>/g, ' '))
    .map(decode)
    // Navigation arrows are presentation chrome, not educational content.
    .map(text => text.replace(/[→↗]/g, ' ').replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .join('\n---\n');
};

for (const file of files) {
  let date = '';
  const workingContent = contentFingerprint(fs.readFileSync(file, 'utf8'));
  const headContent = contentFingerprint(git(['show', `HEAD:${file}`]));

  // Dirty layout, CSS, title or closing changes are ignored. Only a changed
  // internal-slide fingerprint receives today's date before commit.
  if (workingContent !== headContent) {
    date = today;
  } else {
    const history = git(['log', '--format=%H|%cs', '--', file]).trim().split('\n').filter(Boolean);
    for (const entry of history) {
      const [commit, commitDate] = entry.split('|');
      const current = contentFingerprint(git(['show', `${commit}:${file}`]));
      if (!current) continue;
      const previous = contentFingerprint(git(['show', `${commit}^:${file}`]));
      if (current !== previous) {
        date = commitDate;
        break;
      }
    }
  }
  dates[file] = date || today;
}

fs.writeFileSync(
  'last-modified-index.js',
  `/* Proprietà intellettuale di Francesco Antonio Binetti */\nwindow.LAST_MODIFIED_INDEX = ${JSON.stringify(dates, null, 2)};\n`
);
console.log(`Wrote last-modified-index.js with ${files.length} entries.`);
