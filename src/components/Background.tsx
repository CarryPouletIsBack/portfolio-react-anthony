import { useEffect, useState } from 'react'
import './Background.css'

const Background = () => {
  const [isMenuActive, setIsMenuActive] = useState(false)
  const [isAccueilActive, setIsAccueilActive] = useState(false)

  useEffect(() => {
    const checkPageActive = () => {
      const body = document.body
      const hasMenuActive = body.classList.contains('menu-active')
      
      // Vérifier si on est sur la page d'accueil en cherchant l'élément .accueil-page.active
      const accueilPage = document.querySelector('.accueil-page.active')
      const isOnAccueil = accueilPage !== null
      
      // Vérifier si on est sur une page de projet
      const projectPage = document.querySelector('.single-project-page.active')
      const isOnProject = projectPage !== null
      
      // Vérifier si on est sur la page À propos
      const aproposPage = document.querySelector('.apropos-page.active')
      const isOnApropos = aproposPage !== null
      
      setIsMenuActive(hasMenuActive)
      setIsAccueilActive(isOnAccueil || isOnProject || isOnApropos) // Cacher aussi sur les projets et À propos
    }

    checkPageActive()
    const observer = new MutationObserver(checkPageActive)
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  // Afficher l'image partout SAUF sur le menu ET sur l'accueil
  return (
    <div className={`background-wrapper ${isMenuActive || isAccueilActive ? 'hidden' : ''}`}>
      <img 
        src="/images/261061ca92433cd63b52fe7f2093041e9d831bbc.png" 
        alt="Image de fond décorative" 
        className="background-img"
      />
    </div>
  )
}

export default Background

