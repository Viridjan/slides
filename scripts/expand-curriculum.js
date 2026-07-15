/* Proprietà intellettuale di Francesco Antonio Binetti */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const write = (file, data) => fs.writeFileSync(path.join(root, file), data);
const exists = (file) => fs.existsSync(path.join(root, file));
const renameIfNeeded = (from, to) => {
  const a = path.join(root, from);
  const b = path.join(root, to);
  if (fs.existsSync(a) && !fs.existsSync(b)) fs.renameSync(a, b);
};

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function renumberProgramming() {
  const pairs = [
    ['pr00-introduzione-programmazione', 'pr01-01-introduzione-programmazione'],
    ['pr00-dati-codifica', 'pr01-02-dati-codifica'],
    ['pr00-algoritmi', 'pr01-03-algoritmi'],
    ['pr00-fondamenti-programmazione', 'pr01-04-fondamenti-programmazione'],
  ];

  for (const [from, to] of pairs) {
    renameIfNeeded(`${from}.html`, `${to}.html`);
    renameIfNeeded(`${from}.txt`, `${to}.txt`);
  }

  const replacements = [
    [/pr00-introduzione-programmazione/g, 'pr01-01-introduzione-programmazione'],
    [/pr00-dati-codifica/g, 'pr01-02-dati-codifica'],
    [/pr00-algoritmi/g, 'pr01-03-algoritmi'],
    [/pr00-fondamenti-programmazione/g, 'pr01-04-fondamenti-programmazione'],
    [/PR00\.01/g, 'PR01.01'],
    [/PR00\.02/g, 'PR01.02'],
    [/PR00\.03/g, 'PR01.03'],
    [/PR00\.04/g, 'PR01.04'],
    [/PR00/g, 'PR01'],
  ];

  for (const file of fs.readdirSync(root).filter((name) => /\.(html|txt|js|md)$/.test(name))) {
    let text = read(file);
    const before = text;
    for (const [from, to] of replacements) text = text.replace(from, to);
    if (file === 'pr01-02-dati-codifica.html') text = text.replace(/Programmare · PR01/g, 'Programmare · PR02');
    if (file === 'pr01-03-algoritmi.html') text = text.replace(/Programmare · PR01/g, 'Programmare · PR03');
    if (file === 'pr01-04-fondamenti-programmazione.html') text = text.replace(/Programmare · PR01/g, 'Programmare · PR04');
    if (text !== before) write(file, text);
  }
}

const commonCss = `:root{--paper:#f4ece0;--paper-2:#ece0cf;--ink:#1c1714;--muted:#51463e;--red:#e6533b;--teal:#163b35;--sky:#3f7e8c;--gold:#e0a12c;--line:#d8c9b4;--display:"Fraunces",Georgia,serif;--body:"Space Grotesk",sans-serif;--mono:"Space Mono",monospace}
*{box-sizing:border-box}html,body{margin:0;width:100%;height:100%;overflow:hidden;background:#241d17;font-family:var(--body)}.deck-stage{position:absolute;width:1920px;height:1080px;transform-origin:0 0;background:var(--paper)}.slide{position:absolute;inset:0;padding:88px 110px;background:var(--paper);color:var(--ink);visibility:hidden;opacity:0;overflow:hidden}.slide.visible,.slide.active{visibility:visible;opacity:1}.slide:before{content:"";position:absolute;inset:0;background-image:radial-gradient(var(--line) .8px,transparent .8px);background-size:26px 26px;opacity:.25}.slide>*{position:relative}.title{display:grid;grid-template-columns:1.08fr .92fr;gap:70px;align-items:center}.eyebrow{font-family:var(--display);font-weight:900;font-style:italic;color:var(--red);font-size:34px}.h1{font-family:var(--display);font-size:108px;line-height:.92;margin:18px 0}.h2{font-family:var(--display);font-size:74px;line-height:.96;margin:0 0 22px}.lead{font-size:32px;line-height:1.34;color:var(--muted);max-width:1240px}.body{font-size:27px;line-height:1.42;color:var(--muted)}.grid2{display:grid;grid-template-columns:1fr 1fr;gap:24px}.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}.card{background:#fbf5ec;border:2px solid var(--ink);border-radius:14px;padding:24px 28px;box-shadow:7px 8px 0 rgba(28,23,20,.13)}.card h3{font-family:var(--display);font-size:34px;margin:0 0 10px;line-height:1.05}.card p,.card li{font-size:23px;line-height:1.32;color:var(--muted)}.card ul{padding-left:24px}.tag{display:inline-block;background:var(--teal);color:var(--paper);font-family:var(--mono);font-weight:700;font-size:22px;letter-spacing:2px;text-transform:uppercase;padding:10px 18px;border-radius:999px}.chip{display:inline-block;background:var(--ink);color:var(--paper);font-weight:700;font-size:24px;padding:11px 18px;border-radius:999px;margin-right:10px;text-decoration:none}.code{background:var(--ink);color:var(--paper);font-family:var(--mono);font-size:24px;line-height:1.42;border-radius:16px;padding:28px;white-space:pre-line}.accent{color:var(--sky);font-style:italic}.num{position:absolute;right:110px;bottom:52px;font-family:var(--mono);font-size:24px;color:#7b6e63}.num b{color:var(--red);font-size:34px}.home-btn{position:fixed;left:18px;bottom:18px;z-index:10;color:#f4ece0;background:rgba(28,23,20,.6);border-radius:999px;padding:8px 15px;text-decoration:none;font-family:var(--mono)}.progress{position:fixed;left:0;bottom:0;height:6px;background:var(--red);z-index:10}.closing{background:var(--teal);color:var(--paper)}.closing .lead{color:var(--paper)}.split{display:grid;grid-template-columns:1.04fr .96fr;gap:58px;align-items:center;height:100%}.stack>*+*{margin-top:18px}.note{background:var(--gold);border:2px solid var(--ink);border-radius:14px;padding:20px 24px;box-shadow:6px 7px 0 rgba(28,23,20,.16)}.note .lbl{font-family:var(--mono);font-weight:700;font-size:20px;letter-spacing:1px;text-transform:uppercase;margin-bottom:8px}.note p{font-size:24px;line-height:1.34;color:var(--ink)}.table{width:100%;border-collapse:collapse;font-family:var(--mono);background:#fff;border:2px solid var(--ink);box-shadow:5px 6px 0 rgba(28,23,20,.12)}.table th,.table td{border:1px solid var(--line);padding:9px 10px;font-size:17px;text-align:left}.table th{background:var(--paper-2);color:var(--ink)}.table .numc{text-align:right}.tight .card{padding:18px 20px}.tight .card h3{font-size:29px}.tight .card p,.tight .card li{font-size:20px}.tight .code{font-size:21px}.tight .lead{font-size:28px}`;

