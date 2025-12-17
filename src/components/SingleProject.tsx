import React, { useState } from 'react';
import './SingleProject.css';
import HoverCard from './HoverCard';
import Button from './Button';

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
  const [isClosing, setIsClosing] = useState(false);

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

  const handleClose = () => {
    setIsClosing(true);
    // Attendre la fin de l'animation avant de fermer
    setTimeout(() => {
      onBackClick();
    }, 400); // Durée de l'animation
  };

  return (
    <div className={`page active single-project-page ${isClosing ? 'closing' : ''}`}>
      <div className="main-single-project">
        {/* Bouton Retour */}
        <div className="back-button-container">
          <Button variant="secondary" onClick={handleClose} className="back-button" icon={true}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
        </div>

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
          
          <div className="description-card">
            <h2>Description</h2>
            <p>{projectData.description}</p>
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
            <div className="table-wrapper">
              <table className="color-table">
                <thead>
                  <tr>
                    <th>Rôle</th>
                    <th>Nom Figma (token)</th>
                    <th>Couleur</th>
                    <th>Utilisation</th>
                  </tr>
                </thead>
                <tbody>
                  {projectData.colorPalette.neutrals.map((color, index) => (
                    <tr key={index}>
                      <td>{color.role}</td>
                      <td>{color.token}</td>
                      <td>
                        <div className="color-preview" style={{ backgroundColor: color.color }}>
                          <span style={{ color: getTextColor(color.color) }}>{color.color}</span>
                        </div>
                      </td>
                      <td>{color.usage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Primary */}
          <div className="color-category">
            <h3>Primary (action principale)</h3>
            <div className="table-wrapper">
              <table className="color-table">
                <thead>
                  <tr>
                    <th>Rôle</th>
                    <th>Nom Figma (token)</th>
                    <th>Couleur</th>
                  </tr>
                </thead>
                <tbody>
                  {projectData.colorPalette.primary.map((color, index) => (
                    <tr key={index}>
                      <td>{color.role}</td>
                      <td>{color.token}</td>
                      <td>
                        <div className="color-preview" style={{ backgroundColor: color.color }}>
                          <span style={{ color: getTextColor(color.color) }}>{color.color}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Secondary */}
          <div className="color-category">
            <h3>Secondary (action secondaire ou highlight)</h3>
            <div className="table-wrapper">
              <table className="color-table">
                <thead>
                  <tr>
                    <th>Rôle</th>
                    <th>Nom Figma (token)</th>
                    <th>Couleur</th>
                  </tr>
                </thead>
                <tbody>
                  {projectData.colorPalette.secondary.map((color, index) => (
                    <tr key={index}>
                      <td>{color.role}</td>
                      <td>{color.token}</td>
                      <td>
                        <div className="color-preview" style={{ backgroundColor: color.color }}>
                          <span style={{ color: getTextColor(color.color) }}>{color.color}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Accent */}
          <div className="color-category">
            <h3>Accent / Warning / Highlight</h3>
            <div className="table-wrapper">
              <table className="color-table">
                <thead>
                  <tr>
                    <th>Rôle</th>
                    <th>Nom Figma (token)</th>
                    <th>Couleur</th>
                  </tr>
                </thead>
                <tbody>
                  {projectData.colorPalette.accent.map((color, index) => (
                    <tr key={index}>
                      <td>{color.role}</td>
                      <td>{color.token}</td>
                      <td>
                        <div className="color-preview" style={{ backgroundColor: color.color }}>
                          <span style={{ color: getTextColor(color.color) }}>{color.color}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Error */}
          <div className="color-category">
            <h3>Error / Danger</h3>
            <div className="table-wrapper">
              <table className="color-table">
                <thead>
                  <tr>
                    <th>Rôle</th>
                    <th>Nom Figma (token)</th>
                    <th>Couleur</th>
                  </tr>
                </thead>
                <tbody>
                  {projectData.colorPalette.error.map((color, index) => (
                    <tr key={index}>
                      <td>{color.role}</td>
                      <td>{color.token}</td>
                      <td>
                        <div className="color-preview" style={{ backgroundColor: color.color }}>
                          <span style={{ color: getTextColor(color.color) }}>{color.color}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Typography */}
        <div className="typography-section">
          <h2>Typography & Colors</h2>
          
          {/* Font Family Display */}
          <div className="font-family-display">
            <h3 className="font-name">
              SF Pr<span className="emoji-o">👋</span>
            </h3>
            <div className="font-weights">
              <span>Regular</span>
              <span>x</span>
              <span>Medium</span>
              <span>x</span>
              <span>Semibold</span>
            </div>
          </div>

          {/* Style Overview */}
          <div className="style-overview">
            <div className="large-letter-display">Aa</div>
            <div className="alphabet-display">
              <span>Bb</span>
              <span>Cc</span>
              <span>Dd</span>
              <span>Ee</span>
              <span>Ff</span>
              <span>Gg</span>
              <span>Hh</span>
              <span>Ii</span>
              <span>Jj</span>
              <span>Kk</span>
              <span>Ll</span>
              <span>Mm</span>
              <span>Nn</span>
              <span>Oo</span>
              <span>Pp</span>
              <span>Qq</span>
              <span>Rr</span>
              <span>Ss</span>
              <span>Tt</span>
              <span>Uu</span>
              <span>Vv</span>
              <span>Ww</span>
              <span>Xx</span>
              <span>Yy</span>
              <span>Zz</span>
            </div>
          </div>

          {/* Font Sizes Scale */}
          <div className="font-sizes-scale">
            <div className="scale-line"></div>
            <div className="font-sizes">
              <div className="font-size-item">
                <div className="font-size-tick"></div>
                <div className="font-size-label">12 pt</div>
              </div>
              <div className="font-size-item">
                <div className="font-size-tick"></div>
                <div className="font-size-label">14 pt</div>
              </div>
              <div className="font-size-item">
                <div className="font-size-tick"></div>
                <div className="font-size-label">16 pt</div>
              </div>
              <div className="font-size-item">
                <div className="font-size-tick"></div>
                <div className="font-size-label">18 pt</div>
              </div>
              <div className="font-size-item">
                <div className="font-size-tick"></div>
                <div className="font-size-label">24 pt</div>
              </div>
              <div className="font-size-item">
                <div className="font-size-tick"></div>
                <div className="font-size-label highlighted">36 pt</div>
              </div>
            </div>
          </div>
        </div>

        {/* Composants Section */}
        <div className="components-section">
          <div className="section-card">
            <div className="components-header">
              <h2 className="components-title">Composants</h2>
              <p className="components-subtitle">Système de composants Pedaboard</p>
            </div>
            
            <div className="components-content">
              <div className="components-grid">
                {/* Boutons avec icônes */}
                <div className="component-group">
                  <div className="component-item">
                    <button className="pedaboard-btn pedaboard-btn-icon pedaboard-btn-white">
                      <img src="/images/4a0ee018277331dcb02f5b3f940ff6f565bab339.svg" alt="Icon" />
                    </button>
                    <span className="component-label">Bouton icône blanc</span>
                  </div>
                  
                  <div className="component-item">
                    <button className="pedaboard-btn pedaboard-btn-icon pedaboard-btn-orange">
                      <img src="/images/4a0ee018277331dcb02f5b3f940ff6f565bab339.svg" alt="Icon" />
                    </button>
                    <span className="component-label">Bouton icône orange</span>
                  </div>
                </div>

                {/* Boutons avec texte */}
                <div className="component-group">
                  <div className="component-item">
                    <button className="pedaboard-btn pedaboard-btn-text pedaboard-btn-white">
                      <img src="/images/4a0ee018277331dcb02f5b3f940ff6f565bab339.svg" alt="Icon" />
                      <span>Accueil</span>
                    </button>
                    <span className="component-label">Bouton texte blanc</span>
                  </div>
                  
                  <div className="component-item">
                    <button className="pedaboard-btn pedaboard-btn-text pedaboard-btn-orange">
                      <img src="/images/4a0ee018277331dcb02f5b3f940ff6f565bab339.svg" alt="Icon" />
                      <span>Connexion</span>
                    </button>
                    <span className="component-label">Bouton texte orange</span>
                  </div>
                </div>

                {/* Boutons texte seulement */}
                <div className="component-group">
                  <div className="component-item">
                    <button className="pedaboard-btn pedaboard-btn-text pedaboard-btn-white">
                      <span>Se connecter</span>
                    </button>
                    <span className="component-label">Bouton texte simple</span>
                  </div>
                  
                  <div className="component-item">
                    <button className="pedaboard-btn pedaboard-btn-text pedaboard-btn-orange">
                      <span>Commencer</span>
                    </button>
                    <span className="component-label">Bouton texte orange</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nouvelle section */}
        <div className="new-section">
          <h2>Approche méthodologique</h2>
          <p>Cette section présente l'approche méthodologique adoptée pour ce projet, en mettant l'accent sur les processus de recherche, de conception et de validation qui ont guidé le développement de la solution.</p>
          
          <div className="methodology-image">
            <img src="/images/261061ca92433cd63b52fe7f2093041e9d831bbc.png" alt="Méthodologie de conception UX" />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default SingleProject;
