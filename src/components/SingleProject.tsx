import React from 'react';
import './SingleProject.css';
import HoverCard from './HoverCard';
import ProjectStats from './ProjectStats';
import ProjectCharts from './ProjectCharts';

interface ProjectData {
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

interface SingleProjectProps {
  projectData: ProjectData;
  onBackClick: () => void;
}

const SingleProject: React.FC<SingleProjectProps> = ({ projectData, onBackClick }) => {
  // Fonction pour calculer la couleur de texte appropriée selon le contraste
  const getTextColor = (backgroundColor: string) => {
    // Convertir hex en RGB
    const hex = backgroundColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Calculer la luminance relative
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Retourner blanc ou noir selon la luminance
    return luminance > 0.5 ? '#000000' : '#ffffff';
  };

  return (
    <div className="page active single-project-page">
      <div className="main-single-project">
        {/* Header */}
        <div className="project-header">
          <h1 className="project-title">{projectData.title}</h1>
          <h2 className="project-year">{projectData.year}</h2>
        </div>

        {/* Hero Image */}
        <div className="project-hero">
          <img src={projectData.image} alt={projectData.title} />
        </div>

        {/* Skills Grid */}
        <div className="skills-grid">
          {projectData.skills.map((skill, index) => (
            <HoverCard key={index} intensity={0.05} scale={1.02}>
              <div className="skill-card">
                <h3>{skill}</h3>
              </div>
            </HoverCard>
          ))}
          <HoverCard intensity={0.05} scale={1.02}>
            <div className="skill-card">
              <h3>{projectData.duration}</h3>
              <p>Durée</p>
            </div>
          </HoverCard>
        </div>

        {/* Content Section */}
        <div className="content-section">
          <div className="description-card">
            <h2>Description</h2>
            <p>{projectData.description}</p>
          </div>
          
          <div className="project-info-card">
            <div className="info-item">
              <h3>Années</h3>
              <p>{projectData.year}</p>
            </div>
            <div className="info-item">
              <h3>Durée</h3>
              <p>{projectData.duration}</p>
            </div>
            <div className="info-item">
              <h3>Type</h3>
              <p>{projectData.type}</p>
            </div>
            <div className="info-item">
              <h3>L'équipe projet :</h3>
              <ul>
                {projectData.team.map((member, index) => (
                  <li key={index}>{member}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Process Cards */}
        <div className="process-cards">
          <div className="process-card">
            <h2>Recherche UX & analyse de la faisabilité technique</h2>
            <p>{projectData.uxResearch}</p>
          </div>
          <div className="process-card">
            <h2>Recueil du besoin & cadrage du projet</h2>
            <p>{projectData.projectFraming}</p>
          </div>
        </div>

        {/* User Flow */}
        <div className="user-flow-section">
          <h2>User flow</h2>
          <div className="user-flow-diagram">
            <div className="flow-container">
              <div className="flow-node login">
                <span>Login</span>
              </div>
              <div className="flow-line vertical"></div>
              <div className="flow-node password">
                <span>Mot de passe oublié</span>
              </div>
              <div className="flow-line vertical"></div>
              <div className="flow-node dashboard">
                <span>Dashboard</span>
              </div>
              <div className="flow-line vertical"></div>
              <div className="flow-branches">
                <div className="flow-branch">
                  <div className="flow-node account">
                    <span>Compte</span>
                  </div>
                  <div className="flow-spacer"></div>
                  <div className="flow-node contact">
                    <span>Contact</span>
                  </div>
                  <div className="flow-spacer"></div>
                  <div className="flow-node tasks">
                    <span>Page Tâches</span>
                  </div>
                  <div className="flow-spacer"></div>
                  <div className="flow-node training">
                    <span>Formation</span>
                  </div>
                  <div className="flow-spacer"></div>
                  <div className="flow-node laboratory">
                    <span>Laboratoire</span>
                  </div>
                </div>
                <div className="flow-sub-branches">
                  <div className="flow-spacer"></div>
                  <div className="flow-node client-file">
                    <span>Fiche client</span>
                  </div>
                  <div className="flow-spacer"></div>
                  <div className="flow-node task-view">
                    <span>Vue tâche</span>
                  </div>
                  <div className="flow-spacer"></div>
                  <div className="flow-node details">
                    <span>Détails</span>
                  </div>
                  <div className="flow-spacer"></div>
                  <div className="flow-node details">
                    <span>Détails</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Color Palette */}
        <div className="color-palette-section">
          <h2>Palette colorimétrique</h2>
          <p>Pour le projet {projectData.title}, nous avons défini une palette dynamique et contrastée, en cohérence avec les valeurs de pédagogie active portées par la cliente. L'objectif était de renforcer l'identité visuelle tout en garantissant une bonne lisibilité et une hiérarchisation claire de l'information sur l'interface.</p>
          
          {/* Neutrals */}
          <div className="color-category">
            <h3>Neutrals (pour les surfaces et textes)</h3>
            <div className="color-table">
              <div className="table-header">
                <span>Rôle</span>
                <span>Nom Figma (token)</span>
                <span>Couleur</span>
                <span>Utilisation</span>
              </div>
              {projectData.colorPalette.neutrals.map((color, index) => (
                <div key={index} className="table-row">
                  <span>{color.role}</span>
                  <span>{color.token}</span>
                  <div className="color-preview" style={{ backgroundColor: color.color }}>
                    <span style={{ color: getTextColor(color.color) }}>{color.color}</span>
                  </div>
                  <span>{color.usage}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Primary */}
          <div className="color-category">
            <h3>Primary (action principale)</h3>
            <div className="color-table">
              <div className="table-header">
                <span>Rôle</span>
                <span>Nom Figma (token)</span>
                <span>Couleur</span>
              </div>
              {projectData.colorPalette.primary.map((color, index) => (
                <div key={index} className="table-row">
                  <span>{color.role}</span>
                  <span>{color.token}</span>
                  <div className="color-preview" style={{ backgroundColor: color.color }}>
                    <span style={{ color: getTextColor(color.color) }}>{color.color}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary */}
          <div className="color-category">
            <h3>Secondary (action secondaire ou highlight)</h3>
            <div className="color-table">
              <div className="table-header">
                <span>Rôle</span>
                <span>Nom Figma (token)</span>
                <span>Couleur</span>
              </div>
              {projectData.colorPalette.secondary.map((color, index) => (
                <div key={index} className="table-row">
                  <span>{color.role}</span>
                  <span>{color.token}</span>
                  <div className="color-preview" style={{ backgroundColor: color.color }}>
                    <span style={{ color: getTextColor(color.color) }}>{color.color}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Accent */}
          <div className="color-category">
            <h3>Accent / Warning / Highlight</h3>
            <div className="color-table">
              <div className="table-header">
                <span>Rôle</span>
                <span>Nom Figma (token)</span>
                <span>Couleur</span>
              </div>
              {projectData.colorPalette.accent.map((color, index) => (
                <div key={index} className="table-row">
                  <span>{color.role}</span>
                  <span>{color.token}</span>
                  <div className="color-preview" style={{ backgroundColor: color.color }}>
                    <span style={{ color: getTextColor(color.color) }}>{color.color}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Error */}
          <div className="color-category">
            <h3>Error / Danger</h3>
            <div className="color-table">
              <div className="table-header">
                <span>Rôle</span>
                <span>Nom Figma (token)</span>
                <span>Couleur</span>
              </div>
              {projectData.colorPalette.error.map((color, index) => (
                <div key={index} className="table-row">
                  <span>{color.role}</span>
                  <span>{color.token}</span>
                  <div className="color-preview" style={{ backgroundColor: color.color }}>
                    <span style={{ color: getTextColor(color.color) }}>{color.color}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Typography */}
        <div className="typography-section">
          <h2>Typographique</h2>
          <p>Le système typographique a été construit autour d'une échelle hiérarchique fine, allant de H1 (32 px) à H9 (13 px), avec un interlignage constant de 150 % pour assurer la lisibilité. J'ai appliqué une logique modulaire en nommant chaque style selon sa fonction (ex. a.var.caption.notification, label, p), ce qui m'a permis d'optimiser leur réutilisabilité dans une approche Atomic Design.</p>
          <p>L'ensemble repose sur la police Inter Variable, utilisée exclusivement dans différentes graisses pour structurer l'interface sans surcharger le chargement ni la lecture.</p>
          
          <div className="typography-table">
            <div className="table-header">
              <span>Style</span>
              <span>typographie</span>
              <span>exemple</span>
              <span>taille px</span>
              <span>Interlignage</span>
            </div>
            {projectData.typography.map((type, index) => (
              <div key={index} className="table-row">
                <span>{type.style}</span>
                <span>{type.font}</span>
                <span className="typography-example" style={{ 
                  fontSize: type.size + 'px',
                  fontFamily: type.font.includes('Inter') ? 'Inter, sans-serif' : 'inherit'
                }}>
                  Hello {projectData.title}
                </span>
                <span>{type.size}</span>
                <span>{type.lineHeight}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Project Stats */}
        <ProjectStats />
        
        {/* Project Charts */}
        <ProjectCharts />
      </div>
    </div>
  );
};

export default SingleProject;
