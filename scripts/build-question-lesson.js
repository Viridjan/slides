const fs = require('fs');

const author = 'Francesco Antonio Binetti';
const ip = '<!-- Proprietà intellettuale di Francesco Antonio Binetti -->';

const decks = [
  {
    file:'rw02-05-licenze-oer.html', code:'RW02.05', course:'course-rw', title:'Licenze aperte e OER',
    subtitle:'Diritto d’autore, Creative Commons, remix e pratiche delle risorse educative aperte.',
    next:'rw02-06-accessibilita-immagini.html', nextLabel:'RW02.06 · Accessibilità delle immagini',
    sources:[
      ['Licenze Creative Commons','https://creativecommons.org/share-your-work/cclicenses/'],
      ['Definizione delle 5R','https://opencontent.org/definition/'],
      ['Legge 633/1941, art. 20','https://www.normattiva.it/uri-res/N2Ls?urn%3Anir%3Astato%3Alegge%3A1941-04-22%3B633~art20=']
    ],
    slides:[
      ['Orientarsi tra diritti e permessi','Un contenuto trovato online non è automaticamente libero da usare. Prima si identifica l’opera, poi si legge la licenza, infine si documenta la fonte.',['Opera e autore','Licenza applicata','Uso che vuoi farne']],
      ['Diritto d’autore e licenza','Il diritto nasce con l’opera; la licenza comunica in anticipo quali usi il titolare autorizza. Non sono sinonimi.',['Diritto: insieme delle tutele','Licenza: permesso con condizioni','Pubblicazione online: non equivale a rinuncia']],
      ['Diritti morali e patrimoniali','I diritti patrimoniali riguardano gli usi economici; il diritto morale tutela il legame personale tra autore e opera.',['Riproduzione e distribuzione','Elaborazione e comunicazione','Paternità e integrità dell’opera']],
      ['La paternità dell’opera','In Italia l’articolo 20 della legge 633/1941 consente all’autore di rivendicare la paternità anche dopo la cessione dei diritti economici.',['Indicare correttamente l’autore','Non attribuirsi il lavoro altrui','Separare credito e permesso d’uso']],
      ['Le licenze Creative Commons','Le sigle combinano condizioni standard e leggibili. BY è presente nelle sei licenze principali.',['BY · attribuzione','SA · stessa licenza','NC · non commerciale','ND · nessuna opera derivata']],
      ['CC BY','Consente condivisione e adattamento, anche commerciale, a condizione di attribuire correttamente la fonte.',['Massima apertura tra le licenze CC','Adattamenti permessi','Attribuzione obbligatoria']],
      ['CC BY-SA','Consente la modifica, ma l’opera derivata deve essere distribuita con gli stessi termini o con una licenza compatibile.',['BY: cita l’autore','SA: condividi allo stesso modo','È la risposta alla domanda 1']],
      ['CC BY-ND','Consente la redistribuzione, anche commerciale, ma non autorizza la condivisione di versioni modificate.',['ND significa NoDerivatives','Una traduzione è un adattamento','Non confonderla con SA']],
      ['CC BY-NC e BY-NC-SA','NC limita gli usi commerciali; SA aggiunge l’obbligo di mantenere gli stessi termini sulle opere derivate.',['Definire il contesto d’uso','Verificare eventuali eccezioni','Chiedere permesso se il caso è dubbio']],
      ['CC0 non è una licenza CC ordinaria','CC0 è uno strumento di rinuncia e dedica al pubblico dominio nella misura consentita dalla legge.',['Nessun obbligo licenziale standard','Citare resta una buona pratica','I diritti morali dipendono dalla legge applicabile']],
      ['Come leggere una sigla','Procedi da sinistra a destra e traduci ogni condizione in un’azione concreta prima di riusare il materiale.',['CC: famiglia di strumenti','BY: prepara il credito','NC/ND/SA: controlla il progetto']],
      ['Attribuire con il metodo TASL','Una buona attribuzione permette di risalire senza ambiguità all’opera e alle condizioni d’uso.',['T · Titolo','A · Autore','S · Source, collegamento','L · Licenza, collegamento']],
      ['Esempio di attribuzione','“Mappa dei quartieri”, Giulia Rossi, fonte collegata, CC BY-SA 4.0. Indica anche le modifiche effettuate.',['Credito vicino al contenuto','Link alla fonte originale','Nota: colori e testi adattati']],
      ['Che cos’è un adattamento','Tradurre, montare, trasformare o combinare creativamente può produrre un’opera derivata; la semplice copia non è un remix.',['Traduzione','Montaggio audiovisivo','Rielaborazione grafica']],
      ['Remix: combinare per creare','Nel lessico OER, Remix significa combinare il contenuto originale o rivisto con altro materiale per produrre qualcosa di nuovo.',['Non basta inserire un link','Non è duplicare un file','Non coincide con cambiare formato']],
      ['Compatibilità prima del remix','Due materiali possono avere condizioni incompatibili. Prima del montaggio confronta licenze, attribuzioni e destinazione finale.',['ND blocca la condivisione dell’adattamento','SA condiziona la licenza finale','NC richiede attenzione all’uso']],
      ['OER: risorse educative aperte','Una OER unisce finalità educativa e permessi aperti che rendono possibili pratiche oltre la semplice consultazione.',['Materiale di apprendimento','Licenza aperta o pubblico dominio','Possibilità concreta di riuso']],
      ['Le 5R complete','David Wiley definisce cinque permessi distinti: Retain, Revise, Remix, Reuse e Redistribute.',['Conservare','Rivedere','Rimescolare','Riutilizzare','Ridistribuire']],
      ['Correzione della domanda 7','L’opzione indicata contiene solo quattro azioni: manca Retain, cioè il diritto di possedere e controllare copie.',['La risposta è la più vicina','Ma non definisce tutte le 5R','Il quiz va corretto']],
      ['Caso pratico: dispensa di classe','Vuoi tradurre una dispensa CC BY-SA, aggiungere esercizi e distribuirla. L’adattamento è permesso, con credito e stessa licenza.',['Conserva la fonte','Descrivi le modifiche','Applica CC BY-SA compatibile']],
      ['Checklist prima di pubblicare','Trasforma il controllo giuridico in una procedura ripetibile, documentata e verificabile.',['Identifica autore e provenienza','Leggi la licenza completa','Verifica compatibilità e scopo','Scrivi attribuzione e modifiche']],
      ['Verifica: scegli e motiva','Quale licenza consente di modificare purché la derivata mantenga gli stessi termini? Spiega il ruolo di BY e SA.',['Risposta: CC BY-SA','BY richiede attribuzione','SA mantiene la condivisione alle stesse condizioni']]
    ]
  },
  {
    file:'rw02-06-accessibilita-immagini.html', code:'RW02.06', course:'course-rw', title:'Accessibilità delle immagini',
    subtitle:'Testo alternativo, immagini decorative e decisioni coerenti con WCAG 2.1.',
    next:'rw02-07-metadati-formati.html', nextLabel:'RW02.07 · Metadati e formati',
    sources:[['WCAG 2.1','https://www.w3.org/TR/WCAG21/'],['WAI: immagini decorative','https://www.w3.org/WAI/tutorials/images/decorative/'],['Tecnica H67','https://www.w3.org/WAI/WCAG21/Techniques/html/H67.html']],
    slides:[
      ['Accessibile significa percepibile','Se un’immagine trasmette informazione, la stessa funzione deve essere disponibile anche a chi non la vede.',['Contenuto equivalente','Contesto d’uso','Tecnologia assistiva']],
      ['Il requisito WCAG 1.1.1','I contenuti non testuali richiedono un’alternativa testuale equivalente, salvo casi specifici come la pura decorazione.',['Descrivere lo scopo','Non replicare dettagli inutili','Permettere l’ignoramento della decorazione']],
      ['Prima domanda: che funzione ha?','Lo stesso file può richiedere alt diversi in pagine diverse. La decisione dipende da ciò che comunica nel contesto.',['Informativa','Funzionale','Decorativa','Complessa']],
      ['Immagine informativa','L’alt comunica l’informazione essenziale che andrebbe persa rimuovendo l’immagine.',['Breve ma sufficiente','Niente “immagine di” se superfluo','Usa il testo vicino come contesto']],
      ['Immagine funzionale','Se l’immagine è un pulsante o un link, l’alt descrive l’azione o la destinazione, non l’aspetto.',['“Cerca”','“Scarica il report”','“Pagina iniziale”']],
      ['Immagine puramente decorativa','Se non aggiunge informazione e serve solo all’estetica, deve poter essere ignorata dalle tecnologie assistive.',['Nessun contenuto utile','Nessuna azione','Nessuna informazione unica']],
      ['La soluzione HTML: alt vuoto','Per un elemento img decorativo si usa alt="". Non è un alt mancante: è una decisione esplicita.',['Risposta alla domanda 2','Lo screen reader può ignorarla','Mantiene pulito il flusso di lettura']],
      ['Vuoto non significa assente','Omettere alt può far annunciare il nome del file; alt="" comunica invece che l’immagine non porta contenuto.',['alt="" · intenzionale','nessun alt · errore o ambiguità','decorazione.png · rumore informativo']],
      ['Quando non basta alt=""','Un diagramma, una foto probatoria o un’icona cliccabile non sono decorazioni solo perché rendono la pagina più bella.',['Diagramma: riassunto e descrizione','Foto: informazione contestuale','Icona-link: nome accessibile']],
      ['Immagini complesse','Grafici e infografiche richiedono un alt sintetico e una spiegazione estesa vicina o collegata.',['Messaggio principale','Dati o tendenze','Posizione della descrizione lunga']],
      ['Testo dentro le immagini','Quando possibile usa vero testo HTML: si ridimensiona, si traduce, si seleziona e si adatta meglio.',['Contrasto verificabile','Zoom senza perdita','Lettura assistita']],
      ['Decision tree operativo','Chiedi in ordine: è un controllo? comunica informazione? duplica interamente il testo vicino? è pura decorazione?',['Azione → nome dell’azione','Informazione → equivalente breve','Duplicata/decorativa → alt vuoto']],
      ['Revisione con screen reader','Controlla il risultato nel flusso reale: l’alt deve essere utile, non soltanto presente nel codice.',['Ascolta l’ordine','Cerca ripetizioni','Verifica link e controlli']],
      ['Verifica: decorativa o informativa?','Una linea ornamentale tra due sezioni non aggiunge contenuto: quale attributo useresti e perché?',['Risposta: alt=""','Permette di ignorare l’immagine','Non usare nome file o descrizione dei colori']]
    ]
  },
  {
    file:'rw02-07-metadati-formati.html', code:'RW02.07', course:'course-rw', title:'Metadati e formati', subtitle:'Descrivere, ritrovare e conservare immagini scegliendo il formato adatto.',
    next:'rw02-08-podcast-storytelling.html', nextLabel:'RW02.08 · Podcast e storytelling',
    sources:[['PREMIS — Library of Congress','https://www.loc.gov/standards/premis/'],['SVG — W3C','https://www.w3.org/TR/SVG11/single-page.html']],
    slides:[
      ['Il file non è solo pixel','Un’immagine può contenere o essere accompagnata da dati che descrivono provenienza, contenuto, diritti e caratteristiche tecniche.',['Contenuto visivo','Metadati descrittivi','Metadati tecnici e amministrativi']],
      ['Che cosa sono i metadati','Sono dati strutturati su una risorsa. Rendono esplicite informazioni che altrimenti resterebbero nel nome file o nella memoria di qualcuno.',['Titolo e autore','Data e luogo','Licenza e diritti','Formato e dimensioni']],
      ['Perché servono in archivio','La funzione principale è facilitare indicizzazione, ricerca, comprensione e gestione nel tempo.',['Risposta alla domanda 4','Filtri e ordinamento','Recupero affidabile']],
      ['Tre famiglie utili','Una classificazione pratica distingue metadati descrittivi, amministrativi e strutturali.',['Descrittivi: cosa rappresenta','Amministrativi: provenienza e diritti','Strutturali: relazioni tra parti']],
      ['Metadati tecnici','Dimensioni, profilo colore, dispositivo, software e data di acquisizione aiutano controllo e conservazione.',['Risoluzione in pixel','Spazio colore','Versione del formato']],
      ['Metadati per la conservazione','PREMIS definisce informazioni essenziali per sostenere la conservazione e l’usabilità a lungo termine degli oggetti digitali.',['Oggetti','Eventi','Agenti','Diritti']],
      ['Indicizzare non è rinominare','Un buon nome file aiuta, ma i metadati consentono più chiavi di ricerca senza duplicare l’immagine.',['Titolo leggibile','Parole chiave controllate','Autore e data separati']],
      ['Qualità dei metadati','I campi devono essere coerenti, comprensibili e applicati con regole comuni.',['Vocabolari condivisi','Date in formato uniforme','Nomi non ambigui']],
      ['Metadati sensibili','EXIF può includere coordinate GPS, modello del dispositivo e data. Prima di pubblicare valuta privacy e sicurezza.',['Controlla geolocalizzazione','Rimuovi dati non necessari','Conserva una copia archivistica']],
      ['Raster e vettoriale','Le immagini raster memorizzano pixel; le vettoriali descrivono forme geometriche che vengono rasterizzate al momento della visualizzazione.',['JPEG/PNG: griglia di pixel','SVG: forme, curve e testo','Usi differenti, non classifica di qualità']],
      ['JPEG','Adatto soprattutto a fotografie e immagini con molte variazioni tonali; la compressione con perdita può introdurre artefatti.',['File spesso compatto','Niente trasparenza standard','Non ideale per loghi con bordi netti']],
      ['PNG','Adatto a schermate, grafica raster nitida e trasparenze; usa compressione senza perdita.',['Bordi netti','Canale alfa','Può pesare molto con fotografie']],
      ['SVG','Descrive grafica bidimensionale in XML ed è indipendente dalla risoluzione: si adatta a dimensioni diverse.',['Risposta alla domanda 6','Ideale per loghi e icone','Modificabile come struttura vettoriale']],
      ['Scalabilità non significa “infinito” fisico','SVG non dipende da una griglia pixel fissa, ma schermi, stampanti, effetti raster incorporati e precisione hanno limiti pratici.',['Qualità coerente a più dimensioni','Rendering sul dispositivo','Controllare font ed effetti']],
      ['Scegliere il formato','Parti dal contenuto e dall’uso finale, non dall’abitudine.',['Logo → SVG','Fotografia web → JPEG o formati moderni','Screenshot trasparente → PNG']],
      ['Verifica: archivio e logo','Perché i metadati aiutano a ritrovare un’immagine? Quale formato useresti per un logo ridimensionabile?',['Indicizzazione e reperimento','SVG per grafica vettoriale','Motivare entrambe le scelte']]
    ]
  },
  {
    file:'rw02-08-podcast-storytelling.html', code:'RW02.08', course:'course-rw', title:'Podcast e storytelling digitale', subtitle:'Progettare una storia, registrare una voce e consegnare un audio coerente.',
    next:'rw03-01-identita.html', nextLabel:'RW03.01 · Identità online',
    sources:[['EBU R 128','https://tech.ebu.ch/publications/r128'],['EBU: Loudness','https://tech.ebu.ch/loudness/']],
    slides:[
      ['Dal messaggio all’esperienza','Un contenuto digitale efficace coordina obiettivo, pubblico, struttura narrativa, voce, ritmo e interazione.',['Cosa deve capire il pubblico','Cosa deve ricordare','Cosa deve fare dopo']],
      ['Il nucleo narrativo','Prima degli effetti definisci una trasformazione: una situazione iniziale cambia attraverso tensione, scelta o scoperta.',['Contesto','Tensione','Svolta','Esito']],
      ['Pubblico e promessa','La prima parte chiarisce perché vale la pena ascoltare e quale bisogno verrà soddisfatto.',['Domanda guida','Beneficio concreto','Tempo richiesto']],
      ['Struttura lineare','Segue un ordine stabilito dall’autore. È adatta a spiegazioni progressive e racconti con forte causalità.',['Inizio','Sviluppo','Conclusione']],
      ['Struttura non lineare','Permette salti temporali, percorsi o approfondimenti scelti dall’utente. È una tecnica possibile, non un obbligo universale.',['Flashback','Rami interattivi','Collegamenti contestuali']],
      ['Correzione della domanda 10','“Uso di una struttura non lineare” può sostenere l’attenzione in alcuni contenuti web, ma non è di per sé un principio fondamentale.',['Dipende da pubblico e obiettivo','La chiarezza resta prioritaria','La domanda va resa meno assoluta']],
      ['Una domanda migliore','Quale tecnica può aumentare coinvolgimento e controllo in un racconto web interattivo? In quel contesto, una struttura non lineare è plausibile.',['Specificare “può”','Specificare “interattivo”','Evitare una regola universale']],
      ['Scrivere per l’ascolto','Le frasi devono funzionare senza poter tornare indietro con gli occhi.',['Periodi brevi','Una idea per frase','Segnalazioni verbali della struttura']],
      ['Scaletta di un podcast','Una scaletta distribuisce tempo, funzione e responsabilità di ogni segmento prima della registrazione.',['Apertura','Sviluppo in blocchi','Riepilogo','Chiusura e invito all’azione']],
      ['Ambiente e microfono','La distanza costante e una stanza poco riflettente incidono più di molti filtri applicati dopo.',['Microfono fuori asse di pochi gradi','Superfici morbide','Test prima della sessione']],
      ['Livello in registrazione','Registra con margine per evitare clipping; un picco tagliato non si recupera davvero in post-produzione.',['Controlla i passaggi più forti','Evita il rosso sul meter','Mantieni distanza costante']],
      ['Montaggio editoriale','Taglia esitazioni inutili e ripetizioni, ma conserva respiri e pause che rendono naturale il discorso.',['Chiarezza','Ritmo','Continuità']],
      ['Riduzione del rumore','Serve a contenere un disturbo stabile, non a sostituire una buona registrazione. Un intervento eccessivo crea artefatti.',['Campione del rumore','Riduzione moderata','Ascolto in cuffia']],
      ['Picco e loudness non sono uguali','Il picco misura un massimo istantaneo; la loudness descrive il livello percepito nel tempo. Due file con lo stesso picco possono sembrare diversi.',['Peak','True peak','Loudness integrata in LUFS']],
      ['Normalizzazione di picco','Sposta il guadagno affinché il picco massimo raggiunga un valore obiettivo. Non uniforma automaticamente la percezione tra episodi.',['È ciò che descrive la domanda 9','Modifica globale del livello','Non elimina rumore né riverbero']],
      ['Normalizzazione della loudness','Gli standard moderni come EBU R 128 misurano la loudness media e controllano separatamente il true peak.',['Coerenza percepita','Target di distribuzione','Limite tecnico dei picchi']],
      ['Correzione della domanda 9','“Uniformare il picco massimo” descrive la normalizzazione di picco, ma per un podcast conviene distinguere picco e loudness.',['Risposta A nel significato stretto','Formulazione incompleta per la produzione moderna','Aggiungere LUFS e true peak']],
      ['Verifica: racconta e consegna','Spiega quando useresti una struttura non lineare e perché il solo picco non garantisce episodi percepiti allo stesso volume.',['Scelta narrativa motivata','Loudness media vs massimo','Controllo finale su più dispositivi']]
    ]
  },
  {
    file:'pr01-07-iterazione-cicli.html', code:'PR01.07', course:'course-sc', title:'Iterazione e cicli', subtitle:'Ripetere istruzioni con una condizione, controllare lo stato e dimostrare la terminazione.',
    next:'pr02-01-introduzione.html', nextLabel:'PR02.01 · Introduzione a Scratch',
    sources:[['Python: while','https://docs.python.org/3/reference/compound_stmts.html#the-while-statement'],['Python: for','https://docs.python.org/3/tutorial/controlflow.html#for-statements']],
    slides:[
      ['Dalla ripetizione al ciclo','Un’iterazione è l’esecuzione ripetuta di un blocco di istruzioni. Il ciclo definisce che cosa ripetere e quando fermarsi.',['Risposta alla domanda 5','Blocco ripetuto','Regola di avanzamento']],
      ['Le parti di un ciclo','Per ragionare senza dipendere dal linguaggio individua stato iniziale, condizione, corpo e aggiornamento.',['Inizializzazione','Test','Istruzioni','Aggiornamento']],
      ['Ciclo a conteggio','Quando conosci il numero di ripetizioni, usa un contatore o percorri una sequenza finita.',['Da 1 a 10','Per ogni elemento','Numero di tentativi fissato']],
      ['Ciclo condizionale','Quando non sai quante ripetizioni serviranno, continua finché una condizione resta vera o fino a un evento.',['Finché ci sono dati','Finché la password è errata','Finché non arriva il segnale']],
      ['Pseudocodice di un while','Lo pseudocodice rende visibili condizione e aggiornamento prima della sintassi del linguaggio.',['contatore ← 0','MENTRE contatore < 5','stampa e incrementa']],
      ['Tracciare lo stato','Una tabella di traccia mostra il valore delle variabili a ogni iterazione e aiuta a individuare errori logici.',['Iterazione','Condizione','Valori prima e dopo','Output']],
      ['Loop infinito','Se la condizione resta sempre vera o lo stato non avanza verso l’uscita, il programma non termina.',['Aggiornamento mancante','Condizione impossibile','Dato esterno mai ricevuto']],
      ['Off-by-one','Gli errori di un’unità nascono da estremi inclusi/esclusi e dal punto in cui si aggiorna il contatore.',['< oppure ≤','Partenza da 0 o 1','Ultimo valore elaborato']],
      ['Accumulatore e contatore','Il contatore misura quante volte; l’accumulatore combina progressivamente valori, per esempio una somma.',['conteggio ← conteggio + 1','totale ← totale + valore','Ruoli diversi']],
      ['Verifica: progetta il ciclo','Descrivi un ciclo che legge cinque prezzi e calcola il totale. Indica inizializzazione, condizione, corpo e aggiornamento.',['totale iniziale 0','cinque iterazioni','somma ogni prezzo','incrementa il contatore']]
    ]
  }
];

