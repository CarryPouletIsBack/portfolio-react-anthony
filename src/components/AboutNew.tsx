import './AboutNew.css'
import './About.css'
import { useState, useEffect, useMemo } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { TreeNode } from './flow/FlowTree'
import { flowData } from '../data/flowData'
import type { FlowNodeData } from '../data/flowData'
// @ts-expect-error - DotGrid is a JSX file without type declarations
import DotGrid from './DotGrid.jsx'
import HoverCard from './HoverCard'
import { aboutData } from '../data/aboutData'
import HumanBody3D from './HumanBody3D'
import StravaMap from './StravaMap'
import StravaRadialBarChart from './StravaRadialBarChart'
import StravaSplineChart from './StravaSplineChart'
import Skeleton from './Skeleton'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { getStravaActivities, getStravaActivitiesByYear, getAllRuns, getStravaAthlete, getStravaActivityDetails, formatDistance, formatTime, formatDate, type StravaActivity, type StravaAthlete } from '../services/stravaService'

// Fonction utilitaire pour les logs de debug (uniquement en développement)
const debugLog = (...args: any[]) => {
  if (import.meta.env.DEV) {
    console.log(...args)
  }
}

const AboutNew = () => {
  const { t, language } = useLanguage()
  const [selectedNodes, setSelectedNodes] = useState<Set<string>>(new Set())
  const [selectedNodeData, setSelectedNodeData] = useState<FlowNodeData | null>(null)
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | null>(null)
  const [activeSection, setActiveSection] = useState<string>('about-intro')
  const [stravaActivities2025, setStravaActivities2025] = useState<StravaActivity[]>([])
  const [stravaActivitiesDetails, setStravaActivitiesDetails] = useState<StravaActivity[]>([])
  const [stravaAllRuns, setStravaAllRuns] = useState<StravaActivity[]>([])
  const [stravaLoading, setStravaLoading] = useState<boolean>(true)
  const [stravaError, setStravaError] = useState<string | null>(null)
  const [stravaAthlete, setStravaAthlete] = useState<StravaAthlete | null>(null)

  // Trouver le nœud dans les données
  const findNode = (data: FlowNodeData, id: string): FlowNodeData | null => {
    if (data.id === id) return data
    if (data.branches) {
      for (const branch of data.branches) {
        const found = findNode(branch, id)
        if (found) return found
      }
    }
    if (data.next) {
      const found = findNode(data.next, id)
      if (found) return found
    }
    return null
  }

  // Trouver tous les ascendants (parents) d'un nœud
  const findAncestors = (data: FlowNodeData, targetId: string, path: string[] = []): string[] | null => {
    // Si on a trouvé le nœud cible, retourner le chemin
    if (data.id === targetId) {
      return path
    }

    // Chercher dans les branches
    if (data.branches) {
      for (const branch of data.branches) {
        const result = findAncestors(branch, targetId, [...path, data.id])
        if (result) return result
      }
    }

    // Chercher dans next
    if (data.next) {
      const result = findAncestors(data.next, targetId, [...path, data.id])
      if (result) return result
    }

    return null
  }

  const handleNodeClick = (nodeId: string, event?: React.MouseEvent) => {
    const node = findNode(flowData, nodeId)
    
    if (node) {
      if (selectedNodeData?.id === nodeId) {
        // Si on clique sur le même nœud, fermer la popup
        setSelectedNodeData(null)
        setPopupPosition(null)
        setSelectedNodes(new Set())
      } else {
        // Sinon, ouvrir la popup et désélectionner tous les autres nœuds
        if (event) {
          const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
          const containerRect = document.querySelector('.skill-tree-container')?.getBoundingClientRect()
          
          if (containerRect) {
            // Positionner la popup à droite du nœud avec un petit offset
            setPopupPosition({
              x: rect.right - containerRect.left + 16,
              y: rect.top - containerRect.top + (rect.height / 2)
            })
          }
        }
        setSelectedNodeData(node)
        
        // Trouver tous les ascendants du nœud sélectionné
        const ancestors = findAncestors(flowData, nodeId)
        const nodesToSelect = ancestors ? [...ancestors, nodeId] : [nodeId]
        
        // Remplacer complètement le Set avec le nœud et tous ses ascendants
        setSelectedNodes(new Set(nodesToSelect))
      }
    }
  }

  const closePopup = () => {
    setSelectedNodeData(null)
    setPopupPosition(null)
  }

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 120 // Offset pour tenir compte de la barre de recherche
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  // Fonction pour récupérer l'URL de la photo de l'activité
  const getActivityPhotoUrl = (activity: StravaActivity): string | undefined => {
    // Vérifier d'abord primary_photo (format le plus courant)
    if (activity?.primary_photo?.urls?.['600']) {
      return activity.primary_photo.urls['600']
    }
    // Vérifier ensuite photos.primary (format alternatif)
    if (activity?.photos?.primary?.urls?.['600']) {
      return activity.photos.primary.urls['600']
    }
    // Vérifier aussi d'autres formats possibles (fallback sur taille 100)
    if (activity?.photos?.primary?.urls?.['100']) {
      return activity.photos.primary.urls['100']
    }
    if (activity?.primary_photo?.urls?.['100']) {
      return activity.primary_photo.urls['100']
    }
    // Vérifier si photos est un tableau (format alternatif)
    if (Array.isArray(activity?.photos) && activity.photos.length > 0) {
      const firstPhoto = activity.photos[0]
      if (firstPhoto?.urls?.['600']) {
        return firstPhoto.urls['600']
      }
      if (firstPhoto?.urls?.['100']) {
        return firstPhoto.urls['100']
      }
    }
    return undefined
  }

  // Calculer le total de kilomètres pour 2025
  const totalKm2025 = useMemo(() => {
    const totalMeters = stravaActivities2025.reduce((sum, activity) => sum + activity.distance, 0)
    return Math.round(totalMeters / 1000) // Convertir en km et arrondir
  }, [stravaActivities2025])

  // Récupérer les activités Strava et les infos de l'athlète
  useEffect(() => {
    const fetchStravaData = async () => {
      try {
        setStravaLoading(true)
        setStravaError(null)
        
        // Récupérer les activités et les infos de l'athlète en parallèle
        const [activities2025Result, allRunsResult, athleteResult] = await Promise.allSettled([
          getStravaActivitiesByYear(2025),
          getAllRuns(),
          getStravaAthlete()
        ])
        
        // Récupérer les 5 dernières activités pour les détails
        let activities: StravaActivity[] = []
        try {
          activities = await getStravaActivities(5)
        } catch (error) {
          // Erreur silencieuse, on continue avec les autres données
        }
        
        // Traiter les résultats
        let activities2025: StravaActivity[] = []
        let allRuns: StravaActivity[] = []
        let athlete: StravaAthlete | null = null
        let hasError = false
        const errors: string[] = []
        
        if (activities2025Result.status === 'fulfilled') {
          activities2025 = activities2025Result.value
        } else {
          errors.push(`Activités 2025: ${activities2025Result.reason?.message || 'Erreur inconnue'}`)
          hasError = true
        }
        
        if (allRunsResult.status === 'fulfilled') {
          allRuns = allRunsResult.value
        } else {
          errors.push(`Runs: ${allRunsResult.reason?.message || 'Erreur inconnue'}`)
          hasError = true
        }
        
        if (athleteResult.status === 'fulfilled') {
          athlete = athleteResult.value
        } else {
          errors.push(`Athlète: ${athleteResult.reason?.message || 'Erreur inconnue'}`)
          hasError = true
        }
        
        setStravaActivities2025(activities2025)
        setStravaAllRuns(allRuns)
        setStravaAthlete(athlete)
        
        // Si on a des erreurs mais pas de données, afficher l'erreur
        if (hasError && activities.length === 0 && activities2025.length === 0 && !athlete) {
          setStravaError(errors.join(' | '))
        }
        
        // Récupérer les détails des activités (avec photos et polylines)
        // Les photos ne sont PAS dans les données de base, elles sont uniquement dans les détails complets
        if (activities.length > 0) {
          try {
            // Récupérer les détails pour obtenir les photos
            const activitiesDetails = await Promise.all(
              activities.map(async (activity) => {
                try {
                  const activityId = typeof activity.id === 'string' ? parseInt(activity.id, 10) : activity.id;
                  if (isNaN(activityId)) {
                    return activity;
                  }
                  // Récupérer les détails complets (avec photos)
                  const details = await getStravaActivityDetails(activityId);
                  return details;
                } catch (error) {
                  // En cas d'erreur, utiliser l'activité de base (sans photos mais avec tracé GPS)
                  console.warn(`⚠️ Impossible de récupérer les détails pour l'activité ${activity.id}, utilisation de la base`);
                  return activity;
                }
              })
            )
            setStravaActivitiesDetails(activitiesDetails)
          } catch (error) {
            console.error('Erreur lors de la récupération des détails:', error);
            // En cas d'erreur globale, utiliser les activités de base
            setStravaActivitiesDetails(activities)
          }
        } else {
          setStravaActivitiesDetails([])
        }
      } catch (error) {
        setStravaError(error instanceof Error ? error.message : 'Erreur lors du chargement des données')
      } finally {
        setStravaLoading(false)
      }
    }

    fetchStravaData()
  }, [])

  // Scroll automatiquement pour voir "direction créative" quand la section devient active
  useEffect(() => {
    if (activeSection === 'about-tree') {
      // Attendre que le DOM soit mis à jour et que l'arbre soit rendu
      const timer = setTimeout(() => {
        const wrapper = document.querySelector('.skill-tree-wrapper') as HTMLElement
        if (!wrapper) return
        
        // Chercher le nœud "direction créative" par son data-node-id
        const directionCreativeNode = document.querySelector('[data-node-id="da_direction_creative"]') as HTMLElement
        
        if (directionCreativeNode) {
          // Calculer la position de "direction créative" pour la rendre visible
          const wrapperRect = wrapper.getBoundingClientRect()
          const nodeRect = directionCreativeNode.getBoundingClientRect()
          const currentScrollLeft = wrapper.scrollLeft
          const nodeLeftRelativeToWrapper = nodeRect.left - wrapperRect.left + currentScrollLeft
          const nodeCenter = nodeLeftRelativeToWrapper + (nodeRect.width / 2)
          const wrapperCenter = wrapper.clientWidth / 2
          const targetScrollLeft = nodeCenter - wrapperCenter
          
          // Scroller pour centrer "direction créative" dans la vue
          wrapper.scrollLeft = Math.max(0, targetScrollLeft)
        } else {
          // Fallback: si on ne trouve pas le nœud, scroller vers le début pour voir "Racines"
          wrapper.scrollLeft = 0
        }
      }, 400) // Augmenter le délai pour s'assurer que le DOM et les animations sont complètement rendus

      return () => clearTimeout(timer)
    }
  }, [activeSection])

  return (
    <div className={`apropos-new-page ${activeSection === 'about-tree' ? 'tree-section-active' : ''}`}>
      <div className="apropos-new-page-bg">
        <DotGrid
          dotSize={3}
          gap={10}
          baseColor="#b51a00"
          activeColor="#e32400"
          proximity={140}
          speedTrigger={100}
          shockRadius={240}
          shockStrength={5}
          maxSpeed={5000}
          resistance={750}
          returnDuration={1.5}
        />
      </div>
      
      {/* Menu de navigation sous la search bar */}
      <div className="about-new-nav-menu">
        <button 
          className={`nav-menu-button ${activeSection === 'about-intro' ? 'active' : ''}`}
          onClick={() => scrollToSection('about-intro')}
        >
          {t('nav.intro')}
        </button>
        <button 
          className={`nav-menu-button ${activeSection === 'about-description' ? 'active' : ''}`}
          onClick={() => scrollToSection('about-description')}
        >
          {t('nav.description')}
        </button>
        <button 
          className={`nav-menu-button ${activeSection === 'about-tree' ? 'active' : ''}`}
          onClick={() => scrollToSection('about-tree')}
        >
          {t('nav.tree')}
        </button>
      </div>

      <div className={`main-apropos-new ${activeSection === 'about-tree' ? 'tree-section-active' : ''}`}>
        {/* ============================================
            SECTION INTRODUCTION - 3 COLONNES AVEC SILHOUETTE 3D
            ============================================ */}
        {activeSection === 'about-intro' && (
          <div id="about-intro" className="intro-three-columns">
            {/* ============================================
                .intro-columns-container
                Container principal pour le layout en 3 colonnes
                Structure: [Gauche] [Centre 3D] [Droite]
                
                CSS: grid-template-columns: 1fr auto 1fr
                - Colonne gauche (1fr): Cartes Strava (Profil + Performance)
                - Colonne centre (auto): Modèle 3D HumanBody3D
                - Colonne droite (1fr): Cartes Strava (Entraînement + Activités)
                ============================================ */}
            <div className="intro-columns-container">
              {/* ============================================
                  COLONNE GAUCHE - .intro-column-left
                  Contient 2 cartes Strava :
                  1. Profil (nom, ville, poids)
                  2. Performance (graphique radar + total km 2025)
                  ============================================ */}
              <div className="intro-column intro-column-left">
                {/* Première carte - Informations personnelles */}
                <div className="hero-card services-card">
                  <div className="card-header">
                    <h2 className="card-title">{t('about.cardProfile')}</h2>
                    <div className="card-arrow">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="arrow-icon">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <div className="services-content">
                    {stravaLoading ? (
                      <div className="service-item">
                        <div className="service-text" style={{ width: '100%' }}>
                          <div style={{ marginBottom: '12px' }}>
                            <Skeleton height="24px" width="60%" borderRadius="4px" />
                          </div>
                          <div style={{ marginBottom: '8px' }}>
                            <Skeleton height="16px" width="40%" borderRadius="4px" />
                          </div>
                          <Skeleton height="16px" width="50%" borderRadius="4px" />
                        </div>
                      </div>
                    ) : stravaError ? (
                      <div className="service-item">
                        <div className="service-text">
                          <p style={{ color: '#f1582a', fontSize: '14px' }}>{t('about.loadError')}</p>
                        </div>
                      </div>
                    ) : stravaAthlete ? (
                      <>
                        <div className="service-item">
                          <div className="service-text">
                            <p className="service-description" style={{ marginBottom: '12px', fontWeight: '600', color: '#222', fontSize: '16px' }}>
                              {stravaAthlete.firstname} {stravaAthlete.lastname}
                            </p>
                            <div className="service-tags">
                              {stravaAthlete.city && (
                                <span className="tag">{stravaAthlete.city}</span>
                              )}
                              {stravaAthlete.state && (
                                <span className="tag">{stravaAthlete.state}</span>
                              )}
                              {stravaAthlete.country && (
                                <span className="tag">{stravaAthlete.country}</span>
                              )}
                            </div>
                            {stravaAthlete.weight && (
                              <p style={{ color: '#71717a', fontSize: '12px', marginTop: '8px' }}>
                                {t('about.weight')}: {stravaAthlete.weight} kg
                              </p>
                            )}
                          </div>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>

                {/* Deuxième carte - Graphique Radar Strava */}
                <div className="hero-card services-card strava-radar-card">
                  <div className="card-header">
                    <h2 className="card-title">{t('about.cardPerformance')}</h2>
                    <div className="card-arrow">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="arrow-icon">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <div className="services-content strava-radar-content">
                    {stravaLoading ? (
                      <div style={{ width: '100%', height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Skeleton height="250px" width="100%" borderRadius="8px" />
                      </div>
                    ) : stravaError ? (
                      <div className="strava-radar-placeholder">
                        <p style={{ color: '#f1582a', marginBottom: '8px' }}>{t('about.error')}</p>
                        <p style={{ fontSize: '12px', color: '#71717a' }}>{stravaError}</p>
                      </div>
                    ) : stravaActivities2025.length === 0 ? (
                      <div className="strava-radar-placeholder">
                        <p>{t('about.noActivity')}</p>
                      </div>
                    ) : (
                      <StravaRadialBarChart activities={stravaActivities2025} />
                    )}
                  </div>
                </div>

              </div>
              
              {/* ============================================
                  COLONNE CENTRALE - .intro-column-center
                  Contient le modèle 3D HumanBody3D
                  - Affichage du nuage de points
                  - Rotation automatique avec OrbitControls
                  - Responsive: devient pleine largeur sur mobile
                  ============================================ */}
              <div className="intro-column intro-column-center">
                <div className="human-silhouette-container">
                  <HumanBody3D />
                </div>
              </div>
              
              {/* ============================================
                  COLONNE DROITE - .intro-column-right
                  Contient 2 cartes Strava :
                  1. Entraînement (graphique journal d'entraînement)
                  2. Activités (carousel Swiper avec les 5 dernières activités)
                  ============================================ */}
              <div className="intro-column intro-column-right">
                {/* Première carte - Graphique d'entraînement */}
                <div className="hero-card services-card">
                  <div className="card-header">
                    <h2 className="card-title">{t('about.cardTraining')}</h2>
                    <div className="card-arrow">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="arrow-icon">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <div className="services-content strava-stats-content">
                    {stravaLoading ? (
                      <div style={{ width: '100%' }}>
                        <div style={{ marginBottom: '16px' }}>
                          <div style={{ marginBottom: '8px' }}>
                            <Skeleton height="16px" width="80px" borderRadius="4px" />
                          </div>
                          <Skeleton height="24px" width="120px" borderRadius="4px" />
                        </div>
                        <Skeleton height="200px" width="100%" borderRadius="8px" />
                      </div>
                    ) : stravaError ? (
                      <div style={{ width: '100%', height: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#f1582a', fontSize: '14px', padding: '16px', textAlign: 'center' }}>
                        <p style={{ marginBottom: '8px', fontWeight: '500' }}>{t('about.error')}</p>
                        <p style={{ fontSize: '12px', color: '#71717a' }}>{stravaError}</p>
                      </div>
                    ) : stravaActivities2025.length === 0 ? (
                      <div style={{ width: '100%', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(0,0,0,0.4)', fontSize: '14px' }}>
                        {t('about.noActivity')}
                      </div>
                    ) : (
                      <>
                        <div className="strava-total-km">
                          <p className="strava-total-km-label">{t('about.total2025')}</p>
                          <p className="strava-total-km-value">{totalKm2025} km</p>
                        </div>
                        <StravaSplineChart activities={stravaAllRuns} />
                      </>
                    )}
                  </div>
                </div>
                
                {/* Deuxième carte - Activités Strava */}
                <div className="hero-card services-card">
                  <div className="card-header">
                    <h2 className="card-title">{t('about.cardActivities')}</h2>
                    <div className="card-arrow">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="arrow-icon">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <div className="services-content">
                    {stravaLoading ? (
                      <div style={{ width: '100%', height: '300px', position: 'relative' }}>
                        <Skeleton height="300px" width="100%" borderRadius="8px" />
                      </div>
                    ) : stravaError ? (
                      <div className="service-item">
                        <div className="service-text">
                          <p style={{ color: '#f1582a', fontSize: '14px', marginBottom: '8px', fontWeight: '500' }}>
                            {t('about.stravaError')}
                          </p>
                          <p style={{ color: '#71717a', fontSize: '12px' }}>
                            {stravaError}
                          </p>
                        </div>
                      </div>
                    ) : stravaActivitiesDetails.length > 0 ? (
                      <Swiper
                        modules={[Pagination]}
                        spaceBetween={16}
                        slidesPerView={1}
                        pagination={{ 
                          clickable: true,
                          bulletClass: 'swiper-pagination-bullet custom-bullet',
                          bulletActiveClass: 'swiper-pagination-bullet-active custom-bullet-active'
                        }}
                        className="strava-activities-swiper"
                      >
                        {stravaActivitiesDetails.map((activity, index) => {
                          const photoUrl = getActivityPhotoUrl(activity)
                          const polyline = activity.map?.summary_polyline || ''
                          const hasPhoto = !!photoUrl
                          const hasPolyline = !!polyline
                          
                          // Debug: afficher dans la console pour vérifier
                          if (activity.total_photo_count > 0 && !photoUrl) {
                            debugLog('Activité avec photos mais URL non trouvée:', {
                              id: activity.id,
                              name: activity.name,
                              total_photo_count: activity.total_photo_count,
                              photo_count: activity.photo_count,
                              primary_photo: activity.primary_photo,
                              photos: activity.photos,
                              activity: activity
                            })
                          }
                          
                          // PRIORITÉ : Afficher la photo si elle existe, sinon le tracé
                          // Si on a une photo, on ne montre PAS le tracé
                          const usePhoto = hasPhoto
                          const usePolyline = !hasPhoto && hasPolyline
                          const hasBackground = usePhoto || usePolyline
                          
                          return (
                            <SwiperSlide key={activity.id || index}>
                              <div className="service-item strava-activity-item" style={{ 
                                background: usePhoto ? `url(${photoUrl}) center/cover no-repeat` : (usePolyline ? 'transparent' : 'transparent'),
                                backgroundSize: usePhoto ? 'cover' : 'auto',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                position: 'relative',
                                minHeight: '200px'
                              }}>
                                {/* PHOTO EN PRIORITÉ - Afficher uniquement si photoUrl existe */}
                                {usePhoto && photoUrl && (
                                  <>
                                    <img 
                                      src={photoUrl} 
                                      alt={`Activité ${activity.name || 'Strava'}`}
                                      style={{
                                        position: 'absolute',
                                        inset: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        zIndex: 0
                                      }}
                                    />
                                    <div style={{
                                      position: 'absolute',
                                      inset: 0,
                                      background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
                                      zIndex: 1
                                    }} />
                                  </>
                                )}
                                
                                {/* TRACÉ GPS - Uniquement si PAS de photo */}
                                {usePolyline && !usePhoto && (
                                  <>
                                    <div style={{ 
                                      position: 'absolute', 
                                      inset: 0,
                                      zIndex: 0,
                                      opacity: 0.4
                                    }}>
                                      <StravaMap polyline={polyline} className="strava-map-background" />
                                    </div>
                                    <div style={{
                                      position: 'absolute',
                                      inset: 0,
                                      background: 'linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(0,0,0,0.3))',
                                      zIndex: 1
                                    }} />
                                  </>
                                )}
                                
                                <div className="service-text" style={{ 
                                  position: 'relative', 
                                  zIndex: 2,
                                  color: hasBackground ? '#ffffff' : '#000000'
                                }}>
                                  <p className="service-description" style={{ 
                                    fontWeight: '600', 
                                    fontSize: '16px',
                                    marginBottom: '8px',
                                    color: hasBackground ? '#ffffff' : '#000000'
                                  }}>
                                    {activity.name}
                                  </p>
                                  <div className="service-tags">
                                    <span className="tag">{activity.type}</span>
                                    <span className="tag">{formatDistance(activity.distance)} km</span>
                                    <span className="tag">{formatTime(activity.moving_time)}</span>
                                    {activity.total_elevation_gain > 0 && (
                                      <span className="tag">+{Math.round(activity.total_elevation_gain)}m</span>
                                    )}
                                  </div>
                                  <p style={{ color: hasBackground ? 'rgba(255, 255, 255, 0.9)' : '#71717a', fontSize: '12px', marginTop: '4px' }}>
                                    {formatDate(activity.start_date_local)}
                                  </p>
                                </div>
                                <div className="service-arrow">
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="arrow-icon">
                                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke={hasBackground ? '#ffffff' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </div>
                              </div>
                            </SwiperSlide>
                          )
                        })}
                      </Swiper>
                    ) : stravaError ? (
                      <div className="service-item">
                        <div className="service-text">
                          <p style={{ color: '#f1582a', fontSize: '14px', marginBottom: '8px', fontWeight: '500' }}>
                            {t('about.stravaError')}
                          </p>
                          <p style={{ color: '#71717a', fontSize: '12px' }}>
                            {stravaError}
                          </p>
                          <p style={{ color: '#71717a', fontSize: '11px', marginTop: '8px', fontStyle: 'italic' }}>
                            {t('about.vercelHint')}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="service-item">
                        <div className="service-text">
                          <p style={{ color: '#71717a', fontSize: '14px' }}>{t('about.noActivity')}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section Description - Contenu de About */}
        {activeSection === 'about-description' && (
          <div id="about-description" className="about-intro-content-wrapper">
            <div className="about-intro-section">
              <div className="about-intro-content">
                <div className="about-text-column">
                  <h2 className="about-intro-title">{t('about.introTitle')}</h2>
                  <p className="about-intro-description">
                    {t('about.introDesc1')}
                  </p>
                  <p className="about-intro-description">
                    {t('about.introDesc2')}
                  </p>
                </div>
                <div className="about-photo-column">
                  <div className="about-photo-wrapper">
                    <div className="about-photo-container">
                      <img 
                        src="/images/portrait-anthony.webp" 
                        alt="Anthony Merault" 
                        className="about-photo"
                      />
                    </div>
                    <a
                      href={language === 'en' ? '/cv-anthony-merault-en.pdf' : '/cv-anthony-merault.pdf'}
                      download
                      className="about-download-cv-button"
                    >
                      {t('about.downloadCv')}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Section listing - Statistiques */}
            <div className="listing-section">
              {aboutData.stats.map((stat, index) => {
                const labelKey: Record<string, string> = {
                  'en agence': 'about.statAgency',
                  'Projets': 'about.statProjects',
                  'Site web': 'about.statSites',
                  'SaaS': 'about.statSaaS',
                  'Identité graphique': 'about.statIdentity',
                  'Niveau': 'about.statLevel',
                }
                const labelTranslated = labelKey[stat.label] ? t(labelKey[stat.label]) : stat.label
                return (
                <HoverCard key={index} intensity={0.05} scale={1.02}>
                  <div className="stat-card">
                    {stat.label === 'Niveau' ? (
                      <>
                        <p>{labelTranslated}</p>
                        <h3>{stat.value}</h3>
                      </>
                    ) : (
                      <>
                        <h3>{stat.value}</h3>
                        <p>{labelTranslated}</p>
                      </>
                    )}
                  </div>
                </HoverCard>
              )})}
            </div>

            {/* Carte principale cardLg */}
            <div className="card-lg">
              <div className="card-border"></div>
              <p className="card-title">{t('about.mainTitle')}</p>
              <div className="card-content">
                <p>{t('about.mainDesc1')}</p>
                <p>{t('about.mainDesc2')}</p>
              </div>
            </div>

            {/* Section content - Deux colonnes */}
            <div className="content-section">
              {/* Colonne gauche */}
              <div className="content-left">
                {/* Carte Compétences */}
                <div className="card-small">
                  <div className="card-border"></div>
                  <p className="card-title">{t('about.skillsTitle')}</p>
                  <div className="card-content">
                    {aboutData.skills.items.map((skill, index) => (
                      <p key={index}>{skill}</p>
                    ))}
                  </div>
                </div>

                {/* Carte Outils */}
                <div className="card-small">
                  <div className="card-border"></div>
                  <p className="card-title">{t('about.toolsTitle')}</p>
                  <div className="card-content">
                    {aboutData.tools.items.map((tool, index) => (
                      <p key={index}>{tool}</p>
                    ))}
                  </div>
                </div>

                {/* Carte Intérêts */}
                <div className="card-small">
                  <div className="card-border"></div>
                  <p className="card-title">{t('about.interestsTitle')}</p>
                  <div className="card-content">
                    {aboutData.interests.items.map((interest, index) => (
                      <p key={index}>{interest}</p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Colonne droite - Expériences */}
              <div className="content-right">
                <div className="card-large">
                  <div className="card-border"></div>
                  <p className="card-title">{t('about.experiencesTitle')}</p>

                  {aboutData.experiences.map((experience, index) => (
                    <div key={index} className="experience-item">
                      <div className="experience-header">
                        <p className="company-name">{experience.company}</p>
                        {experience.badges.map((badge, badgeIndex) => (
                          <div key={badgeIndex} className="experience-badge">
                            <div className="badge-border"></div>
                            <p className="badge-text">{badge}</p>
                          </div>
                        ))}
                      </div>
                      <p className="experience-period">{experience.period}</p>
                      <div className="experience-description">
                        {experience.description.map((desc, descIndex) => (
                          <p key={descIndex}>{desc}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section Formations */}
            <p className="formations-title">{t('about.formationsTitle')}</p>

            {/* Tableau des formations */}
            <div className="formations-table">
              <div className="table-header">
                <div className="table-col-name">
                  <p>{t('about.tableName')}</p>
                </div>
                <div className="table-col-school">
                  <p>{t('about.tableSchool')}</p>
                </div>
                <div className="table-col-year">
                  <p>{t('about.tableYear')}</p>
                </div>
              </div>
              
              <div className="table-rows">
                {aboutData.formations.map((formation, index) => (
                  <div key={index}>
                    {index > 0 && <div className="table-separator"></div>}
                    <div className="table-row">
                      <div className="table-col-name">
                        <p>{formation.name}</p>
                      </div>
                      <div className="table-col-school">
                        <p>{formation.school}</p>
                      </div>
                      <div className="table-col-year">
                        <p>{formation.year}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Section Arbre de compétences */}
        {activeSection === 'about-tree' && (
          <div className="skill-tree-wrapper">
            <div id="about-tree" className="skill-tree-container">
            <TreeNode 
              data={flowData} 
              selectedNodes={selectedNodes}
              onNodeClick={handleNodeClick}
            />
            
            {/* Popup Tooltip */}
            {selectedNodeData && popupPosition && (
              <div 
                className="node-popup-tooltip"
                style={{
                  left: `${popupPosition.x}px`,
                  top: `${popupPosition.y}px`,
                  transform: 'translateY(-50%)'
                }}
              >
                <button className="node-popup-close" onClick={closePopup}>×</button>
                <h3 className="node-popup-title">{selectedNodeData.label}</h3>
                {selectedNodeData.description && (
                  <p className="node-popup-description">{selectedNodeData.description}</p>
                )}
                {selectedNodeData.branches && selectedNodeData.branches.length > 0 && (
                  <div className="node-popup-competences">
                    <h4 className="node-popup-competences-title">{t('about.competencesTitle')}</h4>
                    <ul className="node-popup-competences-list">
                      {selectedNodeData.branches.map((branch) => (
                        <li key={branch.id} className="node-popup-competence-item">
                          {branch.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        )}
      </div>
    </div>
  )
}

export default AboutNew
