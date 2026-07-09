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
- Account admin vs standard, browser, motori di ricerca, player video
- Immagini e formati (JPG/PNG/SVG/WebP/PDF), librerie immagini con licenze
- MOOC e certificazioni digitali (Coursera, edX, FutureLearn, badge digitali)
