export interface FlowNodeData {
  id: string;
  label: string;
  description?: string;
  disabled?: boolean;
  // If the node branches vertically into multiple children
  branches?: FlowNodeData[];
  // If the node flows horizontally into a sequence
  next?: FlowNodeData;
}

export const flowData: FlowNodeData = {
  id: "racines",
  label: "Racines",
  description: "Les racines représentent les compétences fondamentales invisibles mais essentielles. Sans ça, rien ne tient.",
  branches: [
    { 
      id: "racine_business", 
      label: "Contraintes business",
      description: "Compréhension des contraintes business et capacité à intégrer les enjeux économiques dans les décisions design."
    },
    { 
      id: "racine_technique", 
      label: "Faisabilité technique",
      description: "Dev-friendly, réalisme technique. Capacité à comprendre les limites et possibilités techniques pour créer des solutions réalisables."
    },
    { 
      id: "racine_culture", 
      label: "Culture produit",
      description: "Roadmap, priorisation. Compréhension de la vision produit et capacité à prioriser les fonctionnalités."
    },
    { 
      id: "racine_detail", 
      label: "Sens du détail",
      description: "Qualité d'exécution et attention aux détails qui font la différence entre un bon et un excellent design."
    },
    { 
      id: "racine_apprendre", 
      label: "Apprendre vite",
      description: "Capacité à apprendre rapidement de nouveaux outils, méthodologies et domaines d'expertise."
    },
    {
      id: "tronc",
      label: "Product Design",
      description: "Ton identité centrale. Le cœur de l'arbre, bien épais visuellement. C'est là que tu dois mettre ton titre.",
      branches: [
        { 
          id: "branche_ux", 
          label: "UX",
          description: "Architecture de l'information, parcours utilisateurs, wireframes & flows, accessibilité, heuristiques & bonnes pratiques."
        },
        {
          id: "branche_ui",
          label: "UI",
          description: "Hiérarchie visuelle, design system, composants & variantes, typographie, couleur & contrastes.",
          next: {
            id: "secondaire_veille",
            label: "Veille & culture",
            description: "Tendances produit, benchmark, analyse concurrentielle.",
            next: {
              id: "feuille_webflow",
              label: "Webflow",
              description: "Prototypage web et création de sites interactifs sans code.",
              disabled: true,
            },
          },
        },
        {
          id: "branche_product_thinking",
          label: "Product Thinking",
          description: "Analyse des besoins, priorisation, arbitrages UX / business, vision globale du produit.",
          next: {
            id: "secondaire_systemes",
            label: "Systèmes",
            description: "Logique de composants, scalabilité, réutilisabilité.",
            next: {
              id: "feuille_dev",
              label: "HTML/CSS/React",
              description: "Notions de développement pour mieux collaborer avec les développeurs.",
              next: { 
                id: "feuille_cursor", 
                label: "Cursor / IA",
                description: "Outils IA pour accélérer le développement et améliorer la productivité."
              },
            },
          },
        },
        { 
          id: "branche_collab", 
          label: "Collaboration",
          description: "Travail avec devs, suivi d'implémentation, handoff, communication avec clients / équipes."
        },
      ],
    },
    {
      id: "secondaire_da",
      label: "Direction Artistique",
      description: "Cohérence visuelle, branding & identité, exigence esthétique, regard critique.",
      next: {
        id: "feuille_figma",
        label: "Figma",
        description: "Design tool principal pour la création d'interfaces et de prototypes.",
        next: { 
          id: "feuille_adobe", 
          label: "Adobe Suite",
          description: "Photoshop, Illustrator, InDesign pour le design graphique et la création d'assets."
        },
      },
    },
    {
      id: "bourgeon_research",
      label: "User Research",
      description: "Recherche approfondie, tests utilisateurs structurés, méthodologies de découverte.",
      next: {
        id: "cime_confirme",
        label: "Product Designer confirmé",
        description: "Niveau senior avec une expertise reconnue dans le design de produits.",
        disabled: true,
      },
    },
    {
      id: "bourgeon_data",
      label: "Data & Analytics",
      description: "Data produit & analytics, design orienté impact (metrics), analyse des performances.",
      next: {
        id: "cime_lead",
        label: "Lead un produit",
        description: "Capacité à lead un produit de A à Z, de la stratégie à l'exécution.",
        next: {
          id: "cime_decisions",
          label: "Décisions usage + data",
          description: "Décisions basées sur usage + data, approche data-driven du design.",
          disabled: true,
          next: { 
            id: "cime_strategie", 
            label: "Contribution stratégique",
            description: "Vision stratégique et contribution à la direction produit au niveau exécutif."
          },
        },
      },
    },
  ],
};

