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
