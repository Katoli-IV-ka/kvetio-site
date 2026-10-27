import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { FocusEvent } from 'react';
import { BRAND, CTA_LABEL, NAV_LINKS, SOLUTION_LINKS } from '../content';
import styles from '../v2.module.css';

/**
 * Desktop site header (from 1024px; below that the burger menu takes over):
 * logo left, the Solutions dropdown and section links centered, contact button right.
 * `base` makes in-page anchors work from other pages (base='/' turns '#process' into '/#process').
 */
export function Header({ base = '' }: { base?: string }) {
  const to = (href: string) => (href.startsWith('#') ? `${base}${href}` : href);
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const { asPath } = useRouter();
  const onSolutionPage = SOLUTION_LINKS.some((link) => asPath.split(/[?#]/)[0] === link.href);

  // the dropdown closes once focus leaves it (Tab past the last link, or a click elsewhere)
  const onSolutionsBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setSolutionsOpen(false);
  };

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
            src='/v2/kvet-mark.png'
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
          <div
            className={styles.navDrop}
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
            onBlur={onSolutionsBlur}
            onKeyDown={(event) => {
              if (event.key === 'Escape') setSolutionsOpen(false);
            }}
          >
            <button
              type='button'
              className={styles.navDropButton}
              aria-expanded={solutionsOpen}
              aria-controls='solutions-menu'
              data-current={onSolutionPage || undefined}
              onClick={() => setSolutionsOpen((open) => !open)}
            >
              Solutions
              <span
                className={styles.navCaret}
                aria-hidden='true'
              />
            </button>
            <ul
              id='solutions-menu'
              className={styles.navDropList}
              data-open={solutionsOpen}
            >
              {SOLUTION_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={asPath.split(/[?#]/)[0] === link.href ? 'page' : undefined}
                    onClick={() => setSolutionsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
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
