import { Outlet } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { ExperienceProvider, useExperience } from '../hooks/useExperience';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { SectionRail } from '../components/layout/SectionRail';
import { SceneLayer } from '../components/scene/SceneLayer';
import { IntroOverlay } from '../components/intro/IntroOverlay';
import { StructuredData } from '../components/layout/StructuredData';
import { DropletCursor } from '../components/ui/DropletCursor';
import { FloatingWhatsApp } from '../components/ui/FloatingWhatsApp';

function SkipLink() {
  const { phase, skip } = useExperience();
  return (
    <a
      href="#main"
      className="skip-link"
      onClick={(e) => {
        e.preventDefault();
        if (phase !== 'entered') skip();
        requestAnimationFrame(() => {
          const main = document.getElementById('main');
          main?.focus();
          main?.scrollIntoView();
        });
      }}
    >
      Skip to content
    </a>
  );
}

export function App() {
  return (
    <ExperienceProvider>
      <MotionConfig reducedMotion="user">
        <StructuredData />
        <SkipLink />
        <SceneLayer />
        <IntroOverlay />
        <Navbar />
        <SectionRail />
        <div className="page">
          <Outlet />
          <Footer />
        </div>
        <FloatingWhatsApp />
        <DropletCursor />
      </MotionConfig>
    </ExperienceProvider>
  );
}
