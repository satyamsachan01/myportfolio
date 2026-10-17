import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProject, kindLabel } from '../../data/projects';
import type { Project } from '../../data/types';
import { categoryAccent, categoryLabel } from '../../utils/categories';
import { ProjectCover } from './ProjectCover';

interface Props {
  project: Project | undefined;
  slug: string;
  onClose: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ProjectModal({ project, slug, onClose }: Props) {
  const dialog = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => setIndex(0), [slug]);

  // Lock background scroll, focus the dialog, restore focus on close.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = 'hidden';
    closeBtn.current?.focus({ preventScroll: true });
    return () => {
      html.style.overflow = prevOverflow;
      previous?.focus?.({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    dialog.current?.scrollTo({ top: 0 });
  }, [slug]);

  const images = project?.images ?? [];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'Tab' && dialog.current) {
        const nodes = Array.from(dialog.current.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      } else if (images.length > 1 && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
        const tag = (document.activeElement as HTMLElement | null)?.closest('.gallery');
        if (!tag) return;
        setIndex((i) => (i + (e.key === 'ArrowRight' ? 1 : -1) + images.length) % images.length);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose, images.length]);

  const related = (project?.related ?? []).map(getProject).filter((p): p is Project => !!p);

  return createPortal(
    <div className="modal" role="presentation">
      <motion.div className="modal__backdrop" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
      <motion.div
        ref={dialog}
        className="modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        style={{ ['--pc' as string]: categoryAccent(project?.categories[0]) }}
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <button ref={closeBtn} type="button" className="modal__close" onClick={onClose} aria-label="Close case study">
          <span aria-hidden="true">✕</span>
        </button>

        {!project ? (
          <div className="modal__content">
            <h2 id="modal-title" className="modal__title">Project not found</h2>
            <p className="modal__summary">There is no project at “{slug}”. It may have been renamed.</p>
            <button type="button" className="btn" onClick={onClose}>Back to the vault</button>
          </div>
        ) : (
          <article className="modal__content">
            <header className="modal__head">
              <p className="eyebrow" style={{ ['--world' as string]: 'var(--pc)' }}>{kindLabel[project.kind]}{project.role ? ` · ${project.role}` : ''}</p>
              <h2 id="modal-title" className="modal__title">{project.title}</h2>
              <p className="modal__subtitle">{project.subtitle}</p>
              <ul className="tag-list" aria-label="Categories">
                {project.categories.map((c) => <li key={c} className="tag">{categoryLabel(c)}</li>)}
              </ul>
            </header>

            {images.length === 0 && project.cover && (
              <div className="gallery__main gallery__main--cover" style={{ ['--pc' as string]: categoryAccent(project.categories[0]) }}>
                <ProjectCover project={project} />
                <p className="gallery__note">{project.cover === 'security' ? 'Site status before and after the clean-up.' : 'Screenshots for this project are coming soon.'}</p>
              </div>
            )}
            {images.length > 0 && (
              <div className="gallery">
                <figure className="gallery__main">
                  <img src={images[index].src} alt={images[index].alt} width={1600} height={800} />
                  <figcaption>{images[index].alt}</figcaption>
                </figure>
                {images.length > 1 && (
                  <div className="gallery__thumbs" role="group" aria-label="Screenshots. Use arrow keys to browse">
                    {images.map((im, i) => (
                      <button key={im.src} type="button" className={i === index ? 'is-active' : ''} aria-pressed={i === index} aria-label={`Screenshot ${i + 1} of ${images.length}`} onClick={() => setIndex(i)}>
                        <img src={im.src} alt="" loading="lazy" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <p className="modal__summary">{project.summary}</p>

            <div className="modal__cols">
              <section>
                <h3>The problem</h3>
                <p>{project.problem}</p>
              </section>
              <section>
                <h3>The solution</h3>
                <p>{project.solution}</p>
              </section>
            </div>

            <section className="modal__block">
              <h3>Key features</h3>
              <ul className="feature-list">
                {project.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
            </section>

            {project.stack.length > 0 && (
              <section className="modal__block">
                <h3>Technology</h3>
                <ul className="tag-list">{project.stack.map((s) => <li key={s} className="tag">{s}</li>)}</ul>
              </section>
            )}

            {project.results.length > 0 && (
              <section className="modal__block">
                <h3>Verified results</h3>
                <ul className="feature-list">{project.results.map((r) => <li key={r}>{r}</li>)}</ul>
              </section>
            )}

            {related.length > 0 && (
              <section className="modal__block">
                <h3>Examples in the vault</h3>
                <ul className="related">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link to={`/projects/${r.slug}`} preventScrollReset replace>{r.title} <span aria-hidden="true">→</span></Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {(project.liveUrl || project.repoUrl) && (
              <div className="modal__links">
                {project.liveUrl && (
                  <a className="btn btn--primary" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    Visit live site <span aria-hidden="true">↗</span>
                  </a>
                )}
                {project.repoUrl && (
                  <a className="btn" href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                    Source code <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            )}
          </article>
        )}
      </motion.div>
    </div>,
    document.body,
  );
}
