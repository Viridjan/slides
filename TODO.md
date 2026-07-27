<!-- Proprietà intellettuale di Francesco Antonio Binetti -->
# TODO

Stato: tre filoni operativi aperti; contenuti del corso riconciliati con i
blocchi attuali.

Questo file era nato su una versione precedente del corso, con nomi come
`inf*`, `web*`, `sec*` e `sma*`. Quei file non esistono piu nella struttura
pubblicata: i contenuti sono stati migrati nei blocchi attuali `hs`, `rw`,
`sd`, `sm`, `su`, `ia`, `pr` e `ms`.

## TODO aperti

### Completare la revisione editoriale dell'inventario argomenti

`inventario-argomenti-slide.csv` contiene la coda puntuale generata per la
revisione dei contenuti. Il CSV è la fonte operativa slide per slide e non va
modificato a mano. Aggiornamento del 20 luglio 2026: Project Management,
Contenuti digitali e Modellazione e Stampa 3D sono state passate in rassegna
per intero (contenuto letto, correttezza e collocazione verificate, ogni
slide interna taggata) — restano aperte le altre sette aree.

Durante la revisione di questi tre gruppi è emerso che gran parte delle righe
`usare il blocco principale come riferimento` erano falsi positivi del
generatore: frasi brevi da card/bullet ("traduzione automatica",
"aggiornamenti automatici", "store ufficiali", "dati di addestramento",
"dentro il progetto") riusate in contesti realmente diversi o come
progressione tra deck della stessa mini-serie, non contenuto duplicato. Sono
state aggiunte a `contextDependent`/`structuralLabels` nel generatore
(`scripts/build-slide-topic-inventory.js`) — verificare caso per caso, non
fidarsi del solo conteggio, prima di aggiungere un rimando o tagliare
contenuto nelle aree ancora aperte. Un cluster **era invece reale** (hs03#10 /
hs04#8, "Software libero vs open source vs proprietario", quasi identico
parola per parola): spiegazione completa tenuta in HS04, hs03 ridotto ad
applicazione locale con rimando.

Il generatore (`scripts/build-slide-topic-inventory.js`) esclude ora dal CSV
sia le slide di apertura/chiusura di ogni deck (non taggabili per regola) sia
quelle già `verificata`: il file elenca solo lavoro residuo, i conteggi sotto
sono quindi slide-da-fare, non slide-totali.

- [ ] Suite Ufficio: 347 slide da verificare;
- [ ] Reti e Web: 223 slide da verificare;
- [ ] Programmazione: 210 slide da verificare;
- [ ] Smartphones: 129 slide da verificare;
- [ ] Hardware e Software: 96 slide da verificare (hs04#8 già fatta: fix duplicato con hs03);
- [ ] Sicurezza Digitale: 84 slide da verificare;
- [ ] Intelligenza Artificiale: 72 slide da verificare;
- [x] Project Management: completata;
- [x] Contenuti digitali: completata (comprende il nuovo CD01.04);
- [x] Modellazione e Stampa 3D: completata.

Per ogni slide controllare correttezza, chiarezza, collocazione nel percorso e
duplicazioni reali. Le righe con `rimandare al blocco principale` o `usare il
blocco principale come riferimento` richiedono in particolare di mantenere la
spiegazione completa nel blocco indicato e lasciare altrove solo
l'applicazione locale con un rimando interno. Le varianti linguistiche, le
progressioni nello stesso blocco e i termini distinti per contesto non vanno
uniformati meccanicamente.

Dopo la revisione di una slide:

```bash
node scripts/manage-slide-review-tags.js tag file.html#slide-N
node scripts/manage-slide-review-tags.js check
node scripts/build-slide-topic-inventory.js
```

Se il contenuto educativo cambia dopo la verifica, il relativo hash diventa
`verifica scaduta`: riesaminare la slide prima di applicare nuovamente il tag.

### Valutare le integrazioni dal programma Disinformazione, Reti e Infosfera

Il programma di riferimento è stato ricondotto a **200 ore**: 16 unità da
12,5 ore, distribuite in 62,5 ore sulla disinformazione, 87,5 ore sulle
infrastrutture di rete e 50 ore sull'educazione nell'infosfera. Le voci
seguenti sono spunti di revisione, non nuove slide obbligatorie: prima di
aggiungere contenuti, cercare la copertura esistente e integrare soltanto
lacune, esempi o collegamenti realmente utili.

#### Disinformazione online — 62,5 ore

- [ ] **Opinione pubblica e social media — 12,5 ore.** Verificare copertura di
  formazione dell'opinione pubblica, selezione algoritmica, viralità,
  engagement emotivo, polarizzazione, filter bubble ed echo chamber.
  Destinazioni probabili: `rw03-02-societa.html`,
  `rw03-05-social.html`, `ia01-concetti-generali.html`.
- [ ] **Verità, post-verità e costruzione del sapere — 12,5 ore.** Integrare,
  se necessario, distinzione tra fatto, opinione e interpretazione; fonti
  primarie e secondarie; autorevolezza; consenso scientifico; incertezza;
  bias cognitivi e ragionamento motivato. Destinazioni:
  `rw01-04-ricerca.html`, `rw01-05-affidabilita.html`.
- [ ] **Etica dei media digitali — 12,5 ore.** Controllare responsabilità di
  utenti, autori e piattaforme; libertà di espressione e moderazione; danno,
  consenso, privacy, attribuzione e trasparenza editoriale. Destinazioni:
  `rw03-02-societa.html`, `sd03-privacy.html`,
  `cd01-01-licenze-oer.html`.
- [ ] **Retoriche persuasive online — 12,5 ore.** Valutare l'aggiunta di
  ethos, pathos e logos; framing; agenda setting; fallacie; clickbait;
  urgenza, paura e riprova sociale, con esempi da analizzare e riscrivere.
  Destinazioni: `rw01-05-affidabilita.html`, `rw03-05-social.html`.
- [ ] **Deepfake e manipolazione iconica — 12,5 ore.** Verificare
  manipolazione fotografica, montaggio, face swap, clonazione vocale,
  indicatori visivi e sonori, ricerca inversa e procedura di fact-checking
  multimediale. Destinazioni: `ia01-concetti-generali.html`,
  `cd01-03-metadati-formati.html`.

#### Infrastrutture di rete — 87,5 ore

- [ ] **Teoria dell'informazione e della comunicazione — 12,5 ore.**
  Controllare dati, segnali e messaggi; codifica binaria; canale, rumore,
  errore e ridondanza; banda, bitrate, latenza e capacità. Destinazioni:
  `pr01-02-dati-codifica.html`, `rw01-01-reti.html`.
- [ ] **Tecnologie abilitanti — 12,5 ore.** Collegare hardware, software,
  sistemi operativi, cloud, virtualizzazione, IoT, sensori, IA e automazione
  ai servizi che rendono possibili. Destinazioni: `hs01-componenti.html`,
  `hs03-os.html`, `rw02-04-collaborazione-digitale.html`,
  `ia01-concetti-generali.html`.
- [ ] **Fondamenti di Internet — 12,5 ore.** Verificare LAN/WAN, client-server
  e peer-to-peer, IP, DNS, domini, TCP/UDP, HTTP/HTTPS e percorso completo di
  una richiesta web. Destinazioni: `rw01-01-reti.html`-
  `rw01-03-domini.html`.
- [ ] **Sistemi multimediali — 12,5 ore.** Integrare immagini raster e
  vettoriali, campionamento audio, bitrate, risoluzione, frame rate,
  compressione lossy/lossless, contenitori, codec e compatibilità.
  Destinazioni: `cd01-03-metadati-formati.html`,
  `cd02-01-podcast-storytelling.html`, `hs05-troubleshooting.html`.
- [ ] **Content Delivery Networks — 12,5 ore.** Valutare una spiegazione
  organica di hosting, server, data center, cache, edge server, replica,
  bilanciamento del carico, disponibilità e percorso geografico di un
  contenuto. Destinazione principale: nuova espansione in `rw01`.
- [ ] **Internet Security — 12,5 ore.** Verificare triade riservatezza-
  integrità-disponibilità, crittografia, HTTPS, certificati, autenticazione
  multifattore, malware, phishing, aggiornamenti, firewall e backup.
  Destinazioni: `sd01-introduzione.html`-`sd06-piani-b-digitali.html`.
- [ ] **Cybersecurity nei social network — 12,5 ore.** Integrare furto di
  account, impersonificazione, social engineering, link malevoli, falsi
  profili, geolocalizzazione, oversharing, impostazioni di sicurezza e
  risposta a un incidente. Destinazioni: `sd02-minacce.html`,
  `sd03-privacy.html`, `rw03-05-social.html`.

#### Educare nell'infosfera — 50 ore

- [ ] **Etica, responsabilità educativa e IA — 12,5 ore.** Verificare
  cittadinanza digitale, responsabilità educativa, IA generativa, bias,
  allucinazioni, privacy, proprietà intellettuale, trasparenza e verifica
  degli output. Destinazioni: `ia01-concetti-generali.html`-
  `ia05-strumenti-gratuiti.html`, `rw03-02-societa.html`.
- [ ] **Media literacy e didattica digitale — 12,5 ore.** Integrare ricerca e
  valutazione delle fonti, produzione consapevole, accessibilità, inclusione
  e progettazione di una breve attività didattica. Destinazioni:
  `rw01-04-ricerca.html`, `rw01-05-affidabilita.html`,
  `cd01-02-accessibilita-immagini.html`.
- [ ] **Ricerca sull'educazione ai media — 12,5 ore.** Valutare domanda di
  ricerca, metodi quantitativi e qualitativi, questionari, interviste,
  osservazione, indicatori, interpretazione dei dati, etica della ricerca e
  protezione dei partecipanti. Destinazioni probabili: nuova espansione in
  `pm01`-`pm02`.
- [ ] **Progettazione di interventi formativi innovativi — 12,5 ore.**
  Controllare analisi dei bisogni, destinatari, obiettivi osservabili,
  sequenza di attività, tempi, strumenti, valutazione, feedback e indicatori
  di efficacia. Destinazioni: `pm01-introduzione.html`-
  `pm04-strumenti.html`.

Per ogni voce:

1. cercare prima nell'indice, nei TXT e nell'inventario argomenti;
2. segnare quali sottoargomenti sono già coperti e in quali slide;
3. aggiungere soltanto ciò che manca, alternando teoria, caso ed esercizio;
4. evitare di concentrare automaticamente 12,5 ore in un solo deck;
5. aggiornare TXT, agenda, ricerca, completezza e inventario dopo le modifiche.

### Attivare la rendicontazione dei quiz con Google Sheets

Il codice è già presente nel repository, ma la raccolta resta volutamente
disattivata finché non viene configurato il deployment Google:

- [x] creare il Foglio Google destinato ai risultati;
- [x] copiare `google-apps-script/quiz-reporting/Code.gs` nel progetto Apps Script collegato;
- [x] eseguire `setup()` una volta e autorizzare lo script;
- [x] pubblicare Apps Script come applicazione web eseguita dal proprietario;
- [x] inserire l'URL `/exec` del deployment in `quiz-reporting-config.js`;
- [x] eseguire un tentativo di prova e verificare i fogli `Risultati` e `Ultime 48 ore`;
- [x] definire accessi e durata di conservazione dei dati raccolti.

Istruzioni complete: `google-apps-script/quiz-reporting/README.md`.

## Esito della riconciliazione dei contenuti

| Area vecchia | Blocco attuale | Esito |
| --- | --- | --- |
| `web03-*`, `web07-*`, `web08-*` | `rw01-01`-`rw03-05` | Contenuti integrati nei blocchi Reti e Web |
| `inf01-*` | `hs01`, `su01`-`su04` | Componenti, browser e suite ricollocati |
| `inf02-*` | `rw03-01`, `rw03-04`, `rw03-05` | Identita, SPID/PEC, reputazione e social integrati |
| `inf03-*`, `inf04-*`, `inf05-*`, `inf08-*` | `su02-01`-`su04-01` | Documenti, fogli di calcolo, presentazioni e automazione integrati |
| `inf06-*`, `inf07-*` | `rw03-04`, `rw03-05`, `su03-07` | Branding, social, hashtag e contenuti visuali integrati |
| `sec02-*`, `sec03-*` | `sd01`-`sd06` | Minacce, privacy, crittografia, normative, assessment e continuità operativa integrati |
| `sma04-*`-`sma11-*` | `sm04`-`sm11` | Smartphone, privacy, sicurezza, file, fotocamera e accessibilita integrati |
| `ia_*` | `ia01`-`ia05` | IA, strumenti generativi, LLM, modelli e strumenti gratuiti integrati |

## Screenshot

La vecchia sezione "Screenshot Candidates For Slides" e stata chiusa:

- i riferimenti puntavano a file non piu presenti;
- i deck attuali usano layout, card, icone, diagrammi e contenuti testuali
  gia integrati;
- non restano placeholder o slide bloccate dalla mancanza di screenshot.

Se in futuro servono immagini reali, creare una nuova issue puntuale usando i
nomi dei deck attuali e il numero di slide corrente.

## Espansioni Contenuto

Le espansioni indicate nel vecchio TODO sono coperte dai deck attuali:

| Argomento | Deck attuale |
| --- | --- |
| DNS, domini, sottodomini, URL sospetti | `rw01-02-navigazione.html`, `rw01-03-domini.html` |
| Ricerca, SERP, operatori, affidabilita | `rw01-04-ricerca.html`, `rw01-05-affidabilita.html` |
| Salvataggio, download, screenshot, OCR, Creative Commons | `rw02-02-contenuti.html` |
| SPID, CIE, PEC, identita e reputazione | `rw03-01-identita.html`, `rw03-04-branding.html`, `rw03-05-social.html` |
| Social, hashtag, calendario editoriale, contenuti | `rw03-05-social.html` |
| Documenti, fogli, formule, CERCA.VERT, testo, pivot e presentazioni | `su02-01-documenti.html`-`su04-01-presentazioni.html` |
| Pivot avanzate, grafici, query, automazione, segmentazioni e collegamenti | `su03-09-tabelle-pivot-avanzate.html`-`su03-17-oltre-il-foglio.html` |
| Fotografia, editing, formati, QR, screenshot | `sm08-fotocamera-contenuti.html` |
| App, permessi, privacy, sicurezza smartphone, file e accessibilita | `sm04-app-permessi.html`-`sm11-manutenzione-scelta.html` |
| Malware, phishing, privacy, normative, dati personali e piani B digitali | `sd01-introduzione.html`-`sd06-piani-b-digitali.html` |
| Troubleshooting tecnico | `hs05-troubleshooting.html` |
| IA generativa, prompt, deepfake, LLM, modelli e strumenti gratuiti | `ia01-concetti-generali.html`-`ia05-strumenti-gratuiti.html` |
| Scratch, Micro:bit, CreateAI, strumenti di sviluppo e Python | `pr02-01-introduzione.html`-`pr05-02-python-strumenti.html` |
| TinkerCAD, modellazione e stampa 3D | `ms01-tinkercad-introduzione.html`-`ms04-classi-attivita.html` |

## File Di Dettaglio

Le integrazioni provenienti dal programma sono documentate in
`proposte-merge-programma/`; le tabelle in quei file segnano gli argomenti come
aggiunti o gia presenti.

## Da fare

- **Categoria multimediale dedicata.** `cd02-01-podcast-storytelling.html` è
  parcheggiato in CD02 in attesa di una sezione ad hoc per i contenuti
  multimediali (registrazione audio, montaggio, mixaggio, normalizzazione,
  loudness). Quando la sezione esiste, spostarci il deck e rinumerarlo.
