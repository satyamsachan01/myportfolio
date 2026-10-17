import { useEffect } from 'react';
import { siteUrl } from '../data/profile';

interface Meta {
  title: string;
  description: string;
  path: string;
  image?: string;
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
export function useDocumentMeta({ title, description, path, image }: Meta) {
  useEffect(() => {
    const url = `${siteUrl}${path}`;
    document.title = title;
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', url);
    setMeta('meta[property="og:image"]', 'property', 'og:image', `${siteUrl}${(image ?? '/og-image.jpg').replace(/^\.\//, '/')}`);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [title, description, path, image]);
}
