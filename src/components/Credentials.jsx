import { useLang } from '../i18n/LanguageContext'
import { useScrollReveal } from '../hooks/useScrollReveal'

function CredItem({ icon, title, desc, delay }) {
  const { ref, visible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`cred-item reveal${visible ? ' reveal--visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="cred-item__dot" />
      <div className="cred-item__card">
        <div className="cred-item__header">
          <div className="cred-item__badge">{icon}</div>
          <h3 className="cred-item__title">{title}</h3>
        </div>
        <p className="cred-item__desc">{desc}</p>
      </div>
    </div>
  )
}

export default function Credentials() {
  const { t } = useLang()
  const items = t('credentials.items')

  return (
    <section className="section credentials-section" id="credentials">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">{t('credentials.sectionTag')}</div>
          <h2 className="section-title">{t('credentials.title')}</h2>
          <div className="section-divider" />
        </div>

        <div className="cred-timeline">
          {Array.isArray(items) &&
            items.map((item, i) => (
              <CredItem
                key={i}
                icon={item.icon}
                title={item.title}
                desc={item.desc}
                delay={i * 0.12}
              />
            ))}
        </div>
      </div>
    </section>
  )
}
