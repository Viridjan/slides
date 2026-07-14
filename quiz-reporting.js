/* Proprietà intellettuale di Francesco Antonio Binetti */
(function () {
  'use strict';

  const config = window.QUIZ_REPORTING_CONFIG || {};
  const endpoint = String(config.endpoint || '').trim();
  const enabled = config.enabled !== false;
  if (!enabled || !endpoint) return;
  const quiz = document.getElementById('quiz');
  const checkButton = document.getElementById('check');
  const resetButton = document.getElementById('reset');
  const scorePanel = document.querySelector('.panel.score');
  if (!quiz || !checkButton || !scorePanel) return;

  const field = document.createElement('div');
  field.className = 'quiz-student-field';
  field.innerHTML = '<label for="student-code">Codice studente</label>' +
    '<input id="student-code" name="student-code" type="text" maxlength="40" autocomplete="off" ' +
    'placeholder="Es. CLASSE-07" aria-describedby="quiz-report-status">' +
    '<small>Usa il codice assegnato: evita nome, cognome o email.</small>' +
    '<span id="quiz-report-status" role="status" aria-live="polite"></span>';
  scorePanel.insertBefore(field, scorePanel.lastElementChild);

  const style = document.createElement('style');
  style.textContent = '.quiz-student-field{display:grid;gap:5px;min-width:220px;max-width:300px}' +
    '.quiz-student-field label{font-weight:700}' +
    '.quiz-student-field input{width:100%;border:1px solid rgba(244,236,224,.35);border-radius:8px;' +
    'padding:10px 12px;background:rgba(244,236,224,.08);color:var(--paper);font:inherit}' +
    '.quiz-student-field input::placeholder{color:rgba(244,236,224,.45)}' +
    '.quiz-student-field input.invalid{border-color:var(--red);outline:2px solid rgba(230,83,59,.25)}' +
    '.quiz-student-field small,.quiz-student-field span{font-size:13px;color:rgba(244,236,224,.65)}' +
    '.quiz-student-field span.error{color:#ff9a88}.quiz-student-field span.ok{color:#9fd9bf}';
  document.head.appendChild(style);

  const codeInput = document.getElementById('student-code');
  const status = document.getElementById('quiz-report-status');
  const storageKey = 'educazione-digitale:student-code';
  codeInput.value = localStorage.getItem(storageKey) || '';
  let lastFingerprint = '';

  function setStatus(message, kind) {
    status.textContent = message;
    status.className = kind || '';
  }

  function cleanCode(value) {
    return value.trim().replace(/\s+/g, '-').replace(/[^A-Za-z0-9._-]/g, '').slice(0, 40);
  }

  function collectResult() {
    const questions = Array.from(quiz.querySelectorAll('.question'));
    const answers = questions.map((q, index) => {
      const picked = q.querySelector('input:checked');
      return { question: index + 1, answer: picked ? picked.value : '' };
    });
    const correct = questions.reduce((sum, q) => {
      const picked = q.querySelector('input:checked');
      return sum + Number(Boolean(picked && picked.value === q.dataset.correct));
    }, 0);
    return { answers, correct, total: questions.length };
  }

  async function submitResult(payload) {
    setStatus('Invio del risultato…');
    try {
      await fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
        keepalive: true
      });
      setStatus('Risultato inviato.', 'ok');
    } catch (error) {
      setStatus('Invio non riuscito: conserva il punteggio e avvisa il docente.', 'error');
    }
  }

  checkButton.addEventListener('click', function (event) {
    const studentCode = cleanCode(codeInput.value);
    codeInput.value = studentCode;
    if (!studentCode) {
      event.preventDefault();
      event.stopImmediatePropagation();
      codeInput.classList.add('invalid');
      codeInput.focus();
      setStatus('Inserisci il codice studente prima della correzione.', 'error');
      return;
    }
    codeInput.classList.remove('invalid');
    localStorage.setItem(storageKey, studentCode);

    window.setTimeout(function () {
      const result = collectResult();
      const fingerprint = studentCode + '|' + JSON.stringify(result.answers);
      if (fingerprint === lastFingerprint) {
        setStatus('Questo tentativo è già stato inviato.', 'ok');
        return;
      }
      lastFingerprint = fingerprint;
      submitResult({
        attemptId: crypto.randomUUID ? crypto.randomUUID() : Date.now() + '-' + Math.random().toString(16).slice(2),
        quiz: location.pathname.split('/').pop() || document.title,
        title: document.querySelector('h1')?.textContent.trim() || document.title,
        studentCode,
        score: result.correct,
        total: result.total,
        answers: result.answers,
        clientTime: new Date().toISOString()
      });
    }, 0);
  }, true);

  resetButton?.addEventListener('click', function () {
    lastFingerprint = '';
    setStatus('');
  });
}());
