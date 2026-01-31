'use client'

import { useState, useEffect } from 'react'
import { Search as SearchIcon, X } from 'lucide-react'
import Link from 'next/link'
import FlexSearch from 'flexsearch'

export function Search({ docs, locale, version }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [index, setIndex] = useState(null)

  useEffect(() => {
    // Create search index
    const searchIndex = new FlexSearch.Index({
      tokenize: 'forward',
      threshold: 0,
      resolution: 9,
      depth: 3,
    })

    // Index all documents
    docs.forEach((doc, i) => {
      const searchContent = `${doc.metadata?.title || ''} ${doc.metadata?.description || ''} ${doc.content || ''}`
      searchIndex.add(i, searchContent)
    })

    setIndex(searchIndex)
  }, [docs])

  useEffect(() => {
    if (!query || !index) {
      setResults([])
      return
    }

    const searchResults = index.search(query, 10)
    const matchedDocs = searchResults.map((i) => docs[i]).filter(Boolean)
    setResults(matchedDocs)
  }, [query, index, docs])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    setQuery('')
    setResults([])
  }

  return (
    <>
      {/* Search trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <SearchIcon className="w-4 h-4" />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs font-semibold bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded">
          ⌘K
        </kbd>
      </button>

      {/* Search modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={handleClose}
          />
          <div className="relative min-h-screen flex items-start justify-center p-4 pt-[10vh]">
            <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-2xl">
              <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
                <SearchIcon className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  data-testid="search-input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search documentation..."
                  className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  autoFocus
                />
                <button
                  onClick={handleClose}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {query && results.length === 0 ? (
                  <div
                    data-testid="search-no-results"
                    className="p-8 text-center text-gray-500 dark:text-gray-400"
                  >
                    No results found for &quot;{query}&quot;
                  </div>
                ) : results.length > 0 ? (
                  <div data-testid="search-results" className="p-2">
                    {results.map((doc) => {
                      const href = `/${locale}/docs/${version}/${doc.slug}`
                      return (
                        <Link
                          key={doc.slug}
                          href={href}
                          onClick={handleClose}
                          className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <div className="font-medium text-gray-900 dark:text-white">
                            {doc.metadata?.title || doc.slug}
                          </div>
                          {doc.metadata?.description && (
                            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                              {doc.metadata.description}
                            </div>
                          )}
                        </Link>
                      )
                    })}
                  </div>
                ) : null}
              </div>

              <div className="p-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-between">
                <div>
                  Press <kbd className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">ESC</kbd> to close
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
