import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getProject } from '../../data/projects';

gsap.registerPlugin(ScrollTrigger);

/** Real code from the Kursilo theme (template-parts/home/01-top.php), lightly trimmed. */
const CODE: [string, string][][] = [
  [['c', '<?php']],
  [['c', '/**']],
  [['c', ' * Home | section 1']],
  [['c', ' * @package Kursilo']],
  [['c', ' */']],
  [['c', '?>']],
  [['t', '<section '], ['a', 'id'], ['t', '='], ['s', '"top"'], ['t', ' '], ['a', 'class'], ['t', '='], ['s', '"hero"'], ['t', '>']],
  [['t', '  <div '], ['a', 'class'], ['t', '='], ['s', '"stack"'], ['t', '>']],
  [['c', '    <!-- Slide 1: driving shot -->']],
  [['t', '    <div '], ['a', 'class'], ['t', '='], ['s', '"slide is-active"'], ['t', ' '], ['a', 'data-slide'], ['t', '='], ['s', '"0"'], ['t', '>']],
  [['t', '      <div '], ['a', 'class'], ['t', '='], ['s', '"streak st-white"'], ['t', '></div>']],
  [['t', '      <div '], ['a', 'class'], ['t', '='], ['s', '"streak st-blue"'], ['t', '></div>']],
  [['t', '      <div '], ['a', 'class'], ['t', '='], ['s', '"road"'], ['t', '></div>']],
  [['t', '      <svg '], ['a', 'class'], ['t', '='], ['s', '"car drive"'], ['t', ' …>']],
];

/**
 * Blueprint → code → live site. Three glass panes that fan out as you scroll,
 * using the real Kursilo build: its template code and its live hero.
 */
export function BlueprintStack() {
  const root = useRef<HTMLDivElement>(null);
  // images[1] is the Kursilo hero (01.webp); works for both file paths and embedded images
  const shot = getProject('kursilo')?.images[1];

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 90%', end: 'center 40%', scrub: 0.9 } });
      tl.from(el.querySelector('.bp__pane--plan'), { xPercent: 14, yPercent: 16, rotateY: 0, opacity: 0.2, duration: 1 }, 0)
        .from(el.querySelector('.bp__pane--code'), { xPercent: 4, yPercent: 6, opacity: 0.2, duration: 1 }, 0.1)
        .from(el.querySelector('.bp__pane--live'), { xPercent: -10, yPercent: -12, rotateY: 0, opacity: 0, duration: 1 }, 0.2)
        .from(el.querySelectorAll('.bp__tag'), { opacity: 0, y: 10, stagger: 0.1, duration: 0.5 }, 0.6);
    });

    // gentle pointer tilt, desktop only
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--tx', `${((e.clientX - r.left) / r.width - 0.5) * 8}deg`);
      el.style.setProperty('--ty', `${-((e.clientY - r.top) / r.height - 0.5) * 6}deg`);
    };
    const onLeave = () => {
      el.style.setProperty('--tx', '0deg');
      el.style.setProperty('--ty', '0deg');
    };
    if (fine) {
      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerleave', onLeave);
    }
    return () => {
      mm.revert();
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div className="bp" ref={root} aria-label="From blueprint to code to a live website: the Kursilo Automotive build" role="img">
      <div className="bp__stage">
        {/* 01 Blueprint */}
        <div className="bp__pane bp__pane--plan">
          <svg viewBox="0 0 400 260" aria-hidden="true">
            <defs>
              <pattern id="bp-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M20 0H0V20" fill="none" stroke="currentColor" strokeOpacity="0.12" />
              </pattern>
            </defs>
            <rect width="400" height="260" fill="url(#bp-grid)" />
            <g fill="none" stroke="currentColor" strokeOpacity="0.7" strokeWidth="1">
              <rect x="30" y="26" width="340" height="18" rx="3" />
              <rect x="30" y="56" width="340" height="96" rx="4" strokeDasharray="4 3" />
              <path d="M110 120 h180" />
              <rect x="160" y="128" width="80" height="14" rx="7" />
              <rect x="30" y="164" width="104" height="70" rx="4" />
              <rect x="148" y="164" width="104" height="70" rx="4" />
              <rect x="266" y="164" width="104" height="70" rx="4" />
            </g>
            <g fill="currentColor" fillOpacity="0.7" fontSize="8" fontFamily="ui-monospace, monospace">
              <text x="34" y="38">nav · logo · menu · contact</text>
              <text x="36" y="70">hero / slides</text>
              <text x="34" y="176">recliners</text>
              <text x="152" y="176">makeover</text>
              <text x="270" y="176">experience</text>
            </g>
            <g stroke="currentColor" strokeOpacity="0.45" fontSize="7" fill="currentColor" fontFamily="ui-monospace, monospace">
              <path d="M30 250 h340 M30 246 v8 M370 246 v8" />
              <text x="188" y="246" stroke="none">1440</text>
            </g>
          </svg>
        </div>

        {/* 02 Code */}
        <div className="bp__pane bp__pane--code">
          <div className="bp__bar"><i /><i /><i /><span>template-parts/home/01-top.php</span></div>
          <pre className="bp__code" aria-hidden="true">
            {CODE.map((line, i) => (
              <span className="bp__ln" key={i}>
                <b>{i + 1}</b>
                {line.map(([k, t], j) => <span key={j} className={`tk-${k}`}>{t}</span>)}
                {'\n'}
              </span>
            ))}
          </pre>
        </div>

        {/* 03 Live */}
        <div className="bp__pane bp__pane--live">
          <div className="bp__bar"><i /><i /><i /><span>kursilo.in</span></div>
          {shot && <img src={shot.src} alt="" loading="lazy" />}
        </div>

        <span className="bp__tag bp__tag--1"><em>01</em> Blueprint</span>
        <span className="bp__tag bp__tag--2"><em>02</em> Code</span>
        <span className="bp__tag bp__tag--3"><em>03</em> Live <i /></span>
      </div>
    </div>
  );
}
