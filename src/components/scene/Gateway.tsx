import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { sceneState } from '../../utils/sceneState';
import { GatewayDoor } from './GatewayDoor';
import { COLORS, useBeamTexture, useBrushedTexture } from './materials';

const LEAF_W = 3;
const LEAF_H = 9;

/** The monumental gate: stepped architectural frame, two leaves, light beam and stone walls. */
export function Gateway() {
  const brushed = useBrushedTexture([2, 6]);
  const stone = useBrushedTexture([8, 4], 128);
  const beamTex = useBeamTexture();
  const beamMat = useRef<THREE.MeshBasicMaterial>(null);
  const beamMesh = useRef<THREE.Mesh>(null);
  const floorBeam = useRef<THREE.Mesh>(null);
  const floorBeamMat = useRef<THREE.MeshBasicMaterial>(null);
  const lintelGlow = useRef<THREE.MeshStandardMaterial>(null);
  const innerLight = useRef<THREE.PointLight>(null);

  useFrame(() => {
    const s = sceneState;
    const opening = s.door;
    const strength = Math.min(1, s.beam * (1 - opening * 0.55) + s.reveal * 0.35);
    if (beamMesh.current) beamMesh.current.scale.x = 0.06 + opening * LEAF_W * 2;
    if (beamMat.current) beamMat.current.opacity = strength * 0.55;
    if (floorBeam.current) floorBeam.current.scale.x = 0.15 + opening * LEAF_W * 1.8;
    if (floorBeamMat.current) floorBeamMat.current.opacity = strength * 0.35;
    if (lintelGlow.current) lintelGlow.current.emissiveIntensity = 0.3 + s.beam * 1.6;
    if (innerLight.current) innerLight.current.intensity = 4 + s.reveal * 70;
  });

  const frameMat = <meshStandardMaterial color={COLORS.metal} metalness={0.8} roughness={0.45} roughnessMap={brushed} />;
  const stoneMat = <meshStandardMaterial color={COLORS.stone} metalness={0.1} roughness={0.92} roughnessMap={stone} />;

  return (
    <group>
      <GatewayDoor side="left" width={LEAF_W} height={LEAF_H} brushed={brushed} />
      <GatewayDoor side="right" width={LEAF_W} height={LEAF_H} brushed={brushed} />

      {/* Inner frame (pillars + lintel) */}
      {[-1, 1].map((d) => (
        <group key={d}>
          <mesh position={[d * (LEAF_W + 0.6), LEAF_H / 2 + 0.5, 0]}>
            <boxGeometry args={[1.2, LEAF_H + 1, 1.4]} />
            {frameMat}
          </mesh>
          {/* stepped outer frame */}
          <mesh position={[d * (LEAF_W + 1.75), (LEAF_H + 3) / 2, -0.25]}>
            <boxGeometry args={[1.1, LEAF_H + 3, 1.9]} />
            <meshStandardMaterial color={COLORS.metalDark} metalness={0.75} roughness={0.5} roughnessMap={brushed} />
          </mesh>
          {/* vertical light inlay */}
          <mesh position={[d * (LEAF_W + 1.2), LEAF_H / 2 + 0.5, 0.71]}>
            <boxGeometry args={[0.03, LEAF_H * 0.9, 0.02]} />
            <meshStandardMaterial color="#0b0d14" emissive={COLORS.accent} emissiveIntensity={0.6} toneMapped={false} />
          </mesh>
          {/* mechanical counterweights */}
          {[2.2, 6.8].map((y) => (
            <mesh key={y} position={[d * (LEAF_W + 0.6), y, 0.74]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.32, 0.32, 0.12, 32]} />
              <meshStandardMaterial color={COLORS.steel} metalness={1} roughness={0.25} />
            </mesh>
          ))}
        </group>
      ))}
      <mesh position={[0, LEAF_H + 0.8, 0]}>
        <boxGeometry args={[LEAF_W * 2 + 2.4, 1.6, 1.4]} />
        {frameMat}
      </mesh>
      <mesh position={[0, LEAF_H + 2.4, -0.25]}>
        <boxGeometry args={[LEAF_W * 2 + 4.6, 1.6, 1.9]} />
        <meshStandardMaterial color={COLORS.metalDark} metalness={0.75} roughness={0.5} roughnessMap={brushed} />
      </mesh>
      <mesh position={[0, LEAF_H + 0.05, 0.71]}>
        <boxGeometry args={[LEAF_W * 2, 0.03, 0.02]} />
        <meshStandardMaterial ref={lintelGlow} color="#0b0d14" emissive={COLORS.accent} emissiveIntensity={0.3} toneMapped={false} />
      </mesh>
      {/* threshold */}
      <mesh position={[0, 0.06, 0.2]}>
        <boxGeometry args={[LEAF_W * 2 + 2.4, 0.12, 2.2]} />
        <meshStandardMaterial color={COLORS.metal} metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Monumental stone walls either side and above */}
      {[-1, 1].map((d) => (
        <mesh key={d} position={[d * 24, 9, -0.6]}>
          <boxGeometry args={[38, 18, 1.2]} />
          {stoneMat}
        </mesh>
      ))}
      <mesh position={[0, 15.5, -0.6]}>
        <boxGeometry args={[12, 5, 1.2]} />
        {stoneMat}
      </mesh>
      {/* wall pilasters for rhythm */}
      {[-1, 1].flatMap((d) =>
        [8, 13, 18].map((x) => (
          <mesh key={`${d}-${x}`} position={[d * x, 9, 0.1]}>
            <boxGeometry args={[0.5, 18, 0.4]} />
            <meshStandardMaterial color="#121318" metalness={0.4} roughness={0.7} />
          </mesh>
        )),
      )}

      {/* Light beam through the opening */}
      <mesh ref={beamMesh} position={[0, LEAF_H / 2, -0.35]}>
        <planeGeometry args={[1, LEAF_H]} />
        <meshBasicMaterial ref={beamMat} map={beamTex} color={COLORS.accent} transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh ref={floorBeam} position={[0, 0.02, 4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1, 9]} />
        <meshBasicMaterial ref={floorBeamMat} map={beamTex} color={COLORS.accent} transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
      </mesh>

      {/* Light from the world behind the gate */}
      <pointLight ref={innerLight} position={[0, 5, -6]} color={COLORS.accent} intensity={4} distance={40} decay={1.6} />
      {/* Architectural downlights on the gate face */}
      {[-1, 1].map((d) => (
        <spotLight key={d} position={[d * 5.5, 14, 6]} angle={0.42} penumbra={0.8} intensity={90} distance={30} decay={1.6} color="#d6dcff" />
      ))}
    </group>
  );
}
