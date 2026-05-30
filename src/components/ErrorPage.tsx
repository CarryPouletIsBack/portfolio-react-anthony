import { useLanguage } from '../contexts/LanguageContext'
import { trackEvent } from '../services/googleAnalyticsTracking'
import Button from './Button'
import './ErrorPage.css'

const PROJECTS = [
  { slug: 'Playdago', title: 'Playdago', cover: '/images/cover-project-playdago.png' },
  { slug: 'UTOI', title: 'UTOI', cover: '/images/cover-project-utoi.png' },
  { slug: 'Pedaboard', title: 'Pedaboard', cover: '/images/cover-project-pedaboard.png' },
  { slug: 'Kaldera', title: 'Kaldera', cover: '/images/cover-project-kaldera.png' },
]

interface ErrorPageProps {
  code?: number
  onBackToHome: () => void
  onProjectClick?: (projectSlug: string) => void
}

export default function ErrorPage({ code = 404, onBackToHome, onProjectClick }: ErrorPageProps) {
  const { t } = useLanguage()

  const handleProjectClick = (slug: string) => {
    trackEvent('click', 'error_page_project', slug)
    if (onProjectClick) {
      onProjectClick(slug)
    } else {
      const base = window.location.pathname.startsWith('/en') ? '/en' : '/fr'
      window.location.href = `${base}/${slug.toLowerCase()}`
    }
  }

  return (
    <div className="error-page">
      <div className="error-page-content">
        <p className="error-page-code">{code}</p>
        <h1 className="error-page-title">{t('error.pageNotFound')}</h1>
        <p className="error-page-message">{t('error.pageNotFoundMessage')}</p>

        <section className="error-page-projects">
          <h2 className="error-page-projects-title">{t('error.discoverProjects')}</h2>
          <div className="error-page-projects-grid">
            {PROJECTS.map((project) => (
              <button
                key={project.slug}
                type="button"
                className="error-page-project-card"
                onClick={() => handleProjectClick(project.slug)}
              >
                <div className="error-page-project-cover">
                  <img src={project.cover} alt={project.title} loading="lazy" />
                </div>
                <span className="error-page-project-title">{project.title}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="error-page-social">
          <a href="https://github.com/CarryPouletIsBack/" target="_blank" rel="noopener noreferrer" aria-label="GitHub" onClick={() => trackEvent('click', 'social', 'github')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
          <a href="https://www.linkedin.com/in/anthony-merault" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" onClick={() => trackEvent('click', 'social', 'linkedin')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="https://www.figma.com/@TonUi" target="_blank" rel="noopener noreferrer" aria-label="Figma" onClick={() => trackEvent('click', 'social', 'figma')}>
            <svg width="24" height="24" viewBox="0 0 54 80" fill="none" aria-hidden><path d="M13.3333 80.0002C20.6933 80.0002 26.6667 74.0268 26.6667 66.6668V53.3335H13.3333C5.97333 53.3335 0 59.3068 0 66.6668C0 74.0268 5.97333 80.0002 13.3333 80.0002Z" fill="currentColor"/><path d="M0 39.9998C0 32.6398 5.97333 26.6665 13.3333 26.6665H26.6667V53.3332H13.3333C5.97333 53.3332 0 47.3598 0 39.9998Z" fill="currentColor" opacity="0.8"/><path d="M0 13.3333C0 5.97333 5.97333 0 13.3333 0H26.6667V26.6667H13.3333C5.97333 26.6667 0 20.6933 0 13.3333Z" fill="currentColor" opacity="0.6"/><path d="M26.6667 0H40.0001C47.3601 0 53.3334 5.97333 53.3334 13.3333C53.3334 20.6933 47.3601 26.6667 40.0001 26.6667H26.6667V0Z" fill="currentColor" opacity="0.4"/><path d="M53.3334 39.9998C53.3334 47.3598 47.3601 53.3332 40.0001 53.3332C32.6401 53.3332 26.6667 47.3598 26.6667 39.9998C26.6667 32.6398 32.6401 26.6665 40.0001 26.6665C47.3601 26.6665 53.3334 32.6398 53.3334 39.9998Z" fill="currentColor" opacity="0.2"/></svg>
          </a>
        </div>

        <Button variant="primary" className="error-page-cta" onClick={onBackToHome}>
          {t('error.backToHome')}
        </Button>
      </div>
    </div>
  )
}
