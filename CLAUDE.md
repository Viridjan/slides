# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Parallel agents: keep this file current

Claude Code and Codex often work in this repo **at the same time**, and this
file is the only channel they share. Before touching anything, read the work
log below; before finishing a piece of work, add or update its entry. An agent
that renames files, changes a scoring formula, or drops a convention without
recording it here will have that work silently undone by the other agent.

Also check `git status` and `git log` on entry: a clean tree does not mean
nobody is working — the other agent may be mid-task and committing as it goes.

### Work log

- **2026-07-12 · Claude** — Added the `.analogy` component (CSS rule + one
  banner) to `su03-08` … `su03-12`; it was missing from that whole batch.
  Regenerated their `.txt` companions.
- **2026-07-12 · Claude** — Reworked the density score: single rounding, `0`-`10`
  scale end to end (see Codex index badge below). Removed the old `/9` scale
  and the hardcoded `4/9 → 5/9` promotion. The index panel now shows scores
  without a `/10` suffix and renders the five editorial criteria as two pips.

## What this repo is

This repository is a **static course slide library** for the Italian
**Educazione digitale** course. The main content is a set of standalone HTML
slide decks in the repo root, plus source materials in `corsi/`.

There is no build system, package manager, lint step, or app framework. Most
work is direct editing of self-contained `.html` files.

Entry points:

- `index.html` redirects to `00-indice.html`.
- `00-indice.html` is the course index and links to the published decks.
- `quiz-*.html` files are standalone macroarea quizzes.
- `mappa-concettuale.mmd` is a Mermaid concept map.

## Opening decks

Open files directly via `file://` protocol — double-click or:

```bash
xdg-open gd01-introduzione.html
```

**Never start an HTTP server.** The user's browser is in HTTPS-Only mode and
auto-upgrades `http://localhost` to `https://`, causing `ERR_SSL_PROTOCOL_ERROR`
on any plain HTTP server.

## Editing rules

- Keep all deck files self-contained: inline CSS and inline JS. Sole
  exception: `theme-corsi.css`, a shared stylesheet linked by every published
  deck that sets per-section background tints via `body.course-XX` classes
  (e.g. `<body class="course-rw">`). New decks must include the link and the
  matching course class. Edit that one file to retheme a whole section.
- Keep links between decks as bare filenames, for example
  `href="inf12-os-concetti.html"`.
- Do not add folder prefixes to root-level deck links.
- Do not edit `corsi/` unless the user explicitly asks for source material work.
- Use fictional domains in examples, for example `www.azienda.it`; avoid real
  Italian domains in teaching examples.
- Preserve user changes in the working tree. This repo often has uncommitted
  generated decks and quizzes.

## Deck structure

All slide decks use a fixed 16:9 stage:

- authored at `1920x1080`
- `.deck-stage` scales uniformly to the viewport
- slides are switched with `.active` / `.visible`
- avoid responsive reflow inside the slide stage
- page numbers are normally auto-filled by `numberPages()`

Every content deck should include:

- fixed-stage CSS
- progress bar
- keyboard navigation
- wheel navigation
- a closing slide with an index link
- a fixed `↩ Indice` home button (`.home-btn`, bottom-left, `position:fixed`)
  linking to `00-indice.html` (GD decks link to `00-indice-gd.html` and use the
  arcade variant); the `I` keyboard shortcut must point to the same index

Clicking the slide canvas or either half of the stage must do nothing. Never
attach click-to-next, click-to-previous, hotspot navigation or other actions to
`.slide`, `.deck-stage` or the general presentation background. Navigation may
use keyboard and wheel; clicks are reserved for explicit visible controls such
as links, quiz inputs and the home button.

Do not add swipe/touch navigation (`touchstart`, `touchmove`, `touchend`) or an
inline editor, edit hotzone, edit toggle, `contenteditable` mode, localStorage
editing state, `E` shortcut or editor-download behavior to any deck. Slides are
read-only at runtime.

