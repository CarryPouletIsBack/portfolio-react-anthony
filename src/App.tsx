import { useState, useEffect } from 'react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Project from './components/Project'
import MobileSearchBar from './components/MobileSearchBar'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('accueil')
  const [_searchTerm, setSearchTerm] = useState('')
  const [previousPage, setPreviousPage] = useState('accueil')
  const [currentProjectImage, setCurrentProjectImage] = useState<string | null>(null)
  const [currentProjectCategory, setCurrentProjectCategory] = useState<string | null>(null)
  const [projectSwipeY, setProjectSwipeY] = useState(0)

  useEffect(() => {
    // Si on est sur le menu, activer le fond menu
    if (currentPage === 'menu') {
      document.body.classList.add('menu-active')
    } 
    // Si on est sur un projet et qu'on vient du menu, garder le fond menu
    else if (currentPage.startsWith('project-') && previousPage === 'menu') {
      document.body.classList.add('menu-active')
    }
    // Sinon, utiliser le fond normal (accueil)
    else {
      document.body.classList.remove('menu-active')
    }
  }, [currentPage, previousPage])

  const handlePageChange = (page: string, projectImage?: string, projectCategory?: string) => {
    // Si on navigue vers un projet, toujours sauvegarder la page actuelle comme page précédente
    if (page.startsWith('project-') && !currentPage.startsWith('project-')) {
      setPreviousPage(currentPage)
      if (projectImage) setCurrentProjectImage(projectImage)
      if (projectCategory) setCurrentProjectCategory(projectCategory)
    }
    setCurrentPage(page)
  }

  const handleMenuClick = () => {
    // TEMPORAIRE : Menu masqué - retour à l'accueil
    setPreviousPage(currentPage)
    setCurrentPage('accueil')
    
    // Code original commenté :
    // if (currentPage === 'menu') {
    //   // Si on est dans le menu, retourner à la page précédente
    //   setCurrentPage(previousPage)
    // } else {
    //   // Si on est sur une autre page, sauvegarder la page actuelle et aller au menu
    //   setPreviousPage(currentPage)
    //   setCurrentPage('menu')
    // }
  }

  const handleContactClick = () => {
    setPreviousPage(currentPage)
    setCurrentPage('apropos')
  }

  const handleSearchChange = (searchTerm: string) => {
    setSearchTerm(searchTerm)
  }

  const handleLogoClick = () => {
    setPreviousPage(currentPage)
    setCurrentPage('accueil')
  }

  const renderCurrentPage = () => {
    const isProjectPage = currentPage.startsWith('project-') || currentPage === 'project'
    
    return (
      <>
        {/* Afficher la page d'accueil */}
        {currentPage === 'accueil' && (
          <Hero onPageChange={handlePageChange} />
        )}
        
        {/* Afficher les autres pages normalement quand on n'est pas sur un projet */}
        {!isProjectPage && currentPage !== 'accueil' && (
          <>
            {currentPage === 'apropos' && <About />}
            {/* TEMPORAIRE : Menu masqué */}
            {/* {currentPage === 'menu' && <Menu onPageChange={handlePageChange} searchTerm={searchTerm} />} */}
          </>
        )}
        
        {/* Afficher la page précédente en arrière-plan quand on est sur un projet */}
        {isProjectPage && (
          <>
            {previousPage === 'accueil' && <Hero onPageChange={handlePageChange} />}
            {previousPage === 'apropos' && <About />}
            {/* {previousPage === 'menu' && <Menu onPageChange={handlePageChange} searchTerm={searchTerm} />} */}
          </>
        )}
        
        {/* Afficher le projet par-dessus le contenu */}
        {isProjectPage && (
          <Project 
            onBackClick={() => {
              setProjectSwipeY(0) // Réinitialiser la valeur Y quand on ferme
              setCurrentPage(previousPage)
            }} 
            projectName={currentPage.startsWith('project-') ? currentPage.replace('project-', '') : undefined}
            coverImage={currentProjectImage} 
            projectCategory={currentProjectCategory}
            onSwipeYChange={setProjectSwipeY}
          />
        )}
      </>
    )
  }

  return (
    <div className={`container ${currentPage === 'menu' ? 'menu-active' : ''}`}>
      <Header 
        onMenuClick={handleMenuClick} 
        onContactClick={handleContactClick} 
        onLogoClick={handleLogoClick}
        currentPage={currentPage}
        onSearchChange={handleSearchChange}
      />
      {renderCurrentPage()}
      
      
      {/* Search bar mobile - affichée sur toutes les pages en mobile */}
      <MobileSearchBar 
        onSearchChange={handleSearchChange}
        onMenuClick={handleMenuClick}
        onSearchClick={() => {
          // Ne pas rediriger, permettre l'utilisation de la search bar depuis n'importe quelle page
        }}
        onPageChange={handlePageChange}
        currentPage={currentPage}
        onProjectClose={() => setCurrentPage(previousPage)}
        onContactClick={handleContactClick}
        projectSwipeY={projectSwipeY}
      />
      <SpeedInsights />
    </div>
  )
}

export default App
