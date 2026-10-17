// Makes website/index.html open straight from disk (file://) in Chrome:
// a classic deferred script instead of a module script, and no crossorigin attributes.
import { readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'website');
const file = resolve(dir, 'index.html');
let html = readFileSync(file, 'utf8');
html = html.replace(/<script type="module" crossorigin src="([^"]+)"><\/script>/, '<script defer src="$1"></script>');
html = html.replace(/<link rel="stylesheet" crossorigin href=/g, '<link rel="stylesheet" href=');
html = html.replace(/<link rel="modulepreload"[^>]*>\n?/g, '');
writeFileSync(file, html);
// Hash URLs need no server rewrites, so drop host-specific files from this folder.
for (const f of ['_redirects', '.htaccess']) if (existsSync(resolve(dir, f))) rmSync(resolve(dir, f));
console.log('website/ ready: open index.html or upload the folder.');
