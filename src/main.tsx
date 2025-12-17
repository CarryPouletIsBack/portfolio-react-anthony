import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Background from './components/Background.tsx'
import GridPattern from './components/GridPattern.tsx'

// Render background
const backgroundRoot = document.getElementById('background-root')
if (backgroundRoot) {
  createRoot(backgroundRoot).render(
    <StrictMode>
      <Background />
      <GridPattern lineColor="rgba(255, 255, 255, 0.15)" lineWidth={0.5} spacing={80} />
    </StrictMode>
  )
}

// Render app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
