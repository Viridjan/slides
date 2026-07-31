/* Proprietà intellettuale di Francesco Antonio Binetti */
// Applies the "MODIFICHE DIRETTE" block from a deck.js feedback-mode Copia
// payload straight to the HTML files. See CLAUDE.md "Feedback mode".
const fs = require('fs');
const path = require('path');

const payloadPath = process.argv[2];
if (!payloadPath) {
  console.error('Uso: node scripts/apply-feedback-diff.js payload.txt');
  process.exit(1);
}

const decode = value => value
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&#39;|&apos;/g, "'");

const escape = value => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

const payload = fs.readFileSync(payloadPath, 'utf8');
const editsBlock = payload.split('=== MODIFICHE DIRETTE ===')[1] || '';

const editPattern = /([^\s#][^#]*)#slide-(\d+)\s+«([^»]*)»\s*\n-\s*prima:\s*(".*?")\s*\n\+\s*dopo:\s*(".*?")/g;
const edits = [...editsBlock.matchAll(editPattern)].map(m => ({
  file: m[1].trim(),
  slide: Number(m[2]),
  near: m[3],
  before: JSON.parse(m[4]),
  after: JSON.parse(m[5]),
}));

if (!edits.length) {
  console.log('Nessuna modifica trovata nel payload (sezione "=== MODIFICHE DIRETTE ===" assente o vuota).');
  process.exit(0);
}

const byFile = new Map();
for (const edit of edits) {
  if (!byFile.has(edit.file)) byFile.set(edit.file, []);
  byFile.get(edit.file).push(edit);
}

const slidePattern = /<section\b[^>]*class="[^"]*\bslide\b[^"]*"[^>]*>[\s\S]*?<\/section>/gi;
const touchedFiles = new Set();
let applied = 0;
let skipped = 0;

for (const [file, fileEdits] of byFile) {
  // deck.js records the bare filename in a feedback payload; decks now live
  // under decks/, so fall back there when the bare name isn't at repo root.
  const resolvedFile = fs.existsSync(file) ? file : path.join('decks', file);
  if (!fs.existsSync(resolvedFile)) {
    for (const edit of fileEdits) {
      console.log(`SALTATO ${file}#slide-${edit.slide} «${edit.near}»: file non trovato`);
      skipped++;
    }
    continue;
  }

  let html = fs.readFileSync(resolvedFile, 'utf8');
  const slides = html.match(slidePattern) || [];
  let changed = false;

  for (const edit of fileEdits) {
    const section = slides[edit.slide - 1];
    if (!section) {
      console.log(`SALTATO ${file}#slide-${edit.slide} «${edit.near}»: slide non trovata`);
      skipped++;
      continue;
    }

    const dot = edit.near.indexOf('.');
    const tag = dot === -1 ? edit.near : edit.near.slice(0, dot);
    const wantClass = dot === -1 ? null : edit.near.slice(dot + 1);

    const elPattern = new RegExp(`<${tag}\\b([^>]*)>([^<]*)<\\/${tag}>`, 'gi');
    const candidates = [...section.matchAll(elPattern)].filter(m => {
      const classMatch = /class="([^"]*)"/.exec(m[1]);
      const firstClass = classMatch ? classMatch[1].split(/\s+/)[0] : null;
      return wantClass ? firstClass === wantClass : !firstClass;
    }).filter(m => decode(m[2]).trim() === edit.before.trim());

    if (candidates.length !== 1) {
      console.log(`SALTATO ${file}#slide-${edit.slide} «${edit.near}»: ${candidates.length === 0 ? 'nessuna corrispondenza' : 'corrispondenza ambigua'}`);
      skipped++;
      continue;
    }

    const [whole, attrs, inner] = candidates[0];
    const lead = inner.match(/^\s*/)[0];
    const trail = inner.match(/\s*$/)[0];
    const replacement = `<${tag}${attrs}>${lead}${escape(edit.after)}${trail}</${tag}>`;
    section_replace: {
      const sectionIdx = html.indexOf(section);
      const wholeIdx = section.indexOf(whole);
      if (sectionIdx === -1 || wholeIdx === -1) {
        console.log(`SALTATO ${file}#slide-${edit.slide} «${edit.near}»: impossibile localizzare il testo nel file`);
        skipped++;
        break section_replace;
      }
      const absIdx = sectionIdx + wholeIdx;
      html = html.slice(0, absIdx) + replacement + html.slice(absIdx + whole.length);
      slides[edit.slide - 1] = section.slice(0, wholeIdx) + replacement + section.slice(wholeIdx + whole.length);
      changed = true;
      applied++;
      console.log(`APPLICATO ${file}#slide-${edit.slide} «${edit.near}»`);
    }
  }

  if (changed) {
    fs.writeFileSync(resolvedFile, html);
    touchedFiles.add(file);
  }
}

console.log(`\n${applied} modifiche applicate, ${skipped} saltate.`);
if (touchedFiles.size) {
  console.log('\nFile modificati:');
  for (const file of touchedFiles) console.log(`  ${file}`);
  console.log('\nRicorda di rigenerare, se pertinente:');
  console.log('  node scripts/add-official-source-links.js');
  console.log('  node scripts/build-completeness.js');
  console.log('  node scripts/build-search-index.js');
  console.log('  node scripts/build-slide-topic-inventory.js');
  console.log('\nE controlla ogni deck toccato con xdg-open prima di committare.');
}
