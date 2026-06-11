import { type ProjectData } from '../data/projectsNew';
import { projectsDataNew } from '../data/projectsNew';

const STORAGE_KEY = 'portfolio_projects';
/** Incrémenter pour forcer la réutilisation des données du code (ex. nouveaux champs positionnementMatrix, userFlow) */
const DATA_VERSION = 15;
const DATA_VERSION_KEY = 'portfolio_projects_version';

/** Projets dont le contenu éditorial doit toujours venir du code (évite localStorage corrompu). */
const CONTENT_FROM_CODE_ONLY = new Set(['UTOI', 'Mpaudio']);

function resolveCoverImage(key: string, savedCover?: string): string {
  if (key === 'Pedaboard') return '/images/cover-project-pedaboard.png';
  if (key === 'Playdago') return '/images/cover-project-playdago.png';
  if (key === 'UTOI') return '/images/cover-project-utoi.png';
  if (key === 'Kaldera') return '/images/cover-project-kaldera.png';
  if (key === 'Mpaudio') return '/videos/mpaudio-cover.mp4';
  return savedCover ?? `/images/${key.toLowerCase()}-cover.png`;
}

function resolveCategory(key: string, savedCategory?: string): string {
  if (savedCategory) return savedCategory;
  if (key === 'Pedaboard') return 'applicationWeb';
  if (key === 'UTOI') return 'siteWeb';
  if (key === 'Mpaudio') return 'motion';
  return 'application';
}

function mergeStoredProject(
  key: string,
  defaults: ProjectData,
  saved: Partial<ProjectWithMeta> | undefined,
): ProjectWithMeta {
  if (CONTENT_FROM_CODE_ONLY.has(key) || !saved) {
    return {
      ...defaults,
      id: saved?.id ?? key,
      coverImage: resolveCoverImage(key, saved?.coverImage),
      category: resolveCategory(key, saved?.category),
      status: saved?.status ?? 'published',
      lastModified: saved?.lastModified ?? new Date().toISOString(),
      createdAt: saved?.createdAt ?? new Date().toISOString(),
    };
  }

  return {
    ...defaults,
    ...saved,
    userFlow: defaults.userFlow ?? saved?.userFlow,
    auditLeadAfterCarousel: defaults.auditLeadAfterCarousel ?? saved?.auditLeadAfterCarousel,
    auditBodyAfterCarousel: defaults.auditBodyAfterCarousel ?? saved?.auditBodyAfterCarousel,
    translations:
      defaults.translations || saved?.translations
        ? {
            ...defaults.translations,
            ...saved?.translations,
            en: {
              ...defaults.translations?.en,
              ...saved?.translations?.en,
              auditLeadAfterCarousel:
                defaults.translations?.en?.auditLeadAfterCarousel ??
                saved?.translations?.en?.auditLeadAfterCarousel,
              auditBodyAfterCarousel:
                defaults.translations?.en?.auditBodyAfterCarousel ??
                saved?.translations?.en?.auditBodyAfterCarousel,
            },
          }
        : undefined,
    id: saved?.id ?? key,
    coverImage: resolveCoverImage(key, saved?.coverImage),
    category: resolveCategory(key, saved?.category),
    status: saved?.status ?? 'published',
    lastModified: saved?.lastModified ?? new Date().toISOString(),
    createdAt: saved?.createdAt ?? new Date().toISOString(),
  } as ProjectWithMeta;
}

export interface ProjectWithMeta extends ProjectData {
  id: string;
  coverImage?: string;
  category?: string;
  status?: 'published' | 'draft';
  lastModified?: string;
  createdAt?: string;
}

// Export de type explicite pour compatibilité
export type { ProjectWithMeta };

// Charger les projets depuis localStorage ou utiliser les données par défaut
export const loadProjects = (): { [key: string]: ProjectWithMeta } => {
  try {
    const storedVersion = parseInt(localStorage.getItem(DATA_VERSION_KEY) ?? '0', 10);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && storedVersion >= DATA_VERSION) {
      const parsed = JSON.parse(stored);
      const merged: { [key: string]: ProjectWithMeta } = {};
      Object.keys(projectsDataNew).forEach((key) => {
        const defaults = projectsDataNew[key];
        const saved = parsed[key] as Partial<ProjectWithMeta> | undefined;
        merged[key] = mergeStoredProject(key, defaults, saved);
      });
      return merged;
    }
    if (stored) {
      localStorage.setItem(DATA_VERSION_KEY, String(DATA_VERSION));
    }
  } catch (error) {
    console.error('Erreur lors du chargement des projets:', error);
  }
  
  // Convertir les données par défaut en format avec métadonnées
  const projectsWithMeta: { [key: string]: ProjectWithMeta } = {};
  Object.keys(projectsDataNew).forEach(key => {
    const coverImage = resolveCoverImage(key);
    projectsWithMeta[key] = {
      ...projectsDataNew[key],
      id: key,
      coverImage,
      category: resolveCategory(key),
      status: 'published',
      lastModified: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
  });
  
  // Sauvegarder les projets par défaut et la version pour les prochains chargements
  saveProjects(projectsWithMeta);
  try {
    localStorage.setItem(DATA_VERSION_KEY, String(DATA_VERSION));
  } catch {
    // ignore
  }
  return projectsWithMeta;
};

