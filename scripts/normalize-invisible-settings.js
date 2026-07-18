/* Proprietà intellettuale di Francesco Antonio Binetti */
// Normalizes non-visible deck setup that had drifted from the Warm Study
// Zine tokens documented in CLAUDE.md: DOCTYPE casing, single-line <head>
// blocks, and local :root token blocks (missing/renamed/off-palette vars).
// Per-area color differentiation (body.course-XX --accent/--accent-2 in
// theme-corsi.css) is untouched — these tokens are the shared base palette,
// not the per-area one.
const fs = require('fs');

const files = fs.readdirSync('.')
  .filter(name => /^[a-z]{2}\d{2}.*\.html$/.test(name))
  .sort();

const CANONICAL_ROOT = '--paper:#f4ece0;--paper-2:#ece0cf;--ink:#1c1714;--ink-soft:#3a322c;' +
  '--ink-faint:#6b5f54;--red:#e6533b;--teal:#163b35;--teal-2:#1f5249;--gold:#e6c14a;' +
  '--gold-deep:#d98a2b;--sky:#3f7e8c;--line:#d8c9b4;--font-display:"Fraunces",Georgia,serif;' +
  '--font-body:"Space Grotesk",sans-serif;--font-mono:"Space Mono",monospace;--stage-bg:#241d17;' +
  '--slide-bg:var(--paper);--ease:cubic-bezier(.2,.8,.2,1);--dur:.6s;';

const RENAMES = [
  [/var\(--display\)/g, 'var(--font-display)'],
  [/var\(--body\)/g, 'var(--font-body)'],
  [/var\(--mono\)/g, 'var(--font-mono)'],
  [/var\(--muted\)/g, 'var(--ink-soft)'],
];

let doctypeFixed = 0, headReformatted = 0, rootReplaced = 0, usagesRenamed = 0;
const touched = [];

for (const file of files) {
  const original = fs.readFileSync(file, 'utf8');
  let html = original;

  html = html.replace(/<!doctype html>/i, match => {
    if (match !== '<!DOCTYPE html>') doctypeFixed++;
    return '<!DOCTYPE html>';
  });

  const styleIdx = html.indexOf('<style>');
  if (styleIdx !== -1) {
    const head = html.slice(0, styleIdx);
    const reformattedHead = head.replace(/></g, '>\n<');
    if (reformattedHead !== head) {
      html = reformattedHead + html.slice(styleIdx);
      headReformatted++;
    }
  }

  const rootMatch = html.match(/:root\s*\{([^}]*)\}/);
  if (rootMatch) {
    const normalizedExisting = rootMatch[1].replace(/\n\s*/g, '').replace(/;$/, '');
    const normalizedCanonical = CANONICAL_ROOT.replace(/;$/, '');
    if (normalizedExisting !== normalizedCanonical) {
      html = html.slice(0, rootMatch.index) +
        `:root{${CANONICAL_ROOT}}` +
        html.slice(rootMatch.index + rootMatch[0].length);
      rootReplaced++;
    }
  }

  for (const [pattern, replacement] of RENAMES) {
    const count = (html.match(pattern) || []).length;
    if (count) {
      html = html.replace(pattern, replacement);
      usagesRenamed += count;
    }
  }

  if (html !== original) {
    fs.writeFileSync(file, html);
    touched.push(file);
  }
}

console.log(`DOCTYPE fixato: ${doctypeFixed}`);
console.log(`<head> riformattata: ${headReformatted}`);
console.log(`:root sostituito col blocco canonico: ${rootReplaced}`);
console.log(`Riferimenti var() rinominati: ${usagesRenamed}`);
console.log(`\nFile toccati (${touched.length}):`);
touched.forEach(f => console.log(`  ${f}`));
