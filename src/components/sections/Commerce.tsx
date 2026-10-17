import { useRef, useState } from 'react';
import { sectionHref } from '../../data/sections';
import { AnimatePresence, motion } from 'framer-motion';
import { commerce } from '../../data/services';
import { getProject, projects } from '../../data/projects';
import type { Project, ServiceArea } from '../../data/types';
import { useSectionLink } from '../../hooks/useSectionLink';
import { useVaultFilter } from '../../hooks/useVaultFilter';
import { Showroom } from '../ui/WorldObjects';
import { SectionHeader } from '../ui/SectionHeader';
import { ProjectCard } from '../projects/ProjectCard';
import { ServiceDetail } from '../services/ServiceDetail';

type Platform = NonNullable<Project['platform']>;

/* ── Visuals: each one shows how that platform "assembles" ── */

function StorefrontVisual() {
  return (
    <div className="cv cv--store" aria-hidden="true">
      <motion.div className="cv__announce" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>section · announcement-bar</motion.div>
      <motion.div className="cv__product" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }}>
        <div className="cv__img" />
        <div className="cv__info">
          <b /><b className="short" />
          <div className="cv__swatches"><i /><i /><i /></div>
          <span className="cv__buy">Add to cart</span>
        </div>
      </motion.div>
      <div className="cv__collection">
        {[0, 1, 2, 3].map((i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.08 }} />
        ))}
      </div>
    </div>
  );
}

function JourneyVisual() {
  const [step, setStep] = useState(0);
  const steps = commerce.journey;
  return (
    <div className="journey">
      <ol className="journey__track" aria-label="WooCommerce shopping journey (illustration, no real purchase)">
        {steps.map((s, i) => (
          <li key={s.id}>
            <button type="button" className={i <= step ? 'is-done' : ''} aria-current={i === step ? 'step' : undefined} onClick={() => setStep(i)}>
              <span className="journey__n">{i + 1}</span>
              {s.label}
            </button>
          </li>
        ))}
      </ol>
      <div className="journey__stage" aria-live="polite">
        <motion.div className="journey__product" animate={{ left: `${(step / (steps.length - 1)) * 82}%` }} transition={{ type: 'spring', stiffness: 120, damping: 18 }} aria-hidden="true" />
        <p><strong>{steps[step].label}.</strong> {steps[step].text}</p>
      </div>
      <div className="journey__controls">
        <button type="button" className="btn btn--sm" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>Back</button>
        <button type="button" className="btn btn--sm btn--primary" onClick={() => setStep((s) => (s + 1) % steps.length)}>
          {step === steps.length - 1 ? 'Restart' : 'Next step'}
        </button>
      </div>
      <p className="journey__note">Illustration only. No payment is processed and no order is placed.</p>
    </div>
  );
}


