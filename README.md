<!-- Proprietà intellettuale di Francesco Antonio Binetti -->
# Slides

Static HTML slide decks for the Italian **Educazione digitale** course.

All learner-facing content is authored in Italian. The language used while
discussing changes with an automated agent does not alter the course language;
another language is used in slides only after an explicit content request.

Open the course index at:

```text
00-indice.html
```

(`index.html` redirects there.)

## Opening locally

Open `00-indice.html` directly in a browser via `file://` — double-click or:

```bash
xdg-open 00-indice.html
```

**Do not use an HTTP server.** Browsers in HTTPS-Only mode auto-upgrade `http://localhost` and produce `ERR_SSL_PROTOCOL_ERROR`.

## Navigation

Inside any deck:

- Arrow keys / Space / PageUp / PageDown — advance or go back
- Ctrl + mouse wheel — zoom; the wheel pans only while zoomed
- Touch swipe — left/right
- `#slide-N` in the URL — open a deck directly at slide N
- `F` key — enable the opt-in feedback overlay; `Esc` closes it
- Eye button — switch between slide view and reader view
- `↩ Indice` button — return to the course index
- Bottom bar — progress indicator

## Course areas

| Prefix | Area | Decks |
|--------|------|-------|
| `hs` | Hardware e Software | hs01–hs05 |
| `rw` | Reti e Web | rw01-01–rw03-05 |
| `cd` | Contenuti Digitali | cd01-01–cd02-01 |
| `sd` | Sicurezza Digitale | sd01–sd06 |
| `sm` | Smartphones | sm01–sm11 |
| `su` | Suite Ufficio | su01-01–su04-01, con fogli di calcolo fino a su03-18 |
| `ia` | Intelligenza Artificiale | ia01–ia05 |
| `pr` | Programmare | teoria PR01, Scratch PR02, Micro:bit PR03, strumenti PR04 e Python PR05 |
| `pm` | Project Management | pm01–pm04 |
| `ms` | Modellazione e stampa 3D | ms01–ms04 |
| `gd` | Game Design | gd01–gd08 |

## Quizzes

| File | Scope |
|------|-------|
| `quiz-reti-web.html` | Reti e Web |
| `quiz-sicurezza.html` | Sicurezza Digitale |
| `quiz-informatica.html` | Identità digitale |
| `quiz-hardware-software.html` | Hardware e Software |
| `quiz-smartphones.html` | Smartphones |
| `quiz-suite-ufficio.html` | Suite Ufficio |
| `quiz-ia.html` | Intelligenza Artificiale |
| `quiz-project-management.html` | Project Management |

## Structure

- I deck mantengono contenuto e CSS specifico nel file HTML; condividono `theme-corsi.css` e il motore `deck.js`.
- Every deck has a sibling `.txt` companion — the index injects a `↓ TXT` button automatically.
- Every index card shows a generated content-last-modified date beneath its
  evaluation badge. It tracks visible text changes in internal slides, not
  cover/closing, CSS or technical edits. Rebuild it with
  `node scripts/build-last-modified.js` after deck edits.
- Links between decks use bare filenames: `href="rw01-02-navigazione.html"`.
- `corsi/` holds source PPTX/PDF; `corsi/images/` holds extracted images (untracked, ~200 MB, regenerable).

### Standard closing slide

All decks end with the same centered structure: `.closing` contains a
`.closing-inner` with one headline, one short summary and exactly one primary
action. The action links to the next deck, or to the relevant index when the
module is terminal. The page number remains outside the inner container at the
bottom-right. Optional source links sit between the summary and the action and
remain visually secondary.

The primary link must use `.chip.closing-primary`. `theme-corsi.css` renders it
as a centered translucent pill with a light border, balanced text and shared
hover/focus states. Do not add deck-local colors, padding, positioning or a
second decorative closing badge. Shared geometry and link placement live in
`theme-corsi.css`; deck files keep only their content and navigation
destination.

After adding or substantially editing decks, normalize the closing slides and
rebuild the generated indexes and topic inventory:

```bash
node scripts/normalize-closing-slides.js
node scripts/build-slide-topic-inventory.js
node scripts/build-search-index.js
```

### Slide topic inventory

`inventario-argomenti-slide.csv` is generated from headings, bold terms,
table headers and semantic labels in every published deck. It is used to find
repeated subjects, linguistic variants and related subtopics across the course.
Do not edit the CSV manually; regenerate it with:

```bash
node scripts/build-slide-topic-inventory.js
```

The inventory preserves the wording shown on each slide while also exposing a
normalized lemma, a semantic key, a macro-category and an editorial group.
`tipo_accorpamento` distinguishes linguistic variants, macro-category members
and autonomous topics. `blocco_principale` identifies the deck that owns the
full treatment when a cross-reference is preferable to repeating it elsewhere.
The final review columns identify slides whose content has been checked. Apply
or verify the hash-backed tag with:

```bash
node scripts/manage-slide-review-tags.js tag file.html#slide-N
node scripts/manage-slide-review-tags.js check
```

Changing the educational content makes the saved tag `SCADUTA`; page numbers,
generated source footers and technical chrome do not invalidate it.
Opening and closing slides are excluded from review tags. Remove any legacy
boundary tags with `node scripts/manage-slide-review-tags.js prune-boundaries`.

## Adding a deck

1. Create the HTML file in repo root following the `XX##-slug.html` naming scheme.
2. Generate the `.txt` companion (see `CLAUDE.md` → TXT companion files).
3. Add a card to `00-indice.html`.
4. Update the previous deck's "Prossimo" closing chip.
5. Rebuild the full-text search index:

```bash
node scripts/build-last-modified.js
node scripts/build-exercise-index.js
node scripts/build-slide-topic-inventory.js
node scripts/build-search-index.js
```

6. Update `CLAUDE.md` inventory and navigation chain.

### Exercise links in the course index

`exercise-index.js` is generated from explicit exercise, laboratory, guided
project and verification slides. `00-indice.html` shows an `Esercizi` button
between the chapter link panel and its four metadata controls. The button opens
a compact chapter panel where every exercise is an independent linked block. Rebuild
the map after adding, removing, renaming or reordering exercise slides:

```bash
node scripts/build-exercise-index.js
```

### Chapter overview panels

The short chapter agenda is stored in `agenda-index.json`, not in a dedicated
slide 2. The explicit information control on an index card opens its three-part
overview; it is not activated by hovering over the title. After editing the
source data, regenerate the browser map:

```bash
node scripts/build-agenda-index.js
```
