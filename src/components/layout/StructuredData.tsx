import { useEffect } from 'react';
import { profile, siteUrl } from '../../data/profile';

/** Person + WebSite JSON-LD built from profile.ts. No reviews, ratings or invented credentials. */
export function StructuredData() {
  useEffect(() => {
    const sameAs = Object.values(profile.links).filter(Boolean);
    const data = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': `${siteUrl}/#person`,
          name: profile.name,
          jobTitle: profile.headline,
          description: profile.statement,
          url: `${siteUrl}/`,
          ...(profile.email ? { email: `mailto:${profile.email}` } : {}),
          ...(sameAs.length ? { sameAs } : {}),
          knowsAbout: ['Full-Stack Development', 'React', 'WordPress Development', 'Shopify Development', 'WooCommerce', 'Search Engine Optimization', 'Answer Engine Optimization', 'Generative Engine Optimization', 'AI-Powered Applications'],
        },
        {
          '@type': 'WebSite',
          '@id': `${siteUrl}/#website`,
          url: `${siteUrl}/`,
          name: `${profile.name} Portfolio`,
          author: { '@id': `${siteUrl}/#person` },
          inLanguage: 'en',
        },
      ],
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.portfolio = 'true';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
    return () => script.remove();
  }, []);
  return null;
}
