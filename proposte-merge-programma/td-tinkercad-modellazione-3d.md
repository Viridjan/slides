# TD / 3D - Modellazione e stampa 3D con TinkerCAD

## Fonte PPTX

- `corsi/TinkerCAD 01.pptx`

## Stato implementazione

| Deck | Slide | Stato |
|---|---|---|
| `td01-tinkercad-introduzione.html` | 8 | ✅ creato |
| `td02-modellazione-base.html` | 9 | ✅ creato (compatto — piano prevedeva 16) |
| `td03-esportazione-stampa-3d.html` | 8 | ✅ creato |
| `td04-classi-attivita.html` | 7 | ✅ creato |

Fatto anche: card nell'indice (`00-indice.html`), `.txt` companion per tutti e 4, prefisso `td` in CLAUDE.md e README.

**Espansione possibile**: td02 è più sintetico del piano — le proposte non implementate come slide dedicate (mouse e precisione, colori RGB/esadecimali, rotazione separata, mini-esercizio portachiavi) restano disponibili nelle sezioni sotto.

## Target merge suggerito

Implementato come nuova sezione/deck dedicata, per non appesantire troppo SU o PM.

- nuovo prefisso: `td` = TinkerCAD / 3D
- `td01-tinkercad-introduzione.html`
- `td02-modellazione-base.html`
- `td03-esportazione-stampa-3d.html`
- eventuale `td04-classi-attivita.html`

Alternativa: integrare una parte in `su-produttivita-contenuti.md` / SU come “contenuti 3D”, ma il materiale PPTX e abbastanza ampio da meritare un blocco autonomo.

## Lacune coperte

- Modellazione 3D con TinkerCAD.
- Account docente, classi, modalita sicura e lezioni.
- Dashboard, progetti, esercitazioni e sfide.
- Ambiente di lavoro 3D: workplane, camera, forme, selezione, opzioni, import/export.
- Vista prospettica e ortogonale.
- Griglia di snap.
- Forme solide e vuote.
- Unione, separazione, sottrazione con forme vuote.
- Movimento e rotazione nello spazio.
- Formati SVG, STL, OBJ.
- Esportazione verso stampa 3D.
- Sim Lab e simulazioni fisiche.
- Uso didattico: assegnazioni, studenti, badge, attivita.

---

## TD01 - Introduzione a TinkerCAD

### Slide proposta: Cos'e TinkerCAD

Contenuto:

- TinkerCAD e un programma web per modellazione 3D e simulazione di circuiti elettronici.
- Funziona nel browser e salva i progetti in cloud.
- E pensato per rendere la progettazione accessibile anche a principianti e studenti.
- Permette di creare modelli 3D, circuiti elettronici e progetti con Coderblocks.
- I lavori possono essere pubblicati e condivisi, anche con licenze Creative Commons.

Nota:

> TinkerCAD e utile per passare da un'idea astratta a un oggetto visibile, misurabile e potenzialmente stampabile.

---

## TD01 - Account e cloud

### Slide proposta: Perche serve un account

Contenuto:

- L'account permette di salvare automaticamente i progetti.
- I progetti restano disponibili da qualunque computer con browser.
- La dashboard mostra lavori recenti, proprieta, duplicazione ed eliminazione.
- Il salvataggio e continuo: se il browser si chiude, il lavoro resta nel cloud.
- Per la didattica, il docente puo creare classi e lezioni senza richiedere agli studenti un account personale.

Regola:

> In TinkerCAD il progetto non vive sul computer dell'aula: vive nell'account cloud.

---

## TD01 - Docenti, classi e modalita sicura

### Slide proposta: TinkerCAD per la classe

Contenuto:

- Il docente crea un account insegnante.
- Le classi permettono di assegnare attivita, monitorare avanzamento e vedere i lavori.
- Gli studenti possono partecipare con codice o link della classe.
- In modalita sicura gli studenti non possono condividere pubblicamente, commentare, caricare immagini o contattare altri utenti.
- Il docente modera progetti e attivita.

Nota:

> La modalita sicura e importante quando si lavora con studenti giovani o senza account personali.

---

## TD01 - Dashboard e progetti

### Slide proposta: Dove trovo i lavori

Contenuto:

- Dashboard: elenco dei progetti personali.
- Progetti ordinati dal piu recente al meno recente.
- Da un progetto si possono vedere proprieta, duplicare, eliminare o inserire in una lezione.
- Categorie principali: modelli 3D, circuiti elettronici, Coderblocks.
- Esercitazioni e sfide: attivita gia proposte da TinkerCAD da assegnare o usare come punto di partenza.

---

## TD02 - Ambiente di lavoro

