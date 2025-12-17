import { useState, useEffect } from 'react'
import './Menu.css'
import ProjectItem from './ProjectItem'
import { menuCategories, type MenuItem } from '../data/menuCategories'

interface MenuProps {
  onPageChange: (page: string, projectImage?: string, projectCategory?: string) => void
  searchTerm?: string
}

const Menu = ({ onPageChange, searchTerm = '' }: MenuProps) => {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleProjectClick = (projectName: string, imageSrc?: string, category?: string) => {
    // Navigation vers les pages spéciales ou projets
    if (projectName === 'Home') {
      onPageChange('accueil')
    } else if (projectName === 'About') {
      onPageChange('apropos')
    } else {
      onPageChange(`project-${projectName}`, imageSrc, category)
    }
  }

  // Animation lors du changement de recherche
  useEffect(() => {
    if (searchTerm) {
      setIsAnimating(true)
      const timer = setTimeout(() => {
        setIsAnimating(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [searchTerm])

  // Fonction de filtrage des projets
  const filterProjects = (projects: MenuItem[], searchTerm: string) => {
    if (!searchTerm.trim()) return projects
    
    const searchLower = searchTerm.toLowerCase()
    return projects.filter(project => 
      project.title.toLowerCase().includes(searchLower)
    )
  }

  // Fonction pour vérifier si une catégorie a des projets visibles
  const hasVisibleProjects = (projects: MenuItem[], searchTerm: string) => {
    if (!searchTerm.trim()) return true
    return filterProjects(projects, searchTerm).length > 0
  }

  // Fonction pour vérifier si le nom de la catégorie correspond à la recherche
  const categoryMatches = (categoryName: string, searchTerm: string) => {
    if (!searchTerm.trim()) return true
    const searchLower = searchTerm.toLowerCase()
    const categoryLower = categoryName.toLowerCase()
    
    return categoryLower.includes(searchLower) || 
           (searchLower === 'app' && categoryLower.includes('application')) ||
           (searchLower === 'application' && categoryLower.includes('application')) ||
           (searchLower === 'site' && categoryLower.includes('site web')) ||
           (searchLower === 'site web' && categoryLower.includes('site web')) ||
           (searchLower === 'nav' && categoryLower.includes('navigation')) ||
           (searchLower === 'navigation' && categoryLower.includes('navigation')) ||
           (searchLower === 'logo' && categoryLower.includes('logo')) ||
           (searchLower === 'motion' && categoryLower.includes('motion')) ||
           (searchLower === 'plv' && categoryLower.includes('plv'))
  }

  return (
    <div className="page active menu-page">
      <div className="main-menu">
        {menuCategories.map(section => {
          const categoryMatchesSearch = categoryMatches(section.title, searchTerm)
          const filteredProjects = categoryMatchesSearch ? section.projects : filterProjects(section.projects, searchTerm)
          const shouldShowSection = categoryMatchesSearch || hasVisibleProjects(section.projects, searchTerm)
          
          if (!shouldShowSection) return null

          return (
            <div key={section.key} className="menu-section">
              <div className="section-header">
                <h3>{section.title}</h3>
              </div>
                   <div className={`projects-row ${isAnimating ? 'animating' : ''}`}>
                     {filteredProjects.map((project, index) => (
                       <ProjectItem
                         key={`${section.key}-${index}`}
                         imageSrc={project.imageSrc}
                         imageAlt={project.imageAlt}
                         title={project.title}
                         onClick={() => handleProjectClick(project.title, project.imageSrc, section.title)}
                         className={`${project.className || (section.key === 'navigation' ? 'nav-item' : '')}`}
                         forceTextColor="white"
                       />
                     ))}
                   </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Menu
