import type { SkillGroup } from './types';

/** Readable technology groups, matching the résumé. */
export const skillGroups: SkillGroup[] = [
  { title: 'Frontend', items: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'Three.js'] },
  { title: 'Backend', items: ['Node.js', 'Express', 'PHP', 'Python', 'Java', 'Spring Boot', 'REST APIs', 'MySQL', 'MongoDB'] },
  { title: 'CMS & E-commerce', items: ['WordPress', 'Custom Themes', 'WooCommerce', 'Shopify', 'Liquid', 'Payment Gateways'] },
  { title: 'Search & Security', items: ['Technical SEO', 'Schema Markup', 'Core Web Vitals', 'Search Console', 'Malware Removal', 'Security Hardening', 'SSL'] },
  { title: 'AI & Tools', items: ['LLMs', 'RAG', 'Vector Search', 'AI Agents', 'Prompt Engineering', 'Git & GitHub', 'Docker', 'CI/CD', 'Google Apps Script'] },
];

export const heroTech = ['React', 'TypeScript', 'Node.js', 'PHP', 'WordPress', 'Shopify', 'WooCommerce', 'SEO · AEO · GEO', 'AI / RAG'];
