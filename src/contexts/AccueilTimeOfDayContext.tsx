import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  ACCUEIL_MIDDAY_THEME,
  ACCUEIL_THEME_TRANSITION_MS,
  animateAccueilThemeTransition,
  applyAccueilTimeOfDayTheme,
  clearAccueilTimeOfDayTheme,
  getAccueilTimeOfDayThemeForPreview,
  type AccueilTimeOfDayPreview,
  type AccueilTimeOfDayTheme,
} from '../lib/accueilTimeOfDay';

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function resolveTheme(preview: AccueilTimeOfDayPreview): AccueilTimeOfDayTheme {
  if (prefersReducedMotion()) return ACCUEIL_MIDDAY_THEME;
  return getAccueilTimeOfDayThemeForPreview(preview);
}

type AccueilTimeOfDayContextValue = {
  preview: AccueilTimeOfDayPreview;
  setPreview: (mode: AccueilTimeOfDayPreview) => void;
  theme: AccueilTimeOfDayTheme;
  isTransitioning: boolean;
  setBackgroundActive: (active: boolean) => void;
};

const AccueilTimeOfDayContext = createContext<AccueilTimeOfDayContextValue | null>(null);

export function AccueilTimeOfDayProvider({ children }: { children: ReactNode }) {
  const [preview, setPreview] = useState<AccueilTimeOfDayPreview>('auto');
  const [backgroundActive, setBackgroundActive] = useState(false);
  const [theme, setTheme] = useState<AccueilTimeOfDayTheme>(() => resolveTheme('auto'));
  const [isTransitioning, setIsTransitioning] = useState(false);

  const themeRef = useRef(theme);
  themeRef.current = theme;

  const backgroundActiveRef = useRef(backgroundActive);
  backgroundActiveRef.current = backgroundActive;

  const cancelTransitionRef = useRef<(() => void) | null>(null);

  const applyFrame = useCallback((frame: AccueilTimeOfDayTheme) => {
    themeRef.current = frame;
    if (backgroundActiveRef.current) {
      applyAccueilTimeOfDayTheme(frame);
    }
    setTheme(frame);
  }, []);

  const transitionTo = useCallback(
    (target: AccueilTimeOfDayTheme, durationMs = ACCUEIL_THEME_TRANSITION_MS) => {
      cancelTransitionRef.current?.();
      cancelTransitionRef.current = null;

      if (prefersReducedMotion() || durationMs <= 0) {
        applyFrame(target);
        setIsTransitioning(false);
        return;
      }

      const from = themeRef.current;
      setIsTransitioning(true);

      cancelTransitionRef.current = animateAccueilThemeTransition(
        from,
        target,
        applyFrame,
        durationMs,
        () => setIsTransitioning(false)
      );
    },
    [applyFrame]
  );

  useEffect(() => {
    transitionTo(resolveTheme(preview));

    const intervalId =
      backgroundActive && preview === 'auto' && !prefersReducedMotion()
        ? window.setInterval(() => {
            transitionTo(resolveTheme('auto'), 12_000);
          }, 60_000)
        : undefined;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionChange = () => transitionTo(resolveTheme(preview), 0);
    mq.addEventListener('change', onMotionChange);

    return () => {
      if (intervalId !== undefined) window.clearInterval(intervalId);
      mq.removeEventListener('change', onMotionChange);
      cancelTransitionRef.current?.();
      cancelTransitionRef.current = null;
    };
  }, [preview, backgroundActive, transitionTo]);

  useEffect(() => {
    if (!backgroundActive) {
      cancelTransitionRef.current?.();
      cancelTransitionRef.current = null;
      setIsTransitioning(false);
      clearAccueilTimeOfDayTheme();
      return;
    }
    applyAccueilTimeOfDayTheme(themeRef.current);
    return () => clearAccueilTimeOfDayTheme();
  }, [backgroundActive]);

  const value = useMemo(
    () => ({ preview, setPreview, theme, isTransitioning, setBackgroundActive }),
    [preview, theme, isTransitioning]
  );

  return (
    <AccueilTimeOfDayContext.Provider value={value}>{children}</AccueilTimeOfDayContext.Provider>
  );
}

export function useAccueilTimeOfDayContext(): AccueilTimeOfDayContextValue {
  const ctx = useContext(AccueilTimeOfDayContext);
  if (!ctx) {
    throw new Error('useAccueilTimeOfDayContext must be used within AccueilTimeOfDayProvider');
  }
  return ctx;
}

export function useAccueilTimeOfDayTheme(): AccueilTimeOfDayTheme {
  return useAccueilTimeOfDayContext().theme;
}

export function useAccueilTimeOfDayPreview(): Pick<
  AccueilTimeOfDayContextValue,
  'preview' | 'setPreview'
> {
  const { preview, setPreview } = useAccueilTimeOfDayContext();
  return { preview, setPreview };
}
