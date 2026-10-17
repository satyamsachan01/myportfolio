import { sectionHref } from '../../data/sections';

interface Props {
  title: string;
  description: string;
  items: readonly string[];
  cta: string;
  onCta: (e: React.MouseEvent) => void;
  badge?: string;
}

/** Shared service block used in every world: title, explanation, offerings and a working CTA. */
export function ServiceDetail({ title, description, items, cta, onCta, badge }: Props) {
  return (
    <div className="service">
      {badge && <span className="service__badge">{badge}</span>}
      <h3 className="service__title">{title}</h3>
      <p className="service__desc">{description}</p>
      <ul className="service__items">
        {items.map((i) => <li key={i}>{i}</li>)}
      </ul>
      <a href={sectionHref('projects')} className="btn btn--sm service__cta" onClick={onCta}>
        {cta} <span className="arrow" aria-hidden="true">→</span>
      </a>
    </div>
  );
}
