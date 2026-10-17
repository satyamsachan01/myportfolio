import { navItems } from '../../data/navigation';
import { profile } from '../../data/profile';
import { useExperience } from '../../hooks/useExperience';
import { useSectionLink } from '../../hooks/useSectionLink';
import { SocialLinks } from '../ui/SocialLinks';

export function Footer() {
  const go = useSectionLink();
  const { replay } = useExperience();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <p className="footer__name">{profile.name}</p>
          <p className="footer__role">{profile.headline}</p>
          <p className="footer__story">You reached the end of the journey. The gate stays open.</p>
        </div>
        <nav aria-label="Footer">
          <p className="footer__head">Explore</p>
          <ul className="footer__links">
            {navItems.map((n) => (
              <li key={n.id}>
                <a href={n.id === 'home' ? '/' : `/#${n.id}`} onClick={go(n.id)}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="footer__head">Get in touch</p>
          <SocialLinks />
        </div>
      </div>
      <div className="container footer__base">
        <span>© {new Date().getFullYear()} {profile.name}. Built with React, Three.js and GSAP.</span>
        <button type="button" className="btn btn--ghost btn--sm" onClick={replay}>Replay the gate ↺</button>
      </div>
    </footer>
  );
}
