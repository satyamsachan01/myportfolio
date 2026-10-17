import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { sectionHref } from '../data/sections';
import { scrollToSection } from '../utils/scroll';

/**
 * Click handler for section links. Pushes the clean URL (/about, /projects …);
 * HomePage scrolls to the section whenever the path changes.
 */
export function useSectionLink() {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(
    (id: string) => (e?: React.MouseEvent) => {
      // let the browser handle new-tab / modified clicks on the real href
      if (e && (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1)) return;
      e?.preventDefault();
      const path = sectionHref(id);
      if (location.pathname === path) scrollToSection(id);
      else navigate(path, { preventScrollReset: true });
    },
    [navigate, location.pathname],
  );
}
