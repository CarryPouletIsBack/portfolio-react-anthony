import { useState, useMemo, useEffect } from 'react'
import './Menu.css'
import ProjectItem from './ProjectItem'
import AnimatedContent from './AnimatedContent'

interface MenuProps {
  onPageChange: (page: string) => void
  searchTerm?: string
}

const Menu = ({ onPageChange, searchTerm = '' }: MenuProps) => {
  const [isAnimating, setIsAnimating] = useState(false)
  
  // Données des projets organisées par catégorie
  const projectData = {
    navigation: [
      { imageSrc: "/images/25c86067ea3b2084f730bb1f906759081bc20fac.png", imageAlt: "Home", title: "Home", onClick: () => onPageChange('accueil') },
      { imageSrc: "/images/e6f2ddb160c2bbdb850462edeb04f93d7cce975f.png", imageAlt: "About", title: "About", onClick: () => onPageChange('apropos') }
    ],
    application: [
      { imageSrc: "/images/261061ca92433cd63b52fe7f2093041e9d831bbc.png", imageAlt: "Playdago", title: "Playdago", onClick: () => handleProjectClick('Playdago') },
      { imageSrc: "/images/f27446bbc5c96f74d44074bc97b9be64f7cdf4cf.png", imageAlt: "Pedaboard", title: "Pedaboard", onClick: () => handleProjectClick('Pedaboard') },
      { imageSrc: "/images/d09371ff5fd475e08d0476d1b301dd9aabb49d5c.png", imageAlt: "Ghadeer market", title: "Ghadeer market", onClick: () => handleProjectClick('Ghadeer market') },
      { imageSrc: "/images/8cc5f68c1c8fa66e1ddab4fe1075e9d19645f9d4.png", imageAlt: "Open challenge", title: "Open challenge", onClick: () => handleProjectClick('Open challenge') }
    ],
    siteWeb: [
      { imageSrc: "/images/514dda7a5dbdf8da4239a28ff06c4b36281c7d36.png", imageAlt: "Utoi", title: "Utoi", onClick: () => handleProjectClick('Utoi') },
      { imageSrc: "/images/8cc5f68c1c8fa66e1ddab4fe1075e9d19645f9d4.png", imageAlt: "Open challenge", title: "Open challenge", onClick: () => handleProjectClick('Open challenge') },
      { imageSrc: "", imageAlt: "Agua benta", title: "Agua benta", onClick: () => handleProjectClick('Agua benta'), className: "placeholder" },
      { imageSrc: "/images/8cbd7b5155c0b3df21ecc2703b145f2d393e07a0.png", imageAlt: "Anset assurance", title: "Anset assurance", onClick: () => handleProjectClick('Anset assurance') }
    ],
    logo: [
      { imageSrc: "", imageAlt: "My spir", title: "My spir", onClick: () => handleProjectClick('My spir'), className: "placeholder" },
      { imageSrc: "/images/d09371ff5fd475e08d0476d1b301dd9aabb49d5c.png", imageAlt: "Ghadeer market", title: "Ghadeer market", onClick: () => handleProjectClick('Ghadeer market') },
      { imageSrc: "", imageAlt: "Mp audio", title: "Mp audio", onClick: () => handleProjectClick('Mp audio'), className: "placeholder" },
      { imageSrc: "", imageAlt: "Sublim", title: "Sublim", onClick: () => handleProjectClick('Sublim'), className: "placeholder" }
    ],
    motion: [
      { imageSrc: "", imageAlt: "Mp audio", title: "Mp audio", onClick: () => handleProjectClick('Mp audio'), className: "placeholder" },
      { imageSrc: "", imageAlt: "Mémoire Kartier Titan", title: "Mémoire Kartier Titan", onClick: () => handleProjectClick('Mémoire Kartier Titan'), className: "placeholder" },
      { imageSrc: "", imageAlt: "Pub tv Sublim", title: "Pub tv Sublim", onClick: () => handleProjectClick('Pub tv Sublim'), className: "placeholder" }
    ],
    plv: [
      { imageSrc: "", imageAlt: "Run Alim", title: "Run Alim", onClick: () => handleProjectClick('Run Alim'), className: "placeholder" }
    ]
  }

  const handleProjectClick = (projectName: string) => {
    console.log(`Projet cliqué: ${projectName}`)
    // Ici on pourrait naviguer vers une page de projet individuel
    onPageChange(`project-${projectName}`)
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
  const filterProjects = (projects: any[], searchTerm: string) => {
    if (!searchTerm.trim()) return projects
    
    const searchLower = searchTerm.toLowerCase()
    return projects.filter(project => 
      project.title.toLowerCase().includes(searchLower)
    )
  }

  // Fonction pour vérifier si une catégorie a des projets visibles
  const hasVisibleProjects = (projects: any[], searchTerm: string) => {
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

  // Configuration des sections avec leurs données
  const sections = [
    { key: 'navigation', title: 'Navigation', projects: projectData.navigation },
    { key: 'application', title: 'Application', projects: projectData.application },
    { key: 'siteWeb', title: 'Site web', projects: projectData.siteWeb },
    { key: 'logo', title: 'Logo', projects: projectData.logo },
    { key: 'motion', title: 'Motion', projects: projectData.motion },
    { key: 'plv', title: 'Plv', projects: projectData.plv }
  ]

  return (
    <div className="page active menu-page">
      <div className="main-menu">
        {sections.map(section => {
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
                       <AnimatedContent
                         key={`${section.key}-${index}`}
                         distance={40}
                         direction="vertical"
                         reverse={false}
                         duration={0.6}
                         ease="ease-out"
                         initialOpacity={0.4}
                         animateOpacity
                         scale={1.02}
                         threshold={0.2}
                         delay={index * 0.03}
                       >
                         <ProjectItem
                           imageSrc={project.imageSrc}
                           imageAlt={project.imageAlt}
                           title={project.title}
                           onClick={project.onClick}
                           className={`${project.className || (section.key === 'navigation' ? 'nav-item' : '')}`}
                           forceTextColor="white"
                         />
                       </AnimatedContent>
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
