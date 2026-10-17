import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { sceneState } from '../../utils/sceneState';
import { COLORS } from './materials';

interface Props {
  side: 'left' | 'right';
  width: number;
  height: number;
  brushed: THREE.Texture;
}

const MAX_ANGLE = Math.PI * 0.47;

/**
 * One gate leaf. The outer group sits exactly on the hinge line so rotation.y
 * swings the leaf around a believable pivot. Both leaves open inward (away from the viewer).
 */
export function GatewayDoor({ side, width, height, brushed }: Props) {
  const pivot = useRef<THREE.Group>(null);
  const bolts = useRef<THREE.Group>(null);
  const seamMat = useRef<THREE.MeshStandardMaterial>(null);
  const dir = side === 'left' ? 1 : -1;
  const hingeX = side === 'left' ? -width : width;
  const cx = (dir * width) / 2;

  const plates = useMemo(() => {
    const rows = [1.25, 3.35, 5.45, 7.55];
    const cols = [-0.58, 0.58];
    return rows.flatMap((y, r) => cols.map((x, c) => ({ key: `${r}-${c}`, x: cx + x * (width / 3) * dir, y: (y / 9) * height })));
  }, [cx, width, height, dir]);

  useFrame(() => {
    const s = sceneState;
    if (pivot.current) pivot.current.rotation.y = dir * s.door * MAX_ANGLE;
    if (bolts.current) bolts.current.position.x = -dir * Math.min(1, s.beam * 1.4) * 0.28;
    if (seamMat.current) seamMat.current.emissiveIntensity = 0.15 + s.beam * 3.2;
  });

  const plateW = (width / 3) * 1.05;
  const plateH = (height / 9) * 1.75;

  return (
    <group ref={pivot} position={[hingeX, 0, 0]}>
      {/* Main slab */}
      <mesh position={[cx, height / 2, 0]}>
        <boxGeometry args={[width, height, 0.38]} />
        <meshStandardMaterial color="#262a32" metalness={0.7} roughness={0.42} roughnessMap={brushed} envMapIntensity={1.4} />
      </mesh>

      {/* Raised layered plates */}
      {plates.map((p) => (
        <group key={p.key} position={[p.x, p.y, 0.2]}>
          <mesh>
            <boxGeometry args={[plateW, plateH, 0.06]} />
            <meshStandardMaterial color="#454b57" metalness={0.8} roughness={0.32} roughnessMap={brushed} envMapIntensity={1.6} />
          </mesh>
          <mesh position={[0, 0, 0.04]}>
            <boxGeometry args={[plateW * 0.78, plateH * 0.8, 0.04]} />
            <meshStandardMaterial color="#1c1f26" metalness={0.75} roughness={0.5} envMapIntensity={1.2} />
          </mesh>
        </group>
      ))}

      {/* Horizontal steel bands */}
      {[0.255, 0.488, 0.722].map((f) => (
        <mesh key={f} position={[cx, f * height, 0.23]}>
          <boxGeometry args={[width * 0.96, 0.08, 0.1]} />
          <meshStandardMaterial color={COLORS.steel} metalness={1} roughness={0.25} />
        </mesh>
      ))}

      {/* Outer edge rails */}
      <mesh position={[cx, height - 0.12, 0.05]}>
        <boxGeometry args={[width, 0.24, 0.48]} />
        <meshStandardMaterial color={COLORS.metal} metalness={0.9} roughness={0.35} />
      </mesh>
      <mesh position={[cx, 0.12, 0.05]}>
        <boxGeometry args={[width, 0.24, 0.48]} />
        <meshStandardMaterial color={COLORS.metal} metalness={0.9} roughness={0.35} />
      </mesh>

      {/* Glowing seam on the meeting edge */}
      <mesh position={[dir * (width - 0.02), height / 2, 0]}>
        <boxGeometry args={[0.035, height * 0.96, 0.4]} />
        <meshStandardMaterial ref={seamMat} color="#0b0d14" emissive={COLORS.accent} emissiveIntensity={0.15} toneMapped={false} />
      </mesh>

      {/* Locking bolts — retract during activation */}
      <group ref={bolts}>
        {[-0.5, 0, 0.5].map((o) => (
          <mesh key={o} position={[dir * (width - 0.35), height / 2 + o, 0.26]}>
            <boxGeometry args={[0.5, 0.14, 0.1]} />
            <meshStandardMaterial color={COLORS.steel} metalness={1} roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* Hinge barrels */}
      {[0.12, 0.5, 0.88].map((f) => (
        <group key={f} position={[dir * 0.06, f * height, 0.24]}>
          <mesh>
            <cylinderGeometry args={[0.13, 0.13, 0.8, 20]} />
            <meshStandardMaterial color={COLORS.steel} metalness={1} roughness={0.22} />
          </mesh>
          <mesh position={[0, 0.44, 0]}>
            <cylinderGeometry args={[0.08, 0.13, 0.08, 20]} />
            <meshStandardMaterial color={COLORS.steel} metalness={1} roughness={0.22} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