const runtime = `<script>
const slides=[...document.querySelectorAll('.slide')],stage=document.getElementById('deckStage'),progress=document.querySelector('.progress');let current=0;function resize(){const s=Math.min(innerWidth/1920,innerHeight/1080);stage.style.transform=\`scale(\${s})\`;stage.style.left=\`\${(innerWidth-1920*s)/2}px\`;stage.style.top=\`\${(innerHeight-1080*s)/2}px\`}function show(i){current=Math.max(0,Math.min(slides.length-1,i));slides.forEach((sl,n)=>sl.classList.toggle('visible',n===current));progress.style.width=\`\${(current+1)/slides.length*100}%\`;location.hash=current+1}function move(d){show(current+d)}document.addEventListener('keydown',e=>{if(['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();move(1)}if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();move(-1)}if(e.key.toLowerCase()==='i')location.href='00-indice.html'});addEventListener('wheel',e=>{if(Math.abs(e.deltaY)>30)move(e.deltaY>0?1:-1)},{passive:true});document.querySelectorAll('.num').forEach((n,i)=>n.innerHTML=\`<b>\${i+1}</b>/\${slides.length}\`);addEventListener('resize',resize);resize();{const hm=location.hash.match(/(?:slide-|slide=|^#)(\\d+)/);show(Math.max(1,hm?parseInt(hm[1],10):1)-1);}addEventListener('hashchange',()=>{const m=location.hash.match(/(?:slide-|slide=|^#)(\\d+)/);if(m){const n=parseInt(m[1],10)-1;if(Number.isInteger(n))show(n);}});
</script>`;

function slideTitle(deck) {
  return `<section class="slide title visible"><div><div class="eyebrow">${deck.kicker}</div><h1 class="h1">${deck.title}<br><span class="accent">${deck.accent}</span></h1><p class="lead">${deck.lead}</p><p><span class="chip">${deck.slides.length + 3} slide</span><span class="chip">${deck.code}</span><span class="chip">${deck.topic}</span></p></div><div class="code">${deck.flow}</div><div class="num"></div></section>`;
}

function slideAgenda(deck) {
  const items = deck.slides.slice(0, 12).map((s, i) => `<div class="card"><h3>${String(i + 1).padStart(2, '0')} · ${s.short || s.title}</h3><p>${s.summary || s.lead}</p></div>`).join('');
  return `<section class="slide tight no-top-label"><h2 class="h2">Cosa vedremo</h2><div class="grid3">${items}</div><div class="num"></div></section>`;
}

function bodySlide(s) {
  const cards = (s.cards || []).map((c) => `<div class="card"><h3>${c.h}</h3><p>${c.p}</p></div>`).join('');
  const code = s.code ? `<div class="code">${esc(s.code)}</div>` : '';
  const note = s.note ? `<div class="note"><div class="lbl">${s.note.h}</div><p>${s.note.p}</p></div>` : '';
  if (s.layout === 'code') {
    return `<section class="slide"><div class="split"><div class="stack"><h2 class="h2">${s.title}</h2><p class="lead">${s.lead}</p>${note}</div>${code}</div><div class="num"></div></section>`;
  }
  if (s.layout === 'table') {
    const rows = s.rows.map((row, i) => `<tr>${row.map((cell) => i === 0 ? `<th>${cell}</th>` : `<td>${cell}</td>`).join('')}</tr>`).join('');
    return `<section class="slide"><div class="split"><div class="stack"><h2 class="h2">${s.title}</h2><p class="lead">${s.lead}</p>${note}</div><table class="table">${rows}</table></div><div class="num"></div></section>`;
  }
  return `<section class="slide tight no-top-label"><h2 class="h2">${s.title}</h2><p class="lead">${s.lead}</p><div class="${(s.cards || []).length >= 4 ? 'grid4' : (s.cards || []).length === 3 ? 'grid3' : 'grid2'}">${cards}</div>${code ? `<div style="margin-top:24px">${code}</div>` : ''}${note ? `<div style="margin-top:24px">${note}</div>` : ''}<div class="num"></div></section>`;
}

function renderDeck(deck) {
  const body = [slideTitle(deck), slideAgenda(deck), ...deck.slides.map(bodySlide), `<section class="slide closing"><h2 class="h2">${deck.closeTitle}</h2><p class="lead">${deck.closeLead}</p><p><a class="chip" href="00-indice.html">Torna all'indice</a></p><div class="num"></div></section>`].join('\n');
  const html = `<!DOCTYPE html>
<html lang="it"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${deck.pageTitle}</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700;9..144,900&family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet"><style>${commonCss}</style><link rel="stylesheet" href="theme-corsi.css"></head><body class="course-su"><main class="deck-stage" id="deckStage">${body}</main><a class="home-btn" href="00-indice.html">↩ Indice</a><div class="progress"></div>${runtime}</body></html>`;
  write(deck.file, html);
  const txtSlides = [
    `--- Slide 1 ---\n${deck.kicker}\n${deck.title} ${deck.accent}\n${deck.lead}`,
    `--- Slide 2 ---\nCosa vedremo\n${deck.slides.map((s, i) => `${i + 1}. ${s.title}`).join('\n')}`,
    ...deck.slides.map((s, i) => `--- Slide ${i + 3} ---\n${s.title}\n${s.lead}\n${(s.cards || []).map(c => `${c.h}: ${c.p}`).join('\n')}${s.code ? `\n${s.code}` : ''}${s.note ? `\n${s.note.h}: ${s.note.p}` : ''}`),
    `--- Slide ${deck.slides.length + 3} ---\n${deck.closeTitle}\n${deck.closeLead}`,
  ];
  write(deck.file.replace(/\.html$/, '.txt'), `${deck.pageTitle}\n${'='.repeat(deck.pageTitle.length)}\n\n${txtSlides.join('\n\n')}\n`);
}

