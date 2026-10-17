import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { sceneState } from '../../utils/sceneState';

/**
 * Reads the GSAP-driven scene values every frame and places the camera.
 * Adds a gentle idle drift and (after entering) a subtle pointer parallax.
 */
export function CameraRig({ reducedMotion }: { reducedMotion: boolean }) {
  const { camera, size } = useThree();
  const pointer = useRef(new THREE.Vector2());
  const look = useRef(new THREE.Vector3());

  useFrame((state) => {
    const s = sceneState;
    const t = state.clock.elapsedTime;
    const aspect = size.width / size.height;
    const wide = aspect > 1.15 ? 1 : 0;

    const cam = camera as THREE.PerspectiveCamera;
    const fov = aspect < 0.8 ? 60 : aspect < 1.15 ? 52 : 45;
    if (cam.fov !== fov) {
      cam.fov = fov;
      cam.updateProjectionMatrix();
    }

    const motion = reducedMotion ? 0 : 1;
    pointer.current.lerp(state.pointer, 0.04);
    const px = pointer.current.x * 0.7 * s.settled * motion;
    const py = pointer.current.y * 0.35 * s.settled * motion;
    const driftX = Math.sin(t * 0.17) * 0.14 * motion;
    const driftY = Math.cos(t * 0.13) * 0.08 * motion;

    // On wide screens push the sculpture to the right so hero typography owns the left.
    const offsetX = -3.1 * wide * s.settled;

    camera.position.set(s.camX + driftX + px + offsetX * 0.35, s.camY + driftY + py, s.camZ);
    look.current.set(offsetX, s.lookY + py * 0.4, s.lookZ);
    camera.lookAt(look.current);
  });

  return null;
}
