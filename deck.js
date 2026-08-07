/* Proprietà intellettuale di Francesco Antonio Binetti */
/* Shared slide engine. Every deck loads this instead of carrying its own copy:
   the same six behaviours had drifted into 53 near-identical inline versions,
   and the drift was hiding bugs — 12 decks ignored the #slide-N deep links the
   index search relies on, 8 had lost the I shortcut, none had touch navigation.

   The engine adapts to what a deck actually contains rather than demanding one
   markup: page numbers may be .page-num or .num, the index target is read from
   the deck's own home button (Game Design points at a different index). */
(() => {
  const slides = [...document.querySelectorAll('.slide')];
  if (!slides.length) return;

  const stage = document.getElementById('deckStage') || document.querySelector('.deck-stage');
  const progress = document.getElementById('progress') || document.querySelector('.progress');
  const homeButton = document.querySelector('.home-btn');
  const indexHref = homeButton?.getAttribute('href') || '00-indice.html';
  const currentFile = decodeURIComponent(location.pathname.split('/').pop() || '');
  const indexReturnUrl = new URL(indexHref, location.href);
  if (currentFile) indexReturnUrl.searchParams.set('from', currentFile);
  const indexReturnHref = indexReturnUrl.href;
  if (homeButton) homeButton.href = indexReturnHref;

  let current = 0;

  // The stage is scaled to fit the viewport, and refits on every resize — which
  // means browser zoom (Ctrl +) has no effect: it just triggers a refit. So the
  // engine owns a zoom of its own, layered on top of the fit factor, with pan
  // for the part that no longer fits.
  let zoom = 1;
  let panX = 0;
  let panY = 0;

  const apply = () => {
    if (!stage) return;
    const f = Math.min(innerWidth / 1920, innerHeight / 1080) * zoom;
    const x = (innerWidth - 1920 * f) / 2 + panX;
    const y = (innerHeight - 1080 * f) / 2 + panY;
    stage.style.transform = `translate(${x}px,${y}px) scale(${f})`;
    stage.style.cursor = zoom > 1 ? 'grab' : '';
  };

  const fit = () => Math.min(innerWidth / 1920, innerHeight / 1080);

  const setZoom = (z, cx, cy) => {
    // Anchor on the cursor, but only if it is actually over the stage; otherwise
    // zoom toward the centre of the slide.
    const r = stage.getBoundingClientRect();
    if (cx == null || cx < r.left || cx > r.right || cy < r.top || cy > r.bottom) {
      cx = r.left + r.width / 2;
      cy = r.top + r.height / 2;
    }
    // Full transform is translate(T) scale(f) with f = fit*zoom and T carrying a
    // centring term that also depends on f. Find the stage point under the cursor
    // now, then choose the new pan so that same point stays under the cursor.
    const f0 = fit() * zoom;
    const tx0 = (innerWidth - 1920 * f0) / 2 + panX;
    const ty0 = (innerHeight - 1080 * f0) / 2 + panY;
    const px = (cx - tx0) / f0;
    const py = (cy - ty0) / f0;

    zoom = Math.max(1, Math.min(4, z));
    if (zoom === 1) { panX = panY = 0; apply(); return; }

    const f1 = fit() * zoom;
    panX = (cx - px * f1) - (innerWidth - 1920 * f1) / 2;
    panY = (cy - py * f1) - (innerHeight - 1080 * f1) / 2;
    apply();
  };

  const scale = apply;

  // Numbers are filled in from the live slide list, so inserting or removing a
  // slide can never leave a stale number behind.
  const numberPages = () => {
    const total = slides.length;
    slides.forEach((slide, i) => {
      const box = slide.querySelector('.page-num, .num');
      if (box) box.innerHTML = `<b>${String(i + 1).padStart(2, '0')}</b> / ${total}`;
    });
  };

  // Source and cross-reference footers are anchored to the bottom edge and are
  // intentionally outside the slide's flex flow. Measure their real rendered
  // height, then expose the lower safe boundary to theme-corsi.css so vertical
  // centring uses only the space that remains above them. The original authored
  // padding remains the minimum on slides with a short, single-line footer.
  const referenceFooters = slide => [...slide.querySelectorAll(
    ':scope > .source-footer, :scope > [data-source-footer="true"], ' +
    ':scope > .cross-reference-footer, :scope > [data-cross-reference-footer="true"]'
  )];

  const syncReferenceSafeArea = slide => {
    if (slide.matches('.title,.title-slide,.closing')) return;
    const footers = referenceFooters(slide);
    if (!footers.length) return;

    if (!slide.dataset.referenceBasePaddingBottom) {
      const base = parseFloat(getComputedStyle(slide).paddingBottom) || 0;
      slide.dataset.referenceBasePaddingBottom = String(base);
    }

    const base = Number(slide.dataset.referenceBasePaddingBottom) || 0;
    const footerBoundary = footers.reduce((largest, footer) => {
      const style = getComputedStyle(footer);
      const bottom = Number.parseFloat(style.bottom) || 0;
      return Math.max(largest, bottom + footer.offsetHeight + 24);
    }, 0);
    const safeBottom = Math.ceil(Math.max(base, footerBoundary));
    slide.style.setProperty('--reference-safe-bottom', `${safeBottom}px`);
    slide.classList.add('reference-space-ready');
  };

  const syncAllReferenceSafeAreas = () => slides.forEach(syncReferenceSafeArea);
  syncAllReferenceSafeAreas();
  document.fonts?.ready.then(syncAllReferenceSafeAreas);
  if ('ResizeObserver' in window) {
    const referenceObserver = new ResizeObserver(entries => {
      entries.forEach(entry => syncReferenceSafeArea(entry.target.closest('.slide')));
    });
    slides.forEach(slide => referenceFooters(slide).forEach(footer => referenceObserver.observe(footer)));
  }

  const show = (n, pushHash = true) => {
    current = Math.max(0, Math.min(n, slides.length - 1));
    slides.forEach((slide, i) => {
      const on = i === current;
      slide.classList.toggle('active', on);
      slide.classList.toggle('visible', on);
    });
    if (progress) progress.style.width = `${(current + 1) / slides.length * 100}%`;
    // replaceState, not location.hash: a deck browsed to the end should leave one
    // history entry, not forty for the back button to walk through.
    if (pushHash) history.replaceState(null, '', `#slide-${current + 1}`);
  };

  const next = () => show(current + 1);
  const prev = () => show(current - 1);

  addEventListener('keydown', e => {
    if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); next(); }
    else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); prev(); }
    else if (e.key === 'Home') show(0);
    else if (e.key === 'End') show(slides.length - 1);
    else if (e.key === '+' || e.key === '=') { e.preventDefault(); setZoom(zoom + 0.25); }
    else if (e.key === '-' || e.key === '_') { e.preventDefault(); setZoom(zoom - 0.25); }
    else if (e.key === '0') { e.preventDefault(); setZoom(1); }
  });

  addEventListener('wheel', e => {
    // Ctrl+wheel is the universal zoom gesture; preventDefault stops the browser
    // from zooming the page (which the fixed stage would just refit away).
    if (e.ctrlKey) {
      e.preventDefault();
      setZoom(zoom - Math.sign(e.deltaY) * 0.2, e.clientX, e.clientY);
      return;
    }
    // While zoomed in, the wheel pans. At normal zoom it does nothing: slide
    // navigation is keyboard and touch swipe only.
    if (zoom > 1) { panY -= e.deltaY; apply(); }
  }, { passive: false });

  // Drag to pan when zoomed in.
  let drag = null;
  addEventListener('mousedown', e => {
    if (zoom > 1) { drag = { x: e.clientX - panX, y: e.clientY - panY }; e.preventDefault(); }
  });
  addEventListener('mousemove', e => {
    if (!drag) return;
    panX = e.clientX - drag.x;
    panY = e.clientY - drag.y;
    apply();
  });
  addEventListener('mouseup', () => { drag = null; });

  // Touch: a horizontal swipe longer than it is tall, so scrolling a long note
  // on a tablet does not skip the slide.
  let x0 = null;
  let y0 = null;
  addEventListener('touchstart', e => {
    x0 = e.changedTouches[0].clientX;
    y0 = e.changedTouches[0].clientY;
  }, { passive: true });
  addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    const dy = e.changedTouches[0].clientY - y0;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) dx < 0 ? next() : prev();
    x0 = y0 = null;
  }, { passive: true });

  const fromHash = () => {
    const m = location.hash.match(/(?:slide-|slide=|^#)(\d+)/);
    return m ? Number(m[1]) - 1 : null;
  };

  addEventListener('hashchange', () => {
    const n = fromHash();
    if (Number.isInteger(n)) show(n, false);
  });

  addEventListener('resize', scale);
  scale();
  numberPages();
  show(fromHash() ?? 0, false);
})();