const css = `:root{--paper:#f4ece0;--paper-2:#ece0cf;--ink:#1c1714;--ink-soft:#3a322c;--ink-faint:#6b5f54;--red:#e6533b;--teal:#163b35;--teal-2:#1f5249;--gold:#e6c14a;--gold-deep:#d98a2b;--sky:#3f7e8c;--line:#d8c9b4;--font-display:"Fraunces",Georgia,serif;--font-body:"Space Grotesk",sans-serif;--font-mono:"Space Mono",monospace;--stage-bg:#241d17;--slide-bg:var(--paper)}*{box-sizing:border-box;margin:0;padding:0}html,body{width:100%;height:100%;overflow:hidden;background:var(--stage-bg)}.deck-viewport{position:fixed;inset:0;overflow:hidden}.deck-stage{position:absolute;left:0;top:0;width:1920px;height:1080px;transform-origin:0 0;background:var(--slide-bg)}.slide{position:absolute;inset:0;width:1920px;height:1080px;overflow:hidden;visibility:hidden;opacity:0;pointer-events:none;padding:96px 112px;font-family:var(--font-body);color:var(--ink);background:var(--slide-bg)}.slide.active,.slide.visible{visibility:visible;opacity:1;pointer-events:auto}.slide:before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(216,201,180,.22) 1px,transparent 1px),linear-gradient(90deg,rgba(216,201,180,.22) 1px,transparent 1px);background-size:48px 48px;pointer-events:none}.slide>*{position:relative;z-index:1}.reveal{opacity:0;transform:translateY(22px);transition:.5s ease}.visible .reveal{opacity:1;transform:none}.title-slide{padding:0;display:grid;grid-template-columns:1.35fr 1fr}.title-left{padding:110px;display:flex;flex-direction:column;justify-content:center}.title-right{position:relative;background:var(--teal);display:grid;place-items:center;overflow:hidden}.title-right:before{content:"";position:absolute;width:720px;height:720px;border-radius:50%;background:radial-gradient(circle at 35% 35%,var(--sky),var(--teal-2));right:-160px;top:-150px}.title-right>div,.title-right>svg{position:relative;z-index:2}.h-mega{font:900 116px/.88 var(--font-display);letter-spacing:-3px}.h-sec{font:900 70px/.98 var(--font-display);max-width:1500px}.lead{font-size:30px;line-height:1.42;color:var(--ink-soft);max-width:1450px;margin-top:22px}.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:22px;margin-top:40px}.card{background:#fffaf2;border-left:6px solid var(--teal);padding:24px 28px;box-shadow:0 12px 30px rgba(28,23,20,.10);min-height:130px}.card:nth-child(2n){border-color:var(--sky)}.card:nth-child(3n){border-color:var(--gold-deep)}.card b{display:block;font:800 28px/1.2 var(--font-display);margin-bottom:8px}.card p{font-size:24px;line-height:1.36;color:var(--ink-soft)}.analogy{display:inline-flex;align-items:center;gap:16px;background:var(--teal);color:var(--paper);border-radius:50px;padding:15px 26px;font-size:25px;font-weight:600;margin-top:34px}.analogy .big{font:900 31px var(--font-display);color:var(--gold)}.illu{width:470px;background:#fbf5ec;border:3px solid var(--ink);border-radius:20px;box-shadow:9px 10px rgba(28,23,20,.14);padding:34px}.illu-cap{font:20px var(--font-mono);color:var(--ink-faint);text-align:center;margin-top:15px}.agenda-item{display:flex;gap:20px;border-bottom:2px dashed var(--line);padding:14px 4px}.agenda-item .n{font:700 23px var(--font-mono);color:var(--red);min-width:52px}.agenda-item b{font-size:27px}.closing{background:var(--teal);color:var(--paper)}.closing .h-sec,.closing .lead{color:var(--paper)}.sources{display:grid;grid-template-columns:1fr 1fr;gap:12px 30px;margin-top:28px}.sources a{font:18px/1.35 var(--font-mono);color:var(--paper);text-underline-offset:3px}.page-num{position:absolute;right:110px;bottom:45px;font:22px var(--font-mono);color:var(--ink-faint)}.page-num b{font-size:30px;color:var(--red)}.deck-author{position:absolute;left:112px;bottom:46px;font:18px var(--font-mono);color:var(--ink-faint)}.closing .deck-author{color:var(--paper)}.progress{position:fixed;left:0;bottom:0;height:6px;background:var(--red);z-index:20}.home-btn{position:fixed;left:18px;bottom:18px;z-index:30;color:var(--paper);background:rgba(28,23,20,.7);border-radius:99px;padding:8px 15px;text-decoration:none;font:15px var(--font-mono)}.closing-actions{margin-top:30px}.closing-actions a{display:inline-block;color:var(--ink);background:var(--gold);padding:14px 24px;border-radius:40px;text-decoration:none;font-weight:700}@media print{html,body{overflow:visible}.deck-viewport,.deck-stage{position:static;transform:none!important}.slide{position:relative;visibility:visible!important;opacity:1!important;break-after:page}}`;

