import './Features.css'

const Features = () => {
  const features = [
    {
      icon: '⚡',
      title: 'Performance',
      description: 'Construit avec Vite pour un développement ultra-rapide et des builds optimisés.'
    },
    {
      icon: '🔷',
      title: 'TypeScript',
      description: 'Typage statique pour un code plus robuste et une meilleure expérience de développement.'
    },
    {
      icon: '🎨',
      title: 'Design Moderne',
      description: 'Interface utilisateur élégante avec des animations fluides et un design responsive.'
    },
    {
      icon: '📱',
      title: 'Responsive',
      description: 'Adapté à tous les écrans, des mobiles aux ordinateurs de bureau.'
    },
    {
      icon: '🔧',
      title: 'Outils Dev',
      description: 'ESLint, Prettier et autres outils de développement intégrés pour un code de qualité.'
    },
    {
      icon: '🚀',
      title: 'Prêt pour Production',
      description: 'Configuration optimisée pour le déploiement en production.'
    }
  ]

  return (
    <section className="features" id="fonctionnalites">
      <div className="container">
        <div className="section-header">
          <h2>Fonctionnalités</h2>
          <p>Découvrez les technologies et outils utilisés dans ce projet</p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
