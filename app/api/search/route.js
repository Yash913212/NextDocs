import { NextResponse } from 'next/server'
import { getAvailableVersions, getAllDocs } from '@/lib/docs'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const locale = searchParams.get('locale') || 'en'
    const versionParam = searchParams.get('version')
    const query = searchParams.get('q') || ''

    if (!query.trim()) {
      return NextResponse.json({ results: [] })
    }

    const versions = versionParam ? [versionParam] : getAvailableVersions()
    const lowerQuery = query.toLowerCase()
    const results = []

    versions.forEach((version) => {
      const docs = getAllDocs(locale, version)
      docs.forEach((doc) => {
        const text = `${doc.metadata?.title || ''} ${doc.metadata?.description || ''} ${doc.content}`.toLowerCase()
        if (text.includes(lowerQuery)) {
          results.push({
            slug: doc.slug,
            title: doc.metadata?.title || 'Untitled',
            description: doc.metadata?.description || '',
            locale: doc.locale,
            version: doc.version,
          })
        }
      })
    })

    return NextResponse.json({ results })
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json({ error: 'Failed to search docs' }, { status: 500 })
  }
}