## Warm Study Zine tokens

These design tokens should remain consistent across decks:

```css
:root {
  --paper:#f4ece0; --paper-2:#ece0cf; --ink:#1c1714; --ink-soft:#3a322c; --ink-faint:#6b5f54;
  --red:#e6533b; --teal:#163b35; --teal-2:#1f5249; --gold:#e6c14a; --gold-deep:#d98a2b;
  --sky:#3f7e8c; --line:#d8c9b4;
  --font-display:"Fraunces",Georgia,serif;
  --font-body:"Space Grotesk",sans-serif;
  --font-mono:"Space Mono",monospace;
  --stage-bg:#241d17; --slide-bg:var(--paper);
}
```

Avoid changing the visual language casually. If a deck needs a new component,
prefer the existing `.tape`, `.card`, `.grid2`, `.grid3`, `.split`, `.note`,
`.chips`, `.closing`, `.reveal`, and `.page-num` patterns.

### Rich components (required in every deck)

All decks include these three components (CSS present everywhere); every deck
should use each at least once:

- `.analogy` — teal pill banner with gold label:
  `<div class="analogy reveal d3"><span class="big">Regola:</span> short text.</div>`
  Labels: "Regola:", "Analogia:", "In pratica:". Use for memorable principles.
- `.illu` + `.illu-cap` — illustrated card with inline flat SVG and mono
  caption. Palette: `#163b35` teal, `#e6533b` red, `#e6c14a` gold, `#3f7e8c`
  sky, `#1c1714` ink, `#f4ece0` paper. See `sec01-introduzione.html` for
  reference SVGs.
- Dashed icon list — for parallel item lists, reusing `.agenda-item`:
  `<div class="agenda-item" style="border-color:var(--red);padding:12px 4px;"><span style="font-size:34px;min-width:50px;">📍</span><div><b style="font-size:27px;">Title</b><br><span style="font-size:23px;color:var(--ink-faint);">description</span></div></div>`

### Emoji policy

- Allowed: icons in `.ic` slots and icon-list slots, title-slide identity emoji
  (`.title-right`), emoji inside SVG `<text>`, flags, ✓/✗ marks, brand markers
  (🪟 🍎 🐧), and only **⚠️** / **💡** as `.lbl` note-label prefixes.
- Not allowed: decorative emoji prefixes on other `.lbl` labels, emoji in
  closing eyebrows ("Fine GD_02 🎧"), decorations in `h2` headings.

### Slide anti-patterns

Never generate slides where the lead paragraph, the card title, and the card
body repeat the same sentence. The lead introduces; the card adds different
content; the card `h3` must not duplicate the slide `h2`. Verification slides
must ask questions specific to the deck content, not generic template
questions.

## Title slide invariants

Every deck has a title slide with `.title-left` (text column) and `.title-right`
(illustration column with an animated `::before` floating circle).

**Required:** include this CSS rule in every deck so the illustration paints
above the animated circle:

```css
.title-right>div,.title-right>svg{position:relative;z-index:2;}
```

Without it, the circle covers the illustration after the reveal animation
completes (`transform:none` drops the element out of the stacking context and
below the `position:absolute` `::before`).

**Do not use `.deck-tab`** — the CSS class still exists in every file (dead
code) but all `<div class="deck-tab">` elements have been removed. Do not
re-add them.

**Do not add `.tape` to title slides** — the `.tape` class was removed from
title slides across the entire repo. Tape is still used as section headers on
content slides ("In questo modulo", "Definizione", etc.); keep those.

## Overflow prevention

Slides have about 888px of usable height after the standard 96px top and bottom
padding. These layouts tend to overflow:

- `tape + h-sec + lead + grid3 + grid2`
- `tape + h-sec + lead + grid3 + grid3`
- any slide with 5+ large cards plus a lead paragraph

