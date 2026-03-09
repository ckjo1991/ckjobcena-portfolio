import { projectCaseStudiesById, projects } from '../data/portfolio-data.js'

export const DEFAULT_SITE_URL = 'https://ckjobcena-portfolio.vercel.app'
const SITE_NAME = 'CK Obcena'
const DEFAULT_SOCIAL_IMAGE = '/caricature_me_bg_removed.png'
const HOME_PATH = '/'
const HOME_TITLE = `${SITE_NAME} | UX Designer Portfolio`
const HOME_DESCRIPTION =
  'UX designer with an analytics background turning messy workflows into clear, measurable products. Explore case studies for Angkas, KuryentePH, and FAST.'

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function joinUrl(siteUrl, targetPath) {
  if (!targetPath) return siteUrl
  return targetPath.startsWith('http')
    ? targetPath
    : `${siteUrl}${targetPath.startsWith('/') ? targetPath : `/${targetPath}`}`
}

function buildStructuredData(metadata, canonicalUrl, imageUrl) {
  if (metadata.kind === 'project') {
    return {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: metadata.title,
      description: metadata.description,
      url: canonicalUrl,
      image: imageUrl,
      author: {
        '@type': 'Person',
        name: SITE_NAME,
        url: joinUrl(DEFAULT_SITE_URL, HOME_PATH),
      },
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_NAME,
    jobTitle: 'UX Designer',
    description: metadata.description,
    url: canonicalUrl,
    image: imageUrl,
    sameAs: ['https://www.linkedin.com/in/ckjobcena/'],
  }
}

export function normalizePathname(input = HOME_PATH) {
  if (!input) return HOME_PATH

  try {
    const url = new URL(input, 'https://local.ck')
    return url.pathname || HOME_PATH
  } catch {
    return input.startsWith('/') ? input : `/${input}`
  }
}

export function resolveSiteUrl(explicitSiteUrl) {
  const env = globalThis.process?.env
  const siteUrl =
    explicitSiteUrl || env?.SITE_URL || env?.VITE_SITE_URL || DEFAULT_SITE_URL

  return siteUrl.replace(/\/+$/, '')
}

export function getStaticRoutes() {
  return [
    { path: '/', changefreq: 'weekly', priority: '1.0', prerender: true },
    { path: '/resume.html', changefreq: 'monthly', priority: '0.7', prerender: false },
    ...projects.map((project) => ({
      path: project.href,
      changefreq: 'monthly',
      priority: '0.8',
      prerender: true,
    })),
  ]
}

export function getRouteMetadata(input = HOME_PATH) {
  const pathname = normalizePathname(input)

  if (pathname === HOME_PATH) {
    return {
      kind: 'home',
      path: HOME_PATH,
      title: HOME_TITLE,
      description: HOME_DESCRIPTION,
      image: DEFAULT_SOCIAL_IMAGE,
      type: 'website',
    }
  }

  const project = projects.find((entry) => entry.href === pathname)
  if (project) {
    const detail = projectCaseStudiesById[project.id]

    return {
      kind: 'project',
      path: pathname,
      title: `${project.title} Case Study | ${SITE_NAME}`,
      description: detail?.summary ?? project.summary,
      image: detail?.headerMedia?.src ?? project.previewImageSrc ?? DEFAULT_SOCIAL_IMAGE,
      type: 'article',
    }
  }

  return {
    kind: 'fallback',
    path: pathname,
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    image: DEFAULT_SOCIAL_IMAGE,
    type: 'website',
  }
}

export function buildManagedHeadMarkup(metadata, explicitSiteUrl) {
  const siteUrl = resolveSiteUrl(explicitSiteUrl)
  const canonicalUrl = joinUrl(siteUrl, metadata.path)
  const socialImageUrl = joinUrl(siteUrl, metadata.image || DEFAULT_SOCIAL_IMAGE)
  const structuredData = buildStructuredData(metadata, canonicalUrl, socialImageUrl)

  return `<!--app-head-->
    <title>${escapeHtml(metadata.title)}</title>
    <meta name="description" content="${escapeHtml(metadata.description)}" />
    <meta name="robots" content="index, follow" />
    <meta name="theme-color" content="#0f1115" />
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />
    <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />
    <meta property="og:type" content="${escapeHtml(metadata.type)}" />
    <meta property="og:title" content="${escapeHtml(metadata.title)}" />
    <meta property="og:description" content="${escapeHtml(metadata.description)}" />
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
    <meta property="og:image" content="${escapeHtml(socialImageUrl)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(metadata.title)}" />
    <meta name="twitter:description" content="${escapeHtml(metadata.description)}" />
    <meta name="twitter:image" content="${escapeHtml(socialImageUrl)}" />
    <script type="application/ld+json">${escapeHtml(JSON.stringify(structuredData))}</script>
    <!--/app-head-->`
}
