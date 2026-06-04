import { useState, useEffect, useRef } from 'react'
// import { SpeedInsights } from '@vercel/speed-insights/react'
import AnalyticsGuard from './components/AnalyticsGuard'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import AboutNew from './components/AboutNew'
import Project from './components/Project'
import ProjectCoverCarousel from './components/ProjectCoverCarousel'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import ErrorPage from './components/ErrorPage'
import Contact from './components/Contact'
import { Toaster } from 'sonner'
import { isAuthenticated } from './services/authService'
import { trackPageView, trackEvent } from './services/googleAnalyticsTracking'
import { useLanguage } from './contexts/LanguageContext'
import { useAccueilTimeOfDayContext } from './contexts/AccueilTimeOfDayContext'
import './App.css'

const PROJECT_COVER_IMAGES: Record<string, string> = {
  Playdago: '/images/cover-project-playdago.png',
  UTOI: '/images/cover-project-utoi.png',
  Pedaboard: '/images/cover-project-pedaboard.png',
  Kaldera: '/images/cover-project-kaldera.png',
}

const PROJECT_ORDER = ['Playdago', 'UTOI', 'Pedaboard', 'Kaldera'] as const

const SLUG_TO_PROJECT_NAME: Record<string, string> = {
  playdago: 'Playdago',
  utoi: 'UTOI',
  pedaboard: 'Pedaboard',
  kaldera: 'Kaldera',
}

