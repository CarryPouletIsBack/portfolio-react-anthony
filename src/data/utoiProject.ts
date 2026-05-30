import type { ProjectData } from './projectsNew';

/** Contenu cas UTOI — sources : PDF 23–34, https://utoi.re */
export const utoiProjectData: ProjectData = {
  title: 'UTOI',
  subtitle: 'Le trail dans l’Océan Indien',
  badges: ['UX/UI', '2025', 'Site web'],
  summary:
    "L'UTOI (Ultra Trail de l'Océan Indien) est l'organisation derrière les grandes courses de trail à La Réunion, dont l'Ultra Trail des Géants. Portée par l'ACSR, elle vise à faire de l'île une « Terre de Trail » capable d'attirer l'élite internationale.\n\nEn 2025, malgré le succès sportif des premières éditions, l'expérience numérique restait fragmentée (site vitrine WordPress, inscriptions et résultats chez des prestataires externes). La refonte vise une plateforme 100 % centralisée sur utoi.re : inscription, course, résultats et services coureurs sans quitter l'univers de marque.",

  objectifs: [
    "Faciliter l'inscription : centraliser toutes les courses, visualiser les listes d'inscrits et simplifier le PPS (Parcours Prévention Santé) via un compte UTOI.",
    'Archives et résultats : conserver une trace historique des événements passés directement sur le site.',
    "Internationalisation : traduire le site pour accueillir les coureurs étrangers.",
    "Identité visuelle : créer une communication et des composants uniques pour renforcer l'image de marque.",
  ],

  teamNote:
    "En tant que Founding Designer (ayant réalisé le premier site), je connaissais le terrain et les frictions existantes. Mon atout majeur : deux ans de données Google Analytics, exploitées pour « dégager toute spéculation et avancer sur des faits » lors des ateliers de conception.",

  context: {
    title: 'Contexte & Problématique',
    content:
      "L'UTOI s'est imposée depuis 2023 avec le slogan « La Réunion, terre de trail », mais l'identité numérique n'était plus à la hauteur des courses. Le modèle initial reposait sur une vitrine WordPress et des délégations SportPro pour inscriptions et résultats, diluant la marque et la donnée.",
  },

  problematique:
    "L'expérience coureur était fragmentée : redirection vers sportpro.re pour s'inscrire, applications tierces pour le live (LiveInfo, Sara Event) et une vitrine institutionnelle peu orientée conversion. La surcharge cognitive (vert omniprésent, blocs texte pleine largeur, absence de design system) freinait l'action critique : s'inscrire ou consulter un dossard.",
  solution:
    "Concevoir une plateforme propriétaire sur WordPress, inspirée des standards UTMB World : parcours unifié inscription → course → résultats sur utoi.re, design system Material Design adapté mobile, intégration Trace de Trail pour le live et identité « F1 des montagnes » pour crédibiliser l'UTOI à l'international.",

  auditLead:
    "L'analyse des acteurs majeurs du marché local a révélé une fracture dans l'expérience utilisateur, identifiée comme notre opportunité clé : le modèle « vitrine + prestataire externe ».",

  auditBody: `Pour s'inscrire, le coureur est redirigé vers une plateforme tierce (sportpro.re). Friction d'identité : compte générique « SportPro » au lieu d'un compte UTOI. Perte de contexte : interface administrative, design neutre, charge émotionnelle de la marque en baisse.

Le modèle « vitrine + externe » (ex. Grand Raid) pousse vers des apps tierces pour le live et les résultats, ce qui perturbe le parcours et réduit l'immersion dans la marque UTOI.`,

  auditLeadAfterCarousel: `Nous avons refusé ce modèle de sous-traitance de l'expérience. En m'inspirant des standards continentaux modernes (UTMB World) et du budget, j'ai conçu une plateforme 100 % centralisée : l'utilisateur s'inscrit, dépose son PPS, consulte ses résultats et gère son profil sans quitter utoi.re. La rétention des données crée un sentiment d'appartenance à la « famille UTOI », impossible sur un agrégateur externe.`,

  auditBodyAfterCarousel: `L'ancienne version privilégiait le contenu institutionnel au détriment de l'efficacité opérationnelle : surcharge cognitive, CTA noyés, esthétique « nature / tourisme » trop marquée pour un acteur visant l'international. Les données Analytics ont confirmé l'importance du mobile : optimisation prioritaire des parcours inscription et consultation course.`,

  archLead:
    "Les flux sont conçus pour limiter les détours, maintenir la lisibilité du parcours et assurer une navigation cohérente à chaque étape — de la découverte d'une saison à l'inscription et au suivi le jour J.",

  architectureDsDuplicateLead: `Direction artistique : le concept « La F1 des montagnes » pour sortir de l'imagerie trail classique — codes Formule 1 (saison, performance, minimalisme) mixés à la topographie réunionnaise.`,

  architectureDsDuplicateBody: `Design system : adaptation de Material Design pour l'ergonomie mobile.

Colorimétrie « Safe UI » : les couleurs de marque UTOI étant très saturées, création d'une palette UI apaisée pour réduire la charge cognitive sur les longs tableaux (classements).

Formes : lignes de niveau (topographie) pour habiller les cartes produits sans alourdir l'interface.`,

  architectureDsDuplicatePivotH3: 'Arbitrage technique',

  conceptionDuplicateLead: `L'idée initiale d'intégrer l'API Strava (login fluide, import de tracés) a été écartée après analyse : rate limiting (200 requêtes / 15 min), risque de crash aux pics d'inscriptions, et granularité insuffisante pour les organisateurs (barrières horaires, ravitaillements) par rapport à Trace de Trail.`,

  conceptionDuplicatePivotH3: 'Expérience utilisateur finale',

  conceptionDuplicateBody: `Objectif technique majeur : supprimer la fragmentation du parcours (vitrine → SportPro) au profit d'un tunnel d'acquisition 100 % propriétaire sur utoi.re.

La complexité du dossier d'inscription (certificats, options, paiement) est absorbée par un découpage séquentiel (stepper) optimisé mobile, réduisant la friction à l'étape critique du checkout.`,

  positionnementMatrix: {
    axisHorizontalPrefix: 'Axe X (Horizontal) ',
    axisVerticalPrefix: 'Axe Y (Vertical) ',
    xAxisLabel: 'Centralisation de l’expérience',
    yAxisLabel: 'Immersion de marque',
    xMinLabel: 'Faible',
    xMaxLabel: 'Élevée',
    yMinLabel: 'Faible',
    yMaxLabel: 'Élevée',
    points: [
      { name: 'Grand Raid', description: 'Vitrine + apps tierces (live, résultats)', x: -6, y: 2 },
      { name: 'SportPro', description: 'Inscriptions externalisées, identité générique', x: 4, y: -4 },
      { name: 'Ancien site UTOI', description: 'Institutionnel, peu orienté conversion', x: -4, y: -6 },
      { name: 'Nouvelle plateforme', description: 'Parcours unifié sur utoi.re', x: 7, y: 7 },
    ],
  },

  userFlow: {
    title: 'User flow',
    nodes: [
      { id: 'accueil', name: 'Accueil' },
      { id: 'news', name: 'News' },
      { id: 'saisons', name: 'Saisons' },
      { id: 'saison-cours', name: 'Saison en cours' },
      { id: 'single-course', name: 'Fiche course' },
      { id: 'inscription', name: 'Inscription' },
      { id: 'tracking', name: 'Tracking live' },
      { id: 'club', name: 'UTOI elite club' },
      { id: 'communiques', name: 'Communiqués' },
      { id: 'rejoindre', name: 'Nous rejoindre' },
      { id: 'compte', name: 'Compte' },
      { id: 'resultats', name: 'Résultats' },
      { id: 'photos', name: 'UTOI Photo' },
    ],
    links: [
      { from: 'accueil', to: 'news' },
      { from: 'accueil', to: 'saisons' },
      { from: 'accueil', to: 'club' },
      { from: 'accueil', to: 'communiques' },
      { from: 'accueil', to: 'rejoindre' },
      { from: 'accueil', to: 'compte' },
      { from: 'accueil', to: 'tracking' },
      { from: 'saisons', to: 'saison-cours' },
      { from: 'saison-cours', to: 'single-course' },
      { from: 'single-course', to: 'inscription' },
      { from: 'single-course', to: 'resultats' },
      { from: 'compte', to: 'inscription' },
      { from: 'resultats', to: 'photos' },
    ],
  },

  approach: {
    title: 'Démarche UX/UI',
    sections: [
      {
        subtitle: 'Benchmark concurrentiel',
        content:
          "Analyse Grand Raid, SportPro et standards UTMB World pour identifier la fracture « vitrine + externe » et définir le positionnement centralisé de la nouvelle plateforme.",
      },
      {
        subtitle: 'Données & mobile',
        content:
          "Exploitation de deux ans de Google Analytics (tailles d'écran, pages consultées) pour prioriser le mobile et les parcours inscription / fiche course.",
      },
      {
        subtitle: 'Design system & itérations',
        content:
          "Palette Safe UI, Material Design adapté, stepper d'inscription et composants saison / course itérés en collaboration avec l'équipe projet.",
      },
    ],
  },

  wireframes: {
    title: 'Maquettes',
    items: [
      {
        image: '/images/cover-project-utoi.png',
        description: 'Architecture de navigation : saisons, fiches courses et tunnel d’inscription unifié.',
      },
    ],
  },

  designSystem: {
    colorPalette: {
      title: 'Palette colorimétrique',
      description:
        "Palette « Safe UI » dérivée de la marque UTOI : teintes de marque saturées pour l'identité, surfaces et textes désaturés pour les tableaux de classement et les longues sessions de lecture.",
      categories: {
        neutrals: {
          title: 'Neutrals (surfaces et textes)',
          colors: [
            { role: 'Surface principale', token: 'surface.primary', color: '#F4F6F5', usage: 'Fond de page' },
            { role: 'Surface secondaire', token: 'surface.secondary', color: '#E2E8E4', usage: 'Cartes, listes' },
            { role: 'Surface surélevée', token: 'surface.elevation', color: '#FFFFFF', usage: 'Modales, panneaux' },
            { role: 'Bordure', token: 'border.default', color: '#C5D0C8', usage: 'Séparateurs' },
            { role: 'Texte principal', token: 'text.primary', color: '#1A1F1C', usage: 'Titres, corps' },
            { role: 'Texte secondaire', token: 'text.secondary', color: '#4A5650', usage: 'Labels, métadonnées' },
            { role: 'Texte inversé', token: 'text.onPrimary', color: '#FFFFFF', usage: 'Sur boutons' },
          ],
        },
        primary: {
          title: 'Primary (marque UTOI)',
          colors: [
            { role: 'Primaire', token: 'primary.base', color: '#1B7A4E' },
            { role: 'Hover', token: 'primary.hover', color: '#156640' },
            { role: 'Pressed', token: 'primary.pressed', color: '#0F4F32' },
            { role: 'Texte sur bouton', token: 'text.onPrimary', color: '#FFFFFF' },
          ],
        },
        secondary: {
          title: 'Secondary (live / accent)',
          colors: [
            { role: 'Live', token: 'secondary.live', color: '#E63946' },
            { role: 'Hover', token: 'secondary.hover', color: '#C42F3A' },
            { role: 'Texte sur live', token: 'text.onSecondary', color: '#FFFFFF' },
          ],
        },
        accent: {
          title: 'Accent (topographie)',
          colors: [
            { role: 'Lignes de niveau', token: 'accent.topo', color: '#8FA89A' },
            { role: 'Texte sur accent', token: 'text.onAccent', color: '#1A1F1C' },
          ],
        },
        error: {
          title: 'Error',
          colors: [
            { role: 'Erreur', token: 'error.base', color: '#D64545' },
            { role: 'Hover', token: 'error.hover', color: '#B33A3A' },
            { role: 'Texte sur erreur', token: 'text.onError', color: '#FFFFFF' },
          ],
        },
      },
    },
    typography: {
      title: 'Système typographique',
      description:
        "Inter et hiérarchie Material Design pour une lecture confortable sur mobile et desktop, avec styles dédiés aux fiches course et aux tableaux de résultats.",
      items: [
        { style: 'H1', font: 'Inter', size: '32', lineHeight: '150% → 48px' },
        { style: 'H2', font: 'Inter', size: '28', lineHeight: '150% → 42px' },
        { style: 'H3', font: 'Inter', size: '24', lineHeight: '150% → 36px' },
        { style: 'H4', font: 'Inter', size: '20', lineHeight: '150% → 30px' },
        { style: 'p', font: 'Inter', size: '16', lineHeight: '150%' },
        { style: 'label', font: 'Inter', size: '14', lineHeight: 'Auto' },
      ],
    },
  },

  implementation: {
    title: 'Développement',
    technologies: ['WordPress', 'PHP', 'Trace de Trail', 'Google Analytics', 'Figma'],
    architecture:
      "Site WordPress sur mesure : tunnel d'inscription propriétaire, intégration Trace de Trail pour le live, authentification native (abandon API Strava pour stabilité jour J).",
  },

  results: {
    title: 'Résultats',
    metrics: [
      { label: 'Plateforme', value: 'En ligne sur utoi.re' },
      { label: 'Parcours', value: 'Inscription centralisée' },
      { label: 'Identité', value: 'Branding « F1 des montagnes »' },
    ],
    feedback:
      'La plateforme remplit les objectifs stratégiques de la phase de conception : fin de la fragmentation, image internationale crédible, parcours mobile optimisé.',
    improvements:
      'Déploiement progressif des archives historiques (2024–2026) et enrichissement des services (UTOI Photo, shop, événements).',
  },

  conclusion: {
    title: 'Conclusion',
    content:
      "Le projet est officiellement en ligne sur https://utoi.re. Centralisation des inscriptions et résultats, identité renforcée et roadmap archives en cours de déploiement.",
    nextSteps: [
      'Import des archives historiques 2024–2026',
      'Extension UTOI Photo et services coureurs',
      'Poursuite de l’optimisation mobile sur les pics d’inscription',
    ],
  },

  year: '2025',
  image: '/images/cover-project-utoi.png',
  projectUrl: 'https://utoi.re',
  skills: ['UX Research', 'Design system', 'UI', 'Branding', 'WordPress', 'Figma'],
  duration: '2025',
  type: 'Site web',
  team: [
    'Anthony Merault, Lead Product Designer',
    'Frédéric Isambert, Chef de projet',
    'Nicola Bègue, Intégrateur',
    'Evan Rivière, Intégrateur',
  ],

  translations: {
    en: {
      subtitle: 'Trail in the Indian Ocean',
      summary:
        "UTOI (Ultra Trail of the Indian Ocean) organizes major trail races in Réunion, including the Ultra Trail des Géants. Despite early sporting success, the digital experience remained fragmented (WordPress showcase, external registration and results). The 2025 redesign delivers a fully centralized platform on utoi.re: register, race, results and runner services without leaving the brand.",
      objectifs: [
        'Streamline registration: centralize all races, view entrant lists and simplify health prevention (PPS) via a UTOI account.',
        'Archives and results: keep a historical record of past events on the site.',
        'Internationalization: translate the site for foreign runners.',
        'Visual identity: unique communication and UI components to strengthen the brand.',
      ],
      teamNote:
        'As Founding Designer (having built the first site), I knew the terrain and existing friction. A key asset: two years of Google Analytics data to remove guesswork and design from facts.',
      problematique:
        'The runner journey was fragmented: redirects to sportpro.re, third-party apps for live tracking, and an institutional showcase weak on conversion. Cognitive overload on the old UI hid critical CTAs.',
      solution:
        'A proprietary WordPress platform inspired by UTMB World standards: unified register → race → results on utoi.re, mobile-first Material Design system, Trace de Trail integration for live tracking, and “F1 of the mountains” branding.',
      auditLead:
        'Benchmarking local majors revealed a fracture in the user experience: the “showcase + external provider” model.',
      auditBody: `Registration sends users to sportpro.re with a generic SportPro account instead of UTOI. Neutral, administrative UI dilutes brand emotion. Showcase models (e.g. Grand Raid) push users to third-party apps for live and results.`,
      auditLeadAfterCarousel: `We rejected outsourcing the experience. Inspired by UTMB World and budget constraints, I designed a 100% centralized platform on utoi.re so users never leave the brand to register, submit PPS, or read results.`,
      auditBodyAfterCarousel: `The legacy site favored institutional content over operational efficiency. Analytics confirmed mobile priority for registration and race pages.`,
      archLead:
        'Flows minimize detours and keep the journey readable from season discovery through registration and race day.',
      architectureDsDuplicateLead: `Art direction: “F1 of the mountains” — F1 codes (season, performance, minimalism) blended with Réunion topography.`,
      architectureDsDuplicateBody: `Material Design adapted for mobile. “Safe UI” palette to tame saturated brand colors on long ranking tables. Contour lines on product cards.`,
      architectureDsDuplicatePivotH3: 'Technical trade-offs',
      conceptionDuplicateLead: `Strava API integration was dropped after analysis: rate limits, crash risk at registration peaks, and insufficient organizer granularity vs Trace de Trail.`,
      conceptionDuplicatePivotH3: 'Final user experience',
      conceptionDuplicateBody: `End-to-end acquisition on utoi.re replaces showcase → SportPro redirects. Registration complexity is handled by a mobile stepper at checkout.`,
      positionnementMatrix: {
        axisHorizontalPrefix: 'X Axis (Horizontal) ',
        axisVerticalPrefix: 'Y Axis (Vertical) ',
        xAxisLabel: 'Experience centralization',
        yAxisLabel: 'Brand immersion',
        xMinLabel: 'Low',
        xMaxLabel: 'High',
        yMinLabel: 'Low',
        yMaxLabel: 'High',
        points: [
          { name: 'Grand Raid', description: 'Showcase + third-party live apps', x: -6, y: 2 },
          { name: 'SportPro', description: 'External registration, generic identity', x: 4, y: -4 },
          { name: 'Legacy UTOI', description: 'Institutional, low conversion', x: -4, y: -6 },
          { name: 'New platform', description: 'Unified journey on utoi.re', x: 7, y: 7 },
        ],
      },
      userFlow: {
        title: 'User flow',
        nodes: [
          { id: 'accueil', name: 'Home' },
          { id: 'news', name: 'News' },
          { id: 'saisons', name: 'Seasons' },
          { id: 'saison-cours', name: 'Current season' },
          { id: 'single-course', name: 'Race page' },
          { id: 'inscription', name: 'Registration' },
          { id: 'tracking', name: 'Live tracking' },
          { id: 'club', name: 'UTOI elite club' },
          { id: 'communiques', name: 'Press' },
          { id: 'rejoindre', name: 'Join us' },
          { id: 'compte', name: 'Account' },
          { id: 'resultats', name: 'Results' },
          { id: 'photos', name: 'UTOI Photo' },
        ],
        links: [
          { from: 'accueil', to: 'news' },
          { from: 'accueil', to: 'saisons' },
          { from: 'accueil', to: 'club' },
          { from: 'accueil', to: 'communiques' },
          { from: 'accueil', to: 'rejoindre' },
          { from: 'accueil', to: 'compte' },
          { from: 'accueil', to: 'tracking' },
          { from: 'saisons', to: 'saison-cours' },
          { from: 'saison-cours', to: 'single-course' },
          { from: 'single-course', to: 'inscription' },
          { from: 'single-course', to: 'resultats' },
          { from: 'compte', to: 'inscription' },
          { from: 'resultats', to: 'photos' },
        ],
      },
      team: [
        'Anthony Merault, Lead Product Designer',
        'Frédéric Isambert, Project manager',
        'Nicola Bègue, Integrator',
        'Evan Rivière, Integrator',
      ],
      designSystemNeutrals: [
        { role: 'Main surface', usage: 'Page background' },
        { role: 'Secondary surface', usage: 'Cards, lists' },
        { role: 'Elevated surface', usage: 'Modals' },
        { role: 'Border', usage: 'Separators' },
        { role: 'Main text', usage: 'Titles, body' },
        { role: 'Secondary text', usage: 'Labels' },
        { role: 'Inverted text', usage: 'On buttons' },
      ],
    },
  },
};
