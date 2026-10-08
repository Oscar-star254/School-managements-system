import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

type Language = 'en' | 'sw'

interface AppContextValue {
  lang: Language
  toggleLang: () => void
  darkMode: boolean
  toggleDark: () => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en')
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
    return false
  })

  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  const toggleLang = () => setLang(l => l === 'en' ? 'sw' : 'en')
  const toggleDark = () => setDarkMode(d => !d)

  return (
    <AppContext.Provider value={{ lang, toggleLang, darkMode, toggleDark }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}

export function useLang() {
  const { lang } = useApp()
  return lang
}
