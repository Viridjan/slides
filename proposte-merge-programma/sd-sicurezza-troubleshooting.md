<!-- Proprietà intellettuale di Francesco Antonio Binetti -->
# SD / HS - Sicurezza digitale e risoluzione problemi tecnici

## Target merge

- `sd01-introduzione.html`
- `sd02-minacce.html`
- `sd03-privacy.html`
- `sd05-assessment.html`
- `hs03-os.html`
- `hs04-os-concetti.html`
- possibile nuovo deck: `hs05-troubleshooting.html` o `sd06-laboratorio.html`

## Stato implementazione

| Proposta | Deck | Stato |
|---|---|---|
| Phishing, vishing, smishing | sd02 | ⏭ già presente |
| Doxing | sd02 | ✅ aggiunto |
| Malware avanzato (rootkit, RAT, scareware) | sd02 | ✅ aggiunto |
| Darknet e exploit kit | sd02 | ✅ aggiunto |
| Crittografia E2EE | sd01 | ✅ aggiunto |
| Come si attacca la crittografia | sd05 | ✅ aggiunto |
| Confronto OS (Windows/Linux/macOS) | hs03 | ⏭ già presente |
| Quadro normativo (GDPR/NIS2/Cybersecurity Act/IPR) | sd05 | ✅ completato |
| Macchine virtuali | hs05 | ✅ aggiunto in nuovo deck |
| Mappatura e monitoraggio dati | sd05 | ✅ aggiunto |
| Troubleshooting base | hs05 | ✅ aggiunto in nuovo deck |
| Aggiornamenti, virus, disco | hs05 | ✅ aggiunto in nuovo deck |
| Blocco schermo e app non responsive | hs05 | ✅ aggiunto |
| Diagnostica rete progressiva | hs05 | ✅ aggiunto |
| Patch, crash app e isolamento variabili | hs05 | ✅ aggiunto |
| Coda stampa, spooler e prestazioni | hs05 | ✅ aggiunto |
| ZIP, FAQ ed errore HTTP 404 | hs05 | ✅ aggiunto |
| Account admin e personalizzazioni | hs05 | ✅ aggiunto in nuovo deck |
| Immagini e formati | hs05/rw08 | ✅ aggiunto |
| MOOC e certificazioni | hs05 | ✅ aggiunto in nuovo deck |

---

## SD02 - Phishing, vishing, smishing ⏭

Già coperto: "Phishing e le sue varianti" con 4 card (Phishing, Spear Phishing, Smishing, Vishing).

---

## SD02 - Doxing ✅

**Slide aggiunta in sd02** prima del closing.

Contenuto implementato: definizione, dati usati (indirizzo/telefono/foto/routine), fonti (social/registri/vecchi leak), difesa (ridurre dati pubblici, privacy, segnalare). SVG dati raccolti come arma.

---

## SD02 - Malware avanzato (rootkit, RAT, scareware) ✅

**Slide aggiunta in sd02** dopo Doxing.

Contenuto implementato: rootkit (nasconde la presenza a livello kernel), RAT (controllo remoto), scareware (finge virus per estorcere). Nota difesa: no software da fonti non ufficiali, aggiornare OS, non cliccare pop-up alarmistici.

Nota: Spyware e Adware già nel "Bestiario del Malware" (slide 4).

---

## SD02 - Darknet e exploit kit ✅

**Slide aggiunta in sd02-minacce.html** prima del closing. Contenuto implementato: darknet (reti non raggiungibili con browser standard), dark market (dati rubati, malware, credenziali), exploit kit (pacchetti per sfruttare vulnerabilità note). Nota: non serve visitarli per subirne gli effetti.

---

## SD01 - Crittografia E2EE ✅

**Slide aggiunta in sd01** prima del closing.

Contenuto implementato: definizione E2EE, come funziona (cifratura sul dispositivo, server vede pacchetti cifrati), esempi (Signal, WhatsApp chat private, iMessage, HTTPS). Regola: E2EE protegge il canale, non dispositivi infetti. SVG schema mittente→server→destinatario.

---

## SD05 - Come si attacca la crittografia ✅

