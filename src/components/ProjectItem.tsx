import { useState, useRef, useEffect } from 'react'
import './ProjectItem.css'

interface ProjectItemProps {
  imageSrc: string
  imageAlt: string
  title: string
  onClick?: () => void
  className?: string
  forceTextColor?: string
}

const ProjectItem = ({ imageSrc, imageAlt, title, onClick, className = '', forceTextColor }: ProjectItemProps) => {
  const [textColor, setTextColor] = useState(forceTextColor || 'white')
  const imgRef = useRef<HTMLImageElement>(null)

  const getAverageColor = (img: HTMLImageElement) => {
    try {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) return 'white'

      // Limiter la taille pour les performances
      const maxSize = 100
      const ratio = Math.min(maxSize / img.naturalWidth, maxSize / img.naturalHeight)
      
      canvas.width = img.naturalWidth * ratio
      canvas.height = img.naturalHeight * ratio

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      let r = 0, g = 0, b = 0
      const pixelCount = data.length / 4

      for (let i = 0; i < data.length; i += 4) {
        r += data[i]
        g += data[i + 1]
        b += data[i + 2]
      }

      r = Math.floor(r / pixelCount)
      g = Math.floor(g / pixelCount)
      b = Math.floor(b / pixelCount)

      // Calculer la luminosité (formule standard)
      const brightness = (r * 299 + g * 587 + b * 114) / 1000

      // Si l'image est claire, utiliser du texte sombre, sinon du texte clair
      return brightness > 128 ? 'black' : 'white'
    } catch (error) {
      console.warn('Erreur lors de l\'analyse de l\'image:', error)
      return 'white' // Fallback en cas d'erreur
    }
  }

  useEffect(() => {
    // Si une couleur est forcée, l'utiliser directement
    if (forceTextColor) {
      setTextColor(forceTextColor)
      return
    }

    if (imgRef.current && imageSrc) {
      const img = imgRef.current
      
      // Timeout pour éviter les blocages
      const timeout = setTimeout(() => {
        setTextColor(forceTextColor || 'white')
      }, 2000)

      img.onload = () => {
        clearTimeout(timeout)
        if (forceTextColor) {
          setTextColor(forceTextColor)
        } else {
          try {
            const color = getAverageColor(img)
            setTextColor(color)
          } catch (error) {
            console.warn('Erreur lors de l\'analyse de l\'image:', error)
            setTextColor('white')
          }
        }
      }

      img.onerror = () => {
        clearTimeout(timeout)
        setTextColor(forceTextColor || 'white')
      }

      // Si l'image est déjà chargée
      if (img.complete && img.naturalHeight !== 0) {
        clearTimeout(timeout)
        if (forceTextColor) {
          setTextColor(forceTextColor)
        } else {
          try {
            const color = getAverageColor(img)
            setTextColor(color)
          } catch (error) {
            setTextColor('white')
          }
        }
      }
    } else {
      setTextColor('white') // Par défaut pour les placeholders
    }
  }, [imageSrc, forceTextColor])

  return (
    <div className={`project-item ${className}`} onClick={onClick}>
      <div className={`project-image ${!imageSrc ? 'placeholder' : ''}`}>
        {imageSrc ? (
          <img 
            ref={imgRef}
            src={imageSrc} 
            alt={imageAlt} 
            style={{
              width: '100%', 
              height: '100%', 
              objectFit: 'cover', 
              borderRadius: '4px'
            }} 
          />
        ) : null}
      </div>
      <p style={{ color: textColor }}>{title}</p>
    </div>
  )
}

export default ProjectItem
