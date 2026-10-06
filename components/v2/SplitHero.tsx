import Image from 'next/image';
import Link from 'next/link';
import { splitHero } from '@/lib/content';
import { siteConfig } from '@/lib/site';
import { ArrowIcon, ChevronIcon, MenuIcon } from './icons';
import styles from './SplitHero.module.css';

export function SplitHero() {
  return (
    <div className={styles.hero}>
      <div className={styles.panel}>
        <header className={styles.header}>
          <button
            className={styles.menu}
            type='button'
            aria-label='Menu'
          >
            <MenuIcon />
          </button>
          <Link
            className={styles.brand}
            href='/v2'
          >
            {splitHero.brand}
          </Link>
          <nav
            className={styles.nav}
            aria-label='Main'
          >
            {splitHero.nav.map((item) => (
              <button
                key={item}
                className={styles.navItem}
                type='button'
              >
                {item}
                <ChevronIcon />
              </button>
            ))}
          </nav>
        </header>

        <section
          className={styles.copy}
          aria-labelledby='v2-title'
        >
          <h1
            id='v2-title'
            className={styles.title}
          >
            {splitHero.title}
          </h1>
          <p className={styles.body}>{splitHero.body}</p>
          <div className={styles.actions}>
            <Link
              className={styles.secondary}
              href={splitHero.secondaryCta.href}
            >
              {splitHero.secondaryCta.label}
            </Link>
            <a
              className={styles.primary}
              href={`mailto:${siteConfig.email}`}
            >
              {splitHero.primaryCta.label}
              <span
                className={styles.arrow}
                aria-hidden='true'
              >
                <ArrowIcon />
              </span>
            </a>
          </div>
        </section>
      </div>

      <div className={styles.media}>
        <Image
          src='/images/v2-hero.webp'
          alt=''
          fill
          priority
          quality={90}
          sizes='(min-width: 1024px) 50vw, 100vw'
          className={styles.photo}
        />
        <div
          className={styles.dots}
          aria-hidden='true'
        >
          {Array.from({ length: splitHero.slides }, (_, index) => (
            <span
              key={index}
              className={index === 0 ? styles.dotActive : styles.dot}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
