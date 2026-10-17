import { useEffect } from 'react';
import { siteUrl } from '../data/profile';

interface Meta {
  title: string;
  description: string;
  path: string;
  image?: string;
  /** Canonical path if different from `path` (section URLs point to the home page). */
  canonicalPath?: string;
  /** For unknown URLs that still render the app (soft 404). */
  noindex?: boolean;
}

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/** Keeps title, description, canonical and Open Graph tags in sync with the current view. */
export function useDocumentMeta({ title, description, path, image, canonicalPath, noindex }: Meta) {
  useEffect(() => {
    const url = `${siteUrl}${path}`;
    document.title = title;
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', url);
    setMeta('meta[property="og:image"]', 'property', 'og:image', `${siteUrl}${(image ?? '/og-image.jpg').replace(/^\.\//, '/')}`);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${siteUrl}${canonicalPath ?? path}`;

    let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (noindex) {
      if (!robots) {
        robots = document.createElement('meta');
        robots.name = 'robots';
        document.head.appendChild(robots);
      }
      robots.content = 'noindex';
    } else if (robots?.content === 'noindex') {
      robots.remove();
    }
  }, [title, description, path, image, canonicalPath, noindex]);
}
