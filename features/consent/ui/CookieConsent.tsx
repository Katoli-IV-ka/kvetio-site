import Link from 'next/link';
import { useEffect, useState } from 'react';
import { clearClarityCookies, loadClarity, sendClarityConsent } from '../lib/clarity';
import { readConsent, saveConsent } from '../lib/consent';
import styles from './consent.module.css';

const OPEN_EVENT = 'kvet:open-cookie-settings';

export const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

/** Footer link: shows the banner again so the choice can be changed. */
export function openCookieSettings(): void {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

function startClarity(id: string) {
  loadClarity(id);
  sendClarityConsent(true);
}

/**
 * Analytics (Microsoft Clarity) runs only after an explicit "Accept". Nothing is loaded before the
 * choice or after "Reject", and advertising storage is always denied. Without a Clarity id the
 * site sets no optional cookies, so no banner is shown.
 */
export function CookieConsent({ clarityId }: { clarityId?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!clarityId) return undefined;
    const stored = readConsent(window.localStorage);
    if (stored?.analytics) startClarity(clarityId);
    else if (!stored) queueMicrotask(() => setOpen(true));
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, [clarityId]);

  function choose(analytics: boolean) {
    if (!clarityId) return;
    const previous = readConsent(window.localStorage);
    saveConsent(window.localStorage, analytics);
    setOpen(false);
    if (analytics) {
      startClarity(clarityId);
    } else if (previous?.analytics) {
      // already running: switch it off, remove its cookies and reload without the tag
      sendClarityConsent(false);
      clearClarityCookies();
      window.location.reload();
    }
  }

  if (!clarityId || !open) return null;

  return (
    <div
      className={styles.banner}
      role='dialog'
      aria-label='Cookie settings'
    >
      <p className={styles.text}>
        We use Microsoft Clarity to see how the site is used. It runs only if you accept and sets
        analytics cookies. We never use advertising cookies. See the{' '}
        <Link href='/privacy-policy#cookies'>Privacy Policy</Link>.
      </p>
      <div className={styles.actions}>
        <button
          className={styles.accept}
          type='button'
          onClick={() => choose(true)}
        >
          Accept analytics
        </button>
        <button
          className={styles.reject}
          type='button'
          onClick={() => choose(false)}
        >
          Reject
        </button>
      </div>
    </div>
  );
}
