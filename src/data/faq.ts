import { profile } from './profile';

/**
 * Questions people (and answer engines) actually ask. Shown on the page and
 * published as FAQPage structured data, so the two always match.
 * Keep answers short, factual and self-contained.
 */
export const faqs: { q: string; a: string }[] = [
  {
    q: 'Who is Satyam Sachan?',
    a: `Satyam Sachan is a full-stack developer and WordPress & Shopify developer based in ${profile.location}. He builds custom web applications, business websites, e-commerce stores and AI-powered features, and handles technical SEO. He currently works as a web developer at The Leather Laundry.`,
  },
  {
    q: 'What services does Satyam Sachan offer?',
    a: 'Full-stack web development (React, Node.js, PHP), custom WordPress themes, Shopify and WooCommerce stores, custom e-commerce, technical SEO with AEO and GEO, WordPress malware removal and security hardening, and AI features such as RAG, document Q&A and workflow automation.',
  },
  {
    q: 'Which technologies does he work with?',
    a: 'React, TypeScript, JavaScript, Tailwind CSS, Node.js, Express, PHP, Python, MySQL, MongoDB, WordPress, WooCommerce, Shopify and Liquid, plus LLMs, retrieval-augmented generation (RAG), vector search, Git, Docker and CI/CD.',
  },
  {
    q: 'Can you clean up a hacked WordPress website?',
    a: 'Yes. The work covers finding how the site was compromised, removing malicious code and spam redirects, cleaning and hardening the WordPress installation, and confirming the result with an external malware and blacklist scan. The Leather Laundry website was recovered this way.',
  },
  {
    q: 'What is the difference between SEO, AEO and GEO?',
    a: 'SEO helps search engines crawl, understand and rank your pages. AEO (answer engine optimization) structures content so it directly answers questions for featured answers and voice assistants. GEO (generative engine optimization) makes your brand clear, credible and accessible so AI search tools can understand and reference it.',
  },
  {
    q: 'Which businesses has he built websites for?',
    a: 'Live client websites include Kursilo Automotive, TheExportBusiness.com, The Leather Laundry, Ampere Solutions, Aashnaah Industries, Scandex Smart Elevators and DVM Tech India, for businesses in Delhi NCR and across India.',
  },
  {
    q: 'Is Satyam Sachan available for hire?',
    a: `Yes. He is open to full-time roles and freelance projects. Email ${profile.email} or message ${profile.phoneDisplay} on WhatsApp.`,
  },
];
