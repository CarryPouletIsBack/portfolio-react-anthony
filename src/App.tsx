import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Menu from './components/Menu'
import About from './components/About'
import Project from './components/Project'
import Navigation from './components/Navigation'
import MobileSearchBar from './components/MobileSearchBar'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('accueil')
  const [searchTerm, setSearchTerm] = useState('')
  const [previousPage, setPreviousPage] = useState('accueil')

  const handlePageChange = (page: string) => {
    setCurrentPage(page)
    // Si on navigue depuis le menu vers une autre page, mettre à jour la page précédente
    if (currentPage === 'menu' && page !== 'menu') {
      setPreviousPage(page)
    }
  }

  const handleMenuClick = () => {
    if (currentPage === 'menu') {
      // Si on est dans le menu, retourner à la page précédente
      setCurrentPage(previousPage)
    } else {
      // Si on est sur une autre page, sauvegarder la page actuelle et aller au menu
      setPreviousPage(currentPage)
      setCurrentPage('menu')
    }
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
    switch (currentPage) {
      case 'accueil':
        return <Hero onPageChange={handlePageChange} />
      case 'menu':
        return <Menu onPageChange={handlePageChange} searchTerm={searchTerm} />
      case 'apropos':
        return <About />
      case 'project':
        return <Project onBackClick={() => setCurrentPage('menu')} />
      default:
        if (currentPage.startsWith('project-')) {
          const projectName = currentPage.replace('project-', '')
          return <Project onBackClick={() => setCurrentPage('menu')} projectName={projectName} />
        }
        return <Hero />
    }
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
      
      {/* Navigation normale */}
      {currentPage !== 'menu' && (
        <Navigation currentPage={currentPage} onPageChange={handlePageChange} />
      )}
      
      {/* Search bar mobile qui remplace la navigation sur la page menu */}
      {currentPage === 'menu' && (
        <MobileSearchBar 
          onSearchChange={handleSearchChange}
          onMenuClick={handleMenuClick}
        />
      )}
    </div>
  )
}

export default App
