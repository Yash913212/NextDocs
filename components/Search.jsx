import { useEffect, useState, useRef } from 'react'
import FlexSearch from 'flexsearch'

export default function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [noResults, setNoResults] = useState(false)
  const indexRef = useRef(null)
  const docsRef = useRef([])

  useEffect(() => {
    fetch(`/api/search-index?locale=${navigator.language?.split('-')[0] || 'en'}`)
      .then((r) => r.json())
      .then((data) => {
        const idx = new FlexSearch.Document({ tokenize: 'forward', document: { id: 'path', index: ['title', 'content'] } })
        data.items.forEach((it) => idx.add(it))
        indexRef.current = idx
        docsRef.current = data.items
      })
  }, [])

  useEffect(() => {
    if (!query || !indexRef.current) {
      setResults([])
      setNoResults(false)
      return
    }
    const res = indexRef.current.search(query, { enrich: true })
    const paths = new Set()
    const hits = []
    res.forEach((r) => {
      r.result.forEach((p) => {
        if (!paths.has(p)) {
          paths.add(p)
          const doc = docsRef.current.find((d) => d.path === p)
          if (doc) hits.push(doc)
        }
      })
    })
    setResults(hits)
    setNoResults(hits.length === 0)
  }, [query])

  return (
    <div className="relative">
      <input
        data-testid="search-input"
        placeholder="Search docs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border rounded-md px-3 py-1 w-80 min-w-[16rem] transition focus:outline-none focus:ring-2 focus:ring-vite-500"
      />
      <div data-testid="search-results" className="absolute mt-1 max-h-60 overflow-auto w-80">
        {results.map((r) => (
          <div key={r.path} className="p-2 border-b bg-white dark:bg-gray-800">
            <a className="text-vite-500 dark:text-vite-300 font-medium hover:underline" href={r.path}>{r.title}</a>
            <div className="text-xs text-gray-500">{r.path}</div>
          </div>
        ))}
        {noResults && <div data-testid="search-no-results" className="p-2">No results found</div>}
      </div>
    </div>
  )
}
