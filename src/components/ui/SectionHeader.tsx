import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { chapters } from '../../data/story';
import { Reveal } from './Reveal';

interface Props {
  /** Story chapter id from data/story.ts */
  chapter: string;
  eyebrow?: string;
  title: string;
  accent?: string;
  lead?: string;
  id?: string;
  /** A visual shown beside the heading on wide screens. */
  aside?: ReactNode;
}

/** A broken-wax-seal mark. It "breaks open" the first time it scrolls into view. */
function Seal({ label }: { label: string }) {
  return (
    <motion.span
      className="seal"
      initial="locked"
      whileInView="open"
      viewport={{ once: true, margin: '0px 0px -20% 0px' }}
    >
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <motion.circle cx="20" cy="20" r="17" className="seal__ring" variants={{ locked: { pathLength: 0.15, opacity: 0.4 }, open: { pathLength: 1, opacity: 1 } }} transition={{ duration: 1.2, ease: 'easeInOut' }} />
        <motion.path d="M14 21 l4 4 l8 -10" className="seal__tick" variants={{ locked: { pathLength: 0 }, open: { pathLength: 1 } }} transition={{ duration: 0.5, delay: 0.9 }} />
      </svg>
      <span className="seal__text">{label}<em>unlocked</em></span>
    </motion.span>
  );
}

export function SectionHeader({ chapter, eyebrow, title, accent, lead, id, aside }: Props) {
  const ch = chapters[chapter];
  const head = (
    <header className="section-head">
      {ch && <span className="section-numeral" aria-hidden="true">{ch.numeral}</span>}
      {ch && (
        <Reveal className="chapter">
          <span className="chapter__label">Chapter {ch.numeral}</span>
          <span className="chapter__name">{ch.name}</span>
          {ch.seal && <Seal label={ch.seal} />}
        </Reveal>
      )}
      {ch && (
        <Reveal delay={0.05}>
          <p className="chapter__line">{ch.line}</p>
        </Reveal>
      )}
      {eyebrow && (
        <Reveal delay={0.08}>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
      )}
      <Reveal delay={0.12}>
        <h2 className="section-title" id={id}>
          {title} {accent && <span className="accent">{accent}</span>}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.18}>
          <p className="section-lead">{lead}</p>
        </Reveal>
      )}
    </header>
  );
  if (!aside) return head;
  return (
    <div className="head-split">
      {head}
      <Reveal delay={0.15} className="head-split__aside">{aside}</Reveal>
    </div>
  );
}
