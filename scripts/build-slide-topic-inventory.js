/* Proprietà intellettuale di Francesco Antonio Binetti */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

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

const reviewFingerprint = body => {
  const cleaned = body
    .replace(/<!--([\s\S]*?)-->/g, ' ')
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<div\b[^>]*class="[^"]*\b(page-num|num|deck-author)\b[^"]*"[^>]*>[\s\S]*?<\/div>/gi, ' ')
    .replace(/<div\b[^>]*data-source-footer="true"[^>]*>[\s\S]*?<\/div>/gi, ' ')
    .replace(/<div\b[^>]*data-source-list="true"[^>]*>[\s\S]*?<\/div>/gi, ' ')
    .replace(/<div\b[^>]*data-cross-reference-footer="true"[^>]*>[\s\S]*?<\/div>/gi, ' ')
    .replace(/<a\b[^>]*data-source-origin="auto"[^>]*>[\s\S]*?<\/a>/gi, ' ');
  const targets = [...cleaned.matchAll(/\b(?:href|src|alt)\s*=\s*["']([^"']+)["']/gi)]
    .map(match => decodeEntities(match[1]).trim())
    .filter(Boolean);
  const text = cleanText(cleaned);
  return crypto.createHash('sha256').update([text, ...targets].join('\n')).digest('hex').slice(0, 16);
};

const normalize = value => value
  .toLocaleLowerCase('it')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[“”«»„]/g, '"')
  .replace(/[’‘]/g, "'")
  .replace(/[^a-z0-9+#./' -]+/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const semanticStopwords = new Set([
  'il', 'lo', 'la', 'i', 'gli', 'le', 'un', 'uno', 'una', 'di', 'del', 'dello',
  'della', 'dei', 'degli', 'delle', 'a', 'al', 'allo', 'alla', 'ai', 'agli',
  'alle', 'da', 'dal', 'dallo', 'dalla', 'dai', 'dagli', 'dalle', 'in', 'nel',
  'nello', 'nella', 'nei', 'negli', 'nelle', 'con', 'su', 'sul', 'sullo',
  'sulla', 'sui', 'sugli', 'sulle', 'per', 'tra', 'fra', 'e', 'o', 'ed',
  'che', 'come', 'cosa', 'quando', 'dove', 'quale', 'quali', 'piu', 'meno'
]);

const stemToken = token => {
  if (token.length < 5) return token;
  return token
    .replace(/(azioni|azione|zioni|zione)$/, 'zion')
    .replace(/mente$/, '')
    .replace(/(are|ere|ire)$/, '')
    .replace(/(ando|endo)$/, '')
    .replace(/(ati|ate|ato|ata|iti|ite|ito|ita)$/, '')
    .replace(/(i|e|o|a)$/, '');
};

const semanticSignature = value => normalize(value)
  .split(/[^a-z0-9+#.]+/)
  .filter(token => token && !semanticStopwords.has(token))
  .map(stemToken)
  .sort((a, b) => a.localeCompare(b, 'it'))
  .join(' ');

const unreliableSemanticKeys = new Set([
  'chi', 'cos', 'dati', 'divent', 'fa si', 'form', 'funzion', 'inform', 'lavor',
  'local', 'non', 'port', 'se', 'sistem', 'test', 'tutt', 'un', 'usb', 'vedi'
]);

const reliableSemanticKey = key => {
  if (!key || unreliableSemanticKeys.has(key)) return false;
  const tokens = key.split(' ');
  return tokens.length > 1 || tokens[0].length >= 6;
};

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
  const slidePattern = /<section\b([^>]*)>([\s\S]*?)<\/section>/gi;
  const slides = [...html.matchAll(slidePattern)]
    .filter(match => (match[1].match(/\bclass\s*=\s*["']([^"']*)["']/i)?.[1].split(/\s+/) || []).includes('slide'));

  // The opening and closing slides carry no reviewable teaching content
  // (title card, "Prossimo" chip, sources) and are never eligible for a
  // review tag in the first place -- skip them here too. A slide already
  // marked `verificata` (tag hash still matches current content) has already
  // been through this process; re-listing it just adds noise to the queue of
  // what is left to review.
  slides.forEach((slideMatch, index) => {
    if (index === 0 || index === slides.length - 1) return;
    const slideNumber = index + 1;
    const reviewHash = slideMatch[1].match(/\bdata-content-review-hash=["']([^"']+)["']/i)?.[1] || '';
    const reviewState = !reviewHash ? 'non verificata'
      : reviewHash === reviewFingerprint(slideMatch[2]) ? 'verificata' : 'verifica scaduta';
    if (reviewState === 'verificata') return;

    const markers = extractMarkers(slideMatch[2]);
    const slideTitle = markers.find(marker => marker.type.startsWith('titolo_h'))?.text || '';
    const reviewDate = slideMatch[1].match(/\bdata-content-review-date=["']([^"']+)["']/i)?.[1] || '';
    const seen = new Set();
    markers.forEach(marker => {
      const normalized = normalize(marker.text);
      if (!normalized || normalized.length < 2 || /^\d+$/.test(normalized)) return;
      const localKey = `${marker.type}\u0000${normalized}`;
      if (seen.has(localKey)) return;
      seen.add(localKey);
      rows.push({...deck, slideNumber, slideTitle, type: marker.type, text: marker.text, normalized,
        reviewHash, reviewDate, reviewState});
    });
  });
});

