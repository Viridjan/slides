<!-- Proprietà intellettuale di Francesco Antonio Binetti -->
# Report di integrazione — contenuti digitali

Data: 16 luglio 2026. Obiettivo: trasformare le 10 domande fornite in una lezione modulare di **80 slide**, mantenendo separati gli ambiti disciplinari.

## Struttura realizzata

| Blocco | Slide | Domande | Contenuti principali |
| --- | ---: | --- | --- |
| `CD01.01` — Licenze aperte e OER | 22 | 1, 3, 7, 8 | diritto d’autore, CC BY-SA, attribuzione, remix, compatibilità, 5R |
| `CD01.02` — Accessibilità delle immagini | 14 | 2 | WCAG 2.1, immagini informative, funzionali, decorative e `alt=""` |
| `CD01.03` — Metadati e formati | 16 | 4, 6 | indicizzazione, privacy EXIF, raster, JPEG, PNG e SVG |
| `CD02.01` — Podcast e storytelling digitale | 18 | 9, 10 | strutture narrative, registrazione, picco, true peak e loudness |
| `PR01.07` — Iterazione e cicli | 10 | 5 | ripetizione, cicli, traccia, loop infiniti e accumulatori |
| **Totale** | **80** | **1–10** | cinque blocchi espandibili indipendentemente |

## Analisi delle domande

| N. | Valutazione e intervento |
| ---: | --- |
| 1 | Corretta: `CC BY-SA`. Distinte le condizioni BY, SA, NC e ND. |
| 2 | Corretta: per una `img` puramente decorativa si usa `alt=""`. Chiarita la differenza fra attributo vuoto e assente. |
| 3 | Corretta nel senso OER: remix è combinare materiale con altro contenuto per crearne uno nuovo. Separato da copia, link e conversione. |
| 4 | Corretta: i metadati facilitano indicizzazione e reperimento. Aggiunti tipi, qualità, conservazione e privacy. |
| 5 | Corretta: iterazione è ripetizione di un blocco. Collocata in un blocco autonomo di programmazione. |
| 6 | Corretta: SVG è vettoriale. Distinti raster/vettoriale e precisati i limiti pratici di “scalabilità infinita”. |
| 7 | **Da correggere:** l’opzione selezionata elenca quattro R e omette `Retain`. Presentate tutte le 5R. |
| 8 | Sostanzialmente corretta nel contesto italiano. Collegata all’art. 20 della legge 633/1941 e distinto credito da permesso. |
| 9 | **Troppo semplificata:** A descrive la normalizzazione di picco. Aggiunte loudness integrata e true peak secondo EBU R 128. |
| 10 | **Ambigua:** la struttura non lineare può aiutare in un’esperienza interattiva, ma non è un principio universale. |

## Correzioni consigliate al questionario

1. Domanda 7: aggiungere **“conservare”** alla risposta corretta.
2. Domanda 9: specificare “normalizzazione di picco”; per i podcast distinguere loudness/LUFS e true peak.
3. Domanda 10: usare “può aumentare il coinvolgimento in un racconto web interattivo” invece di “è fondamentale”.

## Fonti primarie

- [Creative Commons — licenze](https://creativecommons.org/share-your-work/cclicenses/)
- [David Wiley — definizione delle 5R](https://opencontent.org/definition/)
- [Normattiva — legge 633/1941, art. 20](https://www.normattiva.it/uri-res/N2Ls?urn%3Anir%3Astato%3Alegge%3A1941-04-22%3B633~art20=)
- [W3C — WCAG 2.1](https://www.w3.org/TR/WCAG21/)
- [W3C WAI — immagini decorative](https://www.w3.org/WAI/tutorials/images/decorative/)
- [Library of Congress — PREMIS](https://www.loc.gov/standards/premis/)
- [W3C — SVG](https://www.w3.org/TR/SVG11/single-page.html)
- [EBU — R 128](https://tech.ebu.ch/publications/r128)

## Manutenzione

I cinque deck pubblicati sono mantenuti direttamente sotto `decks/`; il
generatore originario è stato rimosso perché usava codici e percorsi ormai
superati. Dopo modifiche ricostruire gli indici con
`node scripts/build-completeness.js`, `node scripts/build-search-index.js` e
`node scripts/build-slide-topic-inventory.js`.
