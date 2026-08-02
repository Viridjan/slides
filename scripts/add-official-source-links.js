/* Proprietà intellettuale di Francesco Antonio Binetti */
const fs = require('fs');
const path = require('path');
const decksDir = path.join(__dirname, '..', 'decks');

const SOURCES = [
  ['Git', 'https://git-scm.com/docs', 'Documentazione ufficiale Git', /^pr04-05/],
  ['gitignore', 'https://git-scm.com/docs/gitignore', 'gitignore — documentazione Git', /^pr04-05/],
  ['Notepad++', 'https://npp-user-manual.org/', 'Manuale ufficiale Notepad++', /^pr04-02/],
  ['Sublime Text', 'https://www.sublimetext.com/docs/', 'Documentazione ufficiale Sublime Text', /^pr04-03/],
  ['Visual Studio Code', 'https://code.visualstudio.com/docs', 'Documentazione ufficiale Visual Studio Code', /^pr04-04/],
  ['IntelliSense', 'https://code.visualstudio.com/docs/editing/intellisense', 'IntelliSense — Visual Studio Code', /^pr04-04/],
  ['Symlink', 'https://pubs.opengroup.org/onlinepubs/9799919799/functions/symlink.html', 'symlink — specifica POSIX', /^rw02-03/],
  ['Hard link', 'https://learn.microsoft.com/windows/win32/fileio/hard-links-and-junctions', 'Hard link e junction — Microsoft Learn', /^rw02-03/],
  ['mklink', 'https://learn.microsoft.com/windows-server/administration/windows-commands/mklink', 'Comando mklink — Microsoft Learn', /^rw02-03/],
  ['Quick Assist', 'https://support.microsoft.com/windows/solve-pc-problems-remotely-using-quick-assist-b077e31a-16f4-2529-1a47-21f6a9040bf3', 'Assistenza Rapida — Supporto Microsoft', /^rw02-06/],
  ['RDP', 'https://learn.microsoft.com/windows-server/remote/remote-desktop-services/clients/remote-desktop-clients', 'Client Desktop remoto — Microsoft Learn', /^rw02-06/],
  ['SSH', 'https://www.rfc-editor.org/rfc/rfc4251', 'Secure Shell Protocol Architecture — RFC 4251', /^rw02-06/],
  ['Chrome Remote Desktop', 'https://support.google.com/chrome/answer/1649523', 'Chrome Remote Desktop — Guida Google', /^rw02-06/],
  ['RustDesk', 'https://rustdesk.com/docs/en/', 'Documentazione ufficiale RustDesk', /^rw02-06/],
  ['Apache Guacamole', 'https://guacamole.apache.org/doc/gug/', 'Manuale Apache Guacamole', /^rw02-06/],
  ['MeshCentral', 'https://ylianst.github.io/MeshCentral/', 'Documentazione MeshCentral', /^rw02-06/],
  ['Tailscale', 'https://tailscale.com/kb', 'Documentazione Tailscale', /^rw02-06/],
  ['WireGuard', 'https://www.wireguard.com/', 'WireGuard — sito ufficiale', /^rw02-06/],
  ['Wake-on-LAN', 'https://learn.microsoft.com/windows-hardware/drivers/network/system-wake-up-events', 'Riattivazione di sistema via rete — Microsoft Learn', /^rw02-06/],
  ['Dead Internet Theory', 'https://arxiv.org/abs/2502.00007', 'Dead Internet Theory — rassegna accademica', /^rw01-06/],
  ['Model collapse', 'https://www.nature.com/articles/s41586-024-07566-y', 'Model collapse con dati ricorsivi — Nature', /^rw01-06/],
  ['Sistema Internazionale', 'https://www.bipm.org/en/measurement-units', 'Sistema Internazionale delle unità — BIPM', /^pr01-06/],
  ['Claude Shannon', 'https://doi.org/10.1002/j.1538-7305.1948.tb00917.x', 'A Mathematical Theory of Communication — Shannon (1948)', /^pr01-02/],
  ['RAID', 'https://www.ibm.com/docs/en/power6?topic=arrays-raid-level-summary', 'Livelli RAID — documentazione IBM', /^hs02/],
  ['TCP/IP', 'https://www.rfc-editor.org/rfc/rfc1122.html', 'Internet Protocol Suite — RFC 1122', /^rw01-01/],
  ['Charles Babbage', 'https://www.computerhistory.org/babbage/engines/', 'Babbage e l’Analytical Engine — Computer History Museum', /^hs06/],
  ['Hermann Hollerith', 'https://www.computerhistory.org/revolution/story/2', 'Hollerith e il censimento — Computer History Museum', /^hs06/],
  ['ENIAC', 'https://www.computerhistory.org/tdih/february/14/', 'ENIAC — Computer History Museum', /^hs06/],
  ['Intel 4004', 'https://www.intel.com/content/www/us/en/history/virtual-vault/articles/the-intel-4004.html', 'Intel 4004 — Intel', /^hs06/],
  ['Personal Computer 5150', 'https://www.ibm.com/history/personal-computer', 'IBM Personal Computer — IBM', /^hs06/],
  ['MS-DOS', 'https://learn.microsoft.com/en-us/shows/history/history-of-microsoft-1981', 'MS-DOS e IBM PC — Microsoft', /^hs06/],
  ['Windows 1.0', 'https://learn.microsoft.com/en-us/shows/history/history-of-microsoft-1985', 'Windows 1.0 — Microsoft', /^hs06/],
  ['unità SI', 'https://www.bipm.org/en/measurement-units', 'Sistema Internazionale delle unità — BIPM', /^pr01-06/],
  ['virgola mobile', 'https://docs.python.org/3/tutorial/floatingpoint.html', 'Aritmetica in virgola mobile — Python', /^pr01-02/],
  ['DigComp 3.0', 'https://joint-research-centre.ec.europa.eu/projects-and-activities/education-and-training/digital-transformation-education/digital-competence-framework-digcomp/digcomp-30_en', 'DigComp 3.0 — Commissione europea', /^rw01-04/],
  ['Open Data', 'https://data.europa.eu/en/dataeuropa-academy/what-open-data', 'Open Data — portale europeo dei dati', /^rw01-04/],
  ['PDF/A', 'https://www.loc.gov/preservation/digital/formats/fdd/fdd000318.shtml', 'PDF/A per la conservazione — Library of Congress', /^rw02-02/],
  ['categorie particolari di dati', 'https://eur-lex.europa.eu/eli/reg/2016/679/art_9/oj', 'GDPR, art. 9 — EUR-Lex'],
  ['diritto alla cancellazione', 'https://eur-lex.europa.eu/eli/reg/2016/679/art_17/oj', 'GDPR, art. 17 — EUR-Lex'],
  ['Controllo a distanza dei lavoratori', 'https://www.normattiva.it/atto/caricaDettaglioAtto?atto.articolo.numero=4&atto.codiceRedazionale=070U0300&atto.dataPubblicazioneGazzetta=1970-05-27', 'Statuto dei lavoratori, art. 4 — Normattiva', /^sd05/],
  ['Materiale pedopornografico online', 'https://www.normattiva.it/uri-res/N2Ls?urn%3Anir%3Astato%3Aregio.decreto%3A1930-10-19%3B1398%3A1~art600quater=', 'Codice penale, art. 600-quater — Normattiva', /^sd05/],
  ['Codice Penale italiano', 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:regio.decreto:1930-10-19;1398', 'Codice penale — Normattiva', /^sd05/],
  ['Legge 547 del 1993', 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:1993-12-23;547', 'Legge 547/1993 sui reati informatici — Normattiva', /^sd05/],
  ['diritto all’oblio', 'https://eur-lex.europa.eu/eli/reg/2016/679/art_17/oj', 'GDPR, art. 17 — EUR-Lex'],
  ["diritto all'oblio", 'https://eur-lex.europa.eu/eli/reg/2016/679/art_17/oj', 'GDPR, art. 17 — EUR-Lex'],
  ['GDPR', 'https://eur-lex.europa.eu/eli/reg/2016/679/oj', 'Regolamento generale sulla protezione dei dati — EUR-Lex'],
  ['NIS2', 'https://eur-lex.europa.eu/eli/dir/2022/2555/oj', 'Direttiva NIS2 — EUR-Lex'],
  ['AI Act', 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj', 'Regolamento europeo sull’IA — EUR-Lex'],
  ['WCAG', 'https://www.w3.org/Translations/WCAG22-it/', 'WCAG 2.2 — W3C'],
  ['Creative Commons', 'https://creativecommons.org/share-your-work/cclicenses/', 'Licenze Creative Commons'],
  ['copyright', 'https://europa.eu/youreurope/business/running-business/intellectual-property/copyright/index_it.htm', 'Copyright nell’Unione europea'],
  ['watermarking', 'https://www.wipo.int/en/web/copyright/protection', 'Proteggere le opere digitali — WIPO', /^cd01-04/],
  ['watermark', 'https://www.wipo.int/en/web/copyright/protection', 'Proteggere le opere digitali — WIPO', /^cd01-04/],
  ['DRM', 'https://www.wipo.int/en/web/copyright/protection', 'Proteggere le opere digitali — WIPO', /^cd01-04/],
  ['WordPress', 'https://developer.wordpress.org/advanced-administration/security/hardening/', 'Hardening WordPress — documentazione ufficiale', /^cd01-04/],
  ['plugin', 'https://developer.wordpress.org/advanced-administration/security/hardening/', 'Hardening WordPress — documentazione ufficiale', /^cd01-04/],
  ['SPID', 'https://www.agid.gov.it/it/piattaforme/spid', 'SPID — AgID'],
  ['Carta d’Identità Elettronica', 'https://www.cartaidentita.interno.gov.it/', 'Carta d’Identità Elettronica — Ministero dell’Interno'],
  ["Carta d'Identità Elettronica", 'https://www.cartaidentita.interno.gov.it/', 'Carta d’Identità Elettronica — Ministero dell’Interno'],
  ['PEC', 'https://www.agid.gov.it/it/piattaforme/posta-elettronica-certificata', 'Posta elettronica certificata — AgID'],
  ['gaming disorder', 'https://www.who.int/standards/classifications/frequently-asked-questions/gaming-disorder', 'Gaming disorder — OMS'],
  ['ICD-11', 'https://www.who.int/news/item/11-02-2022-who-s-new-international-classification-of-diseases-%28icd-11%29-comes-into-effect', 'ICD-11 — OMS'],
  ['Cybersecurity Framework', 'https://www.nist.gov/cyberframework', 'Cybersecurity Framework 2.0 — NIST'],
  ['CVSS', 'https://www.first.org/cvss/', 'Common Vulnerability Scoring System — FIRST'],
  ['ISO 27001', 'https://www.iso.org/isoiec-27001-information-security.html', 'ISO/IEC 27001 — ISO'],
  ['password manager', 'https://www.nist.gov/cybersecurity-and-privacy/how-do-i-create-good-password', 'Password e MFA — NIST'],
  ['password', 'https://www.nist.gov/cybersecurity-and-privacy/how-do-i-create-good-password', 'Password e MFA — NIST'],
  ['ransomware', 'https://www.cisa.gov/stopransomware', 'StopRansomware — CISA'],
  ['phishing', 'https://www.cisa.gov/secure-our-world/recognize-and-report-phishing', 'Riconoscere il phishing — CISA'],
  ['DNS', 'https://www.icann.org/resources/pages/about-domain-names-2018-08-30-en', 'Domain Name System — ICANN'],
  ['nome di dominio', 'https://www.icann.org/resources/pages/about-domain-names-2018-08-30-en', 'Nomi di dominio — ICANN'],
  ['IPv6', 'https://www.rfc-editor.org/rfc/rfc8200', 'Internet Protocol Version 6 — RFC 8200'],
  ['HTTPS', 'https://www.rfc-editor.org/rfc/rfc9110', 'HTTP Semantics — RFC 9110', /^(?!cd01-04)/],
  ['TLS', 'https://www.rfc-editor.org/rfc/rfc8446', 'TLS 1.3 — RFC 8446'],
  ['email', 'https://www.rfc-editor.org/rfc/rfc5322', 'Internet Message Format — RFC 5322'],
  ['Bluetooth', 'https://www.bluetooth.com/specifications/specs/', 'Specifiche Bluetooth — Bluetooth SIG', /^(hs|sm)/],
  ['Wi-Fi', 'https://www.wi-fi.org/discover-wi-fi', 'Wi-Fi — Wi-Fi Alliance', /^(hs|sm|rw)/],
  ['WiFi', 'https://www.wi-fi.org/discover-wi-fi', 'Wi-Fi — Wi-Fi Alliance', /^(hs|sm|rw)/],
  ['USB', 'https://www.usb.org/documents', 'Documenti e specifiche USB — USB-IF', /^(hs|sm)/],
  ['Android', 'https://support.google.com/android/', 'Guida ufficiale Android'],
  ['iOS', 'https://support.apple.com/guide/iphone/welcome/ios', 'Manuale utente iPhone — Apple'],
  ['Microsoft 365', 'https://support.microsoft.com/microsoft-365', 'Supporto Microsoft 365', /^su/],
  ['Microsoft Word', 'https://support.microsoft.com/word', 'Supporto Microsoft Word', /^su/],
  ['Word', 'https://support.microsoft.com/word', 'Supporto Microsoft Word', /^su/],
  ['Microsoft Excel', 'https://support.microsoft.com/excel', 'Supporto Microsoft Excel', /^su/],
  ['Excel', 'https://support.microsoft.com/excel', 'Supporto Microsoft Excel', /^su/],
  // Not in su03-14/15/18: there 'funzioni' means VBA/JavaScript functions, and
  // an Excel-formulas link on a JavaScript slide is the homonym bug again.
  ['formule', 'https://support.microsoft.com/excel', 'Formule e funzioni — Supporto Microsoft Excel', /^su03-(?!1[458])/],
  ['funzioni', 'https://support.microsoft.com/excel', 'Formule e funzioni — Supporto Microsoft Excel', /^su03-(?!1[458])/],
  ['VBA', 'https://learn.microsoft.com/office/vba/api/overview/', 'Riferimento VBA per Office — Microsoft Learn'],
  ['Google Workspace', 'https://support.google.com/a/users/', 'Centro didattico Google Workspace', /^su/],
  ['Google Docs', 'https://support.google.com/docs/', 'Guida ufficiale Google Docs Editors', /^su/],
  ['Google Sheets', 'https://support.google.com/docs/topic/9054603', 'Guida ufficiale Google Sheets', /^su/],
  ['Google Slides', 'https://support.google.com/a/users/answer/9282488', 'Formazione e guida Google Slides', /^su/],
  ['Adobe Photoshop', 'https://helpx.adobe.com/photoshop/user-guide.html', 'Guida ufficiale Adobe Photoshop'],
  ['Adobe Illustrator', 'https://helpx.adobe.com/illustrator/user-guide.html', 'Guida ufficiale Adobe Illustrator'],
  ['Adobe Acrobat', 'https://helpx.adobe.com/acrobat/user-guide.html', 'Guida ufficiale Adobe Acrobat'],
  ['LibreOffice', 'https://documentation.libreoffice.org/', 'Documentazione LibreOffice', /^su/],
  ['Unicode', 'https://www.unicode.org/versions/latest/', 'Unicode Standard', /^(pr|hs)/],
  ['UTF-8', 'https://www.unicode.org/versions/latest/core-spec/chapter-2/', 'UTF-8 — Unicode Standard', /^(pr|hs)/],
  // Not in pr01-03: that deck only names Python as one of Flowgorithm's export
  // targets, and a tutorial link there sends the reader away from the algorithm.
  ['Python', 'https://docs.python.org/3/tutorial/', 'Tutorial ufficiale Python', /^pr(?!01-03)/],
  ['dataclass', 'https://docs.python.org/3/library/dataclasses.html', 'Modulo dataclasses — documentazione Python', /^pr06-02/],
  ['generatori', 'https://docs.python.org/3/howto/functional.html#generators', 'Generatori — Python Functional Programming HOWTO', /^pr06-02/],
  ['ambiente virtuale', 'https://docs.python.org/3/library/venv.html', 'Modulo venv — documentazione Python', /^pr06-02/],
  ['unittest', 'https://docs.python.org/3/library/unittest.html', 'Modulo unittest — documentazione Python', /^pr06-02/],
  ['requests', 'https://requests.readthedocs.io/en/latest/user/quickstart/', 'Requests Quickstart — documentazione ufficiale', /^pr06-02/],
  ['SQLite', 'https://docs.python.org/3/library/sqlite3.html', 'Modulo sqlite3 — documentazione Python', /^pr06-02/],
  ['DictReader', 'https://docs.python.org/3/library/csv.html', 'Modulo csv — documentazione Python', /^pr06-01/],
  ['JSON', 'https://docs.python.org/3/library/json.html', 'Modulo json — documentazione Python', /^pr06-01/],
  ['pathlib', 'https://docs.python.org/3/library/pathlib.html', 'Modulo pathlib — documentazione Python', /^pr06-01/],
  // Serie HTML (PR05): fonti ufficiali MDN/W3C, ognuna sul deck piu' pertinente.
  ['HTML', 'https://developer.mozilla.org/it/docs/Web/HTML', 'HTML — MDN Web Docs', /^pr05-/],
  ['tag', 'https://developer.mozilla.org/it/docs/Web/HTML/Element', 'Elementi HTML — MDN', /^pr05-01/],
  ['immagini', 'https://developer.mozilla.org/it/docs/Web/HTML/Element/img', 'Elemento img — MDN', /^pr05-03/],
  ['tabelle', 'https://developer.mozilla.org/it/docs/Web/HTML/Element/table', 'Elemento table — MDN', /^pr05-03/],
  ['form', 'https://developer.mozilla.org/it/docs/Learn/Forms', 'Form HTML — MDN', /^pr05-04/],
  ['semantica', 'https://developer.mozilla.org/it/docs/Glossary/Semantics', 'Semantica HTML — MDN', /^pr05-04/],
  ['CSS', 'https://developer.mozilla.org/it/docs/Web/CSS', 'CSS — MDN Web Docs', /^pr05-02/],
  ['algoritmo', 'https://xlinux.nist.gov/dads/', 'Dictionary of Algorithms and Data Structures — NIST', /^pr/],
  ['algoritmi', 'https://xlinux.nist.gov/dads/', 'Dictionary of Algorithms and Data Structures — NIST', /^pr/],
  ['Flowgorithm', 'https://www.flowgorithm.org/', 'Flowgorithm — sito ufficiale', /^pr/],
  ['Scratch', 'https://scratch.mit.edu/educators', 'Scratch per educatori — MIT'],
  ['MakeCode', 'https://makecode.microbit.org/tutorials/getting-started', 'MakeCode per micro:bit'],
  ['CreateAI', 'https://microbit.org/get-started/user-guide/microbit-createai/', 'micro:bit CreateAI'],
  ['Micro:bit', 'https://microbit.org/get-started/user-guide/overview/', 'Guida ufficiale micro:bit'],
  ['TinkerCAD', 'https://www.tinkercad.com/learn', 'Tinkercad Learn — Autodesk'],
  ['Tinkercad', 'https://www.tinkercad.com/learn', 'Tinkercad Learn — Autodesk'],
  ['Project Management', 'https://www.pmi.org/about/what-is-a-project', 'Progetti e ciclo di vita — PMI'],
  ['Manifesto Agile', 'https://agilemanifesto.org/iso/it/manifesto.html', 'Manifesto per lo sviluppo Agile'],
  ['Scrum', 'https://scrumguides.org/scrum-guide.html', 'Scrum Guide ufficiale'],
  ['brand identity', 'https://www.wipo.int/trademarks/en/', 'Marchi e identità distintiva — WIPO'],
  ['branding', 'https://www.wipo.int/trademarks/en/', 'Marchi e identità distintiva — WIPO'],
  ['game design', 'https://igda.org/about-us/core-values-and-code-of-ethics/', 'Valori e codice etico — IGDA'],
  ['gioco fisico', 'https://igda.org/about-us/core-values-and-code-of-ethics/', 'Valori e codice etico — IGDA'],
  ['carta da gioco', 'https://igda.org/about-us/core-values-and-code-of-ethics/', 'Valori e codice etico — IGDA'],
  ['gioco di carte', 'https://igda.org/about-us/core-values-and-code-of-ethics/', 'Valori e codice etico — IGDA'],
  ['playtest', 'https://igda.org/about-us/core-values-and-code-of-ethics/', 'Valori e codice etico — IGDA'],
  ['audio', 'https://www.w3.org/TR/webaudio/', 'Web Audio API — W3C', /^gd/],
  ['gamepad', 'https://www.w3.org/TR/gamepad/', 'Gamepad API — W3C', /^gd/],
  ['transformer', 'https://arxiv.org/abs/1706.03762', 'Attention Is All You Need — paper originale'],
  ['LLM', 'https://arxiv.org/abs/1706.03762', 'Transformer — paper originale'],
  ['machine learning', 'https://www.nist.gov/itl/ai-risk-management-framework', 'AI Risk Management Framework — NIST'],
  ['intelligenza artificiale', 'https://www.nist.gov/itl/ai-risk-management-framework', 'AI Risk Management Framework — NIST'],
  ['OpenAI', 'https://developers.openai.com/api/docs/models', 'Catalogo modelli — OpenAI', /^ia04/],
  ['Gemini', 'https://ai.google.dev/gemini-api/docs/models', 'Catalogo modelli Gemini — Google', /^ia04/],
  ['Anthropic', 'https://platform.claude.com/docs/en/about-claude/models/overview', 'Panoramica modelli Claude — Anthropic', /^ia04/],
  ['Meta', 'https://huggingface.co/meta-llama/models', 'Modelli Meta Llama — repository verificato', /^ia04/],
  ['Mistral AI', 'https://docs.mistral.ai/models/', 'Catalogo modelli — Mistral AI', /^ia04/],
  ['DeepSeek', 'https://api-docs.deepseek.com/quick_start/pricing', 'Modelli disponibili — DeepSeek', /^ia04/],
].sort((a, b) => b[0].length - a[0].length);

// Functions are different from ordinary topics: their reference belongs where
// the learner meets the callable for the first time, even when that occurrence
// is inside a code example. The final field is the deck scope. Query fragments
// keep catalogue-backed spreadsheet references distinct in the generated
// source list while still opening the authoritative catalogue.
const EXCEL_FUNCTIONS = 'https://support.microsoft.com/it-it/office/funzioni-di-excel-in-ordine-alfabetico-b3944572-255d-4efb-bb96-c6d90033e188';
const SHEETS_FUNCTIONS = 'https://support.google.com/docs/table/25273?hl=it';
const FUNCTION_SOURCES = [
  ['input', 'https://docs.python.org/3/library/functions.html#input', 'input() — documentazione Python', /^pr06-/],
  ['print', 'https://docs.python.org/3/library/functions.html#print', 'print() — documentazione Python', /^pr06-/],
  ['int', 'https://docs.python.org/3/library/functions.html#int', 'int() — documentazione Python', /^pr06-/],
  ['float', 'https://docs.python.org/3/library/functions.html#float', 'float() — documentazione Python', /^pr06-/],
  ['len', 'https://docs.python.org/3/library/functions.html#len', 'len() — documentazione Python', /^pr06-/],
  ['sum', 'https://docs.python.org/3/library/functions.html#sum', 'sum() — documentazione Python', /^pr06-/],
  ['sorted', 'https://docs.python.org/3/library/functions.html#sorted', 'sorted() — documentazione Python', /^pr06-/],
  ['range', 'https://docs.python.org/3/library/functions.html#func-range', 'range() — documentazione Python', /^pr06-/],
  ['enumerate', 'https://docs.python.org/3/library/functions.html#enumerate', 'enumerate() — documentazione Python', /^pr06-/],
  ['open', 'https://docs.python.org/3/library/functions.html#open', 'open() — documentazione Python', /^pr06-/],
  ['next', 'https://docs.python.org/3/library/functions.html#next', 'next() — documentazione Python', /^pr06-/],
  ['iter', 'https://docs.python.org/3/library/functions.html#iter', 'iter() — documentazione Python', /^pr06-/],
  ['list', 'https://docs.python.org/3/library/functions.html#func-list', 'list() — documentazione Python', /^pr06-/],
  ['max', 'https://docs.python.org/3/library/functions.html#max', 'max() — documentazione Python', /^pr06-/],
  ['min', 'https://docs.python.org/3/library/functions.html#min', 'min() — documentazione Python', /^pr06-/],
  ['round', 'https://docs.python.org/3/library/functions.html#round', 'round() — documentazione Python', /^pr06-/],
  ['lower', 'https://docs.python.org/3/library/stdtypes.html#str.lower', 'str.lower() — documentazione Python', /^pr06-/],
  ['upper', 'https://docs.python.org/3/library/stdtypes.html#str.upper', 'str.upper() — documentazione Python', /^pr06-/],
  ['replace', 'https://docs.python.org/3/library/stdtypes.html#str.replace', 'str.replace() — documentazione Python', /^pr06-/],
  ['split', 'https://docs.python.org/3/library/stdtypes.html#str.split', 'str.split() — documentazione Python', /^pr06-/],
  ['join', 'https://docs.python.org/3/library/stdtypes.html#str.join', 'str.join() — documentazione Python', /^pr06-/],
  ['strip', 'https://docs.python.org/3/library/stdtypes.html#str.strip', 'str.strip() — documentazione Python', /^pr06-/],
  ['append', 'https://docs.python.org/3/tutorial/datastructures.html#more-on-lists', 'list.append() — documentazione Python', /^pr06-/],
  ['insert', 'https://docs.python.org/3/tutorial/datastructures.html#more-on-lists', 'list.insert() — documentazione Python', /^pr06-/],
  ['remove', 'https://docs.python.org/3/tutorial/datastructures.html#more-on-lists', 'list.remove() — documentazione Python', /^pr06-/],
  ['pop', 'https://docs.python.org/3/tutorial/datastructures.html#more-on-lists', 'list.pop() — documentazione Python', /^pr06-/],
  ['sort', 'https://docs.python.org/3/library/stdtypes.html#list.sort', 'list.sort() — documentazione Python', /^pr06-/],
  ['index', 'https://docs.python.org/3/library/stdtypes.html#common-sequence-operations', 'sequence.index() — documentazione Python', /^pr06-/],
  ['math.sqrt', 'https://docs.python.org/3/library/math.html#math.sqrt', 'math.sqrt() — documentazione Python', /^pr06-/],
  ['randint', 'https://docs.python.org/3/library/random.html#random.randint', 'random.randint() — documentazione Python', /^pr06-/],
  ['stats.mean', 'https://docs.python.org/3/library/statistics.html#statistics.mean', 'statistics.mean() — documentazione Python', /^pr06-/],
  ['json.dump', 'https://docs.python.org/3/library/json.html#json.dump', 'json.dump() — documentazione Python', /^pr06-/],
  ['json.load', 'https://docs.python.org/3/library/json.html#json.load', 'json.load() — documentazione Python', /^pr06-/],
  ['csv.DictReader', 'https://docs.python.org/3/library/csv.html#csv.DictReader', 'csv.DictReader() — documentazione Python', /^pr06-/],
  ['csv.DictWriter', 'https://docs.python.org/3/library/csv.html#csv.DictWriter', 'csv.DictWriter() — documentazione Python', /^pr06-/],
  ['Path', 'https://docs.python.org/3/library/pathlib.html#pathlib.Path', 'Path() — documentazione Python', /^pr06-/],
  ['read_text', 'https://docs.python.org/3/library/pathlib.html#pathlib.Path.read_text', 'Path.read_text() — documentazione Python', /^pr06-/],
  ['write_text', 'https://docs.python.org/3/library/pathlib.html#pathlib.Path.write_text', 'Path.write_text() — documentazione Python', /^pr06-/],
  ['mkdir', 'https://docs.python.org/3/library/pathlib.html#pathlib.Path.mkdir', 'Path.mkdir() — documentazione Python', /^pr06-/],
  ['exists', 'https://docs.python.org/3/library/pathlib.html#pathlib.Path.exists', 'Path.exists() — documentazione Python', /^pr06-/],
  ['requests.get', 'https://requests.readthedocs.io/en/latest/api/#requests.get', 'requests.get() — documentazione Requests', /^pr06-/],
  ['raise_for_status', 'https://requests.readthedocs.io/en/latest/api/#requests.Response.raise_for_status', 'Response.raise_for_status() — documentazione Requests', /^pr06-/],
  ['sqlite3.connect', 'https://docs.python.org/3/library/sqlite3.html#sqlite3.connect', 'sqlite3.connect() — documentazione Python', /^pr06-/],
  ...[
    'SOMMA', 'SE', 'E', 'O', 'NON', 'MEDIA', 'MIN', 'MAX', 'ARROTONDA',
    'ARROTONDA.ECCESSO', 'CONTA.NUMERI', 'CONTA.VALORI', 'CONTA.SE',
    'CONTA.PIÙ.SE', 'SOMMA.SE', 'SOMMA.PIÙ.SE', 'MEDIA.SE', 'CERCA.VERT',
    'CERCA.ORIZZ', 'CERCA.X', 'INDICE', 'CONFRONTA', 'SE.ERRORE', 'FILTRO',
    'UNICI', 'LET', 'TESTO', 'VALORE', 'DATA', 'ANNO', 'MESE', 'GIORNI',
    'GIORNO.SETTIMANA', 'OGGI', 'ADESSO', 'RADQ', 'SINISTRA', 'LUNGHEZZA', 'TROVA',
    'RICERCA', 'SOSTITUISCI', 'RIMPIAZZA', 'ANNULLA.SPAZI', 'PULISCI',
    'MAIUSC', 'MINUSC', 'MAIUSC.INIZ', 'TESTO.UNISCI', 'SUBTOTALE'
  ].map(term => [
    term,
    `${EXCEL_FUNCTIONS}#funzione-${encodeURIComponent(term)}`,
    `${term}() — catalogo ufficiale delle funzioni Excel`,
    /^su03-/
  ]),
  ...['QUERY', 'IMPORTRANGE', 'ARRAYFORMULA', 'FILTER', 'SPLIT', 'SPARKLINE']
    .map(term => [
      term,
      `${SHEETS_FUNCTIONS}#funzione-${encodeURIComponent(term)}`,
      `${term}() — elenco ufficiale delle funzioni Google Sheets`,
      /^su03-/
    ]),
  ['SpreadsheetApp.getActive', 'https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app#getActive()', 'SpreadsheetApp.getActive() — Apps Script', /^su03-15/],
  ['SpreadsheetApp.getActiveSpreadsheet', 'https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app#getActiveSpreadsheet()', 'SpreadsheetApp.getActiveSpreadsheet() — Apps Script', /^su03-15/],
  ['SpreadsheetApp.getUi', 'https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app#getUi()', 'SpreadsheetApp.getUi() — Apps Script', /^su03-15/],
  ['getRange', 'https://developers.google.com/apps-script/reference/spreadsheet/sheet#getRange(String)', 'getRange() — Apps Script', /^su03-15/],
  ['getValues', 'https://developers.google.com/apps-script/reference/spreadsheet/range#getValues()', 'getValues() — Apps Script', /^su03-15/],
  ['setValues', 'https://developers.google.com/apps-script/reference/spreadsheet/range#setValues(Object)', 'setValues() — Apps Script', /^su03-15/],
  ['GmailApp.sendEmail', 'https://developers.google.com/apps-script/reference/gmail/gmail-app#sendEmail(String,String,String)', 'GmailApp.sendEmail() — Apps Script', /^su03-15/],
  ['UrlFetchApp.fetch', 'https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app#fetch(String)', 'UrlFetchApp.fetch() — Apps Script', /^su03-15/],
  ['Logger.log', 'https://developers.google.com/apps-script/reference/base/logger#log(Object)', 'Logger.log() — Apps Script', /^su03-15/],
  ['Number', 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number/Number', 'Number() — riferimento JavaScript MDN', /^su03-15/],
  ['String', 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/String', 'String() — riferimento JavaScript MDN', /^su03-15/],
  ['JSON.parse', 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse', 'JSON.parse() — riferimento JavaScript MDN', /^su03-15/],
  ['forEach', 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach', 'Array.forEach() — riferimento JavaScript MDN', /^su03-15/],
  ['map', 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/map', 'Array.map() — riferimento JavaScript MDN', /^su03-15/],
  ['Math.min', 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Math/min', 'Math.min() — riferimento JavaScript MDN', /^su03-15/],
  ['InputBox', 'https://learn.microsoft.com/office/vba/language/reference/user-interface-help/inputbox-function', 'InputBox() — riferimento VBA', /^su03-14/],
  ['Dir', 'https://learn.microsoft.com/office/vba/language/reference/user-interface-help/dir-function', 'Dir() — riferimento VBA', /^su03-14/],
  ['Trim', 'https://learn.microsoft.com/office/vba/language/reference/user-interface-help/ltrim-rtrim-and-trim-functions', 'Trim() — riferimento VBA', /^su03-14/],
  ['Date', 'https://learn.microsoft.com/office/vba/language/reference/user-interface-help/date-function', 'Date() — riferimento VBA', /^su03-14/]
].sort((a, b) => b[0].length - a[0].length);

// Wikipedia is a secondary source: it never displaces an official one. At most
// one Wikipedia link per slide, and only after the official sources have had
// their two slots. Every title below was resolved against the it.wikipedia API,
// redirects followed, so these are canonical article names.
const W = 'https://it.wikipedia.org/wiki/';
const WIKI = [
  ['diagramma di flusso', `${W}Diagramma_di_flusso`, 'Diagramma di flusso — Wikipedia', /^pr/],
  ['algoritmo', `${W}Algoritmo`, 'Algoritmo — Wikipedia', /^pr/],
  ['pseudocodice', `${W}Pseudocodice`, 'Pseudocodice — Wikipedia', /^pr/],
  ['ricorsione', `${W}Algoritmo_ricorsivo`, 'Algoritmo ricorsivo — Wikipedia', /^pr/],
  ['algoritmo di ordinamento', `${W}Algoritmo_di_ordinamento`, 'Algoritmi di ordinamento — Wikipedia', /^pr/],
  ['macchina di Turing', `${W}Macchina_di_Turing`, 'Macchina di Turing — Wikipedia', /^pr/],
  ['indecidibilità', `${W}Problema_della_terminazione`, 'Problema della terminazione — Wikipedia', /^pr/],
  ['complessità computazionale', `${W}Teoria_della_complessità_computazionale`, 'Complessità computazionale — Wikipedia', /^pr/],
  ['paradigma', `${W}Paradigma_di_programmazione`, 'Paradigmi di programmazione — Wikipedia', /^pr/],
  ['object-oriented', `${W}Programmazione_orientata_agli_oggetti`, 'Programmazione a oggetti — Wikipedia', /^pr/],
  ['compilatore', `${W}Compilatore`, 'Compilatore — Wikipedia', /^pr/],
  ['interprete', `${W}Interprete_(informatica)`, 'Interprete — Wikipedia', /^pr/],
  ['tipo di dato', `${W}Tipo_di_dato`, 'Tipi di dato — Wikipedia', /^pr/],
  ['iterazione', `${W}Iterazione`, 'Iterazione — Wikipedia', /^pr/],
  ['debug', `${W}Debugging`, 'Debugging — Wikipedia', /^(pr|su03)/],
  ['sistema binario', `${W}Sistema_numerico_binario`, 'Sistema binario — Wikipedia', /^(pr|hs)/],
  ['codifica dei caratteri', `${W}Codifica_di_caratteri`, 'Codifica dei caratteri — Wikipedia', /^(pr|hs)/],
  ['ASCII', `${W}ASCII`, 'ASCII — Wikipedia', /^(pr|hs)/],
  ['compressione', `${W}Compressione_dei_dati`, 'Compressione dei dati — Wikipedia', /^(pr|hs|sm)/],
  ['pixel', `${W}Pixel`, 'Pixel — Wikipedia', /^(pr|hs|sm|ms|gd)/],
  ['CPU', `${W}CPU`, 'CPU — Wikipedia', /^(hs|sm)/],
  ['RAM', `${W}RAM`, 'RAM — Wikipedia', /^(hs|sm)/],
  ['sistema operativo', `${W}Sistema_operativo`, 'Sistema operativo — Wikipedia', /^(hs|sm)/],
  ['file system', `${W}File_system`, 'File system — Wikipedia', /^(hs|sm)/],
  ['rete di computer', `${W}Rete_di_computer`, 'Reti di computer — Wikipedia', /^(rw|hs)/],
  ['indirizzo IP', `${W}Indirizzo_IP`, 'Indirizzo IP — Wikipedia', /^(rw|hs)/],
  ['motore di ricerca', `${W}Motore_di_ricerca`, 'Motore di ricerca — Wikipedia', /^rw/],
  ['cloud', `${W}Cloud_computing`, 'Cloud computing — Wikipedia', /^(rw|su|hs)/],
  ['firewall', `${W}Firewall`, 'Firewall — Wikipedia', /^(sd|rw|hs)/],
  ['VPN', `${W}Rete_privata_virtuale`, 'Rete privata virtuale — Wikipedia', /^(sd|rw|sm)/],
  ['crittografia asimmetrica', `${W}Crittografia_asimmetrica`, 'Crittografia asimmetrica — Wikipedia', /^(sd|rw)/],
  ['crittografia', `${W}Crittografia`, 'Crittografia — Wikipedia', /^(sd|rw)/],
  ['malware', `${W}Malware`, 'Malware — Wikipedia', /^(sd|sm|hs)/],
  ['ingegneria sociale', `${W}Ingegneria_sociale`, 'Ingegneria sociale — Wikipedia', /^(sd|rw)/],
  ['autenticazione a due fattori', `${W}Autenticazione_a_due_fattori`, 'Autenticazione a due fattori — Wikipedia', /^(sd|rw|sm)/],
  ['codice QR', `${W}Codice_QR`, 'Codice QR — Wikipedia', /^(sm|rw)/],
  ['smartphone', `${W}Smartphone`, 'Smartphone — Wikipedia', /^sm/],
  ['foglio di calcolo', `${W}Foglio_elettronico`, 'Foglio elettronico — Wikipedia', /^su/],
  ['tabella pivot', `${W}Tabella_pivot`, 'Tabella pivot — Wikipedia', /^su/],
  ['macro', `${W}Macro_(informatica)`, 'Macro — Wikipedia', /^su/],
  ['base di dati', `${W}Base_di_dati`, 'Base di dati — Wikipedia', /^(su|rw)/],
  ['SQL', `${W}Structured_Query_Language`, 'SQL — Wikipedia', /^su/],
  ['HTML', `${W}HTML`, 'HTML — Wikipedia', /^(rw|pr(?!01-03)|su)/],
  ['CSS', `${W}CSS`, 'CSS — Wikipedia', /^(rw|pr(?!01-03))/],
  ['JavaScript', `${W}JavaScript`, 'JavaScript — Wikipedia', /^(rw|pr(?!01-03)|su)/],
  ['rete neurale', `${W}Rete_neurale_artificiale`, 'Rete neurale artificiale — Wikipedia', /^ia/],
  ['realtà aumentata', `${W}Realtà_aumentata`, 'Realtà aumentata — Wikipedia', /^(rw|ia)/],
  ['realtà virtuale', `${W}Realtà_virtuale`, 'Realtà virtuale — Wikipedia', /^(rw|ia)/],
  ['stampa 3D', `${W}Stampa_3D`, 'Stampa 3D — Wikipedia', /^ms/],
  ['interfaccia utente', `${W}Interfaccia_uomo-macchina`, 'Interfaccia uomo-macchina — Wikipedia', /^(gd|sm|rw)/],
  ['usabilità', `${W}Usabilità`, 'Usabilità — Wikipedia', /^(gd|sm|rw)/],
].sort((a, b) => b[0].length - a[0].length);

const escapeRe = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const escapeHtml = value => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');
const cleanText = value => value.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const sourceLink = (url, label) => `<a data-source-origin="auto" href="${url}" target="_blank" rel="noopener noreferrer" title="Fonte ufficiale: ${label}" aria-label="Fonte ufficiale: ${label}">↗</a>`;

function sourceFooter(section, savedFooter = '') {
  const sources = new Map();
  const sourceAnchor = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;

  const collect = html => html.replace(sourceAnchor, (anchor, attrs, content) => {
    const href = attrs.match(/href="(https?:\/\/[^\"]+)"/i)?.[1];
    const title = attrs.match(/title="Fonte ufficiale:\s*([^\"]+)"/i)?.[1];
    const visible = cleanText(content);
    if (!href || (!title && !/^Fonte(?: ufficiale)?\s*(?:→|:)/i.test(visible))) return anchor;

    const label = title || visible.replace(/^Fonte(?: ufficiale)?\s*(?:→|:)\s*/i, '');
    const origin = /data-source-origin="auto"/i.test(attrs) ? 'auto' : 'manual';
    const previous = sources.get(href);
    if (!previous || origin === 'manual') sources.set(href, { href, label, origin });
    return '';
  });

  collect(savedFooter);
  const cleaned = collect(section);
  if (!sources.size) return cleaned;

  const links = [...sources.values()].map(({ href, label, origin }) => {
    const safeLabel = escapeHtml(label);
    return `<a data-source-origin="${origin}" href="${href}" target="_blank" rel="noopener noreferrer" title="Fonte ufficiale: ${safeLabel}" aria-label="Fonte ufficiale: ${safeLabel}" style="font-family:var(--font-mono,monospace);font-size:16px;line-height:1.25;color:var(--teal,#163b35);text-decoration:underline;text-underline-offset:3px;white-space:nowrap;">Fonte: ${safeLabel} ↗</a>`;
  }).join('');
  const footer = `<div class="source-footer" data-source-footer="true" style="position:absolute;left:220px;bottom:14px;z-index:4;display:grid;grid-template-columns:repeat(2,max-content);align-items:start;gap:5px 24px;max-width:1500px;">${links}</div>`;
  return cleaned.replace(/<\/section>\s*$/i, `${footer}</section>`);
}

// Product-specific sources only fire inside their own area: 'funzioni' in a
// programming deck means functions, not Excel formulas. Without the scope, a
// keyword match on a homonym cites an authoritative but wrong source.
//
// A source appears AT MOST ONCE per deck, on the slide where its term carries
// the most weight. Matching slide by slide instead put the NIST algorithms
// dictionary in the footer of fourteen slides of the algorithms deck: a link
// repeated that often stops being read. Scoring every slide first, then giving
// each source to its best slide, sends the reader to the one place where the
// link actually adds something.
const OFFICIAL_PER_SLIDE = 2;
const WIKI_PER_SLIDE = 1;

const isStructural = section => /class="[^"]*(?:title|closing)[^"]*"/.test(section);

// An agenda slide names every topic in the deck, so every source matches it and
// the first one wins a home it has no business in. It is a table of contents,
// not the place a reader stops to follow a link.
const AGENDA = /<h2\b[^>]*>\s*(?:cosa vedremo|cosa impareremo|in questo modulo|percorso|agenda|indice)/i;
const isAgenda = section => AGENDA.test(section);

// A distinctive term (GDPR, SPID, Bluetooth, RAM, VBA) means one thing wherever
// it appears, so a mention inside a card is a fair place to anchor its source.
// A generic Italian word (audio, macro, cloud, paradigma, iterazione) is a
// different matter: it turns up in passing all over the course, and anchoring on
// it produced the Web Audio API spec on a slide about game engines. Those terms
// earn a link only where the slide is genuinely about them — heading or lead.
const isDistinctive = term => /[A-Z0-9]/.test(term);

// Visible text of a section, minus code, SVG and existing anchors.
const visibleText = section => section
  .replace(/<(script|style|svg)\b[\s\S]*?<\/\1>/gi, ' ')
  .replace(/<a\b[\s\S]*?<\/a>/gi, ' ')
  .replace(/<[^>]+>/g, ' ');

// How central is this term to this slide? A term in the heading is what the
// slide is about; one buried in a card is a passing mention.
function relevance(section, term) {
  const re = new RegExp(`\\b${escapeRe(term)}\\b`, 'i');
  const body = visibleText(section);
  if (!re.test(body)) return 0;
  const heading = (section.match(/<h2\b[^>]*>([\s\S]*?)<\/h2>/i) || [, ''])[1];
  const lead = (section.match(/<p class="lead"[^>]*>([\s\S]*?)<\/p>/i) || [, ''])[1];
  // Tiers, not a sum: a slide whose HEADING names the term is what the slide is
  // about (2); the lead is the next best thing (1); anything else is a passing
  // mention (0). Counting occurrences instead would hand the link to whichever
  // late slide happens to repeat the word most, rather than to the slide that
  // introduces the idea.
  if (re.test(cleanText(heading))) return 3;
  if (re.test(cleanText(lead))) return 2;
  return 1;   // named only in a card: still a legitimate home, just the last resort
}

// Give every source its single best slide, without overcrowding any one slide.
function planDeck(sections, file) {
  const candidates = [];
  const functionCandidates = [];
  sections.forEach((section, index) => {
    if (isStructural(section) || isAgenda(section)) return;
    const callableText = visibleText(section);
    for (const [term, url, label, scope] of FUNCTION_SOURCES) {
      if (scope && !scope.test(file)) continue;
      const call = new RegExp(`(?:^|[^\\wÀ-ÿ])(?:[\\wÀ-ÿ]+\\.)?${escapeRe(term)}\\s*\\(`, 'i');
      if (call.test(callableText)) {
        functionCandidates.push({ index, term, url, label, score: 4, wiki: false, callable: true });
      }
    }
    for (const [term, url, label, scope] of SOURCES) {
      if (scope && !scope.test(file)) continue;
      const score = relevance(section, term);
      if (score === 1 && !isDistinctive(term)) continue;
      if (score) candidates.push({ index, term, url, label, score, wiki: false });
    }
    for (const [term, url, label, scope] of WIKI) {
      if (scope && !scope.test(file)) continue;
      const score = relevance(section, term);
      if (score === 1 && !isDistinctive(term)) continue;
      if (score) candidates.push({ index, term, url, label, score, wiki: true });
    }
  });

  // Highest tier first, then the earliest slide: the reader meets the link where
  // the idea is introduced, not where it is later recalled. An official source
  // outranks Wikipedia only at the same tier and the same slide.
  candidates.sort((a, b) =>
    b.score - a.score || a.index - b.index || (a.wiki === b.wiki ? 0 : a.wiki ? 1 : -1));

  const plan = new Map();          // slide index -> assigned sources
  const placed = new Set();        // ordinary source URL or callable identity

  // First occurrence wins for callable references. They do not consume the two
  // editorial-source slots: a first program can legitimately introduce
  // input(), int() and print() together.
  functionCandidates
    .sort((a, b) => a.index - b.index || b.term.length - a.term.length)
    .forEach(c => {
      const identity = `callable:${c.term.toLocaleLowerCase('it')}`;
      if (placed.has(identity)) return;
      const slot = plan.get(c.index) || [];
      slot.push(c);
      plan.set(c.index, slot);
      placed.add(identity);
    });

  for (const c of candidates) {
    if (placed.has(c.url)) continue;
    const slot = plan.get(c.index) || [];
    const official = slot.filter(x => !x.wiki && !x.callable).length;
    const wiki = slot.filter(x => x.wiki).length;
    if (c.wiki ? wiki >= WIKI_PER_SLIDE : official >= OFFICIAL_PER_SLIDE) continue;
    slot.push(c);
    plan.set(c.index, slot);
    placed.add(c.url);
  }
  return plan;
}

function annotateSection(section, assigned = [], used = null) {
  if (isStructural(section)) return section;
  section = section.replace(/<div\b[^>]*data-source-footer="true"[^>]*>[\s\S]*?<\/div>/gi, '');
  if (!assigned.length) return section;

  const tokens = section.split(/(<[^>]+>)/g);
  let blockedDepth = 0;
  const pending = [...assigned];

  for (let i = 0; i < tokens.length && pending.length; i++) {
    const token = tokens[i];
    if (token.startsWith('<')) {
      const close = token.match(/^<\/(a|script|style|svg)\b/i);
      const open = token.match(/^<(a|script|style|svg)\b/i);
      if (close) blockedDepth = Math.max(0, blockedDepth - 1);
      else if (open && !/\/$/.test(token)) blockedDepth++;
      continue;
    }
    if (blockedDepth || !token.trim()) continue;

    const matches = [];
    for (let k = 0; k < pending.length; k++) {
      const { term, url, label, callable } = pending[k];
      const re = new RegExp(`\\b(${escapeRe(term)})\\b${callable ? '(?=\\s*\\()' : ''}`, 'i');
      const match = re.exec(token);
      if (match) matches.push({ k, at: match.index, length: match[0].length, term, url, label });
    }
    // One code block is commonly a single text token and can introduce several
    // functions. Insert from right to left so earlier character offsets remain
    // valid, then remove the fulfilled entries from the pending list.
    matches.sort((a, b) => b.at - a.at || b.length - a.length);
    let rendered = token;
    for (const match of matches) {
      rendered = rendered.slice(0, match.at + match.length)
        + sourceLink(match.url, escapeHtml(match.label))
        + rendered.slice(match.at + match.length);
      if (used) used.set(match.url, match.label);
    }
    tokens[i] = rendered;
    matches.sort((a, b) => b.k - a.k).forEach(match => pending.splice(match.k, 1));
  }
  return sourceFooter(tokens.join(''));
}

// The closing slide collects every source the deck cites: one list to follow up
// on, instead of a hunt back through the footers.
function closingList(section, used) {
  const stripped = section.replace(/<div\b[^>]*data-source-list="true"[^>]*>[\s\S]*?<\/div>\s*<\/div>/gi, '');
  if (!used.size) return stripped;
  // The closing slide is dark, but the shared theme forces .slide{color:ink}, so
  // an inherited colour would print dark text on a dark background. State the
  // light colour explicitly, and left-align: the closing centres its text, which
  // leaves a ragged list.
  const sourceCount = used.size;
  const items = [...used.entries()].map(([href, label]) =>
    `<a href="${href}" target="_blank" rel="noopener noreferrer" style="color:rgba(255,255,255,.92);text-decoration:underline;text-underline-offset:3px;">${escapeHtml(label)} ↗</a>`
  ).join('');
  const columns = sourceCount > 12 ? 3 : 2;
  const fontSize = sourceCount > 12 ? 14 : sourceCount > 8 ? 16 : 18;
  const list = `<div data-source-list="true" style="margin-top:${sourceCount > 12 ? 20 : 36}px;text-align:left;"><div style="font-family:var(--font-mono,monospace);font-size:${sourceCount > 12 ? 16 : 19}px;letter-spacing:2px;text-transform:uppercase;color:var(--gold,#e6c14a);margin-bottom:10px;">Fonti e approfondimenti</div><div style="display:grid;grid-template-columns:repeat(${columns},1fr);gap:7px 30px;font-family:var(--font-mono,monospace);font-size:${fontSize}px;line-height:1.25;color:rgba(255,255,255,.92);">${items}</div></div>`;
  const closingAction = /<div\b[^>]*class="[^"]*\bclosing-actions\b[^"]*"[^>]*>/i;
  if (closingAction.test(stripped)) return stripped.replace(closingAction, `${list}$&`);
  return stripped.replace(/<\/section>\s*$/i, `${list}</section>`);
}

const requestedPrefixes = process.argv.slice(2);
const files = fs.readdirSync(decksDir)
  .filter(name => /^[a-z]{2}\d{2}.*\.html$/.test(name))
  .filter(name => !requestedPrefixes.length || requestedPrefixes.some(prefix => name.startsWith(prefix)))
  .sort();

let filesChanged = 0;
let linksAdded = 0;
for (const file of files) {
  const filePath = path.join(decksDir, file);
  const original = fs.readFileSync(filePath, 'utf8');
  // Drop the links this script generated on an earlier run, then plan afresh.
  let before = original;
  before = before.replace(/<a\b(?=[^>]*data-source-origin="auto")[^>]*>[\s\S]*?<\/a>/gi, '');
  before = before.replace(/<div\b[^>]*data-source-footer="true"[^>]*>[\s\S]*?<\/div>/gi, '');

  const sections = before.match(/<section\b[\s\S]*?<\/section>/gi) || [];
  const plan = planDeck(sections, file);
  const used = new Map();

  let index = 0;
  let after = before.replace(/<section\b[\s\S]*?<\/section>/gi, section => {
    const annotated = annotateSection(section, plan.get(index) || [], used);
    index++;
    return annotated;
  });
  after = after
    .replace(/<section\b[^>]*class="[^"]*closing[^"]*"[\s\S]*?<\/section>/i, section => closingList(section, used))
    .replace(/[ \t]+$/gm, '');

  if (after !== original) {
    fs.writeFileSync(filePath, after);
    filesChanged++;
    linksAdded += used.size;
  }
}

console.log(`Placed ${linksAdded} source links across ${filesChanged} decks (each source once, on its most relevant slide).`);