// Sauvegarder les projets dans localStorage
export const saveProjects = (projects: { [key: string]: ProjectWithMeta }) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    // Déclencher un événement personnalisé pour notifier les composants
    window.dispatchEvent(new Event('projectsUpdated'));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des projets:', error);
  }
};

// Obtenir tous les projets
export const getAllProjects = (): ProjectWithMeta[] => {
  const projects = loadProjects();
  return Object.values(projects);
};

// Obtenir un projet par ID
export const getProjectById = (id: string): ProjectWithMeta | null => {
  const projects = loadProjects();
  return projects[id] || null;
};

// Créer un nouveau projet
export const createProject = (project: ProjectWithMeta): ProjectWithMeta => {
  const projects = loadProjects();
  const newProject: ProjectWithMeta = {
    ...project,
    id: project.id || `project-${Date.now()}`,
    createdAt: new Date().toISOString(),
    lastModified: new Date().toISOString(),
    status: project.status || 'draft',
  };
  
  projects[newProject.id] = newProject;
  saveProjects(projects);
  return newProject;
};

// Mettre à jour un projet
export const updateProject = (id: string, updates: Partial<ProjectWithMeta>): ProjectWithMeta | null => {
  const projects = loadProjects();
  if (!projects[id]) {
    return null;
  }
  
  projects[id] = {
    ...projects[id],
    ...updates,
    id, // S'assurer que l'ID ne change pas
    lastModified: new Date().toISOString(),
  };
  
  saveProjects(projects);
  return projects[id];
};

// Supprimer un projet
export const deleteProject = (id: string): boolean => {
  const projects = loadProjects();
  if (!projects[id]) {
    return false;
  }
  
  delete projects[id];
  saveProjects(projects);
  return true;
};

// Obtenir les projets par catégorie (filtre)
export const getProjectsByCategoryFilter = (category: string): ProjectWithMeta[] => {
  return getAllProjects().filter(project => project.category === category);
};

// Rechercher des projets
export const searchProjects = (query: string): ProjectWithMeta[] => {
  const lowerQuery = query.toLowerCase();
  return getAllProjects().filter(project => 
    project.title.toLowerCase().includes(lowerQuery) ||
    project.subtitle?.toLowerCase().includes(lowerQuery) ||
    project.summary.toLowerCase().includes(lowerQuery)
  );
};

// Interface pour les projets du menu (compatibilité avec menuCategories)
export interface MenuItem {
  imageSrc: string;
  imageAlt: string;
  title: string;
  className?: string;
  id?: string;
  category?: string;
}

// Interface pour les catégories (compatibilité avec menuCategories)
export interface MenuCategory {
  key: string;
  title: string;
  projects: MenuItem[];
}

// Convertir les projets en format MenuItem
export const getProjectsAsMenuItems = (): MenuItem[] => {
  return getAllProjects()
    .filter(project => project.status === 'published') // Seulement les projets publiés
    .map(project => ({
      imageSrc: project.coverImage || project.image || '',
      imageAlt: project.title,
      title: project.title,
      id: project.id,
      category: project.category,
    }));
};

// Obtenir les projets groupés par catégorie (format MenuCategory)
export const getProjectsGroupedByCategory = (): MenuCategory[] => {
  const projects = getAllProjects().filter(project => project.status === 'published');
  
  // Mapping des catégories
  const categoryMap: { [key: string]: { key: string; title: string } } = {
    'application': { key: 'application', title: 'Application' },
    'applicationWeb': { key: 'applicationWeb', title: 'Application web' },
    'siteWeb': { key: 'siteWeb', title: 'Site web' },
    'logo': { key: 'logo', title: 'Logo' },
    'motion': { key: 'motion', title: 'Motion' },
    'plv': { key: 'plv', title: 'Plv' },
  };

  // Grouper par catégorie
  const grouped: { [key: string]: MenuItem[] } = {};
  
  projects.forEach(project => {
    const categoryKey = project.category || 'application';
    const category = categoryMap[categoryKey] || categoryMap['application'];
    
    if (!grouped[category.key]) {
      grouped[category.key] = [];
    }
    
    grouped[category.key].push({
      imageSrc: project.coverImage || project.image || '',
      imageAlt: project.title,
      title: project.title,
      id: project.id,
      category: category.title,
    });
  });

  // Convertir en tableau MenuCategory
  return Object.entries(grouped).map(([key, projects]) => {
    const category = categoryMap[key] || categoryMap['application'];
    return {
      key,
      title: category.title,
      projects,
    };
  });
};

// Obtenir un projet par son titre (pour compatibilité avec l'ancien système)
export const getProjectByTitle = (title: string): ProjectWithMeta | null => {
  const projects = getAllProjects();
  return projects.find(p => p.title === title) || null;
};
