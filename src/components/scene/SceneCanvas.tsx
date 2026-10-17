import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import type { QualityTier } from '../../utils/device';
import { CameraRig } from './CameraRig';
import { WorldEnvironment } from './Environment';
import { Gateway } from './Gateway';
import { ParticleField } from './ParticleField';
import { Sculpture } from './Sculpture';
import { WaterDrops } from './WaterDrops';

interface Props {
  active: boolean;
  tier: QualityTier;
  reducedMotion: boolean;
  onContextLost: () => void;
}

/** One continuous world: the gate in front, the digital universe behind it. */
export default function SceneCanvas({ active, tier, reducedMotion, onContextLost }: Props) {
  return (
    <Canvas
      className="scene-canvas"
      frameloop={active ? 'always' : 'never'}
      dpr={tier === 'high' ? [1, 1.75] : [1, 1.25]}
      camera={{ position: [0, 1.7, 13.5], fov: 45, near: 0.1, far: 140 }}
      gl={{ antialias: tier === 'high', powerPreference: 'high-performance', alpha: false }}
      onCreated={(state) => {
        const { gl } = state;
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        gl.domElement.addEventListener('webglcontextlost', (e) => {
          e.preventDefault();
          onContextLost();
        });
      }}
      aria-hidden="true"
    >
      <WorldEnvironment tier={tier} reducedMotion={reducedMotion} />
      <Gateway />
      <Sculpture reducedMotion={reducedMotion} />
      <WaterDrops tier={tier} reducedMotion={reducedMotion} />
      <ParticleField count={tier === 'high' ? 900 : 260} reducedMotion={reducedMotion} />
      <CameraRig reducedMotion={reducedMotion} />
    </Canvas>
  );
}
