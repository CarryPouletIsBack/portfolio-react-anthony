import './About.css'
import HoverCard from './HoverCard'
import { aboutData } from '../data/aboutData'

const About = () => {
  return (
    <div className="page active apropos-page">
      <div className="main-apropos">
        {/* Section description avec photo */}
        <div className="about-intro-section">
          <div className="about-intro-content">
            <div className="about-text-column">
              <h2 className="about-intro-title">À propos de moi</h2>
              <p className="about-intro-description">
                Passionné par le design et le développement, je crée des expériences digitales 
                qui marquent les esprits. Mon approche allie créativité et technique pour 
                transformer vos idées en solutions innovantes.
              </p>
              <p className="about-intro-description">
                Spécialisé dans le design d'interface et le développement front-end, 
                je mets mon expertise au service de projets variés, de l'application mobile 
                au site web corporate.
              </p>
            </div>
            <div className="about-photo-column">
              <div className="about-photo-container">
                <img 
                  src="/images/portrait-anthony.jpg" 
                  alt="Anthony Merault" 
                  className="about-photo"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section listing - Statistiques */}
        <div className="listing-section">
          {aboutData.stats.map((stat, index) => (
            <HoverCard key={index} intensity={0.05} scale={1.02}>
              <div className="stat-card">
                {stat.label === 'Niveau' ? (
                  <>
                    <p>{stat.label}</p>
                    <h3>{stat.value}</h3>
                  </>
                ) : (
                  <>
                    <h3>{stat.value}</h3>
                    <p>{stat.label}</p>
                  </>
                )}
              </div>
            </HoverCard>
          ))}
        </div>

        {/* Carte principale cardLg */}
        <div className="card-lg">
          <div className="card-border"></div>
          <p className="card-title">{aboutData.mainDescription.title}</p>
          <div className="card-content">
            {aboutData.mainDescription.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Section content - Deux colonnes */}
        <div className="content-section">
          {/* Colonne gauche */}
          <div className="content-left">
            {/* Carte Compétences */}
            <div className="card-small">
              <div className="card-border"></div>
              <p className="card-title">{aboutData.skills.title}</p>
              <div className="card-content">
                {aboutData.skills.items.map((skill, index) => (
                  <p key={index}>{skill}</p>
                ))}
              </div>
            </div>

            {/* Carte Outils */}
            <div className="card-small">
              <div className="card-border"></div>
              <p className="card-title">{aboutData.tools.title}</p>
              <div className="card-content">
                {aboutData.tools.items.map((tool, index) => (
                  <p key={index}>{tool}</p>
                ))}
              </div>
            </div>

            {/* Carte Intérêts */}
            <div className="card-small">
              <div className="card-border"></div>
              <p className="card-title">{aboutData.interests.title}</p>
              <div className="card-content">
                {aboutData.interests.items.map((interest, index) => (
                  <p key={index}>{interest}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne droite - Expériences */}
          <div className="content-right">
            <div className="card-large">
              <div className="card-border"></div>
              <p className="card-title">Expériences</p>

              {aboutData.experiences.map((experience, index) => (
                <div key={index} className="experience-item">
                  <div className="experience-header">
                    <p className="company-name">{experience.company}</p>
                    {experience.badges.map((badge, badgeIndex) => (
                      <div key={badgeIndex} className="experience-badge">
                        <div className="badge-border"></div>
                        <p className="badge-text">{badge}</p>
                      </div>
                    ))}
                  </div>
                  <p className="experience-period">{experience.period}</p>
                  <div className="experience-description">
                    {experience.description.map((desc, descIndex) => (
                      <p key={descIndex}>{desc}</p>
                    ))}
                  </div>
                </div>
              ))}
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
            {aboutData.formations.map((formation, index) => (
              <div key={index}>
                {index > 0 && <div className="table-separator"></div>}
                <div className="table-row">
                  <div className="table-col-name">
                    <p>{formation.name}</p>
                  </div>
                  <div className="table-col-school">
                    <p>{formation.school}</p>
                  </div>
                  <div className="table-col-year">
                    <p>{formation.year}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
