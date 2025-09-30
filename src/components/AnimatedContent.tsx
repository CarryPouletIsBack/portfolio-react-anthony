import { useEffect, useRef, useState } from 'react'
import './AnimatedContent.css'

interface AnimatedContentProps {
  children: React.ReactNode
  distance?: number
  direction?: 'horizontal' | 'vertical'
  reverse?: boolean
  duration?: number
  ease?: 'bounce.out' | 'ease.out' | 'ease.in' | 'ease.inOut'
  initialOpacity?: number
  animateOpacity?: boolean
  scale?: number
  threshold?: number
  delay?: number
  className?: string
}

const AnimatedContent = ({
  children,
  distance = 150,
  direction = 'horizontal',
  reverse = false,
  duration = 1.2,
  ease = 'bounce.out',
  initialOpacity = 0.2,
  animateOpacity = true,
  scale = 1.1,
  threshold = 0.2,
  delay = 0.3,
  className = ''
}: AnimatedContentProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setTimeout(() => {
            setIsVisible(true)
            setHasAnimated(true)
          }, delay * 1000)
        }
      },
      { threshold }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [threshold, delay, hasAnimated])

  const getEaseFunction = () => {
    switch (ease) {
      case 'bounce.out':
        return 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
      case 'ease.out':
        return 'cubic-bezier(0, 0, 0.2, 1)'
      case 'ease.in':
        return 'cubic-bezier(0.4, 0, 1, 1)'
      case 'ease.inOut':
        return 'cubic-bezier(0.4, 0, 0.2, 1)'
      default:
        return 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    }
  }

  const getInitialTransform = () => {
    const translateX = direction === 'horizontal' ? (reverse ? distance : -distance) : 0
    const translateY = direction === 'vertical' ? (reverse ? distance : -distance) : 0
    return `translate(${translateX}px, ${translateY}px) scale(${scale})`
  }

  const getFinalTransform = () => {
    return 'translate(0px, 0px) scale(1)'
  }

  const style = {
    transform: isVisible ? getFinalTransform() : getInitialTransform(),
    opacity: isVisible ? 1 : initialOpacity,
    transition: `all ${duration}s ${getEaseFunction()}`,
    willChange: 'transform, opacity'
  }

  return (
    <div
      ref={elementRef}
      className={`animated-content ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}

export default AnimatedContent
