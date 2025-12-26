import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Button from './Button'
import MagicBento from './MagicBento'
import './MobileSearchBar.css'
import { getAllProjects, menuCategories, type MenuItem, type MenuCategory } from '../data/menuCategories'
import { projectsDataNew } from '../data/projectsNew'

interface MobileSearchBarProps {
  onSearchChange?: (searchTerm: string) => void
  onMenuClick: () => void
  onSearchClick?: () => void
  onPageChange?: (page: string, projectImage?: string, projectCategory?: string) => void
  currentPage?: string
  onProjectClose?: () => void
  onContactClick?: () => void
  projectSwipeY?: number
}

const MobileSearchBar = ({ onSearchChange, onMenuClick, onSearchClick, onPageChange, currentPage, onProjectClose, onContactClick, projectSwipeY = 0 }: MobileSearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true)
  // Récupérer tous les projets depuis les données centralisées
  const allProjects = getAllProjects()
  
  // Calculer l'opacité en fonction de projectSwipeY (uniquement sur la page projet)
  const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800
  const [showResults, setShowResults] = useState(false)
  const [showButtons, setShowButtons] = useState(false)
  const [showCloseButton, setShowCloseButton] = useState(false)
  const [sliderPosition, setSliderPosition] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)
  // États pour les images de prévisualisation dans les boutons
  const [previousImage, setPreviousImage] = useState<string | null>(null)
  const [nextImage, setNextImage] = useState<string | null>(null)
  const [showPreviousImage, setShowPreviousImage] = useState(false)
  const [showNextImage, setShowNextImage] = useState(false)
  
  const placeholders = [
    'Recherche le nom d\'un projet',
    'Recherche par type',
    'Recherche par année'
  ]

  // Fonction pour grouper les résultats par catégorie
  const getGroupedResults = (): Array<{ category: MenuCategory; projects: MenuItem[] }> => {
    if (!searchTerm || searchTerm.trim().length === 0) {
      // Afficher toutes les catégories avec tous leurs projets
      return menuCategories.map(category => ({
        category,
        projects: category.projects
      }))
    }
    
    // Filtrer par terme de recherche et grouper par catégorie
    const searchLower = searchTerm.toLowerCase().trim()
    
    // Vérifier d'abord si le terme correspond exactement ou partiellement à un nom de catégorie
    // On vérifie aussi les variations comme "site web" vs "siteweb"
    const matchingCategories = menuCategories.filter(category => {
      const categoryTitle = category.title.toLowerCase()
      const categoryKey = category.key.toLowerCase()
      const categoryTitleNoSpaces = categoryTitle.replace(/\s+/g, '')
      const searchLowerNoSpaces = searchLower.replace(/\s+/g, '')
      
      return categoryTitle.includes(searchLower) || 
             categoryKey.includes(searchLower) ||
             categoryTitleNoSpaces.includes(searchLowerNoSpaces) ||
             searchLowerNoSpaces.includes(categoryTitleNoSpaces)
    })
    
    // Si on trouve des catégories qui correspondent, afficher toutes ces catégories avec tous leurs projets
    if (matchingCategories.length > 0) {
      return matchingCategories.map(category => ({
        category,
        projects: [...category.projects] // Copie pour éviter les mutations
      }))
    }
    
    // Sinon, filtrer les projets par titre dans toutes les catégories
    return menuCategories
      .map(category => ({
        category,
        projects: category.projects.filter(project =>
          project.title.toLowerCase().includes(searchLower)
        )
      }))
      .filter(group => group.projects.length > 0)
  }

  // Détecter quand on ouvre une page SingleProject pour déclencher l'animation
  useEffect(() => {
    const isOnProjectPage = currentPage?.startsWith('project-')
    if (isOnProjectPage) {
      // Désactiver le scroll du body quand on est sur une page de projet
      document.body.style.overflow = 'hidden'
      // Délai pour que la page soit complètement chargée avant l'animation
      const timer = setTimeout(() => {
        setShowButtons(true)
        // Remettre le slider à sa position de départ
        setSliderPosition(0)
      }, 100)
      return () => {
        clearTimeout(timer)
        // Réactiver le scroll quand on quitte la page de projet
        document.body.style.overflow = ''
      }
    } else {
      setShowButtons(false)
      // Réactiver le scroll si on n'est plus sur une page de projet
      document.body.style.overflow = ''
    }
  }, [currentPage])

  // Afficher automatiquement les images des projets précédent et suivant quand on arrive sur une page de projet
  useEffect(() => {
    const isOnProjectPage = currentPage?.startsWith('project-')
    if (isOnProjectPage && currentPage) {
      const projectName = currentPage.replace('project-', '')
      
      // Obtenir tous les projets triés par date
      const projectsWithYear = allProjects
        .map(project => {
          const projectData = projectsDataNew[project.title]
          const year = projectData?.year || '1900'
          return { title: project.title, year }
        })
        .sort((a, b) => parseInt(a.year) - parseInt(b.year))
      
      const currentIndex = projectsWithYear.findIndex(p => p.title === projectName)
      
      // Récupérer le projet précédent
      let previousProjectTitle: string | null = null
      if (currentIndex > 0) {
        previousProjectTitle = projectsWithYear[currentIndex - 1].title
      } else if (projectsWithYear.length > 0) {
        previousProjectTitle = projectsWithYear[projectsWithYear.length - 1].title
      }
      
      // Récupérer le projet suivant
      let nextProjectTitle: string | null = null
      if (currentIndex < projectsWithYear.length - 1) {
        nextProjectTitle = projectsWithYear[currentIndex + 1].title
      } else if (projectsWithYear.length > 0) {
        nextProjectTitle = projectsWithYear[0].title
      }
      
      // Fonction helper pour trouver l'image d'un projet
      const getProjectImage = (projectTitle: string): string | undefined => {
        for (const category of menuCategories) {
          const project = category.projects.find(p => p.title === projectTitle)
          if (project) {
            return project.imageSrc
          }
        }
        return undefined
      }
      
      // Afficher les images automatiquement
      if (previousProjectTitle) {
        const previousImageSrc = getProjectImage(previousProjectTitle)
        if (previousImageSrc) {
          setPreviousImage(previousImageSrc)
          setShowPreviousImage(true)
        }
      }
      
      if (nextProjectTitle) {
        const nextImageSrc = getProjectImage(nextProjectTitle)
        if (nextImageSrc) {
          setNextImage(nextImageSrc)
          setShowNextImage(true)
        }
      }
    } else {
      // Réinitialiser quand on quitte une page de projet
      setShowPreviousImage(false)
      setShowNextImage(false)
      setPreviousImage(null)
      setNextImage(null)
    }
  }, [currentPage, allProjects])


  useEffect(() => {
    const interval = setInterval(() => {
      // Faire disparaître le placeholder
      setIsPlaceholderVisible(false)
      
      // Après la transition, changer le texte et le faire réapparaître
      setTimeout(() => {
        setPlaceholderIndex((prev) => (prev + 1) % placeholders.length)
        setIsPlaceholderVisible(true)
      }, 400) // La moitié de la durée de transition
    }, 3000) // Change toutes les 3 secondes

    return () => clearInterval(interval)
  }, [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    
    // Filtrer les projets - toujours afficher les résultats
    // Les résultats sont calculés dynamiquement via getGroupedResults()
    setShowResults(true)
    
    if (onSearchChange) {
      onSearchChange(value)
    }
  }

  const handleClearSearch = () => {
    setSearchTerm('')
    setShowResults(true)
    if (onSearchChange) {
      onSearchChange('')
    }
  }

  const handleCloseSearch = () => {
    setSearchTerm('')
    setShowResults(false)
    if (onSearchChange) {
      onSearchChange('')
    }
  }

  const handleKeyDown = () => {
    // Fonction vide pour l'instant
  }

  const handleSearchClick = () => {
    // Afficher les résultats quand on clique dans la search bar
    setShowResults(true)
    if (onSearchClick) {
      onSearchClick()
    }
  }

  const handleResultClick = (project: any) => {
    setSearchTerm(project.title)
    setShowResults(false)
    if (onSearchChange) {
      onSearchChange(project.title)
    }
    
    // Navigation spéciale pour les pages de navigation
    if (onPageChange) {
      if (project.title === 'Home') {
        onPageChange('accueil')
      } else if (project.title === 'About') {
        onPageChange('apropos')
      } else {
        // Navigation vers la page single du projet avec les informations du projet
        const projectInfo = getProjectInfo(project.title)
        onPageChange(`project-${project.title}`, projectInfo.image, projectInfo.category)
      }
    }
  }

  // Gestion du slider custom
  const handleSliderStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true)
    e.preventDefault()
  }

  const handleSliderMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const deltaX = clientX - rect.left - 28 // 28 = half of new circle width
    const maxPosition = rect.width - 56 - 8 // width - circle width - padding
    const newPosition = Math.max(0, Math.min(maxPosition, deltaX))
    setSliderPosition(newPosition)
  }

  const handleSliderEnd = () => {
    if (!isDragging) return
    
    setIsDragging(false)
    
    // Calculer le seuil dynamique (70% de la largeur totale)
    const rect = sliderRef.current?.getBoundingClientRect()
    const threshold = rect ? (rect.width - 56) * 0.7 : 140
    
    if (sliderPosition >= threshold) {
      // Rediriger vers la page contact
      if (onContactClick) {
        onContactClick()
      }
    } else {
      setSliderPosition(0)
    }
  }

  // Fonction pour obtenir tous les projets triés par date (du plus ancien au plus récent)
  const getProjectsSortedByDate = (): Array<{ title: string; year: string }> => {
    const projectsWithYear = allProjects
      .map(project => {
        const projectData = projectsDataNew[project.title]
        // Si le projet n'a pas de données dans projectsDataNew, on utilise une année par défaut très ancienne
        const year = projectData?.year || '1900'
        return { title: project.title, year }
      })
      .sort((a, b) => {
        // Trier par année (du plus ancien au plus récent)
        return parseInt(a.year) - parseInt(b.year)
      })
    return projectsWithYear
  }

  // Fonction helper pour trouver l'image et la catégorie d'un projet
  const getProjectInfo = (projectTitle: string): { image?: string; category?: string } => {
    for (const category of menuCategories) {
      const project = category.projects.find(p => p.title === projectTitle)
      if (project) {
        return { image: project.imageSrc, category: category.title }
      }
    }
    return {}
  }

  // Fonction pour naviguer vers le projet précédent
  const handlePreviousProject = () => {
    if (!onPageChange || !currentPage) return
    
    const projectName = currentPage.replace('project-', '')
    const sortedProjects = getProjectsSortedByDate()
    const currentIndex = sortedProjects.findIndex(p => p.title === projectName)
    
    let previousProjectTitle: string
    if (currentIndex > 0) {
      previousProjectTitle = sortedProjects[currentIndex - 1].title
    } else {
      // Si on est au début, aller au dernier projet (navigation cyclique)
      previousProjectTitle = sortedProjects[sortedProjects.length - 1].title
    }
    
    const projectInfo = getProjectInfo(previousProjectTitle)
    onPageChange(`project-${previousProjectTitle}`, projectInfo.image, projectInfo.category)
  }

  // Fonction pour naviguer vers le projet suivant
  const handleNextProject = () => {
    if (!onPageChange || !currentPage) return
    
    const projectName = currentPage.replace('project-', '')
    const sortedProjects = getProjectsSortedByDate()
    const currentIndex = sortedProjects.findIndex(p => p.title === projectName)
    
    let nextProjectTitle: string
    if (currentIndex < sortedProjects.length - 1) {
      nextProjectTitle = sortedProjects[currentIndex + 1].title
    } else {
      // Si on est à la fin, aller au premier projet (navigation cyclique)
      nextProjectTitle = sortedProjects[0].title
    }
    
    const projectInfo = getProjectInfo(nextProjectTitle)
    onPageChange(`project-${nextProjectTitle}`, projectInfo.image, projectInfo.category)
  }

  const isOnProjectPage = currentPage?.startsWith('project-') || currentPage === 'project'
  const opacity = isOnProjectPage ? Math.max(0, Math.min(1, 1 - (projectSwipeY / screenHeight))) : 1
  const groupedResults = getGroupedResults()
  const hasResults = groupedResults.some(group => group.projects.length > 0)
  const isSearchActive = !isOnProjectPage && showResults && hasResults

  // Gérer l'affichage temporaire de l'image dans le bouton précédent (3 secondes)
  useEffect(() => {
    if (showPreviousImage) {
      const timer = setTimeout(() => {
        setShowPreviousImage(false)
        // Attendre la fin de la transition avant de retirer l'image du DOM
        setTimeout(() => {
          setPreviousImage(null)
        }, 400) // Délai correspondant à la durée de la transition CSS
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showPreviousImage])

  // Gérer l'affichage temporaire de l'image dans le bouton suivant (3 secondes)
  useEffect(() => {
    if (showNextImage) {
      const timer = setTimeout(() => {
        setShowNextImage(false)
        // Attendre la fin de la transition avant de retirer l'image du DOM
        setTimeout(() => {
          setNextImage(null)
        }, 400) // Délai correspondant à la durée de la transition CSS
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showNextImage])

  // Afficher le bouton de fermeture après 2 secondes quand la search bar est active
  useEffect(() => {
    if (isSearchActive) {
      const timer = setTimeout(() => {
        setShowCloseButton(true)
      }, 2000)
      return () => clearTimeout(timer)
    } else {
      setShowCloseButton(false)
    }
  }, [isSearchActive])

  // Calculer la hauteur max pour mobile avec gestion dynamique du viewport
  const [maxHeight, setMaxHeight] = useState<string>('')
  const searchBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateMaxHeight = () => {
      if (searchBarRef.current && isSearchActive) {
        const viewportHeight = window.innerHeight
        const topOffset = 104 // Position top de la search bar
        const bottomMargin = 16 // Marge en bas
        const calculatedHeight = viewportHeight - topOffset - bottomMargin
        setMaxHeight(`${calculatedHeight}px`)
      }
    }

    updateMaxHeight()
    window.addEventListener('resize', updateMaxHeight)
    window.addEventListener('orientationchange', updateMaxHeight)
    
    // Mettre à jour après un court délai pour gérer les changements de viewport mobile
    const timeoutId = setTimeout(updateMaxHeight, 100)

    return () => {
      window.removeEventListener('resize', updateMaxHeight)
      window.removeEventListener('orientationchange', updateMaxHeight)
      clearTimeout(timeoutId)
    }
  }, [isSearchActive])

  return (
    <>
      {/* Overlay pour assombrir l'arrière-plan quand la search bar est active */}
      {isSearchActive && (
        <div className={`mobile-search-bar-overlay active`} />
      )}
      {/* Temporairement masqué sur les pages de projet */}
      {isOnProjectPage ? null : (
      <div className={`${isOnProjectPage ? 'mobile-action-buttons' : 'mobile-search-bar'} ${isSearchActive ? 'search-active' : ''} ${isOnProjectPage ? 'on-project-page' : ''}`}>
      {/* Boutons pour single project */}
      {isOnProjectPage && onProjectClose && showButtons && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: opacity, scale: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            duration: 0.6
          }}
          className="project-buttons-container"
          style={{ opacity: opacity }}
        >
          {/* Bouton précédent à gauche */}
          <Button 
            variant="secondary" 
            icon={true} 
            iconSize="medium" 
            onClick={handlePreviousProject} 
            className="back-left-button"
            aria-label="Précédent"
          >
            {previousImage && (
              <img 
                src={previousImage} 
                alt="Projet précédent"
                className={showPreviousImage ? 'preview-image-visible' : 'preview-image-hidden'}
              />
            )}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`back-left-icon ${showPreviousImage ? 'preview-icon-hidden' : ''}`}>
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
          
          {/* Bouton slider - Temporairement masqué */}
          {false && (
          <div 
            ref={sliderRef}
            className="slider-button"
            style={{ opacity: opacity }}
            onMouseDown={handleSliderStart}
            onTouchStart={handleSliderStart}
            onMouseMove={handleSliderMove}
            onTouchMove={handleSliderMove}
            onMouseUp={handleSliderEnd}
            onTouchEnd={handleSliderEnd}
            onMouseLeave={handleSliderEnd}
          >
            <div className="slider-text">Contactez moi</div>
            <div 
              className="slider-button-circle"
              style={{ transform: `translateX(${sliderPosition}px)` }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12H21M21 12L15 6M21 12L15 18" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 12H21" stroke="#333333" strokeWidth="1" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
          )}
          
          {/* Bouton suivant à droite */}
          <Button 
            variant="secondary" 
            icon={true} 
            iconSize="medium" 
            onClick={handleNextProject} 
            className="back-left-button"
            aria-label="Suivant"
          >
            {nextImage && (
              <img 
                src={nextImage} 
                alt="Projet suivant"
                className={`preview-image ${showNextImage ? 'preview-image-visible' : 'preview-image-hidden'}`}
              />
            )}
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className={`back-right-icon preview-icon ${showNextImage ? 'preview-icon-hidden' : 'preview-icon-visible'}`}
            >
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
        </motion.div>
      )}
      
      {/* Search bar normale pour les autres pages */}
      {!isOnProjectPage && (
        <>
          {/* Bouton de fermeture pour la search bar active */}
          {isSearchActive && showCloseButton && (
            <button
              className="search-close-button"
              onClick={handleCloseSearch}
              aria-label="Fermer la recherche"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
          <MagicBento 
            className={`search-bar ${showResults && hasResults ? 'has-results' : ''}`}
            style={showResults && hasResults && maxHeight ? { maxHeight } : undefined}
          >
            <div className="search-input-row">
              <svg width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M10.5 4.5C8.9087 4.5 7.38258 5.13214 6.25736 6.25736C5.13214 7.38258 4.5 8.9087 4.5 10.5C4.5 11.2879 4.65519 12.0681 4.95672 12.7961C5.25825 13.5241 5.70021 14.1855 6.25736 14.7426C6.81451 15.2998 7.47595 15.7417 8.2039 16.0433C8.93185 16.3448 9.71207 16.5 10.5 16.5C11.2879 16.5 12.0681 16.3448 12.7961 16.0433C13.5241 15.7417 14.1855 15.2998 14.7426 14.7426C15.2998 14.1855 15.7417 13.5241 16.0433 12.7961C16.3448 12.0681 16.5 11.2879 16.5 10.5C16.5 8.9087 15.8679 7.38258 14.7426 6.25736C13.6174 5.13214 12.0913 4.5 10.5 4.5ZM4.84315 4.84315C6.34344 3.34285 8.37827 2.5 10.5 2.5C12.6217 2.5 14.6566 3.34285 16.1569 4.84315C17.6571 6.34344 18.5 8.37827 18.5 10.5C18.5 11.5506 18.2931 12.5909 17.891 13.5615C17.6172 14.2226 17.2565 14.8425 16.8196 15.4054L22.2071 20.7929C22.5976 21.1834 22.5976 21.8166 22.2071 22.2071C21.8166 22.5976 21.1834 22.5976 20.7929 22.2071L15.4054 16.8196C14.8425 17.2565 14.2226 17.6172 13.5615 17.891C12.5909 18.2931 11.5506 18.5 10.5 18.5C9.44943 18.5 8.40914 18.2931 7.43853 17.891C6.46793 17.489 5.58601 16.8997 4.84315 16.1569C4.10028 15.414 3.511 14.5321 3.10896 13.5615C2.70693 12.5909 2.5 11.5506 2.5 10.5C2.5 8.37827 3.34285 6.34344 4.84315 4.84315Z" fill="white"/>
              </svg>
              <div className="search-input-container">
                {!searchTerm && (
                  <div 
                    className={`search-placeholder ${isPlaceholderVisible ? 'visible' : 'hidden'}`}
                    onClick={handleSearchClick}
                  >
                    {placeholders[placeholderIndex]}
                  </div>
                )}
                <div className="input-wrapper">
                  <input 
                    type="text" 
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                    onClick={handleSearchClick}
                    className="search-input"
                  />
                  {searchTerm && (
                    <button
                      className="clear-button"
                      onClick={handleClearSearch}
                      type="button"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Résultats de recherche en dessous de l'input */}
        {showResults && hasResults && (
          <div className="search-results">
            {groupedResults.map((group) => (
              <div key={group.category.key} className="search-results-category">
                <h3 className="search-category-title">{group.category.title}</h3>
                <div className="search-results-row">
                  {group.projects.map((project, index) => (
                    <div 
                      key={`${group.category.key}-${index}`}
                      className="search-result-item"
                      onClick={() => handleResultClick(project)}
                    >
                      <div className="search-result-image">
                        {project.imageSrc ? (
                          <img 
                            src={project.imageSrc} 
                            alt={project.imageAlt}
                            className={project.className}
                          />
                        ) : (
                          <div className="search-result-placeholder">
                            {project.title.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="search-result-title">
                        {project.title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
          </MagicBento>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              duration: 0.6,
              delay: 0.05
            }}
          >
            <Button variant="secondary" icon={true} iconSize="medium" onClick={onMenuClick} className="home-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M8 2.5C8.55228 2.5 9 2.94772 9 3.5V6.5C9 7.29565 8.68393 8.05871 8.12132 8.62132C7.55871 9.18393 6.79565 9.5 6 9.5H3C2.44772 9.5 2 9.05228 2 8.5C2 7.94772 2.44772 7.5 3 7.5H6C6.26522 7.5 6.51957 7.39464 6.70711 7.20711C6.89464 7.01957 7 6.76522 7 6.5V3.5C7 2.94772 7.44772 2.5 8 2.5ZM16 2.5C16.5523 2.5 17 2.94772 17 3.5V6.5C17 6.76522 17.1054 7.01957 17.2929 7.20711C17.4804 7.39464 17.7348 7.5 18 7.5H21C21.5523 7.5 22 7.94772 22 8.5C22 9.05228 21.5523 9.5 21 9.5H18C17.2044 9.5 16.4413 9.18393 15.8787 8.62132C15.3161 8.05871 15 7.29565 15 6.5V3.5C15 2.94772 15.4477 2.5 16 2.5ZM2 16.5C2 15.9477 2.44772 15.5 3 15.5H6C6.79565 15.5 7.55871 15.8161 8.12132 16.3787C8.68393 16.9413 9 17.7044 9 18.5V21.5C9 22.0523 8.55228 22.5 8 22.5C7.44772 22.5 7 22.0523 7 21.5V18.5C7 18.2348 6.89464 17.9804 6.70711 17.7929C6.51957 17.6054 6.26522 17.5 6 17.5H3C2.44772 17.5 2 17.0523 2 16.5ZM18 17.5C17.7348 17.5 17.4804 17.6054 17.2929 17.7929C17.1054 17.9804 17 18.2348 17 18.5V21.5C17 22.0523 16.5523 22.5 16 22.5C15.4477 22.5 15 22.0523 15 21.5V18.5C15 17.7043 15.3161 16.9413 15.8787 16.3787C16.4413 15.8161 17.2043 15.5 18 15.5H21C21.5523 15.5 22 15.9477 22 16.5C22 17.0523 21.5523 17.5 21 17.5H18Z" fill="white"/>
        </svg>
      </Button>
          </motion.div>
        </>
      )}
      </div>
      )}
    </>
  )
}

export default MobileSearchBar