function App() {
  const { language, setLanguage } = useLanguage()
  const { setBackgroundActive } = useAccueilTimeOfDayContext()
  const [currentPage, setCurrentPage] = useState('accueil')
  const [previousPage, setPreviousPage] = useState('accueil')
  const [currentProjectImage, setCurrentProjectImage] = useState<string | null>(null)
  const [currentProjectCategory, setCurrentProjectCategory] = useState<string | null>(null)
  const [projectSwipeY, setProjectSwipeY] = useState(0)
  const [coverLiftProgress, setCoverLiftProgress] = useState(0)
  /** Lift + scroll contenu (SingleProject) — masquer le bouton fermer sur la cover */
  const [projectScrollCombined, setProjectScrollCombined] = useState(0)
  const [coverFullscreenActive, setCoverFullscreenActive] = useState(false)
  const [coverFullscreenModalOpen, setCoverFullscreenModalOpen] = useState(false)
  const coverFullscreenModalTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isAuthChecked, setIsAuthChecked] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Nettoyer le timeout fullscreen cover à la destruction
  useEffect(() => {
    return () => {
      if (coverFullscreenModalTimeoutRef.current) {
        clearTimeout(coverFullscreenModalTimeoutRef.current)
      }
    }
  }, [])

  const isProjectRoute = currentPage.startsWith('project-') || currentPage === 'project'
  useEffect(() => {
    if (!isProjectRoute) setProjectScrollCombined(0)
  }, [isProjectRoute])

  // Gestion d'erreur globale
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      setError(event.error)
    }
    
    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [])

  // Vérifier l'authentification au chargement + détecter langue et route depuis l'URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const pageParam = urlParams.get('page')
    const pathname = window.location.pathname

    // Langue depuis l'URL : /fr/... ou /en/...
    if (pathname.startsWith('/fr') || pathname === '/fr') {
      setLanguage('fr')
    } else if (pathname.startsWith('/en') || pathname === '/en') {
      setLanguage('en')
    }

    // Détecter la route depuis le pathname ou le paramètre page
    let targetPage = pageParam

    // Si pas de paramètre page, vérifier le pathname (supporter /fr et /en en préfixe)
    let pathToMatch = pathname
    if (pathname.startsWith('/fr') || pathname.startsWith('/en')) {
      pathToMatch = pathname.replace(/^\/(fr|en)/, '') || '/'
    }
    if (!targetPage) {
      if (pathToMatch === '/' || pathToMatch === '') {
        targetPage = 'accueil'
      } else if (pathToMatch === '/dashboard' || pathToMatch.startsWith('/dashboard')) {
        targetPage = 'dashboard'
      } else if (pathToMatch === '/menu' || pathToMatch.startsWith('/menu')) {
        targetPage = 'menu'
      } else if (pathToMatch === '/about' || pathToMatch === '/apropos' || pathToMatch.startsWith('/about')) {
        targetPage = 'aproposnew'
      } else if (pathToMatch === '/contact' || pathToMatch.startsWith('/contact')) {
        targetPage = 'contact'
      } else if (pathToMatch.startsWith('/project/')) {
        const projectId = pathToMatch.replace(/^\/project\//, '').toLowerCase()
        const projectName = SLUG_TO_PROJECT_NAME[projectId] ?? projectId.charAt(0).toUpperCase() + projectId.slice(1)
        targetPage = `project-${projectName}`
      } else if (/^\/playdago$/i.test(pathToMatch)) {
        targetPage = 'project-Playdago'
      } else if (/^\/utoi$/i.test(pathToMatch)) {
        targetPage = 'project-UTOI'
      } else if (/^\/pedaboard$/i.test(pathToMatch)) {
        targetPage = 'project-Pedaboard'
      } else if (/^\/kaldera$/i.test(pathToMatch)) {
        targetPage = 'project-Kaldera'
      } else {
        targetPage = '404'
      }
    }
    
    if (targetPage === 'dashboard') {
      // Vérifier si on a des tokens OAuth2 dans l'URL (retour de Google)
      const hasOAuthTokens = urlParams.has('access_token')
      
      // Si on a des tokens OAuth2, considérer comme authentifié
      // Sinon, vérifier l'authentification email/password
      const authenticated = hasOAuthTokens || isAuthenticated()
      setIsLoggedIn(authenticated)
      setCurrentPage('dashboard') // Toujours définir la page pour afficher le login si nécessaire
      
      // Mettre à jour l'URL pour inclure ?page=dashboard si nécessaire
      if (!pageParam && pathname === '/dashboard') {
        const newUrl = new URL(window.location.href)
        newUrl.searchParams.set('page', 'dashboard')
        window.history.replaceState({}, document.title, newUrl.toString())
      }
    } else {
      setIsLoggedIn(true)
      if (targetPage) {
        setCurrentPage(targetPage)
        if (targetPage.startsWith('project-')) {
          setPreviousPage('accueil')
          const projectName = targetPage.replace('project-', '')
          setCurrentProjectImage(PROJECT_COVER_IMAGES[projectName] ?? null)
        }
      }
    }
    
    setIsAuthChecked(true)
  }, [])

  // Rediriger / ou '' vers /fr ou /en pour afficher la langue dans l'URL
  useEffect(() => {
    if (!isAuthChecked) return
    const pathname = window.location.pathname
    if (pathname === '/' || pathname === '') {
      window.history.replaceState({}, document.title, language === 'en' ? '/en' : '/fr')
    }
  }, [isAuthChecked, language])

  // Mapping page -> URL path (avec préfixe langue /fr ou /en)
  const getPathFromPage = (page: string): string => {
    const prefix = language === 'en' ? '/en' : '/fr'
    return getPathForLang(page, language)
  }

  /** Path pour une page et une langue donnée (pour hreflang SEO). */
  function getPathForLang(page: string, lang: 'fr' | 'en'): string {
    const prefix = lang === 'en' ? '/en' : '/fr'
    if (page === 'accueil' || page === '404') return prefix
    if (page === 'apropos' || page === 'aproposnew') return `${prefix}/about`
    if (page === 'contact') return `${prefix}/contact`
    if (page === 'dashboard') return `${prefix}/dashboard`
    if (page.startsWith('project-')) {
      const name = page.replace('project-', '')
      const slug = name.toLowerCase()
      if (slug === 'playdago') return `${prefix}/playdago`
      if (slug === 'utoi') return `${prefix}/utoi`
      if (slug === 'pedaboard') return `${prefix}/pedaboard`
      if (slug === 'kaldera') return `${prefix}/kaldera`
      return `${prefix}/project/${name}`
    }
    return prefix
  }

  // Synchroniser l'URL quand la langue change (garder la même page)
  useEffect(() => {
    if (!isAuthChecked) return
    const path = getPathFromPage(currentPage)
    const currentPath = window.location.pathname + window.location.search
    if (path !== currentPath && currentPage !== 'dashboard') {
      window.history.replaceState({}, document.title, path)
    }
  }, [language])

  // SEO : canonical, hreflang + x-default (anglais par défaut pour public international / Linear)
  const siteBaseUrl = (import.meta.env.VITE_SITE_URL as string) || (typeof window !== 'undefined' ? window.location.origin : '')
  useEffect(() => {
    if (!siteBaseUrl || currentPage === 'dashboard') return
    const base = siteBaseUrl.replace(/\/$/, '')
    const currentPath = getPathFromPage(currentPage)
    const canonicalUrl = `${base}${currentPath}`

    // Canonical : URL propre de la page (évite duplicate content avec ?utm_* etc.)
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalUrl

    // hreflang
    const existing = document.querySelectorAll('link[rel="alternate"][hreflang]')
    existing.forEach((el) => el.remove())
    const pathFr = getPathForLang(currentPage, 'fr')
    const pathEn = getPathForLang(currentPage, 'en')
    const linkFr = document.createElement('link')
    linkFr.rel = 'alternate'
    linkFr.hreflang = 'fr'
    linkFr.href = `${base}${pathFr}`
    const linkEn = document.createElement('link')
    linkEn.rel = 'alternate'
    linkEn.hreflang = 'en'
    linkEn.href = `${base}${pathEn}`
    const linkDefault = document.createElement('link')
    linkDefault.rel = 'alternate'
    linkDefault.hreflang = 'x-default'
    linkDefault.href = `${base}${pathEn}`
    document.head.appendChild(linkFr)
    document.head.appendChild(linkEn)
    document.head.appendChild(linkDefault)
    return () => {
      linkFr.remove()
      linkEn.remove()
      linkDefault.remove()
    }
  }, [currentPage, siteBaseUrl])

  // Titre du document (onglet + SEO) à chaque changement de page
  useEffect(() => {
    document.title = getPageTitle(currentPage)
  }, [currentPage])

  // Écouter le bouton Retour du navigateur
  useEffect(() => {
    const handlePopState = () => {
      const pathname = window.location.pathname
      const pathToMatch = pathname.startsWith('/fr') || pathname.startsWith('/en')
        ? pathname.replace(/^\/(fr|en)/, '') || '/'
        : pathname
      if (pathToMatch === '/' || pathToMatch === '') {
        setCurrentPage('accueil')
      } else if (pathToMatch === '/about') {
        setCurrentPage('aproposnew')
      } else if (pathToMatch === '/contact') {
        setCurrentPage('contact')
      } else if (pathToMatch === '/dashboard') {
        setCurrentPage('dashboard')
      } else if (/^\/playdago$/i.test(pathToMatch)) {
        setPreviousPage('accueil')
        setCurrentPage('project-Playdago')
      } else if (/^\/utoi$/i.test(pathToMatch)) {
        setPreviousPage('accueil')
        setCurrentPage('project-UTOI')
      } else if (/^\/pedaboard$/i.test(pathToMatch)) {
        setPreviousPage('accueil')
        setCurrentPage('project-Pedaboard')
      } else if (/^\/kaldera$/i.test(pathToMatch)) {
        setPreviousPage('accueil')
        setCurrentPage('project-Kaldera')
      } else if (pathToMatch.startsWith('/project/')) {
        const id = pathToMatch.replace(/^\/project\//, '')
        const name = id.charAt(0).toUpperCase() + id.slice(1).toLowerCase()
        setPreviousPage('accueil')
        setCurrentPage(`project-${name}`)
      } else {
        setCurrentPage('404')
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Fonction helper pour obtenir le titre de la page
  const getPageTitle = (page: string): string => {
    const titles: Record<string, string> = {
      'accueil': 'Accueil - Anthony Merault - Product Designer | Building Complex SaaS & Design Systems',
      'menu': 'Menu - Anthony Merault - Product Designer | Building Complex SaaS & Design Systems',
      'apropos': 'À propos - Anthony Merault - Product Designer | Building Complex SaaS & Design Systems',
      'aproposnew': 'À propos - Anthony Merault - Product Designer | Building Complex SaaS & Design Systems',
      'contact': 'Contact - Anthony Merault - Product Designer | Building Complex SaaS & Design Systems',
      'dashboard': 'Dashboard - Anthony Merault - Product Designer | Building Complex SaaS & Design Systems',
      'login': 'Connexion - Anthony Merault - Product Designer | Building Complex SaaS & Design Systems',
    }
    
    if (page.startsWith('project-')) {
      const projectName = page.replace('project-', '')
      return `${projectName} - Projet - Anthony Merault - Product Designer | Building Complex SaaS & Design Systems`
    }
    
    return titles[page] || 'Anthony Merault - Product Designer | Building Complex SaaS & Design Systems'
  }

  // Gestion des paramètres d'URL pour la navigation (sauf dashboard)
  useEffect(() => {
    if (isAuthChecked && currentPage !== 'dashboard') {
      const urlParams = new URLSearchParams(window.location.search)
      const pageParam = urlParams.get('page')
      if (pageParam && pageParam !== 'dashboard') {
        setCurrentPage(pageParam)
      }
    }
  }, [isAuthChecked, currentPage])

  useEffect(() => {
    // Gestion des classes sur le body pour les styles globaux
    // Menu
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
    
    // Page d'accueil, Dashboard et Login
    if (currentPage === 'accueil' || currentPage === 'dashboard' || currentPage === 'login') {
      document.body.classList.add('accueil-page')
    } else {
      document.body.classList.remove('accueil-page')
    }

    setBackgroundActive(currentPage === 'accueil')

    // Track page view avec Google Analytics
    const pageTitle = getPageTitle(currentPage)
    trackPageView(`/${currentPage}`, pageTitle)
  }, [currentPage, previousPage, setBackgroundActive])

  const handlePageChange = (page: string, projectImage?: string, projectCategory?: string) => {
    // Si on navigue vers un projet, toujours sauvegarder la page actuelle comme page précédente
    if (page.startsWith('project-') && !currentPage.startsWith('project-')) {
      setPreviousPage(currentPage)
      if (projectImage) setCurrentProjectImage(projectImage)
      if (projectCategory) setCurrentProjectCategory(projectCategory)
      const projectName = page.replace('project-', '')
      trackEvent('open_project', 'navigation', projectName)
      window.history.pushState({}, '', getPathFromPage(page))
    } else {
      if (page === 'apropos' || page === 'aproposnew') trackEvent('click', 'navigation', 'about')
      window.history.pushState({}, '', getPathFromPage(page))
    }
    setCurrentPage(page)
  }

  const handleMenuClick = () => {
    trackEvent('click', 'navigation', 'menu_home')
    setPreviousPage(currentPage)
    setCurrentPage('accueil')
    window.history.pushState({}, '', getPathFromPage('accueil'))
  }

  const handleContactClick = () => {
    trackEvent('click', 'contact', 'header_contact')
    setPreviousPage(currentPage)
    setCurrentPage('contact')
    window.history.pushState({}, '', getPathFromPage('contact'))
  }

  const handleSearchChange = () => {
    // Search term géré par MobileSearchBar
  }

  const handleLogoClick = () => {
    trackEvent('click', 'navigation', 'logo_home')
    setPreviousPage(currentPage)
    setCurrentPage('accueil')
    window.history.pushState({}, '', getPathFromPage('accueil'))
  }

  const handleLoginSuccess = () => {
    setIsLoggedIn(true)
    setCurrentPage('dashboard')
    window.history.pushState({}, '', getPathFromPage('dashboard'))
  }

  const renderCurrentPage = () => {
    const isProjectPage = currentPage.startsWith('project-') || currentPage === 'project'
    
    return (
      <>
        {/* Afficher la page d'accueil */}
        {currentPage === 'accueil' && (
          <Hero onPageChange={handlePageChange} onContactClick={handleContactClick} />
        )}

        {/* Page d'erreur 404 */}
        {currentPage === '404' && (
          <ErrorPage
            code={404}
            onBackToHome={() => {
              setCurrentPage('accueil')
              window.history.pushState({}, '', getPathFromPage('accueil'))
            }}
            onProjectClick={(slug) => {
              setPreviousPage('accueil')
              setCurrentPage(`project-${slug}`)
              setCurrentProjectImage(PROJECT_COVER_IMAGES[slug] ?? null)
              window.history.pushState({}, '', getPathFromPage(`project-${slug}`))
            }}
          />
        )}
        
        {/* Afficher les autres pages normalement quand on n'est pas sur un projet */}
        {!isProjectPage && currentPage !== 'accueil' && currentPage !== '404' && (
          <>
            {currentPage === 'apropos' && <About />}
            {currentPage === 'aproposnew' && <AboutNew />}
            {currentPage === 'contact' && (
              <Contact
                onBackClick={() => {
                  setCurrentPage(previousPage)
                  window.history.pushState({}, '', getPathFromPage(previousPage))
                }}
              />
            )}
            {currentPage === 'dashboard' && <Dashboard onBackClick={() => setCurrentPage('accueil')} />}
          </>
        )}
        
        {/* Afficher la page précédente en arrière-plan quand on est sur un projet */}
        {isProjectPage && (
          <>
            {previousPage === 'accueil' && <Hero onPageChange={handlePageChange} onContactClick={handleContactClick} />}
            {previousPage === 'apropos' && <About />}
            {previousPage === 'aproposnew' && <AboutNew />}
            {previousPage === 'contact' && (
              <Contact onBackClick={() => {}} />
            )}
          </>
        )}
        
        {/* Image de couverture carousel au-dessus de la page SingleProject */}
        {isProjectPage && currentProjectImage && (
          <ProjectCoverCarousel 
            coverImage={currentProjectImage} 
            projectName={currentPage.startsWith('project-') ? currentPage.replace('project-', '') : 'Playdago'}
            swipeY={projectSwipeY}
            coverLiftProgress={coverLiftProgress}
            hideCloseOnScroll={projectScrollCombined > 32}
            coverFullscreenActive={coverFullscreenActive}
            isFullscreenModalOpen={coverFullscreenModalOpen}
            onFullscreenOpen={() => {
              if (coverFullscreenModalTimeoutRef.current) clearTimeout(coverFullscreenModalTimeoutRef.current)
              setCoverFullscreenActive(true)
              setCoverFullscreenModalOpen(false)
              coverFullscreenModalTimeoutRef.current = setTimeout(() => {
                coverFullscreenModalTimeoutRef.current = null
                setCoverFullscreenModalOpen(true)
              }, 550)
            }}
            onFullscreenClose={() => {
              if (coverFullscreenModalTimeoutRef.current) {
                clearTimeout(coverFullscreenModalTimeoutRef.current)
                coverFullscreenModalTimeoutRef.current = null
              }
              setCoverFullscreenModalOpen(false)
              setCoverFullscreenActive(false)
            }}
            onClose={() => {
              trackEvent('close_project', 'navigation', currentPage.replace('project-', ''))
              setProjectSwipeY(0)
              setCoverLiftProgress(0)
              setCurrentPage(previousPage)
              window.history.pushState({}, '', getPathFromPage(previousPage))
            }}
            onPreviousProject={() => {
              window.scrollTo(0, 0)
              const currentName = currentPage.startsWith('project-') ? currentPage.replace('project-', '') : 'Playdago'
              const idx = PROJECT_ORDER.indexOf(currentName as typeof PROJECT_ORDER[number])
              const prevIdx = idx <= 0 ? PROJECT_ORDER.length - 1 : idx - 1
              const prevName = PROJECT_ORDER[prevIdx]
              trackEvent('previous_project', 'navigation', prevName)
              setPreviousPage('accueil')
              setCurrentPage(`project-${prevName}`)
              setCurrentProjectImage(PROJECT_COVER_IMAGES[prevName] ?? null)
              setProjectSwipeY(0)
              setCoverLiftProgress(0)
              window.history.pushState({}, '', getPathFromPage(`project-${prevName}`))
            }}
            onNextProject={() => {
              window.scrollTo(0, 0)
              const currentName = currentPage.startsWith('project-') ? currentPage.replace('project-', '') : 'Playdago'
              const idx = PROJECT_ORDER.indexOf(currentName as typeof PROJECT_ORDER[number])
              const nextIdx = idx < 0 ? 0 : (idx + 1) % PROJECT_ORDER.length
              const nextName = PROJECT_ORDER[nextIdx]
              trackEvent('next_project', 'navigation', nextName)
              setPreviousPage('accueil')
              setCurrentPage(`project-${nextName}`)
              setCurrentProjectImage(PROJECT_COVER_IMAGES[nextName] ?? null)
              setProjectSwipeY(0)
              setCoverLiftProgress(0)
              window.history.pushState({}, '', getPathFromPage(`project-${nextName}`))
            }}
          />
        )}
        
        {/* Afficher le projet par-dessus le contenu */}
        {isProjectPage && (
          <Project 
            onBackClick={() => {
              trackEvent('close_project', 'navigation', currentPage.replace('project-', ''))
              setProjectSwipeY(0)
              setCoverLiftProgress(0)
              setCurrentPage(previousPage)
              window.history.pushState({}, '', getPathFromPage(previousPage))
            }} 
            projectName={currentPage.startsWith('project-') ? currentPage.replace('project-', '') : undefined}
            coverImage={currentProjectImage} 
            projectCategory={currentProjectCategory}
            onSwipeYChange={setProjectSwipeY}
            onLiftProgressChange={setCoverLiftProgress}
            onProjectScrollCombinedChange={setProjectScrollCombined}
            coverFullscreenActive={coverFullscreenActive}
          />
        )}
      </>
    )
  }

  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h1>Erreur de chargement</h1>
        <p>{error.message}</p>
        <button onClick={() => window.location.reload()}>Recharger la page</button>
      </div>
    )
  }

  // Afficher la page de login si on essaie d'accéder au dashboard sans être authentifié
  if (!isAuthChecked) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#fef7ff' }}>Chargement...</div>
  }

  // Si on est sur le dashboard et non authentifié, afficher le login
  // SAUF si on a des tokens OAuth2 dans l'URL (ils seront traités par DashboardStats)
  const urlParams = new URLSearchParams(window.location.search)
  const hasOAuthTokens = urlParams.has('access_token')
  if (currentPage === 'dashboard' && !isLoggedIn && !hasOAuthTokens) {
    return <Login onLoginSuccess={handleLoginSuccess} />
  }

  return (
    <div className={`container ${currentPage === 'menu' ? 'menu-active' : ''}`}>
      <AnalyticsGuard />
      <Toaster position="bottom-right" theme="dark" />
      {/* Conteneur pour l'overlay de la search bar (portal) : couvre tout l'écran, sous le header */}
      <div id="search-overlay-root" className="search-overlay-root" />
      {currentPage !== 'dashboard' && (
        <Header 
          onMenuClick={handleMenuClick} 
          onContactClick={handleContactClick} 
          onLogoClick={handleLogoClick}
          currentPage={currentPage}
          onSearchChange={handleSearchChange}
          onPageChange={handlePageChange}
          onProjectClose={() => setCurrentPage(previousPage)}
          projectSwipeY={projectSwipeY}
        />
      )}
      {renderCurrentPage()}
    </div>
  )
}

export default App
