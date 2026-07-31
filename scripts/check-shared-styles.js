/* Proprietà intellettuale di Francesco Antonio Binetti */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const decksDir = path.join(root, 'decks');
const knownCourseClasses = new Set([
  'course-hs',
  'course-rw',
  'course-cd',
  'course-sd',
  'course-sm',
  'course-su',
  'course-ia',
  'course-pm',
  'course-pr',
  'course-sc',
  'course-mb',
  'course-gd',
  'course-ms',
]);
const controlledCodeProperties = /(?:font-size|line-height|padding|background|color|white-space)\s*:/i;
const failures = [];

for (const filename of fs.readdirSync(decksDir).filter((name) => name.endsWith('.html'))) {
  // The old standalone macroarea quizzes predate the shared deck theme and
  // are not linked from the published index.
  if (filename.startsWith('quiz-')) continue;

  const relative = path.join('decks', filename);
  const html = fs.readFileSync(path.join(decksDir, filename), 'utf8');
  const bodyClasses = (html.match(/<body\b[^>]*class="([^"]*)"/i) || [])[1] || '';
  const courseClass = bodyClasses.split(/\s+/).find((name) => name.startsWith('course-'));

  if (!courseClass || !knownCourseClasses.has(courseClass)) {
    failures.push(`${relative}: classe di macroarea assente o sconosciuta`);
  }
  if (!html.includes('../theme-corsi.css')) {
    failures.push(`${relative}: collegamento a ../theme-corsi.css assente`);
  }

  for (const match of html.matchAll(/<(?:div|pre)\b([^>]*)class="([^"]*)"([^>]*)>/gi)) {
    const classes = match[2].split(/\s+/);
    if (!classes.includes('code')) continue;
    if (!classes.includes('code-example')) {
      failures.push(`${relative}: un blocco .code non usa .code-example`);
    }
    const attributes = `${match[1]} ${match[3]}`;
    const style = (attributes.match(/\bstyle="([^"]*)"/i) || [])[1] || '';
    if (controlledCodeProperties.test(style)) {
      failures.push(`${relative}: un blocco .code-example ridefinisce proprietà condivise inline`);
    }
  }
}

if (failures.length) {
  console.error(`Standard degli stili non rispettato (${failures.length} problemi):`);
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Stili condivisi verificati su tutti i deck didattici.');