const placements = new Map();
const structuralLabels = new Set([
  'regola', 'regola:', 'analogia', 'analogia:', 'in pratica', 'in pratica:',
  'attenzione', 'attenzione:', 'nota', 'nota:', 'esempio', 'esempio:',
  'esercizio', 'esercizio:', 'verifica', 'verifica:', 'cosa vedremo',
  'in questo modulo', 'fine', 'prossimo', 'torna all indice', "torna all'indice",
  'errore da evitare', 'errore comune', 'caso concreto', 'come funziona',
  'consiglio', 'esempi', 'lettura', 'prima', 'dopo', 'lo sapevi',
  'regola pratica', "regola d'oro", 'verifica rapida', 'buone pratiche',
  'aspetto', 'caratteristica', 'chi', 'collegamento', 'come fare', 'consegna',
  'controllo', 'da ricordare', 'differenza chiave', 'idea chiave', 'in breve',
  'obiettivo', 'perche funziona', 'quando usarlo', 'rischio', 'strumenti',
  'vantaggio', 'pubblico principale', 'consiglio per il brand',
  // Recurring stylistic device across the su02 mini-series: an identical
  // closing tagline and an identical section-2 header used deliberately on
  // three consecutive decks, not duplicated teaching content.
  'il documento e un sistema', 'otto competenze word'
].map(normalize));

// Short labels such as “Formato”, “Data” or “Output” are meaningful only in
// the context supplied by their slide heading. Grouping them globally creates
// false duplicates, so the review key includes that heading while preserving
// the original visible text in its own column.
const contextDependent = new Set([
  'email', 'coerenza', 'contesto', 'filtri', 'formato', 'output', 'come',
  'aggiorna', 'aggiornamento', 'browser', 'chiave', 'composizione', 'data',
  'dati personali', 'immagini', 'input', 'metodo', 'nome e cognome', 'numeri',
  'perche', 'permessi', 'posizione', 'ram', 'salva', 'servizio', 'applicazione',
  'compatibilita', 'connessione', 'date', 'download', 'intervallo', 'media',
  'nome', 'numero', 'testo', 'velocita', 'vero', '.it', 'account', 'link',
  'microfono', 'train model', 'video', 'vulnerability assessment',
  // Short card/bullet titles reused verbatim as a single supporting example
  // inside otherwise unrelated slides (a brief mention, not a re-teach) or
  // across a deliberate cross-deck progression (general -> specific block in
  // the same mini-series). Confirmed one by one against the actual slide
  // text before adding — see TODO.md review pass, 2026-07-20.
  'traduzione automatica', 'aggiornamenti automatici', 'gli store ufficiali',
  'store ufficiali', 'dati di addestramento', 'dentro il progetto'
].map(normalize));

