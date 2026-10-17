import { projectFilters, projects } from '../../data/projects';
import type { VaultFilter } from '../../hooks/useVaultFilter';

interface Props {
  value: VaultFilter;
  onChange: (f: VaultFilter) => void;
}

export function ProjectFilters({ value, onChange }: Props) {
  return (
    <div className="filters" role="group" aria-label="Filter projects by category">
      {projectFilters.map((f) => {
        const count = f.id === 'all' ? projects.length : projects.filter((p) => p.categories.includes(f.id as never)).length;
        return (
          <button
            key={f.id}
            type="button"
            className={`filter ${value === f.id ? 'is-active' : ''}`}
            aria-pressed={value === f.id}
            onClick={() => onChange(f.id)}
          >
            {f.label}
            <span className="filter__count">{count}</span>
          </button>
        );
      })}
    </div>
  );
}
