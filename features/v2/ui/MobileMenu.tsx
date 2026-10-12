import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MENU_GROUPS, MENU_LINKS } from '../content';
import styles from '../v2.module.css';

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setExpanded(null);
  };

  return (
    <div className={styles.mobileMenu}>
      <div
        className={styles.mobileBar}
        data-solid={scrolled || open}
      >
        <a
          className={styles.mobileBrand}
          href='#top'
          onClick={close}
        >
          <Image
            src='/v2/kvetio-mark.png'
            alt='Kvetio'
            width={40}
            height={40}
            priority
          />
          <span className={styles.brandName}>Kvetio</span>
        </a>
        <button
          type='button'
          className={styles.burger}
          aria-expanded={open}
          aria-controls='v2-mobile-menu'
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => (open ? close() : setOpen(true))}
        >
          <span
            className={styles.burgerLines}
            data-open={open}
          />
        </button>
      </div>
      <div
        id='v2-mobile-menu'
        className={styles.menuPanel}
        data-open={open}
        aria-hidden={!open}
        inert={!open}
      >
        <nav
          className={styles.menuNav}
          aria-label='Main'
        >
          {MENU_GROUPS.map((group) => {
            const isOpen = expanded === group.label;
            return (
              <div key={group.label}>
                <button
                  type='button'
                  className={styles.menuItem}
                  aria-expanded={isOpen}
                  onClick={() => setExpanded(isOpen ? null : group.label)}
                >
                  {group.label}
                  <span
                    className={styles.chevron}
                    data-open={isOpen}
                    aria-hidden='true'
                  />
                </button>
                {isOpen && (
                  <ul className={styles.subList}>
                    {group.items.map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          onClick={close}
                        >
                          <span className={styles.subTitle}>{item.label}</span>
                          {item.text && <span className={styles.subText}>{item.text}</span>}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
          {MENU_LINKS.map((link) => (
            <a
              key={link.label}
              className={styles.menuItem}
              href={link.href}
              onClick={close}
            >
              {link.label}
            </a>
          ))}
          <div className={styles.menuCtas}>
            <a
              className={styles.menuCta}
              href='#contact'
              onClick={close}
            >
              Let&apos;s talk
            </a>
            <Link
              className={styles.menuSecondary}
              href='/contact'
            >
              Send a brief
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
