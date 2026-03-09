import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import AppRoutes from './AppRoutes.jsx'

function App({ router = 'browser', initialEntries = ['/'], disableStartupLoader = false }) {
  const content = <AppRoutes disableStartupLoader={disableStartupLoader} />

  if (router === 'memory') {
    return <MemoryRouter initialEntries={initialEntries}>{content}</MemoryRouter>
  }

  return <BrowserRouter>{content}</BrowserRouter>
}

export default App
