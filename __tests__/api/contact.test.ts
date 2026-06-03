import { describe, it, expect, vi, beforeEach } from 'vitest';

const TELEGRAM_TOKEN = 'test-token';
const TELEGRAM_CHAT_ID = '-1001234567890';

describe('sendTelegramMessage', () => {
  beforeEach(() => {
    process.env.TELEGRAM_BOT_TOKEN = TELEGRAM_TOKEN;
    process.env.TELEGRAM_CHAT_ID = TELEGRAM_CHAT_ID;
  });

  it('calls Telegram API with correct URL and body', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
    });
    vi.stubGlobal('fetch', mockFetch);

    const { sendTelegramMessage } = await import('../../pages/api/contact');

    await sendTelegramMessage('Hello test');

    expect(mockFetch).toHaveBeenCalledOnce();
    const [url, options] = mockFetch.mock.calls[0]!;
    expect(url).toBe(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`);
    expect(options.method).toBe('POST');
    const body = JSON.parse(options.body);
    expect(body.chat_id).toBe(TELEGRAM_CHAT_ID);
    expect(body.text).toBe('Hello test');
    expect(body.parse_mode).toBeUndefined();

    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it('throws when Telegram API returns non-ok response', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
    });
    vi.stubGlobal('fetch', mockFetch);

    const { sendTelegramMessage } = await import('../../pages/api/contact');

    await expect(sendTelegramMessage('Hello')).rejects.toThrow('Telegram API error: 401');

    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it('throws on fetch timeout (AbortError)', async () => {
    const mockFetch = vi
      .fn()
      .mockRejectedValue(
        Object.assign(new Error('The operation was aborted'), { name: 'AbortError' }),
      );
    vi.stubGlobal('fetch', mockFetch);

    const { sendTelegramMessage } = await import('../../pages/api/contact');

    await expect(sendTelegramMessage('Hello')).rejects.toThrow();

    vi.unstubAllGlobals();
    vi.resetModules();
  });
});
