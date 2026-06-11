import { useMemo, useState, useCallback, useEffect, useLayoutEffect, useRef, lazy, Suspense } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './ProjectCoverCarousel.css';

const loadUtoidCoverMap = () => import('./utoi/UtoidCoverMap');
const UtoidCoverMap = lazy(loadUtoidCoverMap);

const isUtoidCoverMap = (projectName: string) => projectName === 'UTOI';

interface ProjectCoverCarouselProps {
  coverImage: string;
  projectName: string;
  swipeY?: number;
  /** 0 = pas assombri, 1 = panneau en haut (cover au maximum assombrie) */
  coverLiftProgress?: number;
  onClose?: () => void;
  onPreviousProject?: () => void;
  onNextProject?: () => void;
  onFullscreenOpen?: () => void;
  onFullscreenClose?: () => void;
  coverFullscreenActive?: boolean;
  /** Contrôlé par le parent (App) : la modal s'ouvre après le délai du glissement */
  isFullscreenModalOpen?: boolean;
  /** true : masque le bouton fermer de la cover (ex. dès qu’on scroll dans le projet) */
  hideCloseOnScroll?: boolean;
}

const ProjectCoverCarousel: React.FC<ProjectCoverCarouselProps> = ({
  coverImage,
  projectName,
  swipeY = 0,
  coverLiftProgress = 0,
  onClose,
  onPreviousProject,
  onNextProject,
  onFullscreenOpen,
  onFullscreenClose,
  coverFullscreenActive = false,
  isFullscreenModalOpen = false,
  hideCloseOnScroll = false,
}) => {
  const [fullscreenIndex, setFullscreenIndex] = useState(0);
  const [videoMuted, setVideoMuted] = useState(true);
  const coverVideoRef = useRef<HTMLVideoElement>(null);
  const fullscreenVideoRef = useRef<HTMLVideoElement>(null);

  const hasVideoExtension = (src: string) => /\.(mp4|webm|mov|avi|mkv)$/i.test(src);
  const isMpaudioProject = projectName === 'Mpaudio';
  const isVideoCover = hasVideoExtension(coverImage) || isMpaudioProject;

  // Carousel multi-slides (Playdago, etc.) — Mpaudio : une seule vidéo, pas de défilement
  const images = useMemo(() => {
    if (isMpaudioProject && isVideoCover) return [coverImage];
    return [coverImage, coverImage, coverImage];
  }, [coverImage, isMpaudioProject, isVideoCover]);

  const useSingleVideoCover = isMpaudioProject && isVideoCover;

  const toggleVideoMute = useCallback(() => {
    setVideoMuted((prev) => !prev);
  }, []);

  const syncSingleVideoPlayback = useCallback(() => {
    if (!useSingleVideoCover) return;

    const cover = coverVideoRef.current;
    const fs = fullscreenVideoRef.current;

    if (isFullscreenModalOpen) {
      const t = cover?.currentTime ?? 0;
      cover?.pause();
      if (cover) cover.muted = true;
      if (fs) {
        try {
          fs.currentTime = t;
        } catch {
          /* ignore seek errors before metadata */
        }
        void fs.play().catch(() => {});
      }
    } else {
      fs?.pause();
      const t = fs?.currentTime ?? cover?.currentTime ?? 0;
      if (cover) {
        try {
          cover.currentTime = t;
        } catch {
          /* ignore */
        }
        void cover.play().catch(() => {});
      }
    }
  }, [isFullscreenModalOpen, useSingleVideoCover]);

  /** Pause cover avant paint pour éviter une frame avec deux pistes audio. */
  useLayoutEffect(() => {
    syncSingleVideoPlayback();
  }, [syncSingleVideoPlayback]);

  useEffect(() => {
    if (!isFullscreenModalOpen || !useSingleVideoCover) return;
    const fs = fullscreenVideoRef.current;
    if (!fs) return;
    const onReady = () => syncSingleVideoPlayback();
    fs.addEventListener('loadeddata', onReady);
    return () => fs.removeEventListener('loadeddata', onReady);
  }, [isFullscreenModalOpen, useSingleVideoCover, syncSingleVideoPlayback]);

  useEffect(() => {
    if (!useSingleVideoCover) return;
    if (isFullscreenModalOpen) {
      if (fullscreenVideoRef.current) fullscreenVideoRef.current.muted = videoMuted;
      if (coverVideoRef.current) coverVideoRef.current.muted = true;
    } else if (coverVideoRef.current) {
      coverVideoRef.current.muted = videoMuted;
    }
  }, [videoMuted, isFullscreenModalOpen, useSingleVideoCover]);

  const openFullscreen = useCallback(() => {
    onFullscreenOpen?.();
  }, [onFullscreenOpen]);

  const closeFullscreen = useCallback(() => {
    setFullscreenIndex(0);
    onFullscreenClose?.();
  }, [onFullscreenClose]);

  useEffect(() => {
    if (!isFullscreenModalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeFullscreen();
      if (e.key === 'ArrowLeft') setFullscreenIndex((i) => (i <= 0 ? images.length - 1 : i - 1));
      if (e.key === 'ArrowRight') setFullscreenIndex((i) => (i >= images.length - 1 ? 0 : i + 1));
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isFullscreenModalOpen, images.length, closeFullscreen]);

  const goPrev = useCallback(() => {
    setFullscreenIndex((i) => (i <= 0 ? images.length - 1 : i - 1));
  }, [images.length]);
  const goNext = useCallback(() => {
    setFullscreenIndex((i) => (i >= images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  const showUtoidMap = isUtoidCoverMap(projectName);

  const coverVideoMuted = isFullscreenModalOpen ? true : videoMuted;

  useEffect(() => {
    if (!showUtoidMap) return;
    void loadUtoidCoverMap();
  }, [showUtoidMap]);

  return (
    <>
      <div 
        className={`project-cover-image-above${showUtoidMap ? ' project-cover-image-above--map' : ''}${coverFullscreenActive ? ' project-cover-fullscreen-expanded' : ''}`}
        style={{
          transform: `translateY(${swipeY}px)`,
          transition: swipeY === 0 ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' : 'none'
        }}
      >
        {!showUtoidMap ? (
          <div
            className="project-cover-dark-overlay"
            style={{
              opacity: coverLiftProgress * 0.5,
              transition: 'opacity 0.15s ease-out'
            }}
            aria-hidden
          />
        ) : null}
        {showUtoidMap ? (
          <div className="project-cover-map project-cover-map--utoi" aria-label="Carte du parcours Ultra terrestre 224">
            <div className="project-cover-map-bg" aria-hidden />
            <Suspense
              fallback={
                <div className="project-cover-map-fallback" aria-busy="true">
                  Chargement de la carte…
                </div>
              }
            >
              <UtoidCoverMap />
            </Suspense>
          </div>
        ) : useSingleVideoCover ? (
          <div className="project-cover-single-media">
            <video
              ref={coverVideoRef}
              src={coverImage}
              autoPlay
              loop
              muted={coverVideoMuted}
              playsInline
              className="project-cover-media"
              aria-label={`${projectName} — couverture`}
            />
          </div>
        ) : (
        <Swiper
        modules={images.length > 1 ? [Pagination, Autoplay] : [Pagination]}
        pagination={
          images.length > 1
            ? {
                clickable: true,
                bulletClass: 'swiper-pagination-bullet-round',
                bulletActiveClass: 'swiper-pagination-bullet-active-round',
              }
            : false
        }
        autoplay={
          images.length > 1
            ? { delay: 5000, disableOnInteraction: false }
            : false
        }
        loop={images.length > 1}
        className="project-cover-swiper"
      >
        {images.map((src, index) => {
          const isVideo = hasVideoExtension(src);
          
          return (
            <SwiperSlide key={index} className="project-cover-slide">
              {isVideo ? (
                <video 
                  src={src} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="project-cover-media"
                />
              ) : (
                <img 
                  src={src} 
                  alt={`${projectName} - Image ${index + 1}`}
                  className="project-cover-media"
                />
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
        )}
      </div>

      {!showUtoidMap ? (
      <div className="project-cover-fullscreen-trigger-layer">
        {useSingleVideoCover ? (
          <button
            type="button"
            className="project-cover-mute-btn"
            onClick={toggleVideoMute}
            aria-label={videoMuted ? 'Activer le son' : 'Couper le son'}
            aria-pressed={!videoMuted}
          >
            {videoMuted ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
          </button>
        ) : null}
        <button
          type="button"
          className="project-cover-fullscreen-btn"
          onClick={openFullscreen}
          aria-label="Agrandir l'image"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
          </svg>
        </button>
      </div>
      ) : null}

      {/* Couche boutons au premier plan (z-index 2001) pour rester cliquables au scroll */}
      <div className="project-cover-buttons-layer">
        {onClose && (
          <button
            type="button"
            className={`project-cover-close-btn${hideCloseOnScroll ? ' project-cover-close-btn--scroll-hidden' : ''}`}
            onClick={onClose}
            aria-label="Retour"
            aria-hidden={hideCloseOnScroll}
            tabIndex={hideCloseOnScroll ? -1 : undefined}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}
        {(onPreviousProject || onNextProject) && (
          <div className="project-cover-nav-buttons">
            {onPreviousProject && (
              <button
                type="button"
                className="project-cover-switch-btn"
                onClick={onPreviousProject}
                aria-label="Projet précédent"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}
            {onNextProject && (
              <button
                type="button"
                className="project-cover-switch-btn"
                onClick={onNextProject}
                aria-label="Projet suivant"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>

      {!showUtoidMap && isFullscreenModalOpen && (
        <div
          className="project-cover-fullscreen-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Image de couverture en grand"
          onClick={(e) => e.target === e.currentTarget && closeFullscreen()}
        >
          {/* Bouton fermer en bas à droite (même position que le bouton fullscreen) */}
          <button
            type="button"
            className="project-cover-fullscreen-close project-cover-fullscreen-close-bottom"
            onClick={closeFullscreen}
            aria-label="Fermer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          {images.length > 1 && (
            <button
              type="button"
              className="project-cover-fullscreen-arrow project-cover-fullscreen-arrow-prev"
              onClick={goPrev}
              aria-label="Image précédente"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}
          {useSingleVideoCover ? (
            <button
              type="button"
              className="project-cover-fullscreen-mute-btn"
              onClick={toggleVideoMute}
              aria-label={videoMuted ? 'Activer le son' : 'Couper le son'}
              aria-pressed={!videoMuted}
            >
              {videoMuted ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
            </button>
          ) : null}
          <div className="project-cover-fullscreen-slide">
            {hasVideoExtension(images[fullscreenIndex]) || isMpaudioProject ? (
              <video
                ref={fullscreenVideoRef}
                src={images[fullscreenIndex]}
                autoPlay
                loop
                muted={videoMuted}
                playsInline
                className="project-cover-fullscreen-media"
              />
            ) : (
              <img
                src={images[fullscreenIndex]}
                alt={`${projectName} - Image ${fullscreenIndex + 1}`}
                className="project-cover-fullscreen-media"
              />
            )}
          </div>
          {images.length > 1 && (
            <button
              type="button"
              className="project-cover-fullscreen-arrow project-cover-fullscreen-arrow-next"
              onClick={goNext}
              aria-label="Image suivante"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}
          {images.length > 1 && (
            <span className="project-cover-fullscreen-counter" aria-live="polite">
              {fullscreenIndex + 1} / {images.length}
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default ProjectCoverCarousel;
