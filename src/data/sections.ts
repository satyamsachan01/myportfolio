/**
 * Clean, shareable URLs for every part of the one-page site.
 * Visiting a path scrolls to its section. Titles and descriptions are used for
 * the browser tab, link previews and the prerendered HTML that crawlers read.
 */
export interface SectionRoute {
  id: string;
  path: string;
  label: string;
  title: string;
  description: string;
}

export const sectionRoutes: SectionRoute[] = [
  {
    id: 'home',
    path: '/',
    label: 'Home',
    title: 'Satyam Sachan | Full-Stack, WordPress & Shopify Developer',
    description:
      'Satyam Sachan is a full-stack developer in Kanpur, India building custom web apps, WordPress and Shopify websites, WooCommerce stores, SEO, AEO and GEO, and AI-powered products.',
  },
  {
    id: 'engineering',
    path: '/services/web-development',
    label: 'Web Development',
    title: 'Full-Stack Web Development | React, Node.js & PHP | Satyam Sachan',
    description:
      'Custom websites and web applications built with React, TypeScript, Node.js, Express, PHP, MySQL and MongoDB. Responsive, fast and easy to maintain.',
  },
  {
    id: 'commerce',
    path: '/services/wordpress-shopify-ecommerce',
    label: 'WordPress, Shopify & E-commerce',
    title: 'WordPress, Shopify & WooCommerce Developer | Satyam Sachan',
    description:
      'Custom WordPress themes, Shopify theme development, WooCommerce stores and custom e-commerce, built for business owners who want to edit their own site.',
  },
  {
    id: 'search',
    path: '/services/seo-aeo-geo',
    label: 'SEO, AEO & GEO',
    title: 'SEO, AEO & GEO Services | Technical SEO and AI Search | Satyam Sachan',
    description:
      'Technical SEO audits, schema markup, Core Web Vitals, answer engine optimization and generative engine optimization so people and AI search can find your business.',
  },
  {
    id: 'intelligence',
    path: '/services/ai-products',
    label: 'AI-Powered Products',
    title: 'AI-Powered Products, RAG & LLM Integrations | Satyam Sachan',
    description:
      'AI features for business software: retrieval-augmented generation, document Q&A, LLM integrations, AI agents and workflow automation.',
  },
  {
    id: 'projects',
    path: '/projects',
    label: 'Projects',
    title: 'Projects & Case Studies | Satyam Sachan',
    description:
      'Live client websites for Kursilo, TheExportBusiness, The Leather Laundry, Ampere Solutions, Aashnaah, Scandex and DVM Tech, plus full-stack and AI builds.',
  },
  {
    id: 'about',
    path: '/about',
    label: 'About',
    title: 'About Satyam Sachan | Web Developer in Kanpur, India',
    description:
      'Satyam Sachan is a web developer at The Leather Laundry with an MCA from KNIT Sultanpur, working across full-stack development, WordPress, Shopify, SEO and AI.',
  },
  {
    id: 'faq',
    path: '/faq',
    label: 'FAQ',
    title: 'FAQ | Hiring Satyam Sachan for Web, WordPress, Shopify & SEO Work',
    description:
      'Answers about Satyam Sachan: services, technologies, WordPress malware cleanup, the difference between SEO, AEO and GEO, and how to hire him.',
  },
  {
    id: 'contact',
    path: '/contact',
    label: 'Contact',
    title: 'Contact Satyam Sachan | Start a Website or Store Project',
    description:
      'Contact Satyam Sachan by email, WhatsApp or the project form for websites, WordPress, Shopify, WooCommerce, SEO and AI work.',
  },
];

const byId = new Map(sectionRoutes.map((s) => [s.id, s]));
const byPath = new Map(sectionRoutes.map((s) => [s.path, s]));

/** Clean URL for a section id. The four worlds also answer to /services. */
export const sectionHref = (id: string) => byId.get(id)?.path ?? '/';

export const sectionForPath = (path: string): SectionRoute | undefined => {
  const clean = path.replace(/\/+$/, '') || '/';
  if (clean === '/services') return byId.get('engineering');
  return byPath.get(clean);
};

export const sectionById = (id: string) => byId.get(id);
