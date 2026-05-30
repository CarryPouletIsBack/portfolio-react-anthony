import utmbAudit from '../assets/utoi/audit/utmbAudit.png';
import sportproAudit from '../assets/utoi/audit/sportproAudit.png';
import utoiV1 from '../assets/utoi/audit/utoiV1.png';
import utoiAuditSynthesis from '../assets/utoi/audit/Image.png';
import utoiDs1 from '../assets/utoi/design-system/DS1.png';
import utoiDs2 from '../assets/utoi/design-system/DS2.png';
import utoiForme from '../assets/utoi/design-system/forme.png';
import utoiConceptF1 from '../assets/utoi/conception/concept-1/conceptF1.png';
import utoiConceptGrandTourismo from '../assets/utoi/conception/concept-1/conceptGrandtorismo.png';
import utoiConcept2 from '../assets/utoi/conception/concept-2/concept-2.png';
import utoiComparison from '../assets/utoi/conception/concept-2/comparison.png';
import utoiImgPres1 from '../assets/utoi/imgpres1.png';
import utoiImgPres2 from '../assets/utoi/imgpres2.png';
import utoiImgPres3 from '../assets/utoi/imgpres3.png';

export type CaseStudySlide = { src: string; alt?: string };

export const UTOI_PRESENTATION_IMAGES: CaseStudySlide[] = [
  { src: utoiImgPres1, alt: 'UTOI — interface accueil' },
  { src: utoiImgPres2, alt: 'UTOI — fiche course et inscription' },
  { src: utoiImgPres3, alt: 'UTOI — suivi live et résultats' },
];

export function buildUtoiAuditCarouselImages(): CaseStudySlide[] {
  return [
    { src: utmbAudit, alt: 'UTOI — benchmark UTMB World' },
    { src: sportproAudit, alt: 'UTOI — inscription externalisée SportPro' },
    { src: utoiV1, alt: 'UTOI — ancienne vitrine WordPress' },
    { src: utoiAuditSynthesis, alt: 'UTOI — synthèse audit concurrentiel' },
  ];
}

export const UTOI_CONCEPTION_CONCEPT_GROUPS: CaseStudySlide[][] = [
  [
    { src: utoiConceptF1, alt: 'UTOI — La F1 des montagnes' },
    { src: utoiConceptGrandTourismo, alt: 'UTOI — Grand Tourismo' },
  ],
  [
    { src: utoiConcept2, alt: 'UTOI — expérience utilisateur finale' },
    { src: utoiComparison, alt: 'UTOI — comparaison avant / après' },
  ],
];

/** Tuiles image du bento Design system (F1 + Grand Tourismo en tête). */
export const UTOI_DS_BENTO_IMAGE_SOURCES = {
  frame1: utoiConceptF1,
  frame2: utoiConceptGrandTourismo,
  auditStrategy: utoiDs1,
  conception: utoiDs2,
  forme: utoiForme,
} as const;

export const UTOI_CARD_SWAP_SLIDE_SRCS: string[] = [
  utoiConceptF1,
  utoiConceptGrandTourismo,
];

export function utoiFrameAlt(id: string): string {
  return `UTOI — Design system (${id})`;
}
