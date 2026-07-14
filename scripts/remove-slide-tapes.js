/* Proprietà intellettuale di Francesco Antonio Binetti */
const fs = require('fs');

const files = fs.readdirSync('.')
  .filter(name => /^[a-z]{2}\d{2}.*\.html$/.test(name))
  .sort();

const tapePattern = /<(div|span)\b[^>]*class="[^"]*\btape\b[^"]*"[^>]*>([\s\S]*?)<\/\1>/gi;
const escapeRe = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const decode = value => value
  .replace(/<[^>]+>/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&#39;|&apos;/g, "'")
  .replace(/\s+/g, ' ')
  .trim();

let decksChanged = 0;
let barsRemoved = 0;

for (const file of files) {
  const original = fs.readFileSync(file, 'utf8');
  const labelsBySlide = [];
  const updated = original.replace(/<section\b[\s\S]*?<\/section>/gi, section => {
    const labels = [...section.matchAll(tapePattern)].map(match => decode(match[2])).filter(Boolean);
    labelsBySlide.push(labels);
    if (!labels.length) return section;
    barsRemoved += labels.length;
    return section.replace(tapePattern, '').replace(/^[ \t]+$/gm, '');
  });

  if (updated === original) continue;
  fs.writeFileSync(file, updated);
  decksChanged++;

  const txtFile = file.replace(/\.html$/, '.txt');
  if (!fs.existsSync(txtFile)) continue;
  const txt = fs.readFileSync(txtFile, 'utf8');
  const updatedTxt = txt.replace(
    /--- Slide (\d+) ---\n([\s\S]*?)(?=\n--- Slide \d+ ---|\s*$)/g,
    (block, number, body) => {
      for (const label of labelsBySlide[Number(number) - 1] || []) {
        const flexibleLabel = label.split(/\s+/).map(escapeRe).join('\\s+');
        const standalone = new RegExp(`^[ \\t]*${flexibleLabel}[ \\t]*\\n`, 'm');
        body = standalone.test(body)
          ? body.replace(standalone, '')
          : body.replace(new RegExp(flexibleLabel), '');
      }
      return `--- Slide ${number} ---\n${body}`;
    }
  );
  fs.writeFileSync(txtFile, updatedTxt.replace(/[ \t]+$/gm, ''));
}

console.log(`Removed ${barsRemoved} tape bars from ${decksChanged} decks.`);
