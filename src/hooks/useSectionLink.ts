import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToSection } from '../utils/scroll';

/** Click handler for in-page section links that also works from a project deep link. */
export function useSectionLink() {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(
    (id: string) => (e?: React.MouseEvent) => {
      e?.preventDefault();
      if (location.pathname !== '/') {
        navigate('/', { preventScrollReset: true });
        requestAnimationFrame(() => requestAnimationFrame(() => scrollToSection(id)));
      } else {
        scrollToSection(id);
      }
    },
    [navigate, location.pathname],
  );
}
