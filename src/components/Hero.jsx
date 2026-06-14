import { useLang } from '../i18n/LanguageContext'

export default function Hero() {
  const { t } = useLang()

  return (
    <section className="hero" id="home">
      <div className="hero__bg">
        <div className="hero__pattern" />
        <div className="hero__glow hero__glow--1" />
        <div className="hero__glow hero__glow--2" />
      </div>

      <div className="hero__content">
        <div className="hero__ornament">❧ ✦ ❧</div>
        <h1 className="hero__name">{t('hero.name')}</h1>
        <p className="hero__subtitle">{t('hero.subtitle')}</p>
        <p className="hero__specialty">{t('hero.specialty')}</p>
        <div className="hero__divider">﴾ ✦ ﴿</div>
        <div className="hero__cta">
          <a href="#services" className="btn btn--primary">
            {t('hero.ctaServices')}
          </a>
          <a href="#contact" className="btn btn--outline">
            {t('hero.ctaContact')}
          </a>
        </div>
      </div>

      <a href="#about" className="hero__scroll-hint" aria-label="Scroll down">
        <div className="hero__scroll-line" />
      </a>
    </section>
  )
}
