'use client'

import { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import Link from 'next/link'
import { useSearchStore } from '@/lib/store'

export function SearchComponent({ locale, version }) {
  const { query, setQuery, isOpen, setIsOpen } = useSearchStore()
  const [results, setResults] = useState([])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const controller = new AbortController()

    const fetchResults = async () => {
      try {
        const params = new URLSearchParams({ locale, version, q: query })
        const response = await fetch(`/api/search?${params.toString()}`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Search request failed')
        }

        const data = await response.json()
        setResults(data.results || [])
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Search fetch error:', error)
          setResults([])
        }
      }
    }

    fetchResults()

    return () => controller.abort()
  }, [query, locale, version])

  return (
    <div className="relative flex-1 max-w-md">
      <div className="relative">
        <input
          type="text"
          data-testid="search-input"
          placeholder="Search documentation..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(e.target.value.length > 0)
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        {query && (
          <button
            onClick={() => {
              setQuery('')
              setIsOpen(false)
            }}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {isOpen && query && (
        <div
          data-testid="search-results"
          className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto z-50"
        >
          {results.length > 0 ? (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {results.map((result) => (
                <li key={`${result.locale}-${result.version}-${result.slug}`}>
                  <Link
                    href={`/${result.locale}/docs/${result.version}/${result.slug}`}
                    className="block p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => {
                      setQuery('')
                      setIsOpen(false)
                    }}
                  >
                    <h4 className="font-semibold text-gray-900 dark:text-white">{result.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{result.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div data-testid="search-no-results" className="p-4 text-center text-gray-600 dark:text-gray-400">
              No results found for &ldquo;{query}&rdquo;
            </div>
          )}
        </div>
      )}
    </div>
  )
}
