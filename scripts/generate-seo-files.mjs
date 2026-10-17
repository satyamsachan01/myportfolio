// Writes dist/sitemap.xml and dist/robots.txt after `vite build`,
// using VITE_SITE_URL from .env and the project slugs in src/data/projects.ts.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');

function readEnv() {
  const out = { ...process.env };
  for (const file of ['.env', '.env.production', '.env.local', '.env.production.local']) {
    const p = resolve(root, file);
    if (!existsSync(p)) continue;
    for (const line of readFileSync(p, 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m) out[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
    }
  }
  return out;
}

const env = readEnv();
const site = (env.VITE_SITE_URL || 'https://your-domain.com').replace(/\/$/, '');
const source = readFileSync(resolve(root, 'src/data/projects.ts'), 'utf8');
const slugs = [...source.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
const today = new Date().toISOString().slice(0, 10);

const urls = ['/', ...slugs.map((s) => `/projects/${s}`)];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${site}${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`;
const robots = `User-agent: *
Allow: /

Sitemap: ${site}/sitemap.xml
`;

writeFileSync(resolve(dist, 'sitemap.xml'), sitemap);
writeFileSync(resolve(dist, 'robots.txt'), robots);
console.log(`SEO files written for ${site} — ${urls.length} URLs.`);
if (site.includes('your-domain.com')) console.warn('⚠  Set VITE_SITE_URL in .env to your real domain before deploying.');
