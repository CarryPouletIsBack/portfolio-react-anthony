import './Hero.css'
import ProjectItem from './ProjectItem'
import Button from './Button'
import HoverCard from './HoverCard'

interface HeroProps {
  onPageChange: (page: string) => void
}

const Hero = ({ onPageChange }: HeroProps) => {
  return (
    <div className="page active accueil-page">
      <div className="main-accueil">
        <div className="hero-section">
          <div className="hero-card">
                <div className="card-header">
                  <h2>Projet récents</h2>
                  <Button variant="primary">Voir tout les projets</Button>
                </div>
            <div className="project-showcase">
              <ProjectItem
                imageSrc="/images/261061ca92433cd63b52fe7f2093041e9d831bbc.png"
                imageAlt="Playdago"
                title="Playdago"
                className="large"
                forceTextColor="black"
                onClick={() => onPageChange('project-Playdago')}
              />
            </div>
          </div>
        </div>
        
        <div className="main-content">
          <div className="description-card">
            <h2>Product Designer et Directeur Artistique</h2>
            <div className="description-text">
              <p>Je suis Anthony Merault, Product Designer et Directeur Artistique basé à Lorient.</p>
              <p>Depuis plusieurs années, j'accompagne des entreprises et des marques dans la conception d'expériences digitales à la fois intuitives, esthétiques et performantes. Mon parcours m'a permis de naviguer entre design graphique, direction artistique et conception produit, avec une expertise solide en UX/UI, identité visuelle et design system.</p>
              <p>&nbsp;</p>
              <p>Ma force réside dans ma capacité à comprendre les besoins des utilisateurs tout en tenant compte des enjeux business et techniques. Que ce soit pour un site vitrine, une application ou une plateforme complexe, j'apporte une vision globale qui combine stratégie, créativité et sens du détail.</p>
              <p>&nbsp;</p>
              <p>Ma conviction : le design ne se limite pas à "faire beau". Il doit simplifier, clarifier et créer de l'émotion. C'est dans cet équilibre entre esthétique et utilité que je construis chaque projet</p>
            </div>
                <Button variant="primary">Voir la page à propos</Button>
          </div>
          
          <div className="stats-grid">
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
                <h3>Master</h3>
                <p>Niveau</p>
              </div>
            </HoverCard>
          </div>
        </div>
        <div style={{height: '24px'}}></div>
      </div>
    </div>
  )
}

export default Hero
