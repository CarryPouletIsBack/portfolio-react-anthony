import { utoiProjectData } from './utoiProject';

export interface ProjectData {
  // 1. Titre principal
  title: string;
  subtitle?: string;
  badges?: string[];
  
  // 2. Résumé / Introduction
  summary: string;
  
  /** Objectifs (liste, pour section Contexte du projet Figma) */
  objectifs?: string[];
  /** Note sous le tableau équipe (Figma) */
  teamNote?: string;
  /** Problématique (Figma) */
  problematique?: string;
  /** Solution (Figma) */
  solution?: string;
  /** Audit / Analyse (Figma) */
  auditLead?: string;
  auditBody?: string;
  /** Colonne gauche sous le carrousel audit (si absent : repli sur auditLead) */
  auditLeadAfterCarousel?: string;
  /** Colonne droite sous le carrousel audit (si absent : repli sur auditBody) */
  auditBodyAfterCarousel?: string;
  /** Section Architecture & Flux — 1er paragraphe (optionnel ; sinon libellé global) */
  archLead?: string;
  /** Teaser Design system (2 colonnes) sous l’arbre user flow — ex. Playdago */
  architectureDsDuplicateLead?: string;
  architectureDsDuplicateBody?: string;
  /** 1er paragraphe section « Conception & Itération » (Playdago) — distinct du teaser Design system */
  conceptionDuplicateLead?: string;
  /** H3 + corps sous le lead (Conception uniquement) — si absent, repli sur architectureDsDuplicatePivotH3 / Body */
  conceptionDuplicatePivotH3?: string;
  conceptionDuplicateBody?: string;
  /** H3 au-dessus du 2e paragraphe (bloc Conception dupliqué Playdago uniquement) */
  architectureDsDuplicatePivotH3?: string;
  /** Matrice de positionnement (Figma 97-50) : scatter X=Effort, Y=Valeur */
  positionnementMatrix?: {
    xAxisLabel: string;
    yAxisLabel: string;
    xMinLabel: string;
    xMaxLabel: string;
    yMinLabel: string;
    yMaxLabel: string;
    points: Array<{ name: string; description: string; x: number; y: number }>;
  };
  /** 1er/2e/3e/4e réunion pour Processus détaillé (Figma) */
  processReunions?: Array<{ label: string; title: string; subtitle?: string; description: string }>;
  /** User flow (Figma 100-148) : Organization chart Highcharts */
  userFlow?: {
    title?: string;
    nodes: Array<{ id: string; name?: string; title?: string }>;
    links: Array<{ from: string; to: string }>;
  };
  
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
  /** URL du projet (site en ligne) – ouvre dans un nouvel onglet */
  projectUrl?: string;

  /** Traductions EN (optionnel) */
  translations?: {
    en?: {
      subtitle?: string;
      summary?: string;
      team?: string[];
      objectifs?: string[];
      teamNote?: string;
      problematique?: string;
      solution?: string;
      auditLead?: string;
      auditBody?: string;
      auditLeadAfterCarousel?: string;
      auditBodyAfterCarousel?: string;
      archLead?: string;
      architectureDsDuplicateLead?: string;
      architectureDsDuplicateBody?: string;
      architectureDsDuplicatePivotH3?: string;
      conceptionDuplicateLead?: string;
      conceptionDuplicatePivotH3?: string;
      conceptionDuplicateBody?: string;
      year?: string;
      /** Neutrals palette: role + usage par index */
      designSystemNeutrals?: Array<{ role: string; usage: string }>;
      /** Matrice de positionnement */
      positionnementMatrix?: {
        xAxisLabel: string;
        yAxisLabel: string;
        xMinLabel: string;
        xMaxLabel: string;
        yMinLabel: string;
        yMaxLabel: string;
        points: Array<{ name: string; description: string; x: number; y: number }>;
      };
      /** Processus détaillé */
      processReunions?: Array<{ label: string; title: string; subtitle?: string; description: string }>;
      /** User flow */
      userFlow?: {
        title?: string;
        nodes: Array<{ id: string; name?: string; title?: string }>;
        links: Array<{ from: string; to: string }>;
      };
    };
  };
}

