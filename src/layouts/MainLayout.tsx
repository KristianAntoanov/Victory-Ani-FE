import type { ReactNode } from 'react'
import { CookieConsent } from '../components/CookieConsent/CookieConsent'
import { LanguageProvider } from '../contexts/LanguageContext'
import styles from './MainLayout.module.css'

type MainLayoutProps = {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <LanguageProvider>
      <div className={styles.shell}>
        <header className={styles.header}>
          <a className={styles.logo} href="/">
            Victory Ani
          </a>
          <nav className={styles.nav} aria-label="Main navigation">
            <a href="/">Home</a>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/summer-camp">Summer Camp</a>
          </nav>
        </header>
        <main className={styles.main}>{children}</main>
      </div>
      <CookieConsent />
    </LanguageProvider>
  )
}
