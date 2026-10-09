const KEY = 'kvetio-contact-draft';

export type ContactDraft = {
  name: string;
  email: string;
  consent: boolean;
};

/** Hands the first two answers from the landing band over to the contact page. */
export function saveDraft(draft: ContactDraft): void {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(draft));
  } catch {
    /* storage can be unavailable (private mode); the form just starts empty */
  }
}

export function loadDraft(): ContactDraft | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Partial<ContactDraft>;
    if (typeof data.name !== 'string' || typeof data.email !== 'string') return null;
    return { name: data.name, email: data.email, consent: data.consent === true };
  } catch {
    return null;
  }
}

export function clearDraft(): void {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
