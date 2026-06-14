import { useLang } from '../i18n/LanguageContext'

export default function Footer() {
  const { t } = useLang()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__name">{t('hero.name')}</div>
          <div className="footer__tagline">{t('footer.tagline')}</div>

          <div className="footer__links">
            <a href="mailto:mounanoomen1@gmail.com" dir="ltr">✉️ mounanoomen1@gmail.com</a>
            <span className="footer__dot">·</span>
            <a href="https://wa.me/21622823429" target="_blank" rel="noreferrer" dir="ltr">
              WhatsApp +216 22 823 429
            </a>
          </div>

          <div className="footer__location">{t('footer.location')}</div>

          <div className="footer__copy">
            © {year} {t('hero.name')} · {t('footer.rights')}
          </div>
        </div>
      </div>
    </footer>
  )
}
