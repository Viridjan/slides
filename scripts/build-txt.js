/* Proprietà intellettuale di Francesco Antonio Binetti */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const requested = process.argv.slice(2);
if (!requested.length) {
  throw new Error('Pass one or more new HTML deck filenames; bulk rebuilding can discard TXT-only teaching notes.');
}
const files = requested;

const strip = html => {
  html = html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '');
  html = html.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (full, attrs, text) => {
    const href = attrs.match(/href="([^"]+)"/i)?.[1];
    const source = attrs.match(/title="Fonte ufficiale:\s*([^"]+)"/i)?.[1];
    if (href && source) return ` [Fonte: ${source} — ${href}]`;
    if (href?.startsWith('http')) return `${text} (${href})`;
    return text;
  });
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .trim();
};

let written = 0;
for (const name of files) {
  const htmlPath = path.resolve(root, name);
  if (!fs.existsSync(htmlPath)) throw new Error(`Missing HTML file: ${name}`);
  const content = fs.readFileSync(htmlPath, 'utf8');
  const slides = [...content.matchAll(/<section[^>]*class="slide[^"]*"[^>]*>([\s\S]*?)<\/section>/gi)].map(match => match[1]);
  const title = content.match(/<title>([^<]+)<\/title>/i)?.[1] || path.basename(name, '.html');
  const lines = [title, '='.repeat(Math.max(title.length, 40)), ''];
  slides.forEach((slide, index) => {
    const text = strip(slide);
    if (text.length > 2) lines.push(`--- Slide ${index + 1} ---`, text, '');
  });
  fs.writeFileSync(htmlPath.replace(/\.html$/, '.txt'), lines.join('\n').replace(/[ \t]+$/gm, ''));
  written++;
}

console.log(`Wrote ${written} TXT companion files.`);
