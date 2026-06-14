import { useLang } from '../i18n/LanguageContext'
import { useScrollReveal } from '../hooks/useScrollReveal'

function ServiceCard({ icon, title, desc, delay }) {
  const { ref, visible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`service-card reveal${visible ? ' reveal--visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <span className="service-card__icon">{icon}</span>
      <h3 className="service-card__title">{title}</h3>
      <p className="service-card__desc">{desc}</p>
    </div>
  )
}

export default function Services() {
  const { t } = useLang()
  const items = t('services.items')

  return (
    <section className="section services-section" id="services">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">{t('services.sectionTag')}</div>
          <h2 className="section-title">{t('services.title')}</h2>
          <div className="section-divider" />
        </div>

        <div className="services-grid">
          {Array.isArray(items) &&
            items.map((item, i) => (
              <ServiceCard
                key={i}
                icon={item.icon}
                title={item.title}
                desc={item.desc}
                delay={i * 0.1}
              />
            ))}
        </div>
      </div>
    </section>
  )
}
