import { CTA_LABEL, FOOTER_COLUMNS, LEGAL_LINKS, LEGAL_LOCATION, LEGAL_NAME } from '../content';
import styles from '../v2.module.css';

export function Footer({ base = '' }: { base?: string }) {
  const to = (href: string) => (href.startsWith('#') ? `${base}${href}` : href);
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerCta}>
          <p className={styles.footerHeading}>
            <span>Data your model</span>
            <br />
            actually needs
          </p>
          <a
            className={styles.ctaButton}
            href={base ? '/contact' : '#contact'}
          >
            {CTA_LABEL}
          </a>
        </div>
        <div className={styles.footerCols}>
          {FOOTER_COLUMNS.map((column) => (
            <nav
              key={column.label}
              aria-label={column.label}
            >
              <p className={styles.footerLabel}>{column.label}</p>
              <ul className={styles.footerLinks}>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={to(link.href)}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className={styles.footerBar}>
        <div className={styles.footerBarInner}>
          <span>
            © 2026 {LEGAL_NAME} · {LEGAL_LOCATION}. All rights reserved.
          </span>
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
