import { useLang } from '../i18n/LanguageContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useCounter } from '../hooks/useCounter'

function StatItem({ value, suffix, label }) {
  const { count, ref } = useCounter(value)
  return (
    <div className="stat" ref={ref}>
      <div className="stat__number">
        {count}
        <span className="stat__suffix">{suffix}</span>
      </div>
      <div className="stat__label">{label}</div>
    </div>
  )
}

export default function About() {
  const { t } = useLang()
  const { ref: textRef, visible: textVisible } = useScrollReveal()
  const { ref: visualRef, visible: visualVisible } = useScrollReveal()
  const stats = t('about.stats')

  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">{t('about.sectionTag')}</div>
          <h2 className="section-title">{t('about.title')}</h2>
          <div className="section-divider" />
        </div>

        <div className="about-grid">
          <div
            ref={visualRef}
            className={`about-visual reveal${visualVisible ? ' reveal--visible' : ''}`}
          >
            <div className="about-frame">
              {/* rings inside the frame so they're clipped by the visual, not the page */}
              <div className="about-frame__ring about-frame__ring--1" />
              <div className="about-frame__ring about-frame__ring--2" />
              <img
                src="/manuscript.jpg"
                alt="Arabic manuscript"
                className="about-frame__img"
              />
            </div>
          </div>

          <div
            ref={textRef}
            className={`about-content reveal${textVisible ? ' reveal--visible' : ''}`}
            style={{ transitionDelay: '0.15s' }}
          >
            <p className="about-body">{t('about.body')}</p>

            {Array.isArray(stats) && (
              <div className="about-stats">
                {stats.map((s, i) => (
                  <StatItem key={i} value={s.value} suffix={s.suffix} label={s.label} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
