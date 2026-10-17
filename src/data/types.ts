export type ProjectCategory =
  | 'full-stack'
  | 'wordpress'
  | 'shopify'
  | 'woocommerce'
  | 'ecommerce'
  | 'seo'
  | 'aeo'
  | 'geo'
  | 'ai';

/** client: delivered client website. personal: own build. collection: group of similar work. concept: clearly labelled experiment. */
export type ProjectKind = 'client' | 'personal' | 'collection' | 'concept';

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  kind: ProjectKind;
  categories: ProjectCategory[];
  /** Platform used for the e-commerce platform filter, when relevant. */
  platform?: 'wordpress' | 'shopify' | 'woocommerce' | 'custom';
  role?: string;
  summary: string;
  problem: string;
  solution: string;
  features: string[];
  stack: string[];
  images: ProjectImage[];
  /** Only add real, public URLs. Leave undefined otherwise — nothing is shown. */
  liveUrl?: string;
  repoUrl?: string;
  /** Only verified, measurable results. Leave empty rather than guessing. */
  results: string[];
  /** Slugs of related projects (used by collection entries). */
  related?: string[];
  featured?: boolean;
  /** Illustrated cover used when a project has no screenshots yet. */
  cover?: 'calendar' | 'gallery' | 'seats' | 'table' | 'chart' | 'store' | 'blocks' | 'storefront' | 'cart' | 'signals' | 'nodes' | 'security' | 'chat';
}

export interface ServiceArea {
  id: string;
  label: string;
  title: string;
  description: string;
  visual: string;
  items: string[];
  cta: { label: string; filter: ProjectCategory };
}

export interface NavItem {
  id: string;
  label: string;
  /** Section ids that should highlight this nav item */
  sections: string[];
}

export interface SkillGroup {
  title: string;
  items: string[];
}
