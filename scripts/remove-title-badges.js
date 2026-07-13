const fs = require('fs');

const files = fs.readdirSync('.')
  .filter(name => /^[a-z]{2}\d{2}.*\.html$/.test(name))
  .sort();

const strip = html => html
  .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
  .replace(/<br\s*\/?>/gi, '\n')
  .replace(/<[^>]+>/g, ' ')
  .replace(/[ \t]+/g, ' ')
  .replace(/ *\n */g, '\n')
  .trim();

function removeBadgeGroups(section) {
  return section
    .replace(/<div\b[^>]*class="[^"]*\bchips\b[^"]*"[^>]*>[\s\S]*?<\/div>/gi, group =>
      /<span\b[^>]*class="[^"]*\bchip\b/i.test(group) && !/<a\b/i.test(group) ? '' : group
    )
    .replace(/<p\b[^>]*>\s*(?:<span\b[^>]*class="[^"]*\bchip\b[^"]*"[^>]*>[\s\S]*?<\/span>\s*)+<\/p>/gi, '');
}

let decksChanged = 0;
let badgesRemoved = 0;

for (const file of files) {
  const original = fs.readFileSync(file, 'utf8');
  const firstSlide = original.match(/<section\b[\s\S]*?<\/section>/i)?.[0];
  if (!firstSlide) continue;

  const beforeCount = (firstSlide.match(/<span\b[^>]*class="[^"]*\bchip\b/gi) || []).length;
  if (!beforeCount) continue;

  const cleanedSlide = removeBadgeGroups(firstSlide);
  const afterCount = (cleanedSlide.match(/<span\b[^>]*class="[^"]*\bchip\b/gi) || []).length;
  if (cleanedSlide === firstSlide || afterCount) {
    throw new Error(`Title badges were not removed cleanly from ${file}`);
  }

  fs.writeFileSync(
    file,
    original.replace(firstSlide, cleanedSlide.replace(/^[ \t]+$/gm, ''))
  );

  const txtFile = file.replace(/\.html$/, '.txt');
  if (fs.existsSync(txtFile)) {
    const txt = fs.readFileSync(txtFile, 'utf8');
    const updated = txt.replace(
      /(--- Slide 1 ---\n)[\s\S]*?(?=\n--- Slide 2 ---)/,
      `$1${strip(cleanedSlide)}\n`
    );
    fs.writeFileSync(txtFile, updated);
  }

  decksChanged++;
  badgesRemoved += beforeCount;
}

console.log(`Removed ${badgesRemoved} title badges from ${decksChanged} decks.`);
