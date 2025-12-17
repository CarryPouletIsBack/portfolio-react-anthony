import '../PedaboardWireframe.css';

interface WireframeOutilsProps {
  onElementClick?: (element: string, description: string) => void;
}

const WireframeOutils = ({ onElementClick }: WireframeOutilsProps) => {
  const handleClick = (e: React.MouseEvent, element: string, description: string) => {
    e.stopPropagation();
    if (onElementClick) {
      onElementClick(element, description);
    }
  };

  return (
    <div className="outils-section">
      <div className="section-header">
        <h2>Lorem Ipsum</h2>
        <button 
          className="icon-btn clickable-element"
          onClick={(e) => handleClick(e, 'Ajouter Outil', 'Bouton d\'ajout - Permet d\'ajouter un nouvel outil à la collection')}
        >
          +
        </button>
      </div>
      <div className="outils-grid">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div 
            key={i} 
            className="outil-card clickable-element"
            onClick={(e) => handleClick(e, `Outil ${i}`, `Intégration d'outil externe - Raccourci vers un service tiers utilisé fréquemment`)}
          >
            <div className="canva-logo">Logo</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WireframeOutils;

