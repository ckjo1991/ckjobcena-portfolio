import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './app/App.jsx'
import './styles/index.css'

const rootElement = document.getElementById('root')
const disableStartupLoader = document.documentElement.dataset.prerendered === 'true'
const app = (
  <StrictMode>
    <App disableStartupLoader={disableStartupLoader} />
  </StrictMode>
)

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app)
} else {
  createRoot(rootElement).render(app)
}