Use one of these fixes:

- remove or shorten the lead paragraph
- use `.split` instead of stacked grids
- reduce card padding locally
- reduce `.ic` size on dense card slides
- split the content across two slides

## Series and naming

**Priority rule:** `00-indice.html` is the canonical source for every published
deck code and filename. The filename prefix must reproduce the visible
`.card-num`, lowercased and with dots converted to hyphens (for example
`SU03.11` → `su03-11-vba.html`). When an index code changes, rename both the
HTML and TXT files and update every reference before doing any other deck work.
Never keep a legacy flat number that disagrees with the index.

Published decks use a two-letter area prefix. Flat index codes use `xx##`;
hierarchical index codes use `xx##-##`. Each letter is the initial of each word
in the section name (e.g. `HS` = Hardware e **S**oftware). `MS` is reserved for
**Modellazione e Stampa 3D**. Identità digitale is now the `RW03` block inside
Reti e Web. Use a different
abbreviation only when the natural initials are already assigned to another
published area, and record that exception here before creating files:

| Prefix | Area | Example |
| --- | --- | --- |
| `hs` | Hardware e Software | `hs01-componenti.html` |
| `rw` | Reti e Web | `rw01-01-reti.html` |
| `sd` | Sicurezza Digitale | `sd01-introduzione.html` |
| `sm` | Smartphones | `sm01-smartphone-computer.html` |
| `su` | Suite Ufficio | `su01-01-microsoft.html` |
| `ia` | Intelligenza Artificiale | `ia01-concetti-generali.html` |
| `pm` | Project Management | `pm01-introduzione.html` |
| `pr` | Programmazione | `pr01-01-introduzione-programmazione.html`, `pr02-01-introduzione.html`, `pr03-01-microbit.html` |
| `ms` | Modellazione e stampa 3D | `ms01-tinkercad-introduzione.html` |
| `gd` | Game Design | `gd01-introduzione.html` |
| `quiz` | Macroarea quizzes | `quiz-reti-web.html` |

For new published decks, use the next available number in the relevant series
and update `00-indice.html`. If the previous deck has a closing "Prossimo" chip,
update that chip too.

## TXT companion files

Every deck has a sibling `.txt` file (e.g. `gd01-introduzione.txt`) containing
the plain-text slide content. `00-indice.html` auto-injects a `↓ TXT` download
button on every index card via inline JS. When adding a new deck, generate the
`.txt` companion with:

```bash
python3 - << 'EOF'
import re
from pathlib import Path

fpath = Path('new-deck.html')
content = fpath.read_text()
slides = re.findall(r'<section[^>]*class="slide[^"]*"[^>]*>(.*?)</section>', content, re.DOTALL)
title_m = re.search(r'<title>([^<]+)</title>', content)
deck_title = title_m.group(1) if title_m else fpath.stem

def strip(html):
    html = re.sub(r'<(script|style)[^>]*>.*?</(script|style)>', '', html, flags=re.DOTALL|re.IGNORECASE)
    html = re.sub(r'<br\s*/?>', '\n', html, flags=re.IGNORECASE)
    html = re.sub(r'<[^>]+>', ' ', html)
    return re.sub(r'[ \t]+', ' ', html).strip()

lines = [deck_title, '=' * max(len(deck_title), 40), '']
for i, s in enumerate(slides, 1):
    t = strip(s).strip()
    if len(t) > 2:
        lines += [f'--- Slide {i} ---', t, '']
fpath.with_suffix('.txt').write_text('\n'.join(lines))
EOF
```

## Current published inventory

### Hardware e Software

Navigation chain: hs01 → hs02 → hs03 → hs04 → hs05

| File | Title |
| --- | --- |
| `hs01-componenti.html` | Dentro il computer |
| `hs02-hard-disk-filesystem.html` | Hard disk e file system |
| `hs03-os.html` | Sistemi Operativi |
| `hs04-os-concetti.html` | OS: concetti fondamentali |
| `hs05-troubleshooting.html` | Troubleshooting |