const icon = `<div class="illu"><svg viewBox="0 0 420 300" xmlns="http://www.w3.org/2000/svg"><rect x="48" y="58" width="324" height="184" rx="22" fill="#f4ece0" stroke="#1c1714" stroke-width="5"/><path d="M88 110h244M88 150h170M88 190h210" stroke="#163b35" stroke-width="13" stroke-linecap="round"/><circle cx="326" cy="188" r="34" fill="#e6c14a" stroke="#1c1714" stroke-width="5"/><path d="M315 188l9 10 17-22" fill="none" stroke="#163b35" stroke-width="8" stroke-linecap="round"/></svg><div class="illu-cap">analizzare · scegliere · documentare</div></div>`;

function contentSlide(s, i){
  const [title,lead,items]=s;
  const cards=items.map((x,j)=>`<div class="card${i===0?' agenda-item':''} reveal"><b>${String(j+1).padStart(2,'0')}</b><p>${x}</p></div>`).join('');
  const analogy=i===1?`<div class="analogy reveal"><span class="big">Regola:</span> La scelta corretta dipende dalla funzione, dal contesto e dalle condizioni verificabili.</div>`:'';
  return `<section class="slide"><h2 class="h-sec reveal">${title}</h2><p class="lead reveal">${lead}</p><div class="grid">${cards}</div>${analogy}<div class="page-num"></div></section>`;
}

