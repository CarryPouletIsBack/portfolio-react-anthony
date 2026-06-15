import type { ProjectData } from './projectsNew';

const T = 'À compléter — contenu Mpaudio (e-commerce, design, UX/UI, motion design).';

/** Cas Mpaudio — structure Playdago, textes et assets à compléter */
export function buildMpaudioProject(playdagoBase: ProjectData): ProjectData {
  return {
    ...playdagoBase,
    title: 'Mpaudio',
    subtitle: 'E-commerce — design, UX/UI & motion',
    projectUrl: undefined,
    badges: ['E-commerce', 'UX/UI', 'Motion design', 'Design'],
    summary: T,
    figmaPrototypeUrl:
      'https://www.figma.com/design/xiW7wAfkwbF4kkQ5tFW0vE/PORTFOLIO?node-id=446-695',
    figmaWireframeUrl:
      'https://www.figma.com/design/xiW7wAfkwbF4kkQ5tFW0vE/PORTFOLIO?node-id=410-785',
    objectifs: [T, T, T],
    teamNote: T,
    context: {
      title: 'Contexte & Problématique',
      content: T,
    },
    problematique: T,
    solution: T,
    auditLead: T,
    auditBody: T,
    auditLeadAfterCarousel: T,
    auditBodyAfterCarousel: T,
    archLead: T,
    architectureDsDuplicateLead: T,
    architectureDsDuplicateBody: T,
    architectureDsDuplicatePivotH3: 'Design system',
    conceptionDuplicateLead: T,
    conceptionDuplicatePivotH3: 'Prototype & wireframes',
    conceptionDuplicateBody: T,
    positionnementMatrix: {
      axisHorizontalPrefix: 'Axe X (Horizontal) ',
      axisVerticalPrefix: 'Axe Y (Vertical) ',
      xAxisLabel: 'Expérience d’achat',
      yAxisLabel: 'Identité de marque',
      xMinLabel: 'Faible',
      xMaxLabel: 'Élevée',
      yMinLabel: 'Faible',
      yMaxLabel: 'Élevée',
      points: [
        { name: 'Placeholder A', description: T, x: -5, y: 5 },
        { name: 'Placeholder B', description: T, x: 5, y: 5 },
        { name: 'Placeholder C', description: T, x: -5, y: -5 },
        { name: 'Mpaudio', description: T, x: 6, y: 6 },
      ],
    },
    userFlow: {
      title: 'User flow',
      nodes: [
        { id: 'accueil', name: 'Accueil' },
        { id: 'catalogue', name: 'Catalogue' },
        { id: 'produit', name: 'Fiche produit' },
        { id: 'panier', name: 'Panier' },
        { id: 'checkout', name: 'Checkout' },
        { id: 'compte', name: 'Compte' },
        { id: 'commandes', name: 'Commandes' },
      ],
      links: [
        { from: 'accueil', to: 'catalogue' },
        { from: 'catalogue', to: 'produit' },
        { from: 'produit', to: 'panier' },
        { from: 'panier', to: 'checkout' },
        { from: 'accueil', to: 'compte' },
        { from: 'compte', to: 'commandes' },
        { from: 'checkout', to: 'commandes' },
      ],
    },
    approach: {
      title: 'Démarche UX/UI',
      sections: playdagoBase.approach.sections.map((section) => ({
        ...section,
        content: T,
      })),
    },
    wireframes: {
      title: 'Wireframes & Prototype',
      items: [{ image: '', description: T }],
    },
    designSystem: {
      ...playdagoBase.designSystem,
      colorPalette: {
        ...playdagoBase.designSystem.colorPalette,
        title: 'Palette colorimétrique',
        description: T,
      },
      typography: {
        ...playdagoBase.designSystem.typography,
        description: T,
      },
    },
    implementation: {
      title: 'Livrables',
      technologies: ['Figma', 'Motion design', 'UX/UI', 'E-commerce'],
      architecture: T,
    },
    results: {
      title: 'Résultats',
      metrics: [
        { label: 'Motion design', value: 'À compléter' },
        { label: 'Prototype', value: 'Figma' },
      ],
      feedback: T,
      improvements: T,
    },
    conclusion: {
      title: 'Conclusion',
      content: T,
      nextSteps: [T],
    },
    year: '2024',
    image: '/videos/mpaudio-cover.mp4',
    skills: ['E-commerce', 'UX/UI', 'Motion design', 'Identité visuelle', 'Figma'],
    duration: 'À compléter',
    type: 'E-commerce',
    team: ['Anthony Merault, Product Designer | Building Complex SaaS & Design Systems'],
    translations: {
      en: {
        subtitle: 'E-commerce — design, UX/UI & motion',
        summary:
          'Content coming soon — Mpaudio e-commerce project (identity, UX/UI, motion design).',
        objectifs: ['To be completed.', 'To be completed.', 'To be completed.'],
        teamNote: 'To be completed.',
        problematique: 'To be completed.',
        solution: 'To be completed.',
        auditLead: 'To be completed.',
        auditBody: 'To be completed.',
        auditLeadAfterCarousel: 'To be completed.',
        auditBodyAfterCarousel: 'To be completed.',
        archLead: 'To be completed.',
        architectureDsDuplicateLead: 'To be completed.',
        architectureDsDuplicateBody: 'To be completed.',
        architectureDsDuplicatePivotH3: 'Design system',
        conceptionDuplicateLead: 'To be completed.',
        conceptionDuplicatePivotH3: 'Prototype & wireframes',
        conceptionDuplicateBody: 'To be completed.',
        userFlow: {
          title: 'User flow',
          nodes: [
            { id: 'accueil', name: 'Home' },
            { id: 'catalogue', name: 'Catalog' },
            { id: 'produit', name: 'Product page' },
            { id: 'panier', name: 'Cart' },
            { id: 'checkout', name: 'Checkout' },
            { id: 'compte', name: 'Account' },
            { id: 'commandes', name: 'Orders' },
          ],
          links: [
            { from: 'accueil', to: 'catalogue' },
            { from: 'catalogue', to: 'produit' },
            { from: 'produit', to: 'panier' },
            { from: 'panier', to: 'checkout' },
            { from: 'accueil', to: 'compte' },
            { from: 'compte', to: 'commandes' },
            { from: 'checkout', to: 'commandes' },
          ],
        },
        team: ['Anthony Merault, Product Designer | Building Complex SaaS & Design Systems'],
      },
    },
  };
}