### Reti e Web

Navigation chain: rw01-01 → rw01-02 → rw01-03 → rw01-04 → rw01-05 → rw02-01 → rw02-02 → rw02-03 → rw02-04 → rw03-01 → rw03-02 → rw03-03 → rw03-04 → rw03-05

| File | Title |
| --- | --- |
| `rw01-01-reti.html` | Reti Informatiche e Internet |
| `rw01-02-navigazione.html` | Navigazione e Indirizzi Web |
| `rw01-03-domini.html` | Domini e Indirizzi Internet |
| `rw01-04-ricerca.html` | Ricerca e Gestione delle Informazioni |
| `rw02-01-email.html` | La Posta Elettronica |
| `rw02-02-firma.html` | La Firma Email |
| `rw01-05-affidabilita.html` | Navigare con Spirito Critico |
| `rw02-03-contenuti.html` | Gestire e Archiviare Contenuti |
| `rw02-04-collaborazione-digitale.html` | Collaborazione Digitale |
| `rw03-01-identita.html` | La tua identità online |
| `rw03-02-societa.html` | Tecnologia e Società |
| `rw03-03-vr-ar.html` | VR, AR e Metaverso |
| `rw03-04-branding.html` | Farsi riconoscere |
| `rw03-05-social.html` | I social giusti |

### Sicurezza Digitale

Navigation chain: sd01 → sd02 → sd03 → sd04 → sd05

| File | Title |
| --- | --- |
| `sd01-introduzione.html` | Introduzione alla Sicurezza Digitale |
| `sd02-minacce.html` | Minacce e Vulnerabilità |
| `sd03-privacy.html` | Privacy, Anonimato e Pseudonimia |
| `sd04-professioni.html` | Professioni nella Sicurezza Informatica |
| `sd05-assessment.html` | Assessment, Compliance e Dati Personali |

### Smartphones

Navigation chain: sm01 → … → sm11

| File | Title |
| --- | --- |
| `sm01-smartphone-computer.html` | Lo smartphone è un computer |
| `sm02-connessioni-reti-mobili.html` | Connessioni e reti mobili |
| `sm03-android-ios.html` | Android e iOS |
| `sm04-app-permessi.html` | App e permessi |
| `sm05-privacy-telefono.html` | Privacy sul telefono |
| `sm06-sicurezza-smartphone.html` | Sicurezza dello smartphone |
| `sm07-file-telefono.html` | Gestione dei file sul telefono |
| `sm08-fotocamera-contenuti.html` | Fotocamera e contenuti |
| `sm09-benessere-digitale.html` | Benessere digitale |
| `sm10-accessibilita-uso-pratico.html` | Accessibilità e uso pratico |
| `sm11-manutenzione-scelta.html` | Manutenzione e scelta |

### Suite Ufficio

Navigation chain: su01-01 → su01-02 → su01-03 → su01-04 → su02-01 → su02-02 → su02-03 → su02-04 → su03-01 → su03-02 → su03-03 → su03-04 → su03-05 → su03-06 → su03-07 → su03-08 → su03-09 → su03-10 → su03-11 → su03-12 → su04-01

The filename prefixes mirror the index sub-series: `su01-01`-`su01-04`
software, `su02-01`-`su02-04` documenti e Word, `su03-01`-`su03-12` fogli di calcolo and
automation, and `su04-01` presentazioni.