### Slide proposta: Le parti dell'interfaccia

Contenuto:

- Piano di lavoro: superficie su cui si costruisce.
- Camera: punto di vista da cui osserviamo il modello.
- Forme: oggetti base da inserire nella scena.
- Opzioni di selezione: copia, incolla, duplica, elimina, annulla, ripristina.
- Opzioni forme: dimensioni, colore, solido/vuoto.
- Opzioni del piano di lavoro: griglia, snap, righello, note.
- Import/export: caricare o scaricare modelli.
- Titolo: nome del progetto.

Nota visuale:

> La prima lezione dovrebbe essere una mappa dell'interfaccia: prima orientarsi, poi modellare.

---

## TD02 - Workplane

### Slide proposta: Il piano di lavoro

Contenuto:

- Il workplane e una superficie magnetica su cui si appoggiano le forme.
- Gli oggetti vengono posizionati e allineati rispetto alla griglia.
- Si puo ruotare la telecamera con il mouse per osservare da diverse angolazioni.
- Cambiare punto di vista e essenziale per modellare correttamente.
- Il piano puo essere personalizzato nelle dimensioni e nelle impostazioni.

Regola:

> In 3D non basta guardare da davanti: bisogna controllare alto, lato, retro e prospettiva.

---

## TD02 - Griglia di snap

### Slide proposta: Snap: la calamita della griglia

Contenuto:

- Lo snap vincola gli oggetti ad allinearsi alla griglia.
- Permette movimenti piu precisi e ordinati.
- Si puo modificare il passo della griglia.
- Snap grande: movimento rapido ma meno preciso.
- Snap piccolo: movimento piu lento ma piu accurato.
- Disattivare lo snap puo servire per posizionamenti liberi.

Analogia:

> Lo snap e come una calamita: aiuta ad allineare, ma a volte va allentata per lavorare di fino.

---

## TD02 - Camera e viste

### Slide proposta: Osservare il modello

Contenuto:

- Il cubo della vista indica l'orientamento della camera.
- Click sulle facce: alto, fronte, basso, sinistra, destra, retro.
- Vista standard: torna alla posizione iniziale.
- Adatta alla selezione: centra l'oggetto scelto.
- Zoom: avvicina o allontana la scena.
- Vista prospettica: simile all'occhio umano, oggetti lontani piu piccoli.
- Vista ortogonale: piu tecnica, utile per controllare misure e proporzioni.

Nota:

> La vista ortogonale sembra meno naturale, ma e spesso piu utile per progettare.

---

## TD02 - Forme base e testo

### Slide proposta: Costruire con forme semplici

Contenuto:

- TinkerCAD offre forme geometriche, componenti, veicoli, animali, lettere e numeri.
- Le forme si trascinano sul piano di lavoro.
- Ogni forma puo essere ridimensionata, spostata e ruotata.
- Il generatore di testo permette di creare scritte parametriche.
- Le forme complesse nascono dalla combinazione di forme semplici.

Regola:

> Modellare in TinkerCAD significa scomporre un oggetto complesso in pezzi semplici.

---

## TD02 - Mouse e precisione

### Slide proposta: Il mouse e uno strumento di modellazione

Contenuto:

- Tasto sinistro: selezionare, trascinare, posizionare.
- Tasto destro: ruotare la vista.
- Rotella: zoom.
- Trascinamento: muovere forme e camera.
- Il touchpad funziona, ma e meno preciso.
- Per lavorare bene in 3D e consigliato un mouse.

Nota:

> Prima di modellare oggetti complessi, conviene esercitarsi con camera, zoom e selezione.

---

## TD02 - Dimensioni e proprieta forma

### Slide proposta: Modificare una forma

Contenuto:

- Una forma inserita puo essere ridimensionata dai vertici.
- Le misure possono essere inserite manualmente in millimetri.
- Alcune forme hanno parametri specifici.
- Il lucchetto blocca la forma.
- La lampadina nasconde temporaneamente la forma.
- Il colore aiuta a distinguere parti diverse durante la modellazione.

Esempio:

> Usare colori diversi per pezzi separati rende piu facile capire cosa stiamo unendo o sottraendo.

---

## TD02 - Colori RGB ed esadecimali

### Slide proposta: Colore digitale nei modelli

Contenuto:

- RGB usa rosso, verde e blu come colori additivi.
- Ogni canale va da 0 a 255.
- Tutti i canali a 255 producono bianco.
- Tutti i canali a 0 producono nero.
- Il codice esadecimale rappresenta i valori RGB in 6 caratteri preceduti da `#`.
- Esempio: `#FF0000` rosso, `#00FF00` verde, `#0000FF` blu.

