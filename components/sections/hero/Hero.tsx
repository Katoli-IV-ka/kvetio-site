import Link from 'next/link';
import { LogoMark } from '@/components/ui/LogoMark';
import { Photo } from '@/components/ui/Photo';
import { hero } from '@/lib/content';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <div className={styles.hero}>
      <header className={styles.header}>
        <Link
          className={styles.logo}
          href='/'
          aria-label='kvetio — home'
        >
          <LogoMark
            size={32}
            className={styles.logoMark}
          />
          <span className={styles.wordmark}>kvetio</span>
        </Link>
      </header>

      <section
        className={styles.content}
        aria-labelledby='hero-title'
      >
        <div className={styles.copy}>
          <h1
            id='hero-title'
            className={styles.title}
          >
            {hero.title}
          </h1>
          <p className={styles.subtitle}>{hero.subtitle}</p>
        </div>
      </section>

      <Photo
        src='/images/hero-meadow.webp'
        className={styles.photo}
        sizes='100vw'
        priority
      />
      <div
        className={styles.vignette}
        aria-hidden='true'
      />
      <div
        className={styles.glow}
        aria-hidden='true'
      />
      <div
        className={styles.fade}
        aria-hidden='true'
      />
    </div>
  );
}
