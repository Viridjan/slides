/* Proprietà intellettuale di Francesco Antonio Binetti */
const fs = require('fs');

const index = fs.readFileSync('00-indice.html', 'utf8');
const cards = [...index.matchAll(
  /<a class="module-card[^"]*" href="([^"]+\.html)"[\s\S]*?<div class="card-num">([A-Z]{2}\d{2})(?:\.\d{2})?<\/div>[\s\S]*?<div class="card-title">([^<]+)<\/div>/g
)].map(([, href, area, title]) => ({href, area, title}));

const courseClass = {
  HS: 'hs', RW: 'rw', CD: 'cd', SM: 'sm', SU: 'su', SD: 'sd',
  IA: 'ia', PR: 'pr', PM: 'pm', MS: 'ms'
};
const areaNames = {
  HS: 'Hardware e Software', RW: 'Reti e Web', CD: 'Contenuti digitali',
  SM: 'Smartphones', SU: 'Suite Ufficio', SD: 'Sicurezza Digitale',
  IA: 'Intelligenza Artificiale', PR: 'Programmazione',
  PM: 'Project Management', MS: 'Modellazione e Stampa 3D'
};
const ignored = /^(fine|conclusione|in sintesi|riepilogo|verifica|esercizio|tocca a te|fonti|prossimo|cosa vedremo)$/i;

function clean(value) {
  return value
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'").replace(/\s+/g, ' ').trim();
}
function sentence(value) {
  const text = clean(value).replace(/^[·:–—-]+\s*/, '');
  const first = text.match(/^.{24,210}?(?:[.!?](?=\s|$)|$)/)?.[0] || text.slice(0, 210);
  return first.trim();
}
function conceptsFrom(file) {
  const html = fs.readFileSync(file, 'utf8');
  const slides = [...html.matchAll(/<section\b[^>]*class="[^"]*\bslide\b[^"]*"[^>]*>([\s\S]*?)<\/section>/g)];
  const concepts = [];
  for (const [, slide] of slides) {
    const heading = clean(slide.match(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/i)?.[1] || '');
    const lead = sentence(slide.match(/<(?:p|div)[^>]*class="[^"]*(?:lead|body)[^"]*"[^>]*>([\s\S]*?)<\/(?:p|div)>/i)?.[1] || '');
    if (heading && lead && !ignored.test(heading) && heading.length <= 90) concepts.push([heading, lead]);
    let detailNumber = 0;
    for (const paragraph of slide.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)) {
      const detail = sentence(paragraph[1]);
      if (!heading || detail.length < 24 || detail === lead || /indice del corso|prossimo/i.test(detail)) continue;
      detailNumber++;
      const cue = detail.replace(/[.!?].*$/, '').replace(/[^\p{L}\p{N}]+/gu, ' ').split(/\s+/).slice(0, 5).join(' ').trim();
      concepts.push([`${heading} · ${cue || `dettaglio ${detailNumber}`}`, detail]);
    }
    for (const card of slide.matchAll(/<(?:div|article)[^>]*class="[^"]*(?:card|note|agenda-item)[^"]*"[^>]*>([\s\S]*?)<\/(?:div|article)>/gi)) {
      const title = clean(card[1].match(/<(?:h3|b|strong)[^>]*>([\s\S]*?)<\/(?:h3|b|strong)>/i)?.[1] || '');
      const body = sentence(card[1].match(/<p[^>]*>([\s\S]*?)<\/p>/i)?.[1] || '');
      if (title && body && !ignored.test(title) && title.length <= 90) concepts.push([title, body]);
    }
  }
  const seen = new Set();
  return concepts.filter(([term, definition]) => {
    const key = term.toLowerCase();
    if (seen.has(key) || definition.length < 24 || /indice del corso|prossimo/i.test(definition)) return false;
    seen.add(key);
    return true;
  });
}
function makeQuestions(facts) {
  const selected = facts.slice(0, 25);
  if (!selected.length) selected.push(['Concetto fondamentale', 'È un principio essenziale trattato nel modulo.']);
  const definitionPrompts = [
    term => `Quale descrizione corrisponde a «${term}»?`,
    term => `Nel contesto del modulo, che cosa indica «${term}»?`,
    term => `Quale affermazione su «${term}» è corretta?`
  ];
  const termPrompts = [
    definition => `A quale concetto si riferisce questa descrizione: «${definition}»?`,
    definition => `Quale termine del modulo è associato a questa spiegazione: «${definition}»?`
  ];
  const questions = [];
  const distinctChoices = (field, correct, index) => {
    const pool = [...new Set(selected.map(fact => fact[field]))].filter(value => value !== correct);
    const first = pool[index % Math.max(1, pool.length)] || `Un concetto diverso da «${correct}»`;
    const second = pool[(index + 5) % Math.max(1, pool.length)] || `Un'altra spiegazione non pertinente`;
    return first === second ? [first, `Nessuna relazione diretta con «${correct}»`] : [first, second];
  };
  for (let number = 0; number < 50; number++) {
    const index = number % selected.length;
    const cycle = Math.floor(number / selected.length);
    const [term, definition] = selected[index];
    const displayTerm = term.replace(/[.!?]+$/, '');
    const definitionMode = cycle % 2 === 0;
    const [wrong1, wrong2] = distinctChoices(definitionMode ? 1 : 0, definitionMode ? definition : term, index + cycle);
    questions.push(definitionMode ? {
      text: definitionPrompts[cycle % definitionPrompts.length](displayTerm),
      options: [definition, wrong1, wrong2], correct: 0, feedback: `${term}: ${definition}`
    } : {
      text: termPrompts[cycle % termPrompts.length](definition),
      options: [wrong2, term, wrong1], correct: 1, feedback: `Il concetto corretto è «${term}».`
    });
  }
  return questions;
}

const grouped = new Map();
for (const card of cards) {
  if (!grouped.has(card.area)) grouped.set(card.area, []);
  grouped.get(card.area).push(card);
}
const banks = {};
for (const [area, areaCards] of grouped) {
  const facts = areaCards.flatMap(card => conceptsFrom(card.href));
  const prefix = area.slice(0, 2);
  banks[area] = {
    area,
    title: areaCards.length === 1 ? areaCards[0].title : `${areaNames[prefix]} · ${area}`,
    course: courseClass[prefix],
    decks: areaCards.map(card => card.href),
    sourceConcepts: facts.length,
    questions: makeQuestions(facts)
  };
}
const output = `/* Proprietà intellettuale di Francesco Antonio Binetti */\nwindow.AREA_QUIZ_BANKS=${JSON.stringify(banks)};\n`;
fs.writeFileSync('quiz-area-banks.js', output);
console.log(`Wrote ${Object.keys(banks).length} area banks with 50 questions each.`);
