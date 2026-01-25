'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export function TableOfContents({ content }) {
  const [headings, setHeadings] = useState([])
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm
    const extractedHeadings = []
    let match

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length
      const text = match[2].trim()
      const slug = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')

      if (level <= 3) {
        extractedHeadings.push({ level, text, slug })
      }
    }

    setHeadings(extractedHeadings)
  }, [content])

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = document.querySelectorAll('[id^="heading-"]')
      let currentActiveId = ''

      headingElements.forEach((element) => {
        const rect = element.getBoundingClientRect()
        if (rect.top <= 100) {
          currentActiveId = element.id
        }
      })

      setActiveId(currentActiveId)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (headings.length === 0) {
    return null
  }

  return (
    <aside className="hidden xl:block fixed right-0 top-20 w-48 max-h-[calc(100vh-80px)] overflow-y-auto">
      <div data-testid="table-of-contents" className="p-4 bg-gray-50 dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800">
        <h3 className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-4">On This Page</h3>
        <nav className="space-y-2 text-sm">
          {headings.map((heading) => (
            <Link
              key={heading.slug}
              href={`#heading-${heading.slug}`}
              data-testid={`toc-link-${heading.slug}`}
              data-active={activeId === `heading-${heading.slug}` ? 'true' : undefined}
              className={`block py-1 px-3 rounded transition-colors ${
                activeId === `heading-${heading.slug}`
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-medium'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
              style={{ paddingLeft: `${(heading.level - 1) * 12 + 12}px` }}
            >
              {heading.text}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}
