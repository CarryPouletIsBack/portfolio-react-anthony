export interface ProjectData {
  // 1. Titre principal
  title: string;
  subtitle?: string;
  badges?: string[];
  
  // 2. Résumé / Introduction
  summary: string;
  
  // 3. Contexte & Problématique
  context: {
    title: string;
    content: string;
  };
  
  // 4. Contexte & Problématique (optionnel)
  contextProblem?: {
    title: string;
    content: string;
  };
  
  // 5. Démarche & Approche
  approach: {
    title: string;
    sections: Array<{
      subtitle: string;
      content: string;
    }>;
  };
  
  // 6. Wireframes / Maquettes
  wireframes?: {
    title: string;
    items: Array<{
      image: string;
      description: string;
    }>;
  };
  
  // 6. Design System
  designSystem: {
    colorPalette: {
      title: string;
      description: string;
      categories: {
        neutrals: {
          title: string;
          colors: Array<{
            role: string;
            token: string;
            color: string;
            usage: string;
          }>;
        };
        primary: {
          title: string;
          colors: Array<{
            role: string;
            token: string;
            color: string;
          }>;
        };
        secondary: {
          title: string;
          colors: Array<{
            role: string;
            token: string;
            color: string;
          }>;
        };
        accent: {
          title: string;
          colors: Array<{
            role: string;
            token: string;
            color: string;
          }>;
        };
        error: {
          title: string;
          colors: Array<{
            role: string;
            token: string;
            color: string;
          }>;
        };
      };
    };
    typography: {
      title: string;
      description: string;
      items: Array<{
        style: string;
        font: string;
        size: string;
        lineHeight: string;
      }>;
    };
    iconography?: {
      title: string;
      description: string;
    };
  };
  
  // 7. Implémentation & Technologies
  implementation?: {
    title: string;
    technologies: string[];
    architecture?: string;
  };
  
  // 8. Impacts & Résultats
  results?: {
    title: string;
    metrics?: Array<{
      label: string;
      value: string;
    }>;
    feedback?: string;
    improvements?: string;
  };
  
  // 9. Conclusion / Next Steps
  conclusion?: {
    title: string;
    content: string;
    nextSteps?: string[];
  };
  
  // Métadonnées générales
  year: string;
  image: string;
  skills: string[];
  duration: string;
  type: string;
  team: string[];
}