Nota:

> In TinkerCAD il colore aiuta a progettare, ma nella stampa 3D dipendera anche dal materiale usato.

---

## TD02 - Solidi e vuoti

### Slide proposta: Aggiungere e togliere materiale

Contenuto:

- Una forma solida rappresenta materiale da aggiungere.
- Una forma vuota rappresenta materiale da rimuovere.
- Sovrapponendo un vuoto a un solido e usando unione, la parte sovrapposta viene eliminata.
- Solido + solido = somma di materiale.
- Solido + vuoto = sottrazione di materiale.
- Le forme unite possono essere separate se serve tornare indietro.

Analogia:

> I pieni sono numeri positivi, i vuoti sono numeri negativi: insieme costruiscono la forma finale.

---

## TD02 - Unire e separare forme

### Slide proposta: Dal semplice al complesso

Contenuto:

- Selezionare piu forme con trascinamento o click multiplo.
- Usare unione per creare una forma unica.
- Usare separa per tornare agli elementi originali.
- Unione pieno + pieno crea una forma composta.
- Unione pieno + vuoto crea un taglio o foro.
- Controllare sempre la vista da piu angolazioni prima di unire.

Esempio:

> Un portachiavi 3D puo nascere da un rettangolo pieno, un testo in rilievo e un cilindro vuoto per il foro.

---

## TD02 - Movimento nello spazio

### Slide proposta: Assi cartesiani e posizione

Contenuto:

- Ogni oggetto selezionato mostra maniglie e riferimenti sugli assi.
- Le frecce permettono di spostare lungo un asse.
- Le maniglie permettono di ridimensionare.
- Il movimento verticale serve per appoggiare, sovrapporre o sollevare forme.
- Le misure precise aiutano a evitare oggetti disallineati.

Nota:

> In 3D un oggetto puo sembrare allineato da davanti ma essere fuori posizione in profondita.

---

## TD02 - Rotazione

### Slide proposta: Ruotare senza perdere orientamento

Contenuto:

- Le doppie frecce permettono di ruotare una forma.
- La rotazione avviene rispetto agli assi cartesiani.
- Si puo indicare un angolo preciso.
- Ruotare la camera aiuta a vedere maniglie nascoste.
- Per oggetti simmetrici, usare angoli regolari come 45, 90, 180 gradi.

Regola:

> Se non riesci a selezionare una maniglia, cambia vista prima di cambiare oggetto.

---

## TD03 - Import/export

### Slide proposta: Portare modelli dentro e fuori TinkerCAD

Contenuto:

- Import: caricare modelli creati in TinkerCAD o altri CAD.
- Limite indicato dal PPTX: file sotto 25 MB.
- Potrebbe servire ridimensionare il modello prima di importarlo.
- Formati supportati: `.svg`, `.stl`, `.obj`.
- Export: scaricare il modello in formato adatto a riuso, stampa o condivisione.
- Alcune stampanti 3D compatibili possono ricevere il modello direttamente.

Nota:

> Importare ed esportare bene e il ponte tra progettazione, stampa e riuso.

---

## TD03 - SVG

### Slide proposta: SVG, grafica vettoriale

Contenuto:

- SVG significa Scalable Vector Graphics.
- E un formato vettoriale bidimensionale basato su XML.
- Descrive forme matematiche, non pixel.
- Si ridimensiona senza perdere qualita.
- E utile per loghi, icone, scritte e profili da estrudere in 3D.
- E uno standard aperto.

Collegamento:

> Un disegno 2D vettoriale puo diventare base per una forma 3D.

---

## TD03 - STL

### Slide proposta: STL, formato per stampa 3D

Contenuto:

- STL e un formato molto usato nella prototipazione rapida e stampa 3D.
- Descrive la geometria della superficie di un oggetto tramite triangoli.
- Non conserva sempre informazioni avanzate come colore o materiali.
- E uno dei formati piu comuni per passare dal CAD allo slicer.
- Prima della stampa va controllato: scala, chiusura mesh, orientamento.

Nota:

> STL non e il progetto completo: e spesso il modello pronto per la fase di stampa.

---

## TD03 - OBJ

### Slide proposta: OBJ, scambio tra software 3D

Contenuto:

- OBJ e un formato aperto per geometrie 3D.
- E usato da molti software di grafica e modellazione.
- Puo descrivere geometria e proprieta della superficie.
- E utile per scambio tra programmi diversi.
- Rispetto a STL puo essere piu adatto a flussi grafici, texture e rendering.

---

## TD03 - Dalla modellazione alla stampa 3D

### Slide proposta: Prima di stampare

Contenuto:

