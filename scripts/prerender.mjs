// After `vite build`: writes a real HTML file for every URL (home, sections, each project)
// with its own <title>, description, canonical, Open Graph, JSON-LD and readable content,
// plus sitemap.xml, robots.txt and llms.txt. Crawlers and AI engines that don't run
// JavaScript get the full page; the React app takes over in the browser.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const ssrDir = resolve(root, 'dist-ssr');

const { pages, llmsTxt, siteUrl } = await import(pathToFileURL(join(ssrDir, 'entry.js')).href);
const template = readFileSync(join(dist, 'index.html'), 'utf8');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function setMeta(html, attr, key, value) {
  const re = new RegExp(`(<meta\\s+${attr}="${key.replace(/[:.]/g, '\\$&')}"\\s+content=")[^"]*(")`);
  if (re.test(html)) return html.replace(re, `$1${esc(value)}$2`);
  return html.replace('</head>', `    <meta ${attr}="${key}" content="${esc(value)}" />\n  </head>`);
}

function render(page) {
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`);
  html = setMeta(html, 'name', 'description', page.description);
  html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${esc(page.canonical)}" />`);
  html = setMeta(html, 'property', 'og:type', page.type);
  html = setMeta(html, 'property', 'og:title', page.title);
  html = setMeta(html, 'property', 'og:description', page.description);
  html = setMeta(html, 'property', 'og:url', `${siteUrl}${page.path === '/' ? '/' : page.path}`);
  html = setMeta(html, 'property', 'og:image', page.image);
  html = setMeta(html, 'name', 'twitter:title', page.title);
  html = setMeta(html, 'name', 'twitter:description', page.description);
  html = setMeta(html, 'name', 'twitter:image', page.image);
  html = html.replace('</head>', `    <script type="application/ld+json" data-static="true">${page.jsonLd}</script>\n  </head>`);
  html = html.replace(/<div id="root"><\/div>/, `<div id="root">${page.body}</div>`);
  return html;
}

const all = pages();
for (const page of all) {
  const dir = page.path === '/' ? dist : join(dist, page.path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), render(page));
}

// sitemap.xml: only canonical, indexable pages (section URLs point to the home page)
const today = new Date().toISOString().slice(0, 10);
const indexable = all.filter((p) => p.indexable);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${indexable
  .map((p) => {
    const loc = p.path === '/' ? `${siteUrl}/` : `${siteUrl}${p.path}`;
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <image:image><image:loc>${esc(p.image)}</image:loc></image:image>\n  </url>`;
  })
  .join('\n')}
</urlset>
`;
writeFileSync(join(dist, 'sitemap.xml'), sitemap);

// robots.txt: open to search engines and to AI search / answer crawlers
const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'Bingbot'];
const robots = `User-agent: *
Allow: /

${aiBots.map((b) => `User-agent: ${b}\nAllow: /`).join('\n\n')}

Sitemap: ${siteUrl}/sitemap.xml
`;
writeFileSync(join(dist, 'robots.txt'), robots);
writeFileSync(join(dist, 'llms.txt'), llmsTxt());

rmSync(ssrDir, { recursive: true, force: true });
console.log(`Prerendered ${all.length} pages (${indexable.length} in sitemap) for ${siteUrl}`);
if (siteUrl.includes('your-domain.com')) console.warn('⚠  Set VITE_SITE_URL in .env to your real domain before deploying.');
