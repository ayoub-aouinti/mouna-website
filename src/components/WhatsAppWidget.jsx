import { useState, useEffect } from 'react'
import { useLang } from '../i18n/LanguageContext'

const WA_NUMBER = '21622823429'

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="30" height="30">
    <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.668 4.61 1.832 6.506L4 29l7.706-1.807A11.94 11.94 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22a9.94 9.94 0 0 1-5.07-1.385l-.364-.216-3.77.884.932-3.664-.236-.376A9.953 9.953 0 0 1 6 15c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.434-7.418c-.298-.149-1.766-.872-2.04-.97-.273-.1-.472-.149-.67.149-.199.298-.771.97-.945 1.169-.174.199-.348.224-.646.075-.298-.149-1.259-.465-2.4-1.483-.887-.792-1.485-1.769-1.659-2.067-.174-.298-.018-.459.13-.608.134-.133.298-.347.447-.521.149-.174.199-.298.298-.497.1-.199.05-.373-.025-.521-.075-.149-.67-1.617-.918-2.214-.242-.581-.487-.502-.67-.511l-.571-.01c-.199 0-.521.075-.794.373s-1.043 1.019-1.043 2.487 1.068 2.885 1.217 3.084c.149.199 2.1 3.205 5.088 4.492.711.307 1.267.49 1.699.627.714.227 1.365.195 1.879.118.573-.085 1.766-.722 2.016-1.42.249-.697.249-1.295.174-1.42-.074-.124-.272-.199-.571-.347z" />
  </svg>
)

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="14" height="14">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

export default function WhatsAppWidget() {
  const { t, lang, dir } = useLang()
  const [bubbleVisible, setBubbleVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  /* Show greeting bubble after 3 s, only once per session */
  useEffect(() => {
    if (dismissed) return
    const timer = setTimeout(() => setBubbleVisible(true), 3000)
    return () => clearTimeout(timer)
  }, [dismissed])

  /* Re-show bubble when language changes (if not dismissed) */
  useEffect(() => {
    if (!dismissed) setBubbleVisible(false)
    const timer = setTimeout(() => {
      if (!dismissed) setBubbleVisible(true)
    }, 400)
    return () => clearTimeout(timer)
  }, [lang, dismissed])

  const openWhatsApp = () => {
    const text = encodeURIComponent(t('whatsapp.prefill'))
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank', 'noreferrer')
  }

  const closeBubble = (e) => {
    e.stopPropagation()
    setBubbleVisible(false)
    setDismissed(true)
  }

  return (
    <div className={`wa-widget wa-widget--${dir}`} role="complementary" aria-label={t('whatsapp.tooltip')}>
      {/* Greeting bubble */}
      <div
        className={`wa-bubble${bubbleVisible ? ' wa-bubble--visible' : ''}`}
        role="dialog"
        aria-live="polite"
      >
        <div className="wa-bubble__header">
          <div className="wa-bubble__avatar">
            <WhatsAppIcon />
          </div>
          <div className="wa-bubble__meta">
            <span className="wa-bubble__name">{t('hero.name')}</span>
            <span className="wa-bubble__status">● Online</span>
          </div>
          <button
            className="wa-bubble__close"
            onClick={closeBubble}
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="wa-bubble__body">
          <p className="wa-bubble__message">{t('whatsapp.bubble')}</p>
        </div>
        <button className="wa-bubble__cta" onClick={openWhatsApp}>
          {t('whatsapp.tooltip')} →
        </button>
      </div>

      {/* FAB button */}
      <button
        className="wa-fab"
        onClick={openWhatsApp}
        aria-label={t('whatsapp.tooltip')}
        title={t('whatsapp.tooltip')}
      >
        <span className="wa-fab__pulse" />
        <span className="wa-fab__pulse wa-fab__pulse--2" />
        <WhatsAppIcon />
      </button>
    </div>
  )
}
