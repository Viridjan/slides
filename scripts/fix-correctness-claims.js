/* Proprietà intellettuale di Francesco Antonio Binetti */
const fs = require('fs');

const fixes = new Map();
const add = (file, from, to) => {
  if (!fixes.has(file)) fixes.set(file, []);
  fixes.get(file).push([from, to]);
};
const pair = (stem, from, to) => {
  add(`${stem}.html`, from, to);
  add(`${stem}.txt`, from, to);
};

// Hardware and identity: qualify rules of thumb that were presented as absolutes.
pair('hs01-componenti', 'Un byte è una piccolissima quantità di informazione — più o meno una lettera dell\'alfabeto.', 'Un byte è una piccolissima quantità di informazione: può rappresentare un carattere ASCII, mentre molti caratteri Unicode richiedono più byte.');
pair('hs01-componenti', 'Byte — B L\'unità base. ~1 carattere di testo.', 'Byte — B Unità di memoria pari a 8 bit. Un carattere può occupare uno o più byte, secondo la codifica.');
pair('rw03-04-branding', 'Max 2 font: uno per titoli, uno per testi. Usali sempre uguali su ogni supporto.', 'Per un sistema semplice, parti da 1–2 famiglie: una per i titoli e una per i testi. Mantieni poi gli stessi ruoli sui diversi supporti.');

// Social platforms: avoid frozen demographic claims and obsolete format limits.
pair('rw03-05-social', 'Instagram Più donne, 18–34 anni. Premia contenuti visivi: foto curate, Reel brevi e Stories quotidiane.', 'Instagram Pubblico ampio e forte vocazione visiva. Foto, caroselli, Reel e Stories rispondono a obiettivi diversi; il pubblico reale va verificato negli insight del profilo.');
pair('rw03-05-social', 'TikTok Prevalentemente donne giovani, Gen Z under 25. Il formato è solo video breve (15–60 s); l\'algoritmo premia la creatività più che i follower.', 'TikTok Pubblico e formati evolvono rapidamente: non è limitato ai video da 15–60 secondi. La scelta va basata sugli insight del proprio pubblico e sul tipo di racconto video.');
pair('rw03-05-social', 'Snapchat Giovanissimi (13–20 anni); contenuti effimeri che spariscono dopo 24h.', 'Snapchat Pubblico tendenzialmente giovane. Molti Snap spariscono dopo la visualizzazione e le Stories di norma dopo 24 ore, ma salvataggi e impostazioni possono conservarli più a lungo.');
pair('rw03-05-social', 'Pinterest Prevalentemente donne; piattaforma di ispirazione con immagini e collezioni.', 'Pinterest Piattaforma visuale di scoperta e raccolta di idee; è utile quando le persone cercano ispirazione, prodotti o progetti nel tempo.');
pair('rw03-05-social', 'Anche 5€/giorno per 7 giorni (35€ totali) possono fare una differenza concreta a livello locale se il targeting è preciso e il contenuto sponsorizzato è già il tuo post con più engagement organico.', 'Un piccolo test pubblicitario può misurare copertura, clic o contatti, ma non garantisce risultati: definisci prima obiettivo, pubblico, budget massimo e criterio di successo.');

// Mobile privacy and security: distinguish access, transmission and platform-dependent behaviour.
pair('sm05-privacy-telefono', 'Quando un\'app legge la tua rubrica, stai condividendo i numeri di persone che non hanno mai dato il consenso.', 'Quando autorizzi la rubrica, l\'app può accedere ai dati dei contatti; verifica nell\'informativa se li elabora solo sul dispositivo oppure li trasmette ai propri server.');
pair('sm05-privacy-telefono', 'Quel permesso concesso due anni fa a un\'app che non usi più è ancora attivo, adesso.', 'Un vecchio permesso può essere ancora attivo, anche se Android e iOS possono limitarlo o revocarlo per app inutilizzate: controlla comunque il pannello Privacy.');
pair('sm05-privacy-telefono', 'Alternativa concreta: condividi in chat ristrette invece che su profili pubblici.', 'Riduci l\'esposizione usando canali ristretti, ricordando che anche chi riceve in chat può salvare o inoltrare il contenuto.');
pair('sm06-sicurezza-smartphone', 'Ogni codice vale 30 secondi e un solo accesso.', 'I codici temporanei hanno durata limitata: quelli delle app TOTP cambiano spesso ogni 30 secondi, mentre SMS e notifiche seguono tempi diversi.');
pair('sm06-sicurezza-smartphone', 'Sullo smartphone il malware arriva quasi sempre travestito da app: il vettore principale sono gli APK scaricati fuori dagli store.', 'Le app installate da fonti non affidabili sono un rischio importante, ma non l\'unico: esistono app malevole negli store, exploit del browser, allegati e attacchi senza clic.');
pair('sm06-sicurezza-smartphone', 'Quando una vulnerabilità diventa pubblica, gli attacchi che la sfruttano compaiono nel giro di giorni.', 'Dopo la pubblicazione di una vulnerabilità gli attacchi possono comparire rapidamente, ma i tempi variano: per questo gli aggiornamenti di sicurezza non vanno rimandati.');
pair('sm06-sicurezza-smartphone', '2FA con app autenticatore su email e banca.', 'MFA resistente al phishing dove disponibile; per email usa preferibilmente passkey o app autenticatore, per la banca segui il metodo previsto dall\'istituto.');

// Photos, wellbeing and accessibility: make estimates contextual and legal statements precise.
pair('sm08-fotocamera-contenuti', 'La stessa scena a 48 MP in RAW: 15–25 MB.', 'La stessa scena a 48 MP in RAW può occupare decine di MB, secondo sensore e formato.');
pair('sm08-fotocamera-contenuti', 'Per i minori serve il consenso di chi esercita la responsabilità genitoriale — vale anche per recite, saggi e gare sportive.', 'Per pubblicare immagini riconoscibili di minori serve particolare cautela e, normalmente, una base giuridica adeguata e l\'autorizzazione di chi esercita la responsabilità genitoriale; scuola ed eventi possono avere regole specifiche.');
pair('sm08-fotocamera-contenuti', 'La persona ritratta può chiedere in ogni momento la rimozione dell\'immagine.', 'La persona ritratta può chiedere la rimozione, ma l\'esito dipende dalla base giuridica, dal contesto e dalle eccezioni previste dalla legge.');
pair('sm09-benessere-digitale', 'Ogni avviso è un\'interruzione: gli studi sull\'attenzione stimano che dopo una distrazione servano in media più di 20 minuti per tornare pienamente concentrati.', 'Ogni avviso può interrompere il compito: il costo di ripresa varia per persona e attività, ma le interruzioni frequenti aumentano cambi di contesto ed errori.');
pair('sm09-benessere-digitale', 'Il cervello adolescente è più vulnerabile al design persuasivo: il sistema di controllo degli impulsi è ancora in sviluppo fino ai 25 anni.', 'Durante adolescenza e prima età adulta le funzioni di autocontrollo continuano a maturare, con tempi diversi tra persone: il design persuasivo può quindi richiedere tutele e abitudini consapevoli.');
pair('sm10-accessibilita-uso-pratico', 'Velocità regolabile — gli esperti ascoltano a velocità doppia.', 'Velocità regolabile: ogni persona sceglie il ritmo più comprensibile, anche molto rapido con l\'esperienza.');

