import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, type FC, type ReactNode } from 'react';
import {
  PLAYDAGO_H1_PATHS,
  PLAYDAGO_LOGO_INK,
  PLAYDAGO_LOGO_OUTLINE,
} from '../data/playdagoLogoPaths';

const STROKE_PER_GLYPH = 0.42;
const STAGGER = 0.11;

function LogoSvg({
  className,
  children,
  label = 'Playdago',
}: {
  className?: string;
  children: ReactNode;
  label?: string;
}) {
  return (
    <svg
      viewBox="0 0 151 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={label}
      className={className}
    >
      {children}
    </svg>
  );
}

function PaperGlyph({
  d,
  index,
  animate,
}: {
  d: string;
  index: number;
  animate: boolean;
}) {
  const delay = index * STAGGER;
  const fillDelay = delay + STROKE_PER_GLYPH * 0.72;

  return (
    <g>
      <motion.path
        d={d}
        fill="none"
        stroke={PLAYDAGO_LOGO_INK}
        strokeWidth={1.35}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 1 }}
        animate={animate ? { pathLength: 1, opacity: [1, 1, 0] } : { pathLength: 0, opacity: 1 }}
        transition={{
          pathLength: { duration: STROKE_PER_GLYPH, delay, ease: [0.42, 0, 0.2, 1] },
          opacity: { duration: 0.18, delay: fillDelay, times: [0, 0.4, 1] },
        }}
      />
      <motion.path
        d={d}
        fill={PLAYDAGO_LOGO_INK}
        initial={{ opacity: 0 }}
        animate={animate ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.22, delay: fillDelay, ease: 'easeOut' }}
      />
    </g>
  );
}

/** V1 — outline gris sur damier noir */
export const PlaydagoLogoOutline: FC = () => (
  <div className="figma-branding-logo-tile figma-branding-logo-tile--checker">
    <LogoSvg className="figma-branding-logo-svg">
      {PLAYDAGO_H1_PATHS.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke={PLAYDAGO_LOGO_OUTLINE}
          strokeWidth={1.1}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </LogoSvg>
  </div>
);

/** V2 — tracé calligraphique sur feuille */
export const PlaydagoLogoPaper: FC = () => {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, amount: 0.5 });
  const shouldAnimate = inView && !reduceMotion;

  return (
    <div ref={rootRef} className="figma-branding-logo-tile figma-branding-logo-tile--paper">
      <LogoSvg className="figma-branding-logo-svg">
        {PLAYDAGO_H1_PATHS.map((d, i) =>
          reduceMotion ? (
            <path key={i} d={d} fill={PLAYDAGO_LOGO_INK} />
          ) : (
            <PaperGlyph key={i} d={d} index={i} animate={shouldAnimate} />
          )
        )}
      </LogoSvg>
    </div>
  );
};

/** Les deux versions empilées (section Branding Playdago) */
const PlaydagoBrandingLogos: FC = () => (
  <div className="figma-branding-logos-stack">
    <PlaydagoLogoOutline />
    <PlaydagoLogoPaper />
  </div>
);

export default PlaydagoBrandingLogos;
