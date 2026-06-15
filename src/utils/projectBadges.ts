/** Type de livrable (menu hero / navigation) */
const DELIVERY_FORMAT_BADGES = new Set([
  'Application',
  'Application web',
  'Site Web',
  'Site web',
  'Navigation',
  'Logo',
  'Motion',
  'PLV',
  'Plv',
]);

/** Vertical produit / domaine métier */
const PRODUCT_DOMAIN_BADGES = new Set([
  'SaaS',
  'CRM',
  'Marketplace',
  'Simulation',
  'E-commerce',
]);

const DISCIPLINE_BADGES = new Set(['UX/UI', 'Motion design', 'Design']);

const YEAR_REGEX = /^(19|20)\d{2}$/;

const BADGE_I18N_KEYS: Record<string, string> = {
  Application: 'hero.categoryApplication',
  'Application web': 'hero.categoryApplicationWeb',
  'Site Web': 'hero.categorySiteWeb',
  'Site web': 'hero.categorySiteWeb',
  Logo: 'hero.categoryLogo',
  Motion: 'hero.categoryMotion',
  PLV: 'hero.categoryPlv',
  Plv: 'hero.categoryPlv',
};

/**
 * Badges header projet : type → discipline → domaine, sans doublon Application ni année.
 */
export function resolveProjectHeaderBadges(
  badges: string[] | undefined,
  projectCategory?: string | null
): string[] {
  const raw = badges ?? [];

  const deliveryFromNav =
    projectCategory && !YEAR_REGEX.test(projectCategory) ? projectCategory : undefined;
  const deliveryFromData = raw.find((badge) => DELIVERY_FORMAT_BADGES.has(badge));
  const delivery = deliveryFromNav ?? deliveryFromData;

  const domains = raw.filter((badge) => PRODUCT_DOMAIN_BADGES.has(badge));
  const disciplines = raw.filter((badge) => DISCIPLINE_BADGES.has(badge));

  const ordered = [...(delivery ? [delivery] : []), ...disciplines, ...domains];

  const seen = new Set<string>();
  return ordered.filter((badge) => {
    if (seen.has(badge)) return false;
    seen.add(badge);
    return true;
  });
}

export function getProjectBadgeLabel(
  badge: string,
  t: (key: string) => string
): string {
  const key = BADGE_I18N_KEYS[badge];
  return key ? t(key) : badge;
}
