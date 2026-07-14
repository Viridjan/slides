const fs = require('fs');

const SOURCES = [
  ['categorie particolari di dati', 'https://eur-lex.europa.eu/eli/reg/2016/679/art_9/oj', 'GDPR, art. 9 — EUR-Lex'],
  ['diritto alla cancellazione', 'https://eur-lex.europa.eu/eli/reg/2016/679/art_17/oj', 'GDPR, art. 17 — EUR-Lex'],
  ['diritto all’oblio', 'https://eur-lex.europa.eu/eli/reg/2016/679/art_17/oj', 'GDPR, art. 17 — EUR-Lex'],
  ["diritto all'oblio", 'https://eur-lex.europa.eu/eli/reg/2016/679/art_17/oj', 'GDPR, art. 17 — EUR-Lex'],
  ['GDPR', 'https://eur-lex.europa.eu/eli/reg/2016/679/oj', 'Regolamento generale sulla protezione dei dati — EUR-Lex'],
  ['NIS2', 'https://eur-lex.europa.eu/eli/dir/2022/2555/oj', 'Direttiva NIS2 — EUR-Lex'],
  ['AI Act', 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj', 'Regolamento europeo sull’IA — EUR-Lex'],
  ['WCAG', 'https://www.w3.org/Translations/WCAG22-it/', 'WCAG 2.2 — W3C'],
  ['Creative Commons', 'https://creativecommons.org/share-your-work/cclicenses/', 'Licenze Creative Commons'],
  ['copyright', 'https://europa.eu/youreurope/business/running-business/intellectual-property/copyright/index_it.htm', 'Copyright nell’Unione europea'],
  ['SPID', 'https://www.agid.gov.it/it/piattaforme/spid', 'SPID — AgID'],
  ['Carta d’Identità Elettronica', 'https://www.cartaidentita.interno.gov.it/', 'Carta d’Identità Elettronica — Ministero dell’Interno'],
  ["Carta d'Identità Elettronica", 'https://www.cartaidentita.interno.gov.it/', 'Carta d’Identità Elettronica — Ministero dell’Interno'],
  ['PEC', 'https://www.agid.gov.it/it/piattaforme/posta-elettronica-certificata', 'Posta elettronica certificata — AgID'],
  ['gaming disorder', 'https://www.who.int/standards/classifications/frequently-asked-questions/gaming-disorder', 'Gaming disorder — OMS'],
  ['ICD-11', 'https://www.who.int/news/item/11-02-2022-who-s-new-international-classification-of-diseases-%28icd-11%29-comes-into-effect', 'ICD-11 — OMS'],
  ['Cybersecurity Framework', 'https://www.nist.gov/cyberframework', 'Cybersecurity Framework 2.0 — NIST'],
  ['CVSS', 'https://www.first.org/cvss/', 'Common Vulnerability Scoring System — FIRST'],
  ['ISO 27001', 'https://www.iso.org/isoiec-27001-information-security.html', 'ISO/IEC 27001 — ISO'],
  ['password manager', 'https://www.nist.gov/cybersecurity-and-privacy/how-do-i-create-good-password', 'Password e MFA — NIST'],
  ['password', 'https://www.nist.gov/cybersecurity-and-privacy/how-do-i-create-good-password', 'Password e MFA — NIST'],
  ['ransomware', 'https://www.cisa.gov/stopransomware', 'StopRansomware — CISA'],
  ['phishing', 'https://www.cisa.gov/secure-our-world/recognize-and-report-phishing', 'Riconoscere il phishing — CISA'],
  ['DNS', 'https://www.icann.org/resources/pages/about-domain-names-2018-08-30-en', 'Domain Name System — ICANN'],
  ['nome di dominio', 'https://www.icann.org/resources/pages/about-domain-names-2018-08-30-en', 'Nomi di dominio — ICANN'],
  ['IPv6', 'https://www.rfc-editor.org/rfc/rfc8200', 'Internet Protocol Version 6 — RFC 8200'],
  ['HTTPS', 'https://www.rfc-editor.org/rfc/rfc9110', 'HTTP Semantics — RFC 9110'],
  ['TLS', 'https://www.rfc-editor.org/rfc/rfc8446', 'TLS 1.3 — RFC 8446'],
  ['email', 'https://www.rfc-editor.org/rfc/rfc5322', 'Internet Message Format — RFC 5322'],
  ['Bluetooth', 'https://www.bluetooth.com/specifications/specs/', 'Specifiche Bluetooth — Bluetooth SIG'],
  ['Wi-Fi', 'https://www.wi-fi.org/discover-wi-fi', 'Wi-Fi — Wi-Fi Alliance'],
  ['WiFi', 'https://www.wi-fi.org/discover-wi-fi', 'Wi-Fi — Wi-Fi Alliance'],
  ['USB', 'https://www.usb.org/documents', 'Documenti e specifiche USB — USB-IF'],
  ['Android', 'https://support.google.com/android/', 'Guida ufficiale Android'],
  ['iOS', 'https://support.apple.com/guide/iphone/welcome/ios', 'Manuale utente iPhone — Apple'],
  ['Microsoft 365', 'https://support.microsoft.com/microsoft-365', 'Supporto Microsoft 365', /^su/],
  ['Microsoft Word', 'https://support.microsoft.com/word', 'Supporto Microsoft Word', /^su/],
  ['Word', 'https://support.microsoft.com/word', 'Supporto Microsoft Word', /^su/],
  ['Microsoft Excel', 'https://support.microsoft.com/excel', 'Supporto Microsoft Excel', /^su/],
  ['Excel', 'https://support.microsoft.com/excel', 'Supporto Microsoft Excel', /^su/],
  ['formule', 'https://support.microsoft.com/excel', 'Formule e funzioni — Supporto Microsoft Excel', /^su03/],
  ['funzioni', 'https://support.microsoft.com/excel', 'Formule e funzioni — Supporto Microsoft Excel', /^su03/],
  ['VBA', 'https://learn.microsoft.com/office/vba/api/overview/', 'Riferimento VBA per Office — Microsoft Learn'],
  ['Google Workspace', 'https://support.google.com/a/users/', 'Centro didattico Google Workspace', /^su/],
  ['Google Docs', 'https://support.google.com/docs/', 'Guida ufficiale Google Docs Editors', /^su/],
  ['Google Sheets', 'https://support.google.com/docs/topic/9054603', 'Guida ufficiale Google Sheets', /^su/],
  ['Google Slides', 'https://support.google.com/a/users/answer/9282488', 'Formazione e guida Google Slides', /^su/],
  ['Adobe Photoshop', 'https://helpx.adobe.com/photoshop/user-guide.html', 'Guida ufficiale Adobe Photoshop'],
  ['Adobe Illustrator', 'https://helpx.adobe.com/illustrator/user-guide.html', 'Guida ufficiale Adobe Illustrator'],
  ['Adobe Acrobat', 'https://helpx.adobe.com/acrobat/user-guide.html', 'Guida ufficiale Adobe Acrobat'],
  ['LibreOffice', 'https://documentation.libreoffice.org/', 'Documentazione LibreOffice', /^su/],
  ['Unicode', 'https://www.unicode.org/versions/latest/', 'Unicode Standard'],
  ['UTF-8', 'https://www.unicode.org/versions/latest/core-spec/chapter-2/', 'UTF-8 — Unicode Standard'],
  ['Python', 'https://docs.python.org/3/tutorial/', 'Tutorial ufficiale Python'],
  ['algoritmo', 'https://xlinux.nist.gov/dads/', 'Dictionary of Algorithms and Data Structures — NIST'],
  ['algoritmi', 'https://xlinux.nist.gov/dads/', 'Dictionary of Algorithms and Data Structures — NIST'],
  ['Flowgorithm', 'https://www.flowgorithm.org/', 'Flowgorithm — sito ufficiale', /^pr/],
  ['Scratch', 'https://scratch.mit.edu/educators', 'Scratch per educatori — MIT'],
  ['MakeCode', 'https://makecode.microbit.org/tutorials/getting-started', 'MakeCode per micro:bit'],
  ['CreateAI', 'https://microbit.org/get-started/user-guide/microbit-createai/', 'micro:bit CreateAI'],
  ['Micro:bit', 'https://microbit.org/get-started/user-guide/overview/', 'Guida ufficiale micro:bit'],
  ['TinkerCAD', 'https://www.tinkercad.com/learn', 'Tinkercad Learn — Autodesk'],
  ['Tinkercad', 'https://www.tinkercad.com/learn', 'Tinkercad Learn — Autodesk'],
  ['Project Management', 'https://www.pmi.org/about/what-is-a-project', 'Progetti e ciclo di vita — PMI'],
  ['Manifesto Agile', 'https://agilemanifesto.org/iso/it/manifesto.html', 'Manifesto per lo sviluppo Agile'],
  ['Scrum', 'https://scrumguides.org/scrum-guide.html', 'Scrum Guide ufficiale'],
  ['brand identity', 'https://www.wipo.int/trademarks/en/', 'Marchi e identità distintiva — WIPO'],
  ['branding', 'https://www.wipo.int/trademarks/en/', 'Marchi e identità distintiva — WIPO'],
  ['game design', 'https://igda.org/about-us/core-values-and-code-of-ethics/', 'Valori e codice etico — IGDA'],
  ['gioco fisico', 'https://igda.org/about-us/core-values-and-code-of-ethics/', 'Valori e codice etico — IGDA'],
  ['carta da gioco', 'https://igda.org/about-us/core-values-and-code-of-ethics/', 'Valori e codice etico — IGDA'],
  ['gioco di carte', 'https://igda.org/about-us/core-values-and-code-of-ethics/', 'Valori e codice etico — IGDA'],
  ['playtest', 'https://igda.org/about-us/core-values-and-code-of-ethics/', 'Valori e codice etico — IGDA'],
  ['audio', 'https://www.w3.org/TR/webaudio/', 'Web Audio API — W3C', /^gd/],
  ['gamepad', 'https://www.w3.org/TR/gamepad/', 'Gamepad API — W3C', /^gd/],
  ['transformer', 'https://arxiv.org/abs/1706.03762', 'Attention Is All You Need — paper originale'],
  ['LLM', 'https://arxiv.org/abs/1706.03762', 'Transformer — paper originale'],
  ['machine learning', 'https://www.nist.gov/itl/ai-risk-management-framework', 'AI Risk Management Framework — NIST'],
  ['intelligenza artificiale', 'https://www.nist.gov/itl/ai-risk-management-framework', 'AI Risk Management Framework — NIST'],
].sort((a, b) => b[0].length - a[0].length);

// Wikipedia is a secondary source: it never displaces an official one. At most
// one Wikipedia link per slide, and only after the official sources have had
// their two slots. Every title below was resolved against the it.wikipedia API,
// redirects followed, so these are canonical article names.
const W = 'https://it.wikipedia.org/wiki/';
const WIKI = [
  ['diagramma di flusso', `${W}Diagramma_di_flusso`, 'Diagramma di flusso — Wikipedia'],
  ['pseudocodice', `${W}Pseudocodice`, 'Pseudocodice — Wikipedia'],
  ['ricorsione', `${W}Algoritmo_ricorsivo`, 'Algoritmo ricorsivo — Wikipedia'],
  ['algoritmo di ordinamento', `${W}Algoritmo_di_ordinamento`, 'Algoritmi di ordinamento — Wikipedia'],
  ['macchina di Turing', `${W}Macchina_di_Turing`, 'Macchina di Turing — Wikipedia'],
  ['indecidibilità', `${W}Problema_della_terminazione`, 'Problema della terminazione — Wikipedia'],
  ['complessità computazionale', `${W}Teoria_della_complessità_computazionale`, 'Complessità computazionale — Wikipedia'],
  ['paradigma', `${W}Paradigma_di_programmazione`, 'Paradigmi di programmazione — Wikipedia'],
  ['object-oriented', `${W}Programmazione_orientata_agli_oggetti`, 'Programmazione a oggetti — Wikipedia'],
  ['compilatore', `${W}Compilatore`, 'Compilatore — Wikipedia'],
  ['interprete', `${W}Interprete_(informatica)`, 'Interprete — Wikipedia'],
  ['tipo di dato', `${W}Tipo_di_dato`, 'Tipi di dato — Wikipedia'],
  ['iterazione', `${W}Iterazione`, 'Iterazione — Wikipedia'],
  ['debug', `${W}Debugging`, 'Debugging — Wikipedia'],
  ['sistema binario', `${W}Sistema_numerico_binario`, 'Sistema binario — Wikipedia'],
  ['codifica dei caratteri', `${W}Codifica_di_caratteri`, 'Codifica dei caratteri — Wikipedia'],
  ['ASCII', `${W}ASCII`, 'ASCII — Wikipedia'],
  ['compressione', `${W}Compressione_dei_dati`, 'Compressione dei dati — Wikipedia'],
  ['pixel', `${W}Pixel`, 'Pixel — Wikipedia'],
  ['CPU', `${W}CPU`, 'CPU — Wikipedia'],
  ['RAM', `${W}RAM`, 'RAM — Wikipedia'],
  ['sistema operativo', `${W}Sistema_operativo`, 'Sistema operativo — Wikipedia'],
  ['file system', `${W}File_system`, 'File system — Wikipedia'],
  ['rete di computer', `${W}Rete_di_computer`, 'Reti di computer — Wikipedia'],
  ['indirizzo IP', `${W}Indirizzo_IP`, 'Indirizzo IP — Wikipedia'],
  ['motore di ricerca', `${W}Motore_di_ricerca`, 'Motore di ricerca — Wikipedia'],
  ['cloud', `${W}Cloud_computing`, 'Cloud computing — Wikipedia'],
  ['firewall', `${W}Firewall`, 'Firewall — Wikipedia'],
  ['VPN', `${W}Rete_privata_virtuale`, 'Rete privata virtuale — Wikipedia'],
  ['crittografia asimmetrica', `${W}Crittografia_asimmetrica`, 'Crittografia asimmetrica — Wikipedia'],
  ['crittografia', `${W}Crittografia`, 'Crittografia — Wikipedia'],
  ['malware', `${W}Malware`, 'Malware — Wikipedia'],
  ['ingegneria sociale', `${W}Ingegneria_sociale`, 'Ingegneria sociale — Wikipedia'],
  ['autenticazione a due fattori', `${W}Autenticazione_a_due_fattori`, 'Autenticazione a due fattori — Wikipedia'],
  ['codice QR', `${W}Codice_QR`, 'Codice QR — Wikipedia'],
  ['smartphone', `${W}Smartphone`, 'Smartphone — Wikipedia'],
  ['foglio di calcolo', `${W}Foglio_elettronico`, 'Foglio elettronico — Wikipedia'],
  ['tabella pivot', `${W}Tabella_pivot`, 'Tabella pivot — Wikipedia'],
  ['macro', `${W}Macro_(informatica)`, 'Macro — Wikipedia'],
  ['base di dati', `${W}Base_di_dati`, 'Base di dati — Wikipedia'],
  ['SQL', `${W}Structured_Query_Language`, 'SQL — Wikipedia'],
  ['HTML', `${W}HTML`, 'HTML — Wikipedia'],
  ['CSS', `${W}CSS`, 'CSS — Wikipedia'],
  ['JavaScript', `${W}JavaScript`, 'JavaScript — Wikipedia'],
  ['rete neurale', `${W}Rete_neurale_artificiale`, 'Rete neurale artificiale — Wikipedia'],
  ['realtà aumentata', `${W}Realtà_aumentata`, 'Realtà aumentata — Wikipedia'],
  ['realtà virtuale', `${W}Realtà_virtuale`, 'Realtà virtuale — Wikipedia'],
  ['stampa 3D', `${W}Stampa_3D`, 'Stampa 3D — Wikipedia'],
  ['interfaccia utente', `${W}Interfaccia_uomo-macchina`, 'Interfaccia uomo-macchina — Wikipedia'],
  ['usabilità', `${W}Usabilità`, 'Usabilità — Wikipedia'],
].sort((a, b) => b[0].length - a[0].length);

const escapeRe = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const escapeHtml = value => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');
const cleanText = value => value.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const sourceLink = (url, label) => `<a data-source-origin="auto" href="${url}" target="_blank" rel="noopener noreferrer" title="Fonte ufficiale: ${label}" aria-label="Fonte ufficiale: ${label}">↗</a>`;

function sourceFooter(section, savedFooter = '') {
  const sources = new Map();
  const sourceAnchor = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;

  const collect = html => html.replace(sourceAnchor, (anchor, attrs, content) => {
    const href = attrs.match(/href="(https?:\/\/[^\"]+)"/i)?.[1];
    const title = attrs.match(/title="Fonte ufficiale:\s*([^\"]+)"/i)?.[1];
    const visible = cleanText(content);
    if (!href || (!title && !/^Fonte(?: ufficiale)?\s*(?:→|:)/i.test(visible))) return anchor;

    const label = title || visible.replace(/^Fonte(?: ufficiale)?\s*(?:→|:)\s*/i, '');
    const origin = /data-source-origin="auto"/i.test(attrs) ? 'auto' : 'manual';
    const previous = sources.get(href);
    if (!previous || origin === 'manual') sources.set(href, { href, label, origin });
    return '';
  });

  collect(savedFooter);
  const cleaned = collect(section);
  if (!sources.size) return cleaned;

  const links = [...sources.values()].map(({ href, label, origin }) => {
    const safeLabel = escapeHtml(label);
    return `<a data-source-origin="${origin}" href="${href}" target="_blank" rel="noopener noreferrer" title="Fonte ufficiale: ${safeLabel}" aria-label="Fonte ufficiale: ${safeLabel}" style="font-family:var(--font-mono,monospace);font-size:16px;line-height:1.25;color:var(--teal,#163b35);text-decoration:underline;text-underline-offset:3px;white-space:nowrap;">Fonte: ${safeLabel} ↗</a>`;
  }).join('');
  const footer = `<div class="source-footer" data-source-footer="true" style="position:absolute;left:220px;bottom:38px;z-index:4;display:flex;flex-direction:column;align-items:flex-start;gap:6px;max-width:1500px;">${links}</div>`;
  return cleaned.replace(/<\/section>\s*$/i, `${footer}</section>`);
}

// Product-specific sources only fire inside their own area: 'funzioni' in a
// programming deck means functions, not Excel formulas. Without the scope,
// a keyword match on a homonym cites an authoritative but wrong source.
function annotateSection(section, file) {
  if (/class="[^"]*(?:title|closing)[^"]*"/.test(section)) return section;
  let savedFooter = '';
  section = section.replace(/<div\b[^>]*data-source-footer="true"[^>]*>[\s\S]*?<\/div>/gi, footer => {
    savedFooter += footer;
    return '';
  });
  const linkedUrls = new Set(
    [...`${section}${savedFooter}`.matchAll(/<a\b[^>]*href="([^"]+)"/gi)].map(m => m[1])
  );
  let added = 0;
  let wikiAdded = 0;
  let blockedDepth = 0;
  const tokens = section.split(/(<[^>]+>)/g);

  for (let i = 0; i < tokens.length && (added < 2 || wikiAdded < 1); i++) {
    const token = tokens[i];
    if (token.startsWith('<')) {
      const close = token.match(/^<\/(a|script|style|svg)\b/i);
      const open = token.match(/^<(a|script|style|svg)\b/i);
      if (close) blockedDepth = Math.max(0, blockedDepth - 1);
      else if (open && !/\/$/.test(token)) blockedDepth++;
      continue;
    }
    if (blockedDepth || !token.trim()) continue;

    let matched = false;
    for (const [term, url, label, scope] of SOURCES) {
      if (added >= 2) break;
      if (linkedUrls.has(url)) continue;
      if (scope && !scope.test(file)) continue;
      const re = new RegExp(`\\b(${escapeRe(term)})\\b`, 'i');
      if (!re.test(tokens[i])) continue;
      tokens[i] = tokens[i].replace(re, `$1${sourceLink(url, label)}`);
      linkedUrls.add(url);
      added++;
      matched = true;
      break;
    }
    if (matched) continue;
    for (const [term, url, label] of WIKI) {
      if (wikiAdded >= 1) break;
      if (linkedUrls.has(url)) continue;
      const re = new RegExp(`\\b(${escapeRe(term)})\\b`, 'i');
      if (!re.test(tokens[i])) continue;
      tokens[i] = tokens[i].replace(re, `$1${sourceLink(url, label)}`);
      linkedUrls.add(url);
      wikiAdded++;
      break;
    }
  }
  return sourceFooter(tokens.join(''), savedFooter);
}

const files = fs.readdirSync('.')
  .filter(name => /^[a-z]{2}\d{2}.*\.html$/.test(name))
  .sort();

let filesChanged = 0;
let linksAdded = 0;
for (const file of files) {
  const original = fs.readFileSync(file, 'utf8');
  // Remove only links generated by this script. Repeating the pass also repairs
  // any nested generated anchor left by an interrupted or older run.
  let before = original;
  const generatedLink = /<a href="[^"]*" target="_blank" rel="noopener noreferrer" title="Fonte ufficiale:[^"]*" aria-label="Fonte ufficiale:[^"]*" style="font-family:var\(--font-mono,monospace\);font-size:\.58em;line-height:1;color:var\(--teal,#163b35\);text-decoration:none;vertical-align:super;margin-left:3px;white-space:nowrap;">↗<\/a>/g;
  for (let pass = 0; pass < 4; pass++) before = before.replace(generatedLink, '');
  before = before.replace(/<a\b(?=[^>]*data-source-origin="auto")[^>]*>[\s\S]*?<\/a>/gi, '');
  const beforeCount = (before.match(/title="Fonte ufficiale:/g) || []).length;
  const after = before
    .replace(/<section\b[\s\S]*?<\/section>/gi, section => annotateSection(section, file))
    .replace(/[ \t]+$/gm, '');
  const afterCount = (after.match(/title="Fonte ufficiale:/g) || []).length;
  if (after !== before) {
    fs.writeFileSync(file, after);
    filesChanged++;
    linksAdded += afterCount - beforeCount;
  }
}

console.log(`Rendered ${linksAdded} automatic official-source links across ${filesChanged} decks.`);
