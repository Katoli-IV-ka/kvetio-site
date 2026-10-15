import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { NAV_LINKS } from '../content';
import styles from '../v2.module.css';

/**
 * Desktop site header (from 1024px; below that the burger menu takes over):
 * logo left, section links centered, contact button right.
 * `base` makes in-page anchors work from other pages (base='/v2' turns '#process' into '/v2#process').
 */
export function Header({ base = '' }: { base?: string }) {
  const to = (href: string) => (href.startsWith('#') ? `${base}${href}` : href);
  const [active, setActive] = useState<string | null>(null);

  // Highlight the link of the section that crosses the middle of the viewport (landing only)
  useEffect(() => {
    if (base) return undefined;
    const sections = NAV_LINKS.map((link) => document.querySelector(link.href)).filter(
      (el): el is Element => el !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((el) => observer.observe(el));
    const onScroll = () => {
      if (window.scrollY < 8) setActive(null);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [base]);

  return (
    <header className={styles.siteHeader}>
      <div className={styles.headerBar}>
        <Link
          className={styles.headerBrand}
          href={base || '/v2'}
        >
          <Image
            src='/v2/kvetio-mark-black.png'
            alt='Kvetio'
            width={32}
            height={32}
            priority
          />
          <span className={styles.brandName}>Kvetio</span>
        </Link>
        <nav
          className={styles.headerNav}
          aria-label='Main'
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={to(link.href)}
              aria-current={active === link.href ? 'location' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <Link
          className={styles.headerCta}
          href='/contact'
        >
          Send a brief
        </Link>
      </div>
    </header>
  );
}
