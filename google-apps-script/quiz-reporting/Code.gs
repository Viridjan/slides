// Proprietà intellettuale di Francesco Antonio Binetti
const RESULTS_SHEET = 'Risultati';
const DASHBOARD_SHEET = 'Ultime 48 ore';
const HEADERS = [
  'Timestamp server', 'Codice studente', 'Quiz', 'Titolo', 'Punteggio',
  'Totale', 'Percentuale', 'Risposte', 'ID tentativo', 'Timestamp dispositivo'
];

/** Eseguire una volta dall'editor Apps Script collegato al foglio. */
function setup() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) throw new Error('Apri Apps Script da Estensioni > Apps Script nel foglio Google.');
  PropertiesService.getScriptProperties().setProperty('SPREADSHEET_ID', spreadsheet.getId());
  ensureSheet_(spreadsheet, RESULTS_SHEET, HEADERS);
  ensureSheet_(spreadsheet, DASHBOARD_SHEET, HEADERS);
  aggiornaDashboardUltime48Ore();
}

function doGet() {
  return json_({ ok: true, service: 'quiz-reporting' });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const payload = JSON.parse(e && e.postData ? e.postData.contents : '{}');
    validate_(payload);
    const spreadsheet = openSpreadsheet_();
    const sheet = ensureSheet_(spreadsheet, RESULTS_SHEET, HEADERS);

    const attemptId = safeText_(payload.attemptId, 100);
    if (attemptExists_(sheet, attemptId)) return json_({ ok: true, duplicate: true });

    const score = Number(payload.score);
    const total = Number(payload.total);
    sheet.appendRow([
      new Date(),
      safeText_(payload.studentCode, 40),
      safeText_(payload.quiz, 100),
      safeText_(payload.title, 160),
      score,
      total,
      total ? score / total : 0,
      JSON.stringify(payload.answers || []),
      attemptId,
      safeText_(payload.clientTime, 40)
    ]);
    sheet.getRange(sheet.getLastRow(), 7).setNumberFormat('0.0%');
    aggiornaDashboardUltime48Ore();
    return json_({ ok: true });
  } catch (error) {
    return json_({ ok: false, error: String(error.message || error) });
  } finally {
    lock.releaseLock();
  }
}

function aggiornaDashboardUltime48Ore() {
  const spreadsheet = openSpreadsheet_();
  const source = ensureSheet_(spreadsheet, RESULTS_SHEET, HEADERS);
  const dashboard = ensureSheet_(spreadsheet, DASHBOARD_SHEET, HEADERS);
  const values = source.getDataRange().getValues();
  const cutoff = Date.now() - 48 * 60 * 60 * 1000;
  const recent = values.slice(1).filter(row => row[0] instanceof Date && row[0].getTime() >= cutoff);
  dashboard.clearContents();
  dashboard.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold');
  if (recent.length) {
    dashboard.getRange(2, 1, recent.length, HEADERS.length).setValues(recent);
    dashboard.getRange(2, 7, recent.length, 1).setNumberFormat('0.0%');
  }
  dashboard.setFrozenRows(1);
  dashboard.autoResizeColumns(1, HEADERS.length);
}

function openSpreadsheet_() {
  const id = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
  if (!id) throw new Error('Configurazione mancante: esegui setup() una volta.');
  return SpreadsheetApp.openById(id);
}

function ensureSheet_(spreadsheet, name, headers) {
  const sheet = spreadsheet.getSheetByName(name) || spreadsheet.insertSheet(name);
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function attemptExists_(sheet, attemptId) {
  if (!attemptId || sheet.getLastRow() < 2) return false;
  return Boolean(sheet.getRange(2, 9, sheet.getLastRow() - 1, 1)
    .createTextFinder(attemptId).matchEntireCell(true).findNext());
}

function validate_(payload) {
  if (!payload || typeof payload !== 'object') throw new Error('Payload non valido.');
  if (!/^[A-Za-z0-9._-]{1,40}$/.test(String(payload.studentCode || ''))) throw new Error('Codice studente non valido.');
  const score = Number(payload.score);
  const total = Number(payload.total);
  if (!Number.isInteger(score) || !Number.isInteger(total) || total < 1 || score < 0 || score > total || total > 200) {
    throw new Error('Punteggio non valido.');
  }
  if (!Array.isArray(payload.answers) || payload.answers.length !== total) throw new Error('Risposte non valide.');
}

function safeText_(value, maxLength) {
  const text = String(value == null ? '' : value).slice(0, maxLength);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
