import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import { COLORS } from './materials';

const DISCIPLINES = [
  { key: 'web', color: COLORS.engineering, h: 2.8 },
  { key: 'commerce', color: COLORS.commerce, h: 2.3 },
  { key: 'search', color: COLORS.search, h: 2.6 },
  { key: 'ai', color: COLORS.ai, h: 2.1 },
];
const RADIUS = 2.9;
const ORIGIN = new THREE.Vector3();

/**
 * Central sculpture of the universe: a faceted metallic core with four monolith
 * blades — Web Engineering, Digital Commerce, Search Intelligence and AI — joined by light paths.
 */
export function Sculpture({ reducedMotion }: { reducedMotion: boolean }) {
  const root = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const blades = useRef<(THREE.Group | null)[]>([]);
  const pulses = useRef<(THREE.Mesh | null)[]>([]);

  const anchors = useMemo(
    () => DISCIPLINES.map((_, i) => {
      const a = (i / DISCIPLINES.length) * Math.PI * 2 + Math.PI / 4;
      return new THREE.Vector3(Math.cos(a) * RADIUS, 0, Math.sin(a) * RADIUS);
    }),
    [],
  );

  const loop = useMemo(() => [...anchors, anchors[0]].map((v) => [v.x, v.y, v.z] as [number, number, number]), [anchors]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const k = reducedMotion ? 0.15 : 1;
    if (root.current) root.current.rotation.y += delta * 0.12 * k;
    if (core.current) {
      core.current.rotation.x += delta * 0.18 * k;
      core.current.rotation.z += delta * 0.09 * k;
    }
    if (ring.current) ring.current.rotation.z += delta * 0.25 * k;
    blades.current.forEach((b, i) => {
      if (b) b.position.y = Math.sin(t * 0.6 * k + i * 1.6) * 0.18;
    });
    pulses.current.forEach((p, i) => {
      if (!p) return;
      const f = ((t * 0.35 * k + i * 0.25) % 1 + 1) % 1;
      p.position.lerpVectors(ORIGIN, anchors[i], f);
      (p.material as THREE.MeshBasicMaterial).opacity = Math.sin(f * Math.PI);
    });
  });

  return (
    <group position={[0, 3.6, -36]} scale={0.82}>
      <group ref={root}>
        {/* Core */}
        <mesh ref={core}>
          <dodecahedronGeometry args={[1.05, 0]} />
          <meshPhysicalMaterial color="#c3c9d6" metalness={0.9} roughness={0.18} clearcoat={1} clearcoatRoughness={0.05} flatShading envMapIntensity={2.2} />
        </mesh>
        <mesh ref={ring} rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[1.75, 0.012, 8, 128]} />
          <meshStandardMaterial color="#0b0d14" emissive={COLORS.accent} emissiveIntensity={2} toneMapped={false} />
        </mesh>

        {/* Four disciplines */}
        {DISCIPLINES.map((d, i) => {
          const a = anchors[i];
          const angle = Math.atan2(a.x, a.z);
          return (
            <group key={d.key} ref={(g) => { blades.current[i] = g; }}>
              <group position={a} rotation={[0, angle, 0]}>
                <mesh>
                  <boxGeometry args={[0.62, d.h, 0.14]} />
                  <meshStandardMaterial color="#2b2f38" metalness={0.95} roughness={0.28} envMapIntensity={1.2} />
                </mesh>
                <mesh position={[0, 0, 0.075]}>
                  <boxGeometry args={[0.025, d.h * 0.86, 0.01]} />
                  <meshStandardMaterial color="#0b0d14" emissive={d.color} emissiveIntensity={2.4} toneMapped={false} />
                </mesh>
              </group>
              <Line points={[[0, 0, 0], [a.x, a.y, a.z]]} color={d.color} lineWidth={1} transparent opacity={0.55} />
              <mesh ref={(m) => { pulses.current[i] = m; }}>
                <sphereGeometry args={[0.05, 12, 12]} />
                <meshBasicMaterial color={d.color} transparent toneMapped={false} />
              </mesh>
            </group>
          );
        })}
        <Line points={loop} color="#c8cdd6" lineWidth={0.8} transparent opacity={0.25} />
      </group>

      {/* Pedestal */}
      <mesh position={[0, -2.9, 0]}>
        <cylinderGeometry args={[3.9, 4.2, 0.35, 64]} />
        <meshStandardMaterial color="#121318" metalness={0.7} roughness={0.45} />
      </mesh>
      <mesh position={[0, -2.71, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.7, 3.73, 96]} />
        <meshBasicMaterial color={COLORS.accent} toneMapped={false} />
      </mesh>
    </group>
  );
}
