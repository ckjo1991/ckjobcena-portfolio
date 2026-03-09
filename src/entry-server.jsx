import { renderToString } from 'react-dom/server'
import App from './app/App.jsx'
import { buildManagedHeadMarkup, getRouteMetadata } from './shared/seo/metadata.js'

export function render(url, siteUrl) {
  const appHtml = renderToString(
    <App router="memory" initialEntries={[url]} disableStartupLoader />,
  )
  const metadata = getRouteMetadata(url)

  return {
    appHtml,
    head: buildManagedHeadMarkup(metadata, siteUrl),
  }
}
