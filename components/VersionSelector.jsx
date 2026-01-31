import { useRouter } from 'next/router'
import Link from 'next/link'

export default function VersionSelector() {
  const router = useRouter()
  const { asPath, locale } = router
  const versions = ['v1', 'v2', 'v3']

  return (
    <div>
      <select
        data-testid="version-selector"
        onChange={(e) => {
          const v = e.target.value
          // replace /vX/ in path
          const newPath = asPath.replace(/\/v\d+\//, `/${v}/`)
          router.push(newPath, newPath, { locale })
        }}
      >
        {versions.map((v) => (
          <option key={v} value={v} data-testid={`version-option-${v}`}>
            {v}
          </option>
        ))}
      </select>
    </div>
  )
}
