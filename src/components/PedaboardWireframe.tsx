import { useState } from 'react';
import './PedaboardWireframe.css';
import WireframeHeader from './wireframe/WireframeHeader';
import WireframeTasks from './wireframe/WireframeTasks';
import WireframeClient from './wireframe/WireframeClient';
import WireframeFormation from './wireframe/WireframeFormation';
import WireframeOutils from './wireframe/WireframeOutils';

const PedaboardWireframe = () => {
  const [selectedElement, setSelectedElement] = useState<{name: string, description: string, x: number, y: number} | null>(null);

  const handleElementClick = (element: string, description: string, event?: React.MouseEvent) => {
    const x = event?.clientX || window.innerWidth / 2;
    const y = event?.clientY || window.innerHeight / 2;
    setSelectedElement({ name: element, description, x, y });
  };

  return (
    <>
      {/* Filtre SVG pour effet crayon */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="pencil-filter">
            <feTurbulence baseFrequency="0.05" numOctaves="3" result="noise" seed="2" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      
      <div className="wireframe-wrapper">
        <div className="pedaboard-wireframe">
          {/* Header */}
          <div 
            className="header-section-wrapper clickable-element"
            onClick={(e) => handleElementClick('Section Header', 'En-tête de l\'application - Contient la navigation principale, les actions rapides et le profil utilisateur', e)}
          >
            <WireframeHeader onElementClick={handleElementClick} />
          </div>

          {/* Main Content */}
          <div 
            className="main-section-wrapper clickable-element"
            onClick={(e) => handleElementClick('Section Main', 'Zone de contenu principale - Affiche le tableau de bord avec les tâches, clients, formations et outils', e)}
          >
            <div className="pedaboard-main">
            <h1 
              className="greeting clickable-element"
              onClick={(e) => {
                e.stopPropagation();
                handleElementClick('Titre Principal', 'Titre de bienvenue personnalisé - Accueille l\'utilisateur de manière dynamique', e);
              }}
            >
              Lorem Ipsum Dolor
            </h1>
            
            <div className="content-grid">
              {/* Colonne 1: Tâches */}
              <WireframeTasks onElementClick={handleElementClick} />

              {/* Colonne 2: Client & Formation */}
              <div className="main-column">
                {/* Section Client */}
                <WireframeClient onElementClick={handleElementClick} />

                {/* Section Formation & Outils */}
                <div className="bottom-sections">
                  <WireframeFormation onElementClick={handleElementClick} />
                  <WireframeOutils onElementClick={handleElementClick} />
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
        
        {/* Affichage de l'élément sélectionné */}
        {selectedElement && (
          <div 
            className="selected-element-info"
            style={{
              top: `${selectedElement.y}px`,
              left: `${selectedElement.x}px`
            }}
          >
            <div className="info-header">
              <h4>{selectedElement.name}</h4>
              <button 
                className="close-info"
                onClick={() => setSelectedElement(null)}
              >
                ✕
              </button>
            </div>
            <p>{selectedElement.description}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default PedaboardWireframe;
