import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import gsap from 'gsap';
import { finishScene, resetScene, sceneState } from '../utils/sceneState';
import { getQualityTier, hasWebGL, prefersReducedMotion, type QualityTier } from '../utils/device';

export type Phase = 'intro' | 'opening' | 'entered';

interface ExperienceValue {
  phase: Phase;
  webgl: boolean;
  tier: QualityTier;
  reducedMotion: boolean;
  enter: () => void;
  skip: () => void;
  replay: () => void;
}

const ExperienceContext = createContext<ExperienceValue | null>(null);
const STORAGE_KEY = 'beyond-the-gate:entered';

function shouldStartEntered() {
  if (typeof window === 'undefined') return false;
  const { pathname, hash } = window.location;
  // Any deep link (/about, /projects/kursilo, or #/about in the file build) skips the gate.
  if (pathname.replace(/\/+$/, '') !== '' && !pathname.endsWith('/index.html')) return true;
  if (hash.startsWith('#/') && hash.length > 2) return true;
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>(() => {
    const entered = shouldStartEntered();
    if (entered) finishScene();
    return entered ? 'entered' : 'intro';
  });
  const tl = useRef<gsap.core.Timeline | null>(null);
  const webgl = useMemo(() => hasWebGL(), []);
  const tier = useMemo(() => getQualityTier(), []);
  const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Lock page scroll only while the gate is closed or opening.
  useEffect(() => {
    document.documentElement.classList.toggle('is-locked', phase !== 'entered');
    return () => document.documentElement.classList.remove('is-locked');
  }, [phase]);

  const complete = useCallback(() => {
    tl.current?.kill();
    tl.current = null;
    finishScene();
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* storage unavailable — ignore */
    }
    setPhase('entered');
  }, []);

  const enter = useCallback(() => {
    if (tl.current || phase !== 'intro') return;
    setPhase('opening');
    const s = reducedMotion ? 0.3 : 1; // time scale for reduced motion
    const t = gsap.timeline({ onComplete: complete });

    // PHASE 1 — activation: seam lights, camera leans in
    t.to(sceneState, { beam: 1, duration: 0.9 * s, ease: 'power2.out' }, 0)
      .to(sceneState, { camZ: 11, camY: 1.9, duration: 1.4 * s, ease: 'power2.inOut' }, 0)
      // PHASE 2 — unlock: doors swing on hinges, inner light rises
      .to(sceneState, { door: 1, duration: 2.6 * s, ease: 'power3.inOut' }, 0.8 * s)
      .to(sceneState, { reveal: 1, duration: 2.6 * s, ease: 'power2.inOut' }, 1.0 * s)
      // PHASE 3 — reveal: camera travels through the opening
      .to(sceneState, { camZ: -22.5, camY: 3.3, duration: 3.2 * s, ease: 'power2.inOut' }, 2.2 * s)
      .to(sceneState, { lookZ: -36, lookY: 3.4, duration: 3.0 * s, ease: 'power2.inOut' }, 2.4 * s)
      .to(sceneState, { beam: 0.35, duration: 1.2 * s, ease: 'sine.out' }, 3.6 * s)
      // PHASE 4 — transformation: universe settles, UI takes over
      .to(sceneState, { settled: 1, duration: 0.8 * s, ease: 'sine.out' }, 4.8 * s);

    tl.current = t;
  }, [phase, reducedMotion, complete]);

  const skip = useCallback(() => {
    if (phase === 'entered') return;
    complete();
  }, [phase, complete]);

  const replay = useCallback(() => {
    tl.current?.kill();
    tl.current = null;
    resetScene();
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    window.scrollTo({ top: 0 });
    setPhase('intro');
  }, []);

  useEffect(() => () => {
    tl.current?.kill();
  }, []);

  const value = useMemo(
    () => ({ phase, webgl, tier, reducedMotion, enter, skip, replay }),
    [phase, webgl, tier, reducedMotion, enter, skip, replay],
  );

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>;
}

export function useExperience() {
  const ctx = useContext(ExperienceContext);
  if (!ctx) throw new Error('useExperience must be used inside <ExperienceProvider>');
  return ctx;
}
