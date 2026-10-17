/* eslint-disable @next/next/no-img-element -- decorative art positioned with exact crops */
import styles from '../v2.module.css';

export function Hero() {
  return (
    <section
      id='top'
      className={styles.hero}
    >
      <div className={styles.heroInner}>
        <img
          className={styles.heroImage}
          src='/v2/hero-halftone.webp'
          alt=''
        />
        <div className={styles.heroCopy}>
          <h1 className={`${styles.heading} ${styles.heroTitle}`}>
            Your model needs data that{' '}
            <span className={styles.heroMark}>doesn&apos;t exist yet</span>. We produce it.
          </h1>
          <p className={styles.heroLead}>Custom real-world data production for AI.</p>
          <p className={styles.heroText}>
            Kvet designs and produces datasets around the requirements of specific models and
            research teams — from controlled visual production and global data collection to
            multimodal capture and Physical AI.
          </p>
          <div className={styles.heroActions}>
            <a
              className={styles.heroCta}
              href='#contact'
            >
              Discuss a dataset
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
