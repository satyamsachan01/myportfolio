import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { QualityTier } from '../../utils/device';

/** Teardrop profile, revolved into a solid. Point on top, round belly below. */
function useDropGeometry() {
  const geo = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    const n = 28;
    for (let i = 0; i <= n; i++) {
      const t = i / n; // 0 top → 1 bottom
      const a = t * Math.PI;
      const r = Math.sin(a) * (0.35 + 0.65 * t) * 0.5;
      const y = Math.cos(a) * 0.62 + (1 - t) * 0.18;
      pts.push(new THREE.Vector2(Math.max(r, 0.0001), y));
    }
    return new THREE.LatheGeometry(pts, 48);
  }, []);
  useEffect(() => () => geo.dispose(), [geo]);
  return geo;
}

const DROPS = [
  { p: [-1.2, 5.4, -33], s: 0.5, phase: 0 },
  { p: [4.6, 5.6, -35], s: 0.42, phase: 1.3 },
  { p: [4.2, 1.2, -32], s: 0.46, phase: 2.1 },
  { p: [-0.6, 0.9, -33.5], s: 0.34, phase: 3.4 },
  { p: [6.4, 8, -39], s: 0.36, phase: 4.2 },
] as const;

/**
 * Glossy water drops hovering around the sculpture. Real refraction on capable
 * devices (transmission, index of refraction of water), a polished clearcoat elsewhere.
 */
export function WaterDrops({ tier, reducedMotion }: { tier: QualityTier; reducedMotion: boolean }) {
  const geo = useDropGeometry();
  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime * (reducedMotion ? 0.15 : 1);
    refs.current.forEach((m, i) => {
      if (!m) return;
      const d = DROPS[i];
      m.position.y = d.p[1] + Math.sin(t * 0.7 + d.phase) * 0.25;
      m.rotation.y = t * 0.3 + d.phase;
      // a soft wobble, like surface tension
      const w = 1 + Math.sin(t * 2.2 + d.phase) * 0.03;
      m.scale.set(d.s * w, d.s / w, d.s * w);
    });
  });

  return (
    <group>
      {DROPS.map((d, i) => (
        <mesh key={i} ref={(m) => { refs.current[i] = m; }} geometry={geo} position={d.p as unknown as [number, number, number]} scale={d.s}>
          {tier === 'high' ? (
            <meshPhysicalMaterial
              color="#e8eeff"
              transmission={1}
              thickness={0.6}
              ior={1.33}
              roughness={0.02}
              metalness={0}
              clearcoat={1}
              clearcoatRoughness={0.02}
              envMapIntensity={1.6}
              attenuationColor="#b8c7ff"
              attenuationDistance={2.5}
            />
          ) : (
            <meshPhysicalMaterial color="#9fb0e0" roughness={0.05} metalness={0.2} clearcoat={1} clearcoatRoughness={0.03} transparent opacity={0.55} envMapIntensity={2} />
          )}
        </mesh>
      ))}
    </group>
  );
}
