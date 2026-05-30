import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type Language = 'fr' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, params?: Record<string, string | number>) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const STORAGE_KEY = 'portfolio-lang'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'fr'
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null
    if (stored === 'fr' || stored === 'en') return stored
    // Détecter la langue du navigateur
    const browserLang = navigator.language?.slice(0, 2)
    return browserLang === 'en' ? 'en' : 'fr'
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language)
    document.documentElement.lang = language
  }, [language])

  const setLanguage = (lang: Language) => setLanguageState(lang)

  const t = (key: string, params?: Record<string, string | number>): string => {
    const translations = TRANSLATIONS[language]
    const keys = key.split('.')
    let value: unknown = translations
    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k]
    }
    let str = typeof value === 'string' ? value : key
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v))
      })
    }
    return str
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

// Traductions
const TRANSLATIONS: Record<Language, Record<string, unknown>> = {
  fr: {
    nav: {
      menu: 'Menu',
      about: 'À propos',
      contact: 'Contact',
      intro: 'Introduction',
      description: 'Description',
      tree: 'Arbre de compétences',
    },
    hero: {
      title: 'Penser, structurer, et donner forme aux idées.',
      infos: 'Infos',
      services: 'Mes services',
      servicesDescription: "Design d'interface (site web, Saas, tableau de bord)",
      footer: '© {year} Anthony Merault',
      tagManagement: 'Management',
      tagMaquette: 'Maquette figma',
      tagVision: 'vision',
      tagDesignSystem: 'design system',
      tagBranding: 'adaptabilité branding',
      tagConsultant: 'Consultant',
      categoryApplication: 'Application',
      categoryApplicationWeb: 'Application web',
      categorySiteWeb: 'Site web',
      categoryLogo: 'Logo',
      categoryMotion: 'Motion',
      categoryPlv: 'PLV',
      seoDiscover: 'Découvrez',
      seoPedaboardDesc: 'CRM et pilotage pour la pédagogie active.',
      seoPlaydagoDesc: 'Application et expérience utilisateur.',
      seoUtoidDesc: 'Site trail, inscriptions et suivi live à La Réunion.',
      seoKalderaDesc: 'Simulation trail et interfaces cartographiques.',
      seoAboutDesc: 'Parcours, compétences et formations.',
      seoContactDesc: 'Me contacter.',
    },
    header: {
      productDesigner: 'Product Designer | Building Complex SaaS & Design Systems',
    },
    search: {
      placeholder1: "Recherche le nom d'un projet",
      placeholder2: 'Recherche par type',
      placeholder3: 'Recherche par année',
    },
    about: {
      cardProfile: 'Profil',
      cardPerformance: 'Performance',
      cardTraining: 'Entraînement',
      cardActivities: 'Activités',
      total2025: 'Total 2025',
      weight: 'Poids',
      noActivity: 'Aucune activité disponible',
      loadError: 'Erreur de chargement',
      error: 'Erreur',
      stravaError: 'Erreur de connexion Strava',
      vercelHint: "Vérifiez que vercel dev est lancé et que les variables d'environnement sont configurées.",
      introTitle: 'À propos de moi',
      introDesc1: "Passionné par le design et le développement, je crée des expériences digitales qui marquent les esprits. Mon approche allie créativité et technique pour transformer vos idées en solutions innovantes.",
      introDesc2: "Spécialisé dans le design d'interface et le développement front-end, je mets mon expertise au service de projets variés, de l'application mobile au site web corporate.",
      statAgency: 'en agence',
      statProjects: 'Projets',
      statSites: 'Site web',
      statSaaS: 'SaaS',
      statIdentity: 'Identité graphique',
      statLevel: 'Niveau',
      mainTitle: 'Product Designer | Building Complex SaaS & Design Systems',
      mainDesc1: "Product Designer | Building Complex SaaS & Design Systems, je conçois des expériences visuelles et digitales qui allient créativité et efficacité.",
      mainDesc2: "Fort d'un parcours mêlant design graphique, webdesign et direction artistique, j'ai travaillé sur des projets variés allant de la création d'identités visuelles à la conception d'interfaces complètes (sites web, CRM, dashboards).",
      skillsTitle: 'Compétences',
      toolsTitle: 'Outils',
      interestsTitle: 'Intérêts',
      experiencesTitle: 'Expériences',
      formationsTitle: 'Formations',
      tableName: 'Nom',
      tableSchool: 'école',
      tableYear: 'Année',
      competencesTitle: 'Compétences :',
      downloadCv: 'Télécharger mon CV',
    },
    error: {
      pageNotFound: 'Page non trouvée',
      pageNotFoundMessage: 'La page que vous recherchez n’existe pas ou a été déplacée.',
      backToHome: "Retour à l'accueil",
      discoverProjects: 'Découvrir mes projets',
    },
    project: {
      context: 'Contexte du projet',
      objectives: 'Objectifs',
      team: "L'équipe projet",
      myRole: 'Mon rôle',
      role: 'RÔLE',
      name: 'NOM PRÉNOM',
      tocSummary: 'Résumé / Introduction',
      tocTeam: "L'équipe projet",
      caseStudie: 'Case Studie',
      ideation: 'Idéation & Solutions testées',
      implementation: 'Implémentation & Technologies',
      results: 'Résultats & Impact',
      problematique: 'Problématique',
      solution: 'Solution',
      process: 'Processus détaillé',
      processIntro: 'Le projet a débuté par une série de réunions avec la cliente pour comprendre ses besoins et ses contraintes :',
      processSummary: "Le processus a suivi un cycle constant de recherche → idéation → prototypage → tests → ajustements, avec un dialogue régulier entre la cliente, l'équipe de développement et moi-même. Cette approche a permis de créer une interface efficace, intuitive et parfaitement adaptée aux besoins réels des utilisateurs.",
      audit: 'Audit',
      architecture: 'Architecture & Flux',
      userFlow: 'User flow',
      designSystem: 'Design system',
      dsTabCarousel: 'Description',
      dsTabPalette: 'Palette',
      dsTabTypescale: 'Typéchelle',
      palette: 'Palette "Pedaboard"',
      materialDesign: '(Material Design)',
      roleToken: 'Rôle (Token)',
      usage: 'Usage / Fonction',
      hexValue: 'Valeur Hex',
      typescale: 'Typescale',
      baseValue: 'Base Value: 16',
      roleCol: 'Rôle',
      typography: 'Typographie',
      size: 'Taille',
      lineHeight: 'Interlignage',
      example: 'Exemple',
      conception: 'Conception & Itération',
      integration: "Phase d'Intégration",
      otherProjects: 'Mes autres projets',
      whatNext: 'Que fait-on ?',
      backToTop: 'Retourner en haut',
      backHome: "Retour à l'accueil",
      viewProject: 'Voir le projet',
      aboutLink: 'à propos',
      contactMe: 'Me contacter',
      auditLead: "Avant de concevoir les premiers wireframes, j'ai mené une phase de recherche afin de comprendre les usages d'un outil de type CRM et les bonnes pratiques liées aux interfaces de gestion.",
      auditBody: "Cette phase s'est appuyée sur une veille UX/UI autour des dashboards, des systèmes de suivi, des alertes et des interfaces orientées productivité. Elle m'a permis d'identifier des patterns récurrents, notamment sur la hiérarchisation de l'information, l'utilisation des couleurs dans des contextes fonctionnels et la gestion des états (incomplet, en attente, validé).",
      archLead: 'L\'entité "Client" est au cœur de notre architecture de base de données. Contrairement à une approche en silos, elle centralise toutes les sous-entités, incluant les Contacts (individus), leurs historiques d\'achats via WooCommerce, ainsi que leurs Formations passées ou futures.',
      archBody: "Cette phase s'est appuyée sur une veille UX/UI autour des dashboards, des systèmes de suivi, des alertes et des interfaces orientées productivité.",
      conceptionLead1: "Avec un délai de conception fixé à deux mois et un budget restreint, j'ai opté pour des solutions techniques simples afin d'assurer la scalabilité dans le temps. Bien que la maquette ait été réalisée en \"Desktop First\", le design a été pensé pour une intégration fluide en responsive.",
      conceptionLead2: "À partir du cadrage, j'ai conçu plusieurs itérations de wireframes jusqu'à obtenir une version optimale en termes de navigation, de lisibilité et de faisabilité technique.",
      conceptionCaption1: "J'ai conservé le header supérieur pour offrir à l'utilisateur un accès immédiat aux actions principales sans recherche inutile. Ce menu regroupe les accès aux 6 pages clés du produit.",
      conceptionCaption2: "Barre d'actions : J'ai intégré une barre d'actions fixe en haut de la zone principale pour simplifier les interactions. Les boutons contextuels restent ainsi toujours visibles et à portée de main.",
      conceptionCaption3: "J'ai confronté l'identité visuelle de la cliente aux contraintes techniques du dashboard.",
      conceptionCaption4: "L'application brute des couleurs sur cette charte a permis de détecter instantanément les limites : 1. Rupture d'accessibilité : les combinaisons texte/fond manquaient de contraste (notamment cartes clients). 2. Saturation des données : les teintes étaient trop invasives pour une interface dense.",
      contrastTitle: 'Validation Structurelle',
      contrastImageAlt: 'Playdago — tableau de bord, interface en mode clair',
      lightModeSinglePageAlt: 'Playdago — atelier, vue page unique',
      lightModeSetp1Alt: 'Playdago — matching, étape 1',
      integrationTitle: "Le projet est actuellement en cours de développement par l'équipe technique. La mise en production étant à venir, aucune métrique quantitative (KPIs) n'est disponible à ce jour.",
      integrationLead: "Cependant, la phase de Handoff (passage de relais) a permis de valider la faisabilité technique de l'ensemble des composants, et les premiers retours qualitatifs sur le prototype animé confirment une nette amélioration de la fluidité de navigation par rapport aux outils précédents.",
      december2023: 'Décembre 2023',
      february2025: 'Février 2025',
      auditAlt1: 'Audit – veille UX/UI 1',
      auditAlt2: 'Audit – veille UX/UI 2',
      auditAlt3: 'Audit – veille UX/UI 3',
      auditAlt4: 'Audit – veille UX/UI 4',
      /** Graduations galerie Conception & Itération (Playdago) */
      conceptGraduationLabel: 'Concept {n}',
      conceptionGraduationGroup: 'Choix du concept',
      conceptionStageAlt: 'Concept {concept} — visuel {slide}',
      conceptionVerticalCarousel: 'Visuels du concept sélectionné',
      cardSwapAria: 'Aperçu animé — trois écrans du concept 1',
      integrationAlt: 'Intégration',
      wireframeAlt: 'Wireframe — Hello John',
      maquetteAlt: 'Maquette haute fidélité — Hello John',
      axisHorizontal: 'Axe horizontal',
      axisVertical: 'Axe vertical',
    },
  },
  en: {
    nav: {
      menu: 'Menu',
      about: 'About',
      contact: 'Contact',
      intro: 'Introduction',
      description: 'Description',
      tree: 'Skills tree',
    },
    hero: {
      title: 'Think, structure, and give shape to ideas.',
      infos: 'Info',
      services: 'My services',
      servicesDescription: 'Interface design (website, SaaS, dashboard)',
      footer: '© {year} Anthony Merault',
      tagManagement: 'Management',
      tagMaquette: 'Figma mockup',
      tagVision: 'vision',
      tagDesignSystem: 'design system',
      tagBranding: 'branding flexibility',
      tagConsultant: 'Consultant',
      categoryApplication: 'Application',
      categoryApplicationWeb: 'Web application',
      categorySiteWeb: 'Website',
      categoryLogo: 'Logo',
      categoryMotion: 'Motion',
      categoryPlv: 'PLV',
      seoDiscover: 'Discover',
      seoPedaboardDesc: 'CRM and pedagogy management.',
      seoPlaydagoDesc: 'Application and user experience.',
      seoUtoidDesc: 'Trail website, registration and live tracking in Réunion.',
      seoKalderaDesc: 'Trail simulation and map interfaces.',
      seoAboutDesc: 'Background, skills and education.',
      seoContactDesc: 'Contact me.',
    },
    header: {
      productDesigner: 'Product Designer | Building Complex SaaS & Design Systems',
    },
    search: {
      placeholder1: 'Search for a project name',
      placeholder2: 'Search by type',
      placeholder3: 'Search by year',
    },
    about: {
      cardProfile: 'Profile',
      cardPerformance: 'Performance',
      cardTraining: 'Training',
      cardActivities: 'Activities',
      total2025: 'Total 2025',
      weight: 'Weight',
      noActivity: 'No activity available',
      loadError: 'Loading error',
      error: 'Error',
      stravaError: 'Strava connection error',
      vercelHint: 'Make sure vercel dev is running and environment variables are configured.',
      introTitle: 'About me',
      introDesc1: 'Passionate about design and development, I create digital experiences that leave a lasting impression. My approach combines creativity and technical expertise to transform your ideas into innovative solutions.',
      introDesc2: "Specialized in interface design and front-end development, I put my expertise at the service of varied projects, from mobile applications to corporate websites.",
      statAgency: 'in agency',
      statProjects: 'Projects',
      statSites: 'Website',
      statSaaS: 'SaaS',
      statIdentity: 'Visual identity',
      statLevel: 'Level',
      mainTitle: 'Product Designer | Building Complex SaaS & Design Systems',
      mainDesc1: 'Product Designer | Building Complex SaaS & Design Systems, I design visual and digital experiences that combine creativity and efficiency.',
      mainDesc2: "With a background in graphic design, web design and art direction, I've worked on varied projects from visual identity creation to complete interface design (websites, CRM, dashboards).",
      skillsTitle: 'Skills',
      toolsTitle: 'Tools',
      interestsTitle: 'Interests',
      experiencesTitle: 'Experience',
      formationsTitle: 'Education',
      tableName: 'Name',
      tableSchool: 'School',
      tableYear: 'Year',
      competencesTitle: 'Skills:',
      downloadCv: 'Download my CV',
    },
    error: {
      pageNotFound: 'Page not found',
      pageNotFoundMessage: 'The page you are looking for does not exist or has been moved.',
      backToHome: 'Back to home',
      discoverProjects: 'Discover my projects',
    },
    project: {
      context: 'Project context',
      objectives: 'Objectives',
      team: 'Project team',
      myRole: 'My role',
      role: 'ROLE',
      name: 'NAME',
      tocSummary: 'Summary / Introduction',
      tocTeam: 'Project team',
      caseStudie: 'Case Study',
      ideation: 'Ideation & Solutions tested',
      implementation: 'Implementation & Technologies',
      results: 'Results & Impact',
      problematique: 'Problem',
      solution: 'Solution',
      process: 'Detailed process',
      processIntro: 'The project started with a series of meetings with the client to understand their needs and constraints:',
      processSummary: 'The process followed a constant cycle of research → ideation → prototyping → testing → adjustments, with regular dialogue between the client, the development team and myself. This approach enabled the creation of an effective, intuitive interface perfectly suited to real user needs.',
      audit: 'Audit',
      architecture: 'Architecture & Flow',
      userFlow: 'User flow',
      designSystem: 'Design system',
      dsTabCarousel: 'Description',
      dsTabPalette: 'Palette',
      dsTabTypescale: 'Type scale',
      palette: 'Palette "Pedaboard"',
      materialDesign: '(Material Design)',
      roleToken: 'Role (Token)',
      usage: 'Usage / Function',
      hexValue: 'Hex value',
      typescale: 'Typescale',
      baseValue: 'Base Value: 16',
      roleCol: 'Role',
      typography: 'Typography',
      size: 'Size',
      lineHeight: 'Line height',
      example: 'Example',
      conception: 'Conception & Iteration',
      integration: 'Integration phase',
      otherProjects: 'Other projects',
      whatNext: 'What next?',
      backToTop: 'Back to top',
      backHome: 'Back home',
      viewProject: 'View project',
      aboutLink: 'about',
      contactMe: 'Contact me',
      auditLead: "Before designing the first wireframes, I conducted a research phase to understand the usage patterns of CRM-style tools and best practices for management interfaces.",
      auditBody: "This phase drew on UX/UI benchmarking on dashboards, tracking systems, alerts and productivity-oriented interfaces. It enabled me to identify recurring patterns, particularly around information hierarchy, color usage in functional contexts, and state management (incomplete, pending, validated).",
      archLead: 'The "Client" entity is at the heart of our database architecture. Unlike a siloed approach, it centralizes all sub-entities, including Contacts (individuals), their purchase history via WooCommerce, and their past or future training.',
      archBody: "This phase drew on UX/UI benchmarking on dashboards, tracking systems, alerts and productivity-oriented interfaces.",
      conceptionLead1: "With a two-month design deadline and a limited budget, I opted for simple technical solutions to ensure long-term scalability. Although the mockup was created in 'Desktop First', the design was conceived for smooth responsive integration.",
      conceptionLead2: "From the scoping phase onwards, I designed several wireframe iterations until I achieved an optimal version in terms of navigation, readability and technical feasibility.",
      conceptionCaption1: "I kept the top header to give users immediate access to main actions without unnecessary searching. This menu groups access to the 6 key product pages.",
      conceptionCaption2: "Action bar: I integrated a fixed action bar at the top of the main area to simplify interactions. Contextual buttons remain visible and within easy reach.",
      conceptionCaption3: "I confronted the client's visual identity with the technical constraints of the dashboard.",
      conceptionCaption4: "The raw application of colors from this chart enabled me to instantly identify limits: 1. Accessibility breakdown: text/background combinations lacked contrast (especially client cards). 2. Data saturation: the hues were too invasive for a dense interface.",
      contrastTitle: 'Structural validation',
      contrastImageAlt: 'Playdago — dashboard, light mode interface',
      lightModeSinglePageAlt: 'Playdago — workshop, single-page view',
      lightModeSetp1Alt: 'Playdago — matching, step 1',
      integrationTitle: "The project is currently under development by the technical team. Production launch is upcoming, so no quantitative metrics (KPIs) are available yet.",
      integrationLead: "However, the Handoff phase validated the technical feasibility of all components, and initial qualitative feedback on the animated prototype confirms a clear improvement in navigation fluidity compared to previous tools.",
      december2023: 'December 2023',
      february2025: 'February 2025',
      auditAlt1: 'Audit – UX/UI benchmark 1',
      auditAlt2: 'Audit – UX/UI benchmark 2',
      auditAlt3: 'Audit – UX/UI benchmark 3',
      auditAlt4: 'Audit – UX/UI benchmark 4',
      conceptGraduationLabel: 'Concept {n}',
      conceptionGraduationGroup: 'Concept selection',
      conceptionStageAlt: 'Concept {concept} — screen {slide}',
      conceptionVerticalCarousel: 'Screens for the selected concept',
      cardSwapAria: 'Animated preview — three screens from concept 1',
      integrationAlt: 'Integration',
      wireframeAlt: 'Wireframe — Hello John',
      maquetteAlt: 'High-fidelity mockup — Hello John',
      axisHorizontal: 'Horizontal axis',
      axisVertical: 'Vertical axis',
    },
  },
}
