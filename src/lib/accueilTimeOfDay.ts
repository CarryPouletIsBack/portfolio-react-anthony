import { lerpHex, lerpNum } from './accueilColor';
import {
  attachSideRaysToTheme,
  interpolateSegmentMinutes,
  lerpSideRaysParams,
  type AccueilSideRaysParams,
  type AccueilTimeOfDayCore,
} from './accueilSideRays';

/** Fuseau île de la Réunion (UTC+4, identique à Dubai en heure civile). */
export const ACCUEIL_TIMEZONE = 'Indian/Reunion';

export const ACCUEIL_MIDDAY_BG = '#509ED8';

/** Durée des fondus entre ambiances (boutons test + auto). */
export const ACCUEIL_THEME_TRANSITION_MS = 4200;

export type AccueilTimeOfDayTheme = AccueilTimeOfDayCore & {
  sideRays: AccueilSideRaysParams;
};

type ThemeStop = AccueilTimeOfDayCore & { minutes: number };

const STOPS: ThemeStop[] = [
  {
    minutes: 0,
    bgTop: '#152238',
    bgBottom: '#0a1220',
    raysColor: '#8eb4dc',
    lightSpread: 0.92,
    saturation: 0.82,
    rayLength: 1.35,
  },
  {
    minutes: 330,
    bgTop: '#1e3050',
    bgBottom: '#121c30',
    raysColor: '#b8cce8',
    lightSpread: 0.95,
    saturation: 0.88,
    rayLength: 1.45,
  },
  {
    minutes: 390,
    bgTop: '#6a4a58',
    bgBottom: '#2a2848',
    raysColor: '#ffd0a8',
    lightSpread: 1.05,
    saturation: 0.95,
    rayLength: 1.55,
  },
  {
    minutes: 450,
    bgTop: '#d07850',
    bgBottom: '#6a5078',
    raysColor: '#ffe8d0',
    lightSpread: 1.12,
    saturation: 1,
    rayLength: 1.65,
  },
  {
    minutes: 510,
    bgTop: '#a87868',
    bgBottom: '#4a7098',
    raysColor: '#fff4e8',
    lightSpread: 1.1,
    saturation: 1,
    rayLength: 1.72,
  },
  {
    minutes: 570,
    bgTop: '#6a9ec8',
    bgBottom: '#5090c4',
    raysColor: '#ffffff',
    lightSpread: 1.12,
    saturation: 1,
    rayLength: 1.78,
  },
  {
    minutes: 660,
    bgTop: ACCUEIL_MIDDAY_BG,
    bgBottom: '#4593c9',
    raysColor: '#ffffff',
    lightSpread: 1.15,
    saturation: 1,
    rayLength: 1.8,
  },
  {
    minutes: 720,
    bgTop: ACCUEIL_MIDDAY_BG,
    bgBottom: '#4593c9',
    raysColor: '#ffffff',
    lightSpread: 1.15,
    saturation: 1,
    rayLength: 1.8,
  },
  {
    minutes: 900,
    bgTop: ACCUEIL_MIDDAY_BG,
    bgBottom: '#4593c9',
    raysColor: '#ffffff',
    lightSpread: 1.15,
    saturation: 1,
    rayLength: 1.8,
  },
  {
    minutes: 1020,
    bgTop: '#509ED8',
    bgBottom: '#4a94cf',
    raysColor: '#ffffff',
    lightSpread: 1.14,
    saturation: 1,
    rayLength: 1.8,
  },
  /* Coucher de soleil — étapes orange → rose → bleu */
  {
    minutes: 1050,
    bgTop: '#e8a868',
    bgBottom: '#6a88b8',
    raysColor: '#fff2e0',
    lightSpread: 1.13,
    saturation: 1,
    rayLength: 1.78,
  },
  {
    minutes: 1080,
    bgTop: '#f09850',
    bgBottom: '#8a6898',
    raysColor: '#ffe8d8',
    lightSpread: 1.12,
    saturation: 1,
    rayLength: 1.76,
  },
  {
    minutes: 1110,
    bgTop: '#f08048',
    bgBottom: '#b06898',
    raysColor: '#ffd8c8',
    lightSpread: 1.1,
    saturation: 1,
    rayLength: 1.72,
  },
  {
    minutes: 1140,
    bgTop: '#e87888',
    bgBottom: '#8868a8',
    raysColor: '#ffd0e0',
    lightSpread: 1.08,
    saturation: 1,
    rayLength: 1.68,
  },
  {
    minutes: 1170,
    bgTop: '#c878b8',
    bgBottom: '#5868a8',
    raysColor: '#f0d8ff',
    lightSpread: 1.05,
    saturation: 0.98,
    rayLength: 1.62,
  },
  {
    minutes: 1200,
    bgTop: '#6888b8',
    bgBottom: '#384868',
    raysColor: '#d8e4ff',
    lightSpread: 1.02,
    saturation: 0.95,
    rayLength: 1.58,
  },
  {
    minutes: 1230,
    bgTop: '#485878',
    bgBottom: '#283848',
    raysColor: '#c0d0f0',
    lightSpread: 0.98,
    saturation: 0.92,
    rayLength: 1.52,
  },
  {
    minutes: 1260,
    bgTop: '#304860',
    bgBottom: '#1a2838',
    raysColor: '#a8c0e0',
    lightSpread: 0.96,
    saturation: 0.88,
    rayLength: 1.46,
  },
  {
    minutes: 1290,
    bgTop: '#243850',
    bgBottom: '#121c28',
    raysColor: '#9eb8d8',
    lightSpread: 0.94,
    saturation: 0.86,
    rayLength: 1.42,
  },
  {
    minutes: 1320,
    bgTop: '#1e2f4a',
    bgBottom: '#101828',
    raysColor: '#9eb8d8',
    lightSpread: 0.95,
    saturation: 0.86,
    rayLength: 1.4,
  },
  {
    minutes: 1380,
    bgTop: '#18243c',
    bgBottom: '#0c1422',
    raysColor: '#8eb4dc',
    lightSpread: 0.93,
    saturation: 0.84,
    rayLength: 1.38,
  },
];