**Slide aggiunta in sd05-assessment.html** prima del closing. Contenuto implementato: phishing (rubare la password invece di decifrare), malware (leggere dati prima/dopo cifratura sul dispositivo), SIM swap, backup non cifrati, password deboli, social engineering. Nota: gli attacchi reali cercano il punto debole più economico, spesso umano.

---

## HS03 - Confronto OS ⏭

Già coperto estesamente in hs03: slide Windows, macOS, Linux, tabella comparativa, sicurezza per OS, privacy e interfaccia.

---

## SD05 - Quadro normativo ✅

**Slide aggiunta in sd05-assessment.html** con GDPR, NIS2, Cybersecurity Act, IPR e Open Resources/licenze aperte.

---

## SD05 - Mappatura e monitoraggio dati ✅

**Slide aggiunta in sd05-assessment.html** prima del closing. Contenuto implementato: tabella dati (Dato | Sistema | Responsabile | Permessi | Retention | Backup). Domande guida: che dati raccogliamo? dove sono? chi accede? per quanto? cifrati? backup?

---

## HS05 - Nuovo deck troubleshooting ✅

Creato `hs05-troubleshooting.html` con:
- Metodo troubleshooting base (descrivere sintomo, cosa è cambiato, soluzioni reversibili prima)
- Macchine virtuali per ambiente di test e snapshot
- Manutenzione ordinaria (aggiornamenti, Service Pack, conflitti, quarantena, analisi disco, deframmentazione HDD vs SSD)
- Blocco improvviso dello schermo: uso di Ctrl+Alt+Canc o Cmd+Option+Esc prima dello spegnimento forzato
- Diagnostica rete dal semplice al complesso: cavi/Wi-Fi, riavvio modem/router, strumenti del sistema operativo, poi provider/driver/configurazioni
- Patch come aggiornamento mirato per bug, vulnerabilità e malfunzionamenti specifici
- Crash app su smartphone: aggiornamento, cache/dati temporanei, riavvio e reinstallazione solo come passaggio successivo
- Isolamento delle variabili: cambiare un elemento alla volta e tracciare le prove
- Stampante con documento in coda: svuotamento coda o riavvio spooler/servizio di stampa
- Ventole al massimo e rallentamenti: possibile surriscaldamento o processo anomalo al 100% di CPU/RAM
- File ZIP: estrazione con utility di sistema o software di decompressione, senza rinominare l'estensione
- FAQ come primo livello di supporto e ricerca autonoma
- Errore HTTP 404: risorsa rimossa, spostata o URL errato
- Account admin vs standard, browser, motori di ricerca, player video
- Immagini e formati (JPG/PNG/SVG/WebP/PDF), librerie immagini con licenze
- MOOC e certificazioni digitali (Coursera, edX, FutureLearn, badge digitali)

### Arricchimento successivo (Claude) ✅

Slide aggiuntive con argomenti collegati (deck ora a 19 slide):

- **Modalità provvisoria e ripristino**: avvio minimale per isolare software/driver, punti di ripristino Windows, reset di sistema come ultima opzione. Regola: dalla soluzione più reversibile alla più invasiva.
- **Driver e periferiche**: cos'è un driver, aggiornamento da fonti ufficiali, rollback da Gestione dispositivi, segnali di problemi driver (risoluzione bassa, audio assente, punto esclamativo giallo).
- **Spazio disco pieno**: sotto 10–15% liberi il sistema rallenta; cestino, Download, temporanei, cache; strumenti integrati (Pulizia disco / Sensore memoria) invece di "ottimizzatori" di terze parti. Con SVG illu barra disco.
- **Codici di errore**: BSOD e codici Windows, codici applicazione (0x…), Visualizzatore eventi / Console macOS, come cercare (codice esatto + programma + versione OS).
- **Chiedere aiuto bene**: confronto richiesta inutile vs efficace (sistema, quando, messaggio esatto, cosa già provato). Regola: descrivi il sintomo, non la tua diagnosi.

Aggiornati anche: agenda "Cosa vedremo" (6 punti), closing (lead riassuntivo, rimosso chip Indice per convenzioni), chip "Prossimo → HS05" nel closing di hs04.
