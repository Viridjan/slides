# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Not an application. It is a **project-scoped skill bundle** for building presentations. The only contents are three slide skills under `.claude/skills/`, loaded only when Claude Code runs inside this folder. There is no build, lint, or test step — work happens by invoking a skill, which then generates a presentation in an output directory the user names.

## Skill routing (the one thing to get right)

Three skills overlap on "make slides." Pick by **output format**, not topic:

| Skill | Produces | Use when |
|-------|----------|----------|
| `frontend-slides` | Single zero-dependency HTML file (inline CSS/JS), or PPT/PPTX→web conversion | Default for general slides/talks/pitches with no framework or academic context specified |
| `slides-generator` | React + Tailwind interactive web app (live components, charts, demos) | Only when the user explicitly wants React/Tailwind or an interactive app-style deck |
| `academic-pptx` | Nothing — content/structure rules only (argument flow, evidence, academic design standards) | Academic context (conference, thesis defense, grant). **Pair** with a builder skill for actual output |

`academic-pptx` is a content layer, not a renderer. For an academic deck, run it *and* a builder (`frontend-slides` or `slides-generator`). Each skill's description names the other two as "NOT this" so the router converges — preserve that disambiguation if you edit descriptions.

## frontend-slides invariants

These are non-negotiable per its SKILL.md and are easy to break:

- **Fixed 16:9 stage.** Every slide authored at 1920×1080; the stage scales uniformly to the viewport (letterbox/pillarbox OK). Do NOT add responsive breakpoints to reflow slide content — not even for phones.
- Slide switching uses `.active`/`.visible` with `visibility`/`opacity`/`pointer-events` from `viewport-base.css`, never `display: none/block` (later `display: flex` layout classes would override it and show all slides at once).
- Include the full contents of `viewport-base.css` in every generated deck.
- `clamp()` only for non-slide UI outside the stage. Never negate CSS functions directly (`-clamp(...)` is silently ignored — use `calc(-1 * clamp(...))`).
- Anti-"AI slop": avoid Inter/Roboto/Arial/system fonts and purple-on-white gradients; commit to a distinctive, context-specific aesthetic. Read style indexes first, load a template's full `design.md` only after the user picks it (progressive disclosure).

Helper scripts: `.claude/skills/frontend-slides/scripts/` — `deploy.sh`, `export-pdf.sh`, `extract-pptx.py`.

## slides-generator workflow

Three steps per its SKILL.md: (1) confirm requirements + outline and recommend a theme from `references/palettes.md`; (2) copy `assets/template` to the output dir and generate slides via parallel subagents; (3) assemble + launch. Always confirm the outline before generating.

## License caution

`academic-pptx` is **Proprietary** (see its frontmatter / LICENSE). Keep this repo private if pushed to a remote.

---

## Active courses — all files in repo root

All 20 decks are flat HTML files in the **repo root** (same level as CLAUDE.md). The index is `00-indice.html`. `index.html` is just a meta-refresh redirect to it.

### Naming convention: `{series}{NN}-{topic}.html`

| Series prefix | Course | Example |
|---------------|--------|---------|
| `web` | Reti e Web | `web01-reti.html`, `web05-firma.html` |
| `sec` | Sicurezza Digitale | `sec01-introduzione.html` |
| `inf` | Informatica (hardware/strumenti/identità) | `inf01-componenti.html` |

New decks get the next available number within their series. All cross-deck `href` links use bare filenames — no folder prefixes.

### Current deck inventory