/** A real client screenshot in a glossy tilted frame, with the building blocks floating over it. */
function Showcase({ slug, index, chips, caption }: { slug: string; index: number; chips: string[]; caption: string }) {
  const image = getProject(slug)?.images[index];
  return (
    <figure className="showcase-frame">
      <div className="showcase-frame__device">
        <div className="bp__bar"><i /><i /><i /><span>{caption}</span></div>
        {image && <img src={image.src} alt={image.alt} loading="lazy" />}
        <span className="showcase-frame__sheen" aria-hidden="true" />
      </div>
      {chips.map((c, i) => (
        <motion.span
          key={c}
          className={`showcase-frame__chip showcase-frame__chip--${i}`}
          initial={{ opacity: 0, y: 14, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.25 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          {c}
        </motion.span>
      ))}
    </figure>
  );
}

const WordPressVisual = () => (
  <Showcase slug="kursilo" index={0} caption="kursilo.in" chips={['Header part', 'Services block', 'Gallery', 'Enquiry CTA']} />
);
const CustomVisual = () => (
  <Showcase slug="theexportbusiness" index={2} caption="theexportbusiness.com" chips={['Catalog search', 'City filter', 'Supplier cards', 'Inquiry flow']} />
);

const visuals: Record<string, () => React.JSX.Element> = {
  blocks: WordPressVisual,
  storefront: StorefrontVisual,
  journey: JourneyVisual,
  layers: CustomVisual,
};

const platformTabs: { id: Platform; label: string }[] = [
  { id: 'shopify', label: 'Shopify' },
  { id: 'woocommerce', label: 'WooCommerce' },
  { id: 'wordpress', label: 'WordPress' },
  { id: 'custom', label: 'Custom Development' },
];

export function Commerce() {
  const [active, setActive] = useState(0);
  const [platform, setPlatform] = useState<Platform>('wordpress');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const go = useSectionLink();
  const setFilter = useVaultFilter((s) => s.set);
  const area: ServiceArea = commerce.areas[active];
  const Visual = visuals[area.visual];
  const platformProjects = projects.filter((p) => p.platform === platform);

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    const n = commerce.areas.length;
    let next = i;
    if (e.key === 'ArrowRight') next = (i + 1) % n;
    else if (e.key === 'ArrowLeft') next = (i - 1 + n) % n;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = n - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="commerce" className="section section--alt world" style={{ ['--world' as string]: 'var(--w-commerce)' }} aria-labelledby="commerce-title">
      <div className="container">
        <SectionHeader chapter="commerce" aside={<Showroom />} eyebrow={commerce.eyebrow} title={commerce.title} accent={commerce.accent} lead={commerce.description} id="commerce-title" />

        <div className="tabs" role="tablist" aria-label="Commerce services">
          {commerce.areas.map((a, i) => (
            <button
              key={a.id}
              ref={(el) => { tabRefs.current[i] = el; }}
              role="tab"
              id={`tab-${a.id}`}
              aria-selected={i === active}
              aria-controls={`panel-${a.id}`}
              tabIndex={i === active ? 0 : -1}
              className={`tab ${i === active ? 'is-active' : ''}`}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onTabKey(e, i)}
            >
              <span className="tab__letter">{String.fromCharCode(65 + i)}</span>
              {a.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={area.id}
            role="tabpanel"
            id={`panel-${area.id}`}
            aria-labelledby={`tab-${area.id}`}
            className="commerce__panel"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            <ServiceDetail
              title={area.title}
              description={area.description}
              items={area.items}
              cta={area.cta.label}
              onCta={(e) => {
                setFilter(area.cta.filter);
                go('projects')(e);
              }}
            />
            <div className="commerce__visual"><Visual /></div>
          </motion.div>
        </AnimatePresence>

        <div className="platforms">
          <h3 className="world__subhead">Which platform fits?</h3>
          <div className="platforms__grid">
            {commerce.platforms.map((p) => (
              <article key={p.name} className="platform">
                <p className="platform__type">{p.type}</p>
                <h4>{p.name}</h4>
                <p><strong>Best for:</strong> {p.best}</p>
                <p className="platform__notes">{p.notes}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="world__projects">
          <h3 className="world__subhead">Projects by platform</h3>
          <div className="filters" role="group" aria-label="Filter commerce projects by platform">
            {platformTabs.map((t) => (
              <button key={t.id} type="button" className={`filter ${platform === t.id ? 'is-active' : ''}`} aria-pressed={platform === t.id} onClick={() => setPlatform(t.id)}>
                {t.label}
              </button>
            ))}
          </div>
          {platformProjects.length ? (
            <div className="card-grid card-grid--3">
              {platformProjects.map((p) => <ProjectCard key={p.slug} project={p} />)}
            </div>
          ) : (
            <p className="empty">No public projects listed for this platform yet.</p>
          )}
          <a
            href={sectionHref('projects')}
            className="btn world__cta"
            onClick={(e) => {
              setFilter('ecommerce');
              go('projects')(e);
            }}
          >
            Explore e-commerce projects <span className="arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
