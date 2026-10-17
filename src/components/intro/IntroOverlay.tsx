import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useExperience } from '../../hooks/useExperience';
import { profile } from '../../data/profile';

/** Scene one: the closed gate's typography and controls. */
export function IntroOverlay() {
  const { phase, enter, skip } = useExperience();
  const enterBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (phase !== 'intro') return;
    enterBtn.current?.focus({ preventScroll: true });
  }, [phase]);

  useEffect(() => {
    if (phase === 'entered') return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') skip();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase, skip]);

  return (
    <AnimatePresence>
      {phase !== 'entered' && (
        <motion.div
          className={`intro ${phase === 'opening' ? 'is-opening' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="intro-title"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
        >
          <div className="intro__top">
            <span className="intro__mark">S/S</span>
            <button type="button" className="btn btn--ghost btn--sm" onClick={skip}>
              Skip intro <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className="intro__center">
            <p className="intro__line intro__line--1">Every great idea starts behind a closed door.</p>
            <h1 id="intro-title" className="intro__title intro__line intro__line--2">Beyond the Gate</h1>
            <p className="intro__sub intro__line intro__line--3">
              An interactive journey through code, commerce, search, and intelligence.
            </p>
          </div>

          <div className="intro__bottom intro__line intro__line--4">
            <div className="intro__name">
              <strong>{profile.name}</strong>
              <span>{profile.shortRole}</span>
            </div>
            <div className="intro__cta">
              <span className="intro__hint">Open the gate to explore.</span>
              <button ref={enterBtn} type="button" className="btn btn--primary" onClick={enter} disabled={phase !== 'intro'}>
                Enter my world
              </button>
            </div>
          </div>
          <p className="sr-only" aria-live="polite">{phase === 'opening' ? 'The gate is opening.' : ''}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
