import { useEffect } from 'react';
import { Outlet, useMatch } from 'react-router-dom';
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

const HOME_TITLE = `${profile.name} | Full-Stack Developer | WordPress & Shopify Developer | SEO Executive`;
const HOME_DESC =
  'Satyam Sachan, Full-Stack Developer, WordPress & Shopify Developer and SEO Executive building custom web applications, e-commerce experiences, search-optimized websites and AI-powered enterprise products.';

function HomeMeta() {
  useDocumentMeta({ title: HOME_TITLE, description: HOME_DESC, path: '/' });
  return null;
}

export function HomePage() {
  const onProject = useMatch('/projects/:slug');
  const { phase } = useExperience();

  // Honour /#section links and project deep links on first load.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id && phase === 'entered') requestAnimationFrame(() => scrollToSection(id));
    else if (onProject && window.scrollY < 50) document.getElementById('projects')?.scrollIntoView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!onProject && <HomeMeta />}
      <main id="main" tabIndex={-1}>
        <Hero />
        <WebEngineering />
        <Commerce />
        <SearchIntelligence />
        <AIProducts />
        <ProjectVault />
        <WorkWithMe />
        <About />
        <Contact />
      </main>
      <Outlet />
    </>
  );
}