function makeDeck(d){
  const body=d.slides.map(contentSlide).join('\n');
  const sources=d.sources.map(([n,u])=>`<a href="${u}" target="_blank" rel="noopener noreferrer">${n} ↗</a>`).join('');
  return `${ip}\n<!doctype html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${d.title} · ${d.code}</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700;9..144,900&family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet"><style>${css}</style><link rel="stylesheet" href="theme-corsi.css"></head><body class="${d.course}"><div class="deck-viewport"><main class="deck-stage"><section class="slide title-slide"><div class="title-left"><div class="h-mega reveal">${d.title}</div><p class="lead reveal">${d.subtitle}</p></div><div class="title-right">${icon}</div><div class="page-num"></div><div class="deck-author">${author}</div></section>${body}<section class="slide closing"><h2 class="h-sec reveal">Punti da portare con sé</h2><p class="lead reveal">Rivedi le decisioni, motiva le risposte e applica il metodo a un contenuto reale prima di passare al blocco successivo.</p><div class="sources">${sources}</div><div class="closing-actions"><a href="${d.next}">Prossimo → ${d.nextLabel}</a></div><div class="page-num"></div><div class="deck-author">${author}</div></section></main></div><div class="progress"></div><a class="home-btn" href="00-indice.html">↩ Indice</a><script src="deck.js"></script></body></html>`;
}

