import type { SkillGroup } from './types';

/** Readable technology groups — edit to match exactly what you use. */
export const skillGroups: SkillGroup[] = [
  { title: 'Frontend', items: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Responsive Design', 'Three.js'] },
  { title: 'Backend', items: ['Node.js', 'Express', 'Java', 'Spring Boot', 'REST APIs', 'MySQL', 'MongoDB'] },
  { title: 'CMS & E-commerce', items: ['WordPress', 'PHP', 'Custom Themes', 'Gutenberg', 'WooCommerce', 'Shopify', 'Liquid'] },
  { title: 'Search Optimization', items: ['Technical SEO', 'Schema Markup', 'Google Search Console', 'Google Analytics', 'Core Web Vitals', 'Local SEO'] },
  { title: 'AI & Automation', items: ['Python', 'FastAPI', 'LLM APIs', 'RAG Pipelines', 'Embeddings & Vector Search', 'MCP', 'Ollama'] },
];

export const heroTech = ['React', 'TypeScript', 'Node.js', 'Spring Boot', 'WordPress', 'Shopify', 'WooCommerce', 'SEO · AEO · GEO', 'AI / RAG'];
