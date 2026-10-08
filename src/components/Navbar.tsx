import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router'
import { useApp } from '../context/AppContext'
import { YOUTH_NAME, translations } from '../data/content'

const navItems = [
  { path: '/', key: 'home' as const },
  { path: '/first-visit', key: 'firstVisit' as const },
  { path: '/events', key: 'events' as const },
  { path: '/leaders', key: 'leaders' as const },
  { path: '/groups', key: 'groups' as const },
  { path: '/sermons', key: 'sermons' as const },
  { path: '/giving', key: 'giving' as const },
  { path: '/contact', key: 'contact' as const },
]

const moreItems = [
  { path: '/blog', key: 'blog' as const },
  { path: '/gallery', key: 'gallery' as const },
  { path: '/testimonies', key: 'testimonies' as const },
  { path: '/prayer', key: 'prayer' as const },
  { path: '/serve', key: 'serve' as const },
  { path: '/resources', key: 'resources' as const },
  { path: '/parents', key: 'parents' as const },
  { path: '/members', key: 'members' as const },
]

export default function Navbar() {
  const { lang, toggleLang, darkMode, toggleDark } = useApp()
  const t = translations[lang].nav
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navBase = `fixed top-0 left-0 right-0 z-50 transition-all duration-300`
  const navBg = scrolled
    ? 'bg-white/95 dark:bg-[#0D0920]/95 backdrop-blur-md shadow-lg shadow-black/10'
    : 'bg-transparent'

  return (
    <header className={`${navBase} ${navBg}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setMenuOpen(false)}>
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-105 transition-transform">
            <span className="text-white font-display font-black text-sm">P</span>
          </div>
          <div className="leading-tight">
            <div className={`font-display font-black text-base ${scrolled ? 'text-primary' : 'text-white'}`}>{YOUTH_NAME}</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.slice(0, 6).map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `nav-link px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'text-accent font-semibold'
                    : scrolled
                      ? 'text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-accent'
                      : 'text-white/80 hover:text-white'
                } ${isActive ? 'active' : ''}`
              }
            >
              {t[item.key]}
            </NavLink>
          ))}

          {/* More dropdown */}
          <div className="relative">
            <button
              onClick={() => setMoreOpen(o => !o)}
              className={`nav-link px-3 py-1.5 text-sm font-medium rounded-lg transition-colors flex items-center gap-1 ${
                scrolled ? 'text-gray-700 dark:text-gray-200 hover:text-primary' : 'text-white/80 hover:text-white'
              }`}
            >
              {t.more}
              <svg className={`w-3 h-3 transition-transform ${moreOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {moreOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-[#1A1035] rounded-xl shadow-xl border border-purple-100 dark:border-purple-900/50 py-1 animate-slide-down">
                {moreItems.map(item => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMoreOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-sm transition-colors ${
                        isActive ? 'text-primary font-semibold bg-purple-50 dark:bg-purple-900/20' : 'text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-primary'
                      }`
                    }
                  >
                    {t[item.key]}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className={`hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold transition-colors ${
              scrolled ? 'text-gray-500 dark:text-gray-400 hover:text-primary' : 'text-white/60 hover:text-white'
            }`}
            aria-label="Toggle language"
          >
            <span className="text-base">🌐</span>
            {translations[lang].lang}
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={toggleDark}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
              scrolled ? 'text-gray-500 dark:text-gray-400 hover:bg-purple-100 dark:hover:bg-purple-900/30' : 'text-white/70 hover:text-white'
            }`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Join Us CTA */}
          <Link
            to="/events"
            className="hidden sm:flex items-center gap-1.5 bg-accent hover:bg-accent-dark text-black font-display font-bold text-sm px-4 py-2 rounded-xl transition-all hover:scale-105 shadow-lg shadow-amber-500/30"
          >
            {t.joinUs}
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className={`lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg transition-colors ${
              scrolled ? 'text-gray-700 dark:text-gray-200' : 'text-white'
            }`}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={`w-5 h-0.5 bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-5 h-0.5 bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-[#0D0920]/98 backdrop-blur-lg z-40 overflow-y-auto animate-slide-down">
          <div className="px-6 py-6 space-y-1">
            {[...navItems, ...moreItems].map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-3 px-4 rounded-xl text-base font-medium transition-colors ${
                    isActive ? 'bg-primary/20 text-accent font-semibold' : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                {t[item.key]}
              </NavLink>
            ))}
            <div className="pt-4 flex items-center gap-3">
              <Link
                to="/events"
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center bg-accent text-black font-display font-bold py-3 rounded-xl"
              >
                {t.joinUs}
              </Link>
              <button onClick={toggleLang} className="px-4 py-3 rounded-xl border border-white/20 text-white text-sm font-bold">
                {translations[lang].lang}
              </button>
              <button onClick={toggleDark} className="px-4 py-3 rounded-xl border border-white/20 text-white">
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
