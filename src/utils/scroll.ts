import { prefersReducedMotion } from './device';

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  // With hash routing the hash is the route, so only update the URL in normal (path) mode.
  if (import.meta.env.VITE_ROUTER !== 'hash') {
    const url = id === 'home' ? '/' : `/#${id}`;
    window.history.replaceState(window.history.state, '', url);
  }
  // Move focus for keyboard and screen-reader users without jumping the page.
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
  return true;
}
