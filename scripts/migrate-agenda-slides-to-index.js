/* Proprietà intellettuale di Francesco Antonio Binetti */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const indexPath = path.join(root, '00-indice.html');
const indexHtml = fs.readFileSync(indexPath, 'utf8');
const files = [...indexHtml.matchAll(/<a\s+class="module-card[^"]*"\s+href="([^"]+\.html)"/gi)]
  .map(match => match[1])
  .filter(file => !file.startsWith('quiz-'));

const decode = value => value
  .replace(/&amp;/gi, '&').replace(/&lt;/gi, '<').replace(/&gt;/gi, '>')
  .replace(/&quot;/gi, '"').replace(/&#39;|&apos;/gi, "'")
  .replace(/&nbsp;|&#160;/gi, ' ');
const clean = value => decode(value.replace(/<br\s*\/?>/gi, ' · ').replace(/<[^>]+>/g, ' '))
  .replace(/\s+/g, ' ').trim();

const parseSlides = html => {
  const slides = [];
  const pattern = /<section\b([^>]*)>([\s\S]*?)<\/section>/gi;
  let match;
  while ((match = pattern.exec(html))) {
    const classes = match[1].match(/\bclass\s*=\s*["']([^"']*)["']/i)?.[1].split(/\s+/) || [];
    if (!classes.includes('slide')) continue;
    slides.push({start: match.index, end: pattern.lastIndex, full: match[0], attrs: match[1], body: match[2]});
  }
  return slides;
};

const agendaData = {};
const deckSet = new Set(files);
files.forEach(file => {
  const filePath = path.join(root, file);
  const html = fs.readFileSync(filePath, 'utf8');
  const slides = parseSlides(html);
  if (slides.length < 3) throw new Error(`${file}: meno di tre slide.`);
  const agenda = slides[1];
  const title = clean(agenda.body.match(/<h[1-3]\b[^>]*>([\s\S]*?)<\/h[1-3]>/i)?.[1] || 'Cosa vedremo');
  const items = [...agenda.body.matchAll(/<div\b[^>]*class=["'][^"']*\bagenda-item\b[^"']*["'][^>]*>([\s\S]*?)<\/div>\s*<\/div>/gi)]
    .map(match => clean(match[1])).filter(Boolean);
  if (!items.length || !/cosa vedremo|agenda|programma|percorso/i.test(title)) {
    throw new Error(`${file}: slide 2 non riconosciuta come agenda (${title}).`);
  }
  agendaData[file] = {title, items};
  fs.writeFileSync(filePath, html.slice(0, agenda.start) + html.slice(agenda.end));

  const txtPath = path.join(root, file.replace(/\.html$/i, '.txt'));
  if (fs.existsSync(txtPath)) {
    let txt = fs.readFileSync(txtPath, 'utf8');
    txt = txt.replace(/\n--- Slide 2 ---\n[\s\S]*?(?=\n--- Slide 3 ---\n)/, '');
    txt = txt.replace(/--- Slide (\d+) ---/g, (full, number) => {
      const n = Number(number);
      return `--- Slide ${n >= 3 ? n - 1 : n} ---`;
    });
    fs.writeFileSync(txtPath, txt);
  }
});

fs.writeFileSync(path.join(root, 'agenda-index.json'), `${JSON.stringify(agendaData, null, 2)}\n`);

const escapedDecks = [...deckSet].map(file => file.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
const externalPattern = new RegExp(`((?:${escapedDecks}))#slide-(\\d+)`, 'g');
const editable = fs.readdirSync(root).filter(file => /\.(?:html|txt|md|js)$/i.test(file));
editable.forEach(file => {
  if (file === 'agenda-index.js') return;
  const filePath = path.join(root, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let updated = content.replace(externalPattern, (full, deck, number) => {
    const n = Number(number);
    return `${deck}#slide-${n >= 2 ? n - 1 : n}`;
  });
  if (deckSet.has(file)) {
    updated = updated.replace(/#slide-(\d+)/g, (full, number, offset, source) => {
      const prefix = source.slice(Math.max(0, offset - 80), offset);
      if (/\.html[^"']*$/.test(prefix)) return full;
      const n = Number(number);
      return `#slide-${n >= 2 ? n - 1 : n}`;
    });
  }
  if (updated !== content) fs.writeFileSync(filePath, updated);
});

console.log(`Migrated ${files.length} agenda slides to agenda-index.json.`);
