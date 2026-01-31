import { useEffect, useState } from 'react'

export default function TOC({ headings = [] }) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { rootMargin: '0px 0px -80% 0px' }
    )

    headings.forEach((h) => {
      const el = document.getElementById(h.slug)
      if (el) obs.observe(el)
    })

    return () => obs.disconnect()
  }, [headings])

  return (
    <nav data-testid="table-of-contents" className="p-2 border rounded">
      <ul>
        {headings.map((h) => (
          <li key={h.slug}>
            <a
              data-testid={`toc-link-${h.slug}`}
              href={`#${h.slug}`}
              {...(active === h.slug ? { 'data-active': 'true' } : {})}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
