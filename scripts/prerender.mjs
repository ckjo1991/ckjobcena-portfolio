import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { getStaticRoutes, resolveSiteUrl } from '../src/shared/seo/metadata.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const distDir = path.join(projectRoot, 'dist')
const templatePath = path.join(distDir, 'index.html')
const serverEntryPath = path.join(distDir, 'server', 'entry-server.js')

const siteUrl = resolveSiteUrl()
const template = await readFile(templatePath, 'utf8')
const { render } = await import(pathToFileURL(serverEntryPath).href)

function injectPrerenderedMarkup(html, { appHtml, head }) {
  return html
    .replace('<html lang="en">', '<html lang="en" data-prerendered="true">')
    .replace(/<!--app-head-->[\s\S]*?<!--\/app-head-->/, head)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
}

const prerenderRoutes = getStaticRoutes().filter((entry) => entry.prerender)

for (const route of prerenderRoutes) {
  const rendered = render(route.path, siteUrl)
  const outputHtml = injectPrerenderedMarkup(template, rendered)
  const outputPath =
    route.path === '/'
      ? templatePath
      : path.join(distDir, route.path.replace(/^\/+/, ''), 'index.html')

  await mkdir(path.dirname(outputPath), { recursive: true })
  await writeFile(outputPath, outputHtml, 'utf8')
}

console.log(`Prerendered ${prerenderRoutes.length} routes for ${siteUrl}`)
