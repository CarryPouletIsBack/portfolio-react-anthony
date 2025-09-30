import './About.css'
import HoverCard from './HoverCard'

const About = () => {
  return (
    <div className="page active apropos-page">
      <div className="main-apropos">
        {/* Section listing - Statistiques */}
        <div className="listing-section">
          <HoverCard intensity={0.05} scale={1.02}>
            <div className="stat-card">
              <h3>4 ans</h3>
              <p>en agence</p>
            </div>
          </HoverCard>
          <HoverCard intensity={0.05} scale={1.02}>
            <div className="stat-card">
              <h3>+60</h3>
              <p>Projets</p>
            </div>
          </HoverCard>
          <HoverCard intensity={0.05} scale={1.02}>
            <div className="stat-card">
              <h3>+50</h3>
              <p>Site web</p>
            </div>
          </HoverCard>
          <HoverCard intensity={0.05} scale={1.02}>
            <div className="stat-card">
              <h3>4</h3>
              <p>App's</p>
            </div>
          </HoverCard>
          <HoverCard intensity={0.05} scale={1.02}>
            <div className="stat-card">
              <h3>8</h3>
              <p>Identité graphique</p>
            </div>
          </HoverCard>
          <HoverCard intensity={0.05} scale={1.02}>
            <div className="stat-card">
              <p>Niveau</p>
              <h3>Master</h3>
            </div>
          </HoverCard>
        </div>

        {/* Carte principale cardLg */}
        <div className="card-lg">
          <div className="card-border"></div>
          <p className="card-title">Product Designer et Directeur Artistique</p>
          <div className="card-content">
            <p>Product Designer et Directeur Artistique, je conçois des expériences visuelles et digitales qui allient créativité et efficacité.</p>
            <p>&nbsp;</p>
            <p>Fort d'un parcours mêlant design graphique, webdesign et direction artistique, j'ai travaillé sur des projets variés allant de la création d'identités visuelles à la conception d'interfaces complètes (sites web, CRM, dashboards).</p>
          </div>
        </div>

        {/* Section content - Deux colonnes */}
        <div className="content-section">
          {/* Colonne gauche */}
          <div className="content-left">
            {/* Carte Compétences */}
            <div className="card-small">
              <div className="card-border"></div>
              <p className="card-title">Compétences</p>
              <div className="card-content">
                <p>Direction artistique</p>
                <p>• Product design</p>
                <p>• UI/UX design</p>
                <p>• Web design</p>
                <p>• Gestion de projet créatif</p>
                <p>• Branding & identité</p>
                <p>• Collaboration interdisciplinaire</p>
              </div>
            </div>

            {/* Carte Outils */}
            <div className="card-small">
              <div className="card-border"></div>
              <p className="card-title">Outils</p>
              <div className="card-content">
                <p>Figma</p>
                <p>• Suite adobe</p>
                <p>• HTML / CSS / JS</p>
                <p>• WordPress</p>
                <p>• Outil de gestion de projet</p>
                <p>• Google Workspace</p>
              </div>
            </div>

            {/* Carte Intérêts */}
            <div className="card-small">
              <div className="card-border"></div>
              <p className="card-title">Intérêts</p>
              <div className="card-content">
                <p>• Course à pied</p>
                <p>• Trail</p>
                <p>• Vélo de route</p>
                <p>• Cinéma</p>
                <p>• Tech</p>
                <p>• Jeux vidéo</p>
              </div>
            </div>
          </div>

          {/* Colonne droite - Expériences */}
          <div className="card-large">
            <div className="card-border"></div>
            <p className="card-title">Expériences</p>

            {/* Expérience 1 */}
            <div className="experience-item">
              <div className="experience-header">
                <p className="company-name">Skydo digital</p>
                <div className="experience-badge">
                  <div className="badge-border"></div>
                  <p className="badge-text">Product designer</p>
                </div>
                <div className="experience-badge">
                  <div className="badge-border"></div>
                  <p className="badge-text">Art director</p>
                </div>
              </div>
              <p className="experience-period">CDD directeur artistique Février 2025 - Octobre 2025</p>
              <div className="experience-description">
                <p>Pilotage de projets de design digital de bout en bout : ateliers de co-création, conception UX, UI et suivi du développement.</p>
                <p>• Création et maintien de design systems cohérents pour améliorer la productivité et la cohérence des projets.</p>
                <p>• Réalisation de prototypes interactifs et tests utilisateurs pour valider les choix de conception.</p>
                <p>• Collaboration étroite avec chefs de projet, développeurs et clients pour aligner les besoins business et techniques.</p>
                <p>• Contribution à l'évolution de l'image de marque et à la stratégie design de l'agence.</p>
              </div>
            </div>

            {/* Expérience 2 */}
            <div className="experience-item">
              <div className="experience-header">
                <p className="company-name">Skydo digital</p>
                <div className="experience-badge">
                  <div className="badge-border"></div>
                  <p className="badge-text">Product designer</p>
                </div>
                <div className="experience-badge">
                  <div className="badge-border"></div>
                  <p className="badge-text">Art director</p>
                </div>
              </div>
              <p className="experience-period">Alternance Master directeur artistique Studi Aout 2023 - Février 2025</p>
              <div className="experience-description">
                <p>Direction artistique et conception graphique print & digital.</p>
                <p>• Maquettes et prototypes UI/UX sur Figma.</p>
                <p>• Création et gestion de design systems.</p>
                <p>• Production visuelle avec Adobe CC.</p>
              </div>
            </div>

            {/* Expérience 3 */}
            <div className="experience-item">
              <div className="experience-header">
                <p className="company-name">Skydo digital</p>
                <div className="experience-badge">
                  <div className="badge-border"></div>
                  <p className="badge-text">Concepteur ux/ui</p>
                </div>
              </div>
              <p className="experience-period">Alternance Licence concepteur ux/ui Beforma Mars 2022 - Juin 2023</p>
              <div className="experience-description">
                <p>Pilotage de projets de design digital de bout en bout : ateliers de co-création, conception UX, UI et suivi du développement.</p>
                <p>• Création et maintien de design systems cohérents pour améliorer la productivité et la cohérence des projets.</p>
                <p>• Réalisation de prototypes interactifs et tests utilisateurs pour valider les choix de conception.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Formations */}
        <p className="formations-title">Formations</p>

        {/* Tableau des formations */}
        <div className="formations-table">
          <div className="table-header">
            <div className="table-col-name">
              <p>Nom</p>
            </div>
            <div className="table-col-school">
              <p>école</p>
            </div>
            <div className="table-col-year">
              <p>Année</p>
            </div>
          </div>
          
          <div className="table-rows">
            <div className="table-row">
              <div className="table-col-name">
                <p>Master Directeur artistique</p>
              </div>
              <div className="table-col-school">
                <p>Studi</p>
              </div>
              <div className="table-col-year">
                <p>Aout 2023 - Février 2025</p>
              </div>
            </div>
            
            <div className="table-separator"></div>
            
            <div className="table-row">
              <div className="table-col-name">
                <p>Licence Concepteur ux/ui</p>
              </div>
              <div className="table-col-school">
                <p>Beforma</p>
              </div>
              <div className="table-col-year">
                <p>Mars 2022 - Juin 2023</p>
              </div>
            </div>
            
            <div className="table-separator"></div>
            
            <div className="table-row">
              <div className="table-col-name">
                <p>Bac+ 2 Developpeur web</p>
              </div>
              <div className="table-col-school">
                <p>Simplon / RsmaR</p>
              </div>
              <div className="table-col-year">
                <p>Mai 2021 - Mars 2022</p>
              </div>
            </div>
            
            <div className="table-separator"></div>
            
            <div className="table-row">
              <div className="table-col-name">
                <p>Bac+ 2 Concepteur ux/ui</p>
              </div>
              <div className="table-col-school">
                <p>Afpar / Afpa</p>
              </div>
              <div className="table-col-year">
                <p>Aout 2019 - Juillet 2020</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