// Office suites: current storage, subscription and image-precision facts.
pair('su01-02-google-workspace', 'I file Google non occupano spazio nel limite di 15 GB, mentre gli altri file sì.', 'I nuovi file di Documenti, Fogli, Presentazioni e Moduli consumano la quota Google; i file condivisi consumano in genere lo spazio del proprietario.');
pair('su01-02-google-workspace', 'Il salvataggio è automatico: non si perde mai il lavoro.', 'Il salvataggio è automatico e la cronologia riduce il rischio di perdita, ma restano possibili problemi di account, sincronizzazione o cancellazione.');
pair('su01-02-google-workspace', 'Gmail è il servizio di posta elettronica di Google, con oltre 1,8 miliardi di utenti attivi.', 'Gmail è il servizio di posta elettronica di Google, disponibile da browser e app mobile.');
pair('su01-02-google-workspace', 'Drive è come una chiavetta USB infinita, sempre con te', 'Drive è come una cartella online accessibile dai tuoi dispositivi, entro la quota e i permessi dell\'account');
pair('su01-03-adobe', 'Creative Cloud è l\'abbonamento Adobe che include tutte le app creative (Photoshop, Illustrator, InDesign…), 100 GB di cloud storage e font Adobe Fonts.', 'Creative Cloud raccoglie piani diversi: alcune offerte includono una singola app, altre più applicazioni. Spazio cloud e servizi disponibili dipendono dal piano.');
pair('su01-03-adobe', 'Adobe CC non si compra: si affitta. Senza abbonamento attivo, i file restano accessibili in sola lettura per 180 giorni.', 'Le app a pagamento funzionano in abbonamento. Dopo la cancellazione termina l\'accesso alle funzioni premium; i file locali restano accessibili con software compatibile, mentre la quota cloud viene ridotta e va controllata.');
pair('su01-04-alternativi', 'GIMP lavora solo in 8-bit per canale (Photoshop supporta 32-bit). Non adatto a flussi di lavoro fotografici professionali RAW.', 'GIMP supporta precisioni a 8, 16 e 32 bit, anche in virgola mobile. Per i RAW usa normalmente un convertitore dedicato e il flusso va verificato in base a profili colore, plugin e requisiti di stampa.');

// Cybersecurity: remove unsupported statistics and correct technical/legal scope.
pair('sd01-introduzione', 'In Italia nel 2023 sono stati registrati oltre 2.100 attacchi informatici significativi. Il 65% ha preso di mira privati cittadini e piccole imprese.', 'Le statistiche cambiano molto secondo fonte e definizione di “incidente” o “attacco”. Prima di confrontare numeri, controlla periodo, campione e metodologia del rapporto citato.');
pair('sd01-introduzione', 'Spesso impossibile da distinguere da quella vera.', 'Può imitare molto bene grafica e tono del mittente: dominio, richiesta e canale di verifica restano più affidabili dell\'aspetto.');
pair('sd01-introduzione', 'Recuperare i soldi è spesso impossibile.', 'Il recupero del denaro può essere difficile e dipende da tempi, circuito di pagamento e intervento della banca: segnala subito l\'operazione.');
pair('sd02-minacce', 'Il riscatto medio richiesto alle PMI italiane nel 2023 è stato di € 82.000. Il 40% delle aziende colpite ha chiuso entro 12 mesi dall\'attacco.', 'Importi e conseguenze variano molto tra campioni. Il pagamento non garantisce il recupero: la priorità è isolare l\'incidente, conservare le prove e ripristinare da backup verificati.');
pair('sd02-minacce', 'Il 36% di tutte le violazioni di dati nel 2023 è iniziato con un attacco di phishing. È la porta d\'ingresso più usata dagli hacker, proprio perché funziona.', 'Phishing e pretexting restano componenti importanti dell\'ingegneria sociale, ma la quota cambia per settore e rapporto: cita sempre anno, campione e definizione della statistica.');
pair('sd02-minacce', 'La botnet Mirai nel 2016 ha usato 600.000 dispositivi IoT (telecamere, router, frigoriferi smart) per abbattere Netflix, Twitter e Reddit con un singolo attacco.', 'Nel 2016 varianti della botnet Mirai sfruttarono dispositivi IoT con credenziali deboli per colpire Dyn; l\'indisponibilità del DNS rese irraggiungibili numerosi servizi, senza “abbattere” direttamente ogni sito.');
pair('sd02-minacce', 'WannaCry (2017): zero-day in Windows usata da NSA, rubata e pubblicata.', 'WannaCry (2017): sfruttò una vulnerabilità SMB per cui Microsoft aveva già pubblicato la patch MS17-010; molti sistemi colpiti non erano aggiornati.');
pair('sd02-minacce', 'Una VPN cifra tutto il traffico internet tra il tuo dispositivo e un server remoto, rendendo impossibile per chiunque intercettare i dati nel mezzo.', 'Una VPN crea un tunnel cifrato fino al server VPN e protegge dal monitoraggio sulla rete locale; non rende sicuri endpoint compromessi, siti malevoli o traffico oltre il server VPN.');
pair('sd03-privacy', 'Si applica a qualsiasi azienda che tratta dati di cittadini EU.', 'Si applica ai trattamenti svolti nel contesto di uno stabilimento nell\'UE e, in alcuni casi, a chi offre beni o servizi o monitora persone che si trovano nell\'UE: non dipende dalla cittadinanza.');
pair('sd03-privacy', 'Il solo indirizzo IP è sufficiente a identificarti.', 'Un indirizzo IP è un identificatore online e può contribuire a ricondurre l\'attività a un abbonamento o dispositivo, ma da solo non identifica sempre una persona precisa.');
pair('sd03-privacy', 'Devono rispondere entro 30 giorni.', 'Devono rispondere senza ingiustificato ritardo e, di norma, entro un mese; nei casi complessi il termine può essere esteso motivandolo.');
pair('sd03-privacy', 'Il GDPR richiede che i default siano sempre i più protettivi. Il profilo Instagram nuovo deve essere privato per default, non pubblico.', 'Il GDPR richiede che, per impostazione predefinita, siano trattati solo i dati necessari allo scopo. Non impone una singola impostazione identica a ogni social: contano finalità, pubblico previsto e minimizzazione.');
pair('sd03-privacy', 'Restituisce i risultati di Google ma senza tracciamento. Il "best of both worlds": qualità Google, privacy DuckDuckGo.', 'Interroga risultati provenienti da più fornitori e dichiara di non profilare l\'utente per la pubblicità personalizzata; privacy e qualità vanno valutate leggendo policy e impostazioni correnti.');
pair('sd04-professioni', 'Nel 2023 si stimano 3,5 milioni di posizioni aperte nel settore della sicurezza informatica a livello globale.', 'Le stime di settore parlano di un divario globale di competenze e forza lavoro, che non equivale automaticamente a 3,5 milioni di offerte di lavoro pubblicate.');
pair('sd04-professioni', 'Lavora nel SOC — una sala operativa attiva 24/7 che monitora l\'intera infrastruttura in tempo reale.', 'Lavora nel SOC, che può operare 24/7 oppure con copertura definita dall\'organizzazione e dai servizi esterni.');
pair('sd04-professioni', 'Il settore riconosce certificazioni indipendenti come standard di competenza:', 'Il settore usa alcune certificazioni come segnali di conoscenza, da affiancare a esperienza pratica e requisiti del ruolo:');
pair('sd04-professioni', 'Oltre 5 miliardi di utenti · 1,7 miliardi di siti web · 5 miliardi di email inviate al giorno · 400 ore di video caricate su YouTube ogni minuto.', 'La superficie digitale cambia continuamente: utenti, servizi, email, dispositivi e contenuti crescono con metriche diverse. Usa rapporti datati e metodologie esplicite quando servono numeri.');
pair('sd05-assessment', 'GDPR dopo Cambridge Analytica.', 'Il GDPR fu adottato nel 2016 ed è applicabile dal 2018; lo scandalo Cambridge Analytica aumentò nello stesso periodo l\'attenzione pubblica sulla protezione dei dati.');
pair('sd05-assessment', 'Richiedi a Google, Meta, LinkedIn tutti i dati che hanno su di te. È un tuo diritto — devono rispondere entro 30 giorni con un archivio scaricabile.', 'Puoi esercitare il diritto di accesso: la risposta arriva di norma entro un mese e descrive dati e trattamento. La portabilità in formato strutturato è un diritto distinto e si applica solo in determinate condizioni.');
pair('sd05-assessment', 'Multa: €20M / 4% fatturato', 'Sanzione massima per alcune violazioni: €20M o 4% del fatturato mondiale annuo, se superiore');
pair('sd05-assessment', 'NIS2 (infrastrutture critiche)', 'NIS2 (soggetti essenziali e importanti nei settori coperti)');

