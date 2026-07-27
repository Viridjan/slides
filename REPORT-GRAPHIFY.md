<!-- Proprietà intellettuale di Francesco Antonio Binetti -->
# Report Graphify — grafo della conoscenza del corso

Grafo generato con [graphify](https://github.com/safishamsi/graphify) sui **122 deck
HTML** pubblicati (solo i deck: TXT, MD, immagini e codice JS esclusi dallo scope).
Mappa i concetti insegnati e i collegamenti fra deck (catene `Prossimo →`, rimandi
nei footer, concetti condivisi).

Gli output binari/rigenerabili vivono in `graphify-out/` (ignorato da git). Questo
file è la sintesi leggibile e versionata di ciò che il grafo ha rivelato.

> **Nota di stato — 22 luglio 2026.** Rigenerato sui 122 deck pubblicati
> **correnti**: le bozze HS06–HS11 sono state rimosse e i loro topic unici
> ridistribuiti nei deck esistenti (hs05, cd01-03, rw02-03, rw01-01, rw01-03).
> I numeri qui sotto riflettono la libreria attuale. Per nomi, codici e
> inventario canonico resta comunque riferimento `00-indice.html` e `CLAUDE.md`.

## Come rigenerare

```bash
# installazione una tantum (PyPI: graphifyy)
uv tool install graphifyy
graphify install --platform claude      # registra la skill /graphify

# ricostruzione del grafo (scope: solo i deck HTML di root)
/graphify .                              # oppure: graphify query "<domanda>"
```

Il pacchetto usa estrazione strutturale (AST) senza chiave API; l'estrazione
semantica dei documenti ricade sull'agente ospite (subagent) se non è impostata
`GEMINI_API_KEY`.

## Panoramica

| Metrica | Valore |
| --- | --- |
| Deck analizzati | 122 (HTML root) |
| Nodi | 345 (deck + concetti) |
| Collegamenti | 371 |
| Iperarchi | 15 (catene/cluster tematici) |
| Community | 36 |
| **Modularità** | **0.871** (struttura a blocchi molto netta) |

La modularità 0.87 conferma che la suddivisione per aree è quasi ottimale:
qualsiasi ri-clustering automatico produce lo stesso valore. Il grafo è pulito,
senza più alcun nodo o arco delle bozze HS06–HS11.

## Community principali

Rilevate per densità di collegamenti (community detection), poi etichettate a mano.

| # | Community | Deck/concetti | Coesione |
| --- | --- | --- | --- |
| 0 | Sicurezza, privacy e backup | 26 | 0.08 (bassa) |
| 1 | Email, phishing e affidabilità | 24 | 0.10 (bassa) |
| 2 | Licenze, accessibilità e contenuti | 23 | 0.11 (bassa) |
| 3 | Programmazione: costrutti e blocchi | 23 | — |
| 4 | Fogli di calcolo: analisi e pivot | 20 | — |
| 5 | Game Design | 18 | — |
| 6 | Identità digitale e società | 18 | — |
| 7 | Troubleshooting, formati e 3D (HS05 + MS) | 16 | — |
| 8 | Software e documenti Word | 16 | — |
| 9 | Reti e web: fondamenti | 13 | — |
| 10 | Hardware, OS e file system | 11 | — |
| 11 | Project Management: metodi | 11 | — |
| 12 | Smartphone: hardware e reti | 11 | — |
| 13 | Fogli di calcolo: fondamenti | 8 | — |
| 14 | Intelligenza Artificiale | 7 | — |
| 15 | Algoritmi e codifica | 6 | — |

Le community 16+ sono cluster minori: intro PM e i singoli deck di esercizi/quiz,
isolati perché collegati al resto solo tramite `data-source`.

*(Dimensioni e temi indicano la struttura tematica; il conteggio esatto delle
community varia leggermente a ogni ricostruzione — 36 nell'ultimo build sui 122
deck. La modularità 0.87 resta stabile.)*

## God node (i cardini più collegati)

I nodi con più archi: sono gli hub concettuali attorno a cui ruota il corso.

1. **CD01.03 Metadati e formati** — 13 archi *(salito a hub #1: assorbe audio/codec e i rimandi sui formati dopo la rimozione di HS08)*
2. CD01.04 Sicurezza dei contenuti digitali — 11
3. RW02.02 Gestire e Archiviare Contenuti — 11
4. CD01.01 Licenze aperte e OER — 10
5. SD03 Privacy, Anonimato e Pseudonimia — 10
6. HS05 Troubleshooting — 10 *(hub dell'area Hardware dopo la rimozione di HS06)*
7. MS03 Esportazione e stampa 3D — 10
8. RW01.01 Reti Informatiche e Internet — 10
9. HS03 Sistemi Operativi — 9
10. HS04 OS: concetti fondamentali — 9

## Connessioni sorprendenti (link non ovvi tra aree diverse)

Collegamenti `semantically_similar_to` fra concetti che nessun rimando esplicito
univa — candidati naturali a cross-reference interni.

- **Framework MDA ↔ Octalysis** (`gd01` ↔ `gd07`): due modelli di game design.
- **Formati 3D STL/OBJ/SVG ↔ Contenitore/codec** (`ms03` ↔ `hs08`): stesso tema
  «formati e compressione» in aree diverse.
- **Iteratori/generatori ↔ Iterazione e cicli** (`pr05-02` ↔ `pr01-07`).
- **Scratch ↔ MakeCode** (`pr02-01` ↔ `pr03-01`): stessa programmazione a blocchi.
- **Spirito critico ↔ Ingegneria sociale** (`rw01-05` ↔ `sd02`): esattamente uno
  dei «ponti» emersi dall'analisi dei quiz di troubleshooting.

## Il ponte CD01.04 (nodo a betweenness più alta: 0.210)

`CD01.04 · Sicurezza dei contenuti digitali` è il singolo nodo che tiene insieme
due mondi altrimenti separati: il **contenuto/licenze** (community 2) e la
**sicurezza/phishing** (community 1). È il ponte più forte dell'intero corso.

I suoi 11 archi, tutti EXTRACTED (rimandi reali nel deck), si dividono così:

- **Lato contenuti (community 2):** → CD01.01 (Licenze/OER), ← CD01.03 (Metadati),
  → CD02.01 (Podcast), → RW02.02 (Archiviare contenuti), → RW02.02 (Collaborazione),
  e i concetti → DRM, → Provenienza, → Watermarking.
- **Lato sicurezza (community 1):** → RW01.05 (Navigare con Spirito Critico),
  → SD01 (Introduzione alla Sicurezza), → SD02 (Minacce e Vulnerabilità).

Perché proprio qui? «Sicurezza *dei contenuti*» è il punto in cui la protezione
del contenuto (copyright, watermarking, DRM, provenienza) incontra la sicurezza
digitale (minacce, phishing, spirito critico). È l'unico deck che rimanda
esplicitamente in entrambe le direzioni, quindi ogni percorso che va dalle
licenze alla sicurezza passa di lì. Editorialmente è una cerniera voluta e sana;
strutturalmente la rende un single point of connection — se si volesse
irrobustire il grafo, aggiungere qualche rimando diretto Licenze↔Sicurezza che
non passi da CD01.04 ridurrebbe la sua betweenness.

## Punti aperti / azioni suggerite

- **120 nodi debolmente connessi:** molti concetti compaiono in un solo deck senza
  rimandi. Possibili lacune di cross-reference tra deck che trattano temi affini.
- **Community poco coese** (0.08–0.11): «Sicurezza/privacy/backup», «Email/phishing»
  e «Licenze/accessibilità/contenuti» raggruppano molti sotto-temi eterogenei —
  valutare se alcuni vadano spezzati o meglio interconnessi.
- **Codici legacy nei `<title>`:** `su03-02-riferimenti.html` riporta **SU07** e
  `su04-01-presentazioni.html` riporta **SU12** — non combaciano con l'indice
  corrente (filename e catena di navigazione sono invece coerenti). Da correggere.
- **Ponti impliciti da formalizzare:** le connessioni sorprendenti qui sopra sono
  ottimi candidati per `Rimandi interni` espliciti (MDA↔Octalysis,
  Scratch↔MakeCode, formati 3D↔codec, spirito critico↔ingegneria sociale).
