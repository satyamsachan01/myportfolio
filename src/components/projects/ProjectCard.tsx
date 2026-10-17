import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { kindLabel } from '../../data/projects';
import type { Project } from '../../data/types';
import { categoryAccent, categoryLabel } from '../../utils/categories';
import { ProjectCover } from './ProjectCover';

interface Props {
  project: Project;
  compact?: boolean;
}

/** Vault panel with subtle 3D tilt + light. Fully keyboard accessible (it's a link). */
export function ProjectCard({ project, compact = false }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const accent = categoryAccent(project.categories[0]);
  const cover = project.images[0];

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--rx', `${(-y * 6).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${(x * 8).toFixed(2)}deg`);
    el.style.setProperty('--lx', `${(x + 0.5) * 100}%`);
    el.style.setProperty('--ly', `${(y + 0.5) * 100}%`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <Link
      ref={ref}
      to={`/projects/${project.slug}`}
      preventScrollReset
      className={`pcard ${compact ? 'pcard--compact' : ''}`}
      style={{ ['--pc' as string]: accent }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      aria-label={`${project.title}, ${project.subtitle}. Open case study`}
    >
      <div className="pcard__media">
        {cover ? (
          <img src={cover.src} alt="" loading="lazy" decoding="async" width={1600} height={800} />
        ) : (
          <ProjectCover project={project} />
        )}
        <span className="pcard__light" aria-hidden="true" />
      </div>
      <div className="pcard__body">
        <div className="pcard__meta">
          <span className={`pcard__kind pcard__kind--${project.kind}`}>{kindLabel[project.kind]}</span>
          {project.liveUrl && <span className="pcard__live">Live</span>}
        </div>
        <h3 className="pcard__title">{project.title}</h3>
        <p className="pcard__subtitle">{project.subtitle}</p>
        {!compact && (
          <ul className="pcard__tags" aria-label="Categories">
            {project.categories.map((c) => <li key={c}>{categoryLabel(c)}</li>)}
          </ul>
        )}
        <span className="pcard__open" aria-hidden="true">View case study →</span>
      </div>
    </Link>
  );
}
