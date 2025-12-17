import '../PedaboardWireframe.css';

interface WireframeHeaderProps {
  onElementClick?: (element: string, description: string) => void;
}

const WireframeHeader = ({ onElementClick }: WireframeHeaderProps) => {
  const handleClick = (e: React.MouseEvent, element: string, description: string) => {
    e.stopPropagation();
    if (onElementClick) {
      onElementClick(element, description);
    }
  };

  return (
    <div className="pedaboard-header">
      <div 
        className="logo clickable-element"
        onClick={(e) => handleClick(e, 'Logo', 'Logo de l\'application - Élément d\'identité visuelle principale')}
      >
        <span className="logo-text">Logo</span>
      </div>
      
      <div className="header-nav">
        <button 
          className="nav-btn active clickable-element"
          onClick={(e) => handleClick(e, 'Navigation Principale', 'Boutons de navigation primaire - Permet de basculer entre les sections principales')}
        >
          Primary
        </button>
        <button 
          className="nav-btn clickable-element"
          onClick={(e) => handleClick(e, 'Navigation Secondaire', 'Navigation secondaire - Accès aux fonctionnalités complémentaires')}
        >
          Secondary
        </button>
        <button 
          className="nav-btn clickable-element"
          onClick={(e) => handleClick(e, 'Navigation Tertiaire', 'Navigation tertiaire - Fonctionnalités avancées et paramètres')}
        >
          Tertiary
        </button>
      </div>
      
      <div className="header-right">
        <button 
          className="nav-btn clickable-element"
          onClick={(e) => handleClick(e, 'Action Button', 'Bouton d\'action rapide - Permet d\'effectuer une action contextuelle')}
        >
          Button
        </button>
        <button 
          className="nav-btn clickable-element"
          onClick={(e) => handleClick(e, 'Action Button', 'Bouton d\'action secondaire - Action complémentaire rapide')}
        >
          Button
        </button>
        <button 
          className="icon-btn clickable-element"
          onClick={(e) => handleClick(e, 'Ajouter', 'Bouton d\'ajout - Créer un nouvel élément rapidement')}
        >
          +
        </button>
        <button 
          className="icon-btn clickable-element"
          onClick={(e) => handleClick(e, 'Notifications', 'Centre de notifications - Affiche les alertes et messages importants')}
        >
          🔔
        </button>
        <div 
          className="avatar clickable-element"
          onClick={(e) => handleClick(e, 'Profil Utilisateur', 'Avatar et menu utilisateur - Accès au profil et paramètres personnels')}
        ></div>
      </div>
    </div>
  );
};

export default WireframeHeader;

