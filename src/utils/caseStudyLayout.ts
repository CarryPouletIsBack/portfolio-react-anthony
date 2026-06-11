export type CaseStudyVariant = 'playdago' | 'utoi' | 'mpaudio';

export function getCaseStudyVariant(title: string): CaseStudyVariant | null {
  if (title === 'Playdago') return 'playdago';
  if (title === 'UTOI') return 'utoi';
  if (title === 'Mpaudio') return 'mpaudio';
  return null;
}

export function usesExtendedCaseStudyLayout(title: string): boolean {
  return getCaseStudyVariant(title) !== null;
}

export function usesPlaydagoCaseStudyLayout(title: string): boolean {
  return title === 'Playdago';
}

export function usesMpaudioCaseStudyLayout(title: string): boolean {
  return title === 'Mpaudio';
}

export function usesUtoidCaseStudyLayout(title: string): boolean {
  return title === 'UTOI';
}
