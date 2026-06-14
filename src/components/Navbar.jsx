import { useState, useEffect } from 'react'
import { useLang } from '../i18n/LanguageContext'

const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'ar', label: 'ع' },
]

export default function Navbar() {
  const { t, lang, setLang } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = ['home', 'about', 'services', 'credentials', 'contact']
      const scrollY = window.scrollY + 90
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && scrollY >= el.offsetTop) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { key: 'nav.home', href: '#home', id: 'home' },
    { key: 'nav.about', href: '#about', id: 'about' },
    { key: 'nav.services', href: '#services', id: 'services' },
    { key: 'nav.credentials', href: '#credentials', id: 'credentials' },
    { key: 'nav.contact', href: '#contact', id: 'contact' },
  ]

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#home" className="nav-logo">
          <span className="nav-logo__text">{t('hero.name')}</span>
        </a>

        <ul className={`nav-links${menuOpen ? ' nav-links--open' : ''}`}>
          {navLinks.map(({ key, href, id }) => (
            <li key={id}>
              <a
                href={href}
                className={`nav-link${activeSection === id ? ' nav-link--active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {t(key)}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <div className="lang-switcher">
            {LANGS.map(({ code, label }, i) => (
              <span key={code} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {i > 0 && <span className="lang-sep">|</span>}
                <button
                  className={`lang-btn${lang === code ? ' lang-btn--active' : ''}`}
                  onClick={() => setLang(code)}
                  aria-label={`Switch to ${code.toUpperCase()}`}
                >
                  {label}
                </button>
              </span>
            ))}
          </div>

          <button
            className={`menu-toggle${menuOpen ? ' menu-toggle--open' : ''}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </nav>
  )
}
