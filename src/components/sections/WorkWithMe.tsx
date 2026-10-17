import { profile } from '../../data/profile';
import { sectionHref } from '../../data/sections';
import { useSectionLink } from '../../hooks/useSectionLink';
import { Reveal } from '../ui/Reveal';

const ways = [
  {
    tag: 'For teams hiring',
    title: 'Join your team',
    text: 'Full-stack, WordPress or SEO role. I ship features end to end and I am comfortable owning a codebase.',
    points: ['React, Node.js, Spring Boot', 'WordPress & Shopify', 'Technical SEO'],
    service: 'Full-Stack Development',
    cta: 'Talk about a role',
  },
  {
    tag: 'For businesses',
    title: 'Build your website or store',
    text: 'A custom site, WordPress theme, Shopify or WooCommerce store. Designed, built, made fast and handed over.',
    points: ['Custom design & development', 'E-commerce setup', 'Malware cleanup & care'],
    service: 'Multiple Services',
    cta: 'Start a project',
  },
  {
    tag: 'For growth',
    title: 'Get found, add intelligence',
    text: 'Fix the technical SEO, structure content for answers, or add an AI feature that actually helps your team.',
    points: ['SEO, AEO, GEO', 'RAG & document Q&A', 'Workflow automation'],
    service: 'SEO',
    cta: 'Ask about this',
  },
];

/** A short, direct "how to hire me" band between the vault and the builder's room. */
export function WorkWithMe() {
  const go = useSectionLink();
  return (
    <section className="section work" aria-labelledby="work-title">
      <div className="container">
        <div className="work__head">
          <Reveal>
            <h2 id="work-title" className="work__title">Three ways <span className="accent">to work together.</span></h2>
          </Reveal>
          {profile.openTo && (
            <Reveal delay={0.1}><p className="status-pill"><i aria-hidden="true" />{profile.openTo}</p></Reveal>
          )}
        </div>
        <ul className="work__grid">
          {ways.map((w, i) => (
            <Reveal as="li" key={w.title} delay={i * 0.08} className="work__card glass">
              <span className="work__tag">{w.tag}</span>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
              <ul className="work__points">{w.points.map((p) => <li key={p}>{p}</li>)}</ul>
              <a
                href={sectionHref('contact')}
                className="btn btn--sm"
                onClick={(e) => {
                  window.dispatchEvent(new CustomEvent('portfolio:prefill', { detail: w.service }));
                  go('contact')(e);
                }}
              >
                {w.cta} <span className="arrow" aria-hidden="true">→</span>
              </a>
            </Reveal>
          ))}
        </ul>
        {profile.resumeUrl && (
          <p className="work__resume"><a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">Download résumé (PDF) ↗</a></p>
        )}
      </div>
    </section>
  );
}
