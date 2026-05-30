import { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { trackEvent } from '../services/googleAnalyticsTracking'
import LanguageSwitcher from './LanguageSwitcher'
import './Hero.css'
import { getProjectsGroupedByCategory, type MenuItem } from '../services/projectService'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

interface HeroProps {
  onPageChange: (page: string, projectImage?: string, projectCategory?: string) => void
  onContactClick?: () => void
}

/** Mettre à true pour réafficher le carousel (code conservé) */
const SHOW_CAROUSEL = false

const Hero = ({ onPageChange, onContactClick }: HeroProps) => {
  const { t, language } = useLanguage()
  const prefix = language === 'en' ? '/en' : '/fr'
  const [allProjects, setAllProjects] = useState<MenuItem[]>([])

  useEffect(() => {
    // Charger les projets depuis localStorage
    const categories = getProjectsGroupedByCategory()
    const projects = categories
      .flatMap(category => category.projects.map(project => ({ ...project, category: category.title })))
      .slice(0, 4)
    setAllProjects(projects)
  }, [])

  // Écouter les changements de localStorage pour mettre à jour les projets
  useEffect(() => {
    const handleStorageChange = () => {
      const categories = getProjectsGroupedByCategory()
      const projects = categories
        .flatMap(category => category.projects.map(project => ({ ...project, category: category.title })))
        .slice(0, 4)
      setAllProjects(projects)
    }

    window.addEventListener('storage', handleStorageChange)
    // Écouter aussi les événements personnalisés pour les changements dans le même onglet
    window.addEventListener('projectsUpdated', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('projectsUpdated', handleStorageChange)
    }
  }, [])

  // Dates inventées pour les 4 projets
  const projectDates = [
    '01/01/2025',
    '15/12/2024', 
    '10/11/2024',
    '25/10/2024'
  ]

  return (
    <div className="page active">
      <div className="hero-bg-grid" aria-hidden />
      <div className="main-accueil">
        <div className="hero-main">
          {/* Colonne de gauche */}
          <div className="hero-left-column">
            <div className="hero-title-container">
              <h1 className="hero-main-title">
                {t('hero.title')}
              </h1>
            </div>
          </div>

          {/* Colonne de droite */}
          <div className="hero-right-column">
            <div className="hero-right-column-scroll">
              {/* Carte Infos (entièrement cliquable) */}
              <div
                className="hero-card info-card"
                onClick={() => onPageChange('aproposnew')}
                onKeyDown={(e) => e.key === 'Enter' && onPageChange('aproposnew')}
                role="button"
                tabIndex={0}
                aria-label={t('hero.infos')}
              >
                <div className="card-header">
                  <h2 className="card-title">{t('hero.infos')}</h2>
                  <div className="card-arrow" aria-hidden>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="arrow-icon">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

            {/* Carte Projet Carousel (masqué : SHOW_CAROUSEL = false, code conservé pour réactivation) */}
            {SHOW_CAROUSEL && (
              <div className="hero-card project-card">
                <div className="project-content">
                  <Swiper
                    modules={[Pagination]}
                    spaceBetween={0}
                    slidesPerView={1}
                    pagination={{ 
                      clickable: true,
                      bulletClass: 'swiper-pagination-bullet custom-bullet',
                      bulletActiveClass: 'swiper-pagination-bullet-active custom-bullet-active'
                    }}
                    className="swiper-container"
                  >
                    {allProjects.map((project, index) => (
                      <SwiperSlide key={index}>
                        <div 
                          className="project-slide"
                          onClick={() => onPageChange(`project-${project.title}`, project.imageSrc, project.category)}
                          style={{ cursor: 'pointer' }}
                        >
                          <div className="project-image-container">
                            <img 
                              src={project.imageSrc} 
                              alt={project.title} 
                              className="project-image"
                            />
                            <div className="project-overlay"></div>
                          </div>
                          <div className="project-info">
                            <p className="project-category">
                              {project.category === 'Application' ? t('hero.categoryApplication') :
                               project.category === 'Application web' ? t('hero.categoryApplicationWeb') :
                               project.category === 'Site web' ? t('hero.categorySiteWeb') :
                               project.category === 'Logo' ? t('hero.categoryLogo') :
                               project.category === 'Motion' ? t('hero.categoryMotion') :
                               (project.category === 'PLV' || project.category === 'Plv') ? t('hero.categoryPlv') : project.category}
                            </p>
                            <h3 className="project-title">{project.title}</h3>
                            <p className="project-date">{projectDates[index] || '01/01/2025'}</p>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            )}

            {/* Liste des projets : Playdago, UTOI, Pedaboard, Kaldera */}
            <div className="hero-projects-list">
              {[
                { title: 'Playdago', imageSrc: '/images/cover-project-playdago.png', category: 'Application', date: '01/01/2025' },
                { title: 'UTOI', imageSrc: '/images/cover-project-utoi.png', category: 'Site web', date: '01/03/2025' },
                { title: 'Pedaboard', imageSrc: '/images/cover-project-pedaboard.png', category: 'Application web', date: '10/11/2024' },
                { title: 'Kaldera', imageSrc: '/images/cover-project-kaldera.png', category: 'Site web', date: '15/12/2024' },
              ].map((project) => (
                <div key={project.title} className="hero-card project-card">
                  <div className="project-content">
                    <div
                      className="project-slide"
                      onClick={() => onPageChange(`project-${project.title}`, project.imageSrc, project.category)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && onPageChange(`project-${project.title}`, project.imageSrc, project.category)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="project-image-container">
                        <img src={project.imageSrc} alt={project.title} className="project-image" />
                        <div className="project-overlay" />
                      </div>
                      <div className="project-info">
                        <p className="project-category">
                          {project.category === 'Application' ? t('hero.categoryApplication') : project.category === 'Application web' ? t('hero.categoryApplicationWeb') : t('hero.categorySiteWeb')}
                        </p>
                        <h3 className="project-title">{project.title}</h3>
                        <p className="project-date">{project.date}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

              {/* Liens internes pour SEO et sitelinks Google (Pedaboard, Playdago, Kaldera, À propos, Contact) */}
              <nav className="hero-seo-links" aria-label={t('hero.seoDiscover')}>
                <span className="hero-seo-links-title">{t('hero.seoDiscover')}</span>
                <a
                  href={`${prefix}/pedaboard`}
                  className="hero-seo-link"
                  onClick={(e) => {
                    e.preventDefault()
                    onPageChange('project-Pedaboard', '/images/cover-project-pedaboard.png', 'Application web')
                    trackEvent('click', 'seo_link', 'pedaboard')
                  }}
                >
                  Pedaboard
                </a>
                <span className="hero-seo-desc"> — {t('hero.seoPedaboardDesc')}</span>
                <a
                  href={`${prefix}/playdago`}
                  className="hero-seo-link"
                  onClick={(e) => {
                    e.preventDefault()
                    onPageChange('project-Playdago', '/images/cover-project-playdago.png', 'Application')
                    trackEvent('click', 'seo_link', 'playdago')
                  }}
                >
                  Playdago
                </a>
                <span className="hero-seo-desc"> — {t('hero.seoUtoidDesc')}</span>
                <a
                  href={`${prefix}/utoi`}
                  className="hero-seo-link"
                  onClick={(e) => {
                    e.preventDefault()
                    onPageChange('project-UTOI', '/images/cover-project-utoi.png', 'Site web')
                    trackEvent('click', 'seo_link', 'utoi')
                  }}
                >
                  UTOI
                </a>
                <span className="hero-seo-desc"> — {t('hero.seoPlaydagoDesc')}</span>
                <a
                  href={`${prefix}/kaldera`}
                  className="hero-seo-link"
                  onClick={(e) => {
                    e.preventDefault()
                    onPageChange('project-Kaldera', '/images/cover-project-kaldera.png', 'Site web')
                    trackEvent('click', 'seo_link', 'kaldera')
                  }}
                >
                  Kaldera
                </a>
                <span className="hero-seo-desc"> — {t('hero.seoKalderaDesc')}</span>
                <a
                  href={`${prefix}/about`}
                  className="hero-seo-link"
                  onClick={(e) => {
                    e.preventDefault()
                    onPageChange('aproposnew')
                    trackEvent('click', 'seo_link', 'about')
                  }}
                >
                  {t('nav.about')}
                </a>
                <span className="hero-seo-desc"> — {t('hero.seoAboutDesc')}</span>
                <a
                  href={`${prefix}/about`}
                  className="hero-seo-link"
                  onClick={(e) => {
                    e.preventDefault()
                    onPageChange('aproposnew')
                    trackEvent('click', 'seo_link', 'contact')
                  }}
                >
                  {t('nav.contact')}
                </a>
                <span className="hero-seo-desc"> — {t('hero.seoContactDesc')}</span>
              </nav>

              {/* Carte Contact (même style que Infos, juste au-dessus du footer) */}
              <div
                className="hero-card info-card"
                onClick={() => onContactClick?.()}
                onKeyDown={(e) => e.key === 'Enter' && onContactClick?.()}
                role="button"
                tabIndex={0}
                aria-label={t('nav.contact')}
              >
                <div className="card-header">
                  <h2 className="card-title">{t('nav.contact')}</h2>
                  <div className="card-arrow" aria-hidden>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="arrow-icon">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Footer : copyright, FR|EN, icônes GitHub/LinkedIn/Figma */}
              <div className="hero-footer">
                <p className="hero-footer-copyright">
                  {t('hero.footer', { year: new Date().getFullYear() })}
                </p>
                <LanguageSwitcher />
                <div className="hero-footer-links">
                  <a href="https://github.com/CarryPouletIsBack/" target="_blank" rel="noopener noreferrer" aria-label="GitHub" onClick={() => trackEvent('click', 'social', 'github')}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/in/anthony-merault" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" onClick={() => trackEvent('click', 'social', 'linkedin')}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="https://www.figma.com/@TonUi" target="_blank" rel="noopener noreferrer" aria-label="Figma" onClick={() => trackEvent('click', 'social', 'figma')}>
                    <svg width="24" height="24" viewBox="0 0 54 80" fill="none" aria-hidden>
                      <path d="M13.3333 80.0002C20.6933 80.0002 26.6667 74.0268 26.6667 66.6668V53.3335H13.3333C5.97333 53.3335 0 59.3068 0 66.6668C0 74.0268 5.97333 80.0002 13.3333 80.0002Z" fill="currentColor"/>
                      <path d="M0 39.9998C0 32.6398 5.97333 26.6665 13.3333 26.6665H26.6667V53.3332H13.3333C5.97333 53.3332 0 47.3598 0 39.9998Z" fill="currentColor" opacity="0.8"/>
                      <path d="M0 13.3333C0 5.97333 5.97333 0 13.3333 0H26.6667V26.6667H13.3333C5.97333 26.6667 0 20.6933 0 13.3333Z" fill="currentColor" opacity="0.6"/>
                      <path d="M26.6667 0H40.0001C47.3601 0 53.3334 5.97333 53.3334 13.3333C53.3334 20.6933 47.3601 26.6667 40.0001 26.6667H26.6667V0Z" fill="currentColor" opacity="0.4"/>
                      <path d="M53.3334 39.9998C53.3334 47.3598 47.3601 53.3332 40.0001 53.3332C32.6401 53.3332 26.6667 47.3598 26.6667 39.9998C26.6667 32.6398 32.6401 26.6665 40.0001 26.6665C47.3601 26.6665 53.3334 32.6398 53.3334 39.9998Z" fill="currentColor" opacity="0.2"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero

