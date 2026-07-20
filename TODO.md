<!-- Proprietà intellettuale di Francesco Antonio Binetti -->
# TODO

Stato: due filoni operativi aperti; contenuti del corso riconciliati con i
blocchi attuali.

Questo file era nato su una versione precedente del corso, con nomi come
`inf*`, `web*`, `sec*` e `sma*`. Quei file non esistono piu nella struttura
pubblicata: i contenuti sono stati migrati nei blocchi attuali `hs`, `rw`,
`sd`, `sm`, `su`, `ia`, `pr` e `ms`.

## TODO aperti

### Completare la revisione editoriale dell'inventario argomenti

`inventario-argomenti-slide.csv` contiene la coda puntuale generata per la
revisione dei contenuti. Alla rilevazione del 20 luglio 2026 risultano 1.499
slide di contenuto distinte: 32 verificate e 1.467 ancora `non verificata`.
Il CSV è la fonte operativa slide per slide e non va modificato a mano.

- [ ] Suite Ufficio: verificare 401 slide;
- [ ] Reti e Web: verificare 252 slide;
- [ ] Programmazione: verificare 236 slide;
- [ ] Smartphones: verificare 151 slide;
- [ ] Hardware e Software: verificare 105 slide;
- [ ] Sicurezza Digitale: verificare 96 slide;
- [ ] Project Management: verificare 67 slide;
- [ ] Intelligenza Artificiale: verificare 63 slide;
- [ ] Contenuti digitali: verificare 49 slide;
- [ ] Modellazione e Stampa 3D: verificare 47 slide.

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

### Attivare la rendicontazione dei quiz con Google Sheets

Il codice è già presente nel repository, ma la raccolta resta volutamente
disattivata finché non viene configurato il deployment Google:

- [ ] creare il Foglio Google destinato ai risultati;
- [ ] copiare `google-apps-script/quiz-reporting/Code.gs` nel progetto Apps Script collegato;
- [ ] eseguire `setup()` una volta e autorizzare lo script;
- [ ] pubblicare Apps Script come applicazione web eseguita dal proprietario;
- [ ] inserire l'URL `/exec` del deployment in `quiz-reporting-config.js`;
- [ ] eseguire un tentativo di prova e verificare i fogli `Risultati` e `Ultime 48 ore`;
- [ ] definire accessi e durata di conservazione dei dati raccolti.

Istruzioni complete: `google-apps-script/quiz-reporting/README.md`.

## Esito della riconciliazione dei contenuti

| Area vecchia | Blocco attuale | Esito |
| --- | --- | --- |
| `web03-*`, `web07-*`, `web08-*` | `rw01`-`rw09` | Contenuti integrati nei blocchi Reti e Web |
| `inf01-*` | `hs01`, `su01`-`su04` | Componenti, browser e suite ricollocati |
| `inf02-*` | `rw03-01`, `rw03-04`, `rw03-05` | Identita, SPID/PEC, reputazione e social integrati |
| `inf03-*`, `inf04-*`, `inf05-*`, `inf08-*` | `su02-01`-`su04-01` | Documenti, fogli di calcolo, presentazioni e automazione integrati |
| `inf06-*`, `inf07-*` | `rw03-04`, `rw03-05`, `su03-07` | Branding, social, hashtag e contenuti visuali integrati |
| `sec02-*`, `sec03-*` | `sd01`-`sd05` | Minacce, privacy, crittografia, normative e assessment integrati |
| `sma04-*`-`sma11-*` | `sm04`-`sm11` | Smartphone, privacy, sicurezza, file, fotocamera e accessibilita integrati |
| `ia_*` | `ia01`-`ia03` | IA, strumenti generativi, LLM, tokenizzazione e allucinazioni integrati |

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
| Salvataggio, download, screenshot, OCR, Creative Commons | `rw02-03-contenuti.html` |
| SPID, CIE, PEC, identita e reputazione | `rw03-01-identita.html`, `rw03-04-branding.html`, `rw03-05-social.html` |
| Social, hashtag, calendario editoriale, contenuti | `rw03-05-social.html` |
| Documenti, fogli, formule, CERCA.VERT, testo, pivot e presentazioni | `su02-01-documenti.html`-`su04-01-presentazioni.html` |
| Pivot avanzate, grafici, fogli avanzati, query, macro, VBA e Google Apps Script | `su03-09-tabelle-pivot-avanzate.html`-`su03-15-google-apps-script.html` |
| Fotografia, editing, formati, QR, screenshot | `sm08-fotocamera-contenuti.html` |
| App, permessi, privacy, sicurezza smartphone, file e accessibilita | `sm04-app-permessi.html`-`sm11-manutenzione-scelta.html` |
| Malware, phishing, privacy, normative e dati personali | `sd01-introduzione.html`-`sd05-assessment.html` |
| Troubleshooting tecnico | `hs05-troubleshooting.html` |
| IA generativa, prompt, deepfake, LLM, tokenizzazione | `ia01-concetti-generali.html`-`ia03-llm.html` |
| Scratch, Micro:bit, CreateAI | `pr02-01-introduzione.html`, `pr02-02-questionario.html`, `pr03-01-microbit.html`, `pr03-02-createai.html` |
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