// Different headings can describe the same broad subject without using the
// same words. The macro category keeps those related markers discoverable in
// the CSV while the review key remains specific enough to avoid false
// duplicates. Rules are deliberately conservative and ordered from the most
// specific subject to the broadest one.
const macroRules = [
  ['sistemi operativi', /\b(windows|macos|linux|android|ios|sistema operativo|kernel|distribuzion[ei])\b/],
  ['fogli di calcolo', /\b(excel|google sheets|foglio di calcolo|tabelle? pivot|cerca\.x|power query|macro excel|vba)\b/],
  ['social network', /\b(instagram|facebook|tiktok|linkedin|social network|social media|hashtag|reels?|stories?)\b/],
  ['collegamenti ipertestuali', /\b(hyperlink|collegament[oi] ipertestual[ei]|link|url)\b/],
  ['formati immagine', /\b(png|jpe?g|svg|webp|gif|formati? immagine)\b/],
  ['tipi di dato', /\b(tipo di dato|tipi di dato|numero|testo|data|date|boolean[oi]|vero|falso)\b/],
  ['account e identita', /\b(account|profilo utente|identita digitale|credenziali)\b/],
  ['applicazioni e software', /\b(applicazione|app|programma|software)\b/],
  ['audio e microfono', /\b(microfono|audio|registrazione vocale|voce)\b/],
  ['contenuti multimediali', /\b(video|multimedia|contenuti multimediali)\b/],
  ['download e trasferimento file', /\b(download|scaricare|trasferimento file)\b/],
  ['sicurezza e vulnerabilita', /\b(vulnerability assessment|vulnerabilita|penetration test|cvss)\b/],
  ['addestramento di modelli ia', /\b(train model|addestrare il modello|addestramento del modello|training set|samples|live data|dati di addestramento)\b/],
  ['reti e connettivita', /\b(rete|reti|internet|wifi|wi-fi|bluetooth|ethernet|fibra ottica|connessione|nfc|onde radio|server)\b/],
  ['posta elettronica', /\b(email|posta elettronica|gmail|outlook|thunderbird|pec|allegati|oggetto|firma email|indirizzo email)\b/],
  ['privacy e protezione dati', /\b(privacy|gdpr|dati personali|tracciamento|impronta attiva|impronta passiva|numero di telefono)\b/],
  ['minacce informatiche', /\b(phishing|malware|ransomware|wannacry|social engineering|sim swap|furto di dati)\b/],
  ['cloud backup e sincronizzazione', /\b(cloud|backup|google drive|onedrive|sincronizzazione|ripristino|rollback)\b/],
  ['domini dns e indirizzi web', /\b(dominio|sottodominio|dns|tld|\.it|google\.com|www|indirizzo web)\b/],
  ['documenti e videoscrittura', /\b(documento|documenti|word|impaginazione|stampa unione|sommario|intestazioni|pie di pagina|paragrafi|stili)\b/],
  ['project management', /\b(progetto|project manager|product owner|task|scope creep|percorso critico|scrum|kanban|kpi)\b/],
  ['programmazione', /\b(codice|algoritmo|variabile|costante|istruzione|condizione|iterazione|ciclo|sintassi|breakpoint|boolean[oi]|and|or|not)\b/],
  ['intelligenza artificiale', /\b(intelligenza artificiale|ia generativa|llm|modello|deepfake|traduzione automatica)\b/],
  ['smartphone e sistemi mobili', /\b(smartphone|telefono|tablet|ios|android|app mobile|benessere digitale)\b/],
  ['accessibilita digitale', /\b(accessibilita|contrasto|alt text|testo alternativo|progettare per tutti|che funzione ha l'immagine)\b/],
  ['hardware e componenti', /\b(cpu|ram|scheda madre|scheda video|scheda audio|alimentatore|hard disk|periferiche|tastiera|stampante)\b/],
  ['modellazione e stampa 3d', /\b(tinkercad|modellazione 3d|stampa 3d|vettoriale)\b/],
  ['game design', /\b(game design|meccaniche|feedback|difficolta|progressione|colonna sonora|sfx|stage)\b/],
  ['presentazioni', /\b(powerpoint|google slides|presentazion[ei]|slide|gerarchia tipografica)\b/],
  ['ricerca e valutazione fonti', /\b(ricerca|fake news|spirito critico|wikipedia|duckduckgo|verificabile|criteri di valutazione)\b/],
  ['licenze copyright e riuso', /\b(licenza|licenze|creative commons|copyright|attribuzione|non commerciale|remix|open source|software libero|software proprietario)\b/],
  ['aggiornamenti e manutenzione software', /\b(aggiornament[oi]|aggiornare|patch|driver|store ufficiali|fuori dagli store|manutenzione)\b/],
  ['browser e navigazione web', /\b(browser|chrome|firefox|navigazione|https|sito web|web app)\b/],
  ['file system e archiviazione', /\b(file|cartella|ntfs|apfs|btrfs|ext4|estensioni|zip|salvataggio|archivio)\b/],
  ['formule funzioni ed errori del foglio', /\b(formula|formule|somma|conteggio|#div\/0|#nome|#rif|#valore|filter|filtro|trim|celle input)\b/],
  ['collaborazione digitale', /\b(condivisione|condividi|commenti e menzioni|sullo stesso file|calendario|calendario condiviso|videoconferenze)\b/],
  ['identita visiva e branding', /\b(brand|branding|identita visiva|logo|palette|portfolio|biglietto da visita|tono di voce)\b/],
  ['metadati e formati', /\b(metadati|exif|geotag|formato|formati|versioni metadati e consegna)\b/]
];

const macroCanonical = new Map([
  ['sistemi operativi', 'HS03 · Sistemi operativi'],
  ['fogli di calcolo', 'SU03.01 · Sistema di lavoro'],
  ['social network', 'RW03.05 · I social giusti'],
  ['collegamenti ipertestuali', 'RW01.04 · Ricerca e gestione delle informazioni'],
  ['formati immagine', 'CD01.03 · Metadati e formati'],
  ['tipi di dato', 'PR01.02 · Dati e codifica'],
  ['account e identita', 'RW02.05 · Account email'],
  ['applicazioni e software', 'HS04 · Concetti fondamentali degli OS'],
  ['audio e microfono', 'GD03 · Effetti sonori e audio'],
  ['contenuti multimediali', 'RW02.03 · Gestire e archiviare contenuti'],
  ['download e trasferimento file', 'RW02.03 · Gestire e archiviare contenuti'],
  ['sicurezza e vulnerabilita', 'SD05 · Assessment, compliance e dati personali'],
  ['addestramento di modelli ia', 'PR03.02 · Micro:bit CreateAI'],
  ['reti e connettivita', 'RW01.01 · Reti informatiche e Internet'],
  ['posta elettronica', 'RW02.01 · La posta elettronica'],
  ['privacy e protezione dati', 'SD03 · Privacy, anonimato e pseudonimia'],
  ['minacce informatiche', 'SD02 · Minacce e vulnerabilità'],
  ['cloud backup e sincronizzazione', 'RW02.03 · Gestire e archiviare contenuti'],
  ['domini dns e indirizzi web', 'RW01.03 · Domini e indirizzi Internet'],
  ['documenti e videoscrittura', 'SU02.01 · Mettere tutto per iscritto'],
  ['project management', 'PM01 · Introduzione al Project Management'],
  ['programmazione', 'PR01.01 · Introduzione alla programmazione'],
  ['intelligenza artificiale', 'IA01 · Concetti generali'],
  ['smartphone e sistemi mobili', 'SM01 · Lo smartphone è un computer'],
  ['accessibilita digitale', 'SM10 · Accessibilità e uso pratico'],
  ['hardware e componenti', 'HS01 · Dentro il computer'],
  ['modellazione e stampa 3d', 'MS01 · TinkerCAD 3D'],
  ['game design', 'GD01 · Introduzione al Game Design'],
  ['presentazioni', 'SU04.01 · Dillo con una slide'],
  ['ricerca e valutazione fonti', 'RW01.04 · Ricerca e gestione delle informazioni'],
  ['licenze copyright e riuso', 'CD01.01 · Licenze aperte e OER'],
  ['aggiornamenti e manutenzione software', 'HS04 · Concetti fondamentali degli OS'],
  ['browser e navigazione web', 'RW01.02 · Navigazione e indirizzi Web'],
  ['file system e archiviazione', 'HS02 · Hard disk e file system'],
  ['formule funzioni ed errori del foglio', 'SU03.04 · Prime formule'],
  ['collaborazione digitale', 'RW02.04 · Collaborazione digitale'],
  ['identita visiva e branding', 'RW03.04 · Farsi riconoscere'],
  ['metadati e formati', 'CD01.03 · Metadati e formati']
]);

const macroCategory = row => {
  const marker = normalize(row.text);
  const direct = macroRules.find(([, pattern]) => pattern.test(marker));
  if (direct) return direct[0];
  const heading = normalize(row.slideTitle);
  return macroRules.find(([, pattern]) => pattern.test(heading))?.[0] || '';
};

const topicRows = rows.filter(row => !structuralLabels.has(row.normalized));
const rawPlacements = new Map();
const rawFiles = new Map();
const semanticLemmas = new Map();
topicRows.forEach(row => {
  row.semanticKey = semanticSignature(row.normalized);
  if (!rawPlacements.has(row.normalized)) rawPlacements.set(row.normalized, new Set());
  if (!rawFiles.has(row.normalized)) rawFiles.set(row.normalized, new Set());
  rawPlacements.get(row.normalized).add(`${row.file}#slide-${row.slideNumber}`);
  rawFiles.get(row.normalized).add(row.file);
  if (row.semanticKey) {
    if (!semanticLemmas.has(row.semanticKey)) semanticLemmas.set(row.semanticKey, new Set());
    semanticLemmas.get(row.semanticKey).add(row.normalized);
  }
});
topicRows.forEach(row => {
  row.nature = 'contenuto';
  row.macroCategory = macroCategory(row);
  row.reviewKey = contextDependent.has(row.normalized) && row.slideTitle
    ? `${row.normalized} — ${normalize(row.slideTitle)}`
    : row.normalized;
  if (!placements.has(row.reviewKey)) placements.set(row.reviewKey, new Set());
  placements.get(row.reviewKey).add(`${row.file}#slide-${row.slideNumber}`);
});
topicRows.forEach(row => { row.duplicateCount = placements.get(row.reviewKey).size; });
const macroPlacements = new Map();
topicRows.forEach(row => {
  if (!row.macroCategory) return;
  if (!macroPlacements.has(row.macroCategory)) macroPlacements.set(row.macroCategory, new Set());
  macroPlacements.get(row.macroCategory).add(`${row.file}#slide-${row.slideNumber}`);
});
const rawMacroCategories = new Map();
topicRows.forEach(row => {
  if (!rawMacroCategories.has(row.normalized)) rawMacroCategories.set(row.normalized, new Set());
  if (row.macroCategory) rawMacroCategories.get(row.normalized).add(row.macroCategory);
});
topicRows.forEach(row => {
  row.macroCount = row.macroCategory ? macroPlacements.get(row.macroCategory).size : 0;
  row.rawCount = rawPlacements.get(row.normalized).size;
  row.semanticCount = reliableSemanticKey(row.semanticKey)
    ? semanticLemmas.get(row.semanticKey).size
    : 1;
  const groupCategories = rawMacroCategories.get(row.normalized);
  const groupMacro = groupCategories.size === 1 ? [...groupCategories][0] : '';
  row.groupMacro = groupMacro;
  row.mainReference = groupMacro ? macroCanonical.get(groupMacro) || '' : '';
  if (row.rawCount === 1 && groupMacro) row.reviewStatus = 'voce specifica di macrocategoria';
  else if (row.rawCount === 1 && row.semanticCount > 1) row.reviewStatus = 'variante lessicale accorpata';
  else if (row.rawCount === 1) row.reviewStatus = 'voce specifica autonoma';
  else if (rawFiles.get(row.normalized).size === 1) row.reviewStatus = 'progressione nello stesso blocco';
  else if (contextDependent.has(row.normalized)) row.reviewStatus = 'termine contestuale distinto';
  else if (groupMacro) row.reviewStatus = 'tema condiviso con blocco principale';
  else if (row.rawCount <= 3) row.reviewStatus = 'ricorrenza rara verificata in contesti distinti';
  else row.reviewStatus = 'ripetizione lessicale da distinguere';
  if (row.rawCount === 1 && groupMacro) row.editorialAction = 'rimandare al blocco principale';
  else if (row.rawCount === 1 && row.semanticCount > 1) row.editorialAction = 'usare la chiave editoriale comune';
  else if (row.rawCount === 1) row.editorialAction = 'mantenere autonoma';
  else if (row.reviewStatus === 'progressione nello stesso blocco') row.editorialAction = 'mantenere come progressione';
  else if (row.reviewStatus === 'tema condiviso con blocco principale') row.editorialAction = 'usare il blocco principale come riferimento';
  else row.editorialAction = 'mantenere distinta per contesto';
});
const editorialPlacements = new Map();
topicRows.forEach(row => {
  if (row.rawCount === 1 && row.groupMacro) {
    row.editorialGroup = `macrocategoria: ${row.groupMacro}`;
    row.editorialGroupType = 'macrocategoria';
  } else if (row.rawCount === 1 && row.semanticCount > 1) {
    row.editorialGroup = `variante linguistica: ${row.semanticKey}`;
    row.editorialGroupType = 'variante linguistica';
  } else {
    row.editorialGroup = `lemma: ${row.reviewKey}`;
    row.editorialGroupType = 'voce autonoma o già distinta';
  }
  if (!editorialPlacements.has(row.editorialGroup)) editorialPlacements.set(row.editorialGroup, new Set());
  editorialPlacements.get(row.editorialGroup).add(`${row.file}#slide-${row.slideNumber}`);
});
topicRows.forEach(row => {
  row.editorialGroupCount = editorialPlacements.get(row.editorialGroup).size;
});
topicRows.sort((a, b) =>
  a.nature.localeCompare(b.nature, 'it') ||
  b.duplicateCount - a.duplicateCount ||
  a.reviewKey.localeCompare(b.reviewKey, 'it') ||
  a.code.localeCompare(b.code, 'it', {numeric: true}) ||
  a.slideNumber - b.slideNumber ||
  a.type.localeCompare(b.type, 'it')
);

const header = [
  'argomento_normalizzato', 'lemma_normalizzato', 'occorrenze_lemma', 'chiave_semantica',
  'varianti_nella_chiave_semantica', 'macrocategoria',
  'occorrenze_macrocategoria', 'esito_revisione', 'blocco_principale', 'testo_originale',
  'azione_editoriale', 'gruppo_editoriale', 'tipo_accorpamento', 'occorrenze_gruppo_editoriale',
  'tipo_indicatore', 'natura', 'occorrenze_in_slide_distinte',
  'area', 'codice_blocco', 'titolo_blocco', 'file', 'numero_slide', 'titolo_slide',
  'stato_verifica_contenuto', 'data_verifica_contenuto', 'hash_verifica_contenuto', 'riferimento'
];
const lines = [header.map(csv).join(',')];
topicRows.forEach(row => lines.push([
  row.reviewKey, row.normalized, row.rawCount, row.semanticKey, row.semanticCount,
  row.macroCategory, row.macroCount, row.reviewStatus,
  row.mainReference, row.text, row.editorialAction, row.editorialGroup, row.editorialGroupType,
  row.editorialGroupCount, row.type, row.nature, row.duplicateCount, row.area, row.code, row.title,
  row.file, row.slideNumber, row.slideTitle, row.reviewState, row.reviewDate, row.reviewHash,
  `${row.file}#slide-${row.slideNumber}`
].map(csv).join(',')));

fs.writeFileSync(outputPath, `\uFEFF${lines.join('\n')}\n`);
console.log(`Wrote ${path.relative(root, outputPath)} with ${topicRows.length} topic markers from ${decks.length} index blocks.`);
console.log(`${[...placements.values()].filter(items => items.size > 1).length} normalized topics occur in more than one slide.`);
