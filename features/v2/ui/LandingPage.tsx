/* eslint-disable @next/next/no-img-element -- decorative art positioned with exact crops */
import { CTA_LABEL } from '../content';
import type { Landing } from '../landings';
import styles from '../v2.module.css';
import { Contact } from './Contact';
import { IndexList } from './IndexList';
import { PageShell } from './PageShell';
import { Process } from './Process';
import { WhyKvet } from './WhyKvet';

/** Solution landing: a focused answer to one data problem, then the shared process and contact form. */
export function LandingPage({ landing }: { landing: Landing }) {
  return (
    <PageShell>
      <section className={styles.pageHero}>
        {!landing.image && (
          <img
            className={styles.pageArt}
            src='/v2/hero-halftone.webp'
            alt=''
          />
        )}
        <div className={`${styles.pageInner} ${landing.image ? styles.landingHero : ''}`}>
          <div className={styles.landingCopy}>
            <p className={styles.eyebrow}>Solutions / {landing.name}</p>
            <h1 className={`${styles.heading} ${styles.pageTitle} ${styles.landingTitle}`}>
              {landing.title}
            </h1>
            <p className={styles.heroLead}>{landing.lead}</p>
            <p className={styles.heroText}>{landing.text}</p>
            <div className={styles.heroActions}>
              <a
                className={styles.heroCta}
                href='#contact'
              >
                {CTA_LABEL}
              </a>
            </div>
          </div>
          {landing.image && (
            <img
              className={styles.landingPhoto}
              src={landing.image}
              alt=''
            />
          )}
        </div>
      </section>
      <section className={styles.physical}>
        <div className={styles.physicalInner}>
          <div className={styles.physicalHead}>
            <h2 className={styles.heading}>What we produce</h2>
            <p className={styles.typesText}>
              Every dataset is designed around your model&apos;s requirements and delivered with
              metadata, QA and rights in place.
            </p>
          </div>
          <div className={styles.physicalGroups}>
            <IndexList
              label='Data'
              items={landing.produce}
            />
            <IndexList
              label={landing.howLabel}
              items={landing.how}
              start={landing.produce.length + 1}
            />
          </div>
        </div>
      </section>
      <Process />
      <WhyKvet />
      <Contact />
    </PageShell>
  );
}
