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

  const scale = () => {
    if (!stage) return;
    const f = Math.min(innerWidth / 1920, innerHeight / 1080);
    const x = (innerWidth - 1920 * f) / 2;
    const y = (innerHeight - 1080 * f) / 2;
    stage.style.transform = `translate(${x}px,${y}px) scale(${f})`;
  };

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
  });

  let wheelLock = false;
  addEventListener('wheel', e => {
    if (wheelLock || Math.abs(e.deltaY) < 20) return;
    wheelLock = true;
    e.deltaY > 0 ? next() : prev();
    setTimeout(() => { wheelLock = false; }, 700);
  }, { passive: true });

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
