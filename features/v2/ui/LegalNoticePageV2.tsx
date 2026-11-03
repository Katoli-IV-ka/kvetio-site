import { LEGAL_NOTICE_SECTIONS, LEGAL_NOTICE_UPDATED } from '../legal-content';
import { PRIVACY_EMAIL } from '../privacy-content';
import styles from '../v2.module.css';
import { PageShell } from './PageShell';

export function LegalNoticePageV2() {
  return (
    <PageShell>
      <section className={styles.pageHero}>
        <div className={styles.pageInner}>
          <h1 className={`${styles.heading} ${styles.pageTitle}`}>
            Legal
            <br />
            Notice
          </h1>
          <p className={styles.policyDate}>Last updated: {LEGAL_NOTICE_UPDATED}</p>
          <div className={styles.policy}>
            {LEGAL_NOTICE_SECTIONS.map((section) => (
              <section
                key={section.title}
                id={section.id}
              >
                <h2 className={styles.policyHeading}>{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
            <p className={styles.policyDate}>
              Questions? Write to <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
