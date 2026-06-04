import { lerpHex, lerpNum } from './accueilColor';

export type AccueilTimeOfDayCore = {
  bgTop: string;
  bgBottom: string;
  raysColor: string;
  lightSpread: number;
  saturation: number;
  rayLength: number;
};

export type AccueilSideRaysParams = {
  speed: number;
  rayColor1: string;
  rayColor2: string;
  intensity: number;
  spread: number;
  /** 0 = soleil à l’est (gauche), 1 = ouest (droite). */
  sourceX: number;
  flipX: number;
  flipY: number;
  tilt: number;
  saturation: number;
  blend: number;
  falloff: number;
  opacity: number;
};

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/**
 * Course du soleil : sourceX 0 (est) → 1 (ouest), atténué au zénith.
 */
export function computeSideRaysForMinutes(
  minutes: number,
  core: Pick<AccueilTimeOfDayCore, 'raysColor' | 'bgBottom' | 'lightSpread' | 'saturation'>
): AccueilSideRaysParams {
  const m = ((minutes % 1440) + 1440) % 1440;
  const dayStart = 330;
  const dayEnd = 1170;
  const nightEnd = 1290;
  const noon = 720;

  let sourceX = 0.5;
  const flipY = 0;
  let tilt = 0;
  let opacity = 0.2;
  let intensity = 1;
  let speed = 1.6;

  if (m < dayStart || m >= nightEnd) {
    sourceX = m < noon ? 0.06 : 0.94;
    opacity = 0.06;
    intensity = 0.4;
    speed = 0.65;
    tilt = 0;
  } else {
    const t = (m - dayStart) / (dayEnd - dayStart);
    sourceX = 0.05 + 0.9 * t;
    const distFromNoon = Math.min(1, Math.abs(t - 0.5) * 2.15);
    opacity = 0.06 + 0.62 * distFromNoon;
    intensity = 0.55 + 1.35 * distFromNoon;
    speed = 1.2 + 1.1 * distFromNoon;
    tilt = (0.5 - t) * 48;
  }

  const flipX = sourceX < 0.5 ? 1 : 0;

  return {
    speed,
    rayColor1: core.raysColor,
    rayColor2: lerpHex(core.raysColor, core.bgBottom, 0.45),
    intensity,
    spread: 1.45 + core.lightSpread * 0.4,
    sourceX,
    flipX,
    flipY,
    tilt,
    saturation: core.saturation * 1.12,
    blend: 0.68,
    falloff: 1.48,
    opacity,
  };
}

export function interpolateSegmentMinutes(fromM: number, toM: number, t: number): number {
  let end = toM;
  if (end <= fromM) end += 24 * 60;
  return (fromM + (end - fromM) * t) % (24 * 60);
}

export function lerpSideRaysParams(
  from: AccueilSideRaysParams,
  to: AccueilSideRaysParams,
  t: number
): AccueilSideRaysParams {
  const u = Math.max(0, Math.min(1, t));
  return {
    speed: lerpNum(from.speed, to.speed, u),
    rayColor1: lerpHex(from.rayColor1, to.rayColor1, u),
    rayColor2: lerpHex(from.rayColor2, to.rayColor2, u),
    intensity: lerpNum(from.intensity, to.intensity, u),
    spread: lerpNum(from.spread, to.spread, u),
    sourceX: lerpNum(from.sourceX, to.sourceX, u),
    flipX: lerpNum(from.flipX, to.flipX, u),
    flipY: lerpNum(from.flipY, to.flipY, u),
    tilt: lerpNum(from.tilt, to.tilt, u),
    saturation: lerpNum(from.saturation, to.saturation, u),
    blend: lerpNum(from.blend, to.blend, u),
    falloff: lerpNum(from.falloff, to.falloff, u),
    opacity: lerpNum(from.opacity, to.opacity, u),
  };
}

export function attachSideRaysToTheme(
  core: AccueilTimeOfDayCore,
  minutes: number
): AccueilTimeOfDayCore & { sideRays: AccueilSideRaysParams } {
  return {
    ...core,
    sideRays: computeSideRaysForMinutes(minutes, core),
  };
}
