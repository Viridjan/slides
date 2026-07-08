# SD / HS - Sicurezza digitale e risoluzione problemi tecnici

## Target merge

- `sd01-introduzione.html`
- `sd02-minacce.html`
- `sd03-privacy.html`
- `sd05-assessment.html`
- `hs03-os.html`
- `hs04-os-concetti.html`
- possibile nuovo deck: `hs05-troubleshooting.html` o `sd06-laboratorio.html`

## Lacune principali

Il programma richiede una copertura piu esplicita di:

- vishing, smishing, doxing
- darknet, dark markets, exploit kit
- rootkit, RAT, spyware, adware, scareware
- crittografia end-to-end
- come vengono attaccate sicurezza e crittografia nella pratica
- confronto sistemi operativi: Windows, Linux, macOS
- normative: GDPR, Cybersecurity Act, Direttiva NIS/NIS2, IPR/Open Resources
- macchine virtuali come ambiente di test
- mappatura e monitoraggio dati
- troubleshooting: aggiornamenti, conflitti, quarantena virus, disco, deframmentazione, account admin, browser, VLC, MOOC/certificazioni

---

## SD02 - Truffe sociali: phishing, vishing, smishing

### Slide proposta: La stessa truffa, canali diversi

**Lacuna coperta:** phishing, vishing e smishing.

Contenuto:

- Phishing: truffa via email o sito falso.
- Smishing: truffa via SMS o messaggio.
- Vishing: truffa via telefonata o voce.
- Obiettivo: credenziali, codici OTP, denaro, dati personali.
- Segnali: urgenza, paura, premio, link breve, richiesta di segretezza.
- Difesa: chiudere, non cliccare, non dare codici, ricontattare il servizio da canale ufficiale.

Regola:

> Nessun operatore legittimo ti chiede password o codici OTP completi.

---

## SD02 - Doxing

### Slide proposta: Quando i dati personali diventano arma

**Lacuna coperta:** doxing.

Contenuto:

- Doxing: raccolta e pubblicazione di dati personali per intimidire, ricattare o danneggiare.
- Dati usati: indirizzo, telefono, email, scuola/lavoro, foto, parenti, routine.
- Fonti: social, registri pubblici, vecchi leak, foto con metadati, commenti.
- Effetti: molestie, furto identita, minacce, danno reputazionale.
- Difesa: ridurre dati pubblici, controllare privacy, rimuovere vecchie informazioni, segnalare.

---

## SD02 - Malware avanzato

### Slide proposta: Rootkit e RAT

**Lacuna coperta:** malware, virus, rootkit e RAT.

Contenuto:

- Virus: si replica infettando file o sistemi.
- Spyware: osserva attivita e raccoglie dati.
- Adware: mostra pubblicita invasiva e traccia comportamenti.
- Scareware: finge infezioni per spingere a pagare o installare software.
- Rootkit: nasconde la presenza dell'attaccante nel sistema.
- RAT: Remote Access Trojan, permette controllo remoto del dispositivo.

Nota:

> I malware piu pericolosi non sono quelli rumorosi, ma quelli che restano invisibili.

---

## SD02 - Darknet e exploit kit

### Slide proposta: Dove si vendono strumenti e dati rubati

**Lacuna coperta:** darknet, dark markets, exploit kit.

Contenuto:

- Darknet: reti non accessibili con browser standard, spesso usate anche per anonimato.
- Dark market: mercato illegale per dati, malware, credenziali, documenti falsi.
- Exploit kit: pacchetto di strumenti per sfruttare vulnerabilita note.
- Dati venduti: email/password, carte, documenti, accessi aziendali.
- Difesa indiretta: aggiornamenti, password uniche, 2FA, monitoraggio leak.

Attenzione:

> Non serve visitare questi ambienti per subirne gli effetti: i dati rubati possono finire li dopo una violazione.

---

## SD01/SD05 - Crittografia end-to-end

### Slide proposta: Crittografia E2EE

**Lacuna coperta:** crittografia end-to-end.

Contenuto:

- La crittografia protegge il contenuto rendendolo illeggibile senza chiave.
- End-to-end: solo mittente e destinatario dovrebbero poter leggere.
- Il servizio trasporta il messaggio ma non dovrebbe leggerne il contenuto.
- Esempi: app di messaggistica con E2EE, backup cifrati, HTTPS per trasporto.
- Limite: se il dispositivo e compromesso, il messaggio puo essere letto prima o dopo la cifratura.

Regola:

> La crittografia protegge il canale, non corregge utenti ingannati o dispositivi infetti.

---

## SD05 - Come si attacca davvero la crittografia

### Slide proposta: Non si rompe la matematica, si aggira il sistema

**Lacuna coperta:** come vengono realmente attaccate sicurezza e crittografia.

Contenuto:

- Phishing: rubare la password invece di decifrare.
- Malware: leggere dati sul dispositivo prima/dopo la cifratura.
- SIM swap: intercettare SMS OTP.
- Backup non cifrati: colpire copie meno protette.
- Password deboli: indovinare o riusare credenziali.
- Social engineering: convincere l'utente ad autorizzare l'accesso.

Nota:

> Gli attacchi reali cercano il punto debole piu economico, spesso umano o organizzativo.

---

## HS03/SD - Sistemi operativi a confronto

### Slide proposta: Windows, Linux, macOS: sicurezza in pratica

**Lacuna coperta:** scelta del sistema operativo e confronto principali sistemi.

Contenuto:

