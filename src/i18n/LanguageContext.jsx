import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { translations } from './translations'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('ar')

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    const titles = {
      ar: 'منى نعمان – متخصِّصة في علم المخطوطات',
      fr: 'Mouna Noumen – Spécialiste en Manuscrits Arabes',
      en: 'Mouna Noumen – Arabic Manuscript Specialist',
    }
    document.title = titles[lang]
  }, [lang])

  const t = useCallback(
    (key) => {
      const value = key.split('.').reduce((obj, k) => obj?.[k], translations[lang])
      return value ?? key
    },
    [lang]
  )

  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)
