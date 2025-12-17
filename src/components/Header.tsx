import { useState, useEffect } from 'react'
import Button from './Button'
import GradientText from './GradientText'
import MagicBento from './MagicBento'
import './Header.css'

interface HeaderProps {
  onMenuClick: () => void
  onContactClick: () => void
  onLogoClick: () => void
  currentPage: string
  onSearchChange?: (searchTerm: string) => void
}

const Header = ({ onMenuClick, onContactClick, onLogoClick, currentPage, onSearchChange }: HeaderProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true)
  const [prediction, setPrediction] = useState('')
  const [showPrediction, setShowPrediction] = useState(false)
  
  const placeholders = [
    'Recherche le nom d\'un projet',
    'Recherche par type',
    'Recherche par année'
  ]

  const allSuggestions = [
    'Playdago', 'Pedaboard', 'Ghadeer market', 'Open challenge',
    'Utoi', 'Agua benta', 'Anset assurance', 'My spir',
    'Mp audio', 'Sublim', 'Mémoire Kartier Titan', 'Pub tv Sublim',
    'Run Alim', 'Application', 'Site web', 'Logo', 'Motion', 'Plv',
    '2024', '2023', '2022', '2021'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      // Faire disparaître le placeholder
      setIsPlaceholderVisible(false)
      
      // Après la transition, changer le texte et le faire réapparaître
      setTimeout(() => {
        setPlaceholderIndex((prev) => (prev + 1) % placeholders.length)
        setIsPlaceholderVisible(true)
      }, 400) // La moitié de la durée de transition
    }, 3000) // Change toutes les 3 secondes

    return () => clearInterval(interval)
  }, [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    
    // Trouver une prédiction
    if (value.length > 0) {
      const foundSuggestion = allSuggestions.find(suggestion =>
        suggestion.toLowerCase().startsWith(value.toLowerCase())
      )
      if (foundSuggestion && foundSuggestion !== value) {
        setPrediction(foundSuggestion)
        setShowPrediction(true)
      } else {
        setPrediction('')
        setShowPrediction(false)
      }
    } else {
      setPrediction('')
      setShowPrediction(false)
    }
    
    if (onSearchChange) {
      onSearchChange(value)
    }
  }

  const handleClearSearch = () => {
    setSearchTerm('')
    setPrediction('')
    setShowPrediction(false)
    if (onSearchChange) {
      onSearchChange('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab' && showPrediction && prediction) {
      e.preventDefault()
      setSearchTerm(prediction)
      setShowPrediction(false)
      if (onSearchChange) {
        onSearchChange(prediction)
      }
    }
  }

  return (
    <>
      <header className="header">
        <div className="header-content">
          <button className="logo-section" onClick={onLogoClick} aria-label="Retour à l'accueil">
            <div className="logo">
              <img
                src="/images/logo.svg"
                alt="Logo"
                style={{ width: '85%', height: '85%', objectFit: 'contain', objectPosition: 'center center' }}
              />
            </div>
            <div className="logo-text">
              <h1>Anthony Merault</h1>
              <p>Product designer & director artistic</p>
            </div>
          </button>
          {currentPage === 'menu' && (
            <div className="header-center">
              <MagicBento className="search-bar">
              <svg width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M10.5 4.5C8.9087 4.5 7.38258 5.13214 6.25736 6.25736C5.13214 7.38258 4.5 8.9087 4.5 10.5C4.5 11.2879 4.65519 12.0681 4.95672 12.7961C5.25825 13.5241 5.70021 14.1855 6.25736 14.7426C6.81451 15.2998 7.47595 15.7417 8.2039 16.0433C8.93185 16.3448 9.71207 16.5 10.5 16.5C11.2879 16.5 12.0681 16.3448 12.7961 16.0433C13.5241 15.7417 14.1855 15.2998 14.7426 14.7426C15.2998 14.1855 15.7417 13.5241 16.0433 12.7961C16.3448 12.0681 16.5 11.2879 16.5 10.5C16.5 8.9087 15.8679 7.38258 14.7426 6.25736C13.6174 5.13214 12.0913 4.5 10.5 4.5ZM4.84315 4.84315C6.34344 3.34285 8.37827 2.5 10.5 2.5C12.6217 2.5 14.6566 3.34285 16.1569 4.84315C17.6571 6.34344 18.5 8.37827 18.5 10.5C18.5 11.5506 18.2931 12.5909 17.891 13.5615C17.6172 14.2226 17.2565 14.8425 16.8196 15.4054L22.2071 20.7929C22.5976 21.1834 22.5976 21.8166 22.2071 22.2071C21.8166 22.5976 21.1834 22.5976 20.7929 22.2071L15.4054 16.8196C14.8425 17.2565 14.2226 17.6172 13.5615 17.891C12.5909 18.2931 11.5506 18.5 10.5 18.5C9.44943 18.5 8.40914 18.2931 7.43853 17.891C6.46793 17.489 5.58601 16.8997 4.84315 16.1569C4.10028 15.414 3.511 14.5321 3.10896 13.5615C2.70693 12.5909 2.5 11.5506 2.5 10.5C2.5 8.37827 3.34285 6.34344 4.84315 4.84315Z" fill="white"/>
              </svg>
                  <div className="search-input-container">
                    {!searchTerm && (
                      <div className={`search-placeholder ${isPlaceholderVisible ? 'visible' : 'hidden'}`}>
                        {placeholders[placeholderIndex]}
                      </div>
                    )}
                    <div className="input-wrapper">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyDown}
                        className="search-input"
                      />
                      {showPrediction && prediction && (
                        <div className="prediction-text">
                          {searchTerm}
                          <GradientText className="prediction-suggestion">
                            {prediction.substring(searchTerm.length)}
                          </GradientText>
                        </div>
                      )}
                      {searchTerm && (
                        <button
                          className="clear-button"
                          onClick={handleClearSearch}
                          type="button"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
              </MagicBento>
            </div>
          )}
          <div className="header-actions">
            <Button variant="secondary" onClick={onContactClick} className="hidden-contact-btn">Contact</Button>
            <Button variant="secondary" icon={true} onClick={onMenuClick}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M8 2C8.55228 2 9 2.44772 9 3V6C9 6.79565 8.68393 7.55871 8.12132 8.12132C7.55871 8.68393 6.79565 9 6 9H3C2.44772 9 2 8.55228 2 8C2 7.44772 2.44772 7 3 7H6C6.26522 7 6.51957 6.89464 6.70711 6.70711C6.89464 6.51957 7 6.26522 7 6V3C7 2.44772 7.44772 2 8 2ZM16 2C16.5523 2 17 2.44772 17 3V6C17 6.26522 17.1054 6.51957 17.2929 6.70711C17.4804 6.89464 17.7348 7 18 7H21C21.5523 7 22 7.44772 22 8C22 8.55228 21.5523 9 21 9H18C17.2044 9 16.4413 8.68393 15.8787 8.12132C15.3161 7.55871 15 6.79565 15 6V3C15 2.44772 15.4477 2 16 2ZM2 16C2 15.4477 2.44772 15 3 15H6C6.79565 15 7.55871 15.3161 8.12132 15.8787C8.68393 16.4413 9 17.2044 9 18V21C9 21.5523 8.55228 22 8 22C7.44772 22 7 21.5523 7 21V18C7 17.7348 6.89464 17.4804 6.70711 17.2929C6.51957 17.1054 6.26522 17 6 17H3C2.44772 17 2 16.5523 2 16ZM18 17C17.7348 17 17.4804 17.1054 17.2929 17.2929C17.1054 17.4804 17 17.7348 17 18V21C17 21.5523 16.5523 22 16 22C15.4477 22 15 21.5523 15 21V18C15 17.2043 15.3161 16.4413 15.8787 15.8787C16.4413 15.3161 17.2043 15 18 15H21C21.5523 15 22 15.4477 22 16C22 16.5523 21.5523 17 21 17H18Z" fill="white"/>
              </svg>
            </Button>
          </div>
        </div>
        
      </header>

    </>
  )
}

export default Header
