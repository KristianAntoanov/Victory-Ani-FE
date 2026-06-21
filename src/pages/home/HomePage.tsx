import { useState } from 'react'
import { AboutModal } from '../../components/HomeModal/AboutModal'
import { useLanguage } from '../../contexts/LanguageContext'
import { home } from '../../i18n/home'
import styles from './HomePage.module.css'

export function HomePage() {
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const { language } = useLanguage()
  const copy = home[language]

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p className={styles.description}>{copy.description}</p>
          <button type="button" onClick={() => setIsAboutOpen(true)}>
            {copy.aboutButton}
          </button>
        </div>
      </section>
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </>
  )
}
