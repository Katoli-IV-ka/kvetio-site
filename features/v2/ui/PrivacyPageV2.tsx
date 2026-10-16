import { PRIVACY_EMAIL, PRIVACY_SECTIONS, PRIVACY_UPDATED } from '../privacy-content';
import styles from '../v2.module.css';
import { PageShell } from './PageShell';

export function PrivacyPageV2() {
  return (
    <PageShell>
      <section className={styles.pageHero}>
        <div className={styles.pageInner}>
          <h1 className={`${styles.heading} ${styles.pageTitle}`}>
            Privacy
            <br />
            Policy
          </h1>
          <p className={styles.policyDate}>Last updated: {PRIVACY_UPDATED}</p>
          <div className={styles.policy}>
            {PRIVACY_SECTIONS.map((section) => (
              <section
                key={section.title}
                id={section.id}
              >
                <h2 className={styles.policyHeading}>{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.list && (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
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
