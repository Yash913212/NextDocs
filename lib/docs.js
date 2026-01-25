import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const docsDirectory = path.join(process.cwd(), '_docs')

function normalizeVersion(version) {
  if (!version) return ''
  return version.startsWith('v') ? version : `v${version}`
}

export function getDocSlugs(locale, version) {
  const normalizedVersion = normalizeVersion(version)
  const versionPath = path.join(docsDirectory, locale, normalizedVersion)

  if (!fs.existsSync(versionPath)) {
    return []
  }

  const files = fs.readdirSync(versionPath)
  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''))
}

export function getDoc(locale, version, slug) {
  try {
    const normalizedVersion = normalizeVersion(version)
    const filePath = path.join(docsDirectory, locale, normalizedVersion, `${slug}.md`)

    if (!fs.existsSync(filePath)) {
      return null
    }

    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContent)

    return {
      slug,
      content,
      metadata: data,
      locale,
      version: normalizedVersion,
    }
  } catch (error) {
    console.error(`Error reading doc ${locale}/${version}/${slug}:`, error)
    return null
  }
}

export function getAllDocs(locale, version) {
  const normalizedVersion = normalizeVersion(version)
  const slugs = getDocSlugs(locale, normalizedVersion)
  return slugs
    .map((slug) => getDoc(locale, normalizedVersion, slug))
    .filter((doc) => doc !== null)
}

export function getAvailableVersions() {
  const versionsPath = path.join(docsDirectory, 'en')

  if (!fs.existsSync(versionsPath)) {
    return []
  }

  return fs
    .readdirSync(versionsPath)
    .filter((file) => fs.statSync(path.join(versionsPath, file)).isDirectory())
    .sort()
}

export function getAvailableLocales() {
  if (!fs.existsSync(docsDirectory)) {
    return []
  }

  return fs
    .readdirSync(docsDirectory)
    .filter((file) => fs.statSync(path.join(docsDirectory, file)).isDirectory())
}

export function getDocsByVersion(locale, version) {
  return getAllDocs(locale, version)
}

export function searchDocs(locale, query) {
  const versions = getAvailableVersions()
  const results = []

  versions.forEach((version) => {
    const docs = getAllDocs(locale, version)
    docs.forEach((doc) => {
      const searchText = `${doc.metadata.title} ${doc.metadata.description} ${doc.content}`.toLowerCase()
      if (searchText.includes(query.toLowerCase())) {
        results.push(doc)
      }
    })
  })

  return results
}
