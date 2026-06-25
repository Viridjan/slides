# Slides

Static HTML slide decks for an Italian digital-literacy / informatics course.

Open the course from:

```text
index.html
```

`index.html` redirects to `00-indice.html`, the main course index.

## Contents

- `web*.html` — Reti e Web modules
- `sec*.html` — Sicurezza Digitale modules
- `inf*.html` — Informatica modules
- `quiz-*.html` — macroarea quizzes, 20 multiple-choice questions each
- `mappa-concettuale.mmd` — Mermaid concept map
- `corsi/` — original PPTX/PDF/source material

The decks are standalone HTML files with inline CSS and JavaScript. There is no
build step.

## Opening locally

You can open `00-indice.html` directly in a browser.

If browser restrictions get in the way, serve the folder with any static server,
for example:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/00-indice.html
```

## Navigation

Inside slide decks:

- arrow keys / PageUp / PageDown move between slides
- touch swipe works on touch devices
- mouse wheel navigation is enabled in most decks
- the bottom progress bar shows position

Most decks also include an inline editor:

- hover or click the top-left hotzone, or press `E`
- edit visible text
- press `Ctrl+S` / `Cmd+S` to save to browser `localStorage`

Edits saved this way are local to the browser and do not modify the HTML file.

## Published Course Areas

### Reti e Web

- Reti Informatiche e Internet
- Navigazione e Indirizzi Web
- Domini e Indirizzi Internet
- Ricerca e Gestione delle Informazioni
- La Posta Elettronica
- La Firma Email
- Navigare con Spirito Critico
- Gestire e Archiviare Contenuti

### Sicurezza Digitale

- Introduzione alla Sicurezza Digitale
- Minacce e Vulnerabilità
- Privacy, Anonimato e Pseudonimia
- Professioni nella Sicurezza Informatica
- Assessment, Compliance e Dati Personali

### Informatica

- Dentro il computer
- La tua identità online
- Mettere tutto per iscritto
- Le basi del foglio di calcolo
- Analizzare e condividere
- Farsi riconoscere
- I social giusti
- Dillo con una slide
- VR, AR e Metaverso
- Tecnologia e Società
- Sistemi Operativi
- OS: concetti fondamentali

## Quizzes

The current macroarea quizzes are:

- `quiz-reti-web.html`
- `quiz-sicurezza.html`
- `quiz-informatica.html`

Each quiz contains 20 multiple-choice questions, immediate correction, score,
and reset.

## Maintaining the Index

When adding a new published deck:

1. Add the HTML file in the repo root.
2. Add a card in `00-indice.html`.
3. Use a bare filename in links, for example `href="inf13-topic.html"`.
4. Update the previous deck closing chip if it has a "Prossimo" link.
5. Keep an index fallback link in the closing slide.

`corsi/` contains source material and should be left alone unless the task is
specifically about original PPTX/PDF assets.
