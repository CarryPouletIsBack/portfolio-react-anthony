import './Hero.css'
import { menuCategories } from '../data/menuCategories'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'


interface HeroProps {
  onPageChange: (page: string, projectImage?: string, projectCategory?: string) => void
}

const Hero = ({ onPageChange }: HeroProps) => {

  // Obtenir seulement les 4 premiers projets de toutes les catégories, avec leur catégorie
  const allProjects = menuCategories
    .flatMap(category => category.projects.map(project => ({ ...project, category: category.title })))
    .slice(0, 4)

  // Dates inventées pour les 4 projets
  const projectDates = [
    '01/01/2025',
    '15/12/2024', 
    '10/11/2024',
    '25/10/2024'
  ]

  return (
    <div className="page active accueil-page">
      <div className="main-accueil">
        <div className="hero-main">
          {/* Colonne de gauche */}
          <div className="hero-left-column">
            <div className="hero-title-container">
              <h1 className="hero-main-title">
                Penser, structurer, et donner forme aux idées.
              </h1>
            </div>
          </div>

          {/* Colonne de droite */}
          <div className="hero-right-column">
            {/* Carte Infos */}
            <div className="hero-card info-card">
              <div className="card-header">
                <h2 className="card-title">Infos</h2>
                <button className="card-arrow" onClick={() => onPageChange('apropos')} aria-label="Aller à la page À propos">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="arrow-icon">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Carte Projet Carousel */}
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
                          <p className="project-category">{project.category}</p>
                          <h3 className="project-title">{project.title}</h3>
                          <p className="project-date">{projectDates[index] || '01/01/2025'}</p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            {/* Carte Mes services */}
            <div className="hero-card services-card">
              <div className="card-header">
                <h2 className="card-title">Mes services</h2>
                <div className="card-arrow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="arrow-icon">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div className="services-content">
                <div className="service-item">
                  <div className="service-text">
                    <p className="service-description">
                      Design d'interface (site web, Saas, tableau de bord)
                    </p>
                    <div className="service-tags">
                      <span className="tag">Management</span>
                      <span className="tag">Maquette figma</span>
                      <span className="tag">vision</span>
                      <span className="tag">design system</span>
                      <span className="tag">adaptabilité branding</span>
                      <span className="tag">Consultant</span>
                    </div>
                  </div>
                  <div className="service-arrow">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="arrow-icon">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
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