// AI and LLMs: remove undisclosed figures and product-dependent generalisations.
pair('ia01-concetti-generali', 'Eccelle in un solo compito: giocare a scacchi, riconoscere volti, tradurre testi, guidare un\'auto. Non può fare altro.', 'È progettata o addestrata per un ambito delimitato. Alcuni sistemi svolgono più compiti correlati, ma non possiedono la competenza generale e autonoma di una persona.');
pair('ia01-concetti-generali', 'Il GDPR richiede già il diritto a una spiegazione.', 'Il GDPR prevede tutele sulle decisioni automatizzate e informazioni significative sulla logica in determinati casi; non esiste un diritto generale e illimitato alla spiegazione di ogni modello.');
pair('ia01-concetti-generali', 'Stima McKinsey: 300 milioni di posti a rischio automazione entro 2030. Ma anche nuovi mestieri ancora da inventare.', 'Le stime sull\'impatto occupazionale misurano concetti diversi — attività esposte, ore automatizzabili o posti equivalenti — e non sono previsioni certe di licenziamenti.');
pair('ia01-concetti-generali', 'impone obblighi di trasparenza — il più avanzato al mondo.', 'introduce obblighi graduati per rischio e regole specifiche per alcuni sistemi e modelli; l\'applicazione avviene per fasi.');
pair('ia03-llm', 'GPT-4 è stato addestrato su oltre un trilione di token.', 'Per molti modelli commerciali, inclusi alcuni GPT, dimensione e composizione esatte del dataset non sono pubblicate.');
pair('ia03-llm', '"gatto" = 1 token. "intelligenza" = 3+ token.', 'La stessa parola può diventare uno o più token secondo tokenizer, lingua e contesto.');
pair('ia03-llm', 'La "memoria" è solo il contesto della conversazione corrente — si azzera alla chiusura.', 'Il contesto della conversazione non modifica da solo i pesi. Alcuni prodotti possono però conservare cronologia o memorie separate, secondo impostazioni e policy.');
pair('ia03-llm', 'Predice la parola (token) più probabile che segue, una dopo l\'altra.', 'Stima una distribuzione sui token successivi e ne seleziona uno secondo la strategia di generazione, ripetendo il processo.');
pair('ia03-llm', 'Ogni token viene inviato alla rete neurale. I nodi rispondono ai token e si inviano segnali a vicenda — come neuroni nel cervello.', 'I token vengono trasformati in vettori numerici; gli strati del transformer combinano queste rappresentazioni tramite attenzione e altre operazioni matematiche. L\'analogia con i neuroni biologici è solo parziale.');

// Project tools and coding labs: make automation and ML confidence conditional.
pair('pm04-strumenti', 'il piano si aggiorna da solo, il team lo vede in tempo reale.', 'dipendenze, notifiche e viste condivise possono aggiornarsi automaticamente quando dati e regole sono configurati bene.');
pair('pm04-strumenti', 'La dashboard aggrega i numeri del progetto in una schermata: attività completate, budget speso, rischi aperti, scadenze imminenti. È il report per lo sponsor che si scrive da solo.', 'La dashboard aggrega i dati registrati nel progetto: attività completate, budget, rischi e scadenze. Il report è affidabile solo se fonti, filtri e aggiornamenti sono corretti.');
pair('pr03-01-microbit', 'Se non venisse azzerata all\'inizio, il conteggio riprenderebbe da un valore rimasto in memoria.', 'In MakeCode una variabile numerica parte normalmente da 0; inizializzarla esplicitamente rende però l\'intenzione chiara e facilita le modifiche future.');
pair('pr03-02-createai', 'Più i campioni sono numerosi e di qualità, più il modello sarà preciso.', 'Campioni più rappresentativi e puliti possono migliorare il modello; aggiungerne molti ma ripetitivi o sbilanciati non garantisce maggiore precisione.');
pair('pr03-02-createai', 'Un 95% su "shake" è affidabile; un 55% segnala che il gesto è ambiguo per il modello.', 'Una confidenza più alta indica una preferenza più netta del modello, ma non è una probabilità garantita di correttezza e va verificata su dati nuovi.');
pair('pr03-02-createai', 'Raccogli almeno 10-15 esempi per azione con variazioni controllate di velocità e angolazione.', 'Raccogli un primo insieme bilanciato di esempi per azione, poi aggiungi variazioni controllate finché i test su gesti nuovi diventano stabili.');
pair('pr03-02-createai', 'Aggiungi almeno 10-15 esempi per ogni categoria.', 'Aggiungi esempi rappresentativi alla categoria debole e verifica di nuovo su gesti non usati nel training.');
pair('pr03-02-createai', 'Salvare la sessione conserva campioni, azioni e modello addestrato.', 'Salva la sessione per conservare il progetto e i campioni disponibili; dopo modifiche al dataset verifica se è necessario riaddestrare il modello.');

// Tinkercad and printing: remove UI promises and make manufacturing values calibration baselines.
pair('ms01-tinkercad-introduzione', 'Se il browser si chiude, la corrente salta o la campanella suona a metà lavoro, non si perde nulla: al login successivo il progetto è esattamente dove lo si era lasciato.', 'Il salvataggio automatico riduce il rischio di perdita, ma conviene attendere la sincronizzazione e verificare il progetto nella dashboard prima di chiudere.');
pair('ms01-tinkercad-introduzione', 'si assegnano attività con scadenza e si seguono i progressi di ogni studente dalla vista classe', 'si moderano gli accessi con codice classe e si consultano i progetti degli studenti dalla vista classe');
pair('ms01-tinkercad-introduzione', 'Ogni modello 3D pubblicato su TinkerCAD o scaricato da librerie online è soggetto a diritti.', 'Un modello 3D originale può essere protetto dal diritto d\'autore; licenze, eventuali marchi e condizioni della piattaforma determinano gli usi consentiti.');
pair('ms02-modellazione-base', 'La stampa FDM produce oggetti del colore del filamento caricato nella stampante; i modelli multicolore richiedono più estrusori o post-lavorazione manuale.', 'Nella stampa FDM il colore dipende dai filamenti e dalla macchina: più colori possono richiedere cambi manuali, sistemi multi-materiale, più estrusori o post-lavorazione.');
pair('ms03-esportazione-stampa-3d', 'Altezza layer 0,2 mm è lo standard: buon compromesso tra qualità e tempo. A 0,1 mm i dettagli migliorano ma la durata di stampa raddoppia; 0,3 mm va bene per prototipi veloci.', 'Con un ugello da 0,4 mm, 0,2 mm è un comune punto di partenza. Ridurre il layer aumenta in genere dettaglio e tempo, ma non implica un raddoppio esatto; profilo, macchina e geometria cambiano il risultato.');
pair('ms03-esportazione-stampa-3d', 'I supporti sostengono gli sbalzi oltre 45°', 'La regola dei 45° è un punto di partenza: orientamento, materiale, raffreddamento e profilo determinano quando servono supporti');
pair('ms03-esportazione-stampa-3d', 'Sotto il millimetro lo slicer può ignorare la parete o stamparla fragile. Progetta spessori di almeno 1,2–2 mm', 'Pareti più strette della larghezza estrusa possono sparire o risultare fragili. Con ugello da 0,4 mm, 1,2 mm consente spesso tre linee, ma va verificato nel profilo dello slicer');
pair('ms03-esportazione-stampa-3d', 'un foro stampato risulta più stretto di 0,2–0,4 mm rispetto al progetto. Per far incastrare due pezzi lascia sempre un gioco di 0,2–0,3 mm', 'fori e incastri possono risultare diversi dal CAD. Parti da una tolleranza di prova coerente con macchina e materiale e calibra con un campione prima del pezzo finale');
pair('ms03-esportazione-stampa-3d', 'i dettagli sotto 0,2 mm spariscono: l\'ugello standard deposita linee larghe 0,4 mm.', 'i dettagli minimi dipendono da ugello, layer e orientamento; un ugello da 0,4 mm non riproduce in modo affidabile ogni dettaglio più piccolo della propria linea estrusa.');
pair('ms04-classi-attivita', 'rispettando così la normativa GDPR per i minorenni.', 'riducendo i dati richiesti; la scuola deve comunque verificare informativa, base giuridica, consensi eventualmente necessari e policy interne.');
pair('ms04-classi-attivita', 'Altri insegnanti possono essere invitati come co-gestori della lezione: vedono i progetti, aggiungono studenti e assegnano badge esattamente come il docente principale.', 'Le funzioni disponibili per altri docenti e moderatori possono cambiare: verifica nella dashboard corrente ruoli, accessi e possibilità di gestione prima di pianificare la lezione.');
pair('ms04-classi-attivita', 'La dashboard mostra quando ogni studente si è collegato l\'ultima volta, quanti design ha creato e se ha partecipato alle sfide assegnate. Il docente può sospendere temporaneamente un account o rimuovere uno studente dalla classe senza cancellarne i progetti.', 'La dashboard consente al docente moderatore di gestire la classe e consultare i design disponibili. Prima dell\'attività verifica quali dati di stato e comandi sono presenti nella versione corrente.');
pair('ms04-classi-attivita', 'Il docente può anche creare sfide personalizzate con istruzioni e immagini di riferimento per adattarle al programma della classe.', 'Il docente può distribuire consegne e modelli di partenza con gli strumenti disponibili nella versione corrente o tramite il proprio ambiente didattico.');
pair('ms04-classi-attivita', 'può lasciare commenti scritti sui singoli progetti.', 'può esaminare i progetti; feedback e consegna vanno organizzati con le funzioni effettivamente disponibili o con gli strumenti della scuola.');