| File | Title |
| --- | --- |
| `su01-01-microsoft.html` | Software Microsoft |
| `su01-02-google-workspace.html` | Software Google (intro) |
| `su01-03-adobe.html` | Software Adobe |
| `su01-04-alternativi.html` | Software alternativi (open source) |
| `su02-01-documenti.html` | Mettere tutto per iscritto |
| `su02-02-word-scrivere-formattare.html` | Word: scrivere e formattare |
| `su02-03-word-impaginare-revisionare.html` | Word: impaginare e revisionare |
| `su02-04-word-documenti-professionali.html` | Word: documenti professionali |
| `su03-01-sistema.html` | Il foglio di calcolo: sistema di lavoro |
| `su03-02-riferimenti.html` | Riferimenti e range |
| `su03-03-prime-formule.html` | Prime formule |
| `su03-04-analisi.html` | Analizzare e cercare |
| `su03-05-funzioni-top.html` | Le 10 funzioni più usate |
| `su03-06-testo.html` | Manipolare il testo |
| `su03-07-tabelle-pivot.html` | Tabelle pivot |
| `su03-08-fogli-calcolo-avanzati.html` | Fogli di calcolo avanzati |
| `su03-09-query-fogli-calcolo.html` | Query nei fogli di calcolo |
| `su03-10-macro-fogli-calcolo.html` | Macro nei fogli di calcolo |
| `su03-11-vba.html` | VBA per Excel |
| `su03-12-google-apps-script.html` | Google Apps Script |
| `su04-01-presentazioni.html` | Dillo con una slide |

### Intelligenza Artificiale

Navigation chain: ia01 → ia02 → ia03

| File | Title |
| --- | --- |
| `ia01-concetti-generali.html` | Concetti generali |
| `ia02-esercizio-generazione.html` | Esercizio di generazione |
| `ia03-llm.html` | LLM — Large Language Models |

### Project Management

Navigation chain: pm01 → pm02 → pm03 → pm04

| File | Title |
| --- | --- |
| `pm01-introduzione.html` | Introduzione al Project Management |
| `pm02-pianificazione.html` | Pianificare un Progetto |
| `pm03-metodologie.html` | Metodologie |
| `pm04-strumenti.html` | Strumenti Digitali |

### Programmazione

Index numbering uses `PR01.01`-`PR01.04` for general programming theory, `PR02.xx` for Scratch and `PR03.xx` for Micro:bit.

General programming navigation chain: pr01-01 → pr01-02 → pr01-03 → pr01-04

| File | Title |
| --- | --- |
| `pr01-01-introduzione-programmazione.html` | Introduzione alla programmazione |
| `pr01-02-dati-codifica.html` | Dati e codifica |
| `pr01-03-algoritmi.html` | Algoritmi e problemi |
| `pr01-04-fondamenti-programmazione.html` | Fondamenti di programmazione |

Codex note: the `PR01.02`-`PR01.04` theory blocks are paraphrased and reorganized
from the public PDF "Fondamenti di Informatica e Programmazione" by Edizioni
Manna, requested by the user on 2026-07-10. Keep them in the Programmazione group
before Scratch and do not split them into Hardware/Software or other sections.

Codex update 2026-07-10: the `PR01.01` theory blocks were expanded without changing
their topic boundaries. Current slide counts are:

| File | Slides | Expansion focus |
| --- | ---: | --- |
| `pr01-01-introduzione-programmazione.html` | 30 | readability, maintenance, components, types, expressions, control flow, functions, errors, testing, paradigms and computability limits |
| `pr01-02-dati-codifica.html` | 18 | text encoding, images, audio, compression, file formats, overflow, byte order and representation choices |
| `pr01-03-algoritmi.html` | 20 | decomposition, preconditions, postconditions, sequence, decisions, loops, accumulators, counters, trace tables and efficiency |
| `pr01-04-fondamenti-programmazione.html` | 37 | input/output, type conversion, expanded arithmetic/logical/assignment operators, symbols, indentation, lists, functions, scope, debugging, tests and documentation |

The matching `.txt` files include additional explanatory notes for search and
course completeness. `search-index.js` has been regenerated after the expansion.

Scratch navigation chain: pr02-01 → pr02-02

