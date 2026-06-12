import wireframeBanner from '../assets/mpaudio/audit/wireframe-banner.webp';
import wireframeAmplisSlider from '../assets/mpaudio/audit/wireframe-amplis-slider.webp';
import wireframeSingleProduct from '../assets/mpaudio/audit/wireframe-single-product.webp';
import prototypeBanner from '../assets/mpaudio/audit/prototype-banner.webp';
import presentationAccueil from '../assets/mpaudio/light-mode/presentation-accueil.webp';
import presentationAmplisSlider from '../assets/mpaudio/light-mode/presentation-amplis-slider.webp';
import presentationSingleProduct from '../assets/mpaudio/light-mode/presentation-single-product.webp';

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