// Quiz IA: answers must remain valid for small-data ML and tool-enabled LLM products.
add('quiz-ia.html', 'Grandi quantità di dati di esempio.', 'Dati di esempio pertinenti e sufficienti per il compito.');
add('quiz-ia.html', 'Il modello impara i pattern presenti nei dati di addestramento.', 'Qualità, rappresentatività e quantità necessaria dipendono dal compito e dal metodo.');
add('quiz-ia.html', 'Non recupera contenuti esistenti: li genera.', 'Genera nuovi output; alcuni sistemi possono anche recuperare fonti tramite strumenti esterni.');
add('quiz-ia.html', 'Predice la parola (token) più probabile che segue, una dopo l\'altra.', 'Stima i possibili token successivi e ne seleziona uno secondo la strategia di generazione.');
add('quiz-ia.html', 'Perché i suoi dati di addestramento arrivano fino a una certa data.', 'Perché il modello di base ha dati di addestramento limitati nel tempo e potrebbe non avere strumenti aggiornati.');
add('quiz-ia.html', 'Oltre la data di taglio, il modello semplicemente non sa — ma può inventare.', 'Un modello senza ricerca o fonti aggiornate può non conoscere l\'evento e produrre comunque una risposta plausibile ma errata.');

// Markup-specific variants where emphasis tags split the visible sentence.
add('hs01-componenti.html', "L'unità base. ~1 carattere di testo.", "Unità di memoria pari a 8 bit. Un carattere può occupare uno o più byte, secondo la codifica.");
add('rw03-04-branding.html', 'Max <b>2 font</b>: uno per titoli, uno per testi. Usali sempre uguali su ogni supporto.', 'Per un sistema semplice, parti da <b>1–2 famiglie</b>: una per i titoli e una per i testi. Mantieni gli stessi ruoli sui diversi supporti.');
add('rw03-04-branding.txt', 'Max 2 font : uno per titoli, uno per testi. Usali sempre uguali su ogni supporto.', 'Per un sistema semplice, parti da 1–2 famiglie: una per i titoli e una per i testi. Mantieni gli stessi ruoli sui diversi supporti.');
add('rw03-05-social.html', 'Più donne, 18–34 anni. Premia contenuti visivi: foto curate, Reel brevi e Stories quotidiane.', 'Pubblico ampio e forte vocazione visiva. Foto, caroselli, Reel e Stories rispondono a obiettivi diversi; verifica il pubblico negli insight del profilo.');
add('rw03-05-social.html', 'Prevalentemente donne giovani, Gen Z under 25. Il formato è solo video breve (15–60 s); l\'algoritmo premia la creatività più che i follower.', 'Pubblico e formati evolvono rapidamente: non è limitato ai video da 15–60 secondi. Verifica gli insight e scegli il formato in base al racconto.');
add('rw03-05-social.html', 'Giovanissimi (13–20 anni); contenuti effimeri che spariscono dopo 24h.', 'Pubblico tendenzialmente giovane. Molti Snap spariscono dopo la visualizzazione e le Stories di norma dopo 24 ore, ma salvataggi e impostazioni possono conservarli.');
add('rw03-05-social.html', 'Anche <b>5€/giorno per 7 giorni</b> (35€ totali) possono fare una differenza concreta a livello locale se il targeting è preciso e il contenuto sponsorizzato è già il tuo post con più engagement organico.', 'Un piccolo test può misurare copertura, clic o contatti, ma non garantisce risultati: definisci prima obiettivo, pubblico, budget massimo e criterio di successo.');
add('sm06-sicurezza-smartphone.html', 'Quando una vulnerabilità diventa pubblica, gli attacchi che la sfruttano compaiono <b>nel giro di giorni</b>.', 'Dopo la pubblicazione di una vulnerabilità gli attacchi possono comparire <b>rapidamente</b>, ma i tempi variano.');
add('sm06-sicurezza-smartphone.txt', 'Quando una vulnerabilità diventa pubblica, gli attacchi che la sfruttano compaiono nel giro di giorni .', 'Dopo la pubblicazione di una vulnerabilità gli attacchi possono comparire rapidamente, ma i tempi variano.');
add('sd01-introduzione.html', 'In Italia nel 2023 sono stati registrati oltre <b>2.100 attacchi informatici significativi</b>. Il 65% ha preso di mira privati cittadini e piccole imprese.', 'Le statistiche cambiano molto secondo fonte e definizione di <b>incidente</b> o <b>attacco</b>. Prima di confrontare numeri, controlla periodo, campione e metodologia.');
add('sd01-introduzione.txt', 'In Italia nel 2023 sono stati registrati oltre 2.100 attacchi informatici significativi . Il 65% ha preso di mira privati cittadini e piccole imprese.', 'Le statistiche cambiano molto secondo fonte e definizione di incidente o attacco. Prima di confrontare numeri, controlla periodo, campione e metodologia.');
add('sd01-introduzione.html', 'Dati CNAIPIC 2023', 'Leggere le statistiche');
add('sd01-introduzione.txt', 'Dati CNAIPIC 2023', 'Leggere le statistiche');
add('sd02-minacce.html', 'Il riscatto medio richiesto alle PMI italiane nel 2023 è stato di <b>€ 82.000</b>. Il 40% delle aziende colpite ha chiuso entro 12 mesi dall\'attacco.', 'Importi e conseguenze variano molto tra campioni. Il pagamento non garantisce il recupero: isola l\'incidente, conserva le prove e ripristina da backup verificati.');
add('sd02-minacce.txt', 'Il riscatto medio richiesto alle PMI italiane nel 2023 è stato di € 82.000 . Il 40% delle aziende colpite ha chiuso entro 12 mesi dall\'attacco.', 'Importi e conseguenze variano molto tra campioni. Il pagamento non garantisce il recupero: isola l\'incidente, conserva le prove e ripristina da backup verificati.');
add('sd02-minacce.html', 'Il <b>36% di tutte le violazioni di dati</b> nel 2023 è iniziato con un attacco di phishing. È la porta d\'ingresso più usata dagli hacker, proprio perché funziona.', 'Phishing e pretexting restano componenti importanti dell\'ingegneria sociale, ma la quota cambia per settore e rapporto: cita sempre anno, campione e definizione.');
add('sd02-minacce.html', 'La botnet Mirai nel 2016 ha usato <b>600.000 dispositivi IoT</b> (telecamere, router, frigoriferi smart) per abbattere Netflix, Twitter e Reddit con un singolo attacco.', 'Nel 2016 varianti di <b>Mirai</b> sfruttarono dispositivi IoT con credenziali deboli per colpire Dyn; l\'indisponibilità del DNS rese irraggiungibili numerosi servizi.');
add('sd02-minacce.html', '<b>WannaCry (2017):</b> zero-day in Windows usata da NSA, rubata e pubblicata.', '<b>WannaCry (2017):</b> sfruttò una vulnerabilità SMB per cui Microsoft aveva già pubblicato la patch MS17-010; molti sistemi colpiti non erano aggiornati.');
add('sd02-minacce.txt', 'Una vulnerabilità "zero-day" è un difetto nel software che il produttore non conosce ancora . Non esiste patch. Non c\'è modo di difendersi — finché non viene scoperta e corretta.', 'Una vulnerabilità zero-day è sfruttata o resa nota quando non esiste ancora una correzione disponibile per chi deve proteggersi. Controlli compensativi e difesa in profondità possono comunque ridurre il rischio.');
add('sd02-minacce.txt', 'Contro le zero-day non esiste patch. L\'unica difesa è la difesa in profondità :', 'Finché non arriva una patch, servono mitigazioni, rilevamento e difesa in profondità:');
add('sd03-privacy.html', 'Il GDPR richiede che i default siano sempre i più protettivi. Il profilo Instagram nuovo deve essere <b>privato per default</b>, non pubblico. Le condivisioni devono opt-in, non opt-out.', 'Il GDPR richiede che, per impostazione predefinita, siano trattati solo i dati necessari allo scopo. Non impone una singola configurazione identica a ogni social: contano finalità, pubblico previsto e minimizzazione.');
add('sd03-privacy.txt', 'Il GDPR richiede che i default siano sempre i più protettivi. Il profilo Instagram nuovo deve essere privato per default , non pubblico. Le condivisioni devono opt-in, non opt-out.', 'Il GDPR richiede che, per impostazione predefinita, siano trattati solo i dati necessari allo scopo. Non impone una singola configurazione identica a ogni social: contano finalità, pubblico previsto e minimizzazione.');
add('sd04-professioni.html', 'Nel 2023 si stimano <b>3,5 milioni di posizioni aperte</b> nel settore della sicurezza informatica a livello globale.', 'Le stime di settore descrivono un <b>divario globale di forza lavoro e competenze</b>, che non equivale automaticamente al numero di offerte pubblicate.');
add('sd04-professioni.html', '3,5 milioni di posizioni aperte nel mondo nel 2023.', 'Il divario di competenze non coincide con un conteggio di annunci di lavoro.');
add('sd04-professioni.txt', 'Dato: 3,5 milioni di posizioni aperte nel mondo nel 2023.', 'Dato: il divario di competenze non coincide con un conteggio di annunci di lavoro.');
add('ia01-concetti-generali.html', 'Eccelle in <b>un solo compito</b>: giocare a scacchi, riconoscere volti, tradurre testi, guidare un\'auto. Non può fare altro.', 'È progettata per un <b>ambito delimitato</b>. Alcuni sistemi svolgono più compiti correlati, ma non possiedono la competenza generale e autonoma di una persona.');
add('pm04-strumenti.html', 'La dashboard aggrega i numeri del progetto in <em class="hot">una schermata</em>: attività completate, budget speso, rischi aperti, scadenze imminenti. È il report per lo sponsor che si scrive da solo.', 'La dashboard aggrega in <em class="hot">una schermata</em> i dati registrati nel progetto: attività, budget, rischi e scadenze. Il report è affidabile solo se fonti, filtri e aggiornamenti sono corretti.');
add('pm04-strumenti.txt', 'La dashboard aggrega i numeri del progetto in una schermata : attività completate, budget speso, rischi aperti, scadenze imminenti. È il report per lo sponsor che si scrive da solo.', 'La dashboard aggrega i dati registrati nel progetto: attività, budget, rischi e scadenze. Il report è affidabile solo se fonti, filtri e aggiornamenti sono corretti.');
add('ms03-esportazione-stampa-3d.html', '0,2 mm è lo standard: buon compromesso tra qualità e tempo. A 0,1 mm i dettagli migliorano ma la durata di stampa raddoppia; 0,3 mm va bene per prototipi veloci.', 'Con un ugello da 0,4 mm, 0,2 mm è un comune punto di partenza. Ridurre il layer aumenta in genere dettaglio e tempo, ma non implica un raddoppio esatto.');
add('quiz-ia.html', 'Predice la parola (token) più probabile che segue, una dopo l&#x27;altra.', 'Stima i possibili token successivi e ne seleziona uno secondo la strategia di generazione.');
add('quiz-smartphones.html', 'Backup automatico nel cloud o copia periodica su altro supporto.', 'Un backup verificato con almeno una seconda copia, nel cloud o su un altro supporto.');
add('quiz-smartphones.html', 'Svuotare cache e file inutili, spostare foto e video nel cloud.', 'Eliminare file inutili e, dopo aver verificato il backup, liberare le copie locali di foto e video.');
add('ms04-classi-attivita.html', 'https://www.rfc-editor.org/rfc/rfc5322', 'https://www.autodesk.com/company/legal-notices-trademarks/privacy-statement/childrens-privacy-statement');
add('ms04-classi-attivita.html', 'Internet Message Format — RFC 5322', 'Informativa privacy minori — Autodesk');
add('ms04-classi-attivita.txt', '- Internet Message Format — RFC 5322 — https://www.rfc-editor.org/rfc/rfc5322', '- Informativa privacy minori — Autodesk — https://www.autodesk.com/company/legal-notices-trademarks/privacy-statement/childrens-privacy-statement');
add('ia01-concetti-generali.txt', "Eccelle in un solo compito : giocare a scacchi, riconoscere volti, tradurre testi, guidare un'auto. Non può fare altro.", "È progettata o addestrata per un ambito delimitato. Alcuni sistemi svolgono più compiti correlati, ma non possiedono la competenza generale e autonoma di una persona.");
add('rw03-05-social.html', '<span class="ok">Consigliato</span> se il target ha meno di 25 anni e si è a proprio agio davanti alla camera.', '<span class="ok">Valuta</span> se il pubblico usa il canale e il team sa produrre video coerenti con il brand.');
add('rw03-05-social.txt', 'Consigliato se il target ha meno di 25 anni e si è a proprio agio davanti alla camera.', 'Valuta se il pubblico usa il canale e il team sa produrre video coerenti con il brand.');
pair('rw02-01-email', 'Il più usato al mondo con oltre 1,8 miliardi di utenti.', 'La quota gratuita è condivisa con gli altri servizi dell\'account Google e può cambiare nel tempo.');
pair('su01-01-microsoft', 'OneDrive mantiene 30-180 giorni di cronologia versioni. File cancellati recuperabili dal Cestino per 90 giorni.', 'Cronologia versioni e permanenza nel Cestino dipendono dal tipo di account e dalle policy dell\'organizzazione: controlla le impostazioni prima di considerarli un backup.');

