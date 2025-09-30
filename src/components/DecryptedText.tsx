import { useState, useEffect } from 'react'
import './DecryptedText.css'

interface DecryptedTextProps {
  text: string
  className?: string
  speed?: number
  delay?: number
}

const DecryptedText = ({ text, className = '', speed = 50, delay = 0 }: DecryptedTextProps) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isDecrypting, setIsDecrypting] = useState(false)

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'
  
  const getRandomChar = () => characters[Math.floor(Math.random() * characters.length)]

  useEffect(() => {
    if (!text) return

    const timer = setTimeout(() => {
      setIsDecrypting(true)
      let currentIndex = 0
      
      const decryptInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(prev => {
            const newText = text.slice(0, currentIndex + 1)
            const remainingChars = text.slice(currentIndex + 1)
            const randomChars = remainingChars
              .split('')
              .map(() => getRandomChar())
              .join('')
            
            return newText + randomChars
          })
          currentIndex++
        } else {
          clearInterval(decryptInterval)
          setIsDecrypting(false)
        }
      }, speed)

      return () => clearInterval(decryptInterval)
    }, delay)

    return () => clearTimeout(timer)
  }, [text, speed, delay])

  return (
    <span className={`decrypted-text ${isDecrypting ? 'decrypting' : ''} ${className}`}>
      {displayedText}
    </span>
  )
}

export default DecryptedText
