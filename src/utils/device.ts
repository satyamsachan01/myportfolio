export type QualityTier = 'high' | 'low';

let webglCache: boolean | null = null;

export function hasWebGL(): boolean {
  if (webglCache !== null) return webglCache;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    webglCache = !!gl;
    (gl as WebGLRenderingContext | null)?.getExtension('WEBGL_lose_context')?.loseContext();
  } catch {
    webglCache = false;
  }
  return webglCache;
}

export function getQualityTier(): QualityTier {
  if (typeof navigator === 'undefined') return 'high';
  const forced = new URLSearchParams(window.location.search).get('quality');
  if (forced === 'low' || forced === 'high') return forced;
  const nav = navigator as Navigator & { deviceMemory?: number };
  const cores = nav.hardwareConcurrency ?? 8;
  const memory = nav.deviceMemory ?? 8;
  const smallTouch = window.matchMedia('(pointer: coarse)').matches && window.innerWidth < 900;
  return cores <= 4 || memory <= 4 || smallTouch ? 'low' : 'high';
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