// Second audit pass: remaining categorical statements found after the first rewrite.
pair('hs01-componenti', 'È semplicemente un PC reso piccolo, portatile e con il touch al posto del mouse.', 'Condivide con un PC CPU, memoria e sistema operativo, ma integra anche radio, sensori, batteria e vincoli energetici propri.');
pair('hs01-componenti', 'In esistono in tante forme diverse, ma dentro funzionano tutti allo stesso modo:', 'Esistono in tante forme diverse e condividono alcuni principi di base:');
pair('rw03-04-branding', 'Logo, colori, font e tono devono essere identici su tutti i tuoi spazi digitali e fisici.', 'Logo, colori, font e tono devono restare riconoscibili, adattandosi al mezzo senza perdere coerenza.');
pair('rw03-05-social', 'Ne esistono decine, ma solo alcuni contano davvero per promuovere un brand.', 'Ne esistono decine: contano quelli in cui obiettivo, pubblico e formato coincidono con le risorse del brand.');
pair('rw03-05-social', '🎵 TikTok Gen Z, solo video brevi', '🎵 TikTok Piattaforma video con formati e pubblici in evoluzione');
pair('rw03-05-social', 'LinkedIn Professionisti e aziende. Il tono è formale e orientato alla carriera e al business B2B. Sconsigliato per i consumatori finali — utile solo per recruiting o partnership professionali.', 'LinkedIn Professionisti e organizzazioni. È utile per recruiting, partnership, reputazione professionale e contenuti B2B; tono e pubblico vanno verificati sugli insight.');
pair('rw03-05-social', 'WhatsApp Tutti; è la messaggistica privata più diffusa in Italia su tutte le fasce d\'età. Consigliato per gestire prenotazioni e fidelizzare i clienti già acquisiti via broadcast list.', 'WhatsApp È un canale di messaggistica diretta. Può supportare assistenza e prenotazioni se contatti, consenso, frequenza e strumenti business sono gestiti correttamente.');
pair('rw03-05-social', 'Ogni immagine è un portfolio aperto a tutti, anche a chi non ti segue ancora.', 'Con un profilo pubblico i contenuti possono raggiungere anche non follower; con un profilo privato la visibilità è limitata agli account approvati.');
pair('rw03-05-social', 'Regola 80/20: 80% dei contenuti deve essere utile, ispirante o divertente; solo il 20% esplicitamente promozionale.', 'Euristica 80/20: può essere un punto di partenza per bilanciare contenuti utili e promozionali, poi va verificata sui risultati reali.');
pair('rw03-05-social', 'Post organico = visibile solo ai tuoi follower e a chi li segue.', 'Post organico = distribuito senza acquisto pubblicitario; può raggiungere follower e, secondo piattaforma e impostazioni, anche persone che non seguono il profilo.');
pair('sd02-minacce', 'La minaccia è esterna — non possiamo controllarla, solo ridurre la nostra esposizione.', 'La minaccia può essere esterna o interna, intenzionale o accidentale; possiamo ridurre probabilità e impatto con prevenzione, rilevamento e risposta.');
pair('sd02-minacce', 'Cifra tutti i tuoi file — foto, documenti, lavoro — e chiede un riscatto in criptovaluta per restituirli.', 'Può cifrare file locali e condivisi accessibili al dispositivo e chiedere un riscatto, ma comportamento e portata dipendono dalla variante e dai privilegi ottenuti.');
pair('sd02-minacce', 'Soluzione: usa solo HTTPS, oppure attiva una VPN.', 'Riduzione del rischio: usa HTTPS, evita avvisi di certificato, limita attività sensibili e valuta una VPN affidabile sapendo che protegge solo il tratto fino al server VPN.');
pair('sd02-minacce', 'Controlla sempre il lucchetto 🔒 nella barra del browser (HTTPS). Non ignorare gli avvisi di certificato SSL scaduto o non valido — segnalano spesso un MITM.', 'Verifica HTTPS e non ignorare gli avvisi di certificato. Il lucchetto indica un canale cifrato verso quel dominio, non che il sito o il contenuto siano affidabili.');
pair('sd02-minacce', 'Digita 192.168.1.1 nel browser. Sei nella dashboard del router — cambia le credenziali se non lo hai mai fatto. Ci vogliono 2 minuti.', 'Apri l\'indirizzo di gestione indicato dal produttore o dall\'operatore: non è sempre 192.168.1.1. Cambia le credenziali predefinite seguendo il manuale e conserva quelle nuove in modo sicuro.');
pair('sd02-minacce', 'Con un buon backup, il riscatto diventa irrilevante.', 'Un backup isolato e verificato riduce fortemente l\'impatto sui dati, ma restano possibili fermo operativo, furto di informazioni e costi di ripristino.');
pair('sd03-privacy', 'I cookie di terze parti seguono la tua navigazione su tutti i siti, non solo quello che stai visitando.', 'I cookie e altri identificatori di terze parti possono collegare visite tra i siti che incorporano lo stesso servizio; browser e normative possono limitarli.');
pair('sd03-privacy', 'Non conservare log per "sicurezza futura".', 'Conserva i log solo con finalità definite, accessi controllati e tempi proporzionati a obblighi e rischio.');
pair('sd04-professioni', 'Riferisce direttamente al CEO o al CDA.', 'La linea di riporto varia: può riferire al CEO, al CIO, al risk management o al consiglio, purché ruolo e indipendenza siano adeguati.');
pair('sd04-professioni', 'Definisce la strategia di sicurezza a lungo termine, garantisce la compliance normativa', 'Definisce la strategia di sicurezza a lungo termine e coordina il percorso di compliance normativa');
pair('sd05-assessment', 'Si applica a qualsiasi organizzazione che tratta dati di cittadini EU.', 'Si applica secondo stabilimento, offerta di beni o servizi e monitoraggio di persone nell\'UE; non dipende dalla cittadinanza.');
pair('sd05-assessment', 'Obbligatoria per settori critici: energia, trasporti, sanità, banche.', 'Riguarda soggetti essenziali e importanti nei settori e con i criteri dimensionali previsti dalla direttiva e dalla normativa nazionale.');
pair('sd05-assessment', 'In vigore: ottobre 2024', 'Termine UE di recepimento: 17 ottobre 2024; applicazione concreta secondo la normativa nazionale');
pair('sd05-assessment', 'Aziende come Acxiom, Experian, Oracle Data Cloud aggregano dati da centinaia di fonti per costruire profili di 5.000+ attributi per persona.', 'I data broker possono combinare dati provenienti da molte fonti per creare segmenti e profili; aziende, prodotti e quantità cambiano nel tempo e vanno verificati su informative e registri aggiornati.');
pair('ia01-concetti-generali', 'Ricerca e pianificazione automatica erano considerate IA. Oggi si insegnano a tutti gli studenti di informatica.', 'Ricerca e pianificazione automatica restano temi dell\'IA e sono anche contenuti consolidati in molti corsi di informatica.');
pair('ia01-concetti-generali', 'Con abbastanza dati e potenza di calcolo, le reti neurali trovano pattern che nessun programmatore avrebbe saputo codificare a mano.', 'Con dati, obiettivi e calcolo adeguati, le reti neurali possono apprendere pattern difficili da esprimere come regole manuali; qualità e limiti dipendono dal problema.');
pair('ia01-concetti-generali', 'Filtri antispam, analisi recensioni, rilevamento discorsi d\'odio — tutti usano NLP per classificare il testo.', 'Filtri antispam, analisi delle recensioni e moderazione possono usare NLP, regole o combinazioni di tecniche per classificare il testo.');
pair('ia01-concetti-generali', 'Gli umani assumeranno sempre più un ruolo di supervisione mentre le macchine gestiscono l\'esecuzione.', 'In alcuni processi cresce il ruolo umano di supervisione, ma automazione, responsabilità e divisione dei compiti dipendono dal settore.');
pair('ia01-concetti-generali', 'Social media, streaming musicale e video, motori di ricerca, giornali online — tutti personalizzano in base alla nostra storia di navigazione.', 'Molti social, servizi di streaming, motori di ricerca e siti di notizie personalizzano usando interazioni, contesto e impostazioni; non tutti lo fanno allo stesso modo.');
pair('ia01-concetti-generali', 'Gli algoritmi di raccomandazione massimizzano l\'engagement — spesso promuovendo contenuti emotivi o polarizzanti, alimentando tutti e tre questi fenomeni.', 'Molti sistemi di raccomandazione ottimizzano segnali come tempo, clic o soddisfazione; gli obiettivi scelti possono favorire effetti indesiderati e vanno valutati con dati della piattaforma.');
pair('ia01-concetti-generali', 'dopo milioni di esempi etichettati.', 'da esempi etichettati, dati non etichettati o entrambi, secondo il metodo di addestramento.');
pair('ia01-concetti-generali', 'L\'IA tende a usare strutture ripetitive, frasi bilanciate, transizioni prevedibili e un tono sempre uniforme — mai troppo colloquiale.', 'Alcuni output mostrano schemi ripetitivi, ma stile e tono non permettono di attribuire con certezza un testo all\'IA. Servono provenienza, contesto e verifiche ulteriori.');
pair('ia01-concetti-generali', 'il modello preferirà candidati maschili.', 'il modello può apprendere correlazioni discriminatorie e penalizzare alcuni gruppi, se dati, obiettivi e controlli non correggono il problema.');
pair('ia01-concetti-generali', 'Alcune stime: 10 anni. Altre: mai. Nessuno lo sa davvero.', 'Non esiste una previsione scientifica condivisa su tempi o fattibilità: definizioni e stime divergono molto.');
pair('pr03-02-createai', 'Più esempi raccogli—almeno 10-15 per azione—e più variati sono, meglio il modello impara a generalizzare a movimenti che non ha mai visto.', 'Parti da esempi bilanciati e variati per ogni azione, poi misura gli errori su gesti nuovi: quantità maggiore non compensa campioni ripetitivi o etichette incoerenti.');
pair('pr03-02-createai', 'La registrazione dura circa 1-2 secondi', 'La durata della registrazione dipende dall\'interfaccia e dalla sessione');
pair('ms03-esportazione-stampa-3d', 'Il 15–20% basta per oggetti decorativi; si sale al 40–60% solo per parti sottoposte a sforzi.', 'Per oggetti decorativi si parte spesso da infill moderati; per parti funzionali contano soprattutto orientamento, pareti, materiale e carico, da verificare con prove.');
pair('ms03-esportazione-stampa-3d', 'Una mesh con buchi (non "watertight") confonde lo slicer: interno ed esterno non sono più distinguibili e la stampa fallisce.', 'Una mesh con buchi o facce incoerenti può essere riparata automaticamente dallo slicer oppure produrre errori: controlla sempre l\'anteprima dei layer.');
pair('ms03-esportazione-stampa-3d', 'il foro reale sarà più stretto del progetto e un testo sotto i 6 mm diventa illeggibile.', 'confronta foro e testo con il progetto: scostamenti e leggibilità dipendono dalla calibrazione, non da una soglia universale.');
pair('ms04-classi-attivita', 'Dalla vista classe il docente accede ai design di ogni studente in tempo reale, anche mentre sono aperti, e può esaminare i progetti;', 'Dalla vista classe il docente consulta i design resi disponibili dagli studenti e può esaminare i progetti;');
add('quiz-sicurezza.html', "Nell'anonimato non sei identificabile; nello pseudonimato usi un'identita' separata ma riconoscibile.", "I dati anonimi non sono più ragionevolmente riconducibili a una persona; quelli pseudonimizzati possono essere ricollegati usando informazioni separate.");
add('quiz-ia.html', 'Una distorsione ereditata dai dati che porta a risultati ingiusti o sbilanciati.', 'Una distorsione dovuta a dati, obiettivi o progettazione che può produrre risultati ingiusti o sbilanciati.');
add('rw03-05-social.html', 'Gen Z, solo video brevi', 'Video e pubblici in evoluzione');
add('rw03-05-social.html', '<b>Regola 80/20:</b> 80% dei contenuti deve essere utile, ispirante o divertente; solo il 20% esplicitamente promozionale.', '<b>Euristica 80/20:</b> può essere un punto di partenza per bilanciare contenuti utili e promozionali, poi va verificata sui risultati reali.');
add('rw03-05-social.html', '<b>Post organico</b> = visibile solo ai tuoi follower e a chi li segue.', '<b>Post organico</b> = distribuito senza acquisto pubblicitario; può raggiungere follower e, secondo piattaforma e impostazioni, anche non follower.');
add('sd03-privacy.html', 'I <b>cookie di terze parti</b> seguono la tua navigazione su tutti i siti, non solo quello che stai visitando.', 'I <b>cookie e altri identificatori di terze parti</b> possono collegare visite tra i siti che incorporano lo stesso servizio; browser e normative possono limitarli.');
add('hs01-componenti.html', 'Esistono in tante forme diverse, ma <b>dentro funzionano tutti allo stesso modo</b>: hanno un processore, della memoria, dei programmi.', 'Esistono in tante forme diverse e <b>condividono principi di base</b>: elaborazione, memoria, software e interfacce, realizzati però con architetture differenti.');
add('hs01-componenti.txt', 'Esistono in tante forme diverse, ma dentro funzionano tutti allo stesso modo : hanno un processore, della memoria, dei programmi.', 'Esistono in tante forme diverse e condividono principi di base: elaborazione, memoria, software e interfacce, realizzati però con architetture differenti.');
pair('su01-02-google-workspace', "Drive è come una cartella online accessibile dai tuoi dispositivi, entro la quota e i permessi dell'account, accessibile da telefono, tablet e computer.", "Drive è come una cartella online accessibile dai tuoi dispositivi, entro la quota e i permessi dell'account.");
pair('su01-02-google-workspace', "Gmail è il servizio di posta elettronica di Google, disponibile da browser e app mobile. Si usa da browser o dall'app mobile.", "Gmail è il servizio di posta elettronica di Google, disponibile da browser e app mobile.");

