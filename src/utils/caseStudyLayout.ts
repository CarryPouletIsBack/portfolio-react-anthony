export type CaseStudyVariant = 'playdago' | 'utoi';

export function getCaseStudyVariant(title: string): CaseStudyVariant | null {
  if (title === 'Playdago') return 'playdago';
  if (title === 'UTOI') return 'utoi';
  return null;
}

export function usesExtendedCaseStudyLayout(title: string): boolean {
  return getCaseStudyVariant(title) !== null;
}

export function usesPlaydagoCaseStudyLayout(title: string): boolean {
  return title === 'Playdago';
}

export function usesUtoidCaseStudyLayout(title: string): boolean {
  return title === 'UTOI';
}
