import { engineering } from '../../data/services';
import { sectionHref } from '../../data/sections';
import { getProject } from '../../data/projects';
import type { Project } from '../../data/types';
import { useSectionLink } from '../../hooks/useSectionLink';
import { SectionHeader } from '../ui/SectionHeader';
import { Reveal } from '../ui/Reveal';
import { ProjectCard } from '../projects/ProjectCard';
import { useVaultFilter } from '../../hooks/useVaultFilter';
import { BlueprintStack } from './BlueprintStack';

export function WebEngineering() {
  const go = useSectionLink();
  const setFilter = useVaultFilter((s) => s.set);
  const featured = engineering.featuredSlugs.map(getProject).filter((p): p is Project => !!p);

  return (
    <section id="engineering" className="section world" style={{ ['--world' as string]: 'var(--w-engineering)' }} aria-labelledby="engineering-title">
      <div className="container">
        <div className="world__intro">
          <SectionHeader chapter="engineering" eyebrow={engineering.eyebrow} title={engineering.title} accent={engineering.accent} lead={engineering.description} id="engineering-title" />
          <BlueprintStack />
        </div>

        <ul className="showcase">
          {engineering.showcase.map((s, i) => (
            <Reveal as="li" key={s.title} delay={(i % 4) * 0.05} className="showcase__item">
              <span className="showcase__index">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </ul>

        <div className="world__projects">
          <h3 className="world__subhead">Selected engineering builds</h3>
          <div className="card-grid card-grid--4">
            {featured.map((p) => <ProjectCard key={p.slug} project={p} compact />)}
          </div>
          <a
            href={sectionHref('projects')}
            className="btn world__cta"
            onClick={(e) => {
              setFilter('full-stack');
              go('projects')(e);
            }}
          >
            Explore web projects <span className="arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
