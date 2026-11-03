import { describe, expect, it } from 'vitest';
import {
  CONSENT_KEY,
  clarityConsentSignal,
  clarityCookieExpiries,
  readConsent,
  saveConsent,
} from '../features/consent/lib/consent';

function memoryStorage(initial?: string) {
  const data = new Map<string, string>();
  if (initial) data.set(CONSENT_KEY, initial);
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => void data.set(key, value),
  };
}

describe('cookie consent', () => {
  it('has no choice until one is saved', () => {
    expect(readConsent(memoryStorage())).toBeNull();
  });

  it('remembers accept and reject', () => {
    const storage = memoryStorage();
    saveConsent(storage, true, 1000);
    expect(readConsent(storage, 2000)).toEqual({ analytics: true, at: 1000 });
    saveConsent(storage, false, 1000);
    expect(readConsent(storage, 2000)).toEqual({ analytics: false, at: 1000 });
  });

  it('asks again after a year and ignores broken values', () => {
    const storage = memoryStorage();
    saveConsent(storage, true, 0);
    expect(readConsent(storage, 366 * 24 * 60 * 60 * 1000)).toBeNull();
    expect(readConsent(memoryStorage('not json'))).toBeNull();
    expect(readConsent(memoryStorage('{"analytics":"yes","at":1}'))).toBeNull();
  });
});

describe('Clarity consent signal', () => {
  it('denies advertising storage whatever the analytics choice is', () => {
    for (const granted of [true, false]) {
      const signal = clarityConsentSignal(granted);
      expect(signal.ad_Storage).toBe('denied');
      expect(signal.ad_storage).toBe('denied');
    }
  });

  it('follows the analytics choice', () => {
    expect(clarityConsentSignal(true).analytics_Storage).toBe('granted');
    expect(clarityConsentSignal(true).analytics_storage).toBe('granted');
    expect(clarityConsentSignal(false).analytics_Storage).toBe('denied');
    expect(clarityConsentSignal(false).analytics_storage).toBe('denied');
  });
});

describe('Clarity cookie removal', () => {
  it('expires the Clarity cookies on the host and its parent domain', () => {
    const expiries = clarityCookieExpiries('www.kvet.io');
    expect(expiries.some((e) => e.startsWith('_clck=;') && e.includes('domain=.kvet.io'))).toBe(
      true,
    );
    expect(expiries.some((e) => e.startsWith('_clsk=;') && !e.includes('domain='))).toBe(true);
  });
});