| File | Title |
| --- | --- |
| `pr02-01-introduzione.html` | Introduzione a Scratch |
| `pr02-02-questionario.html` | Questionari con Scratch |

Micro:bit navigation chain: pr03-01 → pr03-02

| File | Title |
| --- | --- |
| `pr03-01-microbit.html` | Fondamenti Micro:bit |
| `pr03-02-createai.html` | Micro:bit CreateAI |

### Modellazione e stampa 3D

Navigation chain: ms01 → ms02 → ms03 → ms04

| File | Title |
| --- | --- |
| `ms01-tinkercad-introduzione.html` | TinkerCAD 3D |
| `ms02-modellazione-base.html` | Modellazione base |
| `ms03-esportazione-stampa-3d.html` | Esportazione e stampa 3D |
| `ms04-classi-attivita.html` | TinkerCAD in classe |

### Game Design

Navigation chain: gd01 → gd02 → gd03 → gd04 → gd05 → gd06 → gd07 → gd08

| File | Title |
| --- | --- |
| `gd01-introduzione.html` | Introduzione al Game Design |
| `gd02-ost.html` | La Colonna Sonora |
| `gd03-sfx-audio.html` | Effetti Sonori e Audio |
| `gd04-feedback-sensoriale.html` | Feedback Sensoriale e Giocatori |
| `gd05-difficolta.html` | Difficoltà e Progressione |
| `gd06-meccaniche.html` | Meccaniche e Interazione |
| `gd07-processo.html` | Processo di Design |
| `gd08-progettazione.html` | Progettare un Gioco Fisico |

### Quizzes

| File | Scope |
| --- | --- |
| `quiz-reti-web.html` | Reti e Web, 20 questions |
| `quiz-sicurezza.html` | Sicurezza Digitale, 20 questions |
| `quiz-informatica.html` | Identità digitale, 20 questions |
| `quiz-hardware-software.html` | Hardware e Software, 20 questions |
| `quiz-smartphones.html` | Smartphones, 20 questions |
| `quiz-suite-ufficio.html` | Suite Ufficio, 20 questions |
| `quiz-ia.html` | Intelligenza Artificiale, 20 questions |
| `quiz-project-management.html` | Project Management, 20 questions |

## Index maintenance

`00-indice.html` uses one `<div class="section-group">` per course section.
Card color classes:

- `.pre` for Reti e Web
- `.sec` for Sicurezza Digitale
- `.inf` for course sections that use the gold theme

Sections start collapsed. Opening one section closes the others. The course
header title is `Educazione digitale`; do not reintroduce the old "Indice del
corso" badge or the difficulty legend under the title.

Card layout: single full-width column (one card per row), compact two-row grid
(`num | title` / `num | desc`). Topic chips are hidden (`.card-topics
{display:none}`). The difficulty pill and the `↓ TXT` button are absolutely
positioned at the right edge, stacked vertically, both 80px wide.

The index has an inline JS snippet that auto-injects `↓ TXT` download buttons
into every `.module-card[href]` at page load — no manual button markup needed.

### Codex index badge

Codex added a single right-side synthetic statistics badge. It mixes two
conceptually separate values into one visible `N/10` score:

- `completeness-index.js` is generated by `scripts/build-completeness.js` and
  provides the density component, on a `0`-`10` scale. This is **content
  density**, not quality. The script ignores title/closing slides and scores
  each inner slide as `min(10, words/25)`. Those per-slide values stay
  fractional; the deck score is their mean, rounded once at the very end.
- `quality-index.js` is a manual editorial map added by Codex. It provides the
  quality component and contains five easy-to-edit fields for every index
  card: `coverage`, `clarity`, `examples`, `correctness`, `freshness`.
  Each field is `0`, `1`, or `2`; their sum is `Q N/10`.

