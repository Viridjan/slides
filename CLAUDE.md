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
