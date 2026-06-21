import { createContext, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Language } from '../types'

type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
}

type LanguageProviderProps = {
  children: ReactNode
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('bg')
  const value = useMemo(() => ({ language, setLanguage }), [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (context === undefined) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }

  return context
}