const playdagoProjectBase: ProjectData = {
    // 1. Titre principal
    title: 'Playdago',
    subtitle: 'Application de pédagogie active',
    badges: ['UX/UI', '2025', 'SaaS', 'Application'],
    
    // 2. Résumé / Introduction (aligné Figma 49-229, adapté Playdago)
    summary: 'PlayDaGo a été créé pour répondre à une demande spécifique, comment organiser et concevoir des ateliers ludiques (cartes, dés, matching) à distance.\n\nLe défi n\u2019était pas seulement de digitaliser l\'ensemble du processus, mais de retranscrire le côté\u00A0sensoriel\u00A0des ateliers en\u00A0présentiel. De la création du groupe jusqu\'au suivi des résultats après l\'atelier.',

    // Contexte du projet (Figma)
    objectifs: [
      'Améliorer l\'interaction en temps réel : Offrir une expérience fluide en direct pour les formateurs et les apprenants.',
      'Maintenir l\'engagement : Reproduire les mécanismes de jeu en présentiel sans la complexité des outils cognitivement lourds.',
      'Un suivi : Offrir aux formateurs la possibilité d\'effectuer un suivi approfondi des données.'
    ],

    teamNote: 'En tant que seul designer, j\'ai dû assimiler les principes de la gamification (analyse de Kahoot, jeux de cartes physiques) pour les transposer en interfaces numériques. J\'ai également étendu l\'identité visuelle de la cliente en créant un logo et en ajustant la palette de couleurs.',
    
    // 3. Contexte & Problématique
    context: {
      title: 'Contexte & Problématique',
      content: 'PlayDaGo a été créé pour répondre à une demande spécifique, comment organiser et concevoir des ateliers ludiques (cartes, dés, matching) à distance.\n\nLe défi n\u2019était pas seulement de digitaliser l\'ensemble du processus, mais de retranscrire le côté\u00A0sensoriel\u00A0des ateliers en\u00A0présentiel. De la création du groupe jusqu\'au suivi des résultats après l\'atelier.'
    },

    // 4. Problématique / Solution
    problematique: 'La cliente utilisait plusieurs plateformes distinctes, pour animer ces différents ateliers. De plus, les outils existants ne permettaient pas une personnalisation suffisante des dés, cartes et supports utilisés lors des séances. La problématique : comment fusionner plusieurs plateformes en une seule application intuitive et pédagogique ?',
    solution: 'Concevoir une plateforme unique permettant de centraliser l\'animation des ateliers. L\'outil offre la possibilité de créer et de personnaliser les dés, cartes et supports pédagogiques, afin de s\'adapter aux besoins spécifiques de chaque séance et de simplifier leur animation.',
    auditLead:
      "J'ai commencé l'analyse du projet à partir de Wooclap, un outil déjà utilisé par Cyrielle dans certains contextes de formation. Wooclap m'a servi de référence pour sa capacité à s'intégrer facilement dans un temps de formation existant et à engager les apprenants sans complexifier l'animation. Cette approche a confirmé l'importance de concevoir un outil qui accompagne le formateur, plutôt que de structurer la session à sa place.",

    auditBody: `À partir de ce constat, j'ai orienté PlayDaGo vers un positionnement différent. Je me suis inspiré de la simplicité d'activation et de l'intégration fluide de Wooclap, tout en cherchant à dépasser ses limites par une personnalisation complète des contenus et des règles d'atelier. La création et l'édition des cartes, des decks et des mécaniques sont devenues des éléments centraux du produit. Cette analyse a rapidement mis en évidence une limite majeure pour le projet. Les formats proposés par Wooclap sont prédéfinis et offrent peu de possibilités de personnalisation.`,

    auditLeadAfterCarousel: `Cette analyse a rapidement mis en évidence une limite majeure pour le projet. Les formats proposés par Wooclap sont prédéfinis et offrent peu de possibilités de personnalisation. Or, la pédagogie de Cyrielle repose sur des supports conçus sur mesure — cartes, dés et mécaniques spécifiques — qui constituent le cœur de sa méthode. Ne pas pouvoir adapter ces supports revenait à perdre l'identité même de son approche pédagogique.`,

    auditBodyAfterCarousel: `J'ai également étudié Kahoot, dont le positionnement très orienté jeu et la logique de session événementielle ont permis de clarifier ce que PlayDaGo ne devait pas être. L'importance accordée au code PIN et au rythme imposé par l'outil se sont révélés peu adaptés à des formations structurées et progressives. Ce travail de benchmark m'a permis de définir un positionnement clair pour PlayDaGo : un outil pensé pour les formateurs, qui combine simplicité d'usage et contrôle total sur les supports pédagogiques, afin de prolonger des pratiques existantes plutôt que de les contraindre.`,

    archLead:
      "La base de l'architecture repose sur une distinction stricte des rôles afin d'éviter toute confusion. Cela garantit une clarté organisationnelle essentielle pour la bonne exécution des tâches et la coordination efficace des équipes.",

    architectureDsDuplicateLead: `L'interface a été conçue pour se fondre au service de l'interaction pédagogique.

Afin d'assurer cette neutralité, j'ai développé un système de design basé sur Material Design.`,

    conceptionDuplicateLead: `La conception de l'interface de création d'atelier ("Builder") a posé le défi ergonomique principal du projet. Il a été nécessaire de gérer une densité d'interactions importantes : ajustement précis des cartes (couleurs, polices, découpage), configuration du déroulement et ajout d'actions interstitielles (vidéo, diapositive) entre les étapes du jeu.`,

    conceptionDuplicatePivotH3: 'Architecture & Chronologie',

    conceptionDuplicateBody: `Dans les premières itérations, je me suis inspiré du modèle mental de Canva pour maximiser l'espace de travail. J'ai divisé l'écran en trois zones :
Le Canvas Central : Pour l'édition visuelle des cartes.
La Chronologie Inférieure : Pour visualiser le séquençage linéaire de l'atelier (lecture de gauche à droite) et insérer les médias.
Le Panneau Latéral (Droite) : Pour regrouper les paramètres optionnels et les métadonnées, évitant ainsi la surcharge cognitive.

Bien que conforme au cahier des charges initial, cette structure a ensuite évolué pour inclure des étapes de validation (Monitoring), offrant au formateur un contrôle plus détaillé sur la qualité de son atelier avant le lancement.`,

    architectureDsDuplicateBody: `Palette Neutre : Des teintes désaturées ont été choisies pour minimiser la fatigue oculaire lors des sessions longues.

Hiérarchie des Surfaces : Un système composé de 4 niveaux (Arrière-plan, Base, Secondaire, Superposition) pour gérer la densité d'information.

Grille 4pt : Une structure à la fois dense et aérée, essentielle pour organiser les nombreux éléments interactifs (cartes, jetons) sur un même écran.`,

    architectureDsDuplicatePivotH3: 'Rationalisation et pivot technique',

    positionnementMatrix: {
      axisHorizontalPrefix: 'Axe X (Horizontal) ',
      axisVerticalPrefix: 'Axe Y (Vertical) ',
      xAxisLabel: 'Personnalisation',
      yAxisLabel: 'Niveau d\'Interaction',
      xMinLabel: 'Faible',
      xMaxLabel: 'Élevé',
      yMinLabel: 'Faible',
      yMaxLabel: 'Élevé',
      points: [
        { name: 'Brevo', description: 'liste de client (société, date d\'anniversaire, contact) etc.', x: -6, y: 6 },
        { name: 'Formation', description: 'personne ayant souscrit a un atelier', x: 6, y: 6 },
        { name: 'Woocommerce', description: 'vente de produit et de service', x: -6, y: -6 },
        { name: 'Notion', description: 'liste de tâches à réaliser', x: 6, y: -6 },
      ],
    },

    /** Flux utilisateur (arbre #userflow-tree — section Architecture & Flux). Référence UX pour tous les arbres du site ; alignement des autres arbres à prévoir ultérieurement. */
    userFlow: {
      title: 'User flow',
      nodes: [
        { id: 'login', name: 'Authentification' },
        { id: 'dashboard', name: 'Tableau de bord' },
        { id: 'compte', name: 'Ateliers' },
        { id: 'matching', name: 'Matching' },
        { id: 'lancer-des', name: 'Lancer de dés' },
        { id: 'jeux-lettres', name: 'Jeux de lettres' },
        { id: 'ateliers', name: 'Groupes' },
        { id: 'creation', name: 'Librairie' },
        { id: 'session', name: 'Administration' },
        { id: 'suivi', name: 'Statistiques' },
        { id: 'detail-atelier', name: 'Groupe/detail' },
        { id: 'config', name: 'Librairie/DetailAtelier' },
      ],
      links: [
        { from: 'login', to: 'dashboard' },
        { from: 'dashboard', to: 'compte' },
        { from: 'dashboard', to: 'ateliers' },
        { from: 'dashboard', to: 'creation' },
        { from: 'dashboard', to: 'session' },
        { from: 'dashboard', to: 'suivi' },
        { from: 'compte', to: 'matching' },
        { from: 'compte', to: 'lancer-des' },
        { from: 'compte', to: 'jeux-lettres' },
        { from: 'ateliers', to: 'detail-atelier' },
        { from: 'creation', to: 'config' },
      ],
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
          image: '',
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
    year: '2025',
    image: '/images/cover-project-playdago.png',
    skills: ['UX Research', 'Design system', 'UI', 'Branding', 'Figma', 'React js'],
    duration: '9 mois',
    type: 'Application web',
    team: [
      'Anthony Merault, Product Designer | Building Complex SaaS & Design Systems',
      'Frédéric Isambert, Chef de projet',
      'Nicola Bègue, developpeur front',
      'Evan Rivière, developpeur back'
    ],
    translations: {
      en: {
        subtitle: 'Active pedagogy application',
        summary: 'PlayDaGo was created to address a specific need, how to organize and design playful workshops (cards, dice, matching) remotely.\n\nThe challenge was not only to digitize the entire process, but to convey the sensory side of in-person workshops. From group creation through to follow-up on results after the workshop.',
        objectifs: [
          'Improve real-time interaction: Offer a fluid live experience for trainers and learners.',
          'Maintain engagement: Reproduce in-person game mechanics without the complexity of cognitively heavy tools.',
          'Tracking: Give trainers the ability to perform in-depth data tracking.'
        ],

        problematique: 'The client used several separate platforms to run these different workshops. In addition, existing tools did not allow enough customization of the dice, cards and materials used during the sessions. The issue was: how to merge several platforms into a single intuitive, educational application?',
        solution: 'Design a single platform to centralize workshop facilitation. The tool makes it possible to create and customize dice, cards and learning materials, so they can be adapted to the specific needs of each session and make facilitation easier.',

        teamNote: 'As the sole designer, I had to absorb gamification principles (analysis of Kahoot, physical card games) to transpose them into digital interfaces. I also extended the client\'s visual identity by creating a logo and adjusting the color palette.',

        positionnementMatrix: {
          axisHorizontalPrefix: 'X Axis (Horizontal) ',
          axisVerticalPrefix: 'Y Axis (Vertical) ',
          xAxisLabel: 'Personalization',
          yAxisLabel: 'Interaction Level',
          xMinLabel: 'Low',
          xMaxLabel: 'High',
          yMinLabel: 'Low',
          yMaxLabel: 'High',
          points: [
            { name: 'Brevo', description: 'client list (company, birth date, contact) etc.', x: -6, y: 6 },
            { name: 'Formation', description: 'person who signed up for a workshop', x: 6, y: 6 },
            { name: 'Woocommerce', description: 'product and service sales', x: -6, y: -6 },
            { name: 'Notion', description: 'task list to complete', x: 6, y: -6 },
          ],
        },
        auditLead:
          'I began analyzing the project with Wooclap, a tool already used by Cyrielle in some training contexts. Wooclap served as a reference for its ability to integrate easily into an existing training time slot and to engage learners without complicating facilitation. This approach confirmed the importance of designing a tool that supports the facilitator, rather than structuring the session for them.',

        auditBody: `From this finding, I steered PlayDaGo toward a different positioning. I drew inspiration from Wooclap's ease of activation and smooth integration, while aiming to go beyond its limits through full customization of content and workshop rules. Creating and editing cards, decks and mechanics became central to the product. This analysis quickly revealed a major limitation for the project. The formats offered by Wooclap are predefined and allow little customization.`,

        auditLeadAfterCarousel: `This analysis quickly revealed a major limitation for the project. The formats offered by Wooclap are predefined and allow little customization. Yet Cyrielle's pedagogy relies on tailor-made materials—cards, dice and specific mechanics—that are at the heart of her method. Being unable to adapt these materials meant losing the very identity of her pedagogical approach.`,

        auditBodyAfterCarousel: `I also studied Kahoot, whose strongly game-oriented positioning and event-style session logic helped clarify what PlayDaGo should not be. The emphasis on PIN codes and the pace imposed by the tool proved poorly suited to structured, progressive training. This benchmarking work allowed me to define a clear positioning for PlayDaGo: a tool designed for trainers that combines ease of use and full control over learning materials, to extend existing practices rather than constraining them.`,

        archLead:
          'The foundation of the architecture relies on a strict distinction of roles to avoid any confusion. This ensures organizational clarity that is essential for proper task execution and effective team coordination.',

        architectureDsDuplicateLead: `The interface was designed to recede in service of pedagogical interaction.

To ensure this neutrality, I developed a design system based on Material Design.`,

        architectureDsDuplicateBody: `Neutral palette: Desaturated tones were chosen to minimize eye strain during long sessions.

Surface hierarchy: A system of four levels (Background, Base, Secondary, Overlay) to manage information density.

4pt grid: A structure that is both dense and airy, essential for organizing the many interactive elements (cards, tokens) on a single screen.`,

        architectureDsDuplicatePivotH3: 'Rationalization and technical pivot',

        conceptionDuplicateLead: `The workshop creation interface ("Builder") posed the project's main ergonomic challenge. We had to manage a high density of interactions: precise adjustment of cards (colors, fonts, cropping), flow configuration, and adding interstitial actions (video, slide) between game steps.`,

        conceptionDuplicatePivotH3: 'Architecture & chronology',

        conceptionDuplicateBody: `In the early iterations, I drew inspiration from Canva's mental model to maximize workspace. I divided the screen into three zones:
Central canvas: For visual editing of cards.
Lower timeline: To visualize the linear sequencing of the workshop (left-to-right reading) and insert media.
Right side panel: To group optional settings and metadata, avoiding cognitive overload.

Although aligned with the initial specification, this structure later evolved to include validation steps (Monitoring), giving the facilitator more detailed control over the quality of their workshop before launch.`,

        userFlow: {
          title: 'User flow',
          nodes: [
            { id: 'login', name: 'Authentication' },
            { id: 'dashboard', name: 'Dashboard' },
            { id: 'compte', name: 'Workshops' },
            { id: 'matching', name: 'Matching' },
            { id: 'lancer-des', name: 'Dice roll' },
            { id: 'jeux-lettres', name: 'Letter games' },
            { id: 'ateliers', name: 'Groups' },
            { id: 'creation', name: 'Library' },
            { id: 'session', name: 'Administration' },
            { id: 'suivi', name: 'Statistics' },
            { id: 'detail-atelier', name: 'Group/detail' },
            { id: 'config', name: 'Library/DetailAtelier' },
          ],
          links: [
            { from: 'login', to: 'dashboard' },
            { from: 'dashboard', to: 'compte' },
            { from: 'dashboard', to: 'ateliers' },
            { from: 'dashboard', to: 'creation' },
            { from: 'dashboard', to: 'session' },
            { from: 'dashboard', to: 'suivi' },
            { from: 'compte', to: 'matching' },
            { from: 'compte', to: 'lancer-des' },
            { from: 'compte', to: 'jeux-lettres' },
            { from: 'ateliers', to: 'detail-atelier' },
            { from: 'creation', to: 'config' },
          ],
        },

        team: [
          'Anthony Merault, Product Designer | Building Complex SaaS & Design Systems',
          'Frédéric Isambert, Project manager',
          'Nicola Bègue, Front-end developer',
          'Evan Rivière, Back-end developer'
        ],
        designSystemNeutrals: [
          { role: 'Main surface', usage: 'Background app' },
          { role: 'Secondary surface', usage: 'Cards, hover' },
          { role: 'Elevated surface', usage: 'Modal, card + shadow' },
          { role: 'Border', usage: 'Separators' },
          { role: 'Main text', usage: 'Title, text' },
          { role: 'Secondary text', usage: 'Labels, subtitles' },
          { role: 'Inverted text', usage: 'Text on colored button' }
        ]
      }
    }
};

export const projectsDataNew: { [key: string]: ProjectData } = {
  Playdago: playdagoProjectBase,
  UTOI: utoiProjectData,
  Pedaboard: {
    // 1. Titre principal
    title: 'Pedaboard',
    badges: ['Application', 'UX/UI', '2025', 'CRM'],
    
    // 2. Résumé / Introduction (contenu Figma node 49-229)
    summary: 'Pedaboard est un outil interne de gestion et de pilotage conçu pour une professionnelle de la pédagogie active. Le projet part d\'un besoin clair : centraliser des données aujourd\'hui éparpillées sur plusieurs plateformes (base clients, formations, commandes, newsletter, rappels, événements), afin d\'obtenir une vue d\'ensemble fiable, réduire la charge mentale et améliorer le suivi des activités. L\'objectif n\'était pas de remplacer les outils existants (emailing, e-commerce, etc.), mais de créer une interface centrale de lecture, de suivi et de rappel, capable de relier toutes les informations clés autour d\'un même client.',
    
    // Contexte du projet (Figma)
    objectifs: [
      'Améliorer l\'interaction en temps réel : Offrir une expérience fluide en direct pour les formateurs et les apprenants.',
      'Maintenir l\'engagement : Reproduire les mécanismes de jeu en présentiel sans la complexité des outils cognitivement lourds.',
      'Un suivi : Offrir aux formateurs la possibilité d\'effectuer un suivi approfondi des données.'
    ],
    teamNote: 'En tant que seul designer, j\'ai dû assimiler les principes de la gamification (analyse de Kahoot, jeux de cartes physiques) pour les transposer en interfaces numériques. J\'ai également étendu l\'identité visuelle de la cliente en créant un logo et en ajustant la palette de couleurs.',
    problematique: 'Trop de plateformes pour gérer l\'activité, résultat perte de temps et d\'attention.',
    solution: 'Le produit devra pouvoir afficher toutes les informations utiles de chaque plateforme différente pour optimiser le temps et éliminer la perte d\'attention du client.',
    positionnementMatrix: {
      xAxisLabel: 'Effort',
      yAxisLabel: 'Valeur',
      xMinLabel: 'Faible',
      xMaxLabel: 'Élevé',
      yMinLabel: 'Faible',
      yMaxLabel: 'Élevé',
      points: [
        { name: 'Brevo', description: 'liste de client (société, date d\'anniversaire, contact) etc.', x: -6, y: 6 },
        { name: 'Formation', description: 'personne ayant souscrit a un atelier', x: 6, y: 6 },
        { name: 'Woocommerce', description: 'vente de produit et de service', x: -6, y: -6 },
        { name: 'Notion', description: 'liste de tâches à réaliser', x: 6, y: -6 },
      ],
    },
    processReunions: [
      { label: '1er réunion', title: 'Audit', description: 'Découverte des outils existants, des plateformes utilisées et des difficultés rencontrées au quotidien. La cliente expliquait comment ses informations étaient dispersées et comment cela compliquait le suivi des clients et la gestion des formations.' },
      { label: '2e réunion', title: 'Cadrage Stratégique', description: 'Co-construction du cahier des charges, en priorisant les fonctionnalités essentielles comme le tableau de bord centralisé, le suivi des formations et les notifications automatiques.' },
      { label: '3e réunion', title: 'Architecture & Flux', description: 'Discussion sur les contraintes pédagogiques et organisationnelles, définition des parcours utilisateurs principaux et validation des workflows critiques.' },
      { label: '4e réunion', title: 'Validation', description: 'Validation des premières maquettes conceptuelles et recueil des retours détaillés sur l\'expérience et la hiérarchie de l\'information. Cette phase a permis de cerner précisément les besoins fonctionnels et UX.' }
    ],
    userFlow: {
      title: 'User flow',
      nodes: [
        { id: 'login', name: 'Dashboard' },
        { id: 'contact', name: 'Contact' },
        { id: 'page-taches', name: 'Page Tâches' },
        { id: 'formation', name: 'Formation' },
        { id: 'laboratoire', name: 'Laboratoire' },
        { id: 'mot-de-passe-oublie', name: 'Compte' },
        { id: 'fiche-client', name: 'Fiche client' },
        { id: 'vue-tache', name: 'Vue tâche' },
        { id: 'details-formation', name: 'Détails' },
        { id: 'details-laboratoire', name: 'Détails' },
      ],
      links: [
        { from: 'login', to: 'mot-de-passe-oublie' },
        { from: 'login', to: 'contact' },
        { from: 'login', to: 'page-taches' },
        { from: 'login', to: 'formation' },
        { from: 'login', to: 'laboratoire' },
        { from: 'contact', to: 'fiche-client' },
        { from: 'page-taches', to: 'vue-tache' },
        { from: 'formation', to: 'details-formation' },
        { from: 'laboratoire', to: 'details-laboratoire' },
      ],
    },
    
    // 3. Contexte & Problématique (contenu Figma node 49-229)
    context: {
      title: 'Contexte & Problématique',
      content: 'Pedaboard est un outil interne de gestion et de pilotage conçu pour une professionnelle de la pédagogie active. Le projet part d\'un besoin clair : centraliser des données aujourd\'hui éparpillées sur plusieurs plateformes (base clients, formations, commandes, newsletter, rappels, événements), afin d\'obtenir une vue d\'ensemble fiable, réduire la charge mentale et améliorer le suivi des activités. L\'objectif n\'était pas de remplacer les outils existants (emailing, e-commerce, etc.), mais de créer une interface centrale de lecture, de suivi et de rappel, capable de relier toutes les informations clés autour d\'un même client.'
    },
    
    // 4. Contexte & Problématique
    contextProblem: {
      title: 'Contexte & Problématique',
      content: 'Pedaboard est un outil interne de gestion et de pilotage conçu pour une professionnelle de la pédagogie active. Le projet part d\'un besoin clair : centraliser des données aujourd\'hui éparpillées sur plusieurs plateformes (base clients, formations, commandes, newsletter, rappels, événements), afin d\'obtenir une vue d\'ensemble fiable, réduire la charge mentale et améliorer le suivi des activités. L\'objectif n\'était pas de remplacer les outils existants (emailing, e-commerce, etc.), mais de créer une interface centrale de lecture, de suivi et de rappel, capable de relier toutes les informations clés autour d\'un même client.'
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
      content: 'Pedaboard a été un projet clé dans mon parcours, à la fois exigeant et formateur. En tant que Product Designer | Building Complex SaaS & Design Systems, j\'ai pu aller bien au-delà du design d\'interface classique : j\'ai structuré une expérience produit complète, réfléchi à la cohérence entre les espaces fonctionnels et accompagné l\'équipe tout au long du processus de conception.\n\nCe projet m\'a permis de consolider mes bases en UX design, d\'approfondir ma compréhension des systèmes complexes et de renforcer ma capacité à faire le lien entre besoins utilisateurs, contraintes techniques et vision produit.\n\nMême si certaines parties n\'ont pas pu être testées avec des utilisateurs, Pedaboard reste pour moi une expérience déterminante, celle où j\'ai vraiment pris conscience de mon rôle de designer produit : créer du sens, simplifier la complexité et concevoir des solutions utiles.',
      nextSteps: [
        'Ajout d\'un module de facturation intégré',
        'Développement d\'une application mobile companion',
        'Intégration avec les outils de mailing existants',
        'Amélioration des rapports et statistiques'
      ]
    },
    
    // Métadonnées
    year: 'Décembre 2023',
    image: '/images/f27446bbc5c96f74d44074bc97b9be64f7cdf4cf.png',
    skills: ['UX Research', 'Design system', 'UI', 'Branding', 'Figma', 'React js'],
    duration: '9 mois',
    type: 'Application web - CRM',
    team: [
      'Anthony Merault, Product Designer | Building Complex SaaS & Design Systems',
      'Frédéric Isambert, Chef de projet',
      'Nicola Bègue, Intégrateur',
      'Evan Rivière, Intégrateur'
    ],
    translations: {
      en: {
        summary: 'Pedaboard is an internal management and piloting tool designed for an active pedagogy professional. The project stems from a clear need: to centralize data currently scattered across multiple platforms (client base, training, orders, newsletter, reminders, events), in order to obtain a reliable overview, reduce mental load and improve activity tracking. The goal was not to replace existing tools (emailing, e-commerce, etc.), but to create a central interface for reading, tracking and reminders, capable of linking all key information around the same client.',
        year: 'December 2023',
        objectifs: [
          'Improve real-time interaction: Offer a fluid live experience for trainers and learners.',
          'Maintain engagement: Reproduce in-person game mechanics without the complexity of cognitively heavy tools.',
          'Tracking: Give trainers the ability to perform in-depth data tracking.'
        ],
        teamNote: 'As the sole designer, I had to absorb gamification principles (analysis of Kahoot, physical card games) to transpose them into digital interfaces. I also extended the client\'s visual identity by creating a logo and adjusting the color palette.',
        problematique: 'Too many platforms to manage the activity, resulting in loss of time and attention.',
        solution: 'The product must be able to display all useful information from each different platform to optimize time and eliminate the client\'s loss of attention.',
        positionnementMatrix: {
          xAxisLabel: 'Effort',
          yAxisLabel: 'Value',
          xMinLabel: 'Low',
          xMaxLabel: 'High',
          yMinLabel: 'Low',
          yMaxLabel: 'High',
          points: [
            { name: 'Brevo', description: 'client list (company, birth date, contact) etc.', x: -6, y: 6 },
            { name: 'Formation', description: 'person who signed up for a workshop', x: 6, y: 6 },
            { name: 'Woocommerce', description: 'product and service sales', x: -6, y: -6 },
            { name: 'Notion', description: 'task list to complete', x: 6, y: -6 },
          ],
        },
        processReunions: [
          { label: '1st meeting', title: 'Audit', description: 'Discovery of existing tools, platforms used and daily difficulties. The client explained how her information was scattered and how this complicated client tracking and training management.' },
          { label: '2nd meeting', title: 'Strategic Scoping', description: 'Co-construction of the specification, prioritizing essential features such as the centralized dashboard, training tracking and automatic notifications.' },
          { label: '3rd meeting', title: 'Architecture & Flow', description: 'Discussion on pedagogical and organizational constraints, definition of main user journeys and validation of critical workflows.' },
          { label: '4th meeting', title: 'Validation', description: 'Validation of the first conceptual mockups and collection of detailed feedback on experience and information hierarchy. This phase enabled us to precisely identify functional and UX needs.' }
        ],
        userFlow: {
          title: 'User flow',
          nodes: [
            { id: 'login', name: 'Dashboard' },
            { id: 'contact', name: 'Contact' },
            { id: 'page-taches', name: 'Tasks page' },
            { id: 'formation', name: 'Training' },
            { id: 'laboratoire', name: 'Laboratory' },
            { id: 'mot-de-passe-oublie', name: 'Account' },
            { id: 'fiche-client', name: 'Client sheet' },
            { id: 'vue-tache', name: 'Task view' },
            { id: 'details-formation', name: 'Details' },
            { id: 'details-laboratoire', name: 'Details' },
          ],
          links: [
            { from: 'login', to: 'mot-de-passe-oublie' },
            { from: 'login', to: 'contact' },
            { from: 'login', to: 'page-taches' },
            { from: 'login', to: 'formation' },
            { from: 'login', to: 'laboratoire' },
            { from: 'contact', to: 'fiche-client' },
            { from: 'page-taches', to: 'vue-tache' },
            { from: 'formation', to: 'details-formation' },
            { from: 'laboratoire', to: 'details-laboratoire' },
          ],
        },
        team: [
          'Anthony Merault, Product Designer | Building Complex SaaS & Design Systems',
          'Frédéric Isambert, Project manager',
          'Nicola Bègue, Integrator',
          'Evan Rivière, Integrator'
        ],
        designSystemNeutrals: [
          { role: 'Main surface', usage: 'Background app' },
          { role: 'Secondary surface', usage: 'Cards, hover' },
          { role: 'Elevated surface', usage: 'Modal, card + shadow' },
          { role: 'Border', usage: 'Separators' },
          { role: 'Main text', usage: 'Title, text' },
          { role: 'Secondary text', usage: 'Labels, subtitles' },
          { role: 'Inverted text', usage: 'Text on colored button' }
        ]
      }
    }
  },
  'Kaldera': {
    title: 'Kaldera',
    subtitle: 'Application web de simulation trail',
    badges: ['Site web', 'UX/UI', '2025', 'Simulation'],
    summary: 'Kaldera est une application web de simulation trail permettant aux coureurs de visualiser des parcours, préparer leurs entraînements et simuler des courses en conditions réalistes. Le projet vise à offrir une expérience immersive pour planifier et analyser des sorties trail avec des données de relief, dénivelé et météo.',
    context: {
      title: 'Contexte & Problématique',
      content: 'Kaldera répond au besoin des trailers de visualiser et simuler des parcours avant une course ou un entraînement. L\'application intègre des données cartographiques, le dénivelé et des indicateurs de difficulté pour aider les coureurs à mieux préparer leurs sorties. L\'objectif est de créer une interface intuitive et performante pour la simulation trail.'
    },
    approach: {
      title: 'Démarche UX/UI',
      sections: [
        { subtitle: 'Recherche utilisateur', content: 'Étude des besoins des trailers et analyse des applications existantes (Strava, AllTrails, etc.) pour identifier les fonctionnalités clés et les opportunités de différenciation.' },
        { subtitle: 'Prototypage & tests', content: 'Itérations de maquettes sur Figma avec tests utilisateurs pour valider la navigation et l\'affichage des données de simulation.' },
        { subtitle: 'Design System', content: 'Mise en place d\'un design system cohérent pour garantir une expérience fluide sur l\'ensemble de l\'application web.' }
      ]
    },
    wireframes: {
      title: 'Maquettes & Prototype',
      items: [
        { image: '/images/cover-project-kaldera.png', description: 'Interface principale de Kaldera avec visualisation des parcours trail et données de simulation.' }
      ]
    },
    designSystem: {
      colorPalette: {
        title: 'Palette colorimétrique',
        description: 'Palette inspirée des paysages trail, avec des tons naturels et des accents vifs pour l\'accent sur les données.',
        categories: {
          neutrals: {
            title: 'Neutrals',
            colors: [
              { role: 'Surface principale', token: 'surface.primary', color: '#F5F5F5', usage: 'Background app' },
              { role: 'Surface secondaire', token: 'surface.secondary', color: '#E8E8E8', usage: 'Cartes' },
              { role: 'Texte principal', token: 'text.primary', color: '#1A1A1A', usage: 'Titres' },
              { role: 'Texte secondaire', token: 'text.secondary', color: '#666666', usage: 'Labels' }
            ]
          },
          primary: {
            title: 'Primary',
            colors: [
              { role: 'Primaire', token: 'primary.base', color: '#2D5A27', usage: 'Actions principales' },
              { role: 'Hover', token: 'primary.hover', color: '#234520', usage: 'États hover' }
            ]
          },
          secondary: {
            title: 'Secondary',
            colors: [
              { role: 'Accent', token: 'accent.base', color: '#E07C24', usage: 'Dénivelé, données' }
            ]
          },
          accent: { title: 'Accent', colors: [] },
          error: {
            title: 'Error',
            colors: [
              { role: 'Erreur', token: 'error.base', color: '#D32F2F', usage: 'Alertes' }
            ]
          }
        }
      },
      typography: {
        title: 'Typographie',
        description: 'Inter pour l\'interface, hiérarchie claire pour les données de simulation.',
        items: [
          { style: 'H1', font: 'Inter', size: '32', lineHeight: '150%' },
          { style: 'H2', font: 'Inter', size: '24', lineHeight: '150%' },
          { style: 'p', font: 'Inter', size: '16', lineHeight: '150%' },
          { style: 'label', font: 'Inter', size: '14', lineHeight: 'Auto' }
        ]
      }
    },
    implementation: {
      title: 'Stack technique',
      technologies: ['React', 'TypeScript', 'Vite', 'MapLibre', 'Tailwind CSS'],
      architecture: 'Application web responsive avec intégration cartographique et visualisation de données trail.'
    },
    results: {
      title: 'Résultats',
      metrics: [
        { label: 'Type', value: 'Application web' },
        { label: 'Statut', value: 'En développement' }
      ],
      feedback: 'Projet de simulation trail en cours de développement.',
      improvements: 'Intégration de données météo temps réel, comparaison de parcours, mode hors-ligne.'
    },
    conclusion: {
      title: 'Conclusion',
      content: 'Kaldera vise à devenir un outil de référence pour les trailers souhaitant préparer et simuler leurs parcours.',
      nextSteps: ['Intégration API cartographique avancée', 'Mode hors-ligne', 'Partage de parcours']
    },
    year: '2025',
    image: '/images/cover-project-kaldera.png',
    projectUrl: 'https://trackali.com',
    skills: ['UX/UI', 'Design System', 'React', 'Cartographie', 'Figma'],
    duration: 'En cours',
    type: 'Application web',
    team: ['Anthony Merault, Product Designer | Building Complex SaaS & Design Systems'],
    translations: {
      en: {
        subtitle: 'Trail simulation web app',
        summary: 'Kaldera is a trail simulation web application that allows runners to visualize routes, prepare their training and simulate races in realistic conditions. The project aims to provide an immersive experience for planning and analyzing trail runs with elevation, terrain and weather data.'
      }
    }
  }
};