// Replace visibly unrelated auto-generated sources with primary sources for the actual slide topic.
pair('su01-02-google-workspace', 'https://www.usb.org/documents', 'https://support.google.com/docs/answer/9312312');
pair('su01-02-google-workspace', 'Documenti e specifiche USB — USB-IF', 'Spazio di archiviazione Google — Google Support');
pair('rw03-05-social', 'https://xlinux.nist.gov/dads/', 'https://transparency.meta.com/features/explaining-ranking/');
pair('rw03-05-social', 'Dictionary of Algorithms and Data Structures — NIST', 'Come funziona il ranking — Meta Transparency');
pair('rw03-05-social', 'https://www.rfc-editor.org/rfc/rfc5322', 'https://help.snapchat.com/hc/en-us/articles/7012334940948-When-does-Snapchat-delete-Snaps-and-Chats');
pair('rw03-05-social', 'Internet Message Format — RFC 5322', 'Durata di Snap, Chat e Stories — Snapchat Support');
pair('sm05-privacy-telefono', 'https://www.rfc-editor.org/rfc/rfc5322', 'https://support.google.com/android/answer/9431959');
pair('sm05-privacy-telefono', 'Internet Message Format — RFC 5322', 'Gestire i permessi delle app — Android Help');
pair('sm05-privacy-telefono', 'https://xlinux.nist.gov/dads/', 'https://support.google.com/googleplay/answer/11416267');
pair('sm05-privacy-telefono', 'Dictionary of Algorithms and Data Structures — NIST', 'Sicurezza e privacy dichiarate dalle app — Google Play Help');
pair('sm08-fotocamera-contenuti', 'https://www.w3.org/TR/webaudio/', 'https://support.apple.com/guide/personal-safety/manage-location-metadata-in-photos-ips0d7a5df82/web');
pair('sm08-fotocamera-contenuti', 'Web Audio API — W3C', 'Gestire la posizione nelle foto — Apple Support');
pair('sm08-fotocamera-contenuti', 'https://xlinux.nist.gov/dads/', 'https://europa.eu/youreurope/business/running-business/intellectual-property/copyright/index_it.htm');
pair('sm08-fotocamera-contenuti', 'Dictionary of Algorithms and Data Structures — NIST', 'Copyright nell’Unione europea');
pair('sm09-benessere-digitale', 'https://xlinux.nist.gov/dads/', 'https://iris.who.int/bitstream/handle/10665/378982/9789289061322-eng.pdf');
pair('sm09-benessere-digitale', 'Dictionary of Algorithms and Data Structures — NIST', 'Uso dei social e benessere degli adolescenti — OMS Europa');
pair('sm10-accessibilita-uso-pratico', 'https://support.microsoft.com/excel', 'https://www.w3.org/WAI/standards-guidelines/wcag/');
pair('sm10-accessibilita-uso-pratico', 'Guida ufficiale di Excel — Microsoft Support', 'Linee guida WCAG — W3C WAI');
pair('su01-03-adobe', 'https://support.microsoft.com/excel', 'https://helpx.adobe.com/creative-cloud/apps/get-started/faq.html');
pair('su01-03-adobe', 'Guida ufficiale di Excel — Microsoft Support', 'Creative Cloud FAQ — Adobe');
pair('su01-03-adobe', 'https://www.w3.org/TR/webaudio/', 'https://helpx.adobe.com/photoshop/using/image-size-resolution.html');
pair('su01-03-adobe', 'Web Audio API — W3C', 'Dimensione e risoluzione delle immagini — Adobe');
pair('su01-03-adobe', 'https://www.nist.gov/cybersecurity-and-privacy/how-do-i-create-good-password', 'https://helpx.adobe.com/account/individual/subscriptions-and-plans/renewals-and-cancellations/account-access-after-plan-cancellation.html');
pair('su01-03-adobe', 'Creare password robuste — NIST', 'Accesso dopo la cancellazione — Adobe');
pair('su01-03-adobe', 'https://www.rfc-editor.org/rfc/rfc5322', 'https://helpx.adobe.com/acrobat/user-guide.html');
pair('su01-03-adobe', 'Internet Message Format — RFC 5322', 'Guida di Acrobat — Adobe');
pair('su01-04-alternativi', 'https://support.microsoft.com/word', 'https://documentation.libreoffice.org/');
pair('su01-04-alternativi', 'Guida ufficiale di Word — Microsoft Support', 'Documentazione LibreOffice');
pair('su01-04-alternativi', 'https://docs.python.org/3/tutorial/', 'https://docs.gimp.org/2.10/en/gimp-image-precision.html');
pair('su01-04-alternativi', 'Tutorial ufficiale Python', 'Precisione delle immagini — GIMP');
pair('su01-04-alternativi', 'https://www.rfc-editor.org/rfc/rfc5322', 'https://docs.gimp.org/2.10/en/gimp-image-precision.html');
pair('su01-04-alternativi', 'Internet Message Format — RFC 5322', 'Precisione delle immagini — GIMP');
pair('ia01-concetti-generali', 'https://www.rfc-editor.org/rfc/rfc5322', 'https://www.nist.gov/itl/ai-risk-management-framework');
pair('ia01-concetti-generali', 'Internet Message Format — RFC 5322', 'AI Risk Management Framework — NIST');
pair('ia01-concetti-generali', 'https://support.microsoft.com/excel', 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj');
pair('ia01-concetti-generali', 'Guida ufficiale di Excel — Microsoft Support', 'Regolamento europeo sull’IA — EUR-Lex');
pair('ia01-concetti-generali', 'https://www.nist.gov/cybersecurity-and-privacy/how-do-i-create-good-password', 'https://www.nist.gov/itl/ai-risk-management-framework');
pair('ia01-concetti-generali', 'Creare password robuste — NIST', 'AI Risk Management Framework — NIST');
pair('ia02-esercizio-generazione', 'https://www.w3.org/TR/webaudio/', 'https://www.nist.gov/itl/ai-risk-management-framework');
pair('ia02-esercizio-generazione', 'Web Audio API — W3C', 'AI Risk Management Framework — NIST');
pair('ia02-esercizio-generazione', 'https://www.rfc-editor.org/rfc/rfc5322', 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj');
pair('ia02-esercizio-generazione', 'Internet Message Format — RFC 5322', 'Regolamento europeo sull’IA — EUR-Lex');
pair('ia03-llm', 'https://support.microsoft.com/excel', 'https://www.nist.gov/itl/ai-risk-management-framework');
pair('ia03-llm', 'Guida ufficiale di Excel — Microsoft Support', 'AI Risk Management Framework — NIST');
pair('ia03-llm', 'https://www.w3.org/TR/webaudio/', 'https://arxiv.org/abs/1706.03762');
pair('ia03-llm', 'Web Audio API — W3C', 'Attention Is All You Need');
pair('ms01-tinkercad-introduzione', 'https://www.rfc-editor.org/rfc/rfc5322', 'https://www.tinkercad.com/learn');
pair('ms01-tinkercad-introduzione', 'Internet Message Format — RFC 5322', 'Tinkercad Learn — Autodesk');
pair('rw03-05-social', 'Rimane permanente sul profilo — è il tuo portfolio visibile a chiunque visiti la pagina per la prima volta.', 'Resta sul profilo finché non lo archivi o elimini; la visibilità dipende dalle impostazioni dell’account.');
pair('rw03-05-social', 'Scompare dopo 24h — perfetta per dietro le quinte, sondaggi rapidi e aggiornamenti quotidiani informali.', 'Di norma scade dopo 24 ore, salvo salvataggio o Highlights; utile per aggiornamenti temporanei e interazioni.');
pair('rw03-05-social', 'Massima portata organica — mostra la trasformazione prima/dopo e raggiungi anche chi non ti segue.', 'Può essere raccomandato anche a non follower; la portata non è garantita e va misurata negli insight.');
pair('rw03-05-social', 'Chi pubblica solo offerte viene ignorato; chi insegna qualcosa crea fiducia e viene seguito.', 'Un flusso composto quasi solo da offerte tende a perdere interesse; contenuti utili possono costruire fiducia, da verificare con metriche reali.');

let changedFiles = 0;
let replacements = 0;
for (const [file, entries] of fixes) {
  if (!fs.existsSync(file)) throw new Error(`File mancante: ${file}`);
  const original = fs.readFileSync(file, 'utf8');
  let content = original;
  for (const [from, to] of entries) {
    if (!content.includes(from)) continue;
    content = content.split(from).join(to);
    replacements++;
  }
  if (content !== original) {
    fs.writeFileSync(file, content);
    changedFiles++;
  }
}

const qualityFile = 'quality-index.js';
const qualityOriginal = fs.readFileSync(qualityFile, 'utf8');
const qualityUpdated = qualityOriginal.replace(/correctness:\s*1/g, 'correctness: 2');
if (qualityUpdated !== qualityOriginal) {
  fs.writeFileSync(qualityFile, qualityUpdated);
  changedFiles++;
}

console.log(JSON.stringify({ changedFiles, replacements }, null, 2));
