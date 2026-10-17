import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { search } from '../../data/services';
import { getProject } from '../../data/projects';
import type { Project } from '../../data/types';
import { useSectionLink } from '../../hooks/useSectionLink';
import { useVaultFilter } from '../../hooks/useVaultFilter';
import { SignalOrbits } from '../ui/WorldObjects';
import { SectionHeader } from '../ui/SectionHeader';
import { ServiceDetail } from '../services/ServiceDetail';
import { ProjectCard } from '../projects/ProjectCard';

type PillarId = (typeof search.pillars)[number]['id'];

/** Deterministic pseudo-random so the background field is stable between renders. */
function seeded(n: number) {
  const x = Math.sin(n * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

function KnowledgeField() {
  const dots = useMemo(() => Array.from({ length: 140 }, (_, i) => ({ x: seeded(i) * 600, y: seeded(i + 500) * 360, r: 0.6 + seeded(i + 900) * 1.2 })), []);
  return (
    <g className="kf__field">
      {dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r={d.r} />)}
    </g>
  );
}

const draw = { initial: { pathLength: 0, opacity: 0 }, animate: { pathLength: 1, opacity: 1 }, transition: { duration: 1.1, ease: 'easeInOut' as const } };

function SeoGraph() {
  const pages = [
    { x: 300, y: 60, l: 'Home' },
    { x: 150, y: 170, l: 'Services' }, { x: 300, y: 170, l: 'Locations' }, { x: 450, y: 170, l: 'Blog' },
    { x: 90, y: 280, l: '/service-a' }, { x: 210, y: 280, l: '/service-b' }, { x: 300, y: 280, l: '/delhi' }, { x: 390, y: 280, l: '/guide' }, { x: 510, y: 280, l: '/faq' },
  ];
  const links = [[0, 1], [0, 2], [0, 3], [1, 4], [1, 5], [2, 6], [3, 7], [3, 8], [5, 6], [7, 8]];
  return (
    <>
      {links.map(([a, b], i) => (
        <motion.line key={i} x1={pages[a].x} y1={pages[a].y} x2={pages[b].x} y2={pages[b].y} className="kf__link" {...draw} transition={{ ...draw.transition, delay: i * 0.06 }} />
      ))}
      {pages.map((p, i) => (
        <motion.g key={p.l} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + i * 0.05 }} style={{ transformOrigin: `${p.x}px ${p.y}px` }}>
          <rect x={p.x - 42} y={p.y - 14} width={84} height={28} rx={6} className="kf__node" />
          <text x={p.x} y={p.y + 4} className="kf__label">{p.l}</text>
        </motion.g>
      ))}
    </>
  );
}

function AeoGraph() {
  const qs = ['What does it cost?', 'How long does it take?', 'Which is better for me?', 'Do you serve my city?'];
  return (
    <>
      {qs.map((q, i) => {
        const y = 60 + i * 80;
        return (
          <g key={q}>
            <motion.path d={`M 210 ${y} C 290 ${y}, 300 ${y}, 380 ${y}`} className="kf__link" {...draw} transition={{ ...draw.transition, delay: 0.2 + i * 0.15 }} />
            <motion.g initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.12 }}>
              <rect x={30} y={y - 16} width={180} height={32} rx={16} className="kf__q" />
              <text x={120} y={y + 4} className="kf__label">{q}</text>
            </motion.g>
            <motion.g initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.15 }}>
              <rect x={380} y={y - 20} width={190} height={40} rx={6} className="kf__node" />
              <rect x={392} y={y - 9} width={120} height={4} rx={2} className="kf__line" />
              <rect x={392} y={y + 3} width={150} height={4} rx={2} className="kf__line kf__line--dim" />
            </motion.g>
          </g>
        );
      })}
    </>
  );
}

