# Slides

Static HTML slide decks for the Italian **Educazione digitale** course.

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
- Mouse wheel — advance/back
- Touch swipe — left/right
- `#slide-N` in the URL — open a deck directly at slide N
- `I` key — jump to the course index
- `E` key / top-left hotzone — toggle inline editor (saves to `localStorage`, does not modify the HTML file)
- Bottom bar — progress indicator

## Course areas

| Prefix | Area | Decks |
|--------|------|-------|
| `hs` | Hardware e Software | hs01–hs05 |
| `rw` | Reti e Web | rw01-01–rw03-05 |
| `sd` | Sicurezza Digitale | sd01–sd05 |
| `sm` | Smartphones | sm01–sm11 |
| `su` | Suite Ufficio | su01-01–su04-01 (codici gerarchici dell’indice) |
| `ia` | Intelligenza Artificiale | ia01–ia03 |
| `pr` | Programmazione | teoria pr01-01–pr01-04, Scratch pr02-01–pr02-02, Micro:bit pr03-01–pr03-02 |
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

- All deck files are self-contained (inline CSS + JS). Sole shared file: `theme-corsi.css`.
- Every deck has a sibling `.txt` companion — the index injects a `↓ TXT` button automatically.
- Links between decks use bare filenames: `href="rw01-02-navigazione.html"`.
- `corsi/` holds source PPTX/PDF; `corsi/images/` holds extracted images (untracked, ~200 MB, regenerable).

## Adding a deck

1. Create the HTML file in repo root following the `XX##-slug.html` naming scheme.
2. Generate the `.txt` companion (see `CLAUDE.md` → TXT companion files).
3. Add a card to `00-indice.html`.
4. Update the previous deck's "Prossimo" closing chip.
5. Rebuild the full-text search index:

```bash
node scripts/build-search-index.js
```

6. Update `CLAUDE.md` inventory and navigation chain.