function deckDefinitions() {
  const spreadsheet = {
    file: 'su03-11-fogli-calcolo-avanzati.html',
    pageTitle: 'Suite Ufficio · SU03.11 — Fogli di calcolo avanzati',
    kicker: 'Fogli di calcolo · SU03.11',
    title: 'Fogli di calcolo',
    accent: 'avanzati',
    lead: 'Modellare dati, controllare errori, creare viste di lavoro e preparare tabelle pronte per formule, pivot, query e automazioni.',
    code: 'SU03.11',
    topic: 'Spreadsheet',
    flow: 'dati grezzi\n  ↓ pulizia\nstruttura tabellare\n  ↓ formule\nreport affidabile',
    closeTitle: 'Un buon foglio è un piccolo sistema informativo.',
    closeLead: 'Più la struttura è chiara, più formule, query e automazioni diventano semplici da mantenere.',
    slides: [
      {tag:'Sistema', title:'Il foglio di calcolo non è solo una griglia', short:'Griglia o sistema', lead:'Un foglio di calcolo diventa potente quando è progettato come sistema: input chiari, elaborazione controllata e output leggibile.', cards:[{h:'Input',p:'Dati inseriti o importati: vendite, presenze, ordini, appuntamenti.'},{h:'Logica',p:'Formule, controlli, regole di validazione e tabelle di appoggio.'},{h:'Output',p:'Report, grafici, pivot, esportazioni PDF o dashboard condivise.'}]},
      {tag:'Struttura', title:'Una tabella pulita batte cento formule', lead:'La qualità del risultato dipende prima dalla forma dei dati. Ogni colonna deve rappresentare una sola informazione e ogni riga un solo evento.', cards:[{h:'Una riga = record',p:'Una vendita, un cliente, un appuntamento, una riga di magazzino.'},{h:'Una colonna = campo',p:'Data, categoria, quantità, prezzo, stato, referente.'},{h:'Niente celle unite',p:'Sono comode da vedere ma rompono ordinamenti, filtri e importazioni.'},{h:'Niente totali in mezzo',p:'I totali stanno nei report, non nella tabella sorgente.'}]},
      {tag:'Dati', title:'Tipi di dato: numero, testo, data, booleano', lead:'Molti errori nascono da valori che sembrano corretti ma sono del tipo sbagliato: numeri salvati come testo, date ambigue, spazi invisibili.', cards:[{h:'Numeri',p:'Servono per calcoli. Evita simboli digitati a mano dentro la cella.'},{h:'Testo',p:'Nomi, codici, categorie. Attenzione a maiuscole, accenti e spazi.'},{h:'Date',p:'Devono essere date vere, non testo: così puoi filtrare per mese e anno.'},{h:'Booleani',p:'Vero/falso, sì/no, completato/non completato: utili per controlli e filtri.'}]},
      {tag:'Validazione', title:'Impedire errori prima che entrino', lead:'La convalida dati limita cosa può essere inserito in una cella: menu a tendina, intervalli numerici, date consentite, valori obbligatori.', cards:[{h:'Liste',p:'Scegli categoria da un elenco invece di scriverla ogni volta.'},{h:'Numeri',p:'Accetta solo quantità maggiori di zero o sconti tra 0% e 100%.'},{h:'Date',p:'Blocca date fuori periodo o scadenze precedenti all’inizio.'},{h:'Messaggi',p:'Spiega all’utente cosa inserire e perché.'}]},
      {tag:'Formattazione', title:'Formattazione condizionale come controllo visivo', lead:'Colori e icone devono aiutare a leggere lo stato dei dati, non decorare. Usali per evidenziare eccezioni, scadenze e valori fuori soglia.', cards:[{h:'Scadenze',p:'Rosso se la data è passata, giallo se manca meno di una settimana.'},{h:'Budget',p:'Evidenzia righe che superano il costo previsto.'},{h:'Duplicati',p:'Trova codici cliente o numeri fattura ripetuti.'},{h:'Priorità',p:'Usa icone o scale solo quando migliorano la scansione.'}]},
      {tag:'Range', title:'Intervalli nominati e tabelle strutturate', lead:'Dare un nome ai dati riduce errori e rende le formule leggibili. Una formula che usa Prezzi[Listino] è più chiara di una formula piena di coordinate.', cards:[{h:'Nomi',p:'IVA, Listino, Clienti, SogliaMinima: nomi brevi e descrittivi.'},{h:'Tabelle',p:'Le tabelle si espandono quando aggiungi righe e mantengono formule coerenti.'},{h:'Manutenzione',p:'Quando cambia il range, aggiorni il nome o la tabella, non cento formule.'}]},
      {tag:'Errori', title:'Errori comuni e come leggerli', layout:'table', lead:'Gli errori non sono tutti uguali: alcuni indicano dati mancanti, altri sintassi sbagliata, altri riferimenti rotti.', rows:[['Errore','Significato','Intervento'],['#DIV/0!','Divisione per zero','Controlla denominatore o usa SE.ERRORE'],['#N/D','Valore non trovato','Verifica chiave di ricerca'],['#VALORE!','Tipo dato errato','Numero come testo o argomento sbagliato'],['#RIF!','Riferimento eliminato','Ripristina celle o aggiorna formula'],['#NOME?','Funzione o nome non riconosciuto','Controlla lingua e spelling']]},
      {tag:'Import', title:'Importare CSV senza distruggere i dati', lead:'I CSV sembrano semplici ma possono cambiare separatori, accenti, date e zeri iniziali. Un import controllato evita problemi invisibili.', cards:[{h:'Separatore',p:'Virgola, punto e virgola o tabulazione: dipende dalla provenienza.'},{h:'Codifica',p:'UTF-8 evita caratteri strani in nomi e descrizioni.'},{h:'Date',p:'01/02/2026 può essere 1 febbraio o 2 gennaio secondo il formato.'},{h:'Codici',p:'CAP e SKU devono restare testo per conservare zeri iniziali.'}]},
      {tag:'Protezione', title:'Proteggere formule e celle sensibili', lead:'Un foglio condiviso deve distinguere tra celle da compilare e celle da non toccare. Protezioni leggere evitano modifiche accidentali.', cards:[{h:'Celle input',p:'Colori e istruzioni indicano dove scrivere.'},{h:'Formule bloccate',p:'Blocca colonne calcolate e fogli di appoggio.'},{h:'Permessi',p:'In cloud assegna modifica, commento o sola lettura secondo il ruolo.'}]},
      {tag:'Collaborazione', title:'Lavorare in cloud senza perdere controllo', lead:'Excel online e Google Sheets permettono modifiche simultanee, commenti, cronologia e condivisione. Serve però una regola di lavoro.', cards:[{h:'Una fonte ufficiale',p:'Evita copie “finale2_definitivo”. Link condiviso, versione unica.'},{h:'Commenti',p:'Le domande stanno nei commenti, non in celle sparse.'},{h:'Cronologia',p:'Recupera versioni precedenti e capisci chi ha modificato cosa.'},{h:'Proprietario',p:'Un responsabile decide struttura e cambiamenti importanti.'}]},
      {tag:'Dashboard', title:'Dal foglio al cruscotto', lead:'Una dashboard mostra pochi indicatori chiave, aggiornati e leggibili. Non è una copia colorata della tabella sorgente.', cards:[{h:'KPI',p:'Scegli 3–6 numeri davvero decisivi.'},{h:'Filtri',p:'Periodo, sede, categoria, responsabile.'},{h:'Grafici',p:'Linee per trend, barre per confronti, torte solo per composizioni semplici.'},{h:'Aggiornamento',p:'Stabilisci quando e come i dati vengono aggiornati.'}]},
      {tag:'Metodo', title:'Checklist prima di consegnare un foglio', lead:'Prima di inviare un file, controlla struttura, formule, filtri, protezioni e leggibilità. Un foglio professionale deve resistere all’uso reale.', cards:[{h:'Dati',p:'Niente righe vuote, duplicati imprevisti o formati misti.'},{h:'Formule',p:'Controlla errori e riferimenti assoluti/relativi.'},{h:'Uso',p:'Istruzioni chiare per chi inserisce dati.'},{h:'Output',p:'Stampa, PDF e visualizzazione su schermo verificati.'}]},
    ],
  };

  const query = {
    file: 'su03-12-query-fogli-calcolo.html',
    pageTitle: 'Suite Ufficio · SU03.12 — Query nei fogli di calcolo',
    kicker: 'Fogli di calcolo · SU03.12',
    title: 'Query nei',
    accent: 'fogli',
    lead: 'Estrarre, filtrare, ordinare, raggruppare e combinare dati con QUERY di Google Sheets, Power Query di Excel e logica SQL di base.',
    code: 'SU03.12',
    topic: 'Query',
    flow: 'tabella sorgente\n  ↓ condizioni\nquery\n  ↓ risultato\nvista aggiornata',
    closeTitle: 'Una query è una domanda ripetibile fatta ai dati.',
    closeLead: 'Quando la domanda è scritta bene, il report si aggiorna invece di essere ricostruito a mano.',
    slides: [
      {tag:'Concetto', title:'Che cos’è una query', lead:'Una query è una richiesta strutturata: prendi questi dati, tieni solo certe righe, scegli certe colonne, ordina o raggruppa il risultato.', cards:[{h:'Non copia',p:'Il risultato dipende dalla sorgente e può aggiornarsi.'},{h:'Non formula singola',p:'Lavora su tabelle intere, non solo su una cella.'},{h:'Domanda esplicita',p:'“Mostrami le vendite 2026 per categoria sopra 500 euro”.'}]},
      {tag:'SQL base', title:'SELECT, WHERE, ORDER BY', layout:'code', lead:'La sintassi di molte query deriva da SQL: SELECT sceglie colonne, WHERE filtra righe, ORDER BY ordina.', code:'SELECT A, B, E\nWHERE E > 500\nORDER BY E DESC', note:{h:'Lettura',p:'Scegli colonne A, B, E; tieni solo righe con E maggiore di 500; ordina dal valore più alto.'}},
      {tag:'Sheets', title:'La funzione QUERY in Google Sheets', layout:'code', lead:'In Google Sheets, QUERY prende un intervallo e una stringa di interrogazione. È molto potente per creare report dinamici.', code:'=QUERY(A1:E200; "select A, B, E where E > 500 order by E desc"; 1)', note:{h:'Parametro finale',p:'Il numero 1 indica che la prima riga contiene intestazioni.'}},
      {tag:'Colonne', title:'Scegliere solo le colonne utili', lead:'Una query può ridurre una tabella larga a una vista essenziale. Meno colonne significa meno distrazione e meno rischio di modifiche sbagliate.', cards:[{h:'Report clienti',p:'Nome, telefono, ultimo appuntamento, stato.'},{h:'Report vendite',p:'Data, categoria, importo, margine.'},{h:'Report magazzino',p:'SKU, prodotto, scorta, punto di riordino.'}]},
      {tag:'Filtri', title:'Condizioni numeriche, testuali e date', layout:'code', lead:'Le condizioni cambiano secondo il tipo di dato. Numeri, testo e date hanno regole diverse.', code:'where E >= 100\nwhere B = "Roma"\nwhere C contains "promo"\nwhere A >= date "2026-01-01"', note:{h:'Attenzione',p:'Le date in QUERY usano spesso il formato ISO anno-mese-giorno.'}},
      {tag:'Ordinamento', title:'Ordinare e limitare i risultati', layout:'code', lead:'ORDER BY mette in alto ciò che conta; LIMIT evita liste troppo lunghe quando servono solo i primi risultati.', code:'select A, B, E\nwhere E is not null\norder by E desc\nlimit 10'},
      {tag:'Raggruppare', title:'GROUP BY: riassumere per categoria', layout:'code', lead:'GROUP BY aggrega molte righe in un riepilogo, simile a una pivot ma scritto come domanda.', code:'select B, sum(E), count(A)\ngroup by B\nlabel sum(E) "Totale", count(A) "Righe"', note:{h:'Uso tipico',p:'Totale vendite per servizio, ore per progetto, spese per categoria.'}},
      {tag:'Pivot query', title:'PIVOT nella QUERY di Sheets', layout:'code', lead:'La clausola PIVOT trasforma valori di una colonna in intestazioni, creando una tabella incrociata.', code:'select B, sum(E)\ngroup by B\npivot C', note:{h:'Esempio',p:'Righe = servizio, colonne = mese, valori = incasso.'}},
      {tag:'Power Query', title:'Power Query in Excel', lead:'Power Query importa, pulisce e trasforma dati da file, cartelle, web, database e fogli. Le trasformazioni vengono salvate e ripetute con Aggiorna.', cards:[{h:'Importa',p:'CSV, Excel, cartelle, web, database.'},{h:'Trasforma',p:'Rimuovi colonne, cambia tipi, dividi testo, unisci tabelle.'},{h:'Carica',p:'Risultato in tabella, pivot o modello dati.'},{h:'Aggiorna',p:'Ripete i passaggi sui nuovi dati.'}]},
      {tag:'Join', title:'Unire tabelle con una chiave', lead:'Una query può combinare due tabelle quando condividono una chiave: codice cliente, SKU prodotto, ID ordine.', cards:[{h:'Chiave primaria',p:'Identifica una riga in modo univoco.'},{h:'Lookup',p:'Aggiungi informazioni da una tabella anagrafica.'},{h:'Errori',p:'Chiavi duplicate o mancanti generano risultati sbagliati.'}]},
      {tag:'Pulizia', title:'Query come pipeline di pulizia', lead:'Invece di correggere manualmente ogni esportazione, costruisci una pipeline: import, pulizia, filtro, trasformazione, report.', cards:[{h:'Trim',p:'Rimuovi spazi iniziali e finali.'},{h:'Normalize',p:'Uniforma maiuscole, categorie e formati.'},{h:'Filter',p:'Escludi righe vuote, test o annullate.'},{h:'Cast',p:'Converti importi e date nel tipo corretto.'}]},
      {tag:'Debug', title:'Come controllare una query', lead:'Le query vanno testate a piccoli passi: prima selezione, poi filtro, poi ordinamento, poi aggregazione. Così l’errore resta localizzabile.', cards:[{h:'Parti semplice',p:'Verifica che l’intervallo sia giusto.'},{h:'Aggiungi condizioni',p:'Una clausola alla volta.'},{h:'Conta righe',p:'Controlla se il numero di risultati ha senso.'},{h:'Confronta manualmente',p:'Verifica un piccolo campione a mano.'}]},
    ],
  };

  const macros = {
    file: 'su03-13-macro-fogli-calcolo.html',
    pageTitle: 'Suite Ufficio · SU03.13 — Macro nei fogli di calcolo',
    kicker: 'Fogli di calcolo · SU03.13',
    title: 'Macro nei',
    accent: 'fogli',
    lead: 'Automatizzare azioni ripetitive in Excel e Google Sheets: registrazione, sicurezza, pulsanti, limiti e progettazione di procedure affidabili.',
    code: 'SU03.13',
    topic: 'Macro',
    flow: 'azione manuale\n  ↓ registra\nmacro\n  ↓ ripeti\nprocedura automatica',
    closeTitle: 'Una macro utile elimina lavoro ripetitivo senza nascondere il controllo.',
    closeLead: 'Prima progetta la procedura, poi automatizzala; non automatizzare confusione.',
    slides: [
      {tag:'Definizione', title:'Che cos’è una macro', lead:'Una macro è una sequenza di azioni salvata e rieseguita: formattare report, pulire dati, esportare PDF, creare fogli o inviare riepiloghi.', cards:[{h:'Ripetizione',p:'Ha senso quando fai spesso gli stessi passaggi.'},{h:'Coerenza',p:'Riduce differenze tra file prodotti da persone diverse.'},{h:'Velocità',p:'Trasforma minuti di click in un comando.'}]},
      {tag:'Quando usarle', title:'Automatizzare solo processi stabili', lead:'Una macro funziona bene quando la procedura è chiara. Se cambi regola ogni volta, prima serve stabilizzare il flusso.', cards:[{h:'Buon caso',p:'Ogni lunedì importi CSV, pulisci colonne, generi report.'},{h:'Cattivo caso',p:'Ogni file ha struttura diversa e decisioni manuali non documentate.'},{h:'Regola',p:'Se non riesci a scrivere i passaggi, non sei pronto per la macro.'}]},
      {tag:'Registratore', title:'Registrare una macro', lead:'Excel e Google Sheets permettono di registrare azioni. È il modo più accessibile per iniziare, ma il codice generato va letto e pulito.', cards:[{h:'Esegui',p:'Fai i passaggi una volta mentre il registratore è attivo.'},{h:'Salva',p:'Dai un nome chiaro e assegna scorciatoia se serve.'},{h:'Testa',p:'Prova su una copia del file, non sull’unico originale.'}]},
      {tag:'Esempio', title:'Macro di formattazione report', layout:'code', lead:'Una macro semplice può uniformare intestazioni, larghezze, filtri e formato numerico.', code:'1. Seleziona riga intestazioni\n2. Grassetto + sfondo\n3. Attiva filtro\n4. Adatta larghezza colonne\n5. Formatta importi in euro\n6. Blocca prima riga'},
      {tag:'Riferimenti', title:'Relativo o assoluto', lead:'Una macro può ricordare celle esatte o movimenti relativi. La scelta cambia completamente il comportamento quando la esegui altrove.', cards:[{h:'Assoluto',p:'Agisce sempre su A1:E20. Utile per template fissi.'},{h:'Relativo',p:'Parte dalla cella selezionata. Utile per azioni ripetute in zone diverse.'},{h:'Rischio',p:'Se il riferimento è sbagliato, la macro modifica celle inattese.'}]},
      {tag:'Sicurezza', title:'Macro e rischio sicurezza', lead:'Le macro possono eseguire codice. Per questo molti sistemi le bloccano o chiedono conferma. Non abilitare macro in file ricevuti da fonti non affidabili.', cards:[{h:'File esterni',p:'Diffida di allegati che chiedono “abilita contenuto”.'},{h:'Firma',p:'In contesti aziendali usa macro firmate o da fonti controllate.'},{h:'Principio',p:'Una macro ha accesso al documento e può alterare dati.'}]},
      {tag:'Pulsanti', title:'Assegnare macro a pulsanti e menu', lead:'Un pulsante riduce errori: l’utente non deve cercare la macro, preme “Aggiorna report” o “Esporta PDF”.', cards:[{h:'Etichetta',p:'Usa verbi chiari: Aggiorna, Pulisci, Esporta, Invia.'},{h:'Posizione',p:'Metti i pulsanti in un foglio Dashboard o Comandi.'},{h:'Feedback',p:'Mostra un messaggio quando l’azione termina.'}]},
      {tag:'Input', title:'Macro con parametri e celle di controllo', lead:'Una macro può leggere valori da celle dedicate: mese, sede, responsabile, cartella di output. Così resta flessibile senza modificare codice.', cards:[{h:'Celle input',p:'B2 = mese, B3 = sede, B4 = formato export.'},{h:'Validazione',p:'Menu a tendina evita parametri impossibili.'},{h:'Log',p:'Scrivi quando è stata eseguita e da chi.'}]},
      {tag:'Errori', title:'Gestire errori senza bloccare il lavoro', lead:'Una macro professionale controlla prerequisiti e segnala problemi comprensibili: file mancante, foglio non trovato, colonne rinominate.', cards:[{h:'Controlli iniziali',p:'Esistono i fogli richiesti? Le colonne hanno nome corretto?'},{h:'Messaggi',p:'Errore chiaro, non codice incomprensibile.'},{h:'Stop sicuro',p:'Se mancano dati, fermati prima di modificare il file.'}]},
      {tag:'Versioni', title:'Testare su copie e mantenere versioni', lead:'Una macro sbagliata può modificare molte celle in un attimo. Lavora su copie, conserva backup e documenta cosa cambia.', cards:[{h:'Copia test',p:'Prima prova su un duplicato del file.'},{h:'Backup',p:'Mantieni una versione prima della macro.'},{h:'Change log',p:'Annota data, autore e modifica della macro.'}]},
      {tag:'Limiti', title:'Quando una macro non basta', lead:'Se l’automazione deve collegarsi a servizi esterni, API, email o database, potresti aver bisogno di VBA, Apps Script, Power Query o un’app dedicata.', cards:[{h:'Macro registrata',p:'Ottima per click ripetitivi.'},{h:'Codice',p:'Serve per condizioni, cicli, controlli complessi.'},{h:'Sistema',p:'Se coinvolge più persone e dati critici, serve progettazione.'}]},
      {tag:'Metodo', title:'Checklist di una macro affidabile', lead:'Una buona macro ha uno scopo chiaro, input controllati, output verificabile e istruzioni per l’utente.', cards:[{h:'Nome',p:'AggiornaReportMensile, non Macro1.'},{h:'Scopo',p:'Una macro, una responsabilità.'},{h:'Controlli',p:'Verifica dati prima di agire.'},{h:'Documentazione',p:'Spiega cosa fa e cosa non deve essere cambiato.'}]},
    ],
  };

  return [spreadsheet, query, macros, vbaDeck(), gasDeck()];
}

