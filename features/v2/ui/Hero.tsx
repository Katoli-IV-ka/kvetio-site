/* eslint-disable @next/next/no-img-element -- decorative art positioned with exact crops */
import Image from 'next/image';
import { NAV_LINKS } from '../content';
import styles from '../v2.module.css';

export function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <img
          className={styles.heroImage}
          src='/v2/hero-halftone.webp'
          alt=''
        />
        <div className={styles.brand}>
          <Image
            src='/v2/logo.png'
            alt='Kvetio'
            width={36}
            height={36}
            priority
          />
          <span className={styles.brandName}>Kvetio</span>
        </div>
        <nav
          className={styles.nav}
          aria-label='Main'
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <h1 className={`${styles.heading} ${styles.heroTitle}`}>Produce AI Training Data</h1>
        <p className={styles.heroText}>
          We produce training data that doesn&apos;t exist yet — for your model only.
          High-throughput synthesis, pristine edge-case capture, and verified licensing.
        </p>
      </div>
    </header>
  );
}
