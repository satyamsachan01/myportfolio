import { profile } from '../../data/profile';
import { skillGroups } from '../../data/skills';
import { BuilderArch } from '../ui/WorldObjects';
import { SectionHeader } from '../ui/SectionHeader';
import { Reveal } from '../ui/Reveal';

/** Scene nine — quieter and personal. Empty profile fields are simply not rendered. */
export function About() {
  const { about } = profile;
  return (
    <section id="about" className="section section--alt about" aria-labelledby="about-title">
      <div className="container">
        <SectionHeader chapter="about" aside={<BuilderArch />} eyebrow="Behind the interface" title="Curious by nature." accent="Engineered to build." id="about-title" />

        <div className="about__grid">
          <div className="about__bio">
            {about.bio.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}><p>{p}</p></Reveal>
            ))}

            {about.experience.length > 0 && (
              <div className="about__block">
                <h3>Experience</h3>
                <ul className="timeline">
                  {about.experience.map((e) => (
                    <li key={e.title + e.org}><strong>{e.title}</strong> · {e.org}{e.period && <span>{e.period}</span>}{e.detail && <p>{e.detail}</p>}</li>
                  ))}
                </ul>
              </div>
            )}
            {about.education.length > 0 && (
              <div className="about__block">
                <h3>Education</h3>
                <ul className="timeline">
                  {about.education.map((e) => (
                    <li key={e.title}><strong>{e.title}</strong> · {e.org}{e.period && <span>{e.period}</span>}</li>
                  ))}
                </ul>
              </div>
            )}
            {about.achievements.length > 0 && (
              <div className="about__block">
                <h3>Certifications &amp; achievements</h3>
                <ul className="feature-list">{about.achievements.map((a) => <li key={a}>{a}</li>)}</ul>
              </div>
            )}

            <div className="about__block">
              <h3>Working together</h3>
              <ul className="feature-list">{about.collaboration.map((c) => <li key={c}>{c}</li>)}</ul>
            </div>
          </div>

          <div className="about__side">
            <h3 className="about__label">How I work</h3>
            <ol className="process">
              {about.process.map((p, i) => (
                <Reveal as="li" key={p.step} delay={i * 0.06}>
                  <span className="process__n">{String(i + 1).padStart(2, '0')}</span>
                  <div><strong>{p.step}</strong><p>{p.text}</p></div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>

        <div className="stack">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.05} className="stack__group">
              <h3>{g.title}</h3>
              <ul className="tag-list">{g.items.map((s) => <li key={s} className="tag">{s}</li>)}</ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
