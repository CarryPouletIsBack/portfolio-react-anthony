// Interface pour les projets du menu
export interface MenuItem {
  imageSrc: string;
  imageAlt: string;
  title: string;
  className?: string;
}

// Interface pour les catégories
export interface MenuCategory {
  key: string;
  title: string;
  projects: MenuItem[];
}

// Données des catégories et projets du menu
export const menuCategories: MenuCategory[] = [
  {
    key: 'application',
    title: 'Application',
    projects: [
      { 
        imageSrc: "/images/261061ca92433cd63b52fe7f2093041e9d831bbc.png", 
        imageAlt: "Playdago", 
        title: "Playdago" 
      },
      { 
        imageSrc: "/images/f27446bbc5c96f74d44074bc97b9be64f7cdf4cf.png", 
        imageAlt: "Pedaboard", 
        title: "Pedaboard" 
      },
      { 
        imageSrc: "/images/d09371ff5fd475e08d0476d1b301dd9aabb49d5c.png", 
        imageAlt: "Ghadeer market", 
        title: "Ghadeer market" 
      },
      { 
        imageSrc: "/images/8cbd7b5155c0b3df21ecc2703b145f2d393e07a0.png", 
        imageAlt: "Open challenge", 
        title: "Open challenge" 
      }
    ]
  },
  {
    key: 'siteWeb',
    title: 'Site web',
    projects: [
      { 
        imageSrc: "/images/514dda7a5dbdf8da4239a28ff06c4b36281c7d36.png", 
        imageAlt: "Utoi", 
        title: "Utoi" 
      },
      { 
        imageSrc: "/images/25c86067ea3b2084f730bb1f906759081bc20fac.png", 
        imageAlt: "Agua benta", 
        title: "Agua benta" 
      },
      { 
        imageSrc: "/images/e6f2ddb160c2bbdb850462edeb04f93d7cce975f.png", 
        imageAlt: "Anset assurance", 
        title: "Anset assurance" 
      },
      { 
        imageSrc: "/images/8cc5f68c1c8fa66e1ddab4fe1075e9d19645f9d4.png", 
        imageAlt: "Open challenge", 
        title: "Open challenge" 
      }
    ]
  },
  {
    key: 'logo',
    title: 'Logo',
    projects: [
      { 
        imageSrc: "/images/261061ca92433cd63b52fe7f2093041e9d831bbc.png", 
        imageAlt: "My spir", 
        title: "My spir" 
      },
      { 
        imageSrc: "/images/f27446bbc5c96f74d44074bc97b9be64f7cdf4cf.png", 
        imageAlt: "Ghadeer market", 
        title: "Ghadeer market" 
      },
      { 
        imageSrc: "/images/514dda7a5dbdf8da4239a28ff06c4b36281c7d36.png", 
        imageAlt: "Mp audio", 
        title: "Mp audio" 
      },
      { 
        imageSrc: "/images/8cbd7b5155c0b3df21ecc2703b145f2d393e07a0.png", 
        imageAlt: "Sublim", 
        title: "Sublim" 
      }
    ]
  },
  {
    key: 'motion',
    title: 'Motion',
    projects: [
      { 
        imageSrc: "/images/25c86067ea3b2084f730bb1f906759081bc20fac.png", 
        imageAlt: "Mp audio", 
        title: "Mp audio" 
      },
      { 
        imageSrc: "/images/e6f2ddb160c2bbdb850462edeb04f93d7cce975f.png", 
        imageAlt: "Mémoire Kartier Titan", 
        title: "Mémoire Kartier Titan" 
      },
      { 
        imageSrc: "/images/8cc5f68c1c8fa66e1ddab4fe1075e9d19645f9d4.png", 
        imageAlt: "Pub tv Sublim", 
        title: "Pub tv Sublim" 
      }
    ]
  },
  {
    key: 'plv',
    title: 'Plv',
    projects: [
      { 
        imageSrc: "/images/d09371ff5fd475e08d0476d1b301dd9aabb49d5c.png", 
        imageAlt: "Run Alim", 
        title: "Run Alim" 
      }
    ]
  }
];

// Fonction helper pour obtenir tous les projets dans une liste plate
export const getAllProjects = (): MenuItem[] => {
  return menuCategories.flatMap(category => category.projects);
};

// Fonction helper pour rechercher des projets
export const searchProjects = (searchTerm: string): MenuItem[] => {
  if (!searchTerm.trim()) return [];
  
  const searchLower = searchTerm.toLowerCase();
  return getAllProjects().filter(project => 
    project.title.toLowerCase().includes(searchLower)
  );
};


