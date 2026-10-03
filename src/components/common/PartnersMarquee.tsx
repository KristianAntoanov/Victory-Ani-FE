import { partnerLogos } from '@/data/partners';
import styles from './PartnersMarquee.module.css';

interface PartnersMarqueeProps {
  heading: string;
  label: string;
}

function LogoGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className={`${styles.logoGroup}${duplicate ? ` ${styles.duplicate}` : ''}`} aria-hidden={duplicate || undefined}>
      {partnerLogos.map((logo) => (
        <div className={styles.logoItem} key={`${duplicate ? 'duplicate-' : ''}${logo.name}`}>
          <img src={logo.src} alt={duplicate ? '' : logo.name} decoding="async" />
        </div>
      ))}
    </div>
  );
}

export default function PartnersMarquee({ heading, label }: PartnersMarqueeProps) {
  return (
    <section className={styles.section} aria-labelledby="partners-heading">
      <div className="container">
        <h2 id="partners-heading">{heading}</h2>
        <span className="dash" />
      </div>
      <div className={styles.marquee} aria-label={label}>
        <div className={styles.track}>
          <LogoGroup />
          <LogoGroup duplicate />
        </div>
      </div>
    </section>
  );
}
