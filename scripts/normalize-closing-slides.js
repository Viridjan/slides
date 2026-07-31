/* Proprietà intellettuale di Francesco Antonio Binetti */
const fs = require('fs');
const path = require('path');

const decksDir = path.join(__dirname, '..', 'decks');
const files = fs.readdirSync(decksDir)
  .filter(name => /^[a-z]{2}\d{2}.*\.html$/.test(name))
  .map(name => path.join(decksDir, name))
  .sort();

const cleanText = value => value
  .replace(/<[^>]+>/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&#39;|&apos;/g, "'")
  .replace(/\s+/g, ' ')
  .trim();
const escapeRe = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

let decksChanged = 0;
let indexActionsAdded = 0;
let redundantIndexLinksRemoved = 0;
let pageNumbersAdded = 0;
let legacyTabsRemoved = 0;

for (const file of files) {
  const original = fs.readFileSync(file, 'utf8');
  const slides = [...original.matchAll(/<section\b[\s\S]*?<\/section>/gi)];
  if (!slides.length) continue;

  const homeTag = [...original.matchAll(/<a\b[^>]*class="[^"]*\bhome-btn\b[^"]*"[^>]*>/gi)][0]?.[0] || '';
  const homeHref = homeTag.match(/href="([^"]+)"/i)?.[1] || '00-indice.html';
  const pageNumCount = (original.match(/<div\b[^>]*class="[^"]*\bpage-num\b/gi) || []).length;
  const numCount = (original.match(/<div\b[^>]*class="[^"]*\bnum\b/gi) || []).length;
  const defaultMarker = numCount > pageNumCount ? 'num' : 'page-num';
  const removedTxtLabels = [];
  let addedTerminalAction = false;

  const updated = original.replace(/<section\b[\s\S]*?<\/section>/gi, section => {
    if (!/class="[^"]*\bclosing\b/i.test(section)) return section;

    const opening = section.match(/^<section\b[^>]*>/i)?.[0];
    if (!opening) return section;
    let inner = section.slice(opening.length, -'</section>'.length).trim();

    inner = inner.replace(/<div\b[^>]*class="[^"]*\bdeck-tab\b[^"]*"[^>]*>[\s\S]*?<\/div>/gi, () => {
      legacyTabsRemoved++;
      return '';
    });

    let marker = '';
    inner = inner.replace(/<div\b[^>]*class="[^"]*\b(page-num|num)\b[^"]*"[^>]*>[\s\S]*?<\/div>/gi, match => {
      if (!marker) marker = match;
      return '';
    });
    if (!marker) {
      marker = `<div class="${defaultMarker}"></div>`;
      pageNumbersAdded++;
    }

    const existingWrapper = inner.match(/^<div\b[^>]*class="[^"]*\bclosing-inner\b[^"]*"[^>]*>([\s\S]*)<\/div>$/i);
    if (existingWrapper) inner = existingWrapper[1].trim();

    const anchors = [...inner.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map(match => ({
      html: match[0],
      href: match[1].match(/href="([^"]+)"/i)?.[1] || '',
      label: cleanText(match[2]),
    }));
    const hasNext = anchors.some(anchor =>
      anchor.href && !/indice/i.test(anchor.href) && /prossim|→/i.test(anchor.label)
    );

    if (hasNext) {
      inner = inner.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (anchor, attrs, content) => {
        const href = attrs.match(/href="([^"]+)"/i)?.[1] || '';
        if (!/indice/i.test(href)) return anchor;
        removedTxtLabels.push(cleanText(content));
        redundantIndexLinksRemoved++;
        return '';
      });
    }

    if (!/<a\b[^>]*href=/i.test(inner)) {
      inner += `<div class="closing-actions reveal d2"><a class="chip closing-primary" href="${homeHref}">Torna all’indice</a></div>`;
      indexActionsAdded++;
      addedTerminalAction = true;
    }

    const normalized = `${opening}<div class="closing-inner">${inner}</div>${marker}</section>`;
    return normalized.replace(/^[ \t]+$/gm, '');
  });

  if (updated === original) continue;
  fs.writeFileSync(file, updated);
  decksChanged++;
}

console.log(JSON.stringify({
  decksChanged,
  indexActionsAdded,
  redundantIndexLinksRemoved,
  pageNumbersAdded,
  legacyTabsRemoved,
}, null, 2));
