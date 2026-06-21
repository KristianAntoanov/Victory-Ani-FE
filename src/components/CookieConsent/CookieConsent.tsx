import { useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { cookieConsent } from '../../i18n/cookieConsent'
import styles from './CookieConsent.module.css'

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(() => localStorage.getItem('cookie-consent') !== 'accepted')
  const { language } = useLanguage()
  const copy = cookieConsent[language]

  if (!isVisible) {
    return null
  }

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setIsVisible(false)
  }

  return (
    <section className={styles.banner} aria-label={copy.title}>
      <div>
        <h2>{copy.title}</h2>
        <p>{copy.description}</p>
      </div>
      <button type="button" onClick={acceptCookies}>
        {copy.accept}
      </button>
    </section>
  )
}
