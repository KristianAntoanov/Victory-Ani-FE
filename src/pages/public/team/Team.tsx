import Seo from '@/components/common/Seo';
import PageHero from '@/components/layout/PageHero';
import TeamMemberCard from '@/components/common/TeamMemberCard';
import Icon from '@/components/common/Icon';
import ConsultationBanner from '@/components/common/ConsultationBanner';
import TrustedOrganisations from '@/components/common/TrustedOrganisations';
import { getTeamMembers } from '@/data/team';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Team.module.css';

export default function Team() {
  const { lang, t } = useLanguage();
  const teamMembers = getTeamMembers(lang);
  const expertise = [
    { icon: 'target', title: t('team.strategy'), text: t('team.strategyText') },
    { icon: 'pen-line', title: t('team.proposalWriting'), text: t('team.proposalWritingText') },
    { icon: 'users', title: t('team.projectDelivery'), text: t('team.projectDeliveryText') },
  ];

  return (
    <>
      <Seo
        title={t('team.title')}
        description={t('team.lead')}
      />

      <PageHero
        title={t('team.title')}
        lead={t('team.lead')}
      />

      <section className="section" data-testid="team-grid">
        <div className="container">
          <div className={styles.membersGrid}>
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" data-testid="team-expertise">
        <div className="container">
          <div className={`card ${styles.expertisePanel}`}>
            <div className={styles.expertiseGrid}>
              {expertise.map((item) => (
                <div key={item.title} className={styles.expertiseItem}>
                  <span className={`icon-circle ${styles.expertiseIcon}`}>
                    <Icon name={item.icon} size={22} />
                  </span>
                  <div>
                    <h3 className={styles.expertiseTitle}>{item.title}</h3>
                    <p className={styles.expertiseText}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ConsultationBanner />

      <TrustedOrganisations />
    </>
  );
}
