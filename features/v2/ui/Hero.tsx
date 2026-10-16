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
          <h1 className={`${styles.heading} ${styles.heroTitle}`}>Produce AI Training Data</h1>
          <p className={styles.heroText}>
            We produce training data that doesn&apos;t exist yet — for your model only.
            High-throughput synthesis, pristine edge-case capture, and verified licensing.
          </p>
          <div className={styles.heroActions}>
            <a
              className={`${styles.heroCta} ${styles.heroCtaGhost}`}
              href='#use-cases'
            >
              Use cases
            </a>
            <a
              className={styles.heroCta}
              href='#contact'
            >
              Let&apos;s talk
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
