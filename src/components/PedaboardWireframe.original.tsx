import './PedaboardWireframe.css';

const PedaboardWireframe = () => {
  return (
    <div className="pedaboard-wireframe">
      {/* Header */}
      <div className="pedaboard-header">
        <div className="logo">
          <div className="logo-circle yellow"></div>
          <div className="logo-circle blue"></div>
        </div>
        <div className="header-nav">
          <button className="nav-btn active">Mes espaces</button>
          <button className="nav-btn">Contact</button>
          <button className="nav-btn">Formation</button>
        </div>
        <div className="header-right">
          <button className="nav-btn">Boutique</button>
          <button className="nav-btn">Laboratoire</button>
          <button className="icon-btn">+</button>
          <button className="icon-btn">🔔</button>
          <div className="avatar"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pedaboard-main">
        <h1 className="greeting">Hello Cyrielle</h1>
        
        <div className="content-grid">
          {/* Colonne 1: Tâches et Rappels */}
          <div className="tasks-column">
            <div className="tasks-header">
              <div className="task-tabs">
                <button className="task-tab active">
                  <span className="badge">5</span>
                  Tâches
                </button>
                <button className="task-tab">
                  <span className="badge">5</span>
                  Rappels
                </button>
              </div>
            </div>
            
            <div className="task-list">
              <div className="task-card">
                <div className="task-header-row">
                  <span className="task-client">Skydo Digital</span>
                  <span className="task-date">22/14/2024</span>
                </div>
                <h3 className="task-title">Relancer Skydo sur sa demande de formation</h3>
                <p className="task-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              
              <div className="task-card yellow">
                <div className="task-header-row">
                  <span className="task-client">Albione</span>
                  <span className="task-date">22/14/2024</span>
                </div>
                <h3 className="task-title">Rapprochement bancaire</h3>
                <p className="task-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              
              <div className="task-card yellow">
                <div className="task-header-row">
                  <span className="task-client">Nike</span>
                  <span className="task-date">22/14/2024</span>
                </div>
                <h3 className="task-title">Mettre à jour le stock de la boutique</h3>
                <p className="task-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
          </div>

          {/* Colonne 2: Client & Formation */}
          <div className="main-column">
            {/* Section Client */}
            <div className="client-section">
              <div className="section-header">
                <h2>Client</h2>
                <div className="section-actions">
                  <button className="icon-btn">⚙️</button>
                  <button className="icon-btn">↓</button>
                  <button className="icon-btn">↗</button>
                </div>
              </div>
              
              <div className="client-table">
                <table>
                  <thead>
                    <tr>
                      <th>Commercial</th>
                      <th>Nom</th>
                      <th>Statuts</th>
                      <th>Contact</th>
                      <th>Poste</th>
                      <th>Localisation</th>
                      <th>Secteur</th>
                      <th>Formation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Cyrielle</td>
                      <td className="highlight">Skydo</td>
                      <td>Actif</td>
                      <td className="highlight">Lionel Diallo</td>
                      <td>Gérant</td>
                      <td>La Réunion</td>
                      <td>Marketing</td>
                      <td>Relation client</td>
                    </tr>
                    <tr>
                      <td>Cyrielle</td>
                      <td className="highlight">Skydo</td>
                      <td>En attentes</td>
                      <td className="highlight">Lionel Diallo</td>
                      <td>Gérant</td>
                      <td>La Réunion</td>
                      <td>Marketing</td>
                      <td>Relation client</td>
                    </tr>
                    <tr>
                      <td>Léa</td>
                      <td className="highlight">Dupont</td>
                      <td>Actif</td>
                      <td className="highlight">Sophie</td>
                      <td>Responsable</td>
                      <td>Paris</td>
                      <td>Commerce</td>
                      <td>Acquisition</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section Formation & Outils */}
            <div className="bottom-sections">
              <div className="formation-section">
                <h2>Formation</h2>
                <div className="formation-cards">
                  <div className="formation-card">
                    <div className="card-top">
                      <span className="date-badge">20 Mai, 2023</span>
                      <button className="card-arrow">↗</button>
                    </div>
                    <p className="card-subtitle">Relation client</p>
                    <h3 className="card-title">Skydo Digital</h3>
                    <div className="card-icons">
                      <div className="icon-item">📍 Sur site</div>
                      <div className="icon-item">📚 Sujet</div>
                      <div className="icon-item">👥 7 personnes</div>
                    </div>
                    <span className="places-badge">6 places restantes</span>
                  </div>
                  
                  <div className="formation-card">
                    <div className="card-top">
                      <span className="date-badge">20 Mai, 2023</span>
                      <button className="card-arrow">↗</button>
                    </div>
                    <p className="card-subtitle">Relation client</p>
                    <h3 className="card-title">Skydo Digital</h3>
                    <div className="card-icons">
                      <div className="icon-item">📍 Sur site</div>
                      <div className="icon-item">📚 Sujet</div>
                      <div className="icon-item">👥 7 personnes</div>
                    </div>
                    <span className="places-badge">6 places restantes</span>
                  </div>
                </div>
              </div>

              <div className="outils-section">
                <div className="section-header">
                  <h2>Mes outils</h2>
                  <button className="icon-btn">+</button>
                </div>
                <div className="outils-grid">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="outil-card">
                      <div className="canva-logo">Canva</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PedaboardWireframe;

