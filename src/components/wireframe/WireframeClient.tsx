import '../PedaboardWireframe.css';

interface WireframeClientProps {
  onElementClick?: (element: string, description: string) => void;
}

const WireframeClient = ({ onElementClick }: WireframeClientProps) => {
  const handleClick = (e: React.MouseEvent, element: string, description: string) => {
    e.stopPropagation();
    if (onElementClick) {
      onElementClick(element, description);
    }
  };

  return (
    <div className="client-section">
      <div className="section-header">
        <h2>Lorem Ipsum</h2>
        <div className="section-actions">
          <button 
            className="icon-btn clickable-element"
            onClick={(e) => handleClick(e, 'Paramètres', 'Bouton paramètres - Configure les options d\'affichage du tableau')}
          >
            ⚙️
          </button>
          <button 
            className="icon-btn clickable-element"
            onClick={(e) => handleClick(e, 'Télécharger', 'Bouton téléchargement - Exporte les données du tableau')}
          >
            ↓
          </button>
          <button 
            className="icon-btn clickable-element"
            onClick={(e) => handleClick(e, 'Ouvrir en externe', 'Bouton d\'ouverture - Affiche le tableau en plein écran')}
          >
            ↗
          </button>
        </div>
      </div>
      
      <div 
        className="client-table clickable-element"
        onClick={(e) => handleClick(e, 'Tableau de Données', 'Tableau client - Affiche les informations clients avec mise en évidence des données importantes')}
      >
        <table>
          <thead>
            <tr>
              <th>Lorem</th>
              <th>Ipsum</th>
              <th>Dolor</th>
              <th>Sit</th>
              <th>Amet</th>
              <th>Consectetur</th>
              <th>Adipiscing</th>
              <th>Elit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lorem</td>
              <td className="highlight">Ipsum</td>
              <td>Dolor</td>
              <td className="highlight">Sit Amet</td>
              <td>Consectetur</td>
              <td>Adipiscing</td>
              <td>Elit</td>
              <td>Nunc</td>
            </tr>
            <tr>
              <td>Dolor</td>
              <td className="highlight">Sit</td>
              <td>Amet</td>
              <td className="highlight">Consectetur</td>
              <td>Adipiscing</td>
              <td>Elit</td>
              <td>Nunc</td>
              <td>Vulputate</td>
            </tr>
            <tr>
              <td>Libero</td>
              <td className="highlight">Velit</td>
              <td>Interdum</td>
              <td className="highlight">Aliquet</td>
              <td>Odio</td>
              <td>Mattis</td>
              <td>Etiam</td>
              <td>Tempor</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WireframeClient;

