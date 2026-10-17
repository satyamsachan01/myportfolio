import { faqs } from '../data/faq';
import { profile, siteUrl } from '../data/profile';
import { kindLabel, projects } from '../data/projects';
import { skillGroups } from '../data/skills';
import type { Project } from '../data/types';

/**
 * JSON-LD for search engines and AI answer engines. Every fact here is also
 * visible on the page (About, Projects, FAQ), so the two never disagree.
 */
const abs = (path: string) => `${siteUrl}${path.replace(/^\.\//, '/')}`;
const PERSON_ID = `${siteUrl}/#person`;
const WEBSITE_ID = `${siteUrl}/#website`;

const sameAs = Object.values(profile.links).filter(Boolean);

const credentials = profile.about.achievements
  .filter((a) => /\(.*(Udemy|Coursera|Springboard).*\)/.test(a))
  .map((a) => {
    const [, name, by] = a.match(/^(.*?)\s*\((.*)\)$/) ?? [];
    return { '@type': 'EducationalOccupationalCredential', name: name ?? a, credentialCategory: 'certificate', recognizedBy: { '@type': 'Organization', name: (by ?? '').replace(/,\s*\d{4}$/, '') } };
  });

export function personNode() {
  const current = profile.about.experience[0];
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: profile.name,
    url: `${siteUrl}/`,
    image: profile.photo ? abs(profile.photo) : undefined,
    jobTitle: 'Full-Stack Developer',
    description: profile.statement,
    email: `mailto:${profile.email}`,
    telephone: profile.phoneDisplay.replace(/\s+/g, ''),
    address: { '@type': 'PostalAddress', addressLocality: 'Kanpur', addressRegion: 'Uttar Pradesh', addressCountry: 'IN' },
    sameAs,
    worksFor: current ? { '@type': 'Organization', name: current.org, url: 'https://theleatherlaundry.com/' } : undefined,
    alumniOf: profile.about.education.map((e) => ({ '@type': 'CollegeOrUniversity', name: e.org })),
    hasCredential: credentials,
    knowsAbout: skillGroups.flatMap((g) => g.items).concat(['Answer Engine Optimization', 'Generative Engine Optimization']),
    makesOffer: [
      'Full-Stack Web Development',
      'WordPress Development',
      'Shopify Development',
      'WooCommerce Development',
      'Technical SEO, AEO and GEO',
      'WordPress Malware Removal and Security',
      'AI-Powered Product Development',
    ].map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name, areaServed: 'IN' } })),
  };
}

function websiteNode() {
  return { '@type': 'WebSite', '@id': WEBSITE_ID, url: `${siteUrl}/`, name: `${profile.name} Portfolio`, inLanguage: 'en', publisher: { '@id': PERSON_ID } };
}

export function homeGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      personNode(),
      websiteNode(),
      {
        '@type': 'ProfilePage',
        '@id': `${siteUrl}/#profile`,
        url: `${siteUrl}/`,
        name: `${profile.name}: ${profile.headline}`,
        isPartOf: { '@id': WEBSITE_ID },
        mainEntity: { '@id': PERSON_ID },
        dateModified: new Date().toISOString().slice(0, 10),
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteUrl}/#faq`,
        mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'ItemList',
        '@id': `${siteUrl}/#projects`,
        name: 'Projects by Satyam Sachan',
        itemListElement: projects.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${siteUrl}/projects/${p.slug}`, name: p.title })),
      },
    ],
  };
}

export function projectGraph(p: Project) {
  const url = `${siteUrl}/projects/${p.slug}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        '@id': `${url}#work`,
        url,
        name: p.title,
        headline: `${p.title}: ${p.subtitle}`,
        description: p.summary,
        image: p.images[0] ? abs(p.images[0].src) : undefined,
        genre: kindLabel[p.kind],
        keywords: [...p.stack, ...p.categories].join(', '),
        creator: { '@id': PERSON_ID },
        author: { '@id': PERSON_ID },
        isPartOf: { '@id': WEBSITE_ID },
        mentions: p.liveUrl ? { '@type': 'WebSite', url: p.liveUrl, name: p.title } : undefined,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Projects', item: `${siteUrl}/projects` },
          { '@type': 'ListItem', position: 3, name: p.title, item: url },
        ],
      },
      { ...personNode() },
      websiteNode(),
    ],
  };
}
