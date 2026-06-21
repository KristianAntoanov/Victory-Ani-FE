import type { MouseEvent } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { shared } from '../../i18n/shared'
import styles from './AboutModal.module.css'

type AboutModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  const { language } = useLanguage()
  const copy = shared[language].about

  if (!isOpen) {
    return null
  }

  return (
    <div className={styles.backdrop} role="presentation" onClick={onClose}>
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-title"
        onClick={(event: MouseEvent) => event.stopPropagation()}
      >
        <h2 id="about-title">{copy.title}</h2>
        <p>{copy.description}</p>
        <button type="button" onClick={onClose}>
          {copy.close}
        </button>
      </section>
    </div>
  )
}
