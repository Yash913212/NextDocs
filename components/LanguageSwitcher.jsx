import Link from 'next/link'
import { useRouter } from 'next/router'

const LANG_NAMES = { en: 'English', es: 'Español', fr: 'Français', de: 'Deutsch' }

export default function LanguageSwitcher() {
  const router = useRouter()
  const { locales, locale, asPath } = router

  return (
    <div data-testid="language-switcher">
      <select
        value={locale}
        onChange={(e) => {
          const nextLocale = e.target.value
          router.push(asPath, asPath, { locale: nextLocale })
        }}
        className="border rounded p-1"
      >
        {locales.map((l) => (
          <option key={l} value={l}>
            {LANG_NAMES[l] || l}
          </option>
        ))}
      </select>
    </div>
  )
}
