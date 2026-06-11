import wireframeBanner from '../assets/mpaudio/audit/wireframe-banner.png';
import wireframeAmplisSlider from '../assets/mpaudio/audit/wireframe-amplis-slider.png';
import wireframeSingleProduct from '../assets/mpaudio/audit/wireframe-single-product.png';
import prototypeBanner from '../assets/mpaudio/audit/prototype-banner.png';
import presentationAccueil from '../assets/mpaudio/light-mode/presentation-accueil.png';
import presentationAmplisSlider from '../assets/mpaudio/light-mode/presentation-amplis-slider.png';
import presentationSingleProduct from '../assets/mpaudio/light-mode/presentation-single-product.png';

export type CaseStudySlide = { src: string; alt?: string };

/** ScrollStack #light-mode — prototype PFE (exports Figma 446-695) */
export const MPAUDIO_PRESENTATION_IMAGES: CaseStudySlide[] = [
  { src: presentationAccueil, alt: 'Mpaudio — prototype bannière accueil' },
  { src: presentationAmplisSlider, alt: 'Mpaudio — prototype slider amplis' },
  { src: presentationSingleProduct, alt: 'Mpaudio — prototype fiche produit' },
];

/** Carrousel #audit — wireframes + prototype (exports Figma Mpaudio) */
export function buildMpaudioAuditCarouselImages(): CaseStudySlide[] {
  return [
    { src: wireframeBanner, alt: 'Mpaudio — wireframe bannière accueil' },
    { src: wireframeAmplisSlider, alt: 'Mpaudio — wireframe slider amplis' },
    { src: wireframeSingleProduct, alt: 'Mpaudio — wireframe fiche produit' },
    { src: prototypeBanner, alt: 'Mpaudio — prototype bannière accueil' },
  ];
}
