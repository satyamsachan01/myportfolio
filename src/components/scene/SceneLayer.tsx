import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import { useExperience } from '../../hooks/useExperience';
import { sceneState } from '../../utils/sceneState';

const SceneCanvas = lazy(() => import('./SceneCanvas'));

class SceneErrorBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.warn('3D scene failed, using CSS fallback.', error);
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/** CSS-only gate + universe for devices without WebGL. Driven by the same GSAP values. */
function CssScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { phase } = useExperience();

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const el = ref.current;
      if (el) {
        el.style.setProperty('--door', String(sceneState.door));
        el.style.setProperty('--beam', String(sceneState.beam));
        el.style.setProperty('--reveal', String(sceneState.reveal));
        el.style.setProperty('--settled', String(sceneState.settled));
      }
      if (phase !== 'entered') raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  return (
    <div ref={ref} className="css-scene" aria-hidden="true">
      <div className="css-universe">
        <div className="css-sculpture">
          <span /><span /><span /><span />
          <i />
        </div>
      </div>
      <div className="css-gate">
        <div className="css-gate__beam" />
        <div className="css-gate__door css-gate__door--left" />
        <div className="css-gate__door css-gate__door--right" />
      </div>
    </div>
  );
}

export function SceneLayer() {
  const { webgl, tier, reducedMotion, phase } = useExperience();
  const [lost, setLost] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);

  // Stop rendering the 3D world once the hero has scrolled away.
  useEffect(() => {
    const hero = document.getElementById('home');
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setHeroVisible(e.isIntersecting), { threshold: 0 });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  const active = phase !== 'entered' || heroVisible;
  const fallback = <CssScene />;

  return (
    <div className={`scene-layer ${active ? '' : 'is-idle'}`}>
      {webgl && !lost ? (
        <SceneErrorBoundary fallback={fallback}>
          <Suspense fallback={<div className="scene-loading" />}>
            <SceneCanvas active={active} tier={tier} reducedMotion={reducedMotion} onContextLost={() => setLost(true)} />
          </Suspense>
        </SceneErrorBoundary>
      ) : (
        fallback
      )}
      <div className="scene-vignette" />
    </div>
  );
}