function lerpCore(from: AccueilTimeOfDayCore, to: AccueilTimeOfDayCore, t: number): AccueilTimeOfDayCore {
  const u = Math.max(0, Math.min(1, t));
  return {
    bgTop: lerpHex(from.bgTop, to.bgTop, u),
    bgBottom: lerpHex(from.bgBottom, to.bgBottom, u),
    raysColor: lerpHex(from.raysColor, to.raysColor, u),
    lightSpread: lerpNum(from.lightSpread, to.lightSpread, u),
    saturation: lerpNum(from.saturation, to.saturation, u),
    rayLength: lerpNum(from.rayLength, to.rayLength, u),
  };
}

export function lerpTheme(
  from: AccueilTimeOfDayTheme,
  to: AccueilTimeOfDayTheme,
  t: number
): AccueilTimeOfDayTheme {
  const u = Math.max(0, Math.min(1, t));
  return {
    ...lerpCore(from, to, u),
    sideRays: lerpSideRaysParams(from.sideRays, to.sideRays, u),
  };
}

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Anime un fond entre deux thèmes ; retourne une fonction d’annulation. */
export function animateAccueilThemeTransition(
  from: AccueilTimeOfDayTheme,
  to: AccueilTimeOfDayTheme,
  onFrame: (theme: AccueilTimeOfDayTheme) => void,
  durationMs = ACCUEIL_THEME_TRANSITION_MS,
  onComplete?: () => void
): () => void {
  if (durationMs <= 0) {
    onFrame(to);
    onComplete?.();
    return () => {};
  }

  const start = performance.now();
  let rafId = 0;
  let cancelled = false;

  const tick = (now: number) => {
    if (cancelled) return;
    const linear = Math.min(1, (now - start) / durationMs);
    const eased = easeInOutCubic(linear);
    onFrame(lerpTheme(from, to, eased));
    if (linear < 1) {
      rafId = requestAnimationFrame(tick);
    } else {
      onFrame(to);
      onComplete?.();
    }
  };

  rafId = requestAnimationFrame(tick);

  return () => {
    cancelled = true;
    cancelAnimationFrame(rafId);
  };
}

/** Minutes écoulées depuis minuit (0–1439) au fuseau Réunion. */
export function getReunionMinutesOfDay(now: Date = new Date()): number {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: ACCUEIL_TIMEZONE,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now);

  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? 12);
  const minute = Number(parts.find((p) => p.type === 'minute')?.value ?? 0);
  return hour * 60 + minute;
}

