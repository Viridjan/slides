# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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

- Keep all deck files self-contained: inline CSS and inline JS.
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
- touch and wheel navigation
- inline editor hotzone / `E` shortcut when following existing deck style
- a closing slide with an index link

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

Published decks use a two-letter prefix `XX##` where each letter is the initial
of each word in the section name (e.g. `HS` = Hardware e **S**oftware):

| Prefix | Area | Example |
| --- | --- | --- |
| `hs` | Hardware e Software | `hs01-componenti.html` |
| `rw` | Reti e Web | `rw01-reti.html` |
| `sd` | Sicurezza Digitale | `sd01-introduzione.html` |
| `in` | Informatica | `in01-identita.html` |
| `sm` | Smartphones | `sm01-smartphone-computer.html` |
| `su` | Suite Ufficio | `su01-google-workspace.html` |
| `ia` | Intelligenza Artificiale | `ia01-concetti-generali.html` |
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

Navigation chain: hs01 → hs02 → hs03 → hs04

| File | Title |
| --- | --- |
| `hs01-componenti.html` | Dentro il computer |
| `hs02-hard-disk-filesystem.html` | Hard disk e file system |
| `hs03-os.html` | Sistemi Operativi |
| `hs04-os-concetti.html` | OS: concetti fondamentali |

### Reti e Web

Navigation chain: rw01 → rw02 → rw03 → rw04 → rw05 → rw06 → rw07 → rw08

| File | Title |
| --- | --- |
| `rw01-reti.html` | Reti Informatiche e Internet |
| `rw02-navigazione.html` | Navigazione e Indirizzi Web |
| `rw03-domini.html` | Domini e Indirizzi Internet |
| `rw04-ricerca.html` | Ricerca e Gestione delle Informazioni |
| `rw05-email.html` | La Posta Elettronica |
| `rw06-firma.html` | La Firma Email |
| `rw07-affidabilita.html` | Navigare con Spirito Critico |
| `rw08-contenuti.html` | Gestire e Archiviare Contenuti |

### Sicurezza Digitale

Navigation chain: sd01 → sd02 → sd03 → sd04 → sd05

| File | Title |
| --- | --- |
| `sd01-introduzione.html` | Introduzione alla Sicurezza Digitale |
| `sd02-minacce.html` | Minacce e Vulnerabilità |
| `sd03-privacy.html` | Privacy, Anonimato e Pseudonimia |
| `sd04-professioni.html` | Professioni nella Sicurezza Informatica |
| `sd05-assessment.html` | Assessment, Compliance e Dati Personali |

### Informatica

Navigation chain: in01 → in02 → in03 → in04 → in05

| File | Title |
| --- | --- |
| `in01-identita.html` | La tua identità online |
| `in02-societa.html` | Tecnologia e Società |
| `in03-vr-ar.html` | VR, AR e Metaverso |
| `in04-branding.html` | Farsi riconoscere |
| `in05-social.html` | I social giusti |

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

Navigation chain: su01 → su02 → su03 → su04 → su05 → su06

| File | Title |
| --- | --- |
| `su01-google-workspace.html` | Software Google (intro) |
| `su02-documenti.html` | Mettere tutto per iscritto |
| `su03-excel-basi.html` | Le basi del foglio di calcolo |
| `su04-excel-avanzato.html` | Analizzare e condividere |
| `su05-riferimenti-formule.html` | Riferimenti e formule robuste |
| `su06-presentazioni.html` | Dillo con una slide |

### Intelligenza Artificiale

Navigation chain: ia01 → ia02 → ia03

| File | Title |
| --- | --- |
| `ia01-concetti-generali.html` | Concetti generali |
| `ia02-esercizio-generazione.html` | Esercizio di generazione |
| `ia03-llm.html` | LLM — Large Language Models |

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
| `quiz-informatica.html` | Informatica, 20 questions |

## Index maintenance

`00-indice.html` uses one `<div class="section-group">` per course section.
Card color classes:

- `.pre` for Reti e Web
- `.sec` for Sicurezza Digitale
- `.inf` for Informatica and the other course sections that use the gold theme

Sections start collapsed. Opening one section closes the others. The course
header title is `Educazione digitale`; do not reintroduce the old "Indice del
corso" badge or the difficulty legend under the title.

Card layout: single full-width column (one card per row), compact two-row grid
(`num | title` / `num | desc`). Topic chips are hidden (`.card-topics
{display:none}`). The difficulty pill and the `↓ TXT` button are absolutely
positioned at the right edge, stacked vertically, both 80px wide.

The index has an inline JS snippet that auto-injects `↓ TXT` download buttons
into every `.module-card[href]` at page load — no manual button markup needed.

When adding a published deck:

1. Add a card to the correct section in `00-indice.html`.
2. Use the same card structure and topic chips as nearby cards.
3. Update the previous deck closing chip when appropriate.
4. Keep a fallback `↩ Indice del corso` link in closing slides.
5. Check links with `rg 'href="[^"]+\.html"'`.
6. Generate the `.txt` companion file (see TXT companion files section).

## Quizzes

The macroarea quizzes are plain HTML forms with radio buttons and a small inline
script. The script computes the total from `.question` elements, so adding or
removing questions should not require changing scoring code. Still update the
visible score text and index card labels when the question count changes.

## Source materials

Original PPTX/PDF/source files live in `corsi/`. Some files are large. The
excluded source deck is documented in `corsi/source/EXCLUDED.md`.

`corsi/images/` (untracked, ~200MB) holds images extracted from all PPTX files,
deduplicated by MD5, organized per source deck with slide numbers in filenames
(`slide003_img01.png`). Browse via `corsi/images/index.html` (lightbox gallery).
Regenerable from the PPTX files; do not commit it.

Topics still mainly represented by original course files, not fully converted
in this root-level HTML course set, include Arduino, Scratch, Blender/3D,
Micro:bit, and TinkerCAD.