- Windows: diffusissimo, compatibile con molto software, bersaglio frequente; Defender integrato.
- Linux: molto usato su server, open source, permessi robusti; richiede piu competenza in alcuni contesti.
- macOS: forte integrazione hardware/software, sandboxing e firma app; ecosistema piu chiuso.
- Nessun OS e sicuro se non viene aggiornato.
- Account standard meglio di account admin per uso quotidiano.
- Software da fonti ufficiali riduce rischio malware.

---

## SD05 - Quadro normativo

### Slide proposta: Le regole europee della sicurezza digitale

**Lacuna coperta:** GDPR, Cybersecurity Act, Direttiva NIS, IPR/Open Resources.

Contenuto:

- GDPR: tutela dati personali e diritti degli interessati.
- NIS/NIS2: sicurezza di reti e sistemi per soggetti essenziali/importanti.
- Cybersecurity Act: rafforza ENISA e introduce schemi europei di certificazione.
- IPR: diritti di proprieta intellettuale su opere, software, contenuti.
- Open Resources: contenuti e software riutilizzabili secondo licenze aperte.

Nota:

> La sicurezza non e solo tecnica: include obblighi legali, responsabilita e tracciabilita.

---

## SD06 proposta - Laboratorio con macchine virtuali

### Slide proposta: Testare senza rischiare il computer reale

**Lacuna coperta:** introduzione alla configurazione di ambiente test con macchine virtuali.

Contenuto:

- Macchina virtuale: computer simulato dentro un computer reale.
- Serve per provare sistemi, configurazioni e software senza toccare il sistema principale.
- Snapshot: fotografia dello stato, utile per tornare indietro.
- Isolamento: riduce rischio ma non elimina ogni pericolo.
- Tool: VirtualBox, VMware, Hyper-V, UTM.
- Regola: non usare dati personali reali in ambiente di test.

---

## SD05 - Mappatura e monitoraggio dati

### Slide proposta: Sapere quali dati abbiamo e dove sono

**Lacuna coperta:** mappatura e monitoraggio dati.

Contenuto:

- Che dati raccogliamo?
- Dove sono salvati?
- Chi puo accedervi?
- Per quanto tempo li conserviamo?
- Sono cifrati?
- Esistono backup?
- Cosa succede se qualcuno chiede cancellazione o accesso?

Esempio tabella:

`Dato | Sistema | Responsabile | Permessi | Retention | Backup`

---

## HS05 proposta - Troubleshooting base

### Slide proposta: Metodo per risolvere problemi tecnici

**Lacuna coperta:** risolvere problemi tecnici in contesti digitali.

Contenuto:

- Descrivere il sintomo: cosa succede, quando, con quale errore.
- Capire cosa e cambiato: aggiornamenti, installazioni, periferiche, rete.
- Provare soluzioni reversibili prima di interventi invasivi.
- Cercare messaggi errore esatti.
- Documentare cosa si e gia provato.
- Chiedere aiuto in comunita online fornendo contesto.

Regola:

> Un problema tecnico si risolve meglio quando e descritto bene.

---

## HS05 - Aggiornamenti, virus e disco

### Slide proposta: Manutenzione ordinaria

**Lacuna coperta:** aggiornamento sistema, conflitti, quarantena virus, Service Pack, disco, deframmentazione.

Contenuto:

- Aggiornamenti: correggono bug e vulnerabilita.
- Service Pack: raccolte storiche di aggiornamenti importanti.
- Conflitti: driver, app incompatibili, aggiornamenti falliti.
- Quarantena: area dove antivirus isola file sospetti.
- Analisi disco: controllare errori e stato supporto.
- Deframmentazione: utile per vecchi HDD, non per SSD.
- Backup prima di interventi rischiosi.

---

## HS05 - Account admin e personalizzazioni

### Slide proposta: Configurare senza rompere

**Lacuna coperta:** utente Admin, collegamenti desktop, browser, motori di ricerca, piattaforme videoconferenza.

Contenuto:

- Account admin: serve per installare software e modificare impostazioni di sistema.
- Account standard: piu sicuro per uso quotidiano.
- Collegamenti desktop: scorciatoie, non file originali.
- Browser: homepage, motore di ricerca, estensioni, privacy.
- Videoconferenze: audio, video, chat, sfondo, permessi microfono/camera.
- Player video: installare e configurare VLC o player predefinito.

---

## HS05/RW08 - Immagini e formati

### Slide proposta: Importare, esportare e convertire immagini

**Lacuna coperta:** librerie immagini open source/online, download, modifica, formati grafici.

Contenuto:

- Librerie immagini: Freepik, iStock, Unsplash, Pexels, Pixabay.
- Download: controllare licenza e formato.
- Modifica: ritaglio, dimensioni, compressione, conversione.
- JPG: foto.
- PNG: trasparenze e grafica.
- SVG: loghi e icone vettoriali.
- WebP: web moderno.
- PDF: documento finale, non sempre modificabile.

---

## HS05/IN - MOOC e certificazioni digitali

### Slide proposta: Imparare e certificare competenze online

**Lacuna coperta:** piattaforme MOOC/e-learning e certificazioni digitali.

Contenuto:

- MOOC: corsi online aperti, spesso con video, quiz e forum.
- Piattaforme: Coursera, edX, FutureLearn, Khan Academy, Moodle aziendali/scuola.
- Fruizione: iscrizione, moduli, consegne, attestati.
- Certificazioni digitali: attestano competenze o completamento di percorsi.
- Badge digitali: credenziali condivisibili online.
- Valore: dipende da ente, verifica identita, esame e riconoscimento.

