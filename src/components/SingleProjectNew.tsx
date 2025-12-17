import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import './SingleProject.css';
import PedaboardWireframe from './PedaboardWireframe';
import { type ProjectData } from '../data/projectsNew';

// Import des icônes SVG
import searchIconBlue from '../assets/4610de4ae01e3b351bbcba9c930287159bbda981.svg'
import searchIconWhite from '../assets/90ec6f610076fb768a47e2428a1538d04533d860.svg'
import filterIconBlue from '../assets/bde286e6c3f17f2b7616efd3cb0505db16cb2c80.svg'
import filterIconWhite from '../assets/d64646fec8e22fb6cc43fff0865f1aed605ce1db.svg'
import expandIconBlue from '../assets/0663ecdf0b920b6cf763604a0f82d6820aa79455.svg'
import expandIconWhite from '../assets/fd72e19660aeb34b38d4c1d978e7c4eb2c18625d.svg'
import penIconBlue from '../assets/263f9c29cac74d7682e3473ce21888bd06efd26b.svg'
import penIconWhite from '../assets/ad0941a6384370c3132550cf8e7b080872bf8c70.svg'
import bellIconBlue from '../assets/098befb8181ea6bad4360e3d71f1968d62a269ab.svg'
import bellIconWhite from '../assets/c5bca19bef4558c083d96fdc742e2d8e9f4a9d4c.svg'
import dashboardIconBlue from '../assets/a7ca5d8579da186571215f0d46b524b056c90c10.svg'
import dashboardIconWhite from '../assets/96565d943652d5bf44ea725b8aa77fe03479a74a.svg'
import clientIconBlue from '../assets/5920fd75dd2c6e76db991a9b942e996b1c710f0e.svg'
import laboratoireIconBlue from '../assets/4cdaeeb22fdcbf2d5c03c0c40e4bfa84e3124cc1.svg'
import laboratoireIconWhite from '../assets/43ff308b7a1db138e79250570a476d75f810d253.svg'
import dashboardIconNewBlue from '../assets/b710cf10aac89b656f43227be944d998471a6343.svg'
import dashboardIconNewWhite from '../assets/2132bf0ef9c4bc9f146dda1255d5e7d49b16171f.svg'
import contactIconBlue from '../assets/6319879794d05613192a650b6c2fff239e7a7ad1.svg'
import contactIconWhite from '../assets/d98522e79f209b17064ab4de482c788242183e6c.svg'
import formationIconBlue from '../assets/44168eca3dd85916f934d8ab1b7b41967aff31f4.svg'
import formationIconWhite from '../assets/93d42323f5ac3dc5fadde5c92e8d5135e38d2981.svg'
import boutiqueIconBlue from '../assets/9dc5c3ec76d7852c81cd48b560b25b52336544c2.svg'
import boutiqueIconWhite from '../assets/3bea835efaa0ca18d639afff7d53d9069da477c0.svg'

interface SingleProjectProps {
  projectData: ProjectData;
  onBackClick: () => void;
  coverImage?: string | null;
  projectCategory?: string | null;
  onSwipeYChange?: (y: number) => void;
}

