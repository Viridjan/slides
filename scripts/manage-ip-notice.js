/* Proprietà intellettuale di Francesco Antonio Binetti */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const notice = 'Proprietà intellettuale di Francesco Antonio Binetti';
const mode = process.argv[2] || 'check';

const wrappers = new Map([
  ['.html', (s) => `<!-- ${s} -->`],
  ['.md', (s) => `<!-- ${s} -->`],
  ['.mmd', (s) => `%% ${s}`],
  ['.js', (s) => `/* ${s} */`],
  ['.jsx', (s) => `/* ${s} */`],
  ['.css', (s) => `/* ${s} */`],
  ['.ino', (s) => `// ${s}`],
  ['.gs', (s) => `// ${s}`],
  ['.py', (s) => `# ${s}`],
  ['.sh', (s) => `# ${s}`],
  ['.yml', (s) => `# ${s}`],
  ['.yaml', (s) => `# ${s}`],
  ['.gitignore', (s) => `# ${s}`],
]);

const excludedDirectories = new Set([
  '.git',
  '.venv',
  'node_modules',
  'experiments',
  'graphify-out',
]);
const excludedPaths = new Set([
  path.join('.claude', 'skills', 'power-design'),
  path.join('corsi', 'images'),
]);
function walk(directory, prefix = '') {
  const names = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const relative = path.join(prefix, entry.name);
    if (entry.isDirectory()) {
      if (excludedDirectories.has(entry.name) || excludedPaths.has(relative)) continue;
      names.push(...walk(path.join(directory, entry.name), relative));
    } else {
      names.push(relative);
    }
  }
  return names;
}

const tracked = walk(root);
const eligible = tracked.filter((name) => wrappers.has(path.extname(name)));
const missing = [];

for (const name of eligible) {
  const file = path.join(root, name);
  const content = fs.readFileSync(file, 'utf8');
  if (content.toLocaleLowerCase('it').includes(notice.toLocaleLowerCase('it'))) continue;
  if (mode !== 'add') {
    missing.push(name);
    continue;
  }
  const marker = wrappers.get(path.extname(name))(notice);
  if (content.startsWith('#!')) {
    const newline = content.indexOf('\n');
    fs.writeFileSync(file, `${content.slice(0, newline + 1)}${marker}\n${content.slice(newline + 1)}`);
  } else {
    fs.writeFileSync(file, `${marker}\n${content}`);
  }
}

if (missing.length) {
  console.error(`Dicitura mancante in ${missing.length} file:\n${missing.join('\n')}`);
  process.exit(1);
}

console.log(`${mode === 'add' ? 'Dicitura inserita in' : 'Dicitura verificata su'} ${eligible.length} file testuali commentabili.`);
