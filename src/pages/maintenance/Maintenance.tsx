import { Helmet } from 'react-helmet-async';
import { PawPrint, Wrench } from 'lucide-react';
import styles from './Maintenance.module.css';

export default function Maintenance() {
  return (
    <div className={styles.page} lang="bg">
      <Helmet>
        <title>Сайтът е в процес на разработка | V&A Projects</title>
        <meta name="description" content="Подготвяме новия сайт на V&A Projects. Нашият четириног майстор вече работи по въпроса!" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <header className={styles.header}>
        <img src="/assets/logo-original.webp" alt="V&A Projects" width="144" height="80" />
        <span className={styles.status}><span /> Работим по въпроса</span>
      </header>

      <main className={styles.main}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}><Wrench size={16} aria-hidden="true" /> Сайтът е в процес на разработка</span>
          <h1>Затягаме<br />последните <em>болтчета.</em></h1>
          <p className={styles.description}>Подготвяме новия ни онлайн дом. Малко работа зад кулисите, много внимание към детайла и един много отдаден майстор.</p>
          <div className={styles.note}>
            <PawPrint size={23} aria-hidden="true" />
            <p>Всичко е под контрол.<br /><strong>Майсторът си знае работата.</strong></p>
          </div>
          <p className={styles.invitation}>Благодарим за търпението. Намини отново скоро!</p>
        </div>

        <div className={styles.scene}>
          <div className={styles.halo} aria-hidden="true" />
          <span className={styles.sparkle} aria-hidden="true">✳</span>
          <div className={styles.bubble}>Още малко и…<br /><strong>бау, готово!</strong></div>
          <img className={styles.dog} src="/assets/Confident%20German%20Shepherd%20Mechanic.png" alt="Усмихната немска овчарка в работен гащеризон, която държи гаечен ключ" width="985" height="1618" fetchPriority="high" />
          <span className={styles.badge}><PawPrint size={17} aria-hidden="true" /> Главен майстор</span>
        </div>
      </main>

      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} V&A Projects</span>
        <span>Големите идеи заслужават добра подготовка.</span>
      </footer>
    </div>
  );
}
