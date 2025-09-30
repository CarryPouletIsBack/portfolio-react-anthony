import { useState, useEffect } from 'react'
import Button from './Button'
import ShinyText from './ShinyText'
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
          <div className="logo-section" onClick={onLogoClick} style={{cursor: 'pointer'}}>
            <div className="logo">
              <img src="/images/pp-anthony.jpg" alt="Anthony Merault" style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', borderRadius: '50%'}} />
            </div>
            <div className="logo-text">
              <h1>Anthony Merault</h1>
              <p>Product designer & director artistic</p>
            </div>
          </div>
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
            <Button variant="secondary" onClick={onContactClick}>Contact</Button>
            <Button variant="secondary" icon={true} onClick={onMenuClick}>
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M8 2.5C8.55228 2.5 9 2.94772 9 3.5V6.5C9 7.29565 8.68393 8.05871 8.12132 8.62132C7.55871 9.18393 6.79565 9.5 6 9.5H3C2.44772 9.5 2 9.05228 2 8.5C2 7.94772 2.44772 7.5 3 7.5H6C6.26522 7.5 6.51957 7.39464 6.70711 7.20711C6.89464 7.01957 7 6.76522 7 6.5V3.5C7 2.94772 7.44772 2.5 8 2.5ZM16 2.5C16.5523 2.5 17 2.94772 17 3.5V6.5C17 6.76522 17.1054 7.01957 17.2929 7.20711C17.4804 7.39464 17.7348 7.5 18 7.5H21C21.5523 7.5 22 7.94772 22 8.5C22 9.05228 21.5523 9.5 21 9.5H18C17.2044 9.5 16.4413 9.18393 15.8787 8.62132C15.3161 8.05871 15 7.29565 15 6.5V3.5C15 2.94772 15.4477 2.5 16 2.5ZM2 16.5C2 15.9477 2.44772 15.5 3 15.5H6C6.79565 15.5 7.55871 15.8161 8.12132 16.3787C8.68393 16.9413 9 17.7044 9 18.5V21.5C9 22.0523 8.55228 22.5 8 22.5C7.44772 22.5 7 22.0523 7 21.5V18.5C7 18.2348 6.89464 17.9804 6.70711 17.7929C6.51957 17.6054 6.26522 17.5 6 17.5H3C2.44772 17.5 2 17.0523 2 16.5ZM18 17.5C17.7348 17.5 17.4804 17.6054 17.2929 17.7929C17.1054 17.9804 17 18.2348 17 18.5V21.5C17 22.0523 16.5523 22.5 16 22.5C15.4477 22.5 15 22.0523 15 21.5V18.5C15 17.7043 15.3161 16.9413 15.8787 16.3787C16.4413 15.8161 17.2043 15.5 18 15.5H21C21.5523 15.5 22 15.9477 22 16.5C22 17.0523 21.5523 17.5 21 17.5H18Z" fill="white"/>
              </svg>
            </Button>
          </div>
        </div>
      </header>

    </>
  )
}

export default Header
