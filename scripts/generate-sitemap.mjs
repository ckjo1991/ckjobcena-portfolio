import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const publicDir = path.join(projectRoot, 'public')

const siteUrl = (process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://example.com').replace(
  /\/+$/,
  '',
)

const routes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/resume.html', changefreq: 'monthly', priority: '0.7' },
  { path: '/projects/signal-room', changefreq: 'monthly', priority: '0.8' },
  { path: '/projects/motion-lab', changefreq: 'monthly', priority: '0.8' },
  { path: '/projects/alliance-link', changefreq: 'monthly', priority: '0.8' },
]

const lastmod = new Date().toISOString().split('T')[0]

const toAbsoluteUrl = (routePath) => `${siteUrl}${routePath === '/' ? '/' : routePath}`

const sitemapBody = routes
  .map(
    (route) => `  <url>
    <loc>${toAbsoluteUrl(route.path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join('\n')

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapBody}
</urlset>
`

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`

await mkdir(publicDir, { recursive: true })
await Promise.all([
  writeFile(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8'),
  writeFile(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf8'),
])

console.log(`Generated sitemap and robots.txt for ${siteUrl}`)
