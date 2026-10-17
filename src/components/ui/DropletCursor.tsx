import { useEffect, useRef } from 'react';

/**
 * A glossy water-drop lens that trails the pointer and swells over anything clickable.
 * Desktop mouse only; skipped for touch and reduced motion. The real cursor stays visible.
 */
export function DropletCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = ref.current;
    if (!fine || reduced || !el) return;

    let x = -100, y = -100, cx = -100, cy = -100, scale = 1, target = 1, raf = 0;
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const hit = (e.target as Element | null)?.closest?.('a, button, input, select, textarea, [role="tab"]');
      target = hit ? 2.1 : 1;
      el.classList.add('is-on');
    };
    const onLeave = () => el.classList.remove('is-on');
    const onDown = () => (target = 0.8);
    const onUp = () => (target = 1);

    const tick = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      scale += (target - scale) * 0.15;
      const vx = x - cx;
      const vy = y - cy;
      // stretch slightly in the direction of travel, like a drop sliding on glass
      const speed = Math.min(Math.hypot(vx, vy) / 60, 0.35);
      const angle = Math.atan2(vy, vx);
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0) rotate(${angle}rad) scale(${scale * (1 + speed)}, ${scale * (1 - speed * 0.6)})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);

  return <div ref={ref} className="droplet" aria-hidden="true" />;
}
