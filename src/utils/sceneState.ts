/**
 * Mutable values shared between GSAP (which tweens them) and the R3F render loop
 * (which reads them every frame). Kept outside React state on purpose so the
 * cinematic sequence never triggers React re-renders per frame.
 */
export interface SceneValues {
  /** 0 closed → 1 fully open */
  door: number;
  /** centre seam / light beam intensity 0–1 */
  beam: number;
  /** inner world lighting 0–1 */
  reveal: number;
  camX: number;
  camY: number;
  camZ: number;
  lookY: number;
  lookZ: number;
  /** 0 during intro → 1 once in the universe (enables pointer parallax) */
  settled: number;
}

export const INITIAL: SceneValues = {
  door: 0, beam: 0, reveal: 0,
  camX: 0, camY: 1.7, camZ: 13.5,
  lookY: 4.4, lookZ: 0,
  settled: 0,
};

export const FINAL: SceneValues = {
  door: 1, beam: 0.35, reveal: 1,
  camX: 0, camY: 3.3, camZ: -22.5,
  lookY: 3.4, lookZ: -36,
  settled: 1,
};

export const sceneState: SceneValues = { ...INITIAL };

export const resetScene = () => Object.assign(sceneState, INITIAL);
export const finishScene = () => Object.assign(sceneState, FINAL);
