<!-- Proprietà intellettuale di Francesco Antonio Binetti -->
# Rendicontazione quiz con Google Sheets

Il backend registra i tentativi nel foglio `Risultati` e mantiene una vista
`Ultime 48 ore`. Ogni tentativo registra nome, cognome e corso dello studente. Il
foglio contiene quindi dati personali e deve restare accessibile soltanto al
personale didattico autorizzato.

## Attivazione

1. Crea un nuovo Foglio Google.
2. Nel foglio apri **Estensioni > Apps Script**.
3. Sostituisci il contenuto di `Code.gs` con quello di questo progetto.
4. Salva ed esegui manualmente `setup()` una volta, autorizzando l'accesso.
5. Seleziona **Esegui il deployment > Nuovo deployment > Applicazione web**.
6. Imposta **Esegui come: me** e consenti l'accesso agli utenti che svolgeranno
   i quiz. Se gli studenti non hanno account dello stesso dominio, può essere
   necessario scegliere l'accesso pubblico previsto dal tuo account Workspace.
7. Copia l'URL che termina con `/exec` e incollalo in `quiz-reporting-config.js`.
8. Pubblica le modifiche del sito e svolgi un tentativo di prova.

Quando modifichi `Code.gs`, crea una nuova versione del deployment. La pagina
del quiz non legge il foglio: invia soltanto un nuovo tentativo. Il foglio non
deve essere condiviso con gli studenti.

## Dati raccolti

- timestamp generato dal server;
- nome, cognome e corso;
- quiz e titolo;
- punteggio, totale e percentuale;
- risposte selezionate;
- identificativo del tentativo e timestamp del dispositivo.

Definisci una durata di conservazione coerente con lo scopo didattico e limita
l'accesso al foglio al personale autorizzato.

## Accesso e conservazione adottati

- Il Foglio Google resta privato ed è condiviso soltanto con il proprietario e
  con il personale didattico autorizzato; gli studenti accedono esclusivamente
  all'applicazione web e non al foglio.
- Nome, cognome e corso sono raccolti esclusivamente per attribuire il risultato allo
  studente e non devono essere riutilizzati per finalità diverse.
- I risultati vengono conservati per 90 giorni, salvo una necessità didattica
  documentata più breve, e poi eliminati dal proprietario del foglio.
- Al termine dell'attività va riesaminato anche l'accesso degli eventuali
  collaboratori e revocato quando non è più necessario.
