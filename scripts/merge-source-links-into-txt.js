const fs = require('fs');
const { execFileSync } = require('child_process');

const files = fs.readdirSync('.').filter(name => /^[a-z]{2}\d{2}.*\.html$/.test(name)).sort();
const clean = value => value.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

for (const htmlFile of files) {
  const txtFile = htmlFile.replace(/\.html$/, '.txt');
  const html = fs.readFileSync(htmlFile, 'utf8');
  const slideSources = [...html.matchAll(/<section\b[\s\S]*?<\/section>/gi)].map(match => {
    const sources = [];
    for (const anchor of match[0].matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
      const attrs = anchor[1];
      const href = attrs.match(/href="(https?:\/\/[^"]+)"/i)?.[1];
      if (!href) continue;
      const title = attrs.match(/title="Fonte ufficiale:\s*([^"]+)"/i)?.[1];
      const text = clean(anchor[2]);
      if (!title && !/Fonte ufficiale/i.test(text)) continue;
      sources.push({ label: title || text.replace(/Fonte ufficiale\s*→?\s*/i, ''), href });
    }
    return [...new Map(sources.map(source => [source.href, source])).values()];
  });

  let txt = execFileSync('git', ['show', `HEAD:${txtFile}`], { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
  txt = txt.replace(/--- Slide (\d+) ---\n([\s\S]*?)(?=\n--- Slide \d+ ---|\s*$)/g, (block, number, body) => {
    const sources = slideSources[Number(number) - 1] || [];
    const cleanBody = body.replace(/\n?Fonti ufficiali:\n(?:- [^\n]+\n?)+/g, '').trimEnd();
    if (!sources.length) return `--- Slide ${number} ---\n${cleanBody}\n`;
    const list = sources.map(source => `- ${source.label} — ${source.href}`).join('\n');
    return `--- Slide ${number} ---\n${cleanBody}\nFonti ufficiali:\n${list}\n`;
  });
  txt = `${txt.trimEnd()}\n`;
  fs.writeFileSync(txtFile, txt);
}

console.log(`Merged source links into ${files.length} existing TXT companions.`);