The badge sits to the right of the difficulty stars and `↓ TXT` button. Its
chevron opens a compact fixed panel on the right with synthetic score, density,
total quality and the five editorial fields. Rows stay compact; mouseover or
keyboard focus reveals a tooltip explaining both the meaning and the exact
calculation of that value. For decks with both values, the visible score is
`round((density + quality) / 2)`; both inputs are already on the same `0`-`10`
scale, so no rescaling happens here. Quiz cards do not have generated
`.txt` density scores, so their visible synthetic score equals their quality
score. Only one panel may be open; click outside, `Esc` or resize closes it.

When Claude edits or adds a published card, update `quality-index.js` for that
deck as well. Use this quick rubric:

- `coverage`: does the deck cover the expected program topics?
- `clarity`: can a typical student follow the slide without heavy explanation?
- `examples`: are there concrete cases, exercises, or practical situations?
- `correctness`: are there known errors or statements that still need checking?
- `freshness`: are tools, laws, interfaces, or standards likely to become stale?

Do not manually edit `completeness-index.js`; rebuild it with:

```bash
node scripts/build-completeness.js
```

After changing index cards or deck text, also rebuild `search-index.js`.

The index search reads `search-index.js`, generated from the index cards and
their sibling `.txt` files. Rebuild it after changing deck text, `.txt`
companions, or index cards:

```bash
node scripts/build-search-index.js
```

Search prefers whole-word matches when at least one whole-word result exists.
Matching cards link to the first matching slide via `deck.html#slide-N`; deck
scripts must keep supporting `#slide-N` URL fragments.

When adding a published deck:

1. Add a card to the correct section in `00-indice.html`.
2. Use the same card structure and topic chips as nearby cards.
3. Update the previous deck closing chip when appropriate.
4. Keep a fallback `↩ Indice del corso` link in closing slides.
5. Check links with `rg 'href="[^"]+\.html"'`.
6. Generate the `.txt` companion file (see TXT companion files section).
7. Rebuild `search-index.js` with `node scripts/build-search-index.js`.

## Quizzes

The macroarea quizzes are plain HTML forms with radio buttons and a small inline
script. The script computes the total from `.question` elements, so adding or
removing questions should not require changing scoring code. Still update the
visible score text and index card labels when the question count changes.

## Codex slide skills

Codex update 2026-07-10: after pushing commit `665671a`, the user asked Codex to
check `https://github.com/ToseaAI/awesome-html-slide-skills` and install whatever
was usable. Codex scanned the linked repositories for `SKILL.md` files and
installed 34 slide-related skills into `~/.codex/skills/`.

Notable installed skills include:

- `frontend-slides`
- `frontend-slides-editable`
- `html-ppt-skill`
- `html-slide`
- `html-slide-plan`
- `html-slide-prompt`
- `html-slide-render`
- `html-slide-to-pptx`
- `slide-design`
- `slide-creator`
- `slide-writer`
- `ppt-workflow`
- `ppt-master`
- `ppt-forge`
- `ppt-design`
- `visual-explainer`
- `visual-cognition-slides`

These skills are installed locally but require restarting Codex before they are
listed as active skills in a new session. Until then, continue using the repo's
existing HTML/TXT/index workflow.

## Source materials

Original PPTX/PDF/source files live in `corsi/`. Some files are large. The
excluded source deck is documented in `corsi/source/EXCLUDED.md`.

`corsi/images/` (untracked, ~200MB) holds images extracted from all PPTX files,
deduplicated by MD5, organized per source deck with slide numbers in filenames
(`slide003_img01.png`). Browse via `corsi/images/index.html` (lightbox gallery).
Regenerable from the PPTX files; do not commit it.

Codex started integrating selected legacy screenshots into the new standalone
HTML decks through `assets/legacy-slides/`. Use this folder only for small,
curated images that are actually referenced by published slides; keep the full
PPTX image dump in ignored `corsi/images/`.

Topics still mainly represented by original course files, not fully converted
in this root-level HTML course set, include Arduino and Blender/3D.
