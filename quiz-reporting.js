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
  field.innerHTML = '<div class="quiz-student-name">' +
    '<label for="student-first-name">Nome<input id="student-first-name" name="student-first-name" ' +
    'type="text" maxlength="60" autocomplete="given-name" required></label>' +
    '<label for="student-last-name">Cognome<input id="student-last-name" name="student-last-name" ' +
    'type="text" maxlength="60" autocomplete="family-name" required></label></div>' +
    '<label class="quiz-student-course" for="student-course">Corso<input id="student-course" name="student-course" ' +
    'type="text" maxlength="100" autocomplete="organization-title" required></label>' +
    '<small>Nome, cognome e corso sono obbligatori per registrare il risultato.</small>' +
    '<span id="quiz-report-status" role="status" aria-live="polite"></span>';
  scorePanel.insertBefore(field, scorePanel.lastElementChild);

  const style = document.createElement('style');
  style.textContent = '.quiz-student-field{display:grid;gap:7px;min-width:300px;max-width:520px}' +
    '.quiz-student-name{display:grid;grid-template-columns:1fr 1fr;gap:12px}' +
    '.quiz-student-field label{display:grid;gap:5px;font-weight:700}' +
    '.quiz-student-field input{width:100%;border:1px solid rgba(244,236,224,.35);border-radius:8px;' +
    'padding:10px 12px;background:rgba(244,236,224,.08);color:var(--paper);font:inherit}' +
    '.quiz-student-field input.invalid{border-color:var(--red);outline:2px solid rgba(230,83,59,.25)}' +
    '.quiz-student-field small,.quiz-student-field span{font-size:13px;color:rgba(244,236,224,.65)}' +
    '.quiz-student-field span.error{color:#ff9a88}.quiz-student-field span.ok{color:#9fd9bf}' +
    '@media(max-width:720px){.quiz-student-name{grid-template-columns:1fr}.quiz-student-field{min-width:100%}}';
  document.head.appendChild(style);

  const firstNameInput = document.getElementById('student-first-name');
  const lastNameInput = document.getElementById('student-last-name');
  const courseInput = document.getElementById('student-course');
  const status = document.getElementById('quiz-report-status');
  let lastFingerprint = '';

  function setStatus(message, kind) {
    status.textContent = message;
    status.className = kind || '';
  }

  function cleanName(value) {
    return value.trim().replace(/\s+/g, ' ').slice(0, 60);
  }

  function validName(value) {
    return /^[\p{L}][\p{L}\p{M}' -]{0,59}$/u.test(value);
  }
  function validCourse(value) {
    return value.length >= 2 && value.length <= 100;
  }

  function collectResult() {
    const questions = Array.from(quiz.querySelectorAll('.question'));
    const answers = questions.map((q, index) => {
      const picked = q.querySelector('input:checked');
      return {
        question: index + 1,
        prompt: q.querySelector('h2')?.textContent.trim() || '',
        answer: picked ? picked.value : ''
      };
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
    const firstName = cleanName(firstNameInput.value);
    const lastName = cleanName(lastNameInput.value);
    const course = courseInput.value.trim().replace(/\s+/g, ' ').slice(0, 100);
    firstNameInput.value = firstName;
    lastNameInput.value = lastName;
    courseInput.value = course;
    firstNameInput.classList.toggle('invalid', !validName(firstName));
    lastNameInput.classList.toggle('invalid', !validName(lastName));
    courseInput.classList.toggle('invalid', !validCourse(course));
    if (!validName(firstName) || !validName(lastName) || !validCourse(course)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      (!validName(firstName) ? firstNameInput : !validName(lastName) ? lastNameInput : courseInput).focus();
      setStatus('Inserisci nome, cognome e corso prima della correzione.', 'error');
      return;
    }

    window.setTimeout(function () {
      const result = collectResult();
      const fingerprint = firstName + '|' + lastName + '|' + course + '|' + JSON.stringify(result.answers);
      if (fingerprint === lastFingerprint) {
        setStatus('Questo tentativo è già stato inviato.', 'ok');
        return;
      }
      lastFingerprint = fingerprint;
      submitResult({
        attemptId: crypto.randomUUID ? crypto.randomUUID() : Date.now() + '-' + Math.random().toString(16).slice(2),
        quiz: document.body.dataset.quizArea || location.pathname.split('/').pop() || document.title,
        title: document.querySelector('h1')?.textContent.trim() || document.title,
        firstName,
        lastName,
        course,
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
