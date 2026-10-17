import { journey } from '../../data/navigation';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useExperience } from '../../hooks/useExperience';
import { useSectionLink } from '../../hooks/useSectionLink';

const ids = journey.map((j) => j.id);

/** Vertical journey index on wide screens — shows where you are in the story. */
export function SectionRail() {
  const { phase } = useExperience();
  const active = useActiveSection(ids, phase === 'entered');
  const go = useSectionLink();
  if (phase !== 'entered') return null;

  return (
    <nav className="rail" aria-label="Journey">
      <ol>
        {journey.map((j) => (
          <li key={j.id}>
            <a href={`/#${j.id}`} onClick={go(j.id)} className={active === j.id ? 'is-active' : ''} aria-current={active === j.id ? 'step' : undefined}>
              <span className="rail__label"><b>{j.numeral}</b> {j.label}</span>
              <span className={`rail__dot ${j.seal ? 'rail__dot--seal' : ''}`} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
