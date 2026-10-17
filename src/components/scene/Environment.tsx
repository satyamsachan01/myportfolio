import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment as DreiEnvironment, Lightformer, MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { sceneState } from '../../utils/sceneState';
import type { QualityTier } from '../../utils/device';
import { COLORS } from './materials';

/** Floor, fog, reflections and the architecture of the world behind the gate. */
export function WorldEnvironment({ tier, reducedMotion }: { tier: QualityTier; reducedMotion: boolean }) {
  const key = useRef<THREE.DirectionalLight>(null);
  const corridorMats = useRef<THREE.MeshStandardMaterial[]>([]);

  const pillars = useMemo(() => {
    const out: { x: number; z: number; h: number; c: string }[] = [];
    const accents = [COLORS.engineering, COLORS.commerce, COLORS.search, COLORS.ai];
    for (let i = 0; i < 7; i++) {
      const z = -7 - i * 7.5;
      [-1, 1].forEach((d) => out.push({ x: d * (9 + (i % 2) * 0.6), z, h: 16 + (i % 3) * 2, c: accents[i % 4] }));
    }
    return out;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // very small lighting variation for an "alive" room
    if (key.current) key.current.intensity = 1.1 + (reducedMotion ? 0 : Math.sin(t * 0.4) * 0.08);
    const r = sceneState.reveal;
    corridorMats.current.forEach((m, i) => {
      if (!m) return;
      // corridor lights come on progressively from the gate inward
      const lit = THREE.MathUtils.clamp(r * 1.6 - i * 0.07, 0, 1);
      m.emissiveIntensity = lit * 2.2;
    });
  });

  return (
    <>
      <color attach="background" args={['#07080b']} />
      <fogExp2 attach="fog" args={['#07080b', 0.026]} />

      <ambientLight intensity={0.12} color="#9aa4c8" />
      <hemisphereLight args={['#5a6380', '#050507', 0.25]} />
      <directionalLight ref={key} position={[-8, 14, 12]} intensity={1.1} color="#c8d2ff" />
      <directionalLight position={[6, 6, 16]} intensity={0.55} color="#aeb8e6" />
      <pointLight position={[0, 2.5, 6]} intensity={14} distance={16} decay={1.6} color="#c9d2ff" />

      {/* Image-based reflections built from procedural light panels — no HDR download */}
      <DreiEnvironment resolution={tier === 'high' ? 256 : 64} frames={1}>
        <Lightformer form="rect" intensity={4} color="#c8d0ff" position={[0, 6, 12]} scale={[22, 4, 1]} />
        <Lightformer form="rect" intensity={2.5} color="#ffffff" position={[0, 16, 4]} rotation-x={Math.PI / 2} scale={[16, 6, 1]} />
        <Lightformer form="rect" intensity={1.2} color="#ffffff" position={[-12, 4, 0]} rotation-y={Math.PI / 2} scale={[20, 2, 1]} />
        <Lightformer form="rect" intensity={1.2} color="#b8c7ff" position={[12, 4, 0]} rotation-y={-Math.PI / 2} scale={[20, 2, 1]} />
        <Lightformer form="ring" intensity={1.5} color="#c3b1ff" position={[0, 10, -12]} scale={4} />
      </DreiEnvironment>

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -20]}>
        <planeGeometry args={[160, 160]} />
        {tier === 'high' ? (
          <MeshReflectorMaterial
            blur={[300, 80]}
            resolution={512}
            mixBlur={1}
            mixStrength={1.4}
            roughness={0.9}
            depthScale={1}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#0c0d11"
            metalness={0.6}
            mirror={0.45}
          />
        ) : (
          <meshStandardMaterial color="#0c0d11" metalness={0.6} roughness={0.55} />
        )}
      </mesh>

      {/* Corridor behind the gate */}
      {pillars.map((p, i) => (
        <group key={i} position={[p.x, 0, p.z]}>
          <mesh position={[0, p.h / 2, 0]}>
            <boxGeometry args={[1.4, p.h, 1.4]} />
            <meshStandardMaterial color="#14161c" metalness={0.7} roughness={0.5} />
          </mesh>
          <mesh position={[-Math.sign(p.x) * 0.71, p.h / 2, 0]}>
            <boxGeometry args={[0.02, p.h * 0.85, 0.06]} />
            <meshStandardMaterial
              ref={(m) => {
                if (m) corridorMats.current[i] = m;
              }}
              color="#090a0e"
              emissive={p.c}
              emissiveIntensity={0}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}

      {/* Overhead beams spanning the corridor */}
      {[-14, -29, -44].map((z) => (
        <mesh key={z} position={[0, 17, z]}>
          <boxGeometry args={[20, 0.6, 0.9]} />
          <meshStandardMaterial color="#121318" metalness={0.6} roughness={0.6} />
        </mesh>
      ))}

      {/* Sculpture pedestal lights */}
      <pointLight position={[4, 7, -30]} intensity={40} distance={22} color="#b8c7ff" decay={1.5} />
      <pointLight position={[-3, 5, -29]} intensity={28} distance={14} color="#ffffff" decay={1.5} />
      <pointLight position={[-5, 2, -33]} intensity={22} distance={18} color="#c3b1ff" decay={1.5} />
      <pointLight position={[3, 1, -40]} intensity={16} distance={16} color="#8ed8c8" decay={1.5} />
    </>
  );
}
