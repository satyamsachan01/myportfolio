import { AnimatePresence, motion } from 'framer-motion';
import { projectFilters, projects } from '../../data/projects';
import { useVaultFilter } from '../../hooks/useVaultFilter';
import { VaultDoor } from '../ui/WorldObjects';
import { SectionHeader } from '../ui/SectionHeader';
import { ProjectCard } from '../projects/ProjectCard';
import { ProjectFilters } from '../projects/ProjectFilters';

export function ProjectVault() {
  const filter = useVaultFilter((s) => s.filter);
  const setFilter = useVaultFilter((s) => s.set);
  const visible = filter === 'all' ? projects : projects.filter((p) => p.categories.includes(filter));
  const label = projectFilters.find((f) => f.id === filter)?.label ?? 'All';

  return (
    <section id="projects" className="section vault" aria-labelledby="projects-title">
      <div className="vault__glow" aria-hidden="true" />
      <div className="container">
        <SectionHeader
          chapter="projects" aside={<VaultDoor />}
          eyebrow="The Project Vault"
          title="Ideas"
          accent="made real."
          lead="Live client websites, full-stack builds, platform work and clearly labelled experiments. Open any panel for the case study."
          id="projects-title"
        />
        <ProjectFilters value={filter} onChange={setFilter} />
        <p className="vault__count" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? 'project' : 'projects'}{filter !== 'all' ? ` in ${label}` : ''}
        </p>
        <motion.ul layout className="card-grid card-grid--3 vault__grid">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard project={p} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
        {visible.length === 0 && <p className="empty">No projects in this category yet.</p>}
      </div>
    </section>
  );
}
