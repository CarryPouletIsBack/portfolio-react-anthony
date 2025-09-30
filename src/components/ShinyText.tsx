import { useState, useEffect } from 'react'
import './ShinyText.css'

interface ShinyTextProps {
  text: string
  className?: string
  delay?: number
}

const ShinyText = ({ text, className = '', delay = 0 }: ShinyTextProps) => {
  const [animationState, setAnimationState] = useState('hidden') // 'hidden', 'entering', 'shining', 'visible', 'exiting'

  useEffect(() => {
    if (!text) {
      setAnimationState('hidden')
      return
    }

    const timer = setTimeout(() => {
      // Étape 1: Animation d'entrée (opacité 0 à 100%)
      setAnimationState('entering')
      
      // Étape 2: Après 0.5s, commencer le shiny
      setTimeout(() => {
        setAnimationState('shining')
        
        // Étape 3: Après 2s de shiny, passer en mode visible
        setTimeout(() => {
          setAnimationState('visible')
          
          // Étape 4: Après 1s de pause, commencer la sortie
          setTimeout(() => {
            setAnimationState('exiting')
          }, 1000) // 1s de pause
        }, 2000) // 2s de shiny
        }, 500)
    }, delay)

    return () => clearTimeout(timer)
  }, [text, delay])

  return (
    <span className={`shiny-text ${animationState} ${className}`}>
      {text}
    </span>
  )
}

export default ShinyText