function vbaDeck() {
  const topics = [
    ['Introduzione a VBA','VBA è il linguaggio integrato in Excel e nelle applicazioni Office. Permette di controllare fogli, celle, file, finestre e procedure ripetitive.'],
    ['Editor VBA e moduli','Il codice vive nell’editor VBA: moduli standard, oggetti foglio, ThisWorkbook e finestre Immediate/Watch per controllare l’esecuzione.'],
    ['Sub e Function','Una Sub esegue azioni; una Function restituisce un valore. In Excel puoi usare funzioni personalizzate anche dentro celle.'],
    ['Variabili e tipi','Dim nome As String, Dim totale As Double, Dim riga As Long: dichiarare tipi rende il codice più chiaro e meno fragile.'],
    ['Option Explicit','Obbliga a dichiarare le variabili. È una delle abitudini più importanti per evitare errori di battitura difficili da trovare.'],
    ['Range e Cells','Range("A1") è leggibile, Cells(riga, colonna) è utile nei cicli. Conoscere entrambi è essenziale per automatizzare fogli.'],
    ['With...End With','Evita ripetizioni quando lavori sullo stesso oggetto: foglio, range, grafico o tabella. Il codice diventa più compatto.'],
    ['If, ElseIf, Else','Le condizioni decidono quali istruzioni eseguire: controllare valori mancanti, soglie, stati e casi particolari.'],
    ['Select Case','Quando ci sono molte alternative, Select Case è spesso più chiaro di una lunga catena di If.'],
    ['For...Next','Il ciclo For ripete azioni un numero noto di volte: scorrere righe, colonne, fogli o file numerati.'],
    ['For Each','For Each è naturale quando attraversi collezioni: ogni cella in un range, ogni foglio in una cartella, ogni grafico.'],
    ['Do While e Do Until','Servono quando non sai quante iterazioni servono: continua finché trovi righe piene o finché una condizione diventa vera.'],
    ['Trovare ultima riga','Una macro robusta non presume che i dati finiscano sempre alla stessa riga. Calcola dinamicamente l’ultima riga usata.'],
    ['Tabelle Excel ListObject','Le tabelle strutturate sono più affidabili dei range fissi: hanno nomi, colonne, righe dati e si espandono.'],
    ['Messaggi e input','MsgBox comunica con l’utente; InputBox raccoglie un valore rapido. Non abusarne nei processi automatici.'],
    ['Gestione errori','On Error non deve nascondere problemi: serve a intercettarli, mostrare messaggi utili e uscire in modo controllato.'],
    ['Performance','ScreenUpdating, Calculation e lettura in array possono rendere una macro molto più veloce su migliaia di righe.'],
    ['File e cartelle','VBA può aprire cartelle, scorrere file, importare dati, salvare copie e produrre PDF.'],
    ['Eventi del workbook','Worksheet_Change, Workbook_Open e altri eventi eseguono codice quando succede qualcosa nel file.'],
    ['UserForm','Le maschere raccolgono input in modo guidato: campi, pulsanti, menu a tendina, controlli obbligatori.'],
    ['Sicurezza e distribuzione','Macro firmate, cartelle attendibili, file .xlsm e policy aziendali determinano dove il codice può girare.'],
    ['Progetto finale VBA','Un buon progetto finale importa dati, li valida, aggiorna una tabella, genera report e registra un log.'],
  ];
  return longCodeDeck('su03-14-vba.html', 'Suite Ufficio · SU03.14 — VBA per Excel', 'Automazione · SU03.14', 'VBA per', 'Excel', 'Imparare le basi di Visual Basic for Applications per automatizzare Excel: celle, cicli, condizioni, file, eventi, errori e procedure professionali.', 'SU03.14', 'VBA', 'Excel\n  ↓ oggetti\nVBA\n  ↓ automazione\nreport e procedure', topics, 'VBA controlla Excel come un’app programmabile.', 'Con pochi costrutti solidi puoi trasformare un file ripetitivo in uno strumento di lavoro.');
}