| File | Series/Num | Title |
|------|-----------|-------|
| `web01-reti.html` | M1 | Reti Informatiche e Internet |
| `web02-navigazione.html` | M2.1 | Navigazione e Indirizzi Web |
| `web02b-domini.html` | M2.2 | Domini e Indirizzi Internet |
| `web03-ricerca.html` | M3 | Ricerca e Gestione delle Informazioni |
| `web04-email.html` | M4 | La Posta Elettronica |
| `web05-firma.html` | W5 | La Firma Email |
| `web06-affidabilita.html` | W6 | Valutare l'Affidabilità delle Fonti |
| `web07-contenuti.html` | W7 | Gestione e Archiviazione dei Contenuti |
| `sec01-introduzione.html` | C1 | Introduzione alla Sicurezza Digitale |
| `sec02-minacce.html` | C2 | Minacce e Vulnerabilità |
| `sec03-privacy.html` | C3 | Privacy, Anonimato e Pseudonimia |
| `sec04-professioni.html` | C4 | Professioni nella Sicurezza |
| `sec05-assessment.html` | C5 | Assessment, Compliance e Dati Personali |
| `inf01-componenti.html` | 01 | Dentro il computer + connessioni (USB/WiFi/Bluetooth/5G) |
| `inf03-documenti.html` | 04 | Mettere tutto per iscritto |
| `inf04-excel-basi.html` | 05.1 | Le basi del foglio di calcolo |
| `inf05-excel-avanzato.html` | 05.2 | Analizzare e condividere |
| `inf06-branding.html` | 06 | Farsi riconoscere |
| `inf07-social.html` | 07 | I social giusti |
| `inf08-presentazioni.html` | 08 | Dillo con una slide |
| `inf09-vr-ar.html` | 09 | VR, AR e Metaverso |
| `inf10-societa.html` | 10 | Tecnologia e Società |
| `inf11-os.html` | 11 | Sistemi Operativi (Windows, macOS, Linux, Android) |
| `inf02-identita.html` | 02 | Identità online, PEC, SPID, dati sensibili |

**Index maintenance:** `00-indice.html` has one `<div class="section-group">` per topic section. Card CSS classes: `.pre` (sky left-border, web series), `.sec` (red, sicurezza), `.inf` (gold, informatica + id).

**Navigation chips:** Every closing slide must have a "Prossimo →" chip to the next deck in sequence plus a fallback "↩ Indice del corso" chip to `00-indice.html`. When adding a deck, update the previous deck's closing chip to point to it.

### Warm Study Zine — locked design tokens

These CSS variables are **identical in every deck** and must not be changed:

```css
:root {
  --paper:#f4ece0; --paper-2:#ece0cf; --ink:#1c1714; --ink-soft:#3a322c; --ink-faint:#6b5f54;
  --red:#e6533b;   --teal:#163b35;   --teal-2:#1f5249; --gold:#e6c14a; --gold-deep:#d98a2b;
  --sky:#3f7e8c;   --line:#d8c9b4;
  --font-display:"Fraunces",Georgia,serif;
  --font-body:"Space Grotesk",sans-serif;
  --font-mono:"Space Mono",monospace;
  --stage-bg:#241d17; --slide-bg:var(--paper);
}
```

Every deck also includes:
- **Inline editor** — hover top-left hotzone or press `E`; edits saved to `localStorage` under a per-deck key (e.g. `'web-firma-edits'`).
- **`numberPages()`** — auto-fills `.page-num` spans; no manual slide numbers.
- **`.reveal` animation** — staggered entrance on `.slide.visible`; use `.d1/.d2/.d3` for manual delay overrides.
- **Closing slide** uses `.closing` class (accent-colored background).

### Overflow prevention (1920×1080 stage)

Slide padding is 96px top+bottom → **888px usable height**. These combinations reliably overflow and must be avoided or fixed:

- `tape + h-sec + lead + grid3 + grid2` (5 cards with `.ic` emoji) ≈ 1030–1090px → **remove the lead paragraph** and tighten inter-element margins to 14–18px
- `tape + h-sec + lead + grid3 + grid3` (6 cards with `.ic`) ≈ 1090px → keep lead but reduce `.ic` to 40px and card padding to `18px 24px`
- When a slide has 5+ cards, either remove the intro lead or use a split/two-column layout

Use **fictional domains** in URL examples (e.g. `www.azienda.it`), never real Italian domain names.

## Source materials

Original PPTX files live in `corsi/`. `corsi/source/Corso_Viridjan.pptx` (~200 MB) is excluded from git — see `corsi/source/EXCLUDED.md`. Other PPTX files in `corsi/` are tracked normally. Topics not yet converted to HTML: IA, Arduino, Scratch, Sound Design, Game Design, Blender/3D, Micro:bit, TinkerCAD.