export const projectsDataNew: { [key: string]: ProjectData } = {
  'Playdago': {
    // 1. Titre principal
    title: 'Playdago',
    subtitle: 'Application de pédagogie active',
    badges: ['UX/UI', '2024', 'Application'],
    
    // 2. Résumé / Introduction
    summary: 'Création d\'une plateforme de pédagogie active pour centraliser la gestion des outils métiers. Réalisé en 9 mois, rôle de Directeur Artistique et Concepteur UX/UI en collaboration avec une équipe de développeurs.',
    
    // 3. Contexte & Problématique
    context: {
      title: 'Contexte & Problématique',
      content: 'Ce projet a été réalisé pour une cliente experte en pédagogie active qui utilisait plusieurs plateformes distinctes pour gérer ses bases de données, ses newsletters et ses commandes. La gestion était devenue complexe et fragmentée. L\'objectif principal était de centraliser toutes ses données dans une interface unique afin d\'avoir une vue d\'ensemble claire, optimiser le suivi des clients, recevoir des rappels automatiques et mieux suivre ses formations.'
    },
    
    // 4. Démarche & Approche
    approach: {
      title: 'Démarche UX/UI',
      sections: [
        {
          subtitle: 'Recherche utilisateur',
          content: 'Lors du premier rendez-vous, nous avons pris le temps d\'écouter et comprendre précisément les besoins de la cliente. Ce temps d\'échange était essentiel pour définir les fonctionnalités clés de l\'application et cerner les contraintes pédagogiques et organisationnelles. Le cahier des charges a été co-construit, ce qui a permis d\'affiner le projet au fil des discussions.'
        },
        {
          subtitle: 'Veille concurrentielle',
          content: 'Avant toute création, j\'ai mené une recherche approfondie pour mieux comprendre les enjeux UX spécifiques à ce type d\'outil : parcours utilisateur pédagogique, suivi de formation, alertes et rappels automatisés. Cette étape a inclus une veille concurrentielle afin d\'étudier des applications similaires et repérer les bonnes pratiques UX/UI.'
        },
        {
          subtitle: 'Idéation & Solutions testées',
          content: 'Plusieurs itérations de prototypes ont été réalisées sur Figma, testées avec la cliente pour valider les choix d\'interface et de navigation. L\'approche itérative a permis d\'affiner progressivement l\'expérience utilisateur en tenant compte des retours.'
        },
        {
          subtitle: 'Tests & itérations',
          content: 'Parallèlement, nous avons évalué avec l\'équipe de développement les technologies adaptées, en veillant à la faisabilité technique et au respect du budget. Les tests utilisateurs ont permis d\'identifier et corriger les points de friction.'
        }
      ]
    },
    
    // 5. Wireframes
    wireframes: {
      title: 'Wireframes & Prototype',
      items: [
        {
          image: '/images/261061ca92433cd63b52fe7f2093041e9d831bbc.png',
          description: 'Ce wireframe présente l\'architecture globale de l\'application avec la navigation principale et les fonctionnalités clés de gestion. La structure a été pensée pour faciliter l\'accès rapide aux informations essentielles.'
        }
      ]
    },
    
    // 6. Design System
    designSystem: {
      colorPalette: {
        title: 'Palette colorimétrique',
        description: 'Pour le projet Playdago, nous avons défini une palette dynamique et contrastée, en cohérence avec les valeurs de pédagogie active. L\'objectif était de renforcer l\'identité visuelle tout en garantissant une bonne lisibilité et une hiérarchisation claire de l\'information sur l\'interface.',
        categories: {
          neutrals: {
            title: 'Neutrals (pour les surfaces et textes)',
            colors: [
              { role: 'Surface principale', token: 'surface.primary', color: '#F1F3F4', usage: 'Background app' },
              { role: 'Surface secondaire', token: 'surface.secondary', color: '#DCE3EB', usage: 'Cartes, hover' },
              { role: 'Surface surélevée', token: 'surface.elevation', color: '#FFFFFF', usage: 'Modale, carte + ombre' },
              { role: 'Bordure', token: 'border.default', color: '#DCDCDD', usage: 'Séparateurs' },
              { role: 'Texte principal', token: 'text.primary', color: '#1C1C1C', usage: 'Titre, texte' },
              { role: 'Texte secondaire', token: 'text.secondary', color: '#4D4D4D', usage: 'Labels, sous-titres' },
              { role: 'Texte inversé', token: 'text.onPrimary', color: '#FFFFFF', usage: 'Texte sur bouton coloré' }
            ]
          },
          primary: {
            title: 'Primary (action principale)',
            colors: [
              { role: 'Primaire', token: 'primary.base', color: '#007D9F' },
              { role: 'Hover', token: 'primary.hover', color: '#00647E' },
              { role: 'Pressed', token: 'primary.pressed', color: '#004E63' },
              { role: 'Texte sur bouton', token: 'text.onPrimary', color: '#FFFFFF' }
            ]
          },
          secondary: {
            title: 'Secondary (action secondaire ou highlight)',
            colors: [
              { role: 'Secondaire', token: 'secondary.base', color: '#F07F00' },
              { role: 'Hover', token: 'secondary.hover', color: '#D86F00' },
              { role: 'Texte sur bouton', token: 'text.onSecondary', color: '#FFFFFF' }
            ]
          },
          accent: {
            title: 'Accent / Warning / Highlight',
            colors: [
              { role: 'Accent', token: 'accent.warning', color: '#D8DA00' },
              { role: 'Texte sur accent', token: 'text.onAccent', color: '#1C1C1C' }
            ]
          },
          error: {
            title: 'Error / Danger',
            colors: [
              { role: 'Erreur', token: 'error.base', color: '#ED6C77' },
              { role: 'Hover', token: 'error.hover', color: '#CC525C' },
              { role: 'Texte sur erreur', token: 'text.onError', color: '#FFFFFF' }
            ]
          }
        }
      },
      typography: {
        title: 'Système typographique',
        description: 'Le système typographique a été construit autour d\'une échelle hiérarchique fine, allant de H1 (32 px) à H9 (13 px), avec un interlignage constant de 150 % pour assurer la lisibilité. J\'ai appliqué une logique modulaire en nommant chaque style selon sa fonction, ce qui a permis d\'optimiser leur réutilisabilité dans une approche Atomic Design. L\'ensemble repose sur la police Inter Variable, utilisée exclusivement dans différentes graisses pour structurer l\'interface.',
        items: [
          { style: 'H1', font: 'Inter variable', size: '32', lineHeight: '150% → 48px' },
          { style: 'H2', font: 'Inter variable', size: '29', lineHeight: '150% → 43.5px' },
          { style: 'H3', font: 'Inter variable', size: '26', lineHeight: '150% → 39px' },
          { style: 'H4', font: 'Inter variable', size: '23', lineHeight: '150% → 34.5px' },
          { style: 'H5', font: 'Inter variable', size: '20', lineHeight: '150% → 30px' },
          { style: 'H6', font: 'Inter variable', size: '18', lineHeight: '150% → 27px' },
          { style: 'p', font: 'Inter', size: '16', lineHeight: 'Auto' },
          { style: 'span', font: 'Inter', size: '14', lineHeight: 'Auto' },
          { style: 'label', font: 'Inter', size: '14', lineHeight: 'Auto' }
        ]
      }
    },
    
    // 7. Implémentation & Technologies
    implementation: {
      title: 'Développement & Stack',
      technologies: ['React', 'TypeScript', 'Figma', 'Design System', 'Atomic Design'],
      architecture: 'Organisation du code en composants réutilisables suivant l\'approche Atomic Design. Utilisation de Figma pour la conception et prototypage interactif avec handoff développeur.'
    },
    
    // 8. Impacts & Résultats
    results: {
      title: 'Résultats & Retours',
      metrics: [
        { label: 'Gain de temps', value: '40% sur la gestion quotidienne' },
        { label: 'Satisfaction client', value: 'Très satisfait' },
        { label: 'Durée du projet', value: '9 mois' }
      ],
      feedback: 'La cliente a souligné la clarté de l\'interface et la facilité d\'utilisation. La centralisation a permis de réduire significativement le temps passé sur les tâches administratives quotidiennes.',
      improvements: 'Possibilité d\'ajouter des fonctionnalités de reporting avancé et d\'automatisation plus poussée des rappels dans une future version.'
    },
    
    // 9. Conclusion
    conclusion: {
      title: 'Conclusion & Pistes d\'évolution',
      content: 'Ce projet a démontré l\'importance d\'une approche centrée utilisateur et d\'une collaboration étroite avec le client. L\'application répond aux besoins identifiés et offre une base solide pour des évolutions futures.',
      nextSteps: [
        'Déploiement en production prévu pour Q1 2025',
        'Formation des utilisateurs finaux',
        'Collecte de feedback pour itérations futures',
        'Ajout de nouvelles fonctionnalités basées sur les retours terrain'
      ]
    },
    
    // Métadonnées
    year: '2024',
    image: '/images/261061ca92433cd63b52fe7f2093041e9d831bbc.png',
    skills: ['UX Research', 'Design system', 'UI', 'Branding', 'Figma', 'React js'],
    duration: '9 mois',
    type: 'Application web',
    team: [
      'Anthony Merault, Directeur Artistique / Concepteur ux/ui',
      'Josian (dev back-end)',
      'Bertolde (dev front-end)'
    ]
  },
  'Pedaboard': {
    // 1. Titre principal
    title: 'Pedaboard',
    subtitle: 'CRM pour la pédagogie active',
    badges: ['UX/UI', '2025', 'CRM'],
    
    // 2. Résumé / Introduction
    summary: 'Création d\'un CRM personnalisé pour centraliser la gestion des clients, newsletters et commandes. Réalisé en 9 mois pour une experte en pédagogie active, rôle de Directeur Artistique et Concepteur UX/UI.',
    
    // 3. Contexte & Problématique
    context: {
      title: 'Contexte & Problématique',
      content: 'Ce projet a été réalisé pour une cliente experte en pédagogie active. Elle utilisait plusieurs plateformes distinctes pour gérer ses bases de données, ses newsletters et ses commandes, ce qui rendait la gestion complexe et fragmentée. Son objectif était de centraliser toutes ses données dans une interface unique, Pedaboard, pour avoir une vue d\'ensemble claire et optimiser le suivi des clients.'
    },
    
    // 4. Contexte & Problématique
    contextProblem: {
      title: 'Contexte & Problématique',
      content: 'Ce projet a été réalisé pour une cliente experte en pédagogie active. Elle utilisait plusieurs plateformes distinctes pour gérer ses bases de données, ses newsletters et ses commandes, ce qui rendait la gestion complexe et fragmentée. Son objectif était de centraliser toutes ses données dans une interface unique, Pedaboard, pour avoir une vue d\'ensemble claire et optimiser le suivi des clients.'
    },
    
    // 5. Démarche & Approche
    approach: {
      title: 'Démarche UX/UI',
      sections: [
        {
          subtitle: 'Recherche utilisateur',
          content: 'Rendez-vous initial pour comprendre les besoins précis et définir les fonctionnalités clés du CRM. Le cahier des charges a été co-construit pour cerner les contraintes pédagogiques et organisationnelles.'
        },
        {
          subtitle: 'Veille concurrentielle',
          content: 'Recherche approfondie sur les enjeux UX des outils de gestion pédagogique. Étude de CRM similaires pour repérer les bonnes pratiques UX/UI et les adapter au contexte spécifique.'
        },
        {
          subtitle: 'Tests & itérations',
          content: 'Évaluation technique avec l\'équipe de développement pour valider la faisabilité et respecter le budget. Plusieurs itérations de prototypes et tests utilisateurs.'
        }
      ]
    },
    
    // 5. Wireframes
    wireframes: {
      title: 'Wireframes & Prototype',
      items: [
        {
          image: '/images/f27446bbc5c96f74d44074bc97b9be64f7cdf4cf.png',
          description: 'Architecture globale du CRM avec les modules de gestion des clients, formations et tâches. Interface pensée pour une navigation intuitive et un accès rapide aux fonctionnalités principales.'
        }
      ]
    },
    
    // 6. Design System
    designSystem: {
      colorPalette: {
        title: 'Palette colorimétrique',
        description: 'Une palette professionnelle et apaisante, adaptée à un outil de gestion quotidien. Les couleurs ont été choisies pour garantir lisibilité et hiérarchie visuelle claire.',
        categories: {
          neutrals: {
            title: 'Neutrals (pour les surfaces et textes)',
            colors: [
              { role: 'Surface principale', token: 'surface.primary', color: '#F1F3F4', usage: 'Background app' },
              { role: 'Surface secondaire', token: 'surface.secondary', color: '#DCE3EB', usage: 'Cartes, hover' },
              { role: 'Surface surélevée', token: 'surface.elevation', color: '#FFFFFF', usage: 'Modale, carte + ombre' },
              { role: 'Bordure', token: 'border.default', color: '#DCDCDD', usage: 'Séparateurs' },
              { role: 'Texte principal', token: 'text.primary', color: '#1C1C1C', usage: 'Titre, texte' },
              { role: 'Texte secondaire', token: 'text.secondary', color: '#4D4D4D', usage: 'Labels, sous-titres' },
              { role: 'Texte inversé', token: 'text.onPrimary', color: '#FFFFFF', usage: 'Texte sur bouton coloré' }
            ]
          },
          primary: {
            title: 'Primary (action principale)',
            colors: [
              { role: 'Primaire', token: 'primary.base', color: '#007D9F' },
              { role: 'Hover', token: 'primary.hover', color: '#00647E' },
              { role: 'Pressed', token: 'primary.pressed', color: '#004E63' },
              { role: 'Texte sur bouton', token: 'text.onPrimary', color: '#FFFFFF' }
            ]
          },
          secondary: {
            title: 'Secondary (action secondaire ou highlight)',
            colors: [
              { role: 'Secondaire', token: 'secondary.base', color: '#F07F00' },
              { role: 'Hover', token: 'secondary.hover', color: '#D86F00' },
              { role: 'Texte sur bouton', token: 'text.onSecondary', color: '#FFFFFF' }
            ]
          },
          accent: {
            title: 'Accent / Warning / Highlight',
            colors: [
              { role: 'Accent', token: 'accent.warning', color: '#D8DA00' },
              { role: 'Texte sur accent', token: 'text.onAccent', color: '#1C1C1C' }
            ]
          },
          error: {
            title: 'Error / Danger',
            colors: [
              { role: 'Erreur', token: 'error.base', color: '#ED6C77' },
              { role: 'Hover', token: 'error.hover', color: '#CC525C' },
              { role: 'Texte sur erreur', token: 'text.onError', color: '#FFFFFF' }
            ]
          }
        }
      },
      typography: {
        title: 'Système typographique',
        description: 'Le système typographique a été construit autour d\'une échelle hiérarchique fine, allant de H1 (32 px) à H9 (13 px), avec un interlignage constant de 150 % pour assurer la lisibilité. Logique modulaire avec approche Atomic Design. Police Inter Variable pour structurer l\'interface.',
        items: [
          { style: 'H1', font: 'Inter variable', size: '32', lineHeight: '150% → 48px' },
          { style: 'H2', font: 'Inter variable', size: '29', lineHeight: '150% → 43.5px' },
          { style: 'H3', font: 'Inter variable', size: '26', lineHeight: '150% → 39px' },
          { style: 'H4', font: 'Inter variable', size: '23', lineHeight: '150% → 34.5px' },
          { style: 'H5', font: 'Inter variable', size: '20', lineHeight: '150% → 30px' },
          { style: 'H6', font: 'Inter variable', size: '18', lineHeight: '150% → 27px' },
          { style: 'p', font: 'Inter', size: '16', lineHeight: 'Auto' },
          { style: 'span', font: 'Inter', size: '14', lineHeight: 'Auto' },
          { style: 'label', font: 'Inter', size: '14', lineHeight: 'Auto' }
        ]
      }
    },
    
    // 7. Implémentation & Technologies
    implementation: {
      title: 'Développement & Stack',
      technologies: ['React', 'Node.js', 'TypeScript', 'Figma', 'PostgreSQL'],
      architecture: 'Architecture full-stack avec séparation frontend/backend. Utilisation d\'un design system pour garantir la cohérence visuelle. Déploiement sur serveur dédié avec pipeline CI/CD.'
    },
    
    // 8. Impacts & Résultats
    results: {
      title: 'Résultats & Retours',
      metrics: [
        { label: 'Temps gagné', value: '35% sur gestion quotidienne' },
        { label: 'Taux de satisfaction', value: '95%' },
        { label: 'Réduction d\'outils', value: 'De 5 à 1 plateforme' }
      ],
      feedback: 'La cliente est ravie de la centralisation qui simplifie grandement son travail quotidien. Les rappels automatiques et la vue d\'ensemble ont été particulièrement appréciés.',
      improvements: 'Intégration future avec d\'autres outils métiers et ajout de fonctionnalités d\'analytics avancées.'
    },
    
    // 9. Conclusion
    conclusion: {
      title: 'Conclusion',
      content: 'Pedaboard a été un projet clé dans mon parcours, à la fois exigeant et formateur. En tant que Product Designer et Directeur Artistique, j\'ai pu aller bien au-delà du design d\'interface classique : j\'ai structuré une expérience produit complète, réfléchi à la cohérence entre les espaces fonctionnels et accompagné l\'équipe tout au long du processus de conception.\n\nCe projet m\'a permis de consolider mes bases en UX design, d\'approfondir ma compréhension des systèmes complexes et de renforcer ma capacité à faire le lien entre besoins utilisateurs, contraintes techniques et vision produit.\n\nMême si certaines parties n\'ont pas pu être testées avec des utilisateurs, Pedaboard reste pour moi une expérience déterminante, celle où j\'ai vraiment pris conscience de mon rôle de designer produit : créer du sens, simplifier la complexité et concevoir des solutions utiles.',
      nextSteps: [
        'Ajout d\'un module de facturation intégré',
        'Développement d\'une application mobile companion',
        'Intégration avec les outils de mailing existants',
        'Amélioration des rapports et statistiques'
      ]
    },
    
    // Métadonnées
    year: '2025',
    image: '/images/f27446bbc5c96f74d44074bc97b9be64f7cdf4cf.png',
    skills: ['UX Research', 'Design system', 'UI', 'Branding', 'Figma', 'React js'],
    duration: '9 mois',
    type: 'Application web - CRM',
    team: [
      'Anthony Merault, Directeur Artistique / Concepteur ux/ui',
      'Josian (dev back-end)',
      'Bertolde (dev front-end)'
    ]
  }
};