function gasDeck() {
  const topics = [
    ['Che cos’è Apps Script','Google Apps Script è JavaScript nel cloud Google: automatizza Sheets, Docs, Drive, Gmail, Calendar e servizi esterni.'],
    ['Editor e progetto','Ogni progetto ha file .gs, manifest, trigger e autorizzazioni. Il codice vive online ed è legato a un account Google.'],
    ['JavaScript essenziale','Variabili let/const, funzioni, array, oggetti e template string sono la base per scrivere script leggibili.'],
    ['SpreadsheetApp','SpreadsheetApp apre file, fogli, range e valori. È l’API centrale per lavorare con Google Sheets.'],
    ['getValues e setValues','Leggere e scrivere in blocco è molto più veloce che cella per cella: usa array bidimensionali.'],
    ['Range e fogli','getSheetByName, getRange, appendRow, clearContent e setBackground sono operazioni quotidiane.'],
    ['Menu personalizzati','onOpen può aggiungere un menu al foglio: Aggiorna report, Importa dati, Invia email.'],
    ['Trigger semplici','onOpen e onEdit reagiscono ad apertura e modifica. Sono comodi ma hanno limiti di autorizzazione.'],
    ['Trigger installabili','Trigger a tempo o su evento eseguono script con autorizzazioni più forti: report giornalieri, pulizia notturna, invii programmati.'],
    ['Autorizzazioni','La prima esecuzione chiede permessi. Spiega sempre perché uno script vuole accedere a Gmail, Drive o Sheets.'],
    ['GmailApp','Puoi inviare email automatiche, reminder e report. Attenzione a quote, privacy e destinatari.'],
    ['DriveApp','DriveApp crea cartelle, cerca file, copia template e salva PDF o CSV generati dallo script.'],
    ['UrlFetchApp','Permette di chiamare API esterne: CRM, gestionali, servizi web, endpoint JSON.'],
    ['JSON e oggetti','Le API parlano spesso JSON. Devi saper leggere proprietà, array e oggetti annidati.'],
    ['HTML Service','Apps Script può mostrare sidebar, dialoghi e piccole web app con HTML, CSS e JavaScript client.'],
    ['Web app','Pubblicare come web app consente moduli personalizzati, dashboard e endpoint semplici.'],
    ['PropertiesService','Salva configurazioni persistenti: ID cartelle, email responsabili, ultimo aggiornamento, token.'],
    ['LockService','Evita che due esecuzioni simultanee modifichino gli stessi dati nello stesso momento.'],
    ['Logger e debug','Logger.log, console e Execution transcript aiutano a capire cosa succede durante l’esecuzione.'],
    ['Quote e limiti','Apps Script ha limiti giornalieri e temporali. Gli script professionali devono rispettarli.'],
    ['Deployment e versioni','Distribuzioni, versioni e autorizzazioni determinano chi può usare lo script e quale codice gira.'],
    ['Progetto finale Apps Script','Un progetto completo legge un foglio, filtra righe, genera PDF, invia email e scrive un log.'],
  ];
  return longCodeDeck('su03-15-google-apps-script.html', 'Suite Ufficio · SU03.15 — Google Apps Script', 'Automazione · SU03.15', 'Google Apps', 'Script', 'Automatizzare Google Workspace con JavaScript: Sheets, Drive, Gmail, trigger, web app, autorizzazioni, API e procedure cloud.', 'SU03.15', 'Apps Script', 'Sheets\n  ↓ Apps Script\nDrive / Gmail / API\n  ↓ trigger\nworkflow cloud', topics, 'Apps Script collega i fogli agli strumenti Google.', 'È ideale quando il lavoro parte da Sheets ma deve produrre email, file, report e azioni programmate.');
}

