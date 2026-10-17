import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BRAND, CTA_LABEL, NAV_LINKS } from '../content';
import styles from '../v2.module.css';

/**
 * Desktop site header (from 1024px; below that the burger menu takes over):
 * logo left, section links centered, contact button right.
 * `base` makes in-page anchors work from other pages (base='/' turns '#process' into '/#process').
 */
export function Header({ base = '' }: { base?: string }) {
  const to = (href: string) => (href.startsWith('#') ? `${base}${href}` : href);
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
      <div
        className={styles.headerBar}
        data-solid={scrolled}
      >
        <Link
          className={styles.headerBrand}
          href={base || '/'}
        >
          <Image
            src='/v2/kvetio-mark-black.png'
            alt={BRAND}
            width={32}
            height={32}
            priority
          />
          <span className={styles.brandName}>{BRAND}</span>
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
        <a
          className={styles.headerCta}
          href={base ? '/contact' : '#contact'}
        >
          {CTA_LABEL}
        </a>
      </div>
    </header>
  );
}