function findSegment(minutes: number): { from: ThemeStop; to: ThemeStop; t: number } {
  const total = 24 * 60;
  const wrapped = ((minutes % total) + total) % total;

  for (let i = 0; i < STOPS.length; i++) {
    const from = STOPS[i];
    const to = STOPS[(i + 1) % STOPS.length];
    const fromM = from.minutes;
    let toM = to.minutes;
    if (toM <= fromM) toM += total;

    let m = wrapped;
    if (m < fromM) m += total;

    if (m >= fromM && m < toM) {
      const span = toM - fromM;
      return { from, to, t: span === 0 ? 0 : (m - fromM) / span };
    }
  }

  return { from: STOPS[0], to: STOPS[0], t: 0 };
}

export function getAccueilTimeOfDayThemeAtMinutes(minutes: number): AccueilTimeOfDayTheme {
  const { from, to, t } = findSegment(minutes);
  const core = lerpCore(from, to, t);
  const segMinutes = interpolateSegmentMinutes(from.minutes, to.minutes, t);
  return attachSideRaysToTheme(core, segMinutes);
}

export function getAccueilTimeOfDayTheme(now: Date = new Date()): AccueilTimeOfDayTheme {
  return getAccueilTimeOfDayThemeAtMinutes(getReunionMinutesOfDay(now));
}

export type AccueilTimeOfDayPreview = 'auto' | 'night' | 'dawn' | 'day' | 'sunset' | 'dusk';

export const ACCUEIL_TIME_OF_DAY_PREVIEW_OPTIONS: {
  id: AccueilTimeOfDayPreview;
  label: string;
}[] = [
  { id: 'auto', label: 'Auto' },
  { id: 'night', label: 'Nuit' },
  { id: 'dawn', label: 'Aube' },
  { id: 'day', label: 'Midi' },
  { id: 'sunset', label: 'Coucher' },
  { id: 'dusk', label: 'Crépuscule' },
];

/** Heures représentatives pour les boutons de test (≠ nuit pour le coucher). */
const PREVIEW_MINUTES: Record<Exclude<AccueilTimeOfDayPreview, 'auto'>, number> = {
  night: 90,
  dawn: 450,
  day: 720,
  sunset: 1110,
  dusk: 1170,
};

export function getAccueilTimeOfDayThemeForPreview(
  preview: AccueilTimeOfDayPreview,
  now: Date = new Date()
): AccueilTimeOfDayTheme {
  if (preview === 'auto') return getAccueilTimeOfDayTheme(now);
  return getAccueilTimeOfDayThemeAtMinutes(PREVIEW_MINUTES[preview]);
}

/** Référence midi (12h, fuseau Réunion) — bleu portfolio inchangé. */
export const ACCUEIL_MIDDAY_THEME: AccueilTimeOfDayTheme = attachSideRaysToTheme(
  {
    bgTop: ACCUEIL_MIDDAY_BG,
    bgBottom: '#4593c9',
    raysColor: '#ffffff',
    lightSpread: 1.15,
    saturation: 1,
    rayLength: 1.8,
  },
  720
);

export function applyAccueilTimeOfDayTheme(theme: AccueilTimeOfDayTheme): void {
  for (const el of [document.documentElement, document.body]) {
    el.style.setProperty('--accueil-bg-top', theme.bgTop);
    el.style.setProperty('--accueil-bg-bottom', theme.bgBottom);
    el.style.setProperty('--accueil-rays-color', theme.raysColor);
    el.style.setProperty('--accueil-rays-spread', String(theme.lightSpread));
    el.style.setProperty('--accueil-rays-length', String(theme.rayLength));
    el.style.setProperty('--accueil-rays-saturation', String(theme.saturation));
  }
}

export function clearAccueilTimeOfDayTheme(): void {
  for (const el of [document.documentElement, document.body]) {
    el.style.removeProperty('--accueil-bg-top');
    el.style.removeProperty('--accueil-bg-bottom');
    el.style.removeProperty('--accueil-rays-color');
    el.style.removeProperty('--accueil-rays-spread');
    el.style.removeProperty('--accueil-rays-length');
    el.style.removeProperty('--accueil-rays-saturation');
  }
}
