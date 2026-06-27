# CLAUDE.md

This file gives repo-specific guidance to coding agents working in this folder.

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

Published decks are root-level files named by series:

| Prefix | Area | Example |
| --- | --- | --- |
| `web` | Reti e Web | `web01-reti.html` |
| `sec` | Sicurezza Digitale | `sec01-introduzione.html` |
| `inf` | Informatica | `inf01-componenti.html` |
| `sma` | Smartphones | `sma01-smartphone-computer.html` |
| `fog` | Fogli di calcolo | `fog03-riferimenti-formule.html` |
| `quiz` | Macroarea quizzes | `quiz-reti-web.html` |

For new published decks, use the next available number in the relevant series
and update `00-indice.html`. If the previous deck has a closing "Prossimo" chip,
update that chip too.

## Current published inventory

### Reti e Web

| File | Title |
| --- | --- |
| `web01-reti.html` | Reti Informatiche e Internet |
| `web02-navigazione.html` | Navigazione e Indirizzi Web |
| `web02b-domini.html` | Domini e Indirizzi Internet |
| `web03-ricerca.html` | Ricerca e Gestione delle Informazioni |
| `web04-email.html` | La Posta Elettronica |
| `web05-firma.html` | La Firma Email |
| `web06-affidabilita.html` | Navigare con Spirito Critico |
| `web07-contenuti.html` | Gestire e Archiviare Contenuti |

### Sicurezza Digitale

| File | Title |
| --- | --- |
| `sec01-introduzione.html` | Introduzione alla Sicurezza Digitale |
| `sec02-minacce.html` | Minacce e Vulnerabilità |
| `sec03-privacy.html` | Privacy, Anonimato e Pseudonimia |
| `sec04-professioni.html` | Professioni nella Sicurezza Informatica |
| `sec05-assessment.html` | Assessment, Compliance e Dati Personali |

### Informatica

| File | Title |
| --- | --- |
| `inf01-componenti.html` | Dentro il computer |
| `inf11-hard-disk-filesystem.html` | Hard disk e file system |
| `inf11-os.html` | Sistemi Operativi |
| `inf12-os-concetti.html` | OS: concetti fondamentali |
| `inf02-identita.html` | La tua identità online |
| `inf13-google-workspace.html` | Software Google |
| `inf10-societa.html` | Tecnologia e Società |
| `inf09-vr-ar.html` | VR, AR e Metaverso |
| `inf06-branding.html` | Farsi riconoscere |
| `inf07-social.html` | I social giusti |

### Smartphones

| File | Title |
| --- | --- |
| `sma01-smartphone-computer.html` | Lo smartphone è un computer |
| `sma02-connessioni-reti-mobili.html` | Connessioni e reti mobili |
| `sma03-android-ios.html` | Android e iOS |
| `sma04-app-permessi.html` | App e permessi |
| `sma05-privacy-telefono.html` | Privacy sul telefono |
| `sma06-sicurezza-smartphone.html` | Sicurezza dello smartphone |
| `sma07-file-telefono.html` | Gestione dei file sul telefono |
| `sma08-fotocamera-contenuti.html` | Fotocamera e contenuti |
| `sma09-benessere-digitale.html` | Benessere digitale |
| `sma10-accessibilita-uso-pratico.html` | Accessibilità e uso pratico |
| `sma11-manutenzione-scelta.html` | Manutenzione e scelta |

### Editor di testo

| File | Title |
| --- | --- |
| `inf03-documenti.html` | Mettere tutto per iscritto |

### Fogli di calcolo

| File | Title |
| --- | --- |
| `inf04-excel-basi.html` | Le basi del foglio di calcolo |
| `inf05-excel-avanzato.html` | Analizzare e condividere |
| `fog03-riferimenti-formule.html` | Riferimenti e formule robuste |

### Presentazioni

| File | Title |
| --- | --- |
| `inf08-presentazioni.html` | Dillo con una slide |

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

When adding a published deck:

1. Add a card to the correct section in `00-indice.html`.
2. Use the same card structure and topic chips as nearby cards.
3. Update the previous deck closing chip when appropriate.
4. Keep a fallback `↩ Indice del corso` link in closing slides.
5. Check links with `rg 'href="[^"]+\.html"'`.

## Quizzes

The macroarea quizzes are plain HTML forms with radio buttons and a small inline
script. The script computes the total from `.question` elements, so adding or
removing questions should not require changing scoring code. Still update the
visible score text and index card labels when the question count changes.

## Source materials

Original PPTX/PDF/source files live in `corsi/`. Some files are large. The
excluded source deck is documented in `corsi/source/EXCLUDED.md`.

Topics still mainly represented by original course files, not fully converted in
this root-level HTML course set, include IA, Arduino, Scratch, Sound Design,
Game Design, Blender/3D, Micro:bit, and TinkerCAD.
