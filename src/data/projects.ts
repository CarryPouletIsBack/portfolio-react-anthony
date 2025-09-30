export interface ProjectData {
  title: string;
  year: string;
  description: string;
  image: string;
  skills: string[];
  duration: string;
  type: string;
  team: string[];
  uxResearch: string;
  projectFraming: string;
  userFlow: {
    steps: string[];
  };
  colorPalette: {
    neutrals: Array<{
      role: string;
      token: string;
      color: string;
      usage: string;
    }>;
    primary: Array<{
      role: string;
      token: string;
      color: string;
    }>;
    secondary: Array<{
      role: string;
      token: string;
      color: string;
    }>;
    accent: Array<{
      role: string;
      token: string;
      color: string;
    }>;
    error: Array<{
      role: string;
      token: string;
      color: string;
    }>;
  };
  typography: Array<{
    style: string;
    font: string;
    example: string;
    size: string;
    lineHeight: string;
  }>;
}

export const projectsData: { [key: string]: ProjectData } = {
  'Playdago': {
    title: 'Playdago',
    year: '2024',
    description: 'Ce projet a été réalisé pour une cliente que nous appellerons Claire D., experte en pédagogie active. Claire utilisait plusieurs plateformes distinctes pour gérer ses bases de données, ses newsletters et ses commandes, ce qui rendait la gestion complexe et fragmentée. Son objectif principal était de centraliser toutes ses données dans une interface unique, Pedaboard, afin d\'avoir une vue d\'ensemble claire, optimiser le suivi des clients, recevoir des rappels automatiques (rendez-vous, anniversaires de contrat), et mieux suivre ses formations.',
    image: '/images/261061ca92433cd63b52fe7f2093041e9d831bbc.png',
    skills: ['UX Research', 'Design system', 'UI', 'Branding', 'Figma', 'React js'],
    duration: '9 mois',
    type: 'Application web - CRM',
    team: [
      'Moi, Directeur Artistique / Concepteur ux/ui',
      'Josian (dev back-end)',
      'bertolde (dev front-end)'
    ],
    uxResearch: 'Avant toute création, j\'ai mené une recherche approfondie pour mieux comprendre les enjeux UX spécifiques à ce type d\'outil : parcours utilisateur pédagogique, suivi de formation, alertes et rappels automatisés. Cette étape a aussi inclus une veille concurrentielle afin d\'étudier des CRM similaires et repérer les bonnes pratiques UX/UI. Parallèlement, nous avons évalué, avec Josian et bertolde, les technologies adaptées, en veillant à la faisabilité technique et au respect du budget.',
    projectFraming: 'Lors du premier rendez-vous, nous avons pris le temps d\'écouter et comprendre précisément les besoins de Claire D. Ce temps d\'échange était essentiel pour définir les fonctionnalités clés du CRM et cerner les contraintes pédagogiques et organisationnelles. Le cahier des charges (CDC) a été co-construit avec elle, ce qui a permis d\'affiner le projet au fil des discussions.',
    userFlow: {
      steps: ['Login', 'Mot de passe oublié', 'Dashboard', 'Compte', 'Contact', 'Fiche client', 'Page Tâches', 'Vue tâche', 'Formation', 'Détails', 'Laboratoire', 'Détails']
    },
    colorPalette: {
      neutrals: [
        { role: 'Surface principale', token: 'surface.primary', color: '#F1F3F4', usage: 'Background app' },
        { role: 'Surface secondaire', token: 'surface.secondary', color: '#DCE3EB', usage: 'Cartes, hover' },
        { role: 'Surface surélevée', token: 'surface.elevation', color: '#FFFFFF', usage: 'Modale, carte + ombre' },
        { role: 'Bordure', token: 'border.default', color: '#DCDCDD', usage: 'Séparateurs' },
        { role: 'Texte principal', token: 'text.primary', color: '#1C1C1C', usage: 'Titre, texte' },
        { role: 'Texte secondaire', token: 'text.secondary', color: '#4D4D4D', usage: 'Labels, sous-titres' },
        { role: 'Texte inversé', token: 'text.onPrimary', color: '#FFFFFF', usage: 'Texte sur bouton coloré' }
      ],
      primary: [
        { role: 'Primaire', token: 'primary.base', color: '#007D9F' },
        { role: 'Hover', token: 'primary.hover', color: '#00647E' },
        { role: 'Pressed', token: 'primary.pressed', color: '#004E63' },
        { role: 'Texte sur bouton', token: 'text.onPrimary', color: '#FFFFFF' }
      ],
      secondary: [
        { role: 'Secondaire', token: 'secondary.base', color: '#F07F00' },
        { role: 'Hover', token: 'secondary.hover', color: '#D86F00' },
        { role: 'Texte sur bouton', token: 'text.onSecondary', color: '#FFFFFF' }
      ],
      accent: [
        { role: 'Accent', token: 'accent.warning', color: '#D8DA00' },
        { role: 'Texte sur accent', token: 'text.onAccent', color: '#1C1C1C' }
      ],
      error: [
        { role: 'Erreur', token: 'error.base', color: '#ED6C77' },
        { role: 'Hover', token: 'error.hover', color: '#CC525C' },
        { role: 'Texte sur erreur', token: 'text.onError', color: '#FFFFFF' }
      ]
    },
    typography: [
      { style: 'H1', font: 'Inter variable', example: 'Hello Playdago', size: '32', lineHeight: '150% → 48px' },
      { style: 'H2', font: 'Inter variable', example: 'Hello Playdago', size: '29', lineHeight: '150% → 43.5px' },
      { style: 'H3', font: 'Inter variable', example: 'Hello Playdago', size: '26', lineHeight: '150% → 39px' },
      { style: 'H4', font: 'Inter variable', example: 'Hello Playdago', size: '23', lineHeight: '150% → 34.5px' },
      { style: 'H5', font: 'Inter variable', example: 'Hello Playdago', size: '20', lineHeight: '150% → 30px' },
      { style: 'H6', font: 'Inter variable', example: 'Hello Playdago', size: '18', lineHeight: '150% → 27px' },
      { style: 'p', font: 'Inter', example: 'Hello Playdago', size: '16', lineHeight: 'Auto' },
      { style: 'span', font: 'Inter', example: 'Hello Playdago', size: '14', lineHeight: 'Auto' },
      { style: 'label', font: 'Inter', example: 'Hello Playdago', size: '14', lineHeight: 'Auto' }
    ]
  },
  'Pedaboard': {
    title: 'Pedaboard',
    year: '2025',
    description: 'Ce projet a été réalisé pour une cliente que nous appellerons Claire D., experte en pédagogie active. Claire utilisait plusieurs plateformes distinctes pour gérer ses bases de données, ses newsletters et ses commandes, ce qui rendait la gestion complexe et fragmentée. Son objectif principal était de centraliser toutes ses données dans une interface unique, Pedaboard, afin d\'avoir une vue d\'ensemble claire, optimiser le suivi des clients, recevoir des rappels automatiques (rendez-vous, anniversaires de contrat), et mieux suivre ses formations.',
    image: '/images/f27446bbc5c96f74d44074bc97b9be64f7cdf4cf.png',
    skills: ['UX Research', 'Design system', 'UI', 'Branding', 'Figma', 'React js'],
    duration: '9 mois',
    type: 'Application web - CRM',
    team: [
      'Moi, Directeur Artistique / Concepteur ux/ui',
      'Josian (dev back-end)',
      'bertolde (dev front-end)'
    ],
    uxResearch: 'Avant toute création, j\'ai mené une recherche approfondie pour mieux comprendre les enjeux UX spécifiques à ce type d\'outil : parcours utilisateur pédagogique, suivi de formation, alertes et rappels automatisés. Cette étape a aussi inclus une veille concurrentielle afin d\'étudier des CRM similaires et repérer les bonnes pratiques UX/UI. Parallèlement, nous avons évalué, avec Josian et bertolde, les technologies adaptées, en veillant à la faisabilité technique et au respect du budget.',
    projectFraming: 'Lors du premier rendez-vous, nous avons pris le temps d\'écouter et comprendre précisément les besoins de Claire D. Ce temps d\'échange était essentiel pour définir les fonctionnalités clés du CRM et cerner les contraintes pédagogiques et organisationnelles. Le cahier des charges (CDC) a été co-construit avec elle, ce qui a permis d\'affiner le projet au fil des discussions.',
    userFlow: {
      steps: ['Login', 'Mot de passe oublié', 'Dashboard', 'Compte', 'Contact', 'Fiche client', 'Page Tâches', 'Vue tâche', 'Formation', 'Détails', 'Laboratoire', 'Détails']
    },
    colorPalette: {
      neutrals: [
        { role: 'Surface principale', token: 'surface.primary', color: '#F1F3F4', usage: 'Background app' },
        { role: 'Surface secondaire', token: 'surface.secondary', color: '#DCE3EB', usage: 'Cartes, hover' },
        { role: 'Surface surélevée', token: 'surface.elevation', color: '#FFFFFF', usage: 'Modale, carte + ombre' },
        { role: 'Bordure', token: 'border.default', color: '#DCDCDD', usage: 'Séparateurs' },
        { role: 'Texte principal', token: 'text.primary', color: '#1C1C1C', usage: 'Titre, texte' },
        { role: 'Texte secondaire', token: 'text.secondary', color: '#4D4D4D', usage: 'Labels, sous-titres' },
        { role: 'Texte inversé', token: 'text.onPrimary', color: '#FFFFFF', usage: 'Texte sur bouton coloré' }
      ],
      primary: [
        { role: 'Primaire', token: 'primary.base', color: '#007D9F' },
        { role: 'Hover', token: 'primary.hover', color: '#00647E' },
        { role: 'Pressed', token: 'primary.pressed', color: '#004E63' },
        { role: 'Texte sur bouton', token: 'text.onPrimary', color: '#FFFFFF' }
      ],
      secondary: [
        { role: 'Secondaire', token: 'secondary.base', color: '#F07F00' },
        { role: 'Hover', token: 'secondary.hover', color: '#D86F00' },
        { role: 'Texte sur bouton', token: 'text.onSecondary', color: '#FFFFFF' }
      ],
      accent: [
        { role: 'Accent', token: 'accent.warning', color: '#D8DA00' },
        { role: 'Texte sur accent', token: 'text.onAccent', color: '#1C1C1C' }
      ],
      error: [
        { role: 'Erreur', token: 'error.base', color: '#ED6C77' },
        { role: 'Hover', token: 'error.hover', color: '#CC525C' },
        { role: 'Texte sur erreur', token: 'text.onError', color: '#FFFFFF' }
      ]
    },
    typography: [
      { style: 'H1', font: 'Inter variable', example: 'Hello Pedaboard', size: '32', lineHeight: '150% → 48px' },
      { style: 'H2', font: 'Inter variable', example: 'Hello Pedaboard', size: '29', lineHeight: '150% → 43.5px' },
      { style: 'H3', font: 'Inter variable', example: 'Hello Pedaboard', size: '26', lineHeight: '150% → 39px' },
      { style: 'H4', font: 'Inter variable', example: 'Hello Pedaboard', size: '23', lineHeight: '150% → 34.5px' },
      { style: 'H5', font: 'Inter variable', example: 'Hello Pedaboard', size: '20', lineHeight: '150% → 30px' },
      { style: 'H6', font: 'Inter variable', example: 'Hello Pedaboard', size: '18', lineHeight: '150% → 27px' },
      { style: 'p', font: 'Inter', example: 'Hello Pedaboard', size: '16', lineHeight: 'Auto' },
      { style: 'span', font: 'Inter', example: 'Hello Pedaboard', size: '14', lineHeight: 'Auto' },
      { style: 'label', font: 'Inter', example: 'Hello Pedaboard', size: '14', lineHeight: 'Auto' }
    ]
  }
};