function longCodeDeck(file, pageTitle, kicker, title, accent, lead, code, topic, flow, topics, closeTitle, closeLead) {
  const slides = topics.map(([title, lead], i) => {
    const examples = [
      `Sub Esempio${i + 1}()\n  ' ${title}\n  Debug.Print "passo ${i + 1}"\nEnd Sub`,
      `function esempio${i + 1}() {\n  // ${title}\n  console.log('passo ${i + 1}');\n}`,
    ];
    return {
      tag: i < 3 ? 'Fondamenti' : i < 10 ? 'Costrutti' : i < 17 ? 'Automazione' : 'Produzione',
      title,
      lead,
      layout: i % 3 === 1 ? 'code' : undefined,
      code: i % 3 === 1 ? examples[file.includes('google') ? 1 : 0] : undefined,
      cards: i % 3 === 1 ? undefined : [
        {h:'Idea chiave', p:lead},
        {h:'Quando serve', p:'Usalo quando il passaggio diventa ripetitivo, rischioso o troppo lento da fare a mano.'},
        {h:'Errore comune', p:'Scrivere codice prima di chiarire input, output e casi limite.'},
      ],
      note: i % 5 === 0 ? {h:'Esercizio', p:'Prova a descrivere il caso reale del tuo lavoro in tre passaggi prima di scrivere codice.'} : undefined,
      short:title,
      summary:lead,
    };
  });
  return {file, pageTitle, kicker, title, accent, lead, code, topic, flow, closeTitle, closeLead, slides};
}

