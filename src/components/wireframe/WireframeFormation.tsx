import '../PedaboardWireframe.css';

interface WireframeFormationProps {
  onElementClick?: (element: string, description: string) => void;
}

const WireframeFormation = ({ onElementClick }: WireframeFormationProps) => {
  const handleClick = (e: React.MouseEvent, element: string, description: string) => {
    e.stopPropagation();
    if (onElementClick) {
      onElementClick(element, description);
    }
  };

  return (
    <div className="formation-section">
      <h2>Lorem Ipsum</h2>
      <div className="formation-cards">
        <div 
          className="formation-card clickable-element"
          onClick={(e) => handleClick(e, 'Carte Formation', 'Carte de formation - Affiche les détails d\'une session : date, lieu, durée, participants et places disponibles')}
        >
          <div className="card-top">
            <span className="date-badge">00/00/0000</span>
            <button className="card-arrow">↗</button>
          </div>
          <p className="card-subtitle">Lorem ipsum</p>
          <h3 className="card-title">Dolor Sit Amet</h3>
          <div className="card-icons">
            <div className="icon-item">📍 Lorem</div>
            <div className="icon-item">📚 Ipsum</div>
            <div className="icon-item">👥 0 dolor</div>
          </div>
          <span className="places-badge">primary button</span>
        </div>
        
        <div 
          className="formation-card clickable-element"
          onClick={(e) => handleClick(e, 'Carte Formation', 'Deuxième session de formation - Organisée de manière similaire avec date, informations et disponibilité')}
        >
          <div className="card-top">
            <span className="date-badge">00/00/0000</span>
            <button className="card-arrow">↗</button>
          </div>
          <p className="card-subtitle">Lorem ipsum</p>
          <h3 className="card-title">Dolor Sit Amet</h3>
          <div className="card-icons">
            <div className="icon-item">📍 Lorem</div>
            <div className="icon-item">📚 Ipsum</div>
            <div className="icon-item">👥 0 dolor</div>
          </div>
          <span className="places-badge">primary button</span>
        </div>
      </div>
    </div>
  );
};

export default WireframeFormation;

