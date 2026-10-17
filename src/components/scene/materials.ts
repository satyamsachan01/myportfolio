import { useEffect, useMemo } from 'react';
import * as THREE from 'three';

/** Procedural brushed-metal streak texture — used as a roughness/bump map, no image assets required. */
export function useBrushedTexture(repeat: [number, number] = [1, 1], size = 256) {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#7a7a7a';
    ctx.fillRect(0, 0, size, size);
    for (let i = 0; i < size * 3; i++) {
      const y = Math.random() * size;
      const shade = 90 + Math.random() * 90;
      ctx.strokeStyle = `rgba(${shade},${shade},${shade},${0.08 + Math.random() * 0.18})`;
      ctx.lineWidth = Math.random() * 1.2 + 0.2;
      ctx.beginPath();
      const x = Math.random() * size;
      ctx.moveTo(x - size * 0.6, y);
      ctx.lineTo(x + size * 0.6, y + (Math.random() - 0.5) * 2);
      ctx.stroke();
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repeat[0], repeat[1]);
    tex.anisotropy = 4;
    return tex;
  }, [repeat[0], repeat[1], size]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => texture.dispose(), [texture]);
  return texture;
}

/** Soft vertical gradient used for light beams (alpha strongest in the middle). */
export function useBeamTexture() {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 4;
    const ctx = canvas.getContext('2d')!;
    const g = ctx.createLinearGradient(0, 0, 128, 0);
    g.addColorStop(0, 'rgba(255,255,255,0)');
    g.addColorStop(0.5, 'rgba(255,255,255,1)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 4);
    return new THREE.CanvasTexture(canvas);
  }, []);
  useEffect(() => () => texture.dispose(), [texture]);
  return texture;
}

export const COLORS = {
  metalDark: '#1a1c22',
  metal: '#2b2f38',
  steel: '#8b93a3',
  stone: '#0e0f13',
  accent: '#b8c7ff',
  engineering: '#b8c7ff',
  commerce: '#e2c49a',
  search: '#8ed8c8',
  ai: '#c3b1ff',
};
