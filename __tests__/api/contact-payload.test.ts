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
});
