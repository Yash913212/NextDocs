import Link from 'next/link'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeToggle from './ThemeToggle'
import VersionSelector from './VersionSelector'
import Search from './Search'

export default function Header() {
  return (
    <header className="site-header" role="banner">
      <div className="flex items-center gap-4">
        <Link href="/">
          <a className="logo flex items-center gap-3" aria-label="NextDocs Home">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M3 12L12 3l9 9-9 9L3 12z" fill="#FFFFFF" opacity="0.12" />
              <path d="M6 12l6-6 6 6-6 6-6-6z" fill="#FFFFFF" />
            </svg>
            <span className="text-white font-bold">NextDocs</span>
          </a>
        </Link>
        <div className="hidden sm:block">
          <Search />
        </div>
      </div>
      <div className="header-controls flex items-center gap-2">
        <VersionSelector />
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </header>
  )
}
