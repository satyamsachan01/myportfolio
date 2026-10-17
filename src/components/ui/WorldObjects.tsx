import { useEffect, useRef, type ReactNode } from 'react';
import { getProject, proof } from '../../data/projects';
import { profile } from '../../data/profile';

/**
 * Lightweight CSS-3D objects for each chapter. No extra WebGL contexts:
 * real perspective, preserve-3d and keyframes, so they stay smooth on phones.
 */

/** Wraps an object and tilts it toward the pointer (desktop only). */
export function Tilt({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--tx', `${((e.clientX - r.left) / r.width - 0.5) * 14}deg`);
      el.style.setProperty('--ty', `${-((e.clientY - r.top) / r.height - 0.5) * 10}deg`);
    };
    const leave = () => {
      el.style.setProperty('--tx', '0deg');
      el.style.setProperty('--ty', '0deg');
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, []);
  return (
    <div ref={ref} className={`tilt ${className}`} aria-hidden="true">
      <div className="tilt__inner">{children}</div>
    </div>
  );
}

/* Chapter III: a showroom ring of real client websites turning on a pedestal. */
export function Showroom() {
  const shots = [
    getProject('kursilo')?.images[0],
    getProject('theexportbusiness')?.images[0],
    getProject('aashnaah-industries')?.images[0],
    getProject('scandex-smart-elevators')?.images[0],
    getProject('dvm-tech-india')?.images[0],
    getProject('kursilo')?.images[2],
  ];
  return (
    <Tilt className="showroom">
      <div className="showroom__ring">
        {shots.map((s, i) => (
          <figure key={i} className="showroom__panel" style={{ ['--i' as string]: i }}>
            {s && <img src={s.src} alt="" loading="lazy" />}
          </figure>
        ))}
      </div>
      <div className="showroom__pedestal"><span /></div>
      <span className="showroom__label">Live in the showroom</span>
    </Tilt>
  );
}

/* Chapter IV: three signal orbits (SEO, AEO, GEO) around a drop of light. */
export function SignalOrbits() {
  const rings = [
    { size: 380, nodes: 8, speed: 38, label: 'SEO' },
    { size: 270, nodes: 6, speed: 26, label: 'AEO' },
    { size: 165, nodes: 4, speed: 18, label: 'GEO' },
  ];
  return (
    <Tilt className="orbits">
      <div className="orbits__plane">
        {rings.map((r, i) => (
          <div key={r.label} className={`orbits__ring orbits__ring--${i}`} style={{ width: r.size, height: r.size, animationDuration: `${r.speed}s` }}>
            {Array.from({ length: r.nodes }, (_, n) => (
              <i key={n} style={{ transform: `rotate(${(360 / r.nodes) * n}deg) translateX(${r.size / 2}px)` }} />
            ))}
          </div>
        ))}
      </div>
      <div className="orbits__core" />
      <span className="orbits__tag orbits__tag--0">SEO <em>crawl · rank</em></span>
      <span className="orbits__tag orbits__tag--1">AEO <em>answer</em></span>
      <span className="orbits__tag orbits__tag--2">GEO <em>cite</em></span>
    </Tilt>
  );
}

/* Chapter V: layers of knowledge with signals rising through them. */
export function KnowledgeChamber() {
  const layers = ['Business data', 'Chunks', 'Context', 'Answer'];
  return (
    <Tilt className="chamber">
      <div className="chamber__stack">
        {layers.map((l, i) => (
          <div key={l} className={`chamber__plane chamber__plane--${i}`} style={{ ['--z' as string]: `${i * 58}px` }}>
            <span>{String(i + 1).padStart(2, '0')} {l}</span>
            <b /><b /><b />
          </div>
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <i key={i} className="chamber__spark" style={{ left: `${18 + ((i * 37) % 64)}%`, top: `${20 + ((i * 53) % 60)}%`, animationDelay: `${(i * 0.45).toFixed(2)}s` }} />
        ))}
      </div>
    </Tilt>
  );
}

/* Chapter VI: the vault door. Bolts, a turning dial, a wheel. */
export function VaultDoor() {
  return (
    <Tilt className="vaultdoor">
      <div className="vaultdoor__frame" />
      <div className="vaultdoor__door">
        <div className="vaultdoor__layer vaultdoor__layer--back" />
        <div className="vaultdoor__layer vaultdoor__layer--mid" />
        <div className="vaultdoor__face">
          {Array.from({ length: 12 }, (_, i) => (
            <i key={i} className="vaultdoor__bolt" style={{ transform: `rotate(${i * 30}deg) translateY(-118px)` }} />
          ))}
          <div className="vaultdoor__dial" />
          <div className="vaultdoor__wheel"><i /><i /><i /></div>
          <div className="vaultdoor__hub" />
        </div>
      </div>
      <span className="vaultdoor__note">{proof.total} inside</span>
    </Tilt>
  );
}

/* Chapter VII: an arched doorway receding into light. Shows the portrait when one is set. */
export function BuilderArch() {
  return (
    <Tilt className="arch">
      <div className="arch__tunnel">
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} className="arch__ring" style={{ ['--d' as string]: i }} />
        ))}
        <span className="arch__light" />
      </div>
      {profile.photo ? (
        <div className="arch__photo">
          <img src={profile.photo} alt={`Portrait of ${profile.name}`} loading="lazy" />
        </div>
      ) : (
        <span className="arch__mono">S<em>S</em></span>
      )}
      <span className="arch__caption">{profile.name}<em>{profile.location ? `Based in ${profile.location}` : 'The builder'}</em></span>
    </Tilt>
  );
}
