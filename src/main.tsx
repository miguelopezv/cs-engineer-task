import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Chart } from 'chart.js'
import './index.css'
import App from './App.tsx'

Chart.defaults.font.family = "'Inter', sans-serif"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
