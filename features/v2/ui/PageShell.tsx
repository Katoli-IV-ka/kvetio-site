import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { NAV_LINKS } from '../content';
import styles from '../v2.module.css';
import { Footer } from './Footer';
import { MobileMenu } from './MobileMenu';

/** Frame for the inner pages (contact, privacy): the same header, menu and footer as /v2. */
export function PageShell({ children }: { children: ReactNode }) {
  const to = (href: string) => (href.startsWith('#') ? `/v2${href}` : href);
  return (
    <div className={styles.root}>
      <MobileMenu base='/v2' />
      <div className={styles.topBar}>
        <Link
          className={styles.brandStatic}
          href='/v2'
        >
          <Image
            src='/v2/kvetio-mark-black.png'
            alt='Kvetio'
            width={36}
            height={36}
            priority
          />
          <span className={styles.brandName}>Kvetio</span>
        </Link>
        <nav
          className={styles.topNav}
          aria-label='Main'
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={to(link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      <main className={styles.pageMain}>{children}</main>
      <Footer base='/v2' />
    </div>
  );
}
