import type { ProjectCategory } from '../data/types';

const labels: Record<ProjectCategory, string> = {
  'full-stack': 'Full-Stack',
  wordpress: 'WordPress',
  shopify: 'Shopify',
  woocommerce: 'WooCommerce',
  ecommerce: 'E-commerce',
  seo: 'SEO',
  aeo: 'AEO',
  geo: 'GEO',
  ai: 'AI',
};

const accents: Record<ProjectCategory, string> = {
  'full-stack': 'var(--w-engineering)',
  wordpress: 'var(--w-commerce)',
  shopify: 'var(--w-commerce)',
  woocommerce: 'var(--w-commerce)',
  ecommerce: 'var(--w-commerce)',
  seo: 'var(--w-search)',
  aeo: 'var(--w-search)',
  geo: 'var(--w-search)',
  ai: 'var(--w-ai)',
};

export const categoryLabel = (c: ProjectCategory) => labels[c];
export const categoryAccent = (c?: ProjectCategory) => (c ? accents[c] : 'var(--accent)');

/** Page title for a project case study, shared by the app and the prerendered HTML. */
export function projectTitle(p: { title: string; kind: string; categories: ProjectCategory[] }, name: string) {
  const label =
    p.kind === 'client' ? `${labels[p.categories[0]]} case study`
    : p.kind === 'concept' ? 'AI experiment'
    : p.kind === 'collection' ? 'Portfolio'
    : `${labels[p.categories[0]]} project`;
  return `${p.title} | ${label} | ${name}`;
}
