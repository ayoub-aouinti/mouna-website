import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext'
import { useScrollReveal } from '../hooks/useScrollReveal'

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
    <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.668 4.61 1.832 6.506L4 29l7.706-1.807A11.94 11.94 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22a9.94 9.94 0 0 1-5.07-1.385l-.364-.216-3.77.884.932-3.664-.236-.376A9.953 9.953 0 0 1 6 15c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.434-7.418c-.298-.149-1.766-.872-2.04-.97-.273-.1-.472-.149-.67.149-.199.298-.771.97-.945 1.169-.174.199-.348.224-.646.075-.298-.149-1.259-.465-2.4-1.483-.887-.792-1.485-1.769-1.659-2.067-.174-.298-.018-.459.13-.608.134-.133.298-.347.447-.521.149-.174.199-.298.298-.497.1-.199.05-.373-.025-.521-.075-.149-.67-1.617-.918-2.214-.242-.581-.487-.502-.67-.511l-.571-.01c-.199 0-.521.075-.794.373s-1.043 1.019-1.043 2.487 1.068 2.885 1.217 3.084c.149.199 2.1 3.205 5.088 4.492.711.307 1.267.49 1.699.627.714.227 1.365.195 1.879.118.573-.085 1.766-.722 2.016-1.42.249-.697.249-1.295.174-1.42-.074-.124-.272-.199-.571-.347z" />
  </svg>
)

export default function Contact() {
  const { t, lang } = useLang()
  const { ref: infoRef, visible: infoVisible } = useScrollReveal()
  const { ref: formRef, visible: formVisible } = useScrollReveal()

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Contact from ${form.name}`)
    const body = encodeURIComponent(
      `From: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    )
    window.open(`mailto:mounanoomen1@gmail.com?subject=${subject}&body=${body}`)
    setForm({ name: '', email: '', message: '' })
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  const contactItems = [
    {
      icon: '✉️',
      label: t('contact.emailLabel'),
      value: 'mounanoomen1@gmail.com',
      href: 'mailto:mounanoomen1@gmail.com',
      valueLtr: true,
    },
    {
      icon: <WhatsAppIcon />,
      label: t('contact.whatsappLabel'),
      value: '+216 22 823 429',
      href: 'https://wa.me/21622823429',
      valueLtr: true,
    },
    {
      icon: '📍',
      label: t('contact.locationLabel'),
      value: t('contact.location'),
      href: null,
      valueLtr: false,
    },
  ]

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">{t('contact.sectionTag')}</div>
          <h2 className="section-title">{t('contact.title')}</h2>
          <div className="section-divider" />
        </div>

        <div className="contact-grid">
          <div
            ref={infoRef}
            className={`contact-info reveal${infoVisible ? ' reveal--visible' : ''}`}
          >
            <p className="contact-subtitle">{t('contact.subtitle')}</p>

            <div className="contact-items">
              {contactItems.map(({ icon, label, value, href, valueLtr }, i) =>
                href ? (
                  <a key={i} href={href} className="contact-card" target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                    <div className="contact-card__icon">{icon}</div>
                    <div>
                      <div className="contact-card__label">{label}</div>
                      <div className="contact-card__value" dir={valueLtr ? 'ltr' : undefined}>{value}</div>
                    </div>
                  </a>
                ) : (
                  <div key={i} className="contact-card">
                    <div className="contact-card__icon">{icon}</div>
                    <div>
                      <div className="contact-card__label">{label}</div>
                      <div className="contact-card__value" dir={valueLtr ? 'ltr' : undefined}>{value}</div>
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="contact-available">{t('contact.available')}</div>
          </div>

          <div
            ref={formRef}
            className={`contact-form-wrapper reveal${formVisible ? ' reveal--visible' : ''}`}
            style={{ transitionDelay: '0.15s' }}
          >
            {sent ? (
              <div className="contact-form__success">{t('contact.formSuccess')}</div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="cf-name">{t('contact.formName')}</label>
                  <input
                    id="cf-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    dir={lang === 'ar' ? 'rtl' : 'ltr'}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cf-email">{t('contact.formEmail')}</label>
                  <input
                    id="cf-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    dir="ltr"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cf-message">{t('contact.formMessage')}</label>
                  <textarea
                    id="cf-message"
                    name="message"
                    rows="5"
                    value={form.message}
                    onChange={handleChange}
                    required
                    dir={lang === 'ar' ? 'rtl' : 'ltr'}
                  />
                </div>
                <button type="submit" className="btn btn--primary btn--full">
                  {t('contact.formSend')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
