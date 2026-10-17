import { useEffect, useRef } from 'react';
import { Outlet, useLocation, useMatch } from 'react-router-dom';
import { sectionForPath } from '../data/sections';
import { profile } from '../data/profile';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useExperience } from '../hooks/useExperience';
import { scrollToSection } from '../utils/scroll';
import { Hero } from '../components/sections/Hero';
import { WebEngineering } from '../components/sections/WebEngineering';
import { Commerce } from '../components/sections/Commerce';
import { SearchIntelligence } from '../components/sections/SearchIntelligence';
import { AIProducts } from '../components/sections/AIProducts';
import { ProjectVault } from '../components/sections/ProjectVault';
import { About } from '../components/sections/About';
import { WorkWithMe } from '../components/sections/WorkWithMe';
import { Contact } from '../components/sections/Contact';
import { Faq } from '../components/sections/Faq';

function SectionMeta({ pathname }: { pathname: string }) {
  const section = sectionForPath(pathname);
  const home = sectionForPath('/')!;
  useDocumentMeta(
    section
      ? { title: section.title, description: section.description, path: section.path, canonicalPath: '/' }
      : { title: `Page not found | ${profile.name}`, description: home.description, path: pathname, canonicalPath: '/', noindex: true },
  );
  return null;
}

export function HomePage() {
  const { pathname } = useLocation();
  const onProject = useMatch('/projects/:slug');
  const { phase } = useExperience();
  const first = useRef(true);
  const lastPath = useRef<string | null>(null);

  // Every clean URL (/about, /projects, /services/…) scrolls to its section.
  useEffect(() => {
    if (phase !== 'entered') return;
    const from = lastPath.current;
    lastPath.current = pathname;
    const isFirst = first.current;
    first.current = false;
    // Opening or closing a case study keeps the page exactly where it is.
    if (!isFirst && (onProject || from?.startsWith('/projects/'))) return;
    const target = onProject ? 'projects' : sectionForPath(pathname)?.id;
    if (!target || (target === 'home' && isFirst)) return;
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToSection(target, !isFirst)));
  }, [pathname, phase, onProject]);

  return (
    <>
      {!onProject && <SectionMeta pathname={pathname} />}
      <main id="main" tabIndex={-1}>
        <Hero />
        <WebEngineering />
        <Commerce />
        <SearchIntelligence />
        <AIProducts />
        <ProjectVault />
        <WorkWithMe />
        <About />
        <Faq />
        <Contact />
      </main>
      <Outlet />
    </>
  );
}
