export const CONSENT_KEY = 'kvet-cookie-consent';
/** the choice is asked again after a year, in line with Clarity's 13-month limit on consent */
const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

export type ConsentChoice = { analytics: boolean; at: number };

export function readConsent(
  storage: Pick<Storage, 'getItem'>,
  now = Date.now(),
): ConsentChoice | null {
  try {
    const raw = storage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Partial<ConsentChoice>;
    if (typeof data.analytics !== 'boolean' || typeof data.at !== 'number') return null;
    if (now - data.at > CONSENT_MAX_AGE_MS) return null;
    return { analytics: data.analytics, at: data.at };
  } catch {
    return null;
  }
}

export function saveConsent(
  storage: Pick<Storage, 'setItem'>,
  analytics: boolean,
  now = Date.now(),
): ConsentChoice {
  const choice = { analytics, at: now };
  try {
    storage.setItem(CONSENT_KEY, JSON.stringify(choice));
  } catch {
    /* storage can be unavailable (private mode); the choice then lasts for this page only */
  }
  return choice;
}

/**
 * What Clarity is told. Advertising storage is always denied. Both spellings of the keys are sent
 * because the casing could not be checked against Microsoft's page when this was written; keys a
 * version does not know are ignored.
 */
export function clarityConsentSignal(analyticsGranted: boolean) {
  const analytics = analyticsGranted ? 'granted' : 'denied';
  return {
    ad_Storage: 'denied',
    analytics_Storage: analytics,
    ad_storage: 'denied',
    analytics_storage: analytics,
  } as const;
}

/** Clarity's own cookies on this site: removed when the visitor withdraws analytics consent. */
export const CLARITY_COOKIES = ['_clck', '_clsk', 'CLID', 'ANONCHK', 'MR', 'SM'];

export function clarityCookieExpiries(hostname: string): string[] {
  const parts = hostname.split('.');
  const domains = ['', `; domain=${hostname}`];
  if (parts.length > 2) domains.push(`; domain=.${parts.slice(-2).join('.')}`);
  else if (parts.length === 2) domains.push(`; domain=.${hostname}`);
  return CLARITY_COOKIES.flatMap((name) =>
    domains.map((domain) => `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`),
  );
}
