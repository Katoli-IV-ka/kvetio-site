import { clarityConsentSignal, clarityCookieExpiries } from './consent';

type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[][] };

declare global {
  interface Window {
    clarity?: ClarityFn;
  }
}

/** Loads the Clarity tag. Called only after the visitor has accepted analytics. */
export function loadClarity(id: string): void {
  if (document.getElementById('microsoft-clarity')) return;
  const stub: ClarityFn = function (...args: unknown[]) {
    (stub.q = stub.q || []).push(args);
  };
  window.clarity = window.clarity ?? stub;
  const script = document.createElement('script');
  script.id = 'microsoft-clarity';
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${encodeURIComponent(id)}`;
  document.head.appendChild(script);
}

export function sendClarityConsent(analyticsGranted: boolean): void {
  window.clarity?.('consentv2', clarityConsentSignal(analyticsGranted));
}

export function clearClarityCookies(): void {
  for (const expiry of clarityCookieExpiries(window.location.hostname)) {
    document.cookie = expiry;
  }
}
