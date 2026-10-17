import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { sceneState } from '../../utils/sceneState';

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uOffset;
  uniform float uPixelRatio;
  attribute float aSeed;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    p.x += sin(uTime * 0.15 + aSeed * 6.283) * 0.6;
    p.y += sin(uTime * 0.21 + aSeed * 12.0) * 0.45;
    // particles stream through the opening as the world is revealed
    p.z = mod(p.z + uOffset + 60.0, 75.0) - 60.0;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = min((2.0 + aSeed * 3.0) * uPixelRatio * (12.0 / -mv.z), 18.0);
    vAlpha = (0.25 + 0.5 * aSeed) * smoothstep(1.5, 5.0, -mv.z);
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d) * vAlpha;
    gl_FragColor = vec4(uColor, a);
  }
`;

export function ParticleField({ count, reducedMotion }: { count: number; reducedMotion: boolean }) {
  const mat = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = Math.random() * 15;
      pos[i * 3 + 2] = Math.random() * 75 - 60;
      seed[i] = Math.random();
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    return g;
  }, [count]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uOffset: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uColor: { value: new THREE.Color('#c8cdd6') },
    }),
    [],
  );

  useFrame((_, delta) => {
    if (!mat.current) return;
    const speed = reducedMotion ? 0.15 : 1;
    mat.current.uniforms.uTime.value += delta * speed;
    const flow = sceneState.reveal * (1 - sceneState.settled * 0.8);
    mat.current.uniforms.uOffset.value += delta * 6 * flow * speed;
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial ref={mat} vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}
