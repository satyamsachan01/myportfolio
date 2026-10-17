import { useEffect, useRef, useState } from 'react';
import { navItems } from '../../data/navigation';
import { profile } from '../../data/profile';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useExperience } from '../../hooks/useExperience';
import { useSectionLink } from '../../hooks/useSectionLink';

const allSections = navItems.flatMap((n) => n.sections);

export function Navbar() {
  const { phase } = useExperience();
  const go = useSectionLink();
  const active = useActiveSection(allSections, phase === 'entered');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const handle = (id: string) => (e: React.MouseEvent) => {
    setOpen(false);
    go(id)(e);
  };

  return (
    <header className={`nav ${scrolled || open ? 'is-solid' : ''} ${phase === 'entered' ? 'is-visible' : ''}`}>
      <div className="nav__inner">
        <a href="/" className="nav__brand" onClick={handle('home')} aria-label={`${profile.name}, home`}>
          <span className="nav__logo" aria-hidden="true"><i /><i /></span>
          <span>{profile.name}</span>
        </a>

        <nav aria-label="Primary" className={`nav__menu ${open ? 'is-open' : ''}`} id="primary-menu">
          <ul>
            {navItems.map((item) => {
              const isActive = item.sections.includes(active);
              return (
                <li key={item.id}>
                  <a href={item.id === 'home' ? '/' : `/#${item.id}`} onClick={handle(item.id)} className={isActive ? 'is-active' : ''} aria-current={isActive ? 'true' : undefined}>
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <a href="/#contact" className="btn btn--sm nav__cta" onClick={handle('contact')}>
            Let's build something
          </a>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className={`nav__toggle ${open ? 'is-open' : ''}`}
          aria-expanded={open}
          aria-controls="primary-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <i /><i />
        </button>
      </div>
    </header>
  );
}
