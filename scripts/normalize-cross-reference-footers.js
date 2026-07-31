/* Proprietà intellettuale di Francesco Antonio Binetti */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const decksDir = path.join(root, 'decks');
const files = fs.readdirSync(decksDir)
  .filter(file => /^[a-z]{2}\d{2}.*\.html$/i.test(file))
  .sort();

const decode = value => value
  .replace(/&nbsp;|&#160;/gi, ' ')
  .replace(/&amp;/gi, '&')
  .replace(/&lt;/gi, '<')
  .replace(/&gt;/gi, '>')
  .replace(/&quot;/gi, '"')
  .replace(/&#39;|&apos;/gi, "'")
  .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
  .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)));

const cleanText = value => decode(value)
  .replace(/<br\s*\/?>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()
  .replace(/\s*[→↗]\s*$/u, '');

const escapeHtml = value => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');
const escapeRegExp = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const internalTarget = attrs => attrs.match(/\bhref\s*=\s*["']([a-z]{2}\d{2}[^"']*\.html#slide-\d+)["']/i)?.[1] || '';
const footerPattern = /<div\b[^>]*data-cross-reference-footer=["']true["'][^>]*>[\s\S]*?<\/div>/gi;

let deckCount = 0;
let slideCount = 0;
let linkCount = 0;

for (const file of files) {
  const htmlPath = path.join(decksDir, file);
  const original = fs.readFileSync(htmlPath, 'utf8');
  const originalSlideCount = (original.match(/<section\b[^>]*class=["'][^"']*\bslide\b/gi) || []).length;
  const referencesBySlide = new Map();
  let slideNumber = 0;

  const updated = original.replace(/<section\b[^>]*class=["'][^"']*\bslide\b[^"']*["'][^>]*>[\s\S]*?<\/section>/gi, section => {
    slideNumber += 1;
    const references = new Map();

    for (const footer of section.match(footerPattern) || []) {
      for (const anchor of footer.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
        const target = internalTarget(anchor[1]);
        if (target && !references.has(target)) references.set(target, cleanText(anchor[2]));
      }
    }

    let body = section.replace(footerPattern, '');
    body = body.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (anchor, attrs, content) => {
      const target = internalTarget(attrs);
      if (!target) return anchor;
      if (!references.has(target)) references.set(target, cleanText(content));

      if (/\bclass\s*=\s*["'][^"']*\bchip\b/i.test(attrs)) {
        const cleanAttrs = attrs
          .replace(/\s*href\s*=\s*["'][^"']*["']/i, '')
          .replace(/\s*(?:target|rel)\s*=\s*["'][^"']*["']/gi, '');
        return `<span${cleanAttrs}>${content}</span>`;
      }
      return content;
    });

    // Once the click target lives in the footer, a trailing arrow beside the
    // old inline label falsely suggests that the body text is still clickable.
    references.forEach(label => {
      if (!label) return;
      body = body.replace(new RegExp(`${escapeRegExp(label)}\\s*[→↗]`, 'gu'), label);
    });

    if (!references.size) return body;
    const links = [...references].map(([target, label]) =>
      `<a href="${target}">${escapeHtml(label || target)} ↗</a>`
    ).join('');
    const footer = `<div class="cross-reference-footer" data-cross-reference-footer="true">${links}</div>`;
    referencesBySlide.set(slideNumber, [...references]);
    slideCount += 1;
    linkCount += references.size;
    return body.replace(/<\/section>$/i, `${footer}</section>`);
  });

  const updatedSlideCount = (updated.match(/<section\b[^>]*class=["'][^"']*\bslide\b/gi) || []).length;
  const structurallySafe = updatedSlideCount === originalSlideCount
    && updated.includes('<!DOCTYPE html>')
    && updated.includes('Proprietà intellettuale di Francesco Antonio Binetti')
    && updated.includes('</html>')
    && updated.length >= original.length * 0.9;
  if (!structurallySafe) {
    throw new Error(`${file}: normalization aborted because the HTML structure changed unexpectedly`);
  }

  if (updated !== original) {
    fs.writeFileSync(htmlPath, updated);
    deckCount += 1;
  }
}

console.log(`Normalized ${linkCount} internal references on ${slideCount} slides across ${deckCount} decks.`);
