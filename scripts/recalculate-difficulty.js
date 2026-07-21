/* Proprietà intellettuale di Francesco Antonio Binetti */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const indexPath = path.join(root, '00-indice.html');
const outputPath = path.join(root, 'difficulty-index.js');

const stripText = html => html
  .replace(/<!--([\s\S]*?)-->/g, ' ')
  .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
  .replace(/<div\b[^>]*\b(?:data-source-footer|data-source-list|data-cross-reference-footer)=["']true["'][^>]*>[\s\S]*?<\/div>/gi, ' ')
  .replace(/<br\s*\/?>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;|&#160;/gi, ' ')
  .replace(/&amp;/gi, '&')
  .replace(/&[a-z]+;|&#\d+;/gi, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const technicalTerms = [
  /\b(?:algoritm\w*|automazion\w*|backdoor|boolean\w*|codific\w*|compliance|compression\w*|database|debug\w*|deployment)\b/gi,
  /\b(?:framework|funzion\w*|hash|kernel|licenz\w*|macro|metadat\w*|modell\w*|normalizzazion\w*|operator\w*)\b/gi,
  /\b(?:permess\w*|protocol\w*|query|ricorsion\w*|riferiment\w*|runtime|script|slicer|standard|variabil\w*|vulnerabil\w*)\b/gi,
  /\b(?:API|CID|CMS|CPU|CSV|CVSS|DNS|DRM|GDPR|HTML|HTTPS|LLM|NIS2|OER|RAM|SQL|SVG|TLS|VBA|WCAG)\b/g
];

const percentile = (value, sorted) => {
  if (sorted.length < 2) return 0.5;
  let below = 0;
  let equal = 0;
  sorted.forEach(item => {
    if (item < value) below += 1;
    else if (item === value) equal += 1;
  });
  return (below + Math.max(0, equal - 1) / 2) / (sorted.length - 1);
};

const round = value => Math.round(value * 100) / 100;
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const quizMacroareas = {
  'quiz-reti-web.html': 'Reti e Web',
  'quiz-sicurezza.html': 'Sicurezza Digitale',
  'quiz-informatica.html': 'Reti e Web',
  'quiz-hardware-software.html': 'Hardware e Software',
  'quiz-smartphones.html': 'Smartphones',
  'quiz-suite-ufficio.html': 'Suite Ufficio',
  'quiz-ia.html': 'Intelligenza Artificiale',
  'quiz-project-management.html': 'Project Management'
};

const indexHtml = fs.readFileSync(indexPath, 'utf8');
const sectionStarts = [...indexHtml.matchAll(/<div class="section-group(?:\s+[^"]*)?">/g)];
const decks = [];

sectionStarts.forEach((start, position) => {
  const end = sectionStarts[position + 1]?.index ?? indexHtml.length;
  const chunk = indexHtml.slice(start.index, end);
  const macroarea = stripText(chunk.match(/<div class="section-label">([\s\S]*?)<\/div>/i)?.[1] || 'Senza area');
  const cards = [...chunk.matchAll(/<a\b[^>]*class="[^"]*\bmodule-card\b[^"]*"[^>]*href="([^"]+\.html)"[^>]*>[\s\S]*?<\/a>/gi)];

  cards.forEach(card => {
    const file = card[1];
    const code = stripText(card[0].match(/<div class="card-num">([\s\S]*?)<\/div>/i)?.[1] || '');
    const chapterMatch = code.match(/^([A-Z]{2}\d{2})\./);
    const filePath = path.join(root, file);
    if (!fs.existsSync(filePath)) return;
    const html = fs.readFileSync(filePath, 'utf8');
    const slides = [...html.matchAll(/<section\b[^>]*class="[^"]*\bslide\b[^"]*"[^>]*>([\s\S]*?)<\/section>/gi)];
    const questions = [...html.matchAll(/<article\b[^>]*class="[^"]*\bquestion\b[^"]*"[^>]*>([\s\S]*?)<\/article>/gi)];
    const contentUnits = slides.length ? slides.slice(1, -1) : questions;
    const contentHtml = contentUnits.map(match => match[1]).join('\n');
    const text = stripText(contentHtml);
    const words = text.match(/[A-Za-zÀ-ÖØ-öø-ÿ0-9][A-Za-zÀ-ÖØ-öø-ÿ0-9'’+.#/-]*/g) || [];
    const headings = contentHtml.match(/<h[23]\b/gi) || [];
    const structural = contentHtml.match(/<(?:code|pre|table|math)\b|class="[^"]*\b(?:code|formula|mono-box|table)\b/gi) || [];
    const termSet = new Set();
    technicalTerms.forEach(pattern => {
      for (const match of text.matchAll(pattern)) termSet.add(match[0].toLocaleLowerCase('it'));
    });
    const acronymSet = new Set(text.match(/\b[A-ZÀ-Ý][A-ZÀ-Ý0-9.+/-]{1,9}\b/g) || []);
    const count = Math.max(1, contentUnits.length);

    decks.push({
      file,
      macroarea: quizMacroareas[file] || macroarea,
      chapter: chapterMatch ? chapterMatch[1] : (quizMacroareas[file] || macroarea),
      metrics: {
        contentSlides: contentUnits.length,
        wordsPerSlide: round(words.length / count),
        conceptsPerSlide: round(headings.length / count),
        technicalDensity: round((termSet.size + acronymSet.size * 0.5 + structural.length * 2) / count)
      }
    });
  });
});

const metricNames = ['contentSlides', 'wordsPerSlide', 'conceptsPerSlide', 'technicalDensity'];
const chapters = new Map();
decks.forEach(deck => {
  if (!chapters.has(deck.chapter)) chapters.set(deck.chapter, []);
  chapters.get(deck.chapter).push(deck);
});

chapters.forEach(chapterDecks => {
  const distributions = Object.fromEntries(metricNames.map(name => [
    name,
    chapterDecks.map(deck => deck.metrics[name]).sort((a, b) => a - b)
  ]));
  chapterDecks.forEach(deck => {
    const p = Object.fromEntries(metricNames.map(name => [name, percentile(deck.metrics[name], distributions[name])]));
    deck.blockScore = 1 + 4 * (
      p.contentSlides * 0.15 +
      p.wordsPerSlide * 0.35 +
      p.conceptsPerSlide * 0.15 +
      p.technicalDensity * 0.35
    );
  });
});

// Rank each block only against the other blocks in its chapter. The centered
// percentile avoids forcing tiny chapters into artificial 1-star/5-star
// extremes, while larger chapters follow a symmetric 15/20/30/20/15 split.
chapters.forEach(chapterDecks => {
  const scores = chapterDecks.map(deck => deck.blockScore).sort((a, b) => a - b);
  chapterDecks.forEach(deck => {
    const below = scores.filter(score => score < deck.blockScore).length;
    const equal = scores.filter(score => score === deck.blockScore).length;
    deck.percentile = (below + equal / 2) / scores.length;
    deck.stars = deck.percentile < 0.15 ? 1
      : deck.percentile < 0.35 ? 2
        : deck.percentile < 0.65 ? 3
          : deck.percentile < 0.85 ? 4
            : 5;
  });
});

const byFile = Object.fromEntries(decks.map(deck => [deck.file, deck]));
const updatedIndex = indexHtml.replace(
  /(<a\b[^>]*class="[^"]*\bmodule-card\b[^"]*"[^>]*href="([^"]+\.html)"[^>]*>[\s\S]*?<div class="card-difficulty" aria-label="Difficoltà )\d( su 5">)[★☆]{5}(<\/div>[\s\S]*?<\/a>)/gi,
  (full, before, file, middle, after) => {
    const deck = byFile[file];
    if (!deck) return full;
    return `${before}${deck.stars}${middle}${'★'.repeat(deck.stars)}${'☆'.repeat(5 - deck.stars)}${after}`;
  }
);

fs.writeFileSync(indexPath, updatedIndex);

const report = Object.fromEntries(decks.map(deck => [deck.file, {
  macroarea: deck.macroarea,
  chapter: deck.chapter,
  stars: deck.stars,
  percentile: round(deck.percentile),
  blockScore: round(deck.blockScore),
  metrics: deck.metrics
}]));
fs.writeFileSync(outputPath, `/* Proprietà intellettuale di Francesco Antonio Binetti */\nwindow.DECK_DIFFICULTY_INDEX = ${JSON.stringify(report, null, 2)};\n`);

const distribution = [1, 2, 3, 4, 5].map(stars => `${stars}★=${decks.filter(deck => deck.stars === stars).length}`).join(' · ');
console.log(`Ricalcolata la difficoltà di ${decks.length} blocchi: ${distribution}`);
[...chapters].forEach(([chapter, chapterDecks]) => {
  const chapterDistribution = [1, 2, 3, 4, 5]
    .map(stars => `${stars}★=${chapterDecks.filter(deck => deck.stars === stars).length}`)
    .join(' · ');
  console.log(`${chapter}: ${chapterDistribution}`);
});
