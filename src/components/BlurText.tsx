import { useState, useEffect } from 'react'
import './BlurText.css'

interface BlurTextProps {
  text: string
  className?: string
  speed?: number
  delay?: number
}

const BlurText = ({ text, className = '', speed = 50, delay = 0 }: BlurTextProps) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isBlurring, setIsBlurring] = useState(false)

  useEffect(() => {
    if (!text) {
      setDisplayedText('')
      setIsBlurring(false)
      return
    }

    const timer = setTimeout(() => {
      setIsBlurring(true)
      setDisplayedText('')
      let currentIndex = 0
      
      const blurInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(blurInterval)
          // Garder le flou un peu plus longtemps pour un effet plus stable
          setTimeout(() => {
            setIsBlurring(false)
          }, 200)
        }
      }, speed)

      return () => clearInterval(blurInterval)
    }, delay)

    return () => clearTimeout(timer)
  }, [text, speed, delay])

  return (
    <span className={`blur-text ${isBlurring ? 'blurring' : ''} ${className}`}>
      {displayedText}
    </span>
  )
}

export default BlurText
