/* eslint-disable @next/next/no-img-element -- decorative art positioned with exact crops */
import { FOOTER_COLUMNS, LEGAL_LINKS } from '../content';
import styles from '../v2.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <img
        className={styles.footerArt}
        src='/v2/footer-halftone.webp'
        alt=''
        loading='lazy'
      />
      <div className={styles.footerInner}>
        <div className={styles.footerCta}>
          <h2 className={styles.footerHeading}>
            <span>Data your model</span>
            <br />
            actually needs
          </h2>
          <a
            className={styles.ctaButton}
            href='#contact'
          >
            Let&apos;s talk
          </a>
        </div>
        <div className={styles.footerCols}>
          {FOOTER_COLUMNS.map((column) => (
            <nav
              key={column.label}
              aria-label={column.label}
            >
              <h3 className={styles.footerLabel}>{column.label}</h3>
              <ul className={styles.footerLinks}>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className={styles.footerBar}>
        <div className={styles.footerBarInner}>
          <span>© 2026 Kvetio. All rights reserved.</span>
          <div className={styles.legal}>
            {LEGAL_LINKS.map((link, index) => (
              <span
                key={link.label}
                className={styles.legal}
              >
                {index > 0 && <span className={styles.legalSep}>/</span>}
                <a href={link.href}>{link.label}</a>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
