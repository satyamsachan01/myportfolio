import { motion } from 'framer-motion';
import { profile } from '../../data/profile';
import { proof } from '../../data/projects';
import { chapters } from '../../data/story';
import { useExperience } from '../../hooks/useExperience';
import { useSectionLink } from '../../hooks/useSectionLink';

const ease = [0.22, 1, 0.36, 1] as const;

function Words({ text, show, start, className }: { text: string; show: boolean; start: number; className?: string }) {
  return (
    <span className={className}>
      {text.split(' ').map((w, i) => (
        <span key={i}>
          <span className="hero__word">
            <motion.span initial={{ y: '110%' }} animate={show ? { y: '0%' } : { y: '110%' }} transition={{ duration: 1, delay: start + i * 0.06, ease }}>
              {w}
            </motion.span>
          </span>{' '}
        </span>
      ))}
    </span>
  );
}

/** Chapter I: the visitor has just stepped through the gate. */
export function Hero() {
  const { phase } = useExperience();
  const go = useSectionLink();
  const show = phase === 'entered';
  const ch = chapters.home;

  const item = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: show ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 0.9, delay, ease },
  });

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <motion.p className="hero__chapter" {...item(0.05)}>
          <span>Chapter {ch.numeral}</span> {ch.name}
        </motion.p>
        <motion.p className="hero__story" {...item(0.1)}>{ch.line}</motion.p>
        <motion.p className="hero__name" {...item(0.12)}>{profile.name}</motion.p>
        <motion.p className="hero__role" {...item(0.18)}>{profile.headline}</motion.p>

        <h1 id="hero-title" className="hero__title">
          <Words text={profile.heroLine} show={show} start={0.3} />
          <Words text={profile.heroAccent} show={show} start={0.6} className="accent" />
        </h1>

        <motion.p className="hero__lead" {...item(0.95)}>{profile.heroParagraph}</motion.p>

        <motion.div className="hero__actions" {...item(1.05)}>
          <a href="/#projects" className="btn btn--primary" onClick={go('projects')}>Explore my work <span className="arrow" aria-hidden="true">→</span></a>
          {profile.resumeUrl && <a href={profile.resumeUrl} className="btn" target="_blank" rel="noopener noreferrer">View resume</a>}
          <a href="/#contact" className="btn btn--ghost" onClick={go('contact')}>Let's connect</a>
        </motion.div>

        <motion.div className="hero__bottom" {...item(1.2)}>
          <dl className="hero__proof">
            <div><dt>Live client sites</dt><dd>{String(proof.liveSites).padStart(2, '0')}</dd></div>
            <div><dt>Projects in the vault</dt><dd>{proof.total}</dd></div>
            {profile.yearsExperience && <div><dt>Years experience</dt><dd>{profile.yearsExperience}</dd></div>}
          </dl>
          {profile.openTo && <p className="status-pill"><i aria-hidden="true" />{profile.openTo}</p>}
        </motion.div>
      </div>

      <motion.a href="/#engineering" className="hero__scroll" onClick={go('engineering')} aria-label="Scroll to the first world" {...item(1.6)}>
        <span>Walk in</span>
        <i aria-hidden="true" />
      </motion.a>
    </section>
  );
}
