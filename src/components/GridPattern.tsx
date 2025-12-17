import { useEffect, useRef, useState } from 'react'
import './GridPattern.css'

interface GridPatternProps {
  className?: string
  lineColor?: string
  lineWidth?: number
  spacing?: number
  animate?: boolean
}

const GridPattern = ({ 
  className = '', 
  lineColor = 'rgba(255, 255, 255, 0.1)',
  lineWidth = 1,
  spacing = 40,
  animate = true
}: GridPatternProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const directionRef = useRef(1) // Persister la direction
  const [isMenuActive, setIsMenuActive] = useState(false)
  const [isAccueilActive, setIsAccueilActive] = useState(false)
  const [opacity, setOpacity] = useState(0.25)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const checkPageActive = () => {
      const body = document.body
      const hasMenuActive = body.classList.contains('menu-active')
      
      // Vérifier si on est sur la page d'accueil
      const currentPage = window.location.pathname === '/' || 
        document.querySelector('.accueil-page.active') !== null
      
      setIsMenuActive(hasMenuActive)
      setIsAccueilActive(currentPage)
    }

    checkPageActive()
    const observer = new MutationObserver(checkPageActive)
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [])

  // Suivre la position de la souris
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Animation de respiration (25% à 100%) avec pause
  useEffect(() => {
    if (!animate) return

    const interval = setInterval(() => {
      if (isPaused) return // Ne rien faire si en pause
      
      setOpacity(prev => {
        let newOpacity = prev + (directionRef.current * 0.008)
        
        if (newOpacity >= 1) {
          // Pause au sommet (100%)
          setIsPaused(true)
          setTimeout(() => {
            directionRef.current = -1
            setIsPaused(false)
          }, 800) // Pause de 800ms
          newOpacity = 1
        } else if (newOpacity <= 0.25) {
          // Pause en bas (25%)
          setIsPaused(true)
          setTimeout(() => {
            directionRef.current = 1
            setIsPaused(false)
          }, 400) // Pause plus courte de 400ms
          newOpacity = 0.25
        }
        return newOpacity
      })
    }, 50)

    return () => clearInterval(interval)
  }, [animate, isPaused])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
      drawGrid()
    }

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Appliquer l'opacité animée si animate est activé
      const currentOpacity = animate ? opacity : 1
      const colorWithOpacity = lineColor.replace(/[\d.]+\)$/, `${currentOpacity * 0.15})`)
      
      ctx.strokeStyle = colorWithOpacity
      ctx.lineWidth = lineWidth

      // Spirale de Fibonacci
      ctx.strokeStyle = colorWithOpacity
      ctx.fillStyle = colorWithOpacity
      
      // Générer la suite de Fibonacci
      const fibonacci = [1, 1]
      for (let i = 2; i < 15; i++) {
        fibonacci.push(fibonacci[i - 1] + fibonacci[i - 2])
      }
      
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      const scale = 3 // Facteur d'échelle
      
      let x = centerX
      let y = centerY
      let direction = 0 // 0: droite, 1: bas, 2: gauche, 3: haut
      
      // Dessiner les rectangles et la spirale de Fibonacci
      ctx.beginPath()
      ctx.moveTo(x, y)
      
      for (let i = 0; i < fibonacci.length; i++) {
        const size = fibonacci[i] * scale
        
        // Dessiner le rectangle
        ctx.strokeRect(x, y, size, size)
        
        // Dessiner l'arc de la spirale
        let startAngle = 0
        let endAngle = 0
        let arcX = x
        let arcY = y
        
        switch (direction % 4) {
          case 0: // Droite
            arcX = x + size
            arcY = y + size
            startAngle = Math.PI
            endAngle = Math.PI * 1.5
            x += size
            break
          case 1: // Bas
            arcX = x
            arcY = y + size
            startAngle = Math.PI * 1.5
            endAngle = Math.PI * 2
            y += size
            break
          case 2: // Gauche
            arcX = x
            arcY = y
            startAngle = 0
            endAngle = Math.PI * 0.5
            x -= size
            y -= size
            break
          case 3: // Haut
            arcX = x + size
            arcY = y
            startAngle = Math.PI * 0.5
            endAngle = Math.PI
            break
        }
        
        ctx.arc(arcX, arcY, size, startAngle, endAngle)
        direction++
      }
      
      ctx.stroke()
    }

    resize()
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [lineColor, lineWidth, spacing, animate, isMenuActive, isAccueilActive, opacity, mousePos])

  if (!isMenuActive && !isAccueilActive) return null

  return <canvas ref={canvasRef} className={`grid-pattern ${className}`} />
}

export default GridPattern

