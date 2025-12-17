// Interface pour les statistiques
export interface Stat {
  value: string;
  label: string;
}

// Interface pour les compétences
export interface Skill {
  category: string;
  items: string[];
}

// Interface pour les expériences
export interface Experience {
  company: string;
  badges: string[];
  period: string;
  description: string[];
}

// Interface pour les formations
export interface Formation {
  name: string;
  school: string;
  year: string;
}

// Données de la page About
export const aboutData = {
  // Statistiques principales
  stats: [
    { value: '4 ans', label: 'en agence' },
    { value: '+60', label: 'Projets' },
    { value: '+50', label: 'Site web' },
    { value: '4', label: 'SaaS' },
    { value: '8', label: 'Identité graphique' },
    { value: 'Master', label: 'Niveau' }
  ] as Stat[],

  // Description principale
  mainDescription: {
    title: 'Product Designer et Directeur Artistique',
    content: [
      "Product Designer et Directeur Artistique, je conçois des expériences visuelles et digitales qui allient créativité et efficacité.",
      "Fort d'un parcours mêlant design graphique, webdesign et direction artistique, j'ai travaillé sur des projets variés allant de la création d'identités visuelles à la conception d'interfaces complètes (sites web, CRM, dashboards)."
    ]
  },

  // Compétences
  skills: {
    title: 'Compétences',
    items: [
      'Direction artistique',
      '• Product design',
      '• UI/UX design',
      '• Web design',
      '• Design graphique',
      '• Logo & identité visuelle',
      '• Gestion de projet créatif',
      '• Branding & identité',
      '• Collaboration interdisciplinaire'
    ]
  },

  // Outils
  tools: {
    title: 'Outils',
    items: [
      'Figma',
      '• Suite adobe',
      '• HTML / CSS / JS',
      '• WordPress',
      '• Outil de gestion de projet',
      '• Google Workspace'
    ]
  },

  // Intérêts
  interests: {
    title: 'Intérêts',
    items: [
      '• Course à pied',
      '• Trail',
      '• Vélo de route',
      '• Cinéma',
      '• Tech',
      '• Jeux vidéo'
    ]
  },

  // Expériences professionnelles
  experiences: [
    {
      company: 'Skydo digital',
      badges: ['Product designer', 'Art director'],
      period: 'CDD directeur artistique Février 2025 - Octobre 2025',
      description: [
        'Pilotage de projets de design digital de bout en bout : ateliers de co-création, conception UX, UI et suivi du développement.',
        '• Création et maintien de design systems cohérents pour améliorer la productivité et la cohérence des projets.',
        '• Réalisation de prototypes interactifs et tests utilisateurs pour valider les choix de conception.',
        '• Collaboration étroite avec chefs de projet, développeurs et clients pour aligner les besoins business et techniques.',
        "• Contribution à l'évolution de l'image de marque et à la stratégie design de l'agence."
      ]
    },
    {
      company: 'Skydo digital',
      badges: ['Product designer', 'Art director'],
      period: 'Alternance Master directeur artistique Studi Aout 2023 - Février 2025',
      description: [
        'Direction artistique et conception graphique print & digital.',
        '• Maquettes et prototypes UI/UX sur Figma.',
        '• Création et gestion de design systems.',
        '• Production visuelle avec Adobe CC.'
      ]
    },
    {
      company: 'Skydo digital',
      badges: ['Concepteur ux/ui'],
      period: 'Alternance Licence concepteur ux/ui Beforma Mars 2022 - Juin 2023',
      description: [
        'Pilotage de projets de design digital de bout en bout : ateliers de co-création, conception UX, UI et suivi du développement.',
        '• Création et maintien de design systems cohérents pour améliorer la productivité et la cohérence des projets.',
        '• Réalisation de prototypes interactifs et tests utilisateurs pour valider les choix de conception.'
      ]
    }
  ] as Experience[],

  // Formations
  formations: [
    {
      name: 'Master Directeur artistique',
      school: 'Studi',
      year: 'Aout 2023 - Février 2025'
    },
    {
      name: 'Licence Concepteur ux/ui',
      school: 'Beforma',
      year: 'Mars 2022 - Juin 2023'
    },
    {
      name: 'Bac+ 2 Developpeur web',
      school: 'Simplon / RsmaR',
      year: 'Mai 2021 - Mars 2022'
    },
    {
      name: 'Bac+ 2 Concepteur ux/ui',
      school: 'Afpar / Afpa',
      year: 'Aout 2019 - Juillet 2020'
    }
  ] as Formation[]
};


