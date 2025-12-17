import '../PedaboardWireframe.css';

interface WireframeTasksProps {
  onElementClick?: (element: string, description: string) => void;
}

const WireframeTasks = ({ onElementClick }: WireframeTasksProps) => {
  const handleClick = (e: React.MouseEvent, element: string, description: string) => {
    e.stopPropagation();
    if (onElementClick) {
      onElementClick(element, description);
    }
  };

  return (
    <div className="tasks-column">
      <div className="tasks-header">
        <div 
          className="task-tabs clickable-element"
          onClick={(e) => handleClick(e, 'Onglets de Tâches', 'Système d\'onglets - Permet de filtrer les tâches par priorité et statut')}
        >
          <button className="task-tab active">
            <span className="badge">5</span>
            Primary
          </button>
          <button className="task-tab">
            <span className="badge">5</span>
            Secondary
          </button>
        </div>
      </div>
      
      <div className="task-list">
        <div 
          className="task-card clickable-element"
          onClick={(e) => handleClick(e, 'Carte de Tâche', 'Carte de tâche - Affiche les détails d\'une tâche : client, date, titre et description')}
        >
          <div className="task-header-row">
            <span className="task-client">Lorem Ipsum</span>
            <span className="task-date">00/00/0000</span>
          </div>
          <h3 className="task-title">Lorem ipsum dolor sit amet</h3>
          <p className="task-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum.</p>
        </div>
        
        <div 
          className="task-card yellow clickable-element"
          onClick={(e) => handleClick(e, 'Tâche Prioritaire', 'Tâche haute priorité - Signalée visuellement par la couleur jaune pour attirer l\'attention')}
        >
          <div className="task-header-row">
            <span className="task-client">Dolor Sit</span>
            <span className="task-date">00/00/0000</span>
          </div>
          <h3 className="task-title">Consectetur adipiscing elit</h3>
          <p className="task-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum.</p>
        </div>
        
        <div 
          className="task-card yellow clickable-element"
          onClick={(e) => handleClick(e, 'Tâche Prioritaire', 'Tâche haute priorité - Nécessite une action rapide de l\'utilisateur')}
        >
          <div className="task-header-row">
            <span className="task-client">Amet Elit</span>
            <span className="task-date">00/00/0000</span>
          </div>
          <h3 className="task-title">Vulputate libero et velit</h3>
          <p className="task-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum.</p>
        </div>
      </div>
    </div>
  );
};

export default WireframeTasks;