/* Feedback mode — review overlay, opt-in via ?feedback in the URL or the F key.
   This is NOT the old inline editor: it never touches slide content. It turns
   clicks into notes (file, slide, position, nearest element, your text) and
   copies them all to the clipboard, so the author can paste a precise work
   request into a chat. Off by default: nothing runs until ?feedback is in the
   URL or F is pressed. Notes persist in localStorage ('deck-feedback-notes')
   until cleared, so a review can span several decks before one copy. */
(() => {
  let active = false;
  const startIfRequested = () => {
    if (active) return;
    if (/[?&]feedback\b/.test(location.search)) startFeedback();
  };
  addEventListener('keydown', e => {
    if (e.key.toLowerCase() === 'f' && !active) startFeedback();
  });
  startIfRequested();

  function startFeedback() {
  const stage = document.getElementById('deckStage') || document.querySelector('.deck-stage');
  if (!stage) return;
  active = true;

  // Storage shape: { notes: [...], edits: [...] }. A note is either a plain
  // string (the format shipped before this revision — kept working so nothing
  // already collected is lost) or an object {file,slide,x,y,near,target,quote,
  // sel,text}: `near` is the surrounding container for orientation, `target`
  // is the exact element clicked (tag.class) and `quote` its text — or the
  // reviewer's text selection when `sel` is true, the most precise anchor. An
  // edit is always {file,slide,near,before,after} — a text diff, never DOM
  // state: the live-edited element itself reverts to `before` when feedback
  // mode closes, so the page never shows content that disagrees with the file.
  const KEY = 'deck-feedback-notes';
  const file = location.pathname.split('/').pop();
  const load = () => {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (Array.isArray(raw)) return { notes: raw, edits: [] };
      if (raw && typeof raw === 'object') return { notes: raw.notes || [], edits: raw.edits || [] };
    } catch {}
    return { notes: [], edits: [] };
  };
  const save = data => localStorage.setItem(KEY, JSON.stringify(data));
  const fmtNote = n => {
    if (typeof n === 'string') return n;
    const anchor = n.quote
      ? ` → ${n.target || 'testo'}${n.sel ? ' (selezione)' : ''} "${n.quote}"`
      : '';
    return `${n.file}#slide-${n.slide} (${n.x}%,${n.y}%)${n.near ? ` «${n.near}»` : ''}${anchor}: ${n.text}`;
  };
  const fmtEdit = ed => `${ed.file}#slide-${ed.slide} «${ed.near}»\n` +
    `- prima: ${JSON.stringify(ed.before)}\n+ dopo:  ${JSON.stringify(ed.after)}`;

  const bar = document.createElement('div');
  bar.style.cssText = 'position:fixed;right:18px;bottom:64px;z-index:10002;display:flex;gap:10px;' +
    'align-items:center;font-family:"Space Mono",monospace;font-size:14px;' +
    'background:rgba(28,23,20,.94);color:#f4ece0;padding:10px 16px;border-radius:999px;' +
    'border:1px solid rgba(230,193,74,.6);box-shadow:0 8px 24px rgba(0,0,0,.35)';
  const label = document.createElement('span');
  const mkBtn = text => {
    const b = document.createElement('button');
    b.textContent = text;
    b.style.cssText = 'font:inherit;color:#e6c14a;background:none;border:1px solid rgba(230,193,74,.5);' +
      'border-radius:999px;padding:3px 12px;cursor:pointer';
    return b;
  };
  const btnCopy = mkBtn('Copia');
  const btnClose = mkBtn('✕');
  bar.append('📝 ', label, btnCopy, btnClose);
  document.body.appendChild(bar);

  const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;
  const update = () => {
    const d = load();
    label.textContent = `${plural(d.notes.length, 'nota', 'note')} · ${plural(d.edits.length, 'modifica', 'modifiche')}`;
  };
  update();

  // Persistent pins: unlike the 4.5s flash below, these stay on the slide for
  // as long as feedback mode is open, so scrolling back to a slide shows
  // exactly where its open notes are — the "what to change" indicator.
  const renderPins = () => {
    document.querySelectorAll('.fb-pin').forEach(p => p.remove());
    const allSlides = [...document.querySelectorAll('.slide')];
    load().notes.forEach((n, i) => {
      if (typeof n === 'string' || n.file !== file) return;
      const slideEl = allSlides[n.slide - 1];
      if (!slideEl) return;
      const pin = document.createElement('div');
      pin.className = 'fb-pin';
      pin.textContent = String(i + 1);
      pin.title = n.text;
      pin.style.cssText = `position:absolute;left:${n.x}%;top:${n.y}%;transform:translate(-50%,-50%);` +
        'width:24px;height:24px;border-radius:50%;background:#e6533b;color:#fff;' +
        'font:700 12px/24px "Space Mono",monospace;text-align:center;z-index:9999;' +
        'border:2px solid #fff;box-shadow:0 3px 8px rgba(0,0,0,.35);pointer-events:none;';
      slideEl.appendChild(pin);
    });
  };
  // deck.js navigates by toggling .visible/.active classes, not by re-rendering,
  // so watch for that instead of hooking into its show() function.
  const pinObserver = new MutationObserver(renderPins);
  pinObserver.observe(stage, { attributes: true, attributeFilter: ['class'], subtree: true });
  renderPins();

  const addNote = note => { const d = load(); d.notes.push(note); save(d); update(); renderPins(); };
  const upsertEdit = (slide, near, before, after) => {
    const d = load();
    d.edits = d.edits.filter(e2 => !(e2.file === file && e2.slide === slide && e2.near === near));
    d.edits.push({ file, slide, near, before, after });
    save(d);
    update();
  };

  btnCopy.addEventListener('click', e => {
    e.stopPropagation();
    const d = load();
    const parts = [];
    if (d.notes.length) parts.push(d.notes.map(fmtNote).join('\n'));
    if (d.edits.length) parts.push('=== MODIFICHE DIRETTE ===\n\n' + d.edits.map(fmtEdit).join('\n\n'));
    const text = parts.join('\n\n');
    if (!text) return;
    const done = () => { save({ notes: [], edits: [] }); stop(); };
    // file:// is a secure context, but keep a fallback for stubborn setups.
    (navigator.clipboard?.writeText(text) || Promise.reject()).then(done, () => {
      const ta = document.createElement('textarea');
      ta.value = text; document.body.appendChild(ta); ta.select();
      document.execCommand('copy'); ta.remove();
      done();
    });
  });

  const marker = (x, y) => {
    const dot = document.createElement('div');
    dot.style.cssText = `position:fixed;left:${x - 9}px;top:${y - 9}px;width:18px;height:18px;` +
      'border-radius:50%;background:rgba(230,83,59,.85);border:2px solid #fff;z-index:10001;' +
      'pointer-events:none;transition:opacity 1s ease 3s;';
    document.body.appendChild(dot);
    requestAnimationFrame(() => { dot.style.opacity = '0'; });
    setTimeout(() => dot.remove(), 4500);
  };

  const doNote = ev => {
    const slidesNow = [...document.querySelectorAll('.slide')];
    const current = document.querySelector('.slide.visible, .slide.active');
    const idx = slidesNow.indexOf(current) + 1;
    const r = stage.getBoundingClientRect();
    const x = Math.round((ev.clientX - r.left) / r.width * 100);
    const y = Math.round((ev.clientY - r.top) / r.height * 100);
    const el = ev.target.closest('h1,h2,h3,.card,.note,.analogy,.agenda-item,.code,.illu,.lead');
    const near = el ? (el.querySelector('h3,b')?.textContent || el.textContent)
      .trim().replace(/\s+/g, ' ').slice(0, 40) : '';
    // Anchor the note to the exact element under the cursor, not just the
    // container: tag.class plus its own text. If the reviewer selected text
    // before clicking, that selection is the anchor — the most precise way to
    // say "this note is about these exact words".
    let t = ev.target;
    while (t && t !== stage && !(t.textContent || '').trim()) t = t.parentElement;
    const target = t && t !== stage ? t.tagName.toLowerCase() +
      (typeof t.className === 'string' && t.className.trim() ? '.' + t.className.trim().split(/\s+/)[0] : '') : '';
    const quote = (ev.sel ||
      (t && t !== stage ? (t.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 90) : ''));
    const txt = prompt(`Nota per slide ${idx}${quote ? ` · "${quote.slice(0, 60)}"` : near ? ` · «${near}»` : ''}:`);
    if (!txt) return;
    addNote({ file, slide: idx, x, y, near, target, quote, sel: !!ev.sel, text: txt });
    marker(ev.clientX, ev.clientY);
  };

  // Live editing: on elements with zero child elements it is plain-text-only
  // — e.g. an <h3> or a <p> with no nested tags — because textContent-based
  // edit/revert can never corrupt nested markup, full stop. That stays true
  // here. The one addition: a *simple-inline* element — every descendant is
  // just b/i/em/strong/code, however many levels deep, whatever their class —
  // is also eligible, edited via innerHTML instead of textContent so the
  // wrapping tags survive. It is still safe because the eligibility check
  // (isSimpleInlineOnly) rejects anything else — a <span> with a handler, a
  // nested <div>, a <br> — before contenteditable ever touches it, and every
  // commit re-sanitizes the result through the same allow-list, so even a
  // paste that smuggles in a stray tag gets unwrapped back down to text +
  // those five tags before it's stored or shown. Anything more structural
  // (`.card`, a list with mixed content) is still not eligible — fall back to
  // a note there.
  const INLINE_TAGS = new Set(['B', 'I', 'EM', 'STRONG', 'CODE']);
  const isSimpleInlineOnly = el => {
    const walk = node => [...node.children].every(c => INLINE_TAGS.has(c.tagName) && walk(c));
    return walk(el);
  };
  const sanitizeInlineHtml = html => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    const strip = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType !== 1) return;
        if (INLINE_TAGS.has(n.tagName)) strip(n);
        else n.replaceWith(...n.childNodes);
      });
    };
    strip(tmp);
    return tmp.innerHTML;
  };

  const editedEls = new Set();
  let editing = null;

  const nearLabel = el => el.tagName.toLowerCase() +
    (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ')[0] : '');
  const currentSlideIndex = () => {
    const allSlides = [...document.querySelectorAll('.slide')];
    return allSlides.indexOf(document.querySelector('.slide.visible, .slide.active')) + 1;
  };
  const revertEl = el => {
    el.style.background = '';
    if (el.dataset.fbBefore !== undefined) {
      if (el.dataset.fbMode === 'html') el.innerHTML = el.dataset.fbBefore;
      else el.textContent = el.dataset.fbBefore;
      delete el.dataset.fbBefore;
      delete el.dataset.fbMode;
    }
  };
  const endEdit = el => {
    el.removeAttribute('contenteditable');
    el.style.outline = '';
    el._fbCleanup?.();
    delete el._fbCleanup;
    editing = null;
  };
  const cancelCurrentEdit = () => {
    if (!editing) return;
    const el = editing;
    endEdit(el);
    revertEl(el);
  };
  const commitCurrentEdit = () => {
    if (!editing) return;
    const el = editing;
    endEdit(el);
    const html = el.dataset.fbMode === 'html';
    const before = el.dataset.fbBefore ?? '';
    const after = html ? sanitizeInlineHtml(el.innerHTML) : el.textContent.trim();
    if (html) el.innerHTML = after; // re-apply the sanitized version, in case paste smuggled a tag
    if (after === (html ? before : before.trim())) { revertEl(el); return; }
    el.style.background = 'rgba(230,193,74,.18)';
    editedEls.add(el);
    upsertEdit(currentSlideIndex(), nearLabel(el), html ? before : before.trim(), after);
  };
  const beginEdit = el => {
    commitCurrentEdit();
    hoverBox.style.display = 'none';
    const html = el.children.length > 0; // only simple-inline elements reach here with children (guarded by callers)
    el.dataset.fbMode = html ? 'html' : 'text';
    el.dataset.fbBefore = html ? el.innerHTML : el.textContent;
    el.setAttribute('contenteditable', 'true');
    el.style.outline = '3px dashed #e6c14a';
    el.style.outlineOffset = '2px';
    el.style.background = 'rgba(230,193,74,.12)';
    const onPaste = ev => {
      ev.preventDefault();
      const txt = (ev.clipboardData || window.clipboardData).getData('text/plain');
      document.execCommand('insertText', false, txt);
    };
    const onKeydown = ev => {
      if (ev.key === 'Enter' && !ev.shiftKey) { ev.preventDefault(); commitCurrentEdit(); }
    };
    const onBlur = () => commitCurrentEdit();
    el.addEventListener('paste', onPaste);
    el.addEventListener('keydown', onKeydown);
    el.addEventListener('blur', onBlur);
    el._fbCleanup = () => {
      el.removeEventListener('paste', onPaste);
      el.removeEventListener('keydown', onKeydown);
      el.removeEventListener('blur', onBlur);
    };
    editing = el;
    el.focus();
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const sel = getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  };

  // Capture phase: in feedback mode a click means "annotate here" and a
  // double-click means "edit this", so links and other slide controls must
  // not fire. The toolbar handles its own clicks above. The 250ms delay on a
  // single click exists only to tell it apart from the first half of a
  // double-click — clearing it here is what stops a stray note prompt from
  // popping up when you meant to edit.
  let clickTimer = null;
  const onClick = e => {
    e.preventDefault();
    e.stopPropagation();
    if (clickTimer) clearTimeout(clickTimer);
    // Snapshot the selection now: it may collapse before the 250ms timer fires.
    const sel = (getSelection()?.toString() || '').trim().replace(/\s+/g, ' ').slice(0, 200);
    const snap = { clientX: e.clientX, clientY: e.clientY, target: e.target, sel };
    clickTimer = setTimeout(() => { clickTimer = null; doNote(snap); }, 250);
  };
  stage.addEventListener('click', onClick, true);

  // Every commonly-authored text tag in this codebase, not just the original
  // headline/paragraph set: table cells (su03's comparison tables), captions,
  // emphasis tags, links and plain divs used as leaf text (e.g. .illu-cap,
  // .lbl). The children.length===0 guard below is what actually keeps this
  // safe, not the tag list — broadening the list only reaches more leaf
  // nodes, it never lets a container (which always has children) through.
  const EDIT_SEL = 'h1,h2,h3,h4,h5,h6,p,li,dt,dd,td,th,figcaption,span,b,i,em,strong,code,a,div,.lbl';
  const onDblClick = e => {
    const el = e.target.closest(EDIT_SEL);
    if (!el || !stage.contains(el)) return;
    if (el.children.length > 0 && !isSimpleInlineOnly(el)) return;
    e.preventDefault();
    e.stopPropagation();
    if (clickTimer) { clearTimeout(clickTimer); clickTimer = null; }
    beginEdit(el);
  };
  stage.addEventListener('dblclick', onDblClick, true);

  // Hover preview: outlines the bounding box a click would anchor a note to,
  // before you commit — reuses the exact same "walk up to nearest element
  // with text" logic as doNote(), so what you see is what you'd get. A dashed
  // border instead of solid means the element also qualifies for the
  // double-click-to-edit path (EDIT_SEL + zero children), so you know in
  // advance which action a click there will trigger. Purely visual: adds no
  // new way to change a slide beyond what click/double-click already do.
  const hoverBox = document.createElement('div');
  hoverBox.style.cssText = 'position:fixed;z-index:10000;pointer-events:none;display:none;' +
    'border:2px solid rgba(230,83,59,.85);border-radius:4px;box-sizing:border-box;';
  const hoverLabel = document.createElement('div');
  hoverLabel.style.cssText = 'position:absolute;left:0;top:-46px;font:700 12px/1.6 "Space Mono",monospace;' +
    'background:rgba(28,23,20,.92);color:#e6c14a;padding:4px 8px;border-radius:4px;white-space:nowrap;';
  const hoverLabelTag = document.createElement('div');
  const hoverLabelStyle = document.createElement('div');
  hoverLabelStyle.style.cssText = 'display:flex;align-items:center;gap:6px;font-weight:400;font-size:11px;color:rgba(244,236,224,.8);';
  const hoverSwatch = document.createElement('span');
  hoverSwatch.style.cssText = 'display:inline-block;width:9px;height:9px;border-radius:2px;border:1px solid rgba(244,236,224,.4);flex:none;';
  hoverLabelStyle.appendChild(hoverSwatch);
  const hoverSwatchText = document.createElement('span');
  hoverLabelStyle.appendChild(hoverSwatchText);
  hoverLabel.append(hoverLabelTag, hoverLabelStyle);
  hoverBox.appendChild(hoverLabel);
  document.body.appendChild(hoverBox);
  const findAnchor = target => {
    let t = target;
    while (t && t !== stage && !(t.textContent || '').trim()) t = t.parentElement;
    return t && t !== stage ? t : null;
  };
  // Font specs shown next to the tag name: family, size, weight (named where
  // the number maps to a common CSS keyword), italic, letter-spacing when the
  // author set one explicitly. Read from getComputedStyle so it reflects
  // whatever CSS actually resolved — theme tokens, cascade, media queries —
  // not a guess from the class name.
  const WEIGHT_NAMES = { '100': 'thin', '200': 'extralight', '300': 'light', '400': 'regular',
    '500': 'medium', '600': 'semibold', '700': 'bold', '800': 'extrabold', '900': 'black' };
  const fontSpec = el => {
    const cs = getComputedStyle(el);
    const family = cs.fontFamily.split(',')[0].trim().replace(/^["']|["']$/g, '');
    const size = Math.round(parseFloat(cs.fontSize));
    const weight = WEIGHT_NAMES[cs.fontWeight] || cs.fontWeight;
    const bits = [family, `${size}px`, weight];
    if (cs.fontStyle === 'italic') bits.push('italic');
    const spacing = parseFloat(cs.letterSpacing);
    if (!Number.isNaN(spacing) && Math.abs(spacing) >= 0.5) bits.push(`${spacing > 0 ? '+' : ''}${spacing.toFixed(1)}px`);
    return { text: bits.join(' · '), color: cs.color };
  };
  const onMouseMove = e => {
    if (editing) { hoverBox.style.display = 'none'; return; }
    const el = findAnchor(e.target);
    if (!el) { hoverBox.style.display = 'none'; return; }
    const r = el.getBoundingClientRect();
    hoverBox.style.display = 'block';
    hoverBox.style.left = r.left + 'px';
    hoverBox.style.top = r.top + 'px';
    hoverBox.style.width = r.width + 'px';
    hoverBox.style.height = r.height + 'px';
    const tagLabel = el.tagName.toLowerCase() +
      (typeof el.className === 'string' && el.className.trim() ? '.' + el.className.trim().split(/\s+/)[0] : '');
    const editable = el.matches(EDIT_SEL) && (el.children.length === 0 || isSimpleInlineOnly(el));
    hoverLabelTag.textContent = editable ? `${tagLabel} · doppio clic per modificare` : tagLabel;
    hoverBox.style.borderStyle = editable ? 'dashed' : 'solid';
    const spec = fontSpec(el);
    hoverSwatch.style.background = spec.color;
    hoverSwatchText.textContent = spec.text;
  };
  const onMouseLeave = () => { hoverBox.style.display = 'none'; };
  stage.addEventListener('mousemove', onMouseMove);
  stage.addEventListener('mouseleave', onMouseLeave);

  if (!localStorage.getItem('deck-feedback-hint-seen-2')) {
    localStorage.setItem('deck-feedback-hint-seen-2', '1');
    alert('Modalità feedback attiva.\n\n' +
      'Muovi il mouse → il contorno mostra l\'elemento che verrebbe scelto; tratteggiato = doppio clic lo modifica sul posto.\n' +
      'Clic su un elemento della slide → lascia una nota agganciata a quell\'elemento e al suo testo.\n' +
      'Seleziona prima delle parole e poi clicca → la nota cita esattamente quelle parole.\n' +
      'Doppio clic su un titolo o una riga breve → modificala sul posto.\n' +
      'Invio conferma la modifica, Esc la annulla (o chiude la modalità).\n\n' +
      '«Copia» esporta tutto — note e modifiche — negli appunti, poi chiude la modalità.');
  }

  // Close: the ✕ button or Esc. Reverts any live edit still showing (its diff
  // is already saved, so nothing is lost) and removes the toolbar and pins, so
  // the page matches the real file exactly once feedback mode is off.
  const stop = () => {
    cancelCurrentEdit();
    editedEls.forEach(revertEl);
    editedEls.clear();
    pinObserver.disconnect();
    document.querySelectorAll('.fb-pin').forEach(p => p.remove());
    active = false;
    stage.removeEventListener('click', onClick, true);
    stage.removeEventListener('dblclick', onDblClick, true);
    stage.removeEventListener('mousemove', onMouseMove);
    stage.removeEventListener('mouseleave', onMouseLeave);
    hoverBox.remove();
    bar.remove();
    removeEventListener('keydown', onEsc);
    if (/[?&]feedback\b/.test(location.search)) {
      const url = new URL(location.href);
      url.searchParams.delete('feedback');
      history.replaceState(null, '', url.pathname + url.search + url.hash);
    }
  };
  const onEsc = e => {
    if (e.key !== 'Escape') return;
    if (editing) { e.preventDefault(); cancelCurrentEdit(); return; }
    stop();
  };
  addEventListener('keydown', onEsc);
  btnClose.addEventListener('click', e => { e.stopPropagation(); stop(); });
  }
})();

