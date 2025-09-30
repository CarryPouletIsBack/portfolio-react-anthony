import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Mon Projet React</h3>
            <p>Une application React moderne construite avec les dernières technologies.</p>
          </div>
          <div className="footer-section">
            <h4>Technologies</h4>
            <ul>
              <li>React 19</li>
              <li>TypeScript</li>
              <li>Vite</li>
              <li>CSS3</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Liens</h4>
            <ul>
              <li><a href="#accueil">Accueil</a></li>
              <li><a href="#fonctionnalites">Fonctionnalités</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>📧 contact@monprojet.com</p>
            <p>📱 +33 1 23 45 67 89</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Mon Projet React. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