- Controllare dimensioni in millimetri.
- Verificare che il modello sia chiuso e senza parti sospese impossibili.
- Evitare dettagli troppo piccoli per la stampante.
- Scegliere orientamento di stampa.
- Esportare in STL o formato richiesto.
- Aprire nello slicer per preparare layer, riempimento e supporti.
- Salvare il file macchina per la stampante.

Nota:

> TinkerCAD crea il modello; lo slicer lo trasforma in istruzioni per la stampante 3D.

---

## TD03 - Errori comuni nella stampa 3D

### Slide proposta: Progettare pensando alla stampante

Contenuto:

- Pareti troppo sottili: si rompono o non vengono stampate.
- Dettagli minuscoli: spariscono o risultano fragili.
- Sbalzi eccessivi: richiedono supporti.
- Oggetto non appoggiato bene: stampa instabile.
- Scala sbagliata: modello troppo grande o troppo piccolo.
- Fori troppo stretti: la stampa reale ha tolleranze.

Regola:

> Un modello bello sullo schermo non e automaticamente stampabile.

---

## TD02/TD03 - Sim Lab

### Slide proposta: Simulare fenomeni fisici

Contenuto:

- Sim Lab permette di simulare alcune interazioni fisiche tra oggetti.
- Gli oggetti possono avere materiali diversi.
- Si puo impostare un oggetto statico o dinamico.
- Il suolo puo avere gravita e oscillazione.
- La gravita puo simulare Terra, Luna, Marte o Giove.
- Il play avvia la simulazione.

Esempio:

> Una sfera di plastica su un piano inclinato in calcestruzzo permette di osservare impatto e movimento.

---

## TD04 - Creare una lezione

### Slide proposta: Attivita condivise con TinkerCAD

Contenuto:

- Dal menu Lezioni si crea una nuova lezione.
- Si imposta nome classe, eta e argomento.
- Si decide se gli studenti possono rendere pubblici i progetti.
- La dashboard classe permette di aggiungere studenti e co-docenti.
- Il codice o link classe permette l'accesso.
- Gli studenti possono fare una copia del progetto base e modificarlo.
- Il docente puo visualizzare lavori e progressi.

---

## TD04 - Aggiungere studenti e badge

### Slide proposta: Gestire la classe

Contenuto:

- Gli studenti possono essere aggiunti con nome e soprannome.
- Si possono inserire piu studenti insieme, uno per riga.
- La dashboard mostra ultima connessione e stato.
- Il docente puo aggiungere, eliminare o sospendere studenti.
- I badge possono premiare risultati o comportamenti positivi.
- Le attivita hanno titolo, descrizione e progetto di partenza.

Nota:

> Il badge non sostituisce la valutazione, ma puo rendere visibile un progresso o un traguardo.

---

## Struttura deck implementata

### `td01-tinkercad-introduzione.html`

1. Titolo: Modellazione 3D con TinkerCAD
2. Cos'e TinkerCAD
3. Account e cloud
4. Docenti, classi e modalita sicura
5. Dashboard, progetti, esercitazioni e sfide
6. Tipi di progetto: 3D, circuiti, Coderblocks
7. Creative Commons e condivisione lavori
8. Chiusura

### `td02-modellazione-base.html`

1. Titolo: Modellare con forme
2. Ambiente di lavoro
3. Workplane
4. Griglia di snap
5. Camera e viste
6. Vista prospettica e ortogonale
7. Forme base e testo
8. Mouse e precisione
9. Dimensioni e proprieta
10. Colori RGB/esadecimali
11. Solidi e vuoti
12. Unire e separare
13. Movimento nello spazio
14. Rotazione
15. Mini-esercizio: portachiavi o targhetta
16. Chiusura

### `td03-esportazione-stampa-3d.html`

1. Titolo: Dal modello alla stampa 3D
2. Import/export
3. SVG
4. STL
5. OBJ
6. Preparare un modello per stampa 3D
7. Errori comuni di stampabilita
8. Slicer: cosa fa
9. Sim Lab
10. Esercizio: modello stampabile semplice
11. Chiusura

### `td04-classi-attivita.html`

1. Titolo: TinkerCAD in classe
2. Creare una lezione
3. Aggiungere studenti
4. Modalita sicura
5. Attivita e progetto base
6. Monitorare lavori
7. Badge e feedback
8. Chiusura

## Note di merge

- ✅ Nuova sezione pubblicata nell'indice (`00-indice.html`).
- ✅ `.txt` companion generati per ogni deck.
- ✅ Nessuna slide di domande riepilogative finali.
- Esempi pratici semplici (targhetta, portachiavi, pedina, supporto cavo) — da usare in eventuali espansioni di td02/td03.
