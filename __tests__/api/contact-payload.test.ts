import { describe, expect, it } from 'vitest';
import { normalizeContactPayload } from '../../pages/api/contact';

describe('normalizeContactPayload', () => {
  it('accepts the simplified landing page form without a name field', () => {
    expect(
      normalizeContactPayload({
        email: 'buyer@example.com',
        message: 'Need 10k annotated video clips for action recognition.',
      }),
    ).toEqual({
      name: 'Website visitor',
      email: 'buyer@example.com',
      message: 'Need 10k annotated video clips for action recognition.',
    });
  });

  it('accepts the full contact page form', () => {
    expect(
      normalizeContactPayload({
        name: 'Ada Lovelace',
        jobTitle: 'CTO',
        company: 'ACME',
        email: 'ada@acme.com',
        dataTypes: ['Audio', 'Media'],
        message: 'Need speech data.',
        source: 'LinkedIn',
        marketingConsent: true,
      }),
    ).toEqual({
      name: 'Ada Lovelace',
      email: 'ada@acme.com',
      message: 'Need speech data.',
      jobTitle: 'CTO',
      company: 'ACME',
      dataTypes: ['Audio', 'Media'],
      source: 'LinkedIn',
      marketingConsent: true,
    });
  });
});
