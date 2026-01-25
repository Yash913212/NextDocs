import Index from 'flexsearch'
import { getAllDocs } from './docs'

let searchIndex = null

export function initializeSearch(locale, version) {
  if (typeof window === 'undefined') {
    return
  }

  searchIndex = new Index.Document({
    tokenize: 'full',
    optimize: true,
    cache: 100,
  })

  const docs = getAllDocs(locale, version)
  docs.forEach((doc, index) => {
    searchIndex.add(index, {
      title: doc.metadata.title,
      description: doc.metadata.description || '',
      content: doc.content,
      slug: doc.slug,
    })
  })
}

export function search(query) {
  if (!searchIndex || !query.trim()) {
    return []
  }

  try {
    const results = searchIndex.search(query, {
      limit: 10,
      enrich: true,
    })

    return results
      .map((result) => {
        if (result.doc) {
          return {
            slug: String(result.doc.slug),
            title: String(result.doc.title),
            description: String(result.doc.description),
            locale: 'en',
            version: 'v1',
          }
        }
        return null
      })
      .filter((item) => item !== null)
  } catch (error) {
    console.error('Search error:', error)
    return []
  }
}

export function clearSearch() {
  searchIndex = null
}
