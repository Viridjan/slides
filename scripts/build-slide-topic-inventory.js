/* Proprietà intellettuale di Francesco Antonio Binetti */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const indexPath = path.join(root, '00-indice.html');
const outputPath = path.join(root, 'inventario-argomenti-slide.csv');

const decodeEntities = value => value
  .replace(/&nbsp;|&#160;/gi, ' ')
  .replace(/&amp;/gi, '&')
  .replace(/&lt;/gi, '<')
  .replace(/&gt;/gi, '>')
  .replace(/&quot;/gi, '"')
  .replace(/&#39;|&apos;/gi, "'")
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
  .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));

const cleanText = value => decodeEntities(value)
  .replace(/<br\s*\/?>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const normalize = value => value
  .toLocaleLowerCase('it')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[“”«»„]/g, '"')
  .replace(/[’‘]/g, "'")
  .replace(/[^a-z0-9+#./' -]+/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const csv = value => `"${String(value ?? '').replace(/"/g, '""')}"`;

const indexHtml = fs.readFileSync(indexPath, 'utf8');
const decks = [];
const cardPattern = /<a\s+class="module-card[^"]*"\s+href="([^"]+\.html)"[^>]*>([\s\S]*?)<\/a>/gi;
let cardMatch;

while ((cardMatch = cardPattern.exec(indexHtml))) {
  const before = indexHtml.slice(0, cardMatch.index);
  const sectionMatches = [...before.matchAll(/<div\s+class="section-label"[^>]*>([\s\S]*?)<\/div>/gi)];
  const block = cardMatch[2];
  const pick = className => cleanText(block.match(
    new RegExp(`<[^>]+class="[^"]*\\b${className}\\b[^"]*"[^>]*>([\\s\\S]*?)<\\/[^>]+>`, 'i')
  )?.[1] || '');
  decks.push({
    file: cardMatch[1],
    area: cleanText(sectionMatches.at(-1)?.[1] || ''),
    code: pick('card-num'),
    title: pick('card-title')
  });
}

const semanticClasses = new Map([
  ['lbl', 'etichetta'],
  ['big', 'principio'],
  ['eyebrow', 'sovratitolo'],
  ['tag', 'etichetta'],
  ['chip', 'badge'],
  ['pill', 'badge'],
  ['topic', 'argomento'],
  ['illu-cap', 'didascalia'],
  ['ep-label', 'etichetta'],
  ['kbd-label', 'etichetta']
]);

const extractMarkers = slideHtml => {
  const markers = [];
  const stack = [];
  const ignored = [];
  const tokenPattern = /<!--[\s\S]*?-->|<\/?[a-zA-Z][^>]*>|[^<]+/g;
  let token;

  while ((token = tokenPattern.exec(slideHtml))) {
    const raw = token[0];
    if (raw.startsWith('<!--')) continue;
    if (!raw.startsWith('<')) {
      if (!ignored.length) stack.forEach(item => item.parts.push(raw));
      continue;
    }

    const closing = raw.match(/^<\/\s*([\w:-]+)/);
    if (closing) {
      const tag = closing[1].toLowerCase();
      if (ignored.at(-1) === tag) ignored.pop();
      for (let i = stack.length - 1; i >= 0; i--) {
        if (stack[i].tag !== tag) continue;
        const [item] = stack.splice(i, 1);
        const text = cleanText(item.parts.join(' '));
        if (text) item.types.forEach(type => markers.push({type, text}));
        break;
      }
      continue;
    }

    const opening = raw.match(/^<\s*([\w:-]+)/);
    if (!opening) continue;
    const tag = opening[1].toLowerCase();
    if (['script', 'style', 'svg', 'nav'].includes(tag)) ignored.push(tag);
    if (ignored.length) continue;

    const types = [];
    if (/^h[1-6]$/.test(tag)) types.push(`titolo_${tag}`);
    if (tag === 'strong' || tag === 'b') types.push('grassetto');
    if (tag === 'th') types.push('intestazione_tabella');
    if (tag === 'dt') types.push('termine');

    const classNames = raw.match(/\bclass\s*=\s*["']([^"']*)["']/i)?.[1].split(/\s+/) || [];
    classNames.forEach(className => {
      const type = semanticClasses.get(className);
      if (type && !types.includes(type)) types.push(type);
    });

    if (types.length) stack.push({tag, types, parts: []});
  }
  return markers;
};

const rows = [];
decks.forEach(deck => {
  const deckPath = path.join(root, deck.file);
  if (!fs.existsSync(deckPath)) return;
  const html = fs.readFileSync(deckPath, 'utf8');
  const slidePattern = /<section\b([^>]*)\bclass\s*=\s*["'][^"']*\bslide\b[^"']*["'][^>]*>([\s\S]*?)<\/section>/gi;
  let slideMatch;
  let slideNumber = 0;
  while ((slideMatch = slidePattern.exec(html))) {
    slideNumber++;
    const markers = extractMarkers(slideMatch[2]);
    const slideTitle = markers.find(marker => marker.type.startsWith('titolo_h'))?.text || '';
    const seen = new Set();
    markers.forEach(marker => {
      const normalized = normalize(marker.text);
      if (!normalized || normalized.length < 2 || /^\d+$/.test(normalized)) return;
      const localKey = `${marker.type}\u0000${normalized}`;
      if (seen.has(localKey)) return;
      seen.add(localKey);
      rows.push({...deck, slideNumber, slideTitle, type: marker.type, text: marker.text, normalized});
    });
  }
});

const placements = new Map();
rows.forEach(row => {
  if (!placements.has(row.normalized)) placements.set(row.normalized, new Set());
  placements.get(row.normalized).add(`${row.file}#slide-${row.slideNumber}`);
});

const structuralLabels = new Set([
  'regola', 'regola:', 'analogia', 'analogia:', 'in pratica', 'in pratica:',
  'attenzione', 'attenzione:', 'nota', 'nota:', 'esempio', 'esempio:',
  'esercizio', 'esercizio:', 'verifica', 'verifica:', 'cosa vedremo',
  'in questo modulo', 'fine', 'prossimo', 'torna all indice', "torna all'indice",
  'errore da evitare', 'errore comune', 'caso concreto', 'come funziona',
  'consiglio', 'esempi', 'lettura', 'prima', 'dopo', 'lo sapevi',
  'regola pratica', "regola d'oro", 'verifica rapida'
].map(normalize));

rows.forEach(row => {
  row.duplicateCount = placements.get(row.normalized).size;
  row.nature = structuralLabels.has(row.normalized) ? 'strutturale' : 'contenuto';
});
rows.sort((a, b) =>
  a.nature.localeCompare(b.nature, 'it') ||
  b.duplicateCount - a.duplicateCount ||
  a.normalized.localeCompare(b.normalized, 'it') ||
  a.code.localeCompare(b.code, 'it', {numeric: true}) ||
  a.slideNumber - b.slideNumber ||
  a.type.localeCompare(b.type, 'it')
);

const header = [
  'argomento_normalizzato', 'testo_originale', 'tipo_indicatore', 'natura', 'occorrenze_in_slide_distinte',
  'area', 'codice_blocco', 'titolo_blocco', 'file', 'numero_slide', 'titolo_slide', 'riferimento'
];
const lines = [header.map(csv).join(',')];
rows.forEach(row => lines.push([
  row.normalized, row.text, row.type, row.nature, row.duplicateCount, row.area, row.code, row.title,
  row.file, row.slideNumber, row.slideTitle, `${row.file}#slide-${row.slideNumber}`
].map(csv).join(',')));

fs.writeFileSync(outputPath, `\uFEFF${lines.join('\n')}\n`);
console.log(`Wrote ${path.relative(root, outputPath)} with ${rows.length} topic markers from ${decks.length} index blocks.`);
console.log(`${[...placements.values()].filter(items => items.size > 1).length} normalized topics occur in more than one slide.`);
