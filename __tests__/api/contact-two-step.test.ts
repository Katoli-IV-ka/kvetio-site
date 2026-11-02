import type { NextApiRequest, NextApiResponse } from 'next';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

type Reply = { status: number; body: unknown };

function call(handler: (req: NextApiRequest, res: NextApiResponse) => unknown, body: unknown) {
  return new Promise<Reply>((resolve) => {
    const res = {
      status(code: number) {
        return { json: (payload: unknown) => resolve({ status: code, body: payload }) };
      },
    };
    const req = { method: 'POST', body, headers: {}, socket: { remoteAddress: '1.2.3.4' } };
    void handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);
  });
}

const base = { name: 'Ada', email: 'ada@acme.com', message: 'Need egocentric data.' };

describe('contact API, two-step form', () => {
  beforeEach(() => {
    vi.resetModules();
    process.env.TELEGRAM_BOT_TOKEN = 'token';
    process.env.TELEGRAM_CHAT_ID = '42';
    delete process.env.GMAIL_USER;
    delete process.env.GMAIL_APP_PASSWORD;
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('sends the first step as a new message and returns its id', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ result: { message_id: 77 } }),
    });
    vi.stubGlobal('fetch', fetchMock);
    const { default: handler } = await import('../../pages/api/contact');

    const reply = await call(handler, { ...base, stage: 'initial' });

    expect(reply.status).toBe(200);
    expect(reply.body).toMatchObject({ telegramMessageId: 77 });
    expect(String(fetchMock.mock.calls[0]![0])).toMatch(/\/sendMessage$/);
  });

  it('updates the same Telegram message on the second step', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ({}) });
    vi.stubGlobal('fetch', fetchMock);
    const { default: handler } = await import('../../pages/api/contact');

    const reply = await call(handler, {
      ...base,
      stage: 'details',
      telegramMessageId: 77,
      company: 'ACME',
      volume: 'Pilot (small sample batch)',
      ndaNeeded: true,
    });

    expect(reply.status).toBe(200);
    const [url, options] = fetchMock.mock.calls[0]!;
    expect(String(url)).toMatch(/\/editMessageText$/);
    const sent = JSON.parse(options.body);
    expect(sent.message_id).toBe(77);
    expect(sent.text).toContain('Company: ACME');
    expect(sent.text).toContain('Scale: Pilot (small sample batch)');
    expect(sent.text).toContain('NDA needed: yes');
  });

  it('sends a fresh message when the edit fails', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ ok: false, status: 400 })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ result: { message_id: 90 } }),
      });
    vi.stubGlobal('fetch', fetchMock);
    const { default: handler } = await import('../../pages/api/contact');

    const reply = await call(handler, { ...base, stage: 'details', telegramMessageId: 77 });

    expect(reply.status).toBe(200);
    expect(reply.body).toMatchObject({ telegramMessageId: 90 });
    expect(String(fetchMock.mock.calls[1]![0])).toMatch(/\/sendMessage$/);
  });

  it('answers 502 instead of throwing when nothing could be delivered', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }));
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const { default: handler } = await import('../../pages/api/contact');

    const reply = await call(handler, { ...base, stage: 'initial' });

    expect(reply.status).toBe(502);
  });

  it('silently drops requests that fill the hidden trap field', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const { default: handler } = await import('../../pages/api/contact');

    const reply = await call(handler, { ...base, website: 'http://spam.example' });

    expect(reply.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
