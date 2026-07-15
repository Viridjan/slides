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
  const indexHref = document.querySelector('.home-btn')?.getAttribute('href') || '00-indice.html';

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
    else if (e.key.toLowerCase() === 'i') location.href = indexHref;
    else if (e.key === '+' || e.key === '=') { e.preventDefault(); setZoom(zoom + 0.25); }
    else if (e.key === '-' || e.key === '_') { e.preventDefault(); setZoom(zoom - 0.25); }
    else if (e.key === '0') { e.preventDefault(); setZoom(1); }
  });

  let wheelLock = false;
  addEventListener('wheel', e => {
    // Ctrl+wheel is the universal zoom gesture; preventDefault stops the browser
    // from zooming the page (which the fixed stage would just refit away).
    if (e.ctrlKey) {
      e.preventDefault();
      setZoom(zoom - Math.sign(e.deltaY) * 0.2, e.clientX, e.clientY);
      return;
    }
    // While zoomed in, the wheel pans instead of changing slide.
    if (zoom > 1) { panY -= e.deltaY; apply(); return; }
    if (wheelLock || Math.abs(e.deltaY) < 20) return;
    wheelLock = true;
    e.deltaY > 0 ? next() : prev();
    setTimeout(() => { wheelLock = false; }, 700);
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