/* Reader mode — narrow-screen alternative to the fixed slide stage. The stage
   always fits by scaling the full 1920x1080 canvas down (see fit() above), so
   on a phone (~0.2x) the 24-90px authored text shrinks past readability with
   big empty bars top/bottom. Reader mode never touches the stage: it walks
   each .slide's live DOM once and renders the same content as a normal
   scrollable document sized in rem/clamp(), so the browser's own viewport
   width does the responsive work. On by default under ~820px width; a toggle
   switches back to the exact slide (e.g. to pinch-zoom it) without reloading. */
(() => {
  const slides = [...document.querySelectorAll('.slide')];
  if (!slides.length) return;
  const stage = document.getElementById('deckStage') || document.querySelector('.deck-stage');
  if (!stage) return;
  const progress = document.getElementById('progress') || document.querySelector('.progress');

  const mq = matchMedia('(max-width: 820px)');
  let manualOverride = false;

  // textContent alone concatenates across <br> with no space ("Introduzione<br>alla"
  // becomes "Introduzionealla") — decks use <br> constantly for manual line breaks in
  // headings, so read from a clone with <br> swapped for a space instead of relying on
  // layout-dependent innerText (most slides are visibility:hidden when this runs).
  const cleanText = el => {
    if (!el) return '';
    const clone = el.cloneNode(true);
    clone.querySelectorAll('br').forEach(br => br.replaceWith(' '));
    return (clone.textContent || '').replace(/\s+/g, ' ').trim();
  };
  // h1/h2/.lead are excluded from the generic walk too: renderSlide() already
  // captures their full text as one block, so walking into them separately
  // would re-emit fragments of the same sentence (e.g. an <em> inside the
  // heading turning up again as its own stray paragraph).
  const skipSelector = '.page-num,.num,.home-btn,.deck-author,[data-source-footer],' +
    '[data-source-list],[data-cross-reference-footer],.progress,script,style,svg,' +
    'h1,h2,.lead,.h-mega,.h-big,.h-sec';

  // Generic on purpose: decks use dozens of different card/note/list layouts,
  // so this reads DOM structure (headings, .lead, leaf text, table rows)
  // rather than any one deck's specific component vocabulary.
  const walk = (node, out) => {
    for (const child of node.children) {
      if (child.matches(skipSelector) || child.closest(skipSelector)) continue;
      const tag = child.tagName.toLowerCase();
      if (tag === 'tr') {
        const row = [...child.children].map(cleanText).filter(Boolean).join(' · ');
        if (row) out.push({ type: 'p', text: row });
        continue;
      }
      if (tag === 'p' || tag === 'blockquote' || tag === 'li') {
        const t = cleanText(child);
        if (t) out.push({ type: tag === 'li' ? 'li' : 'p', text: t });
        continue;
      }
      if (tag === 'h3' || child.classList.contains('lbl') ||
          ((tag === 'b' || tag === 'strong') && cleanText(child).length <= 60)) {
        const t = cleanText(child);
        if (t) out.push({ type: 'sub', text: t });
        continue;
      }
      if (child.children.length) { walk(child, out); continue; }
      const t = cleanText(child);
      if (t) out.push({ type: 'p', text: t });
    }
  };

  const renderSlide = (slide, index) => {
    const section = document.createElement('section');
    section.className = 'deck-reader-slide';
    section.id = `r-slide-${index + 1}`;

    const num = document.createElement('div');
    num.className = 'deck-reader-num';
    num.textContent = `${String(index + 1).padStart(2, '0')} / ${slides.length}`;
    section.appendChild(num);

    // A handful of older decks set the title with a plain div.h-mega instead
    // of a semantic h1 — fall back to the class so those slides still get a
    // heading in the reader instead of silently starting with the lead.
    const heading = slide.querySelector('h1, h2, .h-mega, .h-big, .h-sec');
    if (heading) {
      const h = document.createElement('h2');
      h.textContent = cleanText(heading);
      section.appendChild(h);
    }

    const lead = slide.querySelector('.lead');
    if (lead) {
      const p = document.createElement('p');
      p.className = 'deck-reader-lead';
      p.textContent = cleanText(lead);
      section.appendChild(p);
    }

    const blocks = [];
    walk(slide, blocks);
    let list = null;
    for (const block of blocks) {
      if (heading && block.text === cleanText(heading)) continue;
      if (lead && block.text === cleanText(lead)) continue;
      if (block.type === 'li') {
        if (!list) { list = document.createElement('ul'); section.appendChild(list); }
        const li = document.createElement('li');
        li.textContent = block.text;
        list.appendChild(li);
        continue;
      }
      list = null;
      const el = document.createElement(block.type === 'sub' ? 'h3' : 'p');
      el.className = block.type === 'sub' ? 'deck-reader-sub' : '';
      el.textContent = block.text;
      section.appendChild(el);
    }
    return section;
  };

  let built = false;
  const reader = document.createElement('div');
  reader.className = 'deck-reader';
  const inner = document.createElement('div');
  inner.className = 'deck-reader-inner';
  reader.appendChild(inner);

  const build = () => {
    if (built) return;
    built = true;
    slides.forEach((slide, i) => inner.appendChild(renderSlide(slide, i)));
    document.body.appendChild(reader);
  };

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'deck-reader-toggle';

  const fromHash = () => {
    const m = location.hash.match(/(?:slide-|slide=|^#)(\d+)/);
    return m ? Number(m[1]) - 1 : null;
  };

  const setReader = (on, { scroll = true } = {}) => {
    if (on) build();
    reader.classList.toggle('on', on);
    stage.style.display = on ? 'none' : '';
    if (progress) progress.style.display = on ? 'none' : '';
    toggle.textContent = on ? '🖼️' : '👁️';
    toggle.setAttribute('aria-label', on ? 'Torna alle slide' : 'Apri modalità lettura');
    toggle.title = on ? 'Torna alle slide' : 'Apri modalità lettura';
    toggle.setAttribute('aria-pressed', String(on));
    if (on && scroll) {
      const n = fromHash();
      const target = Number.isInteger(n) ? inner.children[n] : null;
      (target || inner).scrollIntoView({ block: 'start' });
    }
  };

  toggle.addEventListener('click', () => {
    manualOverride = true;
    setReader(!reader.classList.contains('on'));
  });
  document.body.appendChild(toggle);

  mq.addEventListener('change', () => {
    if (!manualOverride) setReader(mq.matches);
  });

  setReader(mq.matches);
})();
