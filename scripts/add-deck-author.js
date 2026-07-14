/* Proprietà intellettuale di Francesco Antonio Binetti */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const author = '<div class="deck-author">Francesco Antonio Binetti</div>';
const files = fs.readdirSync(root)
  .filter((name) => name.endsWith('.html'))
  .filter((name) => /<section\b[^>]*class="[^"]*\bslide\b/.test(fs.readFileSync(path.join(root, name), 'utf8')));

for (const name of files) {
  const file = path.join(root, name);
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(/<div class="deck-author">[^<]*<\/div>/g, '');

  const slides = [...html.matchAll(/<section\b[^>]*class="[^"]*\bslide\b[^>]*>[\s\S]*?<\/section>/g)];
  if (!slides.length) continue;

  const targets = slides.length === 1 ? [slides[0]] : [slides[0], slides[slides.length - 1]];
  for (const match of targets.reverse()) {
    const insertion = match.index + match[0].lastIndexOf('</section>');
    html = html.slice(0, insertion) + author + html.slice(insertion);
  }
  fs.writeFileSync(file, html);
}

console.log(`Firma aggiunta a copertina e chiusura di ${files.length} blocchi.`);
