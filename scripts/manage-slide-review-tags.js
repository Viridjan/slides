/* Proprietà intellettuale di Francesco Antonio Binetti */
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const root = path.join(path.resolve(__dirname, '..'), 'decks');
const mode = process.argv[2] || 'check';
const requested = process.argv.slice(3);

const decode = value => value
  .replace(/&nbsp;|&#160;/gi, ' ')
  .replace(/&amp;/gi, '&')
  .replace(/&lt;/gi, '<')
  .replace(/&gt;/gi, '>')
  .replace(/&quot;/gi, '"')
  .replace(/&#39;|&apos;/gi, "'")
  .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
  .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)));

const canonicalContent = body => {
  const cleaned = body
    .replace(/<!--([\s\S]*?)-->/g, ' ')
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<div\b[^>]*class="[^"]*\b(page-num|num|deck-author)\b[^"]*"[^>]*>[\s\S]*?<\/div>/gi, ' ')
    .replace(/<div\b[^>]*data-source-footer="true"[^>]*>[\s\S]*?<\/div>/gi, ' ')
    .replace(/<div\b[^>]*data-source-list="true"[^>]*>[\s\S]*?<\/div>/gi, ' ')
    .replace(/<div\b[^>]*data-cross-reference-footer="true"[^>]*>[\s\S]*?<\/div>/gi, ' ')
    .replace(/<a\b[^>]*data-source-origin="auto"[^>]*>[\s\S]*?<\/a>/gi, ' ');
  const targets = [...cleaned.matchAll(/\b(?:href|src|alt)\s*=\s*["']([^"']+)["']/gi)]
    .map(match => decode(match[1]).trim())
    .filter(Boolean);
  const text = decode(cleaned.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
  return [text, ...targets].join('\n');
};

const digest = body => crypto.createHash('sha256').update(canonicalContent(body)).digest('hex').slice(0, 16);

const parseSlides = html => {
  const slides = [];
  const pattern = /<section\b([^>]*)>([\s\S]*?)<\/section>/gi;
  let match;
  while ((match = pattern.exec(html))) {
    const classes = match[1].match(/\bclass\s*=\s*["']([^"']*)["']/i)?.[1].split(/\s+/) || [];
    if (!classes.includes('slide')) continue;
    slides.push({
      number: slides.length + 1,
      start: match.index,
      end: pattern.lastIndex,
      opening: match[0].slice(0, match[0].indexOf('>') + 1),
      full: match[0],
      body: match[2],
      storedHash: match[1].match(/\bdata-content-review-hash=["']([^"']+)["']/i)?.[1] || '',
      date: match[1].match(/\bdata-content-review-date=["']([^"']+)["']/i)?.[1] || ''
    });
  }
  return slides;
};

const htmlFiles = fs.readdirSync(root)
  .filter(file => /^[a-z]{2}\d{2}.*\.html$/i.test(file))
  .sort();

const results = [];
const inspectFile = file => {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  parseSlides(html).forEach(slide => {
    if (!slide.storedHash) return;
    const currentHash = digest(slide.body);
    results.push({
      file,
      slide: slide.number,
      date: slide.date,
      storedHash: slide.storedHash,
      currentHash,
      valid: slide.storedHash === currentHash
    });
  });
};

const tagReference = reference => {
  const match = reference.match(/^(.+\.html)#slide-(\d+)$/i);
  if (!match) throw new Error(`Riferimento non valido: ${reference}`);
  const [, file, numberText] = match;
  const filePath = path.join(root, file);
  if (!fs.existsSync(filePath)) throw new Error(`File non trovato: ${file}`);
  const html = fs.readFileSync(filePath, 'utf8');
  const slides = parseSlides(html);
  const slide = slides[Number(numberText) - 1];
  if (!slide) throw new Error(`Slide non trovata: ${reference}`);
  if (slide.number === 1 || slide.number === slides.length) {
    throw new Error(`Le slide di apertura e chiusura non possono essere marcate: ${reference}`);
  }
  const hash = digest(slide.body);
  const date = new Date().toISOString().slice(0, 10);
  const opening = slide.opening
    .replace(/\s+data-content-review-hash=["'][^"']*["']/gi, '')
    .replace(/\s+data-content-review-date=["'][^"']*["']/gi, '')
    .replace(/>$/, ` data-content-review-hash="${hash}" data-content-review-date="${date}">`);
  const updatedSlide = opening + slide.full.slice(slide.opening.length);
  fs.writeFileSync(filePath, html.slice(0, slide.start) + updatedSlide + html.slice(slide.end));
  console.log(`VALIDATA ${reference} ${hash}`);
};

const pruneBoundaryTags = file => {
  const filePath = path.join(root, file);
  const html = fs.readFileSync(filePath, 'utf8');
  const slides = parseSlides(html);
  const boundaries = [slides[0], slides.at(-1)].filter(Boolean);
  let updated = html;
  let removed = 0;
  boundaries.sort((a, b) => b.start - a.start).forEach(slide => {
    const opening = slide.opening
      .replace(/\s+data-content-review-hash=["'][^"']*["']/gi, '')
      .replace(/\s+data-content-review-date=["'][^"']*["']/gi, '');
    if (opening === slide.opening) return;
    updated = updated.slice(0, slide.start) + opening + updated.slice(slide.start + slide.opening.length);
    removed += 1;
  });
  if (removed) fs.writeFileSync(filePath, updated);
  return removed;
};

if (mode === 'tag') {
  if (!requested.length) throw new Error('Indicare almeno un riferimento file.html#slide-N.');
  requested.forEach(tagReference);
} else if (mode === 'prune-boundaries') {
  const removed = htmlFiles.reduce((total, file) => total + pruneBoundaryTags(file), 0);
  console.log(`${removed} tag rimossi da slide di apertura o chiusura.`);
} else if (mode === 'check' || mode === 'report') {
  htmlFiles.forEach(inspectFile);
  results.forEach(item => console.log(
    `${item.valid ? 'VALIDA' : 'SCADUTA'} ${item.file}#slide-${item.slide} ${item.date || 'senza-data'}`
  ));
  const stale = results.filter(item => !item.valid);
  console.log(`${results.length} slide marcate: ${results.length - stale.length} valide, ${stale.length} scadute.`);
  if (mode === 'check' && stale.length) process.exitCode = 1;
} else {
  throw new Error(`Modalità sconosciuta: ${mode}`);
}
