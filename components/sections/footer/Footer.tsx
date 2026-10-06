import { LogoMark } from '@/components/ui/LogoMark';
import { footer } from '@/lib/content';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <div className={styles.lockup}>
            <LogoMark size={48.13} />
            <span className={styles.name}>{footer.brand}</span>
          </div>
          {/* Positioned exactly as in the Figma frame: the divider and copyright are absolute. */}
          <span
            className={styles.divider}
            aria-hidden='true'
          >
            |
          </span>
          <p className={styles.copyright}>{footer.copyright}</p>
        </div>

        <nav
          className={styles.nav}
          aria-label='Footer'
        >
          {footer.links.map((link) => (
            <a
              key={link.label}
              className={styles.link}
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
