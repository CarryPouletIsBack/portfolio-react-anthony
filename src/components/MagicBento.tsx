import React, { useRef, useEffect } from 'react'
import './MagicBento.css'

interface MagicBentoProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  style?: React.CSSProperties
}

const MagicBento: React.FC<MagicBentoProps> = ({ 
  children, 
  className = '',
  onClick,
  style
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        
        ref.current.style.setProperty('--mouse-x', `${x}%`)
        ref.current.style.setProperty('--mouse-y', `${y}%`)
      }
    }

    const handleMouseLeave = () => {
      if (ref.current) {
        ref.current.style.setProperty('--mouse-x', '50%')
        ref.current.style.setProperty('--mouse-y', '50%')
      }
    }

    const element = ref.current
    if (element) {
      element.addEventListener('mousemove', handleMouseMove)
      element.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (element) {
        element.removeEventListener('mousemove', handleMouseMove)
        element.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  return (
    <div ref={ref} className={`magic-bento ${className}`} onClick={onClick} style={style}>
      {children}
    </div>
  )
}

export default MagicBento
