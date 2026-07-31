<!-- Proprietà intellettuale di Francesco Antonio Binetti -->
# Revisione completa dei contenuti delle slide

Destinatario operativo: **Claude Fable 5**.

Agisci come revisore didattico e tecnico dell’intera repository. Il tuo compito
non è uniformare superficialmente il testo: devi leggere ogni slide, verificare
che sia corretta, autosufficiente rispetto ai prerequisiti dichiarati e abbastanza
informativa per uno studente che la vede durante una lezione.

## Prima di modificare

1. Leggi integralmente `AGENTS.md` e `CLAUDE.md` e rispettane tutte le regole.
2. Esegui `git status -sb` e `git log -5 --oneline`; preserva ogni modifica
   concorrente e rileggi il file dal disco subito prima di editarlo.
3. Ricava da `00-indice.html` l’inventario canonico dei deck pubblicati.
4. Prepara una checklist persistente con un elemento per ogni deck. Non dichiarare
   completata la revisione finché ogni deck non è stato letto slide per slide.

## Controllo obbligatorio per ogni slide

Per ciascuna slide verifica e, quando necessario, correggi direttamente:

- esattezza di definizioni, date, numeri, nomi, rapporti causa-effetto e limiti;
- presenza delle informazioni necessarie a comprendere il concetto, senza
  presupporre termini mai introdotti;
- distinzione fra regola generale, caso frequente, eccezione e semplificazione;
- esempi completi, coerenti con la spiegazione e realmente eseguibili quando
  contengono codice, formule o comandi;
- spiegazione di ogni simbolo, parametro, funzione o passaggio nuovo;
- risultati degli esempi: ricalcolali o eseguili, non fidarti del testo esistente;
- assenza di affermazioni assolute false come «sempre», «mai», «senza errori» o
  «basta un guasto» quando esistono condizioni o configurazioni diverse;
- uso preciso del lessico: non confondere protocollo e servizio, modello e
  implementazione, disponibilità e backup, dato e significato, supporto fisico e
  topologia logica;
- quantità di contenuto: aggiungi ciò che serve per capire e applicare, ma non
  riempire la slide con curiosità laterali o ripetizioni.

## Verifica delle fonti

- Per fatti tecnici, storici, medici, giuridici, quantitativi o potenzialmente
  mutabili consulta fonti primarie o istituzionali aggiornate.
- Preferisci RFC/IETF, standard, documentazione ufficiale, enti pubblici, paper
  originali, musei o archivi specialistici. Non usare un riassunto generico per
  correggere una fonte primaria.
- Non inserire fonti a mano nei deck: aggiorna le mappe di
  `scripts/add-official-source-links.js`, con scope preciso, e rigenera i link.
- Nelle sezioni PR e SU, ogni funzione di libreria, API o foglio di calcolo deve
  avere il riferimento ufficiale alla prima occorrenza didattica nel deck.
- Se una fonte non sostiene esattamente la frase, riscrivi la frase o trova una
  fonte adeguata. Non mantenere una citazione solo perché il dominio è autorevole.

## Coerenza fra deck

- Cerca il trattamento canonico di ogni argomento prima di ampliarlo.
- Se il tema è già spiegato bene altrove, elimina il duplicato e usa il footer
  `Rimandi interni`; non ripetere la stessa mini-lezione.
- Controlla i prerequisiti nell’ordine reale dei deck e aggiorna i rimandi quando
  l’inserimento o la rimozione di una slide cambia la numerazione.
- Non aggiungere agende o riassunti introduttivi. Gli esercizi devono stare nei
  deck esercizi dedicati.
- Mantieni tutto il contenuto rivolto agli studenti in italiano.

## Criteri specifici per codice e formule

- Esegui gli esempi o verifica sintassi e risultato con lo strumento ufficiale.
- Distingui costrutti del linguaggio, operatori, funzioni, metodi, proprietà e
  valori speciali: non chiamarli tutti «comandi».
- Spiega la provenienza delle variabili create implicitamente da un costrutto,
  il valore restituito, gli effetti collaterali e i casi limite rilevanti.
- Preferisci forme idiomatiche e leggibili; se mostri una forma didattica meno
  idiomatica, dichiarane lo scopo.
- Per fogli di calcolo verifica separatori, lingua delle funzioni, riferimenti
  relativi/assoluti e differenze fra Excel e Google Sheets.

## Controllo visivo

Dopo ogni gruppo di modifiche apri i deck con `file://`, mai con un server HTTP.
Controlla almeno tutte le slide toccate a 1280×720 e verifica:

- nessuna sovrapposizione con fonti, rimandi, pulsanti o numero di pagina;
- testo informativo leggibile e di dimensione coerente con gli altri deck;
- codice indentato e non tagliato;
- tabelle scandibili e colonne semanticamente corrette;
- alternanza ragionata dei layout, senza sacrificare la relazione didattica;
- immagini e diagrammi coerenti con la spiegazione.

Non ridurre il carattere fino a nascondere un problema di densità: abbrevia,
riorganizza o dividi la slide quando necessario.

## Procedura di chiusura

Esegui, secondo le modifiche effettuate:

```bash
node scripts/add-official-source-links.js
node scripts/normalize-cross-reference-footers.js
node scripts/build-search-index.js
node scripts/build-completeness.js
node scripts/build-slide-topic-inventory.js
node scripts/build-last-modified.js
node scripts/check-shared-styles.js
node scripts/manage-ip-notice.js check
git diff --check
```

Riesegui il generatore delle fonti una seconda volta: deve risultare idempotente.
Non rigenerare in massa companion TXT con note manuali e non fare commit o push
senza richiesta esplicita.

## Resoconto finale richiesto

Fornisci un riepilogo concreto con:

1. deck e slide corretti, con link `file://` cliccabili;
2. errori fattuali eliminati;
3. integrazioni didattiche aggiunte;
4. duplicazioni rimosse e rimandi creati;
5. fonti ufficiali aggiunte o sostituite;
6. slide che richiedono una decisione dell’autore;
7. comandi di verifica eseguiti e relativo esito.

Non usare formule vaghe come «tutto corretto». Se una slide è stata lasciata
invariata, devi averne comunque verificato contenuto, prerequisiti ed esempi.
