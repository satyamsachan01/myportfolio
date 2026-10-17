import { faqs } from '../data/faq';
import { profile } from '../data/profile';
import { kindLabel, projects } from '../data/projects';
import { sectionHref, sectionRoutes } from '../data/sections';
import { commerce, engineering, intelligence, search } from '../data/services';
import { skillGroups } from '../data/skills';
import type { Project } from '../data/types';
import { categoryLabel } from '../utils/categories';

/**
 * Plain, semantic HTML of the portfolio, written into each prerendered page.
 * Crawlers and AI answer engines that don't run JavaScript read this; the
 * React app replaces it as soon as it starts. Same content as the live page.
 */

function Nav() {
  return (
    <nav aria-label="Primary">
      <ul>
        {sectionRoutes.map((s) => (
          <li key={s.id}><a href={s.path}>{s.label}</a></li>
        ))}
      </ul>
    </nav>
  );
}

function Contact() {
  return (
    <ul>
      <li>Email: <a href={`mailto:${profile.email}`}>{profile.email}</a></li>
      <li>WhatsApp: <a href={`https://wa.me/${profile.whatsapp}`}>{profile.phoneDisplay}</a></li>
      {profile.links.linkedin && <li>LinkedIn: <a href={profile.links.linkedin}>{profile.links.linkedin}</a></li>}
      {profile.links.github && <li>GitHub: <a href={profile.links.github}>{profile.links.github}</a></li>}
      {profile.resumeUrl && <li><a href="/Resume.pdf">Résumé (PDF)</a></li>}
    </ul>
  );
}

function ProjectList() {
  return (
    <ul>
      {projects.map((p) => (
        <li key={p.slug}>
          <a href={`/projects/${p.slug}`}>{p.title}</a>: {p.subtitle}. {kindLabel[p.kind]}
          {p.liveUrl ? <> · <a href={p.liveUrl} rel="noopener">{p.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}</a></> : null}
        </li>
      ))}
    </ul>
  );
}

export function HomeStatic() {
  const { about } = profile;
  return (
    <div className="ssr">
      <header>
        <p><a href="/">{profile.name}</a></p>
        <Nav />
      </header>
      <main>
        <section id="home">
          <p>{profile.name}</p>
          <p>{profile.headline}</p>
          <h1>{profile.heroLine} {profile.heroAccent}</h1>
          <p>{profile.heroParagraph}</p>
          <p>{profile.statement}</p>
          <p>Based in {profile.location}. {profile.openTo}.</p>
        </section>

        <section id="engineering">
          <h2>{engineering.title} {engineering.accent}</h2>
          <p>{engineering.description}</p>
          <ul>{engineering.showcase.map((s) => <li key={s.title}><strong>{s.title}</strong>: {s.text}</li>)}</ul>
        </section>

        <section id="commerce">
          <h2>{commerce.title} {commerce.accent}</h2>
          <p>{commerce.description}</p>
          {commerce.areas.map((a) => (
            <article key={a.id}>
              <h3>{a.title}</h3>
              <p>{a.description}</p>
              <ul>{a.items.map((i) => <li key={i}>{i}</li>)}</ul>
            </article>
          ))}
          <h3>Which platform fits?</h3>
          <ul>{commerce.platforms.map((p) => <li key={p.name}><strong>{p.name}</strong> ({p.type}): best for {p.best.toLowerCase()} {p.notes}</li>)}</ul>
        </section>

        <section id="search">
          <h2>{search.title} {search.accent}</h2>
          <p>{search.description}</p>
          {search.pillars.map((p) => (
            <article key={p.id}>
              <h3>{p.name} ({p.label})</h3>
              <p>{p.definition}</p>
              <ul>{p.items.map((i) => <li key={i}>{i}</li>)}</ul>
            </article>
          ))}
          <p>{search.note}</p>
        </section>

        <section id="intelligence">
          <h2>{intelligence.title} {intelligence.accent}</h2>
          <p>{intelligence.description}</p>
          <ul>{intelligence.capabilities.map((c) => <li key={c}>{c}</li>)}</ul>
          <ol>{intelligence.pipeline.map((s) => <li key={s.id}><strong>{s.label}</strong>: {s.text}</li>)}</ol>
        </section>

        <section id="projects">
          <h2>Projects and case studies</h2>
          <ProjectList />
        </section>

        <section id="about">
          <h2>About {profile.name}</h2>
          {about.bio.map((b) => <p key={b}>{b}</p>)}
          <h3>Experience</h3>
          <ul>{about.experience.map((e) => <li key={e.org}><strong>{e.title}</strong>, {e.org} ({e.period}). {e.detail}</li>)}</ul>
          <h3>Education</h3>
          <ul>{about.education.map((e) => <li key={e.org}>{e.title}, {e.org}</li>)}</ul>
          <h3>Certifications and achievements</h3>
          <ul>{about.achievements.map((a) => <li key={a}>{a}</li>)}</ul>
          <h3>Skills</h3>
          <ul>{skillGroups.map((g) => <li key={g.title}><strong>{g.title}</strong>: {g.items.join(', ')}</li>)}</ul>
        </section>

        <section id="faq">
          <h2>Frequently asked questions</h2>
          {faqs.map((f) => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </section>

        <section id="contact">
          <h2>Contact {profile.name}</h2>
          <p>Websites, WordPress, Shopify, WooCommerce, SEO and AI work. Open to full-time roles and freelance projects.</p>
          <Contact />
        </section>
      </main>
    </div>
  );
}

export function ProjectStatic({ project: p }: { project: Project }) {
  const others = projects.filter((x) => x.slug !== p.slug).slice(0, 8);
  return (
    <div className="ssr">
      <header>
        <p><a href="/">{profile.name}</a></p>
        <Nav />
        <nav aria-label="Breadcrumb">
          <a href="/">Home</a> / <a href={sectionHref('projects')}>Projects</a> / <span>{p.title}</span>
        </nav>
      </header>
      <main>
        <article>
          <p>{kindLabel[p.kind]}{p.role ? ` · ${p.role}` : ''}</p>
          <h1>{p.title}</h1>
          <p><strong>{p.subtitle}</strong></p>
          <p>{p.summary}</p>
          {p.images[0] && <img src={p.images[0].src} alt={p.images[0].alt} width={1600} height={900} />}
          <h2>The problem</h2>
          <p>{p.problem}</p>
          <h2>The solution</h2>
          <p>{p.solution}</p>
          <h2>Key features</h2>
          <ul>{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
          {p.stack.length > 0 && (<><h2>Technology</h2><p>{p.stack.join(', ')}</p></>)}
          <p>Categories: {p.categories.map(categoryLabel).join(', ')}</p>
          {p.results.length > 0 && (<><h2>Results</h2><ul>{p.results.map((r) => <li key={r}>{r}</li>)}</ul></>)}
          {p.liveUrl && <p>Live website: <a href={p.liveUrl} rel="noopener">{p.liveUrl}</a></p>}
          <p>Built by <a href="/about">{profile.name}</a>, {profile.headline}.</p>
        </article>
        <aside>
          <h2>More projects</h2>
          <ul>{others.map((o) => <li key={o.slug}><a href={`/projects/${o.slug}`}>{o.title}</a>: {o.subtitle}</li>)}</ul>
        </aside>
        <section>
          <h2>Work with {profile.name}</h2>
          <Contact />
        </section>
      </main>
    </div>
  );
}
