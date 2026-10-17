/**
 * Tiny, honest retrieval demo: real chunking + BM25 keyword scoring, run in the browser.
 * No AI model is called. Production RAG would swap BM25 for embeddings + vector search.
 */
export interface Chunk {
  id: number;
  text: string;
  tokens: string[];
}

const STOP = new Set('a an the and or of to in on for is are be with by as at it this that from was were can do does how what which who when where why your you our we i'.split(' '));

/** Very light stemmer so "refunds", "refunded" and "refund" match. */
function stem(w: string) {
  if (w.length > 4 && w.endsWith('ies')) return `${w.slice(0, -3)}y`;
  if (w.length > 5 && w.endsWith('ing')) return w.slice(0, -3);
  if (w.length > 4 && w.endsWith('ed')) return w.slice(0, -2);
  if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss')) return w.slice(0, -1);
  return w;
}

export const tokenize = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter((w) => w.length > 1 && !STOP.has(w)).map(stem);

export function chunkText(text: string, size = 45, overlap = 10): Chunk[] {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const chunks: Chunk[] = [];
  const step = Math.max(1, size - overlap);
  for (let i = 0, id = 0; i < words.length; i += step, id++) {
    const slice = words.slice(i, i + size).join(' ');
    chunks.push({ id, text: slice, tokens: tokenize(slice) });
    if (i + size >= words.length) break;
  }
  return chunks;
}

export function rank(query: string, chunks: Chunk[], k1 = 1.4, b = 0.75) {
  const q = Array.from(new Set(tokenize(query)));
  if (!q.length || !chunks.length) return [];
  const N = chunks.length;
  const avg = chunks.reduce((s, c) => s + c.tokens.length, 0) / N || 1;
  const df = new Map<string, number>();
  q.forEach((t) => df.set(t, chunks.filter((c) => c.tokens.includes(t)).length));

  return chunks
    .map((c) => {
      let score = 0;
      const matched: string[] = [];
      q.forEach((t) => {
        const tf = c.tokens.filter((x) => x === t).length;
        if (!tf) return;
        matched.push(t);
        const n = df.get(t) ?? 0;
        const idf = Math.log(1 + (N - n + 0.5) / (n + 0.5));
        score += idf * ((tf * (k1 + 1)) / (tf + k1 * (1 - b + (b * c.tokens.length) / avg)));
      });
      return { chunk: c, score, matched };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);
}