const SingleProjectNew: React.FC<SingleProjectProps> = ({ projectData, onBackClick, coverImage = null, projectCategory = null, onSwipeYChange }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  
  // Motion values pour le swipe down
  const y = useMotionValue(0);
  
  const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

  // Notifier le parent de la valeur initiale
  useEffect(() => {
    if (onSwipeYChange) {
      onSwipeYChange(0);
    }
  }, []); // Seulement au montage

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onBackClick();
    }, 400);
  };

  // Vérifier si on peut swiper (au début du scroll)
  const canSwipe = () => {
    const target = pageRef.current;
    if (!target) return false;
    return target.scrollTop <= 10;
  };

  // Gestion du drag avec logique exacte comme React Native (comportement Facebook)
  // Comme useAnimatedGestureHandler avec ctx.startY et event.translationY
  const [startY, setStartY] = useState<number | null>(null);
  const [startYValue, setStartYValue] = useState<number>(0); // ctx.startY
  const CLOSE_THRESHOLD = 100;

  const handleBarMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (canSwipe()) {
      setIsDragging(true);
      setStartY(e.clientY);
      setStartYValue(y.get()); // Sauvegarder la position Y actuelle (comme ctx.startY)
    }
  };

  const handleBarTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (canSwipe()) {
      setIsDragging(true);
      setStartY(e.touches[0].clientY);
      setStartYValue(y.get()); // Sauvegarder la position Y actuelle (comme ctx.startY)
    }
  };

  // Event listeners globaux pour suivre le mouvement en temps réel (comme PanGestureHandler)
  useEffect(() => {
    if (!isDragging || startY === null) return;

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      
      // Vérifier si on peut encore swiper
      const target = pageRef.current;
      if (target && target.scrollTop > 10) {
        y.set(0);
        return;
      }
      
      // Calculer la translation depuis le point de départ (comme event.translationY en RN)
      const translationY = e.clientY - startY;
      
      // Calculer la prochaine position Y (comme ctx.startY + event.translationY dans l'exemple RN)
      const nextY = startYValue + translationY;
      
      // Empêcher de monter au-dessus de 0 (comme Math.max(0, nextY) dans l'exemple RN)
      const newY = Math.max(0, nextY);
      y.set(newY);
      if (onSwipeYChange) {
        onSwipeYChange(newY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      
      // Vérifier si on peut encore swiper
      const target = pageRef.current;
      if (target && target.scrollTop > 10) {
        y.set(0);
        return;
      }
      
      // Calculer la translation depuis le point de départ (comme event.translationY en RN)
      const translationY = e.touches[0].clientY - startY;
      
      // Calculer la prochaine position Y (comme ctx.startY + event.translationY dans l'exemple RN)
      const nextY = startYValue + translationY;
      
      // Empêcher de monter au-dessus de 0 (comme Math.max(0, nextY) dans l'exemple RN)
      const newY = Math.max(0, nextY);
      y.set(newY);
      if (onSwipeYChange) {
        onSwipeYChange(newY);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      e.preventDefault();
      const currentY = y.get();
      
      setIsDragging(false);
      setStartY(null);
      setStartYValue(0);
      
      // onEnd : décider de fermer ou revenir (comme dans l'exemple RN)
      if (currentY > CLOSE_THRESHOLD) {
        // Fermer avec animation (comme withSpring(SCREEN_HEIGHT))
        y.set(screenHeight);
        setIsClosing(true);
        setTimeout(() => {
          onBackClick();
        }, 400);
      } else {
        // Revenir à 0 avec animation (comme withSpring(0))
        y.set(0);
        if (onSwipeYChange) {
          onSwipeYChange(0);
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      const currentY = y.get();
      
      setIsDragging(false);
      setStartY(null);
      setStartYValue(0);
      
      // onEnd : décider de fermer ou revenir (comme dans l'exemple RN)
      if (currentY > CLOSE_THRESHOLD) {
        // Fermer avec animation (comme withSpring(SCREEN_HEIGHT))
        y.set(screenHeight);
        setIsClosing(true);
        setTimeout(() => {
          onBackClick();
        }, 400);
      } else {
        // Revenir à 0 avec animation (comme withSpring(0))
        y.set(0);
        if (onSwipeYChange) {
          onSwipeYChange(0);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: false });
    window.addEventListener('mouseup', handleMouseUp, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, startY, startYValue, y, screenHeight]);

  // Notifier le parent des changements de y directement dans les handlers

  // Fonction pour calculer la couleur de texte selon le contraste
  const getTextColor = (backgroundColor: string) => {
    const hex = backgroundColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#ffffff';
  };

  return (
    <>
      <motion.div 
        ref={pageRef}
        className={`page active single-project-page ${isClosing ? 'closing' : ''} ${isDragging ? 'dragging' : ''}`}
        style={{
          y: y,
        }}
        animate={!isDragging ? {
          y: isClosing ? screenHeight : 0,
        } : undefined}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        {/* Barre de fermeture en haut */}
        <div 
          ref={barRef}
          className="swipe-indicator-bar"
          style={{ 
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
          onMouseDown={handleBarMouseDown}
          onTouchStart={handleBarTouchStart}
        >
          <div className="swipe-indicator-handle"></div>
        </div>
        
        <div className="main-single-project">

        {/* 1. Titre Principal avec badges */}
        <div className="project-header-section">
          <h1 className="project-main-title">{projectData.title}</h1>
          {projectData.subtitle && <p className="project-subtitle">{projectData.subtitle}</p>}
          <div className="project-badges">
            {projectCategory && <span className="project-badge">{projectCategory}</span>}
            {projectData.badges?.filter(badge => {
              // Filtrer les badges de type catégorie (Application, Site Web, etc.)
              const categoryBadges = ['Application', 'Site Web', 'Navigation', 'Logo', 'Motion', 'PLV']
              return !categoryBadges.includes(badge)
            }).map((badge, index) => (
              <span key={index} className="project-badge">{badge}</span>
            ))}
          </div>
        </div>

        {/* Image Hero */}
        <div className="project-hero-image">
          <img src={coverImage || projectData.image} alt={projectData.title} />
        </div>

        {/* 2. Résumé / Introduction */}
        <section className="project-section intro-section">
          <div className="section-card">
            <p className="intro-text">{projectData.summary}</p>
          </div>
        </section>

        {/* 3. L'équipe projet */}
        <section className="project-section team-section">
          <div className="section-card">
            <h2 className="section-title">L'équipe projet</h2>
            <div className="team-list">
              {projectData.team.map((member, index) => {
                // Séparer le nom et le poste
                let name, role;
                
                if (member.includes(',') && member.includes('(')) {
                  // Format: "Nom, Poste (détails)"
                  const parts = member.split(',');
                  name = parts[0].trim();
                  role = parts[1].trim();
                } else if (member.includes(',')) {
                  // Format: "Nom, Poste"
                  const parts = member.split(',');
                  name = parts[0].trim();
                  role = parts[1].trim();
                } else if (member.includes('(') && member.includes(')')) {
                  // Format: "Nom (poste)"
                  const openParen = member.indexOf('(');
                  name = member.substring(0, openParen).trim();
                  role = member.substring(openParen).trim();
                } else {
                  // Format: "Nom" seulement
                  name = member;
                  role = '';
                }
                
                 return (
                   <div key={index} className="team-member">
                     <div className="team-member-header">
                       <div className="team-member-name">{name}</div>
                       {role && <div className="team-member-role">{role}</div>}
                     </div>
                     <div className="team-member-image-section">
                       <div className="imguser">
                         <img 
                           src="/images/portrait-anthony.jpg" 
                           alt="Anthony Merault"
                           className="team-member-image"
                         />
                       </div>
                     </div>
                     <div className="team-member-contact">
                       <a 
                         href="https://www.instagram.com/meraultony" 
                         className="team-member-contact-link"
                         target="_blank"
                         rel="noopener noreferrer"
                       >
                         @meraultony
                       </a>
                     </div>
                   </div>
                 );
              })}
            </div>
          </div>
        </section>

        {/* 4. Métadonnées projet (Année, Durée, Type) */}
        <section className="project-section metadata-section">
          <div className="metadata-bubbles">
            <div className="metadata-bubble">
              <span className="metadata-label">Année</span>
              <span className="metadata-value">{projectData.year}</span>
            </div>
            <div className="metadata-bubble">
              <span className="metadata-label">Durée</span>
              <span className="metadata-value">{projectData.duration}</span>
            </div>
            <div className="metadata-bubble">
              <span className="metadata-label">Type</span>
              <span className="metadata-value">{projectData.type}</span>
            </div>
          </div>
        </section>

        {/* 5. Contexte & Démarche */}
        <section className="project-section context-approach-section">
          <div className="context-approach-container">
            {/* Contexte & Problématique */}
            <div className="section-card">
              <h2 className="section-title">{projectData.context.title}</h2>
              <p className="section-content">{projectData.context.content}</p>
            </div>

            {/* Démarche & Approche */}
            <div className="section-card">
              <h2 className="section-title">{projectData.approach.title}</h2>
              <div className="approach-items-container">
                {projectData.approach.sections.map((section, index) => (
                  <div key={index} className="approach-item">
                    <h3 className="approach-subtitle">{section.subtitle}</h3>
                    <p className="approach-content">{section.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* 7. Wireframes & Maquettes */}
        {projectData.wireframes && (
          <section className="project-section wireframes-section">
            <h2 className="section-title">{projectData.wireframes.title}</h2>
            
            {/* Bloc de texte descriptif */}
            <div className="wireframe-intro-text">
              <p>
                Les wireframes ci-dessous présentent l'architecture de l'interface et les principaux parcours utilisateur. 
                Chaque élément est interactif : cliquez sur les différentes zones pour découvrir leur fonction et leur rôle dans l'expérience globale.
              </p>
              <p className="wireframe-additional-text">
                Cette maquette interactive permet de comprendre l'organisation visuelle, la hiérarchie de l'information et les différents points d'interaction proposés aux utilisateurs. 
                Chaque section a été pensée pour optimiser l'expérience et faciliter la navigation au quotidien.
              </p>
            </div>
            
            {/* Afficher le composant Figma pour Pedaboard */}
            {projectData.title === 'Pedaboard' ? (
              <PedaboardWireframe />
            ) : (
              projectData.wireframes.items.map((item, index) => (
                <div key={index} className="wireframe-item">
                  <div className="wireframe-image">
                    <img src={item.image} alt={`Wireframe ${index + 1}`} />
                  </div>
                  <p className="wireframe-description">{item.description}</p>
                </div>
              ))
            )}
          </section>
        )}

        {/* 5.5 Galerie */}
        <section className="project-section gallery-section">
          <h2 className="section-title">Galerie</h2>
          <div className="bento-gallery">
            <div className="bento-item bento-large">
              <img src="/images/261061ca92433cd63b52fe7f2093041e9d831bbc.png" alt="Galerie 1" />
            </div>
            <div className="bento-item bento-tall">
              <img src="/images/cd378b6bd18decd8192d9ac3264c5e76c9ad6186.png" alt="Galerie 2" />
            </div>
            <div className="bento-item bento-wide">
              <img src="/images/25c86067ea3b2084f730bb1f906759081bc20fac.png" alt="Galerie 3" />
            </div>
            <div className="bento-item">
              <img src="/images/8cbd7b5155c0b3df21ecc2703b145f2d393e07a0.png" alt="Galerie 4" />
            </div>
            <div className="bento-item">
              <img src="/images/8cc5f68c1c8fa66e1ddab4fe1075e9d19645f9d4.png" alt="Galerie 5" />
            </div>
            <div className="bento-item bento-wide">
              <img src="/images/f27446bbc5c96f74d44074bc97b9be64f7cdf4cf.png" alt="Galerie 6" />
            </div>
          </div>
        </section>

        {/* 7. Design System - Palette colorimétrique */}
        <section className="project-section design-system-section">
          <div className="color-palette-section">
            <h2>{projectData.designSystem.colorPalette.title}</h2>
            <p>{projectData.designSystem.colorPalette.description}</p>
            
            {/* Neutrals */}
            <div className="color-category">
              <h3>{projectData.designSystem.colorPalette.categories.neutrals.title}</h3>
              <div className="table-wrapper">
                <table className="color-table">
                  <thead>
                    <tr>
                      <th>Rôle</th>
                      <th>Nom Figma (token)</th>
                      <th>Couleur</th>
                      <th>Utilisation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectData.designSystem.colorPalette.categories.neutrals.colors.map((color, index) => (
                      <tr key={index}>
                        <td>{color.role}</td>
                        <td>{color.token}</td>
                        <td>
                          <div className="color-preview" style={{ backgroundColor: color.color }}>
                            <span style={{ color: getTextColor(color.color) }}>{color.color}</span>
                          </div>
                        </td>
                        <td>{color.usage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Primary */}
            <div className="color-category">
              <h3>{projectData.designSystem.colorPalette.categories.primary.title}</h3>
              <div className="table-wrapper">
                <table className="color-table">
                  <thead>
                    <tr>
                      <th>Rôle</th>
                      <th>Nom Figma (token)</th>
                      <th>Couleur</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectData.designSystem.colorPalette.categories.primary.colors.map((color, index) => (
                      <tr key={index}>
                        <td>{color.role}</td>
                        <td>{color.token}</td>
                        <td>
                          <div className="color-preview" style={{ backgroundColor: color.color }}>
                            <span style={{ color: getTextColor(color.color) }}>{color.color}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Secondary */}
            <div className="color-category">
              <h3>{projectData.designSystem.colorPalette.categories.secondary.title}</h3>
              <div className="table-wrapper">
                <table className="color-table">
                  <thead>
                    <tr>
                      <th>Rôle</th>
                      <th>Nom Figma (token)</th>
                      <th>Couleur</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectData.designSystem.colorPalette.categories.secondary.colors.map((color, index) => (
                      <tr key={index}>
                        <td>{color.role}</td>
                        <td>{color.token}</td>
                        <td>
                          <div className="color-preview" style={{ backgroundColor: color.color }}>
                            <span style={{ color: getTextColor(color.color) }}>{color.color}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Accent */}
            <div className="color-category">
              <h3>{projectData.designSystem.colorPalette.categories.accent.title}</h3>
              <div className="table-wrapper">
                <table className="color-table">
                  <thead>
                    <tr>
                      <th>Rôle</th>
                      <th>Nom Figma (token)</th>
                      <th>Couleur</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectData.designSystem.colorPalette.categories.accent.colors.map((color, index) => (
                      <tr key={index}>
                        <td>{color.role}</td>
                        <td>{color.token}</td>
                        <td>
                          <div className="color-preview" style={{ backgroundColor: color.color }}>
                            <span style={{ color: getTextColor(color.color) }}>{color.color}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Error */}
            <div className="color-category">
              <h3>{projectData.designSystem.colorPalette.categories.error.title}</h3>
              <div className="table-wrapper">
                <table className="color-table">
                  <thead>
                    <tr>
                      <th>Rôle</th>
                      <th>Nom Figma (token)</th>
                      <th>Couleur</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectData.designSystem.colorPalette.categories.error.colors.map((color, index) => (
                      <tr key={index}>
                        <td>{color.role}</td>
                        <td>{color.token}</td>
                        <td>
                          <div className="color-preview" style={{ backgroundColor: color.color }}>
                            <span style={{ color: getTextColor(color.color) }}>{color.color}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Design System - Typographie */}
        <section className="project-section typography-section">
          <h2>{projectData.designSystem.typography.title}</h2>
          <p>{projectData.designSystem.typography.description}</p>
          
          <div className="table-wrapper">
            <table className="typography-table">
              <thead>
                <tr>
                  <th>Style</th>
                  <th>typographie</th>
                  <th>exemple</th>
                  <th>taille px</th>
                  <th>Interlignage</th>
                </tr>
              </thead>
              <tbody>
                {projectData.designSystem.typography.items.map((type, index) => (
                  <tr key={index}>
                    <td>{type.style}</td>
                    <td>{type.font}</td>
                    <td className="typography-example" style={{ 
                      fontSize: type.size + 'px',
                      fontFamily: type.font.includes('Inter') ? 'Inter, sans-serif' : 'inherit'
                    }}>
                      Hello {projectData.title}
                    </td>
                    <td>{type.size}</td>
                    <td>{type.lineHeight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 9. Composants - Starter Pack */}
        <section className="project-section components-section">
          <div className="section-card">
            <div className="components-header">
              <h2 className="components-title">Composants</h2>
            </div>
            <div className="components-content">
              <div className="h-[362px] shrink-0 w-full flex flex-wrap gap-4">
                
                {/* Groupe Search */}
                <div className="flex flex-col gap-2">
                
                  {/* Search (loupe) blanc */}
                  <div className="bg-white box-border content-stretch flex gap-[10px] items-center justify-end p-[12px] relative rounded-[100px] shrink-0 w-[44px] h-[44px]">
                    <div className="relative shrink-0 size-[20px]">
                      <div className="absolute contents inset-[8.33%_8.31%_8.31%_8.33%]">
                        <div className="absolute inset-[8.33%_8.31%_8.31%_8.33%]">
                          <img alt="Icône de recherche" className="block max-w-none size-full" src={searchIconBlue} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Search (loupe) orange */}
                  <div className="bg-[#f07f00] box-border content-stretch flex gap-[10px] items-center justify-center p-[12px] relative rounded-[100px] shrink-0 w-[44px] h-[44px]">
                    <div className="relative shrink-0 size-[20px]">
                      <div className="absolute contents inset-[8.33%_8.31%_8.31%_8.33%]">
                        <div className="absolute inset-[8.33%_8.31%_8.31%_8.33%]">
                          <img alt="Icône de recherche" className="block max-w-none size-full" src={searchIconWhite} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Groupe Dashboard */}
                <div className="flex flex-col gap-2">

                  {/* Dashboard blanc */}
                  <div className="bg-white box-border content-stretch flex gap-[8px] h-[44px] items-center justify-center px-[16px] py-0 relative rounded-[32px] shrink-0">
                    <div className="relative shrink-0 size-[32px]">
                      <div className="absolute contents inset-[8.333%]">
                        <div className="absolute inset-[8.333%]">
                          <img alt="Icône tableau de bord" className="block max-w-none size-full" src={dashboardIconNewBlue} />
                        </div>
                      </div>
                    </div>
                    <p className="font-['Satoshi:Bold',_sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#007d9f] text-[16px] text-nowrap tracking-[2.08px] uppercase whitespace-pre">Dashboard</p>
                  </div>

                  {/* Dashboard orange */}
                  <div className="bg-[#f07f00] box-border content-stretch flex gap-[8px] h-[44px] items-center justify-center px-[16px] py-0 relative rounded-[32px] shrink-0">
                    <div className="relative shrink-0 size-[32px]">
                      <div className="absolute contents inset-[8.333%]">
                        <div className="absolute inset-[8.333%]">
                          <img alt="Icône tableau de bord" className="block max-w-none size-full" src={dashboardIconNewWhite} />
                        </div>
                      </div>
                    </div>
                    <p className="font-['Satoshi:Bold',_sans-serif] leading-[1.5] not-italic relative shrink-0 text-[16px] text-nowrap text-white tracking-[2.08px] uppercase whitespace-pre">Dashboard</p>
                  </div>
                </div>

                {/* Groupe Client */}
                <div className="flex flex-col gap-2">
                  {/* Client blanc */}
                  <div className="bg-white box-border content-stretch flex gap-[8px] h-[44px] items-center justify-center px-[16px] py-0 relative rounded-[32px] shrink-0">
                    <div className="relative shrink-0 size-[32px]">
                      <div className="absolute contents inset-[8.333%]">
                        <div className="absolute inset-[8.333%]">
                          <img alt="Icône tableau de bord" className="block max-w-none size-full" src={dashboardIconWhite} />
                        </div>
                      </div>
                    </div>
                    <p className="font-bold text-[#007d9f] text-[16px] tracking-[2.08px] uppercase">Client</p>
                  </div>

                  {/* Client orange */}
                  <div className="bg-[#f07f00] box-border content-stretch flex gap-[8px] h-[44px] items-center justify-center px-[16px] py-0 relative rounded-[32px] shrink-0">
                    <div className="relative shrink-0 size-[32px]">
                      <div className="absolute contents inset-[8.333%]">
                        <div className="absolute inset-[8.333%]">
                          <img alt="Icône tableau de bord" className="block max-w-none size-full" src={dashboardIconBlue} />
                        </div>
                      </div>
                    </div>
                    <p className="font-bold text-white text-[16px] tracking-[2.08px] uppercase">Client</p>
                  </div>

                  {/* Client bleu */}
                  <div className="bg-[#007d9f] box-border content-stretch flex gap-[8px] h-[44px] items-center justify-center px-[16px] py-0 relative rounded-[32px] shrink-0">
                    <div className="relative shrink-0 size-[32px]">
                      <div className="absolute contents inset-[8.333%]">
                        <div className="absolute inset-[8.333%]">
                          <img alt="Icône client" className="block max-w-none size-full" src={clientIconBlue} />
                        </div>
                      </div>
                    </div>
                    <p className="font-bold text-white text-[16px] tracking-[2.08px] uppercase">Client</p>
                  </div>
                </div>

                {/* Groupe Filter */}
                <div className="flex flex-col gap-2">
                  {/* Filter (filtre) blanc */}
                  <div className="bg-white box-border content-stretch flex gap-[10px] items-center justify-end p-[12px] relative rounded-[100px] shrink-0 w-[44px] h-[44px]">
                    <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
                      <div className="flex-none rotate-[270deg]">
                        <div className="relative size-[24px]">
                          <div className="absolute contents inset-[8.333%]">
                            <div className="absolute inset-[8.333%]">
                              <img alt="Icône filtre" className="block max-w-none size-full" src={filterIconWhite} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Filter (filtre) orange */}
                  <div className="bg-[#f07f00] box-border content-stretch flex gap-[10px] items-center justify-center p-[12px] relative rounded-[100px] shrink-0 w-[44px] h-[44px]">
                    <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
                      <div className="flex-none rotate-[270deg]">
                        <div className="relative size-[24px]">
                          <div className="absolute contents inset-[8.333%]">
                            <div className="absolute inset-[8.333%]">
                              <img alt="Icône filtre" className="block max-w-none size-full" src={filterIconBlue} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Groupe Expand */}
                <div className="flex flex-col gap-2">
                  {/* Expand (flèche) blanc */}
                  <div className="bg-white box-border content-stretch flex gap-[10px] items-center justify-end p-[12px] relative rounded-[100px] shrink-0 w-[44px] h-[44px]">
                    <div className="flex h-[calc(1px*((var(--transform-inner-width)*0.7071067690849304)+(var(--transform-inner-height)*0.7071067690849304)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*0.7071067690849304)+(var(--transform-inner-width)*0.7071067690849304)))]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
                      <div className="flex-none rotate-[315deg]">
                        <div className="h-[16px] relative w-[14px]">
                          <img alt="Icône expansion" className="block max-w-none size-full" src={expandIconWhite} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expand (flèche) orange */}
                  <div className="bg-[#f07f00] box-border content-stretch flex gap-[10px] items-center justify-center p-[12px] relative rounded-[100px] shrink-0 w-[44px] h-[44px]">
                    <div className="flex h-[calc(1px*((var(--transform-inner-width)*0.7071067690849304)+(var(--transform-inner-height)*0.7071067690849304)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*0.7071067690849304)+(var(--transform-inner-width)*0.7071067690849304)))]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
                      <div className="flex-none rotate-[315deg]">
                        <div className="h-[16px] relative w-[14px]">
                          <img alt="Icône expansion" className="block max-w-none size-full" src={expandIconBlue} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Groupe Pen */}
                <div className="flex flex-col gap-2">
                  {/* Pen-to-square (stylo) blanc */}
                  <div className="bg-white box-border content-stretch flex gap-[10px] items-center justify-end p-[12px] relative rounded-[100px] shrink-0 w-[44px] h-[44px]">
                    <div className="relative shrink-0 size-[20px]">
                      <img alt="Icône stylo" className="block max-w-none size-full" src={penIconWhite} />
                    </div>
                  </div>

                  {/* Pen-to-square (stylo) orange */}
                  <div className="bg-[#f07f00] box-border content-stretch flex gap-[10px] items-center justify-center p-[12px] relative rounded-[100px] shrink-0 w-[44px] h-[44px]">
                    <div className="relative shrink-0 size-[20px]">
                      <img alt="Icône stylo" className="block max-w-none size-full" src={penIconBlue} />
                    </div>
                  </div>
                </div>

                {/* Groupe Bell */}
                <div className="flex flex-col gap-2">
                  {/* Bell (cloche) blanc */}
                  <div className="bg-white box-border content-stretch flex gap-[10px] items-center justify-end p-[12px] relative rounded-[100px] shrink-0 w-[44px] h-[44px]">
                    <div className="h-[28px] relative shrink-0 w-[24px]">
                      <img alt="Icône notification" className="block max-w-none size-full" src={bellIconWhite} />
                    </div>
                  </div>

                  {/* Bell (cloche) orange */}
                  <div className="bg-[#f07f00] box-border content-stretch flex gap-[10px] items-center justify-center p-[12px] relative rounded-[100px] shrink-0 w-[44px] h-[44px]">
                    <div className="h-[28px] relative shrink-0 w-[24px]">
                      <img alt="Icône notification" className="block max-w-none size-full" src={bellIconBlue} />
                    </div>
                  </div>
                </div>

                {/* Groupe Contact */}
                <div className="flex flex-col gap-2">
                  {/* Contact blanc */}
                  <div className="bg-white box-border content-stretch flex gap-[8px] h-[44px] items-center justify-center px-[16px] py-0 relative rounded-[32px] shrink-0">
                    <div className="relative shrink-0 size-[32px]">
                      <div className="absolute contents inset-[8.333%]">
                        <div className="absolute inset-[8.333%]">
                          <img alt="Icône contact" className="block max-w-none size-full" src={contactIconBlue} />
                        </div>
                      </div>
                    </div>
                    <p className="font-['Satoshi:Bold',_sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#007d9f] text-[16px] text-nowrap tracking-[2.08px] uppercase whitespace-pre">Contact</p>
                  </div>

                  {/* Contact orange */}
                  <div className="bg-[#f07f00] box-border content-stretch flex gap-[8px] h-[44px] items-center justify-center px-[16px] py-0 relative rounded-[32px] shrink-0">
                    <div className="relative shrink-0 size-[32px]">
                      <div className="absolute contents inset-[8.333%]">
                        <div className="absolute inset-[8.333%]">
                          <img alt="Icône contact" className="block max-w-none size-full" src={contactIconWhite} />
                        </div>
                      </div>
                    </div>
                    <p className="font-['Satoshi:Bold',_sans-serif] leading-[1.5] not-italic relative shrink-0 text-[16px] text-nowrap text-white tracking-[2.08px] uppercase whitespace-pre">Contact</p>
                  </div>
                </div>

                {/* Groupe Formation */}
                <div className="flex flex-col gap-2">
                  {/* Formation blanc */}
                  <div className="bg-white box-border content-stretch flex gap-[8px] h-[44px] items-center justify-center px-[16px] py-0 relative rounded-[32px] shrink-0">
                    <div className="relative shrink-0 size-[32px]">
                      <div className="absolute contents inset-[8.333%]">
                        <div className="absolute inset-[8.333%]">
                          <img alt="Icône formation" className="block max-w-none size-full" src={formationIconBlue} />
                        </div>
                      </div>
                    </div>
                    <p className="font-['Satoshi:Bold',_sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#007d9f] text-[16px] text-nowrap tracking-[2.08px] uppercase whitespace-pre">Formation</p>
                  </div>

                  {/* Formation orange */}
                  <div className="bg-[#f07f00] box-border content-stretch flex gap-[8px] h-[44px] items-center justify-center px-[16px] py-0 relative rounded-[32px] shrink-0">
                    <div className="relative shrink-0 size-[32px]">
                      <div className="absolute contents inset-[8.333%]">
                        <div className="absolute inset-[8.333%]">
                          <img alt="Icône formation" className="block max-w-none size-full" src={formationIconWhite} />
                        </div>
                      </div>
                    </div>
                    <p className="font-['Satoshi:Bold',_sans-serif] leading-[1.5] not-italic relative shrink-0 text-[16px] text-nowrap text-white tracking-[2.08px] uppercase whitespace-pre">Formation</p>
                  </div>
                </div>

                {/* Groupe Boutique */}
                <div className="flex flex-col gap-2">
                  {/* Boutique blanc */}
                  <div className="bg-white box-border content-stretch flex gap-[8px] h-[44px] items-center justify-center px-[16px] py-0 relative rounded-[32px] shrink-0">
                    <div className="relative shrink-0 size-[32px]">
                      <div className="absolute contents inset-[8.333%]">
                        <div className="absolute inset-[8.333%]">
                          <img alt="Icône boutique" className="block max-w-none size-full" src={boutiqueIconBlue} />
                        </div>
                      </div>
                    </div>
                    <p className="font-['Satoshi:Bold',_sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#007d9f] text-[16px] text-nowrap tracking-[2.08px] uppercase whitespace-pre">Boutique</p>
                  </div>

                  {/* Boutique orange */}
                  <div className="bg-[#f07f00] box-border content-stretch flex gap-[8px] h-[44px] items-center justify-center px-[16px] py-0 relative rounded-[32px] shrink-0">
                    <div className="relative shrink-0 size-[32px]">
                      <div className="absolute contents inset-[8.333%]">
                        <div className="absolute inset-[8.333%]">
                          <img alt="Icône boutique" className="block max-w-none size-full" src={boutiqueIconWhite} />
                        </div>
                      </div>
                    </div>
                    <p className="font-['Satoshi:Bold',_sans-serif] leading-[1.5] not-italic relative shrink-0 text-[16px] text-nowrap text-white tracking-[2.08px] uppercase whitespace-pre">Boutique</p>
                  </div>
                </div>

                {/* Groupe Laboratoire */}
                <div className="flex flex-col gap-2">
                  {/* Laboratoire blanc */}
                  <div className="bg-white box-border content-stretch flex gap-[8px] h-[44px] items-center justify-center px-[16px] py-0 relative rounded-[32px] shrink-0">
                    <div className="relative shrink-0 size-[32px]">
                      <div className="absolute contents inset-[8.333%]">
                        <div className="absolute inset-[8.333%]">
                          <img alt="Icône laboratoire" className="block max-w-none size-full" src={laboratoireIconBlue} />
                        </div>
                      </div>
                    </div>
                    <p className="font-['Satoshi:Bold',_sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#007d9f] text-[16px] text-nowrap tracking-[2.08px] uppercase whitespace-pre">Laboratoire</p>
                  </div>

                  {/* Laboratoire orange */}
                  <div className="bg-[#f07f00] box-border content-stretch flex gap-[8px] h-[44px] items-center justify-center px-[16px] py-0 relative rounded-[32px] shrink-0">
                    <div className="relative shrink-0 size-[32px]">
                      <div className="absolute contents inset-[8.333%]">
                        <div className="absolute inset-[8.333%]">
                          <img alt="Icône laboratoire" className="block max-w-none size-full" src={laboratoireIconWhite} />
                        </div>
                      </div>
                    </div>
                    <p className="font-['Satoshi:Bold',_sans-serif] leading-[1.5] not-italic relative shrink-0 text-[16px] text-nowrap text-white tracking-[2.08px] uppercase whitespace-pre">Laboratoire</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. Implémentation & Technologies */}
        {projectData.implementation && (
          <section className="project-section implementation-section">
            <div className="section-card">
              <h2 className="section-title">Implémentation & Technologies</h2>
              <div className="section-content">
                <div className="tech-stack">
                  {projectData.implementation.technologies.map((tech, index) => (
                    <span key={index} className="tech-badge">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 11. Résultats & Impact */}
        {projectData.results && (
          <section className="project-section results-section">
            <div className="section-card">
              <h2 className="section-title">Résultats & Impact</h2>
              <div className="section-content">
                {projectData.results.metrics && (
                  <div className="results-grid">
                    {projectData.results.metrics.map((metric, index) => (
                      <div key={index} className="result-item">
                        <div className="result-metric">
                          <span className="result-number">{metric.value}</span>
                          <span className="result-unit">{metric.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
        </div>
      </motion.div>
    </>
  );
};

export default SingleProjectNew;
