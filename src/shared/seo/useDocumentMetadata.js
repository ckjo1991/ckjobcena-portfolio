import { useEffect } from 'react'
import { getRouteMetadata, resolveSiteUrl } from './metadata.js'

function upsertMeta(attribute, key, content) {
  const selector = `meta[${attribute}="${key}"]`
  let node = document.head.querySelector(selector)

  if (!node) {
    node = document.createElement('meta')
    node.setAttribute(attribute, key)
    document.head.appendChild(node)
  }

  node.setAttribute('content', content)
}

function upsertLink(rel, href) {
  let node = document.head.querySelector(`link[rel="${rel}"]`)

  if (!node) {
    node = document.createElement('link')
    node.setAttribute('rel', rel)
    document.head.appendChild(node)
  }

  node.setAttribute('href', href)
}

function upsertJsonLd(content) {
  const id = 'app-structured-data'
  let node = document.head.querySelector(`#${id}`)

  if (!node) {
    node = document.createElement('script')
    node.id = id
    node.type = 'application/ld+json'
    document.head.appendChild(node)
  }

  node.textContent = content
}

export function useDocumentMetadata(pathname) {
  useEffect(() => {
    const metadata = getRouteMetadata(pathname)
    const siteUrl = resolveSiteUrl(window.location.origin)
    const canonicalUrl = `${siteUrl}${metadata.path}`
    const socialImageUrl = metadata.image.startsWith('http')
      ? metadata.image
      : `${siteUrl}${metadata.image}`

    document.title = metadata.title

    upsertMeta('name', 'description', metadata.description)
    upsertMeta('name', 'robots', 'index, follow')
    upsertMeta('name', 'theme-color', '#0f1115')
    upsertMeta('property', 'og:site_name', 'CK Obcena')
    upsertMeta('property', 'og:type', metadata.type)
    upsertMeta('property', 'og:title', metadata.title)
    upsertMeta('property', 'og:description', metadata.description)
    upsertMeta('property', 'og:url', canonicalUrl)
    upsertMeta('property', 'og:image', socialImageUrl)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', metadata.title)
    upsertMeta('name', 'twitter:description', metadata.description)
    upsertMeta('name', 'twitter:image', socialImageUrl)
    upsertLink('canonical', canonicalUrl)

    upsertJsonLd(
      JSON.stringify(
        metadata.kind === 'project'
          ? {
              '@context': 'https://schema.org',
              '@type': 'CreativeWork',
              name: metadata.title,
              description: metadata.description,
              url: canonicalUrl,
              image: socialImageUrl,
              author: {
                '@type': 'Person',
                name: 'CK Obcena',
                url: siteUrl,
              },
            }
          : {
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'CK Obcena',
              jobTitle: 'UX Designer',
              description: metadata.description,
              url: canonicalUrl,
              image: socialImageUrl,
              sameAs: ['https://www.linkedin.com/in/ckjobcena/'],
            },
      ),
    )
  }, [pathname])
}