function GeoGraph() {
  const c = { x: 300, y: 180 };
  const ents = [
    { l: 'Services', a: -90 }, { l: 'Locations', a: -30 }, { l: 'Credible sources', a: 30 },
    { l: 'Structured data', a: 90 }, { l: 'Original content', a: 150 }, { l: 'Consistent entity', a: 210 },
  ].map((e) => ({ ...e, x: c.x + Math.cos((e.a * Math.PI) / 180) * 200, y: c.y + Math.sin((e.a * Math.PI) / 180) * 125 }));
  return (
    <>
      {ents.map((e, i) => (
        <motion.line key={`l${i}`} x1={c.x} y1={c.y} x2={e.x} y2={e.y} className="kf__link" {...draw} transition={{ ...draw.transition, delay: i * 0.08 }} />
      ))}
      {ents.map((e, i) => {
        const n = ents[(i + 1) % ents.length];
        return <motion.line key={`r${i}`} x1={e.x} y1={e.y} x2={n.x} y2={n.y} className="kf__link kf__link--faint" {...draw} transition={{ ...draw.transition, delay: 0.6 + i * 0.05 }} />;
      })}
      <motion.circle cx={c.x} cy={c.y} r={34} className="kf__core" initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ transformOrigin: `${c.x}px ${c.y}px` }} />
      <text x={c.x} y={c.y + 4} className="kf__label kf__label--core">Your brand</text>
      {ents.map((e, i) => (
        <motion.g key={e.l} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.08 }}>
          <circle cx={e.x} cy={e.y} r={6} className="kf__dot" />
          <text x={e.x} y={e.y - 14} className="kf__label">{e.l}</text>
        </motion.g>
      ))}
    </>
  );
}

const graphs: Record<PillarId, () => React.JSX.Element> = { seo: SeoGraph, aeo: AeoGraph, geo: GeoGraph };
const captions: Record<PillarId, string> = {
  seo: 'Pages connected through clear, crawlable pathways.',
  aeo: 'Real questions connected to clear, useful answers.',
  geo: 'Knowledge nodes forming meaningful, consistent relationships.',
};

export function SearchIntelligence() {
  const [active, setActive] = useState<PillarId>('seo');
  const go = useSectionLink();
  const setFilter = useVaultFilter((s) => s.set);
  const pillar = search.pillars.find((p) => p.id === active)!;
  const Graph = graphs[active];
  const featured = ['aashnaah-industries', 'seo-optimization-projects'].map(getProject).filter((p): p is Project => !!p);

  return (
    <section id="search" className="section world" style={{ ['--world' as string]: 'var(--w-search)' }} aria-labelledby="search-title">
      <div className="container">
        <SectionHeader chapter="search" aside={<SignalOrbits />} eyebrow={search.eyebrow} title={search.title} accent={search.accent} lead={search.description} id="search-title" />

        <div className="pillars" role="group" aria-label="Choose a discipline">
          {search.pillars.map((p) => (
            <button key={p.id} type="button" className={`pillar ${active === p.id ? 'is-active' : ''}`} aria-pressed={active === p.id} onClick={() => setActive(p.id)}>
              <span className="pillar__abbr">{p.label}</span>
              <span className="pillar__name">{p.name}</span>
            </button>
          ))}
        </div>

        <div className="search__grid">
          <AnimatePresence mode="wait">
            <motion.div key={pillar.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <ServiceDetail
                badge={pillar.label}
                title={pillar.name}
                description={pillar.definition}
                items={pillar.items}
                cta={pillar.cta}
                onCta={(e) => {
                  setFilter(pillar.id);
                  go('projects')(e);
                }}
              />
            </motion.div>
          </AnimatePresence>
          <figure className="kf">
            <svg viewBox="0 0 600 360" role="img" aria-label={captions[active]}>
              <KnowledgeField />
              <Graph key={active} />
            </svg>
            <figcaption>{captions[active]}</figcaption>
          </figure>
        </div>

        <aside className="note" aria-label="How these practices relate">
          <div className="note__venn" aria-hidden="true"><i>SEO</i><i>AEO</i><i>GEO</i></div>
          <p>{search.note}</p>
        </aside>

        <div className="world__projects">
          <h3 className="world__subhead">Search work in the vault</h3>
          <div className="card-grid card-grid--2">
            {featured.map((p) => <ProjectCard key={p.slug} project={p} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