function strip(html){return html.replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi,'').replace(/<br\s*\/?>/gi,'\n').replace(/<[^>]+>/g,' ').replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/&#39;/g,"'").replace(/\s+/g,' ').trim()}

// Mantiene la lezione entro 80 slide complessive, conservando verifiche e concetti chiave.
const omit = {
  'rw02-05-licenze-oer.html': new Set([10,12]),
  'rw02-06-accessibilita-immagini.html': new Set([10,12]),
  'rw02-07-metadati-formati.html': new Set([5,13]),
  'rw02-08-podcast-storytelling.html': new Set([9,12]),
  'pr01-07-iterazione-cicli.html': new Set([2,7])
};
for (const d of decks) d.slides = d.slides.filter((_, i) => !omit[d.file].has(i));

for(const d of decks){
  const html=makeDeck(d); fs.writeFileSync(d.file,html);
  const sections=[...html.matchAll(/<section[^>]*class="slide[^>]*>([\s\S]*?)<\/section>/g)].map(m=>strip(m[1]));
  const txt=[`${d.title} · ${d.code}`,'='.repeat(48),'',...sections.flatMap((t,i)=>[`--- Slide ${i+1} ---`,t,''])].join('\n');
  fs.writeFileSync(d.file.replace(/\.html$/,'.txt'),`${ip}\n${txt}\n`);
}

console.log(decks.map(d=>`${d.file}: ${d.slides.length+2} slide`).join('\n'));
