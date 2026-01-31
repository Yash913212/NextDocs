import { useRef } from 'react'

export default function CodeBlock({ language, value }) {
  const ref = useRef()
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      // Minimal non-blocking UI feedback
      ref.current && ref.current.classList.add('ring-2', 'ring-green-400')
      setTimeout(() => ref.current && ref.current.classList.remove('ring-2', 'ring-green-400'), 1200)
    } catch (e) {
      console.error('copy failed', e)
    }
  }
  return (
    <div data-testid="code-block" ref={ref} className="relative border rounded">
      <pre className="p-4 overflow-auto whitespace-pre-wrap text-sm"><code>{value}</code></pre>
      <button data-testid="copy-code-button" onClick={copy} className="absolute top-2 right-2 bg-white/80 dark:bg-gray-700 text-xs px-2 py-1 rounded shadow">
        Copy
      </button>
    </div>
  )
}