function addOperatorBlock() {
  const file = 'pr01-04-fondamenti-programmazione.html';
  if (!exists(file)) return;
  let html = read(file);
  if (html.includes('Operatori aritmetici: somma, sottrazione, prodotto')) return;
  const blockSlides = [
    ['Aritmetici', 'Operatori aritmetici: somma, sottrazione, prodotto', 'Gli operatori aritmetici trasformano numeri in altri numeri. Sono la base di calcoli, statistiche, coordinate, prezzi, tempi e quantità.', 'prezzo = 12\nquantita = 3\ntotale = prezzo * quantita\nsconto = totale * 0.10\nfinale = totale - sconto'],
    ['Aritmetici', 'Divisione, resto e divisione intera', 'La divisione produce un quoziente; il resto dice cosa avanza. Sono utili per turni, gruppi, pagine, pari/dispari e distribuzioni.', '17 / 5   → 3.4\n17 // 5  → 3\n17 % 5   → 2\nnumero % 2 == 0  → pari'],
    ['Aritmetici', 'Potenza, radici e precedenza', 'La precedenza decide cosa viene calcolato prima. Le parentesi rendono la formula leggibile e impediscono ambiguità.', '2 + 3 * 4      → 14\n(2 + 3) * 4    → 20\n2 ** 3         → 8\narea = base * altezza'],
    ['Aritmetici', 'Incrementi, decrementi e accumuli', 'Molti algoritmi aggiornano una variabile a partire dal suo valore precedente: contatori, totali, medie progressive, inventari.', 'contatore = contatore + 1\ntotale = totale + prezzo\nscorta = scorta - venduti\nsaldo += versamento'],
    ['Aritmetici', 'Esempi pratici di formule numeriche', 'La stessa logica appare in gestionali, fogli di calcolo e app: calcolo prezzo, IVA, durata, percentuali, punteggi.', 'iva = imponibile * 0.22\nlordo = imponibile + iva\npercentuale = parte / totale * 100\nmedia = somma / numero_valori'],
    ['Logici', 'Operatori di confronto', 'I confronti non restituiscono numeri ma valori booleani: vero o falso. Sono la porta d’ingresso di condizioni e filtri.', 'eta >= 18\nprezzo < budget\nnome == "Luca"\nstato != "annullato"\nscorta <= soglia'],
    ['Logici', 'AND: tutte le condizioni devono essere vere', 'AND serve quando un’azione richiede più requisiti contemporaneamente.', 'eta >= 18 and documento_valido\nprezzo > 0 and quantita > 0\nutente_attivo and password_corretta\nscorta > 0 and ordine_pagato'],
    ['Logici', 'OR: basta una condizione vera', 'OR serve per alternative equivalenti: più strade portano allo stesso risultato.', 'ruolo == "admin" or ruolo == "editor"\npagamento == "carta" or pagamento == "paypal"\ngiorno == "sabato" or giorno == "domenica"\nsconto_cliente or coupon_valido'],
    ['Logici', 'NOT: invertire una condizione', 'NOT rende esplicito il contrario. È utile per controllare assenze, blocchi e casi non consentiti.', 'not trovato\nnot utente_bloccato\nnot email_verificata\nif not lista_vuota:\n    elabora()'],
    ['Logici', 'Combinare condizioni con parentesi', 'Quando AND e OR convivono, le parentesi sono essenziali. Rendono chiaro cosa appartiene a quale parte della decisione.', '(eta >= 18 and documento_valido) or autorizzazione_genitore\n(prezzo > 0 and quantita > 0) and not annullato\nruolo == "admin" or (ruolo == "staff" and turno_attivo)'],
    ['Assegnazione', 'Assegnazione semplice: il segno =', 'In programmazione = non significa “uguale” matematico: significa prendi il valore a destra e salvalo nel nome a sinistra.', 'totale = 0\nnome = "Giulia"\nattivo = True\nprezzo_finale = prezzo - sconto'],
    ['Assegnazione', 'Assegnazioni composte', 'Gli operatori composti aggiornano una variabile usando il suo valore precedente. Sono abbreviazioni molto comuni.', 'x += 1   # x = x + 1\nx -= 2   # x = x - 2\nx *= 3   # x = x * 3\nx /= 4   # x = x / 4\nx %= 2   # x = x % 2'],
    ['Simboli', 'Simboli fondamentali nella sintassi', 'Ogni linguaggio usa simboli per separare blocchi, argomenti, liste, stringhe e commenti. Riconoscerli aiuta a leggere codice nuovo.', '()  chiamata o raggruppamento\n[]  liste o indici\n{}  blocchi o dizionari\n,   separa argomenti\n:   introduce blocchi in Python\n#   commento in Python'],
    ['Simboli', 'Uguale, confronto e identità', 'Molti bug nascono dalla confusione tra assegnare, confrontare e controllare identità o equivalenza.', 'x = 5      # assegna\nx == 5     # confronta valore\nx != 5     # diverso\nx is None  # identità/speciale in Python'],
    ['Sintesi', 'Scegliere l’operatore giusto', 'Prima chiediti che tipo di risultato vuoi: numero, vero/falso, aggiornamento di variabile o struttura sintattica.', 'numero → + - * / // % **\nbooleano → == != > < >= <= and or not\naggiornamento → = += -= *= /=\nstruttura → () [] {} , : .'],
  ].map(([tag, title, lead, code]) => `<section class="slide no-top-label"><h2 class="h2">${title}</h2><p class="lead">${lead}</p><div class="code">${esc(code)}</div><div class="num"></div></section>`).join('\n');

  html = html.replace(/<section class="slide no-top-label"><h2 class="h2">Aritmetici, relazionali e logici<\/h2>[\s\S]*?<div class="num"><\/div><\/section>/, (match) => `${match}\n${blockSlides}`);
  html = html.replace(/<span class="chip">22 slide<\/span>/, '<span class="chip">37 slide</span>');
  write(file, html);

  if (exists('pr01-04-fondamenti-programmazione.txt')) {
    let txt = read('pr01-04-fondamenti-programmazione.txt');
    if (!txt.includes('Operatori aritmetici, logici, assegnazione e simboli')) {
      txt += '\n\nBlocco aggiunto: Operatori aritmetici, logici, assegnazione e simboli\n- Somma, sottrazione, prodotto, divisione, resto, potenza, precedenza.\n- Confronti, AND, OR, NOT, parentesi logiche.\n- Assegnazione semplice e composta.\n- Simboli comuni della sintassi di programmazione.\n';
      write('pr01-04-fondamenti-programmazione.txt', txt);
    }
  }
}

