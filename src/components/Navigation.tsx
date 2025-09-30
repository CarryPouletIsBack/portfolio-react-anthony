import './Navigation.css'

interface NavigationProps {
  currentPage: string
  onPageChange: (page: string) => void
}

const Navigation = ({ currentPage, onPageChange }: NavigationProps) => {
  return (
    <div className="navigation">
      <button 
        className={`nav-btn ${currentPage === 'accueil' ? 'active' : ''}`} 
        onClick={() => onPageChange('accueil')}
      >
        Accueil
      </button>
      <button 
        className={`nav-btn ${currentPage === 'menu' ? 'active' : ''}`} 
        onClick={() => onPageChange('menu')}
      >
        Menu
      </button>
      <button 
        className={`nav-btn ${currentPage === 'apropos' ? 'active' : ''}`} 
        onClick={() => onPageChange('apropos')}
      >
        À propos
      </button>
      <button 
        className={`nav-btn ${currentPage === 'project' ? 'active' : ''}`} 
        onClick={() => onPageChange('project')}
      >
        Projet
      </button>
    </div>
  )
}

export default Navigation
