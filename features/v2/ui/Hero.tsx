/* eslint-disable @next/next/no-img-element -- decorative art positioned with exact crops */
import Link from 'next/link';
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
          <Link
            className={styles.heroCta}
            href='/contact'
          >
            Send a brief
          </Link>
        </div>
      </div>
    </section>
  );
}