function textFromHtml(fragment) {
  return fragment
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(h1|h2|h3|p|div|span|li|section)>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

function syncPr04Text() {
  const file = 'pr01-04-fondamenti-programmazione.html';
  if (!exists(file)) return;
  const html = read(file);
  const slides = [...html.matchAll(/<section class="slide[^"]*"[^>]*>([\s\S]*?)<\/section>/g)]
    .map((match, index) => `--- Slide ${index + 1} ---\n${textFromHtml(match[1])}`);
  if (!slides.length) return;
  write(
    'pr01-04-fondamenti-programmazione.txt',
    `Programmare - PR04 - Fondamenti di programmazione\n${'='.repeat(53)}\n\n${slides.join('\n\n')}\n`
  );
}

function updateIndex() {
  let html = read('00-indice.html');
  if (!html.includes('su03-11-fogli-calcolo-avanzati.html')) {
    const cards = [
      ['su03-11-fogli-calcolo-avanzati.html','SU03.11','Fogli di calcolo avanzati','Struttura dati, convalida, formattazione condizionale, import CSV, protezioni, collaborazione, dashboard e checklist per fogli professionali.'],
      ['su03-12-query-fogli-calcolo.html','SU03.12','Query nei fogli di calcolo','QUERY in Google Sheets, logica SQL, SELECT, WHERE, ORDER BY, GROUP BY, PIVOT, Power Query, join, pulizia dati e debug.'],
      ['su03-13-macro-fogli-calcolo.html','SU03.13','Macro nei fogli di calcolo','Registrare macro, automatizzare report, riferimenti relativi e assoluti, pulsanti, sicurezza, input, errori, test e limiti.'],
      ['su03-14-vba.html','SU03.14','VBA per Excel','Visual Basic for Applications: editor, Sub e Function, variabili, Range, cicli, condizioni, errori, file, eventi, UserForm e distribuzione.'],
      ['su03-15-google-apps-script.html','SU03.15','Google Apps Script','Automazione Google Workspace con JavaScript: Sheets, Drive, Gmail, trigger, autorizzazioni, web app, API, quote e deployment.'],
    ].map(([href,num,title,desc]) => `
      <a class="module-card inf" href="${href}">
        <div class="card-num">${num}</div>
        <div class="card-body">
          <div class="card-tag">SUITE UFFICIO · ${num}</div>
          <div class="card-title">${title}</div>
          <div class="card-difficulty" aria-label="Difficoltà 4 su 5">★★★★☆</div>
          <div class="card-desc">${desc}</div>
        </div>
        <div class="card-arrow">→</div>
      </a>
`).join('');
    html = html.replace(/(\s*<a class="module-card inf" href="su04-01-presentazioni\.html">)/, `${cards}$1`);
  }
  html = html
    .replace(/href="pr00-introduzione-programmazione\.html"/g, 'href="pr01-01-introduzione-programmazione.html"')
    .replace(/href="pr00-dati-codifica\.html"/g, 'href="pr01-02-dati-codifica.html"')
    .replace(/href="pr00-algoritmi\.html"/g, 'href="pr01-03-algoritmi.html"')
    .replace(/href="pr00-fondamenti-programmazione\.html"/g, 'href="pr01-04-fondamenti-programmazione.html"')
    .replace(/<div class="card-num">PR00\.01<\/div>/g, '<div class="card-num">PR01.01</div>')
    .replace(/<div class="card-num">PR00\.02<\/div>/g, '<div class="card-num">PR01.02</div>')
    .replace(/<div class="card-num">PR00\.03<\/div>/g, '<div class="card-num">PR01.03</div>')
    .replace(/<div class="card-num">PR00\.04<\/div>/g, '<div class="card-num">PR01.04</div>')
    .replace(/PROGRAMMARE · PR00\.01/g, 'PROGRAMMARE · PR01.01')
    .replace(/PROGRAMMARE · PR00\.02/g, 'PROGRAMMARE · PR01.02')
    .replace(/PROGRAMMARE · PR00\.03/g, 'PROGRAMMARE · PR01.03')
    .replace(/PROGRAMMARE · PR00\.04/g, 'PROGRAMMARE · PR01.04');
  write('00-indice.html', html);
}

renumberProgramming();
for (const deck of deckDefinitions()) renderDeck(deck);
addOperatorBlock();
syncPr04Text();
updateIndex();
